
//Variables
let theFrogs = document.querySelectorAll(".frog-box img"),
	dropZones = document.querySelectorAll('.drop-zone'),
    reset = document.querySelector('#resetBut'),
    draggedFrog,
    currentAudio;

var frogs = document.querySelector(".frog-box img")

    ////audio controls////
    const theAudioEl = document.querySelector('.audioEl'),
            playButton = document.querySelector('#playButton'),
            pauseButton = document.querySelector('#pauseButton'),
            rewindButton = document.querySelector('#rewindButton'),
            volSlider = document.querySelector('#volumeControl'),
            volAmount = document.querySelector('#volumeAmt');
            console.log(playButton)
        

//Functions

function handleStartDrag() {
    console.log('started dragging frog:', this);
    draggedFrog = this;

    const audioId = draggedFrog.dataset.audio;
    const audioElement = document.querySelector(`#${audioId}`);

    audioElement.loop = true;

    audioElement.classList.add('playing');
}

function handleDragOver(event) {
    event.preventDefault();
    console.log('dragged over a zone');
}

function handleDrop(event) {
    event.preventDefault();
    console.log('dropped on the zone');

    this.appendChild(draggedFrog);

    const audioId = draggedFrog.dataset.audio;
    const audioElement = document.querySelector(`#${audioId}`);

    audioElement.play();

    draggedFrog.classList.add("animate");

    if (this.closest('.selection-box')) {
        draggedFrog.classList.remove("animate");
        audioElement.pause();
        audioElement.currentTime = 0;
    }
}
//audio 



function playAudio() {
    const audioElements = document.querySelectorAll('.playing');
    audioElements.forEach(audio => {
        audio.play();
        const frog = document.querySelector(`[data-audio="${audio.id}"]`);
        frog.classList.add("animate");
    });
}

function restartAudio() {
    const audioElements = document.querySelectorAll('.playing');
    audioElements.forEach(audio => {
        audio.currentTime = 0;
        audio.play();
    });
}

function pauseAudio() {
    const audioElements = document.querySelectorAll('.playing');
    audioElements.forEach(audio => {
        audio.pause();
        const frog = document.querySelector(`[data-audio="${audio.id}"]`);
        frog.classList.remove("animate");
    });
}

function setVolume() {
    const volume = this.value / 100;
    const audioElements = document.querySelectorAll('.playing');
    audioElements.forEach(audio => {
        audio.volume = volume;
    });
    displayVolume();
}

function displayVolume() {
    volAmount.innerText = volSlider.value;
}

function refreshPage() {
    location.reload();
}


//calls

theFrogs.forEach(frog => frog.addEventListener("dragstart", handleStartDrag));

dropZones.forEach(zone => zone.addEventListener('dragover', handleDragOver));

dropZones.forEach(zone => zone.addEventListener('drop', handleDrop));

//audio

playButton.addEventListener('click', playAudio);
pauseButton.addEventListener('click', pauseAudio);
rewindButton.addEventListener('click', restartAudio);
volSlider.addEventListener('click', setVolume);
reset.addEventListener('click', resetButton);