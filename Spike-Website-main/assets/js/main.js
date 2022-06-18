(function() {
    "use strict"
    /**
     * Easy selector helper function
     */
    const select = (el, all = false) => {
        el = el.trim()
        if (all) {
            return [...document.querySelectorAll(el)]
        } else {
            return document.querySelector(el)
        }
    }

    /**
     * Easy event listener function
     */
    const on = (type, el, listener, all = false) => {
        let selectEl = select(el, all)
        if (selectEl) {
            if (all) {
                selectEl.forEach(e => e.addEventListener(type, listener))
            } else {
                selectEl.addEventListener(type, listener)
            }
        }
    }

    /**
     * Easy on scroll event listener 
     */
    const onscroll = (el, listener) => {
        el.addEventListener('scroll', listener)
    }

    /**
     * Back to top button
     */
    let backtotop = select('.top')
    if (backtotop) {
        const toggleBacktotop = () => {
            if (window.scrollY > 100) {
                backtotop.classList.add('active')
            } else {
                backtotop.classList.remove('active')
            }
        }
        window.addEventListener('load', toggleBacktotop)
        onscroll(document, toggleBacktotop)
    }
})()

var audiostream = 0

function startAudiostream() {
    if (audiostream == 0) {
        audiostream = 1
        document.getElementById("audio").src = "assets/img/bye.png"
        console.log("Audiostream started")

        // IP will be removed in the future
        var RASPBERRY_IP = '192.168.0.49'
        var RASPBERRY_PORT = '8765'

        var currentHostname = window.location.hostname;
        var host = 'ws://' + currentHostname + ':' + RASPBERRY_PORT;

        const webSocket = new WebSocket(host);
        webSocket.onopen = event => {
            navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
                const recorder = new RecordRTC(stream, {
                    type: 'audio',
                    mimeType: 'audio/wav',
                    sampleRate: 44100,
                    //desiredSampRate: 22505,
                    recorderType: StereoAudioRecorder,
                    numberOfAudioChannels: 1,
                    bitrate: 16000,
                    timeSlice: 1,
                    ondataavailable: (blob) => {
                        webSocket.send(blob);
                    },
                }).startRecording();
            });
        };
    } else {
        audiostream = 0
        document.getElementById("audio").src = "assets/img/hi.png"
        console.log("Audiostream ended")
    }
}

function wakeword() {
    let xhr = new XMLHttpRequest()
    xhr.open("POST", "http://" + window.location.hostnam + ":12101/api/listen-for-command")

    xhr.setRequestHeader("Access-Control-Allow-Origin", "*")

    xhr.onload = () => console.log(xhr.responseText)
}

function controlSpike(command) {
    let xhr = new XMLHttpRequest()
    xhr.open("POST", "https://reqbin.com/echo/post/json")

    xhr.setRequestHeader("Accept", "application/json")
    xhr.setRequestHeader("Access-Control-Allow-Origin", "*")

    xhr.onload = () => console.log(xhr.responseText)

    let data = `{
      "entities": [],
      "intent": {
          "confidence": 1,
          "name": "` + command + `"
      },
      "raw_text": "` + command + `",
      "raw_tokens": [
          "` + command + `"
      ],
      "recognize_seconds": 0.06946082699994349,
      "slots": {},
      "speech_confidence": 1,
      "text": "` + command + `",
      "tokens": [
          "` + command + `"
      ],
      "wakeword_id": null
  }`

    console.log(data)
    xhr.send(data)
}