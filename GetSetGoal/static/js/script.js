const modalAvatar = document.querySelector(".modal-avatar")

const ChooseAvartar = (idx) =>{
    modalAvatar.classList.remove("flex")
}

// window.addEventListener("load", (event) => {
//     modalAvatar.classList.add("flex")
// });

let player;
const lpImage = document.getElementById('lpImage');
const buttonImage = document.getElementById('buttonImage');
const modal_music = document.getElementById('modal-music');
const musicInput = document.getElementById('musicLink');

// เพิ่ม YouTube API
function loadYouTubeAPI() {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

// สร้าง YouTube Player
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '0',
        width: '0',
        playerVars: {
            'autoplay': 0,
            'controls': 0,
            'playsinline': 1
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    // Player is ready
    console.log('Player is ready');
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        lpImage.classList.add('spin-animation');
    } else {
        lpImage.classList.remove('spin-animation');
    }
}

function getYouTubeVideoId(url) {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length == 11) ? match[7] : false;
}

function playMusic() {
    const videoUrl = musicInput.value.trim();
    const videoId = getYouTubeVideoId(videoUrl);
    
    if (videoId) {
        player.loadVideoById(videoId);
        closeModal();
    } else {
        alert('Please enter a valid YouTube URL');
    }
}

// Enter key handler for input field
musicInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        playMusic();
    }
});

lpImage.addEventListener('click', () => {
    if (player && typeof player.getPlayerState === 'function') {
        if (player.getPlayerState() === YT.PlayerState.PLAYING) {
            player.pauseVideo();
        } else {
            player.playVideo();
        }
    }
});

buttonImage.addEventListener('click', () => {
    modal_music.classList.remove('close');
});

function closeModal() {
    modal_music.classList.add('close');
}

// Load YouTube API when page loads
loadYouTubeAPI();

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