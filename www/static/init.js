var toMinute = 60 * 1000,
    duringMinute = 20,
    during  =  duringMinute * toMinute;

var date = getSunRiseSet(31.84, 117.15, 8);

var sunRiseStart = date.sunRise_start;
    sunRiseEnd = date.sunRise_end,
    sunSetStart = date.sunSet_start,
    sunSetEnd = date.sunSet_end;

var startHours = date.sunRise_start_hours,
    startMinutes = date.sunRise_start_minutes,
    endHours = date.sunSet_end_hours,
    endMinutes = date.sunSet_end_minutes;

var time = nowTime(),
    // now = nowTime().now;
    // nowHours = time.hours,
    // nowMinutes = time.minutes;
    now = '17:13',
    nowHours = 17,
    nowMinutes = 33;

var  skyDay = $('.sky-day'),
     cloudDay = $('.cloud-day'),
     skyNight = $('.sky-night'),
     cloudNight = $('.cloud-night'),
     skySunrise = $('.sky-sunrise'),
     cloudSunrise = $('.cloud-sunrise'),
     skySunset = $('.sky-sunset'),
     cloudSunset = $('.cloud-sunset'),
     starUed = $('.star-ued');

var sunriseSong = new Audio("sunrise.mp3"),
    daySong = new Audio("day.mp3"),
    sunsetSong = new Audio("sunset.mp3"),
    nightSong = new Audio("night.mp3");

console.log('今天的UED-Rank系统的日出时间是' + sunRiseStart + '，将持续到' + sunRiseEnd + '结束。');
console.log('今天的UED-Rank系统的日落时间是' + sunSetStart + '，将持续到' + sunSetEnd + '结束。');
console.log('现在的时间是：' + now);

function initSky() {
    if ((now > sunRiseEnd) && (now <= sunSetEnd)) {
        console.log('现在是白天～');
        skyDay.show();
        cloudDay.fadeIn();
        daySong.play();
    } else {
        console.log('漫长黑夜～');
        skyNight.show();
        cloudNight.fadeIn();
        initStars();
        setStarPosition();
        nightSong.play();
    }
    changeSky();
}

function changeSky() {
    if ((now >= sunRiseStart) && (now <= sunRiseEnd)) {
        var passTime =  (nowHours - startHours) * 60 + (nowMinutes - startMinutes),
            perc = passTime / duringMinute;
        console.log('日出要开始了～');
        nightSong.pause();
        sunriseSong.play();
        skySunrise.show();
        starUed.hide();
        console.log(passTime);
        console.log(perc);
        switch (true){
            case (perc >= 0) && (perc < 0.25):
                cloudNight.css({
                    'opacity':(1 - perc * 4)
                }).animate({opacity: 0}, (duringMinute * 0.25 - passTime) * toMinute);
                skyNight.css({
                    'opacity':(1 - perc * 2)
                }).animate({opacity: 0}, (duringMinute * 0.5 - passTime) * toMinute);
                
                break;
            case (perc >= 0.25) && (perc < 0.5):
                cloudNight.hide();
                skyNight.css({
                    'opacity':(1 - perc * 2)
                }).animate({opacity: 0}, (duringMinute * 0.5 - passTime) * toMinute);
                cloudSunrise.css({
                    'display':'block',
                    'opacity':(perc - 0.25) * 4
                }).animate({opacity: 1}, (duringMinute * 0.5 - passTime) * toMinute);
                break;
            case (perc >= 0.5) && (perc < 0.75):
                skyNight.hide();
                cloudSunrise.show().css({
                    'opacity':(1 - (perc - 0.5) * 4)
                }).animate({opacity: 0}, (duringMinute * 0.75 - passTime) * toMinute);
                skySunrise.show().css({
                    'opacity':(1 - perc) * 2
                }).animate({opacity: 0}, (duringMinute - passTime) * toMinute);
                skyDay.css({
                    'display':'block',
                    'opacity':(perc - 0.5) * 2
                }).animate({opacity: 1}, (duringMinute - passTime) * toMinute);
                break;
            case (perc >= 0.75) && (perc <= 1):
                skyNight.hide();
                skySunrise.show().css({
                    'opacity':(1 - perc) * 2
                }).animate({opacity: 0}, (duringMinute - passTime) * toMinute);
                skyDay.css({
                    'display':'block',
                    'opacity':(perc - 0.5) * 2
                }).animate({opacity: 1}, (duringMinute - passTime) * toMinute);
                cloudDay.css({
                    'display':'block',
                    'opacity':(perc - 0.75) * 4
                }).animate({opacity: 1}, (duringMinute - passTime) * toMinute);
                sunriseSong.pause();
                daySong.play();
                break;
            default:
                console.log('进入了非法时间区域！');
        }
    }
    if ((now >= sunSetStart) && (now <= sunSetEnd)) {
        var passTime =  (endHours - nowHours) * 60 + (endMinutes - nowMinutes),
            perc = 1 - passTime / duringMinute;
        console.log(passTime);
        console.log(perc);
        console.log('但是要日落了～');
        daySong.pause();
        sunsetSong.play();
        switch (true){
            case (perc >= 0) && (perc < 0.5):
                skyDay.css({
                    'opacity':1 - (perc * 2)
                }).animate({opacity: 0}, (passTime - duringMinute * 0.5) * toMinute);
                cloudDay.css({
                    'opacity':1 - (perc * 2)
                }).animate({opacity: 0}, (passTime - duringMinute * 0.5) * toMinute);
                skySunset.css({
                    'display':'block',
                    'opacity':perc * 2
                }).animate({opacity: 1}, (passTime - duringMinute * 0.5) * toMinute);
                cloudSunset.css({
                    'display':'block',
                    'opacity':perc * 2
                }).animate({opacity: 1}, (passTime - duringMinute * 0.5) * toMinute);
                break;
            case (perc >= 0.5) && (perc < 0.75):
                skyDay.hide();
                skySunset.show();
                cloudSunset.show().css({
                    'opacity':(1 - (perc - 0.5) * 4)
                }).animate({opacity: 0}, passTime / 2  * toMinute);
                skyNight.css({
                    'display':'block',
                    'opacity':(perc - 0.5) * 2
                }).animate({opacity: 1}, passTime * toMinute);
                initStars();
                setStarPosition();
                break;
            case (perc >= 0.75) && (perc <= 1):
                sunsetSong.pause();
                nightSong.play();
                skyDay.hide();
                skySunset.show();
                skyNight.css({
                    'display':'block',
                    'opacity':(perc - 0.5) * 2
                }).animate({opacity: 1}, passTime * toMinute);
                cloudNight.css({
                    'display':'block',
                    'opacity':(perc - 0.75) * 4
                }).animate({opacity: 1}, passTime * toMinute);
                initStars();
                setStarPosition();
                break;
            default:
                console.log('进入了非法时间区域！');
        }
    }
}

