// pages/user/index/index.js
const app = getApp();

Page({
  data: {
  },
  onLoad(options) {
    // wx.hideTabBar();
    this.selectComponent("#tabbar").setData({active: 2});
  },
})