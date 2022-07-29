class RevealingText {
  constructor(config) {
    //Where the revealing text is displayed
    this.element = config.element;
    //What the content is
    this.text = config.text;
    //Spped of the reveal
    this.speed = config.speed || 60;

    this.timeout = null;
    //Flag used to allow Enter input
    this.isDone = false;
  }

  //Typewrite text reveal function
  revealOneCharacter(list) {
    const next = list.splice(0, 1)[0];
    next.span.classList.add("revealed");

    if (list.length > 0) {
      this.timeout = setTimeout(() => {
        this.revealOneCharacter(list);
      }, next.delayAfter);
    } else {
      this.isDone = true;
    }
  }

  //Skip typewriter effect
  warpToDone() {
    clearTimeout(this.timeout);
    this.isDone = true;
    this.element.querySelectorAll("span").forEach((s) => {
      s.classList.add("revealed");
    });
  }

  //Called to start the revealing text event
  init() {
    let characters = [];
    this.text.split("").forEach((character) => {
      let span = document.createElement("span");
      span.textContent = character;
      this.element.appendChild(span);

      characters.push({
        span,
        delayAfter: character === " " ? 0 : this.speed,
      });
    });

    this.revealOneCharacter(characters);
  }
}
