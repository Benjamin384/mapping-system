function check(form){
    var xo = $("#xo"),yo = $("#yo"),xe=$("#xe"),ye=$("#ye");
    var xo = xo.val(),yo = yo.val(),xe=xe.val(),ye=ye.val();
    if(!xo || xo == ""||!yo||yo == ""||!xe || xe == ""||!ye||ye == ""){
        showMsg("有输入错误");
        return false;
    }

    else{
        showMsg("正在计算中...");
        setTimeout(function () {//做延时以便显示计算状态值
            var p1=new Mypoint(xo,yo);
            var p2=new Mypoint(xe,ye);
            $("#distance").val("两点距离="+Distance(p1,p2).toFixed(3)+"m");  //计算距离
            var ang=new Myangle(0,0,0);
            ang=Azimuth(tran_angle,p1,p2);
            $("#angle1").val("坐标方位角="+ang.du+"°"+ang.fen+"′"+ang.miao+"″");

            //画图
            var point_o=$("#MyCanvas")[0];
            var cxt=point_o.getContext("2d");

    var ds=tran(point_o.height,point_o.width,p1,p2);  //计算坐标系转换的比例因子
            var p1_alter=dp(ds,point_o.height,p1);           //坐标转换
            var p2_alter=dp(ds,point_o.height,p2);

            cxt.beginPath();
            cxt.fillStyle="black";
            cxt.arc(p1_alter.x,p1_alter.y,3,0,2*Math.PI,true);
            cxt.fill();

            cxt.beginPath();
            cxt.fillStyle="black";
            cxt.arc(p2_alter.x,p2_alter.y,3,0,2*Math.PI,true);
            cxt.fill();

            cxt.beginPath();
            cxt.moveTo(p1_alter.x,p1_alter.y);
            cxt.lineTo(p2_alter.x,p2_alter.y);
            cxt.lineWidth=2;
            cxt.strokeStyle="red";
            cxt.stroke();



            showMsg("");
        },3000)
    }
}

function showMsg(msg){
    $("#CheckMsg").text(msg);
}

//计算坐标转换所需要的比例因子
function tran(h,w,p1,p2){
    var dmaxX=-1.0;
    var dmaxY=-1.0;
    var dminX=1000000000;
    var dminY=1000000000;
    if (dmaxX < p1.x)
    dmaxX = p1.x;
    if (dmaxY < p1.y)
    dmaxY = p1.y;
    if (dminX > p1.x)
    dminX = p1.x;
    if (dminY > p1.y)
    dminY = p1.y;
    if (dmaxX < p2.x)
    dmaxX = p2.x;
    if (dmaxY < p2.y)
    dmaxY = p2.y;
    if (dminX > p2.x)
    dminX = p2.x;
    if (dminY > p2.y)
    dminY = p2.y;
     //计算比例因子ds
    var ds = 1.0;
  var dsx, dsy;
     if (((dmaxX-dminX)!= 0)&&((dmaxY-dminY)!= 0))
     {
         dsx = Math.abs((1.5*dmaxX-0)/ h);
         dsy = Math.abs((1.5*dmaxY-0)/ w);
         ds = Math.max(dsx, dsy);
     }
     else
     {
         if ((dmaxX-dminX)!= 0)
         {
             ds = Math.abs((dmaxX-dminX)/h);
         }
         else
         {
             if ((dmaxY - dminY)!=0)
             {
                 ds = Math.abs(((dmaxY - dminY))/w);
             }
             else
             {
                 ds = 1;
             }
         }
     }
     return ds;
}

//测量坐标转屏幕坐标
function dp(ds,h,p){
    var p_s=new Mypoint(0,0);
    //ds为比例因子，下面式子中的0代表画布左下角对应的测量坐标系（0，0）
    p_s.x =(p.y-0) / ds;
    p_s.y = h - (p.x-0) / ds;
    return p_s;
}

//清空画布
function clear(form){
    var xo = $(".X");
    var angle=$(".angle");
    var dist=$(".dist");
    var c=$("#MyCanvas")[0];
    var cxt=c.getContext("2d");
    xo.val("");
    angle.val("");
    dist.val("");
    $(".result").val("");
    cxt.clearRect(0,0,c.width,c.height);
}

