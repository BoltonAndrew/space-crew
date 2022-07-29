const utils = {
  //Resize x/y coords
  withGrid(n) {
    return n * 16;
  },
  //Return x/y coords as string for object keys
  asGridCoord(x, y) {
    return `${x * 16},${y * 16}`;
  },
  //Movement x/y value change utility
  nextPosition(initialX, initialY, direction) {
    let x = initialX;
    let y = initialY;
    const size = 16;
    if (direction === "left") {
      x -= size;
    } else if (direction === "right") {
      x += size;
    } else if (direction === "up") {
      y -= size;
    } else if (direction === "down") {
      y += size;
    }
    return { x, y };
  },
  //Brings back opposite direction from the given direction
  oppositeDirection(direction) {
    if (direction === "left") {
      return "right";
    }
    if (direction === "right") {
      return "left";
    }
    if (direction === "up") {
      return "down";
    }
    return "up";
  },
  //Custom event builder
  emitEvent(name, detail) {
    const event = new CustomEvent(name, {
      detail,
    });
    document.dispatchEvent(event);
  },
};
