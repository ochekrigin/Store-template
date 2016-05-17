;(function ($, window, document, undefined) {
  'use strict';

  var win = $(window),
      body = $('body'),
      btnRequest = body.find('[data-request-link]'),
      isTouchDevice = /MSIE 10.*Touch/.test(navigator.userAgent) || ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;

  // initialization of jquery placeholder
  if (typeof $ === 'function' && typeof $.fn.placeholder === 'function') {
    var formItems = body.find('input, textarea');
    if (formItems.length) {
      formItems.placeholder();
    }
  }

  // initialization of jquery addClass function
  if (typeof $ === 'function' && typeof window.utilities === 'object' && typeof window.utilities.addClass === 'function') {
    window.utilities.addClass({
      selector: '[data-add-class]',
      parentToAddSelector: '[data-add-class-parent]',
      removeOnOutsideClick: true
    });
    window.utilities.addClass({
      selector: '[data-nav-opener]',
      parentToAddSelector: '[data-add-class-parent]',
      removeOnOutsideClick: true,
      classNameToAdd: 'open'
    });
    window.utilities.addClass({
      selector: '[data-slider-opener]',
      parentToAddSelector: '[data-add-class-parent]',
      removeOnOutsideClick: true,
      classNameToAdd: 'open'
    });
    window.utilities.addClass({
      selector: '[data-inner-slider-opener]',
      parentToAddSelector: '[data-add-class-parent]',
      removeOnOutsideClick: true,
      classNameToAdd: 'collapse-open'
    });
  }

  // initialization of jquery request function
  if (typeof $ === 'function' && typeof window.utilities === 'object' && typeof window.utilities.dataRequest === 'function') {
    btnRequest.on('click', function (e) {
      e.preventDefault();

      var curLink = $(this),
          curUrl = curLink.data('url');

      window.utilities.dataRequest({
        typeRequest: 'GET',
        url: curUrl,
        dataType: 'html'
      });
    });
  }

  // initialization of jquery gallery
  if (typeof $.fn.fadeGallery === 'function') {
    var gallery = body.find('.gallery');
    if (gallery.length) {
      gallery.fadeGallery({
        useSwipe: true,
        slides: '.slideset > li',
        switchSimultaneously: true,
        disableWhileAnimating: false,
        autoRotation: false,
        autoHeight: true,
        switchTime: 2000,
        animSpeed: 600
      });
    }
  }

  // initialization of plugins depending on window events
  win.on({
    'load': function () {
      // initialization jquery scrollToSection function
      if (typeof $ === 'function' && typeof window.utilities === 'object' && typeof window.utilities.scrollToSection === 'function') {
        window.utilities.scrollToSection({
          scrollTo: '[data-scroll-to]'
        });
      }
    }
  });

  // adding respective classes to desktop devices
  if (!isTouchDevice) {
    body.addClass('is-desktop');
  }

  // initialization of fancybox
  if (typeof $.fn.fancybox === 'function') {
    var lightbox = body.find('.fancybox');
    if (lightbox.length) {
      lightbox.fancybox({
        openEffect  : 'none',
        closeEffect : 'none',
        maxWidth: 2000,
        autoSize: true,
        autoHeight: true,
        autoWidth: true
      });
    }
  }

}(jQuery, window, window.document));
