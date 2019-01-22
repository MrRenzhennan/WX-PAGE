// pages/coupon/coupon.js
var utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code: '' //优惠代码
  },
  inputCode: function(e) {
    //赋值优惠卷代码
    var code = e.detail.value;
    this.setData({
      code: code
    });
  },
  //执行兑换
  OnConversion() {
    var userInfo = utils.GetUserInfo();
    //先调用登录判断是否存在该用户
    var that = this;
    utils.GetWeData("/api/Qzm/coupons", "POST", {
      phone: userInfo.mobile, //这里手机号以后从缓存获取
      couponcode: that.data.code
    }, function(res) {
      //成功返回结果
      res = JSON.parse(res.data);
      console.log(res);
      if (res.status == 0) {
        wx.showModal({
          title: '提示',
          content: res.msg,
        })
      } else {
        wx.showModal({
          title: '提示',
          content: res.msg,
        })
      }
    })
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

  }
})