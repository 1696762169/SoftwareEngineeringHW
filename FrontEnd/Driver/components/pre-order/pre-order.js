// components/pre-order/pre-order.js
Component({
  // 定义属性
  properties: {
    orderId: String,
    price: String,
    start: String,
    end: String,
    period: String,
  },
  methods: {
    // 进入确认接单界面方法
    enterOrder() {
      const orderId = this.properties.orderId;
      wx.navigateTo({
        url: "/pages/work/confirm/confirm",
        success: page => {
          // 通过eventChannel向被打开页面传送数据
          page.eventChannel.emit("orderId", orderId);
        }
      })
    },
  }
})