function check2(form){
    var xo = $("#xo"),yo = $("#yo"),xe=$("#xe"),ye=$("#ye");var angA=$("#angleA");var angB=$("#angleB");var sign=$("#sign");
    var xo = xo.val(),yo = yo.val(),xe=xe.val(),ye=ye.val();angA=angA.val();angB=angB.val();sign=sign.val();
    if(!xo || xo == ""||!yo||yo == ""||!xe || xe == ""||!ye||ye == ""||!angA||angA == ""||!angB||angB == ""||!sign||sign == ""){
        showMsg("有输入错误");
        return false;
    }

    else{
        showMsg("正在计算中...");
        setTimeout(function () {//做延时以便显示计算状态值
            var p1=new Mypoint(xo,yo);
            var p2=new Mypoint(xe,ye);
            var m=strTOangle(angA);
            var n=strTOangle(angB);
            var p3=FrontJoin(p1,p2,m,n,sign);

            $("#coordi").val("坐标=("+p3.x.toFixed(3)+"m,"+p3.y.toFixed(3)+"m)");  //计算距离

            //画图
            var point_o=$("#MyCanvas")[0];
            var cxt=point_o.getContext("2d");

    var ds=tran(point_o.height,point_o.width,p1,p2);  //计算坐标系转换的比例因子
            var p1_alter=dp(ds,point_o.height,p1);           //坐标转换
            var p2_alter=dp(ds,point_o.height,p2);
            var p3_alter=dp(ds,point_o.height,p3);

            cxt.beginPath();
            cxt.fillStyle="black";
            cxt.arc(p1_alter.x,p1_alter.y,3,0,2*Math.PI,true);
            cxt.fill();

            cxt.beginPath();
            cxt.fillStyle="black";
            cxt.arc(p2_alter.x,p2_alter.y,3,0,2*Math.PI,true);
            cxt.fill();

            cxt.beginPath();
            cxt.fillStyle="red";
            cxt.arc(p3_alter.x,p3_alter.y,3,0,2*Math.PI,true);
            cxt.fill();

            cxt.beginPath();
            cxt.moveTo(p1_alter.x,p1_alter.y);
            cxt.lineTo(p2_alter.x,p2_alter.y);
            cxt.lineTo(p3_alter.x,p3_alter.y);
            cxt.closePath();
            cxt.lineWidth=1;
            cxt.strokeStyle="blue";
            cxt.stroke();



            showMsg("");
        },1000)
    }
}

function check3(form){
    var xo = $("#xo"),yo = $("#yo"),xe=$("#xe"),ye=$("#ye");var distA=$("#distA");var distB=$("#distB");
    var xo = xo.val(),yo = yo.val(),xe=xe.val(),ye=ye.val();distA=distA.val();distB=distB.val();
    if(!xo || xo == ""||!yo||yo == ""||!xe || xe == ""||!ye||ye == ""||!distA||distA == ""||!distB||distB == ""){
        showMsg("有输入错误");
        return false;
    }

    else{
        showMsg("正在计算中...");
        setTimeout(function () {//做延时以便显示计算状态值
            var p1=new Mypoint(xo,yo);
            var p2=new Mypoint(xe,ye);
            var p3=DistanceJoin(p1,p2,distA,distB);

            $("#coordi").val("坐标=("+p3.x.toFixed(3)+"m,"+p3.y.toFixed(3)+"m)");  //计算距离

            //画图
            var point_o=$("#MyCanvas")[0];
            var cxt=point_o.getContext("2d");

            var ds=tran(point_o.height,point_o.width,p1,p2);  //计算坐标系转换的比例因子
            var p1_alter=dp(ds,point_o.height,p1);           //坐标转换
            var p2_alter=dp(ds,point_o.height,p2);
            var p3_alter=dp(ds,point_o.height,p3);

            cxt.beginPath();
            cxt.fillStyle="black";
            cxt.arc(p1_alter.x,p1_alter.y,3,0,2*Math.PI,true);
            cxt.fill();

            cxt.beginPath();
            cxt.fillStyle="black";
            cxt.arc(p2_alter.x,p2_alter.y,3,0,2*Math.PI,true);
            cxt.fill();

            cxt.beginPath();
            cxt.fillStyle="red";
            cxt.arc(p3_alter.x,p3_alter.y,3,0,2*Math.PI,true);
            cxt.fill();

            cxt.beginPath();
            cxt.moveTo(p1_alter.x,p1_alter.y);
            cxt.lineTo(p2_alter.x,p2_alter.y);
            cxt.lineTo(p3_alter.x,p3_alter.y);
            cxt.closePath();
            cxt.lineWidth=1;
            cxt.strokeStyle="blue";
            cxt.stroke();



            showMsg("");
        },1000)
    }
}