function initStars() {
    var width = $(window).width() * 1.5,
        height = $(window).height() - 400;
    var num = getRandomNum(600, 800);
    for (i = 0; i < num; i++) {
        var top_ = getRandomNum(0, height);
        var left = getRandomNum(0, width);
        var alpha = getRandomNum(1, 7);
        var stars = '<div class="stars" style="top: ' + top_ + 'px;left: ' + left + 'px;opacity: 0.' + alpha + '"></div>'
        $('.sky-night').append(stars);
    }
}

function setStarPosition() {
    var width = $(window).width() - 240,
        height = $(window).height() - 600;
    var duringTime = (24 - endHours + startHours) * 60 + (60 - endMinutes + startMinutes);
    if ((24 - nowHours) >= 1 && (24 - nowHours) <= 9) {
        passTime = (nowHours - endHours) * 60 + (nowMinutes - endMinutes);
    } else if ((24 - nowHours) >= 13 && (24 - nowHours) <= 24) {
        passTime = (24 - endHours + nowHours) * 60 + (60 - endMinutes + nowMinutes);
    } else {
        passTime = 0;
    }
    var perc = passTime / duringTime;
    
    if ((0 < perc) && (perc <= 0.5)) {
        starUed.css({
            'top': (height * (1 - perc * 2)) + 'px',
            'left': (perc * 100) + '%',
            'transform': 'rotate(' + (20 * (perc * 2 - 1)) + 'deg)'
        })
    }
    if ((0.5 < perc) && (perc < 1)) {
        starUed.css({
            'top': (height * (perc * 2 - 1)) + 'px',
            'left': (perc * 100) + '%',
            'transform': 'rotate(' + (20 * (perc * 2 - 1)) + 'deg)'
        })
    }
}

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
    var sunRise_start_hours = transformedSunRise_start.getHours() + 4;
    var sunRise_start = (sunRise_start_hours < 10 ? "0" + sunRise_start_hours : sunRise_start_hours) + ":" + (sunRise_start_minutes < 10 ? "0" + sunRise_start_minutes : sunRise_start_minutes);

    var transformedSunRise_end = new Date(retVal.strSunRise.getTime() + TargetTimezoneOffset + during);
    var sunRise_end_minutes = transformedSunRise_end.getMinutes();
    var sunRise_end_hours = transformedSunRise_end.getHours() + 4;
    var sunRise_end = (sunRise_end_hours < 10 ? "0" + sunRise_end_hours : sunRise_end_hours) + ":" + (sunRise_end_minutes < 10 ? "0" + sunRise_end_minutes : sunRise_end_minutes);

    var S1 = 18 - H - (L5 + C2 - C3) / 15;
    var HS = parseInt(S1);
    var MS = parseInt((S1 - HS) * 60);

    retVal.strSunSet = parseTime(HS + ":" + MS);
    var transformedSunSet_start = new Date(retVal.strSunSet.getTime() + TargetTimezoneOffset);
    var sunSet_start_minutes = transformedSunSet_start.getMinutes();
    var sunSet_start_hours = transformedSunSet_start.getHours() - 2;
    var sunSet_start = (sunSet_start_hours + ":" + (sunSet_start_minutes < 10 ? "0" + sunSet_start_minutes : sunSet_start_minutes));


    var transformedSunSet_end = new Date(retVal.strSunSet.getTime() + TargetTimezoneOffset + during);
    var sunSet_end_minutes = transformedSunSet_end.getMinutes();
    var sunSet_end_hours = transformedSunSet_end.getHours() - 2;
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
        } catch (ex) {}
    }
    return aDateTimeObject;
}

function GMTTime() {
    var aDate = new Date();
    var aDateAdjustedToGMTInMS = aDate.getTime() + (aDate.getTimezoneOffset() * 60 * 1000);
    return (new Date(aDateAdjustedToGMTInMS));
}

function nowTime() {
    var time = new Object();
    var date = new Date();
    time.hours = date.getHours();
    time.minutes = date.getMinutes();
    time.now = (time.hours < 10 ? '0' + time.hours : time.hours) + ':' + (time.minutes < 10 ? '0' + time.minutes : time.minutes);
    time.str = date.getTime();
    return time
}

function getRandomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}