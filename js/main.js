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
  $(window).resize(function () {
    resizeWidthAdjust();
    scaleFont();
  });
  var menu = $('#menu');
  menu.css('margin-right', -menu.find('li').eq(0).outerWidth()*3.4);

  menu.find('li').eq(0).on('click', function() {
    if ($(this).hasClass('menuShow')) {
      $(this).removeClass('menuShow');
      menu.animate({
        'margin-right': '0'}, 750);
    }
    else {
      $(this).addClass('menuShow');
      menu.animate({
        'margin-right': -menu.find('li').eq(0).outerWidth()*3.4}, 750);
    }
  });


});
