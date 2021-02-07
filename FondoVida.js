/*

*/

let Ancho;
let Columnas;
let Filas;
let Mundo;
let SiquienteMundo;

function setup() {
  createCanvas(1920, 1080);
  frameRate(60);
  Ancho = 30;
  Columnas = floor(width / Ancho);
  Filas = floor(width / Ancho)

  Mundo = new Array(Columnas);
  for (let x = 0; x < Columnas; x++) {
    Mundo[x] = new Array(Filas);
  }

  SiquienteMundo = new Array(Columnas);
  for (let x = 0; x < Columnas; x++) {
    SiquienteMundo[x] = new Array(Filas);
  }

  background(0);
  Inicializar()
}

function draw() {
  background(0);
  Dibujar();
  Actualizar();
}

function Inicializar() {
  for (let x = 0; x < Columnas; x++) {
    for (let y = 0; y < Filas; y++) {
      if (x == 0 || y == 0 || x == Columnas - 1 || y == Filas - 1) {
        Mundo[x][y] = 0;
      } else {
        Mundo[x][y] = floor(random(2));
      }
    }
  }
}

function Actualizar() {
  for (let x = 1; x < Columnas - 1; x++) {
    for (let y = 1; y < Filas - 1; y++) {
      let Vecinos = 0;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          // print(i + " " + x)
          if (i == 0 && j == 0) {

          } else {
            Vecinos += Mundo[x + i][y + j];
          }

        }
      }
      if (Mundo[x][y] == 1) {
        if (Vecinos > 3 || Vecinos < 2) {
          SiquienteMundo[x][y] = 0;
        } else {
          SiquienteMundo[x][y] = 1;
        }
      } else {
        if (Vecinos == 3) {
          SiquienteMundo[x][y] = 1;
        } else {
          SiquienteMundo[x][y] = Mundo[x][y];

        }
      }

    }
  }
  let TemporalMundo = Mundo;
  Mundo = SiquienteMundo;
  SiquienteMundo = TemporalMundo;
}

function Dibujar() {
  for (let x = 0; x < Columnas; x++) {
    for (let y = 0; y < Filas; y++) {
      if (Mundo[x][y] == 1) {
        fill(0, 0, 255)
      } else {
        fill(0, 100)
      }
      rect(x * Ancho, y * Ancho, Ancho, Ancho)
    }
  }


}

function mousePressed() {
  Inicializar()
}
