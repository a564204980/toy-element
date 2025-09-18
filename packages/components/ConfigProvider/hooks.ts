import { merge } from "lodash-es";
import {
  configProviderContextKey,
  type ConfigProviderContext,
} from "./constance";
import { createI18n, i18nSymbol } from "vue3-i18n";
import { debugWarn } from "@toy-element-clone/utils";
import English from "@toy-element-clone/locale/lang/en";
import { ref, getCurrentInstance, inject, computed, provide, unref } from "vue";

import type { MaybeRef, Ref, App } from "vue";
import type { TranslatePair } from "@toy-element-clone/locale";

const globalConfig = ref<ConfigProviderContext>();

// 函数重载，让同一个函数在不同调用方式下，都能获得精确的类型提示和约束

export function useGlobalConfig<
  K extends keyof ConfigProviderContext,
  D extends ConfigProviderContext[K]
  // 必传参数K必须是ConfigProviderContext中存在的键
  // Exclude排除void类型
>(key: K, defaultValue?: D): Ref<Exclude<ConfigProviderContext[K], void>>;
export function useGlobalConfig(): Ref<ConfigProviderContext>;
// 实际实现的函数，第一个参数可传可不穿，第二个参数用显示的默认值来覆盖可传可不传的
export function useGlobalConfig(
  key?: keyof ConfigProviderContext,
  defaultValue = void 0
) {
  const config = getCurrentInstance()
    ? inject(configProviderContextKey, globalConfig)
    : globalConfig;

  return key ? computed(() => config.value?.[key] ?? defaultValue) : config;
}

const _createI18n = (opts?: ConfigProviderContext) => {
  const mergeMsg = (msg: TranslatePair) =>
    merge(msg, opts?.extendsI18nMsg ?? {});

  if (!opts?.local)
    return createI18n({
      locale: "en",
      messages: mergeMsg({ en: English.el }),
    });

  return createI18n({
    locale: opts.local?.name || "en",
    messages: {
      en: English.el,
      [opts.local?.name || "en"]: opts.local?.el ?? {},
    },
  });
};

export const provideGlobalConfig = (
  config: MaybeRef<ConfigProviderContext>,
  app?: App, // 应用级注入时传入app
  global = false // 是否为全局配置
) => {
  const instance = getCurrentInstance();
  const oldConfig = instance ? useGlobalConfig() : void 0; // 若在组件中，则获取当前组件的全局配置
  const provideFn = app?.provide ?? (instance ? provide : void 0); // 如果没有全局的provide函数，则使用当前组件的provide函数

  if (!provideFn) {
    debugWarn(
      "provideGlobalConfig",
      "provideGlobalConfig() 该函数只能在组件 setup 或应用初始化时使用"
    );
    return;
  }

  const context = computed(() => {
    const cfg = unref(config); // unref解包ref，获取其实际值
    if (!oldConfig?.value) return cfg;
    return merge(oldConfig.value, cfg);
  });

  const i18n = computed(() => _createI18n(context.value));

  provideFn(configProviderContextKey, context);
  provideFn(i18nSymbol, i18n.value);

  if (app) app.use(i18n.value);
  if (global || !globalConfig.value) globalConfig.value = context.value;

  return context;
};
