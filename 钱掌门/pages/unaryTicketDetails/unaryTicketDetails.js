// pages/unaryTicketDetails/unaryTicketDetails.js
var utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _TabList: [
      { name: "30分k线", num: 0 },
      { name: "日K线", num: 1 }
    ],
    idx: 0,
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中...',
    })
    console.log(options.code);
    var that=this;
    var userInfo = utils.GetUserInfo();
    utils.GetWeData("/api/Qzm/Judge", "POST", {
      phone: userInfo.mobile,
      keyword: options.code,
      kind: "min30"
    },function(res){
      console.log(res.data);
      that.setData({
        min30Brief: res.data.data.brief,
        concept: res.data.data.concept.trim().split(" "),
        min30:res.data.data.kline_list,
        min30Img: res.data.data.img
      });
    })

    utils.GetWeData("/api/Qzm/Judge", "POST", {
      phone: userInfo.mobile,
      keyword: options.code,
      kind: "daily"
    }, function (res) {
      console.log(res.data);
      that.setData({
        dailyBrief: res.data.data.brief,
        concept: res.data.data.concept.trim().split(" "),
        daily: res.data.data.kline_list,
        dailyImg:res.data.data.img
      });
    })
    wx.hideLoading();
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
    wx.reLaunch({
      url: '/pages/index/index',
    })
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
})