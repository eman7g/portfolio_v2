/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 *
 * Only fires on body classes that match. If a body class contains a dash,
 * replace the dash with an underscore when adding it to the object below.
 *
 * .noConflict()
 * The routing is enclosed within an anonymous function so that you can 
 * always reference jQuery with $, even when in .noConflict() mode.
 *
 * Google CDN, Latest jQuery
 * To use the default WordPress version of jQuery, go to lib/config.php and
 * remove or comment out: add_theme_support('jquery-cdn');
 * ======================================================================== */

(function($) {

// Use this variable to set up the common and page specific functions. If you 
// rename this variable, you will also need to rename the namespace below.
var Roots = {
  // All pages
  common: {
    init: function() {
      // JavaScript to be fired on all pages

      //variables
      var navigation_links = $(".navbar-nav a");
      var homeSlides = $('.homeSlide');

      function scrollToSlide(slideId){
        var htmlbody = $('html,body');
        // Custom slide content offset
        var customSlideOffset = $(slideId).attr('data-content-offset');
        
        // Scroll to the top of a container if it doesn't have custom offset defined
        if(typeof customSlideOffset === 'undefined'){
          htmlbody.animate({scrollTop: ($(slideId).offset().top) + 'px'},600);
        } else {
            var customSlideOffsetnew = parseInt(customSlideOffset, null);
            htmlbody.animate({scrollTop: ($(slideId).offset().top + customSlideOffsetnew) + 'px'},600);
        }
      }
      
      $(window).on('scroll', function () {
        if ($(window).width() > 767) {

          // Highlight current section while scrolling DOWN
          homeSlides.waypoint(function(direction) {
            if (direction === 'down') {
              var activedown = $(this);
              //$activeSlide.text(index);
              //console.log(activedown.attr('id'));
              var active_link = $('nav a[href="#' + activedown.attr("id") + '"]');
              navigation_links.parent().removeClass("active");
              active_link.parent().addClass("active");
            }
          }, { offset: '25%' });

          // Highlight current section while scrolling UP
          homeSlides.waypoint(function(direction) {
            if (direction === 'up') {
              var activeup = $(this);
              //console.log(activeup.attr('id'));
              var active_link = $('nav a[href="#' + activeup.attr("id") + '"]');
              navigation_links.parent().removeClass("active");
              active_link.parent().addClass("active");
            }
          }, {
            offset: function() {
              // This is the calculation that would give you
              // "bottom of element hits middle of window"
              return $.waypoints('viewportHeight') / 2 - $(this).outerHeight();
            }
          });
        }
      });

      navigation_links.click(function (e) {
          e.preventDefault();
          scrollToSlide($(this).attr('href'));
      });

      $(window).scroll(function() {
        var $activateMenu = $(window).height() - 100;
        //console.log($(this).scrollTop());
        //console.log($activateMenu);
        if ( $(this).scrollTop() > $activateMenu ) {
          $('header.transparent').addClass('white');
        }
        else {
          $('header.transparent').removeClass('white');
        }
      });

      $(window).load(function() {

        var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
        
        if( isSafari ) {
          $('.parallax').addClass('safari');
        }

      });
    }
  },
  // Home page
  home: {
    init: function() {
      // JavaScript to be fired on the home page

      $(window).load(function(){
        
        function showpanel() {
          $('.spinner').fadeOut(150);
          $('#loader').slideToggle( 500 );
          $("body").removeClass("preload");
          $(".hero-unit").addClass("animate");
        }
        setTimeout(showpanel, 1000);

      });

      // Sections height & scrolling
      $(window).resize(function() {
          var sH = $(window).height();
          $('#home, #home .container, .background-overlay').css('height', sH + 'px');
      });


      $(window).on('scroll', function () {
        if ($(window).width() > 767) {
          var speed = 8.0;
          document.getElementById("home-bg").style.backgroundPosition = (-window.pageXOffset / speed) + "px " + (-window.pageYOffset / speed) + "px";
        }
      });

      $(window).resize().scroll();

      $(window).load(function() {
          $('html').addClass('loaded');
          $(window).resize().scroll();
      });

      /*var s = skrollr.init({
        forceHeight: false,
        render: function(data) {
            //Debugging - Log the current scroll position.
            //console.log(data.curTop);
        }

      });*/

      /*if ($(window).width() > 767) {
          skrollr.init({
            forceHeight: false,
            render: function(data) {
            //Debugging - Log the current scroll position.
            //console.log(data.curTop);
          }

      });
      }*/

      // disable skrollr if the window is resized below 768px wide
      $(window).on('resize', function () {
        if ($(window).width() <= 767) {
          console.log('destroy');
          //skrollr.init().destroy(); // skrollr.init() returns the singleton created above
        }
      });


      var container = $('#portfolio-list');
      var windowWidth = $(window).width();

      /* Portfolio
      -------------------------*/
      var portfolio = $('#portfolio-list');
      
      // Direction Aware Hover Effect
      portfolio.find('.portfolio-item-content').each(function() {
        $(this).hoverdir({
          speed :       200,
          hoverDelay :  100
        });
      });
      
      docReady( function() {
        // init Isotope
        var iso = new Isotope( '.isotope', {
          itemSelector: '.isotope-item',
          masonry: {
            columnWidth: '.grid-sizer',
            gutter: '.gutter-sizer'
          }
        });

        // layout Isotope again after all images have loaded
        imagesLoaded( '.isotope', function() {
          iso.layout();
        });

        // bind filter button click
        $('#portfolio-filter').on( 'click', 'li', function() {
          var filterValue = $( this ).attr('data-filter');
          //console.log(filterValue);
          // use filterFn if matches value
          //filterValue = filterFns[ filterValue ] || filterValue;
          iso.arrange({ filter: filterValue });

          setTimeout(function() {
            $.waypoints('refresh');
          }, 1000);

        });

        // change is-checked class on buttons
        $('.filter-group').each( function( i, buttonGroup ) {
          var $buttonGroup = $( buttonGroup );
          $buttonGroup.on( 'click', 'li', function() {
            $buttonGroup.find('.active').removeClass('active');
            $( this ).addClass('active');
          });
        });

      });

      // Portfolio Filter Item Counter
      $('#portfolio-filter li').each(function() {
        var projecttype = $(this).attr('data-filter');
        if ( projecttype === "*" || "" ) {
          $(this).append( '<span class="type-counter">'+$("#portfolio-list > .isotope-item").length+'</span>' ); // Count All Projects
        }
        else {
          $(this).append( '<span class="type-counter">'+$("#portfolio-list > .isotope-item"+projecttype).length+'</span>' ); // Count The Specific Project Type
        }
      });

    }
  },
  // About us page, note the change from about-us to about_us.
  about_us: {
    init: function() {
      // JavaScript to be fired on the about us page
    }
  }
};

// The routing fires all common scripts, followed by the page specific scripts.
// Add additional events for more control over timing e.g. a finalize event
var UTIL = {
  fire: function(func, funcname, args) {
    var namespace = Roots;
    funcname = (funcname === undefined) ? 'init' : funcname;
    if (func !== '' && namespace[func] && typeof namespace[func][funcname] === 'function') {
      namespace[func][funcname](args);
    }
  },
  loadEvents: function() {
    UTIL.fire('common');

    $.each(document.body.className.replace(/-/g, '_').split(/\s+/),function(i,classnm) {
      UTIL.fire(classnm);
    });
  }
};

$(document).ready(UTIL.loadEvents);

})(jQuery); // Fully reference jQuery after this point.

