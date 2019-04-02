/*-------------------------------------------------
  External Links Sitewide
-------------------------------------------------*/
function setupExternalLinks(){
	$('a[rel="external"]').click( function() {
			window.open( $(this).attr('href') );
			return false;
    });
}
/*-------------------------------------------------
  Pages With Forms
-------------------------------------------------*/
function initOverlabelValidate(){
  $('form').each(function(){ // use .each for pages that have two forms on them ie Press pages
  $(this).validate();
  $("label").overlabel();

  jQuery.extend(jQuery.validator.messages, {
    required: 'Required',
    email: 'Invalid Email'
  });
  });
}
/*-------------------------------------------------
  Option Dropdown
-------------------------------------------------*/
function initFormDropDown() {
  $('.optionDropdown').each(function(){
    var id = $(this).attr('id');
    var formId = $(this).attr('data-form-id');
    // setup the open/close glyph
    $('#'+id+' .open').live('click', function(){
      if($(this).parent().parent().hasClass('active')) {
        $(this).parents('.optionDropdown').toggleClass('listOpen');
        $(this).parents('.optionDropdown').siblings('.listOpen').toggleClass('listOpen');
        // $('#'+id+' .opts').slideToggle();
      }
      return false;
    });


    // set the default text ******** Talk to Dmitry about Languages for this
    // $(this).find('.open').text(getDefaultDropdownText());

    // add click handlers to the items in the list
/*
    $('#'+id+' ul li a').click(function(){
      var optText, val;
      var dropdown;

      optText = $(this).text();
      val = $(this).attr('id').split('_').slice(-1)[0];
      dropdown = $(this).parents('.optionDropdown');

      // make the list close and set the text to the selected item
      commitDropdownSelection(dropdown, optText);
      dropdown.addClass('selected'); // move into commit drop down selection function

      // filter out the invalid items in child lists
      filterChildren(dropdown, val);

      // store selected value in a hidden text
      $('input[id='+formId+']').attr('value', val);

      $('#'+id+'  ul').slideToggle();
    }); */



  });
}
function filterChildren(dropdown, selectedValue) {
  if(!dropdown || !selectedValue) {
    return false;
  }
  var childDropdown = getChildDropdown(dropdown);

  if(childDropdown.length) {
    var anchors = childDropdown.find('ul li a');
    // hide all the items in the child drop down
    anchors.parent().css('display','none');
    // show the items that match the selected parent value
    anchors.filter('a[id^=option_' + selectedValue + ']')
      .parent().css('display', 'block');
    // clear selections and reset state on child dropdown
    commitDropdownSelection(childDropdown, getDefaultDropdownText());
    resetChildDropdown(childDropdown);
  }
}
// get the child drop down that cascades based on the selection made
// in the specified parentDropdown. The dropdowns are named using this pattern:  option_<parent>_<current>
function getChildDropdown(parentDropdown){
  var childSelector = 'div[id*=_' +
    getDropdownName(parentDropdown.attr('id')) +
    '_]:first';
  return $('.optionDropdown').filter(childSelector)
}
// update a dropdown text and state to represent the selected item
function commitDropdownSelection(dropdown, selectedValue) {
  dropdown.toggleClass('listOpen')
    .find('.open')
    .text(selectedValue);
}
// clean up the state of the specified child drop down and perform this function again (recursively)
// if we find that there is a child cascading dropDown (grandchild ) of the specified child (dropdown)
function resetChildDropdown(dropdown){
  // clear the selected text
  dropdown.find('.open').text(getDefaultDropdownText());
  // clear the visual styles
  dropdown.removeClass('selected');
  dropdown.removeClass('listOpen');
  // if this drop down has a child then reset it recursively
  var grandChild = getChildDropdown(dropdown);
  if (grandChild && grandChild.length >0) {
    resetChildDropdown(grandChild);
  }
}
function getDefaultDropdownText(){
  /* return 'Please Choose'; */
}
function getDropdownName(id){
  return  id.split('_').slice(-1)[0];
}
/*-------------------------------------------------
  Services Icons Hover Switch
-------------------------------------------------*/
function initServicesHover(){
  $('#servicesGrid li div a, .homeFeatSvcs li div a').each(function(){
    /* identify children */
    var firstImg = $(this).children().eq(0);
    var secondImg = $(this).children().eq(1);
    /* set initial styles */
    $('#gallery li div a img, .homeFeatSvcs li div a img').css({
      "left": "0px",
      "position": "absolute",
      "top": "0px"
    })
    $(secondImg).css({"opacity":0});
    $(firstImg).css({"z-index":10});
    /* setup hover to switch images */
    $(this).parents('li').hover(function(){
        $(secondImg).stop().fadeTo(170,1);
        $(firstImg).stop().fadeTo(240,0);
      }, function(){
        $(secondImg).stop().fadeTo(240,0);
        $(firstImg).stop().fadeTo(170,1);
    });
  });
}
/*-------------------------------------------------
  File Upload Button Style
-------------------------------------------------*/
function initFileUploadStyle(){
  //$('input[type=file]').customFileInput();
}
/*-------------------------------------------------
  Services Accordian
-------------------------------------------------*/
function initServicesAccordion(){
  $('.svcsDetailsBox h4 a').click(function(){
    if ($(this).hasClass('open')) {
      $(this).removeClass('open').parent('h4').siblings('div').slideUp();
    } else {
      $(this).addClass('open').parent('h4').siblings('div').slideDown();
      $(this).parents('li')
      .siblings().find('a.open')
      .removeClass('open')
      .parent('h4').siblings('div').delay(400).slideUp();
    return false;
    }
  });
}
/*-------------------------------------------------
  Image Cycles
-------------------------------------------------*/
function initCycle(){
  if($('.cycleBox img').length <= 1){
    return false;
  }
  // Define cycle options
  if ($('.cycleBox').hasClass('homeBanner')){
    var $slideElement = '> div';
  } else {
    var $slideElement = 'img';
  }
  var cycleOpts = {
    speed : '400',
    timeout : 4000,
    fx: 'scrollHorz',
    prev: 'li.prevBtn a',
    next: 'li.nextBtn a',
    slideExpr: $slideElement
  }
  // Inject pager and initialize cycle
  $('.cycleBox').append('<ul class="cycleNav"><li class="prevBtn"><a href="#">Previous</a></li><li class="nextBtn"><a href="#">Next</a></li></ul>').cycle(cycleOpts);

  // Initialize promotion cycle on homepage
  $('.promotionCycle').cycle({
    speed: '600',
    timeout: 3500
  });
}
/*-------------------------------------------------
  Google Map
-------------------------------------------------*/
function setupGoogleMap(){
  if($('#mapBox').length){
    var map;
    var myLatlng = new google.maps.LatLng(40.726128,-73.995574);
    var centerLatlng = new google.maps.LatLng(40.727128,-73.995574);

    /* Setup Custom Grayscale Style */
    var stylez = [
        { stylers: [{
          saturation:-100
          }]
        }
      ];
    /* Setup Map Options */
    var myOptions = {
      zoom: 16,
      center: centerLatlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControlOptions: {
             mapTypeIds: []
          }
    };

    /* Setup Map Container */
    var map = new google.maps.Map(document.getElementById("mapBox"),
        myOptions);

    var printmorMapType = new google.maps.StyledMapType(stylez);
        map.mapTypes.set('grayscale', printmorMapType);
        map.setMapTypeId('grayscale');

    /* Set Custom Marker */
    var image = 'lib/css/images/printmor-map-marker.png';
    var marker = new google.maps.Marker({
          position: myLatlng,
          map: map,
          icon: image
      });
  }
}
/*-------------------------------------------------
  Setup Styles for Tables (pricing chart etc)
-------------------------------------------------*/
function setupTableStyles(){
  $('.chartModule tr').each(function(){
    $(this).children('td, th').eq(0).css({
      "background-image":"none",
      "color":"#000000",
      "font-size":"10px",
      "padding-left":0

    });
  });
  /* Tables Within Services Accordion */
  $('.dimensionsTb tr, .pricingTb tr').each(function(){
    $(this).children('td').eq(1).css({
      "background-image":"none",
      "color":"#db4e43",
      "padding-left":"10px"
    });
  });
}
/*-------------------------------------------------
  Twitter Bird Eye mover
-------------------------------------------------*/
function setupTwitterBirdEye(){
  $('#twitterBox a').hover(function(){
    $(this).parents('div.last').addClass('hovering');
  }, function(){
    $(this).parents('div.last').removeClass('hovering');
  });
}

