class Mypoint {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Myangle {
    constructor(du, fen, miao) {
        this.du = du;
        this.fen = fen;
        this.miao = miao;
    }
}

function Distance(p1,p2){    //距离计算函数
    var d=Math.sqrt(Math.pow(p1.x-p2.x,2)+Math.pow(p1.y-p2.y,2));
    return d;
}

function tran_angle(angle){    //角度转换
    var z=new Myangle(0,0,0);
    z.du=Math.floor(angle);
    z.fen=Math.floor((angle-z.du)*60);
    z.miao=Math.round(((angle-z.du)*60-z.fen)*60);
    return z;
}

function dzf(angle){      //度分秒转弧度
    return angle.du * Math.PI / 180 + angle.fen * Math.PI / 10800 + angle.miao * Math.PI / 648000;
}

function jzf(angle){     //角度转弧度
    return angle * Math.PI / 180;
}

function Azimuth(Somefunction,p1,p2){     //方位角计算函数,使用回调函数(角度转换函数)
    var m=p2.x-p1.x;
    var n=p2.y-p1.y;
    var result;
    var a;
    var b=Math.abs(Math.atan(n/m)*180/Math.PI);
    if(m==0&&n==0) a=0;
    else if(m==0&&n>0) a=90;
    else if(m==0&&n<0) a=270;
    else if(m>0&&n==0) a=0;
    else if(m>0&&n>0) a=b;
    else if(m>0&&n<0) a=360-b;
    else if(m<0&&n==0) a=180;
    else if(m<0&&n>0) a=180-b;
    else a=180+b;
    result=Somefunction(a);
    return result;
}

function FrontJoin(p1,p2,m,n,sign){      //前方交会,sign代表3个点的排列方向,A、B、P 顺时针排列时，sign=1；A、B、P 逆时针排列时，sign=-1
    var p3=new Mypoint(0,0);
    var a=dzf(m);
    var b=dzf(n);
    p3.x = (p1.x * 1 / Math.tan(b) + p2.x * 1 / Math.tan(a) + sign*(p1.y - p2.y)) / (1 / Math.tan(b) + 1 / Math.tan(a));
    p3.y = (p1.y * 1 / Math.tan(b) + p2.y * 1 / Math.tan(a) + sign*(p2.x - p1.x)) / (1 / Math.tan(b) + 1 / Math.tan(a));
    return p3;
}

function DistanceJoin(p1,p2,A,B){    //距离交会
    var p3=new Mypoint(0,0);
    
    var m=p2.x-p1.x;
    var n=p2.y-p1.y;
    var a;
    var b=Math.abs(Math.atan(n/m)*180/Math.PI);
    if(m==0&&n==0) a=0;
    else if(m==0&&n>0) a=90;
    else if(m==0&&n<0) a=270;
    else if(m>0&&n==0) a=0;
    else if(m>0&&n>0) a=b;
    else if(m>0&&n<0) a=360-b;
    else if(m<0&&n==0) a=180;
    else if(m<0&&n>0) a=180-b;
    else a=180+b;
    a=jzf(a);

    var d=Distance(p1, p2);
    var r = (A * A + d * d - B * B) / (d + d);
    var h = Math.sqrt(A * A - r * r);
    p3.x = parseFloat(p1.x) + r * Math.cos(a) + h * Math.sin(a);
    p3.y = parseFloat(p1.y) + r * Math.sin(a) - h * Math.cos(a);
    return p3;
}

function strTOangle(str){   //将字符串转化为角度
    var strs=new Array();
    strs=str.split(",");
    var angle=new Myangle(0,0,0);
    angle.du=strs[0];
    angle.fen=strs[1];
    angle.miao=strs[2];
    return angle;
}


