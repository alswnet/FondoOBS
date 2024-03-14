let TopicBase = ["alsw/fondoOBS/#"];

function ConectarMQTT() {
  console.log(`Intentando conectar a MQTT ${DataMQTT.broker}`);
  let BrokerMQTT = "";
  if (DataMQTT.user === undefined) {
    console.log("No Evite usuario y contraseña");
    BrokerMQTT = `${DataMQTT.protocolo}://${DataMQTT.broker}:${DataMQTT.puerto}`;
  } else {
    BrokerMQTT = `${DataMQTT.protocolo}://${DataMQTT.user}:${DataMQTT.pass}@${DataMQTT.broker}:${DataMQTT.puerto}`;
  }

  clientMQTT = mqtt.connect(BrokerMQTT, {
    clientId: "Fondo_OBS_" + floor(random(10000)),
  });

  clientMQTT.on("connect", ConectadoMQTT);
  clientMQTT.on("message", RecivirMensaje);
}

function ConectadoMQTT() {
  console.log(`Conectado a MQTT! ${DataMQTT.broker}`);
  for (let i = 0; i < TopicBase.length; i++) {
    console.log(`Subscribiéndose a ${TopicBase[i]}`);
    clientMQTT.subscribe(TopicBase[i]);
  }
}

function RecivirMensaje(topic, message) {
  let Mensaje = message
    .toString()
    .toLowerCase()
    .replace(/\r?\n|\r/g, "");
  topic = topic.toString();

  let ListaTopic = topic.split("/");
  Base = ListaTopic.shift();
  switch (Base) {
    case "alsw":
      Base = ListaTopic.shift();
      switch (Base) {
        case "fondoOBS":
          Operacion = ListaTopic.shift();
          switch (Operacion) {
            case "reiniciar":
              console.log("Reiniciando[algoritmo]");
              AnimacionActual.Iniciar();
              return;
              break;
            case "animacion":
              console.log(`Cambiando[algoritmo] ${Mensaje}`);
              CambiarAlgoritmo(Mensaje);
              return;
              break;
            case "mode":
              console.log(`Cambiando[modo] ${Mensaje}`);
              AnimacionActual.CambiarModo(Mensaje);
              return;
              break;
            case "color":
              Operacion = ListaTopic.shift();
              console.log(`Intentando color[${Operacion}] ${Mensaje}`);
              FuncionesColor(Operacion, Mensaje);
              return;
              break;
            case "arcoiris":
              Operacion = ListaTopic.shift();
              if (Operacion === undefined) {
                console.log(`Modo Arcoiris: ${Mensaje}`);
                AnimacionActual.CambiarArcoiris(Mensaje);
              }
              return;
              break;
            case "fps":
              Operacion = ListaTopic.shift();
              switch (Operacion) {
                case "cambio":
                  AnimacionActual.CambiarFPS(Mensaje);
                  break;
                case "asignar":
                  AnimacionActual.AsignarFPS(Mensaje);
                  break;
              }
              return;
              break;
            default:
              console.log(`Operacion no encontrada: ${Operacion}`);
              return;
          }
          break;
        default:
          console.log(`Base no reconocida: ${Base}`);
          return;
      }
      break;
  }
  if (topic != "alsw/fondoOBS/fps") {
    console.log(`Topic[${topic}]: "${Mensaje}"`);
  }
}
