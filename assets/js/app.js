var screenController = (function () {
  const SNOW_SELECTOR = ".fn-snow";
  const VCR_SELECTOR = ".fn-vcr";
  const VIDEO_SELECTOR = ".fn-video";
  const PLAYER_SELECTOR = ".fn-videoplayer";

  const STATE_ON = "on";
  const STATE_OFF = "off";
  const STATE_ACTIVE = "active";

  let videoplayerEl, videoEL;
  let playlist = [];

  let screenEffects = {
    snow: {},
    vcr: {
      opacity: 1,
      miny: 220,
      miny2: 220,
      num: 30,
      fps: 60,
    },
  };

  var init = function () {
    videoplayerEl = document.querySelectorAll(PLAYER_SELECTOR)[0];
    this.hasPlayed = false;

    if (!videoplayerEl) return false;

    document.querySelectorAll(VIDEO_SELECTOR).forEach((videoEl) => {
      playlist.push({
        el: videoEl,
        url: videoEl.src,
        fileName: videoEl.getAttribute("data-file"),
        isPlaying: false,
      });
    });

    screenEffects.snow.canvas = document.querySelector(SNOW_SELECTOR);
    screenEffects.snow.ctx = screenEffects.snow.canvas.getContext("2d");

    screenEffects.vcr.canvas = document.querySelector(VCR_SELECTOR);
    screenEffects.vcr.ctx = screenEffects.vcr.canvas.getContext("2d");

    animate();
  };

  const generateVCRNoise = (radius = 2) => {
    if (!screenEffects.vcr) return false;
    const canvas = screenEffects.vcr.canvas;
    const ctx = screenEffects.vcr.ctx;
    let posy1 = screenEffects.vcr.miny || 0;
    let posy2 = screenEffects.vcr.maxy || canvas.height;
    let posy3 = screenEffects.vcr.miny2 || 0;
    const num = screenEffects.vcr.num || 20;
    const xmax = canvas.width;
    const ymax = canvas.height;
    // TODO add below to CSS
    canvas.style.filter = `blur(.1px)`;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = `#fff`;

    ctx.beginPath();
    for (var i = 0; i <= num; i++) {
      var x = Math.random(i) * xmax;
      var y1 = getRandomInt((posy1 += 3), posy2);
      var y2 = getRandomInt(0, (posy3 -= 3));
      ctx.fillRect(x, y1, radius, radius);
      ctx.fillRect(x, y2, radius, radius);
      ctx.fill();

      drawVCRLine(ctx, x, y1, radius / 5);
      drawVCRLine(ctx, x, y2, radius / 5);
    }
    ctx.closePath();
  };

  const drawVCRLine = (ctx, x, y, radius) => {
    const n = getRandomInt(1, 50);

    const dirs = [1, -1];
    let rd = radius;
    const dir = dirs[Math.floor(Math.random() * dirs.length)];
    for (let i = 0; i < n; i++) {
      const step = 0.01;
      let r = getRandomInt((rd -= step), radius);
      let dx = getRandomInt(1, 4);

      radius -= 0.1;

      dx *= dir;

      ctx.fillRect((x += dx), y, r, r);
      ctx.fill();
    }
  };

  var generateSnow = (ctx) => {
    if (!screenEffects.snow) return false;
    var w = screenEffects.snow.ctx.canvas.width,
      h = screenEffects.snow.ctx.canvas.height,
      d = screenEffects.snow.ctx.createImageData(w, h),
      b = new Uint32Array(d.data.buffer),
      len = b.length;

    for (var i = 0; i < len; i++) {
      b[i] = ((255 * Math.random()) | 0) << 24;
    }

    screenEffects.snow.ctx.putImageData(d, 0, 0);
  };

  var animate = function () {
    generateSnow();
    generateVCRNoise();
    requestAnimationFrame(animate);
  };

  var playItem = function (file) {
    stopAllItems();
    this.hasPlayed = true;
    hasPlayed = true;

    console.info("GA: event trigger");
    gtag("event", "watch_video", {
      app_name: "vitrinekast",
      source: file,
    });

    let video = playlist.find((video) => video.fileName === file);
    if (video) {
      video.el.play();
      video.el.setAttribute(STATE_ACTIVE, true);
      toggleTVStateClass(STATE_ON);
    }
  };

  var toggleTVStateClass = function (className) {
    videoplayerEl.classList.remove(STATE_ON);
    videoplayerEl.classList.remove(STATE_OFF);
    videoplayerEl.classList.add(className);
  };

  var stopAllItems = function () {
    toggleTVStateClass(STATE_OFF);
    playlist.forEach((item) => {
      item.el.pause();
      item.el.removeAttribute(STATE_ACTIVE);
    });
  };
  return {
    init: init,
    playItem: playItem,
    stopAllItems: stopAllItems
  };
})();

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var tvItemController = (function () {
  const MOUSE_OVER_SELECTOR = ".fn-tv-link";
  const LOOP_SELECTOR = ".fn-video-loop";
  const LOOP_DELAY = 5000;

  let loopInterval = false;
  let projectLinks = [];
  let loopIndex = 0;

  var loopToggle;
  var isTouch;

  var footerLink;

  var init = function () {
    isTouch = utils.isTouchDevice();
    footerLink = document.body.querySelector(".fn-tv-footer");

    document.querySelectorAll(MOUSE_OVER_SELECTOR).forEach((link) => {
      if (isTouch) {
        link.addEventListener("click", onTouch);
      } else {
        link.addEventListener("mouseenter", onMouseEnter);
        link.addEventListener("mouseleave", onMouseLeave);
      }
      projectLinks.push(link);
    });

    loopToggle = document.querySelector(LOOP_SELECTOR);

    if (loopToggle) {
      loopToggle.addEventListener("click", function (e) {
        e.preventDefault();
        toggleLooptimer();
        console.info("GA: event trigger: toggle timer");
        gtag("event", "watch_video", {
          app_name: "vitrinekast",
          source: "toggle_timer",
        });
      });
    }

    window.setTimeout(function () {
      console.log(screenController.hasPlayed);
      if (!screenController.hasPlayed) {
        console.log("start the loop now");
        toggleLooptimer();
        console.info("GA: event trigger: timeout_autoplay");
        gtag("event", "watch_video", {
          app_name: "vitrinekast",
          source: "timeout_autoplay",
        });
      }
    }, 5000);
  };

  var clearTimer = function () {
    removeAllActiveStates();
    loopToggle.removeAttribute("active");
    loopInterval = window.clearInterval(loopInterval);
  };

  var toggleLooptimer = function (forceStop = false) {
    loopIndex = 0;
    if (loopInterval || forceStop) {
      clearTimer();

      screenController.stopAllItems();
    } else {
      loopToggle.setAttribute("active", true);
      playFromLoopindex();
      loopInterval = window.setInterval(() => {
        playFromLoopindex();
      }, LOOP_DELAY);
    }
  };

  var removeAllActiveStates = function () {
    console.log("removeAllActiveStates");
    projectLinks.forEach((el) => {
      el.classList.remove("active");
    });
  };

  var playFromLoopindex = function () {
    removeAllActiveStates();
    console.log("playFromLoopindex " + loopIndex);

    var link = projectLinks[loopIndex];
    link.classList.add("active");
    screenController.playItem(link.getAttribute("data-video"));

    if (loopIndex === projectLinks.length - 1) {
      loopIndex = 0;
    } else {
      loopIndex++;
    }
  };

  var onMouseEnter = function (e) {
    clearTimer();
    screenController.playItem(this.getAttribute("data-video"));
  };

  var onTouch = function (e) {
    e.preventDefault();
    clearTimer();
    document.body.removeAttribute("footer-visible");
    var href = e.target.getAttribute("href");
    if (href !== "" && href !== null) {
      window.setTimeout(function () {
        document.body.querySelector(".fn-tv-footer").href =
          e.target.getAttribute("href");
        document.body.querySelector(".fn-project-name").textContent =
          e.target.textContent;
        console.log("on touch");
        document.body.setAttribute("footer-visible", true);
      }, 100);
    }

    screenController.playItem(e.target.getAttribute("data-video"));
    document.body.addEventListener("click", onBodyClick, true);
  };

  var onBodyClick = function () {
    console.log("on body click");
    document.body.setAttribute("footer-visible", false);
    toggleLooptimer((forceStop = true));
    document.body.removeEventListener("click", onBodyClick, true);
  };

  var onMouseLeave = function (e) {
    toggleLooptimer((forceStop = true));
  };

  return {
    init: init,
  };
})();

var utils = (function () {
  var isTouchDevice = function() {
    return (
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    );
  }
  return {
    isTouchDevice: isTouchDevice,
  };
})();

window.onload = function () {
  console.log("app.js loaded");

  console.log(utils.isTouchDevice())
  screenController.init();
  tvItemController.init();

  document.body.classList.add("js-loaded");
};
