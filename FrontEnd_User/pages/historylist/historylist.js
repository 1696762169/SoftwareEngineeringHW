// pages/historylist/historylist.js
const utils = require("../../utils/util");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList:[],
    user_id:"",
    success:1,
    message:"",
  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad(options) {
    // 设置高度区域
    utils.tabbarTop((top) =>{
      this.setData({"scrollHeight": `${top}px`});
    });
        // 创建订单
        this.setData({orderList : [{ "orderId" : "hcdsa7932hfas9",
        "price" : 13.44,
        "state" : "已完成",
        "start" : "上海市杨浦区同济大学",
        "end" : "上海市嘉定区黄渡理工",
        "time" : "2023-08-25",
        },{ "orderId" : "v32vfreg4ga",
        "price" : 16.78,
        "state" : "已完成",
        "start" : "上海市杨浦区同济大学",
        "end" : "上海市嘉定区黄渡理工",
        "time" : "2023-08-26",
        },{ "orderId" : "89v23vdshv0",
        "price" : 17.46,
        "state" : "已取消",
        "start" : "上海市杨浦区同济大学",
        "end" : "上海市嘉定区黄渡理工",
        "time" : "2023-08-27",
        }
      ]});
    var that = this
      //获取用户id
    getApp().getUseropenid(function (openid) {
        that.setData({
            user_id: openid
        })
        //console.log('用户openid', that.data.user_id)
      let{user_id}=that.data;
      //console.log(user_id);
      var give={
        user_id:user_id,
      }
      //console.log(give);
      //this.communication(give);//与后端连接时打开此注释即可
      let{success,message}=that.data;
      if(success)
      {
        console.log("连接成功");
      }
      else
      {
        console.log(message);
      }
    })
  },
   //与后端的交流函数
    /*注:调用函数结构为
    url:xx，
        说明:具体连接的url为:http://localhost:8080/passenger/xx,如果要修改前半部分，到utils/util.js中进行修改
    {发送数据
        说明:其结构为  发给后端变量名:发给后端的内容},
    function(data)
    {
      成功后的处理函数，data.xx为从后端接收到的数据
    }*/ 
    communication(give){
      /* 
      发送://以下标注为后端名称，前端名称不用改
        order_name
      接收:
      data.success:判断连接的标志（值为1即可)
      data.data:接收历史订单数据
   */
      let that=this;//屏蔽函数对this.data的干扰
        util.req//post请求
        (
          'history_list',//请求的url，为util文件中基本url+该部分url组成
          {
            user_id:give.user_id
          },//传递的数据
          function (data) //data为获得数据
          { //请求成功后处理
            console.log(data);
            var orderList=data.data;
            var success=success;
            that.setData({orderList,success});
          }
        )
    },
  enterOrder() {
    const orderId = this.properties.orderId;
    wx.navigateTo({
      url: "/pages/history/order/order",
      success: page => {
        // 通过eventChannel向被打开页面传送数据
        page.eventChannel.emit("orderId", orderId);
      }
    })
  },

  // 删除订单方法
  deleteOrder() {
    console.log(`删除了订单：${this.properties.orderId}`);
  }
})