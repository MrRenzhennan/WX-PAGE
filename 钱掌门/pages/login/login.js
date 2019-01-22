var utils = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  getPhoneNumber: function(e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
    var sessionKey = wx.getStorageSync("session_key");
    console.log(sessionKey);
    var that = this;
    if (e.detail.errMsg == 'getPhoneNumber:user deny') {
      //未授权
      wx.showModal({
        title: '提示',
        content: '若不授权微信登录，则无法使用小程序。点击"授权"按钮并允许使用"用户信息"方可正常使用。',
        showCancel: false,
        confirmText: '授权'
      })
    } else {
      //已授权
      if (sessionKey == "" || sessionKey == null) {
        //可能用户清理了缓存需要调用login
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
                that.OnLogin(res.data.session_key, e.detail.encryptedData, e.detail.iv);
              });
            }
          }
        })
      } else {
        this.OnLogin(sessionKey, e.detail.encryptedData, e.detail.iv);
      }
    }
  },
  OnLogin(sessionKey, encryptedData, iv) {
    console.log("已授权，解密用户数据")
    //解密数据
    utils.GetWeDataFromBody("/api/Qzm/Decrypt", "POST", {
      'Content-Type': 'application/json'
    }, {
      encryptedData: encryptedData,
      iv: iv,
      sessionKey: sessionKey
    }, function(res) {
      var phone = JSON.parse(res);
      //用户已点击授权，获取业务数据
      var openid = wx.getStorageSync("openid");
      //先调用登录判断是否存在该用户
      utils.GetWeData("/api/Qzm/user_login", "POST", {
        mobile: phone.phoneNumber,
        password: openid
      }, function(res) {
        //请求成功
        console.log();
        var result = JSON.parse(res.data);
        console.log(result);
        if (result.status == 2) {
          console.log("用户不存在直接注册");
          utils.GetWeData("/api/Qzm/user_register", "POST", {
            mobile: phone.phoneNumber,
            password: openid
          }, function(res) {
            if (!res) {
              console.log("失败，请查看控制台输出");
            } else {
              //成功返回结果
              res = JSON.parse(res.data);
              console.log(res);
              if (res.status == 1) {
                wx.showToast({
                  title: res.msg,
                  duration: 1000
                })
                wx.setStorage({
                  key: 'userInfo',
                  data: res.data
                })
                wx.navigateBack({});
              }
            }
          });
        } else {
          console.log("用户已存在直接存入缓存");
          //更新缓存中的用户信息
          wx.setStorage({
            key: 'userInfo',
            data: result.data
          })
          wx.navigateBack();
        }
      })
    });
  },
  getUserInfo: function(e) {
    this.userInfo = e.detail.userInfo; //e.detail.userInfo携带的就是用户的个人信息[包括头像、昵称等]
    if (e.detail.userInfo) {
      wx.showLoading({
        title: '加载中...',
      })
      console.log("用户点击了授权操作");
      //用户已点击授权，获取业务数据
      var openid = wx.getStorageSync("openid");
      //获取手机号
      //先调用登录判断是否存在该用户
      utils.GetWeData("/api/Qzm/user_login", "POST", {
        mobile: 15512245319, //测试
        password: openid
      }, function(res) {
        //请求成功
        console.log();
        var result = JSON.parse(res.data);
        console.log(result);
        if (result.status == 2) {
          console.log("用户不存在直接注册");
          utils.GetWeData("/api/Qzm/user_register", "POST", {
            mobile: 15512245319,
            password: openid
          }, function(res) {
            if (!res) {
              console.log("失败，请查看控制台输出");
            } else {
              //成功返回结果
              res = JSON.parse(res.data);
              console.log(res);
              if (res.status == 1) {
                wx.showToast({
                  title: res.msg,
                  duration: 1000
                })
                wx.setStorage({
                  key: 'userInfo',
                  data: res.data
                })
                wx.navigateBack({});
              }
            }
          });
        } else {
          console.log("用户已存在直接存入缓存");
          //更新缓存中的用户信息
          wx.setStorage({
            key: 'userInfo',
            data: result.data
          })
          wx.navigateBack();
        }
      })

    } else if (e.detail.errMsg == 'getUserInfo:fail auth deny') {
      wx.showModal({
        title: '提示',
        content: '若不授权微信登录，则无法使用小程序。点击"授权"按钮并允许使用"用户信息"方可正常使用。',
        showCancel: false,
        confirmText: '授权',
        success: (res => {
          wx.openSetting({
            success: (res) => {}
          })
        })
      })
    }
    wx.hideLoading();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})