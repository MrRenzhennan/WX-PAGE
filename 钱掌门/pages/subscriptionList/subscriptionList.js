// pages/subscriptionList/subscriptionList.js
var utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    question_state: false,
    topic: "", //朋友圈
    posts: "", //文章
    pages: 0, //共多少页
    page: 1, //当前页数
    id: "", //朋友圈id
    postId: "", //帖子id
    ReplyContent: '' //回复内容
  },
  //点赞
  OnLike(e){
    var that=this;
    console.log(e.target.dataset.postid);
    var userInfo = wx.getStorageSync("userInfo");
    utils.GetWeData("/api/Qzm/Agree", "POST", {
      phone: userInfo.mobile, //测试
      topic_id: that.data.id,
      post_id: e.target.dataset.postid
    }, function (res) {
      if(res.data.state==1){
        console.log("点赞成功");
        console.log(res);
        wx.showToast({
          title: '已点赞',
        })
      }
    })
  },
  //赋值回复内容
  InputReply(e) {
    var replyContent = e.detail.value;
    this.setData({
      ReplyContent: replyContent
    });
  },
  //回复帖子
  OnReply() {
    var that = this;
    wx.showLoading({
      title: '发布中...',
    })
    //从缓存中获取用用户信息 如果没有则没有过授权
    var userInfo = wx.getStorageSync("userInfo");
    utils.GetWeData("/api/Qzm/Comment", "POST", {
      phone: userInfo.mobile, //测试
      topic_id: that.data.id,
      post_id: that.data.postId,
      content: that.data.ReplyContent
    }, function(res) {
      console.log("发布评论中");
      console.log(res);
      wx.showModal({
        title: '提示',
        content: "发布成功，待审核。",
        showCancel: false,
        success: function(res) {
          that.questionClose();
        }
      })
    })

    wx.hideLoading();
  },
  questionShow: function(e) {
    console.log(e.target.dataset.postid);
    this.setData({
      question_state: true,
      postId: e.target.dataset.postid
    })
  },
  questionClose: function() {
    this.setData({
      question_state: false,
      ReplyContent: ''
    })
  },
  //获取朋友圈列表
  GetSubScription(id, pageNo, override) {
    var that = this;
    that.setData({
      page: pageNo
    })
    var userInfo = wx.getStorageSync('userInfo');
    utils.GetWeData("/api/Qzm/Posts", "POST", {
      phone: userInfo.mobile,
      topic_id: id,
      page: pageNo,
      per_page: 6
    }, function(res) {
      if (res.statusCode == 200) {
        if (res.data.state == 1) {
          console.log("获取已购买朋友圈列表");
          console.log(res);
          // Articles: override ? res.data.data : that.data.Articles.concat(res.data.data), //文章数据
          //   pages: res.data.last_page //共几页
          if (res.data.data.posts.total == 0) {
            wx.showModal({
              title: '提示',
              content: '专家没有发布任何帖子',
              showCancel: false,
              success: function() {
                wx.navigateBack({})
              }
            })
          } else {
            that.setData({
              topic: res.data.data.topic,
              posts: override ? res.data.data.posts.data : that.data.posts.concat(res.data.data.posts.data),
              pages: res.data.data.posts.last_page //共几页
            });
          }
        } else {
          wx.showToast({
            title: '获取失败',
            icon: 'none'
          })
        }
      } else {
        wx.showToast({
          title: '请求失败',
          icon: 'none'
        })
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      id: options.id
    })
    this.GetSubScription(this.data.id, 1, true);
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
    this.GetSubScription(this.data.id, 1, true);
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    // 下拉触底，先判断是否有请求正在进行中
    // 以及检查当前请求页数是不是小于数据总页数，如符合条件，则发送请求
    if (this.data.page < this.data.pages) {
      this.GetSubScription(this.data.id, this.data.page + 1)
    } else {
      wx.showModal({
        title: '提示',
        content: '已经没有数据了！',
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})