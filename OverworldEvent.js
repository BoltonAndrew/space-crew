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

    //Removes event listener on when emitEvent fires
    const completeHandler = (e) => {
      if (e.detail.whoId === this.event.who) {
        document.removeEventListener("PersonWalkingComplete", completeHandler);
        resolve();
      }
    };

    //Listens for custom event from emitEvent to trigger animation completion
    document.addEventListener("PersonWalkingComplete", completeHandler);
  }

  textMessage(resolve) {
    if (this.event.faceHero) {
      const obj = this.map.gameObjects[this.event.faceHero];
      obj.direction = utils.oppositeDirection(
        this.map.gameObjects["hero"].direction
      );
    }

    const message = new TextMessage({
      text: this.event.text,
      onComplete: () => resolve(),
    });
    message.init(document.querySelector(".game-container"));
  }

  changeMap(resolve) {
    console.log("Change");
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
