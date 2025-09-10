var Go = Object.defineProperty;
var Yo = (e, t, o) => t in e ? Go(e, t, { enumerable: !0, configurable: !0, writable: !0, value: o }) : e[t] = o;
var Z = (e, t, o) => (Yo(e, typeof t != "symbol" ? t + "" : t, o), o);
import { openBlock as $, createElementBlock as S, createElementVNode as T, ref as P, defineComponent as pe, useAttrs as Xo, computed as F, watchEffect as fe, nextTick as Ot, Fragment as ie, createCommentVNode as te, unref as y, renderList as Tt, mergeProps as We, createBlock as J, normalizeClass as D, normalizeStyle as De, withCtx as M, renderSlot as j, createVNode as N, isVNode as Ve, onMounted as Ye, onBeforeUnmount as Ko, watch as gt, resolveDynamicComponent as je, normalizeProps as xt, createTextVNode as re, toDisplayString as Oe, pushScopeId as Qo, popScopeId as Jo, guardReactiveProps as ei, withScopeId as ti, resolveComponent as Ne, withKeys as oi } from "vue";
const Dt = (e, t) => {
  const o = e.__vccOpts || e;
  for (const [i, n] of t)
    o[i] = n;
  return o;
}, ii = {}, ni = {
  t: "1661231422733",
  class: "icon",
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "3259",
  width: "20",
  height: "20"
};
function si(e, t) {
  return $(), S("svg", ni, [...t[0] || (t[0] = [
    T("path", {
      d: "M682.666667 810.666667c-12.8 0-21.333333-4.266667-29.866667-12.8-17.066667-17.066667-17.066667-42.666667 0-59.733334l226.133333-226.133333-226.133333-226.133333c-17.066667-17.066667-17.066667-42.666667 0-59.733334s42.666667-17.066667 59.733333 0l256 256c17.066667 17.066667 17.066667 42.666667 0 59.733334l-256 256c-8.533333 8.533333-17.066667 12.8-29.866666 12.8zM341.333333 810.666667c-12.8 0-21.333333-4.266667-29.866666-12.8l-256-256c-17.066667-17.066667-17.066667-42.666667 0-59.733334l256-256c17.066667-17.066667 42.666667-17.066667 59.733333 0s17.066667 42.666667 0 59.733334L145.066667 512l226.133333 226.133333c17.066667 17.066667 17.066667 42.666667 0 59.733334-8.533333 8.533333-17.066667 12.8-29.866667 12.8z",
      "p-id": "3260"
    }, null, -1)
  ])]);
}
const Mt = /* @__PURE__ */ Dt(ii, [["render", si]]), ri = {}, ai = {
  t: "1661231449868",
  class: "icon",
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "3541",
  width: "20",
  height: "20"
};
function li(e, t) {
  return $(), S("svg", ai, [...t[0] || (t[0] = [
    T("path", {
      d: "M305.6 225.6c-17.6-17.6-43.2-17.6-59.2 0L19.2 460.8c-25.6 30.4-25.6 72 0 97.6l225.6 235.2c8 8 20.8 12.8 30.4 12.8s20.8-4.8 30.4-12.8c17.6-17.6 17.6-43.2 0-59.2L88 512l217.6-225.6c17.6-17.6 17.6-43.2 0-60.8zM1001.6 460.8L774.4 225.6c-17.6-17.6-43.2-17.6-59.2 0s-17.6 43.2 0 59.2L932.8 512 715.2 737.6c-17.6 17.6-17.6 43.2 0 59.2 8 8 17.6 12.8 30.4 12.8 12.8 0 20.8-4.8 30.4-12.8l225.6-235.2c28.8-28.8 28.8-70.4 0-100.8zM612.8 230.4c-20.8-8-46.4 4.8-56 25.6L382.4 742.4c-8 20.8 4.8 46.4 25.6 56 4.8 0 8 4.8 12.8 4.8 17.6 0 33.6-12.8 38.4-30.4l179.2-491.2c8-20.8-4.8-46.4-25.6-51.2z",
      "p-id": "3542"
    }, null, -1)
  ])]);
}
const Ht = /* @__PURE__ */ Dt(ri, [["render", li]]), ci = {}, di = {
  viewBox: "0 0 544 560",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
};
function ui(e, t) {
  return $(), S("svg", di, [...t[0] || (t[0] = [
    T("path", {
      d: "M399.503 143.667C399.319 152.501 406.332 159.812 415.167 159.997C424.001 160.181 431.312 153.168 431.497 144.333L399.503 143.667ZM416 120L431.997 120.333C431.999 120.207 432 120.081 432 119.954L416 120ZM360 64L360.046 48.0001C360.03 48 360.015 48 360 48L360 64ZM144 64V48C143.984 48 143.968 48 143.953 48.0001L144 64ZM80 128L64.0001 127.953C64 127.968 64 127.984 64 128L80 128ZM80 344H64C64 344.015 64 344.03 64.0001 344.046L80 344ZM136 400L135.954 416C135.97 416 135.985 416 136 416L136 400ZM160 416C168.837 416 176 408.837 176 400C176 391.163 168.837 384 160 384V416ZM217 160H439V128H217V160ZM439 160C461.644 160 480 178.356 480 201H512C512 160.683 479.317 128 439 128V160ZM480 201V423H512V201H480ZM480 423C480 445.644 461.644 464 439 464V496C479.317 496 512 463.317 512 423H480ZM439 464H217V496H439V464ZM217 464C194.356 464 176 445.644 176 423H144C144 463.317 176.683 496 217 496V464ZM176 423V201H144V423H176ZM176 201C176 178.356 194.356 160 217 160V128C176.683 128 144 160.683 144 201H176ZM431.497 144.333L431.997 120.333L400.003 119.667L399.503 143.667L431.497 144.333ZM432 119.954C431.946 100.888 424.347 82.6173 410.865 69.1349L388.238 91.7624C395.741 99.2658 399.97 109.434 400 120.046L432 119.954ZM410.865 69.1349C397.383 55.6526 379.112 48.0543 360.046 48.0001L359.954 79.9999C370.566 80.0301 380.734 84.2589 388.238 91.7624L410.865 69.1349ZM360 48H144V80H360V48ZM143.953 48.0001C122.767 48.0627 102.467 56.5064 87.4868 71.4868L110.114 94.1142C119.117 85.1118 131.316 80.0376 144.047 79.9999L143.953 48.0001ZM87.4868 71.4868C72.5064 86.4673 64.0627 106.767 64.0001 127.953L95.9999 128.047C96.0376 115.316 101.112 103.117 110.114 94.1142L87.4868 71.4868ZM64 128V344H96V128H64ZM64.0001 344.046C64.0543 363.112 71.6526 381.383 85.1349 394.865L107.762 372.238C100.259 364.734 96.0301 354.566 95.9999 343.954L64.0001 344.046ZM85.1349 394.865C98.6173 408.347 116.888 415.946 135.954 416L136.046 384C125.434 383.97 115.266 379.741 107.762 372.238L85.1349 394.865ZM136 416H160V384H136V416Z",
      fill: "currentColor"
    }, null, -1)
  ])]);
}
const Lt = /* @__PURE__ */ Dt(ci, [["render", ui]]), rt = "vitepress-demo-preview", at = (e, t, o, i) => {
  let n = t === "" ? `${e}` : `${e}-${t}`;
  return o && (n += `__${o}`), i && (n += `--${i}`), n;
}, Nt = (e = "") => ({
  b: () => at(rt, e),
  e: (s = "") => at(rt, e, s),
  m: (s = "") => at(rt, e, "", s),
  bem: (s, r, l) => at(rt, s, r, l)
}), Rt = () => {
  const e = P(!0);
  return {
    isCodeFold: e,
    setCodeFold: (o) => {
      e.value = o;
    }
  };
};
let St = 1;
var pi = class {
  constructor() {
    Z(this, "subscribers");
    Z(this, "toasts");
    Z(this, "dismissedToasts");
    Z(this, "subscribe", (e) => (this.subscribers.push(e), () => {
      const t = this.subscribers.indexOf(e);
      this.subscribers.splice(t, 1);
    }));
    Z(this, "publish", (e) => {
      this.subscribers.forEach((t) => t(e));
    });
    Z(this, "addToast", (e) => {
      this.publish(e), this.toasts = [...this.toasts, e];
    });
    Z(this, "create", (e) => {
      var r;
      const { message: t, ...o } = e, i = typeof e.id == "number" || e.id && ((r = e.id) == null ? void 0 : r.length) > 0 ? e.id : St++, n = this.toasts.find((l) => l.id === i), s = e.dismissible === void 0 ? !0 : e.dismissible;
      return this.dismissedToasts.has(i) && this.dismissedToasts.delete(i), n ? this.toasts = this.toasts.map((l) => l.id === i ? (this.publish({
        ...l,
        ...e,
        id: i,
        title: t
      }), {
        ...l,
        ...e,
        id: i,
        dismissible: s,
        title: t
      }) : l) : this.addToast({
        title: t,
        ...o,
        dismissible: s,
        id: i
      }), i;
    });
    Z(this, "dismiss", (e) => (e ? (this.dismissedToasts.add(e), requestAnimationFrame(() => this.subscribers.forEach((t) => t({
      id: e,
      dismiss: !0
    })))) : this.toasts.forEach((t) => {
      this.subscribers.forEach((o) => o({
        id: t.id,
        dismiss: !0
      }));
    }), e));
    Z(this, "message", (e, t) => this.create({
      ...t,
      message: e,
      type: "default"
    }));
    Z(this, "error", (e, t) => this.create({
      ...t,
      type: "error",
      message: e
    }));
    Z(this, "success", (e, t) => this.create({
      ...t,
      type: "success",
      message: e
    }));
    Z(this, "info", (e, t) => this.create({
      ...t,
      type: "info",
      message: e
    }));
    Z(this, "warning", (e, t) => this.create({
      ...t,
      type: "warning",
      message: e
    }));
    Z(this, "loading", (e, t) => this.create({
      ...t,
      type: "loading",
      message: e
    }));
    Z(this, "promise", (e, t) => {
      if (!t)
        return;
      let o;
      t.loading !== void 0 && (o = this.create({
        ...t,
        promise: e,
        type: "loading",
        message: t.loading,
        description: typeof t.description != "function" ? t.description : void 0
      }));
      const i = Promise.resolve(e instanceof Function ? e() : e);
      let n = o !== void 0, s;
      const r = i.then(async (a) => {
        if (s = ["resolve", a], Ve(a))
          n = !1, this.create({
            id: o,
            type: "default",
            message: a
          });
        else if (fi(a) && !a.ok) {
          n = !1;
          const f = typeof t.error == "function" ? await t.error(`HTTP error! status: ${a.status}`) : t.error, m = typeof t.description == "function" ? await t.description(`HTTP error! status: ${a.status}`) : t.description, u = typeof f == "object" && !Ve(f) ? f : {
            message: f || "",
            id: o || ""
          };
          this.create({
            id: o,
            type: "error",
            description: m,
            ...u
          });
        } else if (a instanceof Error) {
          n = !1;
          const f = typeof t.error == "function" ? await t.error(a) : t.error, m = typeof t.description == "function" ? await t.description(a) : t.description, u = typeof f == "object" && !Ve(f) ? f : {
            message: f || "",
            id: o || ""
          };
          this.create({
            id: o,
            type: "error",
            description: m,
            ...u
          });
        } else if (t.success !== void 0) {
          n = !1;
          const f = typeof t.success == "function" ? await t.success(a) : t.success, m = typeof t.description == "function" ? await t.description(a) : t.description, u = typeof f == "object" && !Ve(f) ? f : {
            message: f || "",
            id: o || ""
          };
          this.create({
            id: o,
            type: "success",
            description: m,
            ...u
          });
        }
      }).catch(async (a) => {
        if (s = ["reject", a], t.error !== void 0) {
          n = !1;
          const p = typeof t.error == "function" ? await t.error(a) : t.error, f = typeof t.description == "function" ? await t.description(a) : t.description, h = typeof p == "object" && !Ve(p) ? p : {
            message: p || "",
            id: o || ""
          };
          this.create({
            id: o,
            type: "error",
            description: f,
            ...h
          });
        }
      }).finally(() => {
        var a;
        n && (this.dismiss(o), o = void 0), (a = t.finally) == null || a.call(t);
      }), l = () => new Promise((a, p) => r.then(() => s[0] === "reject" ? p(s[1]) : a(s[1])).catch(p));
      return typeof o != "string" && typeof o != "number" ? { unwrap: l } : Object.assign(o, { unwrap: l });
    });
    Z(this, "custom", (e, t) => {
      const o = (t == null ? void 0 : t.id) || St++, i = this.toasts.find((s) => s.id === o), n = (t == null ? void 0 : t.dismissible) === void 0 ? !0 : t.dismissible;
      return this.dismissedToasts.has(o) && this.dismissedToasts.delete(o), i ? this.toasts = this.toasts.map((s) => s.id === o ? (this.publish({
        ...s,
        component: e,
        dismissible: n,
        id: o,
        ...t
      }), {
        ...s,
        component: e,
        dismissible: n,
        id: o,
        ...t
      }) : s) : this.addToast({
        component: e,
        dismissible: n,
        id: o,
        ...t
      }), o;
    });
    Z(this, "getActiveToasts", () => this.toasts.filter((e) => !this.dismissedToasts.has(e.id)));
    this.subscribers = [], this.toasts = [], this.dismissedToasts = /* @__PURE__ */ new Set();
  }
};
const ee = new pi();
function hi(e, t) {
  const o = (t == null ? void 0 : t.id) || St++;
  return ee.create({
    message: e,
    id: o,
    type: "default",
    ...t
  }), o;
}
const fi = (e) => e && typeof e == "object" && "ok" in e && typeof e.ok == "boolean" && "status" in e && typeof e.status == "number", mi = hi, gi = () => ee.toasts, vi = () => ee.getActiveToasts(), yi = Object.assign(mi, {
  success: ee.success,
  info: ee.info,
  warning: ee.warning,
  error: ee.error,
  custom: ee.custom,
  message: ee.message,
  promise: ee.promise,
  dismiss: ee.dismiss,
  loading: ee.loading
}, {
  getHistory: gi,
  getToasts: vi
});
function lt(e) {
  return e.label !== void 0;
}
const wi = 3, Bo = "24px", ko = "16px", lo = 4e3, bi = 356, Ci = 14, $i = 45, Eo = 200;
function _i() {
  const e = P(!1);
  return fe(() => {
    const t = () => {
      e.value = document.hidden;
    };
    return document.addEventListener("visibilitychange", t), () => window.removeEventListener("visibilitychange", t);
  }), { isDocumentHidden: e };
}
function Te(...e) {
  return e.filter(Boolean).join(" ");
}
function Ti(e) {
  const [t, o] = e.split("-"), i = [];
  return t && i.push(t), o && i.push(o), i;
}
function xi(e, t) {
  const o = {};
  return [e, t].forEach((i, n) => {
    const s = n === 1, r = s ? "--mobile-offset" : "--offset", l = s ? ko : Bo;
    function a(p) {
      [
        "top",
        "right",
        "bottom",
        "left"
      ].forEach((f) => {
        o[`${r}-${f}`] = typeof p == "number" ? `${p}px` : p;
      });
    }
    typeof i == "number" || typeof i == "string" ? a(i) : typeof i == "object" ? [
      "top",
      "right",
      "bottom",
      "left"
    ].forEach((p) => {
      i[p] === void 0 ? o[`${r}-${p}`] = l : o[`${r}-${p}`] = typeof i[p] == "number" ? `${i[p]}px` : i[p];
    }) : a(l);
  }), o;
}
const Si = [
  "data-rich-colors",
  "data-styled",
  "data-mounted",
  "data-promise",
  "data-swiped",
  "data-removed",
  "data-visible",
  "data-y-position",
  "data-x-position",
  "data-index",
  "data-front",
  "data-swiping",
  "data-dismissible",
  "data-type",
  "data-invert",
  "data-swipe-out",
  "data-swipe-direction",
  "data-expanded",
  "data-testid"
], Ai = ["aria-label", "data-disabled"];
var Pi = /* @__PURE__ */ pe({
  __name: "Toast",
  props: {
    toast: {},
    toasts: {},
    index: {},
    swipeDirections: {},
    expanded: { type: Boolean },
    invert: { type: Boolean },
    heights: {},
    gap: {},
    position: {},
    visibleToasts: {},
    expandByDefault: { type: Boolean },
    closeButton: { type: Boolean },
    interacting: { type: Boolean },
    style: {},
    cancelButtonStyle: {},
    actionButtonStyle: {},
    duration: {},
    class: {},
    unstyled: { type: Boolean },
    descriptionClass: {},
    loadingIcon: {},
    classes: {},
    icons: {},
    closeButtonAriaLabel: {},
    defaultRichColors: { type: Boolean }
  },
  emits: [
    "update:heights",
    "update:height",
    "removeToast"
  ],
  setup(e, { emit: t }) {
    const o = e, i = t, n = P(null), s = P(null), r = P(!1), l = P(!1), a = P(!1), p = P(!1), f = P(!1), m = P(0), h = P(0), u = P(o.toast.duration || o.duration || lo), v = P(null), b = P(null), B = F(() => o.index === 0), _ = F(() => o.index + 1 <= o.visibleToasts), C = F(() => o.toast.type), A = F(() => o.toast.dismissible !== !1), R = F(() => o.toast.class || ""), H = F(() => o.descriptionClass || ""), Y = F(() => {
      const c = o.toast.position || o.position, O = o.heights.filter((z) => z.position === c).findIndex((z) => z.toastId === o.toast.id);
      return O >= 0 ? O : 0;
    }), W = F(() => {
      const c = o.toast.position || o.position;
      return o.heights.filter((O) => O.position === c).reduce((O, z, V) => V >= Y.value ? O : O + z.height, 0);
    }), U = F(() => Y.value * o.gap + W.value || 0), q = F(() => {
      var c;
      return (c = o.toast.closeButton) != null ? c : o.closeButton;
    }), d = F(() => o.toast.duration || o.duration || lo), w = P(0), g = P(0), x = P(null), k = F(() => o.position.split("-")), Q = F(() => k.value[0]), I = F(() => k.value[1]), X = F(() => typeof o.toast.title != "string"), K = F(() => typeof o.toast.description != "string"), { isDocumentHidden: oe } = _i(), ve = F(() => C.value && C.value === "loading");
    Ye(() => {
      r.value = !0, u.value = d.value;
    }), fe(async () => {
      if (!r.value || !b.value)
        return;
      await Ot();
      const c = b.value, L = c.style.height;
      c.style.height = "auto";
      const O = c.getBoundingClientRect().height;
      c.style.height = L, h.value = O, i("update:height", {
        toastId: o.toast.id,
        height: O,
        position: o.toast.position || o.position
      });
    });
    function he() {
      l.value = !0, m.value = U.value, setTimeout(() => {
        i("removeToast", o.toast);
      }, Eo);
    }
    function Re() {
      var c, L;
      if (ve.value || !A.value)
        return {};
      he(), (L = (c = o.toast).onDismiss) == null || L.call(c, o.toast);
    }
    function tt(c) {
      c.button !== 2 && (ve.value || !A.value || (v.value = new Date(), m.value = U.value, c.target.setPointerCapture(c.pointerId), c.target.tagName !== "BUTTON" && (a.value = !0, x.value = {
        x: c.clientX,
        y: c.clientY
      })));
    }
    function ot() {
      var G, ye, we, be, Ce, $e, _e;
      if (p.value || !A.value)
        return;
      x.value = null;
      const c = Number(((G = b.value) == null ? void 0 : G.style.getPropertyValue("--swipe-amount-x").replace("px", "")) || 0), L = Number(((ye = b.value) == null ? void 0 : ye.style.getPropertyValue("--swipe-amount-y").replace("px", "")) || 0), O = new Date().getTime() - (((we = v.value) == null ? void 0 : we.getTime()) || 0), z = n.value === "x" ? c : L, V = Math.abs(z) / O;
      if (Math.abs(z) >= $i || V > 0.11) {
        m.value = U.value, (Ce = (be = o.toast).onDismiss) == null || Ce.call(be, o.toast), n.value === "x" ? s.value = c > 0 ? "right" : "left" : s.value = L > 0 ? "down" : "up", he(), p.value = !0;
        return;
      } else
        ($e = b.value) == null || $e.style.setProperty("--swipe-amount-x", "0px"), (_e = b.value) == null || _e.style.setProperty("--swipe-amount-y", "0px");
      f.value = !1, a.value = !1, n.value = null;
    }
    function it(c) {
      var we, be, Ce, $e, _e, ze;
      if (!x.value || !A.value || ((Ce = (be = (we = window == null ? void 0 : window.getSelection()) == null ? void 0 : we.toString()) == null ? void 0 : be.length) != null ? Ce : !1))
        return;
      const O = c.clientY - x.value.y, z = c.clientX - x.value.x, V = ($e = o.swipeDirections) != null ? $e : Ti(o.position);
      !n.value && (Math.abs(z) > 1 || Math.abs(O) > 1) && (n.value = Math.abs(z) > Math.abs(O) ? "x" : "y");
      let G = {
        x: 0,
        y: 0
      };
      const ye = (le) => 1 / (1.5 + Math.abs(le) / 20);
      if (n.value === "y") {
        if (V.includes("top") || V.includes("bottom"))
          if (V.includes("top") && O < 0 || V.includes("bottom") && O > 0)
            G.y = O;
          else {
            const le = O * ye(O);
            G.y = Math.abs(le) < Math.abs(O) ? le : O;
          }
      } else if (n.value === "x" && (V.includes("left") || V.includes("right")))
        if (V.includes("left") && z < 0 || V.includes("right") && z > 0)
          G.x = z;
        else {
          const le = z * ye(z);
          G.x = Math.abs(le) < Math.abs(z) ? le : z;
        }
      (Math.abs(G.x) > 0 || Math.abs(G.y) > 0) && (f.value = !0), (_e = b.value) == null || _e.style.setProperty("--swipe-amount-x", `${G.x}px`), (ze = b.value) == null || ze.style.setProperty("--swipe-amount-y", `${G.y}px`);
    }
    Ye(() => {
      if (r.value = !0, !b.value)
        return;
      const c = b.value.getBoundingClientRect().height;
      h.value = c;
      const L = [{
        toastId: o.toast.id,
        height: c,
        position: o.toast.position
      }, ...o.heights];
      i("update:heights", L);
    }), Ko(() => {
      b.value && i("removeToast", o.toast);
    }), fe((c) => {
      if (o.toast.promise && C.value === "loading" || o.toast.duration === 1 / 0 || o.toast.type === "loading")
        return;
      let L;
      const O = () => {
        if (g.value < w.value) {
          const V = new Date().getTime() - w.value;
          u.value = u.value - V;
        }
        g.value = new Date().getTime();
      }, z = () => {
        u.value !== 1 / 0 && (w.value = new Date().getTime(), L = setTimeout(() => {
          var V, G;
          (G = (V = o.toast).onAutoClose) == null || G.call(V, o.toast), he();
        }, u.value));
      };
      o.expanded || o.interacting || oe.value ? O() : z(), c(() => {
        clearTimeout(L);
      });
    }), gt(() => o.toast.delete, (c) => {
      var L, O;
      c !== void 0 && c && (he(), (O = (L = o.toast).onDismiss) == null || O.call(L, o.toast));
    }, { deep: !0 });
    function nt() {
      a.value = !1, n.value = null, x.value = null;
    }
    return (c, L) => {
      var O, z, V, G, ye, we, be, Ce, $e, _e, ze, le, Ct, qt, Gt, Yt, Xt, Kt, Qt, Jt, eo, to, oo, io, no, so, ro, ao;
      return $(), S("li", {
        tabindex: "0",
        ref_key: "toastRef",
        ref: b,
        class: D(y(Te)(o.class, R.value, (O = c.classes) == null ? void 0 : O.toast, (z = c.toast.classes) == null ? void 0 : z.toast, (V = c.classes) == null ? void 0 : V[C.value], (ye = (G = c.toast) == null ? void 0 : G.classes) == null ? void 0 : ye[C.value])),
        "data-sonner-toast": "",
        "data-rich-colors": (we = c.toast.richColors) != null ? we : c.defaultRichColors,
        "data-styled": !Boolean(c.toast.component || ((be = c.toast) == null ? void 0 : be.unstyled) || c.unstyled),
        "data-mounted": r.value,
        "data-promise": Boolean(c.toast.promise),
        "data-swiped": f.value,
        "data-removed": l.value,
        "data-visible": _.value,
        "data-y-position": Q.value,
        "data-x-position": I.value,
        "data-index": c.index,
        "data-front": B.value,
        "data-swiping": a.value,
        "data-dismissible": A.value,
        "data-type": C.value,
        "data-invert": c.toast.invert || c.invert,
        "data-swipe-out": p.value,
        "data-swipe-direction": s.value,
        "data-expanded": Boolean(c.expanded || c.expandByDefault && r.value),
        "data-testid": c.toast.testId,
        style: De({
          "--index": c.index,
          "--toasts-before": c.index,
          "--z-index": c.toasts.length - c.index,
          "--offset": `${l.value ? m.value : U.value}px`,
          "--initial-height": c.expandByDefault ? "auto" : `${h.value}px`,
          ...c.style,
          ...o.toast.style
        }),
        onDragend: nt,
        onPointerdown: tt,
        onPointerup: ot,
        onPointermove: it
      }, [q.value && !c.toast.component && C.value !== "loading" ? ($(), S("button", {
        key: 0,
        "aria-label": c.closeButtonAriaLabel || "Close toast",
        "data-disabled": ve.value,
        "data-close-button": "true",
        class: D(y(Te)((Ce = c.classes) == null ? void 0 : Ce.closeButton, (_e = ($e = c.toast) == null ? void 0 : $e.classes) == null ? void 0 : _e.closeButton)),
        onClick: Re
      }, [(ze = c.icons) != null && ze.close ? ($(), J(je((le = c.icons) == null ? void 0 : le.close), { key: 0 })) : j(c.$slots, "close-icon", { key: 1 })], 10, Ai)) : te("v-if", !0), c.toast.component ? ($(), J(je(c.toast.component), We({ key: 1 }, c.toast.componentProps, { onCloseToast: Re }), null, 16)) : ($(), S(ie, { key: 2 }, [
        C.value !== "default" || c.toast.icon || c.toast.promise ? ($(), S("div", {
          key: 0,
          "data-icon": "",
          class: D(y(Te)((Ct = c.classes) == null ? void 0 : Ct.icon, (Gt = (qt = c.toast) == null ? void 0 : qt.classes) == null ? void 0 : Gt.icon))
        }, [c.toast.icon ? ($(), J(je(c.toast.icon), { key: 0 })) : ($(), S(ie, { key: 1 }, [C.value === "loading" ? j(c.$slots, "loading-icon", { key: 0 }) : C.value === "success" ? j(c.$slots, "success-icon", { key: 1 }) : C.value === "error" ? j(c.$slots, "error-icon", { key: 2 }) : C.value === "warning" ? j(c.$slots, "warning-icon", { key: 3 }) : C.value === "info" ? j(c.$slots, "info-icon", { key: 4 }) : te("v-if", !0)], 64))], 2)) : te("v-if", !0),
        T("div", {
          "data-content": "",
          class: D(y(Te)((Yt = c.classes) == null ? void 0 : Yt.content, (Kt = (Xt = c.toast) == null ? void 0 : Xt.classes) == null ? void 0 : Kt.content))
        }, [T("div", {
          "data-title": "",
          class: D(y(Te)((Qt = c.classes) == null ? void 0 : Qt.title, (Jt = c.toast.classes) == null ? void 0 : Jt.title))
        }, [X.value ? ($(), J(je(c.toast.title), xt(We({ key: 0 }, c.toast.componentProps)), null, 16)) : ($(), S(ie, { key: 1 }, [re(Oe(c.toast.title), 1)], 64))], 2), c.toast.description ? ($(), S("div", {
          key: 0,
          "data-description": "",
          class: D(y(Te)(c.descriptionClass, H.value, (eo = c.classes) == null ? void 0 : eo.description, (to = c.toast.classes) == null ? void 0 : to.description))
        }, [K.value ? ($(), J(je(c.toast.description), xt(We({ key: 0 }, c.toast.componentProps)), null, 16)) : ($(), S(ie, { key: 1 }, [re(Oe(c.toast.description), 1)], 64))], 2)) : te("v-if", !0)], 2),
        c.toast.cancel ? ($(), S("button", {
          key: 1,
          style: De(c.toast.cancelButtonStyle || c.cancelButtonStyle),
          class: D(y(Te)((oo = c.classes) == null ? void 0 : oo.cancelButton, (io = c.toast.classes) == null ? void 0 : io.cancelButton)),
          "data-button": "",
          "data-cancel": "",
          onClick: L[0] || (L[0] = (st) => {
            var Fe, Ie;
            !y(lt)(c.toast.cancel) || !A.value || ((Ie = (Fe = c.toast.cancel).onClick) == null || Ie.call(Fe, st), he());
          })
        }, Oe(y(lt)(c.toast.cancel) ? (no = c.toast.cancel) == null ? void 0 : no.label : c.toast.cancel), 7)) : te("v-if", !0),
        c.toast.action ? ($(), S("button", {
          key: 2,
          style: De(c.toast.actionButtonStyle || c.actionButtonStyle),
          class: D(y(Te)((so = c.classes) == null ? void 0 : so.actionButton, (ro = c.toast.classes) == null ? void 0 : ro.actionButton)),
          "data-button": "",
          "data-action": "",
          onClick: L[1] || (L[1] = (st) => {
            var Fe, Ie;
            !y(lt)(c.toast.action) || ((Ie = (Fe = c.toast.action).onClick) == null || Ie.call(Fe, st), !st.defaultPrevented && he());
          })
        }, Oe(y(lt)(c.toast.action) ? (ao = c.toast.action) == null ? void 0 : ao.label : c.toast.action), 7)) : te("v-if", !0)
      ], 64))], 46, Si);
    };
  }
}), Bi = Pi, et = (e, t) => {
  const o = e.__vccOpts || e;
  for (const [i, n] of t)
    o[i] = n;
  return o;
};
const ki = {}, Ei = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "12",
  height: "12",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stoke-width": "1.5",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};
