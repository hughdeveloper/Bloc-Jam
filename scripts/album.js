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
 
     return template;
 };

var setCurrentAlbum = function(album) {
	//slects  the album title
     var albumTitle = document.getElementsByClassName('album-view-title')[0];
	//selects the album's artist element
     var albumArtist = document.getElementsByClassName('album-view-artist')[0];
	// selects the ablum information element
     var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
	//selects the image element
     var albumImage = document.getElementsByClassName('album-cover-art')[0];
	//selects the album's list of music. (the whole list)
     var albumSongList = document.getElementsByClassName('album-view-song-list')[0];
 
	/*goes and looks at the first child of the album title element then it grabs the nodevalue (the information within the element) of that element and sets it equal to the album.title. It statement displays the title of the element*/
     albumTitle.firstChild.nodeValue = album.title;
     albumArtist.firstChild.nodeValue = album.artist;
     albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
     albumImage.setAttribute('src', album.albumArtUrl);
 
     albumSongList.innerHTML = "";

	/*this for loop inputs the information form the album songs into there places starting with the first song and increasing until the list of songs have all gone through the loop*/
     for (var i = 0; i < album.songs.length; i++) {
		 // template estbalishes first number than the song title and then the song duration
         albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
     }
 };

var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item');

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtomTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

//setting the current playing song to none to begin. this is so a song does not automatically start playing.
var currentlyPlayingSong = null;

/*finding the parent name. going form parent to parent if the targetname is not found and if there is no more parent elements that the while loop will stop looping*/
var findParentByClassName = function (name, targetname) {
		 if (name) {
			 var parent = name.parentElement;
			 if (parent.className !== targetname) {
				 console.log("No parent found with that class name");
			 }
			else if (parent.className !== null) {
				console.log("No parent found");	
			}
		 }
	 };
	 
	 // switch rather than if else statements. Don't need ot use break becasue when you return break is automatically assumed
	 
	 var getSongItem = function(element) {
    switch (element.className) {
        case 'album-song-button':
        case 'ion-play':
        case 'ion-pause':
            return findParentByClassName(element, 'song-item-number');
        case 'album-view-song-item':
            return element.querySelector('.song-item-number');
        case 'song-item-title':
        case 'song-item-duration':
            return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
        case 'song-item-number':
            return element;
        default:
            return;
    }  
};
	 
	 var clickHandler = function(targetElement) {
		 var songItem = getSongItem(targetElement);
		 
		 // if there is no song playing
		 if (currentlyPlayingSong === null) {
			 songItem.innerHTML = pauseButtomTemplate;
			 currentlyPlayingSong = songItem.getAttribute("data-song-number");
		 }
		 // if there is a song playing and you click on the same song to pause it
		 else if (currentlyPlayingSong === songItem.getAttribute("data-song-number")){
			 songItem.innerHTML = playButtonTemplate;
			 currentlyPlayingSong = null;
		 }
		 //if you click on a different song to play something else
		 else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
         	var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
         	currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
         	songItem.innerHTML = pauseButtomTemplate;
         	currentlyPlayingSong = songItem.getAttribute('data-song-number');
     	}
	 };

 window.onload = function() {
     setCurrentAlbum(albumMarconi);
	 
	 /*This function states that when the mouse is over a certain row that the playbuttom icon will be displayed. The condition that controls this function will only show the play buttom icon if the song is not a curently playing song.*/
	 songListContainer.addEventListener('mouseover', function(event) {
		if (event.target.parentElement.className === 'album-view-song-item') {
			/* getSongItem(event.target) finds the element that holds the number*/
			//console.log(getSongItem(event.target));
			var songItem = getSongItem(event.target);
			if (songItem.getAttribute('data-song-number') != currentlyPlayingSong) {
				songItem.innerHTML = playButtonTemplate;
			}
		}
	 });
	 
	 /*once the mouse leaves the certain row the function will exicute and not display the play buttom but rather display the number. The condition that allows for this will only run if the song is not playing*/
	 for (var i = 0; i < songRows.length; i++) {
         songRows[i].addEventListener('mouseleave', function(event) {
             var songItem = getSongItem(event.target);
			 var songItemNumber = songItem.getAttribute('data-song-number');
			  if (songItemNumber != currentlyPlayingSong) {
				  songItem.innerHTML = songItemNumber;
			  }
         });
		 
		songRows[i].addEventListener('click', function(event) {
			clickHandler(event.target);
		});
		 
     }
 };