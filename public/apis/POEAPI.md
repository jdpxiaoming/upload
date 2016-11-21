# 电子衣橱API
明确电子衣橱的ＷebService各个功能点以及表设计结构.
## 数据库结构
* 单品

|image|clothes_type|color|tags |store_position|price|Create At|
|----|-------------|-----|-----|--------------|----|--------|
|file|上衣          |黄色 |小清新|衣柜上层        |50.0|2016/11/10|

* 套装

|上衣(单品ｉｄ)|裤子       　|score   |image     |tempture|weather|
|------------|------------|--------|----------|--------|--------|
|oxs098348   |iso23401    |9.5     |fi48BB31le|14-21.5 |spring  |

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

|product_id |product_name|type(String) |website(String)
|---|-----------|-----|---------|
|1  |Jack&Johnse|1|http://xx1.jpg|
|2|Only|2|http://xx2.jpg|
|3|JUGG|3|http://xx3.jpg|
|4|Addidas|４|http://xx４.jpg|
|5|Nike|５|http://xx５.jpg|
|6|潮流前线|6|http://xx6.jpg|
|7|MetersBanwei|７|http://xx７.jpg|

## WebService API

 1. 获取天气预报 /getWeather

 2. 插入图片（支持七牛云存储）

 3. 单品上传

 4. 用户登录/注册/修改密码

 5. 获取单品列表(分类查询)

 6. 获取历史套装记录

 7. 获取衣服分类Category

 8. 获取品牌分类

 9. 获取所有的历史搭配套装信息
