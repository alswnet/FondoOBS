class Animacion {
  constructor() {
    this.Modo = "normal";
    this.ColorBase;
    this.ColorSecundario;
    this.ColorLinea;
  }

  Iniciar() {}

  Actualizar() {}

  Dibujar() {}

  CambiarColorBase(NuevoColor) {
    this.ColorBase = color(NuevoColor);
  }

  CambiarColorLinea(NuevoColor) {
    this.ColorLinea = color(NuevoColor);
  }

  CambiarColorSecundario(NuevoColor) {
    this.ColorSecundario = color(NuevoColor);
  }

  CambiarModo(Modo) {
    console.log("Intentando Cambiar a Modo: " + Modo);
  }
}
