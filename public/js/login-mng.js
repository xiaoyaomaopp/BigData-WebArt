var dailyArt = {
    today : 0,
    pre : 0,
    next : 0,
    active : 0,
    art : [],
    leftMar : 0,
    startDate : '20170801',
    defaultPic : '/images/login.jpg',
    tomorrowPic : '/images/daliy-art/tomorrow.jpg'
};

function setLikeStatus(){
    var activeArt = dailyArt.art[dailyArt.today-dailyArt.active];
    if(!!activeArt && !!activeArt.like && !!activeArt._id){
        $(".islike").removeClass("canlike-icon").removeClass("like-icon").addClass("like-icon");
    }else if(!!activeArt && !!!activeArt.like && !!activeArt._id){
        $(".islike").removeClass("canlike-icon").removeClass("like-icon").addClass("canlike-icon");
    }else{
        $(".islike").removeClass("canlike-icon").removeClass("canlike-icon");
    }
}

$(function(){
    setBackgroundPicture();
    initDailyArt();
    var panelHeight = $(document).height()-30-30;
    $(".panel-dialog").css("height", panelHeight+"px")
    $(".panel-content").css("height", (panelHeight-80)+"px");
    var wWidth = $(window).width();

    var wHeight = $(window).height();
    var sHeight = wHeight-160;
    var sWidth = sHeight*wWidth/wHeight;
    $(".dailyart-pic1").width(sWidth);
    $(".dailyart-pic1").height(sHeight);
    $(".dailyart-pic1 img").css('max-height',sHeight+'px');
    $(".dailyart-pic1 img").css('max-width',(wWidth-110)+'px');

    $(".canlike-icon").on('click',function(){
        var activeArt = dailyArt.art[dailyArt.today-dailyArt.active];
        if(!!activeArt && !!!activeArt.like && !!activeArt._id){
            dailyArt.art[dailyArt.today-dailyArt.active].like = true;
            $(".islike").removeClass("canlike-icon").addClass("like-icon");
            //下发
            $.post("/api/likeDailyArt",{_id:activeArt._id},function(data){
            });
        }
    });

    $(".bg-icon").on('click',function(){
        var flag = false;
        if($("#panel").hasClass("in") && ((!!$(".login_title") && $(".login_title").length>1)
            || (!!$(".dailyart-detail") && $(".dailyart-detail").length>1))){
            flag = true;
        }
        loadBgPanel(flag);
        if(!flag){
            changeModalStatus();
        }
    });
    $(".login-icon").on('click',function(){
        var flag = false;
        if($("#panel").hasClass("in") && ((!!$(".bg-panel-detail") && $(".bg-panel-detail").length>1)
            || (!!$(".dailyart-detail") && $(".dailyart-detail").length>1))){
            flag = true;
        }
        $(".panel-content").html($(".login-panel-info").html());
        if(!flag){
            changeModalStatus();
        }else{
            $(".panel-content").mCustomScrollbar("destroy");
            $(".panel-content").mCustomScrollbar({axis:"y"});
        }
    });
    $(".info-icon").on('click',function(){
        var flag = false;
        if($("#panel").hasClass("in") && ((!!$(".login_title") && $(".login_title").length>1)
            || (!!$(".bg-panel-detail") && $(".bg-panel-detail").length>1))){
            flag = true;
        }
        loadPanelDailyArt(flag);
        if(!flag){
            changeModalStatus();
        }
    });
    $("body").on('click','.login_btn',function(){
        login();
    });
    $("body").on('click','.left-icon',function(){
        if(!!!$(".left-icon").hasClass("btn-left-disabled")){
            dailyArt.active++;
            if(dailyArt.pre<dailyArt.active){
                getArt(getArtDate(dailyArt.today-dailyArt.active),function(data){
                    if(!!data){
                        dailyArt.art[dailyArt.today-dailyArt.active] = data;
                        dailyArt.pre = dailyArt.active;
                        loadWindowArt();
                    }else{
                        dailyArt.art[dailyArt.today-dailyArt.active] = {
                            path: dailyArt.defaultPic,
                            date: getArtDate(dailyArt.today-dailyArt.active),
                            artName: '',
                            author: '',
                            time: '',
                            detail: '',
                            copyfrom: '',
                            column: ''
                        };
                        loadWindowArt();
                    }
                });
            }else{
                loadWindowArt();
            }
            if(dailyArt.active>=dailyArt.today){
                $(".right-icon").removeClass("btn-right-disabled");
            }
            if(compareTime(dailyArt.startDate,getArtDate(dailyArt.today-dailyArt.active))){
                $(".left-icon").addClass("btn-left-disabled");
            }
        }
    });
    $("body").on('click','.right-icon',function(){
        if(!!!$(".right-icon").hasClass("btn-right-disabled")){
            dailyArt.active--;
            if(dailyArt.active==dailyArt.today-1){
                $(".right-icon").addClass("btn-right-disabled");
            }
            loadWindowArt();
        }
        if(!compareTime(dailyArt.startDate,getArtDate(dailyArt.today-dailyArt.active))){
            $(".left-icon").removeClass("btn-left-disabled");
        }
    });
    $("body").on('click','.bglist',function(){
        var bg = $.cookie("login_bg") || '00';
        var selectedId = $(this).attr("data-id");
        if(bg!=selectedId){
            $(".bg-panel-list .selected").remove();
            $(this).parent().prepend('<span class="selected fadeIn"></span>');
            $.cookie("login_bg",selectedId, { expires: 365, path: '/' });
            setBackgroundPicture();
        }
    });
    $("#login_pwd").on('keydown',function(event){
        if (event.keyCode == "13") {//keyCode=13是回车键
            login();
        }
    });
    $('#panel').on('show.bs.modal', function () {
        dailyArt.leftMar = $(".dailyart-pic1").css("margin-left");
        $(".dailyart-pic1").animate({'margin-left': '8%'}, 300)
        $(".panel-content").mCustomScrollbar({
            axis:"y"
        });
    });
    $('#panel').on('hidden.bs.modal', function () {
        $(".dailyart-pic1").animate({'margin-left': dailyArt.leftMar}, 300)
        $(".panel-content").html("");
        $(".panel-content").mCustomScrollbar("destroy");
    });

})

