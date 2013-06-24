var BrowserDetect = {
  init: function () {
    this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
    this.version = this.searchVersion(navigator.userAgent)
      || this.searchVersion(navigator.appVersion)
      || "an unknown version";
    this.OS = this.searchString(this.dataOS) || "an unknown OS";
  },
  searchString: function (data) {
    for (var i=0;i<data.length;i++) {
      var dataString = data[i].string;
      var dataProp = data[i].prop;
      this.versionSearchString = data[i].versionSearch || data[i].identity;
      if (dataString) {
        if (dataString.indexOf(data[i].subString) != -1)
          return data[i].identity;
      }
      else if (dataProp)
        return data[i].identity;
    }
  },
  searchVersion: function (dataString) {
    var index = dataString.indexOf(this.versionSearchString);
    if (index == -1) return;
    return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
  },
  dataBrowser: [
    {
      string: navigator.userAgent,
      subString: "Chrome",
      identity: "Chrome"
    },
    {   string: navigator.userAgent,
      subString: "OmniWeb",
      versionSearch: "OmniWeb/",
      identity: "OmniWeb"
    },
    {
      string: navigator.vendor,
      subString: "Apple",
      identity: "Safari",
      versionSearch: "Version"
    },
    {
      prop: window.opera,
      identity: "Opera",
      versionSearch: "Version"
    },
    {
      string: navigator.vendor,
      subString: "iCab",
      identity: "iCab"
    },
    {
      string: navigator.vendor,
      subString: "KDE",
      identity: "Konqueror"
    },
    {
      string: navigator.userAgent,
      subString: "Firefox",
      identity: "Firefox"
    },
    {
      string: navigator.vendor,
      subString: "Camino",
      identity: "Camino"
    },
    {   // for newer Netscapes (6+)
      string: navigator.userAgent,
      subString: "Netscape",
      identity: "Netscape"
    },
    {
      string: navigator.userAgent,
      subString: "MSIE",
      identity: "Explorer",
      versionSearch: "MSIE"
    },
    {
      string: navigator.userAgent,
      subString: "Gecko",
      identity: "Mozilla",
      versionSearch: "rv"
    },
    {     // for older Netscapes (4-)
      string: navigator.userAgent,
      subString: "Mozilla",
      identity: "Netscape",
      versionSearch: "Mozilla"
    }
  ],
  dataOS : [
    {
      string: navigator.platform,
      subString: "Win",
      identity: "Windows"
    },
    {
      string: navigator.platform,
      subString: "Mac",
      identity: "Mac"
    },
    {
         string: navigator.userAgent,
         subString: "iPhone",
         identity: "iPhone/iPod"
      },
    {
      string: navigator.platform,
      subString: "Linux",
      identity: "Linux"
    }
  ]
};
BrowserDetect.init();

var browser =  BrowserDetect.browser;