function Oi(e, t) {
  return $(), S("svg", Ei, t[0] || (t[0] = [T("line", {
    x1: "18",
    y1: "6",
    x2: "6",
    y2: "18"
  }, null, -1), T("line", {
    x1: "6",
    y1: "6",
    x2: "18",
    y2: "18"
  }, null, -1)]));
}
var Di = /* @__PURE__ */ et(ki, [["render", Oi]]);
const Mi = ["data-visible"], Hi = { class: "sonner-spinner" };
var Li = /* @__PURE__ */ pe({
  __name: "Loader",
  props: { visible: { type: Boolean } },
  setup(e) {
    const t = Array(12).fill(0);
    return (o, i) => ($(), S("div", {
      class: "sonner-loading-wrapper",
      "data-visible": o.visible
    }, [T("div", Hi, [($(!0), S(ie, null, Tt(y(t), (n) => ($(), S("div", {
      key: `spinner-bar-${n}`,
      class: "sonner-loading-bar"
    }))), 128))])], 8, Mi));
  }
}), Ni = Li;
const Ri = {}, zi = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
};
function Fi(e, t) {
  return $(), S("svg", zi, t[0] || (t[0] = [T("path", {
    "fill-rule": "evenodd",
    d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
    "clip-rule": "evenodd"
  }, null, -1)]));
}
var Ii = /* @__PURE__ */ et(Ri, [["render", Fi]]);
const Vi = {}, ji = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
};
function Wi(e, t) {
  return $(), S("svg", ji, t[0] || (t[0] = [T("path", {
    "fill-rule": "evenodd",
    d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
    "clip-rule": "evenodd"
  }, null, -1)]));
}
var Zi = /* @__PURE__ */ et(Vi, [["render", Wi]]);
const Ui = {}, qi = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "currentColor",
  height: "20",
  width: "20"
};
function Gi(e, t) {
  return $(), S("svg", qi, t[0] || (t[0] = [T("path", {
    "fill-rule": "evenodd",
    d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
    "clip-rule": "evenodd"
  }, null, -1)]));
}
var Yi = /* @__PURE__ */ et(Ui, [["render", Gi]]);
const Xi = {}, Ki = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
};
function Qi(e, t) {
  return $(), S("svg", Ki, t[0] || (t[0] = [T("path", {
    "fill-rule": "evenodd",
    d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
    "clip-rule": "evenodd"
  }, null, -1)]));
}
var Ji = /* @__PURE__ */ et(Xi, [["render", Qi]]);
const en = ["aria-label"], tn = [
  "data-sonner-theme",
  "dir",
  "data-theme",
  "data-rich-colors",
  "data-y-position",
  "data-x-position"
], on = typeof window < "u" && typeof document < "u";
function nn() {
  if (typeof window > "u" || typeof document > "u")
    return "ltr";
  const e = document.documentElement.getAttribute("dir");
  return e === "auto" || !e ? window.getComputedStyle(document.documentElement).direction : e;
}
var sn = /* @__PURE__ */ pe({
  name: "Toaster",
  inheritAttrs: !1,
  __name: "Toaster",
  props: {
    id: {},
    invert: {
      type: Boolean,
      default: !1
    },
    theme: { default: "light" },
    position: { default: "bottom-right" },
    hotkey: { default: () => ["altKey", "KeyT"] },
    richColors: {
      type: Boolean,
      default: !1
    },
    expand: {
      type: Boolean,
      default: !1
    },
    duration: {},
    gap: { default: Ci },
    visibleToasts: { default: wi },
    closeButton: {
      type: Boolean,
      default: !1
    },
    toastOptions: { default: () => ({}) },
    class: { default: "" },
    style: {},
    offset: { default: Bo },
    mobileOffset: { default: ko },
    dir: { default: "auto" },
    swipeDirections: {},
    icons: {},
    containerAriaLabel: { default: "Notifications" }
  },
  setup(e) {
    const t = e, o = Xo(), i = P([]), n = F(() => t.id ? i.value.filter((d) => d.toasterId === t.id) : i.value.filter((d) => !d.toasterId));
    function s(d, w) {
      return n.value.filter((g) => !g.position && w === 0 || g.position === d);
    }
    const r = F(() => {
      const d = n.value.filter((w) => w.position).map((w) => w.position);
      return d.length > 0 ? Array.from(new Set([t.position].concat(d))) : [t.position];
    }), l = F(() => {
      const d = {};
      return r.value.forEach((w) => {
        d[w] = i.value.filter((g) => g.position === w);
      }), d;
    }), a = P([]), p = P({}), f = P(!1);
    fe(() => {
      r.value.forEach((d) => {
        d in p.value || (p.value[d] = !1);
      });
    });
    const m = P(t.theme !== "system" ? t.theme : typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"), h = P(null), u = P(null), v = P(!1), b = t.hotkey.join("+").replace(/Key/g, "").replace(/Digit/g, "");
    function B(d) {
      var w;
      (w = i.value.find((g) => g.id === d.id)) != null && w.delete || ee.dismiss(d.id), i.value = i.value.filter(({ id: g }) => g !== d.id), setTimeout(() => {
        i.value.find((g) => g.id === d.id) || (a.value = a.value.filter((g) => g.toastId !== d.id));
      }, Eo + 50);
    }
    function _(d) {
      var w, g;
      v.value && !((g = (w = d.currentTarget) == null ? void 0 : w.contains) != null && g.call(w, d.relatedTarget)) && (v.value = !1, u.value && (u.value.focus({ preventScroll: !0 }), u.value = null));
    }
    function C(d) {
      d.target instanceof HTMLElement && d.target.dataset.dismissible === "false" || v.value || (v.value = !0, u.value = d.relatedTarget);
    }
    function A(d) {
      d.target && d.target instanceof HTMLElement && d.target.dataset.dismissible === "false" || (f.value = !0);
    }
    fe((d) => {
      const w = ee.subscribe((g) => {
        if (g.dismiss) {
          requestAnimationFrame(() => {
            i.value = i.value.map((x) => x.id === g.id ? {
              ...x,
              delete: !0
            } : x);
          });
          return;
        }
        Ot(() => {
          const x = i.value.findIndex((k) => k.id === g.id);
          x !== -1 ? i.value = [
            ...i.value.slice(0, x),
            {
              ...i.value[x],
              ...g
            },
            ...i.value.slice(x + 1)
          ] : i.value = [g, ...i.value];
        });
      });
      d(w);
    }), fe((d) => {
      if (typeof window > "u")
        return;
      if (t.theme !== "system") {
        m.value = t.theme;
        return;
      }
      const w = window.matchMedia("(prefers-color-scheme: dark)"), g = (k) => {
        m.value = k ? "dark" : "light";
      };
      g(w.matches);
      const x = (k) => {
        g(k.matches);
      };
      try {
        w.addEventListener("change", x);
      } catch {
        w.addListener(x);
      }
      d(() => {
        try {
          w.removeEventListener("change", x);
        } catch {
          w.removeListener(x);
        }
      });
    }), fe(() => {
      h.value && u.value && (u.value.focus({ preventScroll: !0 }), u.value = null, v.value = !1);
    }), fe(() => {
      i.value.length <= 1 && Object.keys(p.value).forEach((d) => {
        p.value[d] = !1;
      });
    }), fe((d) => {
      function w(g) {
        const x = t.hotkey.every((I) => g[I] || g.code === I), k = Array.isArray(h.value) ? h.value[0] : h.value;
        x && (r.value.forEach((I) => {
          p.value[I] = !0;
        }), k == null || k.focus());
        const Q = document.activeElement === h.value || (k == null ? void 0 : k.contains(document.activeElement));
        g.code === "Escape" && Q && r.value.forEach((I) => {
          p.value[I] = !1;
        });
      }
      !on || (document.addEventListener("keydown", w), d(() => {
        document.removeEventListener("keydown", w);
      }));
    });
    function R(d) {
      const w = d.currentTarget, g = w.getAttribute("data-y-position") + "-" + w.getAttribute("data-x-position");
      p.value[g] = !0;
    }
    function H(d) {
      if (!f.value) {
        const w = d.currentTarget, g = w.getAttribute("data-y-position") + "-" + w.getAttribute("data-x-position");
        p.value[g] = !1;
      }
    }
    function Y() {
      Object.keys(p.value).forEach((d) => {
        p.value[d] = !1;
      });
    }
    function W() {
      f.value = !1;
    }
    function U(d) {
      a.value = d;
    }
    function q(d) {
      const w = a.value.findIndex((g) => g.toastId === d.toastId);
      if (w !== -1)
        a.value[w] = d;
      else {
        const g = a.value.findIndex((x) => x.position === d.position);
        g !== -1 ? a.value.splice(g, 0, d) : a.value.unshift(d);
      }
    }
    return (d, w) => ($(), S(ie, null, [te(" Remove item from normal navigation flow, only available via hotkey "), T("section", {
      "aria-label": `${d.containerAriaLabel} ${y(b)}`,
      tabIndex: -1,
      "aria-live": "polite",
      "aria-relevant": "additions text",
      "aria-atomic": "false"
    }, [($(!0), S(ie, null, Tt(r.value, (g, x) => {
      var k;
      return $(), S("ol", We({
        key: g,
        ref_for: !0,
        ref_key: "listRef",
        ref: h,
        "data-sonner-toaster": "",
        "data-sonner-theme": m.value,
        class: t.class,
        dir: d.dir === "auto" ? nn() : d.dir,
        tabIndex: -1,
        "data-theme": d.theme,
        "data-rich-colors": d.richColors,
        "data-y-position": g.split("-")[0],
        "data-x-position": g.split("-")[1],
        style: {
          "--front-toast-height": `${((k = a.value[0]) == null ? void 0 : k.height) || 0}px`,
          "--width": `${y(bi)}px`,
          "--gap": `${d.gap}px`,
          ...d.style,
          ...y(o).style,
          ...y(xi)(d.offset, d.mobileOffset)
        }
      }, { ref_for: !0 }, d.$attrs, {
        onBlur: _,
        onFocus: C,
        onMouseenter: R,
        onMousemove: R,
        onMouseleave: H,
        onDragend: Y,
        onPointerdown: A,
        onPointerup: W
      }), [($(!0), S(ie, null, Tt(s(g, x), (Q, I) => {
        var X, K, oe, ve, he, Re, tt, ot, it, nt, c, L, O;
        return $(), J(Bi, {
          key: Q.id,
          heights: a.value,
          icons: d.icons,
          index: I,
          toast: Q,
          defaultRichColors: d.richColors,
          duration: (K = (X = d.toastOptions) == null ? void 0 : X.duration) != null ? K : d.duration,
          class: D((ve = (oe = d.toastOptions) == null ? void 0 : oe.class) != null ? ve : ""),
          descriptionClass: (he = d.toastOptions) == null ? void 0 : he.descriptionClass,
          invert: d.invert,
          visibleToasts: d.visibleToasts,
          closeButton: (tt = (Re = d.toastOptions) == null ? void 0 : Re.closeButton) != null ? tt : d.closeButton,
          interacting: f.value,
          position: g,
          style: De((ot = d.toastOptions) == null ? void 0 : ot.style),
          unstyled: (it = d.toastOptions) == null ? void 0 : it.unstyled,
          classes: (nt = d.toastOptions) == null ? void 0 : nt.classes,
          cancelButtonStyle: (c = d.toastOptions) == null ? void 0 : c.cancelButtonStyle,
          actionButtonStyle: (L = d.toastOptions) == null ? void 0 : L.actionButtonStyle,
          "close-button-aria-label": (O = d.toastOptions) == null ? void 0 : O.closeButtonAriaLabel,
          toasts: l.value[g],
          expandByDefault: d.expand,
          gap: d.gap,
          expanded: p.value[g] || !1,
          swipeDirections: t.swipeDirections,
          "onUpdate:heights": U,
          "onUpdate:height": q,
          onRemoveToast: B
        }, {
          "close-icon": M(() => [j(d.$slots, "close-icon", {}, () => [N(Di)])]),
          "loading-icon": M(() => [j(d.$slots, "loading-icon", {}, () => [N(Ni, { visible: Q.type === "loading" }, null, 8, ["visible"])])]),
          "success-icon": M(() => [j(d.$slots, "success-icon", {}, () => [N(Ii)])]),
          "error-icon": M(() => [j(d.$slots, "error-icon", {}, () => [N(Ji)])]),
          "warning-icon": M(() => [j(d.$slots, "warning-icon", {}, () => [N(Yi)])]),
          "info-icon": M(() => [j(d.$slots, "info-icon", {}, () => [N(Zi)])]),
          _: 2
        }, 1032, [
          "heights",
          "icons",
          "index",
          "toast",
          "defaultRichColors",
          "duration",
          "class",
          "descriptionClass",
          "invert",
          "visibleToasts",
          "closeButton",
          "interacting",
          "position",
          "style",
          "unstyled",
          "classes",
          "cancelButtonStyle",
          "actionButtonStyle",
          "close-button-aria-label",
          "toasts",
          "expandByDefault",
          "gap",
          "expanded",
          "swipeDirections"
        ]);
      }), 128))], 16, tn);
    }), 128))], 8, en)], 2112));
  }
}), zt = sn;
const Ft = () => ({
  copyContent: P(""),
  clickCopy: async (o) => {
    await navigator.clipboard.writeText(o);
    const i = window == null ? void 0 : window.demoPreviewConfig;
    yi.success((i == null ? void 0 : i.copySuccessText) || "\u590D\u5236\u6210\u529F", {
      position: "top-center",
      closeButton: !0
    });
  }
});
const rn = ["top", "right", "bottom", "left"], co = ["start", "end"], uo = /* @__PURE__ */ rn.reduce((e, t) => e.concat(t, t + "-" + co[0], t + "-" + co[1]), []), Xe = Math.min, Ee = Math.max, an = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, ln = {
  start: "end",
  end: "start"
};
function At(e, t, o) {
  return Ee(e, Xe(t, o));
}
function He(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function ce(e) {
  return e.split("-")[0];
}
function ae(e) {
  return e.split("-")[1];
}
function Oo(e) {
  return e === "x" ? "y" : "x";
}
function It(e) {
  return e === "y" ? "height" : "width";
}
const cn = /* @__PURE__ */ new Set(["top", "bottom"]);
function me(e) {
  return cn.has(ce(e)) ? "y" : "x";
}
function Vt(e) {
  return Oo(me(e));
}
function Do(e, t, o) {
  o === void 0 && (o = !1);
  const i = ae(e), n = Vt(e), s = It(n);
  let r = n === "x" ? i === (o ? "end" : "start") ? "right" : "left" : i === "start" ? "bottom" : "top";
  return t.reference[s] > t.floating[s] && (r = ht(r)), [r, ht(r)];
}
function dn(e) {
  const t = ht(e);
  return [pt(e), t, pt(t)];
}
function pt(e) {
  return e.replace(/start|end/g, (t) => ln[t]);
}
const po = ["left", "right"], ho = ["right", "left"], un = ["top", "bottom"], pn = ["bottom", "top"];
function hn(e, t, o) {
  switch (e) {
    case "top":
    case "bottom":
      return o ? t ? ho : po : t ? po : ho;
    case "left":
    case "right":
      return t ? un : pn;
    default:
      return [];
  }
}
function fn(e, t, o, i) {
  const n = ae(e);
  let s = hn(ce(e), o === "start", i);
  return n && (s = s.map((r) => r + "-" + n), t && (s = s.concat(s.map(pt)))), s;
}
function ht(e) {
  return e.replace(/left|right|bottom|top/g, (t) => an[t]);
}
function mn(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function Mo(e) {
  return typeof e != "number" ? mn(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function Ze(e) {
  const {
    x: t,
    y: o,
    width: i,
    height: n
  } = e;
  return {
    width: i,
    height: n,
    top: o,
    left: t,
    right: t + i,
    bottom: o + n,
    x: t,
    y: o
  };
}
function fo(e, t, o) {
  let {
    reference: i,
    floating: n
  } = e;
  const s = me(t), r = Vt(t), l = It(r), a = ce(t), p = s === "y", f = i.x + i.width / 2 - n.width / 2, m = i.y + i.height / 2 - n.height / 2, h = i[l] / 2 - n[l] / 2;
  let u;
  switch (a) {
    case "top":
      u = {
        x: f,
        y: i.y - n.height
      };
      break;
    case "bottom":
      u = {
        x: f,
        y: i.y + i.height
      };
      break;
    case "right":
      u = {
        x: i.x + i.width,
        y: m
      };
      break;
    case "left":
      u = {
        x: i.x - n.width,
        y: m
      };
      break;
    default:
      u = {
        x: i.x,
        y: i.y
      };
  }
  switch (ae(t)) {
    case "start":
      u[r] -= h * (o && p ? -1 : 1);
      break;
    case "end":
      u[r] += h * (o && p ? -1 : 1);
      break;
  }
  return u;
}
const gn = async (e, t, o) => {
  const {
    placement: i = "bottom",
    strategy: n = "absolute",
    middleware: s = [],
    platform: r
  } = o, l = s.filter(Boolean), a = await (r.isRTL == null ? void 0 : r.isRTL(t));
  let p = await r.getElementRects({
    reference: e,
    floating: t,
    strategy: n
  }), {
    x: f,
    y: m
  } = fo(p, i, a), h = i, u = {}, v = 0;
  for (let b = 0; b < l.length; b++) {
    const {
      name: B,
      fn: _
    } = l[b], {
      x: C,
      y: A,
      data: R,
      reset: H
    } = await _({
      x: f,
      y: m,
      initialPlacement: i,
      placement: h,
      strategy: n,
      middlewareData: u,
      rects: p,
      platform: r,
      elements: {
        reference: e,
        floating: t
      }
    });
    f = C != null ? C : f, m = A != null ? A : m, u = {
      ...u,
      [B]: {
        ...u[B],
        ...R
      }
    }, H && v <= 50 && (v++, typeof H == "object" && (H.placement && (h = H.placement), H.rects && (p = H.rects === !0 ? await r.getElementRects({
      reference: e,
      floating: t,
      strategy: n
    }) : H.rects), {
      x: f,
      y: m
    } = fo(p, h, a)), b = -1);
  }
  return {
    x: f,
    y: m,
    placement: h,
    strategy: n,
    middlewareData: u
  };
};
async function vt(e, t) {
  var o;
  t === void 0 && (t = {});
  const {
    x: i,
    y: n,
    platform: s,
    rects: r,
    elements: l,
    strategy: a
  } = e, {
    boundary: p = "clippingAncestors",
    rootBoundary: f = "viewport",
    elementContext: m = "floating",
    altBoundary: h = !1,
    padding: u = 0
  } = He(t, e), v = Mo(u), B = l[h ? m === "floating" ? "reference" : "floating" : m], _ = Ze(await s.getClippingRect({
    element: (o = await (s.isElement == null ? void 0 : s.isElement(B))) == null || o ? B : B.contextElement || await (s.getDocumentElement == null ? void 0 : s.getDocumentElement(l.floating)),
    boundary: p,
    rootBoundary: f,
    strategy: a
  })), C = m === "floating" ? {
    x: i,
    y: n,
    width: r.floating.width,
    height: r.floating.height
  } : r.reference, A = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(l.floating)), R = await (s.isElement == null ? void 0 : s.isElement(A)) ? await (s.getScale == null ? void 0 : s.getScale(A)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, H = Ze(s.convertOffsetParentRelativeRectToViewportRelativeRect ? await s.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: l,
    rect: C,
    offsetParent: A,
    strategy: a
  }) : C);
  return {
    top: (_.top - H.top + v.top) / R.y,
    bottom: (H.bottom - _.bottom + v.bottom) / R.y,
    left: (_.left - H.left + v.left) / R.x,
    right: (H.right - _.right + v.right) / R.x
  };
}
const vn = (e) => ({
  name: "arrow",
  options: e,
  async fn(t) {
    const {
      x: o,
      y: i,
      placement: n,
      rects: s,
      platform: r,
      elements: l,
      middlewareData: a
    } = t, {
      element: p,
      padding: f = 0
    } = He(e, t) || {};
    if (p == null)
      return {};
    const m = Mo(f), h = {
      x: o,
      y: i
    }, u = Vt(n), v = It(u), b = await r.getDimensions(p), B = u === "y", _ = B ? "top" : "left", C = B ? "bottom" : "right", A = B ? "clientHeight" : "clientWidth", R = s.reference[v] + s.reference[u] - h[u] - s.floating[v], H = h[u] - s.reference[u], Y = await (r.getOffsetParent == null ? void 0 : r.getOffsetParent(p));
    let W = Y ? Y[A] : 0;
    (!W || !await (r.isElement == null ? void 0 : r.isElement(Y))) && (W = l.floating[A] || s.floating[v]);
    const U = R / 2 - H / 2, q = W / 2 - b[v] / 2 - 1, d = Xe(m[_], q), w = Xe(m[C], q), g = d, x = W - b[v] - w, k = W / 2 - b[v] / 2 + U, Q = At(g, k, x), I = !a.arrow && ae(n) != null && k !== Q && s.reference[v] / 2 - (k < g ? d : w) - b[v] / 2 < 0, X = I ? k < g ? k - g : k - x : 0;
    return {
      [u]: h[u] + X,
      data: {
        [u]: Q,
        centerOffset: k - Q - X,
        ...I && {
          alignmentOffset: X
        }
      },
      reset: I
    };
  }
});
function yn(e, t, o) {
  return (e ? [...o.filter((n) => ae(n) === e), ...o.filter((n) => ae(n) !== e)] : o.filter((n) => ce(n) === n)).filter((n) => e ? ae(n) === e || (t ? pt(n) !== n : !1) : !0);
}
const wn = function(e) {
  return e === void 0 && (e = {}), {
    name: "autoPlacement",
    options: e,
    async fn(t) {
      var o, i, n;
      const {
        rects: s,
        middlewareData: r,
        placement: l,
        platform: a,
        elements: p
      } = t, {
        crossAxis: f = !1,
        alignment: m,
        allowedPlacements: h = uo,
        autoAlignment: u = !0,
        ...v
      } = He(e, t), b = m !== void 0 || h === uo ? yn(m || null, u, h) : h, B = await vt(t, v), _ = ((o = r.autoPlacement) == null ? void 0 : o.index) || 0, C = b[_];
      if (C == null)
        return {};
      const A = Do(C, s, await (a.isRTL == null ? void 0 : a.isRTL(p.floating)));
      if (l !== C)
        return {
          reset: {
            placement: b[0]
          }
        };
      const R = [B[ce(C)], B[A[0]], B[A[1]]], H = [...((i = r.autoPlacement) == null ? void 0 : i.overflows) || [], {
        placement: C,
        overflows: R
      }], Y = b[_ + 1];
      if (Y)
        return {
          data: {
            index: _ + 1,
            overflows: H
          },
          reset: {
            placement: Y
          }
        };
      const W = H.map((d) => {
        const w = ae(d.placement);
        return [d.placement, w && f ? d.overflows.slice(0, 2).reduce((g, x) => g + x, 0) : d.overflows[0], d.overflows];
      }).sort((d, w) => d[1] - w[1]), q = ((n = W.filter((d) => d[2].slice(
        0,
        ae(d[0]) ? 2 : 3
      ).every((w) => w <= 0))[0]) == null ? void 0 : n[0]) || W[0][0];
      return q !== l ? {
        data: {
          index: _ + 1,
          overflows: H
        },
        reset: {
          placement: q
        }
      } : {};
    }
  };
}, bn = function(e) {
  return e === void 0 && (e = {}), {
    name: "flip",
    options: e,
    async fn(t) {
      var o, i;
      const {
        placement: n,
        middlewareData: s,
        rects: r,
        initialPlacement: l,
        platform: a,
        elements: p
      } = t, {
        mainAxis: f = !0,
        crossAxis: m = !0,
        fallbackPlacements: h,
        fallbackStrategy: u = "bestFit",
        fallbackAxisSideDirection: v = "none",
        flipAlignment: b = !0,
        ...B
      } = He(e, t);
      if ((o = s.arrow) != null && o.alignmentOffset)
        return {};
      const _ = ce(n), C = me(l), A = ce(l) === l, R = await (a.isRTL == null ? void 0 : a.isRTL(p.floating)), H = h || (A || !b ? [ht(l)] : dn(l)), Y = v !== "none";
      !h && Y && H.push(...fn(l, b, v, R));
      const W = [l, ...H], U = await vt(t, B), q = [];
      let d = ((i = s.flip) == null ? void 0 : i.overflows) || [];
      if (f && q.push(U[_]), m) {
        const k = Do(n, r, R);
        q.push(U[k[0]], U[k[1]]);
      }
      if (d = [...d, {
        placement: n,
        overflows: q
      }], !q.every((k) => k <= 0)) {
        var w, g;
        const k = (((w = s.flip) == null ? void 0 : w.index) || 0) + 1, Q = W[k];
        if (Q && (!(m === "alignment" ? C !== me(Q) : !1) || d.every((K) => me(K.placement) === C ? K.overflows[0] > 0 : !0)))
          return {
            data: {
              index: k,
              overflows: d
            },
            reset: {
              placement: Q
            }
          };
        let I = (g = d.filter((X) => X.overflows[0] <= 0).sort((X, K) => X.overflows[1] - K.overflows[1])[0]) == null ? void 0 : g.placement;
        if (!I)
          switch (u) {
            case "bestFit": {
              var x;
              const X = (x = d.filter((K) => {
                if (Y) {
                  const oe = me(K.placement);
                  return oe === C || oe === "y";
                }
                return !0;
              }).map((K) => [K.placement, K.overflows.filter((oe) => oe > 0).reduce((oe, ve) => oe + ve, 0)]).sort((K, oe) => K[1] - oe[1])[0]) == null ? void 0 : x[0];
              X && (I = X);
              break;
            }
            case "initialPlacement":
              I = l;
              break;
          }
        if (n !== I)
          return {
            reset: {
              placement: I
            }
          };
      }
      return {};
    }
  };
}, Cn = /* @__PURE__ */ new Set(["left", "top"]);
async function $n(e, t) {
  const {
    placement: o,
    platform: i,
    elements: n
  } = e, s = await (i.isRTL == null ? void 0 : i.isRTL(n.floating)), r = ce(o), l = ae(o), a = me(o) === "y", p = Cn.has(r) ? -1 : 1, f = s && a ? -1 : 1, m = He(t, e);
  let {
    mainAxis: h,
    crossAxis: u,
    alignmentAxis: v
  } = typeof m == "number" ? {
    mainAxis: m,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: m.mainAxis || 0,
    crossAxis: m.crossAxis || 0,
    alignmentAxis: m.alignmentAxis
  };
  return l && typeof v == "number" && (u = l === "end" ? v * -1 : v), a ? {
    x: u * f,
    y: h * p
  } : {
    x: h * p,
    y: u * f
  };
}
const _n = function(e) {
  return e === void 0 && (e = 0), {
    name: "offset",
    options: e,
    async fn(t) {
      var o, i;
      const {
        x: n,
        y: s,
        placement: r,
        middlewareData: l
      } = t, a = await $n(t, e);
      return r === ((o = l.offset) == null ? void 0 : o.placement) && (i = l.arrow) != null && i.alignmentOffset ? {} : {
        x: n + a.x,
        y: s + a.y,
        data: {
          ...a,
          placement: r
        }
      };
    }
  };
}, Tn = function(e) {
  return e === void 0 && (e = {}), {
    name: "shift",
    options: e,
    async fn(t) {
      const {
        x: o,
        y: i,
        placement: n
      } = t, {
        mainAxis: s = !0,
        crossAxis: r = !1,
        limiter: l = {
          fn: (B) => {
            let {
              x: _,
              y: C
            } = B;
            return {
              x: _,
              y: C
            };
          }
        },
        ...a
      } = He(e, t), p = {
        x: o,
        y: i
      }, f = await vt(t, a), m = me(ce(n)), h = Oo(m);
      let u = p[h], v = p[m];
      if (s) {
        const B = h === "y" ? "top" : "left", _ = h === "y" ? "bottom" : "right", C = u + f[B], A = u - f[_];
        u = At(C, u, A);
      }
      if (r) {
        const B = m === "y" ? "top" : "left", _ = m === "y" ? "bottom" : "right", C = v + f[B], A = v - f[_];
        v = At(C, v, A);
      }
      const b = l.fn({
        ...t,
        [h]: u,
        [m]: v
      });
      return {
        ...b,
        data: {
          x: b.x - o,
          y: b.y - i,
          enabled: {
            [h]: s,
            [m]: r
          }
        }
      };
    }
  };
}, xn = function(e) {
  return e === void 0 && (e = {}), {
    name: "size",
    options: e,
    async fn(t) {
      var o, i;
      const {
        placement: n,
        rects: s,
        platform: r,
        elements: l
      } = t, {
        apply: a = () => {
        },
        ...p
      } = He(e, t), f = await vt(t, p), m = ce(n), h = ae(n), u = me(n) === "y", {
        width: v,
        height: b
      } = s.floating;
      let B, _;
      m === "top" || m === "bottom" ? (B = m, _ = h === (await (r.isRTL == null ? void 0 : r.isRTL(l.floating)) ? "start" : "end") ? "left" : "right") : (_ = m, B = h === "end" ? "top" : "bottom");
      const C = b - f.top - f.bottom, A = v - f.left - f.right, R = Xe(b - f[B], C), H = Xe(v - f[_], A), Y = !t.middlewareData.shift;
      let W = R, U = H;
      if ((o = t.middlewareData.shift) != null && o.enabled.x && (U = A), (i = t.middlewareData.shift) != null && i.enabled.y && (W = C), Y && !h) {
        const d = Ee(f.left, 0), w = Ee(f.right, 0), g = Ee(f.top, 0), x = Ee(f.bottom, 0);
        u ? U = v - 2 * (d !== 0 || w !== 0 ? d + w : Ee(f.left, f.right)) : W = b - 2 * (g !== 0 || x !== 0 ? g + x : Ee(f.top, f.bottom));
      }
      await a({
        ...t,
        availableWidth: U,
        availableHeight: W
      });
      const q = await r.getDimensions(l.floating);
      return v !== q.width || b !== q.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function ne(e) {
  var t;
  return ((t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function de(e) {
  return ne(e).getComputedStyle(e);
}
const mo = Math.min, Ue = Math.max, ft = Math.round;
function Ho(e) {
  const t = de(e);
  let o = parseFloat(t.width), i = parseFloat(t.height);
  const n = e.offsetWidth, s = e.offsetHeight, r = ft(o) !== n || ft(i) !== s;
  return r && (o = n, i = s), {
    width: o,
    height: i,
    fallback: r
  };
}
function Ae(e) {
  return No(e) ? (e.nodeName || "").toLowerCase() : "";
}
let ct;
function Lo() {
  if (ct)
    return ct;
  const e = navigator.userAgentData;
  return e && Array.isArray(e.brands) ? (ct = e.brands.map((t) => t.brand + "/" + t.version).join(" "), ct) : navigator.userAgent;
}
function ue(e) {
  return e instanceof ne(e).HTMLElement;
}
function Pe(e) {
  return e instanceof ne(e).Element;
}
function No(e) {
  return e instanceof ne(e).Node;
}
function go(e) {
  if (typeof ShadowRoot > "u")
    return !1;
  const t = ne(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function yt(e) {
  const {
    overflow: t,
    overflowX: o,
    overflowY: i,
    display: n
  } = de(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + i + o) && !["inline", "contents"].includes(n);
}
function Sn(e) {
  return ["table", "td", "th"].includes(Ae(e));
}
function jt(e) {
  const t = /firefox/i.test(Lo()), o = de(e), i = o.backdropFilter || o.WebkitBackdropFilter;
  return o.transform !== "none" || o.perspective !== "none" || (i ? i !== "none" : !1) || t && o.willChange === "filter" || t && (o.filter ? o.filter !== "none" : !1) || ["transform", "perspective"].some((n) => o.willChange.includes(n)) || ["paint", "layout", "strict", "content"].some((n) => {
    const s = o.contain;
    return s != null ? s.includes(n) : !1;
  });
}
function Ro() {
  return !/^((?!chrome|android).)*safari/i.test(Lo());
}
function Wt(e) {
  return ["html", "body", "#document"].includes(Ae(e));
}
function zo(e) {
  return Pe(e) ? e : e.contextElement;
}
const Fo = {
  x: 1,
  y: 1
};
function Le(e) {
  const t = zo(e);
  if (!ue(t))
    return Fo;
  const o = t.getBoundingClientRect(), {
    width: i,
    height: n,
    fallback: s
  } = Ho(t);
  let r = (s ? ft(o.width) : o.width) / i, l = (s ? ft(o.height) : o.height) / n;
  return (!r || !Number.isFinite(r)) && (r = 1), (!l || !Number.isFinite(l)) && (l = 1), {
    x: r,
    y: l
  };
}
function Ke(e, t, o, i) {
  var n, s;
  t === void 0 && (t = !1), o === void 0 && (o = !1);
  const r = e.getBoundingClientRect(), l = zo(e);
  let a = Fo;
  t && (i ? Pe(i) && (a = Le(i)) : a = Le(e));
  const p = l ? ne(l) : window, f = !Ro() && o;
  let m = (r.left + (f && ((n = p.visualViewport) == null ? void 0 : n.offsetLeft) || 0)) / a.x, h = (r.top + (f && ((s = p.visualViewport) == null ? void 0 : s.offsetTop) || 0)) / a.y, u = r.width / a.x, v = r.height / a.y;
  if (l) {
    const b = ne(l), B = i && Pe(i) ? ne(i) : i;
    let _ = b.frameElement;
    for (; _ && i && B !== b; ) {
      const C = Le(_), A = _.getBoundingClientRect(), R = getComputedStyle(_);
      A.x += (_.clientLeft + parseFloat(R.paddingLeft)) * C.x, A.y += (_.clientTop + parseFloat(R.paddingTop)) * C.y, m *= C.x, h *= C.y, u *= C.x, v *= C.y, m += A.x, h += A.y, _ = ne(_).frameElement;
    }
  }
  return {
    width: u,
    height: v,
    top: h,
    right: m + u,
    bottom: h + v,
    left: m,
    x: m,
    y: h
  };
}
function Be(e) {
  return ((No(e) ? e.ownerDocument : e.document) || window.document).documentElement;
}
function wt(e) {
  return Pe(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.pageXOffset,
    scrollTop: e.pageYOffset
  };
}
function An(e) {
  let {
    rect: t,
    offsetParent: o,
    strategy: i
  } = e;
  const n = ue(o), s = Be(o);
  if (o === s)
    return t;
  let r = {
    scrollLeft: 0,
    scrollTop: 0
  }, l = {
    x: 1,
    y: 1
  };
  const a = {
    x: 0,
    y: 0
  };
  if ((n || !n && i !== "fixed") && ((Ae(o) !== "body" || yt(s)) && (r = wt(o)), ue(o))) {
    const p = Ke(o);
    l = Le(o), a.x = p.x + o.clientLeft, a.y = p.y + o.clientTop;
  }
  return {
    width: t.width * l.x,
    height: t.height * l.y,
    x: t.x * l.x - r.scrollLeft * l.x + a.x,
    y: t.y * l.y - r.scrollTop * l.y + a.y
  };
}
function Io(e) {
  return Ke(Be(e)).left + wt(e).scrollLeft;
}
function Pn(e) {
  const t = Be(e), o = wt(e), i = e.ownerDocument.body, n = Ue(t.scrollWidth, t.clientWidth, i.scrollWidth, i.clientWidth), s = Ue(t.scrollHeight, t.clientHeight, i.scrollHeight, i.clientHeight);
  let r = -o.scrollLeft + Io(e);
  const l = -o.scrollTop;
  return de(i).direction === "rtl" && (r += Ue(t.clientWidth, i.clientWidth) - n), {
    width: n,
    height: s,
    x: r,
    y: l
  };
}
function Qe(e) {
  if (Ae(e) === "html")
    return e;
  const t = e.assignedSlot || e.parentNode || go(e) && e.host || Be(e);
  return go(t) ? t.host : t;
}
function Vo(e) {
  const t = Qe(e);
  return Wt(t) ? t.ownerDocument.body : ue(t) && yt(t) ? t : Vo(t);
}
function mt(e, t) {
  var o;
  t === void 0 && (t = []);
  const i = Vo(e), n = i === ((o = e.ownerDocument) == null ? void 0 : o.body), s = ne(i);
  return n ? t.concat(s, s.visualViewport || [], yt(i) ? i : []) : t.concat(i, mt(i));
}
function Bn(e, t) {
  const o = ne(e), i = Be(e), n = o.visualViewport;
  let s = i.clientWidth, r = i.clientHeight, l = 0, a = 0;
  if (n) {
    s = n.width, r = n.height;
    const p = Ro();
    (p || !p && t === "fixed") && (l = n.offsetLeft, a = n.offsetTop);
  }
  return {
    width: s,
    height: r,
    x: l,
    y: a
  };
}
function kn(e, t) {
  const o = Ke(e, !0, t === "fixed"), i = o.top + e.clientTop, n = o.left + e.clientLeft, s = ue(e) ? Le(e) : {
    x: 1,
    y: 1
  }, r = e.clientWidth * s.x, l = e.clientHeight * s.y, a = n * s.x, p = i * s.y;
  return {
    width: r,
    height: l,
    x: a,
    y: p
  };
}
function vo(e, t, o) {
  return t === "viewport" ? Ze(Bn(e, o)) : Pe(t) ? Ze(kn(t, o)) : Ze(Pn(Be(e)));
}
function En(e, t) {
  const o = t.get(e);
  if (o)
    return o;
  let i = mt(e).filter((l) => Pe(l) && Ae(l) !== "body"), n = null;
  const s = de(e).position === "fixed";
  let r = s ? Qe(e) : e;
  for (; Pe(r) && !Wt(r); ) {
    const l = de(r), a = jt(r);
    (s ? !a && !n : !a && l.position === "static" && !!n && ["absolute", "fixed"].includes(n.position)) ? i = i.filter((f) => f !== r) : n = l, r = Qe(r);
  }
  return t.set(e, i), i;
}
function On(e) {
  let {
    element: t,
    boundary: o,
    rootBoundary: i,
    strategy: n
  } = e;
  const r = [...o === "clippingAncestors" ? En(t, this._c) : [].concat(o), i], l = r[0], a = r.reduce((p, f) => {
    const m = vo(t, f, n);
    return p.top = Ue(m.top, p.top), p.right = mo(m.right, p.right), p.bottom = mo(m.bottom, p.bottom), p.left = Ue(m.left, p.left), p;
  }, vo(t, l, n));
  return {
    width: a.right - a.left,
    height: a.bottom - a.top,
    x: a.left,
    y: a.top
  };
}
function Dn(e) {
  return ue(e) ? Ho(e) : e.getBoundingClientRect();
}
function yo(e) {
  return !ue(e) || de(e).position === "fixed" ? null : e.offsetParent;
}
function Mn(e) {
  let t = Qe(e);
  for (; ue(t) && !Wt(t); ) {
    if (jt(t))
      return t;
    t = Qe(t);
  }
  return null;
}
function wo(e) {
  const t = ne(e);
  let o = yo(e);
  for (; o && Sn(o) && de(o).position === "static"; )
    o = yo(o);
  return o && (Ae(o) === "html" || Ae(o) === "body" && de(o).position === "static" && !jt(o)) ? t : o || Mn(e) || t;
}
function Hn(e, t, o) {
  const i = ue(t), n = Be(t), s = Ke(e, !0, o === "fixed", t);
  let r = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const l = {
    x: 0,
    y: 0
  };
  if (i || !i && o !== "fixed")
    if ((Ae(t) !== "body" || yt(n)) && (r = wt(t)), ue(t)) {
      const a = Ke(t, !0);
      l.x = a.x + t.clientLeft, l.y = a.y + t.clientTop;
    } else
      n && (l.x = Io(n));
  return {
    x: s.left + r.scrollLeft - l.x,
    y: s.top + r.scrollTop - l.y,
    width: s.width,
    height: s.height
  };
}
const Ln = {
  getClippingRect: On,
  convertOffsetParentRelativeRectToViewportRelativeRect: An,
  isElement: Pe,
  getDimensions: Dn,
  getOffsetParent: wo,
  getDocumentElement: Be,
  getScale: Le,
  async getElementRects(e) {
    let {
      reference: t,
      floating: o,
      strategy: i
    } = e;
    const n = this.getOffsetParent || wo, s = this.getDimensions;
    return {
      reference: Hn(t, await n(o), i),
      floating: {
        x: 0,
        y: 0,
        ...await s(o)
      }
    };
  },
  getClientRects: (e) => Array.from(e.getClientRects()),
  isRTL: (e) => de(e).direction === "rtl"
}, Nn = (e, t, o) => {
  const i = /* @__PURE__ */ new Map(), n = {
    platform: Ln,
    ...o
  }, s = {
    ...n.platform,
    _c: i
  };
  return gn(e, t, {
    ...n,
    platform: s
  });
}, Me = {
  disabled: !1,
  distance: 5,
  skidding: 0,
  container: "body",
  boundary: void 0,
  instantMove: !1,
  disposeTimeout: 150,
  popperTriggers: [],
  strategy: "absolute",
  preventOverflow: !0,
  flip: !0,
  shift: !0,
  overflowPadding: 0,
  arrowPadding: 0,
  arrowOverflow: !0,
  autoHideOnMousedown: !1,
  themes: {
    tooltip: {
      placement: "top",
      triggers: ["hover", "focus", "touch"],
      hideTriggers: (e) => [...e, "click"],
      delay: {
        show: 200,
        hide: 0
      },
      handleResize: !1,
      html: !1,
      loadingContent: "..."
    },
    dropdown: {
      placement: "bottom",
      triggers: ["click"],
      delay: 0,
      handleResize: !0,
      autoHide: !0
    },
    menu: {
      $extend: "dropdown",
      triggers: ["hover", "focus"],
      popperTriggers: ["hover"],
      delay: {
        show: 0,
        hide: 400
      }
    }
  }
};
function Pt(e, t) {
  let o = Me.themes[e] || {}, i;
  do
    i = o[t], typeof i > "u" ? o.$extend ? o = Me.themes[o.$extend] || {} : (o = null, i = Me[t]) : o = null;
  while (o);
  return i;
}
function Rn(e) {
  const t = [e];
  let o = Me.themes[e] || {};
  do
    o.$extend && !o.$resetCss ? (t.push(o.$extend), o = Me.themes[o.$extend] || {}) : o = null;
  while (o);
  return t.map((i) => `v-popper--theme-${i}`);
}
function bo(e) {
  const t = [e];
  let o = Me.themes[e] || {};
  do
    o.$extend ? (t.push(o.$extend), o = Me.themes[o.$extend] || {}) : o = null;
  while (o);
  return t;
}
let Je = !1;
if (typeof window < "u") {
  Je = !1;
  try {
    const e = Object.defineProperty({}, "passive", {
      get() {
        Je = !0;
      }
    });
    window.addEventListener("test", null, e);
  } catch {
  }
}
let jo = !1;
typeof window < "u" && typeof navigator < "u" && (jo = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream);
const zn = ["auto", "top", "bottom", "left", "right"].reduce((e, t) => e.concat([
  t,
  `${t}-start`,
  `${t}-end`
]), []), Co = {
  hover: "mouseenter",
  focus: "focus",
  click: "click",
  touch: "touchstart",
  pointer: "pointerdown"
}, $o = {
  hover: "mouseleave",
  focus: "blur",
  click: "click",
  touch: "touchend",
  pointer: "pointerup"
};
function _o(e, t) {
  const o = e.indexOf(t);
  o !== -1 && e.splice(o, 1);
}
function $t() {
  return new Promise((e) => requestAnimationFrame(() => {
    requestAnimationFrame(e);
  }));
}
const se = [];
let ke = null;
const To = {};
function xo(e) {
  let t = To[e];
  return t || (t = To[e] = []), t;
}
let Bt = function() {
};
typeof window < "u" && (Bt = window.Element);
function E(e) {
  return function(t) {
    return Pt(t.theme, e);
  };
}
const _t = "__floating-vue__popper", Wo = () => pe({
  name: "VPopper",
  provide() {
    return {
      [_t]: {
        parentPopper: this
      }
    };
  },
  inject: {
    [_t]: { default: null }
  },
  props: {
    theme: {
      type: String,
      required: !0
    },
    targetNodes: {
      type: Function,
      required: !0
    },
    referenceNode: {
      type: Function,
      default: null
    },
    popperNode: {
      type: Function,
      required: !0
    },
    shown: {
      type: Boolean,
      default: !1
    },
    showGroup: {
      type: String,
      default: null
    },
    ariaId: {
      default: null
    },
    disabled: {
      type: Boolean,
      default: E("disabled")
    },
    positioningDisabled: {
      type: Boolean,
      default: E("positioningDisabled")
    },
    placement: {
      type: String,
      default: E("placement"),
      validator: (e) => zn.includes(e)
    },
    delay: {
      type: [String, Number, Object],
      default: E("delay")
    },
    distance: {
      type: [Number, String],
      default: E("distance")
    },
    skidding: {
      type: [Number, String],
      default: E("skidding")
    },
    triggers: {
      type: Array,
      default: E("triggers")
    },
    showTriggers: {
      type: [Array, Function],
      default: E("showTriggers")
    },
    hideTriggers: {
      type: [Array, Function],
      default: E("hideTriggers")
    },
    popperTriggers: {
      type: Array,
      default: E("popperTriggers")
    },
    popperShowTriggers: {
      type: [Array, Function],
      default: E("popperShowTriggers")
    },
    popperHideTriggers: {
      type: [Array, Function],
      default: E("popperHideTriggers")
    },
    container: {
      type: [String, Object, Bt, Boolean],
      default: E("container")
    },
    boundary: {
      type: [String, Bt],
      default: E("boundary")
    },
    strategy: {
      type: String,
      validator: (e) => ["absolute", "fixed"].includes(e),
      default: E("strategy")
    },
    autoHide: {
      type: [Boolean, Function],
      default: E("autoHide")
    },
    handleResize: {
      type: Boolean,
      default: E("handleResize")
    },
    instantMove: {
      type: Boolean,
      default: E("instantMove")
    },
    eagerMount: {
      type: Boolean,
      default: E("eagerMount")
    },
    popperClass: {
      type: [String, Array, Object],
      default: E("popperClass")
    },
    computeTransformOrigin: {
      type: Boolean,
      default: E("computeTransformOrigin")
    },
    autoMinSize: {
      type: Boolean,
      default: E("autoMinSize")
    },
    autoSize: {
      type: [Boolean, String],
      default: E("autoSize")
    },
    autoMaxSize: {
      type: Boolean,
      default: E("autoMaxSize")
    },
    autoBoundaryMaxSize: {
      type: Boolean,
      default: E("autoBoundaryMaxSize")
    },
    preventOverflow: {
      type: Boolean,
      default: E("preventOverflow")
    },
    overflowPadding: {
      type: [Number, String],
      default: E("overflowPadding")
    },
    arrowPadding: {
      type: [Number, String],
      default: E("arrowPadding")
    },
    arrowOverflow: {
      type: Boolean,
      default: E("arrowOverflow")
    },
    flip: {
      type: Boolean,
      default: E("flip")
    },
    shift: {
      type: Boolean,
      default: E("shift")
    },
    shiftCrossAxis: {
      type: Boolean,
      default: E("shiftCrossAxis")
    },
    noAutoFocus: {
      type: Boolean,
      default: E("noAutoFocus")
    },
    disposeTimeout: {
      type: Number,
      default: E("disposeTimeout")
    }
  },
  emits: {
    show: () => !0,
    hide: () => !0,
    "update:shown": (e) => !0,
    "apply-show": () => !0,
    "apply-hide": () => !0,
    "close-group": () => !0,
    "close-directive": () => !0,
    "auto-hide": () => !0,
    resize: () => !0
  },
  data() {
    return {
      isShown: !1,
      isMounted: !1,
      skipTransition: !1,
      classes: {
        showFrom: !1,
        showTo: !1,
        hideFrom: !1,
        hideTo: !0
      },
      result: {
        x: 0,
        y: 0,
        placement: "",
        strategy: this.strategy,
        arrow: {
          x: 0,
          y: 0,
          centerOffset: 0
        },
        transformOrigin: null
      },
      randomId: `popper_${[Math.random(), Date.now()].map((e) => e.toString(36).substring(2, 10)).join("_")}`,
      shownChildren: /* @__PURE__ */ new Set(),
      lastAutoHide: !0,
      pendingHide: !1,
      containsGlobalTarget: !1,
      isDisposed: !0,
      mouseDownContains: !1
    };
  },
  computed: {
    popperId() {
      return this.ariaId != null ? this.ariaId : this.randomId;
    },
    shouldMountContent() {
      return this.eagerMount || this.isMounted;
    },
    slotData() {
      return {
        popperId: this.popperId,
        isShown: this.isShown,
        shouldMountContent: this.shouldMountContent,
        skipTransition: this.skipTransition,
        autoHide: typeof this.autoHide == "function" ? this.lastAutoHide : this.autoHide,
        show: this.show,
        hide: this.hide,
        handleResize: this.handleResize,
        onResize: this.onResize,
        classes: {
          ...this.classes,
          popperClass: this.popperClass
        },
        result: this.positioningDisabled ? null : this.result,
        attrs: this.$attrs
      };
    },
    parentPopper() {
      var e;
      return (e = this[_t]) == null ? void 0 : e.parentPopper;
    },
    hasPopperShowTriggerHover() {
      var e, t;
      return ((e = this.popperTriggers) == null ? void 0 : e.includes("hover")) || ((t = this.popperShowTriggers) == null ? void 0 : t.includes("hover"));
    }
  },
  watch: {
    shown: "$_autoShowHide",
    disabled(e) {
      e ? this.dispose() : this.init();
    },
    async container() {
      this.isShown && (this.$_ensureTeleport(), await this.$_computePosition());
    },
    triggers: {
      handler: "$_refreshListeners",
      deep: !0
    },
    positioningDisabled: "$_refreshListeners",
    ...[
      "placement",
      "distance",
      "skidding",
      "boundary",
      "strategy",
      "overflowPadding",
      "arrowPadding",
      "preventOverflow",
      "shift",
      "shiftCrossAxis",
      "flip"
    ].reduce((e, t) => (e[t] = "$_computePosition", e), {})
  },
  created() {
    this.autoMinSize && console.warn('[floating-vue] `autoMinSize` option is deprecated. Use `autoSize="min"` instead.'), this.autoMaxSize && console.warn("[floating-vue] `autoMaxSize` option is deprecated. Use `autoBoundaryMaxSize` instead.");
  },
  mounted() {
    this.init(), this.$_detachPopperNode();
  },
  activated() {
    this.$_autoShowHide();
  },
  deactivated() {
    this.hide();
  },
  beforeUnmount() {
    this.dispose();
  },
  methods: {
    show({ event: e = null, skipDelay: t = !1, force: o = !1 } = {}) {
      var i, n;
      (i = this.parentPopper) != null && i.lockedChild && this.parentPopper.lockedChild !== this || (this.pendingHide = !1, (o || !this.disabled) && (((n = this.parentPopper) == null ? void 0 : n.lockedChild) === this && (this.parentPopper.lockedChild = null), this.$_scheduleShow(e, t), this.$emit("show"), this.$_showFrameLocked = !0, requestAnimationFrame(() => {
        this.$_showFrameLocked = !1;
      })), this.$emit("update:shown", !0));
    },
    hide({ event: e = null, skipDelay: t = !1 } = {}) {
      var o;
      if (!this.$_hideInProgress) {
        if (this.shownChildren.size > 0) {
          this.pendingHide = !0;
          return;
        }
        if (this.hasPopperShowTriggerHover && this.$_isAimingPopper()) {
          this.parentPopper && (this.parentPopper.lockedChild = this, clearTimeout(this.parentPopper.lockedChildTimer), this.parentPopper.lockedChildTimer = setTimeout(() => {
            this.parentPopper.lockedChild === this && (this.parentPopper.lockedChild.hide({ skipDelay: t }), this.parentPopper.lockedChild = null);
          }, 1e3));
          return;
        }
        ((o = this.parentPopper) == null ? void 0 : o.lockedChild) === this && (this.parentPopper.lockedChild = null), this.pendingHide = !1, this.$_scheduleHide(e, t), this.$emit("hide"), this.$emit("update:shown", !1);
      }
    },
    init() {
      var t;
      var e;
      this.isDisposed && (this.isDisposed = !1, this.isMounted = !1, this.$_events = [], this.$_preventShow = !1, this.$_referenceNode = (t = (e = this.referenceNode) == null ? void 0 : e.call(this)) != null ? t : this.$el, this.$_targetNodes = this.targetNodes().filter((o) => o.nodeType === o.ELEMENT_NODE), this.$_popperNode = this.popperNode(), this.$_innerNode = this.$_popperNode.querySelector(".v-popper__inner"), this.$_arrowNode = this.$_popperNode.querySelector(".v-popper__arrow-container"), this.$_swapTargetAttrs("title", "data-original-title"), this.$_detachPopperNode(), this.triggers.length && this.$_addEventListeners(), this.shown && this.show());
    },
    dispose() {
      this.isDisposed || (this.isDisposed = !0, this.$_removeEventListeners(), this.hide({ skipDelay: !0 }), this.$_detachPopperNode(), this.isMounted = !1, this.isShown = !1, this.$_updateParentShownChildren(!1), this.$_swapTargetAttrs("data-original-title", "title"));
    },
    async onResize() {
      this.isShown && (await this.$_computePosition(), this.$emit("resize"));
    },
    async $_computePosition() {
      var i;
      if (this.isDisposed || this.positioningDisabled)
        return;
      const e = {
        strategy: this.strategy,
        middleware: []
      };
      (this.distance || this.skidding) && e.middleware.push(_n({
        mainAxis: this.distance,
        crossAxis: this.skidding
      }));
      const t = this.placement.startsWith("auto");
      if (t ? e.middleware.push(wn({
        alignment: (i = this.placement.split("-")[1]) != null ? i : ""
      })) : e.placement = this.placement, this.preventOverflow && (this.shift && e.middleware.push(Tn({
        padding: this.overflowPadding,
        boundary: this.boundary,
        crossAxis: this.shiftCrossAxis
      })), !t && this.flip && e.middleware.push(bn({
        padding: this.overflowPadding,
        boundary: this.boundary
      }))), e.middleware.push(vn({
        element: this.$_arrowNode,
        padding: this.arrowPadding
      })), this.arrowOverflow && e.middleware.push({
        name: "arrowOverflow",
        fn: ({ placement: n, rects: s, middlewareData: r }) => {
          let l;
          const { centerOffset: a } = r.arrow;
          return n.startsWith("top") || n.startsWith("bottom") ? l = Math.abs(a) > s.reference.width / 2 : l = Math.abs(a) > s.reference.height / 2, {
            data: {
              overflow: l
            }
          };
        }
      }), this.autoMinSize || this.autoSize) {
        const n = this.autoSize ? this.autoSize : this.autoMinSize ? "min" : null;
        e.middleware.push({
          name: "autoSize",
          fn: ({ rects: s, placement: r, middlewareData: l }) => {
            var a;
            if ((a = l.autoSize) != null && a.skip)
              return {};
            let p, f;
            return r.startsWith("top") || r.startsWith("bottom") ? p = s.reference.width : f = s.reference.height, this.$_innerNode.style[n === "min" ? "minWidth" : n === "max" ? "maxWidth" : "width"] = p != null ? `${p}px` : null, this.$_innerNode.style[n === "min" ? "minHeight" : n === "max" ? "maxHeight" : "height"] = f != null ? `${f}px` : null, {
              data: {
                skip: !0
              },
              reset: {
                rects: !0
              }
            };
          }
        });
      }
      (this.autoMaxSize || this.autoBoundaryMaxSize) && (this.$_innerNode.style.maxWidth = null, this.$_innerNode.style.maxHeight = null, e.middleware.push(xn({
        boundary: this.boundary,
        padding: this.overflowPadding,
        apply: ({ availableWidth: n, availableHeight: s }) => {
          this.$_innerNode.style.maxWidth = n != null ? `${n}px` : null, this.$_innerNode.style.maxHeight = s != null ? `${s}px` : null;
        }
      })));
      const o = await Nn(this.$_referenceNode, this.$_popperNode, e);
      Object.assign(this.result, {
        x: o.x,
        y: o.y,
        placement: o.placement,
        strategy: o.strategy,
        arrow: {
          ...o.middlewareData.arrow,
          ...o.middlewareData.arrowOverflow
        }
      });
    },
    $_scheduleShow(e, t = !1) {
      if (this.$_updateParentShownChildren(!0), this.$_hideInProgress = !1, clearTimeout(this.$_scheduleTimer), ke && this.instantMove && ke.instantMove && ke !== this.parentPopper) {
        ke.$_applyHide(!0), this.$_applyShow(!0);
        return;
      }
      t ? this.$_applyShow() : this.$_scheduleTimer = setTimeout(this.$_applyShow.bind(this), this.$_computeDelay("show"));
    },
    $_scheduleHide(e, t = !1) {
      if (this.shownChildren.size > 0) {
        this.pendingHide = !0;
        return;
      }
      this.$_updateParentShownChildren(!1), this.$_hideInProgress = !0, clearTimeout(this.$_scheduleTimer), this.isShown && (ke = this), t ? this.$_applyHide() : this.$_scheduleTimer = setTimeout(this.$_applyHide.bind(this), this.$_computeDelay("hide"));
    },
    $_computeDelay(e) {
      const t = this.delay;
      return parseInt(t && t[e] || t || 0);
    },
    async $_applyShow(e = !1) {
      clearTimeout(this.$_disposeTimer), clearTimeout(this.$_scheduleTimer), this.skipTransition = e, !this.isShown && (this.$_ensureTeleport(), await $t(), await this.$_computePosition(), await this.$_applyShowEffect(), this.positioningDisabled || this.$_registerEventListeners([
        ...mt(this.$_referenceNode),
        ...mt(this.$_popperNode)
      ], "scroll", () => {
        this.$_computePosition();
      }));
    },
    async $_applyShowEffect() {
      if (this.$_hideInProgress)
        return;
      if (this.computeTransformOrigin) {
        const t = this.$_referenceNode.getBoundingClientRect(), o = this.$_popperNode.querySelector(".v-popper__wrapper"), i = o.parentNode.getBoundingClientRect(), n = t.x + t.width / 2 - (i.left + o.offsetLeft), s = t.y + t.height / 2 - (i.top + o.offsetTop);
        this.result.transformOrigin = `${n}px ${s}px`;
      }
      this.isShown = !0, this.$_applyAttrsToTarget({
        "aria-describedby": this.popperId,
        "data-popper-shown": ""
      });
      const e = this.showGroup;
      if (e) {
        let t;
        for (let o = 0; o < se.length; o++)
          t = se[o], t.showGroup !== e && (t.hide(), t.$emit("close-group"));
      }
      se.push(this), document.body.classList.add("v-popper--some-open");
      for (const t of bo(this.theme))
        xo(t).push(this), document.body.classList.add(`v-popper--some-open--${t}`);
      this.$emit("apply-show"), this.classes.showFrom = !0, this.classes.showTo = !1, this.classes.hideFrom = !1, this.classes.hideTo = !1, await $t(), this.classes.showFrom = !1, this.classes.showTo = !0, this.noAutoFocus || this.$_popperNode.focus();
    },
    async $_applyHide(e = !1) {
      if (this.shownChildren.size > 0) {
        this.pendingHide = !0, this.$_hideInProgress = !1;
        return;
      }
      if (clearTimeout(this.$_scheduleTimer), !this.isShown)
        return;
      this.skipTransition = e, _o(se, this), se.length === 0 && document.body.classList.remove("v-popper--some-open");
      for (const o of bo(this.theme)) {
        const i = xo(o);
        _o(i, this), i.length === 0 && document.body.classList.remove(`v-popper--some-open--${o}`);
      }
      ke === this && (ke = null), this.isShown = !1, this.$_applyAttrsToTarget({
        "aria-describedby": void 0,
        "data-popper-shown": void 0
      }), clearTimeout(this.$_disposeTimer);
      const t = this.disposeTimeout;
      t !== null && (this.$_disposeTimer = setTimeout(() => {
        this.$_popperNode && (this.$_detachPopperNode(), this.isMounted = !1);
      }, t)), this.$_removeEventListeners("scroll"), this.$emit("apply-hide"), this.classes.showFrom = !1, this.classes.showTo = !1, this.classes.hideFrom = !0, this.classes.hideTo = !1, await $t(), this.classes.hideFrom = !1, this.classes.hideTo = !0;
    },
    $_autoShowHide() {
      this.shown ? this.show() : this.hide();
    },
    $_ensureTeleport() {
      if (this.isDisposed)
        return;
      let e = this.container;
      if (typeof e == "string" ? e = window.document.querySelector(e) : e === !1 && (e = this.$_targetNodes[0].parentNode), !e)
        throw new Error("No container for popover: " + this.container);
      e.appendChild(this.$_popperNode), this.isMounted = !0;
    },
    $_addEventListeners() {
      const e = (o) => {
        this.isShown && !this.$_hideInProgress || (o.usedByTooltip = !0, !this.$_preventShow && this.show({ event: o }));
      };
      this.$_registerTriggerListeners(this.$_targetNodes, Co, this.triggers, this.showTriggers, e), this.$_registerTriggerListeners([this.$_popperNode], Co, this.popperTriggers, this.popperShowTriggers, e);
      const t = (o) => {
        o.usedByTooltip || this.hide({ event: o });
      };
      this.$_registerTriggerListeners(this.$_targetNodes, $o, this.triggers, this.hideTriggers, t), this.$_registerTriggerListeners([this.$_popperNode], $o, this.popperTriggers, this.popperHideTriggers, t);
    },
    $_registerEventListeners(e, t, o) {
      this.$_events.push({ targetNodes: e, eventType: t, handler: o }), e.forEach((i) => i.addEventListener(t, o, Je ? {
        passive: !0
      } : void 0));
    },
    $_registerTriggerListeners(e, t, o, i, n) {
      let s = o;
      i != null && (s = typeof i == "function" ? i(s) : i), s.forEach((r) => {
        const l = t[r];
        l && this.$_registerEventListeners(e, l, n);
      });
    },
    $_removeEventListeners(e) {
      const t = [];
      this.$_events.forEach((o) => {
        const { targetNodes: i, eventType: n, handler: s } = o;
        !e || e === n ? i.forEach((r) => r.removeEventListener(n, s)) : t.push(o);
      }), this.$_events = t;
    },
    $_refreshListeners() {
      this.isDisposed || (this.$_removeEventListeners(), this.$_addEventListeners());
    },
    $_handleGlobalClose(e, t = !1) {
      this.$_showFrameLocked || (this.hide({ event: e }), e.closePopover ? this.$emit("close-directive") : this.$emit("auto-hide"), t && (this.$_preventShow = !0, setTimeout(() => {
        this.$_preventShow = !1;
      }, 300)));
    },
    $_detachPopperNode() {
      this.$_popperNode.parentNode && this.$_popperNode.parentNode.removeChild(this.$_popperNode);
    },
    $_swapTargetAttrs(e, t) {
      for (const o of this.$_targetNodes) {
        const i = o.getAttribute(e);
        i && (o.removeAttribute(e), o.setAttribute(t, i));
      }
    },
    $_applyAttrsToTarget(e) {
      for (const t of this.$_targetNodes)
        for (const o in e) {
          const i = e[o];
          i == null ? t.removeAttribute(o) : t.setAttribute(o, i);
        }
    },
    $_updateParentShownChildren(e) {
      let t = this.parentPopper;
      for (; t; )
        e ? t.shownChildren.add(this.randomId) : (t.shownChildren.delete(this.randomId), t.pendingHide && t.hide()), t = t.parentPopper;
    },
    $_isAimingPopper() {
      const e = this.$_referenceNode.getBoundingClientRect();
      if (qe >= e.left && qe <= e.right && Ge >= e.top && Ge <= e.bottom) {
        const t = this.$_popperNode.getBoundingClientRect(), o = qe - xe, i = Ge - Se, n = t.left + t.width / 2 - xe + (t.top + t.height / 2) - Se + t.width + t.height, s = xe + o * n, r = Se + i * n;
        return dt(xe, Se, s, r, t.left, t.top, t.left, t.bottom) || dt(xe, Se, s, r, t.left, t.top, t.right, t.top) || dt(xe, Se, s, r, t.right, t.top, t.right, t.bottom) || dt(xe, Se, s, r, t.left, t.bottom, t.right, t.bottom);
      }
      return !1;
    }
  },
  render() {
    return this.$slots.default(this.slotData);
  }
});
if (typeof document < "u" && typeof window < "u") {
  if (jo) {
    const e = Je ? {
      passive: !0,
      capture: !0
    } : !0;
    document.addEventListener("touchstart", (t) => So(t), e), document.addEventListener("touchend", (t) => Ao(t, !0), e);
  } else
    window.addEventListener("mousedown", (e) => So(e), !0), window.addEventListener("click", (e) => Ao(e, !1), !0);
  window.addEventListener("resize", Vn);
}
function So(e, t) {
  for (let o = 0; o < se.length; o++) {
    const i = se[o];
    try {
      i.mouseDownContains = i.popperNode().contains(e.target);
    } catch {
    }
  }
}
function Ao(e, t) {
  Fn(e, t);
}
function Fn(e, t) {
  const o = {};
  for (let i = se.length - 1; i >= 0; i--) {
    const n = se[i];
    try {
      const s = n.containsGlobalTarget = n.mouseDownContains || n.popperNode().contains(e.target);
      n.pendingHide = !1, requestAnimationFrame(() => {
        if (n.pendingHide = !1, !o[n.randomId] && Po(n, s, e)) {
          if (n.$_handleGlobalClose(e, t), !e.closeAllPopover && e.closePopover && s) {
            let l = n.parentPopper;
            for (; l; )
              o[l.randomId] = !0, l = l.parentPopper;
            return;
          }
          let r = n.parentPopper;
          for (; r && Po(r, r.containsGlobalTarget, e); )
            r.$_handleGlobalClose(e, t), r = r.parentPopper;
        }
      });
    } catch {
    }
  }
}
function Po(e, t, o) {
  return o.closeAllPopover || o.closePopover && t || In(e, o) && !t;
}
function In(e, t) {
  if (typeof e.autoHide == "function") {
    const o = e.autoHide(t);
    return e.lastAutoHide = o, o;
  }
  return e.autoHide;
}
function Vn() {
  for (let e = 0; e < se.length; e++)
    se[e].$_computePosition();
}
let xe = 0, Se = 0, qe = 0, Ge = 0;
typeof window < "u" && window.addEventListener("mousemove", (e) => {
  xe = qe, Se = Ge, qe = e.clientX, Ge = e.clientY;
}, Je ? {
  passive: !0
} : void 0);
function dt(e, t, o, i, n, s, r, l) {
  const a = ((r - n) * (t - s) - (l - s) * (e - n)) / ((l - s) * (o - e) - (r - n) * (i - t)), p = ((o - e) * (t - s) - (i - t) * (e - n)) / ((l - s) * (o - e) - (r - n) * (i - t));
  return a >= 0 && a <= 1 && p >= 0 && p <= 1;
}
const jn = {
  extends: Wo()
}, Zt = (e, t) => {
  const o = e.__vccOpts || e;
  for (const [i, n] of t)
    o[i] = n;
  return o;
};
function Wn(e, t, o, i, n, s) {
  return $(), S("div", {
    ref: "reference",
    class: D(["v-popper", {
      "v-popper--shown": e.slotData.isShown
    }])
  }, [
    j(e.$slots, "default", xt(ei(e.slotData)))
  ], 2);
}
const Zn = /* @__PURE__ */ Zt(jn, [["render", Wn]]);
function Un() {
  var e = window.navigator.userAgent, t = e.indexOf("MSIE ");
  if (t > 0)
    return parseInt(e.substring(t + 5, e.indexOf(".", t)), 10);
  var o = e.indexOf("Trident/");
  if (o > 0) {
    var i = e.indexOf("rv:");
    return parseInt(e.substring(i + 3, e.indexOf(".", i)), 10);
  }
  var n = e.indexOf("Edge/");
  return n > 0 ? parseInt(e.substring(n + 5, e.indexOf(".", n)), 10) : -1;
}
let ut;
function kt() {
  kt.init || (kt.init = !0, ut = Un() !== -1);
}
var bt = {
  name: "ResizeObserver",
  props: {
    emitOnMount: {
      type: Boolean,
      default: !1
    },
    ignoreWidth: {
      type: Boolean,
      default: !1
    },
    ignoreHeight: {
      type: Boolean,
      default: !1
    }
  },
  emits: [
    "notify"
  ],
  mounted() {
    kt(), Ot(() => {
      this._w = this.$el.offsetWidth, this._h = this.$el.offsetHeight, this.emitOnMount && this.emitSize();
    });
    const e = document.createElement("object");
    this._resizeObject = e, e.setAttribute("aria-hidden", "true"), e.setAttribute("tabindex", -1), e.onload = this.addResizeHandlers, e.type = "text/html", ut && this.$el.appendChild(e), e.data = "about:blank", ut || this.$el.appendChild(e);
  },
  beforeUnmount() {
    this.removeResizeHandlers();
  },
  methods: {
    compareAndNotify() {
      (!this.ignoreWidth && this._w !== this.$el.offsetWidth || !this.ignoreHeight && this._h !== this.$el.offsetHeight) && (this._w = this.$el.offsetWidth, this._h = this.$el.offsetHeight, this.emitSize());
    },
    emitSize() {
      this.$emit("notify", {
        width: this._w,
        height: this._h
      });
    },
    addResizeHandlers() {
      this._resizeObject.contentDocument.defaultView.addEventListener("resize", this.compareAndNotify), this.compareAndNotify();
    },
    removeResizeHandlers() {
      this._resizeObject && this._resizeObject.onload && (!ut && this._resizeObject.contentDocument && this._resizeObject.contentDocument.defaultView.removeEventListener("resize", this.compareAndNotify), this.$el.removeChild(this._resizeObject), this._resizeObject.onload = null, this._resizeObject = null);
    }
  }
};
const qn = /* @__PURE__ */ ti("data-v-b329ee4c");
Qo("data-v-b329ee4c");
const Gn = {
  class: "resize-observer",
  tabindex: "-1"
};
Jo();
const Yn = /* @__PURE__ */ qn((e, t, o, i, n, s) => ($(), J("div", Gn)));
bt.render = Yn;
bt.__scopeId = "data-v-b329ee4c";
bt.__file = "src/components/ResizeObserver.vue";
const Zo = (e = "theme") => ({
  computed: {
    themeClass() {
      return Rn(this[e]);
    }
  }
}), Xn = pe({
  name: "VPopperContent",
  components: {
    ResizeObserver: bt
  },
  mixins: [
    Zo()
  ],
  props: {
    popperId: String,
    theme: String,
    shown: Boolean,
    mounted: Boolean,
    skipTransition: Boolean,
    autoHide: Boolean,
    handleResize: Boolean,
    classes: Object,
    result: Object
  },
  emits: [
    "hide",
    "resize"
  ],
  methods: {
    toPx(e) {
      return e != null && !isNaN(e) ? `${e}px` : null;
    }
  }
}), Kn = ["id", "aria-hidden", "tabindex", "data-popper-placement"], Qn = {
  ref: "inner",
  class: "v-popper__inner"
}, Jn = /* @__PURE__ */ T("div", { class: "v-popper__arrow-outer" }, null, -1), es = /* @__PURE__ */ T("div", { class: "v-popper__arrow-inner" }, null, -1), ts = [
  Jn,
  es
];
function os(e, t, o, i, n, s) {
  const r = Ne("ResizeObserver");
  return $(), S("div", {
    id: e.popperId,
    ref: "popover",
    class: D(["v-popper__popper", [
      e.themeClass,
      e.classes.popperClass,
      {
        "v-popper__popper--shown": e.shown,
        "v-popper__popper--hidden": !e.shown,
        "v-popper__popper--show-from": e.classes.showFrom,
        "v-popper__popper--show-to": e.classes.showTo,
        "v-popper__popper--hide-from": e.classes.hideFrom,
        "v-popper__popper--hide-to": e.classes.hideTo,
        "v-popper__popper--skip-transition": e.skipTransition,
        "v-popper__popper--arrow-overflow": e.result && e.result.arrow.overflow,
        "v-popper__popper--no-positioning": !e.result
      }
    ]]),
    style: De(e.result ? {
      position: e.result.strategy,
      transform: `translate3d(${Math.round(e.result.x)}px,${Math.round(e.result.y)}px,0)`
    } : void 0),
    "aria-hidden": e.shown ? "false" : "true",
    tabindex: e.autoHide ? 0 : void 0,
    "data-popper-placement": e.result ? e.result.placement : void 0,
    onKeyup: t[2] || (t[2] = oi((l) => e.autoHide && e.$emit("hide"), ["esc"]))
  }, [
    T("div", {
      class: "v-popper__backdrop",
      onClick: t[0] || (t[0] = (l) => e.autoHide && e.$emit("hide"))
    }),
    T("div", {
      class: "v-popper__wrapper",
      style: De(e.result ? {
        transformOrigin: e.result.transformOrigin
      } : void 0)
    }, [
      T("div", Qn, [
        e.mounted ? ($(), S(ie, { key: 0 }, [
          T("div", null, [
            j(e.$slots, "default")
          ]),
          e.handleResize ? ($(), J(r, {
            key: 0,
            onNotify: t[1] || (t[1] = (l) => e.$emit("resize", l))
          })) : te("", !0)
        ], 64)) : te("", !0)
      ], 512),
      T("div", {
        ref: "arrow",
        class: "v-popper__arrow-container",
        style: De(e.result ? {
          left: e.toPx(e.result.arrow.x),
          top: e.toPx(e.result.arrow.y)
        } : void 0)
      }, ts, 4)
    ], 4)
  ], 46, Kn);
}
const Uo = /* @__PURE__ */ Zt(Xn, [["render", os]]), qo = {
  methods: {
    show(...e) {
      return this.$refs.popper.show(...e);
    },
    hide(...e) {
      return this.$refs.popper.hide(...e);
    },
    dispose(...e) {
      return this.$refs.popper.dispose(...e);
    },
    onResize(...e) {
      return this.$refs.popper.onResize(...e);
    }
  }
};
let Et = function() {
};
typeof window < "u" && (Et = window.Element);
const is = pe({
  name: "VPopperWrapper",
  components: {
    Popper: Zn,
    PopperContent: Uo
  },
  mixins: [
    qo,
    Zo("finalTheme")
  ],
  props: {
    theme: {
      type: String,
      default: null
    },
    referenceNode: {
      type: Function,
      default: null
    },
    shown: {
      type: Boolean,
      default: !1
    },
    showGroup: {
      type: String,
      default: null
    },
    ariaId: {
      default: null
    },
    disabled: {
      type: Boolean,
      default: void 0
    },
    positioningDisabled: {
      type: Boolean,
      default: void 0
    },
    placement: {
      type: String,
      default: void 0
    },
    delay: {
      type: [String, Number, Object],
      default: void 0
    },
    distance: {
      type: [Number, String],
      default: void 0
    },
    skidding: {
      type: [Number, String],
      default: void 0
    },
    triggers: {
      type: Array,
      default: void 0
    },
    showTriggers: {
      type: [Array, Function],
      default: void 0
    },
    hideTriggers: {
      type: [Array, Function],
      default: void 0
    },
    popperTriggers: {
      type: Array,
      default: void 0
    },
    popperShowTriggers: {
      type: [Array, Function],
      default: void 0
    },
    popperHideTriggers: {
      type: [Array, Function],
      default: void 0
    },
    container: {
      type: [String, Object, Et, Boolean],
      default: void 0
    },
    boundary: {
      type: [String, Et],
      default: void 0
    },
    strategy: {
      type: String,
      default: void 0
    },
    autoHide: {
      type: [Boolean, Function],
      default: void 0
    },
    handleResize: {
      type: Boolean,
      default: void 0
    },
    instantMove: {
      type: Boolean,
      default: void 0
    },
    eagerMount: {
      type: Boolean,
      default: void 0
    },
    popperClass: {
      type: [String, Array, Object],
      default: void 0
    },
    computeTransformOrigin: {
      type: Boolean,
      default: void 0
    },
    autoMinSize: {
      type: Boolean,
      default: void 0
    },
    autoSize: {
      type: [Boolean, String],
      default: void 0
    },
    autoMaxSize: {
      type: Boolean,
      default: void 0
    },
    autoBoundaryMaxSize: {
      type: Boolean,
      default: void 0
    },
    preventOverflow: {
      type: Boolean,
      default: void 0
    },
    overflowPadding: {
      type: [Number, String],
      default: void 0
    },
    arrowPadding: {
      type: [Number, String],
      default: void 0
    },
    arrowOverflow: {
      type: Boolean,
      default: void 0
    },
    flip: {
      type: Boolean,
      default: void 0
    },
    shift: {
      type: Boolean,
      default: void 0
    },
    shiftCrossAxis: {
      type: Boolean,
      default: void 0
    },
    noAutoFocus: {
      type: Boolean,
      default: void 0
    },
    disposeTimeout: {
      type: Number,
      default: void 0
    }
  },
  emits: {
    show: () => !0,
    hide: () => !0,
    "update:shown": (e) => !0,
    "apply-show": () => !0,
    "apply-hide": () => !0,
    "close-group": () => !0,
    "close-directive": () => !0,
    "auto-hide": () => !0,
    resize: () => !0
  },
  computed: {
    finalTheme() {
      var e;
      return (e = this.theme) != null ? e : this.$options.vPopperTheme;
    }
  },
  methods: {
    getTargetNodes() {
      return Array.from(this.$el.children).filter((e) => e !== this.$refs.popperContent.$el);
    }
  }
});
function ns(e, t, o, i, n, s) {
  const r = Ne("PopperContent"), l = Ne("Popper");
  return $(), J(l, We({ ref: "popper" }, e.$props, {
    theme: e.finalTheme,
    "target-nodes": e.getTargetNodes,
    "popper-node": () => e.$refs.popperContent.$el,
    class: [
      e.themeClass
    ],
    onShow: t[0] || (t[0] = () => e.$emit("show")),
    onHide: t[1] || (t[1] = () => e.$emit("hide")),
    "onUpdate:shown": t[2] || (t[2] = (a) => e.$emit("update:shown", a)),
    onApplyShow: t[3] || (t[3] = () => e.$emit("apply-show")),
    onApplyHide: t[4] || (t[4] = () => e.$emit("apply-hide")),
    onCloseGroup: t[5] || (t[5] = () => e.$emit("close-group")),
    onCloseDirective: t[6] || (t[6] = () => e.$emit("close-directive")),
    onAutoHide: t[7] || (t[7] = () => e.$emit("auto-hide")),
    onResize: t[8] || (t[8] = () => e.$emit("resize"))
  }), {
    default: M(({
      popperId: a,
      isShown: p,
      shouldMountContent: f,
      skipTransition: m,
      autoHide: h,
      show: u,
      hide: v,
      handleResize: b,
      onResize: B,
      classes: _,
      result: C
    }) => [
      j(e.$slots, "default", {
        shown: p,
        show: u,
        hide: v
      }),
      N(r, {
        ref: "popperContent",
        "popper-id": a,
        theme: e.finalTheme,
        shown: p,
        mounted: f,
        "skip-transition": m,
        "auto-hide": h,
        "handle-resize": b,
        classes: _,
        result: C,
        onHide: v,
        onResize: B
      }, {
        default: M(() => [
          j(e.$slots, "popper", {
            shown: p,
            hide: v
          })
        ]),
        _: 2
      }, 1032, ["popper-id", "theme", "shown", "mounted", "skip-transition", "auto-hide", "handle-resize", "classes", "result", "onHide", "onResize"])
    ]),
    _: 3
  }, 16, ["theme", "target-nodes", "popper-node", "class"]);
}
const Ut = /* @__PURE__ */ Zt(is, [["render", ns]]);
({
  ...Ut
});
({
  ...Ut
});
const ss = {
  ...Ut,
  name: "VTooltip",
  vPopperTheme: "tooltip"
};
pe({
  name: "VTooltipDirective",
  components: {
    Popper: Wo(),
    PopperContent: Uo
  },
  mixins: [
    qo
  ],
  inheritAttrs: !1,
  props: {
    theme: {
      type: String,
      default: "tooltip"
    },
    html: {
      type: Boolean,
      default: (e) => Pt(e.theme, "html")
    },
    content: {
      type: [String, Number, Function],
      default: null
    },
    loadingContent: {
      type: String,
      default: (e) => Pt(e.theme, "loadingContent")
    },
    targetNodes: {
      type: Function,
      required: !0
    }
  },
  data() {
    return {
      asyncContent: null
    };
  },
  computed: {
    isContentAsync() {
      return typeof this.content == "function";
    },
    loading() {
      return this.isContentAsync && this.asyncContent == null;
    },
    finalContent() {
      return this.isContentAsync ? this.loading ? this.loadingContent : this.asyncContent : this.content;
    }
  },
  watch: {
    content: {
      handler() {
        this.fetchContent(!0);
      },
      immediate: !0
    },
    async finalContent() {
      await this.$nextTick(), this.$refs.popper.onResize();
    }
  },
  created() {
    this.$_fetchId = 0;
  },
  methods: {
    fetchContent(e) {
      if (typeof this.content == "function" && this.$_isShown && (e || !this.$_loading && this.asyncContent == null)) {
        this.asyncContent = null, this.$_loading = !0;
        const t = ++this.$_fetchId, o = this.content(this);
        o.then ? o.then((i) => this.onResult(t, i)) : this.onResult(t, o);
      }
    },
    onResult(e, t) {
      e === this.$_fetchId && (this.$_loading = !1, this.asyncContent = t);
    },
    onShow() {
      this.$_isShown = !0, this.fetchContent();
    },
    onHide() {
      this.$_isShown = !1;
    }
  }
});
const ge = ss;
const rs = ["innerHTML"], as = ["innerHTML"], ps = /* @__PURE__ */ pe({
  __name: "AntDesign",
  props: {
    code: {},
    showCode: {},
    title: { default: "\u9ED8\u8BA4\u6807\u9898" },
    description: { default: "\u63CF\u8FF0\u5185\u5BB9" }
  },
  setup(e) {
    const t = e, o = Nt(), { isCodeFold: i, setCodeFold: n } = Rt(), { clickCopy: s } = Ft(), r = P(decodeURIComponent(t.code)), l = P(decodeURIComponent(t.showCode)), a = P(null), p = () => {
      s(r.value);
    }, f = F(() => {
      var h;
      return a.value ? (h = a.value) == null ? void 0 : h.clientHeight : 0;
    }), m = (h) => {
      i.value ? a.value.style.height = "0px" : a.value.style.height = `${h}px`;
    };
    return Ye(() => {
      const h = f.value;
      m(h);
    }), gt(i, () => {
      const h = f.value;
      m(h);
    }), (h, u) => {
      const v = Ne("ClientOnly");
      return $(), S(ie, null, [
        T("div", {
          class: D([y(o).e("ant-design__container")])
        }, [
          T("section", {
            class: D([y(o).bem("preview")])
          }, [
            N(v, null, {
              default: M(() => [
                j(h.$slots, "default")
              ]),
              _: 3
            })
          ], 2),
          T("section", {
            class: D([y(o).bem("description")])
          }, [
            t.title ? ($(), S("div", {
              key: 0,
              class: D([y(o).bem("description", "title")])
            }, Oe(h.title), 3)) : te("", !0),
            t.description ? ($(), S("div", {
              key: 1,
              class: D([y(o).bem("description", "content")]),
              innerHTML: h.description
            }, null, 10, rs)) : te("", !0),
            t.description || !t.title && !t.description ? ($(), S("div", {
              key: 2,
              class: D([y(o).bem("description", "split-line")])
            }, null, 2)) : te("", !0),
            T("div", {
              class: D([y(o).bem("description", "handle-btn")])
            }, [
              N(y(ge), { placement: "bottom" }, {
                popper: M(() => [...u[2] || (u[2] = [
                  re(" \u590D\u5236\u4EE3\u7801 ", -1)
                ])]),
                default: M(() => [
                  N(Lt, { onClick: p })
                ]),
                _: 1
              }),
              y(i) ? ($(), J(y(ge), {
                key: 1,
                placement: "bottom"
              }, {
                popper: M(() => [...u[4] || (u[4] = [
                  re(" \u5C55\u5F00\u4EE3\u7801 ", -1)
                ])]),
                default: M(() => [
                  N(Mt, {
                    onClick: u[1] || (u[1] = (b) => y(n)(!1))
                  })
                ]),
                _: 1
              })) : ($(), J(y(ge), {
                key: 0,
                placement: "bottom"
              }, {
                popper: M(() => [...u[3] || (u[3] = [
                  re(" \u6298\u53E0\u4EE3\u7801 ", -1)
                ])]),
                default: M(() => [
                  N(Ht, {
                    onClick: u[0] || (u[0] = (b) => y(n)(!0))
                  })
                ]),
                _: 1
              }))
            ], 2)
          ], 2),
          T("section", {
            class: D([y(o).bem("source")]),
            ref_key: "sourceCodeArea",
            ref: a
          }, [
            T("div", {
              innerHTML: l.value,
              class: "language-vue"
            }, null, 8, as)
          ], 2)
        ], 2),
        N(y(zt), {
          expand: !0,
          closeButton: "",
          richColors: ""
        })
      ], 64);
    };
  }
});
const ls = ["innerHTML"], hs = /* @__PURE__ */ pe({
  __name: "ElementPlus",
  props: {
    code: {},
    showCode: {},
    title: { default: "\u9ED8\u8BA4\u6807\u9898" },
    description: { default: "\u63CF\u8FF0\u5185\u5BB9" }
  },
  setup(e) {
    const t = e, o = Nt(), { isCodeFold: i, setCodeFold: n } = Rt(), { clickCopy: s } = Ft(), r = P(decodeURIComponent(t.code)), l = P(decodeURIComponent(t.showCode)), a = P(null), p = () => {
      s(r.value);
    }, f = F(() => {
      var h;
      return a.value ? (h = a.value) == null ? void 0 : h.clientHeight : 0;
    }), m = (h) => {
      i.value ? a.value.style.height = "0px" : a.value.style.height = `${h}px`;
    };
    return Ye(() => {
      const h = f.value;
      m(h);
    }), gt(i, () => {
      const h = f.value;
      m(h);
    }), (h, u) => {
      const v = Ne("ClientOnly");
      return $(), S(ie, null, [
        T("div", {
          class: D([y(o).e("element-plus__container")])
        }, [
          T("section", {
            class: D([y(o).bem("preview")])
          }, [
            N(v, null, {
              default: M(() => [
                j(h.$slots, "default")
              ]),
              _: 3
            })
          ], 2),
          T("section", {
            class: D([y(o).bem("description")])
          }, [
            T("div", {
              class: D([y(o).bem("description", "split-line")])
            }, null, 2),
            T("div", {
              class: D([y(o).bem("description", "handle-btn")])
            }, [
              N(y(ge), { placement: "bottom" }, {
                popper: M(() => [...u[2] || (u[2] = [
                  re(" \u590D\u5236\u4EE3\u7801 ", -1)
                ])]),
                default: M(() => [
                  N(Lt, { onClick: p })
                ]),
                _: 1
              }),
              y(i) ? ($(), J(y(ge), {
                key: 1,
                placement: "bottom"
              }, {
                popper: M(() => [...u[4] || (u[4] = [
                  re(" \u5C55\u5F00\u4EE3\u7801 ", -1)
                ])]),
                default: M(() => [
                  N(Mt, {
                    onClick: u[1] || (u[1] = (b) => y(n)(!1))
                  })
                ]),
                _: 1
              })) : ($(), J(y(ge), {
                key: 0,
                placement: "bottom"
              }, {
                popper: M(() => [...u[3] || (u[3] = [
                  re(" \u6298\u53E0\u4EE3\u7801 ", -1)
                ])]),
                default: M(() => [
                  N(Ht, {
                    onClick: u[0] || (u[0] = (b) => y(n)(!0))
                  })
                ]),
                _: 1
              }))
            ], 2)
          ], 2),
          T("section", {
            class: D([y(o).bem("source")]),
            ref_key: "sourceCodeArea",
            ref: a
          }, [
            T("div", {
              innerHTML: l.value,
              class: "language-vue"
            }, null, 8, ls)
          ], 2)
        ], 2),
        N(y(zt), {
          expand: !0,
          closeButton: "",
          richColors: ""
        })
      ], 64);
    };
  }
});
const cs = ["innerHTML"], fs = /* @__PURE__ */ pe({
  __name: "NaiveUI",
  props: {
    code: {},
    showCode: {},
    title: { default: "\u9ED8\u8BA4\u6807\u9898" },
    description: { default: "\u63CF\u8FF0\u5185\u5BB9" }
  },
  setup(e) {
    const t = e, o = Nt(), { isCodeFold: i, setCodeFold: n } = Rt(), { clickCopy: s } = Ft(), r = P(decodeURIComponent(t.code)), l = P(decodeURIComponent(t.showCode)), a = P(null), p = () => {
      s(r.value);
    }, f = F(() => {
      var h;
      return a.value ? (h = a.value) == null ? void 0 : h.clientHeight : 0;
    }), m = (h) => {
      i.value ? a.value.style.height = "0px" : a.value.style.height = `${h}px`;
    };
    return Ye(() => {
      const h = f.value;
      m(h);
    }), gt(i, () => {
      const h = f.value;
      m(h);
    }), (h, u) => {
      const v = Ne("ClientOnly");
      return $(), S(ie, null, [
        T("div", {
          class: D([y(o).e("naive-ui__container")])
        }, [
          T("section", {
            class: D([y(o).bem("name_handle")])
          }, [
            t.title ? ($(), S("div", {
              key: 0,
              class: D([y(o).bem("component", "name")])
            }, Oe(h.title), 3)) : te("", !0),
            T("div", {
              class: D([y(o).bem("description", "btns")])
            }, [
              N(y(ge), { placement: "bottom" }, {
                popper: M(() => [...u[2] || (u[2] = [
                  re(" \u590D\u5236\u4EE3\u7801 ", -1)
                ])]),
                default: M(() => [
                  N(Lt, { onClick: p })
                ]),
                _: 1
              }),
              y(i) ? ($(), J(y(ge), {
                key: 1,
                placement: "bottom"
              }, {
                popper: M(() => [...u[4] || (u[4] = [
                  re(" \u5C55\u5F00\u4EE3\u7801 ", -1)
                ])]),
                default: M(() => [
                  N(Mt, {
                    onClick: u[1] || (u[1] = (b) => y(n)(!1))
                  })
                ]),
                _: 1
              })) : ($(), J(y(ge), {
                key: 0,
                placement: "bottom"
              }, {
                popper: M(() => [...u[3] || (u[3] = [
                  re(" \u6298\u53E0\u4EE3\u7801 ", -1)
                ])]),
                default: M(() => [
                  N(Ht, {
                    onClick: u[0] || (u[0] = (b) => y(n)(!0))
                  })
                ]),
                _: 1
              }))
            ], 2)
          ], 2),
          t.description ? ($(), S("section", {
            key: 0,
            class: D([y(o).bem("description")])
          }, [
            T("span", null, Oe(h.description), 1)
          ], 2)) : te("", !0),
          T("section", {
            class: D([y(o).bem("preview")])
          }, [
            N(v, null, {
              default: M(() => [
                j(h.$slots, "default")
              ]),
              _: 3
            })
          ], 2),
          T("section", {
            class: D([y(o).bem("source")]),
            ref_key: "sourceCodeArea",
            ref: a
          }, [
            T("div", {
              innerHTML: l.value,
              class: "language-vue"
            }, null, 8, cs)
          ], 2)
        ], 2),
        N(y(zt), {
          expand: !0,
          closeButton: "",
          richColors: ""
        })
      ], 64);
    };
  }
});
export {
  ps as AntDesignContainer,
  hs as ElementPlusContainer,
  fs as NaiveUIContainer
};
