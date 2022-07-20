class Overworld {
  constructor(config) {
    this.element = config.element; //
    this.canvas = this.element.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.map = null;
  }

  startGameLoop() {
    const step = () => {
      //Clear off the canvas between frames
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      Object.values(this.map.gameObjects).forEach((object) => {
        object.update({
          arrow: this.directionInput.direction,
        });
      });

      //Establish the camera person
      const cameraPerson = this.map.gameObjects.hero;

      //Draw the background of the map
      this.map.drawLowerImage(this.ctx, cameraPerson);

      //Draw the Game Objects in the map
      Object.values(this.map.gameObjects).forEach((object) => {
        object.sprite.draw(this.ctx, cameraPerson);
      });

      //Draw the upper layer of the map
      this.map.drawUpperImage(this.ctx, cameraPerson);

      //Frame rate of the browser
      requestAnimationFrame(() => {
        step();
      });
    };
    step();
  }

  init() {
    this.map = new OverworldMap(window.OverworldMaps.DemoRoom);

    this.directionInput = new DirectionInput();
    this.directionInput.init();
    this.directionInput.direction;

    this.startGameLoop();
  }
}
