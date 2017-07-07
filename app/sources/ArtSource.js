var ArtSource = {
    getArt: function(page, limit = 10, params = {}) {
        return new Promise(function(resolve, reject) {
            var url = "/api/art"
            $.get(url, {
                "page": page,
                "limit": limit,
                "query": params
            }).done(resolve).fail(reject);
        })
    },
    getArtByAuthor: function(authorName){
        return new Promise(function(resolve,reject){
            var url = "/api/getArtByAuthor";
            $.get(url, {
                "authorName": authorName
            }).done(resolve).fail(reject);
        })
    },
    getArtById: function(id){
        return new Promise(function(resolve,reject){
            var url = "/api/getArtById";
            $.get(url, {
                "_id": id
            }).done(resolve).fail(reject);
        })
    },
    updateArtById: function(data){
        return new Promise(function(resolve,reject){
            var url = "/api/updateArtById";
            $.post(url, data).done(resolve).fail(reject);
        })
    }
}

export default ArtSource;
