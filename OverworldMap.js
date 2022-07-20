class OverworldMap {
  constructor(config) {
    this.gameObjects = config.gameObjects;

    this.lowerImage = new Image();
    this.lowerImage.src = config.lowerSrc;

    this.upperImage = new Image();
    this.upperImage.src = config.upperSrc;
  }

  drawLowerImage(ctx, cameraPerson) {
    ctx.drawImage(
      this.lowerImage,
      utils.withGrid(10.5) - cameraPerson.x,
      utils.withGrid(6) - cameraPerson.y
    );
  }

  drawUpperImage(ctx, cameraPerson) {
    ctx.drawImage(
      this.upperImage,
      utils.withGrid(10.5) - cameraPerson.x,
      utils.withGrid(6) - cameraPerson.y
    );
  }
}

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
