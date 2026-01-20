/***************
     * INSTRUCCIONES:
     * - Reemplaza la imagen del logo con tu archivo: <img id="logo" src="tu-logo.png">
     * - Cambia los textos, colores (var(--accent)), y enlaces según necesites.
     * - El formulario no envía a servidor (solo simula). Si quieres, te doy el código para conectarlo a email o backend.
     ***************/

    // Smooth scroll for anchor links with data-scroll
    document.querySelectorAll('a[data-scroll]').forEach(a=>{
      a.addEventListener('click', function(e){
        e.preventDefault();
        const href = this.getAttribute('href');
        const el = document.querySelector(href);
        if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
      });
    });

    // Mobile menu toggle (simple)
    const menuBtn = document.getElementById('menuBtn');
    menuBtn.addEventListener('click', ()=>{
      const navList = document.querySelector('nav ul');
      const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', String(!expanded));
      if(navList.style.display === 'flex') navList.style.display = 'none';
      else navList.style.display = 'flex';
      navList.style.flexDirection = 'column';
      navList.style.background = 'rgba(255,255,255,0.96)';
      navList.style.position = 'absolute';
      navList.style.right = '20px';
      navList.style.top = '72px';
      navList.style.padding = '12px';
      navList.style.borderRadius = '12px';
      navList.style.boxShadow = 'var(--shadow)';
    });

    // Carousel logic
    (function(){
      const slides = document.getElementById('slides');
      const prev = document.getElementById('prev');
      const next = document.getElementById('next');
      let index = 0;
      const total = slides.children.length;
      const visible = Math.floor((document.querySelector('.carousel').offsetWidth - 24) / 312) || 1;

      function update(){
        const width = slides.children[0].offsetWidth + 12;
        // clamp index
        index = Math.max(0, Math.min(index, total - visible));
        slides.style.transform = `translateX(${-index * width}px)`;
      }
      prev.addEventListener('click', ()=>{ index--; update(); });
      next.addEventListener('click', ()=>{ index++; update(); });
      window.addEventListener('resize', ()=>{ update(); });
      // init
      update();
    })();

    // Contact form (simulado)
    const form = document.getElementById('contactForm');
    const status = document.getElementById('formStatus');
    const sendBtn = document.getElementById('sendBtn');

    form.addEventListener('submit', function(e){
      e.preventDefault();
      sendBtn.disabled = true;
      status.textContent = 'Enviando...';
      // Simula envío
      setTimeout(()=>{
        sendBtn.disabled = false;
        status.textContent = '¡Mensaje enviado! Te contactaremos pronto.';
        form.reset();
      }, 900);
    });

    // Put current year
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    /***************
     * Funciones útiles (opcionales)
     * - replaceBrand(name, logoSrc): cambia texto del nombre y el logo dinámicamente
     ***************/
    function replaceBrand(name, logoSrc){
      const el = document.getElementById('company-name');
      if(name) el.textContent = name;
      if(logoSrc) document.getElementById('logo').src = logoSrc;
    }

    // Ejemplo de uso (descomenta si quieres cambiar desde JS)
    // replaceBrand('Sanse Capital', 'tu-logo.png');