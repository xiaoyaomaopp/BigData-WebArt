var sha1 = require('sha1');
var WXBizDataCrypt = require('../util/WXBizDataCrypt');
var config = require('../util/config');
var conn = require('../util/connUtils');
var request = require('request');


exports.loginWXClient = function(data) {
    return new Promise((resolve, reject) => {
        try{
            this.getOpenId(data.code).then(res=>{
                var ret = checkMessage(res,data);
                if(ret.success){
                    var pc = new WXBizDataCrypt(config.wxClientConfig.appId, ret.sessionKey);
                    var user = pc.decryptData(data.encryptedData , data.iv)
                    user.viplevel = '普通会员';
                    console.log(user);
                    resolve({success:true,text:ret.text, user: user});
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
            console.log(signature)
            console.log(data.signature)
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
            if (!error && response.statusCode == 200) {
                resolve(body);
            }else{
                reject();
            }
        })
    });
};