(() => {
  const style = document.createElement('style');
  style.textContent = `.supermaster-nav,.supermaster-nav-mobile-panel{display:none!important}.why-supermaster-photo{display:none!important}.sma-wrap{max-width:1100px;margin:0 auto}.sma-tech-services{padding:88px 20px;background:#f2f6fb;color:#12233f}.sma-tech-heading{display:flex;align-items:end;justify-content:space-between;gap:28px;margin-bottom:32px}.sma-tech-heading h2{font:700 clamp(32px,4vw,48px)/1.05 'Space Grotesk',sans-serif;letter-spacing:-.04em;margin:0;max-width:580px}.sma-tech-heading p{font-size:16px;line-height:1.55;color:rgba(18,35,63,.72);max-width:360px;margin:0}.sma-tech-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:18px}.sma-tech-card{position:relative;display:flex;align-items:center;justify-content:space-between;gap:24px;min-width:0;min-height:290px;padding:28px;background:#fff;border:1px solid rgba(18,35,63,.16);border-radius:24px;overflow:hidden;color:#12233f;transition:transform .25s ease,box-shadow .25s ease}.sma-tech-card:hover{transform:translateY(-4px);box-shadow:0 14px 28px rgba(18,35,63,.14)}.sma-tech-card-info{position:relative;z-index:2;display:flex;flex:1;min-width:0;flex-direction:column;align-items:flex-start}.sma-tech-card-info strong{font:700 clamp(22px,2.4vw,30px)/1.05 'Space Grotesk',sans-serif;letter-spacing:-.03em}.sma-tech-card-info p{max-width:260px;margin:12px 0 22px;color:rgba(18,35,63,.68);font-size:14px;line-height:1.5}.sma-tech-card-visual{position:relative;z-index:1;display:grid;flex:0 0 190px;place-items:center;width:190px;height:190px;perspective:700px}.sma-tech-card-visual:before,.sma-tech-card-visual:after{position:absolute;inset:10px;border-radius:28px;background:rgba(18,35,63,.08);content:'';transition:transform .35s ease}.sma-tech-card-visual:before{transform:translate(12px,12px) rotate(5deg)}.sma-tech-card-visual:after{transform:translate(6px,6px) rotate(2deg);background:rgba(17,115,193,.12)}.sma-tech-card:hover .sma-tech-card-visual:before{transform:translate(18px,16px) rotate(8deg)}.sma-tech-card:hover .sma-tech-card-visual:after{transform:translate(9px,8px) rotate(4deg)}.sma-tech-card img{position:relative;z-index:2;display:block;width:190px;height:190px;object-fit:contain;border-radius:28px;background:#f2f6fb;padding:14px;transition:transform .35s ease}.sma-tech-card:hover img{transform:translateZ(18px) rotateY(-8deg) rotateX(5deg) scale(1.04)}.sma-tech-call{display:inline-flex;align-items:center;justify-content:center;padding:11px 16px;border-radius:10px;background:#1173c1;color:#fff;font-size:14px;font-weight:700;line-height:1;text-decoration:none;white-space:nowrap;transition:background .2s ease,transform .2s ease}.sma-tech-call:hover{background:#0d5f9f;transform:translateY(-1px)}.sma-areas{padding:80px 20px;background:#f2f6fb;color:#12233f}.sma-areas h2{font:700 30px 'Space Grotesk',sans-serif;margin:0 0 12px}.sma-areas p{font-size:16px;margin:0 0 24px;color:rgba(18,35,63,.72)}.sma-areas h3{font:700 22px 'Space Grotesk',sans-serif;margin:28px 0 16px}.sma-area-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px 18px;font-size:16px}@media(min-width:640px) and (max-width:1023px){.sma-tech-grid{grid-template-columns:1fr}.sma-tech-card{min-height:250px}.sma-tech-card-visual{flex-basis:170px;width:170px;height:170px}.sma-tech-card img{width:170px;height:170px}}@media(max-width:639px){.sma-tech-services{padding:60px 20px}.sma-tech-heading{display:block}.sma-tech-heading p{margin-top:16px}.sma-tech-grid{display:grid!important;grid-template-columns:1fr!important}.sma-tech-card{display:flex!important;flex-direction:row!important;align-items:center!important;gap:12px!important;min-height:220px!important;padding:18px!important}.sma-tech-card-info strong{font-size:20px}.sma-tech-card-info p{margin:9px 0 16px;font-size:13px}.sma-tech-card-visual{flex-basis:132px;width:132px;height:132px}.sma-tech-card-visual:before,.sma-tech-card-visual:after{inset:4px}.sma-tech-card img{width:132px!important;height:132px!important;padding:9px!important;border-radius:20px}.sma-tech-call{padding:9px 12px;font-size:13px}}`;
  document.head.appendChild(style);
  const mount = () => {
    const root = document.getElementById('root'); if (!root) return;
    const hero = root.querySelector('#main-1'); if (!hero) return;
    root.querySelectorAll('#about-1,.why-supermaster-photo,#step,.supermaster-brands-track').forEach(element => element.remove());
    if (!root.querySelector('.sma-tech-services')) {
      const techImages = [
        ['Refrigerator repair', '/assets/tech_images/refrigerator-repair-Northridge.webp'],
        ['Washer repair', '/assets/tech_images/washing-machine-repair-Northridge.webp'],
        ['Dryer repair', '/assets/tech_images/dryer-repair-Northridge.webp'],
        ['Oven repair', '/assets/tech_images/oven-repair-Northridge.webp'],
        ['Dishwasher repair', '/assets/tech_images/dishwasher-repair-Northridge.webp']
      ];
      const techSection = document.createElement('section');
      techSection.className='elementor-element elementor-element-87382e4 e-flex e-con-boxed e-con e-parent e-lazyloaded sma-tech-services';
      techSection.innerHTML=`<div class="sma-wrap"><div class="sma-tech-heading"><h2>Appliance repair for the machines your home relies on</h2><p>Clear diagnostics, honest recommendations, and dependable repairs for the appliances you use every day.</p></div><div class="sma-tech-grid">${techImages.map(([title,src])=>`<div class="sma-tech-card"><div class="sma-tech-card-info"><strong>${title}</strong><p>In-home diagnosis and repair by a trained technician.</p><a class="sma-tech-call" href="tel:+16266358276">Call</a></div><div class="sma-tech-card-visual"><img src="${src}" alt="${title}" loading="lazy"></div></div>`).join('')}</div></div>`;
      hero.after(techSection);
    }
    root.querySelectorAll('a[href]').forEach(link => {
      const href = link.getAttribute('href') || '';
      if (href.startsWith('tel:') || href.startsWith('mailto:')) return;
      link.removeAttribute('href');
      link.setAttribute('aria-disabled', 'true');
      link.style.cursor = 'default';
      link.addEventListener('click', event => event.preventDefault(), { once: true });
    });
    root.querySelectorAll('img').forEach(img => { if (/logo|supermaster/i.test(img.alt||'') || /MYLOGO/.test(img.src)) img.alt='Super Master Appliance logo'; });
  };
  new MutationObserver(mount).observe(document.documentElement,{childList:true,subtree:true});
  setTimeout(mount, 50);
})();
