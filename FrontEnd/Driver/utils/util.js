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

const getPhoneNumber = callback => {
  if (getApp().globalData.userInfo == null){
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

module.exports = {
  formatTime,
  formatNumber,
  tabbarTop,
  getBackData,
  getPhoneNumber,
  getUserInfoFromStorage,
  setUserInfo,
}
