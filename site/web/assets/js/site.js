(function () {
  var toggle = document.querySelector('[data-nav-toggle]');
  var menu = document.querySelector('[data-nav-menu]');

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      menu.classList.toggle('is-open');
      var expanded = menu.classList.contains('is-open');
      toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    });
  }

  var zoomableImages = document.querySelectorAll('[data-zoomable]');
  if (!zoomableImages.length) {
    return;
  }

  var lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.setAttribute('aria-hidden', 'true');
  lightbox.innerHTML = '<div class="lightbox-dialog" role="dialog" aria-modal="true" aria-label="Visualização ampliada da imagem"><button class="lightbox-close" type="button" aria-label="Fechar">×</button><img src="" alt=""></div>';
  document.body.appendChild(lightbox);

  var lightboxImage = lightbox.querySelector('img');
  var closeBtn = lightbox.querySelector('.lightbox-close');

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }

  zoomableImages.forEach(function (image) {
    image.addEventListener('click', function () {
      lightboxImage.src = image.src;
      lightboxImage.alt = image.alt;
      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
    });
  });

  closeBtn.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', function (event) {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && lightbox.classList.contains('is-open')) {
      closeLightbox();
    }
  });
})();
