// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baoxiang_src:'/static/imgs/baoxiang1.png',
    baoxiang:false,
    animation:[]
  },
  open:function(){
    this.setData({
      baoxiang_src:'/static/imgs/baoxiang3.png',
      baoxiang:true
    })

    setTimeout(()=>{
      wx.navigateTo({
        url: '/pages/theWelcomePageUnregistered/theWelcomePageUnregistered'
      })
    },5000)
    setTimeout(()=>{
      this.setData({
        baoxiang_src: '/static/imgs/baoxiang1.png',
        baoxiang: false
      })
    },6000)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var ayyr = [];
    for(var i = 0;i<30;i++){
      ayyr.push(i);
      this.setData({
        animation: ayyr
      })
    };
    console.log(this.data.animation)
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