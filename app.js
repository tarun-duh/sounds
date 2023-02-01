class DrumKit {
  constructor() {
    this.pad = document.querySelectorAll(".pad");
    this.playBtn = document.querySelector(".play");
    this.snareSound = document.querySelector(".snare-sound");
    this.hihatSound = document.querySelector(".hihat-sound");
    this.kickSound = document.querySelector(".kick-sound");
    this.index = 0;
    this.bpm = 120;
  }
  activePad() {
    this.classList.toggle("active");
  }
  repeat() {
    let step = this.index % 8;
    const activeBars = document.querySelectorAll(`.b${step}`);
    console.log(step);
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
    setInterval(() => {
      this.repeat();
    }, interval);
  }
}
const drumkit = new DrumKit();
drumkit.pad.forEach(function (pad) {
  pad.addEventListener("click", drumkit.activePad);
  pad.addEventListener(`animationend`, function () {
    pad.style.animation = "";
  });
});
drumkit.playBtn.addEventListener("click", function () {
  drumkit.start();
});
