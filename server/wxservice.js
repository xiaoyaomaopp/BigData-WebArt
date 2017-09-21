var sha1 = require('sha1');
var WXBizDataCrypt = require('../util/WXBizDataCrypt');
var config = require('../util/config');
var conn = require('../util/connUtils');
var request = require('request');
var userDao = require('./weixinDao');


exports.loginWXClient = function(data) {
    return new Promise((resolve, reject) => {
        try{
            this.getOpenId(data.code).then(res=>{
                var ret = checkMessage(res,data);
                console.log(ret);
                if(ret.success){
                    var pc = new WXBizDataCrypt(config.wxClientConfig.appId, ret.sessionKey);
                    var user = pc.decryptData(data.encryptedData , data.iv)
                    //user.viplevel = '普通会员';
                    //user.identity = '艺术发布者';
                    userDao.updateUserByOpenId(user).then(userRes=>{
                        resolve({success:true,text:ret.text, user: userRes});
                    });
                }else{
                    resolve({success:false,text:ret.text});
                }
            }).catch(function(error) {
                console.error(error);
                reject(error);
            });
        }catch(e){
            reject(e);
        }

    });
};

exports.getWXUserInfo = function(data) {
    return new Promise((resolve, reject) => {
        try{
            this.getOpenId(data.code).then(res=>{
                var ret = checkMessage(res,data);
                if(ret.success){
                    var pc = new WXBizDataCrypt(config.wxClientConfig.appId, ret.sessionKey);
                    var user = pc.decryptData(data.encryptedData , data.iv)
                    userDao.getUserByUserId({openId:user.openId}).then(re=>{
                        if(!!re && re.length>0){
                            user = re[0];
                        }
                        resolve({success:true,text:ret.text, user: user});
                    })
                }else{
                    resolve({success:false,text:ret.text});
                }
            }).catch(function(error) {
                console.error(error);
                reject(error);
            });
        }catch(e){
            reject(e);
        }

    });
};

function checkMessage(res,data){
    if(!!res){
        res = JSON.parse(res);
        if(!!!res.errcode){
            var signature = sha1(data.rawData + res.session_key);
            if(signature==data.signature){
                return {success:true,text:'交易成功!',openId: res.openId,sessionKey: res.session_key};
            }else{
                return {success:false,text:'验签失败!'};
            }
        }else{
            return {success:false,text:'内部服务器出错!'};
        }
    }else{
        return {success:false,text:'内部服务器出错!'};
    }
}

exports.getOpenId = function(code){
    var url = "https://api.weixin.qq.com/sns/jscode2session?";
    url += "appid="+config.wxClientConfig.appId+"&secret="+config.wxClientConfig.appSecret;
    url += "&js_code="+code+"&grant_type=authorization_code";
    return new Promise((resolve, reject) => {
        request(url, function (error, response, body) {
            console.log(body);
            if (!error && response.statusCode == 200) {
                resolve(body);
            }else{
                reject();
            }
        })
    });
};

exports.getUserById = function(query){
    return new Promise((resolve, reject) => {
        try{
            userDao.getUserByUserId(query).then(data=>{
                if(!!data && data.length>0){
                    resolve({success:true,data:data[0]});
                }else{
                    resolve({success:false,text:'record has not found'});
                }
            });
        }catch(e){
            reject(e);
        }

    });
};

exports.updateUser = function(data) {
    return new Promise((resolve, reject) => {
        try{
            if(!!!data.userId){
                resolve({success:false,text:'userId not exist'});
            }else{
                userDao.updateUserByOpenId(data).then(userId=>{
                    resolve({success:true,text:'update user ['+userId+'] success'});
                });
            }
        }catch(e){
            reject(e);
        }

    });
};

exports.addInviteInfo = function(data) {
    return new Promise((resolve, reject) => {
        try{
            userDao.addInviteInfo(data).then(data=>{
                this.updateUser({viplevel:'专属会员',userId:data.toUserId}).then(res=>{
                    console.log(res);
                    resolve({success:true, data: data});
                }).catch(function(error) {
                    console.error(error);
                    reject(error);
                });
            }).catch(function(error) {
                console.error(error);
                reject(error);
            });
        }catch(e){
            reject(e);
        }
    });
};

exports.pageInvite = function(data) {
    return new Promise((resolve, reject) => {
        try{
            userDao.pageInvite(data).then(data=>{
                resolve({success:true, data: data});
            }).catch(function(error) {
                console.error(error);
                reject(error);
            });
        }catch(e){
            reject(e);
        }
    });
};

exports.saveUserArt = function(data) {
    return new Promise((resolve, reject) => {
        try{
            userDao.saveUserArt(data).then(data=>{
                resolve({success:true,data:data,text:'保存成功！'});
            }).catch(function(error) {
                console.error(error);
                reject(error);
            });
        }catch(e){
            reject(e);
        }
    });
};

exports.pageUserArt = function(data) {
    return new Promise((resolve, reject) => {
        try{
            userDao.pageUserArt(data).then(data=>{
                resolve({success:true, data: data});
            }).catch(function(error) {
                console.error(error);
                reject(error);
            });
        }catch(e){
            reject(e);
        }
    });
};

