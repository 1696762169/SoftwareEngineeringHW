// pages/response/response.js
Page({

  data: {
    loading: false,
    contact: '',
    contant: ''
  },
 
  formSubmit: function (e) {
    let _that = this;
    let content = e.detail.value.opinion;
    let contact = e.detail.value.contact;
    let regPhone = /^1[3578]\d{9}$/;
    let regEmail = /^[a-z\d_\-\.]+@[a-z\d_\-]+\.[a-z\d_\-]+$/i;
    if (content == "") {
      wx.showModal({
        title: '提示',
        content: '反馈内容不能为空!',
      })
      return false
    }
    if (contact == "") {
      wx.showModal({
        title: '提示',
        content: '手机号或者邮箱不能为空!',
      })
      return false
    }
    if(contact == "" && content == "") {
      wx.showModal({
        title: '提示',
        content: '反馈内容,手机号或者邮箱不能为空!',
      })
      return false
    }
    if ((!regPhone.test(contact) && !regEmail.test(contact)) || (regPhone.test(contact) && regEmail.test(contact))) { //验证手机号或者邮箱的其中一个对
      wx.showModal({
        title: '提示',
        content: '您输入的手机号或者邮箱有误!',
      })
      return false
    } 
    else {
      this.setData({
        loading: true
      })
      var n = wx.getStorageSync("userinfo");

      let nickname;
    
      //当本地缓存的用户名称不为""或者null时，设置userinfo信息
      if(n.nickName != '' && n.nickName != null){
          nickname = n.nickName;
      }
    let status = false;
    //数据传输给后台
    /*util.req//post请求
    (
        '/apply-modify-info',//请求的url，为util文件中基本url+该部分url组成，//注意第一个地址前不加/
        { "content": content,  
          "contact": contact,
          "nickname":nickname},//传递的数据
        function (data) 
        {      //请求成功后处理
              //此处加入处理代码
        }
    )*/
    //成功后代码:
      wx.showToast({
        title: '反馈成功',
        icon: 'success',
        duration: 1000,
        success: function (res) {
          //提示框消失后返回上一级页面
          setTimeout(() => {
              wx.navigateBack({
                change: true,
              })
          }, 1200)
       }
     })
    }
  },
})