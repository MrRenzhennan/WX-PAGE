var utils = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //朋友圈列表
    circleFriends: []
  },
  //获取已购买的朋友圈
  GetBoughtCircleFriends() {
    wx.showLoading({
      title: '加载中...',
    })
    var that = this;
    that.setData({
      circleFriends: []
    });
    var userInfo = wx.getStorageSync("userInfo");
    if (userInfo == "" || userInfo == null) {
      wx.showModal({
        title: '提示',
        content: '您还没有登录，请先登录！',
        success: function(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../../pages/login/login',
            })
          }else{
            wx.switchTab({
              url: '/pages/index/index',
            })
          }
        }
      })
    } else {
      utils.GetWeData("/api/Qzm/Subscribed", "POST", {
        phone: userInfo.mobile, //测试
      }, function(res) {
        if (res.statusCode == 200) {
          console.log("获取已购买朋友圈");
          console.log(res);
          that.setData({
            circleFriends: res.data.data
          });
        } else {
          wx.showToast({
            title: '获取失败',
            icon: 'none'
          })
        }
      });
    }
    wx.hideLoading();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.GetBoughtCircleFriends();
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
    this.GetBoughtCircleFriends();
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