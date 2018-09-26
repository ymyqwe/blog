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

最近一直想研究研究数据可视化，想想自己买了 Misfit 的手环也差不多有一年半多了，虽然 Misfit App 上有每日和月度的统计，但是 Misfit 似乎无法满足做长期数据分析的要求，不过幸好 Misfit 有开放 API，可以调用他的 API 来拉取数据，因此我取了<b>2017-01-01 到 2018-08-31</b>期间的睡眠数据来做分析。

本文中的图表均用 [G2](https://antv.alipay.com/zh-cn/g2/3.x/index.html) 绘制，G2 是 AntV 团队基于 The grammar Of Graphics 理论的可视化库。相比于其他的可视化库，G2 还自带数据处理的 DataSet API，相当的实用，强烈推荐有兴趣的同学去学习一下。

## 月度平均睡眠时长

<div id="mountNode"></div>

折线图是日常生活中最常见的数据图标，使用 excel 也能轻易地制作出来，经常用来反应数据随着时间的变化趋势。

首先可以看出来，我从 2017 年 1 月 1 日到 2018 年 8 月 31 日这段时间里，月度平均睡眠时间能超过 7 小时的，只有三个月，可以说是非常缺睡眠了。

2017 年的下半年，整体的睡眠时间是比较少的，主要那个时候在操心装修房子的事，每天工作完了回家都要想这个地方怎么弄，那个地方会不会有问题，还得和设计师沟通，虽然有父亲在家帮我和工人联系，老婆帮我把控装修风格，省了不少事，但是也会去一些地方海淘家具，还是操了不少心，。这段时间持续比较久，估计也是头发掉得最多的时间段。

接下来一个低谷就是 2018 年的 3 月，这段时间又开始忙结婚的事，每天就是，和老婆讨论结婚的细节，和婚庆的沟通，和长辈协商婚礼流程，准备婚庆的各种东西，相比于装修可以说是有过之而无不及，不过结婚要做的事情还是比较少，所以基本上一个三月就搞定了。随后的四月几乎是这个半年来睡得最香的一个月，估计也是烦心事搞定了，才会变得这么能睡吧。

5、6、7 三个月，把人生中最烦恼的两件事搞定了，于是开始放纵了起来，去欧洲度蜜月的时候，每天 12 点睡，6 点起，可以算是作息最规律的时候，然后接下来两个月，不是在玩 switch，就是在看世界杯，或是在准备换工作的面试，跌到了睡眠时间的谷底，非常地堕落，想想自己的年纪轻轻，就身体那边不行，这边不行，接下来还是要好好睡觉啊，毕竟身体才是革命的本钱啊！

## 睡眠时长占比图

<div id="pieNode"></div>

饼图常用于表示不同分类的占比情况，也是非常常见的一种图表。

这些日子里，我的平均睡眠时长是 6 小时 41 分钟。

这张图表用的是四舍五入的数据来统计的，图中可以见到睡了 6.5-7.5 小时这个时间段的次数是最多的，不过令我感到意外的是，超过 8 小时的睡眠居然达到了 109 次，看来我还是比较偏爱睡懒觉的。3.5-6.5 小时的睡眠，占了约 38%，这就大大降低了平均睡眠时长，变得不到 7 小时了。

## 睡眠时长、深度睡眠、浅睡眠雷达图

<div id="radarNode"></div>

雷达图经常用于多分类多维度数据的对比，图中的周中每一天，就属于一个维度，而时间则是一个衡量尺度，这样子就很容易比较出周中每天的变化趋势，以及每天深度浅度睡眠时间占比。

为了符合查理，这边的时间取的都是晚上，比如说你虽然是周六凌晨才睡，但是时间仍然算在周五晚上。分析可知，每周五的深度睡眠时间最长而且占比最高，这大概就是经过一周的劳累，虽然周六早上起来可能有事，但是周五的晚上还是睡得最香。而睡眠时间最长的居然是周一，根据我的推测，是周末一般都比较珍惜时间，用来玩游戏啊，刷社交网站，不愿意睡觉，这样子 high 过了一个周末，到了周一的晚上反而特别累，就睡得早了一点。whatever，这都是根据数据的出来的推测，也回忆不出什么特别的场景了。

## 睡觉起床时间分布图

<div id="boxNode"></div>

这张图表属于热力图，热力图的展现数据通常是三个维度的，两个连续的维度映射到 x, y 轴，第三个连续数据通过颜色映射，热力图主要关注分布。

图中可见，我的主要睡觉时间是 00：30 到 2：00 这个时间段，想想我平日里躺到了床上，就算时间已经到了 1 点，还是要刷刷即刻，看看微博才能睡，这大概就是一个夜猫子最后的倔强吧。而起床时间则主要是 8：00 到 9：00，因为一年半多的时间里，我一直在堆糖工作，上班时间是 10 点，骑车 20 分钟就到了，虽然早上可能偶尔去游个泳，买个早饭回来给老婆吃，而且搬回昆山开始高铁侠这个时间段只有一个月多一点，还不能撼动这么长的时间形成的稳定趋势。

## 总结

之前总是在写电商啊，内容平台的业务，写着写着就发现总是重复劳动，偶尔会有新功能会要去突破自我，但也没有什么自我满足感。现在看了一看数据可视化，才发现有意思的东西有这么多。

其实我分析的数据其实还不够到位，比如睡在出租屋里和家里的睡眠时间和质量，搬家了之后的睡眠时间和质量，世界杯期间的睡眠和质量等等，这些东西都是值得去探讨，去研究的方面。而有些数据从我个人就能分析得到，另外一些则需要大数据才能分析得出，所以数据可视化还是非常有意思的一个领域。

从本次数据可视化的探究，我也得出了以下几点总结：

1. 数据可视化往往就诞生于生活，应用于生活，服务于生活；
2. 数据到处都是，但是如何挖掘数据场景，应用数据场景，就要平时多观察，多累积多实践；
3. 数据可视化的步骤分为以下几步：数据准备、数据整理、绘制图表，在你看到一组数据的时候，你就要洞察他可以从哪些角度来分析，随后你就要确定要用那种展现方式，然后如果你能力够强，就可以自己设计图标（像我这种菜鸡就是跟着别人的 API 来画图）；
4. 数据处理的工具有很多种，选对工具很重要，比如 python 的库和内置方法，处理数据就比 js 方便许多，能达到事半功倍的效果；
5. 画完了图也不要不了了之，分析这些图表，是否可以做 Business Intelligence(BI)，总之就是要不断地思考；
6. 一个人的力量是有限的，互联网时代是信息爆炸的时代，有不懂的就要去搜索，就要找专业的人士去问，这样才能不断成长。

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
