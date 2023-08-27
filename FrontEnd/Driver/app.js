// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null, // 当前用户信息缓存
    working: true,  // 当前是否在工作
    order: null,  // 当前订单缓存
    // activeTab: "0", // 当前tab页面
    mapKey: "1bab7ff9f3848982e9583480a426c038",   // 高德地图API
    tabbarHeight: 84, // 底部导航栏高度
  }
})
