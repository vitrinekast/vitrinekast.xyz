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
