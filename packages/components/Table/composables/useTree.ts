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
  load: (row: any, treeNode: TreeNode, resolve: (row: any) => void) => void;
  indent: () => number;
  defaultExpandAll: () => boolean;
  expandRowKeys: () => (string | number)[];
  emit: (event: "expand-change", row: any, expanded: boolean) => void;
}

export function useTree(options: UseTreeOptions) {
  const treeData = ref<Record<string | number, TreeNode>>({});
  const lazyTreeNodeMap = ref<Record<string | number, any[]>>({}); // 懒加载节点缓存数据

  // 子节点字段
  const childrenField = computed(
    () => options.treeProps()?.children || "children"
  );

  const hasChildrenField = computed(
    () => options?.treeProps()?.hasChildren || "hasChildren"
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
   * 建立treeData数据
   */
  const normalize = (data: any[], level: number = 0) => {
    data.forEach((row) => {
      const key = getRowKey(row);
      if (key === "") return;

      const children = row.children;

      treeData.value[key] = {
        level,
        expanded: false,
        children: children ? children.map(getRowKey) : [], // 等价于children.map((child) => getRowKey(child)
      };

      if (Array.isArray(children) && children.length > 0) {
        normalize(children, level + 1);
      }
    });
  };
}
