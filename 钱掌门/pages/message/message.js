var utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message:[]//用户信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  //获取用户信息
  GetUserMessage(userName){
    wx.showLoading({
      title: '加载中...',
    })
    var that = this;
    utils.GetWeData("/api/Qzm/user_message", "POST", {
      user_name: userName,
    }, function (res) {
      var result=JSON.parse(res.data);
      if (result.status==1) {
        console.log("获取短信成功");
        console.log(result);
        if (result.data==null){
          console.log("没有短信");
        }else{
          that.setData({
            message: result.data
          });
        }
      } else {
        console.log("获取短信失败");
      }
    })
    wx.hideLoading();
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //从缓存中获取用用户信息 如果没有则没有过授权
    var userInfo = wx.getStorageSync("userInfo");
    this.GetUserMessage(userInfo.user_name);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var userInfo = wx.getStorageSync("userInfo");
    this.GetUserMessage(userInfo.user_name);
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})