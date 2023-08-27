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
  cancel:0,
  success:0,//bool型
  driver:{},
  order_number:""
  },
  onLoad(e) {
    let { latitude, longitude,latitude2, longitude2,city,order_number} = e;
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
    var driver=//默认driver数据
        {
        driverID:0,
        height: 32,
        iconPath: "../../imgs/mapicon_navi_e.png",
        latitude: 43.872732,
        longitude: 125.266348,
        name: "果叔(长春大润发店)",
        width: 22,
        };
        this.setData({
          latitude, longitude, markers,latitude2,longitude2,city,order_number,driver
        });
      amap.getRegeo()//获取起始点
      .then(d => {
        this.countInterval();
          })
      .catch(e => {
        console.log(e);
      })
},
onShow(){
  this.setData({
    cancel: 0
   }); 
},
parseTime: function(time){
  var time = time.toString();
    return time[1]?time:'0'+time;
},
//计时并请求数据
countInterval: function () {
  var curr = 0;
   var timer = new Date(0,0);

 this.countTimer = setInterval(() => {
   let{success,order_number}=this.data;
   var give=({order_number:order_number});
   //this.communication(give);//与服务器连接时取消该注释
   if (!success) //模拟服务器返回时间
   {
     //与服务器连接
     this.setData({
             time: this.parseTime(timer.getMinutes())+":"+this.parseTime(timer.getSeconds()),
         });
         timer.setMinutes(curr/60);
               timer.setSeconds(curr%60);
               curr++;
     this.data.count++;
     //模拟服务器连接成功(与服务器连接时注释掉该内容)
     if(this.data.count > 2)
     {
       this.setData({
         success:1
       });
     }
   } 
   else {//服务器连接成功后
          if(!this.data.cancel)
          {
          //请求到的司机数据
          let{driver}=this.data;
          //console.log(driver);
          let drivermarker=[
            {
              driverID:driver.driverID,
              latitude:driver.latitude,
              longitude:driver.longitude,
              name:driver.name
            }
          ];
          let { latitude, longitude, latitude2,longitude2,city,order_number} = this.data;//获取起始点坐标
          var pack_driver= JSON.stringify(drivermarker);//司机数据打包
          //console.log(pack_driver);
          this.setData({
            progress_txt: "匹配成功"
          }); 
          let url = `/pages/success/success?&latitude2=${latitude}&longitude2=${longitude}&driver=${pack_driver}&latitude3=${latitude2}&longitude3=${longitude2}&city=${city}&order_number=${order_number}`;
          wx.navigateTo({ url });
          clearInterval(this.countTimer);
        }
   }
 }, 1000)
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
    如果发送中包含对象需要
      data.driverID:司机ID
      data.address:司机地址名
      司机具体地址:data.latitude,data.longitude
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
          var driver=({
            driverID:data.driverID,
            name: data.address,
            latitude: data.latitude,
            longitude: data.longitude,
          });
          var success=success;
          that.setData({driver,success});
        }
      )
  },
  toCancel(){
    this.setData({
     cancel: 1
    }); 
    let{order_number}=this.data;
    wx.navigateTo({
      url: `/pages/cancel/cancel?&order_number=${order_number}`
    })
    console.log("toCancel");
  }

})