class JuegoVida {
  constructor() {
    console.log("Iniciando Juego de la vida");
    this.Ancho = floor(random(5, 20));
    this.Columnas = floor(width / this.Ancho);
    this.Filas = floor(width / this.Ancho);
    this.Color = ObtenerColor("");
    this.Mundo = []
    this.MundoSiquiente = [];
    for (let x = 0; x < this.Columnas; x++) {
      this.Mundo[x] = [];
      this.MundoSiquiente[x] = [];
    }

    for (let x = 0; x < this.Columnas; x++) {
      for (let y = 0; y < this.Filas; y++) {
        if (x == 0 || y == 0 || x == this.Columnas - 1 || y == this.Filas - 1) {
          this.Mundo[x][y] = 0;
        } else {
          this.Mundo[x][y] = floor(random(2));
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

      }
    }
    let TemporalMundo = this.Mundo;
    this.Mundo = this.MundoSiquiente;
    this.MundoSiquiente = TemporalMundo;
  }

  Dibujar() {
    for (let x = 0; x < this.Columnas; x++) {
      for (let y = 0; y < this.Filas; y++) {
        if (this.Mundo[x][y] == 1) {
          fill(this.Color)
        } else {
          fill(0, 100)
        }
        rect(x * this.Ancho, y * this.Ancho, this.Ancho, this.Ancho)
      }
    }
  }

  CambiarColor(Color){
    this.Color = Color
  }
}
