function rand(upper, extra) {
    var num = Math.abs(Math.round(Math.random() * upper));
    return num + (extra || 0);
};

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }


async function main(){
    
    var zmq = require('zeromq')
    subscriber = zmq.socket('sub');
    subscriber.connect("tcp://127.0.0.1:5557");
    subscriber.subscribe('');
    publisher = zmq.socket("push");
    publisher.connect("tcp://127.0.0.1:5558");
    //먼저 한번 메시지 전달 (10 이상일때 반복하여 10미만으로 맞추기)
    rand_num = rand(99,1);
    while (rand_num >=10){
        rand_num = rand(99,1);
    };
    publisher.send(String(rand_num));
    console.log("I: sending message ", String(rand_num));
    // 이후 메시지 받을때마다 반복하여 전달
    subscriber.on("message", async function(topic,msg) {
        console.log("I: received message ",msg.toString());
    
        rand_num = rand(99,1)
        while (rand_num >=10){
            rand_num = rand(99,1);
        };
        await delay(1000);
        publisher.send(String(rand_num));
        console.log("I: sending message ", String(rand_num));
    });

    // poll 관련 찾아보니 존재하지않음..
    
    // while (1){
    //     if ( zmq.pollin){
    //         subscriber.on("message", function(msg) {
    //             console.log("I: received message ",msg);
    //         });
    //     }
    //     else{
    //         rand_num = rand(99,1)
    //         if (rand_num <10){
    //             publisher.send(String(rand_num));
    //             console.log("I: sending message ", String(rand_num));
    //         }
    //     }
    // }

}

if (require.main === module) {
    main();
}
