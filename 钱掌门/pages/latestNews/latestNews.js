// pages/latestNews/latestNews.js
var utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pages: 0, //共多少页
    page: 1, //当前页数
    Articles: [] //最新资讯列表
  },
  //获取文章列表
  fetchArticleList(pageNo, override) {
    wx.showLoading({
      title: '加载中...',
    })
    var that = this;
    that.setData({
      page: pageNo
    })
    utils.GetQzmData("/openapi/infos", "POST", {
      'Content-Type': 'application/json'
    }, {
      "model_id": 2, //2的类型为最新资讯
      "page": pageNo, //当前页数
      "per_page": 10 //每页20条
    }, function(res) {
      that.setData({
        Articles: override ? res.data.data : that.data.Articles.concat(res.data.data), //文章数据
        pages: res.data.last_page //共几页
      })
      console.log(that.data.page);
    });
    wx.hideLoading();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 页面初次加载，请求第一页数据
    this.fetchArticleList(1, true);
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
    // 上拉刷新
    if (!this.loading) {
      this.fetchArticleList(1, true)
      // 处理完成后，终止下拉刷新
      wx.stopPullDownRefresh()
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    // 下拉触底，先判断是否有请求正在进行中
    // 以及检查当前请求页数是不是小于数据总页数，如符合条件，则发送请求
    if (this.data.page < this.data.pages) {
      this.fetchArticleList(this.data.page + 1)
    } else {
      wx.showModal({
        title: '提示',
        content: '已经没有数据了！',
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})