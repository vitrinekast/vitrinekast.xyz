var tvItemController = (function () {
  const MOUSE_OVER_SELECTOR = ".fn-tv-link";
  const LOOP_SELECTOR = ".fn-video-loop";
  const LOOP_DELAY = 4000;

  let loopInterval = false;
  let projectLinks = [];
  let loopIndex = 0;

  var loopToggle;

  var init = function () {
    document.querySelectorAll(MOUSE_OVER_SELECTOR).forEach((link) => {
      link.addEventListener("mouseenter", onMouseEnter);
      link.addEventListener("mouseleave", onMouseLeave);
      projectLinks.push(link);
    });

    loopToggle = document.querySelector(LOOP_SELECTOR);

    loopToggle.addEventListener("click", function (e) {
      e.preventDefault();
      toggleLooptimer();
    });
  };

  var clearTimer = function () {
    removeAllActiveStates();
    loopToggle.removeAttribute("active");
    loopInterval = window.clearInterval(loopInterval);
  };

  var toggleLooptimer = function (forceStop = false) {

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

    var link = projectLinks[loopIndex];
    link.classList.add("active");
    screenController.playItem(link.getAttribute('data-video'));

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

  var onMouseLeave = function (e) {
    toggleLooptimer((forceStop = true));
  };

  return {
    init: init,
  };
})();
