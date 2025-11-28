import { describe, expect, it } from "vitest";
import {
  debugWarn,
  makeInstaller,
  withInstall,
  throwError,
  typeIconMap,
} from "../index";
import { each } from "lodash-es";

describe("utils/index", () => {
  it("debugWarn 应该被导出", () => {
    expect(debugWarn).toBeDefined();
  });

  it("throwError 应该被导出", () => {
    expect(throwError).toBeDefined();
  });

  it("makeInstaller 应该被导出", () => {
    expect(makeInstaller).toBeDefined();
  });

  it("withInstall 应该被导出", () => {
    expect(withInstall).toBeDefined();
  });

  it("typeIconMap 应该被导出", () => {
    expect(typeIconMap).toBeDefined();
    each(
      [
        ["info", "circle-info"],
        ["success", "check-circle"],
        ["warning", "circle-exclamation"],
        ["danger", "circle-xmark"],
        ["error", "circle-xmark"],
      ],
      ([type, icon]) => {
        expect(typeIconMap.get(type)).toBe(icon);
      }
    );
  });
});
