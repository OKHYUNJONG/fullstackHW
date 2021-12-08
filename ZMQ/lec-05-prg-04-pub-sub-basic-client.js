var zmq = require('zeromq');
console.log("Collecting updates from weather server...");

var subscriber = zmq.socket('sub');

var zip_filter = null;

// argv[2] 에 우편번호 입력 (default : 10001)
if (process.argv.length > 2) {
  zip_filter = process.argv[2];
} else {
  zip_filter = "10001";
}
subscriber.subscribe(zip_filter);

var total_temp = 0
var temps      = 0;
  
subscriber.on('message', function(data) {
  var receive_data      = data.toString().split(" ")
  var zipcode     = parseInt(receive_data[0], 10)
  var temperature = parseInt(receive_data[1], 10)
  var relhumidity = parseInt(receive_data[2], 10);

  temps += 1;
  total_temp += temperature;
  //매번 받은 온도 출력
  console.log([
    "Receive temperature for zipcode '",zip_filter,"' was ",temperature,
    " F"].join(""));
  //20번째에 평균값을 출력
  if (temps === 20) {
    console.log([
      "Average temperature for zipcode '",
      zip_filter,
      "' was ",
      (total_temp / temps).toFixed(2),
      " F"].join(""));
    total_temp = 0;
    temps = 0;
  }
});

subscriber.connect("tcp://localhost:5556");