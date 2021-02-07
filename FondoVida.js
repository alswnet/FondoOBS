/*

*/

let Ancho;
let Columnas;
let Filas;
let Mundo;
let SiquienteMundo;


// mqtt://fondoalsw:lLkCndA14Rec4bMg@fondoalsw.cloud.shiftr.io
const client = mqtt.connect('xxx', {
  clientId: 'javascript'
});
client.on('connect', function() {
  console.log('connected!');

  client.subscribe('#');

  setInterval(function() {
    client.publish('fondo/reiniciar', '1');
  }, 3000);
});

client.on('message', function(topic, message) {
  console.log(topic + ': ' + message.toString());
  if (topic == "fondo/reiniciar") {
    console.log("Reiniciando ")
    Inicializar();
  }
});



function setup() {
  createCanvas(1920, 1080);
  frameRate(10);
  Inicializar()
}

function draw() {
  Dibujar();
  Actualizar();
}

function Inicializar() {

  Ancho = floor(random(10, 50));
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
          if (!(i == 0 && j == 0)) {
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
        fill(0, 255, 255)
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
