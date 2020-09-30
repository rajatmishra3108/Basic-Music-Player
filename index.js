const music = document.querySelector("audio");
const play = document.getElementById("play");
const img = document.querySelector("img");
const next = document.getElementById("next");
const prev = document.getElementById("prev");

// Play Button
let isPLaying = false;

// Play fun
function playMusic() {
    isPLaying = true;
    music.play();
    play.classList.replace("fa-play", "fa-pause");
    img.classList.add("anim");
}

// Pause fun
function pauseMusic() {
    isPLaying = false;
    music.pause();
    play.classList.replace("fa-pause", "fa-play");
    img.classList.remove("anim");
}

play.addEventListener("click", () => {
    if (isPLaying) {
        pauseMusic();
    } else {
        playMusic();
    }
});

// Music Duration Bar
let progress = document.getElementById('music-duration');
let current_time = document.getElementById('current_time');
let song_duration = document.getElementById('song_duration');

music.addEventListener('timeupdate', progressBar);
function progressBar(event) {
    const { currentTime, duration } = event.srcElement;

    //Progress bar update
    let progress_bar = (currentTime / duration) * 100;
    progress.style.width = `${progress_bar}%`;

    //Time update
    curMin = Math.floor(currentTime / 60);
    curSec = Math.floor(currentTime % 60);
    if(curMin < 10) {
        if(curSec < 10) {
        current_time.innerText = `${0}${curMin}:${0}${curSec}`;
        } else {
        current_time.innerText = `${0}${curMin}:${curSec}`;
        }
    } else {
        current_time.innerText = `${curMin}:${curSec}`;
    }
    sMin = Math.floor(duration / 60);
    sSec = Math.floor(duration % 60);
    if(sMin < 10) {
        if(sSec < 10) {
        song_duration.innerText = `${0}${sMin}:${0}${sSec}`;
        } else {
        song_duration.innerText = `${0}${sMin}:${sSec}`;
        }
    } else {
        song_duration.innerText = `${sMin}:${sSec}`;
    }
}

// Progress bar on click event
durationBar = document.getElementById('progressBar');
durationBar.addEventListener('click', (event)=>{
    let total_song_duration = music.duration;
    let clickedWidth = event.offsetX;
    let totalWidth = event.srcElement.clientWidth;
    let change_time = (clickedWidth / totalWidth) * total_song_duration;
    music.currentTime = change_time;
});

// Previous and Next Button
let songs = [
    {
        name: `music1`,
        title: `Mask Off`,
        artist: `Future`,
    },
    {
        name: `music2`,
        title: `Silence`,
        artist: `Marshmellow`,
    },
    {
        name: `music3`,
        title: `24K Magic`,
        artist: `Bruno Mars`,
    },
];

function loadSong(song) {
    music.src = `music/${song.name}.mp3`;
    img.src = `music logo/${song.name}.jpg`;
    title.innerText = song.title;
    singer.innerText = song.artist;
}

let songIndex = 0;
prev.addEventListener("click", prevSong);
function prevSong() {
    if (songIndex > 0) {
        songIndex -= 1;
    }
    loadSong(songs[songIndex]);
    playMusic();
}

next.addEventListener("click", nextSong);
function nextSong() {
    songIndex += 1;
    loadSong(songs[songIndex]);
    playMusic();
}

// Play next song when current one ends
music.addEventListener('ended', nextSong);