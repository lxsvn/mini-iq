//index.js
const app = getApp();

function timing(that) {
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
function formatSeconds(that) {
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
function formatTime(num) {
  if (num < 10)
    return '0' + num
  else
    return num + ''
}

Page({
	data:
  {
    hasUserInfo: false,
    seconds: 0,
    time: '00:00:00',
    coin: 0,
    signInToday:true,
    signInPreDays:[{"day":"第1天", "isSignIn":"true", "reward":"+30"},
      { "day": "第2天", "isSignIn": "false", "reward": "+40" },
      { "day": "第3天", "isSignIn": "false", "reward": "+50" },
      { "day": "第4天", "isSignIn": "false", "reward": "+60" },
      { "day": "第5天", "isSignIn": "false", "reward": "+70" },
      { "day": "第6天", "isSignIn": "false", "reward": "+80" },
      { "day": "第7天", "isSignIn": "false", "reward": "+100" }],
    colos: ["#b765e2", "#b765e2", "#b765e2", "#fe2380", "#8200bd", "#8200bd", "#8200bd"],
    animationCloudData: [{}, {}, {}, {}, {}, {}, {}, {}],
	},

	onLoad(opt) 
  {
    timing(this);
    this.setData({
      hasLogin: app.globalData.hasLogin
    })
	},

  onReady()
  {
    this.getUserMessage();
  },
  tapDay0: function ()
  {
    this.addAnimationToDay(0);
  },
  tapDay1: function () {
    this.addAnimationToDay(1);
  },
  tapDay2: function () {
    this.addAnimationToDay(2);
  },
  tapDay3: function () {
    this.addAnimationToDay(3);
  },
  tapDay4: function () {
    this.addAnimationToDay(4);
  },
  tapDay5: function () {
    this.addAnimationToDay(5);
  },
  tapDay6: function () {
    this.addAnimationToDay(6);
  },
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
  
  signIn: function()
  {
    this.closeSignInView();
  },

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

  getUserInfo: function () 
  {
    this.getUserMessage();
  },

  getUserMessage() {
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
  
  timeCount: function()
  {

  },

	onShow() 
  {
    //当信道连接或者重连了时，关闭已连接的信道
	//	this.closeTunnel()
	},

	gotoFighting() 
  {
		wx.navigateTo({
      url: '../game/game_index'  
		})
	},

	gotoFriends() 
  {
		wx.navigateTo({
			url: '../friends_sort/friends_sort'
		})
	},

  //前往排行榜页面
  gotoLeaderboard: function()
  {
    wx.navigateTo({
      url: '../rank/rank'
    })
  },

	closeTunnel() 
  {
		//当信道连接或者重连了时，关闭已连接的信道
		if (app.appData.tunnelStatus == 'connect' ||
        app.appData.tunnelStatus == 'reconnect') 
    {
			app.tunnel.close();
		}
	},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: 'IQ@高智商的你',
      path: '/pages/entry/entry',
      imageUrl: 'http://i0.hdslb.com/bfs/archive/2722a167806e5e732939ec3d847a9e9ac58e79e0.jpg'
    }
  },

  closeSignInView: function() 
  {
    this.setData({
      signInToday: false
    });
  }

})

