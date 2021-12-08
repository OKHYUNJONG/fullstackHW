const { argv } = require('process');
var zmq = require('zeromq');
var cluster = require('cluster');

function makeASocket(sockType, idPrefix, addr, bindSyncOrConnect) {
    var sock = zmq.socket(sockType)
    sock.identity = idPrefix + process.pid
    // call the function name in bindSyncOrConnect
    sock[bindSyncOrConnect](addr)
    return sock
  }
  

function serverTask(){
    var backSvr = makeASocket('dealer', 'back', 'tcp://127.0.0.1:12345', 'bindSync')
    backSvr.on('message', function(msg){
        var args = Array.apply(null, arguments)
        frontSvr.send(args)
    })
  
    var frontSvr = makeASocket('router', 'front', 'tcp://127.0.0.1:12346', 'bindSync')
    frontSvr.on('message', function(msg){
        var args = Array.apply(null, arguments)
        backSvr.send(args)
    })
  }

function workerTask(){
    var sock = makeASocket('dealer', 'wkr', 'tcp://127.0.0.1:12345' , 'connect')
    console.log(`Worker# ${sock.identity} started`)
    var count = 1;
    sock.on('message', function(msg) {
        var args = Array.apply(null, arguments)
        sock.send([args[0], '', 'response ' + count++])
        console.log(`Worker# ${sock.identity} received ${count} from ${msg.toString()}`)
    })
}


function main(argv){
    if (cluster.isMaster) { // main process인 경우
        for (var i = 0; i < argv[2]; i++) {
           cluster.fork({ "TYPE": 'worker'})
         }  

        cluster.on('death', function(worker) {
           console.log('worker ' + worker.pid + ' died');
        });
       
        serverTask()
       } 
    else { //child process인 경우 (?)
        workerTask()
    }
}

if (require.main === module) {
    main(argv);
}
