// pages/marketDetails/marketDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    up_down_state:true,
    _TabList: [
      { name: "分时", num: 0 },
      { name: "日K", num: 1 },
      { name: "周K", num: 2 },
      { name: "月K", num: 3 }
    ],
    idx: 0,
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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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

  },

  onDetailsAll: function () {
    this.setData({ up_down_state: false })
  },
  onDetailsOnce: function () {
    this.setData({ up_down_state: true })
  },

  //tab切换
  currentTab: function (e) {
    let index = e.currentTarget.dataset.current;
    this.setData({
      idx: index
    })
  },
  //swiper切换
  currentChange: function (e) {
    let index = e.detail.current
    this.setData({
      idx: index
    })
  }
})