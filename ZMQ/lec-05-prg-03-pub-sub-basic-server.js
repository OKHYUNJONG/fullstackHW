var zmq = require('zeromq')
var sock = zmq.socket('pub');

sock.bindSync("tcp://*:5556");

// 형식 맞추기 위한 함수
function zeropad(num) {
  return num.toString().padStart(5, "0");
};

//random 생성함수
function rand(upper, extra) {
  var num = Math.abs(Math.round(Math.random() * upper));
  return num + (extra || 0);
};

while (true) {
  var zipcode     = rand(99999,1)
  var temperature = rand(215, -80)
  var relhumidity = rand(50, 10)
  var update      = `${zeropad(zipcode)} ${temperature} ${relhumidity}`;
  sock.send(update);
}