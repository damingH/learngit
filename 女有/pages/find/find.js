var count = 0;
var power=0;
var totalCount = 3600000;
Page({
  data: {
    disabled:true,
    sliderDisabled: true,
    a: null,
    countTimer: null, // 设置 定时器 初始为null
    rub:false,
    fight:false,
  },
  //  倒计时
  onLoad: function () {
    this.drawMinute();
    var that = this;
    setInterval(function () {
      if ((count - 60000) > 0) {
        count -= 60000;
        that.countInterval();
        that.setData({
        time: "00" + new Date(count).toString().substr(18, 3)
        })
      }
      else if ((count - 60000) <= 0) {
        count = 0;
        that.countInterval();
        that.setData({
          time: '   ',
          rub: false,
          fight: false,
          disabled: true,
          sliderDisabled: true,
          sliderValue:0,
        })
        clearInterval();
      }
    }, 60000)
  },
  // 设置一开始的时间
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
    var myDate = new Date("1970/01/01 " + e.detail.value + ":00");
    count = myDate.getMinutes() * 60 * 1000; //获取当前分钟数(0-59)
    if (count == 0) {
      this.setData({
        time: ''
      })
    }
    this.countInterval();
  },
// 设置一开始的刻度盘
  drawMinute:function(num1,num2){
    var context = wx.createCanvasContext('canvasProgressBg');
    for (var i = 0; i < 60; i++) {
      context.save();
      context.beginPath();
      context.translate(110, 110);
      context.rotate(i * 6 * Math.PI / 180);
      context.setLineWidth(3);
      context.setStrokeStyle('#fff');
      context.moveTo(0, -95);
      context.lineTo(0, -105);
      context.stroke();
      context.closePath();
      context.restore();
    }
    for (var n = 0; n < 1; n++) {
      context.save();
      context.beginPath();
      context.translate(110, 110);
      context.rotate(n * 90 * Math.PI / 180);
      context.setLineWidth(3);
      context.setStrokeStyle('#fff');
      context.moveTo(0, -85);
      context.lineTo(0, -105);
      context.stroke();
      context.closePath();
      context.restore();
    }
    context.setLineCap('round')
    context.stroke();
    context.draw();
  },
  // 
  drawCircle: function (step) {
    var context = wx.createCanvasContext('canvasProgress');
    // 参数step 为绘制的圆环周长，从0到2为一周 。 -Math.PI / 2 将起始角设在12点钟位置 ，结束角 通过改变 step 的值确定
    if (step != 0) {
      for (var j = 0; j <= (count / 60000); j++) {
        context.save();
        context.beginPath();
        context.translate(110, 110);
        context.rotate(j * 6 * Math.PI / 180);
        context.setLineWidth(3);
        context.setStrokeStyle('#f3715c');
        context.moveTo(0, -95);
        context.lineTo(0, -105);
        context.stroke();
        //  context.draw();
        context.closePath();
         context.restore();
        //  context.arc(110, 110, 100, - Math.PI / 2, 2 * step * Math.PI - Math.PI / 2, false);
      }
      for (var n = 0; n < 1; n++) {
        context.save();
        context.beginPath();
        context.translate(110, 110);
        context.rotate(n * 90 * Math.PI / 180);
        context.setLineWidth(3);
        context.setStrokeStyle('#f3715c');
        context.moveTo(0, -85);
        context.lineTo(0, -105);
        context.stroke();
        context.closePath();
        context.restore();
      }
    }
    // else if (step = 0) { context.arc(110, 110, 100, 0, false); }
     context.setLineCap('round')
     context.stroke();
     context.draw();
  },
  // 根据倒计时画圆
  countInterval: function () {
    if (count >= 0) {
      this.setData({
        a: count
      })
      countTimer: {
        if (this.data.a <= 3600000) {
          this.drawCircle(this.data.a / totalCount)
          // console.log(this.data.a / totalCount)
        }
      }
    }
  },
  // 力度选择
   slider1change:function(e){
     var power = e.detail.value;
     // var context = wx.createCanvasContext('canvasSlider');
     this.setData({
       // blockSize: 40,
       sliderValue: e.detail.value,
      //  left: e.detail.value*10
     })
     // context.fillText(e.detail.value);
     // context.setFillStyle('red');
     console.log(e.detail.value);
   },

  // 左图标点击事件
  onRubTap:function(event){
    this.setData({
      disabled:false,
      sliderDisabled: false,
      rub:true,
      fight:false
    });
  },
  // 右图标点击事件
  onFightTap: function (event) {
    this.setData({
      disabled:false,
      sliderDisabled: false,
      fight: true,
      rub:false
    })
  },
  showModal: function (sliderDisabled) {
    if (sliderDisabled){
      wx.showModal({
        title: '请先选择下面的模式,再选择相应的时间和力度',
        showCancel:false
        // duration: 2000,
        // icon:"none"
      })
    }
   },

  onReady: function () {
    var that = this;
    var sliderDisabled = that.data.sliderDisabled;
    setTimeout(function(){
      that.showModal(sliderDisabled);
    },1000)
  },
})