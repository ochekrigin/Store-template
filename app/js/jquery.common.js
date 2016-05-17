;(function ($, window, document, undefined) {
  'use strict';

  var body = $('body'),
      dataLink = body.find('[data-link]');

  function showHiddenCollection (item) {
     item.each(function () {
        var cur = $(this),
            curItem = cur.find('input[type="checkbox"]');
        if (curItem.prop('checked') !== true) {
          cur.hide();
        }
     });
  }

  dataLink.on('click', function (e) {
    var curLink = $(this),
        curParentBox = curLink.closest('[data-items-box]'),
        itemCollection = curParentBox.find('[data-item]'),
        isHidden = 'is-hidden';
    if (itemCollection.is(':hidden')) {
      itemCollection.removeClass(isHidden);
      itemCollection.show();
      curLink.addClass('opened');
    } else {
      showHiddenCollection(itemCollection);
      curLink.removeClass('opened');
    }
    e.preventDefault();
  });

}(jQuery, window, window.document));