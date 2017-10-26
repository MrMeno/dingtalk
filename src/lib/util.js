import axios from 'axios'
export function alert(self,message){
	self.$device.notification.alert({
    message: JSON.stringify(message),
    title: "提示",//可传空
    buttonName: "收到",
    onSuccess : function() {
       
    },
    onFail : function(err) {}
});
}
export function div(arg1, arg2) {//a/b
     var t1=0,t2=0,r1,r2;
    try{t1=arg1.toString().split(".")[1].length}catch(e){}
    try{t2=arg2.toString().split(".")[1].length}catch(e){}
        r1=Number(arg1.toString().replace(".",""));
        r2=Number(arg2.toString().replace(".",""));
        return (r1/r2)*Math.pow(10,t2-t1);
}

/*获取用户ID*/
export function authCode(cb,corpId){
         DingTalkPC.runtime.permission.requestAuthCode({
        corpId:corpId,
        onSuccess (result){
          cb(result)
        },
        onFail (err){
          reject(err);
        }
      }); 
}

export function request (config, cb, progressCb) {
  // 检查网络状态：有网络，继续请求
    let { method, uri, body, type, headers, other } = config;
    /**
     * config: {
     *  method: 'GET',
     *  uri: '/xxx/xxx',
     *  body: {}, // 参数
     *  headers: {}, // 头信息
     *  other: { // 其他一些配置参数
     *     noLoading: true, //不出现加载弹窗
     *  }
     * }
     */
    !(other && other.noLoading)

    if (!uri || typeof uri !== 'string') {
      return;
    }
    let requestConf = {
      method,
      type: type || 'json',
      headers
    };
    if (method === 'GET') {
      // 将get请求参数转换成 xxxx?xx=xxx&xxx=xxx&xxx=xx 格式
      const len = uri.length - 1;
      const middle = uri.lastIndexOf('?');
      if (middle > -1 && middle === len ){
        uri = uri.substring(0, middle);
      }
      if (middle === -1){
        uri = uri + '?';
      }
      if (typeof body === 'object' && body !== null){
        uri = uri + JSON.stringify(body);
      }
      if (typeof body === 'string'){
        uri = uri + body;
      }
      requestConf.url = uri;
    } else {
      requestConf.url = uri;
      requestConf.headers = {
        'content-type': 'application/json'
      }
      // requestConf.body = querystring.stringify(body);
      requestConf.body = body
    }

    
    // 内建模块方法【发起网络请求】
    stream.fetch(requestConf,function(res) {
      !(other && other.noLoading) && hideLoading()
      // toast("requestConf.url :  "+requestConf.url  +"[[[[" +JSON.stringify(res))
      if (res.ok) {
        if (res.data.code) {
          // 如果是我们的服务器的请求响应
          if (typeof cb === 'function') {
            if (res.data.code == "000000") {
              cb(res.data.data != undefined ? res.data.data : {})
            } else {
              toast(res.data.msg )
              cb(res.data)
            }
          } else {
            toast(res.data.msg )
          }
        } else {
          // 钉钉请求响应 或者 开发者服务器返回没有code的情况； 资讯请求
          res.data.errmsg && toast(res.data.errmsg)
          typeof cb === 'function' && cb(res != undefined ? res : {})
        }
      } else {
        toast('钉钉请求失败，请稍后再试')
      }
    }, progressCb);
}

/*贴现计算验证*/
//
export function checkNum(num){//验证六位浮点数
  var reg=/^\d+(\.\d{2})?$/;
      return reg.test(num)
}

export function checkOne(num){//只能输入整数
  var reg=/^[0-9]$/;
  return reg.test(num)
}
export function checkFloat(num){//只能输入六位小数
  var reg=/^[0-9]+(.[0-9]{0,6})?$/;
  return reg.test(num)
}
export function checkInit(num){//只能输入正整数
  var reg=/^(0|\+?[1-9][0-9]*)$/;
  return reg.test(num)
}
export function checkObe(num){//判断小数
  var reg=/^[+-]?(0|([1-9]\d*))(\.\d+)?$/g;
  return reg.test(num)
}
/*传值判空*/
export function checkNull(oj){
 return  Object.keys(oj).forEach(key=>{
    if(oj[key]==''||oj[key]==null){
      return false
    }
    else{
      return true
    }
  })
}
/*输入16位数字*/
export function checkNum16(num){
  var reg=/^\d{16}$/;
  return reg.test(num)

}
/*判断是否六位小数*/
export function checkFloat6(num){
  var arr=num.split('.');
  if(arr[1]){//是否是小数
    if(arr[1].length>6){
      return false
    }
    else{
      return true
    }
      
  }
  else{//不是小数
    return true
  }

}
export function toSixDigit(digitStr_t) {
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
        }
    export function returnFloat(value){//保留两位小数
         var value=Math.round(parseFloat(value)*100)/100;
        var xsd=value.toString().split(".");
         if(xsd.length==1){
         value=value.toString()+".00";
            return value;
          }
          if(xsd.length>1){
        if(xsd[1].length<2){
         value=value.toString()+"0";
           }
          return value;
         }
       }

    export function convertCurrency(money) {
  //汉字的数字
  var cnNums = new Array('零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖');
  //基本单位
  var cnIntRadice = new Array('', '拾', '佰', '仟');
  //对应整数部分扩展单位
  var cnIntUnits = new Array('', '万', '亿', '兆');
  //对应小数部分单位
  var cnDecUnits = new Array('角', '分', '毫', '厘');
  //整数金额时后面跟的字符
  var cnInteger = '整';
  //整型完以后的单位
  var cnIntLast = '元';
  //最大处理的数字
  var maxNum = 999999999999999.9999;
  //金额整数部分
  var integerNum;
  //金额小数部分
  var decimalNum;
  //输出的中文金额字符串
  var chineseStr = '';
  //分离金额后用的数组，预定义
  var parts;
  if (money == '') { return ''; }
  money = parseFloat(money);
  if (money >= maxNum) {
    //超出最大处理数字
    return '';
  }
  if (money == 0) {
    chineseStr = cnNums[0] + cnIntLast + cnInteger;
    return chineseStr;
  }
  //转换为字符串
  money = money.toString();
  if (money.indexOf('.') == -1) {
    integerNum = money;
    decimalNum = '';
  } else {
    parts = money.split('.');
    integerNum = parts[0];
    decimalNum = parts[1].substr(0, 4);
  }
  //获取整型部分转换
  if (parseInt(integerNum, 10) > 0) {
    var zeroCount = 0;
    var IntLen = integerNum.length;
    for (var i = 0; i < IntLen; i++) {
      var n = integerNum.substr(i, 1);
      var p = IntLen - i - 1;
      var q = p / 4;
      var m = p % 4;
      if (n == '0') {
        zeroCount++;
      } else {
        if (zeroCount > 0) {
          chineseStr += cnNums[0];
        }
        //归零
        zeroCount = 0;
        chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
      }
      if (m == 0 && zeroCount < 4) {
        chineseStr += cnIntUnits[q];
      }
    }
    chineseStr += cnIntLast;
  }
  //小数部分
  if (decimalNum != '') {
    var decLen = decimalNum.length;
    for (var i = 0; i < decLen; i++) {
      var n = decimalNum.substr(i, 1);
      if (n != '0') {
        chineseStr += cnNums[Number(n)] + cnDecUnits[i];
      }
    }
  }
  if (chineseStr == '') {
    chineseStr += cnNums[0] + cnIntLast + cnInteger;
  } else if (decimalNum == '') {
    chineseStr += cnInteger;
  }
  return chineseStr;
}

