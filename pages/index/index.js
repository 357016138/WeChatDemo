//index.js
//获取应用实例
const app = getApp()
var network_util = require('../../utils/network_util.js');
var json_util = require('../../utils/json_util.js');

Page({
  data: {
    list: [],
    dd: '',
    hidden: false,
    page: 1,
    size: 20,
    hasMore: true,
    hasRefesh: false
  },
  //点击事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this
    var url = 'https://serviceapp.dixintong.com/wxApi/data/getData.ashx';
    network_util._get(url, function (res) {
      console.log(res.data.Data);
      that.setData({
        list: res.data.Data,
        hidden: true,
       
      });
    }, function (res) {
      console.log(res);
    });
  },

  //下拉刷新
  onPullDownRefresh: function () {
    var that = this;
    that.setData({
      hasRefesh: true,
    });
    var url = 'https://serviceapp.dixintong.com/wxApi/data/getData.ashx';
    network_util._get(url,
      function (res) {
        that.setData({
          list: res.data.Data,
          hidden: true,
          page: 1,
          hasRefesh: false,
        });
      }, function (res) {
        console.log(res);
      })

  },

  //上拉加载
  onReachBottom:function() {
    var that = this;
    that.setData({
      hasRefesh: true,
    });
    if (!that.data.hasMore) return
    var url = 'https://serviceapp.dixintong.com/wxApi/data/getData.ashx?pageSize=' + that.data.size + '+&pageIndex=' + (++that.data.page);
    network_util._get(url,
      function (res) {
        that.setData({
          list: that.data.list.concat(res.data.Data),
          hidden: true,
          hasRefesh: false,
        });
      }, function (res) {
        console.log(res);
      })

  },

})
