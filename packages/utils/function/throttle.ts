interface ThrottleOptions {
  leading?: boolean; // 是否在开始时执行
  trailing?: boolean; // 是否在结束时执行
}

/**
 * 节流-只在开始时执行
 * @param fn 执行函数
 * @param delay 延迟时间
 * @param options 配置项
 */
export const throttle = <T extends (...args: any[]) => any>(
  fn: T,
  delay: number,
  options?: ThrottleOptions
): ((...args: Parameters<T>) => void) => {
  const { leading = true, trailing = true } = options || {};

  let lastTime = 0; // 上次执行时间
  let timerId: any = null;
  let lastArgs: Parameters<T> | null = null; // 最后一次调用的参数

  const execute = (...args: Parameters<T>) => {
    lastTime = Date.now();
    fn(...args);
  };

  const clearTimer = () => {
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
    }
  };

  return (...args: Parameters<T>) => {
    const now = Date.now();
    lastArgs = args;

    // 第一次开始的时候就调用
    if (lastTime === 0) {
      if (leading) {
        execute(...args);
      } else {
        lastTime = now; // 记录起始时间
      }

      return;
    }

    const timeSinceLastExec = now - lastTime; // 从上次执行到现在的时间

    // 延迟时间内调用
    if (timeSinceLastExec < delay) {
      if (trailing) {
        clearTimer();
        timerId = setTimeout(() => {
          if (lastArgs) {
            execute(...lastArgs);
            lastArgs = null;
          }
          timerId = null;
        }, delay - timeSinceLastExec);
      }

      return;
    }

    execute(...args);
  };
};
