/*

*/

let Ancho;
let Columnas;
let Filas;
let Mundo;
let SiquienteMundo;

function setup() {
  createCanvas(1280, 720);
  Ancho = 20;
  Columnas = floor(width / Ancho);
  Filas = floor(width / Ancho)

  Mundo = new Array(Columnas);
  for (let x = 0; x < Columnas; x++) {
    Mundo[x] = new Array(Filas);
  }
  SiquienteMundo = Mundo;

  background(0);
  Inicializar()
}

function draw() {

  Dibujar()
}

function Inicializar() {
  for (let x = 0; x < Columnas; x++) {
    for (let y = 0; y < Filas; y++) {
      Mundo[x][y] = floor(random(2));
    }
  }
}

function Dibujar() {
  for (let x = 0; x < Columnas; x++) {
    for (let y = 0; y < Filas; y++) {
      if (Mundo[x][y] == 1) {
        fill(255)
      } else {
        fill(0)
      }
      rect(x * Ancho, y * Ancho, Ancho, Ancho)
    }
  }


}
