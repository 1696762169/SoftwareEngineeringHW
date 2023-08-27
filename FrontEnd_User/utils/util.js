
  function formatTime(date) {  
    var year = date.getFullYear()  
    var month = date.getMonth() + 1  
    var day = date.getDate()  
    
    var hour = date.getHours()  
    var minute = date.getMinutes()  
    var second = date.getSeconds()  
    
    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')  
  }  
    
  function formatNumber(n) {  
    n = n.toString()  
    return n[1] ? n : '0' + n  
  }  
const baseURL = 'http://localhost:8080/';//服务器地址
var rootDocment = baseURL+'passenger/';
//post请求
function req(url, data, cb) {
  //data.appid = AppConf.appid;
  //data.appsecret = AppConf.appsecret; 
    wx.request({  
      url: rootDocment + url,  
      data: data,  //给后端传输的数据
      method: 'post',  
      header: {'Content-Type':'application/json'},  
      success: function(res){  //res为从后端获得的数据
        return typeof cb == "function" && cb(res.data)  
      },  
      fail: function(){  
        return typeof cb == "function" && cb(false)  
      }  
    })  
} 
var appid="wx516cea43472aca6f";
var appsecret="ff0c86533d0ef95914f1eb17e5444239";
//get请求
function getReq(url,data,cb){ 
  //data.appid = AppConf.appid;
  //data.appsecret = AppConf.appsecret;
  wx.request({  
    url: rootDocment + url,
    data: data, 
    method: 'get',  
    header: {'Content-Type':'application/json'},  
    success: function(res){  
      return typeof cb == "function" && cb(res.data)  
    },  
    fail: function(){  
      return typeof cb == "function" && cb(false)  
    }  
  })  
}
// 获取底部导航栏最上方的位置
const tabbarTop = (callback) => {
  wx.getSystemInfo({
    success: (res) => {
      const screenHeight = res.windowHeight;
      if (typeof callback === 'function') {
        // 我tm就是没法获取这个底部导航栏的高度 84是源码里在iPhoneX里的高度
        callback(screenHeight - 84);
      }
    }
  });
  }
  module.exports = {  
    formatTime: formatTime,  
    req: req,   
    getReq: getReq,
    tabbarTop:tabbarTop,
    appid:appid,
    appsecret:appsecret
  }  
