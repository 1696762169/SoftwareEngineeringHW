// app.js
var util = require('utils/util.js');
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs),
    this.getUserInfo();
    this.getUseropenid();
  },
  getUserInfo: function (cb) {
    let that=this;//屏蔽函数对this.data的干扰
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } 
    else {
      wx.getUserInfo({
        //成功后会返回
        success:(res)=>{
          //console.log(res);
          // 把你的用户信息存到一个变量中方便下面使用
          let userInfo= res.userInfo
          //console.log(userInfo);
          //获取openId（需要code来换取）这是用户的唯一标识符
          // 获取code值
          wx.login({
            //成功放回
            success:(res)=>{
              //console.log(res);
              let code=res.code
              // 通过code换取openId
              wx.request({
                url: `https://api.weixin.qq.com/sns/jscode2session?appid=${util.appid}&secret=${util.appsecret}&js_code=${code}&grant_type=authorization_code`,
                success:(res)=>{
                  //console.log(res);
                  userInfo.openid=res.data.openid
                  that.globalData.userInfo={userInfo};
                  typeof cb == "function" && cb(that.globalData.userInfo);
                  //console.log(userInfo.openid);
                }
              })
            }
          })
        }
      })
    }
  },
  getUseropenid: function (cb) {
    let that=this;//屏蔽函数对this.data的干扰
    if (this.globalData.openid) {
      typeof cb == "function" && cb(this.globalData.openid)
    } 
    else {
          wx.login({
            //成功放回
            success:(res)=>{
              //console.log(res);
              let code=res.code
              // 通过code换取openId
              wx.request({
                url: `https://api.weixin.qq.com/sns/jscode2session?appid=${util.appid}&secret=${util.appsecret}&js_code=${code}&grant_type=authorization_code`,
                success:(res)=>{
                  //console.log(res);
                  that.globalData.openid=res.data.openid;
                  typeof cb == "function" && cb(that.globalData.userInfo);
                  //console.log(that.globalData.openid);
                }
              })
            }
          })
        }
  },
  globalData: {
    userInfo: null,
    mapKey: "1bab7ff9f3848982e9583480a426c038",
    openid:""
  }
})
