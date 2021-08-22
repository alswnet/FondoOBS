class StartField extends Animacion {
  constructor() {
    super();
    this.ColorBase = ObtenerColor(null);
    this.ColorLinea = ObtenerColor(null);
    this.ColorSecundario = color(0);
    this.stars = [];
    this.Iniciar();
  }

  Iniciar() {
    this.speed = floor(random(40, 60));
    this.cantidadStars = floor(random(400, 1000));
    this.stars = new Array(this.cantidadStars);
    for (let i = 0; i < this.stars.length; i++) {
      this.stars[i] = new Star(this.speed);
      this.stars[i].cambiarColor(this.ColorBase, this.ColorLinea);
    }
  }

  Actualizar() {
    for (var i = 0; i < this.stars.length; i++) {
      this.stars[i].update();
    }
  }

  Dibujar() {
    translate(width / 2, height / 2);
    background(this.ColorSecundario);
    for (var i = 0; i < this.stars.length; i++) {
      this.stars[i].show();
    }
  }

  CambiarColorBase(NuevoColor) {
    super.CambiarColorBase(NuevoColor);
    for (let i = 0; i < this.stars.length; i++) {
      this.stars[i].cambiarColor(this.ColorBase, this.ColorLinea);
    }
  }

  CambiarColorLinea(NuevoColor) {
    super.CambiarColorLinea(NuevoColor);
    for (let i = 0; i < this.stars.length; i++) {
      this.stars[i].cambiarColor(this.ColorBase, this.ColorLinea);
    }
  }
}
