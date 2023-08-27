// pages/signup/signup.js
const urlConst = require("../../../utils/url");
Page({
  data: {
    userInfo: {}, // 你获取的用户信息将会放在这里
    name: '',
    idNumber: '',
    plateNumber: '',
    modelDescription: ''
  },

  // 实名认证输入事件
  handleNameInput(event) {
    this.setData({ name: event.detail });
  },
  handleIdInput(event) {
    this.setData({ idNumber: event.detail });
  },

  // 车辆信息输入事件
  handlePlateInput(event) {
    this.setData({ plateNumber: event.detail });
  },
  handleModelInput(event) {
    this.setData({ modelDescription: event.detail });
  },

  // 提交按钮点击事件
  handleSubmit() {
    // 在这里可以进行表单验证等操作
    if (
      !this.data.name ||
      !this.data.idNumber ||
      !this.data.plateNumber ||
      !this.data.modelDescription
    ) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      });
      return;
    }

    // 在这里进行提交操作
    // ...

    // 返回接单首页
    wx.navigateBack({
      delta: 1
    });
  }
});
