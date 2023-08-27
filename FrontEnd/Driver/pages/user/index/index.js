// pages/user/index/index.js
const util = require("../../../utils/util");
const urlConst = require("../../../utils/url");
const app = getApp();

Page({
  data: {
    userInfo: null, // 获取的用户信息将会放在这里
    loadingLogin: false,  // 是否正在登录中
    editingCarNumber: false,    // 是否正在编辑车辆信息
    editingCarDesc: false,    // 是否正在编辑车辆信息
  },
  onShow(options) {
    // 获取用户信息
    if (app.globalData.userInfo.login){
      this.setData({ userInfo: app.globalData.userInfo });
    }

    // 设置页面显示范围高度
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          windowHeight: res.windowHeight - getApp().globalData.tabbarHeight
        });
      }
    });
  },

  // 登录按钮点击事件
  handleLogin() {
    // if (app.globalData.userInfo == null || !app.globalData.userInfo.login) {
      this.setData({ loadingLogin: true });
      util.getUserProfile(userInfo => {
        // 获取车辆信息
        this.getCarInfo(carInfo => {
          userInfo.carInfo = carInfo;
          userInfo.login = true;
          // 记录用户信息
          util.setUserInfo(userInfo);
          this.setData({
            userInfo: userInfo,
            loadingLogin: false,
          });
        });
      });
    // } else {
    //   app.globalData.userInfo.login = true;
    //   util.setUserInfo(app.globalData.userInfo);
    //   this.setData({ userInfo: app.globalData.userInfo });
    // }
  },

  // 注册按钮点击事件
  handleSignup() {
    wx.navigateTo({
      url: urlConst.signup,
      success: page => {
        page.eventChannel.once("login", () => {this.handleLogin();});
      }
    })
  },

  // 反馈投诉按钮点击事件
  handleFeedback() {
    // 打开反馈投诉界面
    // ...
  },

  // 切换账号按钮点击事件
  handleLogout() {
    // 清除用户信息，返回未登录状态
    app.globalData.userInfo.login = false;
    util.setUserInfo(app.globalData.userInfo);
    this.setData({ userInfo: null });
  },

  // 注销账号按钮点击事件
  handleDeleteAccount() {
    wx.showModal({
      title: "注销账号",
      content: "确定要注销账号吗？",
      showCancel: true, // 是否显示取消按钮
      confirmText: "注销",
      cancelText: "返回",
      success: (res) => {
        if (res.confirm) {
          // 清除用户信息，返回未登录状态
          this.handleLogout();
        }
      }
    });
  },

  // 编辑车牌号码
  editCarNumber(event) {
    if (!this.data.editingCarNumber) {
      this.setData({ editingCarNumber: true });
    } else {
      let userInfo = this.data.userInfo;
      if (util.isValidPlateNumber(event.detail.value)) {
        userInfo.carInfo.carNumber = event.detail.value;
      }
      util.setUserInfo(userInfo);
      this.setData({
        userInfo: userInfo,
        editingCarNumber: false,
      });
    }
  },
  // 编辑车辆描述
  editCarDesc(event) {
    if (!this.data.editingCarDesc) {
      this.setData({ editingCarDesc: true });
    } else {
      let userInfo = this.data.userInfo;
      if (event.detail.value != "") {
        userInfo.carInfo.carDesc = event.detail.value;
      }
      util.setUserInfo(userInfo);
      this.setData({
        userInfo: userInfo,
        editingCarDesc: false,
      });
    }
  },

  getCarInfo(callback) {
    if (app.globalData.userInfo == null) {
      callback({
        carNumber: "沪A7F8H2",
        carDesc: "普通轿车"
      });
    } else {
      callback(app.globalData.userInfo.carInfo);
    }
  }
});
