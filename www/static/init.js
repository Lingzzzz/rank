var during = 10 * 60 * 1000;

var date = getSunRiseSet(31.84,117.15,8);
var sunRise_start = date.sunRise_start;
var sunSet_start = date.sunSet_start;
var sunRise_end = date.sunRise_end;
var sunSet_end = date.sunSet_end;
var time = nowTime();
var now = nowTime().now;

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
    // Overriding TimeZone to standardize on UTC
    // H = 0;
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
    if (Math.abs(SC) <= 1) {
        var C3 = RD * Math.atan(SC / Math.sqrt(1 - SC * SC));
        var R1 = 6 - H - (L5 + C2 + C3) / 15;
        var HR = parseInt(R1);
        var MR = parseInt((R1 - HR) * 60);

        retVal.strSunRise = parseTime(HR + ":" + MR);
        var TargetTimezoneOffset = (TimeZone * 60 * 60 * 1000) + (retVal.strSunRise.getTimezoneOffset() * 60 * 1000);
        var transformedSunRise_start = new Date(retVal.strSunRise.getTime() + TargetTimezoneOffset);
        var sunRise_start = ((transformedSunRise_start.getHours()+4) < 10 ? "0" + (transformedSunRise_start.getHours()+4) : (transformedSunRise_start.getHours()+4)) + ":" + (transformedSunRise_start.getMinutes() < 10 ? "0" + transformedSunRise_start.getMinutes() : transformedSunRise_start.getMinutes());
        var transformedSunRise_end = new Date(retVal.strSunRise.getTime() + TargetTimezoneOffset + during);
        var sunRise_end = ((transformedSunRise_end.getHours()+4) < 10 ? "0" + (transformedSunRise_end.getHours()+4) : (transformedSunRise_end.getHours()+4)) + ":" + (transformedSunRise_end.getMinutes() < 10 ? "0" + transformedSunRise_end.getMinutes() : transformedSunRise_end.getMinutes());
 
        var S1 = 18 - H - (L5 + C2 - C3) / 15;
        var HS = parseInt(S1);
        var MS = parseInt((S1 - HS) * 60);

        retVal.strSunSet = parseTime(HS + ":" + MS);
        var transformedSunSet_start = new Date(retVal.strSunSet.getTime() + TargetTimezoneOffset);
        var sunSet_start = (transformedSunSet_start.getHours()-2) + ":" + (transformedSunSet_start.getMinutes() < 10 ? "0" + transformedSunSet_start.getMinutes() : transformedSunSet_start.getMinutes());
        var transformedSunSet_end = new Date(retVal.strSunSet.getTime() + TargetTimezoneOffset + during);
        var sunSet_end = (transformedSunSet_end.getHours()-2) + ":" + (transformedSunSet_end.getMinutes() < 10 ? "0" + transformedSunSet_end.getMinutes() : transformedSunSet_end.getMinutes());
        
        retVal.strNoon = new Date((retVal.strSunRise.getTime() + retVal.strSunSet.getTime()) / 2);
        var transformedNoon = new Date(retVal.strNoon.getTime() + TargetTimezoneOffset);
        var noon = transformedNoon.getHours() + ":" + (transformedNoon.getMinutes() < 10 ? "0" + transformedNoon.getMinutes() : transformedNoon.getMinutes());
    }
    retVal.noon = noon;
    retVal.sunRise_start = sunRise_start;
    retVal.sunSet_start = sunSet_start;
    retVal.sunRise_end = sunRise_end;
    retVal.sunSet_end = sunSet_end;
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
    time.hours = date.getHours() < 10 ? '0'+ date.getHours() : date.getHours();
    time.minutes = date.getMinutes() < 10 ? '0'+ date.getMinutes() : date.getMinutes();
    time.now = time.hours + ':' + time.minutes;
    time.str = date.getTime(); 
    return time
}
function initSky(){
    if ((now >= sunRise_start) && (now <= sunRise_end)) {
        console.log('日出开始了～');
        $('.sky-night').show();
        $('.cloud-night').fadeIn(during / 50);//显示夜晚的天空和云
        initStars();//插入星星
        $('.sky-sunrise').show();//显示日出天空
        var audio = new Audio("sunrise.mp3");
            audio.play();
        $('.cloud-night').fadeOut(during / 2);//先快速渐隐夜晚的云
        $('.sky-night').fadeOut(during);//然后渐隐夜晚的天空
        //夜晚的天空渐隐后执行
        setTimeout(
            function(){
                $('.cloud-sunrise').fadeIn(during)//显示日出的云
            }, during / 2);
        //一段时间以后执行
        setTimeout(
            function(){
                $('.sky-sunrise').fadeOut(during);//渐隐日出的天空
                $('.cloud-sunrise').fadeOut(during / 5);//先快速渐隐日出的云
                $('.sky-day').fadeIn(during);//显示白天的天空
                var audio = new Audio("day.mp3");
                    audio.play();
            }, during * 2);
        setTimeout(
            function(){
                $('.cloud-day').fadeIn(during / 40);//显示白天的云
            }, during * 2);
    }else if ((now > sunRise_end) && (now < sunSet_start)) {
            console.log('现在是白天～');
            $('.sky-day').show();
            $('.cloud-day').fadeIn(during / 50);
            var audio = new Audio("day.mp3");
                audio.play();
    }else if ((now >= sunSet_start) && (now <= sunSet_end)) {
            console.log('要日落了～');
            $('.sky-day').show();
            $('.cloud-day').fadeIn(during / 50);//显示白天的天空和云
            initStars();
            var audio = new Audio("sunset.mp3");
                audio.play();
            $('.sky-day').fadeOut(during);
            $('.cloud-day').fadeOut(during * 2);
            $('.sky-sunset').fadeIn(during);//日落的天空淡入
            $('.cloud-sunset').fadeIn(during);
            setTimeout(
                function(){
                    $('.sky-sunset').fadeOut(during);
                    $('.cloud-sunset').fadeOut(during / 2);
                    $('.sky-night').fadeIn(during);
                    
                    $('.cloud-night').fadeIn(during * 2);
                    var audio = new Audio("night.mp3");
                        audio.play();
                }, during * 2); 
    }else{
            console.log('漫长黑夜～');
            $('.sky-night').show();
            $('.cloud-night').fadeIn(during / 50);
            initStars();
            var audio = new Audio("night.mp3");
                audio.play();
    }
}


function getRandomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function initStars(){
    var width = 5000;
    var height = $(window).height() - 400;
    var num = getRandomNum(800, 1000);
    for(i=0;i<num;i++){
        var top_ = getRandomNum(0, height);
        var left = getRandomNum(0, width);
        var alpha = getRandomNum(1,7);
        var stars = '<div class="stars" style="top: '+top_+'px;left: '+left+'px;opacity: 0.'+alpha+'"></div>'
        $('.sky-night').append(stars);
    }
}