import { each, isFunction, cloneDeep, assign } from "lodash-es";
import { watchEffect, useSlots, getCurrentInstance, type VNode } from "vue";

const _dfs = (nodes: VNode[], cb: (node: VNode) => void) =>
  each(nodes, (node) => {
    isFunction(cb) && cb(node);
    node.children && _dfs(node.children as VNode[], cb);
  });

export const useDisabledStyle = () => {
  const nodePropsMap = new Map();

  const instance = getCurrentInstance();
  const children = useSlots()?.default?.();

  watchEffect(() => {
    // 不是禁用状态
    if (!instance?.props?.disabled) {
      _dfs(children ?? [], (node) => {
        // 检查是否存在，不在就return
        if (!nodePropsMap.has(node)) return;
        node.props = nodePropsMap.get(node);
      });
      return;
    }

    _dfs(children ?? [], (node) => {
      // node.props 存储该节点的属性和特性
      if (!node.props) return;
      nodePropsMap.set(node, cloneDeep(node.props));
      node.props = assign(node?.props, {
        style: {
          cursor: "not-allowed",
          color: "var(--er-text-color-placeholder)",
        },
      });
    });
  });
};

export default useDisabledStyle;
