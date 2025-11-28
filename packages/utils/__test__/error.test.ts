import { describe, expect, vi, it } from "vitest";
import { throwError, debugWarn } from "../error";

describe("error", () => {
  it("throwError 函数应该正常工作", () => {
    expect(() => throwError("scope", "msg")).toThrowError("[scope]: msg");
  });

  it("debugWarn 函数应该正常工作", () => {
    // vi.spyOn 监听console
    // .mockImplementation(() => vi.fn) 模拟实现
    const warn = vi.spyOn(console, "warn").mockImplementation(() => vi.fn());
    debugWarn("scope", "message");
    debugWarn(new SyntaxError("custom error"));
    // warn 是之前通过 vi.spyOn 获取的监听对象
    // mock.calls 是一个数组，记录了 console.warn 被调用的所有情况
    expect(warn.mock.calls).toMatchInlineSnapshot(`
      [
        [
          [ErUiError: [scope]: message],
        ],
        [
          [SyntaxError: custom error],
        ],
      ]
    `);
  });
});
