 // var collectionItemTemplate = 
var buildCollectionItemTemplate = function () {
	var template =
		'<div class="collection-album-container column fourth">'
   	+ '  <img src="assets/images/album_covers/01.png"/>'
   	+ '  <div class="collection-album-info caption">'
   	+ '    <p>'
   	+ '      <a class="album-name" href="album.html"> The Colors </a>'
   	+ '      <br/>'
	+ '      <a href="album.html"> Pablo Picasso </a>'
	+ '      <br/>'
	+ '      X songs'
	+ '      <br/>'
	+ '    </p>'
	+ '  </div>'
	+ '</div>'
   	;
	
	/*How are we changing collectionItemTemplate to template? The function is called buildCollectionItemTemplate	???????	*/
	return $(template);
};


 $(window).load(function() {

	 // Why do we have to put a $ sign in the varible name? ???????
	 // The $ on the $collectionContainer helps identify jQuery-related varibles
	 var $collectionContainer = $('.album-covers');
     //var collectionContainer = document.getElementsByClassName('album-covers')[0];
	 
	 /*The .empty(); emplties the varible weather it is text or other elements*/
	 $collectionContainer.empty();
     //collectionContainer.innerHTML = '';
	 
     for (var i = 0; i < 12; i++) {
		 
		 var $newThumbnail = buildCollectionItemTemplate();
		 /*The .append(); is like the += */
		 $collectionContainer.append($newThumbnail);
         //collectionContainer.innerHTML += collectionItemTemplate;
     }
 });