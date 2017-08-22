var express = require('express');
var router = express.Router();
var service = require('../server/wxservice.js');

router.post('/login', function(req, res, next) {
    var data = req.body.data;
    if(!!!data){
        res.send({success:false,text:'请求参数不能为空!'});
        return;
    }
    service.loginWXClient(data).then(data=>{
        res.send(data);
    }).catch(function(e) {
        console.error(e);
        res.send({success:false,text:'内部服务器出错!'});
    })
});


module.exports = router;