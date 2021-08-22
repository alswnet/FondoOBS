console.log("Iniciando");

let clientMQTT;
let ListaColores;
let AnimacionActual;

let BrokerMQTT = "wss://public:public@public.cloud.shiftr.io";
let ExprecionColores = /^#[0-9a-f]{3,6}$/i;

function preload() {
  ListaColores = loadJSON("Colores.json");
  console.log(ListaColores);
}

function setup() {
  // createCanvas(1280, 720, WEBGL);
  createCanvas(1280, 720);
  AnimacionActual = new JuegoVida();
  // AnimacionActual = new Tereno3D();
  // AnimacionActual = new WavyField();

  clientMQTT = mqtt.connect(BrokerMQTT, {
    clientId: "Fondo_OBS_" + floor(random(10000)),
  });

  clientMQTT.on("connect", Conectarse);
  clientMQTT.on("message", RecivirMensaje);
}

function draw() {
  AnimacionActual.Actualizar();
  AnimacionActual.Dibujar();
  // console.log(floor(frameRate()));
}

function Conectarse() {
  console.log("Conectado a MQTT!");
  clientMQTT.subscribe("fondo/#");
}

function RecivirMensaje(topic, message) {
  Mensaje = message.toString().toLowerCase().replace(/\r?\n|\r/g, "");
  topic = topic.toString();
  console.log(topic + ": " + Mensaje);
  if (topic == "fondo/reiniciar") {
    console.log("Reiniciando Animacion");
    AnimacionActual.Iniciar();
  } else if (topic.startsWith("fondo/color")) {
    FuncionesColor(topic, Mensaje);
  } else if (topic == "fondo/animacion") {
    CambiarAnimacion(Mensaje);
  } else if (topic == "fondo/modo") {
    AnimacionActual.CambiarModo(Mensaje);
  }
}

function FuncionesColor(topic, Mensaje) {
  ColorNuevo = ObtenerColor(Mensaje);
  if (topic == "fondo/color/base") {
    console.log("Cambiar color Base Animacion");
    AnimacionActual.CambiarColorBase(ColorNuevo);
  } else if (topic == "fondo/color/linea") {
    console.log("Cambiar color Linea Animacion");
    AnimacionActual.CambiarColorLinea(ColorNuevo);
  } else if (topic == "fondo/color/fondo") {
    console.log("Cambiar color Secundario Animacion");
    AnimacionActual.CambiarColorSecundario(ColorNuevo);
  }
  // TODO: Agregar color Randon
}

function CambiarAnimacion(Mensaje) {
  console.log("Cambiando de animacion a " + Mensaje);
  if (Mensaje == "juegovida") {
    AnimacionActual = new JuegoVida();
  } else if (Mensaje == "tereno3d") {
    AnimacionActual = new Tereno3D();
  } else if (Mensaje == "wavyfield") {
    AnimacionActual = new WavyField();
  } else {
    console.log("Animacion no Encontrada");
  }
  // TODO: Agregar Animacion Randon
}

function ObtenerColor(TextoColor) {
  if (TextoColor === null) {
    return color(0, 255, 255);
    // Color Por Defecto Aqua
  }

  if (TextoColor in ListaColores) {
    console.log(
      "Color encontrado " + TextoColor + " " + ListaColores[TextoColor]
    );
    return ListaColores[TextoColor];
  }

  if (ExprecionColores.test(TextoColor)) {
    return color(TextoColor);
  }

  return color(0, 255, 255);
}

function mousePressed() {
  clientMQTT.publish("fondo/reiniciar", "1");
}
