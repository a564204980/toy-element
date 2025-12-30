import type { InjectionKey } from "vue";

/**
 * 共享数据的结构
 */
export interface ScrollbarContext {
  scrollbarElement: any;
  wrapElement: any;
}

export const scrollbarContextKey: InjectionKey<ScrollbarContext> = Symbol(
  "scrollbarContextKey"
);
