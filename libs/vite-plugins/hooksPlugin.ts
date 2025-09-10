import { each, isFunction } from "lodash-es";
import shell from "shelljs";

/**
 * 插件钩子函数
 * @param {Object} options - 插件选项
 * @param {Array} options.rmFiles - 构建前需要删除的文件列表
 * @param {Function} options.beforeBuild - 构建前执行的函数
 * @param {Function} options.afterBuild - 构建后执行的函数
 */
export default function hooksPlugin({
  rmFiles = [],
  beforeBuild,
  afterBuild,
}: {
  rmFiles?: string[];
  beforeBuild?: Function;
  afterBuild?: Function;
}) {
  return {
    name: "hooks-plugin",
    // 构建前的生命周期，会自动调用
    buildStart() {
      // 构建前删除指定文件 “-rf” 是指递归删除
      each(rmFiles, (fName) => shell.rm("-rf", fName));
      isFunction(beforeBuild) && beforeBuild();
    },
    // 构建后的生命周期，会自动调用
    buildEnd(err?: Error) {
      // 构建结束后执行的函数
      !err && isFunction(afterBuild) && afterBuild();
    },
  };
}
