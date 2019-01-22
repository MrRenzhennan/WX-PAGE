var utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: '', //用户信息
    SignlnRecord: [], //用户签到列表
    msg: '未签到' //签到标签
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
  //获取用户签到记录
  GetSignlnRecord(userId) {
    wx.showLoading({
      title: '加载中...',
    })
    var that = this;
    var userInfo = wx.getStorageSync("userInfo");
    that.setData({
      userInfo: userInfo
    })
    utils.GetWeData("/api/Qzm/user_sign_log", "POST", {
      user_id: userId,
    }, function(res) {
      if (res.data != "") {
        console.log("获取用户签到记录");
        var result = JSON.parse(res.data);
        that.setData({
          SignlnRecord: result //先加载列表一次
        });
        //如果记录中不存在当日记录自动签到，否则提示当日已签到
        if (utils.FormatToDate(result[0].add_time) == utils.FormatDate('yyyy-MM-dd')) {
          console.log("今日已签到");
          wx.showToast({
            title: '今日已签到'
          })
          that.setData({
            msg: '已签到'
          });
        } else {
          console.log("今日未签到");
          //签到一次
          utils.GetWeData("/api/Qzm/user_sign", "POST", {
            user_id: userId,
          }, function(res) {
            console.log(res);
            var result = JSON.parse(res.data);
            if (result.status == 0) {
              //打开失败
              console.log("打卡失败")
            } else {
              console.log("打卡成功")
              that.setData({
                msg: '已签到'
              });
              //签到成功更新用户缓存数据
              var openid = wx.getStorageSync("openid");
              //先调用登录判断是否存在该用户
              utils.GetWeData("/api/Qzm/user_login", "POST", {
                mobile: userInfo.mobile, //这里手机号以后从缓存获取
                password: openid
              }, function(res) {
                //成功返回结果
                res = JSON.parse(res.data);
                //更新缓存
                wx.setStorage({
                  key: 'userInfo',
                  data: res.data
                });
                wx.showToast({
                  title: '已为您自动签到!'
                })
              })
            }
          });
        }

      } else {
        console.log("没有用户签到记录");
        //第一次点开签到记录 默认签到一次
        //签到一次
        utils.GetWeData("/api/Qzm/user_sign", "POST", {
          user_id: userId,
        }, function(res) {
          console.log(res);
          var result = JSON.parse(res.data);
          if (result.status == 0) {
            //打开失败
            console.log("打卡失败")
          } else {
            console.log("打卡成功")

            that.setData({
              msg: '已签到'
            });
            //签到成功更新用户缓存数据
            //签到成功更新用户缓存数据
            var openid = wx.getStorageSync("openid");
            //先调用登录判断是否存在该用户
            utils.GetWeData("/api/Qzm/user_login", "POST", {
              mobile: userInfo.mobile, //这里手机号以后从缓存获取
              password: openid
            }, function(res) {
              //成功返回结果
              res = JSON.parse(res.data);
              //更新缓存
              wx.setStorage({
                key: 'userInfo',
                data: res.data
              });
              wx.showToast({
                title: '已为您自动签到!'
              })
            })
          }
        });
      }
    });
    wx.hideLoading();
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    //从缓存中获取用用户信息 如果没有则没有过授权
    var userInfo = wx.getStorageSync("userInfo");
    if (userInfo == null || userInfo == "") {
      console.log("您还没有授权");
    } else {
      this.setData({
        userInfo: userInfo
      });
      this.GetSignlnRecord(userInfo.id);
    }
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
    this.GetSignlnRecord(this.data.userInfo.id);
    wx.stopPullDownRefresh();
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