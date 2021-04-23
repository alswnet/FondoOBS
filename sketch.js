console.log("Iniciando")

let client;
let ListaColores;
let Animacion;

function preload() {
  ListaColores = loadJSON("Colores.json");
}

function setup() {

  createCanvas(400, 400, WEBGL);
  // fullscreen(true)
  ColorCuadrados = ObtenerColor("");
  // Animacion = new JuegoVida();
  Animacion = new Tereno3D();
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
    Animacion.Iniciar();
  } else if (topic == "fondo/color") {
    console.log("Cambiar color Animacion")
    ColorNuevo = ObtenerColor(message.toString());
    Animacion.CambiarColor(ColorNuevo);
  } else if (topic == 'fondo/colorhex') {
    console.log("El color es " + message.toString());
    ColorNuevo = color(message.toString());
    Animacion.CambiarColor(ColorNuevo);
  } else if (topic == 'fondo/animacion') {
    CambiarAnimacion = message.toString().toLowerCase();
    console.log("Cambiando de animacion a " + CambiarAnimacion);
    if (CambiarAnimacion == 'juegovida') {
      Animacion = new JuegoVida();
    } else if(CambiarAnimacion == 'tereno3d'){
      Animacion = new Tereno3D();
    }
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
