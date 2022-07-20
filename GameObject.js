class GameObject {
  constructor(config) {
    //Starting x/y coords and direction of game object
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.direction = config.direction || "down";

    //Sprite info of game object
    this.sprite = new Sprite({
      gameObject: this,
      src: config.src || "./assets/characters/people/npc1.png",
      currentAnimation: config.currentAnimation || "idle-down",
    });
  }

  update() {}
}
