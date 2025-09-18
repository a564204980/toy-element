import type { Language, TranslatePair } from "@toy-element-clone/locale";

export interface ConfigProviderProps {
  local?: Language;
  extendsI18nMsg?: TranslatePair; // 扩展 i18n 消息
}
