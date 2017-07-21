// JavaScript Document
function slidedata(i,art,type){
	var html = '<div class="swiper-slide">' +
		'<div class="dailyart-card">';

        if(!!art){
            if(!!art.path) html += '<div class="dailyart-pic"><div class="dailyart-pic-win"><img src="'+art.path+'" /></div></div>';
            html += '<div class="dailyart-time">'+GetCurrentDate(i)+'</div>';
            html += '<div class="dailyart-info"' +
                '<table>' +
                '<tbody>' ;
            if(!!art.artName) html += '<tr>' +
                '<td><span class="artName">'+art.artName+'</span></td>' +
                '</tr>' ;
            if(!!art.author)  html += '<tr>' +
                '<td><span class="author">'+art.author+'</span></td>' +
                '</tr>' ;
            if(!!art.time) html +='<tr>' +
                '<td><span class="year">'+art.time+'</span></td>' +
                '</tr>' +
                '</tbody>' +
                '</table>' ;
            if(!!art.detail) html +='<div class="detail">' +
                art.detail +
                '</div>' +
                '</div>' ;
        }else if(type=='1'){
            html += '<div class="dailyart-pic"><div class="dailyart-pic-win"><img src="../images/daliy-art/tomor.jpg" /></div></div>';
            html += '<div class="dailyart-time">'+GetCurrentDate(i)+'</div>';
        }else{
            html += '<div class="dailyart-pic"><div class="dailyart-pic-win"><img src="../images/daliy-art/unfind.jpg" /></div></div>';
            html += '<div class="dailyart-time">'+GetCurrentDate(i)+'</div>';
        }

		html += '</div>' +
		'</div>';
	return html;
}

var mySwiper = new Swiper('.swiper-container', {
    roundLengths : true, 
	initialSlide :2,
	speed:600,
	slidesPerView:"auto",
	centeredSlides : true,
	followFinger : false,
})
today=0;//默认显示今天
pre=2;
next=2;
init(today,function(data){

mySwiper.appendSlide(slidedata(today,data['so'+today]));
mySwiper.appendSlide(slidedata(today+1,null,1));
//mySwiper.appendSlide(slidedata(today+2));
mySwiper.prependSlide(slidedata(today-1,data['so'+(today-1)]));
mySwiper.prependSlide(slidedata(today-2,data['so'+(today-2)]));
mySwiper.on('slideChangeStart',function(swiper){
	//swiper.params.allowSwipeToPrev = false;
	swiper.lockSwipes();

})

mySwiper.on('slideChangeEnd',function(swiper){
	//alert(swiper.activeIndex);
    swiper.unlockSwipes();

	if(swiper.activeIndex==1){		
		pre++;
        getArt(getArtDate(today-pre),function(data){
            swiper.prependSlide(slidedata((today-pre),data));
        })
    }
		if(swiper.activeIndex==0){		
		pre++;
	    swiper.prependSlide(slidedata(today-pre));
		pre++;
	    swiper.prependSlide(slidedata(today-pre));
	}

	//if(swiper.activeIndex==swiper.slides.length-2){
	//	next++;
	//	swiper.appendSlide(slidedata(today+next));
	//		}
//swiper.params.allowSwipeToPrev = true;
	})

});

function init(index,callBack){
    var obj = {};
    getArt(getArtDate(index),function(data){
        if(!!data){
            obj['so'+index] = data;
        }
        getArt(getArtDate(index-1),function(data){
            if(!!data){
                obj['so'+(index-1)] = data;
            }
            getArt(getArtDate(index-2),function(data){
                if(!!data){
                    obj['so'+(index-2)] = data;
                }
                if(!!callBack){
                    callBack(obj);
                }
                return obj;
            })
        })
    })
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
