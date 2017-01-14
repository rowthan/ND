$(function () {
    $('.ajax li a').on('click', function () {
        // alert('yes');
        var ifget = $(this).attr('get');
        if (ifget=="no"){
            $(this).attr("get","yes");
            var target= $(this).attr("href");
            var type = $(this).attr('con-type');
            var number = 4;
            // var parent = $a.closest('tr');
            $.ajax({
                type: 'get',
                url: '/home/ajax_getpost?type=' + type+'&&number='+number
            }).done(function (ret) {
                if (ret.code == 0) {
                    var html='';
                    // alert('请求成功');
                    $.each(ret.data,function(idx,item){
                        //输出
                        html='<div class="post"><img style="width:40px;height:40px;margin-right:20px" ' +
                                'src="'+item.postpic+'">' +
                                '<a href="/detail/'+item._id+'">'+item.posttitle+'</a>' +
                                '<br><span><i class="fa fa-comment-o"></i>'+item.comment_count+'<i style="margin-left:5px" class="fa fa-calendar"></i>'+FormatDate(item.createAt)+'</span>                                </div>';
                        $(target).append(html);
                    })
                }
                else{
                    alert('请求失败！发生错误');
                }
            })

        }
        else{

        }

    });

    $('.load').click(function () {
        load();
    });
    //显示信息  首页看帖
    $(document).on("click",".showinfo",function(){
        $('.barrage').remove();
        $(this).prev().slideToggle("slow");//按钮组
        var target = $(this).parents(".latestpost");
        target.toggleClass("active");
        var abstract = $(this).parent().parent().next().children(".abstract");
        abstract.slideToggle("slow");
        var postbody = abstract.next();
        var postid = $(this).attr("postid");
        if(!postbody.html()){
            $.ajax({
                type: 'get',
                url: 'ajax_getpostbody?postid='+postid+'&&comment=yes',
                cache: false,
                async : false,
                dataType: 'json',//使用json数据将不支持跨域 需要修改为jsonp
                crossDomain: true,
                json: 'callback',
                timeout: 6000,
                error: function (err) {
                    alert("获取失败 请重试");
                },
                beforeSend:function () {

                },
                success: function (data) {
                    if(data){
                        postbody.html(data.postbody);
                        if(data.comments){
                            //每条弹幕发送间隔
                            var looper_time=2*1000;
//弹幕总数
                            var total=data.length;
//是否首次执行
                            var run_once=true;
//弹幕索
                            var index=0;
//先执行一次
                            barrager();

                            function  barrager(){


                                if(run_once){
                                    //如果是首次执行,则设置一个定时器,并且把首次执行置为false
                                    looper=setInterval(barrager,looper_time);
                                    run_once=false;
                                }
                                //发布一个弹幕
                                // run_example(postbody,{'img':data.comments[index].from.profile.picture,'info':data.comments[index].content.replace(/<\/?.+?>/gi,"")});
                                postbody.barrager({'img':data.comments[index].from.profile.picture,'info':data.comments[index].content.replace(/<\/?.+?>/gi,"")});
                                //索引自增
                                index++;
                                //所有弹幕发布完毕，清除计时器。
                                if(index == total){
                                    clearInterval(looper);
                                    return false;
                                }
                            }
                        }
                    }
                    else{

                    }
                },
                complete: function(msg) {

                }
            });
        }
        postbody.slideToggle("slow");        
        // var pos = target.offset().top+50;
        // $("html").animate({scrollTop: pos}, 1000);
    });

    $(document).on("click",".abstract span",function(){
        $('.barrage').remove();
       
        var abstract = $(this).parents(".abstract");
        var showinfo = abstract.parent().prev().find(".showinfo");
        showinfo.prev().slideToggle("slow");//按钮组


        var postbody = abstract.next();
        var postid = $(this).attr("postid");
        if(!postbody.html()){
            $.ajax({
                type: 'get',
                url: 'ajax_getpostbody?postid='+postid+'&&comment=yes',
                cache: false,
                async : false,
                dataType: 'json',//使用json数据将不支持跨域 需要修改为jsonp
                crossDomain: true,
                json: 'callback',
                timeout: 6000,
                error: function (err) {
                    alert("获取失败 请重试");
                },
                beforeSend:function () {

                },
                success: function (data) {
                    if(data){
                        postbody.html(data.postbody);
                        if(data.comments){
                            //每条弹幕发送间隔
                            var looper_time=2*1000;
//弹幕总数
                            var total=data.length;
//是否首次执行
                            var run_once=true;
//弹幕索
                            var index=0;
//先执行一次
                            barrager();

                            function  barrager(){


                                if(run_once){
                                    //如果是首次执行,则设置一个定时器,并且把首次执行置为false
                                    looper=setInterval(barrager,looper_time);
                                    run_once=false;
                                }
                                //发布一个弹幕
                                postbody.barrager({'img':data.comments[index].from.profile.picture,'info':data.comments[index].content.replace(/<\/?.+?>/gi,"")});
                                //索引自增
                                index++;
                                //所有弹幕发布完毕，清除计时器。
                                if(index == total){
                                    clearInterval(looper);
                                    return false;
                                }
                            }
                        }
                    }
                    else{

                    }
                },
                complete: function(msg) {

                }
            });
        }
        abstract.slideToggle("slow");
        postbody.slideToggle("slow");

    });
    //投票
    $(document).on("click",".vote",function(){
        var target = $(this);
        var another_target = target.siblings("button");
        var count = target.find('i').first().html();
        var another_count = another_target.find('i').first().html();
        var type = $(this).attr('type');
        var userid = $('#userid').html();
        var postid = $(this).attr('postid');
        if (!userid) {
            //模态框登录
            $('.theme-popover-mask').fadeIn(100);
            $('.theme-popover').slideDown(200);
        }
        else {
            var result = vote(postid, type);

            if (result.inc) {
                target.find('i').first().html(Number(count) + 1);
            }
            if (result.dec) {
                another_target.find('i').first().html(Number(another_count) - 1);
            }
        }
    });

    //格式化时间
    function FormatDate (strTime) {
        var date = new Date(strTime);
        return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
    }
    
    //滚动检测 视觉差
    var start = 1200;
    function parallaxScroll() {
        var scrolled = $(window).scrollTop();

        if (scrolled > start) {
            addImage();
            start = start + scrolled;
        }

        $('#parallax-bg1').css('top', (0 - (scrolled * .25)) + 'px');
        $('#parallax-bg2').css('top', (0 - (scrolled * .5)) + 'px');
        //$('#parallax-bg3').css('top', (0 - (scrolled * .75)) + 'px');
    }
    parallaxScroll();
    //添加图片
    function addImage() {
        var image2 = '<img class="bg2-1" src="/images/cloud-lg1.png" alt="白云追加" style="top:' + (start + 150) + 'px">';
        image2 += '<img class="bg2-2" src="/images/cloud-lg1.png" alt="白云追加" style="top:' + (start + 300) + 'px">';
        image2 += '<img class="bg2-3" src="/images/cloud-lg1.png" alt="白云追加" style="top:' + (start + 543) + 'px">';
        image2 += '<img class="bg2-4" src="/images/cloud-lg1.png" alt="白云追加" style="top:' + (start + 1180) + 'px">';
        image2 += '<img class="bg2-5" src="/images/cloud-lg1.png" alt="白云追加" style="top:' + (start + 900) + 'px">';
        $('#parallax-bg2').append(image2);
        var image = '<img class="bg1-1" src="/images/cloud-lg2.png" alt="白云追加" style="top:' + (start - 270) + 'px">';
        image += '<img class="bg1-2" src="/images/cloud-lg2.png" alt="白云追加" style="top:' + (start + 440) + 'px">';
        image += '<img class="bg1-3" src="/images/cloud-lg2.png" alt="白云追加" style="top:' + (start + 900) + 'px">';
        image += '<img class="bg1-4" src="/images/cloud-lg2.png" alt="白云追加" style="top:' + (start + 1020) + 'px">';
        $('#parallax-bg1').append(image);
    }


    var slider = $(".slider-slide");
    var column =[{typeId:"latest",page:2,number:6}];
    var col = {
        typeId:"id",
        page:1,
        number:6
    };

    for(var i=1;i<slider.length;i++){
        col.typeId = slider[i].getAttribute("id");
        column.push({"typeId":col["typeId"],"page":col["page"],"number":col["number"]});
    }


    var red = blue = green = 255 ;
    $(window).scroll(function () {
        var targetR = 230;
        var targetG = 230;
        var targetB = 230;
        var targetA = 0.8;
        var scrollTop = $(document).scrollTop();
        //phone
        var nav = $(".column");
        var navtoTop =$("article").offset().top;
        var pos = (scrollTop+40)/navtoTop;
        if(pos>=1){
            pos=1;
            nav.css({"position":"fixed","top":0,"width":"100%","z-index":2});
        }
        else {
            // console.log("yes")
            nav.css({"position":"absolute","top":0});
        }

        red = Math.ceil(targetR / pos);
        green =Math.ceil(targetG / pos) ;
        blue = Math.ceil(targetB / pos) ;


        //到达底部加载xinneirong
        var windowHeight = $(window).height();
        var documentHeight = $(document).height();

        if(scrollTop >= (documentHeight-windowHeight)){
            var index = $(".slider-wrapper .active").index();
            var targetId = column[index].typeId;
            var number = column[index].number;
            var page = column[index].page;
            if(load(targetId,number,page)){
                column[index].page++;
            }
        }
    });

    //load 加载新内容
    function load(target,number,page) {
        var result = false;
        $(".load").html("正在加载中");
        // setTimeout(ajax(), 2000 );
        // function ajax() {
        //     $.ajax({
        //         type: 'get',
        //         url: 'getpost?number=' +number+ ' &&page=' +page ,
        //         cache: false,
        //         dataType: 'json',//使用json数据将不支持跨域 需要修改为jsonp
        //         crossDomain: true,
        //         json: 'callback',
        //         timeout: 2000,
        //         error: function (err) {
        //             console.log(err);
        //         },
        //         beforeSend:function () {
        //             $('.loading').removeClass('hidden');
        //         },
        //         success: function (data) {
        //             console.log(data);
        //             if(data){
        //                 for(var i=0;i<data.posts.length;i++){
        //                     var html = '';
        //                     html += ' <li class="latestpost">';
        //                     html +=  '<div class="col-md-1 col-xs-2">';
        //                     html += '<div class="username"><img src="'+data.posts[i].userId.profile.picture+'"></div>'
        //                     html += '<div class="info">';
        //                     html += ' <button postid="'+data.posts[i]._id+'" type="genius" class="vote rippler"><i class="fa fa-thumbs-up">'+data.posts[i].crazy_count+'</i></button>';
        //                     html += '<button postid="'+data.posts[i]._id+'" type="crazy" class="vote rippler"><i class="fa fa-thumbs-down">'+data.posts[i].genius_count+'</i></button>';
        //                     html += ' <div style="display:none" class="hidemenu">';
        //                     html += ' <button class="rippler"><i class="fa fa-eye">'+data.posts[i].pv+'</i></button>';
        //                     html += ' <button class="rippler"><i class="fa fa-comments">'+data.posts[i].comment_count+'</i></button>';
        //                     html += ' <button class="rippler"><i class="fa fa-share-alt"></i></button>';
        //                     html += '  </div>';
        //                     html += '  <button style="margin-top:5px" postid="'+data.posts[i]._id+'" class="showinfo rippler"><i class="fa fa-angle-double-down"></i></button>';
        //                     html += ' </div></div>';
        //                     html += ' <div style="padding-left:5px;height:100%;" class="col-md-11 col-xs-10">';
        //                     html += ' <div class="tag">';
        //
        //                     html += '  <a href="/tagsview?tag=jQuery 待解决" style="background-color:#EFF6FA;border-radius:3px;margin:0 3px;padding:2px"> jQuery 待解决</a><a href="/tagsview?tag=写法" style="background-color:#EFF6FA;border-radius:3px;margin:0 3px;padding:2px"> 写法</a>';
        //
        //                     html += ' <i style="float:right" class="fa fa-angle-down"></i>';
        //                     html += ' </div>';
        //                     html += '  <a href="/detail/'+data.posts[i]._id+'" class="posttitle">'+data.posts[i].posttitle+'</a>';
        //                     html += ' <div class="abstract"><span postid="'+data.posts[i]._id+'" class="rippler">'+data.posts[i].abstract+'...</span><a href="/detail/'+data.posts[i]._id+'" class="more"><i class="fa fa-long-arrow-right">查看全部</i></a></div>';
        //                     html += '  <div class="postbody"></div>';
        //                     html += '  </div>';
        //                     html += '  <div class="corner"></div>';
        //                     html += ' </li>';
        //                     target.after(html);
        //                 }
        //                 result = true;
        //             }
        //             else{
        //                 $('.nodata').removeClass('hidden');
        //             }
        //         },
        //         complete: function(msg) {
        //             $('.loading').addClass('hidden');
        //             $('.load').html("加载更多...");
        //         }
        //     });
        //     return result;
        // }

        $.ajax({
            type: 'get',
            url: 'getpost?number=' +number+ ' &&page=' +page+'&&type='+target ,
            cache: false,
            dataType: 'json',//使用json数据将不支持跨域 需要修改为jsonp
            crossDomain: true,
            json: 'callback',
            timeout: 2000,
            async:false,//如果没这句 表示异步 则return 无效
            error: function (err) {
                console.log(err);
                result = false;
            },
            beforeSend:function () {
                $('.loading').removeClass('hidden');
            },
            success: function (data) {
                console.log(data);
                if(data){
                    for(var i=0;i<data.posts.length;i++){
                        var html = '';
                        html += ' <li class="latestpost">';
                        html +=  '<div class="col-md-1 col-xs-2">';
                        html += '<div class="username"><img src="'+data.posts[i].userId.profile.picture+'"></div>'
                        html += '<div class="info">';
                        html += ' <button postid="'+data.posts[i]._id+'" type="genius" class="vote rippler"><i class="fa fa-thumbs-up">'+data.posts[i].crazy_count+'</i></button>';
                        html += '<button postid="'+data.posts[i]._id+'" type="crazy" class="vote rippler"><i class="fa fa-thumbs-down">'+data.posts[i].genius_count+'</i></button>';
                        html += ' <div style="display:none" class="hidemenu">';
                        html += ' <button class="rippler"><i class="fa fa-eye">'+data.posts[i].pv+'</i></button>';
                        html += ' <button class="rippler"><i class="fa fa-comments">'+data.posts[i].comment_count+'</i></button>';
                        html += ' <button class="rippler"><i class="fa fa-share-alt"></i></button>';
                        html += '  </div>';
                        html += '  <button style="margin-top:5px" postid="'+data.posts[i]._id+'" class="showinfo rippler"><i class="fa fa-angle-double-down"></i></button>';
                        html += ' </div></div>';
                        html += ' <div style="padding-left:5px;height:100%;" class="col-md-11 col-xs-10">';
                        html += ' <div class="tag">';

                        html += '  <a href="/tagsview?tag=jQuery 待解决" style="background-color:#EFF6FA;border-radius:3px;margin:0 3px;padding:2px"> jQuery 待解决</a><a href="/tagsview?tag=写法" style="background-color:#EFF6FA;border-radius:3px;margin:0 3px;padding:2px"> 写法</a>';

                        html += ' <i style="float:right" class="fa fa-angle-down"></i>';
                        html += ' </div>';
                        html += '  <a href="/detail/'+data.posts[i]._id+'" class="posttitle">'+data.posts[i].posttitle+'</a>';
                        html += ' <div class="abstract"><span postid="'+data.posts[i]._id+'" class="rippler">'+data.posts[i].abstract+'...</span><a href="/detail/'+data.posts[i]._id+'" class="more"><i class="fa fa-long-arrow-right">查看全部</i></a></div>';
                        html += '  <div class="postbody"></div>';
                        html += '  </div>';
                        html += '  <div class="corner"></div>';
                        html += ' </li>';
                        $("#"+target).find("ul li:last").after(html);
                    }
                    result = true;
                }
                else{
                    $('.nodata').removeClass('hidden');
                }
            },
            complete: function(msg) {
                $('.loading').addClass('hidden');
                $('.load').html("加载更多...");
            }
        });
        return result;

    }

    
    //随机获取颜色值
    function getReandomColor(){
        console.log("color");
        return '#'+(function(h){
                    return new Array(7-h.length).join("0")+h
                })((Math.random()*0x1000000<<0).toString(16))
    }

//生成随机数据。n表示位数
    var jschars = ['0','1','2','3','4','5','6','7','8','9'];
    function generateMixed(n) {
        console.log("data")
        var res = "";
        for(var i = 0; i < n ; i ++) {
            var id = Math.ceil(Math.random()*9);
            res += jschars[id];
        }
        return res;
    }


    //
    $('.rippler').ripple({ color: 'rgba(239,228,176,0.7)' });
    //用户信息加载
    // $(".username").hover(function () {
    //             $(this).children(".userinfo").css("display","block");
    //         },
    //         function () {
    //             $(this).children(".userinfo").css("display","none");
    //         });
    // $(".username a").click(function () {
    //     $(this).parent().css("display","none");
    // });
    //banner 图片clip
    $(".twentytwenty-container[data-orientation!='vertical']").twentytwenty({default_offset_pct: 0.5});


    /*==========
     滑动页
     ===========*/
    var carouselPage;
    function initSlider() {
        carouselPage = new Slider("#slider-container", {
            "onSlideChangeEnd": function (e) {
                tabActive(e.index);
                //$("html,body").animate({scrollTop:200});
                loadcolunm(e.index);
            }
        });
    }
    /*==========
     页签
     ===========*/
    var tabbar = document.getElementById("tabbar");
    var tab = tabbar.querySelectorAll(".tab");
    //选中tab
    function tabActive(index) {
        for (var i = 0, t; t = tab[i++];) {
            t.classList.remove("active");
        }
        tab[index].classList.add("active");
    }
    //初始化tabbar
    function initTabbar() {
        for (var i = 0, t; t = tab[i++];) {
            (function (i) {
                t.addEventListener("click", function () {
                    carouselPage.slideTo(i - 1);
                    tabActive(i - 1);
                }, false);
            })(i);
        }
    }

    //加载内容
    function loadcolunm(index) {
        var slider = $(".slider-slide")[index];
        var id = slider.getAttribute("id");
        var content = $("#"+id).find("li");
        if(content.length<2){
            if(load(id,column[index].number,column[index].page)){
                column[index].page++;
            }
        }
    }
    /*==========
     下拉刷新
     ===========*/
    function initDrag() {
        var drag = new Dragrefresh(carouselPage.slides[0], {
            "onRefreshStart": function (e) {
                setTimeout(function () {
                    e.refreshComplete();
                }, 2000);
            },
            "onRefreshEnd": function (e) {
                console.log("刷新完成");
            },
            "onBottom": function (e) {
                console.log("滚动到底部啦");
                //数据加载完成时，隐藏下面的元素
                //$(".latest").after("<div>dibu</div>");
                setTimeout(function () {
                    e.bottomRefreshEl.style.display = "none";
                }, 5000);
            }
        });
    }
    window.addEventListener("load", function () {
        initSlider();
        initTabbar();
        //initDrag();
    }, false);

});
