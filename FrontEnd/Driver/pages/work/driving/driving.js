// pages/work/driving/driving.js
const mapUtil = require("../../../utils/map");

Page({
  data: {
    order: null,
    passenger: null,
    passengerOn: false,
  },
  onLoad(options) {
    wx.hideHomeButton();
    // 设置订单信息
    this.setData({order: getApp().globalData.order});
    let that = this;
    let order = this.data.order;
    // 设置乘客信息
    this.getPassenger(order.passengerId, passenger => {this.setData({passenger: passenger})});

    // 设置前往出发点路线
    mapUtil.getCurPosition(curPosition => {
      mapUtil.setMapRoute(curPosition, order.start, that);
    }, order.start);
  },

  // 获取乘客信息
  getPassenger(passengerId, callback) {
    const passenger = { "passengerId" : passengerId,
    "name" : "滴滴乘客",
    "phone" : "5356573273756",
    "phoneEnd" : "3332",
    };
    callback(passenger);
  },

  // 乘客上车
  orderStart() {
    this.setData({passengerOn: true});
    // 改为显示全程路线
    mapUtil.setMapRoute(this.data.order.start, this.data.order.end, this);
  },

  // 订单完成
  orderEnd() {
    wx.reLaunch({
      url: "/pages/work/end/end",
    })
  },
  
  // 取消订单
  cancelOrder() {
    wx.showModal({
      title: "确认取消订单",
      content: `您将损失 ${this.data.order.price} 元收入！\n确定要取消当前订单吗？`,
      showCancel: true, // 是否显示取消按钮
      confirmText: "确认",
      cancelText: "返回",
      success: res => {
        if (res.confirm) {
          // 用户点击了确定按钮
          wx.reLaunch({ url: "/pages/work/index/index" });
        } else if (res.cancel) {
          // 用户点击了取消按钮
        }
      }
    });
  },
})