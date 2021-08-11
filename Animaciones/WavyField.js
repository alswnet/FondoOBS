// Basado en el trabajo
// title: "Wavy Field"
// author:
//   name: "Stephen Edwards"
// url: "https://editor.p5js.org/sventi555/full/NT68eSZPq"
// source: "https://editor.p5js.org/sventi555/sketches/NT68eSZPq"

class WavyField extends Animacion {
  constructor() {
    super();
    this.numRows = 10;
    this.numCols = 10;
    this.b = 0;
    this.h = 0;
    this.phase = 0;
    this.noiseMax;
    this.vPad;
    this.hPad;
    this.noiseSlider;
    //Colores
    this.ColorBase = ObtenerColor(null);
    this.ColorSecundario = color(0);
    this.ColorLinea = color(0, 30, 30);
    this.GrosorLinea;
    this.Iniciar();
  }

  Iniciar() {
    this.numCols = floor(random(10, 20));
    this.numRows = floor(random(10, 20));
    this.b = width / this.numCols;
    this.h = height / this.numRows;
    this.noiseSlider = floor(random(50, 200));
    this.noiseMax = floor(random(50, 200));
    this.vPad = height / this.noiseMax;
    this.hPad = width / this.noiseMax;
    this.GrosorLinea = random(2, 5);
    noFill();
  }

  Actualizar() {}

  Dibujar() {
    background(this.ColorSecundario);
    strokeWeight(this.GrosorLinea);
    stroke(this.ColorBase);

    for (
      let row = -floor(this.vPad);
      row < this.numRows + ceil(this.vPad);
      row++
    ) {
      beginShape(TRIANGLE_STRIP);
      for (
        let col = -floor(this.hPad);
        col < this.numCols + ceil(this.hPad);
        col++
      ) {
        let xoff = row % 2 == 0 ? 0.5 : 0;
        let x1 = (col + xoff) * this.b;
        let y1 = row * this.h;
        let x2 = (col + 0.5 + xoff) * this.b;
        let y2 = (row + 1) * this.h;
        vertex(
          x1 +
            map(
              noise(x1 / width + this.phase),
              0,
              1,
              -this.noiseMax,
              this.noiseMax
            ),
          y1 +
            map(
              noise(y1 / height + this.phase),
              0,
              1,
              -this.noiseMax,
              this.noiseMax
            )
        );
        vertex(
          x2 +
            map(
              noise(x2 / width + this.phase),
              0,
              1,
              -this.noiseMax,
              this.noiseMax
            ),
          y2 +
            map(
              noise(y2 / height + this.phase),
              0,
              1,
              -this.noiseMax,
              this.noiseMax
            )
        );
      }
      endShape();
    }
    this.phase += 0.01;
  }

  CambiarColorLinea(NuevoColor) {
    this.ColorBase = color(NuevoColor);
  }
}
