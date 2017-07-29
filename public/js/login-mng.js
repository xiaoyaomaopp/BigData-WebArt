var dailyArt = {
    today : 0,
    pre : 0,
    next : 0,
    active : 0,
    art : [],
    leftMar : 0,
    startDate : '20170731',
    defaultPic : '/images/login.jpg'
};
$(function(){
    initDailyArt();
    var panelHeight = $(document).height()-30-30;
    $(".panel-dialog").css("height", panelHeight+"px")
    $(".panel-content").css("height", (panelHeight-80)+"px");

    $(".login-icon").on('click',function(){
        var flag = false;
        if($("#panel").hasClass("in") && !!$(".dailyart-detail") && $(".dailyart-detail").length>1){
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
        if($("#panel").hasClass("in") && !!$(".login_title") && $(".login_title").length>1){
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
                        };
                        loadWindowArt();
                    }
                });
            }else{
                loadWindowArt();
            }
            if(dailyArt.active>dailyArt.today){
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
            if(dailyArt.active==dailyArt.today){
                $(".right-icon").addClass("btn-right-disabled");
            }
            loadWindowArt();
        }
        if(!compareTime(dailyArt.startDate,getArtDate(dailyArt.today-dailyArt.active))){
            $(".left-icon").removeClass("btn-left-disabled");
        }
    });
    $("#login_pwd").on('keydown',function(event){
        if (event.keyCode == "13") {//keyCode=13ÊÇ»Ø³µ¼ü
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

function compareTime(a,b){
    var aStr = a.substring(0,4)+'-'+a.substring(4,6)+'-'+a.substring(6,8);
    var bStr = b.substring(0,4)+'-'+b.substring(4,6)+'-'+b.substring(6,8);
    return (new Date(aStr))>=(new Date(bStr));
}

function loadPanelDailyArt(flag){
    var activeArt = dailyArt.art[dailyArt.today-dailyArt.active];
    $(".publishDate .date").html(activeArt.date);
    $(".dailyArt-panel-info .dailyArt-detail-img").attr("src",activeArt.path);
    $(".dailyArt-panel-info .artName").html(activeArt.artName);
    $(".dailyArt-panel-info .author").html(activeArt.author);
    $(".dailyArt-panel-info .time").html(activeArt.time);
    $(".dailyart-more-info .detail").html(activeArt.detail);
    $(".panel-content").html($(".dailyArt-panel-info").html());
    if(!!flag){
        $(".panel-content").mCustomScrollbar("destroy");
        $(".panel-content").mCustomScrollbar({axis:"y"});
    }
}

function loadWindowArt(){
    if($("#panel").hasClass("in") && !!$(".dailyart-detail") && $(".dailyart-detail").length>1){
        loadPanelDailyArt(true);
    }
    var ww = $(".dailyart-pic-win1").css("width");
    $(".dailyart-pic-win1").animate({}, 0).animate({}, 0).css({
        "background":"url("+dailyArt.art[dailyArt.today-dailyArt.active].path+")",
        "background-repeat": "no-repeat",
        "background-position-x": "center",
        "background-position-y": "center",
        "-webkit-background-size": "cover",
        "-moz-background-size": "cover",
        "-o-background-size": "cover",
        "background-size": "cover"
    });
}

function initDailyArt(){
    getArt(getArtDate(dailyArt.today),function(data){
        if(!!data){
            $(".dailyart-pic1").removeClass("hide");
            dailyArt.art[dailyArt.today] = data;
            $(".dailyart-pic-win1").css("background","url("+data.path+")");
        }else{
            dailyArt.art[dailyArt.today-dailyArt.active] = {
                path: dailyArt.defaultPic,
                date: getArtDate(dailyArt.today-dailyArt.active),
                artName: '',
                author: '',
                time: '',
                detail: '',
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