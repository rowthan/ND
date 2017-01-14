/*!
 * section页面切换
 * @version 1.0.0
 * @author WangMingzhu
 * @requie jquery.js
 */

(function(window,document,undefined){
    window.Section=function(params){
    	/*=========================
          Params
          ===========================*/
        var animations={
			"none":"none",
			"slideleft":[{left:"0px"},{"left":"100%"}],
			"slideright":[{left:"0"},{left:"-100%"}],
			"slideup":[{top:"0"},{top:"100%"}],
			"slidedown":[{top:"0"},{top:"-100%"}],
			"fade":[{opacity:"1"},{opacity:"0"}],
		}

		var defaults={
			"defaultAnimation":animations["slideleft"],
			"sectionActiveClass":"active",
			"duration":"500"

			/*callbacks
			onSectionOpenStart:function(Section)//开窗前
			onSectionOpenEnd:function(Section)//开窗完成时动画
			onSectionCloseStart:function(Section)//关窗前
			onSectionCloseEnd:function(Section)//关窗完成时动画
			*/
		}

		params=params||{};
		for(var def in defaults){
			if(params[def]===undefined){
				params[def]=defaults[def];
			}
		}
		var s={};
		s.params=params;
		s.history=[];
		/*=========================
          Method
          ===========================*/
		//打开URL
		s.openURL=function(href, isPush){
			s.history.push(href);
			try{
		        if(isPush)
		            window.history.pushState({href:href},document.title, href);
		        else
		            window.history.replaceState({href:href},document.title, href);
		    }catch(err){
		    	console.log("请检查您当前运行的环境是否为服务器端");
		    }
		}
		//设置section动画
		s.setSectionAnimation=function(aniOrId){
			var sectionAnimation=aniOrId;
			if(aniOrId.indexOf("#")==0)sectionAnimation=$(aniOrId).data("sectionanimation");
			if(sectionAnimation) s.params.animation=animations[sectionAnimation];
			else s.params.animation=s.params.defaultAnimation;
		}
		//关窗函数
		s.closeSection=function(sectionId,animation){
			//删除对应的历史记录
			s.history=s.history.filter(function(n,i,a){
				return n!=sectionId;
			})
			//Callback onSectionCloseStart
			if(s.params.onSectionCloseStart)s.params.onSectionCloseStart(s);
			//设置窗口动画
			if(animation)s.setSectionAnimation(animation);
			else s.setSectionAnimation(sectionId);
			//如果窗口选择为无动画
			if(s.params.animation=="none"){
				$(sectionId).removeClass("active");
				//Callback onSectionCloseEnd
				if(s.params.onSectionCloseEnd)s.params.onSectionCloseEnd(s);
				return;
			}
			//关窗
			$(sectionId).animate(s.params.animation[1],s.params.duration,function(){
				$(this).removeClass("active");
				//Callback onSectionCloseEnd
				if(s.params.onSectionCloseEnd)s.params.onSectionCloseEnd(s);
			});
		}
		//开窗函数
		s.openSection=function(sectionId){
			//添加历史记录，并修改浏览器地址
			s.openURL(sectionId,true);
			//Callback onSectionOpenStart
			if(s.params.onSectionOpenStart)s.params.onSectionOpenStart(s);
			//设置窗口动画
			s.setSectionAnimation(sectionId);
			//开窗
			$(sectionId).addClass("active");
			//如果窗口选择为无动画
			if(s.params.animation=="none"){
				//Callback onSectionOpenEnd
				if(s.params.onSectionOpenEnd)s.params.onSectionOpenEnd(s);
				return;
			}
			$(sectionId).css(s.params.animation[1]);
			$(sectionId).animate(s.params.animation[0],s.params.duration,function(){
				//Callback onSectionOpenEnd
				if(s.params.onSectionOpenEnd)s.params.onSectionOpenEnd(s);
			});
		}
		//回退函数
		s.backSection=function(){
			//清除顶层历史记录
			s.sectionId=s.history[s.history.length-1];
			//关闭清除的那层
			s.closeSection(s.sectionId);
		}
		/*=========================
          Events Click
          ===========================*/
		$("[data-target=section]").click(function(e){
			s.target=e.target;
			s.sectionId=$(this).attr("href");
			if($.inArray(s.sectionId,s.history)>=0)return false;
			//开窗
			s.openSection(s.sectionId);
			return false;
		});
		/*=========================
          Events Back
          ===========================*/
		window.onpopstate = function(event) {
			if(event.state && event.state.href && s.sectionId==event.state.href){
				s.openSection(event.state.href);
				console.log("不允许前进");
				return;
			}
			//后退
			s.backSection();
			console.log("后退"+s.history);
			//console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));
		};
		return s;
	}
})(window,document,undefined);

/*!
 * 动画库
 * @version 1.0.0
 * @author WangMingzhu
 * 
 * @import EventUtil from './eventutil.js'
 */

/**
*  常用的动画库
* 
*  @class Animate
*/

var Animate=(function(){
	var requestAnimationFrame = window.requestAnimationFrame||
		window.webkitRequestAnimationFrame||
		window.mozRequestAnimationFrame||
		window.oRequestAnimationFrame||
		window.msRequestAnimationFrame||
		function (callback) { window.setTimeout(callback, 1000 / 60); };

	var cancelAnimationFrame = window.cancelAnimationFrame||
		window.webkitCancelAnimationFrame||
		window.mozCancelAnimationFrame||
		window.oCancelAnimationFrame||
		window.msCancelAnimationFrame||
		function (handler) { window.clearTimeout(handler); };

	function intervalNumber(el){
		var toNumber=el.getAttribute("data-to")||0;
		var fromNumber=el.getAttribute("data-from")||0;
		var duration=el.getAttribute("data-duration")||500;
		//总值
		var diffNumber=toNumber-fromNumber;
		if(diffNumber<0 || isNaN(fromNumber) || isNaN(toNumber)){
			console.log("请确定开始时间与结束时间是否输入正确！");
			return;
		}
		//帧毫秒
		var milli=10;
		//总帧数
		var fps=duration/milli;
		//每帧增加的数字
		var plusNumberFps=Math.round(diffNumber/fps);
		//如果总帧数大于总值，则将帧数缩减等同于总值，并设置正确的帧毫秒
		if(plusNumberFps<1){
			fps=diffNumber;
			milli=duration/fps;
			plusNumberFps=Math.round(diffNumber/fps);
		}
		var countTimer=setInterval(function(){
			fromNumber=fromNumber+plusNumberFps;
			el.innerHTML=fromNumber;
			if (fromNumber >= toNumber) {
				el.innerHTML=toNumber;
				clearInterval(countTimer);
			}
		},milli);
	}
	function rafNumber(el){
		var toNumber=el.getAttribute("data-to")||0;
		var fromNumber=el.getAttribute("data-from")||0;
		function step() {
			fromNumber += 1;
			el.innerHTML=fromNumber;
			if (fromNumber < toNumber) {
				requestAnimationFrame(step);
			}
		}
		step();
	}
	//setInterval帧率测试
	function testSiFps(callback){
    	var fps=0;
    	var si=setInterval(function(){
    		fps++;
    	},1);
    	setTimeout(function(){
    		//alert("setInterval帧率："+fps);
    		if(callback){
    			callback(fps);
    		}
			clearInterval(si);
		},1000);
	}
	//requestAnimationFrame帧率测试
	function testRafFps(callback){
    	var fps=0;
    	function fpstest(timestamp){
    		fps++;
    		var raf=requestAnimationFrame(fpstest);
    		if(timestamp>=1000){
    			//alert("requestAnimationFrame帧率："+count1);
    			if(callback){
	    			callback(fps);
	    		}
    			cancelAnimationFrame(raf);
    		}
    	}
    	requestAnimationFrame(fpstest);
	}

	return{
		//动画执行一次后销毁
		one:function(el,aniname){
			var animExpr=new RegExp("\\s{0,}"+aniname,"g");
			if(el.className.match(animExpr)){
				el.className=el.className.replace(animExpr,"");
			}
			el.className+=" "+aniname;
			EventUtil.addHandler(el,"animationend",function(e){
				el.className=el.className.replace(animExpr,"");
			});
		},
		//setTime帧率测试
		testSiFps:testSiFps,
		//requestAnimation帧率测试
		testRafFps:testRafFps,
		//计数器
		counter:function(){
			var timers=document.querySelectorAll(".timer");
			for(var i=0,t;t=timers[i++];){
				intervalNumber(t);
			}
		}
	}
})();

/*!
 * 百度地图api
 * @version 1.0.0
 * @author WangMingzhu
 */

/**
*  百度地图api调用
* 
*  @class BaiduMap
*/
(function(window,document,undefined){
	
	window.BaiduMap=function(container,params){
		/*=========================
          Params
          ===========================*/
        var defaults={
        	//定义弹出框样式
			"infoWindowStyle":{
				width:250,
				height:120,
				title:"<h4 style='margin:0 0 5px 0;padding:0.2em 0'>最新签到</h4>",
				enableMessage:true,
				offset:new BMap.Size(0, -20)
			},
			//自定义标记图标
			"markerIcon":null,
			//自定义标记label样式
			"labelStyle":{
				display:"block",
				position:"relative",
				width:"30px",
				height:"30px",
				borderRadius:"50% 50% 50% 0",
				webkitTransform:"rotate(-45deg)",
				webkitTransformOrigin:"center",
				border:"none",
				margin:"-12px 0 0 -7px"
			},
		}
		params=params||{};
		for(var def in defaults){
			if(params[def]===undefined){
				params[def]=defaults[def];
			}
		}
		//Map
		var s=this;
		//Params
		s.params = params;
		//初始化地图控件
		s.map = new BMap.Map(container);
		s.container=document.querySelector("#"+container);
		
		/*=========================
          Method
          ===========================*/
        //标记点击，打开infowWindow
        function addClickHandler(content,marker){
			marker.addEventListener("click",function(e){
				openInfo(content,e)}
			);
		}
		//打开infowWindow
		function openInfo(content,e){
			var p = e.target;
			var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
			var infoWindow = new BMap.InfoWindow(content,s.params.infoWindowStyle);  // 创建信息窗口对象 
			s.map.openInfoWindow(infoWindow,point); //开启信息窗口
		}
		//显示地图标记
		s.show=function(markerData){
			s.map.clearOverlays();
			if(!markerData){
				s.map.centerAndZoom("南京", 15);
				return;
			}
			if(arguments.length===2){
				s.map.centerAndZoom(new BMap.Point(arguments[0],arguments[1]), 15);
				return;
			}
			//显示区域
			s.map.centerAndZoom(new BMap.Point(markerData[0][0],markerData[0][1]), 15);
			for(var i=0;i<markerData.length;i++){
				//添加label对象
				if(s.params.labelStyle){
					var myLabel=new BMap.Label(markerData[i][3]);
					s.params.labelStyle.backgroundColor=markerData[i][4];
					myLabel.setStyle(s.params.labelStyle);
				}
				//添加描点
				var marker = new BMap.Marker(new BMap.Point(markerData[i][0],markerData[i][1]));
				if(s.params.markerIcon)marker.setIcon(s.params.markerIcon);
				marker.setLabel(myLabel);
				var content = markerData[i][2];
				s.map.addOverlay(marker);
				//添加点击
				addClickHandler(content,marker);
			}
		}
		//获得gps位置信息
		s.gps=function(featureHandler,feature){
			var geolocation = new BMap.Geolocation();
			geolocation.getCurrentPosition(function(pos){
				if(this.getStatus() == BMAP_STATUS_SUCCESS){
					var point=pos.point,y=point.lng,x=point.lat;
					//这里是坐标point
					if(feature && feature==="point"){
						featureHandler(point);
						return;
					}
					//根据point得到地址
					var gpsPlace = new BMap.Geocoder();
					gpsPlace.getLocation(point, function(result){      
						if (result){
							//执行传入的回调函数
							featureHandler(point,result.address);
						}else{
							alert("获取地址失败"+this.getStatus());
						}
					});
				}else {
					alert("获取坐标失败"+this.getStatus());
				}
			},{enableHighAccuracy: true});
		}
		//根据坐标获得地址
		s.place=function(point,featureHandler){
			alert(point);
			//根据point得到地址
			var gpsPlace = new BMap.Geocoder();
			gpsPlace.getLocation(point, function(result){      
				if (result){
					//执行传入的回调函数
					if(feature && feature==="place"){
						featureHandler(result.address);
					}
				}
			});
		}
		//一键导航
		s.mapGuide=function(guideopts){
			var lng=guideopts.point.lng;
			var lat=guideopts.point.lat;
			var title=guideopts.title;
			var content=guideopts.content;
			window.location.href='http://api.map.baidu.com/marker?location='+lat+','+lng+'&title='+title+'&content='+content+'&output=html';
		}

		//返回地址截图
		s.mapImg=function(mapImgOpt){
			var lng=mapImgOpt.point.lng;
			var lat=mapImgOpt.point.lat;
			var title=mapImgOpt.title;
			var content=mapImgOpt.content;
			var width=mapImgOpt.width;
			var height=mapImgOpt.height;
			
			var imgSrc="http://api.map.baidu.com/staticimage?width="+width+"&height="+height+"&center="+lng+","+lat+"&markers="+lng+","+lat+"&scale=1&zoom=15&markerStyles=-1,http://api.map.baidu.com/images/marker_red.png";
			return imgSrc;
		}
	};
})(window,document,undefined);

/*!
 * 日期能力扩展
 * @version 1.0.0
 * @author WangMingzhu
 */

/**
*  日期能力扩展
* 
*  @class DateUtil
*/
var DateUtil=function(){
	
	var date = new Date();
	return {
		year:function(){
			return date.getFullYear();
		},
		month:function(){
			return date.getMonth() + 1;
		},
		day:function(){
			return date.getDate();
		},
		hour:function(){
			return date.getHours();
		},
		minute:function(){
			return date.getMinutes();
		},
		seconds:function(){
			return date.getSeconds();
		},
		quarter:function(){
			return Math.floor((date.getMonth()+3)/3);
		},
		milliseconds:function(){
			return date.getMilliseconds();//获得时间的毫秒
		},
		today:function(){
			return date.getFullYear()+"-"+DateUtil.month()+"-"+date.getDate();
		},
		now:function(){
			return date.getHours()+":"+date.getMinutes();
		},
		todayNow:function(){
			return DateUtil.today()+" "+DateUtil.now();
		},
		fullTodayNow:function(){
			return DateUtil.today()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
		},
		time:function(){
			return date.getTime();//获得现在距1970-1-1的毫秒数
		},
		//返回当月共多少天
		days:function(month,year){
			var monthExpr=/^(0?[[1-9]|1[0-2])$/;//匹配1-12月
			var yearExpr=/^[1-2][0-9][0-9][0-9]$/;//匹配1000-2999年
			if(month && year){
				if(monthExpr.exec(month) && yearExpr.exec(year)){
					return new Date(year,month,0).getDate();
				}else{
					alert("您输入的月份和年份不正确");
					return;
				}
			}
			if(month){
				if(monthExpr.exec(month)){
					return new Date(date.getFullYear(),month,0).getDate();
				}else{
					alert("您输入的月份不正确");
					return;
				}
			}
			return new Date(date.getFullYear(), (date.getMonth()+1), 0).getDate();
		},
		tomorrow:function(){
			if(DateUtil.days()>=DateUtil.day()+1){
				return DateUtil.year()+"-"+DateUtil.month()+"-"+eval(DateUtil.day()+1);
			}else{
				if(DateUtil.month()==12){
					return eval(DateUtil.year()+1)+"-"+1+"-"+1;
				}
				return DateUtil.year()+"-"+eval(DateUtil.month()+1)+"-"+1;
			}
		},
		plusDay:function(num){
			if(DateUtil.days()>=DateUtil.day()+num){
				return DateUtil.year()+"-"+DateUtil.month()+"-"+eval(DateUtil.day()+num);
			}else{
				if(DateUtil.month()==12){
					return eval(DateUtil.year()+num)+"-"+num+"-"+num;
				}
				return DateUtil.year()+"-"+eval(DateUtil.month()+num)+"-"+num;
			}
		},
		//格式化日期yyyy-MM-dd hh:mm:ss
		format:function(fmtDate,fmtType){
			var fmt="yyyy-MM-dd hh:mm:ss";
			if(fmtType){
				fmt=fmtType;
			}
			var y,M,d,h,m,s;
			
			if(fmtDate instanceof Date == true){
				y=fmtDate.getFullYear();
				M=fmtDate.getMonth() + 1;
				d=fmtDate.getDate();
				h=fmtDate.getHours();
				m=fmtDate.getMinutes();
				s=fmtDate.getSeconds();
			}
			//如果不是Date对象,就用另一种方法处理
			else{
				//匹配年月日yyyy-MM-dd或者yyyy.mm.dd或者yyyy/mm/dd
				var dateExpr=/([1-2][0-9][0-9][0-9])[\.\/-](0?[[1-9]|1[0-2])[\.\/-]([1-3][0-9]|0?[0-9])/
				var dateMatch=dateExpr.exec(fmtDate);
				if(!dateMatch || isNaN(dateMatch[1])  && isNaN(dateMatch[2]) && isNaN(dateMatch[3])){
					alert("您所要格式化的时期格式不正确");
					return;
				}
				y=dateMatch[1];
				M=dateMatch[2];
				d=dateMatch[3];
				h="00";
				m="00";
				s="00";
				
				//匹配时分hh:mm
				var timeExpr=/(0?[0-9]|[1-2][0-9]):([1-6][0-9]|0?[0-9])/
				var timeMatch=timeExpr.exec(fmtDate);
				if(timeMatch){
					h=timeMatch[1]?timeMatch[1]:"00";
					m=timeMatch[2]?timeMatch[2]:"00";
					s="00";
				}
				
				//匹配时分hh:mm:ss
				var tExpr=/(\d{2}|\d{1}):(\d{2}|\d{1}):(\d{2}|\d{1})/
				var tMatch=tExpr.exec(fmtDate);
				if(tMatch){
					h=tMatch[1]?tMatch[1]:"00";
					m=tMatch[2]?tMatch[2]:"00";
					s=tMatch[3]?tMatch[3]:"00";
				}
			}
			
			var dateExprs={
				"M+" :M,   
				"d+" :d,  
				"h+" :h,   
				"m+" :m,  
				"s+" :s
			};
			if(/(y+)/.test(fmt)){
				fmt=fmt.replace(RegExp.$1, (y+"").substr(4 - RegExp.$1.length));
			}
			for(var k in dateExprs){
				//"("+ k +")"=(M+)、(d+)、(h+)...
				if(new RegExp("("+ k +")").test(fmt)){
					fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (dateExprs[k]) : (("00"+ dateExprs[k]).substr((""+ dateExprs[k]).length)));   
				}
			}
			return fmt;
		},
		//时效性
		expires:function(cacheTime){
			var y=date.getFullYear();
			var M=date.getMonth() + 1;
			var d=date.getDate();
			var h=date.getHours();
			var m=date.getMinutes();
			var s=date.getSeconds();
			if(!cacheTime){
				alert("请传入合法的时效");
				return;
			}
			//当传入的是today，时效将保存到隔天0点0分
			if(cacheTime==="today"){
				d++;
				h=0;
				m=0;
				s=0;
			}
			//当传入的是数字，并且小于1，当作延长分钟
			if(!isNaN(cacheTime) && cacheTime<1){
				m+=Math.abs(Math.round(cacheTime*60));
				if(m>=60){
					m=m-60
					h+=1;
				}
			}
			//当传入的是数字，并且大于1，当作延长小时
			if(!isNaN(cacheTime) && cacheTime>=1){
				h+=Math.abs(Math.round(cacheTime));
			}
			if(typeof cacheTime==="object"){
				if(!isNaN(cacheTime.year) && eval(cacheTime.year+y)<=2999){
					y=cacheTime.year?cacheTime.year+y:y;
				}
				if(!isNaN(cacheTime.month) && eval(cacheTime.month+M)<=12){
					M=cacheTime.month?cacheTime.month+M:M;
				}
				if(!isNaN(cacheTime.day) && eval(cacheTime.day+d)<=DateUtil.days()){
					d=cacheTime.day?cacheTime.day+d:d;
				}
				if(!isNaN(cacheTime.hour) && eval(cacheTime.hour+h)<24){
					h=cacheTime.hour?cacheTime.hour+h:h;
				}
				if(!isNaN(cacheTime.minute) && eval(cacheTime.minute+m)<60){
					m=cacheTime.minute?cacheTime.minute+m:m;
				}
				if(!isNaN(cacheTime.second) && eval(cacheTime.second+s)<60){
					s=cacheTime.second?cacheTime.second+s:s;
				}
			}
			return y+"-"+M+"-"+d+" "+h+":"+m+":"+s;
		}
	};
}();

/*!
 * 本地数据库
 * @version 1.0.0
 * @author WangMingzhu
 */

/**
 *  本地数据库
 * 
 *  @class DB
 */

var DB = function() {
    

    function checkManifest() {
        window.addEventListener("updateready", function(e) {
            console.log("离线缓存状态：" + window.applicationCache.status);
            if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
                window.applicationCache.swapCache();
                if (confirm('发现此manifest文件有更新，是否更新？')) {
                    window.location.reload();
                }
            } else {
                console.log('manifest文件没有变化');
            }
        }, false);
    }

    function setCookie(key, value) {
        var Days = 30;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = key + "=" + escape(value) + ";expires=" + exp.toGMTString();
    }

    function getCookie(key) {
        var valExpr = new RegExp("(^| )" + key + "=([^;]*)(;|$)");
        var match = valExpr.exec(document.cookie);
        if (match && match[2]) {
            return unescape(match[2]);
        }
        return null;
    }

    function delCookie(key) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var val = getCookie(key);
        if (val != null) {
            document.cookie = key + "=" + val + ";expires=" + exp.toGMTString();
        }
    }

    var store = window.localStorage;
    var session = window.sessionStorage;
    if (!store) {
        doc.style.behavior = 'url(#default#userData)'; //保存表单的值
        //console.log("您当前的设备不支持本地数据库localstore");
    }
    return {
        //application cache
        checkManifest: checkManifest,
        /**
         * 保存数据
         * 
         * @method set
         * @param key //键
         * @param val //值
         * @return void
         */
        set: function(key, val) {
            if (store) {
                store.setItem(key, val);
            } else {
                setCookie(key, val);
            }
        },
        /**
         * 保存数据
         * 
         * @method get
         * @param key //键
         * @return string //返回您所存储的值
         */
        get: function(key) {
            if (store) {
                if (typeof key == "number") {
                    return store.key(key);
                }
                return store.getItem(key);
            } else {
                return getCookie(key);
            }
        },
        /**
         * 删除数据
         * 
         * @method del
         * @param key //根据键删除此项
         */
        del: function(key) {
            if (store) {
                store.removeItem(key);
            } else {
                delCookie(key);
            }
        },
        /**
         * 清空数据
         * 
         * @method clear
         * @return void
         */
        clear: function() {
            if (store) {
                return store.clear();
            } else {
                alert("抱歉，cookie不可以全部清空!");
            }
        },

        setSession: function(key, value) {
            session.setItem(key, value);
        },
        getSession: function(key) {
            if (typeof key == "number") {
                return session.key(key);
            }
            return session.getItem(key);
        },
        delSession: function(key) {
            session.removeItem(key);
        },
        clearSession: function() {
            session.clear();
        },
        /**
         * 根据请求名称获取值
         * 
         * @method getParameter
         * @param argName //参数名称
         * @return string
         */
        getParameter: function(argName){
            var param = location.search.match(new RegExp("[\?\&]" + argName + "=([^\&]*)(\&?)","i"));
            return param ? param[1] : param;
        }
    };
}();

/*!
 * 设备信息
 * @version 1.0.0
 * @author WangMingzhu
 */

/**
*  获取设备信息
* 
*  @class Device
*/
(function(window,document,undefined){
	window.Device=function(){
		var u=navigator.userAgent,app=navigator.appVersion;
		function isPc(){
			var userAgentInfo = navigator.userAgent;  
			var agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");  
			var flag = true;
			for (var i=0;i<agents.length;i++) {  
				if (u.indexOf(agents[i])>0){ 
					flag = false; break; 
				}
			}  
			return flag; 
		}
		return{
		    //四大内核
		    isTrident:u.indexOf('Trident') > -1,
		    isPresto:u.indexOf('Presto') > -1,
		    isWebKit:u.indexOf('AppleWebKit') > -1,
		    isGecko:u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
		    //设备判断
		    isMobile:!!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
		    isIPhone:u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
		    isIPad:u.indexOf('iPad') > -1, //是否iPad
		    isWebApp:u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
		    isPc:isPc(),//是否是PC端
		    //平台判断
		    isAndroid:u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
		    isIos:!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),//ios终端
		    //isWebview =u.toLowerCase().indexOf("webview") > -1,
		    //应用程序判断
			isWeixin:app.toLowerCase().indexOf("micromessenger") > -1,//判断是否是微信
			isUC:app.toLowerCase().indexOf("ucbrowser") > -1,//判断是否是UC
			isQQ:app.toLowerCase().indexOf("mqqbrowser") > -1,//判断是否是UC
		    language:(navigator.browserLanguage || navigator.language).toLowerCase(),
		    userAgent:u,
		    appVersion:app,
		    isOnline:window.navigator.online,
		    isExmobi:app.toLowerCase().indexOf("exmobi") > -1//判断是否是Exmobi
	   }
	}();
})(window,document,undefined);

(function(window,document,undefined){
	window.Shake=function(params){
		/*=========================
          Params
          ===========================*/
		var defaults={
			"shakeThreshold":3000,
			/*callbacks
			onShook:function(Slider)
			*/
		}
		params=params||{};
		for(var def in defaults){
			if(params[def]===undefined){
				params[def]=defaults[def];
			}
		}
		//Shake
		var s=this;
		s.params=params;
		var lastUpdate=0;//设置最后更新时间，用于对比
		var curShakeX=curShakeY=curShakeZ=lastShakeX=lastShakeY=lastShakeZ=0;
		/*=========================
          Handler
          ===========================*/
		function deviceMotionHandler(e) {
			var acceleration =e.accelerationIncludingGravity;//获得重力加速
			var curTime = new Date().getTime();//获得当前时间戳
			if ((curTime - lastUpdate)> 100) {
				var diffTime = curTime -lastUpdate;//时间差
					lastUpdate = curTime;
				curShakeX = acceleration.x;//x轴加速度
				curShakeY = acceleration.y;//y轴加速度
				curShakeZ = acceleration.z;//z轴加速度
				var speed = Math.abs(curShakeX + curShakeY + curShakeZ - lastShakeX - lastShakeY - lastShakeZ) / diffTime * 10000;
				if (speed > s.params.shakeThreshold) {
					if(s.params.onShook)s.params.onShook(s);
				}
				lastShakeX = curShakeX;
				lastShakeY = curShakeY;
				lastShakeZ = curShakeZ;
			}
		}
		if (window.DeviceMotionEvent) {
			window.addEventListener('devicemotion', deviceMotionHandler, false);
		}else{
			console.log('您好，你目前所用的设备好像不支持重力感应哦！');
		}
	}
})(window,document,undefined);

(function(window,document,undefined){
	window.Dragrefresh=function(container,params){
		/*==================
		  Model
		  ==================*/
		var defaults={
			"minScrollTop":0,
			"refreshThreshold":100,
			"refreshThresholdMax":200,
			"refreshHideTop":0,
			"duration":300,
			"timeout":5000

			/*callbacks
			onRefreshStart:function(Dragrefresh)
			onRefreshEnd:function(Dragrefresh)
			onRefreshTimeout:function(Dragrefresh)
			*/
		}
		params=params||{};
		for(var def in defaults){
			if(params[def]===undefined){
				params[def]=defaults[def];
			}
		}
		var s=this;
		s.params=params;
		s.container=typeof container=="string"?document.querySelector(container):container;

		/*==================
		  View Refresh
		  ==================*/
		s.createRefresh=function(){
			if(s.refreshBox)return;
			s.refreshBox=document.createElement("div");
			s.refreshBox.setAttribute("class","dragrefresh box box-middlecenter");
			var iconSvg='<svg width="1000.6px" height="1000.6px" viewBox="0 0 1000.6 1000.6" xml:space="preserve">'+
						'<path d="M867.4,456.1c-24.1,0-43.8,19.7-43.8,43.8c0,1.5,0.1,3.1,0.3,4.6c-2.2,176.4-147.1,319.6-323.7,319.6 c-178.5,0-323.8-145.3-323.8-323.8s145.3-323.8,323.8-323.8c62.8,0,122.8,17.7,174.4,50.8l-29,52.2c0,0,138.4,2.2,149.2,2.4 c10.8,0.2,14.6-5.6,14.6-5.6s5.1-5.8,2.4-15.5c-2.6-9.7-43.2-162.2-43.2-162.2l-38.5,61.1c-67.3-45.7-146.7-70.1-229.8-70.1 c-226.6,0-411,184.4-411,411s184.4,411,411,411c225.8,0,410.1-183.7,410.9-407.3l0.2-4.2C911.2,475.7,891.6,456.1,867.4,456.1z"/>'+
						'</svg>';
			s.refreshBox.innerHTML=iconSvg;
			s.refreshEl=s.refreshBox.childNodes[0];
			s.container.appendChild(s.refreshBox);
		};
		s.hideRefresh=function(){
			s.transition();
			s.touches.posY=s.params.refreshHideTop;
			s.refreshBox.style.WebkitTransform='translateY(' + s.touches.posY + 'px)';
		};
		/*==================
		  Refresh Animate
		  ==================*/
		s.transition=function(){
			//s.refreshBox.style[transition]=s.params.duration+"ms";
			s.refreshBox.style.WebkitTransition=s.params.duration+"ms";
		};
		s.cancelTransition=function(){
			//s.refreshBox.style[transition]="0ms";
			s.refreshBox.style.WebkitTransition="0ms";
		};

		s.spinner=function(){
			s.rotate+=10;
			if(s.rotate>=360){
				s.rotate=0;
			}
			//s.refreshBox.style[transform]="rotate("+s.rotate+"deg)";
			s.refreshEl.style.WebkitTransform="rotate("+s.rotate+"deg)";

			s.rAf=s.requestAnimationFrame(s.spinner);
		};
		s.cancelSpinner=function(){
			s.cancelAnimationFrame(s.rAf);
		};

		//Controller
		/*==================
		  Callback onRefreshStart
		  ==================*/
		s.refresh=function(){
			s.transition();
			s.refreshBox.style.WebkitTransform='translateY(' + s.params.refreshThreshold + 'px)';
			setTimeout(function(){
				s.cancelTransition();
				s.spinner();
			}, s.params.duration);
			//callback onRefreshStart
			if(s.params.onRefreshStart){
				s.params.onRefreshStart(s);
			}
			//callback onOvertime
			if(s.params.onRefreshTimeout){
				s.refreshOvertime();
			}
		};
		/*==================
		  Callback onRefreshEnd
		  ==================*/
		s.refreshComplete=function(){
			s.cancelOvertime();
			s.cancelSpinner();
			s.hideRefresh();
			s.attach();
			//callback onRefreshEnd
			if(s.params.onRefreshEnd){
				s.params.onRefreshEnd(s);
			}
		}
		/*==================
		  Callback onRefreshTimeout
		  ==================*/
		s.refreshOvertime=function(){
			//callback onRefreshEnd
			s.timeout=setTimeout(function(){
				s.cancelSpinner();
				s.hideRefresh();
				s.attach();
				s.params.onRefreshTimeout(s);
			}, s.params.timeout);
		};
		s.cancelOvertime=function(){
			if(s.timeout)window.clearTimeout(s.timeout);
		};

		/*==================
		  Callback onBottom
		  ==================*/
		s.bottomRefreshEl=s.container.querySelector(".loading-more");
		function createBottomRefresh(){
			if(s.bottomRefreshEl)return;
			s.bottomRefreshEl=document.createElement("div");
			s.bottomRefreshEl.setAttribute("class","loading-more");
			var spinnerdiv=document.createElement("div");
			spinnerdiv.setAttribute("class","loading");
			s.bottomRefreshEl.appendChild(spinnerdiv);

			s.container.appendChild(s.bottomRefreshEl);
		}
		s.bottomRefresh=function(){
			if(!s.params.onBottom)return;
			//创建底部刷新块
			createBottomRefresh();
			//判断是否滚动到底部
			s.container.addEventListener("scroll",function(e){
	            if (this.scrollTop + this.clientHeight >= this.scrollHeight){
	                s.params.onBottom(s);
	            }
	        },false);
		};

		//事件管理
		s.events=function(detach){
			var touchTarget=s.container;
			var action=detach?"removeEventListener":"addEventListener";
			touchTarget[action]("touchstart",s.onTouchStart,false);
			touchTarget[action]("touchmove",s.onTouchMove,false);
			touchTarget[action]("touchend",s.onTouchEnd,false);
			touchTarget[action]("touchcancel",s.onTouchEnd,false);
		}
		//attach、detach事件
		s.attach=function(attachEvent){
			if(!attachEvent){
				s.events();
				return;
			}
			if(attachEvent=="start"){
				s.container["addEventListener"]("touchstart",s.onTouchStart,false);
			}
			if(attachEvent=="move"){
				s.container["addEventListener"]("touchmove",s.onTouchMove,false);
			}
			if(attachEvent=="end"){
				s.container["addEventListener"]("touchend",s.onTouchEnd,false);
			}
		};
		s.detach=function(detachEvent){
			if(!detachEvent){
				s.events(true);
				return;
			}
			if(detachEvent=="start"){
				s.container["removeEventListener"](touchEvents.start,s.onTouchStart,false);
			}
			if(detachEvent=="move"){
				s.container["removeEventListener"](touchEvents.move,s.onTouchMove,false);
			}
			if(detachEvent=="end"){
				s.container["removeEventListener"](touchEvents.end,s.onTouchEnd,false);
			}
		};
		//Touch信息
        s.touches={
        	isTop:true,
        	startX:0,
        	startY:0,
        	currentX:0,
        	currentY:0,
        	endX:0,
        	endY:0,
        	diffX:0,
        	diffY:0,
        	posY:0
        };
        function preventDefault(e){
			e.preventDefault();
		}
		s.onTouchStart=function(e){
			//如果不在顶部，则不触发
			if(s.container.scrollTop>s.params.minScrollTop){
				s.touches.isTop=false;
			}else{
				s.touches.isTop=true;
			}
			s.cancelTransition();
			s.touches.startX=e.touches[0].clientX;
			s.touches.startY=e.touches[0].clientY;
		};
		s.onTouchMove=function(e){
			s.touches.currentX=e.touches[0].clientX;
			s.touches.currentY=e.touches[0].clientY;
			s.touches.diffY=s.touches.currentY-s.touches.startY;
			s.touches.diffX=s.touches.startX-s.touches.currentX;
			//不在头部、横向滚动、向上滚动，则不下拉刷新
			if(!s.touches.isTop || Math.abs(s.touches.diffX) > Math.abs(s.touches.diffY) || s.touches.diffY<0){
				return;
			}
			e.preventDefault();
			s.touches.posY=s.params.refreshHideTop+s.touches.diffY;
			//console.log(s.touches.posY);
			if(s.touches.posY<s.params.refreshThresholdMax){
				s.rotate=s.touches.posY*2;
				//s.refreshBox.style.top=s.touches.posY + 'px';
				s.refreshEl.style.WebkitTransform='rotate(' + s.rotate + 'deg)';
				s.refreshBox.style.WebkitTransform='translateY(' + s.touches.posY + 'px)';
			}
		};
		s.onTouchEnd=function(e){
			//s.container.removeEventListener("touchmove",preventDefault,false);
			//如果小于hold值，则收起刷新
			if(s.touches.posY<s.params.refreshThreshold){
				s.hideRefresh();
				return;
			}
			//刷新
			s.refresh();
			//移动事件绑定，否则会在刷新过程中重新触发下拉刷新
			s.detach();
		};
		
		//主函数
		s.init=function(){
			s.createRefresh();
			s.attach();
			//底部触发事件
			s.bottomRefresh();
		};

		s.init();
	};
	Dragrefresh.prototype={
		/*scrollTop:(function(){
			 return document.body.scrollTop;
		})(),*/
		requestAnimationFrame:function(callback){
			var rAF = window.requestAnimationFrame	||
			window.webkitRequestAnimationFrame	||
			window.mozRequestAnimationFrame		||
			window.oRequestAnimationFrame		||
			window.msRequestAnimationFrame		||
			function (callback) { window.setTimeout(callback, 1000 / 60); };
			var r=rAF(callback);
			return r;
		},
		cancelAnimationFrame:function(handler){
			var cAF = window.cancelAnimationFrame	||
			window.webkitCancelAnimationFrame	||
			window.mozCancelAnimationFrame		||
			window.oCancelAnimationFrame		||
			window.msCancelAnimationFrame		||
			function (handler) { window.clearTimeout(handler); };
			cAF(handler);
		},
	}
})(window,document,undefined);

