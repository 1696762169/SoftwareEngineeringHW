// pages/confirm/confirm.js
let util = require('../../utils/util.js');
let wechat = require("../../utils/wechat");
let amap = require("../../utils/amap");
Page({
  data: {
    cindex: "0",//选择导航类型参数
    types: ["getDrivingRoute", "getWalkingRoute","finish"],//具体导航类型值
    markers: [],//起始点与结束点
    polyline: [],//画线
    distance: '',//距离
    cost: '',//花费
    time:'',//用时
    city: "",//所在城市
    name: "",//地点名称
    name2: "",//具体地址
    order_number:"0"//获得的订单地址
  },
  onLoad(e) {
    let { latitude, longitude, latitude2, longitude2, city, name, name2,type } = e;
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
      latitude, longitude, latitude2, longitude2, markers, city, name, name2
    });
    //console.log(name2);
    this.changeType(type);
    this.getRoute();
  },
  changeType(e) {//切换导航类型
    var id  = e;
    let { cindex } = this.data;
    if (id == cindex) return;
    this.setData({ cindex: id });
    this.getRoute();
  },
  getRoute() {
    //获取数据
    let { latitude, longitude, latitude2, longitude2, types, cindex, city } = this.data;
    let type = types[cindex];//确认类型
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
          cost: '打车约' + parseInt(d.taxi_cost) + '元'
        });
      }
      //计算时间
      if (d.paths[0] && d.paths[0].duration) {
        this.setData({
          time: '预计用时'+parseInt(d.paths[0].duration / 60) + '分钟'
        });
      }
    }
    else if (type == "getWalkingRoute") {
      if (d.paths[0] && d.paths[0].distance) {
        this.setData({
          distance: d.paths[0].distance + '米'
        });
      }
      if (d.paths[0] && d.paths[0].duration) {
        this.setData({
          time: parseInt(d.paths[0].duration / 60) + '分钟'
        });
      }
    }
  },
  goWait() {//确认下单
    let { latitude, longitude,latitude2, longitude2,city} = this.data;
    let{name,name2,cost,time}=this.data;
    var give=({
      longitude:longitude,
      latitude:latitude,
      longitude2:longitude2,
      latitude2:latitude2,
      name:name,
      name2:name2,
      cost:cost,
      time:time,
      city:city
    });
    //this.communication(give);//与后端连接时取消该注释即可
    let{order_number}=this.data
    let url = `/pages/wait/wait?&latitude=${latitude}&longitude=${longitude}&latitude2=${latitude2}&longitude2=${longitude2}&city=${city}&order_number=${order_number}`;
    wx.navigateTo({ url });
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
      起始坐标:start_longitude,start_latitude,
      起始名称:start_name,
      终止坐标:end_longitude,end_latitude,
      终止名称:end_name,
      价格:price,
      时间:time,
      所在城市:city,
    接收://注意看console.log信息，将data中的订单号名匹配上data.xx中的内容
      订单号:data.order_number
    */ 
    let that=this;//屏蔽函数对this.data的干扰
      util.req//post请求
      (
        'place-order',//请求的url，为util文件中基本url+该部分url组成
        {start_longitude:give.longitude,
         start_latitude:give.latitude,
         end_longitude:give.longitude2,
         end_latitude:give.latitude2,
         start_name:give.name,
         end_name:give.name2,
         price:give.cost,
         time:give.time,
         city:give.city
        },//传递的数据
        function (data) //data为获得数据
        { //请求成功后处理
          console.log(data);
          var order_number=data.order_number;
          that.setData({order_number});
        }
      )
  }
});
