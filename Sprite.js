class Sprite {
  constructor(config) {
    //Set up sprite Image
    this.image = new Image();
    this.image.src = config.src;
    this.image.onload = () => {
      this.isLoaded = true;
    };

    //Set up shadow Image
    this.shadow = new Image();
    this.useShadow = true;
    if (this.useShadow) {
      this.shadow.src = "./assets/characters/shadow.png";
    }
    this.shadow.onload = () => {
      this.isShadowLoaded = true;
    };

    //Configure animation and initial state
    this.animations = config.animations || {
      "idle-down": [[0, 0]],
      "idle-right": [[0, 1]],
      "idle-up": [[0, 2]],
      "idle-left": [[0, 3]],
      "walk-down": [
        [1, 0],
        [0, 0],
        [3, 0],
        [0, 0],
      ],
      "walk-right": [
        [1, 1],
        [0, 1],
        [3, 1],
        [0, 1],
      ],
      "walk-up": [
        [1, 2],
        [0, 2],
        [3, 2],
        [0, 2],
      ],
      "walk-left": [
        [1, 3],
        [0, 3],
        [3, 3],
        [0, 3],
      ],
    };

    //The current animation array set e.g. "walk-left"
    this.currentAnimation = config.currentAnimation;
    //Which frame of the current animation the sprite is on
    this.currentAnimationFrame = config.currentAnimationFrame || 0;

    //Time between animation frames, defaults at 8 and moves down
    this.animationFrameLimit = config.animationFrameLimit || 8;
    this.animationFrameProgress = this.animationFrameLimit;

    //Reference the game object that created this sprite
    this.gameObject = config.gameObject;
  }

  //Get current animation frame
  get frame() {
    return this.animations[this.currentAnimation][this.currentAnimationFrame];
  }

  //Make current animation frame the current key, this switches between L/R/U/D
  setAnimation(key) {
    if (this.currentAnimation !== key) {
      this.currentAnimation = key;
      this.currentAnimationFrame = 0;
      this.animationFrameProgress = this.animationFrameLimit;
    }
  }

  //Reduce the counter between frame changes unless it's 0, then move onto following frame, if the frames have ended, restart from first frame
  updateAnimationProgress() {
    if (this.animationFrameProgress > 0) {
      this.animationFrameProgress -= 1;
      return;
    }

    this.animationFrameProgress = this.animationFrameLimit;
    this.currentAnimationFrame += 1;

    if (this.frame === undefined) {
      this.currentAnimationFrame = 0;
    }
  }

  //Draw sprite on screen based on x/y coords and the position of the main character/current camera focus point
  draw(ctx, cameraPerson) {
    const x = this.gameObject.x - 8 + utils.withGrid(10.5) - cameraPerson.x;
    const y = this.gameObject.y - 18 + utils.withGrid(6) - cameraPerson.y;

    const [frameX, frameY] = this.frame;

    this.isShadowLoaded && ctx.drawImage(this.shadow, x, y);
    this.isLoaded &&
      ctx.drawImage(this.image, frameX * 32, frameY * 32, 32, 32, x, y, 32, 32);

    this.updateAnimationProgress();
  }
}
