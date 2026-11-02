import{v as e}from"./stats-ui-CMU_bDnF.js";var t=e(),n=[{src:`/assets/gallery/IMG_6893.webp`,alt:`Super Master Appliance team`},{src:`/assets/gallery/IMG_9103.webp`,alt:`appliance condenser installation`},{src:`/assets/gallery/IMG_8267.webp`,alt:`Super Master Appliance team after a job`},{src:`/assets/gallery/IMG_8008.webp`,alt:`Rooftop appliance unit installation`},{src:`/assets/gallery/IMG_8965.webp`,alt:`Rooftop package unit service`},{src:`/assets/gallery/IMG_9104.webp`,alt:`Appliance repair`},{src:`/assets/gallery/IMG_8977.webp`,alt:`Ductless split installation`},{src:`/assets/gallery/IMG_8957.webp`,alt:`appliance unit diagnostic`},{src:`/assets/gallery/IMG_9105.webp`,alt:`Completed appliance installation`}];function r(){return(0,t.jsxs)(`section`,{style:{position:`relative`,background:`#f2f6fb`,color:`#12233f`,padding:`80px 20px`},children:[(0,t.jsxs)(`div`,{style:{maxWidth:1100,margin:`0 auto`,display:`flex`,flexDirection:`column`,gap:36},children:[(0,t.jsx)(`h2`,{style:{fontSize:30,fontWeight:700,margin:0},children:`Recent Work`}),(0,t.jsx)(`div`,{className:`recent-work-grid`,children:n.map(e=>(0,t.jsx)(`div`,{style:{position:`relative`,borderRadius:16,overflow:`hidden`},children:(0,t.jsx)(`img`,{src:e.src,alt:e.alt,loading:`lazy`,decoding:`async`,width:900,height:1200,sizes:`(max-width: 809px) 50vw, 33vw`,style:{position:`absolute`,inset:0,width:`100%`,height:`100%`,objectFit:`cover`}})},e.src))})]}),(0,t.jsx)(`style`,{children:`
        .recent-work-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-auto-rows: 240px;
          gap: 12px;
          width: 100%;
        }
        .recent-work-grid > :first-child { grid-column: 1 / 3; grid-row: 1 / 3; }
        @media (max-width: 809px) {
          .recent-work-grid { grid-template-columns: repeat(2, 1fr); grid-auto-rows: 150px; }
          .recent-work-grid > :first-child { grid-column: 1 / 3; grid-row: 1 / 3; }
        }
      `})]})}export{r as default};