import{j as i,m as o,B as d,a as g,T as s,P as m,R as x,b as h,W as v,F as f}from"./index-91619278.js";const c=t=>{const n=(t==null?void 0:t.durationIn)||.64,a=(t==null?void 0:t.easeIn)||[.43,.13,.23,.96];return{duration:n,ease:a}},u=t=>{const n=(t==null?void 0:t.durationOut)||.48,a=(t==null?void 0:t.easeOut)||[.43,.13,.23,.96];return{duration:n,ease:a}},r=t=>{const n=t==null?void 0:t.durationIn,a=t==null?void 0:t.durationOut,e=t==null?void 0:t.easeIn,l=t==null?void 0:t.easeOut;return{in:{initial:{},animate:{scale:[.3,1.1,.9,1.03,.97,1],opacity:[0,1,1,1,1,1],transition:c({durationIn:n,easeIn:e})},exit:{scale:[.9,1.1,.3],opacity:[1,1,0]}},inUp:{initial:{},animate:{y:[720,-24,12,-4,0],scaleY:[4,.9,.95,.985,1],opacity:[0,1,1,1,1],transition:{...c({durationIn:n,easeIn:e})}},exit:{y:[12,-24,720],scaleY:[.985,.9,3],opacity:[1,1,0],transition:u({durationOut:a,easeOut:l})}},inDown:{initial:{},animate:{y:[-720,24,-12,4,0],scaleY:[4,.9,.95,.985,1],opacity:[0,1,1,1,1],transition:c({durationIn:n,easeIn:e})},exit:{y:[-12,24,-720],scaleY:[.985,.9,3],opacity:[1,1,0],transition:u({durationOut:a,easeOut:l})}},inLeft:{initial:{},animate:{x:[-720,24,-12,4,0],scaleX:[3,1,.98,.995,1],opacity:[0,1,1,1,1],transition:c({durationIn:n,easeIn:e})},exit:{x:[0,24,-720],scaleX:[1,.9,2],opacity:[1,1,0],transition:u({durationOut:a,easeOut:l})}},inRight:{initial:{},animate:{x:[720,-24,12,-4,0],scaleX:[3,1,.98,.995,1],opacity:[0,1,1,1,1],transition:c({durationIn:n,easeIn:e})},exit:{x:[0,-24,720],scaleX:[1,.9,2],opacity:[1,1,0],transition:u({durationOut:a,easeOut:l})}},out:{animate:{scale:[.9,1.1,.3],opacity:[1,1,0]}},outUp:{animate:{y:[-12,24,-720],scaleY:[.985,.9,3],opacity:[1,1,0]}},outDown:{animate:{y:[12,-24,720],scaleY:[.985,.9,3],opacity:[1,1,0]}},outLeft:{animate:{x:[0,24,-720],scaleX:[1,.9,2],opacity:[1,1,0]}},outRight:{animate:{x:[0,-24,720],scaleX:[1,.9,2],opacity:[1,1,0]}}}},y=t=>{const n=(t==null?void 0:t.staggerIn)||.05,a=(t==null?void 0:t.staggerIn)||.05,e=(t==null?void 0:t.staggerIn)||.05;return{animate:{transition:{staggerChildren:n,delayChildren:a}},exit:{transition:{staggerChildren:e,staggerDirection:-1}}}};function I({animate:t,action:n=!1,children:a,...e}){return n?i(d,{component:o.div,initial:!1,animate:t?"animate":"exit",variants:y(),...e,children:a}):i(d,{component:o.div,initial:"initial",animate:"animate",exit:"exit",variants:y(),...e,children:a})}function F(){return g(I,{children:[i(o.div,{variants:r().in,children:i(s,{variant:"h3",sx:{mb:2},children:"Sorry, Page Not Found!"})}),i(o.div,{variants:r().in,children:i(s,{sx:{color:"text.secondary"},children:"Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be sure to check your spelling."})}),i(o.div,{variants:r().in,children:i(m,{sx:{height:260,my:{xs:5,sm:10}}})}),i(h,{component:x,href:"/",size:"large",variant:"contained",children:"Go to Home"})]})}function P(){return g(f,{children:[i(v,{children:i("title",{children:" 404 Page Not Found!"})}),i(F,{})]})}export{P as default};
