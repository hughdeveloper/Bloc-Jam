/* When coding you do not want to pollute the global atmosphere. It can lead to problems when coding with other poeple. This can be solved by making the whole document a in a function. There are other ways of solving this problem. */

//template for song rows//

var updateSeekPercentage = function($seekBar, seekBarFillRatio) {
    var offsetXPercent = seekBarFillRatio * 100;
    
    offsetXPercent = Math.max(0, offsetXPercent);
    offsetXPercent = Math.min(100, offsetXPercent);
 
    
    var percentageString = offsetXPercent + '%';
    $seekBar.find('.fill').width(percentageString);
    $seekBar.find('.thumb').css({left: percentageString});
 };

var setupSeekBars = function() {
     var $seekBars = $('.player-bar .seek-bar');
 
     $seekBars.click(function(event) {
         
         var offsetX = event.pageX - $(this).offset().left;
         var barWidth = $(this).width();
         
         var seekBarFillRatio = offsetX / barWidth;
 
		 if ($(this).parent().attr('class') == 'seek-control') {
            seek(seekBarFillRatio * currentSoundFile.getDuration());
        } else {
            setVolume(seekBarFillRatio * 100);   
        }
		 
         updateSeekPercentage($(this), seekBarFillRatio);
     });
	
	$seekBars.find('.thumb').mousedown(function(event) {

         var $seekBar = $(this).parent();

         $(document).bind('mousemove.thumb', function(event){
             var offsetX = event.pageX - $seekBar.offset().left;
             var barWidth = $seekBar.width();
             var seekBarFillRatio = offsetX / barWidth;
			 
			 if ($seekBar.parent().attr('class') == 'seek-control') {
                seek(seekBarFillRatio * currentSoundFile.getDuration());   
            } else {
                setVolume(seekBarFillRatio);
            }
 
             updateSeekPercentage($seekBar, seekBarFillRatio);
         });

         $(document).bind('mouseup.thumb', function() {
             $(document).unbind('mousemove.thumb');
             $(document).unbind('mouseup.thumb');
         });
     });
 };

var updateSeekBarWhileSongPlays = function() {
	if (currentSoundFile) {
		currentSoundFile.bind('timeupdate', function(event) {
			var seekBarFillRatio = this.getTime() / this.getDuration();
			var $seekBar = $('.seek-control .seek-bar');
			
			updateSeekPercentage($seekBar, seekBarFillRatio);
		});
	}
};

var seek = function(time) {
	//look into truthy and falsy. All values are considered truthy unless they are defined as falsy. Some examples of falsy is e.g. (false, 0, null, undefined, NaN)
	if (currentSoundFile) {
		currentSoundFile.setTime(time);
	}
}

var setCurrentTimeInPlayerBar(currentTime) {
	var $songDuration = $('.currently-playing .song-name');
	
	
	
};

var setTotalTimeInPlayerBar = function (totalTime) {
	var $songTotalTime = $('.currently-playing .total-time');
	
	$songTotalTime.text();
	
	
};

