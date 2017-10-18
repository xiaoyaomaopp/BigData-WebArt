var dao = require('./dailyDao.js');
var read = require('./read.js');
var update = require('./update.js');

exports.getNewArt = function() {
    return dao.getUnusedArt().then(arts=>{
        if(!!arts && arts.length>0){
            return arts[0];
        }else{
            return null;
        }
    });
}

exports.useNewArt = function(id) {
    return dao.updateArtUsed(id);
}

exports.updateDailyArt = function() {
    var date = new Date();
    var query = {
        offset : 0,
        limit : 1
    };
    query['search'] = ''+date.getFullYear() + (date.getMonth()>8?(date.getMonth()+1):('0'+(date.getMonth()+1))) + (date.getDate().toString().length>1?date.getDate():'0'+date.getDate())
    return read.queryDailyArt(query).then(result=>{
        if(!!!result || (!!result && !!result.rows)){
            if(result.rows.length<=0){
                this.getNewArt().then(data=>{
                    var time = data['culture'] + ' ';
                    if(!!data['period']) time += ' ('+ data['period'] +')';
                    if(!!data['createTime']) time += ' '+ data['createTime'];
                    var source = data['source'];
                    update.addDailyArt({
                        date : query['search'],
                        path : data['imgUrl'],
                        artName : data['title'],
                        column : '大英博物馆世界简史',
                        from : 'by ' + source,
                        author : '',
                        time : time,
                        detail: data['location'] + '<br /><br />' + data['description']
                    }).then(res=>{
                        console.log(res);
                        if(!!data){
                            return this.useNewArt(data.id).then(rr=>{
                                return rr;
                            });
                        }else{
                            return '未更新作品状态';
                        }
                    });
                });
            }else{
                return query['search'] +'已经存在艺术品';
            }
        }else{
            return '异常';
        }
    });


}