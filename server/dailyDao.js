var dailyForArtDB = require('./dailyForArtDB.js');

exports.getUnusedArt = function() {
    return dailyForArtDB.open("bbc.history").then(function(collection) {
        return collection.find({
            "used": null
        }).limit(1).toArray();
    }).then(res=>{
        dailyForArtDB.close();
        return res;
    }).catch(function(error) {
        dailyForArtDB.close();
        console.error(error)
        throw error;
    })
}

exports.updateArtUsed = function(id) {
    return dailyForArtDB.open("bbc.history").then(function(collection) {
        return collection.update({
            "id" : id
        },{$set:{
            'used' : true
        }});
    }).then(function(data) {
        dailyForArtDB.close();
        return data;
    }).catch(function(error) {
        dailyForArtDB.close();
        console.error(error)
        throw error;
    })
}