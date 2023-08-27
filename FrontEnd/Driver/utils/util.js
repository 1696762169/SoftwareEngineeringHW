const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

// 获取底部导航栏最上方的位置
const tabbarTop = (callback) => {
  wx.getSystemInfo({
    success: (res) => {
      const screenHeight = res.windowHeight;
      if (typeof callback === 'function') {
        // 我tm就是没法获取这个底部导航栏的高度 84是源码里在iPhoneX里的高度
        callback(screenHeight - getApp().globalData.tabbarHeight);
      }
    }
  });
  // const query = wx.createSelectorQuery();
  // query.select("#tabbar").boundingClientRect((res) => {
  //   if (typeof callback === 'function') {
  //     callback(res.top);
  //   }
  // }).exec();
}

const getBackData = callback => {
  wx.login({
    success: loginRes => {
      // 发送 res.code 到后台换取 openId
      const globalData = getApp().globalData;
      wx.request({
        url: `https://api.weixin.qq.com/sns/jscode2session?appid=${globalData.appId}&secret=${globalData.appSecret}&js_code=${loginRes.code}&grant_type=authorization_code`,
        success: apiRes => {
          callback(apiRes);
        }
      });
    }
  });
}

// 获取用户基本信息
const getUserProfile = callback => {
  const app = getApp();
  if (app.globalData.userInfo == null) {
    wx.getUserProfile({
      desc: "小程序请求获取您的账号信息",
      success: res => {
        // 获取手机号
        getPhoneNumber(number => {
          res.userInfo.phoneNumber = number;
          callback(res.userInfo);
        })
      },
      fail: function (res) {
        console.log('用户拒绝授权或其他错误：', res);
      }
    });
  } else {
    callback(app.globalData.userInfo);
  }
}

// 获取手机号
const getPhoneNumber = callback => {
  if (getApp().globalData.userInfo == null) {
    callback("13466576857");
  } else {
    callback(getApp().globalData.userInfo.phoneNumber);
  }
}

// 从本地存储获取用户信息
const getUserInfoFromStorage = () => {
  return wx.getStorageSync("userInfo");
}

// 设置用户信息
const setUserInfo = userInfo => {
  try {
    wx.setStorageSync("userInfo", userInfo);
    getApp().globalData.userInfo = userInfo;
  } catch (e) {
    console.error("保存用户信息失败：", e);
  }
}
// 验证身份证
const isValidIdNumber = (idNumber) => {
  const idNumberPattern = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
  return idNumberPattern.test(idNumber);
}
// 验证车牌号码
const isValidPlateNumber = (plateNumber) => {
  const plateNumberPattern = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z][A-HJ-NP-Z0-9]{4,5}[A-HJ-NP-Z0-9挂学警港澳]$/;
  return plateNumberPattern.test(plateNumber);
}
// 验证手机号
const isValidPhoneNumber = (phoneNumber) => {
  const phoneNumberPattern = /^(?:(?:\\+|00)86)?1(?:(?:3\[\\d\])|(?:4\[5-79\])|(?:5\[0-35-9\])|(?:6\[5-7\])|(?:7\[0-8\])|(?:8\[\\d\])|(?:9\[189\]))\\d{8}$/;
  return phoneNumberPattern.test(phoneNumber);
}

module.exports = {
  formatTime,
  formatNumber,
  tabbarTop,
  getBackData,
  getPhoneNumber,
  getUserProfile,
  getUserInfoFromStorage,
  setUserInfo,
  isValidIdNumber,
  isValidPlateNumber,
  isValidPhoneNumber,
}