/*!
 * 事件函数库
 * @version 1.0.0
 * @author WangMingzhu
 */

/**
*  事件函数库，兼容性强
* 
*  @class EventUtil
*/
(function(window,document,undefined){
	
	function _swipe_(element,type,handler){
		var xDown, yDown,xUp,yUp,xDiff,yDiff;
		element.addEventListener( 'touchstart', function( e ){
			var touches = e.touches[0];
			xDown = touches.clientX;
			yDown = touches.clientY;
		}, false);
		
		element.addEventListener( 'touchend', function( e ){
			var touches = e.changedTouches[0],
			xUp = touches.clientX,
			yUp = touches.clientY;
			xDiff=xDown - xUp;
			yDiff=yDown - yUp;
			//单击事件
			if( Math.abs(xDown - xUp) < 6 && Math.abs(yDown - yUp) < 6 ){
				if(type==="tap"){
					handler(e);
				}
				return "tap";
			}
			//上下滑动
			if(Math.abs(yDiff)>Math.abs(xDiff)){
				if(yDiff>0){
					if(type==="swipeup"){
						handler(e);
					}
					return "swipeup";
				}
				
				if(type==="swipedown"){
					handler(e);
				}
				return "swipedown";
			}
			//左右滑动
			if(xDiff>0){
				if(type==="swipeleft"){
					handler(e);
				}
				return "swipeleft";
			}
			if(type==="swiperight"){
				handler(e);
			}
			return "swiperight";
		}, false );
	};
	//transtionend事件与animationend兼容写法
	var transitionend,animationend;
	function whichKernel(){
		var t,
		el = document.createElement("fakeelement");
		var transitions = {
			"transition"      : ["transitionend","animationend"],
			"OTransition"     : ["oTransitionEnd","oAnimationEnd"],
			"MozTransition"   : ["transitionend","animationend"],
			"WebkitTransition": ["webkitTransitionEnd","webkitAnimationEnd"]
		};
		for (t in transitions){
			if (el.style[t] !== undefined){
				transitionend=transitions[t][0];
				animationend=transitions[t][1];
				break;
			}
		}
	};
	var EventUtil = {
		/**
		 * 绑定事件
		 * 
		 * @method addHandler
		 * @param element //元素对象
		 * @param type //事件类型
		 * @param handler //响应函数
		 * @return void
		 */
		callback:function(fun,event){
			fun(event);
		},
		addHandler:function (element, type, handler) {
			//tap、swipeleft、swiperight、swipedown、swipeup
			if(type==="tap" || type==="swipeleft" ||  type==="swiperight" ||  type==="swipedown" ||  type==="swipeup"){
				_swipe_(element,type,handler);
				return;
			}
			//animationend
			if(type.toLowerCase()==="animationend"){
				if(!animationend){
					//whichKernel();
					transitionend="webkitTransitionEnd";
					animationend="webkitAnimationEnd";
				}
				if (element.addEventListener) {
					element.addEventListener(animationend, handler, false);
				}else if(element.attachEvent){
					element.attachEvent(animationend, handler);
				}
				//webkitAnimationEnd oanimationend msAnimationEnd animationend
				return;
			}
			//TransitionEnd
			if(type.toLowerCase()==="transitionend"){
				if(!transitionend){
					//whichKernel();
					transitionend="webkitTransitionEnd";
					animationend="webkitAnimationEnd";
				}
				if (element.addEventListener) {
					element.addEventListener(transitionend, handler, false);
				}else if(element.attachEvent){
					element.attachEvent(transitionend, handler);
				}
				return;
			}
			//oninput
			if(type.toLowerCase()==="input" || type.toLowerCase()==="propertychange"){
				type="input";
				if(element.attachEvent){
					type="propertychange";
				}
			}
			//系统事件
			if (element.addEventListener) {
				element.addEventListener(type, handler, false);
			} else if (element.attachEvent) {
				element.attachEvent("on" + type, handler);
			} else {
				element["on" + type] = handler;
			}
		},
		removeHandler:function(element, type, handler) {
			if (element.removeEventListener) {
				element.removeEventListener(type, handler, false);
			} else if (element.detachEvent) {
				element.detachEvent("on" + type, handler);
			} else {
				element["on" + type] = null;
			}
		},
		preventDefault:function (e) {
			if (e.preventDefault) {
				e.preventDefault();
			} else {
				e.returnValue = false;
			}
		},
		stopPropagation:function(e){
			if(e.stopPropagation){
				e.stopPropagation();
			}else{
				e.cancelBubble=true;
			}
		},
		event:function(e){
			return e?e:window.e;
		},
		type:function(e){
			return e.type;
		},
		target:function(e){
			return e.target || e.srcElement;
		}
	};
	window.EventUtil=EventUtil;
})(window,document,undefined);

/*!
 * 表情工具库
 * @version 1.0.0
 * @author WangMingzhu
 */
(function(window,document,undefined){
	window.Emoji={
		icons:{
			"[微笑]":"[weixiao]",
			"[难过]":"[nanguo]",
			"[色]":"[se]",
			"[发呆]":"[fadai]",
			"[酷]":"[cool]",
			"[大哭]":"[daku]",
			"[害羞]":"[haixiu]",

			"[闭嘴]":"[bizui]",
			"[睡觉]":"[shuijiao]",
			"[哭]":"[ku]",
			"[流汗]":"[liuhan]",
			"[发怒]":"[fanu]",
			"[眨眼]":"[zhayan]",
			"[龇牙]":"[ziya]",

			"[惊讶]":"[jingya]",
			"[傲慢]":"[aoman]",
			"[得意]":"[deyi]",
			"[可怜]":"[kelian]",
			"[拜拜]":"[baibai]",
			"[开心]":"[kaixin]",
			"[呕吐]":"[outu]",
			"[奋斗]":"[fendou]",
			"[坏笑]":"[huaixiao]",
			"[尴尬]":"[ganga]",
			"[惊吓]":"[jingxia]",
			"[打哈欠]":"[dahaqian]",
			"[白眼]":"[baiyan]",
			"[鄙视]":"[bishi]",

			"[抽烟]":"[chouyan]",
			"[敲头]":"[qiaotou]",
			"[亲亲]":"[qingqing]",
			"[恭喜]":"[gongxi]",
			"[奸笑]":"[jianxiao]",
			"[骂人]":"[maren]",
			"[糗]":"[qiu]",

			"[伤心]":"[shangxin]",
			"[受委屈]":"[shouweiqu]",
			"[偷笑]":"[touxiao]",
			"[挖鼻孔]":"[wabikong]",
			"[委屈]":"[weiqu]",
			"[问]":"[wen]",
			"[擦汗]":"[cahan]",
			"[左哼哼]":"[zuohengheng]",
			"[右哼哼]":"[youhengheng]",
			"[晕]":"[yun]",
			"[大笑]":"[daxiao]",
			"[吓]":"[xia]",
			"[困]":"[kun]",
			"[嘘]":"[xu]",

			"[加油]":"[jiayou]",
			"[强]":"[qiang]",
			"[我爱你]":"[iloveyou]",
			"[差劲]":"[chajin]",
			"[No]":"[no]",
			"[Ok]":"[ok]",
			"[弱]":"[ruo]",

			"[抱拳]":"[baoquan]",
			"[握手]":"[woshou]",
			"[Yeah]":"[yeah]",
			"[来]":"[lai]",
			"[猪头]":"[zhutou]",
			"[心]":"[xin]",
			"[心碎]":"[xinsui]",
			"[抱抱]":"[baobao]",
			"[红唇]":"[hongchun]",
			"[菜刀]":"[caidao]",
			"[太阳]":"[taiyang]",
			"[夜晚]":"[yewan]",
			"[骷髅]":"[kulou]",
			"[花谢了]":"[huaxiele]",

			"[蛋糕]":"[dangao]",
			"[咖啡]":"[kafei]",
			"[足球]":"[zuqiu]",
			"[骷髅]":"[kulou]",
			"[西瓜]":"[xigua]",
			"[炸弹]":"[zhadan]",
			"[篮球]":"[lanqiu]",

			"[礼物]":"[liwu]",
			"[大便]":"[dabian]",
			"[玫瑰]":"[meigui]",
			"[米饭]":"[mifan]",
			"[瓢虫]":"[piaochong]",
			"[啤酒]":"[pijiu]",
			"[闪电]":"[shandian]",
		},
		parse:function(str){
			var emojiExpr=/(\[[\u4E00-\u9FA5]*\])/gm;
			var result,parseStr=str;
			while (emojiExpr.exec(str))  {
				if(this.icons[RegExp.$1]){
					parseStr=parseStr.replace(RegExp.$1,"<span data-emoji=\""+this.icons[RegExp.$1]+"\"></span>");
				}
			}
			return parseStr;
		}
	}
})(window,document,undefined);

/*!
 * form表单类库
 * @version 1.0.0
 * @author WangMingzhu
 *
 * @requie jquery.js
 */

