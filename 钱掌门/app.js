var utils = require('/utils/util.js');
App({
  globalData: {
    userInfo: null
  },
  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function(options) {

    wx.login({
      success: res => {
        if (res.code) {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          console.log(res.code);
 
          utils.GetWeData("/api/Qzm/openid", "POST", {
            code: res.code
          }, function(res) {
            console.log("获取用户唯一标识")
            wx.setStorageSync('session_key', res.data.session_key);
            wx.setStorageSync('openid', res.data.openid);
          });
          // wx.request({
          //   url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx5ff6e9708b99dc56&secret=ea87267d70b1e823f427878edb8c415a&grant_type=authorization_code&js_code=' + res.code,
          //   method: 'POST',
          //   success: function(result) {
          //     console.log(result);
          //     if (result.statusCode == 200) {
          //       //用户唯一标识和登录状态
          //       console.log("获取用户唯一标识")
          //       wx.setStorageSync('session_key', result.data.session_key);
          //       wx.setStorageSync('openid', result.data.openid);
          //       //获取用户是否授权
          //       // wx.getSetting({
          //       //   success: function(res) {
          //       //     if (res.authSetting['scope.userInfo']) {
          //       //       console.log("用户已授权直接登录");
          //       //       //先调用登录判断是否存在该用户
          //       //       utils.GetWeData("/api/Qzm/user_login", "POST", {
          //       //         mobile: 15512245319,
          //       //         password: result.data.openid
          //       //       }, function(res) {
          //       //         //请求成功
          //       //         var result = JSON.parse(res.data);
          //       //         console.log(result);
          //       //         if (result.status != 1) {
          //       //           wx.showToast({
          //       //             title: result.msg,
          //       //             icon: "none"
          //       //           });
          //       //         } else {
          //       //           wx.setStorageSync("userInfo", result.data);
          //       //         }
          //       //       })
          //       //     } else {
          //       //       console.log("用户没有受过权不能自动登录");
          //       //     }
          //       //   }
          //       // })
          //     }
          //   }
          // })
        } else {
          console.log('获取用户登录信息失败！' + res.errMsg);
        }
      }
    });
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function(options) {

  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function() {

  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function(msg) {

  }
})