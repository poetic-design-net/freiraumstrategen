var Y=Object.defineProperty;var Z=(t,e,n)=>e in t?Y(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var B=(t,e,n)=>Z(t,typeof e!="symbol"?e+"":e,n);import{n as v,r as x,i as j,h as E,e as z,j as O,k as tt,l as et,m as nt,p as it,q,u as rt,v as st,w as at}from"./scheduler.Hmp2l1Hb.js";const M=typeof window<"u";let T=M?()=>window.performance.now():()=>Date.now(),R=M?t=>requestAnimationFrame(t):v;const g=new Set;function F(t){g.forEach(e=>{e.c(t)||(g.delete(e),e.f())}),g.size!==0&&R(F)}function H(t){let e;return g.size===0&&R(F),{promise:new Promise(n=>{g.add(e={c:t,f:n})}),abort(){g.delete(e)}}}let k=!1;function lt(){k=!0}function ct(){k=!1}function ot(t,e,n,i){for(;t<e;){const r=t+(e-t>>1);n(r)<=i?t=r+1:e=r}return t}function ft(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const a=[];for(let l=0;l<e.length;l++){const u=e[l];u.claim_order!==void 0&&a.push(u)}e=a}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let r=0;for(let a=0;a<e.length;a++){const l=e[a].claim_order,u=(r>0&&e[n[r]].claim_order<=l?r+1:ot(1,r,_=>e[n[_]].claim_order,l))-1;i[a]=n[u]+1;const f=u+1;n[f]=a,r=Math.max(f,r)}const c=[],s=[];let o=e.length-1;for(let a=n[r]+1;a!=0;a=i[a-1]){for(c.push(e[a-1]);o>=a;o--)s.push(e[o]);o--}for(;o>=0;o--)s.push(e[o]);c.reverse(),s.sort((a,l)=>a.claim_order-l.claim_order);for(let a=0,l=0;a<s.length;a++){for(;l<c.length&&s[a].claim_order>=c[l].claim_order;)l++;const u=l<c.length?c[l]:null;t.insertBefore(s[a],u)}}function ut(t,e){t.appendChild(e)}function G(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e&&e.host?e:t.ownerDocument}function _t(t){const e=V("style");return e.textContent="/* empty */",dt(G(t),e),e.sheet}function dt(t,e){return ut(t.head||t,e),e.sheet}function mt(t,e){if(k){for(ft(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function kt(t,e,n){k&&!n?mt(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function U(t){t.parentNode&&t.parentNode.removeChild(t)}function Dt(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function V(t){return document.createElement(t)}function ht(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function I(t){return document.createTextNode(t)}function Bt(){return I(" ")}function Pt(){return I("")}function Rt(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function It(t){return function(e){return e.preventDefault(),t.call(this,e)}}function Lt(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function Ot(t){return t.dataset.svelteH}function pt(t){return Array.from(t.childNodes)}function $t(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function W(t,e,n,i,r=!1){$t(t);const c=(()=>{for(let s=t.claim_info.last_index;s<t.length;s++){const o=t[s];if(e(o)){const a=n(o);return a===void 0?t.splice(s,1):t[s]=a,r||(t.claim_info.last_index=s),o}}for(let s=t.claim_info.last_index-1;s>=0;s--){const o=t[s];if(e(o)){const a=n(o);return a===void 0?t.splice(s,1):t[s]=a,r?a===void 0&&t.claim_info.last_index--:t.claim_info.last_index=s,o}}return i()})();return c.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,c}function J(t,e,n,i){return W(t,r=>r.nodeName===e,r=>{const c=[];for(let s=0;s<r.attributes.length;s++){const o=r.attributes[s];n[o.name]||c.push(o.name)}c.forEach(s=>r.removeAttribute(s))},()=>i(e))}function qt(t,e,n){return J(t,e,n,V)}function zt(t,e,n){return J(t,e,n,ht)}function yt(t,e){return W(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>I(e),!0)}function Mt(t){return yt(t," ")}function Tt(t,e){e=""+e,t.data!==e&&(t.data=e)}function Ft(t,e,n,i){n==null?t.style.removeProperty(e):t.style.setProperty(e,n,"")}function Ht(t,e,n){t.classList.toggle(e,!!n)}function gt(t,e,{bubbles:n=!1,cancelable:i=!1}={}){return new CustomEvent(t,{detail:e,bubbles:n,cancelable:i})}function Gt(t,e){return new t(e)}const A=new Map;let S=0;function vt(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}function wt(t,e){const n={stylesheet:_t(e),rules:{}};return A.set(t,n),n}function K(t,e,n,i,r,c,s,o=0){const a=16.666/i;let l=`{
`;for(let $=0;$<=1;$+=a){const p=e+(n-e)*c($);l+=$*100+`%{${s(p,1-p)}}
`}const u=l+`100% {${s(n,1-n)}}
}`,f=`__svelte_${vt(u)}_${o}`,_=G(t),{stylesheet:d,rules:m}=A.get(_)||wt(_,t);m[f]||(m[f]=!0,d.insertRule(`@keyframes ${f} ${u}`,d.cssRules.length));const h=t.style.animation||"";return t.style.animation=`${h?`${h}, `:""}${f} ${i}ms linear ${r}ms 1 both`,S+=1,f}function P(t,e){const n=(t.style.animation||"").split(", "),i=n.filter(e?c=>c.indexOf(e)<0:c=>c.indexOf("__svelte")===-1),r=n.length-i.length;r&&(t.style.animation=i.join(", "),S-=r,S||xt())}function xt(){R(()=>{S||(A.forEach(t=>{const{ownerNode:e}=t.stylesheet;e&&U(e)}),A.clear())})}let w;function Q(){return w||(w=Promise.resolve(),w.then(()=>{w=null})),w}function C(t,e,n){t.dispatchEvent(gt(`${e?"intro":"outro"}${n}`))}const b=new Set;let y;function Ut(){y={r:0,c:[],p:y}}function Vt(){y.r||x(y.c),y=y.p}function Nt(t,e){t&&t.i&&(b.delete(t),t.i(e))}function Wt(t,e,n,i){if(t&&t.o){if(b.has(t))return;b.add(t),y.c.push(()=>{b.delete(t),i&&(n&&t.d(1),i())}),t.o(e)}else i&&i()}const X={duration:0};function Jt(t,e,n){const i={direction:"in"};let r=e(t,n,i),c=!1,s,o,a=0;function l(){s&&P(t,s)}function u(){const{delay:_=0,duration:d=300,easing:m=z,tick:h=v,css:$}=r||X;$&&(s=K(t,0,1,d,_,m,$,a++)),h(0,1);const p=T()+_,N=p+d;o&&o.abort(),c=!0,E(()=>C(t,!0,"start")),o=H(D=>{if(c){if(D>=N)return h(1,0),C(t,!0,"end"),l(),c=!1;if(D>=p){const L=m((D-p)/d);h(L,1-L)}}return c})}let f=!1;return{start(){f||(f=!0,P(t),j(r)?(r=r(i),Q().then(u)):u())},invalidate(){f=!1},end(){c&&(l(),c=!1)}}}function Kt(t,e,n){const i={direction:"out"};let r=e(t,n,i),c=!0,s;const o=y;o.r+=1;let a;function l(){const{delay:u=0,duration:f=300,easing:_=z,tick:d=v,css:m}=r||X;m&&(s=K(t,1,0,f,u,_,m));const h=T()+u,$=h+f;E(()=>C(t,!1,"start")),"inert"in t&&(a=t.inert,t.inert=!0),H(p=>{if(c){if(p>=$)return d(0,1),C(t,!1,"end"),--o.r||x(o.c),!1;if(p>=h){const N=_((p-h)/f);d(1-N,N)}}return c})}return j(r)?Q().then(()=>{r=r(i),l()}):l(),{end(u){u&&"inert"in t&&(t.inert=a),u&&r.tick&&r.tick(1,0),c&&(s&&P(t,s),c=!1)}}}function Qt(t){t&&t.c()}function Xt(t,e){t&&t.l(e)}function bt(t,e,n){const{fragment:i,after_update:r}=t.$$;i&&i.m(e,n),E(()=>{const c=t.$$.on_mount.map(rt).filter(j);t.$$.on_destroy?t.$$.on_destroy.push(...c):x(c),t.$$.on_mount=[]}),r.forEach(E)}function Et(t,e){const n=t.$$;n.fragment!==null&&(nt(n.after_update),x(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function At(t,e){t.$$.dirty[0]===-1&&(st.push(t),at(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Yt(t,e,n,i,r,c,s=null,o=[-1]){const a=it;q(t);const l=t.$$={fragment:null,ctx:[],props:c,update:v,not_equal:r,bound:O(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(a?a.$$.context:[])),callbacks:O(),dirty:o,skip_bound:!1,root:e.target||a.$$.root};s&&s(l.root);let u=!1;if(l.ctx=n?n(t,e.props||{},(f,_,...d)=>{const m=d.length?d[0]:_;return l.ctx&&r(l.ctx[f],l.ctx[f]=m)&&(!l.skip_bound&&l.bound[f]&&l.bound[f](m),u&&At(t,f)),_}):[],l.update(),u=!0,x(l.before_update),l.fragment=i?i(l.ctx):!1,e.target){if(e.hydrate){lt();const f=pt(e.target);l.fragment&&l.fragment.l(f),f.forEach(U)}else l.fragment&&l.fragment.c();e.intro&&Nt(t.$$.fragment),bt(t,e.target,e.anchor),ct(),tt()}q(a)}class Zt{constructor(){B(this,"$$");B(this,"$$set")}$destroy(){Et(this,1),this.$destroy=v}$on(e,n){if(!j(n))return v;const i=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return i.push(n),()=>{const r=i.indexOf(n);r!==-1&&i.splice(r,1)}}$set(e){this.$$set&&!et(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}const St="4";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(St);export{Et as A,Ut as B,Ft as C,Pt as D,Gt as E,Jt as F,Kt as G,Zt as S,pt as a,yt as b,qt as c,U as d,V as e,Mt as f,kt as g,mt as h,Yt as i,Tt as j,ht as k,Ot as l,zt as m,Lt as n,Ht as o,Rt as p,It as q,Wt as r,Bt as s,I as t,Vt as u,Nt as v,Dt as w,Qt as x,Xt as y,bt as z};
