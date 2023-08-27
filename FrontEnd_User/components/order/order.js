// components/order/order.js
Component({
  // 定义属性
  properties: {
    orderId: String,
    price: String,
    state: String,
    start: String,
    end: String,
    time: String,
  },
  methods: {
    // 进入订单详细界面方法
    enterOrder() {
      const orderId = this.properties.orderId;
      wx.navigateTo({
        url: "/pages/history/history",
        success: page => {
          // 通过eventChannel向被打开页面传送数据
          page.eventChannel.emit("orderId", orderId);
        }
      })
    },

    // 删除订单方法
    deleteOrder() {
      let url = `/pages/response/response`;
      wx.navigateTo({ url });
    }
  }
})