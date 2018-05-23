// pages/leaderboard/leaderboard.js

var app = getApp();
var ws = require('../../common/websocket/connect.js');
var msgReceived = require('../../common/websocket/msgHandler.js');
var config = require('../../config.js');

Page({
  /**
   * 页面的初始数据
   */
  data: 
  {
    question: '',
    QUId: '',
    School: '',
    Category: '',
    Quiz: '',
    Options: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () 
  {
    this.openWS();
  },

  refreshData: function()
  {
    var rd = config.baseMsg;
    rd.Code = config.apiCodes.getNextQuestion;
    rd.Data = {NativeId: "7c929bb0-9529-4cf9-9e26-0cddacbd0abb"};
    ws.send(rd);
  },

  openWS: function () 
  {
    // setMsgReceiveCallback 
    ws.setReceiveCallback(msgReceived, this, this.wsCallback);
    // connect to the websocket 
    ws.connect();
  },

  wsCallback: function (res) 
  {
    wx.hideLoading();
    console.log(res);
    this.setData({
      QuId: res.Data.QUId,
      School: res.Data.School,
      Category: res.Data.Category,
      Quiz: res.Data.Quiz,
      Options: res.Data.Options,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () 
  {
    this.refreshData();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function ()
  {
    return {
      title: 'IQ@高智商的你',
      path: '/pages/entry/entry',
      imageUrl: 'http://i0.hdslb.com/bfs/archive/2722a167806e5e732939ec3d847a9e9ac58e79e0.jpg'
    }
  }
})