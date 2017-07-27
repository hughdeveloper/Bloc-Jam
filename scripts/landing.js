/*var pointsArray = document.getElementsByClassName('point');

 var revealPoint = function(point) {
		 
          	point.style.opacity = 1;
          	point.style.transform = "scaleX(1) translateY(0)";
          	point.style.msTransform = "scaleX(1) translateY(0)";
          	point.style.WebkitTransform = "scaleX(1) translateY(0)";	 
      }

var animatePoints = function(points) {  
	forEach(points, revealPoint);
 }; */


var animatePoints = function() {
	var revealPoint = function() {
         $(this).css({
             opacity: 1,
             transform: 'scaleX(1) translateY(0)'
         });
		 };
		$.each($('.point'), revealPoint);
	};


//window.onload = function() {

$(window).load(function() {
	
	     // Automatically animates the points on a tall screen where scrolling can't trigger the animation		Old code
     /*if (window.innerHeight > 950) {
         animatePoints(pointsArray);*/
		 
	//jQuery version of the code
	if($(window).height() > 950) {
		animatePoints();
	}

	
	/*var sellingPoints = document.getElementsByClassName('selling-points')[0];
	var scrollDistance = sellingPoints.getBoundingClientRect().top - window.innerHeight +200;*/
	
	var scrollDistance = $('.selling-points').offset().top-$(window).height()+200;
	
	
	
	/*window.addEventListener('scroll', function(event) {
		 if (document.documentElement.scrollTop || document.body.scrollTop >= scrollDistance) {
             animatePoints(pointsArray);  */
	
	$(window).scroll(function(event) {
		if ($(window).scrollTop() >= scrollDistance) {
			animatePoints();
		}
	});
//}
});