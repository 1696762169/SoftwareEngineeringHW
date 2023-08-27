// pages/work/confirm/confirm.js
const mapUtil = require("../../../utils/map");
const urlConst = require("../../../utils/url");

Page({
  data: {
    latitude: "31.285568",
    longitude: "121.214785",
  },

  onLoad(options) {
    // 设置地图高度
    wx.createSelectorQuery().select("#info-area").boundingClientRect(area =>{
      wx.getSystemInfo({
        success: system => {
          this.setData({
            mapHeight: system.windowHeight - area.height - 34
          });
        }
      });
    }).exec();

    // 获取订单ID
    this.getOpenerEventChannel().once("orderId", id => {
      // 获取订单
      this.getOrder(id, order => {
        // 设置订单信息
        this.setData({order: order});
        // 设置路线
        mapUtil.setMapRoute(order.start, order.end, this);
      });
    });
  },

  // 获取订单信息
  getOrder(orderId, callback) {
    const order = { orderId : orderId,
      price : 13.44,
      distance : 53.56,
      period : 125,
      startPeriod : 5,
      start : {latitude: 40.034513, longitude: 114.432451},
      end : {latitude: 39.824366, longitude: 115.721614},
      startAddress : "上海市杨浦区同济大学",
      endAddress : "上海市嘉定区黄渡理工",
      distance : 53.56,
      time : 134,
      rank : 5, 
      passengerId : 54321,
      driverId : 12345
    };
    callback(order);
  },

  // 确认接单
  confirm() {
      wx.reLaunch({
      url: urlConst.workDriving,
      success: res => {
        // 通过globalData向被打开页面传送数据
        getApp().globalData.order = this.data.order;
      }
    })
    // 通知后端已接单
  }
})