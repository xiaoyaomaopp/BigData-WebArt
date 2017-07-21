function GetCurrentDateTime(AddDayCount) {
    var d = new Date();
	d.setDate(d.getDate()+AddDayCount);
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var date = d.getDate();
    var week = d.getDay();

    var curDateTime = year;
    if (month > 9)
        curDateTime = curDateTime + "年" + month;
    else
        curDateTime = curDateTime + "年0" + month;
    if (date > 9)
        curDateTime = curDateTime + "月" + date + "日";
    else
        curDateTime = curDateTime + "月0" + date + "日";

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
    curDateTime ='<h2>'+ curDateTime + " 周" + weekday +'</h2><h1>'+date+'</h1>';

    return curDateTime;
}

function GetCurrentDate(AddDayCount) {
    var d = new Date();
    d.setDate(d.getDate()+AddDayCount);
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var date = d.getDate();
    var week = d.getDay();

    var curDateTime = year;
    if (month > 9)
        curDateTime = curDateTime + "年" + month;
    else
        curDateTime = curDateTime + "年0" + month;
    if (date > 9)
        curDateTime = curDateTime + "月" + date + "日";
    else
        curDateTime = curDateTime + "月0" + date + "日";

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

    var mouthCN = "";
    if (month == 0)
        mouthCN = "日";
    else if (month == 1)
        mouthCN = "一";
    else if (month == 2)
        mouthCN = "二";
    else if (month == 3)
        mouthCN = "三";
    else if (month == 4)
        mouthCN = "四";
    else if (month == 5)
        mouthCN = "五";
    else if (month == 6)
        mouthCN = "六";
    else if (month == 7)
        mouthCN = "七";
    else if (month == 8)
        mouthCN = "八";
    else if (month == 9)
        mouthCN = "九";
    else if (month == 10)
        mouthCN = "十";
    else if (month == 11)
        mouthCN = "十一";
    else if (month == 12)
        mouthCN = "十二";

    curDateTime ='<span class="mouth">'+mouthCN+'月</span><span class="day mouth">'+ date + '日</span> <span class="mouth">周'+weekday+"</span>";
    return curDateTime;
}
   