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

router.get('/getUserInf', function(req, res, next) {
    var data = req.query;
    if(!!!data || !!!data.type){
        res.send({success:false,text:'请求参数不能为空!'});
        return;
    }
    service.getWXUserInfArt(data).then(data=>{
        res.send(data);
    }).catch(function(e) {
        console.error(e);
        res.send({success:false,text:'内部服务器出错!'});
    })
});
router.get('/pageInvite', function(req, res, next) {
    var data = req.query;
    if(!!!data || !!!data.type){
        res.send({success:false,text:'请求参数不能为空!'});
        return;
    }
    service.pageInvite(data).then(data=>{
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

router.get('/getNewArt', function(req, res, next) {
    var include = req.query.include;
    var page = req.query.page;
    var limit = req.query.limit;
    //var startTime = req.query.startTime; //参数保留，以后高级搜索
    service.getWXNewArt({include:include,page:page,limit:limit}).then(data=>{
        res.send(data);
    }).catch(function(e) {
        console.error(e);
        res.send({success:false,text:'内部服务器出错!'});
    })
});
router.put('/newArt',function(req,res,next){
    var data = req.body.data;
    if(!!!data){
        res.send({success:false,text:'请求参数不能为空!'});
        return;
    }
    service.editUserArt(data).then(data=>{
        res.send(data);
    }).catch(function(e) {
        console.error(e);
        res.send({success:false,text:'内部服务器出错!'});
    })
})
router.delete('/newArt',function(req,res,next){
    var data = req.body.data;
    if(!!!data){
        res.send({success:false,text:'请求参数不能为空!'});
        return;
    }
    service.deleteUserArt(data).then(data=>{
        res.send(data);
    }).catch(function(e) {
        console.error(e);
        res.send({success:false,text:'内部服务器出错!'});
    })
})
router.get('/getNewArtById', function(req, res, next) {
    var id = req.query.id;
    //var startTime = req.query.startTime; //参数保留，以后高级搜索
    service.getWXNewArtById({id:id}).then(data=>{
        res.send(data);
    }).catch(function(e) {
        console.error(e);
        res.send({success:false,text:'内部服务器出错!'});
    })
});

router.get('/getArt', function(req, res, next) {
    var include = req.query.include;
    var page = req.query.page;
    var limit = req.query.limit;
    var style = req.query.style;
    var text = req.query.text;
    //var startTime = req.query.startTime; //参数保留，以后高级搜索
    service.getWXArt({include:include,page:page,limit:limit,style:style,text:text}).then(data=>{
        res.send(data);
    }).catch(function(e) {
        console.error(e);
        res.send({success:false,text:'内部服务器出错!'});
    })
});

router.post('/saveUserArt', function(req, res, next) {
    var data = req.body.data;
    if(!!!data){
        res.send({success:false,text:'请求参数不能为空!'});
        return;
    }
    service.saveUserArt(data).then(data=>{
        res.send(data);
    }).catch(function(e) {
        console.error(e);
        res.send({success:false,text:'内部服务器出错!'});
    })
});

router.post('/pageUserArt', function(req, res, next) {
    var data = req.body.data;
    if(!!!data){
        res.send({success:false,text:'请求参数不能为空!'});
        return;
    }
    service.pageUserArt(data).then(data=>{
        res.send(data);
    }).catch(function(e) {
        console.error(e);
        res.send({success:false,text:'内部服务器出错!'});
    })
});


module.exports = router;