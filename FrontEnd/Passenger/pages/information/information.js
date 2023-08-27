// pages/information/information.js
// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
    phone:"尚未注册手机号",//用户手机号
    id:"",//用户id
    error:""
  },
  onLoad() {
    if (wx.getUserProfile) {

        this.setData({
          canIUseGetUserProfile: true
        })
      //请求手机号
      //发用户ID:user_id
      //收:
      //乘客端,司机端
        //手机号:
      //司机端
        //车牌号:car_no
        //车辆描述:car_discription
      /*util.req//post请求
        (
          '/apply-modify-info',//请求的url，为util文件中基本url+该部分url组成，//注意第一个地址前不加/
          {…… },//传递的数据
          function (data) 
          {      //请求成功后处理
            //此处加入处理代码
          }
        )*/
        //模拟传递过来的手机号和id
        var testdata=[{
          phone:"12345678901",
          id:"1234567"
        }]
        //成功后读取信息
        this.setData({
          phone:testdata[0].phone,
          id:testdata[0].id
        });
      }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  changephone(e){

    var phone=e.detail.value.phone;
    console.log(phone);
    if(phone.length==11)
    {
      //发用户类型user_type,user_id,数据类型modify_type,数据内容modify_data
      //收结果
      /*util.req//post请求
      (
        'apply-modify-info',//请求的url，为util文件中基本url+该部分url组成，//注意第一个地址前不加/
        {phone:phone },//传递的数据
        function (data) 
        {      //请求成功后处理
          //此处加入处理代码
        }
      )*/
      //记录这个手机号
      this.setData({
        error:"",
        phone:phone
      });
    }
    else
    {
      //报错
      this.setData({
        error:"修改失败，手机号长度不为11位"
      });
    }
  },
  delete(){
    let that=this
    wx.showModal({
      content: '确定要注销账号吗',
      cancelColor: '#cccccc',
      confirmColor: '#fc9c56',
      success: function(res) {
        if (res.confirm) {
          //传递删除请求
          /*util.req//post请求
          (
            '/apply-modify-info',//请求的url，为util文件中基本url+该部分url组成，//注意第一个地址前不加/
            {…… },//传递的数据
            function (data) 
            {      //请求成功后处理
              //此处加入处理代码
            }
          )*/
          //注此处不能用this，应为嵌套在函数中，this指向function而不是page
          that.setData({
            phone:"尚未注册手机号",
            id:""
          });
          wx.switchTab({
            url:  "/pages/index/index",
          });
        } else if (res.cancel) {
        }
      }
    })

  },
  change(){
    let that=this
    wx.showModal({
      content: '确定要切换账号吗',
      cancelColor: '#cccccc',
      confirmColor: '#fc9c56',
      success: function(res) {
        if (res.confirm) {
          //传递切换
          /*util.req//post请求
          (
            '/apply-modify-info',//请求的url，为util文件中基本url+该部分url组成，//注意第一个地址前不加/
            {…… },//传递的数据
            function (data) 
            {      //请求成功后处理
              //此处加入处理代码
            }
          )*/
          //注此处不能用this，应为嵌套在函数中，this指向function而不是page
          that.setData({
            canIUseGetUserProfile: false,
            phone:"尚未注册手机号",
            id:"",
          });
          wx.switchTab({
            url:  "/pages/index/index",
          });
        } else if (res.cancel) {
        }
      }
    })

  },
  toresponse(){
    let url = `/pages/response/response`;
    wx.navigateTo({ url });
  }
})
