import{N as H,n as J,O as Q,i as X,Q as Y,U as ee,V as te,X as ne,Y as se,H as re,Z as oe,$ as ie,a0 as ae,a1 as ce,a2 as le,a3 as D,a4 as T,r as f,a5 as ue,k as B,A as de,C as pe,s as fe,_ as M,v as he,a6 as me,a7 as ge,w as xe,x as ve,a8 as P,a9 as z,y as be,a as S,j as m,aa as ye,ab as Se,ac as we,ad as _e,ae as $e,B as $,F as Ce,af as ke,T as L,W as Ie,b as Re,ag as Ee}from"./index-91619278.js";import{i as Ne,T as Me}from"./TextField-b9d60514.js";function Ae(e,t){return()=>null}function Ge(e,t){return()=>null}function We(e,t,n,s,i){return null}const Pe={configure:e=>{H.configure(e)}},Oe=Object.freeze(Object.defineProperty({__proto__:null,capitalize:J,createChainedFunction:Q,createSvgIcon:X,debounce:Y,deprecatedPropType:Ae,isMuiElement:Ne,ownerDocument:ee,ownerWindow:te,requirePropFactory:Ge,setRef:ne,unstable_ClassNameGenerator:Pe,unstable_useEnhancedEffect:se,unstable_useId:re,unsupportedProp:We,useControlled:oe,useEventCallback:ie,useForkRef:ae,useIsFocusVisible:ce},Symbol.toStringTag,{value:"Module"}));function je(e){let t=0,n;for(n=0;n<e.length;n+=1)t=e.charCodeAt(n)+((t<<5)-t);let s="#";for(n=0;n<3;n+=1){const i=t>>n*8&255;s+=`00${i.toString(16)}`.slice(-2)}return s}function Be(e){return{sx:{bgcolor:je(e)},children:`${e.split(" ")[0][0]}${e.split(" ")[1][0]}`}}function De(e){return e?le(new Date(e),{addSuffix:!0}):""}function Te(){const{data:e}=D({name:"get_all_agents"});return e}function ze(e=1){const{chat_id:t}=T(),n=t?{name:"get_messages_by_channel_id",params:{channel_uuid:t,page:e},channel:"realtime:public:messages"}:{},{data:s,refetch:i}=D(n);return f.useEffect(()=>{i()},[t]),s}function Fe(e){const{chat_id:t}=T(),n=e||t,{data:s}=D({name:"get_users_from_channel_id2",params:{channel_uuid:n}});return s||[]}const Le="http://127.0.0.1:5000/v1/api";function Ue(){const[e,t]=f.useState(null),[n,s]=f.useState(!1);function i({api:a="response",...d}){s(!0),fetch(`${Le}/agent/${a}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(d)}).then(l=>l.json()).then(l=>{t(l),s(!1)})}return{data:e,loading:n,getAiChatResponse:i}}var F={},K={exports:{}};(function(e){function t(n){return n&&n.__esModule?n:{default:n}}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports})(K);var qe=K.exports,O={};const Ke=ue(Oe);var U;function Ve(){return U||(U=1,function(e){"use client";Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.createSvgIcon}});var t=Ke}(O)),O}var Ze=qe;Object.defineProperty(F,"__esModule",{value:!0});var V=F.default=void 0,He=Ze(Ve()),Je=B,Qe=(0,He.default)((0,Je.jsx)("path",{d:"M2.01 21 23 12 2.01 3 2 10l15 2-15 2z"}),"Send");V=F.default=Qe;const Xe=f.createContext(),q=Xe;function Ye(e){return de("MuiGrid",e)}const et=[0,1,2,3,4,5,6,7,8,9,10],tt=["column-reverse","column","row-reverse","row"],nt=["nowrap","wrap-reverse","wrap"],N=["auto",!0,1,2,3,4,5,6,7,8,9,10,11,12],A=pe("MuiGrid",["root","container","item","zeroMinWidth",...et.map(e=>`spacing-xs-${e}`),...tt.map(e=>`direction-xs-${e}`),...nt.map(e=>`wrap-xs-${e}`),...N.map(e=>`grid-xs-${e}`),...N.map(e=>`grid-sm-${e}`),...N.map(e=>`grid-md-${e}`),...N.map(e=>`grid-lg-${e}`),...N.map(e=>`grid-xl-${e}`)]),st=["className","columns","columnSpacing","component","container","direction","item","rowSpacing","spacing","wrap","zeroMinWidth"];function C(e){const t=parseFloat(e);return`${t}${String(e).replace(String(t),"")||"px"}`}function rt({theme:e,ownerState:t}){let n;return e.breakpoints.keys.reduce((s,i)=>{let a={};if(t[i]&&(n=t[i]),!n)return s;if(n===!0)a={flexBasis:0,flexGrow:1,maxWidth:"100%"};else if(n==="auto")a={flexBasis:"auto",flexGrow:0,flexShrink:0,maxWidth:"none",width:"auto"};else{const d=P({values:t.columns,breakpoints:e.breakpoints.values}),l=typeof d=="object"?d[i]:d;if(l==null)return s;const p=`${Math.round(n/l*1e8)/1e6}%`;let u={};if(t.container&&t.item&&t.columnSpacing!==0){const c=e.spacing(t.columnSpacing);if(c!=="0px"){const g=`calc(${p} + ${C(c)})`;u={flexBasis:g,maxWidth:g}}}a=M({flexBasis:p,flexGrow:0,maxWidth:p},u)}return e.breakpoints.values[i]===0?Object.assign(s,a):s[e.breakpoints.up(i)]=a,s},{})}function ot({theme:e,ownerState:t}){const n=P({values:t.direction,breakpoints:e.breakpoints.values});return z({theme:e},n,s=>{const i={flexDirection:s};return s.indexOf("column")===0&&(i[`& > .${A.item}`]={maxWidth:"none"}),i})}function Z({breakpoints:e,values:t}){let n="";Object.keys(t).forEach(i=>{n===""&&t[i]!==0&&(n=i)});const s=Object.keys(e).sort((i,a)=>e[i]-e[a]);return s.slice(0,s.indexOf(n))}function it({theme:e,ownerState:t}){const{container:n,rowSpacing:s}=t;let i={};if(n&&s!==0){const a=P({values:s,breakpoints:e.breakpoints.values});let d;typeof a=="object"&&(d=Z({breakpoints:e.breakpoints.values,values:a})),i=z({theme:e},a,(l,p)=>{var u;const c=e.spacing(l);return c!=="0px"?{marginTop:`-${C(c)}`,[`& > .${A.item}`]:{paddingTop:C(c)}}:(u=d)!=null&&u.includes(p)?{}:{marginTop:0,[`& > .${A.item}`]:{paddingTop:0}}})}return i}function at({theme:e,ownerState:t}){const{container:n,columnSpacing:s}=t;let i={};if(n&&s!==0){const a=P({values:s,breakpoints:e.breakpoints.values});let d;typeof a=="object"&&(d=Z({breakpoints:e.breakpoints.values,values:a})),i=z({theme:e},a,(l,p)=>{var u;const c=e.spacing(l);return c!=="0px"?{width:`calc(100% + ${C(c)})`,marginLeft:`-${C(c)}`,[`& > .${A.item}`]:{paddingLeft:C(c)}}:(u=d)!=null&&u.includes(p)?{}:{width:"100%",marginLeft:0,[`& > .${A.item}`]:{paddingLeft:0}}})}return i}function ct(e,t,n={}){if(!e||e<=0)return[];if(typeof e=="string"&&!Number.isNaN(Number(e))||typeof e=="number")return[n[`spacing-xs-${String(e)}`]];const s=[];return t.forEach(i=>{const a=e[i];Number(a)>0&&s.push(n[`spacing-${i}-${String(a)}`])}),s}const lt=fe("div",{name:"MuiGrid",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e,{container:s,direction:i,item:a,spacing:d,wrap:l,zeroMinWidth:p,breakpoints:u}=n;let c=[];s&&(c=ct(d,u,t));const g=[];return u.forEach(x=>{const v=n[x];v&&g.push(t[`grid-${x}-${String(v)}`])}),[t.root,s&&t.container,a&&t.item,p&&t.zeroMinWidth,...c,i!=="row"&&t[`direction-xs-${String(i)}`],l!=="wrap"&&t[`wrap-xs-${String(l)}`],...g]}})(({ownerState:e})=>M({boxSizing:"border-box"},e.container&&{display:"flex",flexWrap:"wrap",width:"100%"},e.item&&{margin:0},e.zeroMinWidth&&{minWidth:0},e.wrap!=="wrap"&&{flexWrap:e.wrap}),ot,it,at,rt);function ut(e,t){if(!e||e<=0)return[];if(typeof e=="string"&&!Number.isNaN(Number(e))||typeof e=="number")return[`spacing-xs-${String(e)}`];const n=[];return t.forEach(s=>{const i=e[s];if(Number(i)>0){const a=`spacing-${s}-${String(i)}`;n.push(a)}}),n}const dt=e=>{const{classes:t,container:n,direction:s,item:i,spacing:a,wrap:d,zeroMinWidth:l,breakpoints:p}=e;let u=[];n&&(u=ut(a,p));const c=[];p.forEach(x=>{const v=e[x];v&&c.push(`grid-${x}-${String(v)}`)});const g={root:["root",n&&"container",i&&"item",l&&"zeroMinWidth",...u,s!=="row"&&`direction-xs-${String(s)}`,d!=="wrap"&&`wrap-xs-${String(d)}`,...c]};return be(g,Ye,t)},pt=f.forwardRef(function(t,n){const s=he({props:t,name:"MuiGrid"}),{breakpoints:i}=me(),a=ge(s),{className:d,columns:l,columnSpacing:p,component:u="div",container:c=!1,direction:g="row",item:x=!1,rowSpacing:v,spacing:w=0,wrap:k="wrap",zeroMinWidth:I=!1}=a,y=xe(a,st),R=v||w,_=p||w,G=f.useContext(q),o=c?l||12:G,r={},h=M({},y);i.keys.forEach(W=>{y[W]!=null&&(r[W]=y[W],delete h[W])});const b=M({},a,{columns:o,container:c,direction:g,item:x,rowSpacing:R,columnSpacing:_,wrap:k,zeroMinWidth:I,spacing:w},r,{breakpoints:i.keys}),E=dt(b);return B.jsx(q.Provider,{value:o,children:B.jsx(lt,M({ownerState:b,className:ve(E.root,d),as:u,ref:n},h))})}),j=pt,ft=({inputValue:e,setInputValue:t,allParticipants:n})=>{const[s,i]=f.useState([]),[a,d]=f.useState([]),[l,p]=f.useState(!1),[u,c]=f.useState(0),g=f.useRef(null),x=f.useRef(null),[v,w]=f.useState(1),k=5;f.useEffect(()=>{const o=e.lastIndexOf("@");if(o!==-1){const r=e.substring(o+1).toLowerCase(),h=n.filter(b=>b.display.toLowerCase().includes(r));i(h),p(h.length>0),c(0)}else p(!1)},[e,n]),f.useEffect(()=>{const o=n.filter(r=>e.includes(`@${r.display}`)).map(r=>r.id);d(o)},[e,n,a]);const I=o=>{t(o.target.value);const r=(o.target.value.match(/\n/g)||[]).length;w(Math.min(r+1,k))},y=o=>{var b;const r=e.lastIndexOf("@"),h=`${e.substring(0,r)}@${o.display} `;t(h),d(E=>[...E,o.id]),p(!1),(b=x.current)==null||b.focus()},R=o=>{if(l){let r=u;if(o.key==="ArrowDown"){do r=(r+1)%s.length;while(a.includes(s[r].id)&&r!==u);c(r),o.preventDefault()}else if(o.key==="ArrowUp"){do r=(r-1+s.length)%s.length;while(a.includes(s[r].id)&&r!==u);c(r),o.preventDefault()}else if(o.key==="Enter"||o.key===" "){const h=s[u];h&&!a.includes(h.id)&&(y(h),o.preventDefault())}else o.key==="Escape"&&p(!1)}},_=l&&e.includes("@");return S("div",{ref:g,className:"chat-input-container",children:[m(Me,{label:"Type your message",variant:"outlined",fullWidth:!0,multiline:!0,rows:v,value:e,onChange:I,onKeyDown:R,inputRef:x}),m(_e,{id:_?"simple-popover":void 0,open:_,anchorEl:g.current,onClose:()=>p(!1),anchorOrigin:{vertical:"bottom",horizontal:"left"},disableAutoFocus:!0,disableEnforceFocus:!0,children:m(ye,{children:s.map((o,r)=>m(Se,{onClick:()=>y(o),selected:r===u,disabled:a.includes(o.id),children:m(we,{primary:o.display})},o.id))})})]})};function xt(){const[e,t]=f.useState([]),n=Fe(),s=Te(),[i,a]=f.useState(""),d=f.useRef(null),l=ze(),p=f.useMemo(()=>[...l].reverse(),[l]),u=$e(),{chat_id:c}=T(),{getAiChatResponse:g}=Ue(),x=()=>{var o;(o=d.current)==null||o.scrollIntoView({behavior:"smooth"})};f.useEffect(()=>{n.length>0&&s.length>0&&t([...n,...s])},[n,s]),f.useEffect(()=>{x()},[l]);const v=()=>{i.trim()!==""&&(Ee("post_chat_message",{user_id:u,channel_id:c,message_content:i}),a(""),w())},w=()=>{const o=k(i);console.log({mentions:o}),o.forEach(r=>{y(r)?_(r):R(r)&&G(r)}),a("")},k=o=>o.split("@").slice(1).map(r=>I(r.trim())).filter(r=>r!==null).map(r=>`@${r}`),I=o=>e.reduce((r,h)=>o.startsWith(h.display)&&h.display.length>r.length?h.display:r,"")||null,y=o=>{const r=o.substring(1);return n.some(h=>h.display===r)},R=o=>{const r=o.substring(1);return s.some(h=>h.display===r)},_=o=>{console.log(`Notify user: ${o}`)},G=o=>{console.log(`Request AI agent response for: ${o}`);const r=s.find(E=>E.display===o.substring(1)),b={"Agent Smith":"response","Agent Neo":"converse","Agent Altman":"retrieve"}[r==null?void 0:r.display];g({api:b,channel_id:c,invoker_id:u,participant_id:r==null?void 0:r.id,message:i})};return S(Ce,{children:[m(Ie,{children:m("title",{children:" Dashboard: One"})}),S($,{sx:{height:"calc(100vh - 64px)",display:"flex",flexDirection:"column"},children:[S($,{sx:{flexGrow:1,overflow:"auto",p:2},children:[p==null?void 0:p.map(o=>m(ht,{message:o},o.id)),m("div",{ref:d})]}),m($,{sx:{p:2,backgroundColor:"background.default"},children:S(j,{container:!0,spacing:2,children:[m(j,{item:!0,xs:10,children:m(ft,{inputValue:i,setInputValue:a,allParticipants:e})}),m(j,{item:!0,xs:2,children:m(Re,{fullWidth:!0,color:"primary",variant:"contained",endIcon:m(V,{}),onClick:v,children:"Send"})})]})})]})]})}function ht({message:e}){const t=(e==null?void 0:e.is_bot)==="bot";return m($,{sx:{display:"flex",justifyContent:"flex-start",mb:2},children:S($,{sx:{display:"flex",flexDirection:"row",alignItems:"center",backgroundColor:t?"rgba(0, 0, 0, .2)":"transparent"},children:[m(ke,{...Be(e.user_name)}),S($,{sx:{p:2,width:"calc(100vw - 420px)"},children:[S(L,{variant:"subtitle2",children:[e.user_name," ",m("small",{children:De(e.created_at)})]}),m(L,{variant:"body1",children:e.content})]})]})})}export{xt as default};