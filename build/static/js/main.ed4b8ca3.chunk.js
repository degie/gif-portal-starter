(this["webpackJsonpfancy-wallet"]=this["webpackJsonpfancy-wallet"]||[]).push([[0],{106:function(e,t,n){},108:function(e,t){},111:function(e,t){},124:function(e,t){},135:function(e,t){},136:function(e,t){},154:function(e,t){},156:function(e,t){},162:function(e,t,n){},164:function(e,t,n){"use strict";n.r(t);var c=n(22),a=n.n(c),r=n(96),s=n.n(r),i=(n(106),n(3)),o=n(10),u=n(1),l=n.n(u),d=n.p+"static/media/twitter-logo.d89d9a86.svg",b=n(53),p=n(97),m=n(8),f=n(24),j=(n(162),n(9)),h=new m.PublicKey(b.metadata.address),x=Object(m.clusterApiUrl)("devnet"),v="processed",O=f.d.SystemProgram,g=(f.d.Keypair,"kittiecrypto"),y="https://twitter.com/".concat(g),w=Object.values(p._keypair.secretKey),N=new Uint8Array(w),k=f.d.Keypair.fromSecretKey(N),S=0,K=function(){var e=Object(c.useState)(null),t=Object(o.a)(e,2),n=t[0],a=t[1],r=Object(c.useState)(""),s=Object(o.a)(r,2),u=s[0],p=s[1],w=Object(c.useState)(""),N=Object(o.a)(w,2),K=N[0],A=N[1],L=Object(c.useState)([]),T=Object(o.a)(L,2),F=T[0],P=T[1],C=Object(c.useState)(""),E=Object(o.a)(C,2),I=E[0],J=E[1],M=function(){var e=Object(i.a)(l.a.mark((function e(){var t,n,c;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,t=window,!(n=t.solana)){e.next=12;break}if(!n.isPhantom){e.next=10;break}return console.log("Phantom wallet found!"),e.next=7,n.connect({onlyIfTrusted:!0});case 7:c=e.sent,console.log("Connected with Public Key:",c.publicKey.toString()),a(c.publicKey.toString());case 10:e.next=13;break;case 12:console.log("Solana object not found! Get a Phantom Wallet \ud83d\udc7b");case 13:e.next=18;break;case 15:e.prev=15,e.t0=e.catch(0),console.error(e.t0);case 18:case"end":return e.stop()}}),e,null,[[0,15]])})));return function(){return e.apply(this,arguments)}}(),D=function(){var e=Object(i.a)(l.a.mark((function e(){var t,n,c;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=window,!(n=t.solana)){e.next=7;break}return e.next=4,n.connect();case 4:c=e.sent,console.log("Connected with Public Key:",c.publicKey.toString()),a(c.publicKey.toString());case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),G=function(){var e=Object(i.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:u.length>0?(console.log("Name:",u),J(u)):console.log("Empty input name. Try again.");case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),B=function(){var e=Object(i.a)(l.a.mark((function e(){var t,n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(0!==K.length){e.next=3;break}return console.log("No NFT link given!"),e.abrupt("return");case 3:return A(""),console.log("URL:",K),e.prev=5,t=z(),n=new f.a(b,h,t),e.next=10,n.rpc.addNft(K,{accounts:{baseAccount:k.publicKey,user:t.wallet.publicKey}});case 10:return console.log("NFT successfully sent to program",K),e.next=13,_();case 13:e.next=18;break;case 15:e.prev=15,e.t0=e.catch(5),console.log("Error sending NFT:",e.t0);case 18:case"end":return e.stop()}}),e,null,[[5,15]])})));return function(){return e.apply(this,arguments)}}(),R=function(e){var t=e.target.value;p(t)},U=function(e){var t=e.target.value;A(t)},z=function(){var e=new m.Connection(x,v);return new f.b(e,window.solana,v)},V=function(){var e=Object(i.a)(l.a.mark((function e(){var t,n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t=z(),n=new f.a(b,h,t),console.log("ping"),e.next=6,n.rpc.initialize({accounts:{baseAccount:k.publicKey,user:t.wallet.publicKey,systemProgram:O.programId},signers:[k]});case 6:return console.log("Created a new BaseAccount w/ address:",k.publicKey.toString()),e.next=9,_();case 9:e.next=14;break;case 11:e.prev=11,e.t0=e.catch(0),console.log("Error creating BaseAccount account:",e.t0);case 14:case"end":return e.stop()}}),e,null,[[0,11]])})));return function(){return e.apply(this,arguments)}}();Object(c.useEffect)((function(){var e=function(){var e=Object(i.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,M();case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return window.addEventListener("load",e),function(){return window.removeEventListener("load",e)}}),[]);var _=function(){var e=Object(i.a)(l.a.mark((function e(){var t,n,c;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t=z(),n=new f.a(b,h,t),e.next=5,n.account.baseAccount.fetch(k.publicKey);case 5:c=e.sent,console.log("Got the account",c),P(c.nftList),e.next=14;break;case 10:e.prev=10,e.t0=e.catch(0),console.log("Error in getGifList: ",e.t0),P(null);case 14:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(){return e.apply(this,arguments)}}();return Object(c.useEffect)((function(){n&&(console.log("Fetching NFT list..."),_())}),[n]),Object(j.jsx)("div",{className:"App",children:Object(j.jsxs)("div",{className:n?"authed-container":"container",children:[Object(j.jsxs)("div",{className:"header-container",children:[Object(j.jsxs)("p",{className:"header",children:["NFT wallet ",Object(j.jsx)("small",{children:"working on Devnet"})]}),n&&!I&&Object(j.jsx)("div",{className:"form-container",children:Object(j.jsxs)("form",{onSubmit:function(e){e.preventDefault(),G()},children:[Object(j.jsx)("input",{type:"text",placeholder:"Set your name",name:"userName",value:u,onChange:R}),Object(j.jsx)("button",{type:"submit",className:"cta-button submit-button",children:"Save"})]})}),I&&Object(j.jsxs)("div",{className:"username-container",children:["Hi ",I,"!"]}),Object(j.jsx)("p",{className:"sub-text",children:"View your NFT collection in the metaverse \u2728"}),Object(j.jsx)("small",{className:"wallet-address",children:n}),!n&&Object(j.jsx)("button",{className:"cta-button connect-wallet-button",onClick:D,children:"Connect to Wallet"})]}),n&&(null===F?Object(j.jsx)("div",{className:"connected-container",children:Object(j.jsx)("button",{className:"cta-button submit-nft-button",onClick:V,children:"Do One-Time Initialization For NFT Program Account"})}):Object(j.jsxs)("div",{className:"connected-container",children:[Object(j.jsx)("div",{className:"add-nft-container",children:Object(j.jsxs)("form",{onSubmit:function(e){e.preventDefault(),B()},children:[Object(j.jsx)("input",{type:"text",name:"nftValue",placeholder:"Add NFT URL",value:K,onChange:U}),Object(j.jsx)("button",{type:"submit",className:"cta-button submit-button",children:"Add"})]})}),Object(j.jsxs)("table",{className:"nft-table",children:[Object(j.jsx)("thead",{className:"nft-item table-header",children:Object(j.jsxs)("tr",{children:[Object(j.jsx)("th",{className:"item-name",children:"Item"}),Object(j.jsx)("th",{className:"item-price",children:"Acquisition Price"})]})}),Object(j.jsxs)("tbody",{children:[Object(j.jsx)("tr",{className:"divider",children:Object(j.jsx)("td",{children:"\xa0"})}),F.map((function(e){return Object(j.jsxs)("tr",{className:"nft-item",children:[Object(j.jsxs)("td",{className:"item-name",children:[Object(j.jsx)("img",{src:e.nftLink,alt:e.userAddress.toString()})," ",Object(j.jsx)("span",{children:"Lucaionescuart GIF"})]}),Object(j.jsx)("td",{className:"item-price",children:"1 SOL"})]},S+=1)}))]})]})]})),Object(j.jsxs)("div",{className:"footer-container",children:[Object(j.jsx)("img",{alt:"Twitter Logo",className:"twitter-logo",src:d}),Object(j.jsx)("a",{className:"footer-text",href:y,target:"_blank",rel:"noreferrer",children:"built by @".concat(g)})]})]})})};s.a.render(Object(j.jsx)(a.a.StrictMode,{children:Object(j.jsx)(K,{})}),document.getElementById("root"))},53:function(e){e.exports=JSON.parse('{"version":"0.1.0","name":"fancywallet","instructions":[{"name":"initialize","accounts":[{"name":"baseAccount","isMut":true,"isSigner":true},{"name":"user","isMut":true,"isSigner":true},{"name":"systemProgram","isMut":false,"isSigner":false}],"args":[]},{"name":"addNft","accounts":[{"name":"baseAccount","isMut":true,"isSigner":false},{"name":"user","isMut":true,"isSigner":true}],"args":[{"name":"nftLink","type":"string"}]}],"accounts":[{"name":"BaseAccount","type":{"kind":"struct","fields":[{"name":"totalNfts","type":"u64"},{"name":"nftList","type":{"vec":{"defined":"ItemStruct"}}}]}}],"types":[{"name":"ItemStruct","type":{"kind":"struct","fields":[{"name":"nftLink","type":"string"},{"name":"userAddress","type":"publicKey"}]}}],"metadata":{"address":"HJF65qXZapJJTGardYwm5nXRjVR6ksnn7SZdt247vDdj"}}')},97:function(e){e.exports=JSON.parse('{"_keypair":{"publicKey":{"0":228,"1":218,"2":235,"3":140,"4":242,"5":138,"6":117,"7":141,"8":101,"9":26,"10":175,"11":54,"12":116,"13":217,"14":223,"15":102,"16":2,"17":209,"18":76,"19":238,"20":102,"21":187,"22":184,"23":166,"24":243,"25":122,"26":172,"27":65,"28":252,"29":91,"30":150,"31":117},"secretKey":{"0":124,"1":76,"2":239,"3":103,"4":156,"5":114,"6":108,"7":130,"8":123,"9":157,"10":36,"11":29,"12":242,"13":76,"14":111,"15":126,"16":45,"17":49,"18":51,"19":217,"20":204,"21":4,"22":47,"23":42,"24":160,"25":97,"26":210,"27":30,"28":77,"29":73,"30":76,"31":150,"32":228,"33":218,"34":235,"35":140,"36":242,"37":138,"38":117,"39":141,"40":101,"41":26,"42":175,"43":54,"44":116,"45":217,"46":223,"47":102,"48":2,"49":209,"50":76,"51":238,"52":102,"53":187,"54":184,"55":166,"56":243,"57":122,"58":172,"59":65,"60":252,"61":91,"62":150,"63":117}}}')}},[[164,1,2]]]);
//# sourceMappingURL=main.ed4b8ca3.chunk.js.map