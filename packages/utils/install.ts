import { each } from "lodash-es";
import type { App, Plugin } from "vue";

type SFCWithInstall<T> = T & Plugin;

/**
 * 插件安装器-用于批量安装插件
 * @param components 插件列表
 * @returns 插件安装函数
 */
export const makeInstaller = (components: Plugin[]) => {
  const installer = (app: App) => each(components, (c) => app.use(c));
  return installer as Plugin;
};

/**
 * 给组件添加install方法，从而可以通过app.use()安装组件
 * @template T 组件类型
 * @param component 需要包装的组件
 * @return 包装后的组件，增加了install方法
 */
export const withInstall = <T>(component: T) => {
  (component as SFCWithInstall<T>).install = (app: App) => {
    const name = (component as any).name;
    app.component(name, component as Plugin); // 单个注册组件
  };

  console.log("component", component);
  return component as SFCWithInstall<T>;
};
