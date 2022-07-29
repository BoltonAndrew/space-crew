(() => {
  //Create the game, passing the relevant div
  const overworld = new Overworld({
    element: document.querySelector(".game-container"),
  });

  //Start all game logic.
  overworld.init();
})();
