/**
 * While it's common understanding to never make a god object in programming the script is so small
 * it made more sense for quick reference to build this as a dynamic object creation based on an href eval
 */

var siteCore = (function ($) {
  var _self, // Setting up a shared private var for this object ref
      modalNav = $('.modal'), // Modal activation event
      modal = $('#modal-overlay'), // Black modal overlay 
      modalBox = modal.find('.modal-box'), // Modal box on top of container
      contactForm = modal.find('form'),
      contactText = modal.find('textarea'),
      contactStatus = modal.find('.status'),

      // Index page selectors
      slideCount, slideWidth, slideHeight,
      sliderUlWidth,
      autoSlide,
      siteResourcSect,
      resourceImages;

  return {
    init: function () {
      _self = this;
      _self.observers(); // General site observers

      // default for index page
      awardCards = $('#awards-and-certs');
      siteResourcSect = $('#site-resources');
      resourceImages = $('#site-resources .placard');

      _self.awardsAndCerts(); // awards and certs flipcard
      _self.resourceShowcase(); // bottom section resources
      _self.resourceImgSpin(); // smooth spin animation
      _self.freezeScroll(); // freezes scroll without using CSS
    },
    observers: function () {
      _self.modalOpenClose();
      _self.modalContact();
      $(window).resize(function(event) {
        _self.awardsAndCertsSizing();
      });
    },
    modalOpenClose: function () {
      // Navigation menu click
      modalNav.click(function(e) {
        e.preventDefault();
        if ( $(this).hasClass('proven') ) {
          $('#proven-modal').show();
          $('#contact-me').hide();
        } else {
          $('#proven-modal').hide();
          $('#contact-me').show();
        }
        modal.addClass('active');
      });

      // Modal overlay click to close
      modal.click(function(event) {
        if ( $(this).hasClass('active') ) modal.removeClass('active');
      });
      modalBox.click(function(event) {
        event.stopPropagation();
      });
    },
    modalContact: function () {
      var form = $('#ajax-contact'), // Get the form
          formMsgs = $('#form-messages'); // Get the messages div

      // Set up an event listener for the contact form.
      form.submit(function(event) {
        event.preventDefault(); // Stop the browser from submitting the form
        var formData = form.serialize(); // Serialize the form data

        // Submit the form using AJAX.
        $.ajax({
            type: 'POST',
            url: form.attr('action'),
            data: formData
        }).done(function(response) {
            formMsgs.removeClass('error').addClass('success'); // Make 'success' class
            form.hide();
            formMsgs.text(response); // Set the message text
            $('#email, #message').val(''); // Clear the form
        }).fail(function(data) {
          formMsgs.removeClass('success').addClass('error'); // Make 'error' class
          // Set the message text
          (data.responseText !== '') ?  formMsgs.text(data.responseText) :
                                        formMsgs.text('Oops! An error stopped your message.');
        });
      });
    },
    awardsAndCerts: function () {
      _self.awardsAndCertsSizing();
      _self.autoSlide();
    },
    awardsAndCertsSizing: function () {
      $('#sliderHold, #sliderHold li').css('width',''); // clear inline vals to allow css to give correct val
      slideWidth = $('#sliderHold li').width(); // get init val of li before slide design, val fed from scss partial _card-grid.scss  
      $('#sliderHold').width($('#sliderHold li').length * slideWidth); // made ul wide enough to go past overflow parent container
      $('#sliderHold li').width(slideWidth); // overwrite css % val to prev recorded val
    },
    autoSlide: function () {
      // Sets auto slide interval
      autoSlide = setInterval(function () {
          $('#sliderHold li:eq(0)').animate({
              marginLeft: - slideWidth * 1.2 // Multiplier ex 1.2 affects amount of slides to go past
          }, 'slow', function () {
              $('#sliderHold li:first-child').css('marginLeft','').appendTo('#sliderHold');
          });
      }, 5000);
    },
    resourceShowcase: function () {
      var curScroll; // kept out of click closure so its not recommited to memory each time

      siteResourcSect.click(function () {
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
        if (!$(this).hasClass('spinning') && !siteResourcSect.hasClass('active')) {
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
            if (siteResourcSect.hasClass('active') || siteResourcSect.hasClass('wait') ) e.preventDefault();
          }
      })
    }
  }
})(jQuery);

siteCore.init();