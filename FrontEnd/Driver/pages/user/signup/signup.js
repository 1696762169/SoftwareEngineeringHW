// pages/signup/signup.js
const urlConst = require("../../../utils/url");
const util = require("../../../utils/util");
const app = getApp();

Page({
  data: {
    openId: null,
    userInfo: null,
    name: '',
    idNumber: '',
    plateNumber: '',
    modelDescription: ''
  },
  onLoad() {
    // 获取openId
    this.setData({openId: app.globalData.openId});
    // 获取用户信息
    util.getUserProfile(userInfo => {
      this.setData({userInfo: userInfo});
    });
  },

  // 实名认证输入事件
  handleNameInput(event) {
    this.setData({ name: event.detail });
  },
  handleIdInput(event) {
    this.setData({ 
      idNumber: event.detail,
      errmsg: {
        id: (util.isValidIdNumber(event.detail) || event.detail === "" ? "" : "身份证号码格式不正确")
      }
     });
  },

  // 车辆信息输入事件
  handlePlateInput(event) {
    this.setData({ 
      plateNumber: event.detail,
      errmsg: {
        plate: (util.isValidPlateNumber(event.detail) || event.detail === "" ? "" : "车牌号码格式不正确")
      }
    });
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
        title: "请填写完整信息",
        icon: "error"
      });
    } else if (!util.isValidIdNumber(this.data.idNumber) || !util.isValidPlateNumber(this.data.plateNumber)) {
      wx.showToast({
        title: "请填写完整信息",
        icon: "error"
      });
    } else {
      // 在这里进行提交操作
      this.data.userInfo.carInfo = {
        carNumber: this.data.plateNumber,
        carDesc: this.data.modelDescription
      };
      util.setUserInfo(this.data.userInfo);

      // 返回我的首页
      let that = this;
      wx.navigateBack({
        delta: 1,
        success: page => {
          that.getOpenerEventChannel().emit("login");
        }
      });
    }
  }
});
