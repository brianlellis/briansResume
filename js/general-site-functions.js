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
      siteResourceSection,
      resourceImages,

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

      /** 
       * PAGE SPECIFIC FUNCTIONS
      **/
      // about
      if (pageURL.indexOf("about") > 0) {
        carouselHolder = $('carouselHolder');

        _self.infiniteCarousel();
      } 
      // learning
      else if (pageURL.indexOf("learning") > 0) {

      } 
      // past projects
      else if (pageURL.indexOf("past-projects") > 0) {
      } 
      // default for index page
      else {
        awardCards = $('#awards-and-certs');
        clientPictures = $('main section.clients');
        siteResourceSection = $('#site-resources');
        resourceImages = $('#site-resources .placard');

        _self.awardsAndCerts(); // awards and certs flipcard
        _self.goToClients(); // goes to clients page for client grid
        _self.resourceShowcase(); // bottom section resources
        _self.resourceImgSpin(); // smooth spin animation
        _self.freezeScroll(); // freezes scroll without using CSS

        $(window).resize(function(event) {
          _self.awardsAndCertsSizing();
        });
      }
    },
    observers: function () {
      _self.modalOpenClose();
      _self.modalNavWatch();
    },
    modalOpenClose: function () {
      // Navigation menu click
      mainNav.click(function(event) {
        modal.addClass('active');

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
          modal.removeClass('active');
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
      _self.awardsAndCertsSizing();
      _self.autoSlide();

      $('.control_next').click(function (e) {
        e.preventDefault();
        _self.sliderMoveRight();

        // FIXME: This is a sloppy method for auto starting the auto slider again and needs more logic        
        autoSlideStopped = true;
      });
    },
    awardsAndCertsSizing: function () {
      $('#sliderHold, #sliderHold li').css('width',''); // clear inline vals to allow css to give correct val
      slideWidth = $('#sliderHold li').width(); // get initial value of li before slide design, val fed from scss partial _card-grid.scss
      
      $('#sliderHold').width($('#sliderHold li').length * slideWidth); // made ul wide enough to go past overflow parent container
      $('#sliderHold li').width(slideWidth); // overwrite css % val to prev recorded val
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
    },
    resourceShowcase: function () {
      var curScroll; // kept out of click closure so its not recommited to memory each time

      siteResourceSection.click(function () {
        if (! $(this).hasClass('active') && ! $(this).hasClass('wait') ) {

          curScroll = $(document).scrollTop(); // get cur scroll val

          // smooth animation to cover screen
          $('html, body').animate({
             scrollTop: $(this).find('.placard').offset().top
          }, 1500);

          // class additions to animate elements
          $(this).addClass('active wait'); // #site-resources
          _self.waiter($(this), 'wait', 800); // #site-resources
          $('.showcaseMessage').show(); // #site-resources h2
          _self.waiter($('.showcaseMessage'), 'animate', 1000, 'add'); // #site-resources h2
          resourceImages.addClass('animate'); // #site-resources .placard
          $('footer').addClass('animate'); // footer

        } else if ($(this).hasClass('active') && !$(this).hasClass('wait') ) { 
          // smooth animation to uncover screen
          $('html, body').animate({
             scrollTop: curScroll - 60
          }, 1000);

          // class removals to animate elements
          $(this).removeClass('active').addClass('wait'); // #site-resources
           _self.waiter($(this), 'wait', 1000); // #site-resources
           resourceImages.removeClass('animate'); // #site-resources .placard
           $('.showcaseMessage').removeClass('animate').hide(); // #site-resources h2
           $('footer').removeClass('animate'); // footer
        }
      });
    },
    resourceImgSpin: function () {
      resourceImages.hover(function() {
        if (!$(this).hasClass('spinning') && !siteResourceSection.hasClass('active')) {
          $(this).addClass('spinning');
          _self.waiter($(this), 'spinning', 1000);
        } 
      });
    },
    waiter: function (ele, selector, time, action) {
      if (action === 'add') {
        setTimeout(function () {
          ele.addClass(selector);
        }, time);
      } else {
        setTimeout(function () {
          ele.removeClass(selector);
        }, time);
      }
    },
    freezeScroll: function () {
      $('body').on({
          'mousewheel': function(e) {
            if (siteResourceSection.hasClass('active') || siteResourceSection.hasClass('wait') ) {
              e.preventDefault();
              e.stopPropagation();
            }
          }
      })
    }
    /**
      * about page functions
    **/
  }
})(jQuery);

siteCore.init();