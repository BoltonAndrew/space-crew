class TextMessage {
  constructor({ text, onComplete }) {
    //Text content
    this.text = text;
    //Callback function for when finished
    this.onComplete = onComplete;
    //Used to hold the element that will be created
    this.element = null;
  }

  //Create the element to display the text
  createElement() {
    this.element = document.createElement("div");
    this.element.classList.add("TextMessage");

    //Create next button and paragraph tag to hold content
    this.element.innerHTML = `
            <p class="TextMessage_p"></p>
            <button class="TextMessage_button">Next</button>
        `;
    //Run revealing text event to give typewriter effect
    this.revealingText = new RevealingText({
      element: this.element.querySelector(".TextMessage_p"),
      text: this.text,
    });
    //OnClick handler for skipping text or moving onto next text event
    this.element.querySelector("button").addEventListener("click", () => {
      this.done();
    });
    //keypress handler for skipping text or moving onto next text event
    this.actionListener = new KeyPressListener("Enter", () => {
      this.done();
    });
  }

  //Method for removing the element and running the callback once all text has been displayed
  done() {
    if (this.revealingText.isDone) {
      this.element.remove();
      this.actionListener.unbind();
      this.onComplete();
    } else {
      this.revealingText.warpToDone();
    }
  }

  init(container) {
    this.createElement();
    container.appendChild(this.element);
    this.revealingText.init();
  }
}
