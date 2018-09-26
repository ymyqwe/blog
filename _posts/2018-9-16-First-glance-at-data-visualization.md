---
layout: post
title: "数据可视化初探-用G2分析睡眠数据"
subtitle: "Analyze sleeping data with G2"
date: 2018-9-16
author: "maniaU"
header-img: "img/Hole.jpg"
tags: G2 Data-Visualization
catalog: true
---

最近一直想研究研究数据可视化，想想自己买了 Misfit 的手环也差不多有一年半多了，虽然 Misfit App 上有每日和月度的统计，但是 misfit 似乎无法满足做长期数据分析的要求，不过幸好 Misfit 有开放 API，可以调用他的 API 来拉取数据，因此我取了<b>2017-01-01 到 2018-08-31</b>期间的睡眠数据来做分析。

## 月度平均睡眠时间

<div id="mountNode"></div>

<div id="pieNode"></div>
<div id="radarNode"></div>
<div id="boxNode"></div>

<script src="/js/moment.js"></script>
<script src="https://gw.alipayobjects.com/os/antv/pkg/_antv.g2-3.2.8/dist/g2.min.js"></script>
<script src="https://gw.alipayobjects.com/os/antv/pkg/_antv.data-set-0.9.6/dist/data-set.min.js"></script>
<script>
var lineData = [
  {"month": "2017-1", "avg": 24968.18181818182},
  {"month": "2017-2", "avg": 25082.222222222223},
  {"month": "2017-3", "avg": 24936.774193548386},
  {"month": "2017-4", "avg": 24396},
  {"month": "2017-5", "avg": 25714.285714285714},
  {"month": "2017-6", "avg": 22760},
  {"month": "2017-7", "avg": 23498},
  {"month": "2017-8", "avg": 23178},
  {"month": "2017-9", "avg": 23198.571428571428},
  {"month": "2017-10", "avg": 23547.09677419355},
  {"month": "2017-11", "avg": 24668.88888888889},
  {"month": "2017-12", "avg": 25668.387096774193},
  {"month": "2018-1", "avg": 24514.83870967742},
  {"month": "2018-2", "avg": 24722.068965517243},
  {"month": "2018-3", "avg": 22894.736842105263},
  {"month": "2018-4", "avg": 25377.777777777777},
  {"month": "2018-5", "avg": 23483.571428571428},
  {"month": "2018-6", "avg": 21836},
  {"month": "2018-7", "avg": 21698.709677419356},
  {"month": "2018-8", "avg": 23662.758620689656}
]

var chart = new G2.Chart({
      container: "mountNode",
      forceFit: true,
      padding: [20, 20, 40, 30]
    });
    var newData = lineData.map(element => {
      element.avg = Number((element.avg / 3600).toFixed(2));
      var duration = moment.duration(element.avg * 1000);
      element.timeString = `${
        duration.get("hours") ? duration.get("hours") + "小时" : ""
      }${
        duration.get("minutes") ? duration.get("minutes") + "分" : ""
      }${duration.get("seconds")}`;
      return element;
    });
    chart.source(newData);
    chart.scale("avg", {
      min: 5,
      max: 8,
      alias: "睡眠平均时间(小时)"
    });
    chart.scale("month", {range: [0, 1], alias: "月份", tickCount: 10});
    chart.tooltip();
    chart.line().position("month*avg");
    chart
      .point()
      .position("month*avg")
      .size(4)
      .shape("circle")
      .style({
        stroke: "#fff",
        lineWidth: 1
      });
    chart.render();


var durationData = [
  {"duration": "3小时", "count": 10, "percent": 0.02},
  {"duration": "4小时", "count": 20, "percent": 0.03},
  {"duration": "5小时", "count": 55, "percent": 0.09},
  {"duration": "6小时", "count": 150, "percent": 0.25},
  {"duration": "7小时", "count": 219, "percent": 0.36},
  {"duration": "8小时", "count": 109, "percent": 0.18},
  {"duration": "9小时", "count": 33, "percent": 0.06},
  {"duration": "10小时", "count": 3, "percent": 0.01}
]

var pieChart = new G2.Chart({
      container: "pieNode",
      forceFit: true
    });
    pieChart.source(durationData, {
      percent: {
        formatter: function formatter(val) {
          val = val * 100 + "%";
          return val;
        }
      }
    });
    pieChart.coord("theta", {
      radius: 0.75
    });
    pieChart.tooltip({
      showTitle: false,
      itemTpl:
        '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}次</li>'
    });
    pieChart
      .intervalStack()
      .position("percent")
      .color("duration")
      .label("percent", {
        formatter: function formatter(val, item) {
          return item.point.duration + ": " + val;
        }
      })
      .tooltip("duration*count", function(duration, count) {
        return {
          name: duration,
          value: count
        };
      })
      .style({
        lineWidth: 1,
        stroke: "#fff"
      });
    pieChart.render();

var weekdayData = [
  {
    "weekday": "星期一",
    "duration": 25189.53488372093,
    "awakeTime": 727.6744186046511,
    "lightSleepTime": 16702.325581395347,
    "soundSleepTime": 7759.53488372093
  },
  {
    "weekday": "星期二",
    "duration": 23471.566265060243,
    "awakeTime": 612.289156626506,
    "lightSleepTime": 15579.036144578313,
    "soundSleepTime": 7280.240963855422
  },
  {
    "weekday": "星期三",
    "duration": 24564,
    "awakeTime": 708,
    "lightSleepTime": 16171.764705882353,
    "soundSleepTime": 7684.235294117647
  },
  {
    "weekday": "星期四",
    "duration": 23055,
    "awakeTime": 747.1428571428571,
    "lightSleepTime": 15167.857142857143,
    "soundSleepTime": 7140
  },
  {
    "weekday": "星期五",
    "duration": 23456.55172413793,
    "awakeTime": 711.7241379310345,
    "lightSleepTime": 14666.896551724138,
    "soundSleepTime": 8077.931034482759
  },
  {
    "weekday": "星期六",
    "duration": 24133.483146067414,
    "awakeTime": 664.0449438202247,
    "lightSleepTime": 15974.831460674157,
    "soundSleepTime": 7494.606741573034
  },
  {
    "weekday": "星期天",
    "duration": 24564.418604651164,
    "awakeTime": 1017.2093023255813,
    "lightSleepTime": 16012.32558139535,
    "soundSleepTime": 7534.883720930233
  }
]
var newWeekdayData = weekdayData.map(one => {
  one.duration = Number((one.duration / 3600).toFixed(2));
  one.awakeTime = Number((one.awakeTime / 3600).toFixed(2));
  one.lightSleepTime = Number((one.lightSleepTime / 3600).toFixed(2));
  one.soundSleepTime = Number((one.soundSleepTime / 3600).toFixed(2));
  return one;
});
var DataView = DataSet.DataView
var dv = new DataView().source(newWeekdayData);
dv.transform({
  type: "fold",
  fields: ["duration", "lightSleepTime", "soundSleepTime"], // 展开字段集
  key: "weekDay", // key字段
  value: "time" // value字段
});
var radarChart = new G2.Chart({
  container: "radarNode",
  forceFit: true,
  padding: [20, 20, 95, 20]
});
radarChart.source(dv, {
  time: {
    min: 0,
    max: 8
  }
});
radarChart.coord("polar", {
  radius: 0.8
});
radarChart.axis("weekday", {
  line: null,
  tickLine: null,
  grid: {
    lineStyle: {
      lineDash: null
    },
    hideFirstLine: false
  }
});
radarChart.axis("time", {
  line: null,
  tickLine: null,
  grid: {
    type: "polygon",
    lineStyle: {
      lineDash: null
    }
  }
});
radarChart.legend("weekDay", {
  marker: "circle",
  offset: 30
});
radarChart
  .line()
  .position("weekday*time")
  .color("weekDay")
  .size(2);
