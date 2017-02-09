var siteCore = siteCore || {}; // Check if object is present first

siteCore.modal = (function ($) {
  var _self, // Setting up a shared private var for this object ref
      mainNav = $('body > nav .modal'), // Website top nav
      modal = $('#modal-overlay'), // Black modal overlay 
      modalBox = $('#modal-overlay .modal-box'), // Modal box on top of container
      contactSect = $('#contact-me'), // modal box contact section
      resumeSect = $('#my-resume');  // modal box resume section

  return {
    init: function () {
      _self = this;

      _self.observers();
    },
    observers: function () {
      _self.modalOpenClose();
      _self.modalNavWatch();
    },
    modalOpenClose: function () {
      // Navigation menu click
      mainNav.click(function(event) {
        modal.css('top', 0).addClass('active');

        if ($(this).hasClass('resume')) { 
          $('#modal-overlay .resume').addClass('active');
          resumeSect.show();
        } else {
          $('#modal-overlay .contact').addClass('active');
          contactSect.show();
        }
      });

      // Modal overlay click to close
      $('#modal-overlay').click(function(event) {
        if ($(this).hasClass('active')) {
          $(this).css('top', '-100%');
          $('#modal-overlay .active').removeClass('active');
          contactSect.hide();
          resumeSect.hide();
        }
      });
    },
    modalNavWatch: function () {
      var modalNav = $('#modal-overlay nav li');
      modalBox.click(function(event) {
        event.stopPropagation();
      });
      modalNav.click(function(event) {
        if (! $(this).hasClass('active')) {
          $('#modal-overlay .active').removeClass('active');
          $(this).addClass('active');

          if ($('#modal-overlay .active').hasClass('resume')) {
            contactSect.hide();
            resumeSect.show();
          } else {
            contactSect.show();
            resumeSect.hide();
          }
        }
      });
    }
  }
})(jQuery);

siteCore.modal.init();