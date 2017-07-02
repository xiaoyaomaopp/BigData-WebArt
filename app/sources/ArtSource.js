var ArtSource = {
    getArt: function(page, limit = 10) {
        return new Promise(function(resolve, reject) {
            var url = "/api/art"
            $.get(url, {
                "page": page,
                "limit": limit
            }).done(resolve).fail(reject);
        })
    },
    getArtByAuthor:function(authorName){
        return new Promise(function(resolve,reject){
            var url = "/api/getArtByAuthor";
            $.get(url, {
                "authorName": authorName
            }).done(resolve).fail(reject);
        })
    }
}

export default ArtSource;
