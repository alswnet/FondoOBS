class DVD extends Animacion {
  constructor() {
    super();
    console.log("Iniciando Iniciando el DVD");
    this.ColorBase = ObtenerColor(null);
    this.ColorSecundario = color(0);
    this.ColorLinea = color(0, 30, 30);

    this.Iniciar();
    stroke(this.ColorLinea);
  }

  Iniciar() {
    this.cantidadCajas = floor(random(5, 30));
    this.cajas = new Array(this.cantidadCajas);
    for (let i = 0; i < this.cajas.length; i++) {
      this.cajas[i] = new Caja();
      this.cajas[i].cambiarColor(this.ColorBase);
      this.cajas[i].cambiarBorde(this.ColorLinea);
    }
    background(this.ColorSecundario);
  }

  Actualizar() {
    for (let i = 0; i < this.cajas.length; i++) {
      this.cajas[i].dibujar();
    }
  }

  CambiarColorBase(NuevoColor) {
    this.ColorBase = color(NuevoColor);
    for (let i = 0; i < this.cajas.length; i++) {
      this.cajas[i].cambiarColor(this.ColorBase);
    }
  }

  CambiarColorSecundario(NuevoColor) {
    this.CambiarColorBase(NuevoColor);
  }
}
