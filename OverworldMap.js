class OverworldMap {
  constructor(config) {
    //Create map items for creating scenes
    this.gameObjects = config.gameObjects;
    this.walls = config.walls || {};

    //Lower image vars
    this.lowerImage = new Image();
    this.lowerImage.src = config.lowerSrc;

    //Upper image vars
    this.upperImage = new Image();
    this.upperImage.src = config.upperSrc;
  }

  //Draw lower image with player at center
  drawLowerImage(ctx, cameraPerson) {
    ctx.drawImage(
      this.lowerImage,
      utils.withGrid(10.5) - cameraPerson.x,
      utils.withGrid(6) - cameraPerson.y
    );
  }

  //Draw upper image with player at center
  drawUpperImage(ctx, cameraPerson) {
    ctx.drawImage(
      this.upperImage,
      utils.withGrid(10.5) - cameraPerson.x,
      utils.withGrid(6) - cameraPerson.y
    );
  }

  isSpaceTaken(currentX, currentY, direction) {
    const { x, y } = utils.nextPosition(currentX, currentY, direction);
    return this.walls[`${x},${y}`] || false;
  }

  mountObjects() {
    Object.values(this.gameObjects).forEach((o) => {
      o.mount(this);
    });
  }

  addWall(x, y) {
    this.walls[`${x},${y}`] = true;
  }

  removeWall(x, y) {
    delete this.walls[`${x},${y}`];
  }

  moveWall(wasX, wasY, direction) {
    this.removeWall(wasX, wasY);
    const { x, y } = utils.nextPosition(wasX, wasY, direction);
    this.addWall(x, y);
  }
}

//Scene objects including images and coords
window.OverworldMaps = {
  DemoRoom: {
    lowerSrc: "./assets/maps/DemoLower.png",
    upperSrc: "./assets/maps/DemoUpper.png",
    gameObjects: {
      hero: new Person({
        isPlayerControlled: true,
        x: utils.withGrid(5),
        y: utils.withGrid(6),
        src: "./assets/characters/people/hero.png",
      }),
      npc1: new Person({
        x: utils.withGrid(7),
        y: utils.withGrid(9),
        currentAnimation: "idle-left",
      }),
    },
    walls: {
      [utils.asGridCoord(0, 4)]: true,
      [utils.asGridCoord(0, 5)]: true,
      [utils.asGridCoord(0, 6)]: true,
      [utils.asGridCoord(0, 7)]: true,
      [utils.asGridCoord(0, 8)]: true,
      [utils.asGridCoord(0, 9)]: true,
      [utils.asGridCoord(1, 10)]: true,
      [utils.asGridCoord(2, 10)]: true,
      [utils.asGridCoord(3, 10)]: true,
      [utils.asGridCoord(4, 10)]: true,
      [utils.asGridCoord(5, 11)]: true,
      [utils.asGridCoord(6, 10)]: true,
      [utils.asGridCoord(7, 10)]: true,
      [utils.asGridCoord(8, 10)]: true,
      [utils.asGridCoord(9, 10)]: true,
      [utils.asGridCoord(10, 10)]: true,
      [utils.asGridCoord(11, 9)]: true,
      [utils.asGridCoord(11, 8)]: true,
      [utils.asGridCoord(11, 7)]: true,
      [utils.asGridCoord(11, 6)]: true,
      [utils.asGridCoord(11, 5)]: true,
      [utils.asGridCoord(11, 4)]: true,
      [utils.asGridCoord(1, 3)]: true,
      [utils.asGridCoord(2, 3)]: true,
      [utils.asGridCoord(3, 3)]: true,
      [utils.asGridCoord(4, 3)]: true,
      [utils.asGridCoord(5, 3)]: true,
      [utils.asGridCoord(7, 3)]: true,
      [utils.asGridCoord(9, 3)]: true,
      [utils.asGridCoord(10, 3)]: true,
      [utils.asGridCoord(6, 4)]: true,
      [utils.asGridCoord(8, 4)]: true,
      [utils.asGridCoord(7, 6)]: true,
      [utils.asGridCoord(8, 6)]: true,
      [utils.asGridCoord(7, 7)]: true,
      [utils.asGridCoord(8, 7)]: true,
    },
  },
  Kitchen: {
    lowerSrc: "./assets/maps/KitchenLower.png",
    upperSrc: "./assets/maps/KitchenUpper.png",
    gameObjects: {
      hero: new Person({
        isPlayerControlled: true,
        x: 3,
        y: 5,
        src: "./assets/characters/people/hero.png",
      }),
      npc1: new Person({
        x: 9,
        y: 6,
      }),
      npc2: new Person({
        x: 9,
        y: 8,
        src: "./assets/characters/people/npc2.png",
      }),
      npc3: new Person({
        x: 6,
        y: 6,
        src: "./assets/characters/people/npc3.png",
      }),
    },
  },
};