function setBackgroundPicture(){
    var bg = $.cookie("login_bg") || '00';
    if(!!loginBg && loginBg.length>0){
        for(var i=0; i<loginBg.length; i++){
            if(bg===loginBg[i].id){
                $("#login").css('background-image','url('+loginBg[i].url+')');
            }
        }
    }
}

function compareTime(a,b){
    var aStr = a.substring(0,4)+'-'+a.substring(4,6)+'-'+a.substring(6,8);
    var bStr = b.substring(0,4)+'-'+b.substring(4,6)+'-'+b.substring(6,8);
    return (new Date(aStr))>=(new Date(bStr));
}

function loadPanelDailyArt(flag){
    var activeArt = dailyArt.art[dailyArt.today-dailyArt.active];
    $(".publishDate .date").html(((!!activeArt.column)?'《':'')+activeArt.column+((!!activeArt.column)?'》':'')+' '+getArtDateCN(activeArt.date));
    $(".dailyArt-panel-info .dailyArt-detail-img").attr("src",activeArt.path);
    $(".dailyArt-panel-info .artName").html(activeArt.artName);
    $(".dailyArt-panel-info .author").html(activeArt.author);
    $(".dailyArt-panel-info .time").html(activeArt.time);
    $(".dailyart-more-info .detail").html(activeArt.detail);
    $(".dailyart-more-info .copyfrom").html(activeArt.from);
    $(".panel-content").html($(".dailyArt-panel-info").html());
    if(!!flag){
        $(".panel-content").mCustomScrollbar("destroy");
        $(".panel-content").mCustomScrollbar({axis:"y"});
    }
}

function loadBgPanel(flag){
    var bg = $.cookie("login_bg");
    if(!!!bg) bg = '00';
    var listHtml = '';
    if(!!loginBg && loginBg.length>0){
        for(var i=0; i<loginBg.length; i++){
            listHtml += '<li>';
            if(bg==loginBg[i].id){
                listHtml += '<span class="selected fadeIn"></span>';
            }
            listHtml += '<img class="bglist" data-id="'+loginBg[i].id+'" src="'+loginBg[i].url+'" />';
            listHtml += '<p>'+loginBg[i].name+'</p>';
            listHtml += '</li>';
        }
    }else{
        listHtml = '未提供艺术主题';
    }
    $(".bg-panel-list").html(listHtml);
    $(".panel-content").html($(".bg-panel-info").html());
    if(!!flag){
        $(".panel-content").mCustomScrollbar("destroy");
        $(".panel-content").mCustomScrollbar({axis:"y"});
    }
}

