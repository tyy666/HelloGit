//rem
(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if(clientWidth>=750){
                docEl.style.fontSize = '100px';
            }else{
                docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
            }
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

//获取时间
function getLocalTime(nS) {
    if(nS==''){
        return '';
    }else{
        var d=new Date(parseInt(nS)*1000);
        var year=d.getFullYear();
        var month=d.getMonth()+1;
        month=(month<10 ? "0"+month:month);
        var date=d.getDate();
        date=(date<10 ? "0"+date:date);
        var h=d.getHours();
        h=(h<10 ? "0"+h:h);
        var m=d.getMinutes();
        m=(m<10 ? "0"+m:m);
        return year+'-'+month+'-'+date+' '+h+':'+m;
    }
}
//获取时间-到天
function getDay(s) {
    if(s==''){
        return '';
    }else{
        var d=new Date(parseInt(s)*1000);
        var year=d.getFullYear();
        var month=d.getMonth()+1;
        month=(month<10 ? "0"+month:month);
        var date=d.getDate();
        date=(date<10 ? "0"+date:date);
        return year+'-'+month+'-'+date;
    }
}
//获取时间-时、分
function getHourMin(s) {
    if(s==''){
        return '';
    }else{
        var d=new Date(parseInt(s)*1000);
        var hour=d.getHours();
        hour=(hour<10 ? "0"+hour:hour);
        var minute=d.getMinutes();
        minute=(minute<10 ? "0"+minute:minute);
        return hour+':'+minute;
    }
}
//年月日转换为时间戳
function getSJC(date) {
    //var date="2014-05-08 00:00:00";
    var timestamp2 = Date.parse(new Date(date));
    timestamp2 = timestamp2 / 1000;
    return timestamp2;
}

//获取链接中的参数
function getUrlParam(url,name){
    var pattern = new RegExp("[?&]"+name+"\=([^&]+)", "g");
    var matcher = pattern.exec(url);
    var items = null;
    if(null != matcher){
        try{
            items = decodeURIComponent(decodeURIComponent(matcher[1]));
        }catch(e){
            try{
                items = decodeURIComponent(matcher[1]);
            }catch(e){
                items = matcher[1];
            }
        }
    }
    return items;
}

//判断是否在微信浏览器中打开
function isWeiXin(){
    var ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        return true;
    }else{
        return false;
    }
}
//删除数组中的某个元素
Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};
//删除数组中已知元素的值
Array.prototype.removeByValue = function(val) {
    for(var i=0; i<this.length; i++) {
        if(this[i] == val) {
            this.splice(i, 1);
            break;
        }
    }
};
//数组去重
Array.prototype.unique= function(){
    var res=[this[0]];
    for(var i = 1; i < this.length; i++){
        var repeat = false;
        for(var j = 0; j < res.length; j++){
            if(this[i] == res[j]){
                repeat = true;
                break;
            }
        }
        if(!repeat){
            res.push(this[i]);
        }
    }
    return res;
};
//判断是否等于数组中某个元素
Array.prototype.equal = function(object) {
    var i = this.length;
    while (i--) {
        if (parseInt(this[i])===parseInt(object)) {
            return true;
        }
    }
    return false;
};
//已知经度、纬度，计算2点之间的距离
function Rad(d){
    return d*Math.PI/180.0;
}
function GetDistance(lat1,lng1,lat2,lng2){
    var radLat1 = Rad(lat1);
    var radLat2 = Rad(lat2);
    var a = radLat1 - radLat2;
    var  b = Rad(lng1) - Rad(lng2);
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +
            Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
    s = s *6378.137 ;
    s = Math.round(s * 10000) / 10000;//输出为km
    s=s.toFixed(3);
    return s;
}