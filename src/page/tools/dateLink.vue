<!-- 开票日历 -->
<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col col-md-12 col-sm-12">
        <div class="row" style='padding-top:10px'>
          <div class="col col-md-12 col-sm-12 text-left" style='padding:0px'>
            工具><span style='color:#999;font-size:12px'>开票日历</span>
          </div>
        </div>
        <div class="row" style='background-color:white;padding-top:30px 0px 100px 0px;font-size:20px;min-height:700px' :style="{height:rowHeight-175+'px'}">
          <div class="col col-md-6 col-sm-6 col-md-offset-3 col-sm-offset-3">
            <div class="row">
              <div class="col col-md-12 col-sm-12 text-center" style='font-size:16px'>
                <ul class='tab-nav'>
                  <li :class="[naviIndex==1?'tab-border':'']">
                    <span class='pointers' @click="naviSwitch(1)">电票（一年）</span>
                  </li>
                  <li :class="[naviIndex==0?'tab-border':'']">
                    <span class='pointers' @click="naviSwitch(0)">电票（半年）</span>
                  </li>
                  <li :class="[naviIndex==2?'tab-border':'']">
                    <span class='pointers' @click="naviSwitch(2)">纸票</span>
                  </li>
                </ul>
              </div>
            </div>
            <el-row :gutter='12' style='padding:50px'>
              <el-col>
                <el-row>
                  <el-col :span='8' style='text-align:left'>
                    <span @click='switchMonth(0)'> <img src="../../assets/left.png" class='pointers' alt=""></span>
                  </el-col>
                  <el-col :span='8' style='text-align:center;color:#1777f5'>
                    {{calDate.year}}-{{calDate.month}}
                  </el-col>
                  <el-col :span='8' style='text-align:right'>
                    <span @click='switchMonth(1)'><img src="../../assets/right.png" class='pointers' alt=""></span>
                  </el-col>
                </el-row>
                <el-row type='flex' style='padding-top:40px'>
                  <el-col :span='4' v-for="(day, index) in calendar.days" :key="day">
                    <label style='color:#9faec3;font-weight:bold'>{{day}}</label>
                  </el-col>
                </el-row>
                <el-row type='flex' v-for="(week, index) in calendar.weeks" style='padding-top:2px'>
                  <el-col :span='4' v-for="(day, index) in week" :key="index">
                    <div :class="[realDate.year == calDate.year && realDate.month == calDate.month && realDate.day === day[0]?'single-cell':'']">
                      <el-row style='padding:0px;margin:0px'>
                        <el-col style='padding:0px'>
                          <label :class="[index == 5 ||index == 6 ? 'greyColor' : '' ]">
                                    {{day[0]==0?'':day[0]}}
                                  </label>
                          <label v-if="day[2] && day[2].delay" class="delay"> {{day[2].delay}} </label>
                        </el-col>
                      </el-row>
                      <el-row style='padding:0px;margin:0px'>
                        <el-col style='padding:0px'>
                          <label class="daysClassValue" :class="[realDate.year == calDate.year && realDate.month == calDate.month && realDate.day === day[0] ? 'colorFFF' : '' ]">{{ day[2] && ( day[2].days == '周末' ?  '' : day[2].days) }}</label>
                        </el-col>
                      </el-row>
                    </div>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    monthdayscalendar
  } from '../../lib/calindar.js'
  export default {
    name: 'kprlManage',
    data() {
      return {
        isloadFilish: false, // 是否加载完成， 加载成功后再渲染页面
        calendar: '',
        rowHeight: 0,
        // 真正日期
        realDate: {
          year: '',
          month: '',
          day: ''
        },
        // 日历显示的日期
        calDate: {
          year: '',
          month: '',
          day: '01'
        },
        naviIndex: 1,
        billType: 'electronic', // 票据类型
        duration: 'whole', // half: 半年期 whole: 一年期
        dueDateTip: [],
        activeName: 'first'
      }
    },
    mounted() {
      self = this
      this.rowHeight = this.$parent.$data.height;
      self.initDate();
      self.getCalendarDataAjax();
    },
    methods: {
      /**
       * 初始化日期
       */
      initDate() {
        let nowDate = new Date()
        self.realDate.year = nowDate.getFullYear()
        self.realDate.month = nowDate.getMonth() + 1
        self.realDate.day = nowDate.getDate()
        self.calDate.year = self.realDate.year
        self.calDate.month = self.realDate.month
      },
      /**
       * 获取日期数据
       */
      getCalendarDataAjax() {
        let self = this;
        var params = '?billType=' + self.billType;
        params += '&duration=' + self.duration;
        params += '&month=' + self.calDate.year + '-' + self.calDate.month + '-01';
        this.isloadFilish = false;
        this.$http.get('/dingtalk/tools/getMonthDay' + params).then(res => {
          self.dueDateTip = [];
          monthdayscalendar(self.calDate, res.data.data, function(ress) {
            self.isloadFilish = true
            self.calendar = ress.calendar
          })
        })
      },
      /**
       * 页面导航切换
       * @index 导航索引
       */
      naviSwitch(index) {
        self.naviIndex = index
        if (index == 0) {
          self.billType = 'electronic'
          self.duration = 'half'
        } else if (index == 1) {
          self.billType = 'electronic'
          self.duration = 'whole'
        } else if (index == 2) {
          self.billType = 'paper'
          self.duration = 'half'
        }
        self.getCalendarDataAjax()
      },
      tabClick() {
      },
      /**
       *  年月切换
       *  @flag 0:premonth， 1:nextmonth
       */
      switchMonth(flag) {
        let month = '',
          year_diff = ''
        if (flag == 0) {
          month = (self.calDate.month - 1)
          year_diff = (month == 0) ? -1 : 0
          month = (month == 0) ? 12 : month
        } else {
          year_diff = parseInt(self.calDate.month / 12)
          month = (self.calDate.month + 1)
          month = (self.calDate.month % 12) + 1
        }
        self.calDate.year = self.calDate.year + year_diff
        self.calDate.month = month
        self.getCalendarDataAjax()
      }
    }
  }
</script>

<style scoped>
  .colorFFF {
    color: #ffffff!important;
  }
  .greyColor {
    color: #9faec3;
  }
  .bgPress {
    width: 94px;
    height: 94px;
    ;
    margin: 0 auto;
    background-color: #38ADFF;
    color: #fff;
    border-radius: 47px;
  }
  .daysClassValue {
    text-align: center;
    font-size: 12px;
    padding: 0 0;
    color: #999;
  }
  .delay {
    position: absolute;
    border-radius: 10px;
    top: -5px;
    height: 20px;
    width: 20px;
    right: -5px;
    /*label-align: center;*/
    font-size: 12px;
    color: white;
    background-color: #38ADFF;
    z-index: 999;
  }
  .tab-nav {
    list-style: none;
    display: flex;
    width: 100%;
    flex: 3;
    padding: 10px;
  }
  .tab-nav li {
    float: left;
    flex: 1;
    line-height: 30px;
    font-size: 15px;
    text-align: center;
    border-bottom: solid 2px #ddd;
  }
  .pointers {
    cursor: pointer;
  }
  label {
    font-weight: 500
  }
  .single-cell {
    background-color: #1777f5;
    color: white;
    font-size: 20px;
    border-radius: 20px;
  }
  .tab-border {
    border-bottom: solid 2px #3497ff!important;
    color: #3497ff;
  }
</style>
