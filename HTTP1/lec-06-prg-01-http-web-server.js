const http = require('http'); 
// 함수 전부 파이썬 코드와 동일 
function print_http_request_detail(req){
    console.log(`::Client address   : ${req.connection.remoteAddress}`)
    console.log(`::Client port   : ${req.connection.remotePort}`)
    console.log(`::Request command   : ${req.method}`)
    console.log(`::Request line   : ${req.method} ${req.url} ${req.httpVersion}`)
    console.log(`::Request path   : ${req.url}`)
    console.log(`::Request version  : ${req.httpVersion}`)
}
function simple_calc(para1, para2){
    return para1 * para2
}

function parameter_retrieval(msg){
    result = []
    fields = msg.split('&')
    result.push(parseInt(fields[0].split('=')[1]))
    result.push(parseInt(fields[1].split('=')[1]))
    return result
}
const server = http.createServer(async function(req,res){ 
    print_http_request_detail(req)

    if (req.method == "GET"){
        console.log("## do_GET() activated.")
        if ((req.url).includes('?')){
            var routine = req.url.split('?')[1]
            var parameter = parameter_retrieval(routine)
            var result = simple_calc(parseInt(parameter[0]), parseInt(parameter[1]))

            res.setHeader('Content-Type', 'text/html')
            res.write('<html>')
            res.write(`GET request for calculation => ${parameter[0]} x ${parameter[1]} = ${result}`)
            res.write('<html>')
            res.end()
            console.log(`## GET request for calculation => ${parameter[0]} x ${parameter[1]} = ${result}`)
        }

        else {
            res.setHeader('Content-Type', 'text/html')
            res.write('<html>')
            res.write(`<p>HTTP Request GET for Path: ${req.url}</p>`)
            res.write('<html>')
            res.end()
            console.log("## GET request for directory =>  ${req.url}.")
        }
    }
    if (req.method == "POST"){
        console.log("## do_POST() activated.")

        await req.on('data',function (msg){
            var routine = msg.toString()
            console.log(routine.length)
            console.log(routine)
            var parameter = parameter_retrieval(routine)
            var result = simple_calc(parseInt(parameter[0]), parseInt(parameter[1]))

            res.setHeader('Content-Type', 'text/html')
            res.write('<html>')
            res.write(`POST request for calculation => ${parameter[0]} x ${parameter[1]} = ${result}`)
            res.write('<html>')
            res.end()
            console.log(`## POST request data => ${routine}`)
            console.log(`## POST request for calculation => ${parameter[0]} x ${parameter[1]} = ${result}`)
        })
        

    }
});

server.listen(8080, function(){ 
    console.log('## HTTP server started at http://localhost:8080');
});