var during = 10 * 60 * 1000;

var date = getSunRiseSet(31.84,117.15,8);

var sunRise_start = date.sunRise_start;
    sunRise_end = date.sunRise_end,
    sunSet_start = date.sunSet_start,
    sunSet_end = date.sunSet_end;

var time = nowTime(),
    now = nowTime().now;

var sunriseSong = new Audio("sunrise.mp3"),
    daySong = new Audio("day.mp3"),
    sunsetSong = new Audio("sunset.mp3"),
    nightSong = new Audio("night.mp3");

console.log('今天的UED-Rank系统的日出时间是'+ sunRise_start+'，将持续到'+sunRise_end+'结束。');
console.log('今天的UED-Rank系统的日落时间是'+ sunSet_start +'，将持续到'+sunSet_end+'结束。');
console.log('现在的时间是：'+ now);

function getSunRiseSet(Latitude, Longitude, TimeZone) {
    var curTime = new Date();
    // Variable names used: B5, C, C2, C3, CD, D, DR, H, HR, HS, L0, L5, M, MR, MS, N, PI, R1, RD, S1, SC, SD, str
    var retVal = new Object();
    var PI = Math.PI;
    var DR = PI / 180;
    var RD = 1 / DR;
    var B5 = Latitude;
    var L5 = Longitude;
    var H = -1 * (curTime.getTimezoneOffset() / 60 * -1); // Local timezone
    var M = curTime.getMonth() + 1;
    var D = curTime.getDate();
    B5 = DR * B5;
    var N = parseInt(275 * M / 9) - 2 * parseInt((M + 9) / 12) + D - 30;
    var L0 = 4.8771 + .0172 * (N + .5 - L5 / 360);
    var C = .03342 * Math.sin(L0 + 1.345);
    var C2 = RD * (Math.atan(Math.tan(L0 + C)) - Math.atan(.9175 * Math.tan(L0 + C)) - C);
    var SD = .3978 * Math.sin(L0 + C);
    var CD = Math.sqrt(1 - SD * SD);
    var SC = (SD * Math.sin(B5) + .0145) / (Math.cos(B5) * CD);
    var C3 = RD * Math.atan(SC / Math.sqrt(1 - SC * SC));
    var R1 = 6 - H - (L5 + C2 + C3) / 15;
    var HR = parseInt(R1);
    var MR = parseInt((R1 - HR) * 60);

    retVal.strSunRise = parseTime(HR + ":" + MR);
    var TargetTimezoneOffset = (TimeZone * 60 * 60 * 1000) + (retVal.strSunRise.getTimezoneOffset() * 60 * 1000);
    var transformedSunRise_start = new Date(retVal.strSunRise.getTime() + TargetTimezoneOffset);
    var sunRise_start_minutes = transformedSunRise_start.getMinutes();
    var sunRise_start_hours = transformedSunRise_start.getHours()+4;
    var sunRise_start = (sunRise_start_hours < 10 ? "0" + sunRise_start_hours : sunRise_start_hours) + ":" + (sunRise_start_minutes < 10 ? "0" + sunRise_start_minutes : sunRise_start_minutes);

    var transformedSunRise_end = new Date(retVal.strSunRise.getTime() + TargetTimezoneOffset + during);
    var sunRise_end_minutes = transformedSunRise_end.getMinutes();
    var sunRise_end_hours = transformedSunRise_end.getHours()+4;
    var sunRise_end = (sunRise_end_hours < 10 ? "0" + sunRise_end_hours : sunRise_end_hours) + ":" + (sunRise_end_minutes < 10 ? "0" + sunRise_end_minutes : sunRise_end_minutes);
 
    var S1 = 18 - H - (L5 + C2 - C3) / 15;
    var HS = parseInt(S1);
    var MS = parseInt((S1 - HS) * 60);

    retVal.strSunSet = parseTime(HS + ":" + MS);
    var transformedSunSet_start = new Date(retVal.strSunSet.getTime() + TargetTimezoneOffset);
    var sunSet_start_minutes = transformedSunSet_start.getMinutes();
    var sunSet_start_hours = transformedSunSet_start.getHours()-2;
    var sunSet_start = (sunSet_start_hours + ":" + (sunSet_start_minutes < 10 ? "0" + sunSet_start_minutes : sunSet_start_minutes));


    var transformedSunSet_end = new Date(retVal.strSunSet.getTime() + TargetTimezoneOffset + during);
    var sunSet_end_minutes = transformedSunSet_end.getMinutes();
    var sunSet_end_hours = transformedSunSet_end.getHours()-2;
    var sunSet_end = (sunSet_end_hours + ":" + (sunSet_end_minutes < 10 ? "0" + sunSet_end_minutes : sunSet_end_minutes));
    
    retVal.strNoon = new Date((retVal.strSunRise.getTime() + retVal.strSunSet.getTime()) / 2);
    var transformedNoon = new Date(retVal.strNoon.getTime() + TargetTimezoneOffset);
    var noon = transformedNoon.getHours() + ":" + (transformedNoon.getMinutes() < 10 ? "0" + transformedNoon.getMinutes() : transformedNoon.getMinutes());
    
    retVal.noon = noon;
    retVal.sunRise_start = sunRise_start;
    retVal.sunRise_start_hours = sunRise_start_hours;
    retVal.sunRise_start_minutes = sunRise_start_minutes;

    retVal.sunRise_end = sunRise_end;
    retVal.sunRise_end_hours = sunRise_end_hours;
    retVal.sunRise_end_minutes = sunRise_end_minutes;

    retVal.sunSet_start = sunSet_start;
    retVal.sunSet_start_hours = sunSet_start_hours;
    retVal.sunSet_start_minutes = sunSet_start_minutes;

    retVal.sunSet_end = sunSet_end;
    retVal.sunSet_end_hours = sunSet_end_hours;
    retVal.sunSet_end_minutes = sunSet_end_minutes;

    return retVal;
}
function parseTime(aTime) {
    var aDateTimeObject = 'none';
    if (aTime !== undefined && aTime.length) {
        aDateTimeObject = GMTTime();
        try {
            var theHour = parseInt(aTime.split(':')[0]);
            var theMinutes = parseInt(aTime.split(':')[1]);
            aDateTimeObject.setHours(theHour);
            aDateTimeObject.setMinutes(theMinutes);
        }
        catch (ex) {
        }
    }
    return aDateTimeObject;
}

