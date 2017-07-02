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