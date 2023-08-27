// pages/cancle/cancle.js
Page({


  /**
   * 页面的初始数据
   */
  data: {
  
  },
  toOrder(){
    wx.showModal({
      content: '确定要取消行程吗',
      cancelColor: '#cccccc',
      confirmColor: '#fc9c56',
      success: function(res) {
        if (res.confirm) {
          //将取消数据传送给后端
          //发
          //订单号order_name
          //收
          //确认信息
          wx.switchTab({
            url:  "/pages/index/index",
          })
        } else if (res.cancel) {
          wx.redirectTo({
            url:  "/pages/cancel/cancel"
          })
        }
      }
    })
  },
  BackWait(){
    // console.log("a")
    wx.navigateBack({
      url:  "/pages/wait/wait",
      
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(e) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})