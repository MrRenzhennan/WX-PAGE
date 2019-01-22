// pages/index/index.js
var utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [],
    NewViewPoint: [], //最新观点
    NewInformation: [] //最新资讯
  },
  //banner跳转
  NavigateTo(e){
    wx.navigateTo({
      url: e.target.dataset.url ,
    })
  },
  // NavigatePOP(){
  //   wx.showModal({
  //     title: '提示',
  //     content: '功能未开放',
  //   })
  // },
  //获取最新观点
  getNewViewPoint() {
    var that = this;
    utils.GetQzmData("/openapi/infos", "POST", {
      'Content-Type': 'application/json'
    }, {
      "model_id": "1", //文章类型
      "per_page": "2" //条数
    }, function(res) {
      that.setData({
        NewViewPoint: res.data.data
      })

    });
  },
  //获取最新资讯
  getNewInformation() {
    var that = this;
    utils.GetQzmData("/openapi/infos", "POST", {
      'Content-Type': 'application/json'
    }, {
      "model_id": "2", //文章类型
      "per_page": "2" //条数
    }, function(res) {
      that.setData({
        NewInformation: res.data.data
      })
    });
   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中...',
    })

    var that = this;
    this.getNewViewPoint();
    this.getNewInformation();
    //加载广告
    utils.GetWeData("/api/Qzm/advert_banner", "POST", {
      aid: 1,
    }, function(res) {
      var result = JSON.parse(res.data);
      console.log(result);
      var swiperList = [];
      result.forEach(item => {
        swiperList.push({
          src: "https://admin.chinahxmedia.cn" + item.file_path,
          url: item.link_url
        });
      })
      that.setData({
        swiperList: swiperList
      })
      console.log(that.data.swiperList);
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

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    wx.showLoading({
      title: '加载中...',
    })
    this.getNewViewPoint();
    this.getNewInformation();
    wx.stopPullDownRefresh();
    wx.hideLoading();

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