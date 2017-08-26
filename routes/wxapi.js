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

router.post('/editUser', function(req, res, next) {
    var data = req.body.data;
    if(!!!data){
        res.send({success:false,text:'请求参数不能为空!'});
        return;
    }
    service.updateUser(data).then(data=>{
        res.send(data);
    }).catch(function(e) {
        console.error(e);
        res.send({success:false,text:'内部服务器出错!'});
    })
});

router.post('/getWXUser', function(req, res, next) {
    var data = req.body.data;
    if(!!!data){
        res.send({success:false,text:'请求参数不能为空!'});
        return;
    }
    service.getWXUserInfo(data).then(data=>{
        res.send(data);
    }).catch(function(e) {
        console.error(e);
        res.send({success:false,text:'内部服务器出错!'});
    })
});

router.post('/addInvite', function(req, res, next) {
    var data = req.body.data;
    if(!!!data){
        res.send({success:false,text:'请求参数不能为空!'});
        return;
    }
    service.addInviteInfo(data).then(data=>{
        res.send(data);
    }).catch(function(e) {
        console.error(e);
        res.send({success:false,text:'内部服务器出错!'});
    })
});

router.post('/checkUserPower', function(req, res, next) {
    var data = req.body.data;
    if(!!!data){
        res.send({success:false,text:'请求参数不能为空!'});
        return;
    }
    service.updateUser(data).then(data=>{
        res.send(data);
    }).catch(function(e) {
        console.error(e);
        res.send({success:false,text:'内部服务器出错!'});
    })
});

router.post('/getVip', function(req, res, next) {
    var data = req.body.data;
    if(!!!data){
        res.send({success:false,text:'请求参数不能为空!'});
        return;
    }
    service.updateUser(data).then(data=>{
        res.send(data);
    }).catch(function(e) {
        console.error(e);
        res.send({success:false,text:'内部服务器出错!'});
    })
});

router.get('/getUserByUserId', function(req, res, next) {
    var userId = req.query.userId;
    var openId = req.query.openId;
    if(!!!userId && !!!openId){
        res.send({success:false,text:'请求参数不能为空!'});
        return;
    }
    service.getUserById({userId:userId,openId:openId}).then(data=>{
        res.send(data);
    }).catch(function(e) {
        console.error(e);
        res.send({success:false,text:'内部服务器出错!'});
    })
});

module.exports = router;