import{S as O,f as k}from"./client.DHnIaJ3r.js";import{stegaEncodeSourceMap as $}from"./stegaEncodeSourceMap.Dkj4zhN2.js";let I;const J=new Uint8Array(16);function K(){if(!I&&(I=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!I))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return I(J)}const d=[];for(let n=0;n<256;++n)d.push((n+256).toString(16).slice(1));var E={randomUUID:typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto)};function C(n,u,r){if(E.randomUUID&&!u&&!n)return E.randomUUID();const y=(n=n||{}).random||(n.rng||K)();return y[6]=15&y[6]|64,y[8]=63&y[8]|128,function(a,i=0){return d[a[i+0]]+d[a[i+1]]+d[a[i+2]]+d[a[i+3]]+"-"+d[a[i+4]]+d[a[i+5]]+"-"+d[a[i+6]]+d[a[i+7]]+"-"+d[a[i+8]]+d[a[i+9]]+"-"+d[a[i+10]]+d[a[i+11]]+d[a[i+12]]+d[a[i+13]]+d[a[i+14]]+d[a[i+15]]}(y)}const L=["channel/disconnect","channel/response","channel/heartbeat"],T=["handshake/syn","handshake/syn-ack","handshake/ack"],V=n=>L.some(u=>u===n),q=n=>T.some(u=>u===n),A=({data:n={}})=>typeof n=="object"&&n!==null&&!Array.isArray(n)&&!("domain"in n)&&["id","type","from","to"].every(u=>u in n)&&n.type.startsWith("handshake/");function F(n){const u=window.self!==window.top||window.opener,r={buffer:[],id:null,origin:null,source:null,status:"connecting"};function y(e,o){if(q(e)||V(e)||r.status!=="connecting"&&r.status!=="reconnecting"){if(r.id&&r.origin&&r.source){const c={connectionId:r.id,data:o,domain:"sanity/channels",from:n.id,id:C(),to:n.connectTo,type:e};try{r.source.postMessage(c,{targetOrigin:r.origin})}catch{throw new Error(`Failed to postMessage '${c.id}' on '${n.id}'`)}}}else r.buffer.push({type:e,data:o})}function a(e){if(A(e))console.error(`Visual editing package mismatch detected! Please ensure you are using the latest version of Sanity Studio and any packages listed here:
https://github.com/sanity-io/visual-editing`);else if(function(o){const{data:c}=o;return c.domain==="sanity/channels"&&c.to===n.id&&c.from===n.connectTo&&c.type!=="channel/response"}(e)){const{data:o}=e;if(r.origin&&e.origin!==r.origin)return;if(e.source&&r.source!==e.source&&(r.source=e.source),q(o.type)&&o.data){if(o.type==="handshake/syn")return r.origin=e.origin,r.id=o.data.id,g("connecting"),void y("handshake/syn-ack",{id:r.id});if(o.type==="handshake/ack"&&o.data.id===r.id)return void g("connected")}else if(o.connectionId===r.id&&e.origin===r.origin){if(o.type==="channel/disconnect")return void g("disconnected");{const c=[o.type,o.data];i.forEach(h=>{h(...c)}),y("channel/response",{responseTo:o.id})}return}}}const i=new Set,v=new Set;function g(e){r.status=e,v.forEach(o=>{o(e)}),e==="connected"&&function(){const o=[...r.buffer];r.buffer.splice(0,r.buffer.length),o.forEach(({type:c,data:h})=>{y(c,h)})}()}return window.addEventListener("message",a,!1),g("connecting"),{destroy:function(){["disconnected"].includes(r.status)||g("disconnected"),i.clear(),v.clear(),window.removeEventListener("message",a,!1)},inFrame:u,send:function(e,o){y(e,o)},subscribe:function(e){return i.add(e),()=>i.delete(e)},onStatusUpdate:function(e){return v.add(e),()=>v.delete(e)}}}function P(n){const{client:u,setFetcher:r,onConnect:y,onDisconnect:a}=n;if(!(u&&u instanceof O))throw new Error(`Expected \`client\` to be an instance of SanityClient or SanityStegaClient: ${JSON.stringify(u)}`);const{projectId:i,dataset:v}=u.config(),g=k("previewDrafts"),e=k(!1),o=new Map,c=F({id:"loaders",connectTo:"presentation"});let h;c.onStatusUpdate(l=>{l==="connected"?e.set(!0):l==="disconnected"&&e.set(!1)}),c.subscribe((l,s)=>{if(l==="loader/perspective"&&s.projectId===i&&s.dataset===v){if(s.perspective!=="published"&&s.perspective!=="previewDrafts")throw new Error(`Unsupported perspective: ${JSON.stringify(s.perspective)}`);g.set(s.perspective),b()}else if(l==="loader/query-change"&&s.projectId===i&&s.dataset===v){const{perspective:f,query:t,params:p}=s;s.result!==void 0&&s.resultSourceMap!==void 0&&u.config().stega.enabled?o.set(JSON.stringify({perspective:f,query:t,params:p}),{...s,result:$(s.result,s.resultSourceMap,u.config().stega)}):o.set(JSON.stringify({perspective:f,query:t,params:p}),s),b()}});const D=e.listen(l=>{l?(h=r({hydrate:(s,f,t)=>{const p=(t==null?void 0:t.perspective)||g.get(),w=JSON.stringify({perspective:p,query:s,params:f}),m=o.get(w);return(m==null?void 0:m.result)!==void 0&&(m==null?void 0:m.resultSourceMap)!==void 0?{loading:!1,error:void 0,data:m.result,sourceMap:m.resultSourceMap,perspective:p}:{loading:e.value===!0&&(t==null?void 0:t.data)===void 0||(t==null?void 0:t.sourceMap)===void 0,error:void 0,data:t==null?void 0:t.data,sourceMap:t==null?void 0:t.sourceMap,perspective:(t==null?void 0:t.perspective)||"published"}},fetch:(s,f,t,p)=>{try{const w=j(s,f,t);if(p.signal.addEventListener("abort",()=>{w(),b()},{once:!0}),b(),t.setKey("error",void 0),p.signal.aborted)return}catch(w){t.setKey("error",w),t.setKey("loading",!1)}}}),y==null||y()):(h==null||h(),a==null||a())}),S=new Set,j=(l,s,f)=>{const t={query:l,params:s,$fetch:f};S.add(t),U();const p=setInterval(()=>U(!0),1e3);return()=>{clearInterval(p),S.delete(t),U()}},U=l=>{if(!c)throw new Error("No channel");const s=g.get();for(const{query:f,params:t,$fetch:p}of S)c.send("loader/query-listen",{projectId:i,dataset:v,perspective:s,query:f,params:t,heartbeat:1e3}),!l&&e.value===!0&&p.setKey("loading",!0),p.setKey("perspective",s)};function b(){var l,s;const f=g.get(),t=[];for(const{query:p,params:w,$fetch:m}of S){const N=JSON.stringify({perspective:f,query:p,params:w}),M=o.get(N);M&&(m.set({data:M.result,error:void 0,loading:!1,perspective:f,sourceMap:M.resultSourceMap}),t.push(...(s=(l=M.resultSourceMap)==null?void 0:l.documents)!=null?s:[]))}c==null||c.send("loader/documents",{projectId:i,dataset:v,perspective:f,documents:t})}return()=>{h==null||h(),D(),c.destroy()}}export{P as enableLiveMode};
