(function (jQuery, window, document, undefined) {
  'use strict';

  var html = $('html'),
      utilities,
      htmlBody = $('html, body'),
      body = html.find('body'),
      isTouchDevice = /MSIE 10.*Touch/.test(navigator.userAgent) || ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;

  utilities = (function utils() {

    // Add Class utility function
    function addClass (config) {
      if (config.selector) {
        var collection = $(config.selector),
            eventByDefault = isTouchDevice ? 'touchstart' : 'click',
            eventToBind = config.eventName || eventByDefault,
            classNameToAdd = config.classNameToAdd || 'active';

        collection.on(eventToBind, function (e) {
          if (eventToBind === 'click' || eventToBind === 'touchstart') {
            e.preventDefault();
          }

          if (config.removeOnOutsideClick) {
            e.stopPropagation();
          }
          var currentElement = config.parentToAddSelector ? $(this).closest(config.parentToAddSelector) : $(this);

          if (currentElement.hasClass(classNameToAdd)) {
            currentElement.removeClass(classNameToAdd);
          } else {
            currentElement.addClass(classNameToAdd);
          }
        });

        if (config.removeOnOutsideClick) {
          html.on(eventToBind, function (event) {
            if (collection.closest(config.parentToAddSelector)[0] != event.target && !collection.closest(config.parentToAddSelector).has(event.target).length) {
              collection.closest(config.parentToAddSelector).removeClass(classNameToAdd);
            }
          });
        }
      } else {
        console.log('You need to specify a selector for add class utility method');
      }
    }

    function scrollToSection (config) {
      var collection = $(config.scrollTo),
          heightToExclude = 0;

      if (config.elementsToExclude) {
        $(config.elementsToExclude).each(function () {
          heightToExclude += parseInt($(this).outerHeight(true), 10);
        });
      }

      collection.on('click', function (e) {
        var currentElement = $(this).data('scroll-to'),
            elementWhoseHeightSubtract = body.find('[data-height-to-exclude]'),
            elementWithNegativeIndent = body.find('[data-negative-indent-to-top]'),
            heightToExclude = 0,
            negativeIndentForScrollValue = 0;
        if(elementWithNegativeIndent.length) {
          negativeIndentForScrollValue = elementWithNegativeIndent.data('negative-indent-to-top');
        }
        if (elementWhoseHeightSubtract.length) {
          heightToExclude = elementWhoseHeightSubtract.innerHeight();
        }
        e.preventDefault();

        htmlBody.animate({
          'scrollTop' : body.find('[data-scroll-section="' + currentElement + '"]').offset().top - heightToExclude - negativeIndentForScrollValue
        }, 500);
      });
    }

    function dataRequest(config) {
      var dataHolder = body.find('[data-parent-box]');
      $.ajax({
        type: config.typeRequest,
        url: config.url,
        dataType: config.dataType,
        success: function(data){
          dataHolder.append(data);
        },
        error: function(textStatus){
          console.log(textStatus);
        }
      });
    }

    return {
      addClass: addClass,
      scrollToSection: scrollToSection,
      dataRequest: dataRequest
    };
  }());

  window.utilities = utilities;
})(jQuery, window, window.document);