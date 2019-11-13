// pages/resource/resource.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList: ["/static/imgs/swiper-02.png", "/static/imgs/swiper-02.png"],
    tabArray: ['诵读指导', '诗词讲解', '诗词创作', '纂刻知识', '诵读指导', '诗词讲解', '诗词创作', '纂刻知识'],
    activeIdx: 0,
    titleHeight: 0,
    toView: 'tab0'
  },

  //tab切换
  currentTab: function (e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      activeIdx: index
    })
  },
  //swiper切换
  currentChange: function (e) {
    let index = e.detail.current
    this.setData({
      activeIdx: index,
      toView: 'tab' + index
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