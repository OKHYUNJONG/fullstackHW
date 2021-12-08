
function main(){
    var zmq = require('zeromq')
    publisher = zmq.socket('pub');
    publisher.bind("tcp://127.0.0.1:5557")

    collector = zmq.socket("pull")
    collector.bind("tcp://127.0.0.1:5558",function(){
        collector.on("message", async function(msg) {
            console.log("I: publishing update", msg.toString());
            tmp_string = msg.toString();
            //json형태로 전달하기 위해 slicing
            for (var i = 0 ; i<tmp_string.length; i++){
                if (tmp_string[i] === ':'){
                    tmp = i;
                    break
                }
            }
            publisher.send([tmp_string.slice(1,tmp),msg.toString()]);
            });
        });


}

if (require.main === module) {
    main();
}
