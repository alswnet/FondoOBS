class Animacion {
  constructor() {
    this.Modo = "normal";
    this.ColorBase;
    this.ColorSecundario;
    this.ColorLinea;
    this.Arcoiris = false;
    this.ArcoirisEsperaMinima = 5;
    this.ArcoirisEsperaMaxima = 300;
    this.ArcoirisTiempo = 0;
    this.ArcoirisEspera = 10;
    this.TiempoFPS = 0;
    this.EsperaFPS = 1;
    this.FPS = 60;
  }

  Iniciar() {
    this.ArcoirisTiempo = millis();
    this.ArcoirisEspera = floor(random(this.ArcoirisEsperaMinima, this.ArcoirisEsperaMaxima));;
  }

  Actualizar() { }

  Dibujar() {
    if (millis() - this.TiempoFPS > this.EsperaFPS * 1000) {
      if (clientMQTT != undefined) {
        clientMQTT.publish("alsw/fondoOBS/fps", frameRate().toFixed(0));
      }
      this.TiempoFPS = millis();
      // print(`FPS: ${frameRate().toFixed(2)}`);
    }
    if (this.Arcoiris) {
      if (millis() - this.ArcoirisTiempo > this.ArcoirisEspera * 1000) {
        let CualCambiar = floor(random(0, 10));
        let R = floor(random(0, 255));
        let G = floor(random(0, 255));
        let B = floor(random(0, 255));
        let ColorRandom = color(R, G, B);
        if (CualCambiar <= 1) {
          this.CambiarColorBase(ColorRandom);
        } else if (CualCambiar <= 4) {
          this.CambiarColorSecundario(ColorRandom);
        } else if (CualCambiar <= 9) {
          this.CambiarColorLinea(ColorRandom);
        } else {
          this.CambiarColorBase(ColorRandom);
          this.CambiarColorSecundario(ColorRandom);
          this.CambiarColorLinea(ColorRandom);
        }
        this.ArcoirisTiempo = millis();
        this.ArcoirisEspera = floor(random(this.ArcoirisEsperaMinima, this.ArcoirisEsperaMaxima));
        print("Color Arcoiris: " + CualCambiar + " - " + ColorRandom + " - " + this.ArcoirisEspera + "s");
      }
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

  CambiarArcoiris(Estado) {

    if (Estado == "true") {
      this.Arcoiris = true;
    } else if (Estado == "false") {
      this.Arcoiris = false;
    } else if (Estado == "cambiar" || Estado == "c") {
      this.Arcoiris = !this.Arcoiris;
    }
    print("Modo Arcoíris: " + this.Arcoiris);
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
