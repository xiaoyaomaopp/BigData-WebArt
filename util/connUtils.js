var http = require('http');
var url = require('url');
var util = require('util');
var querystring = require('querystring');


exports.httpREQ = function(argUrl){

    return new Promise((resolve, reject) => {
       try{
            var parsedUrl = url.parse(argUrl, true);

            var options = {host: null, port: -1, path: null, method: 'GET'};
            options.host = parsedUrl.hostname;
            options.port = parsedUrl.port || 80;
            options.path = parsedUrl.pathname;
            if (parsedUrl.search) options.path +=  parsedUrl.search;
           console.log(options);

            var req = http.request(options, function(res){
                util.log('STATUS: ' + res.statusCode);
                util.log('HEADERS: ' + util.inspect(res.headers));
                res.setEncoding('utf8');
                res.on('data', function(chunk){
                    resolve(chunk);
                    return;
                });
                res.on('error', function(err){
                    util.log('RESPONSE ERROR: ' + err);
                    resolve(err);
                    return;
                });
            });

            req.on('error', function(err){
                util.log('REQUEST ERROR: ' + err);
                resolve(err);
                return;
            });
            req.end();
        }catch(e){
            reject();
        }
    });

}

exports.hostREQ = function(url, uri, data, method, port){
    if(!!!port) port=80;
    if(!!!method) method='GET';
    if(!!!data) data={};
    return new Promise((resolve, reject) => {
        try{
            var contents = querystring.stringify(data);

            var options = {
                host: url,
                path: uri,
                port: port,
                method: method,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': contents.length
                }
            };
            var req = http.request(options, function(res){
                var retBody = '';
                res.setEncoding('utf8');
                res.on('data', function(data){
                    retBody += data;
                });
                res.on('end',function(){
                    resolve(retBody);
                    return;
                })
            });

            req.write(contents);
            req.end();
        }catch(e){
            reject();
        }
    });
}