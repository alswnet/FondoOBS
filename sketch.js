console.log("Iniciando");

let clientMQTT;
let ListaColores;
let ListaAlgoritmos;
let AnimacionActual;
let AlgoritmoActual = 0;

let BrokerMQTT = "wss://public:public@public.cloud.shiftr.io";
let ExprecionColores = /^#[0-9a-f]{3,6}$/i;

function preload() {
  ListaColores = loadJSON("Colores.json");
  ListaAlgoritmos = loadJSON("Algoritmos.json");
  console.log(ListaColores);
  console.log(ListaAlgoritmos);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  CambiarAlgoritmo(ListaAlgoritmos[AlgoritmoActual]);
  ConectarMQTT();
}

function draw() {
  AnimacionActual.Actualizar();
  AnimacionActual.Dibujar();
  // console.log(floor(frameRate()));
}

function FuncionesColor(Operacion, Mensaje) {
  ColorNuevo = ObtenerColor(Mensaje);
  switch (Operacion) {
    case "base":
      AnimacionActual.CambiarColorBase(ColorNuevo);
      break;
    case "linea":
      AnimacionActual.CambiarColorLinea(ColorNuevo);
      break;
    case "fondo":
      AnimacionActual.CambiarColorSecundario(ColorNuevo);
      break;
    default:
      console.log(`Error No[${Operacion}]`);
  }
}

function CambiarAlgoritmo(Operacion) {
  switch (Operacion) {
    case "juegovida":
      AnimacionActual = new JuegoVida();
      break;
    case "tereno3d":
      AnimacionActual = new Tereno3D();
      break;
    case "wavyfield":
      AnimacionActual = new WavyField();
      break;
    case "perlinnoise":
      AnimacionActual = new PerlinNoise();
      break;
    case "startfield":
      AnimacionActual = new StartField();
      break;
    case "dvd":
      AnimacionActual = new DVD();
      break;
    case "random":
      let NumeroRandom = 0;
      let CantidadAlgoritmos = Object.values(ListaAlgoritmos).length;
      do {
        NumeroRandom = floor(random(CantidadAlgoritmos));
      } while (AlgoritmoActual == NumeroRandom);

      console.log(`Cambiando[${ListaAlgoritmos[NumeroRandom]}]`);
      CambiarAlgoritmo(ListaAlgoritmos[NumeroRandom]);
      break;
    default:
      console.log(`Algoritmo no Encontrada ${Operacion}`);
  }
}

function ObtenerColor(TextoColor) {
  if (TextoColor === null) {
    return color(0, 255, 255);
    // Color Por Defecto Aqua
  }

  if (TextoColor === "random") {
    let R = floor(random(0, 255));
    let G = floor(random(0, 255));
    let B = floor(random(0, 255));
    let ColorRandon = color(R, G, B);
    console.log(`Color randon ${ColorRandon}`);
    return ColorRandon;
  }

  if (TextoColor in ListaColores) {
    console.log(`Encontrado[${TextoColor}] - ${ListaColores[TextoColor]}`);
    return ListaColores[TextoColor];
  }

  if (ExprecionColores.test(TextoColor)) {
    console.log(`Encontrado[Exprecion Regular]`);
    return color(TextoColor);
  }

  console.log(`No encontrado[Color]`);
  return color(0, 255, 255);
}

function mousePressed() {
  clientMQTT.publish("fondo/color/base", "random");
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
  // print(keyCode);
  if (keyCode == 82) {
    clientMQTT.publish("fondo/reiniciar", "1");
  }
}
