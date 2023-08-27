// pages/history/index/index.js
const utils = require("../../../utils/util");
const app = getApp();

Page({
  data: {
    login: false,
  },
  onShow() {
    this.setData({
      login: app.globalData.userInfo != null && app.globalData.userInfo.login
    });
    // 设置高度区域
    utils.tabbarTop((top) =>{
      this.setData({"scrollHeight": `${top}px`});
    });
    // 创建订单
    this.setData({"orderList" : [{ "orderId" : "hcdsa7932hfas9",
      "price" : 13.44,
      "state" : "已完成",
      "start" : "上海市杨浦区同济大学",
      "end" : "上海市嘉定区黄渡理工",
      "time" : "2023-08-25",
      },{ "orderId" : "v32vfreg4ga",
      "price" : 16.78,
      "state" : "已完成",
      "start" : "上海市杨浦区同济大学",
      "end" : "上海市嘉定区黄渡理工",
      "time" : "2023-08-26",
      },{ "orderId" : "89v23vdshv0",
      "price" : 17.46,
      "state" : "已取消",
      "start" : "上海市杨浦区同济大学",
      "end" : "上海市嘉定区黄渡理工",
      "time" : "2023-08-27",
      }
    ]});
  },
})