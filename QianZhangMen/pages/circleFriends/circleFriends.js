// pages/circleFriends/circleFriends.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _TabList: [
      { name: "已订阅", num: 0 },
      { name: "未订阅", num: 1 }
      ],
    idx:0,
    windowHeight:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    // 获取系统信息
    wx.getSystemInfo({
      success: function (res) {
        // 计算主体部分高度,单位为 rpx
        that.setData({
          windowHeight: 750 / res.windowWidth *  res.windowHeight
        })
      }
    })
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
  //tab切换
  currentTab: function(e){
    let index = e.currentTarget.dataset.current;
    this.setData({
      idx: index
    })
  },
  //swiper切换
  currentChange:function(e){
    let index = e.detail.current
    this.setData({
      idx: index
    })
  }

})