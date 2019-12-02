// pages/comment/comment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textAreaShow: false,
    height: 0,//键盘高度
    releaseClass: false,
    isZan:false
  },
  changeZan(){
    this.setData({
      isZan: true
    })
  },
  comment() {
    this.setData({
      textAreaShow: true
    })
  },
  focus(e) {
    console.log(e);
    this.setData({
      height: e.detail.height
    });
  },
  blur() {
    this.setData({
      textAreaShow: false
    });
    this.setData({
      height: 0
    });
  },
  go() {

  },
  //改变发布按钮类名
  changeButtonStyle(e) {
    this.setData({
      releaseClass: true
    })
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

  }
})