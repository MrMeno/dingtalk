/**
 * 封装了平台业务层的一些工具类方法
 */  

let dateClass = {
    formatTime(date) {
        var year = date.getFullYear()
        var month = date.getMonth() + 1
        var day = date.getDate()

        var hour = date.getHours()
        var minute = date.getMinutes()
        var second = date.getSeconds()

        return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
    },
    /*
    * 功能：将Date()对象转换为 “yyyy-MM-dd” 格式输出
    * @data: new Date()对象
    */
    dateFormat(data) {
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
    },
    /*
    * 功能：给指定日期加上**天并返回加后的日期格式字符串（返回如：2017-12-11）
    * @date：被加日期 @days：待加天数
    */
    addDate(date, days) { 
        var d=new Date(date); 
        d.setDate(d.getDate() + days); 
        var month=d.getMonth() + 1; 
        var day = d.getDate(); 
        if (month<10) { 
            month = "0" + month; 
        } 
        if (day<10) { 
            day = "0" + day; 
        } 
        var val = d.getFullYear() + "-" + month + "-" + day; 
        return val; 
    },
    /*
    * 功能：给指定日期加上半年并返回加后的日期格式字符串（返回如：2017-12-11）
    * @date：被加日期
    */
    addHalfYear(data) {
        var d2 = new Date(data);
        d2.setMonth(d2.getMonth() + 6);
        d2.setDate(d2.getDate()); 
        return dateClass.dateFormat(d2)
    },
    /*
    * 功能：给指定日期加上一年并返回加后的日期格式字符串（返回如：2017-12-11）
    * @date：被加日期
    */
    addOneYear(data) {
        var d2 = new Date(data);
        d2.setFullYear(d2.getFullYear() + 1);
        d2.setDate(d2.getDate()); 
        return dateClass.dateFormat(d2)
    },
    /*
    * 功能：计算两个日期之间相差的天数
    * str_t
    */
    jianDate(strDate1,strDate2) {
        var date1 = Date.parse(strDate1.replace(/-/g,"/")); 
        var date2 = Date.parse(strDate2.replace(/-/g,"/")); 
        return Math.ceil((date2-date1)/(24*60*60*1000));  
    },
    
    /*
    * 功能：根据传入的date()对象，得到相应的星期几值
    * @d： new Date()对象
    */
    getWeek(d) {
        var weekday=new Array(7);
        weekday[0]="周日";
        weekday[1]="周一";
        weekday[2]="周二";
        weekday[3]="周三";
        weekday[4]="周四";
        weekday[5]="周五";
        weekday[6]="周六";
        return weekday[d.getDay()];
    },
    
    getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        var hour = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        if (hour >= 1 && hour <= 9) {
            hour = "0" + hour;
        }
        if (minute >= 1 && minute <= 9) {
            minute = "0" + minute;
        }
        if (second >= 0 && second <= 9) {
            second = "0" + second;
        }
        var currentdate = date.getYear().toString().substr(-2) + seperator1 + month + seperator1 + strDate
                + " " + hour + seperator2 + minute
                + seperator2 + second;
        return currentdate;
    }
}

let phoneClass = {
    /*
    * 功能：将电话号码转换为中间加两横杠的格式输出（eg. 18778937890 -> 187-7893-7890）
    * @phoneCell: 电话号码
    */
    formatPhone(phoneCell) {
        phoneCell = phoneCell ? phoneCell : ''
        var t = phoneCell.toString()
        if (t.length == 11)
        t = phoneCell.substring(0, 3) + "-" + phoneCell.substring(3, 7) + "-" + phoneCell.substring(7, phoneCell.length)

        return t
    },
    /*
    * 功能：将输入的电话号码以177***2323形式输出
    * @phone_t：电话号码
    */
    phoneFormat(phone_t) {
        phone_t = phone_t ? phone_t : ''
        var phone = phone_t.toString()
        if (phone.length == 11) {
            phone = phone.substring(0, 3) + "****" + phone.substr(-4)
        }
        return phone
    }
}

