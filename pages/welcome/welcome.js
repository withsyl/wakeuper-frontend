// pages/welcome/welcome.js
var app = getApp()
var util = require("../../utils/util.js")
Page({

  data: {
    campus: ['天赐庄', '独墅湖', '阳澄湖'],
    school: ['文学院',
      '凤凰传媒学院',
      '社会学院',
      '政治与公共管理学院',
      '马克思主义学院',
      '外国语学院',
      '东吴商学院（财经学院）',
      '王健法学院',
      '教育学院',
      '艺术学院',
      '音乐学院',
      '体育学院',
      '金螳螂建筑学院',
      '数学科学学院',
      '物理与光电·能源学部',
      '材料与化学化工学部',
      '纳米科学技术学院',
      '计算机科学与技术学院',
      '电子信息学院',
      '机电工程学院',
      '沙钢钢铁学院',
      '纺织与服装工程学院',
      '城市轨道交通学院',
      '医学部'
    ],
    sex: ['男', '女'],
    info: { school: '未选择学院', sex: '未选择性别', campus: '未选择校区' }     //此处必须为picker设置初始值，否则界面点不开picker
  },


  setInfo: function (e) {

  

    var fId = e.detail.formId;
    var fObj = e.detail.value;
    var value = e.detail.value;
    // 判断输入合法性
    if (value.name == '' || value.studentid == '' || value.studentid.length!=10|| value.phone == '' || value.sex == '未选择性别' || value.campus == '未选择校区' || value.school == '未选择学院') {
      wx.showToast({
        image: '../../images/yonghufill.png',
        title: '信息输入不完整或信息错误！',
        duration: 1500,
      })
    }
    else {
      wx.request({
        url: 'https://www.ibilidi.cn/joinClub',
        method: 'POST',
        data: e.detail.value,
        complete:function(e){
          console.log(e)
          wx.showToast({
            mask: true,
            icon:"success",
            title: 'success!\r\n欢迎加入wakeup俱乐部。',
            complete:function(){

             
              wx.request({
                url: 'https://www.ibilidi.cn/getAccessToken',
                method: 'GET',
                success: function (a) {
                  wx.request({
                    url: 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=' + a.data.rows[0].access_token,
                    method: 'POST',
                    data: {
                      "touser": app.globalData.userInfo.openid,
                      "template_id": "RfvKyzClcCqZhmBaaN5fHMGG7by60HV32Ffr7_BmM9c",
                      "page": "index",
                      "form_id": fId,
                      "data": {
                        "keyword1": {
                          "value": "苏州大学wakeup俱乐部",
                          "color": "#173177"
                        },
                        "keyword2": {
                          "value": app.globalData.userInfo.nickName,
                          "color": "#173177"
                        },
                        "keyword3": {
                          "value": util.formatTime(new Date()),
                          "color": "#173177"
                        },
                        "keyword4": {
                          "value": "欢迎加入wakeup俱乐部迎新群（658600211）",
                          "color": "#173177"
                        }
                      },
                      "emphasis_keyword": "keyword2.DATA"
                    },
                    complete: function (e) {
                      console.log(e)
                    }
                  })
                }
              })

              setTimeout(function(){
                wx.switchTab({
                  url: '../index/index',
                })
              }, 1500)
            }
          })
        }

      })
    }
  },
  selectorInput: function (e) {  //根据界面selector传入的item数据判断数据值
    console.log(e)

    var array = e.target.dataset.item
    var index = parseInt(e.detail.value)
    var value = this.data[array][index]
    this.data.info[array] = value
    var temp = this.data.info
    this.setData({ info: temp })
  },
  onShareAppMessage: function () {
    return {
      title: "欢迎加入wakeup俱乐部"
    }
  }
})