var filterTimeCode = function (timeInSeconds) {
	
	var timeSec = parseFloat(timeInSeconds);
	var minutes = Math.floor(timeInSec); 
	var seconds = timeInSeconds/60;
	
	var time = minutes+':'+timeSec.charAt[1]+timeSec.charAt[2];
	
	
};

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
	var songNumber = parseInt($(this).attr('data-song-number'));
	
	

	if (currentlyPlayingSongNumber !== null) {
		
		var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
		currentlyPlayingCell.html(currentlyPlayingSongNumber);
	}
	if (currentlyPlayingSongNumber !== songNumber) {
		$(this).html(pauseButtonTemplate);
		
		// ***** do not use function setSong, it wont show the pause button when a song is so called playing. This happened because when we concole log the currentlyPlayingSongNumber as well as the SongNumber we notcie that one is a interger and the other is a string. Becasue of this our conditional statement was always true since a string does not equal a interger.
		setSong(songNumber);
		currentSoundFile.play();
		updateSeekBarWhileSongPlays();
		currentSongFromAlbum = currentAlbum.songs[songNumber -1];
		
		var $volumeFill = $('.volume .fill');
		var $volumeThumb = $('.volume .thimb');
		$volumeFill.width(currentVolume + '%');
		$volumeThumb.css({left: currentVolume + '%'});
		
		updatePlayerBarSong();
		} 
		
	else if (currentlyPlayingSongNumber === songNumber) {
		if (currentSoundFile.isPaused()) {
			$(this).html(pauseButtonTemplate);
			$('.main-controls .play-pause').html(playerBarPauseButton);
			currentSoundFile.play();
			updateSeekBarWhileSongPlays();
		}
		else {
			$(this).html(playButtonTemplate);
			$('.main-controls .play-pause').html(playerBarPlayButton);
			currentSoundFile.pause();
		}
	}
};
	
	var onHover = function(event) {

		var songNumElement = $(this).find('.song-item-number');
		var songNumber = parseInt(songNumElement.attr('data-song-number'));
		//console.log(currentlyPlayingSongNumber, songNumber, currentlyPlayingSongNumber !== songNumber);
		if (currentlyPlayingSongNumber !== songNumber) {
			songNumElement.html(playButtonTemplate);
		}
		
	};
	
	var offHover = function(event) {

		var songNumElement = $(this).find('.song-item-number');
		var songNumber = parseInt(songNumElement.attr('data-song-number'));
		//console.log(currentlyPlayingSongNumber, songNumber, currentlyPlayingSongNumber !== songNumber);
		if (currentlyPlayingSongNumber !== songNumber) {
			songNumElement.html(songNumber);
			
		console.log("songNumber type is " + typeof songNumber + "\n and currentlyPlayingSongNumber type is " + typeof currentlyPlayingSongNumber);
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
	currentSoundFile.play();
	updateSeekBarWhileSongPlays();
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
	currentSoundFile.play();
	updateSeekBarWhileSongPlays();
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
	if (currentSoundFile) {
         currentSoundFile.stop();
     }
	currentlyPlayingSongNumber = parseInt(songNumber);
    currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
	
	currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {
		formats: ['mp3'],
		preload: true
	});
	setVolume(currentVolume);
};

 var setVolume = function(volume) {
     if (currentSoundFile) {
         currentSoundFile.setVolume(volume);
     }
 };

var getSongNumberCell = function (number) {
	return $('.song-item-number[data-song-number="' + number + '"]');
};

var trackIndex = function(album,song) {
	return album.songs.indexOf(song);
};

var togglePlayFromPlayerBar = function () {
	var songNumElement = $(this).find('.song-item-number');
	var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
	
		 if (currentSoundFile.isPaused()) {
			 $(this).html(pauseButtonTemplate);
			$('.main-controls .play-pause').html(playerBarPauseButton);
			currentlyPlayingCell.html(pauseButtonTemplate);
			// the music starts playing
			currentSoundFile.play();
		 }
		 else {
			 $(this).html(playButtonTemplate);
			$('.main-controls .play-pause').html(playerBarPlayButton);
			 currentlyPlayingCell.html(playButtonTemplate);
			// the music stops playing
			currentSoundFile.pause();
		 }
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
var currentSoundFile = null;
var currentVolume = 80;
var $playPauseButtomBar = $('.main-controls .play-pause');

var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');



// is document nessary here ????? can you go with "$(function() {"
 $(document).ready(function () {
	 setCurrentAlbum(albumPicasso);
	 setupSeekBars();
	 //when we click on the previous button we will run the fuction previousSong
	 $previousButton.click(previousSong);
	 //when we click on the next button we will run the function nextSong
	 $nextButton.click(nextSong);
	 
	 $playPauseButtomBar.click(togglePlayFromPlayerBar);
	 
	 
 });