var db = require('./db.js');
var common = require('./common.js');

exports.updateAuthor = function(author) {
    return db.open("wikiart.org.author").then(function(collection) {
        return collection.update({
            "_id" : author._id
        },{$set:{
           'name' : author.name,
           'nationality' : author.nationality,
           'field' : author.field,
           'genre' : author.genre,
           'teachers' : author.teachers,
           'born' : author.born
        }});
    }).then(function(data) {
        return data;
    }).catch(function(error) {
        db.close();
        console.error(error)
        throw error;
    })
}

exports.updateArt = function(art) {
    return db.open("wikiart.org.艺术品").then(function(collection) {
        return collection.update({
            "_id" : art._id
        },{$set:{
            'name' : art.name,
            'style' : art.style,
            'name' : art.name,
            'media' : art.media,
            'title' : art.title,
            'date' : art.date
        }});
    }).then(function(data) {
        return data;
    }).catch(function(error) {
        db.close();
        console.error(error)
        throw error;
    })
}

exports.addDailyArt = function(art) {

    if(!!!art.id){
        delete art.id;
        return db.open("daily.art").then(function(collection) {
                return collection.find({date:art.date}).toArray();
        }).then(function(data) {
            if(!!data && data.length<=0){
                art._id = common.toOnlyId(art.date+new Date().getTime());
                return db.open("daily.art").then(function(collection) {
                    return collection.insert([art]);
                }).then(function() {
                    return "success";
                }).catch(function(error) {
                    db.close();
                    console.error(error)
                    throw error;
                })
            }else{
                return "记录已经存在";
            }
        }).catch(function(error) {
            db.close();
            console.error(error)
            throw error;
        })

    }else{
        var _id = art.id;
        delete art.id;
        return db.open("daily.art").then(function(collection) {
            return collection.update({
                "_id" : _id
            },{$set:{
                'artName' : art.artName,
                'date' : art.date,
                'author' : art.author,
                'time' : art.time,
                'detail' : art.detail
            }});
        }).then(function(data) {
            console.log(data.result);
            return "success";
        }).catch(function(error) {
            db.close();
            console.error(error)
            throw error;
        })
    }
}

exports.delDailyArt = function(art) {
    return db.open("daily.art").then(function(collection) {
        return collection.remove(art);
    }).then(function() {
        return "success";
    }).catch(function(error) {
        db.close();
        console.error(error)
        throw error;
    })
}