let moneyClass = {
    /*
    * 功能：酱一串数字转换为金钱格式输出(eg. 333333.33 -> 333,333.33)
    * @money_t: 传入的数字或字符串
    * 说明：转换后的小数位最多保留两位，一位小数的就保留一位，无小数位的只保留整数位
    */
    toMoneyGS (money_t) {
        var isFu = false;//是否为负数
        if (money_t == 0){
            return '0.00'
        }
        var money = money_t.toString();
            if (money.indexOf("-") > -1) {
            isFu = true;
            money = money.substring(1);
        }
        var str = money.split('.')[0];
        var len = str.length, strLength = len, str2 = '', max = Math.floor(len / 3);
        for (var i = 0 ; i < max ; i++) {
            var s = str.slice(len - 3, len);
            str = str.substr(0, len - 3);
            str2 = (',' + s) + str2;
            len = str.length;
        }
        str += str2;
        if (strLength % 3 == 0)
            str = str.substring(1);

        if (money.indexOf(".") > -1) {
            if (money.split('.')[1].length < 2){
                str = str+'.' + money.split('.')[1].substring(0, 1);
            } else {
                str = str+'.' + money.split('.')[1].substring(0, 2);
            }
        }
        if (isFu)
            str = '-' + str;
        return str;
    },
    /**
    * 金额验证
    * @value 值
    * @length 小数点后保留的位数
    * @max   最大整数的位数
    * @maxCallback 最大值处理
    * @notValidateZero 不验证0
    */
    checkMoney: (value, length, max, maxCallback, notValidateZero) =>{
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
}   
let mathClass = {
    /*
    * 功能：将数字转换为六位小数输出
    * @digitStr_t: 浮点数
    */
    toSixDigit(digitStr_t) {
        var digitStr = digitStr_t.toString();
        var t= digitStr.indexOf(".");
        var len =  digitStr.length;

        if (t>0) {
            if (len-t < 8) { // digit <= 6
                digitStr = digitStr.substring(0,t) + digitStr.substring(t,len);
            }else{
                digitStr = digitStr.substring(0,t) + digitStr.substring(t,8);
            }
        }
        return parseFloat(digitStr);
    },

    digitStrLen(digitStr_t) {
        var digitStr = digitStr_t.toString();
        var length = 0;
        var t= digitStr.indexOf(".");
        length =t;
        if (t>0) {
            length = t+7;
        }
        return length;
    },
    /*
    *
    */
    digitSixStrLen(str_t) {
        var str = str_t.toString(), isdigit = str.indexOf(".")
        if (isdigit > -1) {
        let digi =   str.split(".")[1]
        if (digi.length>6)
            str = (str.split(".")[0] || '0')+"."+digi.substring(0,6)
        else
            str = (str.split(".")[0] || '0')+"."+digi
        }
        return str
    },
    /*
    * @start @end @step
    */
    range( start, end, step = 0 ) {
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
    },
    
    mul(a, b) {
        var c = 0,
            d = a.toString(),
            e = b.toString();
        try {
            c += d.split(".")[1].length;
        } catch (f) {}
        try {
            c += e.split(".")[1].length;
        } catch (f) {}
        return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
    },
    /*
    * 功能：浮点数加减乘除
    * @a @b 两个整数或浮点数
    */
    add(a, b) {
        var c, d, e;
        try {
            c = a.toString().split(".")[1].length;
        } catch (f) {
            c = 0;
        }
        try {
            d = b.toString().split(".")[1].length;
        } catch (f) {
            d = 0;
        }
        return e = Math.pow(10, Math.max(c, d)), (mathClass.mul(a, e) + mathClass.mul(b, e)) / e;
    },

    sub(a, b) {
        var c, d, e;
        try {
            c = a.toString().split(".")[1].length;
        } catch (f) {
            c = 0;
        }
        try {
            d = b.toString().split(".")[1].length;
        } catch (f) {
            d = 0;
        }
        return e = Math.pow(10, Math.max(c, d)), (mathClass.mul(a, e) - mathClass.mul(b, e)) / e;
    },

    div(a, b) {
        var c, d, e = 0,
            f = 0;
        try {
            e = a.toString().split(".")[1].length;
        } catch (g) {}
        try {
            f = b.toString().split(".")[1].length;
        } catch (g) {}
        return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), mathClass.mul(c / d, Math.pow(10, f - e));
    }
}

let commonClass = {
}
let checkClass = {
    /**
    * 必填项验证[包含数字0验证]
    * @value
    * @isNum 是否要进行数字验证【true:不进行0验证, false:默认进行所有类型验证】 
    */
    checkEmpty: function(value, isNum){
        if(value == undefined || value == "undefined" || (!isNum && !value)){
            return true;
        }
        value+=""; 
        if(value && value.trim().length > 0){
            return false;
        }
        return true;
    }
}

export default{
  dateClass, // 日期相关处理方法
  phoneClass, // 电话号码相关处理方法
  moneyClass, // 钱相关处理方法
  mathClass, // 数学相关处理方法
  commonClass,
  checkClass
};
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
export function checkNum(value) {
    let reg = /^[0-9]*$/g;
    if(reg.test(value)){
        return {flag: true};
    }
    return {flag: false, error: "只能输入0-9数字"};
}

export function jianDate(strDate1,strDate2) {
     console.log(date2,date1);
        var date1 = Date.parse(strDate1.replace(/-/g,"/")); 
        var date2 = Date.parse(strDate2.replace(/-/g,"/")); 

        return Math.ceil((date2-date1)/(24*60*60*1000));  
    }

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