/*-------------------------------------------------
  Options
-------------------------------------------------*/
function scrollOpt(e, dir, max) {
  var scrollTop = (dir === 'top') ? 0 : max;
  $(e).animate({
    'scrollTop' : scrollTop
  }, 500, function(){
    setTimeout(function(){
      $(e).parent().find('.helper').stop().fadeTo(500, 0).hide();
    }, 250);
  });
}

function addOptHelper(e){
  var $e = $(e),
      maxY = parseInt($e.css('maxHeight')),
      innerY = function(){
        var y = 0,
            i = 0,
            len = $e.find('li').length;
        for(i = 0; i < len; i++) {
          var uY = $e.find('li:eq('+i+')').height(),
              uM = 0;
          y += (uM+uY);
        }
        return y;
      }();

  if(innerY > maxY) {

    $e.after('<div class="helper top" /><div class="helper bottom" />');
    $e
      .parent() // opt
        .find('.helper')
        .hide()
        .hover(function(){ // Bind Controls
          var dir = $(this).attr('class').split(' ').slice(1)[0],
              scrollTop = innerY - maxY;
          scrollOpt(e, dir, scrollTop);
        }, function(){
          $(e).stop();
        })
      .end()// opt
      .unbind('mouseover')
      .mouseover(function(){
        var scrollTop = $e.scrollTop();
        if(scrollTop <= 0){
          $(this).find('.helper.bottom').show().stop().fadeTo(250, 1);
        }
        if(scrollTop > 0){
          $(this).find('.helper.top').show().stop().fadeTo(250, 1);
        }
      })
      .unbind('mouseout')
      .mouseout(function(){
        $(this).find('.helper').stop().fadeTo(250, 0).hide();
      })
    .end() // opt ul
    .scroll(function(){
      var scrollTop = $(e).scrollTop();
      if(scrollTop <= 0) {
        $(this).find('.helper.bottom').show().stop().fadeTo(250, 1);
      }
      if(scrollTop > 0) {
        $(this).find('.helper.top').show().stop().fadeTo(250, 1);
      }
    });
  } else {
    $e
      .parent() // opt
        .find('.helper')
        .remove();
  }
}

