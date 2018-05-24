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
    data: [{ "Msg": "请求成功", "Code": "1", "Name": "测试", "level": "1020", "icon": "/assets/imgs/face.svg", "page": "0", "RId": "200111"},
      { "Msg": "请求成功", "Code": "1", "Name": "测试2", "level": "100", "icon": "/assets/imgs/face.svg", "page": "0", "RId": "200111" },
      { "Msg": "请求成功", "Code": "1", "Name": "测试", "level": "1040", "icon": "/assets/imgs/face.svg", "page": "0", "RId": "200111" },
      { "Msg": "请求成功", "Code": "1", "Name": "测试321", "level": "100", "icon": "/assets/imgs/face.svg", "page": "0", "RId": "200111" },
      { "Msg": "请求成功", "Code": "1", "Name": "测试", "level": "1040", "icon": "/assets/imgs/face.svg", "page": "0", "RId": "200111" },
      { "Msg": "请求成功", "Code": "1", "Name": "测试123", "level": "100", "icon": "/assets/imgs/face.svg", "page": "0", "RId": "200111" },
      { "Msg": "请求成功", "Code": "1", "Name": "测试", "level": "100", "icon": "/assets/imgs/face.svg", "page": "0", "RId": "200111" },
      { "Msg": "请求成功", "Code": "1", "Name": "测试1233", "level": "1030", "icon": "/assets/imgs/face.svg", "page": "0", "RId": "200111" },
      { "Msg": "请求成功", "Code": "1", "Name": "测试ewf", "level": "100", "icon": "/assets/imgs/face.svg", "page": "0", "RId": "200111" },
      { "Msg": "请求成功", "Code": "1", "Name": "测试", "level": "1020", "icon": "/assets/imgs/face.svg", "page": "0", "RId": "200111" },
      { "Msg": "请求成功", "Code": "1", "Name": "测试ewf", "level": "100", "icon": "/assets/imgs/face.svg", "page": "0", "RId": "200111" },
      { "Msg": "请求成功", "Code": "1", "Name": "测试", "level": "100", "icon": "/assets/imgs/face.svg", "page": "0", "RId": "200111" },
      { "Msg": "请求成功", "Code": "1", "Name": "测试", "level": "100", "icon": "/assets/imgs/face.svg", "page": "0", "RId": "200111" },
      { "Msg": "请求成功", "Code": "1", "Name": "测试", "level": "100", "icon": "/assets/imgs/face.svg", "page": "0", "RId": "200111" },
      { "Msg": "请求成功", "Code": "1", "Name": "测试wef", "level": "100", "icon": "/assets/imgs/face.svg", "page": "0", "RId": "200111" },
      { "Msg": "请求成功", "Code": "1", "Name": "测试", "level": "10230", "icon": "/assets/imgs/face.svg", "page": "0", "RId": "200111" },
      { "Msg": "请求成功", "Code": "1", "Name": "测试", "level": "100", "icon": "/assets/imgs/face.svg", "page": "0", "RId": "200111" },
      { "Msg": "请求成功", "Code": "1", "Name": "测试sfa", "level": "100", "icon": "/assets/imgs/face.svg", "page": "0", "RId": "200111" },
      { "Msg": "请求成功", "Code": "1", "Name": "测试", "level": "103240", "icon": "/assets/imgs/face.svg", "page": "0", "RId": "200111" },
      { "Msg": "请求成功", "Code": "1", "Name": "测试", "level": "100", "icon": "/assets/imgs/face.svg", "page": "0", "RId": "200111" },
      { "Msg": "请求成功", "Code": "1", "Name": "测试", "level": "102340", "icon": "/assets/imgs/face.svg", "page": "0", "RId": "200111" },
      { "Msg": "请求成功", "Code": "1", "Name": "测试", "level": "100", "icon": "/assets/imgs/face.svg", "page": "0", "RId": "200111" },
      { "Msg": "请求成功", "Code": "1", "Name": "测试", "level": "10220", "icon": "/assets/imgs/face.svg", "page": "0", "RId": "200111" },
      { "Msg": "请求成功", "Code": "1", "Name": "测试", "level": "10330", "icon": "/assets/imgs/face.svg", "page": "0", "RId": "200111" },
      { "Msg": "请求成功", "Code": "1", "Name": "测试asfasf", "level": "100", "icon": "/assets/imgs/face.svg", "page": "0", "RId": "200111" },
      { "Msg": "请求成功", "Code": "1", "Name": "测试", "level": "100", "icon": "/assets/imgs/face.svg", "page": "0", "RId": "200111" },
      { "Msg": "请求成功", "Code": "1", "Name": "测试cxvxv", "level": "10440", "icon": "/assets/imgs/face.svg", "page": "0", "RId": "200111" },
      { "Msg": "请求成功", "Code": "1", "Name": "测试", "level": "100", "icon": "/assets/imgs/face.svg", "page": "0", "RId": "200111" },
      { "Msg": "请求成功", "Code": "1", "Name": "测试wef", "level": "10340", "icon": "/assets/imgs/face.svg", "page": "0", "RId": "200111" },
      { "Msg": "请求成功", "Code": "1", "Name": "测试", "level": "100", "icon": "/assets/imgs/face.svg", "page": "0", "RId": "200111" },
      { "Msg": "请求成功", "Code": "1", "Name": "测试", "level": "100", "icon": "/assets/imgs/face.svg", "page": "0", "RId": "200111" },
      { "Msg": "请求成功", "Code": "1", "Name": "测试", "level": "100", "icon": "/assets/imgs/face.svg", "page": "0", "RId": "200111" },
      { "Msg": "请求成功", "Code": "1", "Name": "测试", "level": "10420", "icon": "/assets/imgs/face.svg", "page": "0", "RId": "200111" },
      { "Msg": "请求成功", "Code": "1", "Name": "测试", "level": "100", "icon": "/assets/imgs/face.svg", "page": "0", "RId": "200111" },
      { "Msg": "请求成功", "Code": "1", "Name": "测试", "level": "10430", "icon": "/assets/imgs/face.svg", "page": "0", "RId": "200111" },
      { "Msg": "请求成功", "Code": "1", "Name": "测试", "level": "100", "icon": "/assets/imgs/face.svg", "page": "0", "RId": "200111" },
      { "Msg": "请求成功", "Code": "1", "Name": "测试ewffc", "level": "100", "icon": "/assets/imgs/face.svg", "page": "0", "RId": "200111" },
      { "Msg": "请求成功", "Code": "1", "Name": "测试", "level": "10530", "icon": "/assets/imgs/face.svg", "page": "0", "RId": "200111" },
      { "Msg": "请求成功", "Code": "1", "Name": "测试fewefw", "level": "100", "icon": "/assets/imgs/face.svg", "page": "0", "RId": "200111" },
      { "Msg": "请求成功", "Code": "1", "Name": "测试", "level": "10320", "icon": "/assets/imgs/face.svg", "page": "0", "RId": "200111" },
      { "Msg": "请求成功", "Code": "1", "Name": "测试csa", "level": "100", "icon": "/assets/imgs/face.svg", "page": "0", "RId": "200111" },
      { "Msg": "请求成功", "Code": "1", "Name": "测试", "level": "101230", "icon": "/assets/imgs/face.svg", "page": "0", "RId": "200111" },
      { "Msg": "请求成功", "Code": "1", "Name": "测试", "level": "100", "icon": "/assets/imgs/face.svg", "page": "0", "RId": "200111" },
      { "Msg": "请求成功", "Code": "1", "Name": "测试", "level": "100", "icon": "/assets/imgs/face.svg", "page": "0", "RId": "200111" },
      { "Msg": "请求成功", "Code": "1", "Name": "测试", "level": "100", "icon": "/assets/imgs/face.svg", "page": "0", "RId": "200111" },
      { "Msg": "请求成功", "Code": "1", "Name": "测试wercv", "level": "100", "icon": "/assets/imgs/face.svg", "page": "0", "RId": "200111" }
      ],
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