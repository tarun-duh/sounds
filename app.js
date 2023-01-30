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
    const activeBar = document.querySelectorAll(`.b${step}`);
    console.log(step);
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
});
drumkit.playBtn.addEventListener("click", function () {
  drumkit.start();
});