$(function () {
  preload('img/roku-content-pic', 'ID_Roku_', 17, '#roku');
  preload('img/amc-content-pic', 'ProjectSelect_amc_', 3, '#amc');
  preload('img/thesis-content-pic', 'ProjectSelect_Thesis_', 3, '#thesis');
  function projectSlideFn() {
    var Page = (function() {

      var $navArrows = $( '#nav-arrows' ),
        $nav = $( '#nav-dots > span' ),
        slitslider = $( '#slider' ).slitslider( {
          onBeforeChange : function( slide, pos ) {

            $nav.removeClass( 'nav-dot-current' );
            $nav.eq( pos ).addClass( 'nav-dot-current' );

          }
        } ),

        init = function() {

          initEvents();

        },
        initEvents = function() {

          // add navigation events
          $navArrows.children( ':last' ).on( 'click', function() {

            slitslider.next();
            return false;

          } );

          $navArrows.children( ':first' ).on( 'click', function() {

            slitslider.previous();
            return false;

          } );

          $nav.each( function( i ) {

            $( this ).on( 'click', function( event ) {

              var $dot = $( this );

              if( !slitslider.isActive() ) {

                $nav.removeClass( 'nav-dot-current' );
                $dot.addClass( 'nav-dot-current' );

              }

              slitslider.jump( i + 1 );
              return false;

            } );

          } );

        };

        return { init : init };

    })();

    Page.init();

    /**
     * Notes:
     *
     * example how to add items:
     */

    /*

    var $items  = $('<div class="sl-slide sl-slide-color-2" data-orientation="horizontal" data-slice1-rotation="-5" data-slice2-rotation="10" data-slice1-scale="2" data-slice2-scale="1"><div class="sl-slide-inner bg-1"><div class="sl-deco" data-icon="t"></div><h2>some text</h2><blockquote><p>bla bla</p><cite>Margi Clarke</cite></blockquote></div></div>');

    // call the plugin's add method
    ss.add($items);

    */
  }

  function landingPageBehavior() {
    var landingImg = $('.landing').find('img');
    landingImg.on('click', function () {
      landingImg.parent().hide();
      $('#project-slide').fadeIn();
    });
  }

  function projectSlideLink() {
    $('#roku-link').on('click', function () {
      if (!$('#main').hasClass('portfolio_main')) $('#main').addClass('portfolio_main');
      $('#project-slide').hide();
      $('#roku').fadeIn().trigger('resize');
    });
    $('#thesis-link').on('click', function () {
      if (!$('#main').hasClass('portfolio_main')) $('#main').addClass('portfolio_main');
      $('#project-slide').hide();
      $('#thesis').fadeIn().trigger('resize');
    });
    $('#amc-link').on('click', function () {
      if (!$('#main').hasClass('portfolio_main')) $('#main').addClass('portfolio_main');
      $('#project-slide').hide();
      $('#amc').fadeIn().trigger('resize');
    });
  }

  function preload(picDir, picName, numOfPic, goalID) {
    // picDir = img
    // picName = pictures name convention
    // numOfPic = how many pictures are there
    // goalID = destination DIV block

    // generate picture paths array
    var arrayOfImages = []
    for (var i = 0; i < numOfPic; i++) {
      if (i >= 9) {
        arrayOfImages.push('./' + picDir + '/' + picName + (i + 1).toString() + '.jpg');
      }
      else {
        arrayOfImages.push('./' + picDir + '/' + picName + '0' + (i + 1).toString() + '.jpg');
      }
    }

    var totalWidth = 0;

    // preloading images, appending images to corresponding DIV
    $(arrayOfImages).each(function () {
      var newImg = $('<img />').attr({
        'class' : 'portfolio-pic',
        'src' : this
      }).appendTo($(goalID));
      newImg.load(function () {
        totalWidth += $(this).width();
        if (browser === 'Firefox') {
          $(goalID).css({
            'width' : totalWidth - 24.0
          });
        } else {
          $(goalID).css({
            'width' : totalWidth
          });
        }
      });
    });
  }
  function scaleFont() {
    var viewWidth = $(window).width();

    if (viewWidth >= 967) { $('body').css({'font-size' : '14px'}); }
    else if (viewWidth >= 845) { $('body').css({'font-size' : '12px'}); }
    else { $('body').css({'font-size' : '10px'}); }
  }
  function resizeWidthAdjust () {
    $('.portfolio').each(function () {
      var totalWidth = 0;

      $(this).find('img').each(function () {
        totalWidth += $(this).width();
      });

      // if (browser === 'Firefox') { $(this).css({'width' : (totalWidth - 24.0)}); }
      if (browser === 'Firefox') { $(this).css({'width' : (totalWidth)}); }
      else { $(this).css({'width' : totalWidth}); }
    });

    $('#c-height').text($('#main').height());

    var landingImg = $('.landing').find('img');
    landingImg.css('margin-top', landingImg.height() / -2.0);

    var menu = $('#menu');
    menu.css('margin-right', -menu.find('li').eq(0).outerWidth()*3.2);

  }
  function heightExamine () {
    var windowsHeight = $(window).height();
    var windowsWidth = $(window).width();
    $('#footer').text('Height: ' + windowsHeight + ', Width: ' + windowsWidth);
  }

  if (browser === 'Firefox') { $('.portfolio-pic').css('margin', '0 -1px'); }
  $(window).resize(function () {
    resizeWidthAdjust();
    scaleFont();

  });

  var landingImg = $('.landing').find('img');
  landingImg.load(function () {
    landingImg.css('margin-top', landingImg.height() / -2.0);
  });

  scaleFont();
  landingPageBehavior();
  projectSlideFn();


  var menu = $('#menu');
  menu.css('margin-right', -menu.find('li').eq(0).outerWidth()*3.2);

  menu.find('li').eq(0).on('click', function() {
    if ($(this).hasClass('menuShow')) {
      $(this).removeClass('menuShow');
      menu.animate({
        'margin-right': '0'}, 750);
    }
    else {
      $(this).addClass('menuShow');
      menu.animate({
        'margin-right': -menu.find('li').eq(0).outerWidth()*3.2}, 750);
    }
  });
  $('#c-height').text($('#main').height());

  projectSlideLink();

});
