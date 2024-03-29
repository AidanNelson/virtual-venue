export const myOverlay = `<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.7.0/p5.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.7.0/addons/p5.sound.min.js"></script>
<script>
console.log("OKOKOK");
  let fallingKeys = [];
  let newFallingKeyXPosition = 0;
  let socket;
  if (window.location.hostname === "venue.itp.io") {
    socket = io("https://venue.itp.io");
  } else {
    socket = io("http://localhost:3131");
  }

  socket.on("interaction", (msg) => {
    console.log("got interaction msg: ", msg);
    switch (msg.type) {
      case "text":
        // got text interaction
        console.log(msg.data);
        newFallingKeyXPosition += 14;
        if (newFallingKeyXPosition > window.innerWidth) {
          newFallingKeyXPosition = 0;
        }
        fallingKeys.push(new FallingKey(msg.data.key, newFallingKeyXPosition));
        break;
    }
  });

  function setup() {
    createCanvas(windowWidth, windowHeight);
  }
  function draw() {
    // text-based interaction
    for (let i = fallingKeys.length - 1; i >= 0; i--) {
      const key = fallingKeys[i];
      const isAlive = key.update();
      if (!isAlive) {
        fallingKeys.splice(i, 1);
      }
    }
  }

  document.addEventListener("keydown", (ev) => {
    socket.emit("interaction", {
      type: "text",
      data: { key: ev.key },
    });
  });

  // class for falling keys

  class FallingKey {
    constructor(text, xPosition) {
      this.el = document.createElement("p");

      this.lifeForce = 1000 + Math.random() * 1000;
      this.position = {
        x: xPosition,
        y: -100,
      };

      // choose a random image for this box
      // this.el.src = mouseImageURLs[0];
      this.el.innerText = text;

      // apply some styling
      this.el.style.position = "absolute";
      this.el.style.width = "12px";
      this.el.style.height = "12px";

      // set it outside of the visible frame until we have an updated position
      let top = this.position.y + "px";
      let left = this.position.x + "px";
      this.el.style.top = top;
      this.el.style.left = left;

      // add it to the body
      document.body.appendChild(this.el);
    }

    update() {
      // fall from the sky
      this.position.y += 1;

      // set it outside of the visible frame until we have an updated position
      let top = this.position.y + "px";
      let left = this.position.x + "px";
      this.el.style.top = top;
      this.el.style.left = left;

      this.lifeForce--;
      if (this.lifeForce < 0) {
        this.remove();
        return false;
      } else {
        return true;
      }
    }

    remove() {
      document.body.removeChild(this.el);
    }
  }
</script>
`;
