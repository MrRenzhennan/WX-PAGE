var utils = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: "", //用户信息,
    useMoney: true, //使用金额
    confirm: true, //统一购买协议
    paymentMoney: 0, //支付金额
    disableUserMoney: false, //充值禁用
    disableCoupon: false, //优惠卷充值禁用
    CouponName: "优惠卷", //优惠卷显示名称
    Coupon: '' //优惠卷
  },
  //优惠卷
  model: function() {

    //获取用户优惠卷
    var that = this;
    if (that.data.disableCoupon) {
      wx.showModal({
        title: '提示',
        content: '充值订单不可用',
      })
    } else {
      var userInfo = utils.GetUserInfo();
      utils.GetWeData("/api/Qzm/coupons_users", "POST", {
        phone: userInfo.mobile,
        totalprice: that.data.price
      }, function(res) {
        res = JSON.parse(res.data);
        if (res.status == 1) {
          console.log("获取可使用的优惠卷成功！");
          console.log(res);
          that.setData({
            itemList: res.data
          });
          var items = [];
          res.data.forEach(d => {
            items.push(d.title);
          });
          wx.showActionSheet({
            itemList: items,
            success(res) {
              var item = that.data.itemList[res.tapIndex];
              that.setData({
                CouponName: "优惠卷：" + item.title + "/" + item.couponcode,
                Coupon: item
              });
              console.log("已选择优惠卷");
              console.log(item);
              that.CalculateLastPayMoney(that.data.price, item.price, that.data.useMoney ? that.data.userInfo.amount : 0);
            },
            fail(res) {
              console.log(res.errMsg)
            }
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '暂无可用优惠卷',
          })
        }
      })
    }

  },
  //是否只用金额
  UseMoneyChange: function(e) {
    var that = this;
    if (e.detail.value.length > 0) {
      if (that.data.Coupon != '') {
        that.setData({
          useMoney: true
        })
        console.log('勾选了使用金额');
        console.log("已选择优惠卷");
        that.CalculateLastPayMoney(that.data.price, that.data.Coupon.price, that.data.userInfo.amount)
      } else {
        that.setData({
          useMoney: true
        })
        console.log('勾选了使用金额');
        console.log("没有使用优惠卷");
        that.CalculateLastPayMoney(that.data.price, 0, that.data.userInfo.amount)
      }
    } else {
      if (that.data.Coupon != '') {
        that.setData({
          useMoney: false
        })
        console.log('没有勾选使用金额');
        console.log('使用了优惠卷');
        that.CalculateLastPayMoney(that.data.price, that.data.Coupon.price, 0)
      } else {
        that.setData({
          useMoney: false
        })
        console.log('没有勾选使用金额');
        console.log('没有使用优惠卷');
        that.CalculateLastPayMoney(that.data.price, 0, 0)
      }
    }
  },
  //计算最后支付的金额
  CalculateLastPayMoney(price, couponMoney, userMoney) {
    var productMoney = price - couponMoney;
    var payMoney = userMoney - productMoney > 0 ? 0 : Math.abs(userMoney - productMoney);
    this.setData({
      paymentMoney: payMoney
    });

  },
  //勾选购买协议
  ConfirmChange: function(e) {
    var that = this;
    if (e.detail.value.length > 0) {
      this.setData({
        confirm: true
      });
    } else {
      this.setData({
        confirm: false
      });
    }
  },
  //确认支付
  ConfirmPayment: function() {
    wx.showLoading({
      title: '确认中...',
      mask: true
    })
    var that = this;
    var userInfo = wx.getStorageSync("userInfo");
    var openid = wx.getStorageSync("openid");
    if (!this.data.confirm) {
      wx.showModal({
        title: '提示',
        content: '请确认购买协议',
        success: function(res) {},

      })
    } else {
      wx.showLoading({
        title: '确认订单...',
        mask: true
      })
      if (this.data.PaymentType == 1) {
        console.log("充值订单");
        wx.showLoading({
          title: '生成订单...',
          mask: true
        })
        utils.GetWeData("/api/Qzm/user_amount_recharge", "POST", {
          user_id: userInfo.id,
          amount: that.data.price
        }, function(res) {
          var orderResuslt = JSON.parse(res.data);
          if (orderResuslt.status == 1) {
            console.log("生成充值订单成功");
            wx.showLoading({
              title: '发起支付...',
              mask: true
            })
            //发起支付that.data.paymentMoney
            that.BuyProduct(openid, orderResuslt.order_no, that.data.paymentMoney,function(res){
              if (res) {
                //用户充值成功
                wx.showLoading({
                  title: '充值成功...',
                  mask: true
                })
                //更新用户缓存（金额变了)
                utils.RefreshUserInfo();
               wx.switchTab({
                 url: '/pages/main/main',
               })
              }
            });
  
          } else {
            console.log("生成购买订单失败");
            console.log(res);
          }
        });
      } else {
        wx.showLoading({
          title: '生成订单...',
          mask: true
        })
        console.log("购买订单");
        //根据projectId判断是购买朋友圈还是购买一元解票
        if (this.data.projectId == 0) {
          //一元解票
          console.log("购买的是一元解票");
          utils.GetWeData("/api/Qzm/user_order", "POST", {
            user_id: userInfo.id,
            orderid: that.data.projectName,
            title: '一元解票',
            remark: '一元解票',
            amount: that.data.price, //商品金额
            real_amount: that.data.paymentMoney,
            couponcode: that.data.Coupon == '' ? '' : that.data.Coupon.couponcode
          }, function(res) {
            var orderResuslt = JSON.parse(res.data);
            if (orderResuslt.status == 1) {
              console.log("生成购买订单成功");
              if (that.data.paymentMoney == 0) {
                wx.showLoading({
                  title: '正在购买...',
                  mask: true
                })
                console.log("支付金额为0-直接购买");
                utils.GetWeData("/api/Qzm/Judge", "POST", {
                  phone: userInfo.mobile,
                  keyword: that.data.projectName,
                  kind: "daily"
                }, function(res) {
                  if (res.data.state == 1) {
                    var buyResult = res;
                    wx.showLoading({
                      title: '购买成功...',
                      mask: true
                    })
                    //够买成功修改支付订单信息
                    utils.GetWeData("/api/Qzm/user_amount_order", "POST", {
                      order_no: orderResuslt.order_no,
                      couponcode: that.data.Coupon == '' ? '' : that.data.Coupon.couponcode
                    }, function(res) {
                      console.log(res);
                      var result = JSON.parse(res.data);
                      if (result.status == 1) {
                        wx.showLoading({
                          title: '跳转中...',
                          mask: true
                        })
                        console.log("直接购买-购买成功");
                        //更新用户缓存（金额变了)
                        utils.RefreshUserInfo();
                        //跳转一元解票页面
                        console.log("跳转一元解票页面");
                        console.log(buyResult);
                        wx.hideLoading();
                        wx.navigateTo({
                          url: '/pages/unaryTicketDetails/unaryTicketDetails?code=' + that.data.projectName
                        })
                      }
                    })
                  } else {
                    wx.showToast({
                      title: "没有对应股票",
                      icon: "none"
                    })
                    wx.hideLoading();
                  }
                });
              } else {
                wx.showLoading({
                  title: '正在购买...',
                  mask: true
                })
                utils.GetWeData("/api/Qzm/Judge", "POST", {
                  phone: userInfo.mobile,
                  keyword: that.data.projectName,
                  kind: "daily"
                }, function(res) {
                  var buyResult = res;
                  if (res.data.state == 1) {
                    wx.showLoading({
                      title: '发起支付...',
                      mask: true
                    })
                    //that.data.paymentMoney
                    that.BuyProduct(openid, orderResuslt.order_no, that.data.paymentMoney, function(res) {
                      if (res) {
                        console.log(res);
                        wx.showLoading({
                          title: '跳转中...',
                          mask: true
                        })
                        //支付成功 跳转一元解票页面
                        //跳转一元解票页面
                        console.log("跳转一元解票页面");
                        console.log(buyResult);
                        wx.navigateTo({
                          url: '/pages/unaryTicketDetails/unaryTicketDetails?code=' + that.data.projectName
                        })
                      }
                    });
                  } else {
                    wx.showToast({
                      title: "没有对应股票",
                      icon: "none"
                    })
                  }
                })
              }

            } else {
              console.log("生成购买订单失败");
              console.log(res);
            }
          });
        } else {
          wx.showLoading({
            title: '生成订单...',
            mask: true
          })
          //购买朋友圈
          console.log("购买的朋友圈");
          utils.GetWeData("/api/Qzm/user_order", "POST", {
            user_id: userInfo.id,
            orderid: that.data.projectId,
            title: '购买朋友圈',
            remark: '购买朋友圈',
            amount: that.data.price, //商品金额
            real_amount: that.data.paymentMoney,
            couponcode: that.data.Coupon == '' ? '' : that.data.Coupon.couponcode //优惠卷
          }, function(res) {
            var orderResuslt = JSON.parse(res.data);
            if (orderResuslt.status == 1) {
              console.log("生成购买订单成功");
              if (that.data.paymentMoney == 0) {
                //直接购买
                wx.showLoading({
                  title: '正在购买...',
                  mask: true
                })
                utils.GetWeData("/api/Qzm/Buy", "POST", {
                  phone: userInfo.mobile,
                  topic_Id: that.data.projectId,
                  price_Time: that.data.Time
                }, function(res) {
                  console.log(res.data);
                  if (res.data.msg == "购买成功") {
                    //够买成功修改支付订单信息
                    wx.showLoading({
                      title: '购买成功...',
                      mask: true
                    })
                    utils.GetWeData("/api/Qzm/user_amount_order", "POST", {
                      order_no: orderResuslt.order_no,
                      couponcode: that.data.Coupon == '' ? '' : that.data.Coupon.couponcode
                    }, function(res) {
                      console.log(res);
                      var result = JSON.parse(res.data);
                      if (result.status == 1) {
                        console.log("修改订单状态成功")
                        //更新用户缓存（金额变了)
                        utils.RefreshUserInfo();
                        //转到已订阅
                        wx.switchTab({
                          url: '/pages/subscription/subscription',
                        })
                      }
                    })
                  }
                })
              } else {
                wx.showLoading({
                  title: '发起支付...',
                  mask: true
                })
                //发起支付that.data.paymentMoney
                that.BuyProduct(openid, orderResuslt.order_no, that.data.paymentMoney, function(res) {
                  console.log("发起支付成功调用购买");
                  utils.GetWeData("/api/Qzm/Buy", "POST", {
                    phone: userInfo.mobile,
                    topic_Id: that.data.projectId,
                    price_Time: that.data.Time
                  }, function(res) {
                    console.log(res.data);
                    if (res.data.msg == "购买成功") {
                      wx.showLoading({
                        title: '购买成功...',
                        mask: true
                      })
                      //转到已订阅
                      wx.switchTab({
                        url: '/pages/subscription/subscription',
                      });
                    }
                  });
                });

              }

            } else {
              console.log("生成购买订单失败");
              console.log(res);
            }
          });
        }
      }
    }
  },
  //发起支付
  BuyProduct(openId, orderNo, money, callBack) {
    var that = this;
    utils.GetWeData("/api/Qzm/wxpay", "POST", {
      openid: openId,
      body: '钱掌门资讯',
      order_no: orderNo,
      totalfee: money
    }, function(res) {
      console.log(res);
      var result = JSON.parse(res.data);
      wx.requestPayment({
        timeStamp: result.timeStamp,
        nonceStr: result.nonceStr,
        package: result.package,
        signType: result.signType,
        paySign: result.paySign,
        success: function(res) {
          console.log('支付成功');
          //调用支付成功回调
          utils.GetWeData("/api/Qzm/user_amount_order", "POST", {
            order_no: orderNo,
            couponcode: that.data.Coupon == '' ? '' : that.data.Coupon.couponcode
          }, function(res) {
            console.log(res);
            var result = JSON.parse(res.data);
            if (result.status == 1) {
              console.log("购买成功")
              //更新用户缓存（金额变了)
              utils.RefreshUserInfo();
              typeof callBack == "function" && callBack(true)
            }
          })
        },
        fail: function(res) {
          console.log('支付失败');
          console.log(res);
          wx.showModal({
            title: '提示',
            content: '支付失败',
          })
          typeof callBack == "function" && callBack(false)
          wx.hideLoading();

        }
      })
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options.Time);
    var userInfo = wx.getStorageSync("userInfo");
    this.setData({
      projectId: options.projectId,
      projectName: options.projectName,
      price: options.price,
      circleFriendName: options.circleFriendName,
      userInfo: userInfo,
      PaymentType: options.PaymentType, //1充值，2购买
      Time: options.Time //购买朋友圈的时间
    });
    console.log(options.PaymentType);
    if (options.PaymentType == 2) {
      var price = Number(this.data.price);
      var amount = Number(this.data.userInfo.amount);
      var money = amount - price > 0 ? 0 : Math.abs(amount - price);
      this.setData({
        paymentMoney: money
      });
    } else {
      var price = this.data.price;
      this.setData({
        disableUserMoney: true,
        useMoney: false,
        disableCoupon: true,
        paymentMoney: price
      });
    }
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