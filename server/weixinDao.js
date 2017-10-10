var userdb = require('./userDB.js');
var common = require('./common.js');

exports.getUserByUserId = function(query) {
    var params = {};
    if(!!query.userId) params.userId = query.userId;
    if(!!query.openId) params.openId = query.openId;
    return userdb.open("wx.user").then(function(collection) {
       return collection.find(params).toArray();
    }).catch(function(error) {
        userdb.close();
        console.error(error)
        throw error;
    })
};

exports.updateUserByOpenId = function(user) {
    var userId = user.userId;
    if(!!!userId){
        var uuid = common.toOnlyId(user.openId+new Date().getTime());
        return userdb.open("wx.user").then(function(collection) {
            return collection.find({openId:user.openId}).toArray();
        }).then(function(data) {
            if(!!data && data.length<=0){
                user.userId = uuid;
                return userdb.open("wx.user").then(function(collection) {
                    return collection.insert([user]);
                }).then(function() {
                    userdb.close();
                    return user;
                }).catch(function(error) {
                    userdb.close();
                    console.error(error)
                    throw error;
                })
            }else{
                var userM = data[0];
                userId = userM.userId;
                var setParams = {};
                if(!!user.openId) {
                    setParams.openId = user.openId;
                    userM.openId = user.openId;
                }
                if(!!user.nickName)  {
                    setParams.nickName = user.nickName;
                    userM.nickName = user.nickName;
                }
                if(!!user.gender)  {
                    setParams.gender = user.gender;
                    userM.gender = user.gender;
                }
                if(!!user.language)  {
                    setParams.language = user.language;
                    userM.language = user.language;
                }
                if(!!user.city)  {
                    setParams.city = user.city;
                    userM.city = user.city;
                }
                if(!!user.province)  {
                    setParams.province = user.province;
                    userM.province = user.province;
                }
                if(!!user.country)  {
                    setParams.country = user.country;
                    userM.country = user.country;
                }
                if(!!user.avatarUrl)  {
                    setParams.avatarUrl = user.avatarUrl;
                    userM.avatarUrl = user.avatarUrl;
                }
                if(!!user.watermark)  {
                    setParams.watermark = user.watermark;
                    userM.watermark = user.watermark;
                }
                if(!!user.username){
                    setParams.username = user.username;
                    userM.username = user.username;
                }
                if(!!user.viplevel){
                    setParams.viplevel = user.viplevel;
                    userM.viplevel = user.viplevel;
                }
                if(!!user.identity){
                    setParams.identity = user.identity;
                    userM.identity = user.identity;
                }
                return userdb.open("wx.user").then(function(collection) {
                    return collection.update({
                        "userId" : userId
                    },{$set:setParams});
                }).then(function(data) {
                    console.log(data.result);
                    userdb.close();
                    return userM;
                }).catch(function(error) {
                    userdb.close();
                    console.error(error)
                    throw error;
                })
            }
        }).catch(function(error) {
            userdb.close();
            console.error(error)
            throw error;
        })
    }else{
        //var userM = data[0];
        //userId = userM.userId;
        var setParams = {};
        if(!!user.openId) {
            setParams.openId = user.openId;
            //userM.openId = user.openId;
        }
        if(!!user.nickName)  {
            setParams.nickName = user.nickName;
            //userM.nickName = user.nickName;
        }
        if(!!user.gender)  {
            setParams.gender = user.gender;
            //userM.gender = user.gender;
        }
        if(!!user.language)  {
            setParams.language = user.language;
            //userM.language = user.language;
        }
        if(!!user.city)  {
            setParams.city = user.city;
            //userM.city = user.city;
        }
        if(!!user.province)  {
            setParams.province = user.province;
            //userM.province = user.province;
        }
        if(!!user.country)  {
            setParams.country = user.country;
            //userM.country = user.country;
        }
        if(!!user.avatarUrl)  {
            setParams.avatarUrl = user.avatarUrl;
            //userM.avatarUrl = user.avatarUrl;
        }
        if(!!user.watermark)  {
            setParams.watermark = user.watermark;
            //userM.watermark = user.watermark;
        }
        if(!!user.username){
            setParams.username = user.username;
            //userM.username = user.username;
        }
        if(!!user.viplevel){
            setParams.viplevel = user.viplevel;
            //userM.viplevel = user.viplevel;
        }
        if(!!user.identity){
            setParams.identity = user.identity;
            //userM.identity = user.identity;
        }
        return userdb.open("wx.user").then(function(collection) {
            return collection.update({
                "userId" : userId
            },{$set:setParams});
        }).then(function(data) {
            console.log(data.result);
            userdb.close();
            return userId;
        }).catch(function(error) {
            userdb.close();
            console.error(error)
            throw error;
        })
    }
};

