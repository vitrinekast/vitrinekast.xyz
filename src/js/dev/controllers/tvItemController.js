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
