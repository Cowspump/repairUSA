import{N as e,k as t,o as n,v as r}from"./icons-DLL0O6Oi.js";import{v as i}from"./stats-ui-CMU_bDnF.js";var a=i(),o=[{value:`5.0`,label:`Average Rating`},{value:`200+`,label:`Five-Star Reviews`},{value:`Licensed service`,label:`Licensed & Insured`},{value:`7 Days`,label:`A Week Availability`}],s=[{title:`Honest Diagnostics`,Icon:t},{title:`Certified Technicians`,Icon:e},{title:`Honest Pricing`,Icon:n},{title:`Clear Communication`,Icon:r}];function c(){return(0,a.jsxs)(`section`,{style:{position:`relative`,color:`#12233f`,overflow:`hidden`,background:`#ffffff`},children:[(0,a.jsx)(`style`,{children:`
        .whyus-stats { display: flex; gap: 0; flex-wrap: wrap; justify-content: center; }
        .whyus-stat { padding: 0 clamp(20px, 4vw, 48px); text-align: center; }
        .whyus-stat + .whyus-stat { border-left: 1px solid rgba(255,255,255,0.25); }
        @media (max-width: 640px) {
          .whyus-stats { flex-direction: column; gap: 20px; }
          .whyus-stat + .whyus-stat { border-left: none; }
        }
        .whyus-values { display: grid; grid-template-columns: repeat(4, 1fr); width: 100%; background: #132c54; border-radius: 24px; padding: 28px 12px; }
        .whyus-value { display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 8px 12px; text-align: center; }
        .whyus-value + .whyus-value { border-left: 1px solid rgba(255,255,255,0.15); }
        @media (max-width: 809px) {
          .whyus-values { grid-template-columns: 1fr 1fr; row-gap: 20px; }
          .whyus-value:nth-child(3) { border-left: none; }
        }
        @media (max-width: 480px) {
          .whyus-values { grid-template-columns: 1fr; }
          .whyus-value + .whyus-value { border-left: none; }
        }
      `}),(0,a.jsxs)(`div`,{style:{position:`relative`,padding:`90px 20px`},children:[(0,a.jsx)(`img`,{src:`/assets/whyus-bg.webp`,alt:``,loading:`lazy`,style:{position:`absolute`,inset:0,width:`100%`,height:`100%`,objectFit:`cover`}}),(0,a.jsx)(`div`,{style:{position:`absolute`,inset:0,background:`linear-gradient(180deg, rgba(19,44,84,0.72) 0%, rgba(19,44,84,0.85) 100%)`}}),(0,a.jsxs)(`div`,{style:{position:`relative`,color:`#fff`},children:[(0,a.jsx)(`h2`,{style:{fontSize:30,margin:`0 0 44px`,textAlign:`center`},children:`Why us?`}),(0,a.jsx)(`div`,{className:`whyus-stats`,children:o.map(e=>(0,a.jsxs)(`div`,{className:`whyus-stat`,children:[(0,a.jsx)(`p`,{style:{margin:0,fontFamily:`'Space Grotesk', sans-serif`,fontSize:40,fontWeight:700},children:e.value}),(0,a.jsx)(`p`,{style:{margin:`4px 0 0`,fontSize:13,color:`rgba(255,255,255,0.85)`},children:e.label})]},e.label))})]})]}),(0,a.jsx)(`div`,{style:{maxWidth:1100,margin:`0 auto`,padding:`48px 20px 90px`},children:(0,a.jsx)(`div`,{className:`whyus-values`,children:s.map(e=>(0,a.jsxs)(`div`,{className:`whyus-value`,children:[(0,a.jsx)(e.Icon,{size:28,color:`#f2711f`}),(0,a.jsx)(`p`,{style:{margin:0,fontSize:15,fontWeight:600,color:`#fff`},children:e.title})]},e.title))})})]})}export{c as default};