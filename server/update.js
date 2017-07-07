var db = require('./db.js');

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
    return db.open("wikiart.org.“’ ı∆∑").then(function(collection) {
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