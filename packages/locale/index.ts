import { default as en } from "./lang/en";
import { default as ja } from "./lang/ja";
import { default as ko } from "./lang/ko";
import { default as zh_cn } from "./lang/zh-cn";
import { default as zh_tw } from "./lang/zh-tw";

export type TranslatePair = {
  // TranslatePair 表示嵌套结构
  [key: string]: string | string[] | TranslatePair;
};

export type Language = {
  name: string;
  el: TranslatePair;
};

// 导出所有语言包
export { en, ja, ko, zh_cn, zh_tw };
