//解析HTML所需js
var WxParse = require('../wxParse/wxParse.js');
var utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    question_state: false,
    //当前朋友圈
    circleFriend: {}
  },
  BuyForThirty() {
    var user = utils.GetUserInfo();
    if (user != "" && user != null) {
      wx.navigateTo({
        url: '/pages/confirmOrder/confirmOrder?projectId=' + this.data.circleFriend.id + '&projectName=' + this.data.circleFriend.pricelist[0].price_name + '&price=' + this.data.circleFriend.pricelist[0].price + '&circleFriendName=' + this.data.circleFriend.title + '&PaymentType=2&Time=' + this.data.circleFriend.pricelist[0].price_time,
      })
    }
  },
  BuyForNinety() {
    var user = utils.GetUserInfo();
    if (user != "" && user != null) {
      wx.navigateTo({
        url: '/pages/confirmOrder/confirmOrder?projectId=' + this.data.circleFriend.id + '&projectName=' + this.data.circleFriend.pricelist[1].price_name + '&price=' + this.data.circleFriend.pricelist[1].price + '&circleFriendName=' + this.data.circleFriend.title + '&PaymentType=2&Time=' + this.data.circleFriend.pricelist[1].price_time,
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    //options为朋友圈的Id，从缓存中获取朋友圈数据
    var items = wx.getStorageSync("circleFriends");
    console.log(items);
    //循环找到当前的item（数据不大没有做KV）
    for (var item in items) {
      if (items[item].id == options.itemId) {
        var summary = WxParse.wxParse('summary', 'html', items[item].summary, that, 5);
        that.setData({
          circleFriend: items[item]
        });
        console.log(that.data.circleFriend);
        return;
      }
    }
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

  },

  questionShow: function() {
    this.setData({
      question_state: true
    })
  },
  questionClose: function() {
    this.setData({
      question_state: false
    })
  }
})