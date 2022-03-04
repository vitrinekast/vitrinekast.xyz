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
