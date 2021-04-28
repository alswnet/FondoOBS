class Tereno3D {
  constructor() {
    this.Ancho = floor(30);
    this.AnchoMundo = width * 1.6;
    this.AltoMundo = height;
    this.Columnas = floor(this.AnchoMundo / this.Ancho);
    this.Filas = floor(this.AnchoMundo / this.Ancho);
    this.Color = ObtenerColor("");
    this.Mundo = [];
    this.Ruido = 0;

    for (let x = 0; x < this.Columnas; x++) {
      this.Mundo[x] = [];
      for (var y = 0; y < this.Filas; y++) {
        this.Mundo[x][y] = 0;
      }
    }
    frameRate(20);
  }

  Iniciar() {}

  Actualizar() {
    this.Ruido -= 0.1;
    var YRuido = this.Ruido;
    for (var y = 0; y < this.Filas; y++) {
      var XRuido = 0;
      for (let x = 0; x < this.Columnas; x++) {
        this.Mundo[x][y] = map(noise(XRuido, YRuido), 0, 1, -100, 100);
        XRuido += 0.2;
      }
      YRuido += 0.2;
    }
  }

  Dibujar() {
    background(100, 0, 255);
    rotateX(PI / 3);

    fill(this.Color);
    let ColorFondo = 100;
    fill(ColorFondo);
    stroke(this.Color);
    translate(-this.AnchoMundo / 2, -this.AltoMundo / 2);
    for (var y = 0; y < this.Filas - 1; y++) {
      ColorFondo = map(y, 0, this.Filas, 0, 100);
      fill(ColorFondo);
      beginShape(TRIANGLE_STRIP);
      for (let x = 0; x < this.Columnas; x++) {
        vertex(x * this.Ancho, y * this.Ancho, this.Mundo[x][y]);
        vertex(x * this.Ancho, (y + 1) * this.Ancho, this.Mundo[x][y + 1]);
      }
      endShape();
    }
  }

  CambiarColor(Color) {
    this.Color = Color;
  }
}
