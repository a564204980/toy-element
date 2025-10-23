import { each } from "lodash-es";
import type { App, Plugin } from "vue";

type SFCWithInstall<T> = T & Plugin; // 从类型上约束组件必须同时具备install方法

/**
 * 创建一个插件安装器函数
 * @param components - 要安装的插件数组, 每个插件必须包含install方法
 * @returns 返回一个函数，该函数接收Vue应用实例并安装所有组件
 */
export const makeInstaller = (components: Plugin[]) => {
  // 遍历所有组件并注册到Vue应用中
  const installer = (app: App) => each(components, (c) => app.use(c)); // app.use内部会调用install方法，真正的注册组件
  return installer as Plugin;
};

/**
 * 为组件添加插件安装功能
 * @param component - 需要添加安装功能的组件
 * @returns 返回带有安装功能的组件
 */
export const withInstall = <T>(component: T) => {
  // 为组件添加install方法
  (component as SFCWithInstall<T>).install = (app: App) => {
    // 获取组件名称并将其注册为全局组件
    const name = (component as any).name;
    app.component(name, component as Plugin);
  };

  return component as SFCWithInstall<T>;
};
