import type { Plugin } from "vue";
import { describe, it, expect } from "vitest";
import { map, get } from "lodash-es";
import {
  ErAlert,
  ErButton,
  ErButtonGroup,
  ErCollapse,
  ErCollapseItem,
  ErIcon,
} from "../index";

const comps = [
  ErAlert,
  ErButton,
  ErButtonGroup,
  ErCollapse,
  ErCollapseItem,
  ErIcon,
] as Plugin[];

describe("components/index", () => {
  it.each(map(comps, (c) => [get(c, "name") ?? "", c]))(
    "%s 组件应该能正常注册",
    (_, component) => {
      expect(component).toBeDefined();
      expect(component.install).toBeDefined();
    }
  );
});
