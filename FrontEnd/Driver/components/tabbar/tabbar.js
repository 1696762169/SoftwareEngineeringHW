// components/tabbar/tabbar.js
const urlConst = require("../../utils/url");

Component({
  properties: {
    activeTab: Number,
  },
  methods: {
    onChange(event) {
      // event.detail 的值为当前选中项的索引
      if (`${event.detail}` == this.properties.activeTab)
        return;
  
      var url = urlConst.workIndex;
      switch (event.detail) {
        case 0:
          url = urlConst.workIndex;
          break;
        case 1:
          url = urlConst.historyIndex;
          break;
        case 2:
          url = urlConst.userIndex;
          break;
      }
      
      wx.switchTab({
        url: url,
        // success: function() {
        //   getApp().globalData.avtiveTab = event.detail;
        //   console.log(getApp().globalData.avtiveTab);
        // }
      });
    },
  }
});