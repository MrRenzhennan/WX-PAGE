// pages/customerService/customerService.js
var utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    question_state: false,
    Opinion: '' //反馈意见，
  },
  inputOpinion: function(e) {
    var Opinion = e.detail.value;
    this.setData({
      Opinion: Opinion
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  //提交意见
  submit: function() {
    console.log("提交意见");
    var that = this;
    var userInfo = wx.getStorageSync("userInfo");
    utils.GetWeData("/api/Qzm/feedback", "POST", {
      user_id: userInfo.id,
      user_tel: userInfo.mobile,
      content: that.data.Opinion
    }, function(res) {
      console.log(res);
      var result = JSON.parse(res.data);
      if (result.status == 1) {
        console.log("提交成功");
        wx.showModal({
          title: '提示',
          content: '留言成功',
          success: function(res) {
            if (res.confirm) {
              wx.navigateBack({});
            }
          }
        })
      } else {
        wx.showToast({
          title: '提交失败',
        })
      }
    })
  },
  //拨打客服电话
  CallPhone:function(){
    wx.makePhoneCall({
      phoneNumber: '123123123',
      success:function(){
        console.log("拨打电话成功");
      },
      fail:function(){
        console.log("拨打电话失败");
      }
    })
  },
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
  questionShow: function() {
    this.setData({
      question_state: true
    })
  },
  questionClose: function() {
    this.setData({
      question_state: false
    })
  }

})