// pages/success/success.js
let util = require('../../utils/util.js');
let wechat = require("../../utils/wechat");
let amap = require("../../utils/amap");
//定义三种状态变量
var before="0";
var incar="1"
var finish="2"
Page({
  data: {
    cindex: "0",//选择导航类型参数
    types: ["toPassenger","toDestination"],//具体导航类型值
    status:"0",
    markers: [],//起始点与结束点
    polyline: [],//画线
    driver:{},//司机信息
    distance: '',//距离
    cost: '',//花费
    time:'',//用时
    city: "",//所在城市
    name: "",//地点名称
    desc: "",//具体地址
    order_number:"",//订单号
    count:0//计数器，模拟请求次数及请求位置，模拟切换状态
  },
  onLoad(e) {
    let { latitude2, longitude2,latitude3,longitude3,city,order_number } = e;
    var driver_f = JSON.parse(e.driver);//接收到的简要driver信息
    var latitude=driver_f[0].latitude;
    var longitude=driver_f[0].longitude;
    //console.log(latitude,longitude);
    //读数据
    //console.log(order_number);//输出
    let markers = [//确定起点终点位置
      {//司机
        iconPath: "../../imgs/mapCart.png",
        id: 0,
        latitude:latitude,
        longitude:longitude,
        width: 23,
        height: 33
      }, {//起始地
        iconPath: "../../imgs/mapicon_navi_s.png",
        id: 1,
        latitude: latitude2,
        longitude: longitude2,
        width: 24,
        height: 34
      },{//目的地
        iconPath: "../../imgs/mapicon_navi_e.png",
        id: 2,
        latitude: latitude3,
        longitude: longitude3,
        width: 24,
        height: 34
      }
    ];
    var driver={
      driverID:0,
      name:"Text",
      phone:"12345678901",
      carID:"吉A12345",
      carType:"白色宾利",
    };
    this.setData({driver});
    var give=order_number;
    //communication(give);//与后端连接时打开此注释即可

    //输入数据
    this.setData({
      latitude, longitude, latitude2, longitude2, latitude3, longitude3,markers,city
    });
    this.getRoute();
    this.getposition();
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
        订单号order_name
      接收:
      如果发送中包含对象需要
        data.driverID:司机ID
        data.name:司机名
        data.phone:司机手机号
        data.carID:司机车牌号
        data.cartype:司机车辆类型
   */
      let that=this;//屏蔽函数对this.data的干扰
        util.req//post请求
        (
          'place-order',//请求的url，为util文件中基本url+该部分url组成
          {
            order_number:give.order_number
          },//传递的数据
          function (data) //data为获得数据
          { //请求成功后处理
            console.log(data);
            var driver={
              driverID:data.driverID,
              name:data.name,
              phone:data.phone,
              carID:data.carID,
              carType:data.carType
              }
            that.setData({driver});
          }
        )
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
    let { latitude, longitude, latitude2, longitude2,latitude3, longitude3,types, cindex, city } = this.data;
    let type = "getDrivingRoute";//确认类型
    let route=types[cindex];
    //console.log(type);
    if(route=="toPassenger")
    {
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
    }
    else
    {
      let origin = `${longitude},${latitude}`;//起始地
      let destination = `${longitude3},${latitude3}`;//目的地
      amap.getRoute(origin, destination, type, city)//获取路线
      .then(d => {
        // console.log(d);
        this.setRouteData(d, type);
      })
      .catch(e => {
        console.log(e);
      })
    }


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
          cost: parseInt(d.taxi_cost) + '元'
        });
      }
      //计算时间
      if (d.paths[0] && d.paths[0].duration) {
        this.setData({
          time: parseInt(d.paths[0].duration / 60) + '分钟'
        });
      }
    }
  },
  getposition: function (){
    //循环器每10s一次(最短请求定位时间)
    this.countTimer =setInterval(() => {

      //temppopsiton模拟得到的数据
      let {latitude2, longitude2,latitude3, longitude3,markers,status} = this.data;
      if (this.data.count <= 2) //结束条件应该为状态切换，这里用计时器次数模拟状态切换
      {
        if(status==before)//状态为上车前
        {
          
          //模拟导航移动
          let { latitude, longitude} = this.data;//获取新的地址
          latitude=parseFloat(latitude);
          longitude=parseFloat(longitude);
          var temppositon=[{
            latitude:latitude+(latitude2-latitude)/2,
            longitude:longitude+(longitude2-longitude)/2,
          }];
          //模拟部分结束
          //修改定位
          var newlatitude=temppositon[0].latitude;
          var newlongitude=temppositon[0].longitude;
          //修改图标位置
          markers[0].latitude=newlatitude;
          markers[0].longitude=newlongitude;
          this.setData({
            latitude:newlatitude, 
            longitude:newlongitude,
            markers
          });
          this.getRoute();
        }
        this.data.count++;
        //模拟位置到达并上车
        if(this.data.count>2)
        { 
          let { latitude, longitude} = this.data;
          var newlatitude=latitude2;
          var newlongitude=longitude2;
          //修改图标位置
          markers[0].latitude=newlatitude;
          markers[0].longitude=newlongitude;
          console.log("用户已上车,请注意路线");
          status=incar;//修改订单状态(订单状态切换)
          this.setData({
            latitude:newlatitude, 
            longitude:newlongitude,
            markers,
            status
          });
          //模拟部分结束
        }
      } 
      else if (this.data.count <= 15)
      {
        let{status}=this.data;//获取新的状态
        if(status==incar)//状态为上车
        {
          //temppopsiton模拟得到的数据
          let { latitude, longitude} = this.data;//获取新的地址
          latitude=parseFloat(latitude);
          longitude=parseFloat(longitude);
          var temppositon=[{
            latitude:latitude+(latitude3-latitude)/2,
            longitude:longitude+(longitude3-longitude)/2,
          }];
          //模拟部分结束
          //以下为得到的新数据处理
          var newtype="1";
          this.changeType(newtype);
          var newlatitude=temppositon[0].latitude;
          var newlongitude=temppositon[0].longitude;
          markers[0].latitude=newlatitude;
          markers[0].longitude=newlongitude;
          //console.log(markers[1]);
          this.setData({
            latitude:newlatitude, 
            longitude:newlongitude,
            markers
        });
          this.getRoute();
        }
        this.data.count++;
        //模拟状态切换
        if(this.data.count>15)
        { 
          let { latitude, longitude,latitude3, longitude3,markers} = this.data;
          var newlatitude=latitude3;
          var newlongitude=longitude3;
          //修改图标位置
          markers[0].latitude=newlatitude;
          markers[0].longitude=newlongitude;
          status=finish;//修改订单状态(订单状态切换)
          console.log("订单已完成，请及时支付");
          this.setData({
            latitude:newlatitude, 
            longitude:newlongitude,
            markers,
            status
          });
          this.getRoute();
        }
      }
      else
      {
        let{status}=this.data;//获取新的状态
        if(status==finish)
        {
          //跳转页面
          this.goFinish();
          status=before;//重置状态
          this.setData({
            status
          });
        }
        
        clearInterval(this.countTimer);//结束计时器
      }
    }, 1000)


  },
  goFinish() {//完成
    let { latitude2, longitude2, latitude3,longitude3,city,order_number} = this.data;//获取起始
    let url = `/pages/finish/finish?&latitude=${latitude2}&longitude=${longitude2}&latitude2=${latitude3}&longitude2=${longitude3}&city=${city}&order_number=${order_number}`;
    wx.navigateTo({ url });
  },
  toCancel(){
    let{order_number}=this.data;
    wx.navigateTo({
      url: `/pages/cancel/cancel?&order_number=${order_number}`
    })
  }
});