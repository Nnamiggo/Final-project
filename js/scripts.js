/*-------------------------------------------------
  Login Button
	on Click
	-display the login forms
	this will not appear if a user is loged in but in its place will be a user name
-------------------------------------------------*/
$("#login").click(function() { //hide each button on click
	document.location.href = "location.html";
});

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
  Document Ready
-------------------------------------------------*/
$(document).ready(function(){
initCycle();
});
