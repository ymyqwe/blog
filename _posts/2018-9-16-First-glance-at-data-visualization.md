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

<div id="mountNode"></div>

<script src="/js/moment.js"></script>
<script src="https://gw.alipayobjects.com/os/antv/pkg/_antv.g2-3.2.8/dist/g2.min.js"></script>
<script>
var data = [
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
      height: window.innerHeight
    });
    var newData = data.map(element => {
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
      min: 0,
      alias: "睡眠平均时间(小时)"
    });
    chart.scale("month", {range: [0, 1], alias: "月份", label: "月份"});
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
</script>
