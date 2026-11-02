import{g as e,s as t}from"./icons-DLL0O6Oi.js";import{v as n}from"./stats-ui-CMU_bDnF.js";import{t as r}from"./Button-Bc9aRlfo.js";import{t as i}from"./reviews-20h_Fi__.js";var a=n(),o=[{src:`/assets/customers/customer-04.webp`,alt:`Happy customers with an Super Master technician after the job`},{src:`/assets/customers/customer-02.webp`,alt:`Super Master technician with a customer at their home`},{src:`/assets/customers/customer-01.webp`,alt:`Super Master technician with a finished Mitsubishi appliance install`},{src:`/assets/customers/customer-05.webp`,alt:`Technician and customer by the new appliance`},{src:`/assets/customers/customer-06.webp`,alt:`Super Master technicians after a completed installation`},{src:`/assets/customers/customer-12.webp`,alt:`Customer and technician celebrating a finished appliance job`},{src:`/assets/customers/customer-03.webp`,alt:`Technicians by the appliance after a repair`},{src:`/assets/customers/customer-08.webp`,alt:`Technician with a customer by the wall heater`}];function s(){let e=[...o,...o];return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(`style`,{children:`
        .supermaster-polaroid-marquee {
          overflow: hidden; width: 100%; padding: 18px 0 12px;
          -webkit-mask-image: linear-gradient(90deg, transparent, #000 60px, #000 calc(100% - 60px), transparent);
          mask-image: linear-gradient(90deg, transparent, #000 60px, #000 calc(100% - 60px), transparent);
        }
        .supermaster-polaroid-track {
          display: flex; align-items: center; width: max-content;
          animation: supermaster-polaroid-flow 55s linear infinite;
        }
        .supermaster-polaroid-marquee:hover .supermaster-polaroid-track { animation-play-state: paused; }
        @keyframes supermaster-polaroid-flow {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
        .supermaster-polaroid {
          margin: 0; background: #ffffff; padding: 12px 12px 38px; border-radius: 4px;
          border: 1px solid rgba(18,35,63,0.08);
          box-shadow: 0 10px 28px rgba(19,44,84,0.16), 0 2px 6px rgba(19,44,84,0.08);
          width: 250px; flex: 0 0 auto; position: relative;
          transform: rotate(var(--r));
          transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.35s ease;
        }
        .supermaster-polaroid:not(:first-child) { margin-left: -26px; }
        .supermaster-polaroid:nth-child(8n+1) { --r: -5deg; }
        .supermaster-polaroid:nth-child(8n+2) { --r: 3deg; z-index: 1; }
        .supermaster-polaroid:nth-child(8n+3) { --r: -2deg; }
        .supermaster-polaroid:nth-child(8n+4) { --r: 4deg; z-index: 1; }
        .supermaster-polaroid:nth-child(8n+5) { --r: -3.5deg; }
        .supermaster-polaroid:nth-child(8n+6) { --r: 2.5deg; z-index: 1; }
        .supermaster-polaroid:nth-child(8n+7) { --r: -4deg; }
        .supermaster-polaroid:nth-child(8n+8) { --r: 3.5deg; z-index: 1; }
        .supermaster-polaroid img { width: 100%; aspect-ratio: 1; object-fit: cover; display: block; border-radius: 2px; }
        .supermaster-polaroid:hover {
          transform: rotate(0deg) scale(1.14) translateY(-6px);
          box-shadow: 0 22px 48px rgba(19,44,84,0.26);
          z-index: 10;
        }
        @media (max-width: 809px) {
          .supermaster-polaroid { width: 190px; }
          .supermaster-polaroid-track { animation-duration: 40s; }
        }
        @media (prefers-reduced-motion: reduce) {
          .supermaster-polaroid-track { animation: none; transform: none; }
          .supermaster-polaroid-marquee { overflow-x: auto; -webkit-mask-image: none; mask-image: none; }
          .supermaster-polaroid, .supermaster-polaroid:hover { transition: none; transform: rotate(var(--r)); }
        }
      `}),(0,a.jsx)(`div`,{className:`supermaster-polaroid-marquee`,children:(0,a.jsx)(`div`,{className:`supermaster-polaroid-track`,children:e.map((e,t)=>(0,a.jsx)(`figure`,{className:`supermaster-polaroid`,"aria-hidden":t>=o.length,children:(0,a.jsx)(`img`,{src:e.src,alt:t<o.length?e.alt:``,loading:`lazy`})},`${e.src}-${t}`))})})]})}function c({review:e}){return(0,a.jsxs)(`div`,{style:{flex:`0 0 auto`,width:380,background:`#ffffff`,border:`1px solid rgba(18,35,63,0.12)`,borderRadius:20,boxShadow:`0 1px 3px rgba(18,35,63,0.06)`,padding:24,display:`flex`,flexDirection:`column`,gap:12,whiteSpace:`normal`},children:[(0,a.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,justifyContent:`space-between`,gap:12},children:[(0,a.jsxs)(`div`,{children:[(0,a.jsx)(`p`,{style:{margin:0,fontWeight:700,fontSize:15,color:`#12233f`},children:e.name}),(0,a.jsxs)(`p`,{style:{margin:0,fontSize:12,color:`rgba(18,35,63,0.5)`},children:[e.location,` · `,e.date]})]}),(0,a.jsx)(`div`,{style:{display:`flex`,gap:2,flexShrink:0},children:Array.from({length:5}).map((e,n)=>(0,a.jsx)(t,{size:14,color:`#f2711f`,fill:`#f2711f`},n))})]}),(0,a.jsx)(`p`,{style:{margin:0,fontSize:14,lineHeight:1.6,color:`rgba(18,35,63,0.8)`,display:`-webkit-box`,WebkitLineClamp:6,WebkitBoxOrient:`vertical`,overflow:`hidden`},children:e.text})]})}function l(){let t=[...i,...i];return(0,a.jsxs)(`section`,{id:`reviews`,style:{position:`relative`,zIndex:1,background:`#ffffff`,color:`#12233f`,padding:`100px 0`},children:[(0,a.jsx)(`style`,{children:`
        .supermaster-review-marquee {
          overflow: hidden; width: 100%;
          -webkit-mask-image: linear-gradient(90deg, transparent, #000 60px, #000 calc(100% - 60px), transparent);
          mask-image: linear-gradient(90deg, transparent, #000 60px, #000 calc(100% - 60px), transparent);
        }
        .supermaster-review-track {
          display: flex; gap: 20px; width: max-content; padding: 4px 0;
          animation: supermaster-review-flow 70s linear infinite;
        }
        .supermaster-review-marquee:hover .supermaster-review-track { animation-play-state: paused; }
        @keyframes supermaster-review-flow {
          from { transform: translateX(0); }
          to { transform: translateX(calc(-50% - 10px)); }
        }
        @media (max-width: 809px) {
          .supermaster-review-track { animation-duration: 55s; }
          .supermaster-review-track > div { width: 300px !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .supermaster-review-track { animation: none; }
          .supermaster-review-marquee { overflow-x: auto; -webkit-mask-image: none; mask-image: none; }
        }
      `}),(0,a.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,alignItems:`center`,gap:40},children:[(0,a.jsxs)(`h2`,{style:{margin:0,padding:`0 20px`,fontSize:32,fontWeight:700,textAlign:`center`,display:`flex`,alignItems:`center`,justifyContent:`center`,gap:10,flexWrap:`wrap`},children:[`What it means to be`,(0,a.jsxs)(`span`,{style:{display:`inline-flex`,alignItems:`center`},children:[(0,a.jsx)(`img`,{src:`/assets/MYLOGO.png`,alt:`Super Master`,style:{height:`1.5em`,width:`auto`,display:`block`}}),(0,a.jsx)(`span`,{"aria-hidden":`true`,children:`ized`})]})]}),(0,a.jsx)(s,{}),(0,a.jsx)(`div`,{className:`supermaster-review-marquee`,children:(0,a.jsx)(`div`,{className:`supermaster-review-track`,children:t.map((e,t)=>(0,a.jsx)(c,{review:e},`${e.name}-${t}`))})}),(0,a.jsxs)(`div`,{style:{display:`flex`,gap:12,flexWrap:`wrap`,justifyContent:`center`,padding:`0 20px`},children:[(0,a.jsx)(r,{href:`/reviews`,variant:`accent`,children:`Read All Reviews`}),(0,a.jsx)(r,{href:`https://maps.app.goo.gl/gaL6f2Ckigcq4LRe8`,target:`_blank`,variant:`secondary`,icon:e,iconPosition:`left`,children:`Write a Review`})]})]})]})}export{l as default};