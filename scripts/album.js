/* When coding you do not want to pollute the global atmosphere. It can lead to problems when coding with other poeple. This can be solved by making the whole document a in a function. There are other ways of solving this problem. */

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

	if (currentlyPlayingSongNumber !== null) {
		
		var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
		currentlyPlayingCell.html(currentlyPlayingSongNumber);
	}
	if (currentlyPlayingSongNumber !== songNumber) {
		$(this).html(pauseButtonTemplate);
		
		// ***** do not use function setSong, it wont show the pause button when a song is so called playing
		currentlyPlayingSongNumber = songNumber;
		currentSongFromAlbum = currentAlbum.songs[songNumber -1];
		updatePlayerBarSong();
		} 
		
	else if (currentlyPlayingSongNumber === songNumber) {
		$(this).html(playButtonTemplate);
		$('.main-controls .play-pause').html(playerBarPlayButton);
		setSong(null);
		currentSongFromAlbum = null;
	}
};
	
	var onHover = function(event) {

		var songNumElement = $(this).find('.song-item-number');
		var songNumber = songNumElement.attr('data-song-number');
		
		if (currentlyPlayingSongNumber !== songNumber) {
			songNumElement.html(playButtonTemplate);
		}
		
	};
	
	var offHover = function(event) {

		var songNumElement = $(this).find('.song-item-number');
		var songNumber = songNumElement.attr('data-song-number');
		
		if (currentlyPlayingSongNumber !== songNumber) {
			songNumElement.html(songNumber);
			
		console.log("songNumber type is " + typeof songNumber + "\n and currentlyPlayingSongNumber type is " + typeof currentlyPlayingSongNumber);
		}
	};

	
var songNumber = parseInt($(this).attr('data-song-number'));	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	// .find is like the querySelector. Here we are finding the song-item-menu in the row that the mouse clicks on
	$row.find('.song-item-number').click(clickHandler);
	
	//.hover combines two differnet function that were previously used. the mouseover and mouseleaver
	$row.hover(onHover, offHover);
	
	return $row;
	
 };

var setCurrentAlbum = function(album) {
	/*When using the getElementsBy type of code need to add [0] or something in that nature to the end of it because there can be many elements with the same name and if not used the command will return a list(array) of classes with the same name. There will be times were this is needed, however in this situation we only want to select one thing so that later on in the code we can replace the content within that one elemnt.*/
	
	currentAlbum = album;
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

var updatePlayerBarSong = function () {
		var $songName = $('.currently-playing .song-name');
		var $songArtist = $('.currently-playing .artist-name');
		var $songDisplayMobile = $('.currently-playing .artist-song-mobile');
		
		
		$songName.text(currentSongFromAlbum.title);
		$songArtist.text(currentAlbum.artist);
		$songDisplayMobile.text(currentSongFromAlbum.title + " - " + currentAlbum.artist);
		
	
		 
		
		
		
		
		
		$('.main-controls .play-pause').html(playerBarPauseButton);
	};

var nextSong = function() {
	    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    currentSongIndex++;

    if (currentSongIndex >= currentAlbum.songs.length) {
        currentSongIndex = 0;
    }
    var lastSongNumber = currentlyPlayingSongNumber;
    setSong(currentSongIndex + 1);
    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];
    updatePlayerBarSong();

    var $nextSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');

    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
};

var previousSong = function () {
	var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    // Note that we're _decrementing_ the index here
    currentSongIndex--;

    if (currentSongIndex < 0) {
        currentSongIndex = currentAlbum.songs.length - 1;
    }

    // Save the last song number before changing it
    var lastSongNumber = currentlyPlayingSongNumber;

    // Set a new current song
    setSong(currentSongIndex + 1);
    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

    // Update the Player Bar information
    updatePlayerBarSong();

    $('.main-controls .play-pause').html(playerBarPauseButton);

    var $previousSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');

    $previousSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
};

var setSong = function (songNumber) {
	currentlyPlayingSongNumber = parseInt(songNumber);
    currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
};

var getSongNumberCell = function (number) {
	return $('.song-item-number[data-song-number="' + number + '"]');
};


var trackIndex = function(album,song) {
	return album.songs.indexOf(song);
};



//var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
//var songRows = document.getElementsByClassName('album-view-song-item');

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
 var playerBarPlayButton = '<span class="ion-play"></span>';
 var playerBarPauseButton = '<span class="ion-pause"></span>';

// these are all in the global scope because it is used by muliple functions throughout the file

//current playing album
var currentAlbum = null;
//the song number that is playing
var currentlyPlayingSongNumber = null;
// holds the playing song object from the songs array
var currentSongFromAlbum = null;

var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');



// is document nessary here ????? can you go with "$(function() {"
 $(document).ready(function () {
	 setCurrentAlbum(albumPicasso);
	 //when we click on the previous button we will run the fuction previousSong
	 $previousButton.click(previousSong);
	 //when we click on the next button we will run the function nextSong
	 $nextButton.click(nextSong);
 });