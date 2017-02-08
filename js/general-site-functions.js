var siteCore = siteCore || {}; // Check if object is present first

siteCore.modal = (function ($) {
  var _self; // Setting up a shared private var

  return {
    init: function () {
      _self = this;

      _self.observers();
    },
    observers: function () {
      var mainNav = $('body > nav .modal'),
          modal = $('#modal-overlay');
      // Navigation menu click
      mainNav.click(function(event) {
        modal.css('top', 0).addClass('active');

        $(this).hasClass('resume') ? $('#modal-overlay .resume').addClass('active') : $('#modal-overlay .contact').addClass('active');
      });

      // Modal overlay click to close
      $('#modal-overlay').click(function(event) {
        if ($(this).hasClass('active')) {
          $(this).css('top', '-100%');
          $('#modal-overlay .active').removeClass('active');
        }
      });
    }
  }
})(jQuery);

siteCore.modal.init();