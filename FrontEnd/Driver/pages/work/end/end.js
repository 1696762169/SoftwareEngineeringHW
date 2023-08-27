// pages/work/end/end.js
const app = getApp();
const urlConst = require("../../../utils/url");

Page({
  data: {
    order: null,
    timeHour: 0,
    timeMin: 0,
  },

  onLoad(options) {
    // 生成行程时间
    app.globalData.order.time = Math.ceil(Math.random() * 10 - 5 + app.globalData.order.period);
    let order = app.globalData.order;

    // 设置页面信息
    this.setData({
      order: order,
      timeHour: Math.ceil(order.time / 60),
      timeMin: order.time % 60,
    });
  },

  // 返回接单首页
  goHome() {
    wx.reLaunch({
      url: urlConst.workIndex,
    })
  },

  onUnload() {
    // 清除订单缓存
    app.globalData.order = null;
  }
})