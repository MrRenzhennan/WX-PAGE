// pages/realTimeQuotation/realTimeQuotation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //列表
    list: [1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5],
    idx: 0,
    _TabList: [{
        name: "沪深",
        num: 0
      },
      {
        name: "港股",
        num: 1
      },
      {
        name: "美股",
        num: 2
      }
    ],
    hq_idx: 0,
    //指数列表
    exponent: [1, 2, 3],
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
  },


  // 截获竖向滑动
  catchTouchMove: function (res) {
    return false
  },


  hq_currentTab: function(e) {
  let index = e.currentTarget.dataset.current;
  this.setData({
    hq_idx: index
  })
}
})