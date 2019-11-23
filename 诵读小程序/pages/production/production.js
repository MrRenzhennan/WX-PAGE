// pages/production/production.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabArray: ['小学组', '初中组', '高中组', '大学组', '初中组', '高中组', '大学组'],
    searchArray: ['综合推荐', '最新参与', '得票最多'],
    activeIdx: 0,
    searchIdx: 0,
  },
  currentTab: function (e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      activeIdx: index
    })
  },
  searchTab: function (e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      searchIdx: index
    })
  },
  //swiper切换
  currentChange: function (e) {
    let index = e.detail.current
    this.setData({
      searchIdx: index,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var query = wx.createSelectorQuery();
    query.select('.top').boundingClientRect((rect) => {
      this.setData({
        titleHeight: rect.height
      })
    }).exec();
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

  }
})