exports.addInviteInfo = function(data) {
    var time = new Date().getTime();
    var uuid = common.toOnlyId(data.fromUserId+time);
    data.id = uuid;
    data.createTime = time;
    return userdb.open("wx.invite").then(function(collection) {
        return collection.insert([data]);
    }).then(function() {
        userdb.close();
        return data;
    }).catch(function(error) {
        userdb.close();
        console.error(error)
        throw error;
    })
};

exports.pageInvite = function(data) {
    var limit = parseInt(data.limit);
    var page = parseInt(data.page);
    var start = (page-1)*limit;
    var param = {};
    if(!!data.fromUserId) param.fromUserId = data.fromUserId;
    if(!!data.type) param.type = parseInt(data.type);
    return userdb.open("wx.invite").then(function(collection) {
        return collection.find(param).sort({
            createTime:-1
        }).skip(start).limit(limit).toArray();
    }).then(function(data) {
        return userdb.collection.find(param).count().then(count=>{
            userdb.close();
            return ({
                limit,
                count,
                page,
                data
            });
        });
    }).catch(function(error) {
        userdb.close();
        console.error(error)
        throw error;
    })
};

exports.saveUserArt = function(data) {
    var time = new Date().getTime();
    var uuid = common.toOnlyId(data.fromUserId+time);
    data.id = uuid;
    data.createTime = time;
    return userdb.open("wx.userArt").then(function(collection) {
        return collection.insert([data]);
    }).then(function() {
        userdb.close();
        return data;
    }).catch(function(error) {
        userdb.close();
        console.error(error)
        throw error;
    })
};

exports.pageUserArt = function(data) {
    var limit = parseInt(data.limit);
    var page = parseInt(data.page);
    var start = (page-1)*limit;
    var param = {};
    if(!!data.openId) param.openId = data.openId;
    if(!!data.userId) param.userId = data.userId;
    if(!!data.query){
        param['$or'] = [
            {title : eval( '/'+data.query+'/')},
            {author : eval( '/'+data.query+'/')},
            {desc : eval( '/'+data.query+'/')},
            {username :  eval('/'+data.query+'/')}
        ];
    }
    return userdb.open("wx.userArt").then(function(collection) {
        return collection.find(param).sort({
            createTime:-1
        }).skip(start).limit(limit).toArray();
    }).then(function(data) {
        return userdb.collection.find(param).count().then(count=>{
            userdb.close();
            return ({
                limit,
                count,
                page,
                data
            });
        });
    }).catch(function(error) {
        userdb.close();
        console.error(error)
        throw error;
    })
};
exports.pageNewArt = function(data){
    var page = parseInt(data.page);
    var limit = parseInt(data.limit);
    var include = data.include;
    var filter = {};
    if(include && include != ""){
        filter = {
            $or:[
                {title:{$regex:reg}},
                {author:{$regex:reg}},
                {desc:{$regex:reg}}
            ]
        }
    }
    var start = (page - 1)*limit;
    var reg = new RegExp(include,'i');
    return userdb.open("wx.userArt").then(function(collection) {
        return collection.find(filter).sort({
            createTime:-1
        }).skip(start).limit(limit).toArray();
    }).catch(function(error) {
        userdb.close();
        console.error(error)
        throw error;
    })
}