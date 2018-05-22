//index.js
//获取应用实例
var ws = require('../../common/websocket/connect.js');
var msgReceived = require('../../common/websocket/msgHandler.js');

var app = getApp();

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    msg: ''
  },
  onLoad: function () {
    //this.openWS(); 
  },
  openWS: function () {
    if (!ws.socketOpened) {
      // setMsgReceiveCallback 
      ws.setReceiveCallback(msgReceived, this, this.wsCallback);
      // connect to the websocket 
      ws.connect();
    }
    else {
     
    }
  },
  wsCallback: function (msg) {
    this.setData({
      msg: JSON.stringify(msg)
    });
    // console.log("wsCallback:"+msg.Code);
  },
  // ################## 事件处理函数 ################## 
  //1. 开始游戏
  startPlay: function () {
    console.log("2");
  },
  //2. socket测试
  testSocket: function () {
    this.openWS();
  },
  //3. 获取题目
  getNextQuestion: function () {
    ws.send({
      "Channel": "mini",
      "Code": "20001000",
      "Type": 1,
      "Data": {
        "NativeId": "7c929bb0-9529-4cf9-9e26-0cddacbd0abb"
      }
    });
  },
  //3. 去首页
  goHomePage: function () {
    wx.navigateTo({
      url: '../entry/entry'
    })
  },
})
