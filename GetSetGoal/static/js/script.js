const modalAvatar = document.querySelector(".modal-avatar")
const avatarBox = document.querySelector("#avatar-box")
let avartarId = "C3"

const ChooseAvartar = (idx) =>{
    modalAvatar.classList.remove("flex")
    modalAvatar.classList.add("hidden")
}

// window.addEventListener("load", (event) => {
//     modalAvatar.classList.add("flex")
//     modalAvatar.classList.remove("hidden")
// });

if (avartarId){
    let avatarImg = document.createElement('img')

    if (avartarId == "C1"){
        avatarImg.src = "../static/img/avartars/Cat_01_new.png"
        avatarBox.classList.add('small')
    }

    if (avartarId == "D1"){
        avatarImg.src = "../static/img/avartars/Duck_01_new.png"
        avatarBox.classList.add('small')
    }

    if (avartarId == "N1"){
        avatarImg.src = "../static/img/avartars/Nobita_01_new.png"
        avatarBox.classList.add('small')
    }

    if (avartarId == "C2"){
        avatarImg.src = "../static/img/avartars/Cat_02_new.png"
        avatarBox.classList.add('mid')
    }

    if (avartarId == "D2"){
        avatarImg.src = "../static/img/avartars/Duck_02_new.png"
        avatarBox.classList.add('mid')
    }

    if (avartarId == "N2"){
        avatarImg.src = "../static/img/avartars/Nobita_02_new.png"
        avatarBox.classList.add('mid')
    }

    if (avartarId == "C3"){
        avatarImg.src = "../static/img/avartars/Cat_03_new.png"
        avatarBox.classList.add('big')
    }

    if (avartarId == "D3"){
        avatarImg.src = "../static/img/avartars/Duck_03_new.png"
        avatarBox.classList.add('big')
    }

    if (avartarId == "N3"){
        avatarImg.src = "../static/img/avartars/Nobita_03_new.png"
        avatarBox.classList.add('big')
    }

    avatarBox.appendChild(avatarImg)
}



// ##################################################################

const setting_btn = document.querySelector('.setting-btn')
modal_setting = document.querySelector('.modal-setting')

setting_btn.addEventListener('mouseover', () =>{
    modal_setting = document.querySelector('.modal-setting')
    modal_setting.classList.add("active")
})

setting_btn.addEventListener('mouseout', () =>{
    modal_setting.classList.remove("active")
})

modal_setting.addEventListener('mouseover', () =>{
    modal_setting = document.querySelector('.modal-setting')
    modal_setting.classList.add("active")
    setting_btn.classList.add("rotate-90")
})

modal_setting.addEventListener('mouseout', () =>{
    modal_setting.classList.remove("active")
    setting_btn.classList.remove("rotate-90")
})


// ############################################################################

let player;
let isPlaying = false;

const lpImage = document.getElementById('lpImage');
const modal_music = document.getElementById('modal-music');

buttonImage.addEventListener('click', () => {
    modal_music.classList.remove('close');
});

function closeModal() {
    modal_music.classList.add('close');
}


// 1. Load the IFrame Player API code asynchronously
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 2. Create the player when API is ready
function onYouTubeIframeAPIReady() {
    createPlayer('dQw4w9WgXcQ');
}

function createPlayer(videoId) {
    if (player) {
        player.destroy();
    }
    
    player = new YT.Player('player', {
        height: '1',
        width: '1',
        videoId: videoId,
        playerVars: {
            'autoplay': 0,
            'controls': 0,
            'playsinline': 1,
            'enablejsapi': 1,
            'origin': window.location.origin
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });

    console.log(player)
}

function onPlayerReady(event) {
    console.log('Player is ready');
    updatePlayPauseButton(false);
}

function onPlayerStateChange(event) {
    updatePlayPauseButton(event.data === YT.PlayerState.PLAYING);
}

function updatePlayPauseButton(playing) {
    isPlaying = playing;
        if (isPlaying){
            lpImage.classList.add("spin-animation")
        } else{
            lpImage.classList.remove("spin-animation")
        }
}

function togglePlayPause() {
    if (isPlaying) {
        player.pauseVideo();
    } else {
        player.playVideo();
    }
}

function extractVideoID(url) {
    if (!url) return null;
    
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
        /youtube\.com\/embed\/([^&\n?#]+)/,
        /youtube\.com\/v\/([^&\n?#]+)/
    ];

    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) {
            return match[1];
        }
    }
    return null;
}

function loadNewVideo() {
    const linkInput = document.getElementById('youtubeLink');
    const url = linkInput.value.trim();
    const videoId = extractVideoID(url);

    if (videoId) {
        modal_music.classList.add('close')
        createPlayer(videoId);
    } else {
        alert('Please enter a valid YouTube URL')
    }
}