function loadWindowArt(){
    if($("#panel").hasClass("in") && !!$(".dailyart-detail") && $(".dailyart-detail").length>1){
        loadPanelDailyArt(true);
    }
    var dart = dailyArt.art[dailyArt.today-dailyArt.active];
    $(".dailyart-pic1 img").animate({
        'margin-left': '-3000px'
    }, 800,'linear',function(){
        $(".dailyart-pic1 img").css({'margin-left': '0px','margin-right': '-3000px'})
            .attr('src',dart.path)
            .attr('alt',dart.artName)
            .attr('title',dart.artName)
    }).animate({
        'margin-right': '0px'
    }, 1000);
    setLikeStatus();
}

function initDailyArt(){
    dailyArt.art[dailyArt.today+1] = {
        path: dailyArt.tomorrowPic,
        date: getArtDate(dailyArt.today+1),
        artName: '',
        author: '',
        time: '',
        detail: '',
        copyfrom: '',
        column: ''
    };
    getArt(getArtDate(dailyArt.today),function(data){
        if(!!data){
            dailyArt.art[dailyArt.today] = data;
            loadWindowArt();
        }else{
            dailyArt.art[dailyArt.today-dailyArt.active] = {
                path: dailyArt.defaultPic,
                date: getArtDate(dailyArt.today-dailyArt.active),
                artName: '',
                author: '',
                time: '',
                detail: '',
                copyfrom: '',
                column: ''
            };
            loadWindowArt();
        }
    });
}

function login(){
    $.post("/api/login", {
        account: $("#login_user").val(),
        password: $("#login_pwd").val()
    }, function(data) {
        if (data.result) {
            location.href = "home";
        } else {
            $(".login_item_msg").show()
        }
    }, "json")
}

function changeModalStatus(){
    if($("#panel").hasClass("in")){
        $("#panel").modal("hide");
    }else{
        $("#panel").modal("show");
    }
}

function getArtDate(AddDayCount){
    var d = new Date();
    d.setDate(d.getDate()+AddDayCount);
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var date = d.getDate();
    var ss = year;
    if(month>9){
        ss += month;
    }else{
        ss += '0'+ month;
    }
    if(date > 9){
        ss += date;
    }else{
        ss += '0'+ date;
    }
    return ss;
}

function getArtDateCN(dateStr){
    if(!!dateStr && dateStr.length==8){
        dateStr = dateStr.substr(0,4) +'-'+ dateStr.substr(4,2) +'-'+ dateStr.substr(6,2);
    }
    var d = new Date(dateStr);
    //var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var date = d.getDate();
    var week = d.getDay();
    //var curDateTime = year;
    //if (month > 9)
    //    curDateTime = curDateTime + "年" + month;
    //else
    //    curDateTime = curDateTime + "年0" + month;
    //if (date > 9)
    //    curDateTime = curDateTime + "月" + date + "日";
    //else
    //    curDateTime = curDateTime + "月0" + date + "日";

    var weekday = "";
    if (week == 0)
        weekday = "日";
    else if (week == 1)
        weekday = "一";
    else if (week == 2)
        weekday = "二";
    else if (week == 3)
        weekday = "三";
    else if (week == 4)
        weekday = "四";
    else if (week == 5)
        weekday = "五";
    else if (week == 6)
        weekday = "六";

    //var mouthCN = "";
    //if (month == 0)
    //    mouthCN = "日";
    //else if (month == 1)
    //    mouthCN = "一";
    //else if (month == 2)
    //    mouthCN = "二";
    //else if (month == 3)
    //    mouthCN = "三";
    //else if (month == 4)
    //    mouthCN = "四";
    //else if (month == 5)
    //    mouthCN = "五";
    //else if (month == 6)
    //    mouthCN = "六";
    //else if (month == 7)
    //    mouthCN = "七";
    //else if (month == 8)
    //    mouthCN = "八";
    //else if (month == 9)
    //    mouthCN = "九";
    //else if (month == 10)
    //    mouthCN = "十";
    //else if (month == 11)
    //    mouthCN = "十一";
    //else if (month == 12)
    //    mouthCN = "十二";
    return month+'月'+ date + '日 周'+weekday;
}

function getArt(date,callBack){
    $.get("/api/getDailyArt",{date:date},function(data){
        if(!!data && data.length>0){
            if(!!callBack){
                callBack(data[0]);
            }
            return data[0];
        }else{
            if(!!callBack){
                callBack(null);
            }
            return null;
        }
    });
}

function toPassword(){
    $(".panel-content .login_password").focus();
}

var loginBg=[
    {
      id:'00',
      name:'罗浮宫',
      url:'../images/background/login.jpg',
    },{
        id:'01',
        name:'苏州博物馆',
        url:'../images/background/suzhou.jpg',
    },{
        id:'02',
        name:'苏州博物馆湖边风光',
        url:'../images/background/suzhou2.jpg',
    }
];