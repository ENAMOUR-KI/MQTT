const WebSocket = require('ws')
const mqtt=require('mqtt')

const wss = new WebSocket.Server({ port: 8765 })
const audioTopic = 'hermes/audioServer/default/audioFrame'
const connectUrlMqtt = 'mqtt://127.0.0.1:12183'

const client = mqtt.connect(connectUrlMqtt, {
  clean: true,
  connectTimeout: 4000,
  reconnectPeriod: 1000,
})

wss.on('connection', ws => {
console.log("Client connected");
  ws.on('message', message => {
    console.log(`Received message => ${message}`)
    client.publish(audioTopic, message)
  })
})
