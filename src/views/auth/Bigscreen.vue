<template>
  <div class="wrap">
    <div class="big-screen">
      <!-- 头部信息 -->
      <div class="top-bg">
        <span class="headline">新媒体大屏统计分析</span>
      </div>
      <el-row :gutter="10" class="content">
        <!-- 左侧栏 -->
        <el-col :xs="7"
                :sm="7"
                :md="7"
                :lg="7"
                :xl="7"
                class="left">
          <div class="grid-content bg-purple">
            <div class="top-num">
              <div class="wb-fans top-box">
                <div>
                  <p class="name">微博粉丝数</p>
                  <p class="num"
                     v-text="this.wbFans"></p>
                </div>
              </div>
              <div class="wx-follow top-box">
                <div>
                  <p class="name">微信已关注用户数</p>
                  <p class="num"
                     v-text="this.wxFans"></p>
                </div>
              </div>
            </div>
            <!-- 区排行榜图表 -->
            <div class="area-article area-rank">
              <p class="tab-title">
                <span @click="titleTabs(true)"
                      class="district"
                      :class="areaRank?'title-active':''">区排行榜</span>
                <span @click="titleTabs(false)"
                      class="hot-article"
                      :class="areaRank?'':'title-active'">热门文章排行榜</span>
              </p>
              <div id="area-tuxing"
                   class="article-content region-rank"
                   v-if="areaRank">
                <p class="article-top">
                  <span style="width:10%;text-align: left;">排名</span>
                  <span class="list-name">单位名称</span>
                  <span style="width:12%;text-align: left;">微信</span>
                  <span style="width:12%;text-align: left;">微博</span>
                  <span style="width:12%;text-align: left;">头条</span>
                  <span style="width:12%;text-align: left;">抖音</span>
                  <span style="width:12%;text-align: left;">总分</span>
                </p>
                <div id="area-article"
                     class="tubiao-size">
                  <ul class="new-list"
                      :class="{anim:animateRank}"
                      @mouseenter="StopRank()"
                      @mouseleave="UpRank()">
                    <li v-for="(item,index) in att"
                        :key="index"
                        class="show-article">
                      <span style="width:10%;text-align: left;">{{item.num}}</span>
                      <span class="list-name">{{item.name}}</span>
                      <span style="width:12%;text-align: left;">{{item.wx}}</span>
                      <span style="width:12%;text-align: left;">{{item.wb}}</span>
                      <span style="width:12%;text-align: left;">{{item.tt}}</span>
                      <span style="width:12%;text-align: left;">{{item.dy}}</span>
                      <span style="width:12%;text-align: left;">{{item.total}}</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div id="area-tuxing"
                   class="article-content"
                   v-else>
                <p class="article-top">
                  <span style="width:10%;text-align: left;">排名</span>
                  <span style="width:15%;text-align: left;">渠道</span>
                  <span class="company">文章标题</span>
                  <span style="width:15%;text-align: center;">热度</span>
                </p>
                <div id="area-article"
                     class="tubiao-size">
                  <ul class="new-list"
                      :class="{anim:animateHot}"
                      @mouseenter="StopHot()"
                      @mouseleave="UpHot()">
                    <li v-for="(item,index) in arr"
                        :key="index"
                        class="show-article">
                      <span style="width:10%;text-align: left;">{{item.num}}</span>
                      <span v-if="item.source===1"
                            style="width:15%;text-align: left;">微信</span>
                      <span v-if="item.source===2"
                            style="width:15%;text-align: left;">微博</span>
                      <span v-if="item.source===4"
                            style="width:15%;text-align: left;">头条</span>
                      <span v-if="item.source===5"
                            style="width:15%;text-align: left;">抖音</span>
                      <span @click="activeWeb(item)"
                            class="company">{{item.title}}</span>
                      <span style="width:15%;text-align: center;">{{item.hotnum}}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <!-- 阅读量趋势 -->
            <div class="area-rank fine area-article">
              <p class="title">
                近一周阅读量趋势
              </p>
              <div id="area-fine-tuxing"
                   class="tuxing-size"
                   @mouseenter="enter()"
                   @mouseleave="leave()"></div>
            </div>
          </div>
        </el-col>
        <!-- 中心 -->
        <el-col :xs="10"
                :sm="10"
                :md="10"
                :lg="10"
                :xl="10"
                class="center">
          <div class="grid-content bg-purple-light">
            <div class="center-btn">
              <el-button v-for="(item, i) in this.regionData"
                         :key="i"
                         size="small"
                         :class="[idx === i ? 'btn-success' : '']"
                         @click="getCityData(item,i)">{{item.name}}</el-button>
            </div>
            <div id="map-beijing"
                 class="center-size"></div>
            <div class="center-abs"
                 :class="cityShow?'':'dis-none'">
              <p>
                <span class="center-abs-title">名称:</span>
                <span v-text="this.getData.name"
                      class="center-abs-name"></span>
              </p>
              <div v-if="this.articleType===1">
                <p>
                  <span class="center-abs-title">数据源:</span>
                  <span>微信</span>
                </p>
                <p>
                  <span class="center-abs-title">阅读数:</span>
                  <span v-text="this.getData.wxRead"></span>
                </p>
                <p>
                  <span class="center-abs-title">点赞数:</span>
                  <span v-text="this.getData.wxDianzan"></span>
                </p>
              </div>
              <div v-if="this.articleType===2">
                <p>
                  <span class="center-abs-title">数据源:</span>
                  <span>微博</span>
                </p>
                <p>
                  <span class="center-abs-title">点赞数:</span>
                  <span v-text="this.getData.wbDianzan"></span>
                </p>
                <p>
                  <span class="center-abs-title">评论数:</span>
                  <span v-text="this.getData.wbPinglun"></span>
                </p>
                <p>
                  <span class="center-abs-title">转发数:</span>
                  <span v-text="this.getData.wbZhuanfa"></span>
                </p>
              </div>
              <div v-if="this.articleType===3">
                <p>
                  <span class="center-abs-title">数据源:</span>
                  <span>今日头条</span>
                </p>
                <p>
                  <span class="center-abs-title">阅读数:</span>
                  <span v-text="this.getData.jrttRead"></span>
                </p>
                <p>
                  <span class="center-abs-title">评论数:</span>
                  <span v-text="this.getData.jrttPinglun"></span>
                </p>
                <p>
                  <span class="center-abs-title">转发数:</span>
                  <span v-text="this.getData.jrttZhuanfa"></span>
                </p>
              </div>
              <div v-if="this.articleType===4">
                <p>
                  <span class="center-abs-title">数据源:</span>
                  <span>抖音</span>
                </p>
                <p>
                  <span class="center-abs-title">点赞数:</span>
                  <span v-text="this.getData.dyDianzan"></span>
                </p>
                <p>
                  <span class="center-abs-title">评论数:</span>
                  <span v-text="this.getData.dyPinglun"></span>
                </p>
                <p>
                  <span class="center-abs-title">转发数:</span>
                  <span v-text="this.getData.dyZhuanfa"></span>
                </p>
              </div>
            </div>
          </div>
        </el-col>
        <!-- 右侧栏 -->
        <el-col :xs="7"
                :sm="7"
                :md="7"
                :lg="7"
                :xl="7"
                class="right">
          <div class="grid-content bg-purple">
            <div class="top-num">
              <div class="wb-fans top-box">
                <div>
                  <p class="name">近一月文章发布条数</p>
                  <p class="num"
                     v-text="this.totalPublish"></p>
                </div>
              </div>
            </div>
            <!-- 文章列表 -->
            <div class="area-article">
              <div class="title-tabs"
                   @mouseenter="StopList()"
                   @mouseleave="UpList()">
                <span @click="checkdTab(1)"
                      :class="wxActive?'aricle-active':''"> <img :src="require('@/assets/images/wx.png')"> 微信</span>
                <span @click="checkdTab(2)"
                      :class="wbActive?'aricle-active':''"><img :src="require('@/assets/images/wb.png')">微博</span>
                <span @click="checkdTab(3)"
                      :class="tdActive?'aricle-active':''"><img :src="require('@/assets/images/tt.png')">今日头条</span>
                <span @click="checkdTab(4)"
                      :class="dyActive?'aricle-active':''"><img :src="require('@/assets/images/dy.png')">抖音</span>
              </div>
              <div class="article-content">
                <p class="article-top">
                  <span class="new-company"
                        v-text="this.typeof"></span>
                  <span style="width:13%;text-align: left;">阅读量</span>
                </p>
                <div id="area-article"
                     class="tubiao-size">
                  <ul class="new-list"
                      :class="{anim:animateList}"
                      @mouseenter="StopList()"
                      @mouseleave="UpList()">
                    <li v-for="(item,index) in ayy"
                        :key="index"
                        class="show-article">
                      <span @click="activeWeb(item)"
                            class="new-company"
                            v-text="item.title"></span>
                      <span style="width:13%;text-align: center;">{{item.readNum}}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <!-- 优秀作品展示 -->
            <div class="area-article fine area-rank">
              <p class="title">
                最新短视频展示
              </p>
              <div class="tuxing-fine article-content"
                   ref="element">
                <div class="element-content">
                  <el-carousel indicator-position="none"
                               :autoplay="true"
                               :interval="5000"
                               :height="imgHeight">
                    <el-carousel-item v-for="(item,index) in images"
                                      :key="index">
                      <img :src="item.coverUrl"
                           alt="123"
                           class="fine-img"
                           ref="imgHeight"
                           @click="routerWeb(item)">
                      <img :src="require('@/assets/images/text/autoPlay.png')"
                           @click="routerWeb(item)"
                           class="center-img">
                    </el-carousel-item>
                  </el-carousel>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts/lib/echarts' // echarts
