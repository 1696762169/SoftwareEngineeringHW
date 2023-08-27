// pages/index/index.js
//获取应用实例
const app = getApp();
//let wechat = require("../../utils/wechat");
let amap = require("../../utils/amap");
let markersData = [];
var id=0;//记录起点标记
Page({

  /**
   * 页面的初始数据
   */
  data: //该页面用到的数据
  {
    //点标记
    markers:[],//各个备选点
    //用户所在地点坐标
    latitude: '',
    longitude: '',
    //用户所在文本说明
    startData:{},//起始地点说明
    textData: {},//备选地点说明
    city:'',//所在城市
    markerId:0,//备选地点标记
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  //加载定位点周围地图
  //e为传入数据
  onLoad(e) {

    amap.getRegeo()//获取e点附近数据，并将e点的地址信息存入data数据
    .then
    (d => {
      //console.log(d);
      let { name, desc, latitude, longitude } = d[0];
      let { city } = d[0].regeocodeData.addressComponent;
      this.setData({
        city,
        latitude,
        longitude,
        startData: { name, desc },
      })
      console.log(this.data);
    })
    .catch
    (e => {
      console.log(e);
    })    
  },//onload结束

  //起始点搜索跳转
  startInput() {
    let { latitude, longitude, city } = this.data;
    let url = `/pages/choose_start/choose_start?city=${city}&lonlat=${longitude},${latitude}`;
    wx.navigateTo({ url });
  },
  makertap(e) {//确认选点信息
    //console.log(e);
    let { markerId } = e;
    let { markers } = this.data;
    let marker = markers[markerId];
    //console.log(marker);
    this.showMarkerInfo(marker);//确认选点信息
    this.changeMarkerColor(markerId,1);//改变选点标志
    id=this.data.markerId;//确认起点位置
    console.log(this.data);
  },
  //显示选点信息
  showMarkerInfo(data) {
    let { name, address: desc } = data;
    this.setData({
      textData: { name, desc }
    })
    
  },
  //改变选点颜色,mode=0起点，mode=1终点
  changeMarkerColor(markerId,mode) {
    let { markers } = this.data;
    markers.forEach((item, index) => {
      item.iconPath = "../../imgs/marker.png";
      
      if (index == markerId)
      {
        if(mode==0)
          item.iconPath = "../../imgs/mapicon_navi_s.png";
        else
          item.iconPath = "../../imgs/mapicon_navi_e.png";
      } 
    })
    this.setData({ markers, markerId });
  },
  //结束点搜索跳转
  //注由于高德地图api默认无法分页使用，导致了getpoi的时候无法寻找两个poi，所以默认直接在定位点接人，不再使用双定位
  /*endInput() {
    let { markers } = this.data;
    var latitude, longitude, city;
    if(markers[id])
    {
      latitude=markers[id].latitude;
      longitude=markers[id].longitude;
      city=markers[id].city;
    }
    else{
      latitude=this.data.latitude;
      longitude=this.data.longitude;
      city=this.data.city;
    }
    console.log(latitude, longitude);
    let url = `/pages/choose_end/choose_end?city=${city}&lonlat=${longitude},${latitude}&longitude=${longitude}&latitude=${latitude}`;
    wx.navigateTo({ url });
  }, */ 
  getRoute() {
    // 起点
    let { latitude, longitude, markers, markerId, city, textData } = this.data;
    let { name, desc } = textData;
    if (!markers.length) return;
    // 终点
    let { latitude: latitude2, longitude: longitude2 } = markers[markerId];
    let url = `/pages/confirm/confirm?longitude=${longitude}&latitude=${latitude}&longitude2=${longitude2}&latitude2=${latitude2}&city=${city}&name=${name}&desc=${desc}&type=${"0"}`;
    wx.navigateTo({ url });
  },
})