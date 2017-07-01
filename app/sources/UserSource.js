var UserSource = {
    getCuurentUser:function(){
        return new Promise(function(resolve,reject){
            var url = "/api/currentUser";
            $.get(url, {}).done(resolve).fail(reject);
        })
    }
}

export default UserSource;