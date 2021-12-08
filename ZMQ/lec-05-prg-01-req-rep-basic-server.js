
// 1초 기다리는 함수
function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }


var zmq = require("zeromq"),

sock = zmq.socket("rep");


// 메시지를 받으먄 console에 출력하고 1초 기다린후 World 로 응답한다.
sock.bind("tcp://*:5555",function() {
    sock.on('message', async function(msg) {
        console.log("Received request: %s", msg.toString());
        await delay(1000);
        sock.send("World");
    });
});
