class OverworldEvent {
  constructor({ map, event }) {
    //Current loaded map
    this.map = map;
    //Event details
    this.event = event;
  }

  //Stand animation/movement handler
  stand(resolve) {
    //Which sprite is affected
    const who = this.map.gameObjects[this.event.who];

    //Triggers behaviour
    who.startBehaviour(
      {
        map: this.map,
      },
      {
        type: "stand",
        direction: this.event.direction,
        time: this.event.time,
      }
    );

    //Removes event listener on when emitEvent fires
    const completeHandler = (e) => {
      if (e.detail.whoId === this.event.who) {
        document.removeEventListener("PersonStandComplete", completeHandler);
        resolve();
      }
    };

    //Listens for custom event from emitEvent to trigger animation completion
    document.addEventListener("PersonStandComplete", completeHandler);
  }

  //Walk animation/movement handler
  walk(resolve) {
    //Which sprite is affected
    const who = this.map.gameObjects[this.event.who];

    //Triggers behaviour
    who.startBehaviour(
      {
        map: this.map,
      },
      {
        type: "walk",
        direction: this.event.direction,
        retry: true,
      }
    );

    //Checks if the object/hero that triggerd the custom event matches the current event
    const completeHandler = (e) => {
      if (e.detail.whoId === this.event.who) {
        document.removeEventListener("PersonWalkingComplete", completeHandler);
        resolve();
      }
    };

    //Adds the event listener for PersonWalkingComplete for this particular event
    document.addEventListener("PersonWalkingComplete", completeHandler);
  }

  //Text Box handler
  textMessage(resolve) {
    //If this event requires the gameObject to turn to face the hero
    if (this.event.faceHero) {
      //Grabs relevant gameObj
      const obj = this.map.gameObjects[this.event.faceHero];
      //Uses function to face npc in opposite direction of hero, giving the illusion of turning to the hero
      obj.direction = utils.oppositeDirection(
        this.map.gameObjects["hero"].direction
      );
    }

    //Create new text message event passing the promise resolution
    const message = new TextMessage({
      text: this.event.text,
      onComplete: () => resolve(),
    });
    //Give a location for the text event to appear
    message.init(document.querySelector(".game-container"));
  }

  //Create and run scene transition and change map at peak of transition
  changeMap(resolve) {
    const sceneTransition = new SceneTransition();
    sceneTransition.init(document.querySelector(".game-container"), () => {
      this.map.overworld.startMap(window.OverworldMaps[this.event.map]);
      resolve();

      sceneTransition.fadeOut();
    });
  }

  //Start event
  init() {
    return new Promise((resolve) => {
      this[this.event.type](resolve);
    });
  }
}
