const request = require('request');

async function main() {
console.log("## HTTP client started.");

console.log("## GET request for http://localhost:8080/temp/");
console.log("## GET response [start]");
await request.get({uri:'http://localhost:8080/temp/'}, function optionalCallback(err, httpResponse, http_request){
    console.log(http_request);
    console.log("## POST response [end]");
    console.log("## HTTP client completed.");
})

console.log("## GET request for http://localhost:8080/?var1=9&var2=9");
console.log("## GET response [start]");
await request.get('http://localhost:8080/?var1=9&var2=9', function optionalCallback(err, httpResponse, http_request){
    console.log(http_request);
    console.log("## POST response [end]");
    console.log("## HTTP client completed.");
})

console.log("## POST request for http://localhost:8080/ with var1 is 9 and var2 is 9");
console.log("## POST response [start]");
await request.post('http://localhost:8080', {form:{'var1':'9','var2':'9'}}, function optionalCallback(err, httpResponse, http_request){
    console.log(http_request);
    console.log("## POST response [end]");
    console.log("## HTTP client completed.");
})
}

if (require.main === module) {
    main();
}