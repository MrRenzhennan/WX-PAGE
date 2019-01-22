const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
//QZM主机地址
const QzmHOST = "https://m.qzmhao.com";

//We主机地址
const WeHOST = "https://api.chinahxmedia.cn";

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  GetQzmData: GetQzmData,
  GetWeData: GetWeData,
  QZMHOST: QzmHOST,
  FormatToDate: FormatToDate,
  FormatDate: FormatDate,
  GetWeDataFromBody: GetWeDataFromBody,
  GetUserInfo: GetUserInfo,
  RefreshUserInfo: RefreshUserInfo
}

//统一处理请求函数
function GetQzmData(url, method, header, data, callBack) {
  var result;
  wx.request({
    url: QzmHOST + url,
    method: method,
    data: data,
    header: header,
    success: function(res) {
      //请求成功
      if (res.statusCode == 200) {
        //服务器返回正确
        typeof callBack == "function" && callBack(res.data)
      } else {
        //服务器状态码非200
        wx.showToast({
          title: '获取数据失败',
          icon: 'none'
        })
      }
    },
    fail: function(err) {
      //请求失败
      wx.showToast({
        title: '获取数据异常',
        icon: 'none'
      });
      return typeof callBack == "function" && callBack(false)
    },
    complete: function() {
      //请求完成
    }
  });
  return result;
}

//统一处理请求函数
function GetWeData(url, method, data, callBack) {
  var result;

  var result = JoinURLParameters(data);
  console.log(WeHOST + url + result);
  wx.request({
    url: WeHOST + url + result,
    method: method,
    success: function(res) {
      //请求成功
      if (res.statusCode == 200) {
        //服务器返回正确
        typeof callBack == "function" && callBack(res);
      } else {
        //服务器状态码非200
        wx.showToast({
          title: '获取数据失败',
          icon: 'none'
        })
      }
    },
    fail: function(err) {
      //请求失败
      wx.showToast({
        title: '获取数据异常',
        icon: 'none'
      });
      return typeof callBack == "function" && callBack(false)
    },
    complete: function() {
      //请求完成
    }
  });
  return result;
}


//统一处理请求函数
function GetWeDataFromBody(url, method, header, data, callBack) {
  var result;
  wx.request({
    url: WeHOST + url,
    method: method,
    data: data,
    header: header,
    success: function(res) {
      //请求成功
      if (res.statusCode == 200) {
        //服务器返回正确
        typeof callBack == "function" && callBack(res.data)
      } else {
        //服务器状态码非200
        wx.showToast({
          title: '请求失败',
          icon: 'none'
        })
      }
    },
    fail: function(err) {
      //请求失败
      wx.showToast({
        title: '请求失败',
        icon: 'none'
      });
      return typeof callBack == "function" && callBack(false)
    },
    complete: function() {
      //请求完成
    }
  });
  return result;
}


//拼接C#WebAPI所需参数列表（没有用FORMBODY）
function JoinURLParameters(parameters) {
  var urlParameters = "?";
  if (parameters == null) {
    return "";
  } else {
    var kV = Object.keys(parameters);
    for (var i = 0; i < kV.length; i++) {
      if (i == kV.length - 1) {
        urlParameters += kV[i] + "=" + parameters[kV[i]];
      } else {
        urlParameters += kV[i] + "=" + parameters[kV[i]] + "&";
      }
    }
  }
  return urlParameters;
}

//格式化日期
function FormatToDate(val) {
  if (val != null) {
    var date = new Date(parseInt(val.replace("/Date(", "").replace(")/", ""), 10));
    //月份为0-11，所以+1，月份小于10时补个0
    var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    return date.getFullYear() + "-" + month + "-" + currentDate;
  }
  return "";
}

//格式化js日期
function FormatDate(format) {
  var date = new Date();
  var o = {
    "M+": date.getMonth() + 1, //month
    "d+": date.getDate(), //day
    "h+": date.getHours(), //hour
    "m+": date.getMinutes(), //minute
    "s+": date.getSeconds(), //second
    "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
    "S": date.getMilliseconds() //millisecond
  }
  if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
    (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(format))
      format = format.replace(RegExp.$1,
        RegExp.$1.length == 1 ? o[k] :
        ("00" + o[k]).substr(("" + o[k]).length));
  return format;
}

//获取用户信息 没有获取转到登录
function GetUserInfo() {
  //从缓存中获取用用户信息 如果没有则没有过授权
  var userInfo = wx.getStorageSync("userInfo");
  if (userInfo == null || userInfo == "") {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  } else {
    return userInfo;
  }
}


//更新用户缓存
function RefreshUserInfo() {
  console.log("刷新用户缓存");
  var userInfo = wx.getStorageSync("userInfo");
  var openid = wx.getStorageSync("openid");
  wx.request({
    url: WeHOST + '/api/Qzm/user_login?mobile=' + userInfo.mobile + '&password='+openid,
    method:"POST",
    success:function(res){
      var result = JSON.parse(res.data)
      if (result.status==1){
        wx.setStorageSync("userInfo", result.data);
        console.log("刷新成功");
      }
    }
  })
}