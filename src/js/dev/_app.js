window.onload = function () {
  console.log("app.js loaded");

  screenController.init();
  tvItemController.init();

  document.body.classList.add("js-loaded");
};