function GMTTime() {
    var aDate = new Date();
    var aDateAdjustedToGMTInMS = aDate.getTime() + (aDate.getTimezoneOffset() * 60 * 1000);
    return (new Date(aDateAdjustedToGMTInMS));
}

function nowTime(){
    var time = new Object();
    var date = new Date();
    time.hours = date.getHours();
    time.minutes = date.getMinutes();
    time.now = (time.hours < 10 ? '0'+time.hours:time.hours) + ':' + (time.minutes < 10 ? '0'+time.minutes:time.minutes);
    time.str = date.getTime(); 
    return time
}

function initSky(){
    if ((now > sunRise_end) && (now <= sunSet_end)) {
        console.log('现在是白天～');
        $('.sky-day').show();
        $('.cloud-day').fadeIn(6000);
        daySong.play();
    }else{
        console.log('漫长黑夜～');
        $('.sky-night').show();
        $('.cloud-night').fadeIn(6000);
        initStars();
        setStarPosition();
        nightSong.play(); 
    }
    changeSky();
}
function changeSky(){
    if ((now >= sunRise_start) && (now <= sunRise_end)) {
        console.log('日出要开始了～');
        nightSong.pause();
        sunriseSong.play();
        $('.sky-sunrise').show()//显示日出天空做为底层铺垫
        $('.cloud-night').fadeOut(during / 3);//先渐隐夜晚的云
        $('.sky-night').fadeOut(during);//然后渐隐夜晚的天空，立即执行，跨越整个during
        setTimeout(
            function(){
                $('.cloud-sunrise').fadeIn(during)
            }, during / 2);//显示日出的云，during/2时候执行，跨越整个during，总体1.5个during
        setTimeout(
            function(){
                $('.sky-sunrise').fadeOut(during);//渐隐日出的天空
                $('.cloud-sunrise').fadeOut(during / 2);//先快速渐隐日出的云
                $('.sky-day').fadeIn(during);//显示白天的天空
                $('.cloud-day').fadeIn(during * 1.5);
                daySong.play();
            }, during * 2);//显示白天，2*during时候执行，跨越整个during，总体3个during
    }
    if ((now >= sunSet_start) && (now <= sunSet_end)) {
        console.log('但是要日落了～');
        daySong.pause();
        sunsetSong.play();
        initStars();
        setStarPosition();
        $('.sky-day').fadeOut(during);
        $('.cloud-day').fadeOut(during * 1.5);//慢点消失白天的云
        $('.sky-sunset').fadeIn(during);//日落的天空淡入
        $('.cloud-sunset').fadeIn(during);//日落的云一起淡入
        setTimeout(
            function(){
                $('.sky-sunset').fadeOut(during);
                $('.cloud-sunset').fadeOut(during / 3);
                $('.sky-night').fadeIn(during);
                $('.cloud-night').fadeIn(during);
                nightSong.play(); 
            }, during * 2); 
    }
}

function getRandomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function initStars(){
    var width = $(window).width() * 1.5,
        height = $(window).height() - 400;
    var num = getRandomNum(600, 800);
    for(i=0;i<num;i++){
        var top_ = getRandomNum(0, height);
        var left = getRandomNum(0, width);
        var alpha = getRandomNum(1,7);
        var stars = '<div class="stars" style="top: '+top_+'px;left: '+left+'px;opacity: 0.'+alpha+'"></div>'
        $('.sky-night').append(stars);
    }
}
function setStarPosition(){
    var start_hours = date.sunRise_start_hours,
        start_minutes = date.sunRise_start_minutes,
        end_hours = date.sunSet_end_hours,
        end_minutes = date.sunSet_end_minutes;

    var now_hours = time.hours,
        now_minutes = time.minutes;
        // now_hours = 19,
        // now_minutes = 36;
        console.log(now_hours, now_minutes)
    var width = $(window).width() - 240,
        height = $(window).height() - 600;
    var during_time =(24 - end_hours + start_hours) * 60 + (60 - end_minutes + start_minutes);
    if ((24 - now_hours)>= 1 && (24 - now_hours)<= 9) {
        pass_time = (now_hours - end_hours) * 60 + (now_minutes - end_minutes);
    }else if ((24 - now_hours)>= 13 && (24 - now_hours)<= 24) {
        pass_time = (24 - end_hours + now_hours) * 60 +(60 - end_minutes + now_minutes);
    }else{
        pass_time = 0;
    }
    var perc = pass_time / during_time;
    if((0 < perc) && (perc <= 0.5)){
        $('.star-ued').css({
            'top':(height * (1 - perc * 2))+'px',
            'left':(perc * 100)+'%',
            'transform':'rotate('+(20 * (perc * 2 - 1))+'deg)'
        })
    }
    if ((0.5 < perc) && (perc < 1)) {
        $('.star-ued').css({
            'top':(height * (perc * 2 - 1))+'px',
            'left':(perc * 100)+'%',
            'transform':'rotate('+(20 * (perc * 2 - 1))+'deg)'
        })
    }
}