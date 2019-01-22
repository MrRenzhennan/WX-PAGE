// pages/detailedQuote/detailedQuote.js
var utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _TabList: [{
        name: "分时",
        num: 0
      },
      {
        name: "日K",
        num: 1
      }
    ],
    idx: 0,
    detail:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    utils.GetWeData("/api/Qzm/hs", "POST", {
      code: options.code,
    }, function(res) {
      var result = res.data;
      console.log(result);
      if (result.resultcode == 200) {
        that.setData({
          detail: result.result
        });
        wx.hideLoading();
      } else if (result.resultcode == 112) {
        wx.hideLoading();
        wx.showModal({
          title: '提示',
          content: '今日查询次数封顶',
        })
      } else {
        wx.hideLoading();
        wx.showModal({
          title: '提示',
          content: result.reason,
        })
      }
    })
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
  //tab切换
  currentTab: function(e) {
    let index = e.currentTarget.dataset.current;
    this.setData({
      idx: index
    })
  },
  //swiper切换
  currentChange: function(e) {
    let index = e.detail.current
    this.setData({
      idx: index
    })
  }
})