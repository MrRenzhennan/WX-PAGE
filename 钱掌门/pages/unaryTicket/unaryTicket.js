// pages/unaryTicket/unaryTicket.js
var utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    StockCode: '' //股票代码
  },
  //赋值输入的股票代码或者拼音
  inputStock(e) {
    var stackCode = e.detail.value;
    this.setData({
      StockCode: stackCode
    });
  },
  //购买一元诊股
  BuyStock() {
    var that = this;
    var userInfo = wx.getStorageSync("userInfo");
    if (userInfo == "" || userInfo == null) {
      wx.showToast({
        title: '请登录后在购买',
        icon: 'none'
      })
    } else {
      if (that.data.StockCode == '' || that.data.StockCode == null) {
        wx.showToast({
          title: '请输入股票代码！',
          icon: 'none'
        })
      } else {
        wx.showLoading({
          title: '加载中...',
          mask:true
        })
        utils.GetWeData("/api/Qzm/Judge_users", "POST", {
          user_id: userInfo.id,
          keyword: that.data.StockCode
        }, function(res) {
          var result = JSON.parse(res.data);
          console.log(result);
          if (result.status == 1) {
            console.log("股票已购买直接跳转");
            wx.navigateTo({
              url: '/pages/unaryTicketDetails/unaryTicketDetails?code=' + that.data.StockCode
            })
          } else {
            wx.hideLoading();
            wx.showModal({
              title: '确认购买',
              content: that.data.StockCode,
              success: function(e) {
                if (e.confirm) {
                  wx.navigateTo({
                    url: '/pages/confirmOrder/confirmOrder?projectId=0&projectName=' + that.data.StockCode + '&price=1&circleFriendName=一元解票&PaymentType=2',
                  })
                }
              }
            })
          }
        })

      }
    }

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