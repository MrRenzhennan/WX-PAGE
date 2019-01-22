// pages/latestNewsDetails/latestNewsDetails.js
// pages/latestViewDetails/latestViewDetails.js
var utils = require('../../utils/util.js');
var WxParse = require('../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Article: {}, //文章信息,
    Title: '', //文章标题
    UpdateTime: '' //更新时间
  },
  //转到首页
  ToIndex:function(){
    console.log(1);
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  getArticleById(id) {

    wx.showLoading({
      title: '加载中...',
    })
    //根据文章id获取文章信息
    var that = this;
    utils.GetQzmData("/openapi/info", "POST", {
      'Content-Type': 'application/json'
    }, {
      "id": id, //文章id
    }, function(res) {
      that.setData({
        Article: res.data,
        Title: res.data.title,
        UpdateTime: res.data.updated_at
      })
      console.log(that.data.Article);
      var summary = WxParse.wxParse('Article', 'html', res.data.content, that, 5);
    });
    wx.hideLoading();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //加载文章
    this.getArticleById(options.id)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

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