class DirectionInput {
  constructor() {
    //Keys held, most recent held direction in first spot
    this.heldDirections = [];

    //Key map
    this.map = {
      ArrowUp: "up",
      KeyW: "up",
      ArrowDown: "down",
      KeyS: "down",
      ArrowLeft: "left",
      KeyA: "left",
      ArrowRight: "right",
      KeyD: "right",
    };
  }

  //Getter for current priority direction
  get direction() {
    return this.heldDirections[0];
  }

  init() {
    //Key Down event listener for putting keys in heldDirections array
    document.addEventListener("keydown", (e) => {
      const dir = this.map[e.code];
      if (dir && this.heldDirections.indexOf(dir) === -1) {
        this.heldDirections.unshift(dir);
      }
    });

    //Key Up event listener for removing keys from heldDirections array
    document.addEventListener("keyup", (e) => {
      const dir = this.map[e.code];
      const index = this.heldDirections.indexOf(dir);
      if (index > -1) {
        this.heldDirections.splice(index, 1);
      }
    });
  }
}
