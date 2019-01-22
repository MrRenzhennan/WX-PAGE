// pages/Recharge/Recharge.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: "",
    idx: 0,
    project: [50,100,200,500,1000]//充值金额列表
  },
  // 选中变色
  goIndex(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      idx: index
    })
  },
  //充值
  OnSubmit: function() {
    var price = this.data.project[this.data.idx];
    wx.navigateTo({
      url: '/pages/confirmOrder/confirmOrder?projectId=0&projectName=充值余额&price=' + price+'&circleFriendName=&PaymentType=1',
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
    //从缓存中获取用用户信息 如果没有则没有过授权
    var userInfo = wx.getStorageSync("userInfo");
    if (userInfo == null || userInfo == "") {
      console.log("没有用户缓存");
      this.setData({
        hasUserInfo: false
      });
    } else {
      console.log("用户缓存");
      console.log(userInfo);
      this.setData({
        userInfo: userInfo,
        hasUserInfo: true
      });
    }
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