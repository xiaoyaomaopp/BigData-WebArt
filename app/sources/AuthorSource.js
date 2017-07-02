var AuthorSource = {
    getAuthor:function(page=1,limit=10,params={}){
        return new Promise(function(resolve,reject){
            var url = "/api/author";
            var param = {
                "page": page,
                "limit": limit,
                "query": params
            };
            $.get(url, param).done(resolve).fail(reject);
        })
    },
    updateAuthor:function(author={}){
        return new Promise(function(resolve,reject){
            var url = "/api/updateAuthor";
            $.post(url, author).done(resolve).fail(reject);
        })
    }
}

export default AuthorSource;