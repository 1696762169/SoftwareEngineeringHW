// pages/history/history.js
const mapUtil = require("../../utils/map");

Page({
  data: {
    showDriver: true,
    markers:[],
    order:{},
    driver:{}
  },

  onLoad(options) {
    // 设置地图高度
    wx.createSelectorQuery().select("#info-area").boundingClientRect(area =>{
      wx.getSystemInfo({
        success: system => {
          this.setData({
            windowHeight: system.windowHeight,
            mapHeight: system.windowHeight - area.height
          });
        }
      });
    }).exec();
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          windowHeight: res.windowHeight
        });
      }
    });

    // 获取订单ID
    this.getOpenerEventChannel().on("orderId", id => {
      // 获取订单
      var give={order_number:id};
      this.getOrder(id);
      this.getDriver(id);
      //this.communication(give);//与后端连接时打开此注释即可
      let{order,driver}=this.data;
        // 设置路线
        mapUtil.setMapRoute(order.start, order.end, this);
        //设置起点终点
        let markers = [//确定起点终点位置
          {//起始地
            iconPath: "../../imgs/mapicon_navi_s.png",
            id: 0,
            latitude:parseFloat(order.start.latitude),
            longitude:parseFloat(order.start.longitude),
            width: 23,
            height: 33
          }, {//目的地
            iconPath: "../../imgs/mapicon_navi_e.png",
            id: 1,
            latitude:parseFloat(order.end.latitude),
            longitude:parseFloat(order.end.longitude),
            width: 24,
            height: 34
          }
        ];
        this.setData({markers});
      
    });
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
    let that=this;//屏蔽函数对this.data的干扰
    /*发:
       order_number:订单号
      收:
        order:订单信息
          data.orderID:订单号
          data.price:花费
          data.distance:距离
          data.time:时间
          data.start_latitude,data.start_longitude: 起始地点,
          data.end_latitude，data.end_longitude:终止地点
        driver:司机信息
          data.driverId:司机编号
          data.drivername : 司机昵称,
          data.driverphone: 司机电话,
          data.carid : 车牌号,
    */
      util.req//post请求
      (
        'history_info',//请求的url，为util文件中基本url+该部分url组成
        {order_number:give.order_number},//传递的数据
        function (data) //data为获得数据
        {      //请求成功后处理
          console.log(data);
          var order = { 
          orderId : data.orderId,
          price : data.price,
          distance : data.distance,
          time : data.time,
          start : {latitude: data.start_latitude, longitude:data.start_longitude},
          end : {latitude: data.end_latitude, longitude: data.end_longitude},
          };
          var driver = { 
            driverID : data.driverId,
            name : data.drivername,
            phone : data.driverphone,
            car : data.carid
            };
          this.setData({order,driver});
        }
      )
  },
  // 获取订单信息
  getOrder(orderId) {
    const order = { orderId : orderId,
    price: 13.44,
    distance: 53.56,
    time : 134,
    start : {latitude: 40.034513, longitude: 114.432451},
    end : {latitude: 39.824366, longitude: 115.721614},
    driverId : 12345
    };
    this.setData({order});
  },

  // 获取司机信息
  getDriver(driverId) {
    const driver = { 
    driverid : driverId,
    name : "滴滴司机",
    phone : "13673957593",
    car : "沪A7F8H2",
    };
    this.setData({driver});
  },

  // 投诉订单
  complain(event) {
    let url = `/pages/response/response`;
    wx.navigateTo({ url });
  }
})