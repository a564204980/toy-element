import { isString } from "lodash-es";

class ErUiError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = "ErUiError";
  }
}

/**
 * 抛出一个带有作用域标识的 ErUiError 错误
 * @param scope 错误的作用域标识，会显示在错误信息的开头
 * @param msg 错误的具体信息
 * @throws ErUiError 带有格式化消息的错误对象
 */

const createErUiError = (scope: string, msg: string) => {
  return new ErUiError(`[${scope}]: ${msg}`);
};

export function throwError(scope: string, msg: string) {
  throw createErUiError(scope, msg);
}

export function debugWarn(error: Error): void;
export function debugWarn(scope: string, msg: string): void;

/**
 * 在非生产环境中输出警告信息
 * @param scope 错误实例或作用域标识字符串
 * @param msg 当scope为字符串时，此参数为具体的警告信息
 */
export function debugWarn(scope: string | Error, msg?: string) {
  if (process.env.NODE_ENV !== "production") {
    const err = isString(scope) ? createErUiError(scope, msg!) : scope;
    console.warn(err);
  }
}
