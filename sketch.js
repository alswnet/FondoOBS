console.log("Iniciando");

let clientMQTT;
let ListaColores;
let ListaAlgoritmos;
let AnimacionActual;
let AlgoritmoActual;

// let BrokerMQTT = "wss://public:public@public.cloud.shiftr.io";
let ArchivoMQTT = "token/mqtt.json";
let DataMQTT;
let ExprecionColores = /^#[0-9a-f]{3,6}$/i;

function preload() {
  ListaColores = loadJSON("Colores.json");
  ListaAlgoritmos = loadJSON("Algoritmos.json");
  console.log(ListaColores);
  console.log(ListaAlgoritmos);
  DataMQTT = loadJSON(ArchivoMQTT);
  // Usar callbask para dos servidores
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  AlgoritmoActual = getItem('algoritmo');
  print("Algoritmo Actual: "+AlgoritmoActual)
  if(AlgoritmoActual == null){
    AlgoritmoActual = ListaAlgoritmos[0];
  }
  CambiarAlgoritmo(AlgoritmoActual);
  let colorBase =  getItem('colorBase');
  let colorLinea =  getItem('colorLinea');
  let colorFondo =  getItem('colorFondo');
  if(colorBase !== null){
    FuncionesColor("base", colorBase)
  }
  if(colorLinea !== null){
    FuncionesColor("linea", colorLinea)
  }
  if(colorLinea !== null){
    FuncionesColor("fondo", colorFondo)
  }
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
        storeItem('colorBase', Mensaje);
      break;
    case "linea":
      AnimacionActual.CambiarColorLinea(ColorNuevo);
      storeItem('colorLinea', Mensaje);
      break;
    case "fondo":
      AnimacionActual.CambiarColorSecundario(ColorNuevo);
      storeItem('colorFondo', Mensaje);
      break;
    default:
      console.log(`Error No[${Operacion}]`);
  }
}

function CambiarAlgoritmo(Operacion) {
  switch (Operacion.toLowerCase()) {
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
      let nuevoAlgoritmo;
      let CantidadAlgoritmos = Object.values(ListaAlgoritmos).length;
      do {
        NumeroRandom = floor(random(CantidadAlgoritmos));
        nuevoAlgoritmo = ListaAlgoritmos[NumeroRandom]
      } while (AlgoritmoActual == nuevoAlgoritmo);
      AlgoritmoActual = nuevoAlgoritmo;
      console.log(`Cambiando Random[${AlgoritmoActual}]`);
      CambiarAlgoritmo(AlgoritmoActual);
      return;
      break;
    default:
      console.log(`Algoritmo no Encontrada ${Operacion}`);
      return;
  }
  AlgoritmoActual = Operacion;
  print("Cambiando a " + AlgoritmoActual)
  storeItem('algoritmo', AlgoritmoActual);
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
    let ColorRandom = color(R, G, B);
    console.log(`Color random ${ColorRandom}`);
    return ColorRandom;
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
  } else if (keyCode == 32) {
    // TODO Agregar código para pausar algoritmo
    print("Pausar");
  }
}
