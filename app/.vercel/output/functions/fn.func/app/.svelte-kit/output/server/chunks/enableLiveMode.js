import { SanityClient } from "@sanity/client";
import { stegaEncodeSourceMap } from "@sanity/client/stega";
import { f as fe } from "./index3.js";
let r;
const o = new Uint8Array(16);
function s() {
  if (!r && (r = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !r)) throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return r(o);
}
const i = [];
for (let e = 0; e < 256; ++e) i.push((e + 256).toString(16).slice(1));
var a = { randomUUID: typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto) };
function c(e, t, n) {
  if (a.randomUUID && !t && !e) return a.randomUUID();
  const r2 = (e = e || {}).random || (e.rng || s)();
  return r2[6] = 15 & r2[6] | 64, r2[8] = 63 & r2[8] | 128, function(e2, t2 = 0) {
    return i[e2[t2 + 0]] + i[e2[t2 + 1]] + i[e2[t2 + 2]] + i[e2[t2 + 3]] + "-" + i[e2[t2 + 4]] + i[e2[t2 + 5]] + "-" + i[e2[t2 + 6]] + i[e2[t2 + 7]] + "-" + i[e2[t2 + 8]] + i[e2[t2 + 9]] + "-" + i[e2[t2 + 10]] + i[e2[t2 + 11]] + i[e2[t2 + 12]] + i[e2[t2 + 13]] + i[e2[t2 + 14]] + i[e2[t2 + 15]];
  }(r2);
}
const d = ["channel/disconnect", "channel/response", "channel/heartbeat"], u = ["handshake/syn", "handshake/syn-ack", "handshake/ack"], p = (e) => d.some((t) => t === e), l = (e) => u.some((t) => t === e), f = ({ data: e = {} }) => "object" == typeof e && null !== e && !Array.isArray(e) && !("domain" in e) && ["id", "type", "from", "to"].every((t) => t in e) && e.type.startsWith("handshake/");
function y(e) {
  const t = window.self !== window.top || window.opener, n = { buffer: [], id: null, origin: null, source: null, status: "connecting" };
  function r2(t2, r3) {
    if (l(t2) || p(t2) || "connecting" !== n.status && "reconnecting" !== n.status) {
      if (n.id && n.origin && n.source) {
        const o3 = { connectionId: n.id, data: r3, domain: "sanity/channels", from: e.id, id: c(), to: e.connectTo, type: t2 };
        try {
          n.source.postMessage(o3, { targetOrigin: n.origin });
        } catch {
          throw new Error(`Failed to postMessage '${o3.id}' on '${e.id}'`);
        }
      }
    } else n.buffer.push({ type: t2, data: r3 });
  }
  function o2(t2) {
    if (f(t2)) console.error("Visual editing package mismatch detected! Please ensure you are using the latest version of Sanity Studio and any packages listed here:\nhttps://github.com/sanity-io/visual-editing");
    else if (function(t3) {
      const { data: n2 } = t3;
      return "sanity/channels" === n2.domain && n2.to === e.id && n2.from === e.connectTo && "channel/response" !== n2.type;
    }(t2)) {
      const { data: e2 } = t2;
      if (n.origin && t2.origin !== n.origin) return;
      if (t2.source && n.source !== t2.source && (n.source = t2.source), l(e2.type) && e2.data) {
        if ("handshake/syn" === e2.type) return n.origin = t2.origin, n.id = e2.data.id, a2("connecting"), void r2("handshake/syn-ack", { id: n.id });
        if ("handshake/ack" === e2.type && e2.data.id === n.id) return void a2("connected");
      } else if (e2.connectionId === n.id && t2.origin === n.origin) {
        if ("channel/disconnect" === e2.type) return void a2("disconnected");
        {
          const t3 = [e2.type, e2.data];
          s2.forEach((e3) => {
            e3(...t3);
          }), r2("channel/response", { responseTo: e2.id });
        }
        return;
      }
    }
  }
  const s2 = /* @__PURE__ */ new Set();
  const i2 = /* @__PURE__ */ new Set();
  function a2(e2) {
    n.status = e2, i2.forEach((t2) => {
      t2(e2);
    }), "connected" === e2 && function() {
      const e3 = [...n.buffer];
      n.buffer.splice(0, n.buffer.length), e3.forEach(({ type: e4, data: t2 }) => {
        r2(e4, t2);
      });
    }();
  }
  return window.addEventListener("message", o2, false), a2("connecting"), { destroy: function() {
    ["disconnected"].includes(n.status) || a2("disconnected"), s2.clear(), i2.clear(), window.removeEventListener("message", o2, false);
  }, inFrame: t, send: function(e2, t2) {
    r2(e2, t2);
  }, subscribe: function(e2) {
    return s2.add(e2), () => s2.delete(e2);
  }, onStatusUpdate: function(e2) {
    return i2.add(e2), () => i2.delete(e2);
  } };
}
function g(r2) {
  const { client: o2, setFetcher: s2, onConnect: i2, onDisconnect: a2 } = r2;
  if (!(o2 && o2 instanceof SanityClient)) throw new Error(`Expected \`client\` to be an instance of SanityClient or SanityStegaClient: ${JSON.stringify(o2)}`);
  const { projectId: c2, dataset: d2 } = o2.config(), u2 = fe("previewDrafts"), p2 = fe(false), l2 = /* @__PURE__ */ new Map(), f2 = y({ id: "loaders", connectTo: "presentation" });
  let g2;
  f2.onStatusUpdate((e) => {
    "connected" === e ? p2.set(true) : "disconnected" === e && p2.set(false);
  }), f2.subscribe((e, n) => {
    if ("loader/perspective" === e && n.projectId === c2 && n.dataset === d2) {
      if ("published" !== n.perspective && "previewDrafts" !== n.perspective) throw new Error(`Unsupported perspective: ${JSON.stringify(n.perspective)}`);
      u2.set(n.perspective), S();
    } else if ("loader/query-change" === e && n.projectId === c2 && n.dataset === d2) {
      const { perspective: e2, query: r3, params: s3 } = n;
      void 0 !== n.result && void 0 !== n.resultSourceMap && o2.config().stega.enabled ? l2.set(JSON.stringify({ perspective: e2, query: r3, params: s3 }), { ...n, result: stegaEncodeSourceMap(n.result, n.resultSourceMap, o2.config().stega) }) : l2.set(JSON.stringify({ perspective: e2, query: r3, params: s3 }), n), S();
    }
  });
  const v = p2.listen((e) => {
    e ? (g2 = s2({ hydrate: (e2, t, n) => {
      const r3 = (null == n ? void 0 : n.perspective) || u2.get(), o3 = JSON.stringify({ perspective: r3, query: e2, params: t }), s3 = l2.get(o3);
      return void 0 !== (null == s3 ? void 0 : s3.result) && void 0 !== (null == s3 ? void 0 : s3.resultSourceMap) ? { loading: false, error: void 0, data: s3.result, sourceMap: s3.resultSourceMap, perspective: r3 } : { loading: true === p2.value && void 0 === (null == n ? void 0 : n.data) || void 0 === (null == n ? void 0 : n.sourceMap), error: void 0, data: null == n ? void 0 : n.data, sourceMap: null == n ? void 0 : n.sourceMap, perspective: (null == n ? void 0 : n.perspective) || "published" };
    }, fetch: (e2, t, n, r3) => {
      try {
        const o3 = m(e2, t, n);
        if (r3.signal.addEventListener("abort", () => {
          o3(), S();
        }, { once: true }), S(), n.setKey("error", void 0), r3.signal.aborted) return;
      } catch (e3) {
        n.setKey("error", e3), n.setKey("loading", false);
      }
    } }), null == i2 || i2()) : (null == g2 || g2(), null == a2 || a2());
  }), h = /* @__PURE__ */ new Set(), m = (e, t, n) => {
    const r3 = { query: e, params: t, $fetch: n };
    h.add(r3), w();
    const o3 = setInterval(() => w(true), 1e3);
    return () => {
      clearInterval(o3), h.delete(r3), w();
    };
  }, w = (e) => {
    if (!f2) throw new Error("No channel");
    const t = u2.get();
    for (const { query: n, params: r3, $fetch: o3 } of h) f2.send("loader/query-listen", { projectId: c2, dataset: d2, perspective: t, query: n, params: r3, heartbeat: 1e3 }), !e && true === p2.value && o3.setKey("loading", true), o3.setKey("perspective", t);
  };
  function S() {
    var e, t;
    const n = u2.get(), r3 = [];
    for (const { query: o3, params: s3, $fetch: i3 } of h) {
      const a3 = JSON.stringify({ perspective: n, query: o3, params: s3 }), c3 = l2.get(a3);
      c3 && (i3.set({ data: c3.result, error: void 0, loading: false, perspective: n, sourceMap: c3.resultSourceMap }), r3.push(...null != (t = null == (e = c3.resultSourceMap) ? void 0 : e.documents) ? t : []));
    }
    null == f2 || f2.send("loader/documents", { projectId: c2, dataset: d2, perspective: n, documents: r3 });
  }
  return () => {
    null == g2 || g2(), v(), f2.destroy();
  };
}
export {
  g as enableLiveMode
};
