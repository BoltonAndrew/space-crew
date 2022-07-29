class SceneTransition {
  constructor() {
    //Used to store the created div to display scene transition
    this.element = null;
  }
  //Create transition div and add SceneTransition class name to the div
  createElement() {
    this.element = document.createElement("div");
    this.element.classList.add("SceneTransition");
  }
  //Add fadeout flag to class names of div to initiate the second portion of the transition
  fadeOut() {
    this.element.classList.add("fade-out");
    this.element.addEventListener(
      "animationend",
      () => {
        this.element.remove();
      },
      { once: true }
    );
  }

  init(container, callback) {
    this.createElement();
    container.appendChild(this.element);
    //Starts the first portion of the transition
    this.element.addEventListener(
      "animationend",
      () => {
        callback();
      },
      { once: true }
    );
  }
}
