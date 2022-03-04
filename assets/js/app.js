// checkout: https://codepen.io/Mobius1/pen/ZNgwbr?editors=0010
// checkout :https://codepen.io/cRckls/pen/DJvZXo

var screenController = (function () {
  const SNOW_SELECTOR = ".fn-snow";
  const VCR_SELECTOR = ".fn-vcr";
  const VIDEO_SELECTOR = ".fn-video";
  const PLAYER_SELECTOR = ".fn-videoplayer";

  let effectTimeout = false;

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
    if (!videoplayerEl) return false;

    document.querySelectorAll(VIDEO_SELECTOR).forEach((videoEl) => {
      playlist.push({
        el: videoEl,
        url: videoEl.src,
        slug: videoEl.getAttribute("data-show-slug"),
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

  var playItem = function (show) {
    console.log("playItem", show);
    stopAllItems();

    let target = playlist.filter(
      (item) => item.slug.toLowerCase() === show.toLowerCase()
    );
    target[0]?.el.play();
    target[0]?.el.setAttribute("active", "true");

    toggleTVStateClass("on");
  };
  var toggleTVStateClass = function (className) {
    videoplayerEl.classList.remove("on");
    videoplayerEl.classList.remove("off");

    videoplayerEl.classList.add(className);
  };
  var stopAllItems = function () {
    console.log("stopAllItems");
    toggleTVStateClass("off");
    playlist.forEach((item) => {
      item.el.pause();
      item.el.setAttribute("active", "false");
    });
  };

  var stopItem = function (show) {
    console.log("stopItem: " + show);
    stopAllItems();
  };
  return {
    init: init,
    playItem: playItem,
    stopItem: stopItem,
  };
})();

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var tvItemController = (function () {
  const MOUSE_OVER_SELECTOR = "article a[rel]";

  var init = function () {
    console.log("tvItemController.init");

    let projectLinks = document.querySelectorAll(MOUSE_OVER_SELECTOR);
    projectLinks.forEach((link) => {
      link.addEventListener("mouseenter", onMouseEnter);
      link.addEventListener("mouseleave", onMouseLeave);
    });
    console.log(projectLinks);

    fetch("/tvitems.json")
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  var onMouseEnter = function (e) {
    screenController.playItem(this.getAttribute("rel"));
  };

  var onMouseLeave = function (e) {
    screenController.stopItem(this.getAttribute("rel"));
  };

  return {
    init: init,
  };
})();

window.onload = function () {
  console.log("app.js loaded");

  screenController.init();
  tvItemController.init();

  document.body.classList.add("js-loaded");
};
