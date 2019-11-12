// pages/screening/screening.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    provinces: [
      {label:'北京市',active:false},
      { label:'天津市',active:false}, 
      { label:'上海市',active:false}, 
      { label:'重庆市',active:false}, 
      { label:'河北省',active:false}, 
      { label:'山西省',active:false}, 
      { label:'辽宁省',active:false}, 
      { label:'吉林省',active:false}, 
      { label:'黑龙江省',active:false}, 
      { label:'江苏省',active:false}, 
      { label:'浙江省',active:false}, 
      { label:'安徽省',active:false}, 
      { label:'福建省',active:false}, 
      { label:'江西省',active:false}, 
      { label:'山东省',active:false}, 
      { label:'河南省',active:false}, 
      { label:'湖北省',active:false}, 
      { label:'湖南省',active:false}, 
      { label:'广东省',active:false}, 
      { label:'海南省',active:false}, 
      { label:'四川省',active:false}, 
      { label:'贵州省',active:false}, 
      { label:'云南省',active:false}, 
      { label:'陕西省',active:false}, 
      { label:'甘肃省',active:false}, 
      { label:'青海省',active:false}, 
      { label: '台湾省', active: false }
    ]
  },
  choose(e){
    let index = e.currentTarget.dataset.index;
    this.data.provinces[index].active = !this.data.provinces[index].active;
    this.setData({
      provinces: this.data.provinces
    })
  },
  clear(){
    this.data.provinces.forEach((item)=>{
      item.active = false
    });
    this.setData({
      provinces: this.data.provinces
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