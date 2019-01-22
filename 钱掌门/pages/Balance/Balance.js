var utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: "", //用户信息
    AmountLog: [] //充值记录
  },
  //获取用户充值记录
  GetAmountLog(userId) {
    wx.showLoading({
      title: '加载中...',
    })

    var that = this;
    utils.GetWeData("/api/Qzm/user_amount_log", "POST", {
      user_id: userId,
    }, function(res) {
      console.log(res);
      if (res.data != "") {
        console.log("获取用户充值记录");
        var result = JSON.parse(res.data);
        that.setData({
          AmountLog: result
        });
      } else {
        console.log("没有用户充值记录");
      }
    })
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
    //从缓存中获取用用户信息 如果没有则没有过授权
    var userInfo = wx.getStorageSync("userInfo");
    if (userInfo == null || userInfo == "") {
      console.log("您还没有授权");
    } else {
      utils.RefreshUserInfo();
      var userInfo = wx.getStorageSync("userInfo");
      this.setData({
        userInfo: userInfo
      });
      this.GetAmountLog(userInfo.id);
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
    this.GetAmountLog(this.data.userInfo.id);
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