// nodejs에서는 sync하게 메시지를 받는 recv()함수가 존재하지 않는것으로 파악됨 -> 따라서 코드를 다음과 같이 구현

var zmq = require("zeromq"),

sock = zmq.socket("req");

// server와 연결
console.log("Connecting to hello world server…")
sock.connect("tcp://127.0.0.1:5555");

// 첫번째 Hello 전송
console.log("Sending request %s …",0);
sock.send("Hello");

var request = 0;
// 첫번째 Hello에 대한 응답이후 계속 반복하여 request가 10이 될때까지 메시지를 받고 Hello를 보내는 식으로 진행
sock.on("message", function(msg) {

    console.log("Received reply %s [ %s ]", request,msg.toString());
    request++;
    if (request == 10) {
        sock.close();
        };

    if (request <10) {
    console.log("Sending request %s …",request);
    sock.send("Hello");
    };
});


