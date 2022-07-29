class GameObject {
  constructor(config) {
    this.id = null;
    this.isMounted = false;
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

    //Behaviour default values
    this.behaviourLoop = config.behaviourLoop || [];
    this.behaviourLoopIndex = 0;

    this.talking = config.talking || [];
  }

  //Create both a collision block for a GameObject and trigger any behaviour associated
  mount(map) {
    this.isMounted = true;
    map.addWall(this.x, this.y);

    setTimeout(() => {
      this.doBehaviourEvent(map);
    }, 10);
  }

  update() {}

  //Triggers a behaviour
  async doBehaviourEvent(map) {
    //Don't do behaviour if something more important is happening or if there is no behaviour for this Game Object
    if (
      map.isCutscenePlaying ||
      this.behaviourLoop.length === 0 ||
      this.isStanding
    ) {
      return;
    }

    //Sets up which part of the event we are on and which asset the event is tied to
    let eventConfig = this.behaviourLoop[this.behaviourLoopIndex];
    eventConfig.who = this.id;

    //Create an event instance out of the next event config
    const eventHandler = new OverworldEvent({ map, event: eventConfig });
    await eventHandler.init();

    //Incrementing the event loop iterator
    this.behaviourLoopIndex += 1;
    if (this.behaviourLoopIndex === this.behaviourLoop.length) {
      this.behaviourLoopIndex = 0;
    }

    //Move onto the next iteration of the event.
    this.doBehaviourEvent(map);
  }
}
