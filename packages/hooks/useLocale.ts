import { inject, type Ref } from "vue";
import { omit } from "lodash-es";
// i18nSymbol是依赖注入的key
import { createI18n, i18nSymbol, type I18nInstance } from "vue3-i18n";
import type { Language } from "@toy-element-clone/locale";
import English from "@toy-element-clone/locale/lang/en";

/**
 *  locale 插件
 * @param {Ref<Language>} [localeOverride] - 可选的响应式语言配置，用于局部覆盖全局语言设置
 * @returns {I18nInstance} - 语言实例
 */
export const useLocale = (localeOverride?: Ref<Language>) => {
  if (!localeOverride) {
    //   inject从上层组件获取i18n的实例
    return omit(
      <I18nInstance>(
        inject(
          i18nSymbol,
          createI18n({ locale: English.name, messages: { en: English.el } })
        )
      ),
      "install"
    );
  }

  return omit(
    createI18n({
      locale: localeOverride.value.name,
      messages: {
        en: English.el,
        [localeOverride.value.name]: localeOverride.value.el,
      },
    }),
    "install"
  );
};

export default useLocale;