import 'echarts/map/js/province/beijing.js'
// import 'echarts-gl' // 3D地图插件
import 'echarts/lib/component/visualMap'
import 'echarts/lib/component/title'
require('echarts/lib/chart/map')
require('echarts/lib/chart/bar')
require('echarts/lib/chart/pie')
require('echarts/lib/chart/line')
require('echarts/lib/component/tooltip')
// echarts.registerMap('beijing', beijing)
export default {
  name: 'Bigscreen',
  data () {
    return {
      departmentName: '',
      idx: null,
      imgHeight: '',
      colum: 1,
      wxActive: true,
      wbActive: false,
      dyActive: false,
      tdActive: false,
      areaRank: true,
      cityIndex: 0,
      cityData: null, // 地区地址定时器
      cityShow: false, // 地区地址定时器
      getData: '', // 地区数据
      regions: [],
      region: '海淀区', // 地区字段
      regionData: [], // 地区数据
      // 热门文章排行榜
      arr: [],
      articleType: 1,
      // 区排行榜
      att: [],
      typeof: '',
      // 文章列表
      ayy: [],
      images: [
      ],
      height: '',
      totalPublish: '', // 总文章发布数
      wxFans: '', // 微信粉丝数
      wbFans: '', // 微博粉丝数
      animateHot: false, // 热门文章排行榜类名设置
      animateList: false, // 区排行榜类名设置
      animateRank: false, // 文章列表类名设置
      intNumHot: null, // 热门文章排行榜定时器
      intNumList: null, // 区排行榜定时器
      intNumRank: null, // 文章列表定时器
      fhourTime: null, // 地图定时器
      timer: '', //  阅读量定时器
      option: {}, // 阅读量数据图表
      faultByHourIndex: '', // 阅读量播放所在下标
      mapData: [],
      lineChart: {}, // 阅读量数据

      monitor: {}, // 地图数据
      mapTimer: '', // 地图定时器
      mapOption: {}, // 地图数据图表
      mapIndex: '' // 地图播放所在下标
    }
  },
  methods: {
    // 地图
    monitorMap () {
      window.clearInterval(this.fhourTime)
      this.fhourTime = null
      let monitorMap = echarts.init(document.getElementById('map-beijing'))
      this.$http.get(this.$api.regions, { params: { id: this.articleType } })
        .then(res => {
          if (res.data.data) {
            this.regions = res.data.data
            let maxValue = []
            this.regions.forEach(item => {
              if (item.wxRead) {
                item.value = item.wxRead
                maxValue.push(item.wxRead)
              } else if (item.wbDianzan) {
                item.value = item.wbDianzan
                maxValue.push(item.wbDianzan)
              } else if (item.jrttRead) {
                item.value = item.jrttRead
                maxValue.push(item.jrttRead)
              } else if (item.dyDianzan) {
                item.value = item.dyDianzan
                maxValue.push(item.dyDianzan)
              }
            })
            let option = {
              title: {
                text: '北京市传播统计',
                left: 'right',
                top: '5%',
                textStyle: {
                  color: '#fff',
                  fontSize: 25
                }
              },
              tooltip: {
                show: true,
                backgroundColor: 'rgba(0,0,0,.8)',
                textStyle: {
                  color: '#00ceff',
                  decoration: 'none',
                  fontFamily: 'Verdana, sans-serif',
                  fontSize: 25,
                  fontWeight: 'bold'
                },
                formatter: function (params, ticket, callback) {
                  if (params.data.wxRead) {
                    return '地区名：' + params.data.name +
                      '<br/>' + '数据源：微信' + '<br/>' + '阅读数：' + params.data.wxRead + '<br/>' + '点赞数：' + params.data.wxDianzan
                  } else if (params.data.wbDianzan) {
                    return '地区名：' + params.data.name +
                      '<br/>' + '数据源：微博' + '<br/>' + '点赞数：' + params.data.wbDianzan + '<br/>' + '评论数：' + params.data.wbPinglun + '<br/>' + '转发数：' + params.data.wbZhuanfa
                  } else if (params.data.jrttRead) {
                    return '地区名：' + params.data.name +
                      '<br/>' + '数据源：今日头条' + '<br/>' + '阅读数：' + params.data.jrttRead + '<br/>' + '评论数：' + params.data.jrttPinglun + '<br/>' + '转发数：' + params.data.jrttZhuanfa
                  } else if (params.data.dyDianzan) {
                    return '地区名：' + params.data.name +
                      '<br/>' + '数据源：抖音' + '<br/>' + '点赞数：' + params.data.dyDianzan + '<br/>' + '评论数：' + params.data.dyPinglun + '<br/>' + '转发数：' + params.data.dyZhuanfa
                  }
                }
              },
              grid: {
                x: 20,
                y: '3%'
              },
              visualMap: {
                min: 0,
                max: Math.max.apply(null, maxValue),
                show: true,
                left: 'left',
                top: 'top',
                textStyle: {
                  color: '#fff'
                },
                text: ['高', '低'], // 文本，默认为数值文本
                calculable: true,
                inRange: {
                  // color: ['#a9f1fb', '#00ceff', '#0192f8']
                  color: ['lightskyblue', 'yellow', 'orangered']
                }
              },
              series: [
                {
                  type: 'map',
                  name: '北京市',
                  layoutCenter: ['50%', '50%'],
                  layoutSize: '100%',
                  selectedMode: 'single', // 地图高亮单选
                  data: this.regions,
                  map: '北京',
                  label: {
                    show: true, // 是否显示市
                    textStyle: {
                      color: '#333', // 文字颜色
                      fontWeight: 500,
                      fontSize: 20, // 文字大小
                      backgroundColor: 'rgba(0,0,0,0)' // 透明度0清空文字背景
                    }
                  },
                  itemStyle: {
                    areaStyle: {
                      color: '#f3f3f3' // 默认的地图板块颜色
                    },
                    normal: {
                      borderWidth: 0.5, // 区域边框宽度
                      borderColor: '#fff', // 区域边框颜色
                      areaColor: '#0a89e2' // 区域颜色
                    },
                    emphasis: {
                      borderWidth: 0.5,
                      borderColor: '#fff',
                      areaColor: '#0cf5c6'
                    }
                  }
                }
              ]
            }
            this.mapOption = option
            this.monitor = monitorMap
            monitorMap.setOption(option)
            window.addEventListener('resize', function () {
              monitorMap.resize()
            })
            let than = this
            var hourIndex = 0
            monitorMap.on('click', function (e) {
              window.clearInterval(than.fhourTime)
              than.fhourTime = null
              than.region = e.name
              than.idx = null
              than.cityShow = false
              than.departmentName = than.region
              than.linkageFans()
              than.linkageTotal()
              than.getarticle()
            })
            // 地图定义轮播
            if (!than.fhourTime) {
              than.fhourTime = setInterval(function () {
                monitorMap.dispatchAction({
                  type: 'downplay',
                  seriesIndex: 0
                })
                monitorMap.dispatchAction({
                  type: 'highlight',
                  seriesIndex: 0,
                  dataIndex: hourIndex
                })
                monitorMap.dispatchAction({
                  type: 'showTip',
                  seriesIndex: 0,
                  dataIndex: hourIndex
                })

                if (than.regions[hourIndex]) {
                  than.region = than.regions[hourIndex].name
                  than.getarticle()
                }
                hourIndex++
                if (hourIndex === than.regions.length) {
                  hourIndex = 0
                }
              }, 10000)
            }
            // 鼠标移入停止轮播
            monitorMap.on('mousemove', function (e) {
              clearInterval(than.fhourTime)
              than.fhourTime = null
              monitorMap.dispatchAction({
                type: 'downplay',
                seriesIndex: 0
              })
              monitorMap.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: e.dataIndex
              })
              monitorMap.dispatchAction({
                type: 'showTip',
                seriesIndex: 0,
                dataIndex: e.dataIndex
              })
            })
            // 鼠标移出恢复轮播
            monitorMap.on('mouseout', function () {
              if (!than.fhourTime) {
                than.fhourTime = setInterval(function () {
                  than.cityShow = false
                  monitorMap.dispatchAction({
                    type: 'downplay',
                    seriesIndex: 0
                  })
                  monitorMap.dispatchAction({
                    type: 'highlight',
                    seriesIndex: 0,
                    dataIndex: hourIndex
                  })
                  monitorMap.dispatchAction({
                    type: 'showTip',
                    seriesIndex: 0,
                    dataIndex: hourIndex
                  })

                  if (than.regions[hourIndex]) {
                    than.region = than.regions[hourIndex].name
                    than.getarticle()
                  }
                  hourIndex++
                  if (hourIndex === than.regions.length) {
                    hourIndex = 0
                  }
                }, 10000)
              }
            })
          }
        })
        .catch(() => {
        })
    },
    // 阅读量趋势
    drawLine () {
      let lineChart = echarts.init(document.getElementById('area-fine-tuxing'))
      this.$http.get(this.$api.channelsDayReadSum)
        .then(res => {
          if (res.data.data) {
            let data = []
            let lineData1 = []
            let lineData2 = []
            let lineData3 = []
            let lineData4 = []
            res.data.data.dy.forEach(item => {
              data.unshift(item.day)
              lineData1.unshift(item.sum)
            })
            res.data.data.wx.forEach(item => {
              lineData2.unshift(item.sum)
            })
            res.data.data.wb.forEach(item => {
              lineData3.unshift(item.sum)
            })
            res.data.data.tt.forEach(item => {
              lineData4.unshift(item.sum)
            })
            let option = {
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  lineStyle: {
                    color: '#57617B'
                  }
                },
                textStyle: {
                  color: '#fff',
                  decoration: 'none',
                  fontFamily: 'Verdana, sans-serif',
                  fontSize: 20
                }
                // trigger: 'axis',
                // formatter: '{b0}<br/>{a0}: {c0}%<br />'
              },
              legend: {
                y: 'top',
                top: '4%',
                textStyle: { // 图例文字的样式
                  color: '#fff',
                  fontSize: 20
                },
                itemWidth: 20,
                itemHeight: 20,
                data: ['微信', '微博', '头条', '抖音']
              },
              grid: {
                left: '3%',
                right: '6%',
                bottom: '3%',
                containLabel: true
              },

              toolbox: {
                feature: {
                  saveAsImage: {}
                }
              },
              xAxis: {
                type: 'category',
                axisLabel: {
                  show: true,
                  textStyle: {
                    fontSize: 20,
                    color: '#DCE8B8' // X轴文字颜色
                  }
                },
                boundaryGap: false,
                axisTick: { // 刻度
                  'show': false
                },
                axisLine: { // 线
                  'show': true
                },
                splitLine: {
                  'show': false // 网格线
                },
                data: data
              },
              yAxis: {
                type: 'value',
                axisLabel: {
                  show: true,
                  textStyle: {
                    fontSize: 20,
                    color: '#DCE8B8' // X轴文字颜色
                  },
                  interval: 'auto',
                  formatter: '{value}'
                },
                axisTick: { // 刻度
                  'show': false
                },
                axisLine: { // 线
                  'show': true
                },
                splitLine: {
                  'show': true // 网格线
                }
              },
              series: [{
                name: '微信',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                lineStyle: {
                  normal: {
                    width: 3
                  }
                },
                areaStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 0,
                      color: 'rgba(137, 189, 27, 0.6)'
                    }, {
                      offset: 0.8,
                      color: 'rgba(137, 189, 27, 0)'
                    }], false),
                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                    shadowBlur: 10
                  }
                },
                itemStyle: {
                  normal: {
                    color: 'rgb(137,189,27)',
                    borderColor: 'rgba(137,189,2,0.27)',
                    borderWidth: 12

                  }
                },
                data: lineData2
              }, {
                name: '微博',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                lineStyle: {
                  normal: {
                    width: 3
                  }
                },
                areaStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 0,
                      color: 'rgba(0, 136, 212, 0.6)'
                    }, {
                      offset: 0.8,
                      color: 'rgba(0, 136, 212, 0)'
                    }], false),
                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                    shadowBlur: 10
                  }
                },
                itemStyle: {
                  normal: {
                    color: 'rgb(0,136,212)',
                    borderColor: 'rgba(0,136,212,0.2)',
                    borderWidth: 12

                  }
                },
                data: lineData3
              }, {
                name: '头条',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                lineStyle: {
                  normal: {
                    width: 3
                  }
                },
                areaStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 0,
                      color: 'rgba(219, 50, 51, 0.6)'
                    }, {
                      offset: 0.8,
                      color: 'rgba(219, 50, 51, 0)'
                    }], false),
                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                    shadowBlur: 10
                  }
                },
                itemStyle: {
                  normal: {

                    color: 'rgb(219,50,51)',
                    borderColor: 'rgba(219,50,51,0.2)',
                    borderWidth: 12
                  }
                },
                data: lineData4
              }, {
                name: '抖音',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                lineStyle: {
                  normal: {
                    width: 3
                  }
                },
                areaStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 0,
                      color: 'rgba(219, 50, 255, 0.6)'
                    }, {
                      offset: 0.8,
                      color: 'rgba(219, 50, 255, 0)'
                    }], false),
                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                    shadowBlur: 10
                  }
                },
                itemStyle: {
                  normal: {

                    color: 'rgb(219,50,255)',
                    borderColor: 'rgba(219,50,255,0.2)',
                    borderWidth: 12
                  }
                },
                data: lineData1
              }]
            }
            this.option = option
            this.lineChart = lineChart
            lineChart.setOption(option)
            window.addEventListener('resize', function () {
              lineChart.resize()
            })
            this.leave()
          }
        })
        .catch(() => {
        })
    },
    // 鼠标移出
    leave () {
      this.timer && clearInterval(this.timer)// 清除定时器
      this.faultByHourIndex = 0 // 播放所在下标
      this.timer = setInterval(() => { // 使得tootip每隔三秒自动显示
        this.lineChart.dispatchAction({
          type: 'showTip', // 根据 tooltip 的配置项显示提示框。
          seriesIndex: 0,
          dataIndex: this.faultByHourIndex
        })
        this.faultByHourIndex++
        if (this.faultByHourIndex >= this.option.series[0].data.length) {
          this.faultByHourIndex = 0
        }
      }, 3000)
    },
    // 鼠标移入
    enter () {
      this.timer && clearInterval(this.timer)// 清除定时器
    },
    // 热门文章数据
    gethotArticles () {
      this.$http.get(this.$api.hotArticles)
        .then(res => {
          if (res.data.data) {
            this.arr = res.data.data
            this.ScrollHot()
          }
        })
        .catch(() => {
        })
    },
    // 热门文章
    ScrollHot () {
      if (this.arr.length > 10) {
        this.intNumHot = setInterval(() => {
          this.animateHot = true // 向上滚动的时候需要添加css3过渡动画
          setTimeout(() => {
            this.arr.push(this.arr[0]) // 将数组的第一个元素添加到数组的
            this.arr.shift() // 删除数组的第一个元素
            this.animateHot = false
          }, 500)
        }, 3000)
      }
    },
    // 区排行榜数据
    getDistrictRanking () {
      this.$http.get(this.$api.DistrictRanking)
        .then(res => {
          if (res.data.data) {
            this.att = res.data.data
            this.ScrollRank()
          }
        })
        .catch(() => {
        })
    },
    // 区排行榜
    ScrollRank () {
      if (this.att.length > 10) {
        this.intNumRank = setInterval(() => {
          this.animateRank = true // 向上滚动的时候需要添加css3过渡动画
          setTimeout(() => {
            this.att.push(this.att[0]) // 将数组的第一个元素添加到数组的
            this.att.shift() // 删除数组的第一个元素
            this.animateRank = false
          }, 500)
        }, 3000)
      }
    },
    // 模块切换
    checkdTab (type) {
      this.articleType = type
      if (!type) {
        type = 1
        this.articleType = 1
      }
      this.linkageFans()
      this.linkageTotal()
      this.monitorMap()
      this.getarticle()
    },
    // 地区文章数据获取
    getarticle () {
      this.StopList()
      var titles = ''
      var reg = /[\u4e00-\u9fa5]/g
      this.$http.get(this.$api.channelsLatestReadNum, { params: { id: this.articleType, region: this.region } })
        .then(res => {
          if (res.data.data) {
            this.ayy = res.data.data
            if (this.articleType === 1) {
              this.typeof = '微信最新文章列表'
              this.wxActive = true
              this.wbActive = false
              this.dyActive = false
              this.tdActive = false
            } else if (this.articleType === 2) {
              this.typeof = '微博最新文章列表'
              this.wxActive = false
              this.wbActive = true
              this.dyActive = false
              this.tdActive = false
            } else if (this.articleType === 3) {
              this.typeof = '头条最新文章列表'
              this.wxActive = false
              this.wbActive = false
              this.dyActive = false
              this.tdActive = true
            } else {
              this.typeof = '抖音最新文章列表'
              this.wxActive = false
              this.wbActive = false
              this.dyActive = true
              this.tdActive = false
            }
            this.ayy.forEach(item => {
              if (item.title) {
                titles = item.title.match(reg)
                item.title = titles.join('')
              } else {
                item.title = '转发微博'
              }
            })
            this.UpList()
          }
        })
        .catch(() => {
        })
    },
    // 文章列表
    ScrollList () {
      if (this.ayy.length > 10) {
        this.intNumList = setInterval(() => {
          this.animateList = true // 向上滚动的时候需要添加css3过渡动画
          setTimeout(() => {
            this.ayy.push(this.ayy[0]) // 将数组的第一个元素添加到数组的
            this.ayy.shift() // 删除数组的第一个元素
            this.animateList = false
          }, 500)
        }, 3000)
      }
    },
    // 鼠标移上去停止
    StopList () {
      clearInterval(this.intNumList)
      this.intNumList = null
    },
    UpList () {
      if (!this.intNumList) {
        this.ScrollList()
      }
    },
    // 鼠标移上去停止
    StopHot () {
      clearInterval(this.intNumHot)
    },
    UpHot () {
      this.ScrollHot()
    },
    // 鼠标移上去停止
    StopRank () {
      clearInterval(this.intNumRank)
    },
    UpRank () {
      this.ScrollRank()
    },
    // 三位数添加逗号
    appendNum (n) {
      var b = parseInt(n).toString()
      var len = b.length
      if (len <= 3) { return b }
      var r = len % 3
      return r > 0 ? b.slice(0, r) + ',' + b.slice(r, len).match(/\d{3}/g).join(',') : b.slice(r, len).match(/\d{3}/g).join(',')
    },
    // 微信微博联动数据
    linkageFans () {
      this.$http.get(this.$api.fans, { params: { unit: this.departmentName } })
        .then(res => {
          if (res.data.data) {
            this.wxFans = this.appendNum(res.data.data.wxFansNum)
            this.wbFans = this.appendNum(res.data.data.wbFansNum)
          }
        })
        .catch(() => {
        })
    },
    // 总文章发布联动数据
    linkageTotal () {
      this.$http.get(this.$api.totalPublish, { params: { unit: this.departmentName, type: this.articleType } })
        .then(res => {
          if (res.data.data) {
            this.totalPublish = this.appendNum(res.data.data.totalPublish)
          }
        })
        .catch(() => {
        })
    },
    // 微信微博粉丝关注数
    getFans () {
      this.$http.get(this.$api.fans)
        .then(res => {
          if (res.data.data) {
            this.wxFans = this.appendNum(res.data.data.wxFansNum)
            this.wbFans = this.appendNum(res.data.data.wbFansNum)
          }
        })
        .catch(() => {
        })
    },
    // 总文章发布数
    getTotalPublish () {
      this.$http.get(this.$api.totalPublish)
        .then(res => {
          if (res.data.data) {
            this.totalPublish = this.appendNum(res.data.data.totalPublish)
          }
        })
        .catch(() => {
        })
    },
    // 点击跳转
    routerWeb (item) {
      window.open(item.videoUrl, '_blank')
    },
    activeWeb (item) {
      window.open(item.url, '_blank')
    },
    // 优秀作品展示
    autoPlay () {
      this.$http.get(this.$api.displayExcellentWorks)
        .then(res => {
          if (res.data.data) {
            this.images = res.data.data
          }
        })
        .catch(() => {
        })
    },
    // 地区数据
    getCity () {
      if (this.cityData) {
        clearInterval(this.cityData)
        this.cityData = null
      }
      this.$http.get(this.$api.cityBehavioralData)
        .then(res => {
          if (res.data.data) {
            this.regionData = res.data.data
          }
        })
        .catch(() => {
        })
    },
    // 地区数据
    getCityData (item, i) {
      this.cityShow = true
      this.idx = i
      this.regionData.filter(arr => arr.name === item.name).forEach(getArr => {
        this.getData = getArr
        if (!this.getData.dyPinglun) {
          this.getData.dyPinglun = 0
        }
        if (!this.getData.dyZhuanfa) {
          this.getData.dyZhuanfa = 0
        }
        if (!this.getData.dyDianzan) {
          this.getData.dyDianzan = 0
        }
      })
      let id = ''
      if (this.articleType) {
        id = this.articleType
      } else {
        id = 1
      }
      this.departmentName = item.departmentName
      this.linkageFans()
      this.linkageTotal()
      this.$http.get(this.$api.cityHotArticles, { params: { id: id, name: item.departmentName } })
        .then(res => {
          if (res.data.data) {
            clearInterval(this.fhourTime)
            this.fhourTime = null
            this.ayy = res.data.data
            this.UpList()
          }
        })
        .catch(() => {
        })
    },
    titleTabs (type) {
      this.areaRank = !!type
    }
  },
  mounted () {
    // this.$once('hook:mounted', () => {
    //   clearInterval(this.fhourTime)
    //   clearInterval()
    //   this.fhourTime = null
    // })
    this.monitorMap()
    this.drawLine()
  },
  created () {
    this.gethotArticles() // 热门文章数据
    this.getDistrictRanking() // 区排行榜数据
    this.getarticle() // 最新文章
    this.ScrollList() // 文章列表动画触发
    this.ScrollRank() // 区排行榜动画触发
    this.ScrollHot() // 热门文章排行榜动画触发
    this.getCity() // 获取地区数据
    this.autoPlay() // 优秀作品展示
    this.getFans() // 获取粉丝数
    this.getTotalPublish() // 总文章发布数
  }
}
</script>
<style lang="scss">
@import 'login';
</style>
<style lang="scss" scoped>
.wrap {
  width: 100%;
  height: 100%;
}
.wrap::after {
  content: '';
  position: absolute;
  z-index: -1;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: url('../../assets/images/bigscreen.png') no-repeat fixed 50% 50% /
    cover;
}
.top-bg {
  background: url('../../assets/images/TOP_BG.png') no-repeat bottom center;
  background-size: 100% 100%;
  width: 100%;
  height: 9%;
  position: fixed;
}
.top-num {
  height: 10%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.right .top-num {
  height: 10%;
}
.top-box {
  background: url('../../assets/images/top-box.png') no-repeat bottom center;
  background-size: 100% 100%;
  width: 45%;
  height: 100%;
  // padding: 20px 0;
  box-sizing: border-box;
  display: flex;
  align-items: center; /*定义body的元素垂直居中*/
  justify-content: center; /*定义body的里的元素水平居中*/
}
.right .top-box {
  width: 80%;
}
.headline {
  display: block;
  color: aliceblue;
  font-size: 2vw;
  z-index: 6;
  text-align: center;
  margin: 1.2% 0 0 0;
  font-weight: bold;
}
.el-row {
  height: 100vh;
  padding: 4% 1% 1% 1%;
}
.el-col {
  border-radius: 4px;
  height: 100%;
}
.el-col .grid-content {
  height: 100%;
}
.top-box .name {
  color: #fff;
  font-size: 1vw;
  line-height: 2vw;
  text-align: center;
}
.top-box .num {
  color: #00ceff;
  font-size: 2vw;
  text-align: center;
  line-height: 2vw;
}
.right .top-box .num {
  line-height: 2vw;
}
.area-rank {
  height: 38%;
}
.area-article {
  height: 40%;
  overflow: hidden;
}
.fine {
  height: 50%;
}
.right .fine {
  padding-top: 0px;
}
.area-rank .title {
  color: #fff;
  font-size: 1vw;
  text-align: center;
  height: 3vw;
  line-height: 3vw;
}
.area-rank .title::after {
  content: '';
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: #00ceff;
  vertical-align: middle;
  margin-left: 10px;
  margin-top: -5px;
  transform: rotate(45deg);
}
.area-rank .title::before {
  content: '';
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: #00ceff;
  vertical-align: middle;
  margin-right: 10px;
  margin-top: -5px;
  transform: rotate(45deg);
}
.tuxing-size {
  height: 80%;
  padding: 2px;
  margin: 0 auto;
  background: url('../../assets/images/articleBg-Flip.png') no-repeat bottom
    center;
  background-size: 100% 99%;
  overflow: hidden;
  box-sizing: border-box;
}
.tuxing-fine {
  height: 90%;
  padding: 2px;
  margin: 0 auto;
  overflow: hidden;
}
.element-content {
  position: relative;
  width: 99%;
  height: 100%;
  margin: auto;
  overflow: hidden;
}
.tubiao-size {
  height: 82%;
  margin: 0 auto;
  overflow: hidden;
}
.center-size {
  height: 85%;
  margin: 0 auto;
}
.new-list {
  font-size: 1vw;
  padding: 0 5px;
  line-height: 2.5vw;
  color: #fff;
  transition: top 0.5s;
}
.anim {
  transition: all 0.5s;
  margin-top: -2.5vw; //高度等于行高
}
.article-top {
  box-sizing: border-box;
  display: flex;
  font-size: 1vw;
  justify-content: space-between;
  width: 99%;
  padding: 0 15px;
  margin: 0 auto;
  border-bottom: 1px solid rgba(64, 205, 221, 0.555);
  color: #fff;
  line-height: 2.5vw;
  background-color: rgba($color: rgb(79, 41, 248), $alpha: 0.3);
}
.title-tabs {
  height: 3vw;
  line-height: 3vw;
  display: flex;
  justify-content: space-around;
}
.title-tabs span {
  display: inline-block;
  width: 22%;
  color: #fff;
  text-align: center;
  border: none;
  cursor: pointer;
  font-size: 1vw;
  // border: 1px solid #00ceff;
  // box-shadow:  0 2px 12px 0 #00ceff;
  // background-color: rgba($color: #fff, $alpha: 0.1)
}
.title-tabs span img {
  height: 1.5vw;
  vertical-align: middle;
  margin-right: 5px;
}
.title-tabs .active {
  border: 1px solid #00ceff;
  box-shadow: 0 2px 12px 0 #00ceff;
  background-color: rgba($color: #fff, $alpha: 0.1);
}
.article-content {
  overflow: hidden;
  height: 80%;
  padding: 10px 2px;
  background: url('../../assets/images/articleBg.png') no-repeat bottom center;
  background-size: 100% 99%;
  box-sizing: border-box;
}
#area-tuxing {
  background: url('../../assets/images/articleBg-Flip.png') no-repeat bottom
    center;
  background-size: 100% 99%;
  box-sizing: border-box;
}
.left .article-content {
  padding: 10px 2px;
}
.show-article {
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
  height: 2.5vw;
  line-height: 2.5vw;
}
.el-carousel__item div {
  color: #475669;
  font-size: 1vw;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}
.el-carousel__item:nth-child(2n) {
  background-color: transparent;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: transparent;
}
.company {
  display: inline-block;
  width: 65%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  text-align: left;
}
.new-company {
  display: inline-block;
  width: 75%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  text-align: left;
}
.new-company img {
  display: none;
}
.fine-img {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0 auto;
  max-width: 100%;
  height: 100%;
  cursor: pointer;
}
.center-img {
  width: 3vw;
  height: 3vw;
  display: block;
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  bottom: 50%;
  margin: 0 auto;
  max-width: 100%;
  max-height: 100%;
  cursor: pointer;
}
.list-name {
  width: 25%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  text-align: left;
}
.center {
  position: relative;
}
.center-abs {
  padding: 20px;
  border-radius: 5px;
  background-color: rgba($color: #000, $alpha: 0.6);
  position: absolute;
  bottom: 3%;
  right: 2%;
  color: #00ceff;
}
.center-abs p {
  font-size: 1vw;
  line-height: 1.5vw;
}
.center-abs-name {
  width: 8vw;
}
.center-abs-title{
  margin-right: 10px;
}
.bg-purple-light {
  padding-top: 2%;
  box-sizing: border-box;
}
.center-btn {
  width: 100%;
  height: 3vw;
  margin-top: 2%;
  margin-bottom: 2%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  align-items: center;
  overflow: hidden;
}
.center-btn .el-button {
  display: block;
  height: 3vw;
  line-height: 2vw;
  text-align: center;
  font-size: 1vw;
  border-radius: 4px;
  background-color: rgba($color: #00ceff, $alpha: 0.3);
  color: #fff;
  border: 1px solid #006aff;
}
.center-btn .el-button:hover {
  color: #00ceff;
}
.tab-title {
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #fff;
  font-size: 1vw;
  text-align: center;
  height: 3vw;
  line-height: 3vw;
}
.district,
.hot-article {
  display: block;
  width: 50%;
  text-align: center;
}
.title-active {
  color: #00ceff;
}
.title-tabs .aricle-active {
  color: #00ceff;
}
.hot-article {
  width: 50%;
  text-align: center;
}
.dis-none {
  display: none;
}
.center-btn .btn-success {
  color: #00ceff;
}
</style>
