// pages/work/index/index.js
const app = getApp();
const urlConst = require("../../../utils/url");

Page({
  data: {
    latitude: "31.285568",
    longitude: "121.214785",
    working: true,
    login: false,
  },

  onShow(options) {
    // wx.hideTabBar();
    // 获取工作状态
    this.setData({
      working: app.globalData.working,
      login: app.globalData.userInfo != null && app.globalData.userInfo.login
    });
    
    // 设置页面显示范围高度
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          windowHeight: res.windowHeight - getApp().globalData.tabbarHeight
        });
      }
    });

    // 获取位置并设置至地图中央

    // 创建订单
    this.setData({"orderList" : [{ "orderId" : "hcdsa7932hfas9",
      "price" : 13.44,
      "start" : "上海市杨浦区同济大学",
      "end" : "上海市嘉定区黄渡理工",
      "period" : 35,
      },{ "orderId" : "v32vfreg4ga",
      "price" : 16.78,
      "start" : "上海市杨浦区同济大学",
      "end" : "上海市嘉定区黄渡理工",
      "period" : 65,
      },{ "orderId" : "89v23vdshv0",
      "price" : 17.46,
      "start" : "上海市杨浦区同济大学",
      "end" : "上海市嘉定区黄渡理工",
      "period" : 37,
      }
    ]});
  },

  // 切换工作状态
  switchState() {
    if (!this.data.working){
      this.setData({working: true});
      app.globalData.working = this.data.working;
    } else {
      wx.navigateTo({
        url: urlConst.workResult,
        success: page => {
          page.eventChannel.once("confirm", confirm => {
            this.setData({working: !confirm});
            app.globalData.working = this.data.working;
          });
        }
      })
    }
  }
})