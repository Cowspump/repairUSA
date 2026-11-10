import{v as i}from"./stats-ui-CMU_bDnF.js";var a=i(),o=[{title:`Refrigerator`,img:`/assets/gallery/IMG_8008.webp`},{title:`Oven`,img:`/assets/gallery/IMG_8957.webp`},{title:`Range`,img:`/assets/gallery/IMG_8965.webp`},{title:`Stove`,img:`/assets/gallery/IMG_9104.webp`},{title:`Cooktop`,img:`/assets/gallery/IMG_9103.webp`},{title:`Dryer`,img:`/assets/gallery/IMG_9105.webp`},{title:`Washer`,img:`/assets/gallery/IMG_6893.webp`},{title:`Dishwasher`,img:`/assets/gallery/IMG_8008.webp`},{title:`Garbage Disposal`,img:`/assets/gallery/IMG_8267.webp`}];function c({item:e}){return(0,a.jsx)(`div`,{className:`offer-card`,style:{position:`relative`,borderRadius:20,overflow:`hidden`,display:`block`,aspectRatio:`3 / 4`},children:(0,a.jsx)(`img`,{src:e.img,alt:e.title,loading:`lazy`,style:{position:`absolute`,inset:0,width:`100%`,height:`100%`,objectFit:`cover`}})})}function l(){return(0,a.jsxs)(`section`,{id:`offer`,style:{position:`relative`,background:`#ffffff`,color:`#12233f`,padding:`80px 20px`},children:[(0,a.jsx)(`style`,{children:`
        .offer-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; width: 100%; }
        .offer-card { transition: transform 0.2s ease; }
        .offer-card:hover { transform: translateY(-3px); }
        .offer-title { font-size: clamp(15px, 1.5vw, 17px); }
        @media (max-width: 980px) {
          .offer-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .offer-grid { grid-template-columns: 1fr; }
          .offer-title { font-size: 17px; }
        }
      `}),(0,a.jsxs)(`div`,{style:{maxWidth:1100,margin:`0 auto`,display:`flex`,flexDirection:`column`,gap:36},children:[(0,a.jsxs)(`div`,{children:[(0,a.jsx)(`h2`,{style:{fontSize:30,fontWeight:700,margin:0},children:`What we are offering`}),(0,a.jsx)(`p`,{style:{margin:`12px 0 0`,fontSize:16,color:`rgba(18,35,63,0.72)`},children:`We proudly serve both residential and light commercial properties.`})]}),(0,a.jsx)(`div`,{className:`offer-grid`,children:o.map(e=>(0,a.jsx)(c,{item:e},e.title))})]})]})}export{l as default};