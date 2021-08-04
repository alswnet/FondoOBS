console.log("Iniciando");

let clientMQTT;
let ListaColores;
let AnimacionActual;

let BrokerMQTT = "wss://public:public@public.cloud.shiftr.io";

function preload() {
  ListaColores = loadJSON("Colores.json");
  console.log(ListaColores);
}

function setup() {
  createCanvas(1280, 720, WEBGL);
  AnimacionActual = new JuegoVida();
  // AnimacionActual = new Tereno3D();

  client = mqtt.connect(BrokerMQTT, {
    clientId: "Fondo_OBS_" + floor(random(10000)),
  });

  client.on("connect", Conectarse);
  client.on("message", RecivirMensaje);
}

function draw() {
  AnimacionActual.Actualizar();
  AnimacionActual.Dibujar();
  // console.log(floor(frameRate()));
}

function Conectarse() {
  console.log("Conectado a MQTT!");
  client.subscribe("fondo/#");
}

function RecivirMensaje(topic, message) {
  console.log(topic + ": " + message.toString());
  if (topic == "fondo/reiniciar") {
    console.log("Reiniciando Animacion");
    AnimacionActual.Iniciar();
  } else if (topic == "fondo/color") {
    console.log("Cambiar color Animacion");
    ColorNuevo = ObtenerColor(message.toString());
    AnimacionActual.CambiarColor(ColorNuevo);
  } else if (topic == "fondo/colorhex") {
    console.log("El color es " + message.toString());
    ColorNuevo = color(message.toString());
    AnimacionActual.CambiarColor(ColorNuevo);
  } else if (topic == "fondo/animacion") {
    CambiarAnimacion(message.toString().toLowerCase());
  }
}

function CambiarAnimacion(Mensaje) {
  console.log("Cambiando de animacion a " + Mensaje);
  if (Mensaje == "juegovida") {
    AnimacionActual = new JuegoVida();
  } else if (Mensaje == "tereno3d") {
    AnimacionActual = new Tereno3D();
  } else {
    console.log("Animacion no Encontrada");
  }
}

function ObtenerColor(TextoColor) {
  TextoColor = TextoColor.toLowerCase();
  if (TextoColor in ListaColores) {
    console.log(
      "Color encontrado " + TextoColor + " " + ListaColores[TextoColor]
    );
    return ListaColores[TextoColor];
  }

  return color(0, 255, 255);
}

function mousePressed() {
  client.publish("fondo/reiniciar", "1");
}
