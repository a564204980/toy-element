import { ref, unref } from "vue";

export const defaultNamespace = "er";

const startPrefix = "is-";

/**
 * 依照bem规范生成类名
 * @param namespace - 命令空间，例如`er`
 * @param block - 块名称，例如`Button`
 * @param blockSuffix - 块后缀，例如`Block--disabled`
 * @param element - 元素名称，例如`Button__text`
 * @param modifier - 修饰符名称，例如`Button--disabled`
 */
const _bem = (
  namespace: string,
  block: string,
  blockSuffix: string,
  element: string,
  modifier: string
) => {
  let cls = `${namespace}-${block}`;
  if (blockSuffix) cls += `-${blockSuffix}`;
  if (element) cls += `__${element}`;
  if (modifier) cls += `--${modifier}`;

  return cls;
};

/**
 * 创建 BEM 规范的命名空间钩子
 *
 * @param block - 组件块名称 (e.g. 'button', 'input')
 * @param namespaceOverride - (可选) 覆盖默认的命名空间
 *
 * @example
 * const ns = useNamespace('button');
 * ns.b()       // "er-button"
 * ns.e('icon') // "er-button__icon"
 * ns.m('primary') // "er-button--primary"
 * ns.is('loading') // "is-loading"
 */
export const useNamespace = (block: string, namespaceOverride?: string) => {
  const namespace = ref(namespaceOverride || defaultNamespace);

  const b = (blockSuffix = "") =>
    _bem(unref(namespace), block, blockSuffix, "", "");

  const e = (element?: string) =>
    element ? _bem(unref(namespace), block, "", element, "") : "";

  const m = (modifier?: string) => {
    return modifier ? _bem(unref(namespace), block, "", "", modifier) : "";
  };

  const is = (name: string, state: boolean | undefined = true) => {
    return name && state ? `${startPrefix}${name}` : "";
  };

  return {
    namespace,
    b,
    e,
    m,
    is,
  };
};
