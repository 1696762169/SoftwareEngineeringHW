// components/tabbar/tabbar.js
Page({
  data: {
    active: 0,
  },
  onChange(event) {
    // event.detail 的值为当前选中项的索引
    if (event.detail == this.data.active)
      return;
    this.setData({ active: event.detail });

    var url = "/pages/work/index/index";
    switch (event.detail) {
      case 0:
        url = "/pages/work/index/index";
        break;
      case 1:
        url = "/pages/history/index/index";
        break;
      case 2:
        url = "/pages/user/index/index";
        break;
    }
    wx.redirectTo({
      url: url,
    });
    console.info(url);
  },
});