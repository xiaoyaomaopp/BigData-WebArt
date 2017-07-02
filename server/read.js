var db = require('./db.js');

exports.articlesByPage = function(page, limit) {
	var start = (page - 1) * limit;
	return db.open("articles").then(function(collection) {
		return collection.find({
			"delete": null,
            "similar": {$ne:null,$exists:true}
		}).sort({
			createDate: -1
		}).skip(start).limit(limit).toArray();
	}).then(function(data) {
		//console.log(data.length, "data");
		return db.collection.find().count().then(function(count) {
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
	return db.open("wikiart.org.author").then(function(collection) {
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