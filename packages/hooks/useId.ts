import { computed, type Ref } from "vue";

const defaultIdInjection = {
  prefix: Math.floor(Math.random() * 10000), // 随机前缀
  current: 0,
};

/**
 * 生成唯一id
 * @param namespace 命名空间
 * @returns 唯一id
 */
export const useId = (namespace = "er"): Ref<string> => {
  const idRef = computed(
    () =>
      `${namespace}-${
        defaultIdInjection.prefix
      }-${defaultIdInjection.current++}`
  );

  return idRef;
};

/**
 * 生成唯一id
 * @param namespace 命名空间
 * @returns 唯一id
 */
export default useId;
