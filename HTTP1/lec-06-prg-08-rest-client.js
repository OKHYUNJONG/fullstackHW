const request = require('request');

r = request.get('http://localhost:5000/membership_api/0001', function optionalCallback(err, httpResponse, http_request){
    var temp_json = JSON.parse(http_request)['temp']
    console.log("#1 Code:", httpResponse.statusCode, ">>", "JSON:",temp_json, ">>", "JSON Result:", temp_json['0001'])
})



r = request.put('http://localhost:5000/membership_api/0001', {form:{'0001':'apple'}}, function optionalCallback(err, httpResponse, http_request){
    var temp_json = JSON.parse(http_request)['temp']
    console.log("#2 Code:", httpResponse.statusCode, ">>", "JSON:",temp_json, ">>", "JSON Result:", temp_json['0001'])
})

r = request.get('http://localhost:5000/membership_api/0001', function optionalCallback(err, httpResponse, http_request){
    var temp_json = JSON.parse(http_request)['temp']
    console.log("#3 Code:", httpResponse.statusCode, ">>", "JSON:",temp_json, ">>", "JSON Result:", temp_json['0001'])
})

r = request.put('http://localhost:5000/membership_api/0001', {form:{'0001':'xpple'}}, function optionalCallback(err, httpResponse, http_request){
    var temp_json = JSON.parse(http_request)['temp']
    console.log("#4 Code:", httpResponse.statusCode, ">>", "JSON:",temp_json, ">>", "JSON Result:", temp_json['0001'])
})

r = request.post('http://localhost:5000/membership_api/0002', {form:{'0002':'xrange'}}, function optionalCallback(err, httpResponse, http_request){
    var temp_json = JSON.parse(http_request)['temp']
    console.log("#5 Code:", httpResponse.statusCode, ">>", "JSON:",temp_json, ">>", "JSON Result:", temp_json['0002'])
})

r = request.put('http://localhost:5000/membership_api/0002', {form:{'0002':'xrange'}}, function optionalCallback(err, httpResponse, http_request){
})
r = request.post('http://localhost:5000/membership_api/0002', {form:{'0002':'orange'}}, function optionalCallback(err, httpResponse, http_request){
    var temp_json = JSON.parse(http_request)['temp']
    console.log("#6 Code:", httpResponse.statusCode, ">>", "JSON:",temp_json, ">>", "JSON Result:", temp_json['0002'])
})

r = request.delete('http://localhost:5000/membership_api/0001', function optionalCallback(err, httpResponse, http_request){
    var temp_json = JSON.parse(http_request)['temp']
    console.log("#7 Code:", httpResponse.statusCode, ">>", "JSON:",temp_json, ">>", "JSON Result:", temp_json['0001'])
})

r = request.delete('http://localhost:5000/membership_api/0001', function optionalCallback(err, httpResponse, http_request){
    var temp_json = JSON.parse(http_request)['temp']
    console.log("#8 Code:", httpResponse.statusCode, ">>", "JSON:",temp_json, ">>", "JSON Result:", temp_json['0001'])
})