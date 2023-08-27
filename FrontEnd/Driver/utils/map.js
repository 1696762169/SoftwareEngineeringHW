const setMapRoute = (start, end, component) => {
  const mapCtx = wx.createMapContext("map", component);
  const amapFile = require("../lib/amap-wx.130");
  const myAmap = new amapFile.AMapWX({key: getApp().globalData.mapKey});
  
  // 查询路线
  myAmap.getDrivingRoute({
    origin: `${start.longitude},${start.latitude}`,
    destination: `${end.longitude},${end.latitude}`,
    success: function(data){
      // 构建路线列表
      var points = [];
      if(data.paths && data.paths[0] && data.paths[0].steps){
        var steps = data.paths[0].steps;
        for(var i = 0; i < steps.length; i++){
          var poLen = steps[i].polyline.split(';');
          for(var j = 0;j < poLen.length; j++){
            points.push({
              longitude: parseFloat(poLen[j].split(',')[0]),
              latitude: parseFloat(poLen[j].split(',')[1])
            });
          } 
        }
      }
      // 缩放视野
      mapCtx.includePoints({
        points: points,
        padding: [36, 36, 36, 36]
      });
      // 设置折线
      component.setData({
        polyline: [{
          points: points,
          color: "#0091ff",
          width: 6
        }]
      });
    },
    fail: function(info){ console.log(info); }
  })
}

// 获取当前经纬度坐标
const getCurPosition = (callback, mockPosition) => {
  callback({
    longitude: mockPosition.longitude + Math.random() * 0.1 - 0.05,
    latitude: mockPosition.latitude + Math.random() * 0.1 - 0.05,
  })
}

module.exports = {
  setMapRoute,
  getCurPosition
}