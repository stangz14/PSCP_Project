const modalAvatar = document.querySelector(".modal-avatar")
const avatarBox = document.querySelector("#avatar-box")
let avartarId = 0

const ChooseAvartar = (idx) =>{
    modalAvatar.classList.remove("flex")
    modalAvatar.classList.add("hidden")
    avartarId = idx 
    updateAvtar()
}

window.addEventListener("load", (event) => {
    if (!avartarId){
        modalAvatar.classList.add("flex")
    modalAvatar.classList.remove("hidden")
    }
});

const updateAvtar = () => {
    if (avartarId){
        let avatarImg = document.createElement('img')
    
        if (avartarId == 1){
            avatarImg.src = "../static/img/avartars/Cat_01_new.png"
            avatarBox.classList.add('small')
        }
    
        if (avartarId == 4){
            avatarImg.src = "../static/img/avartars/Duck_01_new.png"
            avatarBox.classList.add('small')
        }
    
        if (avartarId == 7){
            avatarImg.src = "../static/img/avartars/Nobita_01_new.png"
            avatarBox.classList.add('small')
        }
    
        if (avartarId == 2){
            avatarImg.src = "../static/img/avartars/Cat_02_new.png"
            avatarBox.classList.add('mid')
        }
    
        if (avartarId == 5){
            avatarImg.src = "../static/img/avartars/Duck_02_new.png"
            avatarBox.classList.add('mid')
        }
    
        if (avartarId == 8){
            avatarImg.src = "../static/img/avartars/Nobita_02_new.png"
            avatarBox.classList.add('mid')
        }
    
        if (avartarId == 3){
            avatarImg.src = "../static/img/avartars/Cat_03_new.png"
            avatarBox.classList.add('big')
        }
    
        if (avartarId == 6){
            avatarImg.src = "../static/img/avartars/Duck_03_new.png"
            avatarBox.classList.add('big')
        }
    
        if (avartarId == 9){
            avatarImg.src = "../static/img/avartars/Nobita_03_new.png"
            avatarBox.classList.add('big')
        }
    
        avatarBox.appendChild(avatarImg)
    }
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
const modal_result = document.getElementById("modal-result")

buttonImage.addEventListener('click', () => {
    modal_music.classList.remove('close');
});

function closeModal() {
    modal_music.classList.add('close');
    modal_result.classList.add('hidden');
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


// ##########################################################################
// Clock

let timer;
let ReadTime = 25
let RelaxTime = 5
let ReadTimeSec = 0
let RelaxTimeSec = 0
let ReadTimeRemaining = (ReadTime * 60) + ReadTimeSec; // 25 นาทีในวินาที
let RelaxTimeRemaining = (RelaxTime * 60) + RelaxTimeSec; // 5 นาทีในวินาที
let round = 0
let isRunning = false
let isRelax = false
let autoMode = true
let stopMode = false
let timeCount = 0
let focusTime = "#readMin"

const toggleButton = document.querySelector('#toggle')
const RelaxTimeDisplay = document.querySelector("#relaxTimeDisplay")
const ReadTimeDisplay = document.querySelector("#readTimeDisplay")
const ModeDisplay = document.querySelector("#modeDisplay")
const AutoModeBtn = document.querySelector("#autoMode")
const CustomModeBtn = document.querySelector("#customMode")

const resetClock = () =>{
    stopMode = true
    modal_result.classList.remove("hidden")
    modal_result.classList.add("flex")
    timeCount = timeCount + ((ReadTime * 60) + ReadTimeSec - ReadTimeRemaining)
    console.log(timeCount)
    startTimer()
    ReadTime = 25
    RelaxTime = 5
    ReadTimeRemaining = (ReadTime * 60) + ReadTimeSec;
    RelaxTimeRemaining = (RelaxTime * 60) + RelaxTimeSec; 
    stopMode = false
    updateRelaxDisplay()
    updateReadDisplay()
}


const changeAutomode = () => { 
    if (!isRunning){
        timeCount = 0
        autoMode = true
        ModeDisplay.textContent = 'Auto'
        AutoModeBtn.classList.add("active")
        CustomModeBtn.classList.remove("active")
        document.querySelector(focusTime).classList.remove("custome-focus")
        ReadTime = 25
        RelaxTime = 5
        ReadTimeSec = 0
        RelaxTimeSec = 0
        ReadTimeRemaining = (ReadTime * 60) + ReadTimeSec;
        RelaxTimeRemaining = (RelaxTime * 60) + RelaxTimeSec;
        updateRelaxDisplay()
        updateReadDisplay()
    }
}
const changeCustommode = () => { 
    if (!isRunning) {
        timeCount = 0
        autoMode = false
        ModeDisplay.textContent = 'Custom'
        CustomModeBtn.classList.add("active")
        AutoModeBtn.classList.remove("active")
        document.querySelector(focusTime).classList.add("custome-focus")
    }
}

const changeTime = (timeNumber) => {
    if (!autoMode){
        document.querySelector(focusTime).classList.remove("custome-focus")
        focusTime = "#" + timeNumber.id
        timeNumber.classList.add('custome-focus')
    }
}

const addTime = () => {
    if (!autoMode){
        switch (focusTime){
            case "#readMin":
                ReadTime = Math.abs((ReadTime + 1) % 60);
                break;
            case "#relaxMin":
                RelaxTime = Math.abs((RelaxTime + 1) % 60);
                break;
            case "#readSec":
                ReadTimeSec = Math.abs((ReadTimeSec + 1) % 60);
                break;
            case "#relaxSec":
                RelaxTimeSec = Math.abs((RelaxTimeSec + 1) % 60);
                break;
            default:
                console.log('err')
                break;
        }
        ReadTimeRemaining = (ReadTime * 60) + ReadTimeSec;
        RelaxTimeRemaining = (RelaxTime * 60) + RelaxTimeSec; 
        updateRelaxDisplay()
        updateReadDisplay()
        document.querySelector(focusTime).classList.add("custome-focus")
    }
}

const reduceTime = () => {
    if (!autoMode){
        switch (focusTime){
            case "#readMin":
                if ((ReadTime - 1) >= 0){
                    ReadTime = Math.abs((ReadTime - 1) % 60);
                } else {
                    ReadTime = 59
                }
                break;
            case "#relaxMin":
                if ((RelaxTime - 1) >= 0){
                    RelaxTime = Math.abs((RelaxTime - 1) % 60);
                } else {
                    RelaxTime = 59
                }
                break;
            case "#readSec":
                if ((ReadTimeSec - 1) >= 0){
                    ReadTimeSec = Math.abs((ReadTimeSec - 1) % 60);
                } else {
                    ReadTimeSec = 59
                }
                break;
            case "#relaxSec":
                if ((RelaxTimeSec - 1) >= 0){
                    RelaxTimeSec = Math.abs((RelaxTimeSec - 1) % 60);
                } else {
                    RelaxTimeSec = 59
                }
                break;
            default:
                console.log('err')
                break;
        }
        ReadTimeRemaining = (ReadTime * 60) + ReadTimeSec;
        RelaxTimeRemaining = (RelaxTime * 60) + RelaxTimeSec; 
        updateRelaxDisplay()
        updateReadDisplay()
        document.querySelector(focusTime).classList.add("custome-focus")
    }
}


function updateRelaxDisplay() {
    const minutes = Math.floor(RelaxTimeRemaining / 60);
    const seconds = RelaxTimeRemaining % 60;
    RelaxTimeDisplay.innerHTML = 
                                    `<h4 class="text-3xl text-black tracking-wide mr-1r">Relax </h4>
                                    <h4 onclick="changeTime(this)" id="relaxMin" class="cursor-pointer text-2xl text-black tracking-wider">${String(minutes).padStart(2, '0')}</h4>
                                    <h4 class="text-2xl text-black">:</h4>
                                    <h4 onclick="changeTime(this)" id="relaxSec" class="cursor-pointer text-2xl text-black tracking-wider">${String(seconds).padStart(2, '0')}</h4>`;
}

function updateReadDisplay() {
    const minutes = Math.floor(ReadTimeRemaining / 60);
    const seconds = ReadTimeRemaining % 60;
    ReadTimeDisplay.innerHTML = 
                                    `<h4 class="text-3xl text-black tracking-wide mr-1r">Read </h4>
                                    <h4 onclick="changeTime(this)" id="readMin" class="cursor-pointer text-2xl text-black tracking-wider">${String(minutes).padStart(2, '0')}</h4>
                                    <h4 class="text-2xl text-black">:</h4>
                                    <h4 onclick="changeTime(this)" id="readSec" class="cursor-pointer text-2xl text-black tracking-wider">${String(seconds).padStart(2, '0')}</h4>`;
}

const startTimer = () => {
    if (!isRunning  && !stopMode){
        document.querySelector(focusTime).classList.remove("custome-focus")
        isRunning = true
        timerLogic();
        
        timer = setInterval(timerLogic, 1000);
    } else{
        stopTimer();
    }
}


const timerLogic = () => {
    if (isRelax) {
        if (RelaxTimeRemaining > 0) {
            RelaxTimeRemaining--;
            updateRelaxDisplay();
        } else {
            RelaxTimeRemaining = RelaxTime * 60; // Reset Relax time
            isRelax = false; // Switch to Read Time
            ReadTimeRemaining = (ReadTime * 60) + ReadTimeSec;
            RelaxTimeRemaining = (RelaxTime * 60) + RelaxTimeSec; 
            updateRelaxDisplay();
            updateReadDisplay();
        }
    } else {
        if (ReadTimeRemaining > 0) {
            ReadTimeRemaining--;
            updateReadDisplay();
        } else {
            timeCount = timeCount + (ReadTime * 60) + ReadTimeSec;
            round = round + 1;
            if (round > 3) {
                round = 0;
                RelaxTimeRemaining = RelaxTimeRemaining * 3;
            }
            ReadTimeRemaining = (ReadTime * 60) + ReadTimeSec;
            isRelax = true; // Switch to Relax time
            updateReadDisplay();
            updateRelaxDisplay();
        }
    }
}



function resetTimer() {
    stopTimer();
    ReadTimeRemaining = ReadTime * 60;
    RelaxTimeRemaining = RelaxTime * 60;
    isRelax = false;
    updateDisplay();
    updateShortDisplay();
}

const stopTimer = () =>{
    clearInterval(timer);
    isRunning = false;
}

updateRelaxDisplay();
updateReadDisplay();
