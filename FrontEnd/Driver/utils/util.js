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
        callback(screenHeight - 84);
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

module.exports = {
  formatTime,
  formatNumber,
  tabbarTop
}
