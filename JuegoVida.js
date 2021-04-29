class JuegoVida {
  constructor() {
    console.log("Iniciando Juego de la vida");
    this.Color = ObtenerColor("");
    this.NivelColor = 5;
    this.ColorBase = color(0);
    this.ArregloColor = [];
    this.CrearColores();
    this.Iniciar();
  }

  Iniciar() {
    this.Ancho = floor(random(5, 20));
    this.Columnas = floor(width / this.Ancho);
    this.Filas = floor(width / this.Ancho);
    this.Mundo = [];
    this.MundoColor = [];
    this.MundoSiquiente = [];
    for (let x = 0; x < this.Columnas; x++) {
      this.Mundo[x] = [];
      this.MundoColor[x] = [];
      this.MundoSiquiente[x] = [];
    }

    for (let x = 0; x < this.Columnas; x++) {
      for (let y = 0; y < this.Filas; y++) {
        if (x == 0 || y == 0 || x == this.Columnas - 1 || y == this.Filas - 1) {
          this.Mundo[x][y] = 0;
        } else {
          this.Mundo[x][y] = floor(random(2));
        }

        if (this.Mundo[x][y] >= 1) {
          this.MundoColor[x][y] = this.NivelColor;
        } else {
          this.MundoColor[x][y] = 0;
        }
      }
    }

  }

  Actualizar() {
    for (let x = 1; x < this.Columnas - 1; x++) {
      for (let y = 1; y < this.Filas - 1; y++) {
        let Vecinos = 0;
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            if (!(i == 0 && j == 0)) {
              Vecinos += this.Mundo[x + i][y + j];
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

        if (this.MundoSiquiente[x][y] == 1) {
          this.MundoColor[x][y] = this.NivelColor;
        } else if (this.MundoColor[x][y] > 0) {
          this.MundoColor[x][y]--;
        }
      }
    }
    let TemporalMundo = this.Mundo;
    this.Mundo = this.MundoSiquiente;
    this.MundoSiquiente = TemporalMundo;
  }

  Dibujar() {
    translate(-width / 2, -height / 2);
    for (let x = 0; x < this.Columnas; x++) {
      for (let y = 0; y < this.Filas; y++) {
        let ColorActual = this.ArregloColor[this.MundoColor[x][y]];
        fill(ColorActual);
        rect(x * this.Ancho, y * this.Ancho, this.Ancho, this.Ancho);
      }
    }
  }

  CambiarColor(Color) {
    this.Color = color(Color);
    this.ColorBase = color(0);
    this.CrearColores();
  }

  CrearColores() {
    for (let x = 0; x <= this.NivelColor; x++) {
      this.ArregloColor[x] = lerpColor(this.ColorBase, this.Color, x / this.NivelColor);
    }
  }
}
