const url = require('url');
const fs = require('fs');
const path = require('path');

const filepath = './index.html';
const serverlog = require('./log.js');

const cities = require('cities');


module.exports = {
    handleRequest: function(request, response){
        const path = url.parse(request.url).pathname;
        // console.log(path);
        const query = url.parse(request.url, true).query;
        const status = response.statusCode;

        serverlog.serverlog(path, query, status);

        switch(path){
            case '/':
                var param = query.zipCode;
                // console.log(param);
                if(param){
                    if(cities.zip_lookup(param) != undefined){
                        var city = cities.zip_lookup(param).city;
                        response.end(`the city your are looking is ${city}`);
                    }else{
                        response.statusCode = 404;
                        response.end('This zipcode is not found');
                    }
                }else{
                    if(fs.existsSync(filepath)){
                        fs.readFile(filepath, null , function(err, data){
                            if(err){
                                response.statusCode = 404;
                                response.end('file not found');
                            }
                            response.end(data);
                        })
                    }
                }
                break;
                default:
                    response.statusCode = 404;
                    response.end('This route not exist');
                break;
        }
    }
}