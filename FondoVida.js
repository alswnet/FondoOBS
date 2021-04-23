/*

*/

let Ancho;
let Columnas;
let Filas;
let Mundo;
let SiquienteMundo;
let Token;
let client
let ColorCuadrados;
let ListaColores;

function preload() {
  ListaColores = loadJSON("Colores.json");
}




function Conectarse() {
  console.log('Conectado a MQTT!');
  client.subscribe('fondo/#');

  // setInterval(function() {
  //   client.publish('fondo/reiniciar', '1');
  // }, 3000);
}


function RecivirMensaje(topic, message) {
  console.log(topic + ': ' + message.toString());
  if (topic == "fondo/reiniciar") {
    console.log("Reiniciando Animacion")
    Inicializar();
  } else if (topic == "fondo/color") {
    console.log("Cambiar color Animacion")
    ColorCuadrados = ObtenerColor(message.toString());
  } else if (topic == 'fondo/colorhex') {
    console.log("El color es " + message.toString());
    ColorCuadrados = color(message.toString());
  }
}

function setup() {
  createCanvas(1920, 1080);
  ColorCuadrados = color(0, 255, 255);
  frameRate(10);
  Inicializar();

  client = mqtt.connect("wss://public:public@public.cloud.shiftr.io", {
    clientId: 'Fondo_OBS_' + floor(random(10000))
  });

  client.on('connect', Conectarse);
  client.on('message', RecivirMensaje);
}

function draw() {
  Dibujar();
  Actualizar();
}

function Inicializar() {

  Ancho = floor(random(5, 20));
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
        fill(ColorCuadrados)
      } else {
        fill(0, 100)
      }
      rect(x * Ancho, y * Ancho, Ancho, Ancho)
    }
  }
}

function mousePressed() {
  client.publish('fondo/reiniciar', '1');
}

function ObtenerColor(TextoColor) {
  TextoColor = TextoColor.toLowerCase();
  if (TextoColor in ListaColores) {
    console.log("Color encontrado " +TextoColor + " " + ListaColores[TextoColor]);
    return ListaColores[TextoColor]
  }

  return color(0, 255, 255);
}
