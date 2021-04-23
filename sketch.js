console.log("Iniciando")

let client;
let ListaColores;
let Animacion;
// Animacion2 = new JuegoVida();

function preload() {
  ListaColores = loadJSON("Colores.json");
}

function setup() {
  createCanvas(1920, 1080);
  ColorCuadrados = ObtenerColor("");
  Animacion = new JuegoVida();
  client = mqtt.connect("wss://public:public@public.cloud.shiftr.io", {
    clientId: 'Fondo_OBS_' + floor(random(10000))
  });

  client.on('connect', Conectarse);
  client.on('message', RecivirMensaje);
}

function draw() {
  Animacion.Actualizar();
  Animacion.Dibujar();
}


function Conectarse() {
  console.log('Conectado a MQTT!');
  client.subscribe('fondo/#');
}

function RecivirMensaje(topic, message) {
  console.log(topic + ': ' + message.toString());
  if (topic == "fondo/reiniciar") {
    console.log("Reiniciando Animacion")
    Inicializar();
  } else if (topic == "fondo/color") {
    console.log("Cambiar color Animacion")
    ColorNuevo = ObtenerColor(message.toString());
    Animacion.CambiarColor(ColorNuevo);
  } else if (topic == 'fondo/colorhex') {
    console.log("El color es " + message.toString());
    ColorNuevo = color(message.toString());
    Animacion.CambiarColor(ColorNuevo);
  }
}

function mousePressed() {
  client.publish('fondo/reiniciar', '1');
}

function ObtenerColor(TextoColor) {
  TextoColor = TextoColor.toLowerCase();
  if (TextoColor in ListaColores) {
    console.log("Color encontrado " + TextoColor + " " + ListaColores[TextoColor]);
    return ListaColores[TextoColor]
  }

  return color(0, 255, 255);
}
