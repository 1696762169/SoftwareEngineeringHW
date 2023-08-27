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
    user_id:"",//用户id
    success:1,
    message:"尚未注册手机号",//输出信息
    error:""
  },
  onLoad() {
    if (wx.getUserProfile) {
      var that = this
      //获取用户信息
      getApp().getUserInfo(function(userinfo){
        that.setData
        ({
            userInfo: userinfo,
        })
      })
      //获取用户id
      getApp().getUseropenid(function (openid) {
        that.setData({
            user_id: openid
        })
        //console.log('用户openid', that.data.user_id)
      let{userInfo,user_id}=that.data;
      console.log(user_id);
      var give={
        user_type:"passenger",
        user_id:user_id,
        modify_type:"login",
        modify_data:user_id
      }
      console.log(give);
      //this.communication(give);//与后端连接时打开此注释即可
      let{success,message}=that.data;
      if(success)
      {
        var phone=message;
        //成功后读取信息
        that.setData({
          phone:phone,
          user_id:user_id
        });
        console.log(that.data);
      }
      else
      {
        console.log(message);
      }
    })
    this.setData({
      canIUseGetUserProfile: true,
    })
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
      let{user_id}=this.data;
      var give={
        user_type:"passenger",
        user_id:user_id,
        modify_type:"phone",
        modify_data:phone
      }
      //console.log(give);
      //this.communication(give);//与后端连接时打开此注释即可
      //记录这个手机号
      let { success,message} = this.data;
      if(success)
      {
        this.setData({
          error:"修改成功",
          phone:phone
        });
      }
      else{
        this.setData({
          error:message,
        });
      }
    }
    else
    {
      //报错
      this.setData({
        error:"修改失败，手机号长度不为11位"
      });
    }
  },
  //与后端的交流函数
  /*注:调用函数结构为
    url:xx，
        说明:具体连接的url为:http://localhost:8080/passenger/xx,如果要修改前半部分，到utils/util.js中进行修改
    {发送数据
        说明:其结构为  发给后端变量名(应该改的部分):发给后端的内容},
    function(data)
    {
      成功后的处理函数，data.xx为从后端接收到的数据xx为应该改的部分
    }*/ 
    communication(give){
      /*
      发送:
      //以下标注为后端名称，前端名称不用改
        发用户类型user_type,user_id,数据类型modify_type,数据内容modify_data
      接收:
        成功信息:data.success
      */ 
      let that=this;//屏蔽函数对this.data的干扰
        util.req//post请求
        (
          'cancel',//请求的url，为util文件中基本url+该部分url组成
          {
            user_type:give.user_type,
            user_id:give.user_id,
            modify_type:give.modify_type,
            modify_data:give.modify_data
          },//传递的数据
          function (data) //data为获得数据
          { //请求成功后处理
            console.log(data);
            var success=data.success;
            var message=data.message;
            that.setData({success,message});
          }
        )
    },
  delete(){
    let that=this
    wx.showModal({
      content: '确定要注销账号吗',
      cancelColor: '#cccccc',
      confirmColor: '#fc9c56',
      success: function(res) {
        if (res.confirm) {
          var give={
            user_type:"passenger",
            user_id:user_id,
            modify_type:"user_delete",
            modify_data:""
          };
          //that.communication(give);//与后端连接时打开此注释即可
          that.setData({
            phone:"尚未注册手机号",
            user_id:""
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
    let url = `/pages/historylist/historylist`;
    wx.switchTab({ url });
  }
})
