# Spike-Raspberry-Code



## Installation instructions


###

### Website
```
cd Spike-Website-main
./start_website.sh
```

### MQTT
```
cd script
npm init
npm install mqtt ws
```

### Chrome
```
chrome://flags/#unsafely-treat-insecure-origin-as-secure
Add: http://RASPBERRY_IP:RASPBERRY_WEBSERVER_PORT
```

### Autostart
```
sudo crontab -e
@reboot cd /home/spike/Desktop/Spike-Raspberry-Code/Spike-Website-main && ./start_website.sh
@reboot cd /home/spike/Desktop/Spike-Raspberry-Code/script && node websocket_to_mqtt.js
```




