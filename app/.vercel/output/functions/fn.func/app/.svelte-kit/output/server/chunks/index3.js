import { a as readonly, w as writable, d as derived } from "./index2.js";
import { getPublishedId, studioPath, studioPathToJsonPath, resolveEditInfo, jsonPathToStudioPath } from "@sanity/client/csm";
import { e as error, r as redirect } from "./index.js";
import crypto from "crypto";
var e = {};
var t = { kValues: Symbol("values"), kStorage: Symbol("kStorage"), kStorages: Symbol("kStorages"), kTransfromer: Symbol("kTransformer"), kTTL: Symbol("kTTL"), kOnDedupe: Symbol("kOnDedupe"), kOnError: Symbol("kOnError"), kOnHit: Symbol("kOnHit"), kOnMiss: Symbol("kOnMiss"), kStale: Symbol("kStale") }, r = { exports: {} };
!function(e5, t2) {
  const { hasOwnProperty: r2 } = Object.prototype, n2 = g2();
  n2.configure = g2, n2.stringify = n2, n2.default = n2, t2.stringify = n2, t2.configure = g2, e5.exports = n2;
  const s2 = /[\u0000-\u001f\u0022\u005c\ud800-\udfff]|[\ud800-\udbff](?![\udc00-\udfff])|(?:[^\ud800-\udbff]|^)[\udc00-\udfff]/;
  function i2(e6) {
    return e6.length < 5e3 && !s2.test(e6) ? `"${e6}"` : JSON.stringify(e6);
  }
  function o2(e6) {
    if (e6.length > 200) return e6.sort();
    for (let t3 = 1; t3 < e6.length; t3++) {
      const r3 = e6[t3];
      let n3 = t3;
      for (; 0 !== n3 && e6[n3 - 1] > r3; ) e6[n3] = e6[n3 - 1], n3--;
      e6[n3] = r3;
    }
    return e6;
  }
  const a2 = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(Object.getPrototypeOf(new Int8Array())), Symbol.toStringTag).get;
  function c3(e6) {
    return void 0 !== a2.call(e6) && 0 !== e6.length;
  }
  function l2(e6, t3, r3) {
    e6.length < r3 && (r3 = e6.length);
    const n3 = "," === t3 ? "" : " ";
    let s3 = `"0":${n3}${e6[0]}`;
    for (let i3 = 1; i3 < r3; i3++) s3 += `${t3}"${i3}":${n3}${e6[i3]}`;
    return s3;
  }
  function u2(e6, t3) {
    let n3;
    if (r2.call(e6, t3) && (n3 = e6[t3], "boolean" != typeof n3)) throw new TypeError(`The "${t3}" argument must be of type boolean`);
    return void 0 === n3 || n3;
  }
  function f2(e6, t3) {
    let n3;
    if (r2.call(e6, t3)) {
      if (n3 = e6[t3], "number" != typeof n3) throw new TypeError(`The "${t3}" argument must be of type number`);
      if (!Number.isInteger(n3)) throw new TypeError(`The "${t3}" argument must be an integer`);
      if (n3 < 1) throw new RangeError(`The "${t3}" argument must be >= 1`);
    }
    return void 0 === n3 ? 1 / 0 : n3;
  }
  function h2(e6) {
    return 1 === e6 ? "1 item" : `${e6} items`;
  }
  function g2(e6) {
    const t3 = function(e7) {
      if (r2.call(e7, "strict")) {
        const t4 = e7.strict;
        if ("boolean" != typeof t4) throw new TypeError('The "strict" argument must be of type boolean');
        if (t4) return (e8) => {
          let t5 = "Object can not safely be stringified. Received type " + typeof e8;
          throw "function" != typeof e8 && (t5 += ` (${e8.toString()})`), new Error(t5);
        };
      }
    }(e6 = { ...e6 });
    t3 && (void 0 === e6.bigint && (e6.bigint = false), "circularValue" in e6 || (e6.circularValue = Error));
    const n3 = function(e7) {
      if (r2.call(e7, "circularValue")) {
        const t4 = e7.circularValue;
        if ("string" == typeof t4) return `"${t4}"`;
        if (null == t4) return t4;
        if (t4 === Error || t4 === TypeError) return { toString() {
          throw new TypeError("Converting circular structure to JSON");
        } };
        throw new TypeError('The "circularValue" argument must be of type string or the value null or undefined');
      }
      return '"[Circular]"';
    }(e6), s3 = u2(e6, "bigint"), a3 = u2(e6, "deterministic"), g3 = f2(e6, "maximumDepth"), d2 = f2(e6, "maximumBreadth");
    function y2(e7, r3, l3, u3, f3, m3) {
      let p3 = r3[e7];
      switch ("object" == typeof p3 && null !== p3 && "function" == typeof p3.toJSON && (p3 = p3.toJSON(e7)), p3 = u3.call(r3, e7, p3), typeof p3) {
        case "string":
          return i2(p3);
        case "object": {
          if (null === p3) return "null";
          if (-1 !== l3.indexOf(p3)) return n3;
          let e8 = "", t4 = ",";
          const r4 = m3;
          if (Array.isArray(p3)) {
            if (0 === p3.length) return "[]";
            if (g3 < l3.length + 1) return '"[Array]"';
            l3.push(p3), "" !== f3 && (e8 += `
${m3 += f3}`, t4 = `,
${m3}`);
            const n4 = Math.min(p3.length, d2);
            let s5 = 0;
            for (; s5 < n4 - 1; s5++) {
              const r5 = y2(String(s5), p3, l3, u3, f3, m3);
              e8 += void 0 !== r5 ? r5 : "null", e8 += t4;
            }
            const i3 = y2(String(s5), p3, l3, u3, f3, m3);
            if (e8 += void 0 !== i3 ? i3 : "null", p3.length - 1 > d2) {
              e8 += `${t4}"... ${h2(p3.length - d2 - 1)} not stringified"`;
            }
            return "" !== f3 && (e8 += `
${r4}`), l3.pop(), `[${e8}]`;
          }
          let s4 = Object.keys(p3);
          const v3 = s4.length;
          if (0 === v3) return "{}";
          if (g3 < l3.length + 1) return '"[Object]"';
          let b2 = "", w2 = "";
          "" !== f3 && (t4 = `,
${m3 += f3}`, b2 = " ");
          const k2 = Math.min(v3, d2);
          a3 && !c3(p3) && (s4 = o2(s4)), l3.push(p3);
          for (let r5 = 0; r5 < k2; r5++) {
            const n4 = s4[r5], o3 = y2(n4, p3, l3, u3, f3, m3);
            void 0 !== o3 && (e8 += `${w2}${i2(n4)}:${b2}${o3}`, w2 = t4);
          }
          if (v3 > d2) {
            e8 += `${w2}"...":${b2}"${h2(v3 - d2)} not stringified"`, w2 = t4;
          }
          return "" !== f3 && w2.length > 1 && (e8 = `
${m3}${e8}
${r4}`), l3.pop(), `{${e8}}`;
        }
        case "number":
          return isFinite(p3) ? String(p3) : t3 ? t3(p3) : "null";
        case "boolean":
          return true === p3 ? "true" : "false";
        case "undefined":
          return;
        case "bigint":
          if (s3) return String(p3);
        default:
          return t3 ? t3(p3) : void 0;
      }
    }
    function m2(e7, r3, o3, a4, c4, l3) {
      switch ("object" == typeof r3 && null !== r3 && "function" == typeof r3.toJSON && (r3 = r3.toJSON(e7)), typeof r3) {
        case "string":
          return i2(r3);
        case "object": {
          if (null === r3) return "null";
          if (-1 !== o3.indexOf(r3)) return n3;
          const e8 = l3;
          let t4 = "", s4 = ",";
          if (Array.isArray(r3)) {
            if (0 === r3.length) return "[]";
            if (g3 < o3.length + 1) return '"[Array]"';
            o3.push(r3), "" !== c4 && (t4 += `
${l3 += c4}`, s4 = `,
${l3}`);
            const n4 = Math.min(r3.length, d2);
            let i3 = 0;
            for (; i3 < n4 - 1; i3++) {
              const e9 = m2(String(i3), r3[i3], o3, a4, c4, l3);
              t4 += void 0 !== e9 ? e9 : "null", t4 += s4;
            }
            const u4 = m2(String(i3), r3[i3], o3, a4, c4, l3);
            if (t4 += void 0 !== u4 ? u4 : "null", r3.length - 1 > d2) {
              t4 += `${s4}"... ${h2(r3.length - d2 - 1)} not stringified"`;
            }
            return "" !== c4 && (t4 += `
${e8}`), o3.pop(), `[${t4}]`;
          }
          o3.push(r3);
          let u3 = "";
          "" !== c4 && (s4 = `,
${l3 += c4}`, u3 = " ");
          let f3 = "";
          for (const e9 of a4) {
            const n4 = m2(e9, r3[e9], o3, a4, c4, l3);
            void 0 !== n4 && (t4 += `${f3}${i2(e9)}:${u3}${n4}`, f3 = s4);
          }
          return "" !== c4 && f3.length > 1 && (t4 = `
${l3}${t4}
${e8}`), o3.pop(), `{${t4}}`;
        }
        case "number":
          return isFinite(r3) ? String(r3) : t3 ? t3(r3) : "null";
        case "boolean":
          return true === r3 ? "true" : "false";
        case "undefined":
          return;
        case "bigint":
          if (s3) return String(r3);
        default:
          return t3 ? t3(r3) : void 0;
      }
    }
    function p2(e7, r3, u3, f3, y3) {
      switch (typeof r3) {
        case "string":
          return i2(r3);
        case "object": {
          if (null === r3) return "null";
          if ("function" == typeof r3.toJSON) {
            if ("object" != typeof (r3 = r3.toJSON(e7))) return p2(e7, r3, u3, f3, y3);
            if (null === r3) return "null";
          }
          if (-1 !== u3.indexOf(r3)) return n3;
          const t4 = y3;
          if (Array.isArray(r3)) {
            if (0 === r3.length) return "[]";
            if (g3 < u3.length + 1) return '"[Array]"';
            u3.push(r3);
            let e8 = `
${y3 += f3}`;
            const n4 = `,
${y3}`, s5 = Math.min(r3.length, d2);
            let i3 = 0;
            for (; i3 < s5 - 1; i3++) {
              const t5 = p2(String(i3), r3[i3], u3, f3, y3);
              e8 += void 0 !== t5 ? t5 : "null", e8 += n4;
            }
            const o3 = p2(String(i3), r3[i3], u3, f3, y3);
            if (e8 += void 0 !== o3 ? o3 : "null", r3.length - 1 > d2) {
              e8 += `${n4}"... ${h2(r3.length - d2 - 1)} not stringified"`;
            }
            return e8 += `
${t4}`, u3.pop(), `[${e8}]`;
          }
          let s4 = Object.keys(r3);
          const m3 = s4.length;
          if (0 === m3) return "{}";
          if (g3 < u3.length + 1) return '"[Object]"';
          const v3 = `,
${y3 += f3}`;
          let b2 = "", w2 = "", k2 = Math.min(m3, d2);
          c3(r3) && (b2 += l2(r3, v3, d2), s4 = s4.slice(r3.length), k2 -= r3.length, w2 = v3), a3 && (s4 = o2(s4)), u3.push(r3);
          for (let e8 = 0; e8 < k2; e8++) {
            const t5 = s4[e8], n4 = p2(t5, r3[t5], u3, f3, y3);
            void 0 !== n4 && (b2 += `${w2}${i2(t5)}: ${n4}`, w2 = v3);
          }
          if (m3 > d2) {
            b2 += `${w2}"...": "${h2(m3 - d2)} not stringified"`, w2 = v3;
          }
          return "" !== w2 && (b2 = `
${y3}${b2}
${t4}`), u3.pop(), `{${b2}}`;
        }
        case "number":
          return isFinite(r3) ? String(r3) : t3 ? t3(r3) : "null";
        case "boolean":
          return true === r3 ? "true" : "false";
        case "undefined":
          return;
        case "bigint":
          if (s3) return String(r3);
        default:
          return t3 ? t3(r3) : void 0;
      }
    }
    function v2(e7, r3, u3) {
      switch (typeof r3) {
        case "string":
          return i2(r3);
        case "object": {
          if (null === r3) return "null";
          if ("function" == typeof r3.toJSON) {
            if ("object" != typeof (r3 = r3.toJSON(e7))) return v2(e7, r3, u3);
            if (null === r3) return "null";
          }
          if (-1 !== u3.indexOf(r3)) return n3;
          let t4 = "";
          if (Array.isArray(r3)) {
            if (0 === r3.length) return "[]";
            if (g3 < u3.length + 1) return '"[Array]"';
            u3.push(r3);
            const e8 = Math.min(r3.length, d2);
            let n4 = 0;
            for (; n4 < e8 - 1; n4++) {
              const e9 = v2(String(n4), r3[n4], u3);
              t4 += void 0 !== e9 ? e9 : "null", t4 += ",";
            }
            const s5 = v2(String(n4), r3[n4], u3);
            if (t4 += void 0 !== s5 ? s5 : "null", r3.length - 1 > d2) {
              t4 += `,"... ${h2(r3.length - d2 - 1)} not stringified"`;
            }
            return u3.pop(), `[${t4}]`;
          }
          let s4 = Object.keys(r3);
          const f3 = s4.length;
          if (0 === f3) return "{}";
          if (g3 < u3.length + 1) return '"[Object]"';
          let y3 = "", m3 = Math.min(f3, d2);
          c3(r3) && (t4 += l2(r3, ",", d2), s4 = s4.slice(r3.length), m3 -= r3.length, y3 = ","), a3 && (s4 = o2(s4)), u3.push(r3);
          for (let e8 = 0; e8 < m3; e8++) {
            const n4 = s4[e8], o3 = v2(n4, r3[n4], u3);
            void 0 !== o3 && (t4 += `${y3}${i2(n4)}:${o3}`, y3 = ",");
          }
          if (f3 > d2) {
            t4 += `${y3}"...":"${h2(f3 - d2)} not stringified"`;
          }
          return u3.pop(), `{${t4}}`;
        }
        case "number":
          return isFinite(r3) ? String(r3) : t3 ? t3(r3) : "null";
        case "boolean":
          return true === r3 ? "true" : "false";
        case "undefined":
          return;
        case "bigint":
          if (s3) return String(r3);
        default:
          return t3 ? t3(r3) : void 0;
      }
    }
    return function(e7, t4, r3) {
      if (arguments.length > 1) {
        let n4 = "";
        if ("number" == typeof r3 ? n4 = " ".repeat(Math.min(r3, 10)) : "string" == typeof r3 && (n4 = r3.slice(0, 10)), null != t4) {
          if ("function" == typeof t4) return y2("", { "": e7 }, [], t4, n4, "");
          if (Array.isArray(t4)) return m2("", e7, [], function(e8) {
            const t5 = /* @__PURE__ */ new Set();
            for (const r4 of e8) ("string" == typeof r4 || "number" == typeof r4) && t5.add(String(r4));
            return t5;
          }(t4), n4, "");
        }
        if (0 !== n4.length) return p2("", e7, [], n4, "");
      }
      return v2("", e7, []);
    };
  }
}(r, r.exports);
var n$1 = r.exports;
function s(e5) {
  return e5 * Math.random() | 0;
}
var i$1 = { findNotMatching: function(e5, t2) {
  const r2 = [];
  let n2 = 0;
  for (let s2 = 0; s2 < e5.length; s2++) for (let i2 = n2; i2 < t2.length; i2++) e5[s2] !== t2[i2] && (r2.push(t2[i2]), n2 = i2 + 1);
  return r2;
}, findMatchingIndexes: function(e5, t2) {
  const r2 = [];
  let n2 = 0;
  for (let s2 = 0; s2 < e5.length; s2++) for (let i2 = n2; i2 < t2.length; i2++) e5[s2] === t2[i2] && (r2.push(i2), n2 = i2 + 1);
  return r2;
}, bsearchIndex: function(e5, t2) {
  let r2 = 0, n2 = e5.length - 1;
  for (; r2 <= n2; ) {
    const s2 = (r2 + n2) / 2 | 0;
    if (e5[s2] === t2) return s2;
    e5[s2] < t2 ? r2 = s2 + 1 : n2 = s2 - 1;
  }
  return -1;
}, wildcardMatch: function(e5, t2) {
  if ("*" === e5 || e5.length === t2.length && e5 === t2) return true;
  let r2 = 0, n2 = 0;
  for (; r2 < e5.length && n2 < t2.length; ) if (e5[r2] !== t2[n2]) {
    if ("*" !== e5[r2]) return false;
    if (e5[r2 + 1] === t2[n2]) {
      r2++;
      continue;
    }
    n2++;
  } else r2++, n2++;
  return r2 >= e5.length - 1;
}, randomSubset: function(e5, t2) {
  if (e5.length < 1 || t2 < 1) return [];
  const r2 = Math.min(e5.length, t2), n2 = (o2 = 1, a2 = r2, (o2 = Math.floor(o2)) + s(1 + (a2 = Math.floor(a2)) - o2)), i2 = /* @__PURE__ */ new Set();
  var o2, a2;
  for (let t3 = 0; t3 < n2; t3++) i2.add(s(e5.length));
  const c3 = [];
  for (const t3 of i2) c3.push(e5[t3]);
  return c3;
}, abstractLogging: function() {
  const e5 = () => {
  };
  return { fatal: e5, error: e5, warn: e5, info: e5, debug: e5, trace: e5 };
}, isServerSide: typeof window > "u" };
var o$1, a$2, c$1 = class c {
  constructor(e5) {
    this.options = e5;
  }
  async get(e5) {
    throw new Error("storage get method not implemented");
  }
  async set(e5, t2, r2, n2) {
    throw new Error("storage set method not implemented");
  }
  async remove(e5) {
    throw new Error("storage remove method not implemented");
  }
  async invalidate(e5) {
    throw new Error("storage invalidate method not implemented");
  }
  async clear(e5) {
    throw new Error("storage clear method not implemented");
  }
  async refresh() {
    throw new Error("storage refresh method not implemented");
  }
};
function l$1(e5) {
  if ("function" != typeof e5) throw new Error("obliterator/iterator: expecting a function!");
  this.next = e5;
}
typeof Symbol < "u" && (l$1.prototype[Symbol.iterator] = function() {
  return this;
}), l$1.of = function() {
  var e5 = arguments, t2 = e5.length, r2 = 0;
  return new l$1(function() {
    return r2 >= t2 ? { done: true } : { done: false, value: e5[r2++] };
  });
}, l$1.empty = function() {
  return new l$1(function() {
    return { done: true };
  });
}, l$1.fromSequence = function(e5) {
  var t2 = 0, r2 = e5.length;
  return new l$1(function() {
    return t2 >= r2 ? { done: true } : { done: false, value: e5[t2++] };
  });
}, l$1.is = function(e5) {
  return e5 instanceof l$1 || "object" == typeof e5 && null !== e5 && "function" == typeof e5.next;
};
var u$1 = l$1, f$2 = {};
f$2.ARRAY_BUFFER_SUPPORT = typeof ArrayBuffer < "u", f$2.SYMBOL_SUPPORT = typeof Symbol < "u";
var h$1 = f$2, g$1 = h$1.ARRAY_BUFFER_SUPPORT, d$1 = h$1.SYMBOL_SUPPORT, y$2 = function(e5, t2) {
  var r2, n2, s2, i2, o2;
  if (!e5) throw new Error("obliterator/forEach: invalid iterable.");
  if ("function" != typeof t2) throw new Error("obliterator/forEach: expecting a callback.");
  if (Array.isArray(e5) || g$1 && ArrayBuffer.isView(e5) || "string" == typeof e5 || "[object Arguments]" === e5.toString()) for (s2 = 0, i2 = e5.length; s2 < i2; s2++) t2(e5[s2], s2);
  else if ("function" != typeof e5.forEach) if (d$1 && Symbol.iterator in e5 && "function" != typeof e5.next && (e5 = e5[Symbol.iterator]()), "function" != typeof e5.next) for (n2 in e5) e5.hasOwnProperty(n2) && t2(e5[n2], n2);
  else for (r2 = e5, s2 = 0; true !== (o2 = r2.next()).done; ) t2(o2.value, s2), s2++;
  else e5.forEach(t2);
}, m$1 = {};
!function(e5) {
  var t2 = Math.pow(2, 8) - 1, r2 = Math.pow(2, 16) - 1, n2 = Math.pow(2, 32) - 1, s2 = Math.pow(2, 7) - 1, i2 = Math.pow(2, 15) - 1, o2 = Math.pow(2, 31) - 1;
  e5.getPointerArray = function(e6) {
    var s3 = e6 - 1;
    if (s3 <= t2) return Uint8Array;
    if (s3 <= r2) return Uint16Array;
    if (s3 <= n2) return Uint32Array;
    throw new Error("mnemonist: Pointer Array of size > 4294967295 is not supported.");
  }, e5.getSignedPointerArray = function(e6) {
    var t3 = e6 - 1;
    return t3 <= s2 ? Int8Array : t3 <= i2 ? Int16Array : t3 <= o2 ? Int32Array : Float64Array;
  }, e5.getNumberType = function(e6) {
    return e6 === (0 | e6) ? -1 === Math.sign(e6) ? e6 <= 127 && e6 >= -128 ? Int8Array : e6 <= 32767 && e6 >= -32768 ? Int16Array : Int32Array : e6 <= 255 ? Uint8Array : e6 <= 65535 ? Uint16Array : Uint32Array : Float64Array;
  };
  var a2 = { Uint8Array: 1, Int8Array: 2, Uint16Array: 3, Int16Array: 4, Uint32Array: 5, Int32Array: 6, Float32Array: 7, Float64Array: 8 };
  e5.getMinimalRepresentation = function(t3, r3) {
    var n3, s3, i3, o3, c3, l2 = null, u2 = 0;
    for (o3 = 0, c3 = t3.length; o3 < c3; o3++) i3 = r3 ? r3(t3[o3]) : t3[o3], s3 = e5.getNumberType(i3), (n3 = a2[s3.name]) > u2 && (u2 = n3, l2 = s3);
    return l2;
  }, e5.isTypedArray = function(e6) {
    return typeof ArrayBuffer < "u" && ArrayBuffer.isView(e6);
  }, e5.concat = function() {
    var e6, t3, r3, n3 = 0;
    for (e6 = 0, r3 = arguments.length; e6 < r3; e6++) n3 += arguments[e6].length;
    var s3 = new arguments[0].constructor(n3);
    for (e6 = 0, t3 = 0; e6 < r3; e6++) s3.set(arguments[e6], t3), t3 += arguments[e6].length;
    return s3;
  }, e5.indices = function(t3) {
    for (var r3 = new (e5.getPointerArray(t3))(t3), n3 = 0; n3 < t3; n3++) r3[n3] = n3;
    return r3;
  };
}(m$1);
var p$2 = {}, v$2 = y$2, b$1 = m$1;
function w$1(e5) {
  return "number" == typeof e5.length ? e5.length : "number" == typeof e5.size ? e5.size : void 0;
}
p$2.isArrayLike = function(e5) {
  return Array.isArray(e5) || b$1.isTypedArray(e5);
}, p$2.guessLength = w$1, p$2.toArray = function(e5) {
  var t2 = w$1(e5), r2 = "number" == typeof t2 ? new Array(t2) : [], n2 = 0;
  return v$2(e5, function(e6) {
    r2[n2++] = e6;
  }), r2;
}, p$2.toArrayWithIndices = function(e5) {
  var t2 = w$1(e5), r2 = "number" == typeof t2 ? b$1.getPointerArray(t2) : Array, n2 = "number" == typeof t2 ? new Array(t2) : [], s2 = "number" == typeof t2 ? new r2(t2) : [], i2 = 0;
  return v$2(e5, function(e6) {
    n2[i2] = e6, s2[i2] = i2++;
  }), [n2, s2];
};
var k = u$1, S$1 = y$2, E$1 = m$1, R = p$2;
function $(e5, t2, r2) {
  if (arguments.length < 2 && (r2 = e5, e5 = null, t2 = null), this.capacity = r2, "number" != typeof this.capacity || this.capacity <= 0) throw new Error("mnemonist/lru-cache: capacity should be positive number.");
  if (!isFinite(this.capacity) || Math.floor(this.capacity) !== this.capacity) throw new Error("mnemonist/lru-cache: capacity should be a finite positive integer.");
  var n2 = E$1.getPointerArray(r2);
  this.forward = new n2(r2), this.backward = new n2(r2), this.K = "function" == typeof e5 ? new e5(r2) : new Array(r2), this.V = "function" == typeof t2 ? new t2(r2) : new Array(r2), this.size = 0, this.head = 0, this.tail = 0, this.items = {};
}
$.prototype.clear = function() {
  this.size = 0, this.head = 0, this.tail = 0, this.items = {};
}, $.prototype.splayOnTop = function(e5) {
  var t2 = this.head;
  if (this.head === e5) return this;
  var r2 = this.backward[e5], n2 = this.forward[e5];
  return this.tail === e5 ? this.tail = r2 : this.backward[n2] = r2, this.forward[r2] = n2, this.backward[t2] = e5, this.head = e5, this.forward[e5] = t2, this;
}, $.prototype.set = function(e5, t2) {
  var r2 = this.items[e5];
  if (typeof r2 < "u") return this.splayOnTop(r2), void (this.V[r2] = t2);
  this.size < this.capacity ? r2 = this.size++ : (r2 = this.tail, this.tail = this.backward[r2], delete this.items[this.K[r2]]), this.items[e5] = r2, this.K[r2] = e5, this.V[r2] = t2, this.forward[r2] = this.head, this.backward[this.head] = r2, this.head = r2;
}, $.prototype.setpop = function(e5, t2) {
  var r2 = null, n2 = null, s2 = this.items[e5];
  return typeof s2 < "u" ? (this.splayOnTop(s2), r2 = this.V[s2], this.V[s2] = t2, { evicted: false, key: e5, value: r2 }) : (this.size < this.capacity ? s2 = this.size++ : (s2 = this.tail, this.tail = this.backward[s2], r2 = this.V[s2], n2 = this.K[s2], delete this.items[n2]), this.items[e5] = s2, this.K[s2] = e5, this.V[s2] = t2, this.forward[s2] = this.head, this.backward[this.head] = s2, this.head = s2, n2 ? { evicted: true, key: n2, value: r2 } : null);
}, $.prototype.has = function(e5) {
  return e5 in this.items;
}, $.prototype.get = function(e5) {
  var t2 = this.items[e5];
  if (!(typeof t2 > "u")) return this.splayOnTop(t2), this.V[t2];
}, $.prototype.peek = function(e5) {
  var t2 = this.items[e5];
  if (!(typeof t2 > "u")) return this.V[t2];
}, $.prototype.forEach = function(e5, t2) {
  t2 = arguments.length > 1 ? t2 : this;
  for (var r2 = 0, n2 = this.size, s2 = this.head, i2 = this.K, o2 = this.V, a2 = this.forward; r2 < n2; ) e5.call(t2, o2[s2], i2[s2], this), s2 = a2[s2], r2++;
}, $.prototype.keys = function() {
  var e5 = 0, t2 = this.size, r2 = this.head, n2 = this.K, s2 = this.forward;
  return new k(function() {
    if (e5 >= t2) return { done: true };
    var i2 = n2[r2];
    return ++e5 < t2 && (r2 = s2[r2]), { done: false, value: i2 };
  });
}, $.prototype.values = function() {
  var e5 = 0, t2 = this.size, r2 = this.head, n2 = this.V, s2 = this.forward;
  return new k(function() {
    if (e5 >= t2) return { done: true };
    var i2 = n2[r2];
    return ++e5 < t2 && (r2 = s2[r2]), { done: false, value: i2 };
  });
}, $.prototype.entries = function() {
  var e5 = 0, t2 = this.size, r2 = this.head, n2 = this.K, s2 = this.V, i2 = this.forward;
  return new k(function() {
    if (e5 >= t2) return { done: true };
    var o2 = n2[r2], a2 = s2[r2];
    return ++e5 < t2 && (r2 = i2[r2]), { done: false, value: [o2, a2] };
  });
}, typeof Symbol < "u" && ($.prototype[Symbol.iterator] = $.prototype.entries), $.prototype.inspect = function() {
  for (var e5, t2 = /* @__PURE__ */ new Map(), r2 = this.entries(); !(e5 = r2.next()).done; ) t2.set(e5.value[0], e5.value[1]);
  return Object.defineProperty(t2, "constructor", { value: $, enumerable: false }), t2;
}, typeof Symbol < "u" && ($.prototype[Symbol.for("nodejs.util.inspect.custom")] = $.prototype.inspect), $.from = function(e5, t2, r2, n2) {
  if (arguments.length < 2) {
    if ("number" != typeof (n2 = R.guessLength(e5))) throw new Error("mnemonist/lru-cache.from: could not guess iterable length. Please provide desired capacity as last argument.");
  } else 2 === arguments.length && (n2 = t2, t2 = null, r2 = null);
  var s2 = new $(t2, r2, n2);
  return S$1(e5, function(e6, t3) {
    s2.set(t3, e6);
  }), s2;
};
const A = $, { abstractLogging: T } = i$1, O = c$1, { findMatchingIndexes: K, findNotMatching: M, bsearchIndex: _$1, wildcardMatch: z } = i$1, x = typeof globalThis.setImmediate < "u" ? globalThis.setImmediate : (e5, ...t2) => setTimeout(e5, 0, ...t2);
let L;
function N() {
  if (void 0 !== L) return L;
  L = Math.floor(Date.now() / 1e3);
  const e5 = setTimeout(j, 1e3);
  return "function" == typeof e5.unref && e5.unref(), L;
}
function j() {
  L = void 0;
}
var P = class extends O {
  constructor(e5 = {}) {
    if (e5.size && ("number" != typeof e5.size || e5.size < 1)) throw new Error("size must be a positive integer greater than 0");
    super(e5), this.size = e5.size || 1024, this.log = e5.log || T(), this.invalidation = e5.invalidation || false, this.init();
  }
  init() {
    this.store = new A(this.size), this.invalidation && (this.keysReferences = /* @__PURE__ */ new Map(), this.referencesKeys = /* @__PURE__ */ new Map());
  }
  get(e5) {
    this.log.debug({ msg: "acd/storage/memory.get", key: e5 });
    const t2 = this.store.get(e5);
    if (t2) {
      if (this.log.debug({ msg: "acd/storage/memory.get, entry", entry: t2, now: N() }), t2.start + t2.ttl > N()) return this.log.debug({ msg: "acd/storage/memory.get, key is NOT expired", key: e5, entry: t2 }), t2.value;
      this.log.debug({ msg: "acd/storage/memory.get, key is EXPIRED", key: e5, entry: t2 }), x(() => this.remove(e5));
    }
  }
  getTTL(e5) {
    this.log.debug({ msg: "acd/storage/memory.getTTL", key: e5 });
    const t2 = this.store.peek(e5);
    let r2 = 0;
    return t2 && (r2 = t2.start + t2.ttl - N(), r2 < 0 && (r2 = 0)), r2;
  }
  set(e5, t2, r2, n2) {
    if (this.log.debug({ msg: "acd/storage/memory.set", key: e5, value: t2, ttl: r2, references: n2 }), !(r2 = Number(r2)) || r2 < 0) return;
    const s2 = this.store.has(e5), i2 = this.store.setpop(e5, { value: t2, ttl: r2, start: N() });
    if (this.log.debug({ msg: "acd/storage/memory.set, evicted", removed: i2 }), i2 && i2.evicted && (this.log.debug({ msg: "acd/storage/memory.set, remove evicted key", key: i2.key }), this._removeReferences([i2.key])), !n2 || n2.length < 1) return;
    if (!this.invalidation) return void this.log.warn({ msg: "acd/storage/memory.set, invalidation is disabled, references are useless" });
    let o2;
    if (n2 = [...new Set(n2)], s2 && (o2 = this.keysReferences.get(e5), this.log.debug({ msg: "acd/storage/memory.set, current keys-references", key: e5, references: o2 }), o2)) {
      o2.sort(), n2.sort();
      const t3 = M(n2, o2);
      for (const r3 of t3) {
        const t4 = this.referencesKeys.get(r3);
        if (!t4) continue;
        const n3 = _$1(t4, e5);
        if (!(n3 < 0)) {
          if (t4.splice(n3, 1), t4.length < 1) {
            this.referencesKeys.delete(r3);
            continue;
          }
          this.referencesKeys.set(r3, t4);
        }
      }
    }
    const a2 = o2 ? M(o2, n2) : n2;
    for (let t3 = 0; t3 < a2.length; t3++) {
      const r3 = a2[t3];
      let n3 = this.referencesKeys.get(r3);
      n3 ? (this.log.debug({ msg: "acd/storage/memory.set, add reference-key", key: e5, reference: r3 }), n3.push(e5)) : n3 = [e5], this.log.debug({ msg: "acd/storage/memory.set, set reference-keys", keys: n3, reference: r3 }), this.referencesKeys.set(r3, n3);
    }
    this.keysReferences.set(e5, n2);
  }
  remove(e5) {
    this.log.debug({ msg: "acd/storage/memory.remove", key: e5 });
    const t2 = this._removeKey(e5);
    return this._removeReferences([e5]), t2;
  }
  _removeKey(e5) {
    return this.log.debug({ msg: "acd/storage/memory._removeKey", key: e5 }), !!this.store.has(e5) && (this.store.set(e5, void 0), true);
  }
  _removeReferences(e5) {
    if (!this.invalidation) return;
    this.log.debug({ msg: "acd/storage/memory._removeReferences", keys: e5 });
    const t2 = /* @__PURE__ */ new Set();
    for (let r2 = 0; r2 < e5.length; r2++) {
      const n2 = e5[r2], s2 = this.keysReferences.get(n2);
      if (s2) {
        for (let e6 = 0; e6 < s2.length; e6++) t2.add(s2[e6]);
        this.log.debug({ msg: "acd/storage/memory._removeReferences, delete key-references", key: n2 }), this.keysReferences.delete(n2);
      }
    }
    this._removeReferencesKeys([...t2], e5);
  }
  _removeReferencesKeys(e5, t2) {
    t2.sort(), this.log.debug({ msg: "acd/storage/memory._removeReferencesKeys", references: e5, keys: t2 });
    for (let r2 = 0; r2 < e5.length; r2++) {
      const n2 = e5[r2], s2 = this.referencesKeys.get(n2);
      if (this.log.debug({ msg: "acd/storage/memory._removeReferencesKeys, get reference-key", reference: n2, keys: t2, referencesKeys: s2 }), !s2) continue;
      const i2 = K(t2, s2);
      if (this.log.debug({ msg: "acd/storage/memory._removeReferencesKeys, removing", reference: n2, referencesToRemove: i2, referencesKeys: s2 }), i2.length !== s2.length) for (let e6 = i2.length - 1; e6 >= 0; e6--) this.log.debug({ msg: "acd/storage/memory._removeReferencesKeys, remove", reference: n2, referencesKeys: s2, at: i2[e6] }), s2.splice(i2[e6], 1);
      else this.log.debug({ msg: "acd/storage/memory._removeReferencesKeys, delete", reference: n2 }), this.referencesKeys.delete(n2);
    }
  }
  invalidate(e5) {
    return this.invalidation ? (this.log.debug({ msg: "acd/storage/memory.invalidate", references: e5 }), Array.isArray(e5) ? this._invalidateReferences(e5) : this._invalidateReference(e5)) : (this.log.warn({ msg: "acd/storage/memory.invalidate, exit due invalidation is disabled" }), []);
  }
  _invalidateReferences(e5) {
    const t2 = [];
    for (let r2 = 0; r2 < e5.length; r2++) {
      const n2 = e5[r2], s2 = this.referencesKeys.get(n2);
      if (this.log.debug({ msg: "acd/storage/memory._invalidateReferences, remove keys on reference", reference: n2, keys: s2 }), s2) {
        for (let e6 = 0; e6 < s2.length; e6++) {
          const r3 = s2[e6];
          this.log.debug({ msg: "acd/storage/memory._invalidateReferences, remove key on reference", reference: n2, key: r3 }), this._removeKey(r3) && t2.push(r3);
        }
        this.log.debug({ msg: "acd/storage/memory._invalidateReferences, remove references of", reference: n2, keys: s2 }), this._removeReferences([...s2]);
      }
    }
    return t2;
  }
  _invalidateReference(e5) {
    if (e5.includes("*")) {
      const t3 = [];
      for (const r3 of this.referencesKeys.keys()) z(e5, r3) && t3.push(r3);
      return this._invalidateReferences(t3);
    }
    const t2 = this.referencesKeys.get(e5), r2 = [];
    if (this.log.debug({ msg: "acd/storage/memory._invalidateReference, remove keys on reference", reference: e5, keys: t2 }), !t2) return r2;
    for (let n2 = 0; n2 < t2.length; n2++) {
      const s2 = t2[n2];
      this.log.debug({ msg: "acd/storage/memory._invalidateReference, remove key on reference", reference: e5, key: s2 }), this._removeKey(s2) && r2.push(s2);
    }
    return this.log.debug({ msg: "acd/storage/memory._invalidateReference, remove references of", reference: e5, keys: t2 }), this._removeReferences([...t2]), r2;
  }
  clear(e5) {
    if (this.log.debug({ msg: "acd/storage/memory.clear", name: e5 }), !e5) {
      if (this.store.clear(), !this.invalidation) return;
      return this.referencesKeys.clear(), void this.keysReferences.clear();
    }
    const t2 = [];
    this.store.forEach((r3, n2) => {
      this.log.debug({ msg: "acd/storage/memory.clear, iterate key", key: n2 }), 0 === n2.indexOf(e5) && (this.log.debug({ msg: "acd/storage/memory.clear, remove key", key: n2 }), t2.push(n2));
    });
    const r2 = [];
    for (let e6 = 0; e6 < t2.length; e6++) this._removeKey(t2[e6]) && r2.push(t2[e6]);
    return this._removeReferences(r2), r2;
  }
  refresh() {
    this.log.debug({ msg: "acd/storage/memory.refresh" }), this.init();
  }
};
const { isServerSide: V } = i$1;
let F;
V && (F = function() {
  if (a$2) return o$1;
  a$2 = 1;
  const e5 = n$1, t2 = c$1, { findNotMatching: r2, randomSubset: s2, abstractLogging: l2 } = i$1;
  return o$1 = class extends t2 {
    constructor(e6 = {}) {
      if (!e6.client || "object" != typeof e6.client) throw new Error("Redis client is required");
      if (super(e6), e6.invalidation && e6.invalidation.referencesTTL && ("number" != typeof e6.invalidation.referencesTTL || e6.invalidation.referencesTTL < 1)) throw new Error("invalidation.referencesTTL must be a positive integer greater than 1");
      this.log = e6.log || l2(), this.store = e6.client, this.invalidation = !!e6.invalidation, this.referencesTTL = e6.invalidation && e6.invalidation.referencesTTL || 60;
    }
    getReferenceKeyLabel(e6) {
      return `r:${e6}`;
    }
    getKeyReferenceLabel(e6) {
      return `k:${e6}`;
    }
    async get(e6) {
      this.log.debug({ msg: "acd/storage/redis.get", key: e6 });
      try {
        const t3 = await this.store.get(e6);
        if (!t3) {
          if (!this.invalidation) return;
          return void this.clearReferences(e6);
        }
        return JSON.parse(t3);
      } catch (t3) {
        this.log.error({ msg: "acd/storage/redis.get error", err: t3, key: e6 });
      }
    }
    async getTTL(e6) {
      this.log.debug({ msg: "acd/storage/memory.getTTL", key: e6 });
      let t3 = await this.store.pttl(e6);
      return t3 < 0 ? 0 : (t3 = Math.ceil(t3 / 1e3), t3);
    }
    async set(t3, n2, s3, i2) {
      if (this.log.debug({ msg: "acd/storage/redis.set key", key: t3, value: n2, ttl: s3, references: i2 }), (s3 = Number(s3)) && !(s3 < 0)) try {
        if (await this.store.set(t3, e5(n2), "EX", s3), !i2 || i2.length < 1) return;
        if (!this.invalidation) return void this.log.warn({ msg: "acd/storage/redis.set, invalidation is disabled, references are useless", key: t3, references: i2 });
        const o2 = [], a2 = await this.store.smembers(this.getKeyReferenceLabel(t3));
        if (this.log.debug({ msg: "acd/storage/redis.set current references", key: t3, currentReferences: a2 }), a2.length > 1) {
          a2.sort(), i2.sort();
          const e6 = r2(i2, a2);
          for (const r3 of e6) o2.push(["srem", this.getReferenceKeyLabel(r3), t3]);
          o2.push(["del", this.getKeyReferenceLabel(t3)]);
        }
        const c3 = a2.length > 1 ? r2(a2, i2) : i2;
        this.log.debug({ msg: "acd/storage/redis.set references to add", key: t3, referencesToAdd: c3 });
        for (let e6 = 0; e6 < c3.length; e6++) {
          const r3 = c3[e6], n3 = this.getReferenceKeyLabel(r3);
          o2.push(["sadd", n3, t3]), o2.push(["expire", n3, this.referencesTTL]);
        }
        const l3 = this.getKeyReferenceLabel(t3);
        o2.push(["sadd", l3, i2]), o2.push(["expire", l3, s3]), this.log.debug({ msg: "acd/storage/redis.set references writes", writes: o2 }), await this.store.pipeline(o2).exec();
      } catch (e6) {
        this.log.error({ msg: "acd/storage/redis.set error", err: e6, key: t3, ttl: s3, references: i2 });
      }
    }
    async remove(e6) {
      this.log.debug({ msg: "acd/storage/redis.remove", key: e6 });
      try {
        const t3 = await this.store.del(e6) > 0;
        return t3 && this.invalidation && await this.clearReferences(e6), t3;
      } catch (t3) {
        this.log.error({ msg: "acd/storage/redis.remove error", err: t3, key: e6 });
      }
    }
    async invalidate(e6) {
      if (!this.invalidation) return this.log.warn({ msg: "acd/storage/redis.invalidate, exit due invalidation is disabled" }), [];
      this.log.debug({ msg: "acd/storage/redis.invalidate", references: e6 });
      try {
        return Array.isArray(e6) ? await this._invalidateReferences(e6) : await this._invalidateReference(e6);
      } catch (t3) {
        return this.log.error({ msg: "acd/storage/redis.invalidate error", err: t3, references: e6 }), [];
      }
    }
    async _invalidateReferences(e6, t3 = true) {
      const r3 = e6.map((e7) => ["smembers", t3 ? this.getReferenceKeyLabel(e7) : e7]), n2 = await this.store.pipeline(r3).exec();
      this.log.debug({ msg: "acd/storage/redis._invalidateReferences keys", keys: n2 });
      const s3 = [], i2 = [];
      for (let e7 = 0; e7 < n2.length; e7++) {
        const t4 = n2[e7][1];
        if (t4) {
          this.log.debug({ msg: "acd/storage/redis._invalidateReferences got keys to be invalidated", keys: t4 });
          for (let e8 = 0; e8 < t4.length; e8++) {
            const r4 = t4[e8];
            this.log.debug({ msg: "acd/storage/redis._invalidateReferences del key" + r4 }), i2.push(r4), s3.push(["del", r4]);
          }
        }
      }
      return await this.store.pipeline(s3).exec(), await this.clearReferences(i2), i2;
    }
    async _invalidateReference(e6) {
      let t3;
      if (e6.includes("*")) {
        const t4 = await this.store.keys(this.getReferenceKeyLabel(e6));
        return this._invalidateReferences(t4, false);
      }
      t3 = await this.store.smembers(this.getReferenceKeyLabel(e6)), this.log.debug({ msg: "acd/storage/redis._invalidateReference keys", keys: t3 });
      const r3 = [], n2 = [];
      for (let e7 = 0; e7 < t3.length; e7++) {
        const s3 = t3[e7];
        this.log.debug({ msg: "acd/storage/redis._invalidateReference del key" + s3 }), n2.push(s3), r3.push(["del", s3]);
      }
      return await this.store.pipeline(r3).exec(), await this.clearReferences(n2), n2;
    }
    async clear(e6) {
      this.log.debug({ msg: "acd/storage/redis.clear", name: e6 });
      try {
        if (!e6) return void await this.store.flushall();
        const t3 = await this.store.keys(`${e6}*`);
        this.log.debug({ msg: "acd/storage/redis.clear keys", keys: t3 });
        const r3 = t3.map((e7) => ["del", e7]);
        if (await this.store.pipeline(r3).exec(), !this.invalidation) return;
        await this.clearReferences(t3);
      } catch (t3) {
        this.log.error({ msg: "acd/storage/redis.clear error", err: t3, name: e6 });
      }
    }
    async refresh() {
      try {
        await this.store.flushall();
      } catch (e6) {
        this.log.error({ msg: "acd/storage/redis.refresh error", err: e6 });
      }
    }
    async clearReferences(e6) {
      try {
        if (!e6) return void this.log.warn({ msg: "acd/storage/redis.clearReferences invalid call due to empty key" });
        Array.isArray(e6) || (e6 = [e6]);
        const t3 = e6.map((e7) => ["smembers", this.getKeyReferenceLabel(e7)]), r3 = await this.store.pipeline(t3).exec();
        this.log.debug({ msg: "acd/storage/redis.clearReferences references", keys: e6, referencesKeys: r3 });
        const n2 = {};
        for (let t4 = 0; t4 < e6.length; t4++) {
          for (let s4 = 0; s4 < r3[t4][1].length; s4++) {
            const i2 = this.getReferenceKeyLabel(r3[t4][1][s4]);
            n2[i2] || (n2[i2] = ["srem", i2, e6]);
          }
          const s3 = this.getKeyReferenceLabel(e6[t4]);
          n2[s3] = ["del", s3];
        }
        this.log.debug({ msg: "acd/storage/redis.clearReferences writes pipeline", writes: n2 }), await this.store.pipeline(Object.values(n2)).exec();
      } catch (e7) {
        this.log.error({ msg: "acd/storage/redis.clearReferences error", err: e7 });
      }
    }
    async gc(e6 = "lazy", t3 = {}) {
      if (this.log.debug({ msg: "acd/storage/redis.gc", mode: e6, options: t3 }), !this.invalidation) return void this.log.warn({ msg: "acd/storage/redis.gc does not run due to invalidation is disabled" });
      "strict" !== e6 && "lazy" !== e6 && (e6 = "lazy");
      const r3 = { references: { scanned: [], removed: [] }, keys: { scanned: /* @__PURE__ */ new Set(), removed: /* @__PURE__ */ new Set() }, loops: 0, cursor: 0, error: null };
      try {
        let n2 = 0, i2 = 64;
        if (t3.chunk && ("number" != typeof t3.chunk || t3.chunk < 1)) return r3.error = new Error("chunk must be a positive integer greater than 1"), r3;
        if (t3.lazy) {
          if (t3.lazy.chunk) {
            if ("number" != typeof t3.lazy.chunk || t3.lazy.chunk < 1) return r3.error = new Error("lazy.chunk must be a positive integer greater than 1"), r3;
            i2 = t3.lazy.chunk;
          }
          if (t3.lazy.cursor) {
            if ("number" != typeof t3.lazy.cursor || t3.lazy.cursor < 0) return r3.error = new Error("lazy.cursor must be a positive integer greater than 0"), r3;
            n2 = t3.lazy.cursor;
          }
        }
        const o2 = t3.chunk || 64, a2 = Math.min(i2, o2), c3 = n2;
        let l3 = -1, u2 = -1;
        do {
          r3.loops++;
          const t4 = await this.store.scan(n2, "match", "r:*", "count", a2);
          n2 = Number(t4[0]), l3 = t4[1].length;
          const o3 = "lazy" === e6 ? s2(t4[1], i2) : t4[1];
          r3.references.scanned = r3.references.scanned.concat(o3);
          let c4 = [];
          for (let e7 = 0; e7 < o3.length; e7++) {
            const t5 = o3[e7];
            c4.push(["smembers", t5]);
          }
          const f2 = await this.store.pipeline(c4).exec(), h2 = {}, g2 = {};
          for (let e7 = 0; e7 < f2.length; e7++) {
            const t5 = f2[e7], n3 = o3[e7];
            g2[n3] = t5[1];
            for (let e8 = 0; e8 < t5[1].length; e8++) {
              const s3 = t5[1][e8];
              h2[s3] ? h2[s3].push(n3) : h2[s3] = [n3], r3.keys.scanned.add(s3);
            }
          }
          const d2 = Object.keys(h2);
          c4 = d2.map((e7) => ["exists", e7]);
          const y2 = await this.store.pipeline(c4).exec(), m2 = {};
          for (let e7 = 0; e7 < d2.length; e7++) {
            const t5 = d2[e7];
            if (1 !== y2[e7][1]) for (let e8 = 0; e8 < h2[t5].length; e8++) {
              const n3 = h2[t5][e8];
              m2[n3] ? m2[n3].push(t5) : m2[n3] = [t5], r3.keys.removed.add(t5);
            }
          }
          const p2 = Object.keys(m2), v2 = [];
          for (let e7 = 0; e7 < p2.length; e7++) {
            const t5 = p2[e7];
            g2[t5].length === m2[t5].length ? (v2.push(["del", t5]), r3.references.removed.push(t5)) : v2.push(["srem", t5, m2[t5]]);
          }
          if (await this.store.pipeline(v2).exec(), u2 = v2.length, "lazy" === e6 && r3.references.scanned.length >= i2) break;
        } while (c3 !== n2 && l3 > 0 && u2 > 0);
        r3.cursor = n2, r3.keys.scanned = Array.from(r3.keys.scanned), r3.keys.removed = Array.from(r3.keys.removed);
      } catch (e7) {
        this.log.error({ msg: "acd/storage/redis.gc error", err: e7 }), r3.error = e7;
      }
      return r3;
    }
  };
}());
const I = P, C = "redis";
var D = function(e5, t2) {
  if (!V && e5 === C) throw new Error("Redis storage is not supported in the browser");
  return e5 === C ? new F(t2) : new I(t2);
};
const { kValues: U, kStorage: J, kStorages: H, kTransfromer: q, kTTL: B, kOnDedupe: Y, kOnError: X, kOnHit: W, kOnMiss: G, kStale: Q } = t, Z = n$1, ee = D;
class te {
  constructor(e5, t2, r2, n2, s2, i2, o2, a2, c3, l2, u2, f2) {
    this.dedupes = /* @__PURE__ */ new Map(), this.func = e5, this.name = t2, this.serialize = r2, this.references = n2, this.storage = s2, this.transformer = i2, this.ttl = o2, this.onDedupe = a2, this.onError = c3, this.onHit = l2, this.onMiss = u2, this.stale = f2;
  }
  getKey(e5) {
    const t2 = this.serialize ? this.serialize(e5) : e5;
    return "string" == typeof t2 ? t2 : Z(t2);
  }
  getStorageKey(e5) {
    return `${this.name}~${e5}`;
  }
  getStorageName() {
    return `${this.name}~`;
  }
  add(e5) {
    try {
      const t2 = this.getKey(e5);
      let r2 = this.dedupes.get(t2);
      return r2 ? this.onDedupe(t2) : (r2 = new re(), this.buildPromise(r2, e5, t2), this.dedupes.set(t2, r2)), r2.promise;
    } catch (e6) {
      this.onError(e6);
    }
  }
  async wrapFunction(e5, t2) {
    const r2 = this.getStorageKey(t2);
    if (this.ttl > 0 || "function" == typeof this.ttl) {
      const n2 = await this.get(r2);
      if (void 0 !== n2) {
        this.onHit(t2);
        const s2 = "function" == typeof this.stale ? this.stale(n2) : this.stale;
        return s2 > 0 && await this.storage.getTTL(r2) <= s2 && this._wrapFunction(r2, e5, t2).catch(ne), n2;
      }
      this.onMiss(t2);
    }
    return this._wrapFunction(r2, e5, t2);
  }
  async _wrapFunction(e5, t2, r2) {
    const n2 = await this.func(t2, r2), s2 = "function" == typeof this.stale ? this.stale(n2) : this.stale;
    let i2 = "function" == typeof this.ttl ? this.ttl(n2) : this.ttl;
    if (null == i2 || "number" != typeof i2 || !Number.isInteger(i2)) return this.onError(new Error("ttl must be an integer")), n2;
    if (i2 += s2, i2 < 1) return n2;
    if (!this.references) return await this.set(e5, n2, i2), n2;
    try {
      let s3 = this.references(t2, r2, n2), o2 = n2;
      s3 && "function" == typeof s3.then && (s3 = await s3), this.transformer && (o2 = this.transformer.serialize(n2)), await this.storage.set(e5, o2, i2, s3);
    } catch (e6) {
      this.onError(e6);
    }
    return n2;
  }
  buildPromise(e5, t2, r2) {
    e5.promise = this.wrapFunction(t2, r2), e5.promise.then((e6) => (this.dedupes.delete(r2), e6)).catch((e6) => {
      this.onError(e6), this.dedupes.delete(r2);
      const t3 = this.storage.remove(this.getStorageKey(r2));
      t3 && "function" == typeof t3.catch && t3.catch(ne);
    });
  }
  async clear(e5) {
    if (e5) {
      const t2 = this.getKey(e5);
      return this.dedupes.delete(t2), void await this.storage.remove(this.getStorageKey(t2));
    }
    await this.storage.clear(this.getStorageName()), this.dedupes.clear();
  }
  async get(e5) {
    const t2 = await this.storage.get(e5);
    return this.transformer && t2 ? await this.transformer.deserialize(t2) : t2;
  }
  async set(e5, t2, r2, n2) {
    return this.transformer && (t2 = this.transformer.serialize(t2)), this.storage.set(e5, t2, r2, n2);
  }
  async invalidate(e5) {
    return this.storage.invalidate(e5);
  }
}
class re {
  constructor() {
    this.promise = null;
  }
}
function ne() {
}
e.Cache = class {
  constructor(e5 = {}) {
    if (!e5.storage) throw new Error("storage is required");
    if (e5.ttl && "number" == typeof e5.ttl && (e5.ttl < 0 || !Number.isInteger(e5.ttl))) throw new Error("ttl must be a positive integer greater than 0");
    if (e5.onDedupe && "function" != typeof e5.onDedupe) throw new Error("onDedupe must be a function");
    if (e5.onError && "function" != typeof e5.onError) throw new Error("onError must be a function");
    if (e5.onHit && "function" != typeof e5.onHit) throw new Error("onHit must be a function");
    if (e5.onMiss && "function" != typeof e5.onMiss) throw new Error("onMiss must be a function");
    if ("number" == typeof e5.stale && !(Math.floor(e5.stale) === e5.stale && e5.stale >= 0)) throw new Error("stale must be an integer greater or equal to 0");
    this[U] = {}, this[J] = e5.storage, this[H] = /* @__PURE__ */ new Map(), this[H].set("_default", e5.storage), this[q] = e5.transformer, this[B] = e5.ttl || 0, this[Y] = e5.onDedupe || ne, this[X] = e5.onError || ne, this[W] = e5.onHit || ne, this[G] = e5.onMiss || ne, this[Q] = e5.stale || 0;
  }
  define(e5, t2, r2) {
    if ("function" == typeof t2 && (r2 = t2, t2 = {}), e5 && this[e5]) throw new Error(`${e5} is already defined in the cache or it is a forbidden name`);
    if (t2 = t2 || {}, "function" != typeof r2) throw new TypeError(`Missing the function parameter for '${e5}'`);
    const n2 = t2.serialize;
    if (n2 && "function" != typeof n2) throw new TypeError("serialize must be a function");
    const s2 = t2.references;
    if (s2 && "function" != typeof s2) throw new TypeError("references must be a function");
    if ("function" != typeof t2.ttl && t2.ttl && ("number" != typeof t2.ttl || t2.ttl < 0 || !Number.isInteger(t2.ttl))) throw new Error("ttl must be a positive integer greater than 0");
    let i2;
    t2.storage ? (i2 = ee(t2.storage.type, t2.storage.options), this[H].set(e5, i2)) : i2 = this[J];
    const o2 = void 0 !== t2.ttl ? t2.ttl : this[B], a2 = void 0 !== t2.stale ? t2.stale : this[Q], c3 = t2.onDedupe || this[Y], l2 = t2.onError || this[X], u2 = t2.onHit || this[W], f2 = t2.onMiss || this[G], h2 = t2.transformer || this[q], g2 = new te(r2, e5, n2, s2, i2, h2, o2, c3, l2, u2, f2, a2);
    return this[U][e5] = g2, this[e5] = g2.add.bind(g2), this;
  }
  async clear(e5, t2) {
    if (e5) {
      if (!this[U][e5]) throw new Error(`${e5} is not defined in the cache`);
      return void await this[U][e5].clear(t2);
    }
    const r2 = [];
    for (const e6 of Object.values(this[U])) r2.push(e6.clear());
    await Promise.all(r2);
  }
  async get(e5, t2) {
    if (!this[U][e5]) throw new Error(`${e5} is not defined in the cache`);
    return this[U][e5].get(t2);
  }
  async set(e5, t2, r2, n2, s2) {
    if (!this[U][e5]) throw new Error(`${e5} is not defined in the cache`);
    return this[U][e5].set(t2, r2, n2, s2);
  }
  async invalidate(e5, t2) {
    if (!this[U][e5]) throw new Error(`${e5} is not defined in the cache`);
    return this[U][e5].invalidate(t2);
  }
  async invalidateAll(e5, t2 = "_default") {
    if (!this[H].has(t2)) throw new Error(`${t2} storage is not defined in the cache`);
    await this[H].get(t2).invalidate(e5);
  }
};
const { Cache: se } = e, ie = D;
var oe = { Cache: se, createCache: function(e5) {
  e5 ? e5.storage || (e5.storage = { type: "memory" }) : e5 = { storage: { type: "memory" } };
  const t2 = ie(e5.storage.type, e5.storage.options);
  return new se({ ...e5, storage: t2 });
}, createStorage: ie };
let ae = 0, ce = [];
let le = Symbol("clean"), ue = [], fe = (e5, t2) => {
  let r2 = [], n2 = { get: () => (n2.lc || n2.listen(() => {
  })(), n2.value), l: 0, lc: 0, listen: (e6, t3) => (n2.lc = r2.push(e6, t3 || n2.l) / 2, () => {
    let t4 = r2.indexOf(e6);
    ~t4 && (r2.splice(t4, 2), --n2.lc || n2.off());
  }), notify(e6, t3) {
    let s2 = !ue.length;
    for (let s3 = 0; s3 < r2.length; s3 += 2) ue.push(r2[s3], r2[s3 + 1], n2.value, e6, t3);
    if (s2) {
      for (let e7 = 0; e7 < ue.length; e7 += 5) {
        let t4;
        for (let r3 = e7 + 1; !t4 && (r3 += 5) < ue.length; ) ue[r3] < ue[e7 + 1] && (t4 = ue.push(ue[e7], ue[e7 + 1], ue[e7 + 2], ue[e7 + 3], ue[e7 + 4]));
        t4 || ue[e7](ue[e7 + 2], ue[e7 + 3], ue[e7 + 4]);
      }
      ue.length = 0;
    }
  }, off() {
  }, set(e6) {
    let t3 = n2.value;
    t3 !== e6 && (n2.value = e6, n2.notify(t3));
  }, subscribe(e6, t3) {
    let r3 = n2.listen(e6, t3);
    return e6(n2.value), r3;
  }, value: e5 };
  return "production" !== process.env.NODE_ENV && (n2[le] = () => {
    r2 = [], n2.lc = 0, n2.off();
  }), n2;
};
const he = typeof document > "u" ? "server" : "browser";
function ge(e5) {
  return e5.withConfig({ allowReconfigure: false });
}
const de = (e5) => {
  const { ssr: t2 = false, tag: r2 = "core-loader" } = e5;
  if (t2 && e5.client) throw new TypeError("`client` option is not allowed when `ssr: true`, use `setServerClient` from your server entry point instead");
  if (!t2 && false === e5.client) throw new TypeError("You must set `ssr: true` when `client: false` is used");
  if (!t2 && !e5.client) throw new TypeError("`client` is required");
  let n2 = t2 ? void 0 : ge(e5.client);
  function s2(e6) {
    return oe.createCache().define("fetch", async (t3) => {
      if (!e6) throw new Error("You have to set the Sanity client with `setServerClient` before any data fetching is done");
      const { query: n3, params: s3 = {}, perspective: i3, useCdn: o3 } = JSON.parse(t3), { result: a3, resultSourceMap: c4 } = await e6.fetch(n3, s3, { tag: r2, filterResponse: false, perspective: i3, useCdn: o3 });
      return { result: a3, resultSourceMap: c4 };
    });
  }
  function i2() {
    const e6 = (null == n2 ? void 0 : n2.config().perspective) || "published";
    return o2.instance = s2(n2), { hydrate: (t3, r3, n3) => ({ loading: void 0 === (null == n3 ? void 0 : n3.data) || void 0 === (null == n3 ? void 0 : n3.sourceMap), error: void 0, data: null == n3 ? void 0 : n3.data, sourceMap: null == n3 ? void 0 : n3.sourceMap, perspective: e6 }), fetch: (t3, r3, n3, s3) => {
      if (s3.signal.aborted) return;
      const i3 = (ae += 1, () => {
        if (ae -= 1, 0 === ae) {
          let e7 = ce;
          ce = [];
          for (let t4 of e7) t4();
        }
      });
      n3.setKey("loading", true), n3.setKey("error", void 0), o2.instance.fetch(JSON.stringify({ query: t3, params: r3 })).then((t4) => {
        s3.signal.aborted || (n3.setKey("data", t4.result), n3.setKey("sourceMap", t4.resultSourceMap), n3.setKey("perspective", e6));
      }).catch((e7) => {
        n3.setKey("error", e7);
      }).finally(() => {
        n3.setKey("loading", false), i3();
      });
    } };
  }
  const o2 = { instance: s2(n2) }, a2 = fe(n2 ? i2() : void 0), c3 = ((e6) => {
    const { ssr: t3, setFetcher: r3 } = e6;
    return (n3) => {
      if ("server" === he) throw new Error("Live mode is not supported in server environments");
      if (t3 && !n3.client) throw new Error("The `client` option in `enableLiveMode` is required");
      const s3 = n3.client || e6.client || void 0, i3 = new AbortController();
      let o3;
      return import("./enableLiveMode.js").then(({ enableLiveMode: e7 }) => {
        i3.signal.aborted || (o3 = e7({ ...n3, client: s3, setFetcher: r3, ssr: t3 }));
      }), () => {
        i3.abort(), null == o3 || o3();
      };
    };
  })({ client: n2 || void 0, ssr: t2, setFetcher: (e6) => {
    const t3 = a2.get();
    return a2.set(e6), () => a2.set(t3);
  } }), l2 = { instance: void 0, canPreviewDrafts: false };
  return { createFetcherStore: (e6, t3 = {}, r3) => {
    const n3 = a2.get(), s3 = ((e7 = {}) => {
      let t4 = fe(e7);
      return t4.setKey = function(e8, r4) {
        let n4 = t4.value;
        typeof r4 > "u" && e8 in t4.value ? (t4.value = { ...t4.value }, delete t4.value[e8], t4.notify(n4, e8)) : t4.value[e8] !== r4 && (t4.value = { ...t4.value, [e8]: r4 }, t4.notify(n4, e8));
      }, t4;
    })(n3 ? n3.hydrate(e6, t3, r3) : { loading: false, error: typeof (null == r3 ? void 0 : r3.data) > "u" ? new Error("The `initial` option is required when `ssr: true`") : void 0, data: null == r3 ? void 0 : r3.data, sourceMap: null == r3 ? void 0 : r3.sourceMap, perspective: null == r3 ? void 0 : r3.perspective });
    return o3 = () => {
      let r4 = new AbortController();
      const n4 = a2.subscribe((n5) => {
        !n5 || r4.signal.aborted || (r4.abort(), r4 = new AbortController(), n5.fetch(e6, t3, s3, r4));
      });
      return () => {
        r4.abort(), n4();
      };
    }, l3 = (e7) => {
      let t4 = o3(e7);
      t4 && i3.events[6].push(t4);
    }, u2 = 5, f2 = (e7) => {
      let t4 = i3.listen;
      i3.listen = (...r5) => (!i3.lc && !i3.active && (i3.active = true, e7()), t4(...r5));
      let r4 = i3.off;
      if (i3.events[6] = [], i3.off = () => {
        r4(), setTimeout(() => {
          if (i3.active && !i3.lc) {
            i3.active = false;
            for (let e8 of i3.events[6]) e8();
            i3.events[6] = [];
          }
        }, 1e3);
      }, "production" !== process.env.NODE_ENV) {
        let e8 = i3[le];
        i3[le] = () => {
          for (let e9 of i3.events[6]) e9();
          i3.events[6] = [], i3.active = false, e8();
        };
      }
      return () => {
        i3.listen = t4, i3.off = r4;
      };
    }, (c4 = i3 = s3).events = c4.events || {}, c4.events[u2 + 10] || (c4.events[u2 + 10] = f2((e7) => {
      c4.events[u2].reduceRight((e8, t4) => (t4(e8), e8), { shared: {}, ...e7 });
    })), c4.events[u2] = c4.events[u2] || [], c4.events[u2].push(l3), s3;
    var i3, o3, c4, l3, u2, f2;
  }, enableLiveMode: c3, setServerClient: (e6) => {
    if ("server" !== he) throw new Error("`setServerClient` can only be called in server environments, detected: " + JSON.stringify(he));
    if (!t2) throw new Error("`setServerClient` can only be called when `ssr: true`");
    l2.instance = n2 = ge(e6), l2.canPreviewDrafts = !!n2.config().token, a2.set(i2());
  }, unstable__cache: o2, unstable__serverClient: l2 };
};
function i(e5, t2, i2, u2, o2) {
  var a2, l2, p2, c3, d2, y2;
  const f2 = o2 && "input" in o2 ? o2.input : i2.value, v2 = null != (a2 = null == o2 ? void 0 : o2.expected) ? a2 : e5.expects, h2 = null != (l2 = null == o2 ? void 0 : o2.received) ? l2 : function(e6) {
    var t3, n2, s2;
    let r2 = typeof e6;
    return "object" === r2 && (r2 = null != (s2 = e6 && (null == (n2 = null == (t3 = Object.getPrototypeOf(e6)) ? void 0 : t3.constructor) ? void 0 : n2.name)) ? s2 : "null"), "string" === r2 ? `"${e6}"` : "number" === r2 || "bigint" === r2 || "boolean" === r2 ? `${e6}` : r2;
  }(f2), g2 = { kind: e5.kind, type: e5.type, input: f2, expected: v2, received: h2, message: `Invalid ${t2}: ${v2 ? `Expected ${v2} but r` : "R"}eceived ${h2}`, requirement: e5.requirement, path: null == o2 ? void 0 : o2.path, issues: null == o2 ? void 0 : o2.issues, lang: u2.lang, abortEarly: u2.abortEarly, abortPipeEarly: u2.abortPipeEarly, skipPipe: u2.skipPipe }, k2 = "schema" === e5.kind, b2 = null != (y2 = null != (d2 = null != (c3 = null != (p2 = e5.message) ? p2 : function(e6, t3) {
    var n2;
    return null == (n2 = void 0) ? void 0 : n2.get(t3);
  }(e5.reference, g2.lang)) ? c3 : k2 ? (g2.lang, void 0) : null) ? d2 : u2.message) ? y2 : /* @__PURE__ */ function(e6) {
    return void 0;
  }(g2.lang);
  b2 && (g2.message = "function" == typeof b2 ? b2(g2) : b2), k2 && (i2.typed = false), i2.issues ? i2.issues.push(g2) : i2.issues = [g2];
}
function u(e5) {
  return "__proto__" !== e5 && "prototype" !== e5 && "constructor" !== e5;
}
function o(e5, t2) {
  return { kind: "schema", type: "object", reference: o, expects: "Object", async: false, entries: e5, message: t2, _run(e6, t3) {
    var n2;
    const s2 = e6.value;
    if (s2 && "object" == typeof s2) {
      e6.typed = true, e6.value = {};
      for (const r2 in this.entries) {
        const i2 = s2[r2], u2 = this.entries[r2]._run({ typed: false, value: i2 }, t3);
        if (u2.issues) {
          const o2 = { type: "object", origin: "value", input: s2, key: r2, value: i2 };
          for (const t4 of u2.issues) t4.path ? t4.path.unshift(o2) : t4.path = [o2], null == (n2 = e6.issues) || n2.push(t4);
          if (e6.issues || (e6.issues = u2.issues), t3.abortEarly) {
            e6.typed = false;
            break;
          }
        }
        u2.typed || (e6.typed = false), (void 0 !== u2.value || r2 in s2) && (e6.value[r2] = u2.value);
      }
    } else i(this, "type", e6, t3);
    return e6;
  } };
}
function a$1(e5, ...t2) {
  const n2 = { kind: "schema", type: "optional", reference: a$1, expects: `${e5.expects} | undefined`, async: false, wrapped: e5, _run(e6, t3) {
    return void 0 === e6.value && ("default" in this && (e6.value = function(e7, t4, n3) {
      return "function" == typeof e7.default ? e7.default(t4, n3) : e7.default;
    }(this, e6, t3)), void 0 === e6.value) ? (e6.typed = true, e6) : this.wrapped._run(e6, t3);
  } };
  return 0 in t2 && (n2.default = t2[0]), n2;
}
function l(e5) {
  return { kind: "schema", type: "string", reference: l, expects: "string", async: false, message: e5, _run(e6, t2) {
    return "string" == typeof e6.value ? e6.typed = true : i(this, "type", e6, t2), e6;
  } };
}
function p$1(e5) {
  return null !== e5 && Array.isArray(e5);
}
function c2(e5) {
  let t2 = "";
  for (const n2 of e5) "string" != typeof n2 ? "number" != typeof n2 ? p$1(n2) ? (t2 && (t2 += ":"), t2 += `${n2.join(",")}}`) : n2._key && (t2 && (t2 += ":"), t2 += `${n2._key}`) : (t2 && (t2 += ":"), t2 += `${n2}`) : (t2 && (t2 += "."), t2 += n2);
  return t2;
}
const d = function(...e5) {
  return { ...e5[0], pipe: e5, _run(t2, n2) {
    for (let s2 = 0; s2 < e5.length; s2++) {
      t2 = e5[s2]._run(t2, n2);
      const r2 = e5[s2 + 1];
      if (n2.skipPipe || t2.issues && (n2.abortEarly || n2.abortPipeEarly || "schema" === (null == r2 ? void 0 : r2.kind) || "transformation" === (null == r2 ? void 0 : r2.kind))) {
        t2.typed = false;
        break;
      }
    }
    return t2;
  } };
}(l(), function e2(t2, n2) {
  return { kind: "validation", type: "min_length", reference: e2, async: false, expects: `>=${t2}`, requirement: t2, message: n2, _run(e5, t3) {
    return e5.typed && e5.value.length < this.requirement && i(this, "length", e5, t3, { received: `${e5.value.length}` }), e5;
  } };
}(1)), y$1 = a$1(d), f$1 = o({ baseUrl: d, dataset: y$1, id: d, path: d, projectId: y$1, tool: y$1, type: y$1, workspace: y$1, isDraft: a$1(l()) });
function v$1(n2) {
  const { id: s2, path: r2, baseUrl: i2, tool: u2, workspace: o2, type: a2 } = n2;
  return l2 = n2, f$1._run({ typed: false, value: l2 }, { abortEarly: true }).issues ? void 0 : [["id", getPublishedId(s2)], ["type", a2], ["path", c2(studioPath.fromString(r2))], ["base", encodeURIComponent(i2)], ["workspace", o2], ["tool", u2], ["isDraft", s2.startsWith("drafts.")]].filter(([, e5]) => !!e5).map((e5) => {
    const [t2, n3] = e5;
    return true === n3 ? t2 : e5.join("=");
  }).join(";");
  var l2;
}
o({ origin: d, href: d, data: a$1(/* @__PURE__ */ function e3(t2, n2, s2) {
  return { kind: "schema", type: "record", reference: e3, expects: "Object", async: false, key: t2, value: n2, message: s2, _run(e5, t3) {
    var n3, s3;
    const r2 = e5.value;
    if (r2 && "object" == typeof r2) {
      e5.typed = true, e5.value = {};
      for (const i2 in r2) if (u(i2)) {
        const u2 = r2[i2], o2 = this.key._run({ typed: false, value: i2 }, t3);
        if (o2.issues) {
          const s4 = { type: "record", origin: "key", input: r2, key: i2, value: u2 };
          for (const t4 of o2.issues) t4.path = [s4], null == (n3 = e5.issues) || n3.push(t4);
          if (e5.issues || (e5.issues = o2.issues), t3.abortEarly) {
            e5.typed = false;
            break;
          }
        }
        const a2 = this.value._run({ typed: false, value: u2 }, t3);
        if (a2.issues) {
          const n4 = { type: "record", origin: "value", input: r2, key: i2, value: u2 };
          for (const t4 of a2.issues) t4.path ? t4.path.unshift(n4) : t4.path = [n4], null == (s3 = e5.issues) || s3.push(t4);
          if (e5.issues || (e5.issues = a2.issues), t3.abortEarly) {
            e5.typed = false;
            break;
          }
        }
        (!o2.typed || !a2.typed) && (e5.typed = false), o2.typed && (e5.value[o2.value] = a2.value);
      }
    } else i(this, "type", e5, t3);
    return e5;
  } };
}(l(), /* @__PURE__ */ function e4() {
  return { kind: "schema", type: "unknown", reference: e4, expects: "unknown", async: false, _run: (e5) => (e5.typed = true, e5) };
}())) });
const n = (n2, a2, i2, p2) => {
  if (!a2 || !i2) return;
  const c3 = studioPathToJsonPath(p2), u2 = resolveEditInfo({ resultPath: c3, resultSourceMap: a2, studioUrl: i2 });
  return u2 ? v$1({ baseUrl: u2.baseUrl, workspace: u2.workspace, tool: u2.tool, type: u2.type, id: u2.id, path: "string" == typeof u2.path ? u2.path : studioPath.toString(jsonPathToStudioPath(u2.path)) }) : void 0;
};
function a(t2, r2, s2, e5) {
  const i2 = (t3) => t3 ? "string" == typeof t3 ? studioPath.fromString(t3) : t3 : [], p2 = i2(e5);
  return Object.assign((t3) => n(0, r2, s2, [...p2, ...i2(t3)]), { scope: (o2) => a(t2, r2, s2, [...p2, ...i2(o2)]) });
}
function sequence(...handlers) {
  const length = handlers.length;
  if (!length) return ({ event, resolve }) => resolve(event);
  return ({ event, resolve }) => {
    return apply_handle(0, event, {});
    function apply_handle(i2, event2, parent_options) {
      const handle = handlers[i2];
      return handle({
        event: event2,
        resolve: (event3, options) => {
          const transformPageChunk = async ({ html, done }) => {
            if (options?.transformPageChunk) {
              html = await options.transformPageChunk({ html, done }) ?? "";
            }
            if (parent_options?.transformPageChunk) {
              html = await parent_options.transformPageChunk({ html, done }) ?? "";
            }
            return html;
          };
          const filterSerializedResponseHeaders = parent_options?.filterSerializedResponseHeaders ?? options?.filterSerializedResponseHeaders;
          const preload = parent_options?.preload ?? options?.preload;
          return i2 < length - 1 ? apply_handle(i2 + 1, event3, {
            transformPageChunk,
            filterSerializedResponseHeaders,
            preload
          }) : resolve(event3, { transformPageChunk, filterSerializedResponseHeaders, preload });
        }
      });
    }
  };
}
function p(e5, t2, r2) {
  return a(e5, t2, r2);
}
const v = (o2) => {
  const { createFetcherStore: a2, setServerClient: l2, enableLiveMode: c3, unstable__cache: u2, unstable__serverClient: d2 } = de({ tag: "svelte-loader", ...o2 }), v2 = (h2 = o2.client, writable("object" == typeof h2 ? null == h2 ? void 0 : h2.config().stega.studioUrl : void 0)), f2 = function({ createFetcherStore: e5, studioUrlStore: o3 }) {
    const a3 = {}, l3 = {};
    return (c4, u3 = a3, d3 = l3) => {
      "object" == typeof c4 && (u3 = c4.params || a3, d3 = c4.options || l3, c4 = c4.query);
      const v3 = d3.initial ? { perspective: "published", ...d3.initial } : void 0, f3 = JSON.stringify(u3), w3 = e5(c4, JSON.parse(f3), v3), h3 = writable(w3.value);
      return derived([h3, o3], ([e6, t2]) => ({ ...e6, encodeDataAttribute: p(e6.data, e6.sourceMap, t2) }));
    };
  }({ createFetcherStore: a2, studioUrlStore: v2 }), w2 = function({ enableLiveMode: e5, studioUrlStore: t2 }) {
    return ({ allowStudioOrigin: r2, client: i2, onConnect: o3, onDisconnect: n2, studioUrl: s2 } = {}) => (r2 && console.warn("`allowStudioOrigin` is deprecated and no longer needed"), t2.set(null != s2 ? s2 : "object" == typeof i2 ? null == i2 ? void 0 : i2.config().stega.studioUrl : void 0), e5({ client: i2, onConnect: o3, onDisconnect: n2 }));
  }({ enableLiveMode: c3, studioUrlStore: v2 });
  var h2;
  return { loadQuery: async (e5, t2 = {}, r2 = {}) => {
    var i2;
    const { headers: o3, tag: n2 } = r2, s2 = r2.perspective || (null == (i2 = d2.instance) ? void 0 : i2.config().perspective) || "published";
    if (typeof document < "u") throw new Error("Cannot use `loadQuery` in a browser environment, you should use it inside a loader, getStaticProps, getServerSideProps, getInitialProps, or in a React Server Component.");
    if ("published" !== s2 && !d2.instance) throw new Error('You cannot use other perspectives than "published" unless you set "ssr: true" and call "setServerClient" first.');
    if ("previewDrafts" === s2) {
      if (!d2.canPreviewDrafts) throw new Error('You cannot use "previewDrafts" unless you set a "token" in the "client" instance passed to "setServerClient".');
      const { result: r3, resultSourceMap: i3 } = await d2.instance.fetch(e5, t2, { filterResponse: false, resultSourceMap: "withKeyArraySelector", perspective: s2, useCdn: false, headers: o3, tag: n2 });
      return { data: r3, sourceMap: i3, perspective: s2 };
    }
    const a3 = r2.useCdn || d2.instance.config().useCdn, { result: l3, resultSourceMap: c4 } = await u2.instance.fetch(JSON.stringify({ query: e5, params: t2, perspective: s2, useCdn: a3 }));
    return c4 ? { data: l3, sourceMap: c4 } : { data: l3 };
  }, useQuery: f2, setServerClient: l2, useLiveMode: w2, unstable__serverClient: d2 };
}, { loadQuery: f, setServerClient: w, useLiveMode: h, useQuery: y, unstable__serverClient: m } = v({ client: false, ssr: true }), g = "development" === process.env.NODE_ENV;
const S = ({ client: e5, preview: t2 }) => {
  var r2, i2;
  const o2 = (null == t2 ? void 0 : t2.cookie) || "__sanity_preview", n2 = (null == (r2 = null == t2 ? void 0 : t2.endpoints) ? void 0 : r2.enable) || "/preview/enable", s2 = (null == (i2 = null == t2 ? void 0 : t2.endpoints) ? void 0 : i2.disable) || "/preview/disable", a2 = (null == t2 ? void 0 : t2.secret) || crypto.randomBytes(16).toString("hex");
  if (!e5) throw new Error("No client configured for preview");
  return async ({ event: t3, resolve: r3 }) => {
    const { cookies: i3, url: l2 } = t3;
    t3.locals.preview = t3.cookies.get(o2) === a2;
    const d2 = t3.locals.preview ? "previewDrafts" : "published", p2 = !t3.locals.preview;
    if (t3.url.pathname === n2) {
      const { isValid: t4, redirectTo: r4 = "/" } = await async function(e6, t5, r5 = "Cloudflare-Workers" === ((e7) => null == (e7 = globalThis.navigator) ? void 0 : e7.userAgent)()) {
        const i4 = function(e7) {
          if (!e7) throw new TypeError("`client` is required");
          if (!e7.config().token) throw new TypeError("`client` must have a `token` specified");
          return e7.withConfig({ apiVersion: "2023-11-09", useCdn: false, perspective: "published", resultSourceMap: false, stega: false });
        }(e6);
        let o3;
        try {
          o3 = function(e7) {
            const t6 = new URL(e7, "http://localhost"), r6 = t6.searchParams.get("sanity-preview-secret");
            if (!r6) throw new Error("Missing secret");
            let i5;
            const o4 = t6.searchParams.get("sanity-preview-pathname");
            if (o4) {
              const { pathname: e8, search: t7, hash: r7 } = new URL(o4, "http://localhost");
              i5 = `${e8}${t7}${r7}`;
            }
            return { secret: r6, redirectTo: i5 };
          }(t5);
        } catch (e7) {
          return g && console.error("Failed to parse preview URL", e7, { previewUrl: t5, client: i4 }), { isValid: false };
        }
        const { isValid: n4, studioUrl: s3 } = await async function(e7, t6, r6) {
          if (typeof EdgeRuntime < "u" && await new Promise((e8) => setTimeout(e8, 300)), !t6 || !t6.trim()) return { isValid: false, studioUrl: null };
          const i5 = await e7.fetch('*[_type == "sanity.previewUrlSecret" && secret == $secret && dateTime(_updatedAt) > dateTime(now()) - 3600][0]{\n  _id,\n  _updatedAt,\n  secret,\n  studioUrl,\n}', { secret: t6 }, { tag: "sanity.preview-url-secret", ...r6 ? void 0 : { cache: "no-store" } });
          return null != i5 && i5._id && null != i5 && i5._updatedAt && null != i5 && i5.secret ? { isValid: t6 === i5.secret, studioUrl: i5.studioUrl } : { isValid: false, studioUrl: null };
        }(i4, o3.secret, r5), a3 = n4 ? o3.redirectTo : void 0;
        let l3;
        if (n4) try {
          l3 = new URL(s3).origin;
        } catch (e7) {
          g && console.error("Failed to parse studioUrl", e7, { previewUrl: t5, studioUrl: s3 });
        }
        return { isValid: n4, redirectTo: a3, studioOrigin: l3 };
      }(e5, l2.toString());
      if (!t4) throw error(401, "Invalid secret");
      const n3 = "development" === process.env.NODE_ENV;
      return i3.set(o2, a2, { httpOnly: true, sameSite: n3 ? "lax" : "none", secure: !n3, path: "/" }), redirect(307, r4);
    }
    return t3.url.pathname === s2 ? (i3.delete(o2, { path: "/" }), redirect(307, l2.searchParams.get("redirect") || "/")) : (t3.locals.client = e5.withConfig({ perspective: d2, useCdn: p2 }), await r3(t3));
  };
}, b = writable(false);
readonly(b);
b.set;
const _ = ({ loadQuery: e5 }) => async ({ event: t2, resolve: r2 }) => {
  if (!t2.locals.client) throw new Error("Call `handlePreview` from `@sanity/visual-editing/svelte` before `handleLoadQuery`");
  const i2 = e5 || f, o2 = t2.locals.client.config();
  return t2.locals.loadQuery = (e6, t3, r3) => i2(e6, t3, { perspective: o2.perspective, useCdn: o2.useCdn, ...r3 }), await r2(t2);
}, E = ({ preview: e5, loadQuery: t2 } = {}) => {
  const r2 = (null == e5 ? void 0 : e5.client) || m.instance;
  return sequence(S({ client: r2, preview: e5 }), _({ loadQuery: t2 }));
};
export {
  E,
  fe as f,
  w,
  y
};
