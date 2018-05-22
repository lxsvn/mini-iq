// pages/game_room/game_room.js
const app = getApp()

var ws = require('../../common/websocket/connect.js');
var msgReceived = require('../../common/websocket/msgHandler.js');

var time = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isActive: true,
    isSi: true,
    percent: 100,

  },

  /**点击了第一个答案 */
  first_answer: function () {

  },

  /**点击了第二个答案 */
  second_answer: function () {

  },

  /**点击了第三个答案 */
  third_answer: function () {

  },


  /**点击了第四个答案 */
  fouth_answer: function () {

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //页面加载成功 开启倒计时
    Countdown(100, this);
    if (!ws.socketOpened) {
      // setMsgReceiveCallback 
      ws.setReceiveCallback(msgReceived, this);
      // connect to the websocket 
      ws.connect();
      ws.send({
        "Channel": "mini",
        "Code": "20001000",
        "Type": 1,
        "Data": {
        "NativeId": "7c929bb0-9529-4cf9-9e26-0cddacbd0abb"
        }
      });

    }
    else {
      ws.send({
        type: 'create',
        no: 1
      });
    }
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})

/**10秒钟倒计时  residueTime 剩余时间  self 当前页面*/
function Countdown(residueTime, self) {
  setTimeout(function () {
    if (residueTime > 0) {
      residueTime = residueTime - 1;
      self.data.percent = residueTime;
      self.setData({
        percent: self.data.percent
      })
      Countdown(residueTime, self);
    } else {
      residueTime = 100;
      Countdown(residueTime, self)
    }
  }, 100);
};

/**
 * 获取下一题
 */
function getNextQuestion() {

};
