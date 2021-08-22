class ParticleNoise {
  constructor() {
    this.xNoise = new NoiseLoop(0.5, -width, width * 2);
    this.yNoise = new NoiseLoop(0.5, -height, height * 2);
    this.dNoise = new NoiseLoop(7, 10, 120);
   
  }

  cambiarColor(ColorParticula){
    let [Rmax, Rmin] = this.CalcularRango(red(ColorParticula));
    let [Gmax, Gmin] = this.CalcularRango(green(ColorParticula));
    let [Bmax, Bmin] = this.CalcularRango(blue(ColorParticula));
    this.rNoise = new NoiseLoop(7, Rmin, Rmax);
    this.gNoise = new NoiseLoop(7, Gmin, Gmax);
    this.bNoise = new NoiseLoop(7, Bmin, Bmax);
  }

  render(a) {
    noStroke();
    let x = this.xNoise.value(a);
    let y = this.yNoise.value(a);
    let d = this.dNoise.value(a);
    let r = this.rNoise.value(a);
    let g = this.gNoise.value(a);
    let b = this.bNoise.value(a);
    fill(r, g, b, 200);
    ellipse(x, y, d);
  }

  CalcularRango(Nivel) {
    let Amplitud = floor(random(10, 150));
    let NivelMax = Nivel + Amplitud;
    let NivelMin = Nivel - Amplitud;
    NivelMax = constrain(NivelMax, 0, 255);
    NivelMin = constrain(NivelMin, 0, 255);
    return [NivelMax, NivelMin];
  }
}
