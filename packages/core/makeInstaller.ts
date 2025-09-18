import type { App, Plugin } from "vue";

import { each } from "lodash-es";
import {
  provideGlobalConfig,
  type ConfigProviderProps,
} from "@toy-element-clone/components";

/**
 * 插件安装器-用于批量安装插件
 * @param components 插件列表
 * @returns 插件安装函数
 */
export const makeInstaller = (components: Plugin[]) => {
  const installer = (app: App, opts?: ConfigProviderProps) => {
    each(components, (c) => app.use(c));
    if (opts) provideGlobalConfig(opts, app, true);
  };

  return installer as Plugin;
};

export default makeInstaller;