radarChart
  .point()
  .position("weekday*time")
  .color("weekDay")
  .shape("circle")
  .size(4)
  .style({
    stroke: "#fff",
    lineWidth: 1,
    fillOpacity: 1
  });
radarChart.render();


var boxData = [
  {"startTime": 3.6, "endTime": 9.383333333333333},
  {"startTime": 1.9166666666666665, "endTime": 5.483333333333333},
  {"startTime": 1.25, "endTime": 9.133333333333333},
  {"startTime": 0.7666666666666667, "endTime": 6.016666666666667},
  {"startTime": 0.15, "endTime": 6.983333333333333},
  {"startTime": 1.55, "endTime": 9.316666666666666},
  {"startTime": 3.283333333333333, "endTime": 9.75},
  {"startTime": 2.066666666666667, "endTime": 9.616666666666667},
  {"startTime": 2.6333333333333333, "endTime": 8.55},
  {"startTime": 0.9833333333333333, "endTime": 8.183333333333334},
  {"startTime": 1.3, "endTime": 7.583333333333333},
  {"startTime": 2.966666666666667, "endTime": 9.433333333333334},
  {"startTime": 1.8666666666666667, "endTime": 9.3},
  {"startTime": 2.3833333333333333, "endTime": 8.966666666666667},
  {"startTime": 1.5666666666666667, "endTime": 10.066666666666666},
  {"startTime": 2.3, "endTime": 8.45},
  {"startTime": 0.5333333333333333, "endTime": 8.833333333333334},
  {"startTime": 1.1166666666666667, "endTime": 8.4},
  {"startTime": 0.8333333333333334, "endTime": 9.65},
  {"startTime": 1.6, "endTime": 9.816666666666666},
  {"startTime": 1.95, "endTime": 6.933333333333334},
  {"startTime": 23.7, "endTime": 9.05},
  {"startTime": 3.9833333333333334, "endTime": 11.65},
  {"startTime": 2.8, "endTime": 9.983333333333333},
  {"startTime": 1.1833333333333333, "endTime": 9.783333333333333},
  {"startTime": 2.65, "endTime": 9.966666666666667},
  {"startTime": 2.466666666666667, "endTime": 9.616666666666667},
  {"startTime": 1.1833333333333333, "endTime": 7.516666666666667},
  {"startTime": 1.1833333333333333, "endTime": 7.733333333333333},
  {"startTime": 2.9833333333333334, "endTime": 9.75},
  {"startTime": 1.9, "endTime": 8.45},
  {"startTime": 1.1833333333333333, "endTime": 10.05},
  {"startTime": 2.05, "endTime": 7.733333333333333},
  {"startTime": 1.6666666666666665, "endTime": 9.216666666666667},
  {"startTime": 1.2833333333333332, "endTime": 8.683333333333334},
  {"startTime": 2.3, "endTime": 10.033333333333333},
  {"startTime": 2.2666666666666666, "endTime": 8.4},
  {"startTime": 0.8666666666666667, "endTime": 7.733333333333333},
  {"startTime": 3.75, "endTime": 10.6},
  {"startTime": 1.7833333333333332, "endTime": 10.266666666666667},
  {"startTime": 2.2, "endTime": 7.766666666666667},
  {"startTime": 2.15, "endTime": 8.383333333333333},
  {"startTime": 1.2333333333333334, "endTime": 5.566666666666666},
  {"startTime": 0.9166666666666666, "endTime": 7.9},
  {"startTime": 1.95, "endTime": 8.966666666666667},
  {"startTime": 2.8666666666666667, "endTime": 8.966666666666667},
  {"startTime": 2, "endTime": 10.233333333333333},
  {"startTime": 1.2833333333333332, "endTime": 6.6},
  {"startTime": 23.616666666666667, "endTime": 8.266666666666667},
  {"startTime": 1.05, "endTime": 8.45},
  {"startTime": 0.9333333333333333, "endTime": 8.533333333333333},
  {"startTime": 0.7333333333333333, "endTime": 8.483333333333333},
  {"startTime": 3.066666666666667, "endTime": 9.566666666666666},
  {"startTime": 1.95, "endTime": 8.166666666666666},
  {"startTime": 1.2833333333333332, "endTime": 8.133333333333333},
  {"startTime": 0.75, "endTime": 7.95},
  {"startTime": 23.95, "endTime": 8.483333333333333},
  {"startTime": 1.2166666666666668, "endTime": 8.533333333333333},
  {"startTime": 1.9166666666666665, "endTime": 8.866666666666667},
  {"startTime": 0.9, "endTime": 9.733333333333333},
  {"startTime": 3.2, "endTime": 9.866666666666667},
  {"startTime": 3.8, "endTime": 8.1},
  {"startTime": 0.9833333333333333, "endTime": 8.9},
  {"startTime": 1.7666666666666666, "endTime": 8.5},
  {"startTime": 0.9, "endTime": 7.733333333333333},
  {"startTime": 1.1666666666666667, "endTime": 7.75},
  {"startTime": 1.6666666666666665, "endTime": 9.983333333333333},
  {"startTime": 1.2333333333333334, "endTime": 8.55},
  {"startTime": 0.4166666666666667, "endTime": 7.35},
  {"startTime": 2.0833333333333335, "endTime": 8.266666666666667},
  {"startTime": 2.3666666666666667, "endTime": 8.716666666666667},
  {"startTime": 1.5, "endTime": 8.85},
  {"startTime": 1.85, "endTime": 8.85},
  {"startTime": 1.5666666666666667, "endTime": 9.233333333333333},
  {"startTime": 2.1666666666666665, "endTime": 7.6},
  {"startTime": 1.4, "endTime": 8.316666666666666},
  {"startTime": 3.35, "endTime": 9.083333333333334},
  {"startTime": 0.5666666666666667, "endTime": 5.466666666666667},
  {"startTime": 1.1166666666666667, "endTime": 8.35},
  {"startTime": 1.3333333333333333, "endTime": 8.55},
  {"startTime": 1.6166666666666667, "endTime": 8.533333333333333},
  {"startTime": 2.0833333333333335, "endTime": 11.116666666666667},
  {"startTime": 0.8, "endTime": 8.916666666666666},
  {"startTime": 2.8666666666666667, "endTime": 8.866666666666667},
  {"startTime": 0, "endTime": 8.25},
  {"startTime": 1.0666666666666667, "endTime": 8},
  {"startTime": 1.55, "endTime": 8.7},
  {"startTime": 1.8, "endTime": 8.683333333333334},
  {"startTime": 1.6666666666666665, "endTime": 9.25},
  {"startTime": 0.8666666666666667, "endTime": 8.566666666666666},
  {"startTime": 1.1, "endTime": 8.45},
  {"startTime": 1.7666666666666666, "endTime": 7.866666666666667},
  {"startTime": 2.3333333333333335, "endTime": 9.016666666666667},
  {"startTime": 1.9833333333333334, "endTime": 8.6},
  {"startTime": 1.2166666666666668, "endTime": 8.566666666666666},
  {"startTime": 4.033333333333333, "endTime": 9.65},
  {"startTime": 1.65, "endTime": 7.733333333333333},
  {"startTime": 1.1166666666666667, "endTime": 8.233333333333333},
  {"startTime": 1.3833333333333333, "endTime": 4.666666666666667},
  {"startTime": 0.3333333333333333, "endTime": 8.483333333333333},
  {"startTime": 0.9833333333333333, "endTime": 8.566666666666666},
  {"startTime": 0.95, "endTime": 8.483333333333333},
  {"startTime": 1.0666666666666667, "endTime": 8.616666666666667},
  {"startTime": 0.6166666666666667, "endTime": 6.033333333333333},
  {"startTime": 1.25, "endTime": 6.916666666666667},
  {"startTime": 1.1, "endTime": 8.05},
  {"startTime": 3.2333333333333334, "endTime": 7.716666666666667},
  {"startTime": 0.36666666666666664, "endTime": 6.733333333333333},
  {"startTime": 0.85, "endTime": 8.066666666666666},
  {"startTime": 0.6, "endTime": 6.216666666666667},
  {"startTime": 0.48333333333333334, "endTime": 7.916666666666667},
  {"startTime": 4.3, "endTime": 9.016666666666667},
  {"startTime": 23.833333333333332, "endTime": 8.4},
  {"startTime": 0.16666666666666666, "endTime": 8.433333333333334},
  {"startTime": 1.3333333333333333, "endTime": 8.666666666666666},
  {"startTime": 1.5333333333333332, "endTime": 10.233333333333333},
  {"startTime": 0.31666666666666665, "endTime": 8.45},
  {"startTime": 23.85, "endTime": 7.35},
  {"startTime": 0.23333333333333334, "endTime": 6.933333333333334},
  {"startTime": 0.05, "endTime": 8.316666666666666},
  {"startTime": 2.4333333333333336, "endTime": 8.766666666666667},
  {"startTime": 1.55, "endTime": 8.7},
  {"startTime": 1.85, "endTime": 8.083333333333334},
  {"startTime": 1.5166666666666666, "endTime": 7.866666666666667},
  {"startTime": 23.133333333333333, "endTime": 8.4},
  {"startTime": 1.0666666666666667, "endTime": 8.866666666666667},
  {"startTime": 2.6666666666666665, "endTime": 7.8},
  {"startTime": 1.55, "endTime": 8.55},
  {"startTime": 1.2833333333333332, "endTime": 9.283333333333333},
  {"startTime": 2.0166666666666666, "endTime": 8.4},
  {"startTime": 2.2666666666666666, "endTime": 11.416666666666666},
  {"startTime": 1.15, "endTime": 7.35},
  {"startTime": 1.8333333333333335, "endTime": 7.416666666666667},
  {"startTime": 0.9833333333333333, "endTime": 8.616666666666667},
  {"startTime": 2.4833333333333334, "endTime": 8.516666666666667},
  {"startTime": 1.9166666666666665, "endTime": 8.633333333333333},
  {"startTime": 1.9666666666666668, "endTime": 8.866666666666667},
  {"startTime": 1.4666666666666668, "endTime": 7.983333333333333},
  {"startTime": 1.4666666666666668, "endTime": 8.5},
  {"startTime": 2.75, "endTime": 8.416666666666666},
  {"startTime": 2.25, "endTime": 7.666666666666667},
  {"startTime": 0.7, "endTime": 9.683333333333334},
  {"startTime": 1.75, "endTime": 8.483333333333333},
  {"startTime": 2.75, "endTime": 8.366666666666667},
  {"startTime": 2.2666666666666666, "endTime": 8.766666666666667},
  {"startTime": 2.7666666666666666, "endTime": 8.8},
  {"startTime": 2.1166666666666667, "endTime": 9.033333333333333},
  {"startTime": 3.3166666666666664, "endTime": 8.816666666666666},
  {"startTime": 2.95, "endTime": 9.483333333333333},
  {"startTime": 1.8333333333333335, "endTime": 8.683333333333334},
  {"startTime": 4.033333333333333, "endTime": 8.75},
  {"startTime": 2.033333333333333, "endTime": 8.966666666666667},
  {"startTime": 1.7833333333333332, "endTime": 8.333333333333334},
  {"startTime": 4.616666666666667, "endTime": 9.133333333333333},
  {"startTime": 0.95, "endTime": 8.116666666666667},
  {"startTime": 2.8, "endTime": 7.733333333333333},
  {"startTime": 1, "endTime": 8.683333333333334},
  {"startTime": 3.2, "endTime": 8.483333333333333},
  {"startTime": 1.45, "endTime": 8.383333333333333},
  {"startTime": 1.4166666666666667, "endTime": 4.716666666666667},
  {"startTime": 3.3166666666666664, "endTime": 8.233333333333333},
  {"startTime": 1.8333333333333335, "endTime": 8.9},
  {"startTime": 2.8166666666666664, "endTime": 9.4},
  {"startTime": 1.1833333333333333, "endTime": 9},
  {"startTime": 1.95, "endTime": 8.666666666666666},
  {"startTime": 1.6166666666666667, "endTime": 8.616666666666667},
  {"startTime": 0.9833333333333333, "endTime": 7.266666666666667},
  {"startTime": 0.9833333333333333, "endTime": 8.466666666666667},
  {"startTime": 3.65, "endTime": 9.9},
  {"startTime": 1.2333333333333334, "endTime": 7.9},
  {"startTime": 1.0833333333333333, "endTime": 8.283333333333333},
  {"startTime": 0.75, "endTime": 8.25},
  {"startTime": 0.7666666666666667, "endTime": 8.333333333333334},
  {"startTime": 1.05, "endTime": 8.316666666666666},
  {"startTime": 2.4166666666666665, "endTime": 8.55},
  {"startTime": 0.9166666666666666, "endTime": 8.233333333333333},
  {"startTime": 1.95, "endTime": 9.916666666666666},
  {"startTime": 1.8166666666666667, "endTime": 8.7},
  {"startTime": 0.95, "endTime": 8.25},
  {"startTime": 1.9333333333333333, "endTime": 7.683333333333334},
  {"startTime": 3.3666666666666667, "endTime": 8.733333333333333},
  {"startTime": 3.0166666666666666, "endTime": 8.65},
  {"startTime": 2.7, "endTime": 8.266666666666667},
  {"startTime": 2.75, "endTime": 8.45},
  {"startTime": 1.85, "endTime": 8.883333333333333},
  {"startTime": 1.6833333333333333, "endTime": 8.766666666666667},
  {"startTime": 1.6333333333333333, "endTime": 8.983333333333333},
  {"startTime": 1.15, "endTime": 8.266666666666667},
  {"startTime": 2.4333333333333336, "endTime": 8.9},
  {"startTime": 2.25, "endTime": 7.033333333333333},
  {"startTime": 1.9333333333333333, "endTime": 8.716666666666667},
  {"startTime": 3.066666666666667, "endTime": 7.766666666666667},
  {"startTime": 1.5333333333333332, "endTime": 8.066666666666666},
  {"startTime": 2.8333333333333335, "endTime": 8.366666666666667},
  {"startTime": 1.75, "endTime": 8.516666666666667},
  {"startTime": 2.216666666666667, "endTime": 8.566666666666666},
  {"startTime": 3.2333333333333334, "endTime": 8.866666666666667},
  {"startTime": 1, "endTime": 8.616666666666667},
  {"startTime": 1.7166666666666668, "endTime": 6.283333333333333},
  {"startTime": 1.25, "endTime": 8.816666666666666},
  {"startTime": 2.4, "endTime": 8.85},
  {"startTime": 2.5666666666666664, "endTime": 8.75},
  {"startTime": 3.1333333333333333, "endTime": 8.9},
  {"startTime": 3.2333333333333334, "endTime": 9.733333333333333},
  {"startTime": 2.3166666666666664, "endTime": 7.816666666666666},
  {"startTime": 4.066666666666666, "endTime": 9.066666666666666},
  {"startTime": 4.05, "endTime": 8.9},
  {"startTime": 1.9166666666666665, "endTime": 9.466666666666667},
  {"startTime": 0.5333333333333333, "endTime": 8.95},
  {"startTime": 3.6166666666666667, "endTime": 8.283333333333333},
  {"startTime": 23.75, "endTime": 7.833333333333333},
  {"startTime": 1.1666666666666667, "endTime": 8.133333333333333},
  {"startTime": 0.5666666666666667, "endTime": 8.916666666666666},
  {"startTime": 3.3666666666666667, "endTime": 10.133333333333333},
  {"startTime": 1.75, "endTime": 8.183333333333334},
  {"startTime": 3.05, "endTime": 8.216666666666667},
  {"startTime": 3.066666666666667, "endTime": 9.1},
  {"startTime": 0.9833333333333333, "endTime": 8.116666666666667},
  {"startTime": 0.7333333333333333, "endTime": 8.1},
  {"startTime": 0.08333333333333333, "endTime": 8.333333333333334},
  {"startTime": 1.2666666666666666, "endTime": 7.85},
  {"startTime": 22.566666666666666, "endTime": 3.4166666666666665},
  {"startTime": 4.8, "endTime": 9.166666666666666},
  {"startTime": 2.85, "endTime": 9.783333333333333},
  {"startTime": 1.3833333333333333, "endTime": 8.466666666666667},
  {"startTime": 0.6833333333333333, "endTime": 8.266666666666667},
  {"startTime": 1.4833333333333334, "endTime": 7.583333333333333},
  {"startTime": 1.9333333333333333, "endTime": 8.016666666666667},
  {"startTime": 1.2333333333333334, "endTime": 8.333333333333334},
  {"startTime": 2.8, "endTime": 7.616666666666667},
  {"startTime": 0.13333333333333333, "endTime": 7.066666666666666},
  {"startTime": 0.7666666666666667, "endTime": 8.383333333333333},
  {"startTime": 1, "endTime": 8.616666666666667},
  {"startTime": 0.9, "endTime": 8.483333333333333},
  {"startTime": 2, "endTime": 7.866666666666667},
  {"startTime": 1.7833333333333332, "endTime": 6.916666666666667},
  {"startTime": 0.6666666666666666, "endTime": 7.433333333333334},
  {"startTime": 1.5666666666666667, "endTime": 10.25},
  {"startTime": 1.3833333333333333, "endTime": 7.816666666666666},
  {"startTime": 1.1333333333333333, "endTime": 8.016666666666667},
  {"startTime": 1.3666666666666667, "endTime": 8.433333333333334},
  {"startTime": 2.216666666666667, "endTime": 9.05},
  {"startTime": 1.5, "endTime": 9.033333333333333},
  {"startTime": 2.283333333333333, "endTime": 9.683333333333334},
  {"startTime": 1.45, "endTime": 8.8},
  {"startTime": 3.283333333333333, "endTime": 9.316666666666666},
  {"startTime": 4.016666666666667, "endTime": 9.05},
  {"startTime": 1.0333333333333334, "endTime": 8.05},
  {"startTime": 1.65, "endTime": 8.116666666666667},
  {"startTime": 23.066666666666666, "endTime": 5.95},
  {"startTime": 0.8833333333333333, "endTime": 8.183333333333334},
  {"startTime": 2.533333333333333, "endTime": 8.316666666666666},
  {"startTime": 3.0166666666666666, "endTime": 8.45},
  {"startTime": 0.9, "endTime": 4.4},
  {"startTime": 4.816666666666666, "endTime": 8.833333333333334},
  {"startTime": 3.25, "endTime": 8.6},
  {"startTime": 1.0666666666666667, "endTime": 8.816666666666666},
  {"startTime": 2.7333333333333334, "endTime": 10.183333333333334},
  {"startTime": 1.5, "endTime": 8.383333333333333},
  {"startTime": 1.95, "endTime": 5.4},
  {"startTime": 0.4666666666666667, "endTime": 6.583333333333333},
  {"startTime": 1.25, "endTime": 6.65},
  {"startTime": 2.1, "endTime": 8.783333333333333},
  {"startTime": 1.5166666666666666, "endTime": 6.016666666666667},
  {"startTime": 1.2166666666666668, "endTime": 5.766666666666667},
  {"startTime": 0.016666666666666666, "endTime": 9.016666666666667},
  {"startTime": 3.3833333333333333, "endTime": 8.6},
  {"startTime": 1.3, "endTime": 8.483333333333333},
  {"startTime": 0.7166666666666667, "endTime": 8.333333333333334},
  {"startTime": 1.55, "endTime": 8.283333333333333},
  {"startTime": 1.5, "endTime": 9.45},
  {"startTime": 0.7166666666666667, "endTime": 8.033333333333333},
  {"startTime": 1.0666666666666667, "endTime": 8.516666666666667},
  {"startTime": 1.45, "endTime": 8.066666666666666},
  {"startTime": 1.8, "endTime": 8.716666666666667},
  {"startTime": 2.4166666666666665, "endTime": 8.8},
  {"startTime": 1.9333333333333333, "endTime": 10.55},
  {"startTime": 3.8666666666666667, "endTime": 9.416666666666666},
  {"startTime": 2.6833333333333336, "endTime": 8.6},
  {"startTime": 0.45, "endTime": 7.583333333333333},
  {"startTime": 1.0833333333333333, "endTime": 7.233333333333333},
  {"startTime": 1.5166666666666666, "endTime": 7.716666666666667},
  {"startTime": 0.9666666666666667, "endTime": 8.2},
  {"startTime": 1.0333333333333334, "endTime": 7.2},
  {"startTime": 2.4333333333333336, "endTime": 8.65},
  {"startTime": 1.35, "endTime": 7.966666666666667},
  {"startTime": 3.1333333333333333, "endTime": 8.933333333333334},
  {"startTime": 3.1, "endTime": 7.15},
  {"startTime": 0.8333333333333334, "endTime": 8.35},
  {"startTime": 0.7666666666666667, "endTime": 7.45},
  {"startTime": 0.85, "endTime": 7.6},
  {"startTime": 0.38333333333333336, "endTime": 7.566666666666666},
  {"startTime": 1.1333333333333333, "endTime": 7.416666666666667},
  {"startTime": 1.0166666666666666, "endTime": 7.6},
  {"startTime": 1.8166666666666667, "endTime": 8.85},
  {"startTime": 23.916666666666668, "endTime": 8.366666666666667},
  {"startTime": 1.75, "endTime": 8.2},
  {"startTime": 2.6333333333333333, "endTime": 9.266666666666667},
  {"startTime": 1.75, "endTime": 8.283333333333333},
  {"startTime": 23.733333333333334, "endTime": 8.283333333333333},
  {"startTime": 2.1, "endTime": 8.15},
  {"startTime": 1.5166666666666666, "endTime": 7.15},
  {"startTime": 1.8833333333333333, "endTime": 8.516666666666667},
  {"startTime": 1.6166666666666667, "endTime": 8.733333333333333},
  {"startTime": 1.6666666666666665, "endTime": 7.966666666666667},
  {"startTime": 23.5, "endTime": 7.133333333333334},
  {"startTime": 0.18333333333333332, "endTime": 7.5},
  {"startTime": 0.38333333333333336, "endTime": 8.35},
  {"startTime": 2.2, "endTime": 8.5},
  {"startTime": 22.133333333333333, "endTime": 5.733333333333333},
  {"startTime": 2.6, "endTime": 8.916666666666666},
  {"startTime": 0.7833333333333333, "endTime": 8.383333333333333},
  {"startTime": 1.0166666666666666, "endTime": 7.066666666666666},
  {"startTime": 1.05, "endTime": 8.85},
  {"startTime": 1.7333333333333334, "endTime": 8.766666666666667},
  {"startTime": 1.55, "endTime": 7.883333333333333},
  {"startTime": 0.9833333333333333, "endTime": 7.933333333333334},
  {"startTime": 0.65, "endTime": 8.566666666666666},
  {"startTime": 0.5333333333333333, "endTime": 8.85},
  {"startTime": 23.7, "endTime": 6.55},
  {"startTime": 3.5, "endTime": 9.533333333333333},
  {"startTime": 1.5166666666666666, "endTime": 7.65},
  {"startTime": 1.3, "endTime": 9.383333333333333},
  {"startTime": 0.7, "endTime": 9.283333333333333},
  {"startTime": 4.15, "endTime": 8.733333333333333},
  {"startTime": 0.6166666666666667, "endTime": 8.35},
  {"startTime": 0.65, "endTime": 7.233333333333333},
  {"startTime": 2.6, "endTime": 7.766666666666667},
  {"startTime": 23.333333333333332, "endTime": 7.016666666666667},
  {"startTime": 23.533333333333335, "endTime": 9.916666666666666},
  {"startTime": 1.3, "endTime": 8.533333333333333},
  {"startTime": 4.45, "endTime": 8.666666666666666},
  {"startTime": 0.55, "endTime": 8.95},
  {"startTime": 1.7333333333333334, "endTime": 8.15},
  {"startTime": 0.8833333333333333, "endTime": 9},
  {"startTime": 0.45, "endTime": 7.333333333333333},
  {"startTime": 0.65, "endTime": 9.633333333333333},
  {"startTime": 0.36666666666666664, "endTime": 9.683333333333334},
  {"startTime": 0.5666666666666667, "endTime": 7.533333333333333},
  {"startTime": 1.5166666666666666, "endTime": 8.316666666666666},
  {"startTime": 1.2666666666666666, "endTime": 7.666666666666667},
  {"startTime": 1.0166666666666666, "endTime": 8.75},
  {"startTime": 1.9833333333333334, "endTime": 8.35},
  {"startTime": 1.9833333333333334, "endTime": 6.216666666666667},
  {"startTime": 23.85, "endTime": 8.45},
  {"startTime": 1.7333333333333334, "endTime": 8.766666666666667},
  {"startTime": 1.55, "endTime": 7.883333333333333},
  {"startTime": 0.9833333333333333, "endTime": 7.933333333333334},
  {"startTime": 0.65, "endTime": 8.566666666666666},
  {"startTime": 0.5333333333333333, "endTime": 8.85},
  {"startTime": 23.7, "endTime": 6.55},
  {"startTime": 3.5, "endTime": 9.533333333333333},
  {"startTime": 1.5166666666666666, "endTime": 7.65},
  {"startTime": 1.3, "endTime": 9.383333333333333},
  {"startTime": 0.7, "endTime": 9.283333333333333},
  {"startTime": 4.15, "endTime": 8.733333333333333},
  {"startTime": 0.6166666666666667, "endTime": 8.35},
  {"startTime": 0.65, "endTime": 7.233333333333333},
  {"startTime": 2.6, "endTime": 7.766666666666667},
  {"startTime": 23.333333333333332, "endTime": 7.016666666666667},
  {"startTime": 23.533333333333335, "endTime": 9.916666666666666},
  {"startTime": 1.3, "endTime": 8.533333333333333},
  {"startTime": 4.45, "endTime": 8.666666666666666},
  {"startTime": 0.55, "endTime": 8.95},
  {"startTime": 1.7333333333333334, "endTime": 8.15},
  {"startTime": 0.8833333333333333, "endTime": 9},
  {"startTime": 0.45, "endTime": 7.333333333333333},
  {"startTime": 0.65, "endTime": 9.633333333333333},
  {"startTime": 0.36666666666666664, "endTime": 9.683333333333334},
  {"startTime": 0.5666666666666667, "endTime": 7.533333333333333},
  {"startTime": 1.5166666666666666, "endTime": 8.316666666666666},
  {"startTime": 1.2666666666666666, "endTime": 7.666666666666667},
  {"startTime": 1.0166666666666666, "endTime": 8.75},
  {"startTime": 1.9833333333333334, "endTime": 8.35},
  {"startTime": 1.9833333333333334, "endTime": 6.216666666666667},
  {"startTime": 23.85, "endTime": 8.45},
  {"startTime": 0.9333333333333333, "endTime": 6.783333333333333},
  {"startTime": 0.23333333333333334, "endTime": 8.733333333333333},
  {"startTime": 1.45, "endTime": 8.216666666666667},
  {"startTime": 1.1, "endTime": 8.633333333333333},
  {"startTime": 1.4333333333333333, "endTime": 8.366666666666667},
  {"startTime": 2.2666666666666666, "endTime": 8.133333333333333},
  {"startTime": 23.283333333333335, "endTime": 7.816666666666666},
  {"startTime": 1.55, "endTime": 8.783333333333333},
  {"startTime": 1.2, "endTime": 8.633333333333333},
  {"startTime": 1.1833333333333333, "endTime": 8.95},
  {"startTime": 1.1333333333333333, "endTime": 8.766666666666667},
  {"startTime": 1.6166666666666667, "endTime": 8.416666666666666},
  {"startTime": 3.4333333333333336, "endTime": 9.633333333333333},
  {"startTime": 1.2666666666666666, "endTime": 9.016666666666667},
  {"startTime": 1.0666666666666667, "endTime": 7.366666666666666},
  {"startTime": 2.5166666666666666, "endTime": 8.216666666666667},
  {"startTime": 2, "endTime": 7.533333333333333},
  {"startTime": 1.8, "endTime": 7.816666666666666},
  {"startTime": 2.466666666666667, "endTime": 8.4},
  {"startTime": 1.7833333333333332, "endTime": 8.566666666666666},
  {"startTime": 3.8333333333333335, "endTime": 8.066666666666666},
  {"startTime": 1.8166666666666667, "endTime": 8.55},
  {"startTime": 0.8666666666666667, "endTime": 8.483333333333333},
  {"startTime": 1.55, "endTime": 8.2},
  {"startTime": 2.3333333333333335, "endTime": 8.566666666666666},
  {"startTime": 0.9666666666666667, "endTime": 8.216666666666667},
  {"startTime": 1.1, "endTime": 9.05},
  {"startTime": 1.9, "endTime": 10.283333333333333},
  {"startTime": 2.1166666666666667, "endTime": 8.5},
  {"startTime": 1.3666666666666667, "endTime": 8.066666666666666},
  {"startTime": 3.05, "endTime": 8.95},
  {"startTime": 2.0166666666666666, "endTime": 8.433333333333334},
  {"startTime": 1.45, "endTime": 8.016666666666667},
  {"startTime": 0.8833333333333333, "endTime": 10.6},
  {"startTime": 3.7666666666666666, "endTime": 8.733333333333333},
  {"startTime": 0.8333333333333334, "endTime": 8.416666666666666},
  {"startTime": 0.9333333333333333, "endTime": 8.516666666666667},
  {"startTime": 1.6833333333333333, "endTime": 7.216666666666667},
  {"startTime": 2.4833333333333334, "endTime": 8.283333333333333},
  {"startTime": 1.5833333333333335, "endTime": 8.616666666666667},
  {"startTime": 2.4833333333333334, "endTime": 9.9},
  {"startTime": 2.15, "endTime": 8.9},
  {"startTime": 3.4, "endTime": 9.133333333333333},
  {"startTime": 1.7, "endTime": 8.583333333333334},
  {"startTime": 1.5, "endTime": 8.316666666666666},
  {"startTime": 23.8, "endTime": 10.916666666666666},
  {"startTime": 4.4, "endTime": 10.3},
  {"startTime": 3.283333333333333, "endTime": 8.433333333333334},
  {"startTime": 2.1666666666666665, "endTime": 9.566666666666666},
  {"startTime": 21.9, "endTime": 0.55},
  {"startTime": 2.95, "endTime": 11.183333333333334},
  {"startTime": 23.9, "endTime": 8.3},
  {"startTime": 4.116666666666666, "endTime": 9.083333333333334},
  {"startTime": 1.3333333333333333, "endTime": 8.866666666666667},
  {"startTime": 0.8833333333333333, "endTime": 7.783333333333333},
  {"startTime": 1.3, "endTime": 9.033333333333333},
  {"startTime": 3.3833333333333333, "endTime": 10.516666666666667},
  {"startTime": 2.5833333333333335, "endTime": 8.633333333333333},
  {"startTime": 0.85, "endTime": 8.616666666666667},
  {"startTime": 1.6, "endTime": 9.016666666666667},
  {"startTime": 2.15, "endTime": 8.433333333333334},
  {"startTime": 0.8, "endTime": 8.65},
  {"startTime": 4.416666666666667, "endTime": 8.65},
  {"startTime": 2.2333333333333334, "endTime": 7.916666666666667},
  {"startTime": 0.21666666666666667, "endTime": 7.633333333333333},
  {"startTime": 1.0166666666666666, "endTime": 7.883333333333333},
  {"startTime": 0.15, "endTime": 7.4},
  {"startTime": 1.2, "endTime": 8.133333333333333},
  {"startTime": 0.7833333333333333, "endTime": 8.7},
  {"startTime": 2.066666666666667, "endTime": 9.05},
  {"startTime": 2.85, "endTime": 8.55},
  {"startTime": 0.4166666666666667, "endTime": 7.2},
  {"startTime": 1.2, "endTime": 8.383333333333333},
  {"startTime": 0.5, "endTime": 7.466666666666667},
  {"startTime": 2.6833333333333336, "endTime": 8.5},
  {"startTime": 2.533333333333333, "endTime": 8.733333333333333},
  {"startTime": 4.55, "endTime": 10.233333333333333},
  {"startTime": 3.65, "endTime": 6.733333333333333},
  {"startTime": 2.783333333333333, "endTime": 8.783333333333333},
  {"startTime": 0.5333333333333333, "endTime": 7.133333333333334},
  {"startTime": 2.5166666666666666, "endTime": 8.133333333333333},
  {"startTime": 0.5666666666666667, "endTime": 9.283333333333333},
  {"startTime": 23.85, "endTime": 8.416666666666666},
  {"startTime": 1.95, "endTime": 8.633333333333333},
  {"startTime": 0.18333333333333332, "endTime": 7.316666666666666},
  {"startTime": 0.31666666666666665, "endTime": 8.4},
  {"startTime": 0.5333333333333333, "endTime": 8.316666666666666},
  {"startTime": 1.2666666666666666, "endTime": 8.033333333333333},
  {"startTime": 0.7333333333333333, "endTime": 7.766666666666667},
  {"startTime": 1.75, "endTime": 8.95},
  {"startTime": 1.1666666666666667, "endTime": 9},
  {"startTime": 1.0666666666666667, "endTime": 8.05},
  {"startTime": 1.5, "endTime": 8.283333333333333},
  {"startTime": 2.2, "endTime": 7.5},
  {"startTime": 1.0833333333333333, "endTime": 8.516666666666667},
  {"startTime": 3.15, "endTime": 8.866666666666667},
  {"startTime": 0.9666666666666667, "endTime": 8.933333333333334},
  {"startTime": 0.7333333333333333, "endTime": 8.6},
  {"startTime": 3.033333333333333, "endTime": 8.7},
  {"startTime": 1.7, "endTime": 8.766666666666667},
  {"startTime": 1.3333333333333333, "endTime": 8.816666666666666},
  {"startTime": 1.4333333333333333, "endTime": 8.583333333333334},
  {"startTime": 1.1333333333333333, "endTime": 7.15},
  {"startTime": 0.9666666666666667, "endTime": 8.066666666666666},
  {"startTime": 0.75, "endTime": 7.933333333333334},
  {"startTime": 1.6166666666666667, "endTime": 8.216666666666667},
  {"startTime": 0.8, "endTime": 7.2},
  {"startTime": 0.9666666666666667, "endTime": 8.6},
  {"startTime": 0.31666666666666665, "endTime": 6.933333333333334},
  {"startTime": 0.65, "endTime": 8.083333333333334},
  {"startTime": 2.65, "endTime": 8.716666666666667},
  {"startTime": 1.5833333333333335, "endTime": 7.45},
  {"startTime": 1.9, "endTime": 8.05},
  {"startTime": 0.9, "endTime": 7.35},
  {"startTime": 23.083333333333332, "endTime": 6.783333333333333},
  {"startTime": 0.8666666666666667, "endTime": 7.766666666666667},
  {"startTime": 0.65, "endTime": 7.416666666666667},
  {"startTime": 1.25, "endTime": 7.9},
  {"startTime": 1.3, "endTime": 6.683333333333334},
  {"startTime": 2.3666666666666667, "endTime": 8.233333333333333},
  {"startTime": 2.25, "endTime": 8.283333333333333},
  {"startTime": 0.95, "endTime": 8.183333333333334},
  {"startTime": 20.166666666666668, "endTime": 0.016666666666666666},
  {"startTime": 22.716666666666665, "endTime": 4.816666666666666},
  {"startTime": 22.766666666666666, "endTime": 6.933333333333334},
  {"startTime": 0.6666666666666666, "endTime": 7.05},
  {"startTime": 1.0333333333333334, "endTime": 5.966666666666667},
  {"startTime": 23.083333333333332, "endTime": 4.35},
  {"startTime": 22.733333333333334, "endTime": 5.633333333333333},
  {"startTime": 23.566666666666666, "endTime": 7.533333333333333},
  {"startTime": 23.166666666666668, "endTime": 6.566666666666666},
  {"startTime": 0.7666666666666667, "endTime": 5.566666666666666},
  {"startTime": 21.8, "endTime": 6.95},
  {"startTime": 23.35, "endTime": 5.933333333333334},
  {"startTime": 23.65, "endTime": 7.383333333333334},
  {"startTime": 0.5333333333333333, "endTime": 6.166666666666667},
  {"startTime": 1.4166666666666667, "endTime": 7.483333333333333},
  {"startTime": 0.06666666666666667, "endTime": 2.716666666666667},
  {"startTime": 3.2333333333333334, "endTime": 8.066666666666666},
  {"startTime": 1.8833333333333333, "endTime": 8.033333333333333},
  {"startTime": 1.5166666666666666, "endTime": 7.3},
  {"startTime": 2.216666666666667, "endTime": 8.833333333333334},
  {"startTime": 1.0333333333333334, "endTime": 7.016666666666667},
  {"startTime": 2.1333333333333333, "endTime": 7.666666666666667},
  {"startTime": 1.2666666666666666, "endTime": 7.533333333333333},
  {"startTime": 1.4, "endTime": 8.483333333333333},
  {"startTime": 0.55, "endTime": 7.15},
  {"startTime": 0.13333333333333333, "endTime": 6.783333333333333},
  {"startTime": 1.8166666666666667, "endTime": 8.35},
  {"startTime": 4.05, "endTime": 9.866666666666667},
  {"startTime": 23.816666666666666, "endTime": 2.5166666666666666},
  {"startTime": 1.5666666666666667, "endTime": 9.283333333333333},
  {"startTime": 0.8833333333333333, "endTime": 8.216666666666667},
  {"startTime": 2.8833333333333333, "endTime": 8.066666666666666},
  {"startTime": 2.6166666666666667, "endTime": 7.983333333333333},
  {"startTime": 4.633333333333333, "endTime": 10.083333333333334},
  {"startTime": 3.35, "endTime": 10.3},
  {"startTime": 4.1, "endTime": 10.35},
  {"startTime": 1.8, "endTime": 9.35},
  {"startTime": 0.5, "endTime": 7.65},
  {"startTime": 4.283333333333333, "endTime": 8.55},
  {"startTime": 1.4333333333333333, "endTime": 8.366666666666667},
  {"startTime": 0.5333333333333333, "endTime": 6.95},
  {"startTime": 1.6, "endTime": 8.366666666666667},
  {"startTime": 4, "endTime": 8.866666666666667},
  {"startTime": 4.916666666666667, "endTime": 8.333333333333334},
  {"startTime": 1.9, "endTime": 8.433333333333334},
  {"startTime": 0.18333333333333332, "endTime": 8.216666666666667},
  {"startTime": 1.6333333333333333, "endTime": 8.183333333333334},
  {"startTime": 1.8666666666666667, "endTime": 8.283333333333333},
  {"startTime": 1.0833333333333333, "endTime": 8.6},
  {"startTime": 0.21666666666666667, "endTime": 6.55},
  {"startTime": 1.05, "endTime": 8.05},
  {"startTime": 4.433333333333334, "endTime": 8},
  {"startTime": 0.4666666666666667, "endTime": 3.1166666666666667},
  {"startTime": 4.733333333333333, "endTime": 7.75},
  {"startTime": 0.65, "endTime": 7.516666666666667},
  {"startTime": 1.8666666666666667, "endTime": 9.283333333333333},
  {"startTime": 1.85, "endTime": 9.316666666666666},
  {"startTime": 1.6833333333333333, "endTime": 5.933333333333334},
  {"startTime": 2.1333333333333333, "endTime": 6.966666666666667},
  {"startTime": 2.2333333333333334, "endTime": 7.066666666666666},
  {"startTime": 2.4333333333333336, "endTime": 6.516666666666667},
  {"startTime": 23.75, "endTime": 7.516666666666667},
  {"startTime": 1.9833333333333334, "endTime": 9.45},
  {"startTime": 0.45, "endTime": 7.716666666666667},
  {"startTime": 1.45, "endTime": 7.366666666666666},
  {"startTime": 0.48333333333333334, "endTime": 6.933333333333334},
  {"startTime": 0.7, "endTime": 7.166666666666667},
  {"startTime": 0.7166666666666667, "endTime": 6.783333333333333},
  {"startTime": 23.516666666666666, "endTime": 7.233333333333333},
  {"startTime": 4, "endTime": 9.55},
  {"startTime": 1.9, "endTime": 8.466666666666667},
  {"startTime": 0.13333333333333333, "endTime": 7.316666666666666},
  {"startTime": 1.1, "endTime": 7.883333333333333},
  {"startTime": 1.9166666666666665, "endTime": 7.283333333333333},
  {"startTime": 1.3, "endTime": 7.383333333333334},
  {"startTime": 23.116666666666667, "endTime": 7.35},
  {"startTime": 1.1, "endTime": 8.6},
  {"startTime": 0.35, "endTime": 8.966666666666667},
  {"startTime": 0.11666666666666667, "endTime": 6.416666666666667},
  {"startTime": 0.11666666666666667, "endTime": 7.166666666666667},
  {"startTime": 0.5333333333333333, "endTime": 7.216666666666667},
  {"startTime": 1.8166666666666667, "endTime": 6.9},
  {"startTime": 0.5166666666666667, "endTime": 7.016666666666667},
  {"startTime": 2.3, "endTime": 8.9},
  {"startTime": 0.18333333333333332, "endTime": 9.633333333333333},
  {"startTime": 0.95, "endTime": 7.15},
  {"startTime": 23.633333333333333, "endTime": 7.25},
  {"startTime": 23.8, "endTime": 6.766666666666667},
  {"startTime": 0.13333333333333333, "endTime": 6.816666666666666},
  {"startTime": 23.766666666666666, "endTime": 7.066666666666666},
  {"startTime": 2.4833333333333334, "endTime": 8.8},
  {"startTime": 2.183333333333333, "endTime": 8.516666666666667},
  {"startTime": 0.31666666666666665, "endTime": 7.116666666666666},
  {"startTime": 0.2, "endTime": 6.633333333333333},
  {"startTime": 23.833333333333332, "endTime": 6.783333333333333},
  {"startTime": 0.8666666666666667, "endTime": 7.066666666666666},
  {"startTime": 1.0166666666666666, "endTime": 7.066666666666666},
  {"startTime": 23.616666666666667, "endTime": 7.266666666666667},
  {"startTime": 1.9, "endTime": 6.933333333333334},
  {"startTime": 2.7, "endTime": 7.333333333333333},
  {"startTime": 3.2, "endTime": 7.316666666666666},
  {"startTime": 1.5, "endTime": 7.366666666666666}
]
var ds = new DataSet({
  state: {
    sizeEncoding: false
  }
});
var dv = ds.createView("diamond").source(boxData);
dv.transform({
  type: "map",
  callback(row) {
    // 加工数据后返回新的一行，默认返回行数据本身
    if (row.startTime > 12) {
      row.startTime = row.startTime - 24;
    }
    return row;
  }
});
dv.transform({
  sizeByCount: false, // calculate bin size by binning count
  type: "bin.rectangle",
  fields: ["startTime", "endTime"], // 对应坐标轴上的一个点
  bins: [20, 10]
});

var boxChart = new G2.Chart({
  container: "boxNode",
  forceFit: true,
});
boxChart.source(dv);
boxChart.legend({
  // offset: 40
});
boxChart.axis("x", {
  label: {
    formatter: val => {
      if (val < 0) {
        return Number(val) + 24 + ":00";
      } else {
        return val + ":00";
      }
    }
  }
});
boxChart.axis("y", {
  label: {
    formatter: val => val + ":00"
  }
});
boxChart.tooltip(false);
boxChart
  .polygon()
  .position("x*y")
  .color("count", "#BAE7FF-#1890FF-#0050B3");
boxChart.render();
</script>
