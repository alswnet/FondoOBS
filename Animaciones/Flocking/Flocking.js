class Flocking extends Animacion {
  constructor() {
    super();
    this.flock = [];
    this.ColorBase = ObtenerColor(null);
    this.ColorBase.setAlpha(50);
    this.ColorSecundario = color(0);
    this.ColorSecundario.setAlpha(50);
    this.ColorLinea = color(0, 30, 30);
    this.Iniciar();
  }

  Iniciar() {
    this.flock = [];
    for (let i = 0; i < 100; i++) {
      this.flock.push(new Boid());
    }
    for (let boid of this.flock) {
      boid.cambiarColor(this.ColorBase);
    }
  }

  Actualizar() {
    for (let boid of this.flock) {
      boid.bordes(); 
      boid.flock(this.flock);
      boid.actualizar();
    }
  }

  Dibujar() {
    background(this.ColorSecundario);
    for (let boid of this.flock) {
      boid.dibujar();
    }
  }

  CambiarColorBase(NuevoColor) {
    super.CambiarColorBase(NuevoColor);
    // this.ColorBase.setAlpha(50);
    for (let boid of this.flock) {
      boid.cambiarColor(this.ColorBase);
    }
  } 
  CambiarColorLinea(NuevoColor) {
    super.CambiarColorLinea(NuevoColor);
  }

  CambiarColorSecundario(NuevoColor) {
    super.CambiarColorSecundario(NuevoColor);
    this.ColorSecundario.setAlpha(70)
  }
}
