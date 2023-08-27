// pages/finish/finish.js
let util = require('../../utils/util.js');
let wechat = require("../../utils/wechat");
let amap = require("../../utils/amap");
Page({
  data: {
    markers: [],//起始点与结束点
    polyline: [],//画线
    distance: '',//距离
    cost: '',//花费
    time:'',//用时
    city: "",//所在城市
    name: "",//地点名称
    desc: "",//具体地址
    order_number:"",//订单号
    success:"",
    pay:0//是否付款
  },
  onLoad(e) {
    let { latitude, longitude, latitude2, longitude2, city,order_number} = e;
    //读数据
    console.log(e);//输出
    let markers = [//确定起点终点位置
      {//起始地
        iconPath: "../../imgs/mapicon_navi_s.png",
        id: 0,
        latitude,
        longitude,
        width: 23,
        height: 33
      }, {//目的地
        iconPath: "../../imgs/mapicon_navi_e.png",
        id: 1,
        latitude: latitude2,
        longitude: longitude2,
        width: 24,
        height: 34
      }
    ];
    //获取数据
    this.setData({
      latitude, longitude, latitude2, longitude2, markers, city,order_number
    });
    //console.log(type);
    this.getRoute();
  },
  getRoute() {
    //获取数据
    let { latitude, longitude, latitude2, longitude2,city } = this.data;
    let type = "getDrivingRoute";//确认类型
    //console.log(type);
    let origin = `${longitude},${latitude}`;//起始地
    let destination = `${longitude2},${latitude2}`;//目的地
    amap.getRoute(origin, destination, type, city)//获取路线
      .then(d => {
        // console.log(d);
        this.setRouteData(d, type);
      })
      .catch(e => {
        console.log(e);
      })
  },
  setRouteData(d, type) {//划线并计算时间
    //划线
    if (type != "getTransitRoute") {
      let points = [];
      if (d.paths && d.paths[0] && d.paths[0].steps) {
        let steps = d.paths[0].steps;
        wx.setStorageSync("steps", steps);
        steps.forEach(item1 => {
          let poLen = item1.polyline.split(';');
          poLen.forEach(item2 => {
            let obj = {
              longitude: parseFloat(item2.split(',')[0]),
              latitude: parseFloat(item2.split(',')[1])
            }
            points.push(obj);
          })
        })
      }
      this.setData({
        polyline: [{
          points: points,
          color: "#0091ff",
          width: 6
        }]
      });
    }
    if (type == "getDrivingRoute") {
      //计算距离
      if (d.paths[0] && d.paths[0].distance) {
        this.setData({
          distance: d.paths[0].distance/1000 + '千米'
        });
      }
      //计算花费
      if (d.taxi_cost) {
        this.setData({
          cost: '花费' + parseInt(d.taxi_cost) + '元'
        });
      }
      //计算时间
      if (d.paths[0] && d.paths[0].duration) {
        this.setData({
          time: '用时'+parseInt(d.paths[0].duration / 60) + '分钟'
        });
      }
    }
  },
  goPay() {//确认支付
    let{pay,order_number}=this.data;
    pay=1;
    this.setData({pay});
    var give=order_number;
    //this.communication(give);
    wx.showModal({
      content: '支付成功',
      confirmColor: '#fc9c56',
      success: function(res) {
        if (res.confirm) {
          wx.switchTab({
            url:  "/pages/index/index",
          })
        } 
      }
    })
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
          'hail/end',//请求的url，为util文件中基本url+该部分url组成
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
});