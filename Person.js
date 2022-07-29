class Person extends GameObject {
  constructor(config) {
    //super(config) creates GameObject class and extends Person off that
    super(config);
    //Sets moving progress to default at zero to make sure not moving on load
    this.movingProgressRemaining = 0;
    this.isStanding = false;

    //Checks if the hero or not
    this.isPlayerControlled = config.isPlayerControlled || false;

    //Instructions for movement based on direction
    this.directionUpdate = {
      up: ["y", -1],
      down: ["y", 1],
      left: ["x", -1],
      right: ["x", 1],
    };
  }

  //Directional input based movement handler
  update(state) {
    if (this.movingProgressRemaining > 0) {
      this.updatePosition();
    } else {
      if (
        !state.map.isCutscenePlaying &&
        this.isPlayerControlled &&
        state.arrow
      ) {
        this.startBehaviour(state, {
          type: "walk",
          direction: state.arrow,
        });
      }
      this.updateSprite(state);
    }
  }

  //Scripted movement based handler
  startBehaviour(state, behaviour) {
    this.direction = behaviour.direction;

    //Walking handler
    if (behaviour.type === "walk") {
      if (state.map.isSpaceTaken(this.x, this.y, this.direction)) {
        behaviour.retry &&
          setTimeout(() => {
            this.startBehaviour(state, behaviour);
          }, 10);
        return;
      }

      state.map.moveWall(this.x, this.y, this.direction);
      this.movingProgressRemaining = 16;
      this.updateSprite(state);
    }

    //Idle handler, including how long to stay idle
    if (behaviour.type === "stand") {
      this.isStanding = true;
      setTimeout(() => {
        utils.emitEvent("PersonStandComplete", {
          whoId: this.id,
        });
        this.isStanding = false;
      }, behaviour.time);
    }
  }

  //Updates position of sprite using directionUpdate object to find x/y and then updates accordingly with the change value
  updatePosition() {
    const [property, change] = this.directionUpdate[this.direction];
    this[property] += change;
    this.movingProgressRemaining -= 1;

    //If movement should stop, emits custom event that's listened for to stop function call
    if (this.movingProgressRemaining === 0) {
      utils.emitEvent("PersonWalkingComplete", { whoId: this.id });
    }
  }

  //Runs setAnimation function with current direction added to movement/lack of movement.
  updateSprite() {
    if (this.movingProgressRemaining > 0) {
      this.sprite.setAnimation("walk-" + this.direction);
      return;
    }
    this.sprite.setAnimation("idle-" + this.direction);
  }
}