(function(window,document,undefined){
	//国际化
	var lang = {
		"rule": {
			"required": "不能为空",
			"username": "只能包括字母、数字和下划线",
			"password": "格式不正确",
			"phone": "手机号码输入不正确",
			"mail": "邮箱格式不正确",
			"chinese": "只能填写中文",
			"minlength": "最小长度为",
			"maxlength": "最大长度为",
			"unit": "位",
			"twice": "两次",
			"compare": "输入不一致",
			"safelvl":"不安全，请增强",
			"specialchar":"不能包含特殊字符"
		}
	};
	window.Form=function(container){
		/*================
		Model
		================*/
		var s=this;
		s.getFormElements=function(){
			s.container=document.querySelector(container);
			s.formElements=[];//表单元素
			//获取有效的表单元素
			for(var i=0;i<s.container.elements.length;i++){
				var field=s.container.elements[i];
				//过滤没有name的表单元素
				if(!field.type || !field.name){
					continue;
				}
				//过滤button、reset、submit
				if(field.type=="button" || field.type=="reset" || field.type=="submit"){
					continue;
				}
				//过滤未选中的checkbox和radio
				if(field.type=="radio" || field.type=="checkbox"){
					if(!field.checked){
						continue;
					}
				}
				//push到数组里
				s.formElements.push(field);
			}
		};
		//添加formElements对象
		s.pushElement=function(el){
			s.formElements.push(el);
		};
		//表单控件初始化(主要是针对小眼睛和开关控件)
		s.initFormControl=function(){
			//开关控件点击
			$(".switch").click(function(){
				var name=$(this).data("name");
				var onVal=$(this).data("on-value");
				var offVal=$(this).data("off-value");
				var hiddeninput=$("+input[name="+name+"]",this);
				if(name && !hiddeninput[0]){
					$('<input type="hidden" name="'+name+'">').insertAfter(this);
					hiddeninput=$("+input[name="+name+"]",this);
					s.pushElement(hiddeninput[0]);
				}
				
				if($(this).hasClass("active")){
					$(this).removeClass("active");
					if(hiddeninput[0])hiddeninput.val(offVal);
				}else{
					$(this).addClass("active");
					if(hiddeninput[0])hiddeninput.val(onVal);
				}
			});
			//密码控件点击小眼睛
			$("[data-input='reveal'] [type=password] + i").click(function(){
				if($(this).hasClass("active")){
					$(this).removeClass("active");
					$(this).parent().find("input[type]").attr("type","password");
				}else{
					$(this).parent().find("input[type]").attr("type","text");
					$(this).addClass("active");
				}
				$(this).parent().find("input[type]")[0].focus();
			});
			//带清空按钮
			$("[data-input='clear'] input").on("input",function(){
	    		if($(this).val().length>0){
	    			$("+i",this).css("display","block");
	    		}else{
	    			$("+i",this).css("display","none");
	    		}
	    	});
	    	$("[data-input='clear'] input+i").css("display","none").on("click",function(){
	    		$(this).css("display","none");
	    		$(this).parent().find("input").val("").focus();
	    	})
			//安全检测
			$(".safelvl").parent().find("[type=password]").on("input propertychange",function(){
				s.checkSafe($(this)[0],$(".safelvl")[0]);
			});
			//range控件
			var hideTooltipTimer;
			$(".tooltip+input[type=range]").on("touchstart input",function(){
				/*=========================
		          显示tooltip
		          ===========================*/
		        if(hideTooltipTimer)clearTimeout(hideTooltipTimer);
		        var tooltip=$(this).prev();
		        tooltip.css({"display":"block"});
				/*=========================
		          计算tooltip位置
		          ===========================*/
				//当前值所占百分比
				var percent=((this.value-this.min)/(this.max-this.min)).toFixed(2);
				//距左的位置
				var offsetLeft=$(this).offset().left+($(this).width()*percent-10);
				var currentOffsetLeft=offsetLeft-$(this).parent().offset().left;
				//滑块内部的实际位置
				var currentBallLeft=28*percent;
				//当前值的位置-滑块的位置=小球正中间的位置
				var left=currentOffsetLeft-currentBallLeft;
				tooltip.html(this.value).css({"left":left});
				/*=========================
		          隐藏tooltip
		          ===========================*/
		        hideTooltipTimer=setTimeout(function(){
		        	tooltip.css({"display":"none"});
		        },1000);
			});
			//数字控件
			$(".numbox input[type=number]").prev().click(function(e){
				//数字框
				var inputNumber=$(this).next();
				var inputNumberMin=inputNumber.attr("min")||0;
				var inputNumberMax=inputNumber.attr("max")||9999;
				var inputNumberStep=inputNumber.attr("step")||1;
				//加按钮
				var btnPlus=inputNumber.next();
				btnPlus.attr("disabled",false);
				//操作数字
				var num=inputNumber.val()-inputNumberStep;
				if(num<=inputNumberMin){
					num=inputNumberMin;
					$(this).attr("disabled",true);
				}
				inputNumber.val(num);
			});
			$(".numbox input[type=number]").next().click(function(e){
				//数字框
				var inputNumber=$(this).prev();
				var inputNumberMin=inputNumber.attr("min")||0;
				var inputNumberMax=inputNumber.attr("max")||9999;
				var inputNumberStep=inputNumber.attr("step")||1;
				//减按钮
				var btnMinus=inputNumber.prev();
				btnMinus.attr("disabled",false);
				//操作数字
				var num=parseInt(inputNumber.val())+parseInt(inputNumberStep);
				if(num>=inputNumberMax){
					num=inputNumberMax;
					$(this).attr("disabled",true);
				}
				inputNumber.val(num);
			});
		};
		/*================
		Method
		================*/

		//表单Json化
		s.serializeArray=function(){
			var parts=[],field=null;
			for(var i=0;i<s.formElements.length;i++){
				field=s.formElements[i];
				//如果是多选框，则每个值单独一个条目
				if(field.type=="select-one" || field.type=="select-multiple"){
					for(var j=0;j<field.options.length;j++){
						var option=field.options[j];
						if(option.selected){
							parts.push(field.name+"="+field.value);
						}
					}
				}else{
					//push到数组里
					parts.push(field.name+"="+field.value);
				}
			}
			return parts;
		};
		//表单序列化
		s.serialize=function(){
			//序列化
			var parts=s.serializeArray();
			//获得字符串
			return parts.join("&");
		};
		//单个元素验证
		s.safelvl=0;//密码安全等级
		s.rule=function(field){
			var ruleExpr = {
				"required":/.+/,//不能为空
				"username":/^[\w]*$/,//只能包括字母、数字和下划线
				"password":/^[0-9_a-zA-Z-~!@#$]*$/,//密码格式不正确
				"mail":/^(\w+@\w+\.[\.\w]+)?$/,//邮箱格式不正确
				"phone":/^([1][34578][0-9]{9})?$/,//手机号码输入不正确
				"chinese":/^[\u4E00-\u9FA5]*$/,//只能填写中文
				"specialchar":/^([\u4e00-\u9fa5]*|[a-zA-Z0-9]*)$///不能为特殊字符
			}
			var ruleField=field.getAttribute("data-rule-field")||"";
			var rule=field.getAttribute("data-rule").split(" ");
			var value=field.value||"";
			var errorMsg=null;
			for(var i=0,rulename;rulename=rule[i++];){
				if(ruleExpr[rulename]){
					if(!ruleExpr[rulename].test(value)){
						errorMsg=ruleField+lang.rule[rulename];
						break;
					}
				}else if(rulename.indexOf("minlength")>=0){
					var minlength=rulename.split(":")[1];
					if(value.length>0 && value.length<minlength){
						errorMsg=ruleField+lang.rule.minlength+ minlength +lang.rule.unit;
						break;
					}
				}else if(rulename.indexOf("maxlength")>=0){
					var maxlength=rulename.split(":")[1];
					if(value.length>maxlength){
						errorMsg=ruleField+lang.rule.maxlength+ maxlength +lang.rule.unit+"，超出"+eval(value.length-maxlength)+lang.rule.unit;
						break;
					}
				}else if(rulename.indexOf("compare")>=0){
					var compareElem=document.getElementsByName(rulename.split(":")[1])[0];
					
					if(compareElem && compareElem.value && compareElem.value!=value){
						errorMsg=lang.rule.twice+ruleField+lang.rule.compare;
						break;
					}
				}else if(rulename=="safelvl"){
					if(value.length>0 && s.safelvl<2){
						errorMsg=ruleField+lang.rule[rulename];
						break;
					}
				}
			}
			return errorMsg;
		};
		//表单验证
		var t=new Toast("格式不正确");
		s.validate=function(){
			for(var i=0,field;field=s.formElements[i++];){
				if(!field.getAttribute("data-rule")){
					continue;
				}
				var errormsg=s.rule(field);
				if(errormsg){
					t.setText(errormsg);
					t.show();
					field.focus();
					return false;
				}
			}
			return true;
		};
		//字符类型
	    s.charMode=function(iN){
	        if (iN>=48 && iN <=57) //数字    
	            return 1;
	        if (iN>=65 && iN <=90) //大写    
	            return 2;
	        if (iN>=97 && iN <=122) //小写    
	            return 4;
	        else
	            return 8;
	    }
	    //计算密码模式
	    s.pwdLvl=function(num){
	        var lvl=0;
	        for (var i=0;i<4;i++){
	            if (num & 1) lvl++;
	            num>>>=1;
	        }
	        return lvl;
	    }
		//密码强度检测
		s.checkSafe=function(pwdField,lvlField){
	    	var val=pwdField.value;
	    	if(val.length<=0){
        		lvlField.className=lvlField.className.replace(/lvl[0-3]/,"lvl0");
        		return;
        	}
	        var mode=0;
	        for (var i=0;i<val.length;i++){
	            mode|=s.charMode(val.charCodeAt(i));
	        }
	        s.safelvl=s.pwdLvl(mode);
	        if(lvlField){
	        	lvlField.className=lvlField.className.replace(/lvl[0-3]/,"lvl"+s.safelvl);
	        }
	    };
	    /*================
		Controller
		================*/
		s.init=function(){
			s.getFormElements();
			s.initFormControl();
		};
		s.init();
	}
})(window,document,undefined);

(function(window,document,undefined){
	window.FontCounter=function(params){
		var fontcounters=document.querySelectorAll("[data-fontcounter]");
		[].slice.call(fontcounters).forEach(function(n,i,a){
			var s={};
			s.field=n;
			s.fieldRules=n.getAttribute("data-rule");
			var fieldDescription=s.field.getAttribute("data-fontcounter");
			s.fieldCounter=document.querySelector("[data-fontcounter-for='"+fieldDescription+"']");
			s.maxlength=0;
			if(!s.fieldRules){
				console.log("请给对象加上data-rule限制");
				return;
			}
			var rules=s.fieldRules.split(" ");
			for(var i=0,rule;rule=rules[i++];){
				if(rule.indexOf("maxlength")>=0){
					s.maxlength=rule.split(":")[1];
				}
			}
			EventUtil.addHandler(s.field,"input",function(e){
				s.target=e.target;
				s.currentlength=this.value.length;
				if(params.onInput)params.onInput(s);
				if(s.maxlength<s.currentlength && params.onMoreThanCount){
					params.onMoreThanCount(s);
				}else{
					params.onNotMoreThanCout(s);
				}
			});
		});
	}
})(window,document,undefined);

/*!
 * 可视化数据
 * @version 1.0.0
 * @author WangMingzhu
 */

/**
*  仪表盘
* 
*  @class gauge
*/
(function(window,document,undefined){
	
	window.Gauge=function(container,params){
		/*============
		  Model
		  ==============*/
		var defaults={
			minValue:0,
            maxValue:360,
            currentValue:0,

            //dom
            pointClass:".gauge-pointer",
            waveClass:".gauge-wave",
            valueClass:".gauge-text",

            //animate
            durationall:2000

            /*callbacks
			onInit:function(Gauge)
			onPointChangeStart:function(Gauge)
			onPointChangeEnd:function(Gauge)
			*/
		}
		for(var def in defaults){
			if(params[def]==undefined){
				params[def]=defaults[def];
			}
		}
		var s=this;
		s.params=params;
		s.container=document.querySelector(container);//容器
		s.point=s.container.querySelector(s.params.pointClass);//指针
		s.wave=s.container.querySelector(s.params.waveClass)||null;//波浪
		s.value=s.container.querySelector(s.params.valueClass);//指针值

		s.percent=(s.params.currentValue-s.params.minValue)/(s.params.maxValue-s.params.minValue);//当前值所占比例
		s.duration=Math.round(s.percent*s.params.durationall);//执行时间长度
		s.bgLvl=Math.round(s.percent*10)+1;//背景等级
		if(s.bgLvl<1){
			s.bgLvl=1;
		}
		if(s.bgLvl>10){
			s.bgLvl=10;
		}
		s.pointRotate=eval(270*s.percent);//指针旋转角度
		if(s.pointRotate>270){
			s.pointRotate=270;
			s.burst=s.params.currentValue-s.params.maxValue;//爆表值
			console.log("已爆表");
		}
		/*============
		  View
		  ==============*/
		//旋转指针
		s.updatePoint=function(){
			if(s.params.onPointChangeStart)s.params.onPointChangeStart(s);
			s.point.setAttribute("style","-webkit-transform:rotate("+s.pointRotate+"deg);-webkit-transition:all "+s.duration+"ms");
			if(!s.params.onPointChangeEnd)return;
			setTimeout(function(){
				s.params.onPointChangeEnd(s);
			},s.duration);
		}
		//设置数字
		s.updateValue=function(){
			s.value.innerHTML=s.params.currentValue;
		}
		//更改背景色
		s.updateBg=function(){
			var bgExpr=/bg[1-9]0?$/g;
			if(bgExpr.test(s.container.className)){
				s.container.className=s.container.className.replace(bgExpr,"bg"+s.bgLvl);
			}else{
				s.container.className+=" bg"+s.bgLvl;
			}
			s.container.style.WebkitAnimationDuration=s.duration+"ms";
		}
		//设置波浪
		s.updateWave=function(){
			if(!s.wave)return;
			var waveTop=100-Math.round(s.percent.toFixed(1)*100);
			if(waveTop<0){
				waveTop=0;
			}
			s.wave.style.top=waveTop+"%";
			s.wave.style.WebkitTransition="all "+s.duration+"ms";
		}
		s.view=function(){
			s.updateBg();
			s.updatePoint();
			s.updateValue();
			s.updateWave();
			if(s.params.onInit)s.params.onInit(s);
		}
		/*============
		  Controller
		  ==============*/
		s.view();
	}
})(window,document,undefined);

/*!
 * 多媒体控件
 * @version 1.0.0
 * @author WangMingzhu
 */

/**
*  系统多媒体控件api
* 
*  @class Media
*  @constructor
*  @param media //video dom 或者 audio src(用于播放背景音乐)
*/
(function(window,document,undefined){
	
	window.Media=function(media){
		/*===========================
	    Model
	    ===========================*/
		var s=this;
		s.media=document.querySelector(media)||new Audio(media);
		/*===========================
	    Method
	    ===========================*/
	    s.playAudio=function(loop){
			s.media.autoplay = true;
			s.media.loop = loop || false;
			s.media.play();
			return s;
		};
	    //判断视频加载状态
	    s.isReady=function(){
	    	if(s.media.readyState!=4){
				console.log("视频尚未加载完成，状态："+s.media.readyState);
				return false;
			}
			return true;
	    };
		//暂停与播放
		s.resume=function(){
			if(s.media.paused){
				s.media.play();
				return false;
			}else{
				s.media.pause();
				return true;
			}
		};
		//全屏与非全屏，w3c推荐标准，但尚未兼容
		s.fullScreen=function(){
			if(s.media.requestFullscreen){
				s.media.exitFullscreen();
				return false;
			}else{
				s.media.requestFullscreen();
				return true;
			}
		};
		//播放时间
		s.durationTime=function(){
			if(!s.isReady)return;
			if(arguments.length>0){
				s.media.duration=arguments[0];
			}
			return s.media.duration;
		};
		//当前时间
		s.currentTime=function(){
			if(!s.isReady)return;
			if(arguments.length>0){
				s.media.currentTime=arguments[0];
			}
			return s.media.currentTime;
		};
		//音量，值为0.0到1.0
		s.volume=function(){
			if(arguments.length>0){
				s.media.volume=arguments[0];
			}
			return s.media.volume;
		};
		//音量值大小
		s.volumeLvl=function(){
			var volnumber=s.media.volume;
			if(volnumber==0){
				return 0;
			}else if(volnumber>0 && volnumber<0.3){
				return 1;
			}else if(volnumber>0.3 && volnumber<0.6){
				return 2;
			}else if(volnumber>0.6 && volnumber<0.9){
				return 3;
			}else{
				return 4;
			}
		};
		//设置播放速度，默认为1.0秒
		s.rate=function(){
			if(arguments){
				s.media.defaultPlaybackRate=arguments[0];
			}
			return s.media.defaultPlaybackRate;
		};
		
		//是否支持此视频
		s.isSupport=function(mediaPostfix){
			var maybeMedia="";
			var probablyMedia="";
			switch(mediaPostfix){
				//音频
				case "aac":maybeMedia="audio/mp4",probablyMedia="audio/mp4; codecs=\"mp4a.40.2\"";break;
				case "mp3":maybeMedia="audio/mpeg",probablyMedia="audio/mpeg";break;
				case "vorbis":maybeMedia="audio/ogg",probablyMedia="audio/ogg; codecs=\"vorbis\"";break;//后缀通常为ogg
				case "wav":maybeMedia="audio/wav",probablyMedia="audio/wav; codecs=\"1\"";break;
				//视频
				case "h.264":maybeMedia="video/mp4",probablyMedia="video/mp4; codecs=\"avc1.42E01E, mp4a.40.2\"";break;//后缀通常为mpg4、mp4、mov
				case "theora":maybeMedia="video/ogg",probablyMedia="video/ogg; codecs=\"theora\"";break;//后缀通常为ogg
				case "webm":maybeMedia="video/webm",probablyMedia="video/webm; codecs=\"vp8, vorbis\"";break;//后缀通常为webm
			}
			if(maybeMedia!="" && probablyMedia!="" && (player.canPlayType(maybeMedia) || player.canPlayType(probablyMedia))){
				return true;
			}
			return false;
		};
		/*===========================
	    Events
	    ===========================*/
	    var event=function(eventname,fn,detach){
			var action=detach?"removeEventListener":"addEventListener";
			s.media[action](eventname,fn,false);
		}
		//因为没有数据不能播放，readyState值为0
		s.onDataunavailable=function(callback,detach){
			event("dataunavailable",callback,detach);
		};
		//当前帧已下载完成，readyState值为1
		s.onCanshowcurrentframe=function(callback,detach){
			event("canshowcurrentframe",callback,detach);
		};
		//可以播放时，readyState值为2
		s.onCanplay=function(callback,detach){
			event("canplay",callback,detach);
		};
		//播放可继续，而且应该不会中断，readyState值为3
		s.onCanplaythrough=function(callback,detach){
			event("canplaythrough",callback,detach);
		};
		//所有媒体已加载完成，load有可能会被废弃，建议使用canplaythrough
		s.onLoad=function(callback,detach){
			event("load",callback,detach);
		};
		//媒体的第一帧已加载完成
		s.onLoadeddata=function(callback,detach){
			event("loadeddata",callback,detach);
		};
		//媒体的元数据已加载完成
		s.onLoadedmetadata=function(callback,detach){
			event("loadedmetadata",callback,detach);
		};
		//下载已开始
		s.onLoadstart=function(callback,detach){
			event("loadstart",callback,detach);
		};
		//正在下载
		s.onProgress=function(callback,detach){
			event("progress",callback,detach);
		};
		//下载中断
		s.onAbort=function(callback,detach){
			event("abort",callback,detach);
		};
		//浏览器尝试下载，但未接收到数据
		s.onStalled=function(callback,detach){
			event("stalled",callback,detach);
		};
		//下载发生网络错误
		s.onError=function(callback,detach){
			event("error",callback,detach);
		};
		//网络连接关闭
		s.onEmptied=function(callback,detach){
			event("emptied",callback,detach);
		};
		//发生错误阻止了媒体下载
		s.onEmpty=function(callback,detach){
			event("empty",callback,detach);
		};
		//准备播放
		s.onPlay=function(callback,detach){
			event("play",callback,detach);
		};
		//正在播放
		s.onPlaying=function(callback,detach){
			event("playing",callback,detach);
		};
		//当前时间被不合理或意外的方式更新
		s.onTimeupdate=function(callback,detach){
			event("timeupdate",callback,detach);
		};
		//暂停
		s.onPause=function(callback,detach){
			event("pause",callback,detach);
		};
		//播放暂停，等待下载更多数据
		s.onWaiting=function(callback,detach){
			event("pause",callback,detach);
		};
		//媒体已播放至末尾，播放停止
		s.onEnded=function(callback,detach){
			event("ended",callback,detach);
		};
		//更改音量事件
		s.onVolumechange=function(callback,detach){
			event("volumechange",callback,detach);
		};
		//更改播放速度事件
		s.onRatechange=function(callback,detach){
			event("ratechange",callback,detach);
		};
		//搜索结束
		s.onSeeked=function(callback,detach){
			event("seeked",callback,detach);
		};
		//正在移动到新位置
		s.onSeeking=function(callback,detach){
			event("seeking",callback,detach);
		};
	};
})(window,document,undefined);

(function(){
    window.Clock=function(container,params){
        /*================
        Module
        =================*/
        var defaults={
            "time":"00:00",
            "hourClass":"hour",
            "minuteClass":"minute",
            /*
            "duration":"500",
            "delay":"0"
            */
        }
        params=params||{};
        for(var def in defaults){
            if(params[def]===undefined){
                params[def]=defaults[def];
            }
        }
        var s=this;
        //Params
        s.params = params;
        //Container
        s.container=typeof container === "string"?document.querySelector(container):container;
        //Container-Hour|Minute
        s.hour=s.container.querySelector("."+s.params.hourClass);
        s.minute=s.container.querySelector("."+s.params.minuteClass);

        /*================
        Method
        =================*/
        s.updateClock=function(time){
            if(time)s.params.time=time;
            if(!/\d{1,2}:\d{1,2}/.test(s.params.time)){
                console.log("时间格式应为xx:xx");
                return;
            }
            var hourMinute=s.params.time.split(":");
            var hourDeg=s.getHourDeg(hourMinute[0]);
            var minuteDeg=s.getMinuteDeg(hourMinute[1]);
            s.hour.style.WebkitTransform="rotate("+hourDeg+"deg)";
            s.minute.style.WebkitTransform="rotate("+minuteDeg+"deg)";
            if(!isNaN(s.params.duration))s.container.style.WebkitTransitionDuration=s.params.duration+"ms";
            if(!isNaN(s.params.delay))s.container.style.WebkitTransitionDelay=s.params.delay+"ms";
        }
        s.getHourDeg=function(hour){
            return hour*30;
        }
        s.getMinuteDeg=function(minute){
            return minute*6;
        }

        /*================
        Entry
        =================*/
        s.init=function(){
            s.updateClock();
        }
        s.init();
        //Return Clock instance
        return s;
    }
    window.DataClock=function(params){
        /*===============
        Module
        ================*/
        //Containers
        var clocks=document.querySelectorAll("[data-clock]");
        clocks.containers=[];
        //Params
        var jsonParams={};
        if(params)jsonParams=params;
        /*==============
        Entry
        ================*/
        for(var i=0,clock;clock=clocks[i++];){
            jsonParams.time=clock.getAttribute("data-clock");
            clocks.containers[i]=new Clock(clock,jsonParams);
        }
        return clocks;
    }
})();

/*!
*	富文本编辑
*	@version 1.0.0
*	@author WangMingzhu
*/

/**
*  富文本编辑，主要用于编辑模式框（contenteditable="true"）或者 iFrame富文本框，背景色、加粗、链接、插入图片等功能
* 
*  @class RichEditor
*/
var Richeditor={
	//获取选区
	selection:function(){
		return document.getSelection();
	},
	//获取文本框光标位置
	getTxtCusorPos:function(txt){
		var cusorPos=-1;
		//非ie
		if(txt.selectionStart){//非IE浏览器
			cusorPos= txt.selectionStart;
			return cusorPos;
		}
		//讨厌的ie
		if(document.selection && document.selection.createRange){
			var range = document.selection.createRange();
			range.moveStart("character",-txt.value.length);
			cusorPos=range.text.length;
			return cusorPos;
		}
	},
	//获取光标位置
	getDivCusorPos:function(){
		var cusorPos = 0;// 光标位置
		//非ie
		if(window.getSelection){
			var selection=window.getSelection();
			//选中区域的“起点”
			/*console.log(selection.anchorNode);
			//选中区域的“结束点”
			console.log(selection.focusNode);
			//“结束点”的偏移量
			console.log(selection.focusOffset);
			//判断是否有选中区域
			console.log(selection.isCollapsed);
			//一般一个页面只有一个range，也有可能是多个range(使用Ctrl健进行多选)
			console.log(selection.rangeCount);*/
			
			//“起点”的偏移量
			cusorPos=selection.anchorOffset;
			return cusorPos;
		}
		//讨厌的ie
		if(document.selection && document.selection.createRange){
			var range = document.selection.createRange();
			var srcele = range.parentElement();
			var copy = document.body.createTextRange();
			copy.moveToElementText(srcele);
			for (cusorPos = 0; copy.compareEndPoints("StartToStart", range) < 0; cusorPos++) {
				copy.moveStart("character", 1);
			}
			return cusorPos;
		}
	},
	//只支持高级浏览器
	selectionPos:function(classname){
		var selection=window.getSelection();
		var cursorOffset=0;
		document.onselectionchange=function(e){
			if(e.target.activeElement.className==classname){
				cursorOffset=selection.anchorOffset;
			}
		}
		return cursorOffset;
	},
	/**
	 * 确定命令是否已经激活
	 * 
	 * @method isenable
	 * @param commandName (命令名称，如：backcolor)
	 * @return boolean
	 */
	isenable:function(commandName){
		return document.queryCommandEnabled(commandName);
	},
	backgroundcolor:function(color){
		document.execCommand("backcolor",false,color);
	},
	bold:function(){
		document.execCommand("bold",false,null);
	},
	italic:function(){
		document.execCommand("italic",false,null);
	},
	underline:function(){
		document.execCommand("underline",false,null);
	},
	copy:function(){
		document.execCommand("copy",false,null);
	},
	selectall:function(){
		document.execCommand("selectall",false,null);
	},
	cut:function(){
		document.execCommand("cut",false,null);
	},
	paste:function(){
		document.execCommand("paste",false,null);
	},
	del:function(){
		document.execCommand("delete",false,null);
	},
	link:function(url){
		document.execCommand("createlink",false,url);
	},
	unlink:function(){
		document.execCommand("unlink",false,null);
	},
	fontname:function(fontName){
		document.execCommand("fontname",false,fontName);
	},
	fontsize:function(fontSize){
		if(fontSize){
			document.execCommand("fontsize",false,fontSize);
			return;
		}
		return document.queryCommandValue("fontsize");
	},
	fontcolor:function(fontColor){
		document.execCommand("forecolor",false,fontColor);
	},
	format:function(tag){
		document.execCommand("formatblock",false,tag);
	},
	unformat:function(){
		document.execCommand("removeformat",false,null);
	},
	indent:function(){
		document.execCommand("indent",false,null);
	},
	outdent:function(){
		document.execCommand("outdent",false,null);
	},
	hr:function(){
		document.execCommand("inserthorzizontalrule",false,null);
	},
	img:function(url){
		document.execCommand("insertimage",false,url);
	},
	ol:function(){
		document.execCommand("insertorderedlist",false,null);
	},
	ul:function(){
		document.execCommand("insertunorderedlist",false,null);
	},
	p:function(){
		document.execCommand("insertparagraph",false,null);
	},
	center:function(){
		document.execCommand("justifycenter",false,null);
	},
	left:function(){
		document.execCommand("justifyleft",false,null);
	},
	right:function(){
		document.execCommand("justifyright",false,null);
	},
	//设置光标位置
	setCaretPosition:function(elem, caretPos) {
	    if(elem != null) {
	        if(elem.createTextRange) {
	            var range = elem.createTextRange();
	            range.move('character', caretPos);
	            range.select();
	        }
	        else {
	            if(elem.selectionStart) {
	                elem.focus();
	                elem.setSelectionRange(caretPos, caretPos);
	            }
	            else
	                elem.focus();
	        }
	    }
	},
	isEnter:function(){
		//监听键盘输入
		EventUtil.addHandler(window,"keydown",function(e){
			keynum = e.which || e.keyCode;
			if(keynum=="13"){
				return true;
			}
			return false;
		})
	},
	queryInput:function(queryExtend,queryCollapse){
		var winHeight=window.innerHeight,currentWinHeight=window.innerHeight;
		var listenerInput;//监听输入框
		listenerInput=setInterval(function(e){
			currentWinHeight=window.innerHeight;
			//获得输入法高度
			if(DB.get("queryInputHeight") && DB.get("queryInputHeight")>0){
				console.log("读取数据库queryInputHeight:"+DB.get("inputHeight"));
				this.inputHeight=DB.get("queryInputHeight");
				clearInterval(listenerInput);
			}else{
				this.inputHeight=winHeight-currentWinHeight;
				console.log("注入数据库queryInputHeight:"+inputHeight);
				DB.set("queryInputHeight",inputHeight);
			}
			//判断输入法是否收缩
			if(winHeight==currentWinHeight){
				if(queryCollapse){
					queryCollapse.call(this,e);
				}
				clearInterval(listenerInput);
			}else{
				if(queryExtend){
					queryExtend.call(this,e);
				}
			}
		},500);
	},
};

/**
 * 富文本带表情编辑框
 */
(function(window,document,undefined){
	window.Richinput=function(container,params){
		/*=========================
          Params
          ===========================*/
        var defaults={
			"emojiBoxClass":"emoji",
			"sliderParam":{
				"pagination":".slider-pagination"
			}
		}
		params=params||{};
		for(var def in defaults){
			if(params[def]===undefined){
				params[def]=defaults[def];
			}
		}
		//Richinput
		var s=this;

		//Params
		s.params = params;

		//Container
		s.container=typeof container=="string"?document.querySelector(container):container;
		if(!s.container)return;

		//Slider
		s.slider;

		//Mask Div
		s.mask=document.querySelector(container+"+.mask");

		//表情容器
		s.emojiBox=s.container.querySelector("."+s.params.emojiBoxClass);

		//Textarea Form
		s.textarea=s.container.querySelector("textarea");

		//辅助计算textarea高度的pre和preSpan
		var pre=s.container.querySelector("pre");
		var preSpan=pre.querySelector("span");

		//pre.style.width=s.textarea.clientWidth+"px";
		s.textarea.style.height=pre.clientHeight+"px";

		/*=========================
          Method
          ===========================*/
		//插入表情
		function insertFace(objFace){
			var emojiName=objFace.getAttribute("alt");
			//var emojiSrc=objFace.getAttribute("data-emoji-src");
			var editText=s.textarea.value;
			var editTextBefore=editText.substr(0,cursorOffset);
			var editTextAfter=editText.substr(cursorOffset,editText.length);
			var editTextInsert=emojiName;
			cursorOffset=cursorOffset+emojiName.length;
			s.textarea.value=editTextBefore+editTextInsert+editTextAfter;
		}

		/*=========================
          Events Listener
          ===========================*/
		//遮罩层添加点击事件
		s.mask.addEventListener("click",function(e){
			s.container.classList.remove("active");
			//s.container.className=s.container.className.replace(/\s{1,}active/,"");
			s.textarea.blur();
		},false);

		//获得光标位置
		var cursorOffset=0;
		document.onselectionchange=function(e){
			if(Object.prototype.toString.call(e.target.activeElement)=="[object HTMLTextAreaElement]"){
				//计算textarea高度
				preSpan.innerText=s.textarea.value;
				s.textarea.style.height=pre.clientHeight+"px";
				//获得光标位置
				cursorOffset=s.textarea.selectionStart;
			}
		}
		s.textarea.addEventListener("input",function(e){
			//计算textarea高度
			preSpan.innerText=s.textarea.value;
			s.textarea.style.height=pre.clientHeight+"px";
			//获得光标位置
			cursorOffset=s.textarea.selectionStart;
		},false);
		//点击input框
		s.textarea.addEventListener("click",function(e){
			s.container.classList.add("active");
			if(!s.slider){
				s.slider=new Slider(container+" ."+s.params.emojiBoxClass,s.params.sliderParam);
			}
			//s.container.className=s.container.className+" active";
		},false);

		//点击表情
		s.emojiBox.addEventListener("click",function(e){
			if(e.target.getAttribute("data-emoji")){
				insertFace(e.target);
			}
			s.textarea.focus();
			Richeditor.setCaretPosition(s.textarea,cursorOffset);
		},false);
		return s;
	}
})(window,document,undefined);


/*!
 * 社会化分享
 * @version 1.0.0
 * @author WangMingzhu
 */

/**
*  获取设备信息
* 
*  @class Share
*/
(function(window,document,undefined){
	
	window.Share=function(params){
		/*===============
		Model
		================*/
		var s=this;
		var defaults={
			"href":window.location.href,
			"title":document.title || '',
			"desc":"",
			"imgUrl":"",
			"imgTitle":document.title || '',
			"from":window.location.host || "",
			"cusTxt":"请输入此时此刻想要分享的内容"
		};
		params=params||{};
		for(var def in defaults){
			if(params[def]==undefined){
				params[def]=defaults[def];
			}
		}
		s.params=params;

		/*===============
		Method
		================*/
		//uc分享
		var ucAppList = {
		        "tsina": ["kSinaWeibo", "SinaWeibo", "11", "新浪微博"],
		        "weixin": ["kWeixin", "WechatFriends", "1", "微信好友"],
		        "fweixin": ["kWeixinFriend", "WechatTimeline", "8", "微信朋友圈"],
		        "qq": ["kQQ", "QQ", "4", "QQ好友"],
		        /*"tqq": ["kQQWeibo", "QQWeibo", "11", "腾讯微博"],
		         * "qzone": ['kQZone', 'QZone', '3', 'QQ空间']*/
		};
		s.UCshare=function(toApp) {
			var to_app;
			if(Device.isIos){
				to_app=ucAppList[toApp][0];
				ucbrowser.web_share(s.params.title, s.params.title, s.params.href, to_app, "","@"+s.params.from, ''); 
			}else{
				to_app=ucAppList[toApp][1];
				ucweb.startRequest("shell.page_share", [s.params.title, s.params.title, s.params.href, to_app, "", "@"+s.params.from, ""]);  
			}
		};

		//html分享
		function popIFrame(openUrl){
			var tempDiv = document.createElement("div");
			tempDiv.style.visibility = "hidden";
			tempDiv.innerHTML = '<iframe src="' + openUrl + '" scrolling="no" width="1" height="1"></iframe>';
			document.body.appendChild(tempDiv);
			setTimeout(function () {
				tempDiv && tempDiv.parentNode && tempDiv.parentNode.removeChild(tempDiv);
			}, 5000);
		};
		s.HTMLShare=function(toApp){
			var openUrl=""
			if (toApp == "qzone") {
				if(Device.isMobile){
					openUrl= "mqqapi://share/to_qzone?src_type=web&version=1&file_type=news&req_type=1&image_url="+s.params.imgUrl+"&title="+s.params.title+"&description="+s.params.desc+"&url="+s.params.href+"&app_name="+s.params.from;
					popIFrame(openUrl);
					return;
				}
				openUrl="http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url="+s.params.href+"&amp;title="+s.params.title+"&amp;showcount=0&amp;summary="+s.params.desc+"&amp;pics="+s.params.imgUrl+"";
				window.open(openUrl);
				return;
			}
			if(toApp=="tsina"){
				openUrl="http://service.weibo.com/share/share.php?url="+s.params.href+"&language=zh_cn&title="+s.params.title+"&pic="+s.params.imgUrl+"&searchPic=true";
				window.open(openUrl);
				return;
			}
			if(toApp=="tqq"){
				openUrl=encodeURI("http://share.v.t.qq.com/index.php?c=share&a=index&title="+s.params.title+"&url="+s.params.href+"&appkey=ce15e084124446b9a612a5c29f82f080&site="+s.params.from+"&pic="+s.params.imgUrl);
				window.open(openUrl,"转播到腾讯微博");
				return;
			}
			if(toApp="qq"){
				openUrl="http://connect.qq.com/widget/shareqq/index.html?url="+s.params.href+"#0-sqq-1-85270-9737f6f9e09dfaf5d3fd14d775bfee85&title="+s.params.title+"&desc="+s.params.desc+"&summary=&site="+s.params.from+"&pics="+s.params.imgUrl;
				window.open(openUrl);
				return;
			}
		}

		/*===============
		Controller
		================*/
		s.toQzone=function(){
			s.HTMLShare("qzone");
		};
		s.toTsina=function(){
			if(Device.isUC){
				s.UCshare("tsina");
			}else{
				s.HTMLShare("tsina");
			}
		};
		s.toTqq=function(){
			s.HTMLShare("tqq");
		};
		s.toWeixin=function(){
			if(Device.isUC){
				s.UCshare("weixin");
			}else{
				alert("您当前的浏览器不支持分享到微信");
			}
		};
		s.toFWeixin=function(){
			if(Device.isUC){
				s.UCshare("fweixin");
			}else{
				alert("您当前的浏览器不支持分享到微信朋友圈");
			}
		};
		s.toQQ=function(){
			if(Device.isUC){
				s.UCshare("qq");
			}else{
				s.HTMLShare("qq");
			}
		};
	}
})(window,document,undefined);

(function(window,document,undefined){
	
	window.Slider=function(container,params){
		//Model
		/*=========================
          Params
          ===========================*/
		var defaults={
			"pagination":null,
			"autoplay":false,
			"slidesPerView":1,
			"threshold":"50",
			"duration":"300",

			//loop
			"loop":false,
			"slideDuplicateClass":'slider-slide-duplicate',

			//dom class
			"wrapperClass":"slider-wrapper",
			"slideClass":"slider-slide",
			"slideActiveClass":"active",
			"bulletClass":"bullet",
			"bulletActiveClass":"active"

			/*callbacks
			onInit:function(Slider)
			onSlideChangeStart:function(Slider)
			onSlideChange:function(Slider)
			onSlideChangeEnd:function(Slider)
			*/
		}
		params=params||{};
		for(var def in defaults){
			if(params[def]===undefined){
				params[def]=defaults[def];
			}
		}
		//Slider
		var s=this;

		//Params
		s.params = params;

		//Container
		s.container=typeof container=="string"?document.querySelector(container):container;
		s.container.width=s.container.clientWidth;
		//Wrapper
		s.wrapper=document.querySelector(container+" > ."+s.params.wrapperClass);
		// s.wrapper=s.container.querySelector(":scope > ."+s.params.wrapperClass);
		//Slides
		s.slides=document.querySelectorAll(container+" > ."+s.params.wrapperClass+" > ."+s.params.slideClass+"");
		// s.slides=s.wrapper.querySelectorAll(":scope > ."+s.params.slideClass);
		if(s.slides.length<=0){
			return;
		}
		//View
		/*=========================
          Pagination
          ===========================*/
        s.createPagination=function(){
        	if (!s.params.pagination) return;
        	s.paginationContainer=document.querySelector(container+" > "+s.params.pagination);
        	//s.paginationContainer = s.container.querySelector(":scope > "+s.params.pagination);

        	s.bullets=[];
        	s.paginationContainer.innerHTML="";
            s.numberOfBullets = s.params.loop ? s.slides.length - s.params.slidesPerView * 2 : s.slides.length;
            for (var i = 0; i < s.numberOfBullets; i++) {
            	var bullet=document.createElement("span");
				bullet.setAttribute("class",s.params.bulletClass);
				s.paginationContainer.appendChild(bullet);
				s.bullets.push(bullet);
            }
            //s.bullets = s.paginationContainer.querySelectorAll(":scope > "+s.params.bulletClass);
        };
        /*=========================
          Classes
          ===========================*/
        s.updateClasses = function () {
        	//Slide
        	for(var i=0;i<s.slides.length;i++){
				s.slides[i].className=s.slides[i].className.replace(/\s{1,}active/,"");
			}
			s.slides[s.index].className+=" "+s.params.slideActiveClass;

			// Pagination
			var index=s.index;
			if(s.params.loop){
				if(s.index>=s.params.slidesPerView && s.index<=s.slides.length-1-s.params.slidesPerView){
					//console.log("原稿处");
					index=Math.abs(s.index-s.params.slidesPerView);
				}else{
					//console.log("左右复稿处");
					index=Math.abs(s.numberOfBullets-Math.abs(s.index-s.params.slidesPerView));
				}
			}
			if (!s.paginationContainer) return;
			for(var i=0;i<s.bullets.length;i++){
				s.bullets[i].className=s.bullets[i].className.replace(/\s{1,}active/,"");
			}
			s.bullets[index].className+=" "+s.params.bulletActiveClass;
        };
        /*=========================
          Slides
          ===========================*/
		s.updateSlides=function(){
			s.slides=document.querySelectorAll(container+" > ."+s.params.wrapperClass+" > ."+s.params.slideClass+"");
			//s.slides=s.wrapper.querySelectorAll(":scope > ."+s.params.slideClass);
		};
		/*=========================
          Container Size
          ===========================*/
        s.updateContainerSize=function(){
			//Slide width
			s.width=Math.floor(s.container.width/s.params.slidesPerView);
			//设置wrapper宽度
			s.wrapper.width=s.width*s.slides.length;
			s.wrapper.style.width=s.wrapper.width+"px";
			//设置单个slide宽度
			[].slice.call(s.slides).forEach(function(n,i,a){
				n.style.width=s.width+"px";
			});

			//Slide height
			s.height=s.container.clientHeight?s.container.clientHeight:s.wrapper.clientHeight;
			[].slice.call(s.slides).forEach(function(n,i,a){
				n.style.height=s.height+"px";
			});
			s.container.style.height=s.height+"px";			

			//更新active index
			s.updateClasses();
			//如果有循环的话
			if(s.params.loop){
				s.params.duration=0;
				moveToIndex();
				s.params.duration=defaults.duration;
			}
		};
        
        /*=========================
          Loop
          ===========================*/
        s.createLoop = function () {
        	if(!s.params.loop)return;
        	if(s.params.slidesPerView>s.slides.length)return;
        	var prependSlides = [], appendSlides = [],i;
        	[].slice.call(s.slides).forEach(function(n,i,a){
        		if (i < s.params.slidesPerView)appendSlides.push(n);
        		if (i < s.slides.length && i >= s.slides.length - s.params.slidesPerView)prependSlides.push(n);
        	});
        	for (i = 0; i < appendSlides.length; i++) {
                s.wrapper.appendChild(appendSlides[i].cloneNode(true)).classList.add(s.params.slideDuplicateClass);
            }
            for (i = prependSlides.length - 1; i >= 0; i--) {
                s.wrapper.insertBefore(prependSlides[i].cloneNode(true),s.wrapper.firstElementChild).classList.add(s.params.slideDuplicateClass);
            }
            s.index=s.params.slidesPerView;
        };
        s.destroyLoop = function () {
        	s.params.loop=null;
        	var slideDuplicate=s.wrapper.querySelectorAll('.' + s.params.slideDuplicateClass);
        	for(var i=0,slideDu;slideDu=slideDuplicate[i++];){
        		s.wrapper.removeChild(slideDu);
        	}
        };
        //Controller
		/*=========================
          Touch Events
          ===========================*/
		//绑定事件
		s.events=function(detach){
			var touchTarget=s.container;
			var action=detach?"removeEventListener":"addEventListener";
			touchTarget[action]("touchstart",s.onTouchStart,false);
			touchTarget[action]("touchmove",s.onTouchMove,false);
			touchTarget[action]("touchend",s.onTouchEnd,false);
			touchTarget[action]("touchcancel",s.onTouchEnd,false);
		}
		//attach、dettach事件
		s.attach=function(event){
			s.events();
		}
		s.detach=function(event){
			s.events(true);
		}
		/*=========================
          Touch Handler
          ===========================*/
        //Touch信息
        s.touches={
        	startX:0,
        	startY:0,
        	currentX:0,
        	currentY:0,
        	endX:0,
        	endY:0,
        	diffX:0,
        	diffY:0,
        	posX:0,
        	direction:null
        };
        //索引
        s.index=0;
        function preventDefault(e){
			e.preventDefault();
		}
		s.onTouchStart=function(e){
			s.container.addEventListener("touchmove",preventDefault,false);
			s.touches.startX=e.touches[0].clientX;
			s.touches.startY=e.touches[0].clientY;
			//关闭自动播放
			s.stopAutoplay();
			//runCallBack
			s.target=s.slides[s.index];
			if(s.params.onSlideChangeStart)s.params.onSlideChangeStart(s);
		};
		s.onTouchMove=function(e){
			s.touches.currentX=e.touches[0].clientX;
			s.touches.currentY=e.touches[0].clientY;
			s.touches.diffX=s.touches.startX-s.touches.currentX;
			s.touches.diffY=s.touches.startY-s.touches.currentY;
			//runCallBack
			if(s.params.onSlideChange)s.params.onSlideChange(s);
			//设置滑动方向
			if(s.touches.direction==null){
				s.touches.direction=Math.abs(s.touches.diffY)-Math.abs(s.touches.diffX)>0?"vertical":"horizontal";
			}
			if(s.touches.direction=="vertical"){
				s.container.removeEventListener("touchmove",preventDefault,false);
				return;
			}
			e.stopPropagation();
			//x轴距离左边的像素，向左为负数，向右为正数
			var moveX=s.touches.posX-s.touches.diffX;
			//判断是否是边缘
			if(moveX>0 || -moveX + s.container.width >= s.wrapper.width){
				return;
			}
			//s.wrapper.style.left=moveX+"px";
			s.wrapper.style.WebkitTransform='translate3d(' + moveX + 'px,0px,0px)';
		};
		s.onTouchEnd=function(e){
			//s.container.removeEventListener("touchmove",preventDefault,false);
			//左右拉动
			if(s.touches.direction=="horizontal"){
				//左右拉动
				if(s.touches.diffX>s.params.threshold){
					//下一页
					s.index++;
				}else if(s.touches.diffX<-s.params.threshold){
					//上一页
					s.index--;
				}
				s.slideTo();
			}
			//清空滑动方向
			s.touches.direction=null;
			//开启自动播放
			s.startAutoplay();
		};
		/*=========================
          Autoplay
          ===========================*/
        s.startAutoplay = function () {
        	if(!s.params.autoplay)return;
			s.autoplayer=window.setInterval(function(){
				s.index++;
				if(s.index>=s.slides.length){
					s.index=0;
				}
				s.slideTo(s.index);
			},s.params["autoplay"]);
        };

        s.stopAutoplay = function (internal) {
        	if(s.autoplayer){
        		window.clearInterval(s.autoplayer);
        	}
        };

		/*=========================
          Method
          ===========================*/
        function moveToIndex(){
        	s.wrapper.style.webkitTransitionDuration=s.params.duration+"ms";
        	s.touches.posX=-s.index*s.width;
        	//s.wrapper.style.left=s.touches.posX+"px";
        	s.wrapper.style.WebkitTransform='translate3d(' + s.touches.posX + 'px,0px,0px)';
        }
        s.slideTo=function(slideIndex){
        	if(slideIndex>=0){
				s.index=slideIndex;
			}
			//索引不能小于0
			if(s.index<0){
				s.index=0;
			}
			//索引不能大于slide总数
			if(s.index>s.slides.length-1){
				s.index=s.slides.length-1;
			}
			//一页多屏，索引不能露出空白区域
			if(s.params.slidesPerView>1 && s.index>s.slides.length-params.slidesPerView){
				s.index=s.slides.length-s.params.slidesPerView;
			}
			
			//更新class
			s.updateClasses();
			//移动至index
			moveToIndex();
			setTimeout(function(){
				s.wrapper.style.webkitTransitionDuration="0ms";
				//runCallBack
				s.target=s.slides[s.index];
				if(s.params.onSlideChangeEnd)s.params.onSlideChangeEnd(s);
				//循环的情况
				if(s.params.loop){
					if(s.touches.posX==0){
						s.index=s.slides.length-s.params.slidesPerView*2;
						//console.log("最左侧，应跳转到："+s.index);
						s.params.duration=0;
						moveToIndex();
						s.params.duration=defaults.duration;
						return;
					}
					if(-s.touches.posX + s.container.width >= s.wrapper.width){
						s.index=s.params.slidesPerView;
						//console.log("最右侧，应跳转到："+s.index);
						s.params.duration=0;
						moveToIndex();
						s.params.duration=defaults.duration;
						return;
					}
				}
			},s.params.duration);
        };

		//主函数
		s.init=function(){
			if(s.params.loop)s.createLoop();
			s.updateSlides();
			if(s.params.pagination)s.createPagination();
            s.updateContainerSize();
			s.attach();
			if(s.params.autoplay) s.startAutoplay();
			//runCallBack
			s.target=s.slides[s.index];
			if(s.params.onInit)s.params.onInit(s);
		}
		//执行主函数
		s.init();
		// Return slider instance
		return s;
	}
	Slider.prototype={
		support:{
			touch:(function(){return 'ontouchstart' in window})(),
			animationend:(function(){return 'onanimationend' in window})(),
			transitionend:(function(){return 'ontransitionend' in window})(),
		}
	}
})(window,document,undefined);

/*!
*	类型判断
*	@version 1.0.0
*	@author WangMingzhu
*/

/**
*  数据类型判断，主要用于是否是字符串、boolean值、Josn数据类型判断
* 
*  @class Type
*/
(function(window,document,undefined){
	
	window.Type={};
	var t=Type;
	/*====================
	动态添加方法Method:isString | isBoolean | isNumber | isArray | isObject | isHTMLElement
	=====================*/
	for(var i=0,type;type=["String","Boolean","Number","Array","Object","HTMLElement","Function"][i++];){
		(function(type){
			t["is"+type]=function(obj){
				if(type=="HTMLElement" && Object.prototype.toString.call(obj).indexOf("HTML")){
					return true;
				}
				return Object.prototype.toString.call(obj)==="[object "+type+"]";
			}
		})(type);
	}
	/*====================
	Other Method
	=====================*/
	t.isJson=function(obj){
		if(!obj){
			return false;
		}
		if(this.isObject(obj)){
			try{
				JSON.stringify(obj);
				return true;
			}catch(e){
				return false;
			}
		}else if(this.isString(obj)){
			try{
				JSON.parse(obj);
				return true;
			}catch(e){
				return false;
			}
		}else{
			return false;
		}
	},
	t.isQueryId=function(id){
		var idExpr=/^#([\w-]*)$/;
		var match=idExpr.exec(id);
		if(match && match.length>0){
			return match[1];
		}
		return false;
	},
	t.isQueryClass=function(classname){
		var classExpr=/^\.([\w-]*)$/;
		var match=classExpr.exec(classname);
		if(match && match.length>0){
			return match[1];
		}
		return false;
	},
	t.isId=function(id){
		if(typeof id === "string" && document.getElementById(id)){
			return true;
		}
		return false;
	},
	t.isClass=function(classname){
		if(typeof classname === "string" && document.getElementsByClassName(classname)){
			return true;
		}
		return false;
	},
	t.isTag=function(str){
		var tagExpr=/^<(\w+)\s*.*\/\w*>$/im;
		var match=tagExpr.exec(str);
		if(match && match.length>0){
			return true;
		}
		return false;
	},
	t.hasEvent=function(element,strEvent){
		return (document.all(element)[strEvent] == null) ? false : true 
	}
})(window,document,undefined);

/*!
 * 天气控件
 * @version 1.0.0
 * @author WangMingzhu
 * @require db.js & dateutil.js
 */

/**
*  天气控件
* 
*  @class Weather
*  @constructor
*  @param container //选择dom .weatherbox
*  @param params //配置项，如{"city":"扬州","expires":0.1}
*  @return {josn}
*  @import DateUtil from './DateUtil.js'
*/
(function(window,document,undefined){
	
	window.Weather=function(container,params){
		var s=this;
		s.container=document.querySelector(container);
		//Model
		/*===========================
	    Param
	    ===========================*/
	    var defaults={
	    	"city":"南京",
	    	"expires":"today"
	    };
	    params=params||{};
	    for(var def in defaults){
	    	if(params[def]==undefined){
	    		params[def]=defaults[def];
	    	}
	    };
	    s.params=params;
	    //初始化expires时效性参数
		if((!s.params.expires=="today" || s.params.expires==0) && typeof s.params.expires=="number"){
			return;
		}
		s.params.expires=DateUtil.format(DateUtil.expires(s.params.expires));

		/*===========================
	    Icon
	    ===========================*/
		s.icon={
			"qing" : "icon-weaqing",
			"duoyun" : "icon-weaduoyun",
			"zhenyu" : "icon-weazhenyu",
			"leizhenyu" : "icon-wealeizhenyu",
			"leizhenyubanyoubingbao" : "icon-wealeizhenyubanyoubingbao",
			"yujiaxue" : "icon-weayujiaxue",
			"xiaoyu" : "icon-weaxiaoyu",
			"zhongyu" : "icon-weazhongyu",
			"dayu" : "icon-weadayu",
			"baoyu" : "icon-weabaoyu",
			"dabaoyu" : "icon-weadabaoyu",
			"tedabaoyu" : "icon-weatedabaoyu",
			"zhenxue" : "icon-weazhenxue",
			"xiaoxue" : "icon-weaxiaoxue",
			"zhongxue" : "icon-weazhongxue",
			"daxue" : "icon-weadaxue",
			"baoxue" : "icon-weabaoxue",
			"wu" : "icon-weawu",
			"dongyu" : "icon-weadongyu",
			"shachenbao" : "icon-weashachenbao",
			"xiaoyuzhuanzhongyu" : "icon-weaxiaoyuzhuanzhongyu",
			"zhongyuzhuandayu" : "icon-weazhongyuzhuandayu",
			"dayuzhuanbaoyu" : "icon-weadayuzhuanbaoyu",
			"baoyuzhuandabaoyu" : "icon-weabaoyuzhuandabaoyu",
			"dabaoyuzhuantedabaoyu" : "icon-weadabaoyuzhuantedabaoyu",
			"xiaoxuezhuanzhongxue" : "icon-weaxiaoxuezhuanzhongxue",
			"zhongxuezhuandaxue" : "icon-weazhongxuezhuandaxue",
			"daxuezhuanbaoxue" : "icon-weadaxuezhuanbaoxue",
			"fuchen" : "icon-weafuchen",
			"yangsha" : "icon-weayangsha",
			"qiangshachenbao" : "icon-weaqiangshachenbao",
			"mai" : "icon-weamai",
			"yin" : "icon-weayin"
		};
		
		/*===========================
	    Load data
	    ===========================*/
		//如果本地数据库已存在，并且没有过期，就不再读取baidu天气api
		s.initWeatherData=function(){
			var weatherData=DB.get("weatherJson");
			var weatherDataExpires=DB.get("weatherJson_expires");
			var today=DateUtil.format(DateUtil.todayNow());
			if(weatherData && weatherDataExpires && weatherDataExpires>today){
				console.log("正在读取缓存天气，缓存于"+weatherDataExpires+"过期");
				s.showWeather(JSON.parse(weatherData));
				return;
			}
			s.loadWeatherData();
		};
		s.loadWeatherData=function(){
			$.ajax({
				url: 'http://api.map.baidu.com/telematics/v3/weather?location='+s.params.city+'&output=json&ak=W79uNeeyw7QXp6FGUzR6r8lY',
				type: 'GET',
				dataType: 'jsonp',
				success: function(json) {
					console.log(json);
					if (!json) {
						alert("你填写的现居地有误 ");
						return;
					}
					console.log("正在读取服务器天气..");
					
					//如果传入了时效参数，就将josn存储到本地数据库
					console.log("正在定义缓存时效，时效截止于"+s.params.expires);
					DB.set("weatherJson",JSON.stringify(json));
					DB.set("weatherJson_expires",s.params.expires);
					
					s.showWeather(json);
				},
				error:function(msg){
					console.log("ajax请求失败："+msg);
				}
			});
		};

		//view
		/*===========================
	    Show weather
	    ===========================*/
		s.showWeather=function(json){
			var temperatureExpr=/(-)?\d*℃/;
			var weekExpr=/(周|星期|礼拜)[1-7一二三四五六七天日]/;
			if (json.status == 'success') {
				//获得当前城市
				$(".weather-current-city",s.container).html(json.results[0].currentCity);
				//获得当前日期
				$("#weather-current-date",s.container).html(json.date);
				var today=json.results[0].weather_data[0].date;
				var temperatureMatch=temperatureExpr.exec(today);
				var weekMatch=weekExpr.exec(today);
				//获得当前温度
				$("#weather-current-temperature",s.container).html(temperatureMatch[0]);
				//获得当天温度
				$("#weather-today-temperature",s.container).html(json.results[0].weather_data[0].temperature);
				var pm25=json.results[0].pm25;
				var airquality=s.airqualityLvl(pm25);
				//获得当前空气pm2.5
				$(".weather-current-pm25",s.container).html(pm25);
				//获得当前空气质量
				$(".weather-air-quality",s.container).html(airquality);
				//获得当前天气图标
				$("#weather-current-icon",s.container).attr("class",s.reWeatherIcon(json.results[0].weather_data[0].dayPictureUrl));
				//获得当天天气名称
				$(".weather-name",s.container).html(json.results[0].weather_data[0].weather);
				//获得当天风向与级数
				$("#weather-current-wind").html(json.results[0].weather_data[0].wind);
				for(var i=0;i<4;i++){
					if (6 < DateUtil.hour() < 18) {
						$(".weather-otherday i",s.container).eq(i).attr("class",s.reWeatherIcon(json.results[0].weather_data[i].dayPictureUrl));
				}else{
					$(".weather-otherday i",s.container).eq(i).attr("class",s.reWeatherIcon(json.results[0].weather_data[i].dayPictureUrl));
				}
				$(".weather-otherday p",s.container).eq(i).html(json.results[0].weather_data[i].temperature);
				$(".weather-otherday small",s.container).eq(i).html(json.results[0].weather_data[i].date);
				/*$(s.container).append("天气:" + json.results[0].weather_data[i].weather+"    ");
				$(s.container).append("风向:" + json.results[0].weather_data[i].wind+"    ");*/
				}
				$(".weather-otherday small",s.container).eq(0).html(weekMatch[0]);
			}else{
				alert("天气获取失败,请刷新后重试");
			}
		}

		//Controller
		s.initWeatherData();
	};
	//prototype
	Weather.prototype={
		reWeatherIcon:function(weatherImg){
			var weatherImgName = weatherImg.substring(weatherImg.lastIndexOf('/')+1, weatherImg.lastIndexOf('.'));
			return this.icon[weatherImgName];
		},
		airqualityLvl:function(pm25){
			var airquality="";
			if(pm25<=50){
				airquality="优";
			}else if(pm25>50 && pm25<=100){
				airquality="良";
			}else if(pm25>100 && pm25<=150){
				airquality="轻度污染";
			}else if(pm25>150 && pm25<=200){
				airquality="中度污染";
			}else if(pm25>200 && pm25<=300){
				airquality="重度污染";
			}else{
				airquality="严重污染";
			}
			return airquality;
		}
	}
})(window,document,undefined);

(function() {
	function DateSelect(opt) {
		this.temp_date_array = [];
		this.temp_prev_date_array = [];
		this.temp_next_date_array = [];
		this.temp_month_calender_date_array = [];
		this.temp_prev_month_calender_date_array = [];
		this.temp_next_month_calender_date_array = [];

		var i = 0,
			weekMilliSecound = 7 * 24 * 60 * 60 * 1000,
			dayMilliSecound = 24 * 60 * 60 * 1000;

		if (opt.activeDate) {
			this.active_date = opt.activeDate;
		} else {
			this.active_date = new Date();
		}

		for (i = 0; i < 7; ++i) {
			this.temp_date_array.push(new Date());
			this.temp_prev_date_array.push(new Date());
			this.temp_next_date_array.push(new Date());
		}

		for (i = 0; i < 42; ++i) {
			this.temp_month_calender_date_array.push(new Date());
			this.temp_prev_month_calender_date_array.push(new Date());
			this.temp_next_month_calender_date_array.push(new Date());
		}

		function _prevWeek() {
			this.active_date.setTime(this.active_date.getTime() - weekMilliSecound);
		}

		function _nextWeek() {
			this.active_date.setTime(this.active_date.getTime() + weekMilliSecound);
		}

		function _prevMonth() {
			this.active_date.setMonth(this.active_date.getMonth() - 1);
		}

		function _nextMonth() {
			this.active_date.setMonth(this.active_date.getMonth() + 1);
		}

		function _getSelected() {
			return this.active_date;
		}

		function _setSelected(activeDate) {
			this.active_date.setTime(activeDate);
		}

		function _setSelectedDay(day) {
			this.active_date.setTime(this.active_date.getTime() + dayMilliSecound * (parseInt(day, 10) - this.active_date.getDay()));
		}

		function _getWeekArrayByTimeAndArray(date_array, time) {
			var j = 1;

			date_array[0].setTime(time);

			for (j = 1; j < 7; ++j) {
				date_array[j].setTime(date_array[j - 1].getTime() + dayMilliSecound);
			}

			return date_array;
		}

		function _getWeekDate() {
			var day = this.active_date.getDay();

			var first_date_time = this.active_date.getTime() - dayMilliSecound * day;

			return _getWeekArrayByTimeAndArray(this.temp_date_array, first_date_time);
		}

		function _getPrevWeekDate() {
			var day = this.active_date.getDay();

			var first_date_time = this.active_date.getTime() - dayMilliSecound * day - weekMilliSecound;

			return _getWeekArrayByTimeAndArray(this.temp_prev_date_array, first_date_time);
		}

		function _getNextWeekDate() {
			var day = this.active_date.getDay();

			var first_date_time = this.active_date.getTime() - dayMilliSecound * day + weekMilliSecound;

			return _getWeekArrayByTimeAndArray(this.temp_next_date_array, first_date_time);
		}

		function _getMonthCalenderArrayByTimeAndArray(date_array, time) {
			var j = 1;

			date_array[0].setTime(time);

			for (j = 1; j < 42; ++j) {
				date_array[j].setTime(date_array[j - 1].getTime() + dayMilliSecound);
			}

			return date_array;
		}

		var tempMonthCalenderDate = new Date();

		function _getMonthCalenderDate() {
			tempMonthCalenderDate.setTime(this.active_date.getTime() - dayMilliSecound * (this.active_date.getDate() - 1));

			var day = tempMonthCalenderDate.getDay();

			var first_date_time = tempMonthCalenderDate.getTime() - dayMilliSecound * day;

			return _getMonthCalenderArrayByTimeAndArray(this.temp_month_calender_date_array, first_date_time);
		}

		function _getPrevMonthCalenderDate() {
			tempMonthCalenderDate.setTime(this.active_date.getTime() - dayMilliSecound * (this.active_date.getDate() - 1));

			tempMonthCalenderDate.setMonth(tempMonthCalenderDate.getMonth() - 1);

			var day = tempMonthCalenderDate.getDay();

			var first_date_time = tempMonthCalenderDate.getTime() - dayMilliSecound * day;

			return _getMonthCalenderArrayByTimeAndArray(this.temp_prev_month_calender_date_array, first_date_time);
		}

		function _getNextMonthCalenderDate() {
			tempMonthCalenderDate.setTime(this.active_date.getTime() - dayMilliSecound * (this.active_date.getDate() - 1));

			tempMonthCalenderDate.setMonth(tempMonthCalenderDate.getMonth() + 1);

			var day = tempMonthCalenderDate.getDay();

			var first_date_time = tempMonthCalenderDate.getTime() - dayMilliSecound * day;

			return _getMonthCalenderArrayByTimeAndArray(this.temp_next_month_calender_date_array, first_date_time);
		}

		function _getWeekNumInCalender() {
			tempMonthCalenderDate.setTime(this.active_date.getTime() - dayMilliSecound * (this.active_date.getDate() - 1));

			return Math.floor((tempMonthCalenderDate.getDay() + this.active_date.getDate() - 1) / 7);
		}

		function _getMonthCalenderDateTimeByIndex(index) {
			tempMonthCalenderDate.setTime(this.active_date.getTime() - dayMilliSecound * (this.active_date.getDate() - 1));

			tempMonthCalenderDate.setTime(tempMonthCalenderDate.getTime() + dayMilliSecound * (index - tempMonthCalenderDate.getDay()));

			return tempMonthCalenderDate.getTime();
		}


		this.prevWeek = _prevWeek;
		this.nextWeek = _nextWeek;
		this.prevMonth = _prevMonth;
		this.nextMonth = _nextMonth;
		this.getSelected = _getSelected;
		this.setSelected = _setSelected;
		this.setSelectedDay = _setSelectedDay;
		this.getWeekDate = _getWeekDate;
		this.getPrevWeekDate = _getPrevWeekDate;
		this.getNextWeekDate = _getNextWeekDate;
		this.getMonthCalenderDate = _getMonthCalenderDate;
		this.getPrevMonthCalenderDate = _getPrevMonthCalenderDate;
		this.getNextMonthCalenderDate = _getNextMonthCalenderDate;
		this.getWeekNumInCalender = _getWeekNumInCalender;
		this.getMonthCalenderDateTimeByIndex = _getMonthCalenderDateTimeByIndex;
	}


	function Calender(opt) {
		var day_num_array = ["日", "一", "二", "三", "四", "五", "六"];

		this.container_element = document.getElementById(opt.containerDivId);
		this.mode = opt.mode ? opt.mode : 'week';
		this.dateSelectObject = opt.dateSelectObject;
		this.onChange = opt.onChange;

		this.keyElement = {
			calender_container: this.container_element.getElementsByClassName('calender_container')[0],
			date_container: this.container_element.getElementsByClassName('date_container')[0],
			month_container: this.container_element.getElementsByClassName('month_container')[0]
		};

		if (!this.container_element) {
			return false;
		}

		function _initCalenderDom(_this, containerElement) {
			var month_container = _this.keyElement.month_container,
				html = '',
				i, j, k;

			for (i = 0; i < 3; ++i) {
				html += '<div class="month-block">';
				for (j = 0; j < 6; ++j) {
					html += '<div class="week-line">';
					for (k = 0; k < 7; ++k) {
						html += '<div class="day-date"><span class="datenum_' + i + '_' + j + '_' + k + ' show-date">' + j + i + '</span></div>';
					}
					html += '</div>';
				}
				html += '</div>';
			}

			//console.log(html);

			month_container.innerHTML = html;
		}

		_initCalenderDom(this, this.container_element);

		this.keyData = {
			calenderWidth: this.container_element.clientWidth,
			calenderHeight: this.keyElement.date_container.getElementsByClassName('day-date')[0].clientHeight
		};

		function _getFirstNumByString(string) {
			return parseInt(string.match(/-?\d+/)[0], 10);
		}

		function _getPositionInfo(_this) {
			var tempXPostion = _getFirstNumByString(_this.keyElement.calender_container.style.WebkitTransform),
				tempYPostion = _getFirstNumByString(_this.keyElement.month_container.style.WebkitTransform),
				tempHeight = _this.keyElement.date_container.style.height;

			tempHeight = parseInt(tempHeight.substring(0, tempHeight.length - 2), 10);

			return {
				positonX: tempXPostion,
				positonY: tempYPostion,
				height: tempHeight
			};
		}

		function _drawCalenderDate(_this) {
			_setPostionAndHeight(_this);

			var month_container = _this.keyElement.month_container,
				selectedDate = _this.dateSelectObject.getSelected(),
				tempThisMonthCalenderDate = _this.dateSelectObject.getMonthCalenderDate(),
				tempSpanElement,
				i, j, k, today = new Date();

			_this.container_element.getElementsByClassName('calendar-title')[0].innerHTML = selectedDate.getFullYear() + '-' + (selectedDate.getMonth() + 1) + '-' + selectedDate.getDate() + ' ' + '周' + day_num_array[selectedDate.getDay()];

			for (i = 0; i < 6; ++i) {
				for (j = 0; j < 7; ++j) {
					k = i * 7 + j;
					tempSpanElement = month_container.getElementsByClassName('datenum_1_' + i + '_' + j)[0];
					tempSpanElement.innerHTML = tempThisMonthCalenderDate[k].getDate();
					tempSpanElement.className = tempSpanElement.className.replace(/ not-this-month/g, '');
					if (tempThisMonthCalenderDate[k].getMonth() != selectedDate.getMonth()) {
						tempSpanElement.className += " not-this-month";
					}

					tempSpanElement.className = tempSpanElement.className.replace(/ active/g, '');
					if (tempThisMonthCalenderDate[k].getDate() === selectedDate.getDate() && tempThisMonthCalenderDate[k].getMonth() === selectedDate.getMonth()) {
						tempSpanElement.className += " active";
					}

					tempSpanElement.className = tempSpanElement.className.replace(/ today/g, '');
					if (tempThisMonthCalenderDate[k].getDate() === today.getDate() && tempThisMonthCalenderDate[k].getMonth() === today.getMonth()) {
						tempSpanElement.className += " today";
					}
				}
			}

			if (_this.mode === 'week') {
				var lineNum = _this.dateSelectObject.getWeekNumInCalender(),
					tempPrevWeekDate = _this.dateSelectObject.getPrevWeekDate(),
					tempNextWeekDate = _this.dateSelectObject.getNextWeekDate();

				for (i = 0; i < 7; ++i) {
					tempSpanElement = month_container.getElementsByClassName('datenum_0_' + lineNum + '_' + i)[0];
					tempSpanElement.innerHTML = tempPrevWeekDate[i].getDate();
					tempSpanElement.className = tempSpanElement.className.replace(/ not-this-month/g, '');
					if (tempPrevWeekDate[i].getMonth() != selectedDate.getMonth()) {
						tempSpanElement.className += " not-this-month";
					}

					tempSpanElement.className = tempSpanElement.className.replace(/ today/g, '');
					if (tempPrevWeekDate[i].getDate() === today.getDate() && tempPrevWeekDate[i].getMonth() === today.getMonth()) {
						tempSpanElement.className += " today";
					}

					tempSpanElement = month_container.getElementsByClassName('datenum_2_' + lineNum + '_' + i)[0];
					tempSpanElement.innerHTML = tempNextWeekDate[i].getDate();
					tempSpanElement.className = tempSpanElement.className.replace(/ not-this-month/g, '');
					if (tempNextWeekDate[i].getMonth() != selectedDate.getMonth()) {
						tempSpanElement.className += " not-this-month";
					}

					tempSpanElement.className = tempSpanElement.className.replace(/ today/g, '');
					if (tempNextWeekDate[i].getDate() === today.getDate() && tempNextWeekDate[i].getMonth() === today.getMonth()) {
						tempSpanElement.className += " today";
					}
				}
			} else if (_this.mode === 'month') {
				var tempPrevMonthCalenderDate = _this.dateSelectObject.getPrevMonthCalenderDate(),
					tempNextMonthCalenderDate = _this.dateSelectObject.getNextMonthCalenderDate();

				for (i = 0; i < 6; ++i) {
					for (j = 0; j < 7; ++j) {
						k = i * 7 + j;
						tempSpanElement = month_container.getElementsByClassName('datenum_0_' + i + '_' + j)[0];
						tempSpanElement.innerHTML = tempPrevMonthCalenderDate[k].getDate();
						tempSpanElement.className = tempSpanElement.className.replace(/ not-this-month/g, '');
						tempSpanElement.className += " not-this-month";

						tempSpanElement.className = tempSpanElement.className.replace(/ today/g, '');
						if (tempPrevMonthCalenderDate[k].getDate() === today.getDate() && tempPrevMonthCalenderDate[k].getMonth() === today.getMonth()) {
							tempSpanElement.className += " today";
						}

						tempSpanElement = month_container.getElementsByClassName('datenum_2_' + i + '_' + j)[0];
						tempSpanElement.innerHTML = tempNextMonthCalenderDate[k].getDate();
						tempSpanElement.className = tempSpanElement.className.replace(/ not-this-month/g, '');
						tempSpanElement.className += " not-this-month";

						tempSpanElement.className = tempSpanElement.className.replace(/ today/g, '');
						if (tempNextMonthCalenderDate[k].getDate() === today.getDate() && tempNextMonthCalenderDate[k].getMonth() === today.getMonth()) {
							tempSpanElement.className += " today";
						}
					}
				}
			}
		}

		function _setPostionAndHeight(_this, positionInfo) {
			if (positionInfo) {
				_this.keyElement.calender_container.style.WebkitTransform = 'translateX(' + positionInfo.positonX + 'px)';

				_this.keyElement.calender_container.style.transform = 'translateX(' + positionInfo.positonX + 'px)';

				_this.keyElement.date_container.style.height = positionInfo.height + 'px';

				_this.keyElement.month_container.style.WebkitTransform = 'translateY(' + positionInfo.positonY + 'px)';

				_this.keyElement.month_container.style.transform = 'translateY(' + positionInfo.positonY + 'px)';

				return true;
			}

			_this.keyElement.calender_container.style.WebkitTransform = 'translateX(-' + _this.keyData.calenderWidth + 'px)';

			_this.keyElement.calender_container.style.transform = 'translateX(-' + _this.keyData.calenderWidth + 'px)';

			_this.keyElement.date_container.style.height = _this.mode == 'week' ? _this.keyData.calenderHeight + 'px' : _this.keyData.calenderHeight * 6 + 'px';

			_this.keyElement.month_container.style.WebkitTransform = _this.mode == 'week' ? 'translateY(' + (-1 * _this.dateSelectObject.getWeekNumInCalender() * _this.keyData.calenderHeight) + 'px)' : 'translateY(0px)';

			_this.keyElement.month_container.style.transform = _this.mode == 'week' ? 'translateY(' + (-1 * _this.dateSelectObject.getWeekNumInCalender() * _this.keyData.calenderHeight) + 'px)' : 'translateY(0px)';
		}

		function _animationTo(_this, direct, positon, finishCB) {
			var speed = 30,
				step = 25,
				_animationFunction;

			(function(_this, direct, positon, finishCB) {
				var targetPostion = {
					'x': {
						'0': {
							positonX: (-1 * _this.keyData.calenderWidth)
						},
						'1': {
							positonX: (-2 * _this.keyData.calenderWidth)
						},
						'-1': {
							positonX: 0
						}
					},
					'y': {
						'0': {
							positonY: 0,
							height: _this.keyData.calenderHeight * 6
						},
						'1': {
							positonY: (-1 * _this.dateSelectObject.getWeekNumInCalender() * _this.keyData.calenderHeight),
							height: _this.keyData.calenderHeight
						}
					}
				};

				_animationFunction = function() {
					var tempPositionInfo = _getPositionInfo(_this);

					var tempTargetPostion = targetPostion[direct][positon];

					var key, animationSign = false;

					for (key in tempTargetPostion) {
						if (tempTargetPostion[key] != tempPositionInfo[key]) {
							if ((tempTargetPostion[key] > tempPositionInfo[key]) && (tempTargetPostion[key] > tempPositionInfo[key] + step)) {
								tempPositionInfo[key] = tempPositionInfo[key] + step;
							} else if ((tempTargetPostion[key] < tempPositionInfo[key]) && (tempTargetPostion[key] < tempPositionInfo[key] - step)) {
								tempPositionInfo[key] = tempPositionInfo[key] - step;
							} else {
								tempPositionInfo[key] = tempTargetPostion[key];
							}
							animationSign = true;
						}
					}

					if (animationSign) {
						_setPostionAndHeight(_this, tempPositionInfo);
						return true;
					}

					return false;
				};
			})(_this, direct, positon, finishCB);

			(function(_animationFunction) {
				clearTimeout(_this.keyData.timeout);

				function _animationLoopFunction() {
					if (_animationFunction()) {
						_this.keyData.timeout = setTimeout(_animationLoopFunction, speed);
					} else if (typeof finishCB === 'function') {
						finishCB();
					}
				}

				_animationLoopFunction();
			})(_animationFunction);
		}

		function _initDateTouchAndAnimation(_this) {
			_drawCalenderDate(_this);

			_this.keyElement.date_container.addEventListener('touchstart', function(e) {
				var firstFinger = e.touches[0];
				_this.keyData.tempX = firstFinger.clientX;
				_this.keyData.tempY = firstFinger.clientY;
				_this.keyData.direct = 0;
			}, false);

			_this.keyElement.date_container.addEventListener('touchmove', function(e) {
				e.preventDefault();
				var firstFinger = e.touches[0],
					diffX = firstFinger.clientX - _this.keyData.tempX,
					diffY = firstFinger.clientY - _this.keyData.tempY;

				var tempPositionInfo = _getPositionInfo(_this);

				var tempNumX = tempPositionInfo.positonX + (diffX),
					tempNumY = tempPositionInfo.positonY + diffY,
					tempHeightNum = tempPositionInfo.height + diffY;

				if (_this.keyData.direct === 0) {
					_this.keyData.direct = Math.abs(diffX) > Math.abs(diffY) ? 1 : -1;
				}

				if (_this.keyData.direct === 1) {
					if (tempNumX < 0 && tempNumX > -2 * _this.keyData.calenderWidth) {
						_this.keyElement.calender_container.style.WebkitTransform = 'translateX(' + tempNumX + 'px)';

						_this.keyElement.calender_container.style.transform = 'translateX(' + tempNumX + 'px)';
					}
				} else if (_this.keyData.direct === -1) {
					if (tempNumY < 0 && tempNumY > -6 * _this.keyData.calenderHeight && tempHeightNum > _this.keyData.calenderHeight) {
						_this.keyElement.month_container.style.WebkitTransform = 'translateY(' + tempNumY + 'px)';

						_this.keyElement.month_container.style.transform = 'translateY(' + tempNumY + 'px)';
					}

					if (tempHeightNum > _this.keyData.calenderHeight && tempHeightNum < 6 * _this.keyData.calenderHeight) {
						_this.keyElement.date_container.style.height = tempHeightNum + 'px';
					}
				}

				_this.keyData.tempX = firstFinger.clientX;
				_this.keyData.tempY = firstFinger.clientY;
			}, false);

			function _redrawCalenderDate() {
				_drawCalenderDate(_this);
			}

			function removeFinger() {
				var tempPositionInfo = _getPositionInfo(_this);

				if (_this.keyData.direct === 1) {
					if (tempPositionInfo.positonX < -1.2 * _this.keyData.calenderWidth) {
						if (_this.mode === 'week') {
							_this.dateSelectObject.nextWeek();
						} else {
							_this.dateSelectObject.nextMonth();
						}
						if (typeof _this.onChange === "function") {
							_this.onChange(_this.dateSelectObject.getSelected());
						}
						_animationTo(_this, 'x', 1, _redrawCalenderDate);
					} else if (tempPositionInfo.positonX > -0.8 * _this.keyData.calenderWidth) {
						if (_this.mode === 'week') {
							_this.dateSelectObject.prevWeek();
						} else {
							_this.dateSelectObject.prevMonth();
						}
						if (typeof _this.onChange === "function") {
							_this.onChange(_this.dateSelectObject.getSelected());
						}
						_animationTo(_this, 'x', -1, _redrawCalenderDate);
					} else {
						_animationTo(_this, 'x', 0, _redrawCalenderDate);
					}
				} else if (_this.keyData.direct === -1) {
					var turnTo = _this.mode;

					if (turnTo === 'week' && (tempPositionInfo.height > _this.keyData.calenderHeight * 2)) {
						turnTo = 'month';
					} else if (turnTo === 'month' && (tempPositionInfo.height < _this.keyData.calenderHeight * 4)) {
						turnTo = 'week';
					}

					if (turnTo === 'week') {
						_this.mode = 'week';
						_animationTo(_this, 'y', 1, _redrawCalenderDate);
					} else {
						_this.mode = 'month';
						_animationTo(_this, 'y', 0, _redrawCalenderDate);
					}
				}
			}

			_this.switchMode = function() {
				if (_this.mode === 'month') {
					_this.mode = 'week';
					_animationTo(_this, 'y', 1, _redrawCalenderDate);
				} else {
					_this.mode = 'month';
					_animationTo(_this, 'y', 0, _redrawCalenderDate);
				}
			};

			_this.switchToWeek = function() {
				_this.mode = 'week';
				_animationTo(_this, 'y', 1, _redrawCalenderDate);
			};

			_this.switchToMonth = function() {
				_this.mode = 'month';
				_animationTo(_this, 'y', 0, _redrawCalenderDate);
			};

			_this.jumpToDate = function(date) {
				if (date && date.getTime) {
					_this.dateSelectObject.setSelected(date.getTime());
					_drawCalenderDate(_this);
				}
			};

			_this.getActiveDate = function(date) {
				return _this.dateSelectObject.getSelected();
			};

			_this.keyElement.date_container.addEventListener('touchend', removeFinger, false);

			_this.keyElement.date_container.addEventListener('touchcancel', removeFinger, false);

			var day_date_element_array = _this.container_element.getElementsByClassName("show-date"),
				day_date_length = day_date_element_array.length,
				i, tempHandleDateClickDate = new Date();

			function handleDateClick(e) {
				var className, indexArray, dateIndex;

				className = e.target.className;

				indexArray = className.substr(className.indexOf('date_num_') + 9, 5).split('_');

				dateIndex = parseInt(indexArray[1], 10) * 7 + parseInt(indexArray[2], 10);

				tempHandleDateClickDate.setTime(_this.dateSelectObject.getMonthCalenderDateTimeByIndex(dateIndex));


				if (tempHandleDateClickDate.getMonth() == _this.dateSelectObject.getSelected().getMonth() && tempHandleDateClickDate.getDate() == _this.dateSelectObject.getSelected().getDate()) {
					return;
				}

				_this.dateSelectObject.setSelected(tempHandleDateClickDate.getTime());

				if (typeof _this.onChange === "function") {
					_this.onChange(_this.dateSelectObject.getSelected());
				}
				_drawCalenderDate(_this);
			}

			for (i = 0; i < day_date_length; ++i) {
				day_date_element_array[i].onclick = handleDateClick;
			}

			_this.container_element.getElementsByClassName("arrowleft")[0].onclick = function(e) {
				if (_this.mode == 'week') {
					_this.dateSelectObject.prevWeek();
				} else {
					_this.dateSelectObject.prevMonth();
				}
				_animationTo(_this, 'x', -1, _redrawCalenderDate);
			};

			_this.container_element.getElementsByClassName("arrowright")[0].onclick = function(e) {
				if (_this.mode == 'week') {
					_this.dateSelectObject.nextWeek();
				} else {
					_this.dateSelectObject.nextMonth();
				}
				_animationTo(_this, 'x', 1, _redrawCalenderDate);
			};
		}

		var __this = this;

		//setTimeout(function(){
		_initDateTouchAndAnimation(__this);
		//},1200);
	}

	window.DateSelect = DateSelect;
	window.Calender = Calender;
})();

/*!
 * 汉字转拼音
 * @version 1.0.0
 * @author WangMingzhu
 */
(function(window,document,undefined){
	
	var chars = {"a":"\u554a\u963f\u9515","ai":"\u57c3\u6328\u54ce\u5509\u54c0\u7691\u764c\u853c\u77ee\u827e\u788d\u7231\u9698\u8bf6\u6371\u55f3\u55cc\u5ad2\u7477\u66a7\u7839\u953f\u972d","an":"\u978d\u6c28\u5b89\u4ffa\u6309\u6697\u5cb8\u80fa\u6848\u8c19\u57ef\u63de\u72b4\u5eb5\u6849\u94f5\u9e4c\u9878\u9eef","ang":"\u80ae\u6602\u76ce","ao":"\u51f9\u6556\u71ac\u7ff1\u8884\u50b2\u5965\u61ca\u6fb3\u5773\u62d7\u55f7\u5662\u5c99\u5ed2\u9068\u5aaa\u9a9c\u8071\u87af\u93ca\u9ccc\u93d6","ba":"\u82ad\u634c\u6252\u53ed\u5427\u7b06\u516b\u75a4\u5df4\u62d4\u8dcb\u9776\u628a\u8019\u575d\u9738\u7f62\u7238\u8307\u83dd\u8406\u636d\u5c9c\u705e\u6777\u94af\u7c91\u9c85\u9b43","bai":"\u767d\u67cf\u767e\u6446\u4f70\u8d25\u62dc\u7a17\u859c\u63b0\u97b4","ban":"\u6591\u73ed\u642c\u6273\u822c\u9881\u677f\u7248\u626e\u62cc\u4f34\u74e3\u534a\u529e\u7eca\u962a\u5742\u8c73\u94a3\u7622\u764d\u8228","bang":"\u90a6\u5e2e\u6886\u699c\u8180\u7ed1\u68d2\u78c5\u868c\u9551\u508d\u8c24\u84a1\u8783","bao":"\u82de\u80de\u5305\u8912\u96f9\u4fdd\u5821\u9971\u5b9d\u62b1\u62a5\u66b4\u8c79\u9c8d\u7206\u52f9\u8446\u5b80\u5b62\u7172\u9e28\u8913\u8db5\u9f85","bo":"\u5265\u8584\u73bb\u83e0\u64ad\u62e8\u94b5\u6ce2\u535a\u52c3\u640f\u94c2\u7b94\u4f2f\u5e1b\u8236\u8116\u818a\u6e24\u6cca\u9a73\u4eb3\u8543\u5575\u997d\u6a97\u64d8\u7934\u94b9\u9e41\u7c38\u8ddb","bei":"\u676f\u7891\u60b2\u5351\u5317\u8f88\u80cc\u8d1d\u94a1\u500d\u72c8\u5907\u60eb\u7119\u88ab\u5b5b\u9642\u90b6\u57e4\u84d3\u5457\u602b\u6096\u789a\u9e4e\u8919\u943e","ben":"\u5954\u82ef\u672c\u7b28\u755a\u574c\u951b","beng":"\u5d29\u7ef7\u752d\u6cf5\u8e66\u8ff8\u552a\u5623\u750f","bi":"\u903c\u9f3b\u6bd4\u9119\u7b14\u5f7c\u78a7\u84d6\u853d\u6bd5\u6bd9\u6bd6\u5e01\u5e87\u75f9\u95ed\u655d\u5f0a\u5fc5\u8f9f\u58c1\u81c2\u907f\u965b\u5315\u4ef3\u4ffe\u8298\u835c\u8378\u5421\u54d4\u72f4\u5eb3\u610e\u6ed7\u6fde\u5f3c\u59a3\u5a62\u5b16\u74a7\u8d32\u7540\u94cb\u79d5\u88e8\u7b5a\u7b85\u7be6\u822d\u895e\u8df8\u9ac0","bian":"\u97ad\u8fb9\u7f16\u8d2c\u6241\u4fbf\u53d8\u535e\u8fa8\u8fa9\u8fab\u904d\u533e\u5f01\u82c4\u5fed\u6c74\u7f0f\u7178\u782d\u78a5\u7a39\u7a86\u8759\u7b3e\u9cca","biao":"\u6807\u5f6a\u8198\u8868\u5a4a\u9aa0\u98d1\u98d9\u98da\u706c\u9556\u9573\u762d\u88f1\u9cd4","bie":"\u9cd6\u618b\u522b\u762a\u8e69\u9cd8","bin":"\u5f6c\u658c\u6fd2\u6ee8\u5bbe\u6448\u50a7\u6d5c\u7f24\u73a2\u6ba1\u8191\u9554\u9acc\u9b13","bing":"\u5175\u51b0\u67c4\u4e19\u79c9\u997c\u70b3\u75c5\u5e76\u7980\u90b4\u6452\u7ee0\u678b\u69df\u71f9","bu":"\u6355\u535c\u54fa\u8865\u57e0\u4e0d\u5e03\u6b65\u7c3f\u90e8\u6016\u62ca\u535f\u900b\u74ff\u6661\u949a\u91ad","ca":"\u64e6\u5693\u7924","cai":"\u731c\u88c1\u6750\u624d\u8d22\u776c\u8e29\u91c7\u5f69\u83dc\u8521","can":"\u9910\u53c2\u8695\u6b8b\u60ed\u60e8\u707f\u9a96\u74a8\u7cb2\u9eea","cang":"\u82cd\u8231\u4ed3\u6ca7\u85cf\u4f27","cao":"\u64cd\u7cd9\u69fd\u66f9\u8349\u8279\u5608\u6f15\u87ac\u825a","ce":"\u5395\u7b56\u4fa7\u518c\u6d4b\u5202\u5e3b\u607b","ceng":"\u5c42\u8e6d\u564c","cha":"\u63d2\u53c9\u832c\u8336\u67e5\u78b4\u643d\u5bdf\u5c94\u5dee\u8be7\u7339\u9987\u6c4a\u59f9\u6748\u6942\u69ce\u6aab\u9497\u9538\u9572\u8869","chai":"\u62c6\u67f4\u8c7a\u4faa\u8308\u7625\u867f\u9f87","chan":"\u6400\u63ba\u8749\u998b\u8c17\u7f20\u94f2\u4ea7\u9610\u98a4\u5181\u8c04\u8c36\u8487\u5edb\u5fcf\u6f7a\u6fb6\u5b71\u7fbc\u5a75\u5b17\u9aa3\u89c7\u7985\u9561\u88e3\u87fe\u8e94","chang":"\u660c\u7316\u573a\u5c1d\u5e38\u957f\u507f\u80a0\u5382\u655e\u7545\u5531\u5021\u4f25\u9b2f\u82cc\u83d6\u5f9c\u6005\u60dd\u960a\u5a3c\u5ae6\u6636\u6c05\u9cb3","chao":"\u8d85\u6284\u949e\u671d\u5632\u6f6e\u5de2\u5435\u7092\u600a\u7ec9\u6641\u8016","che":"\u8f66\u626f\u64a4\u63a3\u5f7b\u6f88\u577c\u5c6e\u7817","chen":"\u90f4\u81e3\u8fb0\u5c18\u6668\u5ff1\u6c89\u9648\u8d81\u886c\u79f0\u8c0c\u62bb\u55d4\u5bb8\u741b\u6987\u809c\u80c2\u789c\u9f80","cheng":"\u6491\u57ce\u6a59\u6210\u5448\u4e58\u7a0b\u60e9\u6f84\u8bda\u627f\u901e\u9a8b\u79e4\u57d5\u5d4a\u5fb5\u6d48\u67a8\u67fd\u6a18\u665f\u584d\u77a0\u94d6\u88ce\u86cf\u9172","chi":"\u5403\u75f4\u6301\u5319\u6c60\u8fdf\u5f1b\u9a70\u803b\u9f7f\u4f88\u5c3a\u8d64\u7fc5\u65a5\u70bd\u50ba\u5880\u82aa\u830c\u640b\u53f1\u54e7\u557b\u55e4\u5f73\u996c\u6cb2\u5ab8\u6555\u80dd\u7719\u7735\u9e31\u761b\u892b\u86a9\u87ad\u7b1e\u7bea\u8c49\u8e05\u8e1f\u9b51","chong":"\u5145\u51b2\u866b\u5d07\u5ba0\u833a\u5fe1\u61a7\u94f3\u825f","chou":"\u62bd\u916c\u7574\u8e0c\u7a20\u6101\u7b79\u4ec7\u7ef8\u7785\u4e11\u4fe6\u5733\u5e31\u60c6\u6eb4\u59af\u7633\u96e0\u9c8b","chu":"\u81ed\u521d\u51fa\u6a71\u53a8\u8e87\u9504\u96cf\u6ec1\u9664\u695a\u7840\u50a8\u77d7\u6410\u89e6\u5904\u4e8d\u520d\u61b7\u7ecc\u6775\u696e\u6a17\u870d\u8e70\u9edc","chuan":"\u63e3\u5ddd\u7a7f\u693d\u4f20\u8239\u5598\u4e32\u63be\u821b\u60f4\u9044\u5ddb\u6c1a\u948f\u9569\u8221","chuang":"\u75ae\u7a97\u5e62\u5e8a\u95ef\u521b\u6006","chui":"\u5439\u708a\u6376\u9524\u5782\u9672\u68f0\u69cc","chun":"\u6625\u693f\u9187\u5507\u6df3\u7eaf\u8822\u4fc3\u83bc\u6c8c\u80ab\u6710\u9e51\u877d","chuo":"\u6233\u7ef0\u851f\u8fb6\u8f8d\u955e\u8e14\u9f8a","ci":"\u75b5\u8328\u78c1\u96cc\u8f9e\u6148\u74f7\u8bcd\u6b64\u523a\u8d50\u6b21\u8360\u5472\u5d6f\u9e5a\u8785\u7ccd\u8d91","cong":"\u806a\u8471\u56f1\u5306\u4ece\u4e1b\u506c\u82c1\u6dd9\u9aa2\u742e\u7481\u679e","cu":"\u51d1\u7c97\u918b\u7c07\u731d\u6b82\u8e59","cuan":"\u8e7f\u7be1\u7a9c\u6c46\u64ba\u6615\u7228","cui":"\u6467\u5d14\u50ac\u8106\u7601\u7cb9\u6dec\u7fe0\u8403\u60b4\u7480\u69b1\u96b9","cun":"\u6751\u5b58\u5bf8\u78cb\u5fd6\u76b4","cuo":"\u64ae\u6413\u63aa\u632b\u9519\u539d\u811e\u9509\u77ec\u75e4\u9e7e\u8e49\u8e9c","da":"\u642d\u8fbe\u7b54\u7629\u6253\u5927\u8037\u54d2\u55d2\u601b\u59b2\u75b8\u8921\u7b2a\u977c\u9791","dai":"\u5446\u6b79\u50a3\u6234\u5e26\u6b86\u4ee3\u8d37\u888b\u5f85\u902e\u6020\u57ed\u7519\u5454\u5cb1\u8fe8\u902f\u9a80\u7ed0\u73b3\u9edb","dan":"\u803d\u62c5\u4e39\u5355\u90f8\u63b8\u80c6\u65e6\u6c2e\u4f46\u60ee\u6de1\u8bde\u5f39\u86cb\u4ebb\u510b\u5369\u840f\u5556\u6fb9\u6a90\u6b9a\u8d55\u7708\u7605\u8043\u7baa","dang":"\u5f53\u6321\u515a\u8361\u6863\u8c20\u51fc\u83ea\u5b95\u7800\u94db\u88c6","dao":"\u5200\u6363\u8e48\u5012\u5c9b\u7977\u5bfc\u5230\u7a3b\u60bc\u9053\u76d7\u53e8\u5541\u5fc9\u6d2e\u6c18\u7118\u5fd1\u7e9b","de":"\u5fb7\u5f97\u7684\u951d","deng":"\u8e6c\u706f\u767b\u7b49\u77aa\u51f3\u9093\u5654\u5d9d\u6225\u78f4\u956b\u7c26","di":"\u5824\u4f4e\u6ef4\u8fea\u654c\u7b1b\u72c4\u6da4\u7fdf\u5ae1\u62b5\u5e95\u5730\u8482\u7b2c\u5e1d\u5f1f\u9012\u7f14\u6c10\u7c74\u8bcb\u8c1b\u90b8\u577b\u839c\u837b\u5600\u5a23\u67e2\u68e3\u89cc\u7825\u78b2\u7747\u955d\u7f9d\u9ab6","dian":"\u98a0\u6382\u6ec7\u7898\u70b9\u5178\u975b\u57ab\u7535\u4f43\u7538\u5e97\u60e6\u5960\u6dc0\u6bbf\u4e36\u963d\u576b\u57dd\u5dc5\u73b7\u765c\u766b\u7c1f\u8e2e","diao":"\u7889\u53fc\u96d5\u51cb\u5201\u6389\u540a\u9493\u8c03\u8f7a\u94de\u8729\u7c9c\u8c82","die":"\u8dcc\u7239\u789f\u8776\u8fed\u8c0d\u53e0\u4f5a\u57a4\u581e\u63f2\u558b\u6e2b\u8f76\u7252\u74de\u8936\u800b\u8e40\u9cbd\u9cce","ding":"\u4e01\u76ef\u53ee\u9489\u9876\u9f0e\u952d\u5b9a\u8ba2\u4e22\u4ec3\u5576\u738e\u815a\u7887\u753a\u94e4\u7594\u8035\u914a","dong":"\u4e1c\u51ac\u8463\u61c2\u52a8\u680b\u4f97\u606b\u51bb\u6d1e\u578c\u549a\u5cbd\u5cd2\u5902\u6c21\u80e8\u80f4\u7850\u9e2b","dou":"\u515c\u6296\u6597\u9661\u8c46\u9017\u75d8\u8538\u94ad\u7aa6\u7aac\u86aa\u7bfc\u9161","du":"\u90fd\u7763\u6bd2\u728a\u72ec\u8bfb\u5835\u7779\u8d4c\u675c\u9540\u809a\u5ea6\u6e21\u5992\u828f\u561f\u6e0e\u691f\u6a50\u724d\u8839\u7b03\u9ad1\u9ee9","duan":"\u7aef\u77ed\u953b\u6bb5\u65ad\u7f0e\u5f56\u6934\u7145\u7c16","dui":"\u5806\u5151\u961f\u5bf9\u603c\u619d\u7893","dun":"\u58a9\u5428\u8e72\u6566\u987f\u56e4\u949d\u76fe\u9041\u7096\u7818\u7905\u76f9\u9566\u8db8","duo":"\u6387\u54c6\u591a\u593a\u579b\u8eb2\u6735\u8dfa\u8235\u5241\u60f0\u5815\u5484\u54da\u7f0d\u67c1\u94ce\u88f0\u8e31","e":"\u86fe\u5ce8\u9e45\u4fc4\u989d\u8bb9\u5a25\u6076\u5384\u627c\u904f\u9102\u997f\u5669\u8c14\u57a9\u57ad\u82ca\u83aa\u843c\u5443\u6115\u5c59\u5a40\u8f6d\u66f7\u816d\u786a\u9507\u9537\u9e57\u989a\u9cc4","en":"\u6069\u84bd\u6441\u5514\u55ef","er":"\u800c\u513f\u8033\u5c14\u9975\u6d31\u4e8c\u8d30\u8fe9\u73e5\u94d2\u9e38\u9c95","fa":"\u53d1\u7f5a\u7b4f\u4f10\u4e4f\u9600\u6cd5\u73d0\u57a1\u781d","fan":"\u85e9\u5e06\u756a\u7ffb\u6a0a\u77fe\u9492\u7e41\u51e1\u70e6\u53cd\u8fd4\u8303\u8d29\u72af\u996d\u6cdb\u8629\u5e61\u72ad\u68b5\u6535\u71d4\u7548\u8e6f","fang":"\u574a\u82b3\u65b9\u80aa\u623f\u9632\u59a8\u4eff\u8bbf\u7eba\u653e\u531a\u90a1\u5f77\u94ab\u822b\u9c82","fei":"\u83f2\u975e\u5561\u98de\u80a5\u532a\u8bfd\u5420\u80ba\u5e9f\u6cb8\u8d39\u82be\u72d2\u60b1\u6ddd\u5983\u7ecb\u7eef\u69a7\u8153\u6590\u6249\u7953\u7829\u9544\u75f1\u871a\u7bda\u7fe1\u970f\u9cb1","fen":"\u82ac\u915a\u5429\u6c1b\u5206\u7eb7\u575f\u711a\u6c7e\u7c89\u594b\u4efd\u5fff\u6124\u7caa\u507e\u7035\u68fc\u610d\u9cbc\u9f22","feng":"\u4e30\u5c01\u67ab\u8702\u5cf0\u950b\u98ce\u75af\u70fd\u9022\u51af\u7f1d\u8bbd\u5949\u51e4\u4ff8\u9146\u8451\u6ca3\u781c","fu":"\u4f5b\u5426\u592b\u6577\u80a4\u5b75\u6276\u62c2\u8f90\u5e45\u6c1f\u7b26\u4f0f\u4fd8\u670d\u6d6e\u6daa\u798f\u88b1\u5f17\u752b\u629a\u8f85\u4fef\u91dc\u65a7\u812f\u8151\u5e9c\u8150\u8d74\u526f\u8986\u8d4b\u590d\u5085\u4ed8\u961c\u7236\u8179\u8d1f\u5bcc\u8ba3\u9644\u5987\u7f1a\u5490\u5310\u51eb\u90db\u8299\u82fb\u832f\u83a9\u83d4\u544b\u5e5e\u6ecf\u8274\u5b5a\u9a78\u7ec2\u6874\u8d59\u9efb\u9efc\u7f58\u7a03\u99a5\u864d\u86a8\u8709\u8760\u876e\u9eb8\u8dba\u8dd7\u9cc6","ga":"\u5676\u560e\u86e4\u5c2c\u5477\u5c15\u5c1c\u65ee\u9486","gai":"\u8be5\u6539\u6982\u9499\u76d6\u6e89\u4e10\u9654\u5793\u6224\u8d45\u80f2","gan":"\u5e72\u7518\u6746\u67d1\u7aff\u809d\u8d76\u611f\u79c6\u6562\u8d63\u5769\u82f7\u5c34\u64c0\u6cd4\u6de6\u6f89\u7ec0\u6a44\u65f0\u77f8\u75b3\u9150","gang":"\u5188\u521a\u94a2\u7f38\u809b\u7eb2\u5c97\u6e2f\u6206\u7f61\u9883\u7b7b","gong":"\u6760\u5de5\u653b\u529f\u606d\u9f9a\u4f9b\u8eac\u516c\u5bab\u5f13\u5de9\u6c5e\u62f1\u8d21\u5171\u857b\u5efe\u54a3\u73d9\u80b1\u86a3\u86e9\u89e5","gao":"\u7bd9\u768b\u9ad8\u818f\u7f94\u7cd5\u641e\u9550\u7a3f\u544a\u777e\u8bf0\u90dc\u84bf\u85c1\u7f1f\u69d4\u69c1\u6772\u9506","ge":"\u54e5\u6b4c\u6401\u6208\u9e3d\u80f3\u7599\u5272\u9769\u845b\u683c\u9601\u9694\u94ec\u4e2a\u5404\u9b32\u4ee1\u54ff\u5865\u55dd\u7ea5\u643f\u8188\u784c\u94ea\u9549\u88bc\u988c\u867c\u8238\u9abc\u9ac2","gei":"\u7ed9","gen":"\u6839\u8ddf\u4e98\u831b\u54cf\u826e","geng":"\u8015\u66f4\u5e9a\u7fb9\u57c2\u803f\u6897\u54fd\u8d53\u9ca0","gou":"\u94a9\u52fe\u6c9f\u82df\u72d7\u57a2\u6784\u8d2d\u591f\u4f5d\u8bdf\u5ca3\u9058\u5abe\u7f11\u89cf\u5f40\u9e32\u7b31\u7bdd\u97b2","gu":"\u8f9c\u83c7\u5495\u7b8d\u4f30\u6cbd\u5b64\u59d1\u9f13\u53e4\u86ca\u9aa8\u8c37\u80a1\u6545\u987e\u56fa\u96c7\u560f\u8bc2\u83f0\u54cc\u5d2e\u6c69\u688f\u8f71\u726f\u727f\u80cd\u81cc\u6bc2\u77bd\u7f5f\u94b4\u9522\u74e0\u9e2a\u9e44\u75fc\u86c4\u9164\u89da\u9cb4\u9ab0\u9e58","gua":"\u522e\u74dc\u5250\u5be1\u6302\u8902\u5366\u8bd6\u5471\u681d\u9e39","guai":"\u4e56\u62d0\u602a\u54d9","guan":"\u68fa\u5173\u5b98\u51a0\u89c2\u7ba1\u9986\u7f50\u60ef\u704c\u8d2f\u500c\u839e\u63bc\u6dab\u76e5\u9e73\u9ccf","guang":"\u5149\u5e7f\u901b\u72b7\u6844\u80f1\u7592","gui":"\u7470\u89c4\u572d\u7845\u5f52\u9f9f\u95fa\u8f68\u9b3c\u8be1\u7678\u6842\u67dc\u8dea\u8d35\u523d\u5326\u523f\u5e8b\u5b84\u59ab\u6867\u7085\u6677\u7688\u7c0b\u9c91\u9cdc","gun":"\u8f8a\u6eda\u68cd\u4e28\u886e\u7ef2\u78d9\u9ca7","guo":"\u9505\u90ed\u56fd\u679c\u88f9\u8fc7\u9998\u8803\u57da\u63b4\u5459\u56d7\u5e3c\u5d1e\u7313\u6901\u8662\u951e\u8052\u872e\u873e\u8748","ha":"\u54c8","hai":"\u9ab8\u5b69\u6d77\u6c26\u4ea5\u5bb3\u9a87\u54b4\u55e8\u988f\u91a2","han":"\u9163\u61a8\u90af\u97e9\u542b\u6db5\u5bd2\u51fd\u558a\u7f55\u7ff0\u64bc\u634d\u65f1\u61be\u608d\u710a\u6c57\u6c49\u9097\u83e1\u6496\u961a\u701a\u6657\u7113\u9894\u86b6\u9f3e","hen":"\u592f\u75d5\u5f88\u72e0\u6068","hang":"\u676d\u822a\u6c86\u7ed7\u73e9\u6841","hao":"\u58d5\u568e\u8c6a\u6beb\u90dd\u597d\u8017\u53f7\u6d69\u8585\u55e5\u5686\u6fe0\u704f\u660a\u7693\u98a2\u869d","he":"\u5475\u559d\u8377\u83cf\u6838\u79be\u548c\u4f55\u5408\u76d2\u8c89\u9602\u6cb3\u6db8\u8d6b\u8910\u9e64\u8d3a\u8bc3\u52be\u58d1\u85ff\u55d1\u55ec\u9616\u76cd\u86b5\u7fee","hei":"\u563f\u9ed1","heng":"\u54fc\u4ea8\u6a2a\u8861\u6052\u8a07\u8605","hong":"\u8f70\u54c4\u70d8\u8679\u9e3f\u6d2a\u5b8f\u5f18\u7ea2\u9ec9\u8ba7\u836d\u85a8\u95f3\u6cd3","hou":"\u5589\u4faf\u7334\u543c\u539a\u5019\u540e\u5820\u5f8c\u9005\u760a\u7bcc\u7cc7\u9c8e\u9aba","hu":"\u547c\u4e4e\u5ffd\u745a\u58f6\u846b\u80e1\u8774\u72d0\u7cca\u6e56\u5f27\u864e\u552c\u62a4\u4e92\u6caa\u6237\u51b1\u553f\u56eb\u5cb5\u7322\u6019\u60da\u6d52\u6ef9\u7425\u69f2\u8f77\u89f3\u70c0\u7173\u623d\u6248\u795c\u9e55\u9e71\u7b0f\u9190\u659b","hua":"\u82b1\u54d7\u534e\u733e\u6ed1\u753b\u5212\u5316\u8bdd\u5290\u6d4d\u9a85\u6866\u94e7\u7a1e","huai":"\u69d0\u5f8a\u6000\u6dee\u574f\u8fd8\u8e1d","huan":"\u6b22\u73af\u6853\u7f13\u6362\u60a3\u5524\u75ea\u8c62\u7115\u6da3\u5ba6\u5e7b\u90c7\u5942\u57b8\u64d0\u571c\u6d39\u6d63\u6f36\u5bf0\u902d\u7f33\u953e\u9ca9\u9b1f","huang":"\u8352\u614c\u9ec4\u78fa\u8757\u7c27\u7687\u51f0\u60f6\u714c\u6643\u5e4c\u604d\u8c0e\u968d\u5fa8\u6e5f\u6f62\u9051\u749c\u8093\u7640\u87e5\u7bc1\u9cc7","hui":"\u7070\u6325\u8f89\u5fbd\u6062\u86d4\u56de\u6bc1\u6094\u6167\u5349\u60e0\u6666\u8d3f\u79fd\u4f1a\u70e9\u6c47\u8bb3\u8bf2\u7ed8\u8bd9\u8334\u835f\u8559\u54d5\u5599\u96b3\u6d04\u5f57\u7f0b\u73f2\u6656\u605a\u867a\u87ea\u9ebe","hun":"\u8364\u660f\u5a5a\u9b42\u6d51\u6df7\u8be8\u9984\u960d\u6eb7\u7f17","huo":"\u8c41\u6d3b\u4f19\u706b\u83b7\u6216\u60d1\u970d\u8d27\u7978\u6509\u56af\u5925\u94ac\u952a\u956c\u8020\u8816","ji":"\u51fb\u573e\u57fa\u673a\u7578\u7a3d\u79ef\u7b95\u808c\u9965\u8ff9\u6fc0\u8ba5\u9e21\u59ec\u7ee9\u7f09\u5409\u6781\u68d8\u8f91\u7c4d\u96c6\u53ca\u6025\u75be\u6c72\u5373\u5ac9\u7ea7\u6324\u51e0\u810a\u5df1\u84df\u6280\u5180\u5b63\u4f0e\u796d\u5242\u60b8\u6d4e\u5bc4\u5bc2\u8ba1\u8bb0\u65e2\u5fcc\u9645\u5993\u7ee7\u7eaa\u5c45\u4e0c\u4e69\u525e\u4f76\u4f74\u8114\u58bc\u82a8\u82b0\u8401\u84ba\u857a\u638e\u53fd\u54ad\u54dc\u5527\u5c8c\u5d74\u6d0e\u5f50\u5c50\u9aa5\u757f\u7391\u696b\u6b9b\u621f\u6222\u8d4d\u89ca\u7284\u9f51\u77f6\u7f81\u5d47\u7a37\u7620\u7635\u866e\u7b08\u7b04\u66a8\u8dfb\u8dfd\u9701\u9c9a\u9cab\u9afb\u9e82","jia":"\u5609\u67b7\u5939\u4f73\u5bb6\u52a0\u835a\u988a\u8d3e\u7532\u94be\u5047\u7a3c\u4ef7\u67b6\u9a7e\u5ac1\u4f3d\u90cf\u62ee\u5cac\u6d43\u8fe6\u73c8\u621b\u80db\u605d\u94d7\u9553\u75c2\u86f1\u7b33\u8888\u8dcf","jian":"\u6b7c\u76d1\u575a\u5c16\u7b3a\u95f4\u714e\u517c\u80a9\u8270\u5978\u7f04\u8327\u68c0\u67ec\u78b1\u7877\u62e3\u6361\u7b80\u4fed\u526a\u51cf\u8350\u69db\u9274\u8df5\u8d31\u89c1\u952e\u7bad\u4ef6\u5065\u8230\u5251\u996f\u6e10\u6e85\u6da7\u5efa\u50ed\u8c0f\u8c2b\u83c5\u84b9\u641b\u56dd\u6e54\u8e47\u8b07\u7f23\u67a7\u67d9\u6957\u620b\u622c\u726e\u728d\u6bfd\u8171\u7751\u950f\u9e63\u88e5\u7b15\u7bb4\u7fe6\u8dbc\u8e3a\u9ca3\u97af","jiang":"\u50f5\u59dc\u5c06\u6d46\u6c5f\u7586\u848b\u6868\u5956\u8bb2\u5320\u9171\u964d\u8333\u6d1a\u7edb\u7f30\u729f\u7913\u8029\u7ce8\u8c47","jiao":"\u8549\u6912\u7901\u7126\u80f6\u4ea4\u90ca\u6d47\u9a84\u5a07\u56bc\u6405\u94f0\u77eb\u4fa5\u811a\u72e1\u89d2\u997a\u7f34\u7ede\u527f\u6559\u9175\u8f7f\u8f83\u53eb\u4f7c\u50ec\u832d\u6322\u564d\u5ce4\u5fbc\u59e3\u7e9f\u656b\u768e\u9e6a\u86df\u91ae\u8de4\u9c9b","jie":"\u7a96\u63ed\u63a5\u7686\u79f8\u8857\u9636\u622a\u52ab\u8282\u6854\u6770\u6377\u776b\u7aed\u6d01\u7ed3\u89e3\u59d0\u6212\u85c9\u82a5\u754c\u501f\u4ecb\u75a5\u8beb\u5c4a\u5048\u8ba6\u8bd8\u5588\u55df\u736c\u5a55\u5b51\u6840\u7352\u78a3\u9534\u7596\u88b7\u9889\u86a7\u7faf\u9c92\u9ab1\u9aeb","jin":"\u5dfe\u7b4b\u65a4\u91d1\u4eca\u6d25\u895f\u7d27\u9526\u4ec5\u8c28\u8fdb\u9773\u664b\u7981\u8fd1\u70ec\u6d78\u5c3d\u537a\u8369\u5807\u5664\u9991\u5ed1\u5997\u7f19\u747e\u69ff\u8d46\u89d0\u9485\u9513\u887f\u77dc","jing":"\u52b2\u8346\u5162\u830e\u775b\u6676\u9cb8\u4eac\u60ca\u7cbe\u7cb3\u7ecf\u4e95\u8b66\u666f\u9888\u9759\u5883\u656c\u955c\u5f84\u75c9\u9756\u7adf\u7ade\u51c0\u522d\u5106\u9631\u83c1\u734d\u61ac\u6cfe\u8ff3\u5f2a\u5a67\u80bc\u80eb\u8148\u65cc","jiong":"\u70af\u7a98\u5182\u8fe5\u6243","jiu":"\u63ea\u7a76\u7ea0\u7396\u97ed\u4e45\u7078\u4e5d\u9152\u53a9\u6551\u65e7\u81fc\u8205\u548e\u5c31\u759a\u50e6\u557e\u9604\u67e9\u6855\u9e6b\u8d73\u9b0f","ju":"\u97a0\u62d8\u72d9\u75bd\u9a79\u83ca\u5c40\u5480\u77e9\u4e3e\u6cae\u805a\u62d2\u636e\u5de8\u5177\u8ddd\u8e1e\u952f\u4ff1\u53e5\u60e7\u70ac\u5267\u5028\u8bb5\u82e3\u82f4\u8392\u63ac\u907d\u5c66\u741a\u67b8\u6910\u6998\u6989\u6a58\u728b\u98d3\u949c\u9514\u7aad\u88fe\u8d84\u91b5\u8e3d\u9f83\u96ce\u97ab","juan":"\u6350\u9e43\u5a1f\u5026\u7737\u5377\u7ee2\u9104\u72f7\u6d93\u684a\u8832\u9529\u954c\u96bd","jue":"\u6485\u652b\u6289\u6398\u5014\u7235\u89c9\u51b3\u8bc0\u7edd\u53a5\u5282\u8c32\u77cd\u8568\u5658\u5d1b\u7357\u5b53\u73cf\u6877\u6a5b\u721d\u9562\u8e76\u89d6","jun":"\u5747\u83cc\u94a7\u519b\u541b\u5cfb\u4fca\u7ae3\u6d5a\u90e1\u9a8f\u6343\u72fb\u76b2\u7b60\u9e87","ka":"\u5580\u5496\u5361\u4f67\u5494\u80e9","ke":"\u54af\u5777\u82db\u67ef\u68f5\u78d5\u9897\u79d1\u58f3\u54b3\u53ef\u6e34\u514b\u523b\u5ba2\u8bfe\u5ca2\u606a\u6e98\u9a92\u7f02\u73c2\u8f72\u6c2a\u778c\u94b6\u75b4\u7aa0\u874c\u9ac1","kai":"\u5f00\u63e9\u6977\u51ef\u6168\u5240\u57b2\u8488\u5ffe\u607a\u94e0\u950e","kan":"\u520a\u582a\u52d8\u574e\u780d\u770b\u4f83\u51f5\u83b0\u83b6\u6221\u9f9b\u77b0","kang":"\u5eb7\u6177\u7ce0\u625b\u6297\u4ea2\u7095\u5751\u4f09\u95f6\u94aa","kao":"\u8003\u62f7\u70e4\u9760\u5c3b\u6832\u7292\u94d0","ken":"\u80af\u5543\u57a6\u6073\u57a0\u88c9\u9880","keng":"\u542d\u5fd0\u94ff","kong":"\u7a7a\u6050\u5b54\u63a7\u5025\u5d06\u7b9c","kou":"\u62a0\u53e3\u6263\u5bc7\u82a4\u853b\u53e9\u770d\u7b58","ku":"\u67af\u54ed\u7a9f\u82e6\u9177\u5e93\u88e4\u5233\u5800\u55be\u7ed4\u9ab7","kua":"\u5938\u57ae\u630e\u8de8\u80ef\u4f89","kuai":"\u5757\u7b77\u4fa9\u5feb\u84af\u90d0\u8489\u72ef\u810d","kuan":"\u5bbd\u6b3e\u9acb","kuang":"\u5321\u7b50\u72c2\u6846\u77ff\u7736\u65f7\u51b5\u8bd3\u8bf3\u909d\u5739\u593c\u54d0\u7ea9\u8d36","kui":"\u4e8f\u76d4\u5cbf\u7aa5\u8475\u594e\u9b41\u5080\u9988\u6127\u6e83\u9997\u532e\u5914\u9697\u63c6\u55b9\u559f\u609d\u6126\u9615\u9035\u668c\u777d\u8069\u8770\u7bd1\u81fe\u8dec","kun":"\u5764\u6606\u6346\u56f0\u6083\u9603\u7428\u951f\u918c\u9cb2\u9ae1","kuo":"\u62ec\u6269\u5ed3\u9614\u86de","la":"\u5783\u62c9\u5587\u8721\u814a\u8fa3\u5566\u524c\u647a\u908b\u65ef\u782c\u760c","lai":"\u83b1\u6765\u8d56\u5d03\u5f95\u6d9e\u6fd1\u8d49\u7750\u94fc\u765e\u7c41","lan":"\u84dd\u5a6a\u680f\u62e6\u7bee\u9611\u5170\u6f9c\u8c30\u63fd\u89c8\u61d2\u7f06\u70c2\u6ee5\u5549\u5c9a\u61d4\u6f24\u6984\u6593\u7f71\u9567\u8934","lang":"\u7405\u6994\u72fc\u5eca\u90ce\u6717\u6d6a\u83a8\u8497\u5577\u9606\u9512\u7a02\u8782","lao":"\u635e\u52b3\u7262\u8001\u4f6c\u59e5\u916a\u70d9\u6d9d\u5520\u5d02\u6833\u94d1\u94f9\u75e8\u91aa","le":"\u52d2\u4e50\u808b\u4ec2\u53fb\u561e\u6cd0\u9cd3","lei":"\u96f7\u956d\u857e\u78ca\u7d2f\u5121\u5792\u64c2\u7c7b\u6cea\u7fb8\u8bd4\u837d\u54a7\u6f2f\u5ad8\u7f27\u6a91\u8012\u9179","ling":"\u68f1\u51b7\u62ce\u73b2\u83f1\u96f6\u9f84\u94c3\u4f36\u7f9a\u51cc\u7075\u9675\u5cad\u9886\u53e6\u4ee4\u9143\u5844\u82d3\u5464\u56f9\u6ce0\u7eeb\u67c3\u68c2\u74f4\u8046\u86c9\u7fce\u9cae","leng":"\u695e\u6123","li":"\u5398\u68a8\u7281\u9ece\u7bf1\u72f8\u79bb\u6f13\u7406\u674e\u91cc\u9ca4\u793c\u8389\u8354\u540f\u6817\u4e3d\u5389\u52b1\u783e\u5386\u5229\u5088\u4f8b\u4fd0\u75e2\u7acb\u7c92\u6ca5\u96b6\u529b\u7483\u54e9\u4fea\u4fda\u90e6\u575c\u82c8\u8385\u84e0\u85dc\u6369\u5456\u5533\u55b1\u7301\u6ea7\u6fa7\u9026\u5a0c\u5ae0\u9a8a\u7f21\u73de\u67a5\u680e\u8f79\u623e\u783a\u8a48\u7f79\u9502\u9e42\u75a0\u75ac\u86ce\u870a\u8821\u7b20\u7be5\u7c9d\u91b4\u8dde\u96f3\u9ca1\u9ce2\u9ee7","lian":"\u4fe9\u8054\u83b2\u8fde\u9570\u5ec9\u601c\u6d9f\u5e18\u655b\u8138\u94fe\u604b\u70bc\u7ec3\u631b\u8539\u5941\u6f4b\u6fc2\u5a08\u740f\u695d\u6b93\u81c1\u81a6\u88e2\u880a\u9ca2","liang":"\u7cae\u51c9\u6881\u7cb1\u826f\u4e24\u8f86\u91cf\u667e\u4eae\u8c05\u589a\u690b\u8e09\u9753\u9b49","liao":"\u64a9\u804a\u50da\u7597\u71ce\u5be5\u8fbd\u6f66\u4e86\u6482\u9563\u5ed6\u6599\u84fc\u5c25\u5639\u7360\u5bee\u7f2d\u948c\u9e69\u8022","lie":"\u5217\u88c2\u70c8\u52a3\u730e\u51bd\u57d2\u6d0c\u8d94\u8e90\u9b23","lin":"\u7433\u6797\u78f7\u9716\u4e34\u90bb\u9cde\u6dcb\u51db\u8d41\u541d\u853a\u5d99\u5eea\u9074\u6aa9\u8f9a\u77b5\u7cbc\u8e8f\u9e9f","liu":"\u6e9c\u7409\u69b4\u786b\u998f\u7559\u5218\u7624\u6d41\u67f3\u516d\u62a1\u507b\u848c\u6cd6\u6d4f\u905b\u9a9d\u7efa\u65d2\u7198\u950d\u954f\u9e68\u938f","long":"\u9f99\u804b\u5499\u7b3c\u7abf\u9686\u5784\u62e2\u9647\u5f04\u5785\u830f\u6cf7\u73d1\u680a\u80e7\u783b\u7643","lou":"\u697c\u5a04\u6402\u7bd3\u6f0f\u964b\u55bd\u5d5d\u9542\u7618\u8027\u877c\u9ac5","lu":"\u82a6\u5362\u9885\u5e90\u7089\u63b3\u5364\u864f\u9c81\u9e93\u788c\u9732\u8def\u8d42\u9e7f\u6f5e\u7984\u5f55\u9646\u622e\u5786\u6445\u64b8\u565c\u6cf8\u6e0c\u6f09\u7490\u680c\u6a79\u8f73\u8f82\u8f98\u6c07\u80ea\u9565\u9e2c\u9e6d\u7c0f\u823b\u9c88","lv":"\u9a74\u5415\u94dd\u4fa3\u65c5\u5c65\u5c61\u7f15\u8651\u6c2f\u5f8b\u7387\u6ee4\u7eff\u634b\u95fe\u6988\u8182\u7a06\u891b","luan":"\u5ce6\u5b6a\u6ee6\u5375\u4e71\u683e\u9e3e\u92ae","lue":"\u63a0\u7565\u950a","lun":"\u8f6e\u4f26\u4ed1\u6ca6\u7eb6\u8bba\u56f5","luo":"\u841d\u87ba\u7f57\u903b\u9523\u7ba9\u9aa1\u88f8\u843d\u6d1b\u9a86\u7edc\u502e\u8366\u645e\u7321\u6cfa\u6924\u8136\u9559\u7630\u96d2","ma":"\u5988\u9ebb\u739b\u7801\u8682\u9a6c\u9a82\u561b\u5417\u551b\u72b8\u5b37\u6769\u9ebd","mai":"\u57cb\u4e70\u9ea6\u5356\u8fc8\u8109\u52a2\u836c\u54aa\u973e","man":"\u7792\u9992\u86ee\u6ee1\u8513\u66fc\u6162\u6f2b\u8c29\u5881\u5e54\u7f26\u71b3\u9558\u989f\u87a8\u9cd7\u9794","mang":"\u8292\u832b\u76f2\u5fd9\u83bd\u9099\u6f2d\u6726\u786d\u87d2","meng":"\u6c13\u840c\u8499\u6aac\u76df\u9530\u731b\u68a6\u5b5f\u52d0\u750d\u77a2\u61f5\u791e\u867b\u8722\u8813\u824b\u8268\u9efe","miao":"\u732b\u82d7\u63cf\u7784\u85d0\u79d2\u6e3a\u5e99\u5999\u55b5\u9088\u7f08\u7f2a\u676a\u6dfc\u7707\u9e4b\u8731","mao":"\u8305\u951a\u6bdb\u77db\u94c6\u536f\u8302\u5192\u5e3d\u8c8c\u8d38\u4f94\u88a4\u52d6\u8306\u5cc1\u7441\u6634\u7266\u8004\u65c4\u61cb\u7780\u86d1\u8765\u87ca\u9ae6","me":"\u4e48","mei":"\u73ab\u679a\u6885\u9176\u9709\u7164\u6ca1\u7709\u5a92\u9541\u6bcf\u7f8e\u6627\u5bd0\u59b9\u5a9a\u5776\u8393\u5d4b\u7338\u6d7c\u6e44\u6963\u9545\u9e5b\u8882\u9b45","men":"\u95e8\u95f7\u4eec\u626a\u739f\u7116\u61d1\u9494","mi":"\u772f\u919a\u9761\u7cdc\u8ff7\u8c1c\u5f25\u7c73\u79d8\u89c5\u6ccc\u871c\u5bc6\u5e42\u8288\u5196\u8c27\u863c\u5627\u7315\u736f\u6c68\u5b93\u5f2d\u8112\u6549\u7cf8\u7e3b\u9e8b","mian":"\u68c9\u7720\u7ef5\u5195\u514d\u52c9\u5a29\u7f05\u9762\u6c94\u6e4e\u817c\u7704","mie":"\u8511\u706d\u54a9\u881b\u7bfe","min":"\u6c11\u62bf\u76bf\u654f\u60af\u95fd\u82e0\u5cb7\u95f5\u6cef\u73c9","ming":"\u660e\u879f\u9e23\u94ed\u540d\u547d\u51a5\u8317\u6e9f\u669d\u7791\u9169","miu":"\u8c2c","mo":"\u6478\u6479\u8611\u6a21\u819c\u78e8\u6469\u9b54\u62b9\u672b\u83ab\u58a8\u9ed8\u6cab\u6f20\u5bde\u964c\u8c1f\u8309\u84e6\u998d\u5aeb\u9546\u79e3\u763c\u8031\u87c6\u8c8a\u8c98","mou":"\u8c0b\u725f\u67d0\u53b6\u54de\u5a7a\u7738\u936a","mu":"\u62c7\u7261\u4ea9\u59c6\u6bcd\u5893\u66ae\u5e55\u52df\u6155\u6728\u76ee\u7766\u7267\u7a46\u4eeb\u82dc\u5452\u6c90\u6bea\u94bc","na":"\u62ff\u54ea\u5450\u94a0\u90a3\u5a1c\u7eb3\u5185\u637a\u80ad\u954e\u8872\u7bac","nai":"\u6c16\u4e43\u5976\u8010\u5948\u9f10\u827f\u8418\u67f0","nan":"\u5357\u7537\u96be\u56ca\u5583\u56e1\u6960\u8169\u877b\u8d67","nao":"\u6320\u8111\u607c\u95f9\u5b6c\u57b4\u7331\u7459\u7847\u94d9\u86f2","ne":"\u6dd6\u5462\u8bb7","nei":"\u9981","nen":"\u5ae9\u80fd\u6798\u6041","ni":"\u59ae\u9713\u502a\u6ce5\u5c3c\u62df\u4f60\u533f\u817b\u9006\u6eba\u4f32\u576d\u730a\u6029\u6ee0\u6635\u65ce\u7962\u615d\u7768\u94cc\u9cb5","nian":"\u852b\u62c8\u5e74\u78be\u64b5\u637b\u5ff5\u5eff\u8f87\u9ecf\u9c87\u9cb6","niang":"\u5a18\u917f","niao":"\u9e1f\u5c3f\u8311\u5b32\u8132\u8885","nie":"\u634f\u8042\u5b7d\u556e\u954a\u954d\u6d85\u4e5c\u9667\u8616\u55eb\u8080\u989e\u81ec\u8e51","nin":"\u60a8\u67e0","ning":"\u72de\u51dd\u5b81\u62e7\u6cde\u4f5e\u84e5\u549b\u752f\u804d","niu":"\u725b\u626d\u94ae\u7ebd\u72c3\u5ff8\u599e\u86b4","nong":"\u8113\u6d53\u519c\u4fac","nu":"\u5974\u52aa\u6012\u5476\u5e11\u5f29\u80ec\u5b65\u9a7d","nv":"\u5973\u6067\u9495\u8844","nuan":"\u6696","nuenue":"\u8650","nue":"\u759f\u8c11","nuo":"\u632a\u61e6\u7cef\u8bfa\u50a9\u6426\u558f\u9518","ou":"\u54e6\u6b27\u9e25\u6bb4\u85d5\u5455\u5076\u6ca4\u6004\u74ef\u8026","pa":"\u556a\u8db4\u722c\u5e15\u6015\u7436\u8469\u7b62","pai":"\u62cd\u6392\u724c\u5f98\u6e43\u6d3e\u4ff3\u848e","pan":"\u6500\u6f58\u76d8\u78d0\u76fc\u7554\u5224\u53db\u723f\u6cee\u88a2\u897b\u87e0\u8e52","pang":"\u4e53\u5e9e\u65c1\u802a\u80d6\u6ec2\u9004","pao":"\u629b\u5486\u5228\u70ae\u888d\u8dd1\u6ce1\u530f\u72cd\u5e96\u812c\u75b1","pei":"\u5478\u80da\u57f9\u88f4\u8d54\u966a\u914d\u4f69\u6c9b\u638a\u8f94\u5e14\u6de0\u65c6\u952b\u9185\u9708","pen":"\u55b7\u76c6\u6e53","peng":"\u7830\u62a8\u70f9\u6f8e\u5f6d\u84ec\u68da\u787c\u7bf7\u81a8\u670b\u9e4f\u6367\u78b0\u576f\u580b\u562d\u6026\u87db","pi":"\u7812\u9739\u6279\u62ab\u5288\u7435\u6bd7\u5564\u813e\u75b2\u76ae\u5339\u75de\u50fb\u5c41\u8b6c\u4e15\u9674\u90b3\u90eb\u572e\u9f19\u64d7\u567c\u5e80\u5ab2\u7eb0\u6787\u7513\u7765\u7f74\u94cd\u75e6\u7656\u758b\u868d\u8c94","pian":"\u7bc7\u504f\u7247\u9a97\u8c1d\u9a88\u728f\u80fc\u890a\u7fe9\u8e41","piao":"\u98d8\u6f02\u74e2\u7968\u527d\u560c\u5ad6\u7f25\u6b8d\u779f\u87b5","pie":"\u6487\u77a5\u4e3f\u82e4\u6c15","pin":"\u62fc\u9891\u8d2b\u54c1\u8058\u62da\u59d8\u5ad4\u6980\u725d\u98a6","ping":"\u4e52\u576a\u82f9\u840d\u5e73\u51ed\u74f6\u8bc4\u5c4f\u4fdc\u5a09\u67b0\u9c86","po":"\u5761\u6cfc\u9887\u5a46\u7834\u9b44\u8feb\u7c95\u53f5\u9131\u6ea5\u73c0\u948b\u94b7\u76a4\u7b38","pou":"\u5256\u88d2\u8e23","pu":"\u6251\u94fa\u4ec6\u8386\u8461\u83e9\u84b2\u57d4\u6734\u5703\u666e\u6d66\u8c31\u66dd\u7011\u530d\u5657\u6fee\u749e\u6c06\u9564\u9568\u8e7c","qi":"\u671f\u6b3a\u6816\u621a\u59bb\u4e03\u51c4\u6f06\u67d2\u6c8f\u5176\u68cb\u5947\u6b67\u7566\u5d0e\u8110\u9f50\u65d7\u7948\u7941\u9a91\u8d77\u5c82\u4e5e\u4f01\u542f\u5951\u780c\u5668\u6c14\u8fc4\u5f03\u6c7d\u6ce3\u8bab\u4e9f\u4e93\u573b\u8291\u840b\u847a\u5601\u5c7a\u5c90\u6c54\u6dc7\u9a90\u7eee\u742a\u7426\u675e\u6864\u69ed\u6b39\u797a\u61a9\u789b\u86f4\u871e\u7da6\u7dae\u8dbf\u8e4a\u9ccd\u9e92","qia":"\u6390\u6070\u6d3d\u845c","qian":"\u7275\u6266\u948e\u94c5\u5343\u8fc1\u7b7e\u4edf\u8c26\u4e7e\u9ed4\u94b1\u94b3\u524d\u6f5c\u9063\u6d45\u8c34\u5811\u5d4c\u6b20\u6b49\u4f65\u9621\u828a\u82a1\u8368\u63ae\u5c8d\u60ad\u614a\u9a9e\u6434\u8930\u7f31\u6920\u80b7\u6106\u94a4\u8654\u7b9d","qiang":"\u67aa\u545b\u8154\u7f8c\u5899\u8537\u5f3a\u62a2\u5af1\u6a2f\u6217\u709d\u9516\u9535\u956a\u8941\u8723\u7f9f\u8deb\u8dc4","qiao":"\u6a47\u9539\u6572\u6084\u6865\u77a7\u4e54\u4fa8\u5de7\u9798\u64ac\u7fd8\u5ced\u4fcf\u7a8d\u5281\u8bee\u8c2f\u835e\u6100\u6194\u7f32\u6a35\u6bf3\u7857\u8df7\u9792","qie":"\u5207\u8304\u4e14\u602f\u7a83\u90c4\u553c\u60ec\u59be\u6308\u9532\u7ba7","qin":"\u94a6\u4fb5\u4eb2\u79e6\u7434\u52e4\u82b9\u64d2\u79bd\u5bdd\u6c81\u82a9\u84c1\u8572\u63ff\u5423\u55ea\u5659\u6eb1\u6a8e\u8793\u887e","qing":"\u9752\u8f7b\u6c22\u503e\u537f\u6e05\u64ce\u6674\u6c30\u60c5\u9877\u8bf7\u5e86\u5029\u82d8\u570a\u6aa0\u78ec\u873b\u7f44\u7b90\u8b26\u9cad\u9ee5","qiong":"\u743c\u7a77\u909b\u8315\u7a79\u7b47\u928e","qiu":"\u79cb\u4e18\u90b1\u7403\u6c42\u56da\u914b\u6cc5\u4fc5\u6c3d\u5def\u827d\u72b0\u6e6b\u9011\u9052\u6978\u8d47\u9e20\u866c\u86af\u8764\u88d8\u7cd7\u9cc5\u9f3d","qu":"\u8d8b\u533a\u86c6\u66f2\u8eaf\u5c48\u9a71\u6e20\u53d6\u5a36\u9f8b\u8da3\u53bb\u8bce\u52ac\u8556\u8627\u5c96\u8862\u9612\u74a9\u89d1\u6c0d\u795b\u78f2\u766f\u86d0\u883c\u9eb4\u77bf\u9ee2","quan":"\u5708\u98a7\u6743\u919b\u6cc9\u5168\u75ca\u62f3\u72ac\u5238\u529d\u8be0\u8343\u737e\u609b\u7efb\u8f81\u754e\u94e8\u8737\u7b4c\u9b08","que":"\u7f3a\u7094\u7638\u5374\u9e4a\u69b7\u786e\u96c0\u9619\u60ab","qun":"\u88d9\u7fa4\u9021","ran":"\u7136\u71c3\u5189\u67d3\u82d2\u9aef","rang":"\u74e4\u58e4\u6518\u56b7\u8ba9\u79b3\u7a70","rao":"\u9976\u6270\u7ed5\u835b\u5a06\u6861","ruo":"\u60f9\u82e5\u5f31","re":"\u70ed\u504c","ren":"\u58ec\u4ec1\u4eba\u5fcd\u97e7\u4efb\u8ba4\u5203\u598a\u7eab\u4ede\u834f\u845a\u996a\u8f6b\u7a14\u887d","reng":"\u6254\u4ecd","ri":"\u65e5","rong":"\u620e\u8338\u84c9\u8363\u878d\u7194\u6eb6\u5bb9\u7ed2\u5197\u5d58\u72e8\u7f1b\u6995\u877e","rou":"\u63c9\u67d4\u8089\u7cc5\u8e42\u97a3","ru":"\u8339\u8815\u5112\u5b7a\u5982\u8fb1\u4e73\u6c5d\u5165\u8925\u84d0\u85b7\u5685\u6d33\u6ebd\u6fe1\u94f7\u8966\u98a5","ruan":"\u8f6f\u962e\u670a","rui":"\u854a\u745e\u9510\u82ae\u8564\u777f\u868b","run":"\u95f0\u6da6","sa":"\u6492\u6d12\u8428\u5345\u4ee8\u6332\u98d2","sai":"\u816e\u9cc3\u585e\u8d5b\u567b","san":"\u4e09\u53c1\u4f1e\u6563\u5f61\u9993\u6c35\u6bf5\u7cc1\u9730","sang":"\u6851\u55d3\u4e27\u6421\u78c9\u98a1","sao":"\u6414\u9a9a\u626b\u5ac2\u57fd\u81ca\u7619\u9ccb","se":"\u745f\u8272\u6da9\u556c\u94e9\u94ef\u7a51","sen":"\u68ee","seng":"\u50e7","sha":"\u838e\u7802\u6740\u5239\u6c99\u7eb1\u50bb\u5565\u715e\u810e\u6b43\u75e7\u88df\u970e\u9ca8","shai":"\u7b5b\u6652\u917e","shan":"\u73ca\u82eb\u6749\u5c71\u5220\u717d\u886b\u95ea\u9655\u64c5\u8d61\u81b3\u5584\u6c55\u6247\u7f2e\u5261\u8baa\u912f\u57cf\u829f\u6f78\u59d7\u9a9f\u81bb\u9490\u759d\u87ee\u8222\u8dda\u9cdd","shang":"\u5892\u4f24\u5546\u8d4f\u664c\u4e0a\u5c1a\u88f3\u57a7\u7ef1\u6b87\u71b5\u89de","shao":"\u68a2\u634e\u7a0d\u70e7\u828d\u52fa\u97f6\u5c11\u54e8\u90b5\u7ecd\u52ad\u82d5\u6f72\u86f8\u7b24\u7b72\u8244","she":"\u5962\u8d4a\u86c7\u820c\u820d\u8d66\u6444\u5c04\u6151\u6d89\u793e\u8bbe\u538d\u4f58\u731e\u7572\u9e9d","shen":"\u7837\u7533\u547b\u4f38\u8eab\u6df1\u5a20\u7ec5\u795e\u6c88\u5ba1\u5a76\u751a\u80be\u614e\u6e17\u8bdc\u8c02\u5432\u54c2\u6e16\u6939\u77e7\u8703","sheng":"\u58f0\u751f\u7525\u7272\u5347\u7ef3\u7701\u76db\u5269\u80dc\u5723\u4e1e\u6e11\u5ab5\u771a\u7b19","shi":"\u5e08\u5931\u72ee\u65bd\u6e7f\u8bd7\u5c38\u8671\u5341\u77f3\u62fe\u65f6\u4ec0\u98df\u8680\u5b9e\u8bc6\u53f2\u77e2\u4f7f\u5c4e\u9a76\u59cb\u5f0f\u793a\u58eb\u4e16\u67ff\u4e8b\u62ed\u8a93\u901d\u52bf\u662f\u55dc\u566c\u9002\u4ed5\u4f8d\u91ca\u9970\u6c0f\u5e02\u6043\u5ba4\u89c6\u8bd5\u8c25\u57d8\u83b3\u84cd\u5f11\u5511\u9963\u8f7c\u8006\u8d33\u70bb\u793b\u94c8\u94ca\u87ab\u8210\u7b6e\u8c55\u9ca5\u9cba","shou":"\u6536\u624b\u9996\u5b88\u5bff\u6388\u552e\u53d7\u7626\u517d\u624c\u72e9\u7ef6\u824f","shu":"\u852c\u67a2\u68b3\u6b8a\u6292\u8f93\u53d4\u8212\u6dd1\u758f\u4e66\u8d4e\u5b70\u719f\u85af\u6691\u66d9\u7f72\u8700\u9ecd\u9f20\u5c5e\u672f\u8ff0\u6811\u675f\u620d\u7ad6\u5885\u5eb6\u6570\u6f31\u6055\u500f\u587e\u83fd\u5fc4\u6cad\u6d91\u6f8d\u59dd\u7ebe\u6bf9\u8167\u6bb3\u956f\u79eb\u9e6c","shua":"\u5237\u800d\u5530\u6dae","shuai":"\u6454\u8870\u7529\u5e05\u87c0","shuan":"\u6813\u62f4\u95e9","shuang":"\u971c\u53cc\u723d\u5b40","shui":"\u8c01\u6c34\u7761\u7a0e","shun":"\u542e\u77ac\u987a\u821c\u6042","shuo":"\u8bf4\u7855\u6714\u70c1\u84b4\u6420\u55cd\u6fef\u5981\u69ca\u94c4","si":"\u65af\u6495\u5636\u601d\u79c1\u53f8\u4e1d\u6b7b\u8086\u5bfa\u55e3\u56db\u4f3a\u4f3c\u9972\u5df3\u53ae\u4fdf\u5155\u83e5\u549d\u6c5c\u6cd7\u6f8c\u59d2\u9a77\u7f0c\u7940\u7960\u9536\u9e36\u801c\u86f3\u7b25","song":"\u677e\u8038\u6002\u9882\u9001\u5b8b\u8bbc\u8bf5\u51c7\u83d8\u5d27\u5d69\u5fea\u609a\u6dde\u7ae6","sou":"\u641c\u8258\u64de\u55fd\u53df\u55d6\u55fe\u998a\u6eb2\u98d5\u778d\u953c\u878b","su":"\u82cf\u9165\u4fd7\u7d20\u901f\u7c9f\u50f3\u5851\u6eaf\u5bbf\u8bc9\u8083\u5919\u8c21\u850c\u55c9\u612b\u7c0c\u89eb\u7a23","suan":"\u9178\u849c\u7b97","sui":"\u867d\u968b\u968f\u7ee5\u9ad3\u788e\u5c81\u7a57\u9042\u96a7\u795f\u84d1\u51ab\u8c07\u6fc9\u9083\u71e7\u772d\u7762","sun":"\u5b59\u635f\u7b0b\u836a\u72f2\u98e7\u69ab\u8de3\u96bc","suo":"\u68ad\u5506\u7f29\u7410\u7d22\u9501\u6240\u5522\u55e6\u5a11\u686b\u7743\u7fa7","ta":"\u584c\u4ed6\u5b83\u5979\u5854\u736d\u631e\u8e4b\u8e0f\u95fc\u6ebb\u9062\u69bb\u6c93","tai":"\u80ce\u82d4\u62ac\u53f0\u6cf0\u915e\u592a\u6001\u6c70\u90b0\u85b9\u80bd\u70b1\u949b\u8dc6\u9c90","tan":"\u574d\u644a\u8d2a\u762b\u6ee9\u575b\u6a80\u75f0\u6f6d\u8c2d\u8c08\u5766\u6bef\u8892\u78b3\u63a2\u53f9\u70ad\u90ef\u8548\u6619\u94bd\u952c\u8983","tang":"\u6c64\u5858\u642a\u5802\u68e0\u819b\u5510\u7cd6\u50a5\u9967\u6e8f\u746d\u94f4\u9557\u8025\u8797\u87b3\u7fb0\u91a3","thang":"\u5018\u8eba\u6dcc","theng":"\u8d9f\u70eb","tao":"\u638f\u6d9b\u6ed4\u7ee6\u8404\u6843\u9003\u6dd8\u9676\u8ba8\u5957\u6311\u9f17\u5555\u97ec\u9955","te":"\u7279","teng":"\u85e4\u817e\u75bc\u8a8a\u6ed5","ti":"\u68af\u5254\u8e22\u9511\u63d0\u9898\u8e44\u557c\u4f53\u66ff\u568f\u60d5\u6d95\u5243\u5c49\u8351\u608c\u9016\u7ee8\u7f07\u9e48\u88fc\u918d","tian":"\u5929\u6dfb\u586b\u7530\u751c\u606c\u8214\u8146\u63ad\u5fdd\u9617\u6b84\u754b\u94bf\u86ba","tiao":"\u6761\u8fe2\u773a\u8df3\u4f7b\u7967\u94eb\u7a95\u9f86\u9ca6","tie":"\u8d34\u94c1\u5e16\u841c\u992e","ting":"\u5385\u542c\u70c3\u6c40\u5ef7\u505c\u4ead\u5ead\u633a\u8247\u839b\u8476\u5a77\u6883\u8713\u9706","tong":"\u901a\u6850\u916e\u77b3\u540c\u94dc\u5f64\u7ae5\u6876\u6345\u7b52\u7edf\u75db\u4f5f\u50ee\u4edd\u833c\u55f5\u6078\u6f7c\u783c","tou":"\u5077\u6295\u5934\u900f\u4ea0","tu":"\u51f8\u79c3\u7a81\u56fe\u5f92\u9014\u6d82\u5c60\u571f\u5410\u5154\u580d\u837c\u83df\u948d\u9174","tuan":"\u6e4d\u56e2\u7583","tui":"\u63a8\u9893\u817f\u8715\u892a\u9000\u5fd2\u717a","tun":"\u541e\u5c6f\u81c0\u9968\u66be\u8c5a\u7a80","tuo":"\u62d6\u6258\u8131\u9e35\u9640\u9a6e\u9a7c\u692d\u59a5\u62d3\u553e\u4e47\u4f57\u5768\u5eb9\u6cb1\u67dd\u7823\u7ba8\u8204\u8dce\u9f0d","wa":"\u6316\u54c7\u86d9\u6d3c\u5a03\u74e6\u889c\u4f64\u5a32\u817d","wai":"\u6b6a\u5916","wan":"\u8c4c\u5f2f\u6e7e\u73a9\u987d\u4e38\u70f7\u5b8c\u7897\u633d\u665a\u7696\u60cb\u5b9b\u5a49\u4e07\u8155\u525c\u8284\u82cb\u83c0\u7ea8\u7efe\u742c\u8118\u7579\u873f\u7ba2","wang":"\u6c6a\u738b\u4ea1\u6789\u7f51\u5f80\u65fa\u671b\u5fd8\u5984\u7f54\u5c22\u60d8\u8f8b\u9b4d","wei":"\u5a01\u5dcd\u5fae\u5371\u97e6\u8fdd\u6845\u56f4\u552f\u60df\u4e3a\u6f4d\u7ef4\u82c7\u840e\u59d4\u4f1f\u4f2a\u5c3e\u7eac\u672a\u851a\u5473\u754f\u80c3\u5582\u9b4f\u4f4d\u6e2d\u8c13\u5c09\u6170\u536b\u502d\u504e\u8bff\u9688\u8473\u8587\u5e0f\u5e37\u5d34\u5d6c\u7325\u732c\u95f1\u6ca9\u6d27\u6da0\u9036\u5a13\u73ae\u97ea\u8ece\u709c\u7168\u71a8\u75ff\u8249\u9c94","wen":"\u761f\u6e29\u868a\u6587\u95fb\u7eb9\u543b\u7a33\u7d0a\u95ee\u520e\u6120\u960c\u6c76\u74ba\u97eb\u6b81\u96ef","weng":"\u55e1\u7fc1\u74ee\u84ca\u8579","wo":"\u631d\u8717\u6da1\u7a9d\u6211\u65a1\u5367\u63e1\u6c83\u83b4\u5e44\u6e25\u674c\u809f\u9f8c","wu":"\u5deb\u545c\u94a8\u4e4c\u6c61\u8bec\u5c4b\u65e0\u829c\u68a7\u543e\u5434\u6bcb\u6b66\u4e94\u6342\u5348\u821e\u4f0d\u4fae\u575e\u620a\u96fe\u6664\u7269\u52ff\u52a1\u609f\u8bef\u5140\u4ef5\u9622\u90ac\u572c\u82b4\u5e91\u6003\u5fe4\u6d6f\u5be4\u8fd5\u59a9\u9a9b\u727e\u7110\u9e49\u9e5c\u8708\u92c8\u9f2f","xi":"\u6614\u7199\u6790\u897f\u7852\u77fd\u6670\u563b\u5438\u9521\u727a\u7a00\u606f\u5e0c\u6089\u819d\u5915\u60dc\u7184\u70ef\u6eaa\u6c50\u7280\u6a84\u88ad\u5e2d\u4e60\u5ab3\u559c\u94e3\u6d17\u7cfb\u9699\u620f\u7ec6\u50d6\u516e\u96b0\u90d7\u831c\u8478\u84f0\u595a\u550f\u5f99\u9969\u960b\u6d60\u6dc5\u5c63\u5b09\u73ba\u6a28\u66e6\u89cb\u6b37\u71b9\u798a\u79a7\u94b8\u7699\u7a78\u8725\u87cb\u823e\u7fb2\u7c9e\u7fd5\u91af\u9f37","xia":"\u778e\u867e\u5323\u971e\u8f96\u6687\u5ce1\u4fa0\u72ed\u4e0b\u53a6\u590f\u5413\u6380\u846d\u55c4\u72ce\u9050\u7455\u7856\u7615\u7f45\u9ee0","xian":"\u9528\u5148\u4ed9\u9c9c\u7ea4\u54b8\u8d24\u8854\u8237\u95f2\u6d8e\u5f26\u5acc\u663e\u9669\u73b0\u732e\u53bf\u817a\u9985\u7fa1\u5baa\u9677\u9650\u7ebf\u51bc\u85d3\u5c98\u7303\u66b9\u5a34\u6c19\u7946\u9e47\u75eb\u86ac\u7b45\u7c7c\u9170\u8df9","xiang":"\u76f8\u53a2\u9576\u9999\u7bb1\u8944\u6e58\u4e61\u7fd4\u7965\u8be6\u60f3\u54cd\u4eab\u9879\u5df7\u6a61\u50cf\u5411\u8c61\u8297\u8459\u9977\u5ea0\u9aa7\u7f03\u87d3\u9c9e\u98e8","xiao":"\u8427\u785d\u9704\u524a\u54ee\u56a3\u9500\u6d88\u5bb5\u6dc6\u6653\u5c0f\u5b5d\u6821\u8096\u5578\u7b11\u6548\u54d3\u54bb\u5d24\u6f47\u900d\u9a81\u7ee1\u67ad\u67b5\u7b71\u7bab\u9b48","xie":"\u6954\u4e9b\u6b47\u874e\u978b\u534f\u631f\u643a\u90aa\u659c\u80c1\u8c10\u5199\u68b0\u5378\u87f9\u61c8\u6cc4\u6cfb\u8c22\u5c51\u5055\u4eb5\u52f0\u71ee\u85a4\u64b7\u5ee8\u7023\u9082\u7ec1\u7f2c\u69ad\u698d\u6b59\u8e9e","xin":"\u85aa\u82af\u950c\u6b23\u8f9b\u65b0\u5ffb\u5fc3\u4fe1\u8845\u56df\u99a8\u8398\u6b46\u94fd\u946b","xing":"\u661f\u8165\u7329\u60fa\u5174\u5211\u578b\u5f62\u90a2\u884c\u9192\u5e78\u674f\u6027\u59d3\u9649\u8347\u8365\u64e4\u60bb\u784e","xiong":"\u5144\u51f6\u80f8\u5308\u6c79\u96c4\u718a\u828e","xiu":"\u4f11\u4fee\u7f9e\u673d\u55c5\u9508\u79c0\u8896\u7ee3\u83a0\u5cab\u9990\u5ea5\u9e3a\u8c85\u9af9","xu":"\u589f\u620c\u9700\u865a\u5618\u987b\u5f90\u8bb8\u84c4\u9157\u53d9\u65ed\u5e8f\u755c\u6064\u7d6e\u5a7f\u7eea\u7eed\u8bb4\u8be9\u5729\u84ff\u6035\u6d2b\u6e86\u987c\u6829\u7166\u7809\u76f1\u80e5\u7cc8\u9191","xuan":"\u8f69\u55a7\u5ba3\u60ac\u65cb\u7384\u9009\u7663\u7729\u7eda\u5107\u8c16\u8431\u63ce\u9994\u6ceb\u6d35\u6e32\u6f29\u7487\u6966\u6684\u70ab\u714a\u78b9\u94c9\u955f\u75c3","xue":"\u9774\u859b\u5b66\u7a74\u96ea\u8840\u5671\u6cf6\u9cd5","xun":"\u52cb\u718f\u5faa\u65ec\u8be2\u5bfb\u9a6f\u5de1\u6b89\u6c5b\u8bad\u8baf\u900a\u8fc5\u5dfd\u57d9\u8340\u85b0\u5ccb\u5f87\u6d54\u66db\u7aa8\u91ba\u9c9f","ya":"\u538b\u62bc\u9e26\u9e2d\u5440\u4e2b\u82bd\u7259\u869c\u5d16\u8859\u6daf\u96c5\u54d1\u4e9a\u8bb6\u4f22\u63e0\u5416\u5c88\u8fd3\u5a05\u740a\u6860\u6c29\u7811\u775a\u75d6","yan":"\u7109\u54bd\u9609\u70df\u6df9\u76d0\u4e25\u7814\u8712\u5ca9\u5ef6\u8a00\u989c\u960e\u708e\u6cbf\u5944\u63a9\u773c\u884d\u6f14\u8273\u5830\u71d5\u538c\u781a\u96c1\u5501\u5f66\u7130\u5bb4\u8c1a\u9a8c\u53a3\u9765\u8d5d\u4fe8\u5043\u5156\u8ba0\u8c33\u90fe\u9122\u82ab\u83f8\u5d26\u6079\u95eb\u960f\u6d07\u6e6e\u6edf\u598d\u5ae3\u7430\u664f\u80ed\u814c\u7131\u7f68\u7b75\u917d\u9b47\u990d\u9f39","yang":"\u6b83\u592e\u9e2f\u79e7\u6768\u626c\u4f6f\u75a1\u7f8a\u6d0b\u9633\u6c27\u4ef0\u75d2\u517b\u6837\u6f3e\u5f89\u600f\u6cf1\u7080\u70ca\u6059\u86d8\u9785","yao":"\u9080\u8170\u5996\u7476\u6447\u5c27\u9065\u7a91\u8c23\u59da\u54ac\u8200\u836f\u8981\u8000\u592d\u723b\u5406\u5d3e\u5fad\u7039\u5e7a\u73e7\u6773\u66dc\u80b4\u9e5e\u7a88\u7e47\u9cd0","ye":"\u6930\u564e\u8036\u7237\u91ce\u51b6\u4e5f\u9875\u6396\u4e1a\u53f6\u66f3\u814b\u591c\u6db2\u8c12\u90ba\u63f6\u9980\u6654\u70e8\u94d8","yi":"\u4e00\u58f9\u533b\u63d6\u94f1\u4f9d\u4f0a\u8863\u9890\u5937\u9057\u79fb\u4eea\u80f0\u7591\u6c82\u5b9c\u59e8\u5f5d\u6905\u8681\u501a\u5df2\u4e59\u77e3\u4ee5\u827a\u6291\u6613\u9091\u5c79\u4ebf\u5f79\u81c6\u9038\u8084\u75ab\u4ea6\u88d4\u610f\u6bc5\u5fc6\u4e49\u76ca\u6ea2\u8be3\u8bae\u8c0a\u8bd1\u5f02\u7ffc\u7fcc\u7ece\u5208\u5293\u4f7e\u8bd2\u572a\u572f\u57f8\u61ff\u82e1\u858f\u5f08\u5955\u6339\u5f0b\u5453\u54a6\u54bf\u566b\u5cc4\u5db7\u7317\u9974\u603f\u6021\u6092\u6f2a\u8fe4\u9a7f\u7f22\u6baa\u8d3b\u65d6\u71a0\u9487\u9552\u9571\u75cd\u7617\u7654\u7fca\u8864\u8734\u8223\u7fbf\u7ff3\u914f\u9edf","yin":"\u8335\u836b\u56e0\u6bb7\u97f3\u9634\u59fb\u541f\u94f6\u6deb\u5bc5\u996e\u5c39\u5f15\u9690\u5370\u80e4\u911e\u5819\u831a\u5591\u72fa\u5924\u6c24\u94df\u763e\u8693\u972a\u9f88","ying":"\u82f1\u6a31\u5a74\u9e70\u5e94\u7f28\u83b9\u8424\u8425\u8367\u8747\u8fce\u8d62\u76c8\u5f71\u9896\u786c\u6620\u5b34\u90e2\u8314\u83ba\u8426\u6484\u5624\u81ba\u6ee2\u6f46\u701b\u745b\u748e\u6979\u9e66\u763f\u988d\u7f42","yo":"\u54df\u5537","yong":"\u62e5\u4f63\u81c3\u75c8\u5eb8\u96cd\u8e0a\u86f9\u548f\u6cf3\u6d8c\u6c38\u607f\u52c7\u7528\u4fd1\u58c5\u5889\u6175\u9095\u955b\u752c\u9cd9\u9954","you":"\u5e7d\u4f18\u60a0\u5fe7\u5c24\u7531\u90ae\u94c0\u72b9\u6cb9\u6e38\u9149\u6709\u53cb\u53f3\u4f51\u91c9\u8bf1\u53c8\u5e7c\u5363\u6538\u4f91\u83b8\u5466\u56ff\u5ba5\u67da\u7337\u7256\u94d5\u75a3\u8763\u9c7f\u9edd\u9f2c","yu":"\u8fc2\u6de4\u4e8e\u76c2\u6986\u865e\u611a\u8206\u4f59\u4fde\u903e\u9c7c\u6109\u6e1d\u6e14\u9685\u4e88\u5a31\u96e8\u4e0e\u5c7f\u79b9\u5b87\u8bed\u7fbd\u7389\u57df\u828b\u90c1\u5401\u9047\u55bb\u5cea\u5fa1\u6108\u6b32\u72f1\u80b2\u8a89\u6d74\u5bd3\u88d5\u9884\u8c6b\u9a6d\u79ba\u6bd3\u4f1b\u4fe3\u8c00\u8c15\u8438\u84e3\u63c4\u5581\u5704\u5709\u5d5b\u72f3\u996b\u5ebe\u9608\u59aa\u59a4\u7ea1\u745c\u6631\u89ce\u8174\u6b24\u65bc\u715c\u71e0\u807f\u94b0\u9e46\u7610\u7600\u7ab3\u8753\u7afd\u8201\u96e9\u9f89","yuan":"\u9e33\u6e0a\u51a4\u5143\u57a3\u8881\u539f\u63f4\u8f95\u56ed\u5458\u5706\u733f\u6e90\u7f18\u8fdc\u82d1\u613f\u6028\u9662\u586c\u6c85\u5a9b\u7457\u6a7c\u7230\u7722\u9e22\u8788\u9f0b","yue":"\u66f0\u7ea6\u8d8a\u8dc3\u94a5\u5cb3\u7ca4\u6708\u60a6\u9605\u9fa0\u6a3e\u5216\u94ba","yun":"\u8018\u4e91\u90e7\u5300\u9668\u5141\u8fd0\u8574\u915d\u6655\u97f5\u5b55\u90d3\u82b8\u72c1\u607d\u7ead\u6b92\u6600\u6c32","za":"\u531d\u7838\u6742\u62f6\u5482","zai":"\u683d\u54c9\u707e\u5bb0\u8f7d\u518d\u5728\u54b1\u5d3d\u753e","zan":"\u6512\u6682\u8d5e\u74d2\u661d\u7c2a\u7ccc\u8db1\u933e","zang":"\u8d43\u810f\u846c\u5958\u6215\u81e7","zao":"\u906d\u7cdf\u51ff\u85fb\u67a3\u65e9\u6fa1\u86a4\u8e81\u566a\u9020\u7682\u7076\u71e5\u5523\u7f2b","ze":"\u8d23\u62e9\u5219\u6cfd\u4ec4\u8d5c\u5567\u8fee\u6603\u7b2e\u7ba6\u8234","zei":"\u8d3c","zen":"\u600e\u8c2e","zeng":"\u589e\u618e\u66fe\u8d60\u7f2f\u7511\u7f7e\u9503","zha":"\u624e\u55b3\u6e23\u672d\u8f67\u94e1\u95f8\u7728\u6805\u69a8\u548b\u4e4d\u70b8\u8bc8\u63f8\u5412\u54a4\u54f3\u600d\u781f\u75c4\u86b1\u9f44","zhai":"\u6458\u658b\u5b85\u7a84\u503a\u5be8\u7826","zhan":"\u77bb\u6be1\u8a79\u7c98\u6cbe\u76cf\u65a9\u8f97\u5d2d\u5c55\u8638\u6808\u5360\u6218\u7ad9\u6e5b\u7efd\u8c35\u640c\u65c3","zhang":"\u6a1f\u7ae0\u5f70\u6f33\u5f20\u638c\u6da8\u6756\u4e08\u5e10\u8d26\u4ed7\u80c0\u7634\u969c\u4ec9\u9123\u5e5b\u5d82\u7350\u5adc\u748b\u87d1","zhao":"\u62db\u662d\u627e\u6cbc\u8d75\u7167\u7f69\u5146\u8087\u53ec\u722a\u8bcf\u68f9\u948a\u7b0a","zhe":"\u906e\u6298\u54f2\u86f0\u8f99\u8005\u9517\u8517\u8fd9\u6d59\u8c2a\u966c\u67d8\u8f84\u78d4\u9e67\u891a\u8707\u8d6d","zhen":"\u73cd\u659f\u771f\u7504\u7827\u81fb\u8d1e\u9488\u4fa6\u6795\u75b9\u8bca\u9707\u632f\u9547\u9635\u7f1c\u6862\u699b\u8f78\u8d48\u80d7\u6715\u796f\u755b\u9e29","zheng":"\u84b8\u6323\u7741\u5f81\u72f0\u4e89\u6014\u6574\u62ef\u6b63\u653f\u5e27\u75c7\u90d1\u8bc1\u8be4\u5ce5\u94b2\u94ee\u7b5d","zhi":"\u829d\u679d\u652f\u5431\u8718\u77e5\u80a2\u8102\u6c41\u4e4b\u7ec7\u804c\u76f4\u690d\u6b96\u6267\u503c\u4f84\u5740\u6307\u6b62\u8dbe\u53ea\u65e8\u7eb8\u5fd7\u631a\u63b7\u81f3\u81f4\u7f6e\u5e1c\u5cd9\u5236\u667a\u79e9\u7a1a\u8d28\u7099\u75d4\u6ede\u6cbb\u7a92\u536e\u965f\u90c5\u57f4\u82b7\u646d\u5e19\u5fee\u5f58\u54ab\u9a98\u6809\u67b3\u6800\u684e\u8f75\u8f7e\u6534\u8d3d\u81a3\u7949\u7957\u9ef9\u96c9\u9e37\u75e3\u86ed\u7d77\u916f\u8dd6\u8e2c\u8e2f\u8c78\u89ef","zhong":"\u4e2d\u76c5\u5fe0\u949f\u8877\u7ec8\u79cd\u80bf\u91cd\u4ef2\u4f17\u51a2\u953a\u87bd\u8202\u822f\u8e35","zhou":"\u821f\u5468\u5dde\u6d32\u8bcc\u7ca5\u8f74\u8098\u5e1a\u5492\u76b1\u5b99\u663c\u9aa4\u5544\u7740\u501c\u8bf9\u836e\u9b3b\u7ea3\u80c4\u78a1\u7c40\u8233\u914e\u9cb7","zhu":"\u73e0\u682a\u86db\u6731\u732a\u8bf8\u8bdb\u9010\u7af9\u70db\u716e\u62c4\u77a9\u5631\u4e3b\u8457\u67f1\u52a9\u86c0\u8d2e\u94f8\u7b51\u4f4f\u6ce8\u795d\u9a7b\u4f2b\u4f8f\u90be\u82ce\u8331\u6d19\u6e1a\u6f74\u9a7a\u677c\u69e0\u6a65\u70b7\u94e2\u75b0\u7603\u86b0\u7afa\u7bb8\u7fe5\u8e85\u9e88","zhua":"\u6293","zhuai":"\u62fd","zhuan":"\u4e13\u7816\u8f6c\u64b0\u8d5a\u7bc6\u629f\u556d\u989b","zhuang":"\u6869\u5e84\u88c5\u5986\u649e\u58ee\u72b6\u4e2c","zhui":"\u690e\u9525\u8ffd\u8d58\u5760\u7f00\u8411\u9a93\u7f12","zhun":"\u8c06\u51c6","zhuo":"\u6349\u62d9\u5353\u684c\u7422\u8301\u914c\u707c\u6d4a\u502c\u8bfc\u5ef4\u855e\u64e2\u555c\u6d5e\u6dbf\u6753\u712f\u799a\u65ab","zi":"\u5179\u54a8\u8d44\u59ff\u6ecb\u6dc4\u5b5c\u7d2b\u4ed4\u7c7d\u6ed3\u5b50\u81ea\u6e0d\u5b57\u8c18\u5d6b\u59ca\u5b73\u7f01\u6893\u8f8e\u8d40\u6063\u7726\u9531\u79ed\u8014\u7b2b\u7ca2\u89dc\u8a3e\u9cbb\u9aed","zong":"\u9b03\u68d5\u8e2a\u5b97\u7efc\u603b\u7eb5\u8159\u7cbd","zou":"\u90b9\u8d70\u594f\u63cd\u9139\u9cb0","zu":"\u79df\u8db3\u5352\u65cf\u7956\u8bc5\u963b\u7ec4\u4fce\u83f9\u5550\u5f82\u9a75\u8e74","zuan":"\u94bb\u7e82\u6525\u7f35","zui":"\u5634\u9189\u6700\u7f6a","zun":"\u5c0a\u9075\u6499\u6a3d\u9cdf","zuo":"\u6628\u5de6\u4f50\u67de\u505a\u4f5c\u5750\u5ea7\u961d\u963c\u80d9\u795a\u9162","cou":"\u85ae\u6971\u8f8f\u8160","nang":"\u652e\u54dd\u56d4\u9995\u66e9","o":"\u5594","dia":"\u55f2","chuai":"\u562c\u81aa\u8e39","cen":"\u5c91\u6d94","diu":"\u94e5","nou":"\u8028","fou":"\u7f36","bia":"\u9adf"};
	function eachCH(ch){
        for (var c in chars){
            if (chars[c].indexOf(ch)!=-1) {
                return c;
            }
        }
    };
	var PinyinHelper={
		toPinyin:function(chs) {
		    var result,pinyin = chs;
	        var chExpr=/[\u4E00-\u9FA5]/gm;
	        while((result = chExpr.exec(chs)) != null)  {
	            var ch=result[0];
	            var c=eachCH(ch);
	            pinyin=pinyin.replace(result[0],c);
	        }
	        return pinyin;
		},
		toCapitalize:function(word){
		    if (word.length>0) {
		        var wordFirst = word.substr(0,1).toUpperCase();
		        var wordSurplus = word.substr(1,word.length);
		        return wordFirst + wordSurplus;
		    }
		}
	}
	String.prototype.toPinyin=function(){
		return PinyinHelper.toPinyin(this);
	}
	String.prototype.toCapitalize=function(){
		return PinyinHelper.toCapitalize(this);
	}
})(window,document,undefined);

(function(window,document,undefined){
	
	var colors={
		"a":"#52c7fe",
		"b":"#52c7fe",
		"c":"#52c7fe",
		"d":"#52c7fe",
		"e":"#52c7fe",
		"f":"#ffaf01",
		"g":"#ffaf01",
		"h":"#ffaf01",
		"i":"#ffaf01",
		"j":"#ffaf01",
		"k":"#3ae3eb",
		"l":"#3ae3eb",
		"m":"#3ae3eb",
		"n":"#3ae3eb",
		"o":"#3ae3eb",
		"p":"#ff6e36",
		"q":"#ff6e36",
		"r":"#ff6e36",
		"s":"#ff6e36",
		"t":"#ff6e36",
		"u":"#cf7af3",
		"v":"#cf7af3",
		"w":"#cf7af3",
		"x":"#cf7af3",
		"y":"#cf7af3",
		"z":"#4cd32e"
	};
	String.prototype.toColor=function(){
		if(this.length>1 || !/^[A-Za-z]+$/.test(this))return;
		return colors[this.toLowerCase()];
	}
})(window,document,undefined);

/*!
 * 对话框
 * @version 1.0.0
 * @author WangMingzhu
 * @requie jquery.js
 */

/**
*  对话框
* 
*  @class Confirm
*/
(function(window,document,undefined){
	
	window.Alert=function(msg,params){
		/*================
		Model
		================*/
		var defaults={
			"title":"提示",
			"buttonOk":"确定"
			/*
            Callbacks:
			onClickOk:function(alert)
			onClickCancel:function(alert)
			*/
		}
		params=params||{};
		for(var def in defaults){
			if(params[def]==undefined){
				params[def]=defaults[def];
			}
		}
		var s=this;
		s.params=params;
		//开关动画
		s.hideAnimate={"opacity":"0"};
		s.showAnimate={"opacity":"1"};
		/*================
		Method
		================*/
		s.createMask=function(){
			if(s.mask)return;
			s.mask=document.createElement("div");
			s.mask.setAttribute("class","popup-mask");
			document.body.appendChild(s.mask);
		};
		s.createContainer=function(){
			if(s.container)return;
			s.container=document.createElement("div");
			s.container.setAttribute("class","popup confirm");
			var title=document.createElement("h1");
			title.innerHTML=s.params.title;
			s.content=document.createElement("label");
			s.content.innerHTML=msg;
			var handler=document.createElement("div");
			handler.setAttribute("class","popup-handler");

			s.buttonOk=document.createElement("a");
			s.buttonOk.innerHTML=s.params.buttonOk;

			handler.appendChild(s.buttonOk);
			
			s.container.appendChild(title);
			s.container.appendChild(s.content);
			s.container.appendChild(handler);

			document.body.appendChild(s.container);

			//ok按钮绑定点击事件
			s.buttonOk.addEventListener("click",s.onClickOk,false);
		}
		/*================
		Controller
		================*/
		s.setText=function(msg){
			s.content.innerHTML=msg;
		};
		s.hide=function(){
			$(s.mask).animate({opacity:0},"fast","linear",function(){
				$(this).css("display","none");
			});
			$(s.container).animate(s.hideAnimate,"fast","linear",function(){
				$(this).css("display","none");
			});
		};
		s.show=function(){
			if(s){
				//$(s.mask).css("display","block").animate({opacity:1},"fast","linear");
				$(s.mask).css({display:"block",opacity:"1"});
				$(s.container).css("display","block").animate(s.showAnimate,"fast","linear");
			}
		};
		s.destory=function(){
			$(s.mask).animate({opacity:0},"fast","linear",function(){
				$(this).remove();
			});
			$(s.container).animate(s.hideAnimate,"fast","linear",function(){
				$(this).remove();
			});
			s=null;
		};
		/*================
		Event
		================*/
		s.onClickOk=function(){
			if(s.params.onClickOk){
				s.params.onClickOk(s);
				return;
			}
			s.hide();
		};
		/*================
		Init
		================*/
		s.init=function(){
			s.createMask();
			s.createContainer();
		}
		s.init();
	}
})(window,document,undefined);

/*!
 * 对话框
 * @version 1.0.0
 * @author WangMingzhu
 * @requie jquery.js
 */

/**
*  弹出是否框
* 
*  @class Confirm
*/
(function(window,document,undefined){
	
	window.Confirm=function(msg,params){
		/*================
		Model
		================*/
		var defaults={
			"title":"提示",
			"buttonOk":"确定",
			"buttonCancel":"取消",
			/*
            Callbacks:
			onClickOk:function(alert)
			onClickCancel:function(alert)
			*/
		}
		params=params||{};
		for(var def in defaults){
			if(params[def]==undefined){
				params[def]=defaults[def];
			}
		}
		var s=this;
		s.params=params;
		//开关动画
		s.hideAnimate={"opacity":"0"};
		s.showAnimate={"opacity":"1"};

		/*================
		Method
		================*/
		s.createMask=function(){
			if(!s.mask)s.mask=document.createElement("div");
			s.mask.setAttribute("class","popup-mask");
			document.body.appendChild(s.mask);
		};
		s.createContainer=function(){
			if(!s.container)s.container=document.createElement("div");
			s.container.setAttribute("class","popup confirm");
			var title=document.createElement("h1");
			title.innerHTML=s.params.title;
			s.content=document.createElement("label");
			s.content.innerHTML=msg;
			var handler=document.createElement("div");
			handler.setAttribute("class","popup-handler");

			s.buttonCancel=document.createElement("a");
			s.buttonCancel.innerHTML=s.params.buttonCancel;

			s.buttonOk=document.createElement("a");
			s.buttonOk.innerHTML=s.params.buttonOk;

			handler.appendChild(s.buttonCancel);
			handler.appendChild(s.buttonOk);
			
			s.container.appendChild(title);
			s.container.appendChild(s.content);
			s.container.appendChild(handler);

			document.body.appendChild(s.container);

			//ok按钮绑定点击事件
			s.buttonOk.addEventListener("click",s.onClickOk,false);
			s.buttonCancel.addEventListener("click",s.onClickCancel,false);
		}
		s.destoryContainer=function(){
			s.container.innerHTML="";
		}
		/*================
		Controller
		================*/
		s.setText=function(msg){
			s.content.innerHTML=msg;
		};
		s.hide=function(){
			$(s.mask).animate({opacity:0},"fast","linear",function(){
				$(this).css("display","none");
			});
			$(s.container).animate(s.hideAnimate,"fast","linear",function(){
				$(this).css("display","none");
			});
		};
		s.show=function(){
			if(s){
				$(s.mask).css({display:"block",opacity:"1"});
				//$(s.mask).css("display","block").animate({opacity:1},"fast","linear");
				$(s.container).css("display","block").animate(s.showAnimate,"fast","linear");
			}
		};
		s.destory=function(){
			$(s.mask).animate({opacity:0},"fast","linear",function(){
				$(this).remove();
			});
			$(s.container).animate(s.hideAnimate,"fast","linear",function(){
				$(this).remove();
			});
			s=null;
		};
		/*================
		Event
		================*/
		s.onClickOk=function(e){
			if(s.params.onClickOk){
				s.target=e.target;
				s.params.onClickOk(s);
				return;
			}
		};
		s.onClickCancel=function(e){
			if(s.params.onClickCancel){
				s.target=e.target;
				s.params.onClickCancel(s);
				return;
			}
			s.hide();
		};
		/*================
		Init
		================*/
		s.init=function(){
			s.createMask();
			s.createContainer();
		}
		s.init();
		/*================
		Set
		================*/
		s.setParams=function(params){
			s.params=params;
			s.destoryContainer();
			s.createContainer();
		}
	}
})(window,document,undefined);

/*!
 * 卡片框
 * @version 1.0.0
 * @author WangMingzhu
 * @requie jquery.js
 */

/**
*  toast弹出框
* 
*  @class Actionsheet
*/
(function(window,document,undefined){
	
	window.Toast=function(msg,params){
		/*================
		Model
		================*/
		var defaults={
			delay:1000
		}
		params=params||{};
		for(var def in defaults){
			if(params[def]==undefined){
				params[def]=defaults[def];
			}
		}
		var msg=msg||"";
		var s=this;
		s.params=params;
		//开关动画
		s.hideAnimate={opacity:0};
		s.showAnimate={opacity:"1",bottom:"50px"};

		/*================
		Method
		================*/
		s.createContainer=function(){
			if(s.container)return;
			s.container=document.createElement("div");
			s.container.setAttribute("class","toast-box");
			s.toast=document.createElement("div");
			s.toast.setAttribute("class","toast");
			s.toast.innerHTML=msg;
			s.container.appendChild(s.toast);
			document.body.appendChild(s.container);
		}
		/*================
		Controller
		================*/
		s.setText=function(msg){
			s.toast.innerHTML=msg;
		};
		s.hide=function(fn){
			$(s.container).animate(s.hideAnimate,"fast","linear",function(){
				$(this).css({"display":"none","bottom":"-100%"});
				if(fn)fn(s);
			});
		};
		s.show=function(fn){
			clearTimeout(s.delay);
			if(s){
				$(s.container).css("display","block").animate(s.showAnimate,"fast","linear");
				s.delay=setTimeout(function(){
					s.hide(fn);
				},s.params.delay);
			}
		};
		s.destory=function(){
			$(s.container).remove();
			s=null;
		};
		/*================
		Init
		================*/
		s.init=function(){
			s.createContainer();
		}
		s.init();
	}
})(window,document,undefined);

/*!
 * 卡片框
 * @version 1.0.0
 * @author WangMingzhu
 * @requie jquery.js
 */

/**
*  下方弹出卡片框
* 
*  @class Actionsheet
*/
(function(window,document,undefined){
	
	window.Actionsheet=function(params){
		/*var defaults=[];
		params=params||null;
		if(params==null){
			params=defaults;
		}*/
		var s=this;
		s.params=params||[];
		//开关动画
		s.hideAnimate={bottom:"-100%"};
		s.showAnimate={bottom:"0%"};

		/*================
		Model
		================*/
		var createEl=function(tagname,classname){
			var el=document.createElement(tagname);
			if(classname)el.setAttribute("class",classname);
			return el;
		}
		s.createMask=function(){
			if(!s.mask)s.mask=createEl("div","popup-mask");
			document.body.appendChild(s.mask);

			//遮罩绑定点击事件
			s.mask.addEventListener("click",s.onClickCancel,false);
		};
		s.createContainer=function(){
			if(!s.container)s.container=createEl("div","popup actionsheet");
			var group=createEl("div","actionsheet-group");
			for(var i=0,param;param=s.params[i++];){
				var btn=createEl("a");
				btn.innerHTML=param.text;
				group.appendChild(btn);
				//绑定事件
				(function(param){
					btn.addEventListener("click",function(e){
						s.target=e.target;
						param.handler(s);
					},false);
				})(param)
			}
			//创建取消按钮
			var cancel=createEl("a","actionsheet-cancel");
			cancel.innerHTML="取消";

			s.container.appendChild(group);
			s.container.appendChild(cancel);

			document.body.appendChild(s.container);

			//取消按钮绑定点击事件
			cancel.addEventListener("click",s.onClickCancel,false);
		}
		s.destoryContainer=function(){
			s.container.innerHTML="";
		}
		/*================
		Method
		================*/
		s.hide=function(){
			$(s.mask).animate({opacity:0},"fast","linear",function(){
				$(this).css("display","none");
			});
			$(s.container).animate(s.hideAnimate,"fast","linear",function(){
				$(this).css("display","none");
			});
		};
		s.show=function(){
			if(s){
				$(s.mask).css("display","block").animate({opacity:1},"fast","linear");
				$(s.container).css("display","block").animate(s.showAnimate,"fast","linear");
			}
		};
		s.destory=function(){
			$(s.mask).animate({opacity:0},"fast","linear",function(){
				$(this).remove();
			});
			$(s.container).animate(s.hideAnimate,"fast","linear",function(){
				$(this).remove();
			});
			s=null;
		};
		/*================
		Event
		================*/
		s.onClickCancel=function(){
			if(s.params.onClickOk){
				s.params.onClickOk(s);
				return;
			}
			s.hide();
		};
		/*================
		Init
		================*/
		s.init=function(){
			s.createMask();
			s.createContainer();
		}
		s.init();
		/*================
		Set
		================*/
		s.setParams=function(params){
			s.params=params;
			s.destoryContainer();
			s.createContainer();
		}
	}
})(window,document,undefined);

(function(window,document,undefined){
    window.Dialog=function(container,params){
        //Model
        /*=========================
          Params
          ===========================*/
        var defaults={
            pos:"middle",
            width:null,
            isClickMaskHide:true
            /*callbacks
            onClick:function(this)
            */
        }
        params=params||{};
        for(var def in defaults){
            if(params[def]===undefined){
                params[def]=defaults[def];
            }
        }
        //Dialog
        var s=this;

        //Params
        s.params = params;

        //Container
        s.container=typeof container=="string"?document.querySelector(container):container;

        //ContainerBox
        s.containerBox;
        if(!s.containerBox){
            s.containerBox=document.createElement("div");
            s.containerBox.setAttribute("class","popup");
            s.containerBox.appendChild(s.container);
            document.body.appendChild(s.containerBox);
        }
        //Mask
        s.mask;
        if(!s.mask){
            s.mask=document.createElement("div");
            s.mask.setAttribute("class","popup-mask");
            s.containerBox.parentNode.insertBefore(s.mask,s.containerBox);
            if(s.params.isClickMaskHide==true)s.mask.addEventListener("click",hideDialog,false);
        }
        //设置宽度
        s.params.width=s.container.style.width;
        //设置动画
        var hideAnimate={opacity:0};
        var showAnimate={opacity:1};
        function updateAnimate(){
            switch(s.params.pos){
                case "middle":hideAnimate={opacity:0};showAnimate={opacity:1};break;
                case "top":hideAnimate={top:"-100%"};showAnimate={top:"0%"};break;
                case "bottom":hideAnimate={bottom:"-100%"};showAnimate={bottom:"0%"};break;
                case "left":hideAnimate={left:"-100%"};showAnimate={left:"0%"};break;
                case "right":hideAnimate={right:"-100%"};showAnimate={right:"0%"};break;
                default :s.params.pos="middle";hideAnimate={opacity:0};showAnimate={opacity:1};
            }
        }
        updateAnimate();
        /*=========================
          Method
          ===========================*/
        //隐藏遮罩与外框
        function hideDialog(){
            $(s.mask).animate({opacity:0},"fast","linear",function(){
                $(this).css("display","none");
            });
            $(s.containerBox).animate(hideAnimate,"fast","linear",function(){
                $(this).css("display","none");
            });
        }
        s.hide=hideDialog;

        //显示遮罩与外框
        function showDialog(){
            //显示遮罩
            $(s.mask).css("display","block").animate({opacity:1},"fast","linear");
            //初始化容器
            s.containerBox.setAttribute("style","");
            $(s.containerBox).css(hideAnimate);
            s.containerBox.setAttribute("data-pos",s.params.pos);
            //显示容器
            s.container.style.display="block";
            $(s.containerBox).animate(showAnimate,"fast","linear");
            //设置宽度
            if(s.params.width){
                s.container.style.width="100%";
                s.containerBox.style.width=s.params.width;
            }
        }
        s.show=showDialog;

        //设置位置
        s.setPos=function(pos){
            if(!pos)return;
            s.params.pos=pos;
            updateAnimate();
        }
        //设置回调
        s.removeOnClick=function(){
            s.params.onClick=null;
            s.container.removeEventListener("click",onClickCallback,false);
        }
        s.addOnClick=function(onclickFn){
            s.params.onClick=onclickFn;
            s.container.addEventListener("click",onClickCallback,false);
        }

        //Callback
        if(s.params.onClick){
            s.container.addEventListener("click",onClickCallback,false);
        }
        function onClickCallback(e){
            s.target=e.target;
            s.params.onClick(s)
        };
        return s;
    }
})(window,document,undefined);

(function(window,document,undefined){
    window.Scrollpicker=function(params){
        /*=========================
          Model
          ===========================*/
        var defaults={
            container:null,
            headerClass:"scrollpicker-header",
            headerDoneClass:"scrollpicker-done",
            headerDoneText:"完成",
            headerCancelClass:"scrollpicker-cancel",
            headerCancelText:"取消",
            wrapperClass:"scrollpicker-wrapper",
            layerClass:"scrollpicker-layer",
            layerFrameClass:"scrollpicker-layer-frame",
            slotsClass:"scrollpicker-slots",
            slotClass:"scrollpicker-slot",
            slotActiveClass:"active",
            slotListActiveClass:"active",
            cellHeight:44,
            friction:0.002,//摩擦力
            bounceRange:44,//弹性值
            isClickMaskHide:true,
            isCascade:false,//是否清除后面的值
            defaultValues:[{'key':null,'value':'----'}]

            /*callbacks
            onClickCancel:function(Scrollpicker)
            onClickDone:function(Scrollpicker)
            onScrollStart:function(Scrollpicker)
            onScroll:function(Scrollpicker)
            onScrollEnd:function(Scrollpicker)
            */
        }
        params=params||{};
        for(var def in defaults){
            if(params[def]===undefined){
                params[def]=defaults[def];
            }
        }
        //Scrollpicker
        var s=this;

        //Params
        s.params = params;

        //Dom元素
        s.container,s.mask,s.header,s.wrapper,s.slotbox,s.layer,s.headerDone,s.headerCancel;
        //槽元素与其值
        s.slots=[],s.slots.col=0,s.activeOptions=[],s.activeOption={};
        //是否渲染
        s.isRendered=false;
        /*=========================
          View
          ===========================*/
        //新建Container
        s.createContainer=function(){
            var container=document.createElement("div")
            container.setAttribute("class","scrollpicker");
            return container;
        }
        //新建Header
        s.createHeader=function(){
            var header=document.createElement("div");
            header.setAttribute("class",s.params.headerClass);
            return header;
        }
        //新建Header按钮
        s.createHeaderDone=function(){
            var headerDone=document.createElement("a");
            headerDone.setAttribute("class",s.params.headerDoneClass);
            headerDone.innerHTML=s.params.headerDoneText;
            return headerDone;
        }
        s.createHeaderCancel=function(){
            var headerCancel=document.createElement("a");
            headerCancel.setAttribute("class",s.params.headerCancelClass);
            headerCancel.innerHTML=s.params.headerCancelText;
            return headerCancel;
        }
        //新建Wrapper
        s.createWrapper=function(){
            var wrapper=document.createElement("div");
            wrapper.setAttribute("class",s.params.wrapperClass);
            return wrapper;
        }
        //新建Slotbox
        s.createSlotbox=function(){
            var slotbox=document.createElement("div");
            slotbox.setAttribute("class",s.params.slotsClass);
            return slotbox;
        }
        //新建Layer
        s.createLayer=function(){
            var layer=document.createElement("div");
            layer.setAttribute("class",s.params.layerClass);
            var layerFrame=document.createElement("div");
            layerFrame.setAttribute("class",s.params.layerFrameClass);
            layer.appendChild(layerFrame);
            return layer;
        }
        //新建Mask
        s.createMask=function(){
            var mask=document.createElement("div");
            mask.setAttribute("class","popup-mask");
            return mask;
        }
        //新建一行List
        s.createLi=function(value,classes){
            var li=document.createElement("li");
            li.setAttribute("class",classes);
            li.innerHTML=value;
            return li;
        }
        //创建DOM
        s.create=function(){
            if(s.params.container){
                s.container=typeof container=="string"?document.querySelector(container):container;
                s.mask=s.container.previousElementSibling;
                s.header=s.container.querySelector("."+s.params.headerClass);
                s.headerDone=s.container.querySelector("."+s.params.headerDoneClass);
                s.headerCancel=s.container.querySelector("."+s.params.headerCancelClass);
                s.wrapper=s.container.querySelector("."+s.params.wrapperClass);
                s.slotbox=s.container.querySelector("."+s.params.slotsClass);
                s.layer=s.container.querySelector("."+s.params.layerClass);
            }else{
                s.container=s.createContainer();
                s.mask=s.createMask();
                s.header=s.createHeader();
                s.headerDone=s.createHeaderDone();
                s.headerCancel=s.createHeaderCancel();
                s.wrapper=s.createWrapper();
                s.slotbox=s.createSlotbox();
                s.layer=s.createLayer();

                s.header.appendChild(s.headerCancel);
                s.header.appendChild(s.headerDone);

                s.wrapper.appendChild(s.slotbox);
                s.wrapper.appendChild(s.layer);

                s.container.appendChild(s.header);
                s.container.appendChild(s.wrapper);

                document.body.appendChild(s.mask);
                document.body.appendChild(s.container);
            }
        }
        s.create();
        /*=========================
          Method
          ===========================*/
        //添加一列
        s.addSlot=function(values,classes,defaultValue){
            if (!classes){
                classes='';
            }
            //设置属性
            var slot=document.createElement("ul");
            slot.setAttribute("class",s.params.slotClass+" "+classes);
            slot.values=values;
            slot.defaultValue=defaultValue;
            slot.col=s.slots.col;
            //渲染
            s.slots.col++;
            s.renderSlot(slot);
            s.slotbox.appendChild(slot);
            //添加到集合里
            s.slots.push(slot);
        }
        //修改一列
        s.replaceSlot=function(col,values,classes,defaultValue){
            //设置属性
            var slot=s.slots[col];
            slot.setAttribute("class",s.params.slotClass+" "+classes);
            slot.values=values;
            slot.defaultValue=defaultValue;
            //重新渲染
            s.renderSlot(slot);
            if(s.params.isCascade)clearAfterSlot(col);
        }
        //清空下列
        function clearAfterSlot(col){
            var nextCol=++col;
            var nextSlot=s.slots[nextCol];
            if(nextSlot){
                nextSlot.innerHTML="<li>"+s.params.defaultValues[0].value+"</li>"
                s.updateSlot(nextSlot);
                clearAfterSlot(nextCol);
                //设置选中项
                s.activeOptions[nextCol]=s.params.defaultValues[0];
            }
        }
        //渲染一列
        s.renderSlot=function(slot){
            //初始化一列值
            slot.innerHTML="";
            slot.activeIndex=0;
            slot.defaultIndex=0;
            var col=slot.col;
            var values=slot.values;
            var defaultValue=slot.defaultValue;
            //渲染
            for(var i=0,rowData;rowData=values[i];i++){
                //记录默认值项数
                var li,liClasses;
                if(defaultValue && defaultValue==rowData["value"]){
                    slot.activeIndex=i;
                    slot.defaultIndex=i;
                    liClasses="active";
                    //添加到激活项
                    s.activeOptions[col]=rowData;
                }else if(i==0){
                    liClasses="active";
                    //添加到激活项
                    s.activeOptions[col]=rowData;
                }else{
                    liClasses="";
                }
                li=s.createLi(rowData["value"],liClasses);
                slot.appendChild(li);
            }
            //更新此列
            s.updateSlot(slot);
        }
        //更新DOM数据，获得所有槽和槽内list列表
        s.updateSlot=function(slot){
            slot["list"]=[].slice.call(slot.querySelectorAll("li"));
            slot["defaultPosY"]=-slot.defaultIndex*s.params.cellHeight;
            slot["posY"]=slot["defaultPosY"];
            slot["minPosY"]=0;
            slot["maxPosY"]=-(slot["list"].length-1)*s.params.cellHeight;
            slot["minBouncePosY"]=s.params.bounceRange;
            slot["maxBouncePosY"]=slot["maxPosY"]-s.params.bounceRange;
            slot.style.WebkitTransform='translate3d(0px,'+slot["defaultPosY"]+'px,0px)';
            slot["list"].forEach(function(n,i,arr){
                n.className="";
                if(i==slot.defaultIndex){
                    n.className="active";
                }
            });
        }
        s.updateSlots=function(){
            s.slots=[].slice.call(s.container.querySelectorAll("."+s.params.slotClass));
            s.slots.forEach(function(n,i,a){
                s.renderSlot(n);
            });
        }
        
        //显示
        s.show=function(){
            if(s.isRendered==false){
                s.attach();
            }
            s.mask.style.display="block";
            s.mask.style.opacity="1";
            s.container.style.WebkitTransform='translate3d(0px,0px,0px)';
        }
        //隐藏
        s.hide=function(){
            s.mask.style.opacity="0";
            s.mask.style.display="none";
            s.container.style.WebkitTransform='translate3d(0px,100%,0px)';
        }
        //重置
        s.reset=function(){
            //清空指向
            s.slots=[];
            //清空数据
            s.isRendered=false;
            s.slotbox.innerHTML="";
        }
        //清除
        s.destroy=function(){
            s.detach();
            document.body.removeChild(s.mask);
            document.body.removeChild(s.container);
        }
        
        s.slotPosY=function(slot,posY){
            slot.style.WebkitTransform='translate3d(0px,' + posY + 'px,0px)';
        }
        s.updateActiveSlot=function(xPos){
            var xPos=xPos||0;
            var slotPos=0;
            for(var i=0;i<s.slots.length;i++){
                slotPos+=s.slots[i].clientWidth;
                if (xPos<slotPos) {
                    s.activeSlot=s.slots[i];
                    s.activeSlotIndex=i;
                    break;
                }
            }
        }
        //计算惯性时间与坐标，返回距离和时间
        s.getInertance=function(distance,duration,friction){
            //使用公式算出惯性执行时间与距离
            var newDuration=(2*distance/duration)/friction;
            var newDistance=-(friction/2)*(newDuration*newDuration);
            //如果惯性执行时间为负值，则为向上拖动
            if(newDuration<0){
                newDuration=-newDuration;
                newDistance=-newDistance;
            }
            return {distance:newDistance,duration:newDuration}
        }
        var isTransitionEnd=true;//有时候原坐标和目标坐标相同时，不会执行transition事件，用此值来记录是否执行的状态
        //滚动至
        s.scrollTo=function(slot,posY,duration){
            slot.posY=posY;
            if(duration==0 || duration){
                var duration=duration;
            }else{
                duration=100;
            }
            if(posY>slot.minBouncePosY){
                slot.posY=slot.minBouncePosY;
                duration=s.sideDuration(posY,slot.minBouncePosY,duration);//计算新的执行时间
            }else if(posY<slot.maxBouncePosY){
                slot.posY=slot.maxBouncePosY;
                duration=s.sideDuration(posY,slot.maxBouncePosY,duration);//计算新的执行时间
            }
            slot.style.webkitTransitionDuration=duration+"ms";
            slot.style.WebkitTransform='translate3d(0px,' + slot.posY + 'px,0px)';
            //如果不执行onTransitionEnd
            if(isTransitionEnd==false || duration==0){
                s.onTransitionEnd();
                isTransitionEnd=true;
            }
        }
        //计算超出边缘时新的时间
        s.sideDuration=function(posY,bouncePosY,duration){
            return Math.round(duration/(posY/bouncePosY));
        }
        //更新列表激活状态
        s.updateActiveList=function(posY){
            var index=-Math.round((posY-s.params.cellHeight*2)/s.params.cellHeight)-2;
            s.activeSlot.list.forEach(function(n,i,a){
                n.classList.remove("active");
                if(i==index){
                    n.classList.add("active");
                    //s.activeNode=n;
                }
            });
            //添加到激活项
            s.activeOption=s.slots[s.activeSlotIndex].values[index];
            s.activeOptions[s.activeSlotIndex]=s.activeOption;
            //设置选中项
            s.slots[s.activeSlotIndex].activeIndex=index;
        }
        //位置矫正
        s.posCorrect=function(){
            s.activeSlot.style.webkitTransitionDuration='500ms';
            var remainder=s.activeSlot.posY%s.params.cellHeight;
            if(remainder!=0){
                //算出比例
                var divided=Math.round(s.activeSlot.posY/s.params.cellHeight);
                //对准位置
                var top=s.params.cellHeight*divided;
                s.activeSlot.posY=top;
                s.activeSlot.style.WebkitTransform='translate3d(0px,' + top + 'px,0px)';
            }
            s.updateActiveList(s.activeSlot.posY);
            //动画时间回0
            s.activeSlot.style.webkitTransitionDuration='0ms';
            //Callback
            if(s.params.onScrollEnd)s.params.onScrollEnd(s);
        }
        /*=========================
          Control
          ===========================*/
        s.events=function(detach){
            var touchTarget=s.layer;
            var action=detach?"removeEventListener":"addEventListener";
            touchTarget[action]("touchstart",s.onTouchStart,false);
            touchTarget[action]("touchmove",s.onTouchMove,false);
            touchTarget[action]("touchend",s.onTouchEnd,false);
            touchTarget[action]("touchcancel",s.onTouchEnd,false);
            //preventDefault
            s.mask[action]("touchmove",preventDefault,false);
            s.header[action]("touchmove",preventDefault,false);
            touchTarget[action]("touchmove",preventDefault,false);
            //transitionEnd
            s.slots.forEach(function(n,i,a){
                n[action]("webkitTransitionEnd",s.onTransitionEnd,false);
            });
            //mask
            if(s.params.isClickMaskHide==true)s.mask[action]("click",s.hide,false);
            //确定和取消按钮
            if(s.params.onClickDone)s.headerDone[action]("click",s.onClickDone,false);
            if(s.params.onClickCancel)s.headerCancel[action]("click",s.onClickCancel,false);
        }
        //attach、dettach事件
        s.attach=function(event){
            s.events();
        }
        s.detach=function(event){
            s.events(true);
        }
        s.touches={
            startX:0,
            startY:0,
            currentX:0,
            currentY:0,
            endX:0,
            endY:0,
            startTimeStamp:0,
            duration:0,
            diffX:0,
            diffY:0,
            direction:null
        };
        function preventDefault(e){
            e.preventDefault();
        }
        //取消和确定按钮
        s.onClickDone=function(e){
            s.target=e.target;
            s.params.onClickDone(s);
        }
        s.onClickCancel=function(e){
            s.target=e.target;
            s.params.onClickCancel(s);
        }
        //添加和删除取消和确定按钮点击
        s.addOnClickDone=function(callback){
            s.params.onClickDone=callback;
            s.headerDone.addEventListener("click",onClickDoneCallback,false);
        }
        s.removeOnClickDone=function(){
            s.params.onClickDone=null;
            s.headerDone.removeEventListener("click",onClickDoneCallback,false);
        }
        function onClickDoneCallback(e){
            s.target=e.target;
            s.params.onClickDone(s)
        };
        s.addOnClickCancel=function(callback){
            s.params.onClickCancel=callback;
            s.headerCancel.addEventListener("click",onClickCancelCallback,false);
        }
        s.removeOnClickCancel=function(){
            s.params.onClickCancel=null;
            s.headerCancel.removeEventListener("click",onClickCancelCallback,false);
        }
        function onClickCancelCallback(e){
            s.target=e.target;
            s.params.onClickCancel(s)
        };
        //触摸事件
        s.onTouchStart=function(e){
            //s.layer.addEventListener("touchmove",preventDefault,false);
            s.touches.startX=e.touches[0].clientX;
            s.touches.startY=e.touches[0].clientY;
            //寻找当前点击的槽
            s.updateActiveSlot(s.touches.startX);
            //记录点击时间
            s.touches.startTimeStamp=e.timeStamp;
            //Callback
            if(s.params.onScrollStart)s.params.onScrollStart(s);
        }
        s.onTouchMove=function(e){
            s.touches.currentY=e.touches[0].clientY;
            s.touches.diffY=s.touches.startY-s.touches.currentY;
            s.activeSlot.moveY=s.activeSlot.posY-s.touches.diffY;
            if(s.activeSlot.moveY>s.activeSlot.minBouncePosY){
                s.activeSlot.moveY=s.activeSlot.minBouncePosY;
            }else if(s.activeSlot.moveY<s.activeSlot.maxBouncePosY){
                s.activeSlot.moveY=s.activeSlot.maxBouncePosY;
            }
            s.activeSlot.style.WebkitTransform='translate3d(0px,' + s.activeSlot.moveY + 'px,0px)';
            s.updateActiveList(s.activeSlot.moveY);

            //Callback
            if(s.params.onScroll)s.params.onScroll(s);
        }
        s.onTouchEnd=function(e){
            //设置当前坐标值
            s.activeSlot.posY=s.activeSlot.moveY;
            //计算拖动时间
            s.touches.duration=e.timeStamp-s.touches.startTimeStamp;
            //惯性值计算
            var inertance=s.getInertance(s.touches.diffY,s.touches.duration,s.params.friction);
            //惯性Y坐标
            var newPosY=s.activeSlot.posY + inertance.distance;
            //如果原坐标和目标坐标相同，则不执行transitionEnd
            if(s.activeSlot.moveY==s.activeSlot.minBouncePosY || s.activeSlot.moveY==s.activeSlot.maxBouncePosY){
                isTransitionEnd=false;
            }
            //滚动到指定位置
            s.scrollTo(s.activeSlot,newPosY,inertance.duration);
        }
        //惯性滚动结束后
        s.onTransitionEnd=function(){
            //如果跑到边界之外回到圈内
            if (s.activeSlot.posY > 0){
                s.activeSlot.posY=0;
            }else if(s.activeSlot.posY < s.activeSlot.maxPosY) {
                s.activeSlot.posY=s.activeSlot.maxPosY;
            }
            s.activeSlot.style.WebkitTransform='translate3d(0px,' + s.activeSlot.posY + 'px,0px)';
            //位置矫正
            s.posCorrect();
        }
        function init(){
            if(s.params.container){
                s.attach();
            }
        }
        init();
    }
})(window,document,undefined);

/*!
 * 多媒体控件
 * @version 1.0.0
 * @author WangMingzhu
 * @require jQuery
 */

/**
*  树结构
* 
*  @class Tree
*  @constructor
*  @param container(ul树容器) params(配置项)
*/
(function(window,document,undefined){
window.Tree=function(container,params){
    //Model
    /*=========================
      Params
      ===========================*/
    var defaults={
        "selectedContainer":null,
        /*callbacks
        onTap:function(Tree)
        onTapLastChild:function(Tree)
        */
    }
    params=params||{};
    for(var def in defaults){
        if(params[def]===undefined){
            params[def]=defaults[def];
        }
    }
    //Tree
    var s=this;

    //Params
    s.params = params;
    
    //Container
    s.container=typeof container=="string"?document.querySelector(container):container;
    if(!s.container)return;

    //当前点击节点|图标、下级节点
    s.elLI="",s.elIcon="",s.elChildUL="";

    //SelectedContainer
    if(s.params.selectedContainer){
        s.selectedContainer=typeof s.params.selectedContainer=="string"?document.querySelector(s.params.selectedContainer):s.params.selectedContainer;
    }

    //SelectedEl
    s.selectedNodes=[];
    /*=========================
      SelectedContainer Container
      ===========================*/
    s.selectedContainerSize=function(){
        if($(s.params.selectedContainer).is(':empty')){
            s.selectedNodes=[];
            $(s.params.selectedContainer).slideUp();
        }else{
            s.selectedNodes=[];
            $("span",s.selectedContainer).each(function(i,n){
                s.selectedNodes.push({"id":$(this).data("id"),"name":$(this).data("name")});
            });
            $(s.params.selectedContainer).slideDown();
        }
    }
    /*=========================
      Touch Events
      ===========================*/
    //点击树
    s.onTapTree=function(){
        //点击树
        EventUtil.addHandler(s.container,"tap",function(e){
            s.target=e.target;
            //当点击添加时,将所选添加到stautsbar上
            if(s.target.className.indexOf("icon-rdoadd")>= 0 && s.params.selectedContainer){
                s.elLI=s.target.parentNode.parentNode;
                //子节点及自身添加active状态
                $(s.elLI).find(".treetitle").addClass('active');
                $(s.elLI).find(".icon-rdoadd").css("display","none");

                //添加到selected-box中
                var treeID=s.elLI.getAttribute("id");
                var treeName=s.elLI.getAttribute("data-name");
                var span='<span class="mark-grayscale" data-id="'+treeID+'" data-name="'+treeName+'">'+treeName+'<a class="icon-clear-fill delete-selection"></a></span>';
                $(s.params.selectedContainer).append(span);
                s.selectedContainerSize();

                //删除selected-box上的子节点
                $(s.elLI).find("li").each(function(i,n){
                    var id=n.id;
                    $("[data-id='"+id+"']").fadeOut(500,function(){
                        $(this).remove();
                        //selected-box是否为空
                        s.selectedContainerSize();
                    });
                });
            }else if(s.target.className.indexOf("treetitle")>=0){//当点击标题时
                s.elLI=s.target.parentNode;
            } else if(s.target.className.indexOf("treeicon")>=0){//当点击左侧箭头时
                s.elLI=s.target.parentNode.parentNode;
            }
            if(!s.elLI)return;
            //CallBack onTap
            if(s.params.onTap)s.params.onTap(s);
            //展开与收缩
            s.elIcon=s.elLI.querySelector(".treeicon");
            s.elChildUL=s.elLI.querySelector("ul");
            //没有子节点
            if(!s.elChildUL){
                if(s.params.onTapLastChild)s.params.onTapLastChild(s);
                return;
            }
            //展开与收缩树
            if(s.elChildUL.style.display=="none" || !s.elChildUL.style.display){
                //展开
                s.elIcon.classList.add("active");
                s.elChildUL.style.display="block";
            }else{
                //收缩
                s.elIcon.classList.remove("active");
                s.elChildUL.style.display="none";
            }
        });
    }
    //点击选中节点框
    s.onTapTreeSelected=function(){
        //点击selected-box
        if(!s.selectedContainer)return;
        s.selectedContainer.addEventListener("click",function(e){
            var target=e.target;
            if(target.className.indexOf("icon-clear-fill")>= 0){
                var markTarget=target.parentNode;
                var id=$(markTarget).data("id");
                //还原树结构中的active状态
                $("#"+id).find(".treetitle").removeClass("active").find(".icon-rdoadd").fadeIn(500);
                //删除点击的mark
                $(markTarget).fadeOut(500,function(e){
                    $(this).remove();
                    s.selectedContainerSize();
                })
            }
        },false);
    }

    //主函数
    s.init=function(){
        s.onTapTree();
        if(s.selectedContainer)s.onTapTreeSelected();
    }
    s.init();

    // Return Tree instance
    return s;
}
})(window,document,undefined);

(function(window,document,undefined){
	window.Indexbar=function(container,params){
		/*=========================
          Params
          ===========================*/
		var defaults={
			"indexbarClass":"indexbar",
			"indexbarActiveClass":"active",
			"indexActiveClass":"active",
			"indexbarTooltipClass":"indexbar-tooltip"
		}
		params=params||{};
		for(var def in defaults){
			if(params[def]===undefined){
				params[def]=defaults[def];
			}
		}
		//Indexbar
		var s=this;

		//Params
		s.params = params;

		//Container
		s.container=typeof container=="string"?document.querySelector(container):container;
		if(!s.container)return;

		//IndexbarContainer
		s.indexbarContainer=s.container.parentNode.querySelector("."+s.params.indexbarClass);

		//Indexs
		s.indexs=s.indexbarContainer.querySelectorAll("a");
		s.updateContainerSize=function(){
			s.indexHeight=s.indexbarContainer.clientHeight/s.indexs.length;
			[].slice.call(s.indexs).forEach(function(n,i,a){
				n.style.height=s.indexHeight+"px";
				n.style.lineHeight=s.indexHeight+"px";
			})
		}
		s.updateContainerSize();

		//Tooltip
		s.tooltip=s.indexbarContainer.parentNode.querySelector("."+s.params.indexbarTooltipClass);

		//Controller
		/*=========================
          Touch Events
          ===========================*/
		//body事件绑定
		var touchTarget=document.body;
		s.bodyEvents=function(detach){
			var action=detach?"removeEventListener":"addEventListener";
			touchTarget[action]("touchmove",s.onTouchMove,false);
			touchTarget[action]("touchend",s.onTouchEnd,false);
			touchTarget[action]("touchcancel",s.onTouchEnd,false);
		}
		//attach、dettach事件
		s.bodyAttach=function(event){
			s.bodyEvents();
		}
		s.bodyDetach=function(event){
			s.bodyEvents(true);
		}
		/*=========================
          Touch Handler
          ===========================*/
        //Touch信息
        s.touches={
        	startX:0,
        	startY:0,
        	currentX:0,
        	currentY:0,
        	endX:0,
        	endY:0
        };
        //索引
        function preventDefault(e){
			e.preventDefault();
		}
		s.onTouchMove=function(e){
			s.touches.currentY=e.touches[0].clientY;
			s.goIndex(s.touches.currentY);
		};
		s.onTouchEnd=function(e){
			touchTarget.removeEventListener("touchmove",preventDefault,false);
			s.bodyDetach();
			//移除激活indexbar
			s.indexbarContainer.classList.remove(s.params.indexbarActiveClass);
		};
		s.indexbarContainer.addEventListener("touchstart",function(e){
			touchTarget.addEventListener("touchmove",preventDefault,false);
			s.touches.startX=e.touches[0].clientX;
			s.touches.startY=e.touches[0].clientY;
			//给body绑定触摸事件
			s.bodyAttach();
			//滚动到指定位置
			s.goIndex(s.touches.startY);
			//激活indexbar
			s.indexbarContainer.classList.add(s.params.indexbarActiveClass);
		},false);
		/*=========================
          Method
          ===========================*/
        s.indexHTML="A";
        s.goIndex=function(y){
        	//修改文字
        	s.index=document.elementFromPoint(s.touches.startX,y);
        	if(s.index.parentNode!=s.indexbarContainer)return;
        	s.indexHTML=s.index.innerHTML;
        	s.tooltip.innerHTML=s.indexHTML;
        	s.indexLI=s.container.querySelector('[data-index='+s.indexHTML+']');
        	//移动位置
        	if(s.indexLI)s.container.scrollTop=s.indexLI.offsetTop;
        }
	}
})(window,document,undefined);

// @koala-prepend "section.js"
// @koala-prepend "animate.js"
// @koala-prepend "baidumap.js"
// @koala-prepend "dateutil.js"
// @koala-prepend "db.js"
// @koala-prepend "device.js"
// @koala-prepend "shake.js"
// @koala-prepend "dragrefresh.js"
// @koala-prepend "eventutil.js"
// @koala-prepend "emoji.js"
// @koala-prepend "form.js"
// @koala-prepend "fontcounter.js"
// @koala-prepend "gauge.js"
// @koala-prepend "media.js"
// @koala-prepend "clock.js"
// @koala-prepend "richeditor.js"
// @koala-prepend "richinput.js"
// @koala-prepend "share.js"
// @koala-prepend "slider.js"
// @koala-prepend "type.js"
// @koala-prepend "weather.js"
// @koala-prepend "calendar.js"
// @koala-prepend "pinyin.js"
// @koala-prepend "pinyin.color.js"
// @koala-prepend "alert.js"
// @koala-prepend "confirm.js"
// @koala-prepend "toast.js"
// @koala-prepend "actionsheet.js"
// @koala-prepend "dialog.js"
// @koala-prepend "scrollpicker.js"
// @koala-prepend "tree.js"
// @koala-prepend "indexbar.js"