function setVal(name, val, text, after) {
  var $drop = $('#'+name),
      $next = $drop.parent().next(),
      $prev = $drop.parent().prev(),
      charCount = text.split('').length,
      displayText = text.substr(0, 10)+'&hellip;';

  $drop
  .removeClass('listOpen')
  .addClass('was_hit')
    .find('.open')
    .html(displayText)
  .end()
    .find('.opts.open')
    .removeClass('listOpen')
  .end()
    .find('.opts ul').animate({
      scrollTop : 0
    }, 0);

  // Set input val to prep for ajax request
  $('input[name='+name+']').val(val);
  $('input[name='+name+'_title]').val(text);

  if(!$next.hasClass('active')) {
    $next.addClass('active');
    $prev.addClass('active');
  }

  // Activcate Submit Button
  if($('.was_hit').length === 4) { // Hard coded for now, will update later
    $('input.inactive').removeClass('inactive');
  } else {
    // Set status indicator
    $next.find('.selected').addClass('working');
  }
  after();
}

function oc(array){
  var o = {};
  for(var i=0;i<array.length;i++) {
    o[array[i]]='';
  }
  return o;
}

function updateDrops(data) {
  var i;


  for (i = 0; i < data.opts.length; i++) {
     var $optDrop = $('.optionDropdown:eq('+i+')'),
         $step = $optDrop.parent(),
         $list = $optDrop.find('ul'),
         $selected = $optDrop.find('.selected'),
         name = $optDrop.attr('id'),
         val = $('.hidden input[name='+name+']').val(),
         html = '',
         j;

     if (data.opts[i].values.length) { // if an option contains values
       for(j = 0; j < data.opts[i].values.length; j++) { // loop over options values and build html
          if(data.opts[i].values.length) {
            html += '<li><a href="#" class="'+name+'" id="option_'+data.opts[i].ids[j]+'">'+data.opts[i].values[j]+'</a></li>';
            if($selected.text() === 'n/a') {
              $selected.text('Choose');
              $step.removeClass('empty');
            }
          }
       }
       if(val in oc(data.opts[i].ids) === false) {
          $selected.text('Choose').removeClass('was_hit');
       }

       $list.empty().append(html);
       $optDrop.remove('.helper');

       addOptHelper($list);
     } else {
        $selected.text('n/a').addClass('was_hit');
        $step.addClass('empty').find('.submit').addClass('inactive');
        if($step.hasClass('active')) {
          $step.next().addClass('active');
        }
    }

    if (data.filepath) {
      $('form a.submit').text('Click to Download').attr('href', data.filepath);
    } else {
      $('form a.submit').text('Download Not Available').attr('href', '#');
    }

    $selected.removeClass('working');

  } // end loop on opts

}

