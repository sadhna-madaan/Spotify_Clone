console.log('Welcome To Spotify');

//initialize the variables
let songIndex = 0;
let audioElement = new Audio('assests/songs/1.mp3');
let masterplay = document.getElementById('masterplay');
let myprocessbar = document.getElementById('myprocessbar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songitem = Array.from(document.getElementsByClassName('songitem'));
let searchsongname = document.getElementsByClassName('searchsongname');
let searchicon = document.getElementById('searchicon');
let songlist = document.getElementById('songlist');
let song_list_container = document.getElementsByClassName('song_list_container')

let songs = [
    { id: "0", fav: false, songname: "Kahani Suno", filepath: "assests/songs1.mp3", coverpath: "assests/covers/1.jpg" },
    { id: "1", fav: false, songname: "US", filepath: "assests/songs/2.mp3", coverpath: "assests/covers/2.jpg" },
    { id: "2", fav: false, songname: "Tere Vaste", filepath: "assests/songs/3.mp3", coverpath: "assests/covers/3.jpg" },
    { id: "3", fav: false, songname: "Kya Loge Tum", filepath: "assests/songs/4.mp3", coverpath: "assests/covers/4.jpg" },
    { id: "4", fav: false, songname: "Moon Rise", filepath: "assests/songs/5.mp3", coverpath: "assests/covers/5.jpg" },
    { id: "5", fav: false, songname: "Dil Galti Kar Betha Hai", filepath: "assests/songs/6.mp3", coverpath: "assests/covers/6.jpg" },
    { id: "6", fav: false, songname: "What Jhumka?", filepath: "assests/songs/7.mp3", coverpath: "assests/covers/7.jpg" },
    { id: "7", fav: false, songname: "Kesariya", filepath: "assests/songs/8.mp3", coverpath: "assests/covers/8.jpg" },
    { id: "8", fav: false, songname: "Sleepless", filepath: "assests/songs/9.mp3", coverpath: "assests/covers/9.jpg" },
    { id: "9", fav: false, songname: "Shehar De", filepath: "assests/songs/10.mp3", coverpath: "assests/covers/10.jpg" },
]

function play(e) {
    // body...
    if (audioElement.paused || audioElement.currentTime <= 0) {
        console.log(e)
        songIndex = parseInt(e);
        let elem = document.getElementById(e);
        elem.classList.remove('fa-play-circle');
        elem.classList.add('fa-pause-circle');
        audioElement.src = `assests/songs/${songIndex}.mp3`;
        masterSongName.innerText = songs[songIndex].songname;
        console.log(masterSongName);
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterplay.classList.remove('fa-play-circle')
        masterplay.classList.add('fa-pause-circle')
    }
    else {
        console.log(e)
        songIndex = parseInt(e);
        let elem = document.getElementById(e);
        elem.classList.add('fa-play-circle');
        elem.classList.remove('fa-pause-circle');
        audioElement.pause();
        masterplay.classList.remove('fa-pause-circle')
        masterplay.classList.add('fa-play-circle')
        gif.style.opacity = 0;
    }
}

function myfav(e) {
    console.log(e + "yes")
    let element = document.getElementById(e)
    element.classList.toggle('fa-solid')
    element.classList.toggle('active')
    let favsongs = songs.map(s => {
        if (e == s.id && s.fav == false) {
            s.fav = true;
            console.log(s);
            // alert("song added in favorite ");
        }
        else {
            s.fav = false;
            // console.log(s);

        }
        
    }
    );
}

songitem.forEach((element, i) => {
    // console.log(element,i);
    element.getElementsByTagName('img')[0].src = songs[i].coverpath;
    element.getElementsByClassName('songname')[0].innerText = songs[i].songname;
})

// search js
document.getElementById('searchicon').addEventListener('click', () => {
    let searchsongname = document.querySelector('input').value;


    songs.forEach(s => {
        // for (let p in s)
        if (s.songname.toLowerCase() == searchsongname.toLowerCase()) {
            console.log("yes");
            let template = `<div class="songitem">
                    <img src='${s.coverpath}' alt="1">
                    <span class="transform2 songname">${s.songname}</span>
                    <span class="songlistplay"><span class="pd-rt timestamp">05:34 <i id='${s.id}'class="songitemplay fas fa-play-circle" onClick="play(this.id)"></i></span></span>
                </div>`;

            document.getElementById('listcontainer').innerHTML = template;

            // document.getElementById('songlist').style.display="none"
        }
    });
});
//audio.element.play()

//handle play/pause button
masterplay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterplay.classList.remove('fa-play-circle')
        masterplay.classList.add('fa-pause-circle')
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterplay.classList.remove('fa-pause-circle')
        masterplay.classList.add('fa-play-circle')
        gif.style.opacity = 0;
    }
})
//listen to events
audioElement.addEventListener('timeupdate', () => {
    // console.log('timeupdate')
    //update seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    // console.log(progress)
    myprocessbar.value = progress;
})

myprocessbar.addEventListener('change', () => {
    audioElement.currentTime = (myprocessbar.value * audioElement.duration) / 100;
})


const makeallplays = () => {
    Array.from(document.getElementsByClassName('songitemplay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}
Array.from(document.getElementsByClassName('songitemplay')).forEach((element) => {
    console.log(element);
    element.addEventListener('click', (e) => {
        makeallplays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `assests/songs/${songIndex+1}.mp3`;
        console.log(audioElement.src);
        masterSongName.innerText = songs[songIndex].songname;
        console.log(masterSongName);
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterplay.classList.remove('fa-play-circle')
        masterplay.classList.add('fa-pause-circle')
    })
})

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 9) {
        songIndex = 0
    }
    else {
        songIndex += 1;
    }
    audioElement.src = `assests/songs/${songIndex + 1}.mp3`;
    // console.log(masterSongName);
    masterSongName.innerText = songs[songIndex].songname;
    audioElement.currentTime = 0;
    audioElement.play();
    masterplay.classList.remove('fa-play-circle');
    masterplay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = `assests/songs/${songIndex + 1}.mp3`;
    // console.log(masterSongName)
    masterSongName.innerText = songs[songIndex].songname;
    audioElement.currentTime = 0;
    audioElement.play();
    masterplay.classList.remove('fa-play-circle');
    masterplay.classList.add('fa-pause-circle');
})




