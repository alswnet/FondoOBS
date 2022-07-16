class JuegoVida extends Animacion {
  constructor() {
    super();
    console.log("Iniciando Juego de la Vida");
    // Colores Sistema
    this.ColorBase = ObtenerColor(null);
    this.ColorSecundario = color(0);
    this.ColorLinea = color(0, 30, 30);
    this.NivelColor = 5;
    this.ArregloColor = [];
    this.CrearColores();
    this.DimencionMinima = 10;
    this.DimencionMaxima = 20;
    this.Iniciar();
    strokeWeight(2);
  }

  Iniciar() {
    background(this.ColorSecundario);
    this.Modo = "ruido";
    this.Ancho = floor(random(this.DimencionMinima, this.DimencionMaxima));
    this.Columnas = floor(width / this.Ancho);
    this.Filas = floor(width / this.Ancho);
    this.Mundo = [];
    this.MundoColor = [];
    this.MundoColorPasado = [];
    this.MundoSiquiente = [];
    for (let x = 0; x < this.Columnas; x++) {
      this.Mundo[x] = [];
      this.MundoColor[x] = [];
      this.MundoColorPasado[x] = [];
      this.MundoSiquiente[x] = [];
    }

    for (let x = 0; x < this.Columnas; x++) {
      for (let y = 0; y < this.Filas; y++) {
        this.Mundo[x][y] = floor(random(2));

        if (this.Mundo[x][y] >= 1) {
          this.MundoColor[x][y] = this.NivelColor;
        } else {
          this.MundoColor[x][y] = 0;
        }
        this.MundoColorPasado[x][y] = -1;
      }
    }
  }

  Actualizar() {
    let AunVivas = false; // Si no hay mas celular Reinicar el mundos

    for (let x = 0; x < this.Columnas; x++) {
      for (let y = 0; y < this.Filas; y++) {
        let Vecinos = 0;
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            // Revisar los border para no sobrebordar el mundo
            if (!(i == 0 && j == 0)) {
              let Px;
              let Py;

              if (x == 0 && i == -1) {
                Px = this.Columnas - 1;
              } else if (x == this.Columnas - 1 && i == 1) {
                Px = 0;
              } else {
                Px = x + i;
              }

              if (y == 0 && j == -1) {
                Py = this.Filas - 1;
              } else if (y == this.Filas - 1 && j == 1) {
                Py = 0;
              } else {
                Py = y + j;
              }

              Vecinos += this.Mundo[Px][Py];
            }
          }
        }

        if (this.Mundo[x][y] == 1) {
          if (Vecinos > 3 || Vecinos < 2) {
            this.MundoSiquiente[x][y] = 0;
          } else {
            this.MundoSiquiente[x][y] = 1;
          }
        } else {
          if (Vecinos == 3) {
            this.MundoSiquiente[x][y] = 1;
          } else {
            this.MundoSiquiente[x][y] = this.Mundo[x][y];
          }
        }

        if (this.Modo == "ruido" && this.MundoSiquiente[x][y] == 0) {
          if (Vecinos > 1 && random(10000) < 1) {
            this.MundoSiquiente[x][y] = 1;
          }
        }

        if (this.MundoSiquiente[x][y] == 1) {
          this.MundoColor[x][y] = this.NivelColor;
          if (!AunVivas) AunVivas = true;
        } else if (this.MundoColor[x][y] > 0) {
          this.MundoColor[x][y]--;
        }
      }
    }
    let TemporalMundo = this.Mundo;
    this.Mundo = this.MundoSiquiente;
    this.MundoSiquiente = TemporalMundo;

    if (!AunVivas) {
      this.Iniciar();
    }
  }

  Dibujar() {
    super.Dibujar();
    stroke(this.ColorLinea);
    // translate(-width / 2, -height / 2);
    for (let x = 0; x < this.Columnas; x++) {
      for (let y = 0; y < this.Filas; y++) {
        if (this.MundoColorPasado[x][y] != this.MundoColor[x][y]) {
          this.MundoColorPasado[x][y] = this.MundoColor[x][y];
          let ColorActual = this.ArregloColor[this.MundoColor[x][y]];
          fill(ColorActual);
          rect(x * this.Ancho, y * this.Ancho, this.Ancho, this.Ancho);
        }
      }
    }
  }

  CambiarModo(Mensaje) {
    super.CambiarModo(Mensaje);
    if (Mensaje == "normal" || Mensaje == "ruido") {
      console.log("Cambiando a Modo: " + Mensaje);
      this.Modo = Mensaje;
    } else {
      console.log("No Existe Modo: " + Mensaje);
    }
  }

  CambiarColorBase(NuevoColor) {
    super.CambiarColorBase(NuevoColor);
    this.CrearColores();
  }

  CambiarColorLinea(NuevoColor) {
    super.CambiarColorLinea(NuevoColor);
  }

  CambiarColorSecundario(NuevoColor) {
    super.CambiarColorSecundario(NuevoColor);
    this.CrearColores();
  }

  CrearColores() {
    for (let x = 0; x <= this.NivelColor; x++) {
      this.ArregloColor[x] = lerpColor(
        this.ColorSecundario,
        this.ColorBase,
        x / this.NivelColor
      );
    }
    this.ColorLinea = lerpColor(this.ColorBase, this.ColorSecundario, 2 / 3);
  }
}
