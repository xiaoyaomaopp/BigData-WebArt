var db = require('./db.js');

exports.artsByPage = function(page, limit, query) {
	var start = (page - 1) * limit;
    var param = {
    };
    if(!!query && !!query.artName){
        param.title = eval('/'+query.artName+'/');
    }
	return db.open("wikiart.org.艺术品").then(function(collection) {
		return collection.find(param).sort({
            _createAt: -1
		}).skip(start).limit(limit).toArray();
	}).then(function(data) {
		//console.log(data.length, "data");
		return db.collection.find(param).count().then(function(count) {
			db.close();
			return ({
				limit,
				count,
				page,
				data
			});
		})
	}).catch(function(error) {
		db.close();
		console.error(error)
		throw error;
	})
}

exports.authorByPage = function(page, limit, query) {
	var start = (page - 1) * limit;
	var param = {};
	if(!!query && !!query.authorName){
		param.name = eval('/'+query.authorName+'/');
	}
	if(!!query && !!query.genre){
		param.genre = eval('/'+query.genre+'/');
	}
    //console.log(param);
	return db.open("wikiart.org.艺术家").then(function(collection) {
		return collection.find(param).sort({
			_updateAt: -1
		}).skip(start).limit(limit).toArray();
	}).then(function(data) {
		//console.log(data.length, "data");
		return db.collection.find(param).count().then(function(count) {
			db.close();
			return ({
				limit,
				count,
				page,
				data
			});
		})
	}).catch(function(error) {
		db.close();
		console.error(error)
		throw error;
	})
}

exports.articleWithHits = function(id) {
	return db.open("articles").then(function(collection) {
		return collection.findOne({
			"id": id
		});
	}).then(function(data) {
		console.log("get------------------------------"+data)
		return data
	}).catch(function(error) {
		db.close();
		console.error(error)
		throw error;
	})
}

exports.getArtByAuthor = function(query) {
    db.close();
	var param = {};
	if(!!query && !!query.authorName){
		param.author = eval('/'+query.authorName+'/');
	}
	return db.open('wikiart.org.艺术品').then(function(collection) {
		return collection.find(param).sort({
			_updateAt: -1
		}).toArray();
	}).then(function(data) {
		return db.collection.find(param).count().then(function(count) {
			db.close();
			return ({
				count,
				data
			});
		})
	}).catch(function(error) {
		db.close();
		console.error(error)
		throw error;
	})
}

exports.getArtById = function(id) {
    return db.open("wikiart.org.艺术品").then(function(collection) {
        return collection.findOne({
            "_id": id
        });
    }).then(function(data) {
        console.log("get------------------------------"+data)
        return data
    }).catch(function(error) {
        db.close();
        console.error(error)
        throw error;
    })
}

exports.getDailyArt = function(date) {
    return db.open("daily.art").then(function(collection) {
        return collection.find({
            "date": date+""
        }).toArray();
    }).then(function(data) {
        console.log("getDailyArt------------------------------"+data);
        db.close();
        return data;
    }).catch(function(error) {
        db.close();
        console.error(error)
        throw error;
    })
}

exports.queryDailyArt = function(query) {
    //var start = (page - 1) * query.limit;
    var param = {};

    var sort = {
        "date" : -1
    };
    if(!!query.sort){
        sort[query.sort] = query.order=='asc'?1:-1;
    }
	if(!!query.search){
		param['date'] = query.search;
	}
    return db.open("daily.art").then(function(collection) {
        return collection.find(param).sort(sort).skip(parseInt(query.offset)).limit(parseInt(query.limit)).toArray();
    }).then(function(rows) {
        return db.collection.find(param).count().then(function(total) {
            db.close();
            return ({
                limit:query.limit,
                total,
                offset:query.offset,
                rows
            });
        })
    }).catch(function(error) {
        db.close();
        console.error(error)
        throw error;
    })
}