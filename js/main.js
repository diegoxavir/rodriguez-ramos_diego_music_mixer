
//Variables
let theFrogs = document.querySelectorAll(".frog-box img"),
	dropZones = document.querySelectorAll('.drop-zone'),
    draggedFrog;

    ////audio controls////
    const theAudioEl = document.querySelector('#audioEl'),
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
}

function handleDragOver(event) {
    event.preventDefault();
    console.log('dragged over a zone');
}

function handleDrop(event) {
    event.preventDefault();
    console.log('dropped on the zone');


    this.appendChild(draggedFrog)

}

//audio 

function loadAudio() {
    let newSrc = `music/${this.dataset.trackref}.mp3`
    theAudioEl.src = newSrc;
    theAudioEl.load();
    playAudio();
}

function playAudio() {
    theAudioEl.play();
}

function restartAudio() {
    theAudioEl.currentTime = 0;
    playAudio()
}

function pauseAudio() {
    theAudioEl.pause();
}

function setVolume() {
    console.log(this.value);

    theAudioEl.volume = this.value / 100;
    displayVolume();
}

function displayVolume() {
    volAmount.innerText = volSlider.value;
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