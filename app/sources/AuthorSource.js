var AuthorSource = {
    getAuthor:function(page=1,limit=10){
        return new Promise(function(resolve,reject){
            var url = "/api/author";
            $.get(url, {
                "page": page,
                "limit": limit
            }).done(resolve).fail(reject);
        })
    }
}

export default AuthorSource