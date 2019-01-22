// pages/main/main.js
const app = getApp();
var utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasUserInfo: false, //是否存在用户信息
    userInfo: "", //用户信息
    IsSignIn: false //是否签到
  },
  OnPlan(){
    wx.showModal({
      title: '提示',
      content: '功能暂未开放！',
    })
  },
  //退出登录
  loginBtnClick: function() {
    wx.showModal({
      title: '确认退出',
      content: '是否退出当前账户',
      success: function(res) {
        if (res.confirm) {
          //清空所有缓存
          wx.setStorageSync("userInfo", "");
          wx.switchTab({
            url: '../../pages/index/index',
          })
        }
      }
    })

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
    //从缓存中获取用用户信息 如果没有则没有过授权
    var userInfo = wx.getStorageSync("userInfo");
    if (userInfo == null || userInfo == "") {
      console.log("没有用户缓存");
      this.setData({
        hasUserInfo: false
      });
    } else {
      console.log("用户缓存");
      console.log(userInfo);
      this.setData({
        userInfo: userInfo,
        hasUserInfo: true
      });
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