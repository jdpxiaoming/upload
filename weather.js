var http = require('http');
var cityinfo = require('./cityid.json');

/**
 * 根据 ip 获取获取地址信息.
 */
var getIpInfo = function(ip, callback) {
    http.get("http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=json&ip=" + ip, function(res) {
        var code = res.statusCode;
        if (code == 200) {
            res.on('data', function(data) {
            	var province = JSON.parse(data).province;
            	var city = JSON.parse(data).city;
				callback([province, city]);
            });
        }
    }).on('error', function(e) { console.log(e) });
}

/**
 * 根据城市获取城市的天气id.
 */
var getCityId = function(country, city){
	var cityid = '101010100';
	var province = cityinfo["China"].province;
	for(var i = 0; i < province.length; i++){
		if(province[i]["name"] == country){
			if(province[i]["city"][0]){
				var citys = province[i]["city"];
				for (var j = 0; j < citys.length; j++) {
					if(citys[j]["name"] == city){
						cityid = citys[j]["county"][0]["weatherCode"];
					}
				};
			}else{
				cityid = province[i]["city"]["county"][0]["weatherCode"];
			}
		}
	}
	return cityid;
}

/**
 * 获取天气数据.
 */
var getWeatherInfo = function(cityid, callback){
	http.get("http://www.weather.com.cn/data/cityinfo/" + cityid + ".html", function(res){
		res.on("data",function(data){
			data = JSON.parse(data);
			callback(data);
		});
	});
}

exports.getIpInfo = getIpInfo;
exports.getCityId = getCityId;
exports.getWeatherInfo = getWeatherInfo;
