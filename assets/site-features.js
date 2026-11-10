(() => {
  const areas = ['Naperville','Hinsdale','Oak Brook','Oakbrook Terrace','Burr Ridge','Western Springs','Clarendon Hills','La Grange','La Grange Park','Downers Grove','Wheaton','Glen Ellyn','Elmhurst','Lombard','Westmont','Lisle','Woodridge','Darien','Willowbrook','Lemont','Bolingbrook','Aurora','Plainfield','Oswego','Warrenville','Winfield','Villa Park','Indian Head Park'];
  const brands = ['Sub-Zero','Thermador','Wolf','Bosch','Bertazzoni','Miele','KitchenAid','Electrolux','GE','Jenn-Air','Maytag','Whirlpool','Speed Queen','LG','Samsung','Frigidaire'];
  const style = document.createElement('style');
  style.textContent = `.supermaster-nav,.supermaster-nav-mobile-panel,.supermaster-btn--accent{display:none!important}.sma-brands{padding:80px 20px;background:#fff;color:#12233f}.sma-wrap{max-width:1100px;margin:0 auto}.sma-brands h2,.sma-areas h2{font:700 30px 'Space Grotesk',sans-serif;margin:0 0 12px}.sma-brands p,.sma-areas p{font-size:16px;margin:0 0 24px;color:rgba(18,35,63,.72)}.sma-badges{display:flex;flex-wrap:wrap;gap:12px}.sma-badge{background:#f2f6fb;border-radius:16px;padding:12px 16px;font-weight:700;color:#132c54}.sma-areas{padding:80px 20px;background:#f2f6fb;color:#12233f}.sma-areas h3{font:700 22px 'Space Grotesk',sans-serif;margin:28px 0 16px}.sma-area-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px 18px;font-size:16px}@media(max-width:900px){.sma-area-grid{grid-template-columns:repeat(3,1fr)}}@media(max-width:600px){.sma-area-grid{grid-template-columns:repeat(2,1fr)}.sma-brands,.sma-areas{padding:56px 20px}.sma-brands h2,.sma-areas h2{font-size:27px}}`;
  document.head.appendChild(style);
  const mount = () => {
    const root = document.getElementById('root'); if (!root || root.dataset.smaReady) return;
    root.dataset.smaReady = '1';
    const footer = root.querySelector('footer');
    const areasSection = document.createElement('section'); areasSection.className='sma-areas'; areasSection.innerHTML=`<div class="sma-wrap"><h2>Appliance Repair in Naperville and Surrounding Areas</h2><p>Super Master Appliance provides reliable in-home appliance repair services throughout Naperville and the western suburbs of Chicago.</p><h3>Our Service Areas Include:</h3><div class="sma-area-grid">${areas.map(x=>`<span>${x}</span>`).join('')}</div></div>`;
    const brandsSection = document.createElement('section'); brandsSection.className='sma-brands'; brandsSection.innerHTML=`<div class="sma-wrap"><h2>We repair all major brands</h2><p>Professional in-home service for leading appliance manufacturers.</p><div class="sma-badges">${brands.map(x=>`<span class="sma-badge">${x}</span>`).join('')}</div></div>`;
    const services = root.querySelector('#services');
    if (services) services.after(brandsSection); else root.prepend(brandsSection);
    if (footer) footer.before(areasSection); else root.append(areasSection);
    root.querySelectorAll('img').forEach(img => { if (/logo|supermaster/i.test(img.alt||'') || /MYLOGO/.test(img.src)) img.alt='Super Master Appliance logo'; });
  };
  new MutationObserver(mount).observe(document.documentElement,{childList:true,subtree:true});
  setTimeout(mount, 50);
})();
