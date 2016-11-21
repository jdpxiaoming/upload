# 电子衣橱API
明确电子衣橱的ＷebService各个功能点以及表设计结构.
## 数据库结构
* 单品

|图片|分类|颜色|标签|季节|收纳位置|价格|Create At|
|---|----|---|---|----|------|----|--------|
|file|上衣|黄色|小清新/萝莉|春秋|主卧-上衣柜|50|2016/11/10|

* 套装

|上衣(单品ｉｄ)|裤子       　|评分     |全身图片   |温度    |季节|
|------------|------------|--------|----------|-------|---|
|oxs098348   |iso23401    |9.5     |fi48BB31le|14-21.5|秋  |

* 分类(衣服品类)

|id |名称 |type |icon |
|---|----|-----|-----|
|1  |上装 |1    |http://xx1.jpg|
|2|裤子|2|http://xx2.jpg|
|3|连衣裙|3|http://xx3.jpg|
|4|开衫/针织衫|４|http://xx４.jpg|
|5|外套|５|http://xx５.jpg|
|6|鞋子|6|http://xx6.jpg|
|7|内衣/睡衣|７|http://xx７.jpg|

* 颜色(颜色对照表)

* 图片()

* 品牌(衣服品牌分类)

|id |名称        |type |website |
|---|-----------|-----|---------|
|1  |Jack&Johnse|1|http://xx1.jpg|
|2|Only|2|http://xx2.jpg|
|3|JUGG|3|http://xx3.jpg|
|4|Addidas|４|http://xx４.jpg|
|5|Nike|５|http://xx５.jpg|
|6|潮流前线|6|http://xx6.jpg|
|7|MetersBanwei|７|http://xx７.jpg|

## WebService API

 1. 获取天气预报 [/getWeather](http://poe.leanapp.cn/getWeather?type=all)    询类型　base 实时　all 一周天气预测[x]


 2. 插入穿衣记录 [saveWear](http://poe.leanapp.cn/saveWear?score=9.6&weather='10°~20°'&image=)

 3. 获取历史套装记录
