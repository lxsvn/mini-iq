//index.js
//获取应用实例
var ws = require('../../common/websocket/connect.js');
var msgReceived = require('../../common/websocket/msgHandler.js');
var config = require('../../config.js');

var app = getApp();

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    msg: ''
  },
  onLoad: function () {
    this.openWS();
  },
  openWS: function () {
    console.log("ws.socketOpened:" + app.globalData.socketOpened);
    // setMsgReceiveCallback 
    ws.setReceiveCallback(msgReceived, this, this.wsCallback);
    // connect to the websocket 
    ws.connect();
  },
  wsCallback: function (msg) {
    console.log(msg);
    this.setData({
      msg: JSON.stringify(msg)
    });
   
  },
  // ################## 事件处理函数 ################## 
  //1. 开启socket 
  openSocket: function () {
    this.openWS();
  },
  //2. 获取题目
  getNextQuestion: function () {
    if (!app.globalData.socketOpened) {
      this.setData({
        msg: "请先开启socket"
      });
      return;
    }
    var rd = config.baseMsg;
    rd.Code = config.apiCodes.getNextQuestion;
    rd.Data = {
      NativeId: "7c929bb0-9529-4cf9-9e26-0cddacbd0abb"
    };
    ws.send(rd);
  }
})
