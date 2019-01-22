// pages/realTimeMarket/realTimeMarket.js
var utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    StockCode: '', //股票代码
    Title: [], //抬头数据
    List: [] //列表数据
  },
  InputStock(e) {
    var stackCode = e.detail.value;
    this.setData({
      StockCode: stackCode
    });
  },
  //获取用户缓存的列表
  SerachUserList() {
    var that = this;
    var stockList = wx.getStorageSync("StockList") || [];
    console.log(stockList);
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    var stringCode = stockList.length > 0 ? stockList.join(",") : "";
    if (stringCode != "") {
      console.log(stringCode);
      utils.GetWeData("/api/Qzm/stockall", "POST", {
        code: stockList,
        page: 1
      }, function(res) {
        console.log(JSON.parse(res.data));
        var result = JSON.parse(res.data);
        if (result.status == 1) {
          console.log("获取股票信息成功");
          wx.hideLoading();
          that.setData({
            List: result.data
          })
        } else {
          //获取失败
          wx.hideLoading();
        }
      })
    } else {
      wx.hideLoading();
    }
  },
  SerachTitle() {
    var that = this;
    utils.GetWeData("/api/Qzm/stock_hs", "POST", {}, function(res) {
      var result = JSON.parse(res.data);
      console.log(result);
      if (result != "" || result.length > 0) {
        that.setData({
          Title: result
        })
      }
    })
  },
  Serach() {
    var stockList = wx.getStorageSync("StockList") || [];
    var index = stockList.indexOf(this.data.StockCode);
    if (index == -1 && this.data.StockCode != "") {
      stockList.push(this.data.StockCode);
    }
    wx.setStorageSync("StockList", stockList)
    this.SerachUserList();
    this.setData({
      StockCode: ''
    });
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
    this.SerachTitle();
    this.SerachUserList();
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
    this.SerachTitle();
    this.SerachUserList();
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