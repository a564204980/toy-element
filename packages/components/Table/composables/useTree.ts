import { computed, ref } from "vue";
import { debugWarn } from "@toy-element/utils";

export interface TreeNode {
  children: (string | number)[]; // 子节点数据
  level: number; // 层级
  expanded: boolean; // 是否展开
  lazy?: boolean; // 是否懒加载节点
  loaded?: boolean; // 懒加载数据是否已加载
  loading?: boolean; // 是否正在加载中
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
  const shouldExpand = (key: string | number): boolean => {
    if (options.defaultExpandAll()) return true;
    return options.expandRowKeys().includes(key);
  };

  /**
   * 初始化treeData数据
   */
  const normalize = (data: any[], level: number = 0) => {
    data.forEach((row) => {
      const key = getRowKey(row);
      if (key === "") return;

      const children = row[childrenField.value];
      const hasChildrenFlag = row[hasChildrenField.value];

      treeData.value[key] = {
        level,
        expanded: shouldExpand(key),
        children: children ? children.map(getRowKey) : [], // 等价于children.map((child) => getRowKey(child)
        lazy: options.lazy() && hasChildrenFlag,
        loaded: false, // 是否已经加载完成
        loading: false, // 是否正在加载
      };

      if (Array.isArray(children) && children.length > 0) {
        normalize(children, level + 1);
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

    treeData.value = {};
    normalize(data);

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

    return new Promise<void>((resolve) => {
      // 调用外部提供的load方法
      options.load!(row, treeNode, (children: any[]) => {
        lazyTreeNodeMap.value[key] = children; // 外部传进来的数据缓存

        treeNode.loaded = true;
        treeNode.loading = false;
        treeNode.children = children.map(getRowKey);

        // 构建子节点数据
        normalize(children, treeNode.level + 1);

        resolve();
      });
    });
  };

  return {
    treeData,
    flattenedData,
    getRowKey,
    hasChildren,
    getTreeNode,
    toggleRowExpansion,
  };
};
