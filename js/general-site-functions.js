var siteCore = (function ($) {
  var _self, // Setting up a shared private var for this object ref
      pageURL = window.location.href, // Get current page's url
      mainNav = $('body > nav .modal'), // Website top nav
      modal = $('#modal-overlay'), // Black modal overlay 
      modalBox = $('#modal-overlay .modal-box'), // Modal box on top of container
      contactSect = $('#contact-me'), // modal box contact section
      resumeSect = $('#my-resume'),  // modal box resume section

      // Index page selectors
      clientPictures,
      slideCount, 
      slideWidth, 
      slideHeight,
      sliderUlWidth,
      autoSlide,
      autoSlideStopped,

      // Projects page selectors
      a,

      // About page selectors
      b,

      // Learning page selectors
      c;

  return {
    init: function () {
      _self = this;

      _self.observers(); // General site observers

      // PAGE SPECCIFIC FUNCTIONS
      if (pageURL.indexOf("about") > 0) {

      } else if (pageURL.indexOf("learning") > 0) {

      } else if (pageURL.indexOf("past-projects") > 0) {
        _self.clientGrid();
      } 
      // default for index page
      else {
        awardCards = $('#awards-and-certs');
        clientPictures = $('main section.clients');

        _self.awardsAndCerts(); // awards and certs flipcard
        _self.goToClients(); // goes to clients page for client grid
      }
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
    },
    /**
      * index page functions
    **/
    awardsAndCerts: function () {
      slideWidth = $('#sliderHold li').width();
      
      $('#sliderHold').width(6 * slideWidth);
      $('#sliderHold li').width(slideWidth);
      $('#awards-and-certs').width(4.25 * slideWidth);

      _self.autoSlide();

      $('.control_next').click(function (e) {
        e.preventDefault();
        _self.sliderMoveRight();

        // FIXME: This is a sloppy method for auto starting the auto slider again and needs more logic        
        autoSlideStopped = true;
      });
    },
    autoSlide: function () {
      // Sets auto slide interval
      autoSlide = setInterval(function () {
        if (! autoSlideStopped) {
          $('#sliderHold li:eq(0)').animate({
              marginLeft: - slideWidth * 1.2 // Multiplier ex 1.2 affects amount of slides to go past
          }, 'slow', function () {
              $('#sliderHold li:first-child').css('marginLeft','').appendTo('#sliderHold');
          });
        } else {
          setTimeout(function () {
            autoSlideStopped = false;
          }, 10000);
        }
      }, 5000);
    },
    sliderMoveRight: function() {
      $('#sliderHold li:eq(0)').animate({
          marginLeft: - slideWidth * 1.2 // Multiplier ex 1.2 affects amount of slides to go past
      }, 'slow', function () {
          $('#sliderHold li:first-child').css('marginLeft','').appendTo('#sliderHold');
      });
    },
    goToClients: function () {
      clientPictures.click(function(event) {
        window.location.href = "past-projects.html";
      });
    }
    /**
      * about page functions
    **/
  }
})(jQuery);

siteCore.init();