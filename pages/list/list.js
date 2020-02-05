const dayMap = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
Page({
  data: {
    weekWeather: [1,2,3,4,5,6,7]
  },
  onPullDownRefresh() {
    this.getWeekWeather(() => {
      wx.stopPullDownRefresh()
    })
  },
  onLoad() {
    this.getWeekWeather()
  },
  getWeekWeather(callback) {
    wx.request({
      url: 'https://test-miniprogram.com/api/weather/future', //仅为示例，并非真实的接口地址
      data: {
        time: new Date().getTime(),
        city: '深圳市'
      },
      success: res => {
        console.log(res.data)
        let result = res.data.result
        this.setWeekWeather(result)
      },
      complete: () => {
        callback && callback()
      }
    })
  },
  setWeekWeather(result) {
    let weekWeather = []
    for (let i = 0; i < 7; i++) {
      let date = new Date()
      date.setDate(date.getDate() + i)
      weekWeather.push({
        day: dayMap[date.getDay()],
        date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
        temp: `${result[i].minTemp}° - ${result[i].maxTemp}°`,
        iconPath: '/images/' + result[i].weather + '-icon.png'
      })
    }
    weekWeather[0].day='今天'
    this.setData({
      weekWeather: weekWeather
    })
  }
})