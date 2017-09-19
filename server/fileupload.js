var fs = require('fs');

exports.dailryArtImg = function(err, fields, files, filePath) {
    //var filesTmp = JSON.stringify(files,null,'thumbnail');
    if(err){
        console.log('parse error: ' + err);
    } else {
        //console.log('parse files: ' + filesTmp);
        try{
            var inputFile = files.thumbnail[0];
            var uploadedPath = inputFile.path;
            var dstPath = filePath + 'dailyArt' + formatDate(new Date(),'yyyyMMddhhmmss') + '-' + inputFile.originalFilename;
            //重命名为真实文件名
            fs.rename(uploadedPath, dstPath, function(err) {
                if(err){
                    console.log('rename error: ' + err);
                } else {
                    //console.log('rename ok');
                }
            });
        }catch(e){
            console.log(e);
        }

    }
    var retPath = '';
    if(!err) retPath = dstPath.replace('./public/','../');
    return {
        success : !err,
        path : retPath
    };
};

function formatDate(date, fmt) {
    var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

exports.uploadUserArt = function(err, fields, files, filePath) {
    if(err){
        console.log('parse error: ' + err);
    } else {
        //console.log('parse files: ' + filesTmp);
        try{
            var inputFile = files.thumbnail[0];
            var uploadedPath = inputFile.path;
            var dstPath = filePath + 'art_' + formatDate(new Date(),'yyyyMMddhhmmss') + '-' + inputFile.originalFilename;
            //重命名为真实文件名
            fs.rename(uploadedPath, dstPath, function(err) {
                if(err){
                    console.log('rename error: ' + err);
                } else {
                    //console.log('rename ok');
                }
            });
        }catch(e){
            console.log(e);
        }

    }
    var retPath = '';
    if(!err) retPath = dstPath.replace('./public/','/');
    return {
        success : !err,
        path : retPath
    };
};