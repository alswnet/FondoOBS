class Animacion {
  constructor() {
    this.Modo = "normal";
    this.ColorBase;
    this.ColorSecundario;
    this.ColorLinea;
    this.TiempoFPS = 0;
    this.EsperaFPS = 1;
    this.FPS = 60;
  }

  Iniciar() {}

  Actualizar() {}

  Dibujar() {
    if (millis() - this.TiempoFPS > this.EsperaFPS * 1000) {
      this.TiempoFPS = millis();
      clientMQTT.publish("alsw/fondoOBS/fps", frameRate().toFixed(0));
      // print(`FPS: ${frameRate().toFixed(2)}`);
    }
  }

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
    print("Intentando Cambiar a Modo: " + Modo);
  }

  CambiarFPS(Cantidad) {
    Cantidad = parseInt(Cantidad);
    this.FPS += Cantidad;
    if (this.FPS <= 0) {
      this.FPS = 1;
    }
    print(`Cambiando ${Cantidad} FPS[${this.FPS}]`);
    frameRate(this.FPS);
  }
  
  AsignarFPS(Valor) {
    this.FPS = parseInt(Valor);
    print(`Asignar FPS[${this.FPS}]`);
    storeItem("frame", this.FPS);
    frameRate(this.FPS);
  }
}
