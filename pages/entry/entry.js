//index.js
const app = getApp();

// 计时
function timing(that) 
{
  var seconds = that.data.seconds
  if (seconds > 3600) {
    that.setData({
      time: '00:00:00',
      seconds: seconds + 1,
    });
    clearTimeout();
    return;
  }
  setTimeout(function () {
    that.setData({
      seconds: seconds + 1,
    });
    if((seconds+1)%10 == 0)
    {
      that.setData({
        coin: that.data.coin + 1,
      });
    }
    timing(that);
  }
    , 1000)
  formatSeconds(that)
}
// 格式化秒
function formatSeconds(that) 
{
  var mins = 0, hours = 0, seconds = that.data.seconds, time = ''
  if (seconds < 60) {

  } else if (seconds < 3600) {
    mins = parseInt(seconds / 60)
    seconds = seconds % 60
  } else {
    mins = parseInt(seconds / 60)
    seconds = seconds % 60
    hours = parseInt(mins / 60)
    mins = mins % 60
  }
  that.setData({
    time: formatTime(hours) + ':' + formatTime(mins) + ':' + formatTime(seconds),
  });
}
// 格式化时间
function formatTime(num) 
{
  if (num < 10)
    return '0' + num
  else
    return num + ''
}
// 关闭签到下面，便于重用
function closeSignInPage(that) 
{
  var animation = wx.createAnimation({
    duration: 500,
    timingFunction: 'ease-in-out',
  });
  animation.opacity(0).scale3d(0,0,0).step({ duration: 1000 });
  that.setData({
    closeAnimation: animation,
  })

  setTimeout(function () {
    that.setData({
      signInToday: false
    });
  }, 1000);
}

Page({
	data:
  {
    // 是否已经获得用户信息
    hasUserInfo: false,
    seconds: 0,
    // 计时显示
    time: '00:00:00',
    // 用户获得的金币数
    coin: 0,
    // 今天是否已经签到
    signInToday:true,
    // 签到记录初始化
    signInPreDays:[{"day":"第1天", "isSignIn":"false", "reward":"+30"},
      { "day": "第2天", "isSignIn": "false", "reward": "+40" },
      { "day": "第3天", "isSignIn": "false", "reward": "+50" },
      { "day": "第4天", "isSignIn": "false", "reward": "+60" },
      { "day": "第5天", "isSignIn": "false", "reward": "+70" },
      { "day": "第6天", "isSignIn": "false", "reward": "+80" },
      { "day": "第7天", "isSignIn": "false", "reward": "+100" }],
    // 7天签到的背景色
    colos: ["#b765e2", "#b765e2", "#b765e2", "#fe2380", "#8200bd", "#8200bd", "#8200bd"],
    // 签到的动画数组
    animationCloudData: [{}, {}, {}, {}, {}, {}, {}, {}],
    // 关闭签到页面的动画
    closeAnimation:{},
	},

	onLoad(opt) 
  {
    // 开始计时
    timing(this);
    // 初始化是否已经登录
    this.setData({
      hasLogin: app.globalData.hasLogin
    })

	},

  onReady()
  {
    // 获取用户信息
    this.getUserMessage();
    // 遍历签到状态，给需要签到的那一天加入动画
    for (var i = 0; i < 7; i++)
    {
      if (this.data.signInPreDays[i]["isSignIn"] == "true")
      {
        this.addAnimationToDay(i);
        break;
      }
    }
  },
  // 给日期视图添加动画
  addAnimationToDay: function(index)
  {
    var that = this;
    var animationCloudData = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-in-out',
    });
    setTimeout(function () {
      animationCloudData.translateY(-10).step({ duration: 300 }).translateY(0).step({ duration: 300 });
      var animations = [{}, {}, {}, {}, {}, {}, {}]; 
      animations[index] = animationCloudData.export()
      that.setData({
        animationCloudData: animations,
      })
    }, 500)
  },
  // 签到
  signIn: function()
  {
    this.closeSignInView();
  },
  // 登录
  login: function () 
  {
    var that = this
    wx.login({
      success: function (res) 
      {
        app.globalData.hasLogin = true
        that.setData({
          hasLogin: true
        })
        that.update()
      }
    })
  },
  // 获取用户信息，绑定方法
  getUserInfo: function () 
  {
    this.getUserMessage();
  },
  // 获取用户信息，内部方法，方便重用
  getUserMessage() 
  {
    var that = this

    if (app.globalData.hasLogin === false) {
      wx.login({
        success: _getUserInfo
      })
    }
    else {
      _getUserInfo()
    }

    function _getUserInfo() {
      wx.getUserInfo({
        success: function (res) {
          that.setData({
            hasUserInfo: true,
            userInfo: res.userInfo
          })
          that.update()
        }
      })
    }
  },
  // 前往游戏界面
	gotoFighting() 
  {
		wx.navigateTo({
      url: '../game/game_index'  
		})
	},
  //前往排行榜页面
  gotoLeaderboard: function()
  {
    wx.navigateTo({
      url: '../rank/rank'
    })
  },
  // 用户点击右上角分享
  onShareAppMessage: function () 
  {
    return {
      title: 'IQ@高智商的你',
      path: '/pages/entry/entry',
      imageUrl: 'http://i0.hdslb.com/bfs/archive/2722a167806e5e732939ec3d847a9e9ac58e79e0.jpg'
    }
  },
  // 关闭签到页面，绑定方法
  closeSignInView: function() 
  {
    closeSignInPage(this);
  }

})

