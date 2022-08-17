// index.js

const { getLocationID } = require("../../utils/util");

// 获取应用实例
const app = getApp()

Page({
  
  data:{
    region :["山东省","青岛市","崂山区"],
    now:{
    }
  },
 
    regionChange:function(e){
      this.setData({
        region:e.detail.value
      })
      this.getWeather();
    },
    async getLocationIdByName(name){
        const {data:res} = await wx.request({
          url: 'https://geoapi.qweather.com/v2/city/lookup',
          data:{
            location:name,
            key:'58ed51beead64960a16c0e5142b7ce13'},
          success:function(res){
            console.log("success log:"+res.data.location[0].id)
            return res.data.location[0].id
          }
        })
        //console.log(res)
        //return res.message.location

    },
    getWeather:function(){
      var that = this
      wx.request({
        url:'https://devapi.qweather.com/v7/weather/now',
        data:{
          location:getLocationID(this.data.region[1]),
          key:'your key'
        },
        success:function(res){
          console.log(res.data);
          that.setData({
            now:res.data.now
          })
        }
      })
      
  },
  onLoad:function(options){
    this.getWeather();
  },
})
