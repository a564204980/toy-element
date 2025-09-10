import { isFunction, each } from "lodash-es";
import shell from "shelljs";
function hooksPlugin({
  rmFiles = [],
  beforeBuild,
  afterBuild
}) {
  return {
    name: "hooks-plugin",
    // 构建前的生命周期，会自动调用
    buildStart() {
      each(rmFiles, (fName) => shell.rm("-rf", fName));
      isFunction(beforeBuild) && beforeBuild();
    },
    // 构建后的生命周期，会自动调用
    buildEnd(err) {
      !err && isFunction(afterBuild) && afterBuild();
    }
  };
}
export {
  hooksPlugin
};
