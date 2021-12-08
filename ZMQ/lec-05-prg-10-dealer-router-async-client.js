const { argv } = require('process');
var zmq = require('zeromq');

function makeASocket(sockType, idPrefix, addr, bindSyncOrConnect) {
    var sock = zmq.socket(sockType)
    sock.identity = idPrefix
    // call the function name in bindSyncOrConnect
    sock[bindSyncOrConnect](addr)
    return sock
  }

function clientTask(client_name){
    var sock = makeASocket('dealer', client_name, 'tcp://127.0.0.1:12346', 'connect')
    console.log(`Client# ${client_name} started`)
    var count = 0;
    var interval = setInterval(function() {
        sock.send('request ' + count++)
        console.log(`Req #${count} sent..`)
    }, 1000)
  
    sock.on('message', function(data) {
    var args = Array.apply(null, arguments)
        console.log(`${sock.identity} received: ${args}`)
    })
  }
function main(argv){
    clientTask(argv[2])
}

if (require.main === module) {
    main(argv);
}


