const { argv } = require('process');
var zmq = require('zeromq')
var cluster = require('cluster');

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }


function search_nameserver(ip_mask, local_ip_addr, port_nameserver){
    req = zmq.socket('pub');
    for (var i = 1 ; i<255; i++){
        target_ip_addr = `tcp://${ip_mask}.${last}:${port_nameserver}`
        if (target_ip_addr != local_ip_addr ||  target_ip_addr == local_ip_addr){
            req.connect(target_ip_addr)
        }
        req.setsockopt(zmq.ZMQ_RCVTIMEO,2000)
        req.subscribe('NAMESERVER')
    }
    try {
        req.on("message", async function(msg) {
            res = msg.toString()
        });
        res_list = res.split(':')
        if (res_list[0] == 'NAMESERVER'){
            return res_list[1]
        }
        else{
            return null
        }
    
    }
    catch (error) {
        return null
    }  
}

async function beacon_nameserver(local_ip_addr, port_nameserver){
    socket = zmq.socket('pub')
    socket.bind(`tcp://${local_ip_addr}:${port_nameserver}`)
    console.log(`local p2p name server bind to tcp://${local_ip_addr}:${port_nameserver}.`)
    while (1) {
        try {
            await delay(1000);
            msg = `NAMESERVER:${local_ip_addr}`
            socket.send_string(msg)
        }
        catch (error) {
            break
        }  
    }
}

function user_manager_nameserver(local_ip_addr, port_subscribe){
    var user_db = []
    socket = zmq.socket('rep')
    socket.bind(`tcp://${local_ip_addr}:${port_subscribe}`)
    console.log(`local p2p name server bind to tcp://${local_ip_addr}:${port_subscribe}.`)
    while (1) {
        try {
            socket.on("message", function(msg) {
                res = msg.toString()
            });
            user_req = res.split(":")
            user_db.push(user_req)
            console.log(`user registration '${user_req[1]}' from '${user_req[0]}'.`)
            socket.send_string("ok")
        }
        catch (error) {
            break
        }  
    }
}

function relay_server_nameserver(local_ip_addr, port_chat_publisher, port_chat_collector){
    publisher = zmq.socket('pub')
    publisher.bind(`tcp://${local_ip_addr}:${port_chat_publisher}`)
    collector = zmq.socket('pull')
    collector.bind(`tcp://${local_ip_addr}:${port_chat_collector}`)
    console.log(`local p2p relay server activated at tcp://${local_ip_addr}:${port_chat_publisher} & ${port_chat_collector}.`)
    while (1){
        try {
            collector.on("message", function(msg) {
                message  = msg.toString()
            });
            console.log("p2p-relay:<==>", message)
            publisher.send_string(`RELAY:${message}`)
        }
        catch (error) {
            break
        }  
    }
}

function get_local_ip() {
    try {

    }
    catch (error) {
        try{

        }
        catch (error) {

        }
    }  
}

function main(argv){
    ip_addr_p2p_server = ''
    port_nameserver = 9001
    port_chat_publisher = 9002
    port_chat_collector = 9003
    port_subscribe = 9004

    user_name = argv[1]
    ip_addr = get_local_ip()
    ip_mask = ip_addr.rsplit('.', 1)[0]

    console.log("searching for p2p server.")

    name_server_ip_addr = search_nameserver(ip_mask, ip_addr, port_nameserver)
    if (name_server_ip_addr == null){
        ip_addr_p2p_server = ip_addr
        console.log("p2p server is not found, and p2p server mode is activated.")
        beacon_thread = cluster.fork({"TYPE": 'beacon_thread'})
        if (process.env.TYPE === 'beacon_thread') {
            beacon_nameserver(ip_addr, port_nameserver)
          }
        console.log("p2p beacon server is activated.")

        db_thread = cluster.fork({"TYPE": 'db_thread'})
        if (process.env.TYPE === 'db_thread') {
            user_manager_nameserver(ip_addr, port_subscribe)
          }
        console.log("p2p subsciber database server is activated.")

        relay_thread = cluster.fork({"TYPE": 'relay_thread'})
        if (process.env.TYPE === 'relay_thread') {
            relay_server_nameserver(ip_addr, port_chat_publisher, port_chat_collector)
          }
        console.log("p2p message relay server is activated.")
    }
    else{
        ip_addr_p2p_server = name_server_ip_addr
        console.log(`p2p server found at ${ip_addr_p2p_server}, and p2p client mode is activated.`)
    }

    console.log("starting user registration procedure.")

    

}


if (require.main === module) {
    if (process.argv.length == 1) {
        console.log("usage is 'python dechat.py _user-name_'.")
    } 
    else{
        console.log("starting p2p chatting program.")
        main(argv);
    }
    
}
