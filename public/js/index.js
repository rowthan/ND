!function t(e,i,n){function a(s,r){if(!i[s]){if(!e[s]){var d="function"==typeof require&&require;if(!r&&d)return d(s,!0);if(o)return o(s,!0);var c=new Error("Cannot find module '"+s+"'");throw c.code="MODULE_NOT_FOUND",c}var h=i[s]={exports:{}};e[s][0].call(h.exports,function(t){var i=e[s][1][t];return a(i?i:t)},h,h.exports,t,e,i,n)}return i[s].exports}for(var o="function"==typeof require&&require,s=0;s<n.length;s++)a(n[s]);return a}({1:[function(t,e,i){!function(){var t=document.createElement("script");t.src="//hm.baidu.com/hm.js?1d880d533f964c2a4b703b1189239fa6";var e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(t,e)}(),function(){var t=document.createElement("script");t.src="//push.zhanzhang.baidu.com/push.js";var e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(t,e)}()},{}],2:[function(t,e,i){$(".focs .icon-weibo").click(function(){var t="http://v.t.sina.com.cn/share/share.php?url="+encodeURIComponent(location.href)+"&title="+document.title;window.open(t)}),$(".focs .icon-star").click(function(){var t="http://connect.qq.com/widget/shareqq/index.html?desc=学习分享，与君共勉！&summary=花谢花菲花满楼&title="+document.title+"&url="+encodeURIComponent(location.href);window.open(t)})},{}],3:[function(t,e,i){if(/(msie 7)|(msie 8)|(msie 9)/i.test(navigator.userAgent.toLowerCase())){$("body").append('<div style="position:fixed;left:0;top:0;width:100%;height:100%;background:#000;opacity:0.35;filter:alpha(opacity:35);z-index:22222;"></div><div style="position:absolute;text-align:center;left:50%;margin-left:-300px;top:120px;width:600px;height:80px;background:#fff;border-radius:2px;line-height:80px;color:#666;z-index:22223;">当前浏览器版本较低！&nbsp;<b id="miao" style="font-size:18px;color:#999;">8</b>&nbsp;秒后网页将自动关闭，请换到现代浏览器，抱歉！</div>');var n=8;return setInterval(function(){return n--,0>n?(window.close(),!1):void $("#miao").html(n)},1e3),!1}var a=function(t){$(t).addClass("current")},o="index";$(".nav li").each(function(){var t=$(this).prop("id");return-1!=location.pathname.indexOf("suggests")?(o="about",!1):t&&-1!=location.pathname.indexOf(t)?(o=t,!1):void 0}),a("#"+o),$(".minnav").click(function(){$(".nav").slideToggle(230)}),$(".header .zan").click(function(){$.ajax({url:"/ajaxPage.html",type:"post",data:{mainType:1,url:location.href,title:document.title},error:function(){console.log("error")},success:function(t){var e=t.mes;if(0>e)alert("可以了，谢谢亲！");else{var i=t.count;$(".header i").html("赞（"+i+"）"),$(".header .zan").attr("title",i+"人已赞")}}})})},{}],4:[function(t,e,i){function n(t){t=t||{},this.maxFlake=t.maxFlake||200,this.flakeSize=t.flakeSize||10,this.fallSpeed=t.fallSpeed||1}function a(){var t=document.createElement("canvas");t.id="snowfall",t.width=$(window).width(),t.height=$("body").innerHeight(),t.setAttribute("style","position:fixed; top: 0; left: 0; z-index: 2222; pointer-events: none;"),document.getElementsByTagName("body")[0].appendChild(t),this.canvas=t,this.ctx=t.getContext("2d")}function o(t,e,i,n){this.x=Math.floor(Math.random()*t),this.y=Math.floor(Math.random()*e),this.size=Math.random()*i+2,this.maxSize=i,this.speed=1*Math.random()+n,this.fallSpeed=n,this.velY=this.speed,this.velX=0,this.stepSize=Math.random()/30,this.step=0}function s(){for(var t=this.maxFlake,e=this.flakes=[],i=this.canvas,n=0;t>n;n++)e.push(new o(i.width,i.height,this.flakeSize,this.fallSpeed))}function r(){var t=this.maxFlake,e=this.flakes;ctx=this.ctx,canvas=this.canvas,that=this,ctx.clearRect(0,0,canvas.width,canvas.height);for(var i=0;t>i;i++)e[i].update(),e[i].render(ctx);this.loop=requestAnimationFrame(function(){r.apply(that)})}requestAnimationFrame=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame||window.oRequestAnimationFrame||function(t){setTimeout(t,1e3/60)},cancelAnimationFrame=window.cancelAnimationFrame||window.mozCancelAnimationFrame||window.webkitCancelAnimationFrame||window.msCancelAnimationFrame||window.oCancelAnimationFrame,n.prototype.start=function(){a.apply(this),s.apply(this),r.apply(this)},o.prototype.update=function(){this.x,this.y,this.velX*=.98,this.velY<=this.speed&&(this.velY=this.speed),this.velX+=Math.cos(this.step+=.05)*this.stepSize,this.y+=this.velY,this.x+=this.velX,(this.x>=canvas.width||this.x<=0||this.y>=canvas.height||this.y<=0)&&this.reset(canvas.width,canvas.height)},o.prototype.reset=function(t,e){this.x=Math.floor(Math.random()*t),this.y=0,this.size=Math.random()*this.maxSize+2,this.speed=1*Math.random()+this.fallSpeed,this.velY=this.speed,this.velX=0},o.prototype.render=function(t){var e=t.createRadialGradient(this.x,this.y,0,this.x,this.y,this.size);e.addColorStop(0,"rgba(175, 218, 259, 0.9)"),e.addColorStop(.5,"rgba(175, 218, 259, 0.5)"),e.addColorStop(1,"rgba(175, 218, 259, 0)"),t.save(),t.fillStyle=e,t.beginPath(),t.arc(this.x,this.y,this.size,0,2*Math.PI),t.fill(),t.restore()};var d=new n({maxFlake:60});d.start()},{}],5:[function(t,e,i){t("../modules/header"),function(){function t(t){n=!1,$now=$(".sub").eq(t),$(".sub").css({zIndex:1}),$now.css({zIndex:2}),$(".dotted").removeClass("dotted-active").eq(t).addClass("dotted-active"),$now.animate({left:"0"},r),$(".first").animate({left:-a+"px"},r,function(){$(".first").css({left:a+"px"}).removeClass("first"),$now.addClass("first"),n=!0})}$("img").each(function(){$(this).attr("data-src")&&$(this).css({"background-color":"#eee",opacity:0})}),$(window).scroll(function(){$("img").each(function(){$(this).attr("data-src")&&$(this).offset().top-$(window).scrollTop()+10<$(window).height()&&$(this).offset().top-$(window).scrollTop()+$(this).innerHeight()>0&&$(this).attr("src",$(this).attr("data-src")).removeAttr("data-src").animate({opacity:1},600)})});var e={timer:null,s:0,getMinute:function(){var t=new Date,e=t.getMinutes();e=6*e+180,$(".mini-minutes").css({"-webkit-transform":"rotate("+e+"deg)","-moz-transform":"rotate("+e+"deg)","-ms-transform":"rotate("+e+"deg)","-o-transform":"rotate("+e+"deg)",transform:"rotate("+e+"deg)"})},getHour:function(){var t=new Date,e=t.getHours(),i=t.getMinutes();e=30*e+180+i/60*30,$(".mini-hours").css({"-webkit-transform":"rotate("+e+"deg)","-moz-transform":"rotate("+e+"deg)","-ms-transform":"rotate("+e+"deg)","-o-transform":"rotate("+e+"deg)",transform:"rotate("+e+"deg)"})},startMinites:function(){this.getMinute()},startHours:function(){this.getHour()},startSeconds:function(){clearInterval(this.timer);var t=this;this.timer=setInterval(function(){t.startMinites(),t.startHours(),t.s++,t.s=t.s>360?0:t.s,$(".mini-circle-move").css({"-webkit-transform":"rotate("+t.s+"deg)","-moz-transform":"rotate("+t.s+"deg)","-ms-transform":"rotate("+t.s+"deg)","-o-transform":"rotate("+t.s+"deg)",transform:"rotate("+t.s+"deg)"})},25)},start:function(){this.startSeconds()}};e.start();var i=0,n=!0,a=$(".bwrap").width(),o=$(".bwrap").length-1,s=5e3,r=450;$(".sub").each(function(t){t>0&&$(this).css({left:a+"px"})});var d=function(){i++,i>o&&(i=0),t(i)},c=null;clearInterval(c),c=setInterval(d,s),$(".ban-con").mousemove(function(){$(".prev,.next").fadeIn(),clearInterval(c)}),$(".ban-con").mouseleave(function(){$(".prev,.next").fadeOut(),c=setInterval(d,s)}),$(".prev").click(function(){return 1!=n?!1:(i--,i=0>i?o:i,void t(i))}),$(".next").click(function(){return 1!=n?!1:(i++,i=i>o?0:i,void t(i))}),$(".dotted").each(function(e){$(this).click(function(){return $(this).hasClass("dotted-active")?!1:void(1==n&&(i=e,t(e)))})}),$("body").on("click",".boke .mask",function(){location.href=$(this).parent().find("a").attr("href")}),$(".boke").hover(function(){$(this).find(".mask").fadeIn().end().find("a").addClass("active").end().find(".infos").animate({top:0},300)},function(){$(this).find(".mask").fadeOut().end().find("a").removeClass("active").end().find(".infos").animate({top:"-35px"},300)}),$(".box").hover(function(){$(this).find(".mask").fadeIn()},function(){$(this).find(".mask").fadeOut()}),$(".favor-words li").hover(function(){$(this).find(".details").slideDown(),$(this).find(".artical").addClass("favor-words-hover")},function(){$(this).find(".details").hide(),$(this).find(".artical").removeClass("favor-words-hover")}),$.ajax({type:"post",url:"/ajaxPage.html",data:{ajaxtype:1},error:function(){console.log("error")},success:function(t){var e=$(".zan-music .zan");e.attr("title",t.zans+"人已赞").find("i").html("赞（"+t.zans+"）"),$.ajax({type:"post",url:"/ajaxPage.html",data:{ajaxtype:2},error:function(){console.log("error")},success:function(t){var e=t.bokes;$(".boke").each(function(t){var i="http://cdn.famanoder.com";-1!=e[t].mainimg.indexOf(i)&&(i=""),$(this).find(".itypes .s").html(e[t].type),$(this).find(".pv").html(e[t].pv),$(this).find(".comments").html(e[t].comments),$(this).find("img").attr("src",i+e[t].mainimg).hide().fadeIn(),$(this).find("a").attr("href","/bokes/"+e[t]._id).html(e[t].title),$(this).find(".labels .s").html(e[t].labels),$(this).find(".favors").html(e[t].favors)})}})}})}(),t("../modules/bottom"),t("../modules/snowfall"),t("../modules/baidu")},{"../modules/baidu":1,"../modules/bottom":2,"../modules/header":3,"../modules/snowfall":4}]},{},[5]);