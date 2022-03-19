class Caja {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.xVelocidad = random(-10, 10);
    this.yVelocidad = random(-10, 10);
    this.ancho = random(10, 100);
    this.alto = random(10, 100);
    this.transparencia = random(50, 255);
  }

  dibujar() {
    stroke(this.rBorde, this.gBorde, this.bBorde, this.transparencia);
    fill(this.r, this.g, this.b, this.transparencia);
    rect(this.x, this.y, this.ancho, this.alto);

    this.x += this.xVelocidad;
    this.y += this.yVelocidad;

    if (this.x + this.ancho >= width) {
      this.xVelocidad = -this.xVelocidad;
      this.x = width - this.ancho;
    } else if (this.x <= 0) {
      this.xVelocidad = -this.xVelocidad;
      this.x = 0;
    }

    if (this.y + this.alto >= height) {
      this.yVelocidad = -this.yVelocidad;
      this.y = height - this.alto;
    } else if (this.y <= 0) {
      this.yVelocidad = -this.yVelocidad;
      this.y = 0;
    }
  }

  cambiarColor(ColorCaja) {
    this.r = this.CalcularRango(red(ColorCaja));
    this.g = this.CalcularRango(green(ColorCaja));
    this.b = this.CalcularRango(blue(ColorCaja));
  }

  cambiarBorde(ColorBorde) {
    this.rBorde = this.CalcularRango(red(ColorBorde));
    this.gBorde = this.CalcularRango(green(ColorBorde));
    this.bBorde = this.CalcularRango(blue(ColorBorde));
  }

  CalcularRango(Nivel) {
    let Amplitud = floor(random(10, 150));
    let NivelMax = Nivel + Amplitud;
    let NivelMin = Nivel - Amplitud;
    NivelMax = constrain(NivelMax, 0, 255);
    NivelMin = constrain(NivelMin, 0, 255);
    return random(NivelMin, NivelMax);
  }
}
