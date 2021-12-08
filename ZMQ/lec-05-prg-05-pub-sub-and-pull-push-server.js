
function main(){
    var zmq = require('zeromq')
    publisher = zmq.socket('pub');
    publisher.bind("tcp://127.0.0.1:5557")

    collector = zmq.socket("pull")
    //msg 를 받으면 다시 전달
    collector.bind("tcp://127.0.0.1:5558",function(){
        collector.on("message", async function(msg) {
            console.log("I: publishing update", msg.toString());
            publisher.send(['',msg.toString()]);
            });
        });


}

if (require.main === module) {
    main();
}
