const { argv } = require('process');

function rand(upper, extra) {
    var num = Math.abs(Math.round(Math.random() * upper));
    return num + (extra || 0);
};

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }


async function main(argv){
    var clientID = argv[2]
    var zmq = require('zeromq')
    subscriber = zmq.socket('sub');
    subscriber.connect("tcp://127.0.0.1:5557");
    subscriber.subscribe(clientID);
    publisher = zmq.socket("push");
    publisher.connect("tcp://127.0.0.1:5558");
    
    rand_num = rand(99,1);
    while (rand_num<=90 & rand_num >= 10){
        rand_num = rand(99,1);
    }
    if (rand_num <10){
        await delay(1000);
        msg = "(" + clientID + ":ON)"
        publisher.send(msg);
        console.log("%s: send status - activated",clientID)
    }
    else if (rand_num>90){
        await delay(1000);
        msg = "(" + clientID + ":OFF)"
        publisher.send(msg);
        console.log("$s: send status - deactivated",clientID)
    }

    subscriber.on("message", async function(topic,msg) {
        console.log("I: received message ",msg.toString());
    
        rand_num = rand(99,1)
        while (rand_num<=90 & rand_num >= 10){
            rand_num = rand(99,1);
        }
        if (rand_num <10){
            await delay(1000);
            msg = "(" + clientID + ":ON)"
            publisher.send(msg);
            console.log("%s: send status - activated",clientID)
        }
        else if (rand_num>90){
            await delay(1000);
            msg = "(" + clientID + ":OFF)"
            publisher.send(msg);
            console.log("%s: send status - deactivated",clientID)
        }
    });

}

if (require.main === module) {
    main(argv);
}
