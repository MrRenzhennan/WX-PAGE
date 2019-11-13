//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    swiperList: ["/static/imgs/swiper-01.png", "/static/imgs/swiper-01.png"],
    tabArray: ['综合推荐', '官方公告', '消息公告', '精品资源'],
    activeIdx: 0,
    titleHeight: 0,
  },
  //tab切换
  currentTab: function(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      activeIdx: index
    })
  },
  //swiper切换
  currentChange: function(e) {
    let index = e.detail.current
    this.setData({
      activeIdx: index
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var query = wx.createSelectorQuery();
    query.select('.top').boundingClientRect((rect) => {
      this.setData({
        titleHeight: rect.height
      })
    }).exec();
  },

})