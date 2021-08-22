let TopicBase = ["fondo/#", "alsw/#"];

function ConectarMQTT() {
  console.log("Intentnado conectar a MQTT");
  clientMQTT = mqtt.connect(BrokerMQTT, {
    clientId: "Fondo_OBS_" + floor(random(10000)),
  });

  clientMQTT.on("connect", ConectadoMQTT);
  clientMQTT.on("message", RecivirMensaje);
}

function ConectadoMQTT() {
  console.log(`Conectado a MQTT!`);
  for (let i = 0; i < TopicBase.length; i++) {
    console.log(`Subcribiendose a ${TopicBase[i]}`);
    clientMQTT.subscribe(TopicBase[i]);
  }
}

function RecivirMensaje(topic, message) {
  let Mensaje = message
    .toString()
    .toLowerCase()
    .replace(/\r?\n|\r/g, "");
  topic = topic.toString();
  console.log(`Topic[${topic}]: "${Mensaje}"`);
  let ListaTopic = topic.split("/");
  Base = ListaTopic.shift();
  switch (Base) {
    case "fondo":
      Operacion = ListaTopic.shift();
      switch (Operacion) {
        case "reiniciar":
          console.log("Reiniciando[algoritmo]");
          AnimacionActual.Iniciar();
          break;
        case "animacion":
          console.log(`Cambiando[algoritmo] ${Mensaje}`);
          CambiarAlgoritmo(Mensaje);
          break;
        case "mode":
          console.log(`Cambiando[modo] ${Mensaje}`);
          AnimacionActual.CambiarModo(Mensaje);
          break;
        case "color":
          Operacion = ListaTopic.shift();
          console.log(`Intentando color[${Operacion}] ${Mensaje}`);
          FuncionesColor(Operacion, Mensaje);
          break;
        default:
          console.log(`Operacion no encontrada: ${Operacion}`);
      }
      break;
    default:
      console.log(`Base no reconocida: ${Base}`);
  }
}
