class KeyPressListener {
  constructor(keyCode, callback) {
    //Flag for if key should be listened to
    let keySafe = true;
    //Function checking if key pressed (event.code) matches key being listened for (keyCode) and stops running event
    this.keydownFunction = function (event) {
      if (event.code === keyCode) {
        if (keySafe) {
          keySafe = false;
          //Runs whatever functionality is associated with this key press once
          callback();
        }
      }
    };
    //Function checking if key lifted (event.code) matches key being listened for (keyCode) and allows event to be called in the future
    this.keyupFunction = function (event) {
      if (event.code === keyCode) {
        keySafe = true;
      }
    };
    //Adds both event listeners with relevant functions
    document.addEventListener("keydown", this.keydownFunction);
    document.addEventListener("keyup", this.keyupFunction);
  }
  //When called will remove relevant event listeners for this key
  unbind() {
    document.removeEventListener("keydown", this.keydownFunction);
    document.removeEventListener("keyup", this.keyupFunction);
  }
}
