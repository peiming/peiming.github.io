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
  function preload (picDir, picName, numOfPic, goalID) {
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
        $(goalID).css({
          'width' : totalWidth - 22.0
        });
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

      $(this).css({'width' : (totalWidth - 22.0)});
    });
  }
  function heightExamine () {
    var windowsHeight = $(window).height();
    $('#footer').text('Height: ' + windowsHeight);
  }
  scaleFont();
  preload('img/roku-content-pic', 'ID_Roku_', 13, '#roku');
  if (browser === 'Firefox') { $('.portfolio-pic').css('margin', '0 -1px'); }
  $(window).resize(function () {
    resizeWidthAdjust();
    scaleFont();
  });
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


});
