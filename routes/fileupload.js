var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var util = require('util');
var fs = require('fs');
var fileupload = require('../server/fileupload.js');

/* 上传页面 */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
/* 上传*/
router.post('/dailryArtUpload', function(req, res, next){
    var filePath = './public/daily-art-resource/';
    //生成multiparty对象，并配置上传目标路径
    var form = new multiparty.Form({uploadDir: filePath});
    //上传完成后处理
    form.parse(req, function(err, fields, files) {
        var ret = fileupload.dailryArtImg(err,fields,files,filePath);
        res.writeHead(200, {'content-type': 'text/plain;charset=utf-8'});
        //res.write(ret);
        //res.end(util.inspect({fields: fields, files: filesTmp}));
        console.log(ret)
        res.end(JSON.stringify(ret) );
    });
});
module.exports = router;