const util = require("./utils/util")

// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录并获取OpenId
    util.getBackData(res => {
      this.globalData.openId = res.data.openid;
    });
    // 尝试获取本地存储的用户信息
    const userInfo = util.getUserInfoFromStorage();
    if (userInfo)
      this.globalData.userInfo = userInfo;
  },
  globalData: {
    appId: "wxb9825b86928a3992",
    appSecret: "219c22e1eeb30eab583525b878717399",
    openId: "",

    userInfo: null, // 当前用户信息缓存
    working: true,  // 当前是否在工作
    order: null,  // 当前订单缓存
    // activeTab: "0", // 当前tab页面
    mapKey: "1bab7ff9f3848982e9583480a426c038",   // 高德地图API
    tabbarHeight: 84, // 底部导航栏高度
  }
})
