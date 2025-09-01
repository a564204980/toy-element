import { isString } from "lodash-es";

/**
 * 自定义错误类，用于区分是组件库内部错误还是其他第三方库的错误
 */
class ErUiError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = "ErUiError";
  }
}

/**
 * 抛出错误
 * @param scope 错误作用域
 * @param msg 错误信息
 */
export const throwError = (scope: string, msg: string) => {
  throw new ErUiError(`[${scope}]:${msg}`);
};

// 函数重载
export function debugWarn(error: Error): void;
export function debugWarn(scope: string, msg: string): void;
export function debugWarn(scope: string | Error, msg?: string) {
  if (process.env.NODE_ENV !== "production") {
    const err = isString(scope) ? new ErUiError(`[${scope}] ${msg}`) : scope;
    console.warn(err);
  }
}
