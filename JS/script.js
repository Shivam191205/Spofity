console.log("Lets begin with some JS")
let songs;
let currentSong = new Audio();
let currFolder;
let currentIndex = 0;

function secondsToMinutes(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }
    const totalSeconds = Math.floor(seconds); // 🔑 remove decimals

    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;

    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function getsongs(folder) {
    currFolder = folder;

    songs = MUSIC[folder] || [];

    let ul = document.querySelector(".songList ul");
    ul.innerHTML = "";

    songs.forEach(song => {
        ul.innerHTML += `
        <li data-song="${song}">
            <img class="invert" src="images/music.svg">
            <div class="info">
                        ${song.replaceAll("%20", " ").replaceAll("/JS/SPOTIFY/songs/", " ").replaceAll("_", " ").replaceAll("Arjan Dhillon", " ").replaceAll("-", " ").replaceAll("Karan Aujla", " ").split("(")[0].split(".")[0]}
            </div>
            <div class="playbtn">
                <span>Play now</span>
                <img class="invert" src="images/play.svg">
            </div>
        </li>`;
    });

    document.querySelectorAll(".songList li").forEach(li => {
        li.addEventListener("click", () => {
            playMusic(li.dataset.song);
        });
    });

    return songs;
}


// for (let index = 0; index < as.length; index++) {
//     const element = as[index];
//     let filename=decodeURIComponent(element.getAttribute("href"))
//     if(filename.endsWith(".m4a") || filename.endsWith(".mp3")){
//         songs.push(`/songs/${filename}`)
//     }
// }
//     return songs;
// }
function playMusic(track, paused = false) {
    if (!track) return;

    currentIndex = songs.indexOf(track);

    currentSong.src = `songs/${currFolder}/${track}`;

    if (!paused) {
        currentSong.play().catch(() => {});
    }

    play.src = "images/pause.svg";
    document.querySelector(".songinfo").innerText =
        track.replaceAll("%20", " ").replaceAll("/JS/SPOTIFY/songs/", " ").replaceAll("_", " ").replaceAll("Arjan Dhillon", " ").replaceAll("-", " ").replaceAll("Karan Aujla", " ").split("(")[0].split(".")[0];
}


function displayAlbums() {
    const artistContainer = document.querySelector(".Artist");
    artistContainer.innerHTML = "";

    Object.keys(MUSIC).forEach(folder => {
        artistContainer.innerHTML += `
        <div class="artist card" data-folder="${folder}">
            <svg class="play" width="48" height="48" viewBox="0 0 64 64">
                <circle cx="32" cy="32" r="32" fill="#1DB954" />
                <polygon points="26,20 26,44 46,32" fill="#121212" />
            </svg>

            <img src="songs/${folder}/card.jpeg" alt="">
            <h2>${folder.replace(/[_-]/g," ")}</h2>
        </div>`;
    });

    // Artist click → load songs
    document.querySelectorAll(".artist").forEach(card => {
    card.addEventListener("click", e => {
        const folder = e.currentTarget.dataset.folder;

        // load new playlist
        songs = getsongs(folder);

        // 🔑 RESET INDEX FOR NEW PLAYLIST
        currentIndex = 0;

        document.querySelector(".left").style.left = "0%";

        // load first song (paused)
        if (songs.length > 0) {
            playMusic(songs[0], true);
        }
    });
});

}

// document.querySelector(".songinfo").innerHTML=track.replaceAll("%20", " ").replaceAll("/JS/SPOTIFY/songs/", " ").replaceAll("_", " ").replaceAll("Arjan Dhillon", " ").replaceAll("-", " ").replaceAll("Karan Aujla", " ").split("(")[0].split(".")[0]
async function main() {
    displayAlbums();

    // Auto-load first artist
    const firstArtist = Object.keys(MUSIC)[0];
    if (!firstArtist) return;

    songs = getsongs(firstArtist);
    playMusic(songs[0], true);

    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play()
            play.src = "images/pause.svg"
        } else {
            currentSong.pause();
            play.src = "images/play.svg"
        }
    })
   previous.addEventListener("click", () => {
    if (currentIndex > 0) {
        playMusic(songs[currentIndex - 1]);
    }
});

   next.addEventListener("click", () => {
    if (currentIndex + 1 < songs.length) {
        playMusic(songs[currentIndex + 1]);
    }
});

    currentSong.addEventListener("timeupdate", () => {
        console.log(currentSong.currentTime, currentSong.duration);
        document.querySelector(".time").innerHTML = `${secondsToMinutes(currentSong.currentTime)}/${secondsToMinutes(currentSong.duration)}`
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    })

    document.querySelector(".seekbar").addEventListener("click", (e) => {
        // console.log(e.target.getBoundingClientRect().width,e.offsetX)
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = (currentSong.duration * percent) / 100;

    })
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0%";
    })
    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-110%";
    })

    
}
main() 
