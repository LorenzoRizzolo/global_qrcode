if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,c)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(s[r])return;let o={};const f=e=>i(e,r),a={module:{uri:r},exports:o,require:f};s[r]=Promise.all(n.map((e=>a[e]||f(e)))).then((e=>(c(...e),o)))}}define(["./workbox-9a84fccb"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/Framework7Icons-Regular-Db9RwDq_.woff2",revision:"4a39aba9fb8a2f831fa437780e1a058a"},{url:"assets/Framework7Icons-Regular-DocpuGSF.woff",revision:"d03b787b6492fa2b0141c43fb7e56689"},{url:"assets/index-B97nEnPw.js",revision:"80b46ae8c3a4eb5053ea3dd967218bc3"},{url:"assets/index-CiqxqH_f.css",revision:"cf0232a8ce4f0c44fe1818d5defa41ef"},{url:"assets/material-icons-Dr0goTwe.woff",revision:"3e1afe59fa075c9e04c436606b77f640"},{url:"assets/material-icons-kAwBdRge.woff2",revision:"53436aca8627a49f4deaaa44dc9e3c05"},{url:"icons/128x128.png",revision:"7d419766d43f6327a821ea43f2d291b2"},{url:"icons/144x144.png",revision:"d4c9d3b6fdcd7d6a48d19349eab9a49f"},{url:"icons/152x152.png",revision:"03185582554e081845aca0f461ee95c6"},{url:"icons/192x192.png",revision:"8d8bfd80d6917ddd88c3318e399fab42"},{url:"icons/256x256.png",revision:"f4c588f1c46c65ad1b9c2e7d784d90f8"},{url:"icons/512x512.png",revision:"394f78a3d337f8781cdc95a424ec36b7"},{url:"icons/apple-touch-icon.png",revision:"f4c588f1c46c65ad1b9c2e7d784d90f8"},{url:"icons/favicon.png",revision:"7d419766d43f6327a821ea43f2d291b2"},{url:"index.html",revision:"e448052216236cffeb071845474f107c"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]})}));
//# sourceMappingURL=service-worker.js.map
