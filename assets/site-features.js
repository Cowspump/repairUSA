(() => {
  const style = document.createElement('style');
  style.textContent = `.supermaster-nav,.supermaster-nav-mobile-panel{display:none!important}.why-supermaster-photo{display:none!important}.sma-wrap{max-width:1100px;margin:0 auto}.sma-tech-services{padding:88px 20px;background:#f2f6fb;color:#12233f}.sma-tech-heading{display:flex;align-items:end;justify-content:space-between;gap:28px;margin-bottom:32px}.sma-tech-heading h2{font:700 clamp(32px,4vw,48px)/1.05 'Space Grotesk',sans-serif;letter-spacing:-.04em;margin:0;max-width:580px}.sma-tech-heading p{font-size:16px;line-height:1.55;color:rgba(18,35,63,.72);max-width:360px;margin:0}.sma-tech-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:18px}.sma-tech-card{position:relative;display:flex;align-items:center;justify-content:space-between;gap:24px;min-width:0;min-height:290px;padding:28px;background:#fff;border:1px solid rgba(18,35,63,.16);border-radius:24px;overflow:hidden;color:#12233f;transition:transform .25s ease,box-shadow .25s ease}.sma-tech-card:hover{transform:translateY(-4px);box-shadow:0 14px 28px rgba(18,35,63,.14)}.sma-tech-card-info{position:relative;z-index:2;display:flex;flex:1;min-width:0;flex-direction:column;align-items:flex-start}.sma-tech-card-info strong{font:700 clamp(22px,2.4vw,30px)/1.05 'Space Grotesk',sans-serif;letter-spacing:-.03em}.sma-tech-card-info p{max-width:260px;margin:12px 0 22px;color:rgba(18,35,63,.68);font-size:14px;line-height:1.5}.sma-tech-card-visual{position:relative;z-index:1;display:grid;flex:0 0 190px;place-items:center;width:190px;height:190px;perspective:700px}.sma-tech-card-visual:before,.sma-tech-card-visual:after{position:absolute;inset:10px;border-radius:28px;background:rgba(18,35,63,.08);content:'';transition:transform .35s ease}.sma-tech-card-visual:before{transform:translate(12px,12px) rotate(5deg)}.sma-tech-card-visual:after{transform:translate(6px,6px) rotate(2deg);background:rgba(17,115,193,.12)}.sma-tech-card:hover .sma-tech-card-visual:before{transform:translate(18px,16px) rotate(8deg)}.sma-tech-card:hover .sma-tech-card-visual:after{transform:translate(9px,8px) rotate(4deg)}.sma-tech-card img{position:relative;z-index:2;display:block;width:190px;height:190px;object-fit:contain;border-radius:28px;background:#f2f6fb;padding:14px;transition:transform .35s ease}.sma-tech-card:hover img{transform:translateZ(18px) rotateY(-8deg) rotateX(5deg) scale(1.04)}.sma-tech-call{display:inline-flex;align-items:center;justify-content:center;padding:11px 16px;border-radius:10px;background:#1173c1;color:#fff;font-size:14px;font-weight:700;line-height:1;text-decoration:none;white-space:nowrap;transition:background .2s ease,transform .2s ease}.sma-tech-call:hover{background:#0d5f9f;transform:translateY(-1px)}.sma-areas{padding:80px 20px;background:#f2f6fb;color:#12233f}.sma-areas h2{font:700 30px 'Space Grotesk',sans-serif;margin:0 0 12px}.sma-areas p{font-size:16px;margin:0 0 24px;color:rgba(18,35,63,.72)}.sma-areas h3{font:700 22px 'Space Grotesk',sans-serif;margin:28px 0 16px}.sma-area-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px 18px;font-size:16px}@media(min-width:640px) and (max-width:1023px){.sma-tech-grid{grid-template-columns:1fr}.sma-tech-card{min-height:250px}.sma-tech-card-visual{flex-basis:170px;width:170px;height:170px}.sma-tech-card img{width:170px;height:170px}}@media(max-width:639px){html,body{padding-bottom:0!important}.sma-tech-services{padding:60px 20px}.sma-tech-heading{display:block}.sma-tech-heading p{margin-top:16px}.sma-tech-grid{display:grid!important;grid-template-columns:1fr!important}.sma-tech-card{display:flex!important;flex-direction:row!important;align-items:center!important;gap:12px!important;min-height:220px!important;padding:18px!important}.sma-tech-card-info strong{font-size:20px}.sma-tech-card-info p{margin:9px 0 16px;font-size:13px}.sma-tech-card-visual{flex-basis:132px;width:132px;height:132px}.sma-tech-card-visual:before,.sma-tech-card-visual:after{inset:4px}.sma-tech-card img{width:132px!important;height:132px!important;padding:9px!important;border-radius:20px}.sma-tech-call{padding:9px 12px;font-size:13px}}`;
  document.head.appendChild(style);
  const testimonialStyle = document.createElement('style');
  testimonialStyle.textContent = `
    .sma-testimonial-carousel{padding:88px 20px;background:#f2f6fb;color:#12233f}
    .sma-testimonial-wrap{max-width:1050px;margin:0 auto}
    .sma-testimonial-heading{font:700 clamp(32px,4vw,48px)/1.05 'Space Grotesk',sans-serif;letter-spacing:-.04em;margin:0 0 32px}
    .sma-testimonial-stage{display:grid;grid-template-columns:minmax(280px,470px) minmax(300px,1fr);align-items:center}
    .sma-testimonial-photo{height:470px;border-radius:24px;overflow:hidden;background:#dde5ed}
    .sma-testimonial-photo img{display:block;width:100%;height:100%;object-fit:cover;transition:opacity .35s ease}
    .sma-testimonial-card{position:relative;z-index:2;margin-left:-80px;padding:36px 40px;background:#fff;border-radius:24px;box-shadow:0 18px 50px rgba(18,35,63,.16)}
    .sma-testimonial-card h3{margin:0 0 8px;font:700 26px 'Space Grotesk',sans-serif}
    .sma-testimonial-card .title{margin:0 0 18px;color:#617087;font-size:14px;font-weight:700}
    .sma-testimonial-card .description{margin:0;color:#12233f;font-size:16px;line-height:1.7}
    .sma-testimonial-nav{display:flex;align-items:center;justify-content:center;gap:18px;margin-top:28px}
    .sma-testimonial-nav button{width:46px;height:46px;border:1px solid rgba(18,35,63,.16);border-radius:50%;background:#fff;color:#12233f;font-size:24px;line-height:1;cursor:pointer;transition:.2s ease}
    .sma-testimonial-nav button:hover{background:#1173c1;border-color:#1173c1;color:#fff}
    .sma-testimonial-dots{display:flex;gap:8px}
    .sma-testimonial-dots button{width:10px;height:10px;padding:0;border:0;border-radius:50%;background:#9aa8b8;cursor:pointer}
    .sma-testimonial-dots button.active{background:#1173c1}
    @media(max-width:767px){
      .sma-testimonial-carousel{padding:64px 20px}
      .sma-testimonial-stage{display:block}
      .sma-testimonial-photo{width:100%;height:auto;aspect-ratio:1;border-radius:20px}
      .sma-testimonial-card{margin:-20px 12px 0;padding:28px 24px 24px;box-shadow:0 14px 36px rgba(18,35,63,.13)}
      .sma-testimonial-card h3{font-size:22px}
      .sma-testimonial-card .description{font-size:15px}
    }
  `;
  document.head.appendChild(testimonialStyle);
  const heroResponsiveStyle = document.createElement('style');
  heroResponsiveStyle.textContent = `
    @media (max-width: 639px) {
      #main-1,
      .hero,
      section[class*="hero"] {
        min-height: 680px;
      }
      .hero-background {
        width: 100% !important;
        height: 100% !important;
        object-fit: cover !important;
        object-position: 50% 28% !important;
      }
    }
  `;
  document.head.appendChild(heroResponsiveStyle);
  const mount = () => {
    const root = document.getElementById('root'); if (!root) return;
    const hero = root.querySelector('#main-1'); if (!hero) return;
    const heroBackground = hero.querySelector('.hero-background');
    if (heroBackground) {
      if (window.innerWidth < 640) {
        heroBackground.src = '/assets/MOBILEBACKGROUND.webp?v=20261118-2';
        heroBackground.removeAttribute('srcset');
        heroBackground.style.objectPosition = '50% 50%';
      } else {
        heroBackground.src = '/assets/MOBILEBACKGROUND.webp?v=20261118-2';
        heroBackground.srcset = '/assets/MOBILEBACKGROUND.webp?v=20261118-2 900w, /assets/hero-team2.webp?v=20261118-2 1920w';
        heroBackground.sizes = '100vw';
        heroBackground.style.objectPosition = '50% 40%';
      }
    }
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
    if (!root.querySelector('.sma-testimonial-carousel')) {
      const testimonials = [
        {
          name: 'Nathan P.',
          title: 'Appliance repair customer - April 24, 2024',
          description: 'GE oven and microwave, back in place after being removed for repairs.',
          image: '/assets/photos/1/pech.png'
        },
        {
          name: 'Elmhurst, IL homeowner',
          title: 'Dryer vent cleaning',
          description: 'Dryer vent cleaning in Elmhurst, IL. Bird nest blockage caused poor airflow, longer drying times, and fire hazard.',
          image: '/assets/photos/2/second.jpg'
        },
        {
          name: 'Super Master Appliance',
          title: 'Oven repair - August 20, 2024',
          description: 'Oven repair.',
          image: '/assets/photos/3/third.png'
        },
        {
          name: 'Super Master Appliance',
          title: 'LG washer repair - August 21, 2024',
          description: 'LG washer repair.',
          image: '/assets/photos/4/four.png'
        }
      ];
      const carousel = document.createElement('section');
      carousel.className = 'sma-testimonial-carousel';
      carousel.innerHTML = `
        <div class="sma-testimonial-wrap">
          <h2 class="sma-testimonial-heading">Recent repair stories</h2>
          <div class="sma-testimonial-stage">
            <div class="sma-testimonial-photo"><img src="${testimonials[0].image}" alt="${testimonials[0].name}" draggable="false"></div>
            <article class="sma-testimonial-card">
              <h3>${testimonials[0].name}</h3>
              <p class="title">${testimonials[0].title}</p>
              <p class="description">${testimonials[0].description}</p>
            </article>
          </div>
          <div class="sma-testimonial-nav" aria-label="Repair story navigation">
            <button type="button" class="previous" aria-label="Previous repair story">&#8249;</button>
            <div class="sma-testimonial-dots">${testimonials.map((item, index) => `<button type="button" class="${index === 0 ? 'active' : ''}" aria-label="Go to repair story ${index + 1}"></button>`).join('')}</div>
            <button type="button" class="next" aria-label="Next repair story">&#8250;</button>
          </div>
        </div>
      `;

      let currentIndex = 0;
      const photo = carousel.querySelector('.sma-testimonial-photo img');
      const card = carousel.querySelector('.sma-testimonial-card');
      const dots = Array.from(carousel.querySelectorAll('.sma-testimonial-dots button'));
      const render = (index) => {
        currentIndex = (index + testimonials.length) % testimonials.length;
        const item = testimonials[currentIndex];
        photo.style.opacity = '0';
        window.setTimeout(() => {
          photo.src = item.image;
          photo.alt = item.name;
          card.querySelector('h3').textContent = item.name;
          card.querySelector('.title').textContent = item.title;
          card.querySelector('.description').textContent = item.description;
          photo.style.opacity = '1';
        }, 180);
        dots.forEach((dot, dotIndex) => dot.classList.toggle('active', dotIndex === currentIndex));
      };
      carousel.querySelector('.previous').addEventListener('click', () => render(currentIndex - 1));
      carousel.querySelector('.next').addEventListener('click', () => render(currentIndex + 1));
      dots.forEach((dot, index) => dot.addEventListener('click', () => render(index)));

      const areasSection = Array.from(root.querySelectorAll('section')).find(section =>
        section.textContent && section.textContent.includes('Areas We Serve')
      );
      if (areasSection) areasSection.after(carousel);
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
  let mountScheduled = false;
  const scheduleMount = () => {
    if (mountScheduled) return;
    mountScheduled = true;
    requestAnimationFrame(() => {
      mountScheduled = false;
      mount();
    });
  };
  new MutationObserver(scheduleMount).observe(document.documentElement,{childList:true,subtree:true});
  window.addEventListener('resize', scheduleMount);
  setTimeout(scheduleMount, 50);
})();
