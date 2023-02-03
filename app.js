class DrumKit {
  constructor() {
    this.pad = document.querySelectorAll(".pad");
    this.playBtn = document.querySelector(".play");
    this.currenKick = `./allSounds/kick-classic.wav`;
    this.currenSnare = `./allSounds/snare-acoustic01.wav`;
    this.currenHihat = `./allSounds/hihat-acoustic01.wav`;
    this.snareSound = document.querySelector(".snare-sound");
    this.hihatSound = document.querySelector(".hihat-sound");
    this.kickSound = document.querySelector(".kick-sound");
    this.index = 0;
    this.bpm = 120;
    this.isPlaying = null;
    this.select = document.querySelectorAll("select");
  }
  activePad() {
    this.classList.toggle("active");
  }
  repeat() {
    let step = this.index % 8;
    const activeBars = document.querySelectorAll(`.b${step}`);

    ///loop over pads
    activeBars.forEach((bar) => {
      bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
      if (bar.classList.contains(`active`)) {
        if (bar.classList.contains(`kick-pad`)) {
          this.kickSound.currentTime = 0;
          this.kickSound.play();
        }
        if (bar.classList.contains(`snare-pad`)) {
          this.snareSound.currentTime = 0;
          this.snareSound.play();
        }
        if (bar.classList.contains(`hihat-pad`)) {
          this.hihatSound.currentTime = 0;
          this.hihatSound.play();
        }
      }
    });
    this.index++;
  }
  start() {
    let interval = (60 / this.bpm) * 1000;
    if (!this.isPlaying) {
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
    } else {
      clearInterval(this.isPlaying);
      this.isPlaying = null;
    }
  }
  updateBtn() {
    if (!this.isPlaying) {
      this.playBtn.innerText = "Stop";
      this.playBtn.classList.add("active");
    } else {
      this.playBtn.innerText = "Play";
      this.playBtn.classList.remove("active");
    }
  }
  changeSound(e) {
    const selectionName = e.target.name;
    const selectionValue = e.target.value;
    console.log(selectionValue, selectionName);
    switch (selectionName) {
      case "kick-select":
        this.kickSound.src = selectionValue;
        break;
      case "snare-select":
        this.snareSound.src = selectionValue;
        break;
      case "hihat-select":
        this.hihatSound.src = selectionValue;
        break;
    }
  }
}
const drumkit = new DrumKit();
//eventlustner
drumkit.pad.forEach(function (pad) {
  pad.addEventListener("click", drumkit.activePad);
  pad.addEventListener(`animationend`, function () {
    pad.style.animation = "";
  });
});
drumkit.playBtn.addEventListener("click", function () {
  drumkit.updateBtn();
  drumkit.start();
});
drumkit.select.forEach((Select) => {
  Select.addEventListener("click", function (e) {
    drumkit.changeSound(e);
  });
});
