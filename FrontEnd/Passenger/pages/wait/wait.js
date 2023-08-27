// pages/wait/wait.js
var util = require('../../utils/util.js');
let wechat = require("../../utils/wechat");
let amap = require("../../utils/amap");
var action = "retrieveDriverLocation";
const app = getApp()
Page({
  data: {
  progress_txt: '已等待', 
  count:0, //计数器
  waitTimer: null,//等待时间
  time: '00:00',
  markers:[],
  latitude2:"",
  longitude2:"",
  city:"",
  cancel:0
  },
  onLoad(e) {
    let { latitude, longitude,latitude2, longitude2,city} = e;
    console.log(e);
    let markers = [//确定起点终点位置
        {//起始地
          iconPath: "../../imgs/mapicon_navi_s.png",
          id: 0,
          latitude,
          longitude,
          width: 23,
          height: 33
        }]
        this.setData({
          latitude, longitude, markers,latitude2,longitude2,city
        });
      amap.getRegeo()//获取起始点
      .then(d => {
        this.countInterval();
          })
      .catch(e => {
        console.log(e);
      })
      
},
parseTime: function(time){
  var time = time.toString();
    return time[1]?time:'0'+time;
},
//计时并请求数据
countInterval: function () {
  var curr = 0;
   var timer = new Date(0,0);
   var  randomTime = Math.floor(20*Math.random()) ;//模拟服务器返回时间
    //请求数据
    /*   var tempdata=
          [{
          driverID:0,
          name: "果叔(长春大润发店)",
          address: "汽车开发区创业大街南侧展轮新世界第1号,2号公建幢1单元133号房",
          latitude: 43.872732,
          longitude: 125.266348,
          判断连接成功
          
          }]; */
      /*util.req
    (
      'hail/wait',//请求的url，为util文件中基本url+该部分url组成
      {action: action},//请求的数据
      function (data) 
      {      //请求成功后处理
        //此处加入处理代码
      }
    )*/
 this.countTimer = setInterval(() => {
   if (this.data.count <= 2) //模拟服务器返回时间
   {
     this.setData({
             time: this.parseTime(timer.getMinutes())+":"+this.parseTime(timer.getSeconds()),
         });
         timer.setMinutes(curr/60);
               timer.setSeconds(curr%60);
               curr++;
     this.data.count++;
   } else {
          //模拟的司机数据
          if(!this.data.cancel)
          {
          var tempdata=
          [{
          driverID:0,
          address: "汽车开发区创业大街南侧展轮新世界第1号,2号公建幢1单元133号房",
          height: 32,
          iconPath: "../../imgs/mapicon_navi_e.png",
          latitude: 43.872732,
          longitude: 125.266348,
          name: "果叔(长春大润发店)",
          width: 22,
          }];
          //请求到的司机数据
          let drivermarker=[
            {
              driverID:tempdata[0].driverID,
              latitude:tempdata[0].latitude,
              longitude:tempdata[0].longitude,
              desc:tempdata[0].address,
              name:tempdata[0].name
            }
          ];
          let { latitude, longitude, latitude2,longitude2,city} = this.data;//获取起始点坐标
          var driver= JSON.stringify(drivermarker);//司机数据打包
          this.setData({
            progress_txt: "匹配成功"
          }); 
          let url = `/pages/success/success?&latitude2=${latitude}&longitude2=${longitude}&driver=${driver}&latitude3=${latitude2}&longitude3=${longitude2}&city=${city}`;
          wx.navigateTo({ url });
          clearInterval(this.countTimer);
        }
   }
 }, 1000)
},
  toCancel(){
    this.setData({
     cancel: 1
    }); 
    wx.navigateTo({
      url: "/pages/cancel/cancel"
    })
  }

})