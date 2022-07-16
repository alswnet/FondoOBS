class PerlinNoise extends Animacion {
  constructor() {
    super();
    this.totalFrames = floor(random(300, 600));
    this.ColorBase = ObtenerColor(null);
    this.ColorSecundario = color(0);
    this.ColorLinea = color(0, 30, 30);
    this.particles = [];
    this.Iniciar();
  }

  Iniciar() {
    this.counter = 0;
    this.cantidadParticulas = floor(random(100, 400));
    this.particles = new Array(this.cantidadParticulas);
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i] = new ParticleNoise();
      this.particles[i].cambiarColor(this.ColorBase);
    }
  }

  Actualizar() {
    this.percent = float(this.counter % this.totalFrames) / this.totalFrames;
    this.counter++;
  }

  Dibujar() {
    super.Dibujar();
    background(this.ColorSecundario);
    let a = this.percent * TWO_PI;
    this.particles.forEach((element) => element.render(a));
  }

  CambiarColorBase(NuevoColor) {
    this.ColorBase = color(NuevoColor);
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].cambiarColor(this.ColorBase);
    }
  }

  CambiarColorLinea(NuevoColor) {
    this.ColorLinea = color(NuevoColor);
    this.CambiarColorBase(NuevoColor);
  }

  CambiarColorSecundario(NuevoColor) {
    this.ColorSecundario = color(NuevoColor);
  }
}
