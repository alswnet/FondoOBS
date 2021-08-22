class Star {
  constructor(speed) {
    this.x = random(-width, width);
    this.y = random(-height, height);
    this.z = random(width);
    this.speed = speed;
    this.pz = this.z;
  }

  update() {
    this.z = this.z - this.speed;
    if (this.z < 1) {
      this.z = width;
      this.x = random(-width, width);
      this.y = random(-height, height);
      this.pz = this.z;
    }
  }

  show() {
    fill(this.ColorBase);
    noStroke();

    var sx = map(this.x / this.z, 0, 1, 0, width);
    var sy = map(this.y / this.z, 0, 1, 0, height);

    var r = map(this.z, 0, width, 20, 0);
    ellipse(sx, sy, r, r);

    var px = map(this.x / this.pz, 0, 1, 0, width);
    var py = map(this.y / this.pz, 0, 1, 0, height);

    this.pz = this.z;

    stroke(this.ColorLinea);
    line(px, py, sx, sy);
  }

  cambiarColor(ColorBase, ColorLinea) {
    this.ColorBase = ColorBase;
    this.ColorLinea = ColorLinea;
  }
}
