/**
 * Created by ck on 2017/3/18.
 */

var sha1 = require('sha1');
var Entities = require('html-entities').XmlEntities;

var Common = {
    //去除Content里面的特殊符号和不相关内容
    Content : function(content){
     content = content.replace(/[\r\n]/ig, "");
     content = content.replace(/\&\w*\w\;/,"");
     content =content.replace(/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/,"");
     return content;
    },

    //替换html中的某个字段(html代表需要处理的内容，repl代表要替换的字段，repled代表替换成什么)
    Replace : function (html,repl,repled) {
        html = html.replace(repl,repled);
        return html;
    },
    //文章uncoide编码转换成utf-8，参数html为要转换的文章或者标题、段落
    tranfEntity:function(html){
        var entities = new Entities();
        return entities.decode(html);
    },

    //生成唯一标识的id，传入参数样式：'title=' +title+ '&source=' + source
    toOnlyId : function (str) {
         var id = sha1(str);
         return id;
    },

    //时间戳生成方法
     toParseTime : function (time) {
         var timestemp = Date.parse(time);
         return timestemp;
     },
    //url提取id(说明提取)
    creatIdfromUrl : function(url){
        var idArr =url.split("/");
        var id = idArr[idArr.length-1];
        if(id.indexOf(".")!= -1){
            var idr = id.split(".");
            id = idr[idr.length-1];
        }
        return id;
    },

    //去除html的文字链接，确保传入的html参数是转码之后的
    cutHref : function(html){
        var html = html.replace(/href=\"(.*)\"/g,'');
        return html;
    },
    //去除包含字符所属段落
    //删除含有特殊语句的段落
    //$,爬虫下来的$对象
    //content:html元素选择对象,传参形式为content："#divcontent"
    //index:要指定删除段落的序列号，若要删除第一段index：first，最后一段：index:last，若要全文查找：index:''，也可以数字指定第几段idnex:5 范围[0,html.length-1]
    //arry:字符串数组，要查找删除的段落是否包含该字符串，如果包含其中一个就删除
    //return返回已删除段落的html字符串
    deleSetcion:function($,content,index,arry){
        function find_head(strIndex,strIndex_1,str){
            var str_1 = str.substring(strIndex_1,strIndex);
            if(str_1.indexOf(">") > -1){
                return strIndex_1;
            }else{
                var newIndex = str.lastIndexOf("<",strIndex_1);
                return find_html(strIndex_1,newIndex,str);
            }
        }
        function find_foot(strIndex,strIndex_2,str){
            var str_1 = str.substring(strIndex,strIndex_2);
            if(str_1.indexOf("</") > -1){
                return strIndex_2;
            }else{
                var newIndex = str.indexOf(">",strIndex_2);
                return find_html(strIndex_2,newIndex,str);
            }
        }
        if(!index || index == ""){
            var str = this.tranfEntity($(content).html());
            for(var i = 0; i < arry.length; i++){
                var strIndex = str.indexOf(arry[i]);
                console.log("---------------strIndex" + strIndex)
                if(strIndex > -1){
                    var strIndex_1 = str.lastIndexOf("<",strIndex);
                    strIndex_1 = find_head(strIndex,strIndex_1,str);
                    var strIndex_2 = str.indexOf(">",strIndex);
                    strIndex_2 = find_foot(strIndex,str.length-1,str);
                    str = str.substring(0,strIndex_1) + str.substring(strIndex_2 + 1);
                    console.log(str)
                }
            }
            return str;
        }
        function find_child_first($,children){
            if($(children[0]).children().length <= 0){
                return children[0];
            }else{
                return find_child_first($,$(children[0]).children())
            }
        }
        function find_child_last($,children){
            if($(children[children.length - 1]).children().length <= 0){
                return children[children.length - 1];
            }else{
                return find_child_last($,$(children[children.length - 1]).children())
            }
        }
        var chlid;
        var children = $(content).children();
        if(index == "first" || index < 0){
            chlid = find_child_first($,children);
        }else if((index == "last") || (index > children.length - 1)){
            chlid = find_child_last($,children);
        }else{
            chlid = children[index];
        }
        for(var i = 0; i < arry.length; i++){
            console.log(this.tranfEntity($(chlid).text()))
            if(this.tranfEntity($(chlid).text()).indexOf(arry[i])){
                $(chlid).remove();
                break;
            }
        }
        return $(content).html();
    },
	/**
	 *文章内图片添加自适应类,如果存在干扰的行内样式,先去除
	 * html：html字符串
	 */
	 formatImg:function(html){
		var newContent= html.replace(/<img[^>]*>/gi,function(matchs,capture){
		var matchStr = matchs.match(/style=\"(.*)\"/gi);
		if(matchStr){
            matchs = matchs.replace(/style=\"(.*)\"/gi, 'class="img-responsive"');
		}else{
            matchs = matchs.replace('<img','<img class="img-responsive"');
		}
        return matchs;
	 })
        return newContent;
    }
}

module.exports = Common