// pages/cancle/cancle.js
let util = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    order_number:"",
    success:1
  },
   //与后端的交流函数
  /*注:调用函数结构为
    url:xx，
        说明:具体连接的url为:http://localhost:8080/passenger/xx,如果要修改前半部分，到utils/util.js中进行修改
    {发送数据
        说明:其结构为  发给后端变量名(应该改的部分):发给后端的内容},
    function(data)
    {
      成功后的处理函数，data.xx为从后端接收到的数据xx为应该改的部分
    }*/ 
    communication(give){
      /*
      发送://以下标注为后端名称，前端名称不用改
        order_number
      接收://注意看console.log信息，将data中的订单号名匹配上data.xx中的内容
        成功信息:data.success
      */ 
      let that=this;//屏蔽函数对this.data的干扰
        util.req//post请求
        (
          'cancel',//请求的url，为util文件中基本url+该部分url组成
          {
            order_number:give.order_number
          },//传递的数据
          function (data) //data为获得数据
          { //请求成功后处理
            console.log(data);
            var success=data.success;
            that.setData({success});
          }
        )
    },
  toOrder(){
    let that=this;//屏蔽函数对this.data的干扰
    wx.showModal({
      content: '确定要取消行程吗',
      cancelColor: '#cccccc',
      confirmColor: '#fc9c56',
      success: function(res) {
        if (res.confirm) {
          let{order_number}=that.data;
          var give=order_number;
          //that.communication(give);//与后端连接时打开此注释即可
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
    var cancle=0;
    wx.navigateBack({
      url:  "/pages/wait/wait",
      
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(e) {
    let{order_number}=e;
    this.setData({order_number});
    console.log(order_number);
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