/* When coding you do not want to pollute the global atmosphere. It can lead to problems when coding with other poeple. This can be solved by making the whole document a in a function. There are other ways of solving this problem. */

// the albums arrays. usually this information will be pulled from a database
//we have created an object//
var albumPicasso = {
     title: 'The Colors',
     artist: 'Pablo Picasso',
     label: 'Cubism',
     year: '1881',
     albumArtUrl: 'assets/images/album_covers/01.png',
     songs: [
         { title: 'Blue', duration: '4:26' },
         { title: 'Green', duration: '3:14' },
         { title: 'Red', duration: '5:01' },
         { title: 'Pink', duration: '3:21'},
         { title: 'Magenta', duration: '2:15'}
     ]
 };
// We have created a object//
 var albumMarconi = {
     title: 'The Telephone',
     artist: 'Guglielmo Marconi',
     label: 'EM',
     year: '1909',
     albumArtUrl: 'assets/images/album_covers/20.png',
     songs: [
         { title: 'Hello, Operator?', duration: '1:01' },
         { title: 'Ring, ring, ring', duration: '5:01' },
         { title: 'Fits in your pocket', duration: '3:21'},
         { title: 'Can you hear me now?', duration: '3:14' },
         { title: 'Wrong phone number', duration: '2:15'}
     ]
 };

//template for song rows//
var createSongRow = function(songNumber, songName, songLength) {
     var template =
        '<tr class="album-view-song-item">'
	  + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>' + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;
 
	/* why would we change this into jQuery when it seems like more coding doing it this way than the original way?   ????? */
    // return template;
	// return $(template);
	var $row =$(template);
	
	var clickHandler = function() {
	var songNumber = $(this).attr('data-song-number');

	if (currentlyPlayingSong !== null) {
		
		var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSong + '"]');
		currentlyPlayingCell.html(currentlyPlayingSong);
	}
	if (currentlyPlayingSong !== songNumber) {
		
		$(this).html(pauseButtonTemplate);
		currentlyPlayingSong = songNumber;
	} else if (currentlyPlayingSong === songNumber) {
		
		$(this).html(playButtonTemplate);
		currentlyPlayingSong = null;
	}
};
	
	var onHover = function(event) {

		var songNumElement = $(this).find('.song-item-number');
		var songNumber = songNumElement.attr('data-song-number');
		
		if (currentlyPlayingSong !== songNumber) {
			songNumElement.html(playButtonTemplate);
		}
		
	};
	
	var offHover = function(event) {

		var songNumElement = $(this).find('.song-item-number');
		var songNumber = songNumElement.attr('data-song-number');
		
		if (currentlyPlayingSong !== songNumber) {
			songNumElement.html(songNumber);
		}
	};
	
	
	// .find is like the querySelector. Here we are finding the song-item-menu in the row that the mouse clicks on
	$row.find('.song-item-number').click(clickHandler);
	
	//.hover combines two differnet function that were previously used. the mouseover and mouseleaver
	$row.hover(onHover, offHover);
	
	return $row;
	
 };

var setCurrentAlbum = function(album) {
	/*When using the getElementsBy type of code need to add [0] or something in that nature to the end of it because there can be many elements with the same name and if not used the command will return a list(array) of classes with the same name. There will be times were this is needed, however in this situation we only want to select one thing so that later on in the code we can replace the content within that one elemnt.*/
	//slects  the album title element
	
	var $albumTitle = $('.album-view-title');
	var $albumArtist = $('.album-view-artist');
	var $albumReleaseInfo = $('.album-view-release-info');
	var $albumImage = $('.album-cover-art');
	var $albumSongList = $('.album-view-song-list');
	
	
	
 
	/*goes and looks at the first child of the album title element then it grabs the nodevalue (the information within the element) of that element and sets it equal to the album.title. This statement displays the title of the element*/
	
     
	/*The setAttribute is like find an replace. We are finding what the "src" is pointing to and we replace the old "src" link with a new link which in this case is the album.albumArtUrl*/
	
     //albumImage.setAttribute('src', album.albumArtUrl);
	
	
	/* .text() gets or set the content of the element it is similar to to the nodeValue selector*/
	$albumTitle.text(album.title);
	$albumArtist.text(album.artist);
	$albumReleaseInfo.text(album.year +' '+album.label);
	
	/*setAttribute is replaced with jQuery .attr() in this example. It can also getAttribute */
	$albumImage.attr('src', album.albumArtUrl);
	
	
	
 
     //albumSongList.innerHTML = "";
	
	$albumSongList.empty();

	/* this for loop inputs the information form the album songs into there places starting with the first song and increasing until the list of songs have all gone through the loop */
     for (var i = 0; i < album.songs.length; i++) {
		 /* template estbalishes first number than the song title and then the song duration. The += symbol is used to add another row of html rather than replacing the existing one when it is running through the for loop */
		 
         //albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
		 
		 /* Rather than adding new rows by adding the template we are seperating the template and calling it a different varible which will be .append() or += to the table */
		 
		 var $newRow = createSongRow(i+1, album.songs[i].title, album.songs[i].duration);
		 $albumSongList.append($newRow);
		 
		 
		 
     }
 };

//var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
//var songRows = document.getElementsByClassName('album-view-song-item');

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

//setting the current playing song to none to begin. this is so a song does not automatically start playing.
var currentlyPlayingSong = null;




// is document nessary here ????? can you go with "$(function() {"
 $(document).ready(function () {
     setCurrentAlbum(albumMarconi);
	 

 });