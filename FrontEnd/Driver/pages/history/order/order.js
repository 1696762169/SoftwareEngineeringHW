// pages/history/order/order.js
const mapUtil = require("../../../utils/map");

Page({
  data: {
    // 设置是否显示司机信息
    showDriver: true
  },

  onLoad(options) {
    // 设置地图高度
    wx.createSelectorQuery().select("#info-area").boundingClientRect(area =>{
      wx.getSystemInfo({
        success: system => {
          this.setData({
            mapHeight: system.windowHeight - area.height
          });
        }
      });
    }).exec();

    // 获取订单ID
    this.getOpenerEventChannel().once("orderId", id => {
      // 获取订单
      this.getOrder(id, order => {
        // 设置订单与司机信息
        this.setData({order: order});
        this.getDriver(order.driverId, driver => {this.setData({driver: driver});})
        // 设置路线
        mapUtil.setMapRoute(order.start, order.end, this);
      });
    });
  },
  // 获取订单信息
  getOrder(orderId, callback) {
    const order = { "orderId" : orderId,
    "price" : 13.44,
    "distance" : 53.56,
    "time" : 134,
    "rank" : 5,
    "start" : {latitude: 40.034513, longitude: 114.432451},
    "end" : {latitude: 39.824366, longitude: 115.721614},
    "driverId" : 12345
    };
    callback(order);
  },

  // 获取司机信息
  getDriver(driverId, callback) {
    const driver = { "orderId" : driverId,
    "name" : "滴滴司机",
    "phone" : "13673957593",
    "car" : "沪A7F8H2",
    "rank" : 4.7,
    };
    callback(driver);
  },

  // 投诉订单
  complain(event) {

  },
})