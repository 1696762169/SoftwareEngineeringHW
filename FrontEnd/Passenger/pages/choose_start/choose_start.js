// pages/choose_start/choose_start.js
let util = require('../../utils/util.js');
let wechat = require("../../utils/wechat");
let amap = require("../../utils/amap");
Page({
  data: {
    lonlat: "",
    city: "",
    tips: []
  },
  onLoad(e) {
    let { lonlat, city } = e;
    this.setData({
      lonlat, city
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
    //console.log(e);
    let { keywords_s } = e.target.dataset;
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];  //上一个页面
    // console.log(pages);
    if (keywords_s) {
      prevPage.setData({ keywords_s });
      amap.getPoiAround(keywords_s)
        .then(d => {
         // console.log(d);
          let { markers } = d;
          markers.forEach(item => {
            item.iconPath = "../../imgs/mapicon_navi_e.png";
          })
          prevPage.setData({ markers });
          prevPage.showMarkerInfo(markers[0]);
          prevPage.changeMarkerColor(0,1);
        })
        .catch(e => {
          console.log(e);
        })
    }
    let url = `/pages/index/index`;
    wx.switchTab({ url })
  }
});