// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img_src:'/static/imgs/box_close.png',
    scale:false,
    isShow:false,
    textarea:"请输入邮件地址"
  },
  open:function(){
    this.setData({
      img_src: '/static/imgs/box_open.png',
      scale: true,
      isShow: true,
      textarea: "请输入邮件地址"
    })
  },
  close: function (e) {
    this.setData({
      scale: false,
      textarea:""
    })
    setTimeout(()=>{
      this.setData({
        img_src: '/static/imgs/box_close.png',
        isShow: false
      })

    },500)
  },
  stop:function(){

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