function resetSelector(e) {
  var action = $(e).find('form').attr('action'),
      name = $(e).find('.step:first .optionDropdown').attr('id'),
      url = action+'?reset=true&json_encode';
  $(e)
    .find('.open')
    .text('Choose')
  .end()
    .find('ul')
    .animate({
      scrollTop : 0
      }, 0)
  .end()
    .find('form .hidden input:not([name='+name+'])')
    .val('')
  .end()
    .find('form .submit')
    .addClass('inactive')
  .end()
    .find('.step:not(:first)')
    .removeClass('active')
      .find('.was_hit')
      .removeClass('was_hit')
    .end()
      .find('.opts')
      .removeClass('open')
        .find('ul')
        .empty();

  $.getJSON(url, function(data) {
    updateDrops(data);
  });
}

/*-------------------------------------------------
  Recent Tweet
-------------------------------------------------*/
var PrintMor = PrintMor || {};

/*-------------------------------------------------
  Document Ready
-------------------------------------------------*/
$(document).ready(function(){
  setupExternalLinks();
  initOverlabelValidate();
  initFormDropDown();
  initServicesHover();
  initServicesAccordion();
  initFileUploadStyle();
  initCycle();
  setupGoogleMap();
  setupTableStyles();
  setupTwitterBirdEye();
  initFileUploader();

  /* Setup General Styles and Classes */
  $('#primeNav li:last-child').addClass('last');
  $('.homeFeatSvcs ul li:last-child').addClass('last');
  $('#gallery li:nth-child(4n)').addClass('last');
  $('#gallery li:lt(4)').css({'border-color':'#fff'});


  // Get Latest
  //PrintMor.getLatest();


  // Prep Opts
  $('.optionWrap .opts').each(function(){
    var $list = $(this).find('ul');
    if($list.length){
      addOptHelper($list);
    } else {
      $(this).append('<ul />');
    }
  });

  // Selector Click
  $('.optionWrap .opts li a').live('click', function(){
    var $this = $(this),
        $form = $this.parents('form'),
        action = ($form.hasClass('multi')) ? '/json_opts.php' : $form.attr('action'),
        name = $this.attr('class'),
        val = $this.attr('id').split('_').slice(-1)[0],
        text = $this.text(),
        url,
        data;

    if ($('#' + name).hasClass('was_hit')) {
      var toReset = $('#' + name).parent().nextAll();
      toReset.each(function() {
        var name = $(this).find('.optionDropdown').attr('id');
        if ( $(this).find('.optionDropdown').hasClass('was_hit') ) {
          $(this).find('.open').text('Choose');
        }
        $form.find('input[name=' + name +']').val('');
        $form.find('input[name=' + name +'_title]').val('');
      });
    }

    setVal(name, val, text, function(){
      data = $form.serialize();
      url = action+'?'+data+'&selected='+name;
      $.getJSON(url, function(data) {
        updateDrops(data);
      });
    });

    return false;
  });


});
