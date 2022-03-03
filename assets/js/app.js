let parentRect, snowframe, vcrInterval;

const config = {
  effects: {
    roll: {
      enabled: false,
      options: {
        speed: 1000,
      },
    },
    video: {
      enabled: true,
      options: {
        src: "https://media.w3.org/2010/05/sintel/trailer.mp4",
        blur: 1.2,
      },
    },
    vignette: { enabled: true },
    scanlines: { enabled: true },
    vcr: {
      enabled: true,
      options: {
        opacity: 1,
        miny: 220,
        miny2: 220,
        num: 70,
        fps: 60,
      },
    },
    wobbley: { enabled: true },
    snow: {
      enabled: true,
      options: {
        opacity: 0.2,
      },
    },
  },
};

const onResize = () => {
  parentRect = parent.getBoundingClientRect();

  if (effects.vcr && !!effects.vcr.enabled) {
    generateVCRNoise();
  }
};

const generateSnow = (ctx) => {
  var w = ctx.canvas.width,
    h = ctx.canvas.height,
    d = ctx.createImageData(w, h),
    b = new Uint32Array(d.data.buffer),
    len = b.length;

  for (var i = 0; i < len; i++) {
    b[i] = ((255 * Math.random()) | 0) << 24;
  }

  ctx.putImageData(d, 0, 0);
};

const renderTail = (ctx, x, y, radius) => {
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

const renderTrackingNoise = (radius = 2, xmax, ymax) => {
  const canvas = effects.vcr.node;
  const ctx = effects.vcr.ctx;
  const config = effects.vcr.config;
  let posy1 = config.miny || 0;
  let posy2 = config.maxy || canvas.height;
  let posy3 = config.miny2 || 0;
  const num = config.num || 20;

  if (xmax === undefined) {
    xmax = canvas.width;
  }

  if (ymax === undefined) {
    ymax = canvas.height;
  }

  canvas.style.filter = `blur(${config.blur}px)`;
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

    renderTail(ctx, x, y1, radius);
    renderTail(ctx, x, y2, radius);
  }
  ctx.closePath();
};
const generateVCRNoise = (ctx) => {
  const canvas = effects.vcr.node;
  const config = effects.vcr.config;
  const div = effects.vcr.node;
  console.log(canvas, config, div);

  if (effects.vcr.config.fps >= 60) {
    cancelAnimationFrame(vcrInterval);
    const animate = () => {
      renderTrackingNoise();
      vcrInterval = requestAnimationFrame(animate);
    };

    animate();
  } else {
    clearInterval(vcrInterval);
    vcrInterval = setInterval(() => {
      renderTrackingNoise();
    }, 1000 / effects.vcr.config.fps);
  }
};

const addEffectSnow = () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.classList.add("snow");
  canvas.width = parentRect.width / 2;
  canvas.height = parentRect.height / 2;

  wrapper2.appendChild(canvas);

  effects["snow"] = {
    wrapper: wrapper2,
    node: canvas,
    enabled: true,
    config,
  };

  const animate = () => {
    generateSnow(ctx);
    snowframe = requestAnimationFrame(animate);
  };

  //  make 1 big animate function
  animate();
};

const addEffectVCR = () => {
  const canvas = document.createElement("canvas");
  canvas.classList.add("vcr");
  wrapper2.appendChild(canvas);

  canvas.width = parentRect.width;
  canvas.height = parentRect.height;

  effects["vcr"] = {
    wrapper: wrapper2,
    node: canvas,
    ctx: canvas.getContext("2d"),
    enabled: true,
    config,
  };

  generateVCRNoise();
};

const addEffectsVisual = () => {
  let node = false;
  wrapper = wrapper2;
  wrapper2.classList.add("wobbley");

  var nodeScan = document.createElement("div");
  nodeScan.classList.add("scanlines");
  wrapper2.appendChild(nodeScan);

  var nodeVig = document.createElement("div");
  nodeVig.classList.add("vignette");
  container.appendChild(nodeVig);

  ["wobbley", "scanlines", "vignette"].forEach((eff) => {
    effects[eff] = {
      wrapper,
      node,
      enabled: true,
      config,
    };
  });
};
const addVideo = () => {
  // wrapper2 = parent;
  node = document.createElement("video");
  node.classList.add("video");
  console.log(config);

  node.src = config.effects.video.options.src;
  // node.crossOrigin = 'anonymous';
  node.autoplay = true;
  node.muted = true;
  node.loop = true;
  console.log(node);
  parent.appendChild(node);
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const WRAPPER_SELECTOR = ".fn-screen";
let parent = document.querySelector(WRAPPER_SELECTOR);

let effects = {};

// creating all the elements
const container = document.createElement("div");
container.classList.add("screen-container");

const wrapper1 = document.createElement("div");
wrapper1.classList.add("screen-wrapper");

const wrapper2 = document.createElement("div");
wrapper2.classList.add("screen-wrapper");

const wrapper3 = document.createElement("div");
wrapper3.classList.add("screen-wrapper");

wrapper1.appendChild(wrapper2);
wrapper2.appendChild(wrapper3);

container.appendChild(wrapper1);

parent.parentNode.insertBefore(container, parent);
wrapper3.appendChild(parent);
window.addEventListener("resize", onResize, false);
onResize();
addEffectSnow();
addEffectVCR();
addEffectsVisual();
addVideo();

var screenController = (function () {
  var init = function () {};
  return {
    init: init,
  };
})();

window.onload = function () {
  console.log("app.js loaded");

  screenController.init();

  document.body.classList.add("js-loaded");
};
