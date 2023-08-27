// pages/work/result/result.js
Page({
  data: {
  },
  onLoad(options) {
    this.setData({
      income: 43.6,
      timeHour: 5,
      timeMin: 47
    })
  },

  // 确认结束工作
  confirm() {
    this.getOpenerEventChannel().emit("confirm", true);
    wx.navigateBack({delta: 1});
  },

  onUnload() {
    this.getOpenerEventChannel().emit("confirm", false);
  },
})