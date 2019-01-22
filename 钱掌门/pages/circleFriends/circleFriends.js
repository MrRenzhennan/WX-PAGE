// pages/circleFriends/circleFriends.js

var utils = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //已订阅
    HaveSubscribed: [],
    //未订阅
    NoSubscribed: [],
    _TabList: [{
        name: "未订阅",
        num: 0
      },
      {
        name: "已订阅",
        num: 1
      }
    ],
    idx: 0,
    windowHeight: null,
  },
  //tab切换
  currentTab: function(e) {
    let index = e.currentTarget.dataset.current;
    this.setData({
      idx: index
    })

  },
  //swiper切换
  currentChange: function(e) {
    console.log("切换事件");
    var that = this;
    let index = e.detail.current
    that.setData({
      idx: index
    })
    var userInfo = wx.getStorageSync("userInfo");
    if ((userInfo == null || userInfo == "") && index == 1) {
      wx.showModal({
        title: '提示',
        content: '未登录，是否登录?',
        success: function(res) {
          if (res.confirm) {
            //跳转到登录
            wx.navigateTo({
              url: '/pages/login/login',
            })
          } else {
            that.setData({
              idx: 0
            })
          }
        }
      })
    } else if (userInfo != null && userInfo != "" && index == 0) {
      if (that.data.NoSubscribed.length == 0) {
        wx.showModal({
          title: '提示',
          content: '您已全部订阅',
          showCancel: false,
          success: function() {
            //已全部订阅
            that.setData({
              idx: 1
            })
          }
        })
      }
    }
  },
  getcircleFriends() {
    wx.showLoading({
      title: '加载中...',
    })
    var that = this;
    //获取当前的tab索引
    

    //获取朋友圈列表
    utils.GetQzmData("/openapi/topics", "GET", {
      'Content-Type': 'application/json'
    }, null, function(res) {
      //存入缓存中
      wx.setStorageSync("circleFriends", res.data);
      var allCircleFriends = res.data;
      //计算是否有用户缓存
      var userInfo = wx.getStorageSync("userInfo");
      if (userInfo != null && userInfo != "") {
        //区分已订阅和未订阅
        utils.GetWeData("/api/Qzm/Subscribed", "POST", {
          phone: userInfo.mobile,
        }, function(res) {
          if (res.statusCode == 200) {
            console.log("获取已购买朋友圈");
            console.log(res);
            if(res.data.data.length!=0){
              that.setData({
                HaveSubscribed: res.data.data
              });
              var deleteIds = [];
              res.data.data.forEach(item => {
                deleteIds.push(item.id);
              });
              allCircleFriends = allCircleFriends.filter(function (item) {
                return deleteIds.indexOf(item.id) < 0;
              });
              that.setData({
                NoSubscribed: allCircleFriends
              });
              if (allCircleFriends.length == 0) {
                //已全部订阅
                that.setData({
                  idx: 1
                });
              }
            }else{
              //赋值到data
              that.setData({
                NoSubscribed: allCircleFriends
              });
            }
 
          } else {
            wx.showToast({
              title: '获取失败',
              icon: 'none'
            })
          }
        });
      } else {
        //赋值到data
        that.setData({
          NoSubscribed: allCircleFriends
        });
      }
    });
    wx.hideLoading();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("load事件")
    var that = this
    // 获取系统信息
    wx.getSystemInfo({
      success: function(res) {
        // 计算主体部分高度,单位为 rpx
        that.setData({
          windowHeight: 750 / res.windowWidth * res.windowHeight
        })
      }
    })
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
    this.getcircleFriends();
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
    this.getcircleFriends();
    wx.stopPullDownRefresh();
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