const WebSocket = require('ws')
var mqtt=require('mqtt')
const dgram = require("dgram");

const wss = new WebSocket.Server({ port: 8765 })
const audioTopic = 'hermes/audioServer/default/audioFrame'
const connectUrl = `mqtt://192.168.0.49:12183`


const PORT = 12333;
const HOST = '192.168.0.49';
const udpclient = dgram.createSocket('udp4');


const client = mqtt.connect(connectUrl, {
  clean: true,
  connectTimeout: 4000,
  reconnectPeriod: 1000,
})

wss.on('connection', ws => {
  ws.on('message', message => {
    console.log(`Received message => ${message}`)
    //udpclient.send(message, 0, message.length, PORT, HOST
    client.publish(audioTopic, message)

  })
  ws.send('Hello! Message From Server!!')
})
