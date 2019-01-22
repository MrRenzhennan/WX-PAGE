// pages/integralWithdrawal/integralWithdrawal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    method_payment:1,
    choose_money:1
  },
  method_payment: function (e) {
    this.setData({
      method_payment: e.currentTarget.dataset.method_payment
    })
  },
  choose_money:function(e){
    this.setData({
      choose_money: e.currentTarget.dataset.choose_money
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