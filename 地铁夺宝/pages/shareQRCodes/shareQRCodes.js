// pages/shareQRCodes/shareQRCodes.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var query = wx.createSelectorQuery();
    query.select('.firstCanvas').boundingClientRect((rect) => {
      this.drawImageCanvas(rect)
    }).exec();
  },
  //绘制图片
  drawImageCanvas(rect) {
    const ctx = wx.createCanvasContext('firstCanvas');
    //绘制背景
    ctx.setFillStyle('white');
    ctx.fillRect(0, 0, rect.width, rect.height);
    //绘制标题
    ctx.setFontSize(20);
    ctx.setFillStyle('#333333');
    ctx.setTextAlign('center');
    ctx.fillText('您离巅峰仅差一步', rect.width / 2, 40);
    ctx.setFontSize(14);
    ctx.fillText('分享晒荣誉,更有机会', rect.width / 2, 70);
    ctx.fillText('赚取双倍金币', rect.width / 2, 90);

    //绘制二维码
    ctx.drawImage('/static/imgs/QR-code-canvas.jpg', (rect.width / 2 - 258 / 2 / 2), (rect.height - 258 / 2 - 10), 258 / 2, 258 / 2)
    ctx.draw()
  },
  //生成图片
  createImg() {
    wx.showLoading({
      title: '正在生成图片...',
      mask: true,
    });

    setTimeout(() => {
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: 288,
        height: 272,
        destWidth: 288,
        destHeight: 272,
        canvasId: 'firstCanvas',
        success: (res) => {
          console.log('success', res)
          this.saveImageToPhotosAlbum(res.tempFilePath)
          wx.hideLoading();
        },
        fail: (res) => {
          console.log('error', res)
          wx.hideLoading();
        }
      })
    }, 2000);
  },
  //生成图片保存相册
  saveImageToPhotosAlbum(tempFilePath) {
    wx.saveImageToPhotosAlbum({
      filePath: tempFilePath,
      success: function() {
        wx.showModal({
          title: '保存图片成功',
          content: '图片已经保存到相册，快去炫耀吧！',
          showCancel: false,
          success: function(res) {
            console.log(res)
          },
          fail: function(res) {},
          complete: function(res) {},
        });
      },
      fail: function(res) {
        console.log(res);
        if (res.errMsg == "saveImageToPhotosAlbum:fail cancel") {
          wx.showModal({
            title: '保存图片失败',
            content: '您已取消保存图片到相册！',
            showCancel: false
          });
        } else {
          wx.showModal({
            title: '提示',
            content: '保存图片失败，您可以点击确定设置获取相册权限后再尝试保存！',
            complete: function(res) {
              console.log(res);
              if (res.confirm) {
                wx.openSetting({}) //打开小程序设置页面，可以设置权限
              } else {
                wx.showModal({
                  title: '保存图片失败',
                  content: '您已取消保存图片到相册！',
                  showCancel: false
                });
              }
            }
          });
        }
      }
    })
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