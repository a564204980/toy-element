import { computed, ref, triggerRef, watch } from "vue";
import { debugWarn } from "@toy-element/utils";

export interface TreeNode {
  children: (string | number)[]; // 子节点数据
  level: number; // 层级
  expanded: boolean; // 是否展开
  lazy?: boolean; // 是否懒加载节点
  loaded?: boolean; // 懒加载数据是否已加载
  loading?: boolean; // 是否正在加载中
  parentKey?: string | number | null; // 父节点key
}

export interface UseTreeOptions {
  data: () => any[];
  rowKey: () => string | ((row: any) => string);
  treeProps: () => { children?: string; hasChildren?: string };
  lazy: () => boolean;
  load?: (row: any, treeNode: TreeNode, resolve: (data: any[]) => void) => void;
  indent: () => number;
  defaultExpandAll: () => boolean;
  expandRowKeys: () => (string | number)[];
  emit: (event: "expand-change", row: any, expanded: boolean) => void;
}

export const useTree = (options: UseTreeOptions) => {
  const treeData = ref<Record<string | number, TreeNode>>({});
  const lazyTreeNodeMap = ref<Record<string | number, any[]>>({}); // 懒加载节点缓存数据

  // 子节点字段
  const childrenField = computed(
    () => options.treeProps()?.children || "children",
  );

  const hasChildrenField = computed(
    () => options?.treeProps()?.hasChildren || "hasChildren",
  );

  /**
   * 获取行的唯一标识
   */
  const getRowKey = (row: any): string | number => {
    const key = options.rowKey();
    if (!key) {
      debugWarn("ErTable", "树形数据需要设置 row-key 属性");
      return "";
    }
    if (typeof key === "function") {
      return key(row);
    }
    return row[key];
  };

  /**
   * 判断是否需要默认展开
   */
  const shouldExpand = (key: string | number, row: any): boolean => {
    const hasChildrenFlag = row[hasChildrenField.value];

    // 如果是懒加载节点，且没有子节点，不展开
    if (
      options.lazy() &&
      hasChildrenFlag &&
      !row[childrenField.value]?.length
    ) {
      return false;
    }

    if (options.defaultExpandAll()) return true;
    return options.expandRowKeys().includes(key);
  };

  /**
   * 初始化treeData数据
   */
  const normalize = (
    data: any[],
    level: number = 0,
    parentKey: string | number | null = null,
  ) => {
    if (!options.rowKey()) return;

    data.forEach((row) => {
      const key = getRowKey(row);
      if (key === "") return;

      const children = row[childrenField.value];
      const hasChildrenFlag = row[hasChildrenField.value];

      treeData.value[key] = {
        level,
        expanded: shouldExpand(key, row),
        children: children ? children.map(getRowKey) : [], // 等价于children.map((child) => getRowKey(child)
        lazy: options.lazy() && hasChildrenFlag,
        loaded: false, // 是否已经加载完成
        loading: false, // 是否正在加载
        parentKey, // 父节点key
      };

      if (Array.isArray(children) && children.length > 0) {
        normalize(children, level + 1, key);
      }
    });
  };

  /**
   * 获取已展开的节点数据，并且数据扁平化
   */
  const getTreeData = (data: any[]): any[] => {
    const result: any[] = [];

    const traverse = (rows: any[]) => {
      rows.forEach((row) => {
        result.push(row);

        const key = getRowKey(row);
        const treeNode = treeData.value[key];

        if (treeNode?.expanded && treeNode.children.length > 0) {
          let childrenData: any[] = [];

          // 优先从懒加载缓存中获取数据
          if (lazyTreeNodeMap.value[key]) {
            childrenData = lazyTreeNodeMap.value[key];
          } else {
            const children = row[childrenField.value];
            if (Array.isArray(children)) {
              childrenData = children;
            }
          }

          if (childrenData.length > 0) {
            traverse(childrenData);
          }
        }
      });
    };

    traverse(data);
    return result;
  };

  // 更新数据
  const flattenedData = computed(() => {
    const data = options.data();
    if (!data || data.length === 0) return [];

    return getTreeData(data);
  });

  /**
   * 判断行是否有子节点
   */
  const hasChildren = (row: any): boolean => {
    const key = getRowKey(row);
    const treeNode = treeData.value[key];

    if (!treeNode) return false;

    if (treeNode.lazy) return true;

    return treeNode.children.length > 0;
  };

  /**
   * 获取树节点信息
   */
  const getTreeNode = (row: any): TreeNode | undefined => {
    const key = getRowKey(row);
    return treeData.value[key];
  };

  /**
   * 切换行的展开/折叠状态
   */
  const toggleRowExpansion = async (row: any) => {
    const key = getRowKey(row);
    const treeNode = treeData.value[key];

    if (!treeNode) return;

    if (treeNode.lazy && !treeNode.loaded && !treeNode.loading) {
      await loadData(row, key);
    }

    treeNode.expanded = !treeNode.expanded;
    options.emit("expand-change", row, treeNode.expanded);
  };

  /**
   * 懒加载子节点数据
   */
  const loadData = async (row: any, key: string | number) => {
    const treeNode = treeData.value[key];
    if (!treeNode || !options.load) return;

    treeNode.loading = true;
    triggerRef(treeData);

    return new Promise<void>((resolve) => {
      // 调用外部提供的load方法
      options.load!(row, treeNode, (children: any[]) => {
        lazyTreeNodeMap.value[key] = children; // 外部传进来的数据缓存

        treeNode.loaded = true;
        treeNode.loading = false;
        treeNode.children = children.map(getRowKey);

        // 构建子节点数据
        normalize(children, treeNode.level + 1);
        triggerRef(treeData);
        resolve();
      });
    });
  };

  /**
   * 展开所有节点
   */
  const expandAllTreeNodes = () => {
    Object.keys(treeData.value).forEach((key) => {
      if (treeData.value[key].children.length > 0) {
        treeData.value[key].expanded = true;
      }
    });
    triggerRef(treeData);
  };

  /**
   * 折叠所有节点
   */
  const collapseAllTreeNodes = () => {
    Object.keys(treeData.value).forEach((key) => {
      treeData.value[key].expanded = false;
    });
    triggerRef(treeData);
  };

  /**
   * 根据 key 从原始数据中查找行
   */
  const findRowByKey = (
    targetKey: string | number,
    data: any[] = options.data(),
  ): any => {
    for (const row of data) {
      const key = getRowKey(row);
      if (String(key) === String(targetKey)) {
        return row;
      }

      const children = row[childrenField.value];
      if (Array.isArray(children)) {
        const found = findRowByKey(targetKey, children);
        if (found) return found;
      }
    }

    return null;
  };

  /**
   * 获取所有展开的行
   */
  const getExpandedRows = () => {
    const expandedKeys = Object.keys(treeData.value).filter(
      (key) => treeData.value[key].expanded,
    );

    return expandedKeys
      .map((key) => findRowByKey(key, options.data()))
      .filter(Boolean);
  };

  /**
   * 获取节点的父节点 key
   */
  const getParentKey = (row: any): string | number | null => {
    const key = getRowKey(row);
    return treeData.value[key]?.parentKey ?? null;
  };

  /**
   * 获取节点的所有子孙节点（递归）
   */
  const getAllDescendants = (row: any): any[] => {
    const result: any[] = [];
    const children = row[childrenField.value];

    if (Array.isArray(children)) {
      children.forEach((child: any) => {
        result.push(child);
        result.push(...getAllDescendants(child));
      });
    }

    return result;
  };

  /**
   * 获取节点的所有祖先节点（从父到根）
   */
  const getAllAncestors = (row: any): any[] => {
    const result: any[] = [];
    let currentKey = getParentKey(row);

    while (currentKey !== null) {
      const parentRow = findRowByKey(row);
      if (parentRow) {
        result.push(parentRow);
        currentKey = getParentKey(row);
      } else {
        break;
      }
    }

    return result;
  };

  watch(
    () => options.data(),
    (data) => {
      if (!data || data.length === 0) {
        treeData.value = {};
        return;
      }
      treeData.value = {};
      normalize(data);
    },
    { immediate: true, deep: true },
  );

  return {
    treeData,
    flattenedData,
    getRowKey,
    hasChildren,
    getTreeNode,
    toggleRowExpansion,
    expandAllTreeNodes,
    collapseAllTreeNodes,
    getExpandedRows,
    getParentKey,
    getAllAncestors,
    childrenField,
  };
};
