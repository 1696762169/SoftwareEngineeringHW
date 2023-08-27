// pages/choose_start/choose_end.js
let util = require('../../utils/util.js');
let wechat = require("../../utils/wechat");
let amap = require("../../utils/amap");
Page({
  data: {
    lonlat: "",
    city: "",
    tips: [],
    latitude:"",
    longitude:""
  },
  onLoad(e) {
    let { lonlat, city, latitude,longitude} = e;
    this.setData({
      lonlat, city,latitude,longitude
    })
  },
  bindInput(e) {
    // console.log(e);
    let { value } = e.detail;
    let { lonlat, city } = this.data;
    amap.getInputtips(city, lonlat, value)
      .then(d => {
        // console.log(d);
        if (d && d.tips) {
          this.setData({
            tips: d.tips
          });
        }
      })
      .catch(e => {
        console.log(e);
      })
  },
  bindSearch(e) {
    console.log(e);
    let { keywords_e } = e.target.dataset;
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];  //上一个页面
    console.log(keywords_e);
    if (keywords_e) {
      prevPage.setData({ keywords_e });
      amap.getPoiAround(keywords_e)
        .then(d => {
          console.log(2);
          let { markers } = d;
          markers.forEach(item => {
            item.iconPath = "../../imgs/mapicon_navi_e.png";
          })
          prevPage.setData({ markers });
        })
        .catch(e => {
          console.log(e);
        })
    }
    // 起点
    let { markers, markerId, city, textData } = prevPage.data;
    let{latitude, longitude}=this.data;
    if (!markers.length) return;
    console.log(prevPage.data);
    // 终点直接传所有选点
    let { latitude: latitude2, longitude: longitude2 } = markers[markerId];
    console.log(markers);
    console.log(latitude,longitude);
    console.log(latitude2,longitude2);
    let url = `/pages/confirm/confirm?longitude=${longitude}&latitude=${latitude}&longitude2=${longitude2}&latitude2=${latitude2}&city=${city}&name=${name}&desc=${desc}`;
    wx.navigateTo({ url })
  }
});