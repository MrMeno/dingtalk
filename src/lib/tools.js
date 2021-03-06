import cookies from 'js-cookie';
export function range( start, end, step = 0 ) {
        var ary = []
        if ( step > 0 ) {
            let distance = end - start
            let _end = parseInt( distance / step )
            for( let i = start;i < _end;i++ ) {
            ary.push( start + ( i * step ) )
            }
            if ( distance % step > 0 ) { ary.push( end ) }
        }else if (start>-1&& end>0) {
            for (let i = start;i<end;i++) {
            ary.push(i)
            }
        } else {
            for( var i = 0;i < start;i++ ) {
            ary.push( i + step )
            }
        }
        return ary
}
export function dateFormat(data) {//日期格式化
        var fmt = "yyyy-MM-dd";
        var o = {
                "M+": data.getMonth() + 1, //月份 
                "d+": data.getDate(), //日 
                "h+": data.getHours(), //小时 
                "m+": data.getMinutes(), //分 
                "s+": data.getSeconds(), //秒 
                "q+": Math.floor((data.getMonth() + 3) / 3), //季度 
                "S": data.getMilliseconds() //毫秒 
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (data.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
    }

    /**
* 必填项验证[包含数字0验证]
* @value
* @isNum 是否要进行数字验证【true:不进行0验证, false:默认进行所有类型验证】 （ture: 0-> 不是空）
*/
export function checkEmpty(value, isNum) {
    if(value == undefined || value == "undefined" || (!isNum && !value)){
        return true;
    }
    value+="";
    if(value && value.trim().length > 0){
        return false;
    }
    return true;
}

/**
* 数字验证
*/

   //计算天数差的函数，通用  
 export function  DateDiff(sDate1,  sDate2){    //sDate1和sDate2是2002-12-18格式  
       var  aDate,  oDate1,  oDate2,  iDays  
       aDate  =  sDate1.split("-")  
       oDate1  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])    //转换为12-18-2002格式  
       aDate  =  sDate2.split("-")  
       oDate2  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])  
       iDays  =  parseInt(Math.abs(oDate1  -  oDate2)  /  1000  /  60  /  60  /24)    //把相差的毫秒数转换为天数  
       return  iDays  
}
//0-9数字校验
export function checkNum(value) {
    let reg = /^[0-9]*$/g;
    if(reg.test(value)){
        return {flag: true};
    }
    return {flag: false, error: "只能输入0-9数字"};
}
  //日期差
export function jianDate(strDate1,strDate2) {
        var date1 = Date.parse(strDate1.replace(/-/g,"/")); 
        var date2 = Date.parse(strDate2.replace(/-/g,"/")); 

        return Math.ceil((date2-date1)/(24*60*60*1000));  
    }

//删除数组，有bug，数组内包含文件时，返回的数组中文件会丢失
export function arrRemove(arr, val,index,len) {//{数组，值,下标,长度}
    if(val!=''){
  for(var i=0; i<arr.length; i++) {
    if(arr[i] == val) {
      arr.splice(i, 1);
      break;
    }
  }
}
else{
   arr.splice(index,len);
}
return arr
}
//深拷贝方法，bug同上
export function cloneObj(obj){//深拷贝
    var str, newobj = obj.constructor === Array ? [] : {};
    if(typeof obj !== 'object'){
        return;
    } else if(window.JSON){
        str = JSON.stringify(obj), //系列化对象
        newobj = JSON.parse(str); //还原
    } else {
        for(var i in obj){
            newobj[i] = typeof obj[i] === 'object' ? 
            cloneObj(obj[i]) : obj[i]; 
        }
    }
    return newobj;
}
  //获取当前时间
export function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
    return currentdate;
  }

//转换为货币
export function decimal(num,v){
               var vv = Math.pow(10,v);
             return Math.round(num*vv)/vv;
 }

 //小数四舍五入
export function tofixed(num,d){//数字，保留位数
          var fixNum=new Number(num+1).toFixed(d);
          var fixdNum=new Number(fixNum-1).toFixed(d);
              return fixdNum
        }
//日期比较
export function CompareDate(d1,d2)//d1是否大于d2
           {
            return ((new Date(d1.replace(/-/g,"\/"))) > (new Date(d2.replace(/-/g,"\/"))));
        }
  //货币数字校验      
export function checkMoney (value, length, max, maxCallback, notValidateZero){
        value+=""; 
        value = value.toString()
        var checkLength = length + 1;
        var p1 = /[^\d\.]/;    // 过滤非数字及小数点 /g :所有范围中过滤
        var p2 = /(\.\d{3})\d*$/;
        if(length == 6){
                p2 = /(\.\d{7})\d*$/;
        }
        if(length == 10){
                p2 = /(\.\d{11})\d*$/;
        }
        var p3 = /(\.)(\d*)\1/;
        var p4 = /\.+/;    //多个点的话只取1个点，屏蔽1....234的情况
        var p5 = /(\.+)(\d+)(\.+)/; //屏蔽1....234.的情况

        if(p1.test(value)){
            return {flag: false, error: "只能包含数字和小数点！"};
        }
        if(value.indexOf('.') != -1 && value.indexOf('.') == 0  ||  value.lastIndexOf('.') != -1 && value.lastIndexOf('.') == value.length - 1){
            return {flag: false, error: "第一位和最后一位不能是小数点！"};
        }
        if(p2.test(value)){
            return {flag: false, error: "小数点后最多输入" + length + "位！"};
        } 
        if(p3.test(value)){
            return {flag: false, error: "只能有一个小数点！"};
        }
        if(p5.test(value)){
            return {flag: false, error: "金额格式输入有误！"};
        }
        if(maxCallback){
            return maxCallback();
        }else{
            if(!notValidateZero && value <= 0){
                return {flag: false, error: "金额必须大于0！"};
            }
            if (value.split(".")[0].length > max) {
                return {flag: false, error: "整数不能超过" + max + "位！"};
            }
        }
        return {flag: true};
  }
    //图片校验
export function imgCheck(file){
     if(!file){
         return {error:'取消选择',flag:false}
       }
      else if(file.type!='image/jpeg'&&file.type!='image/png'&&file.type!='image/bmp'&&file.type!='image/gif'){
            return {error:'上传文件类型有误',flag:false}
        }
     else if(file.size<4*1024){
        return {error:'上传文件大小有误',flag:false}
       }
      else if(file.size>5*1024*1024){
        return {error:'上传文件大小有误',flag:false}
       }

       else{
        return{error:'',flag:true}
       }
     
    }
    //输入数字区间
export function check1To15 (num){
        var reg=/^[0-15]$/;
        return reg.test(num)
    }
    //获取文件blob
export function getObjectURL(file) {
       var url = null ;
           if (window.createObjectURL!=undefined) { 
          url = window.createObjectURL(file) ;
          } else if (window.URL!=undefined) { 
          url = window.URL.createObjectURL(file) ;
          } else if (window.webkitURL!=undefined) { 
           url = window.webkitURL.createObjectURL(file) ;
          }
       return url ;
}
