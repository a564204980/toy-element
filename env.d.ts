/// <reference types="vite/client" />

// Vue 类型声明
declare module "*.vue" {
    import type { DefineComponent } from "vue";
    const component: DefineComponent<{}, {}, any>;
    export default component;
}

// 环境变量
declare const DEV: boolean;
declare const PROD: boolean;
declare const TEST: boolean;
