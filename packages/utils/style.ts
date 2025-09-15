import { debugWarn } from "./error";
import { isNumber, isString } from "lodash-es";

const SCOPE = "utils/style" as const;

// 检查字符串是否为数字
const isStringNumber = (val: string): boolean => {
  // 不是字符串
  if (!isString(val)) return false;
  return !Number.isNaN(Number(val));
};

/**
 * 为数值添加单位
 * @param val 数值
 * @param defaultUnit 单位
 * @returns 数值 + 单位
 */
export function addUnit(val: string | number, defaultUnit = "px") {
  if (!val) return "";

  if (isNumber(val) || isStringNumber(val)) {
    return `${val}${defaultUnit}`;
  }

  if (isString(val)) {
    return val;
  }

  debugWarn(SCOPE, `val: ${val} 不是数字，也不是可表示为数字的字符串`);
}
