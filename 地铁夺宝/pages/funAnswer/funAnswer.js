// pages/funAnswer/funAnswer.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { name: '2019', value: '2019' },
      { name: '2018', value: '2018' },
      { name: '2017', value: '2017' },
    ],
    correct_answer:'',
    correct:false,
    error:false
  },
  radioChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);
    this.setData({
      correct_answer: e.detail.value
    })
  },
  submit(){
    console.log("cc", this.data.correct_answer)
    if (!this.data.correct_answer){
      return
    }
    if (this.data.correct_answer == '2018'){
      this.setData({
        correct: true
      })
    }else{
      this.setData({
        error: true
      })
    }
  },
  share:function(){
    this.setData({
      correct: false
    })
  },
  again_watch:function(){
    this.setData({
      error: false
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