//for all
$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();

    var todocumentheight = $(document).scrollTop();//获取垂直滚动的距离 即当前滚动的地方的窗口顶端到整个页面顶端的距离
    var height_navbar = $('.navbar').outerHeight();
    //导航 滚动检测  youdai gajin shifou yishang jiu yao chuxian
    $(window).scroll(function() {
        var todocumentrealtime = $(document).scrollTop();
        // 下拉
        if (todocumentrealtime > height_navbar){$('.navbar').addClass('-top');}
        //上滑
        else {$('.navbar').removeClass('-top');

        }
        //下走
        if (todocumentrealtime > todocumentheight){

            $('.navbar').removeClass('top0');//chuxian


            if(todocumentrealtime>1200){
                $(".backtop").css({"display":"block"});
            }
            else{
                $(".backtop").css({"display":"hidden"});
            }
        }
        //上滑
        else if(todocumentrealtime<=50) {$('.navbar').addClass('top0');}
        todocumentheight = $(document).scrollTop();
    });


    var p = $(window), v = $("body").outerHeight();
    var g = $(".scroll"), w = g.find(".toTop"), b = g.find(".toBotm"), y = null;

    window.onscroll = function () {

        var e = p.scrollTop();
        if(e >= 300){
            g.addClass("scroll-show")
            g.addClass("backred")
        }
        e >= 300 && g.addClass("scroll-show"), 110 >= e && g.removeClass("scroll-show")
    };
    b.hover(function () {
        var e = p.scrollTop();
        y = setInterval(function () {
            e++,
            $("body").outerHeight() - p.height() <= e && clearInterval(y),
            p.scrollTop(e)
        }, 30)
    },   function () {
        clearInterval(y)
    }).click(function () {
        clearInterval(y);
        $("html,body").animate({scrollTop:$("body").outerHeight() - p.height() + 250});
        //p.scrollTop($("body").outerHeight() - p.height() + 250)
    });
    w.hover(function () {
        var e = p.scrollTop();
        y = setInterval(function () {
            e--, 0 >= e && clearInterval(y), p.scrollTop(e)
        }, 30)
    }, function () {
        clearInterval(y)
    }).click(function () {
        clearInterval(y);
        $("html,body").animate({scrollTop:0});
    });


    //phone
    $(".backtop").click(function () {
        $(this).css({"display":"none"});
        $("html,body").animate({scrollTop:0});
    });

    $('.micmenubtn').click(function () {
        $('.micmenu').slideToggle('slow');
    });


    //登录模态框
    $('.theme-login').click(function(){
        $('.theme-popover-mask').fadeIn(100);
        $('.theme-popover').slideDown(200);
    });
    $('.theme-poptit .close,.theme-popover-mask').click(function(){

        $('.theme-popover-mask').fadeOut(100);
        $('.theme-popover').slideUp(200);
    });
    //login end

    //图片查看器
    var clicked = {};

    function showModal(){

        var src = $(this).attr('src').replace(/\?imageView.+/gi,"");
        var img = '<img src="' + src + '" class="img-responsive"/>';
        var index = $(this).parent('li').attr('data-index');

        clicked.prevImg = parseInt(index) - parseInt(1);
        clicked.nextImg = parseInt(index) + parseInt(1);

        var html = '';
        html += img;
        html += '<div style="height:25px;clear:both;display:block;">';
        html += '<a class="controls next" href="'+ (clicked.nextImg) + '">下一张 &raquo;</a>';
        html += '<a class="controls previous" href="' + (clicked.prevImg) + '">&laquo; 上一张</a>';
        html += '</div>';

        $('#myModal').modal();
        $('#myModal').on('shown.bs.modal', function(){
            $('#myModal .modal-body').html(html);
            showHideControls();
        })
        $('#myModal').on('hidden.bs.modal', function(){
            $('#myModal .modal-body').html('');
        });
    }

    function nextPrevHandler(){

        var index = $(this).attr('href');
        var src = $('li[data-index="'+index+'"] img').attr('src');

        $('.modal-body img').attr('src', src);

        clicked.prevImg = parseInt(index) - 1;
        clicked.nextImg = parseInt(clicked.prevImg) + 2;

        if($(this).hasClass('previous')){
            $(this).attr('href', clicked.prevImg);
            $('a.next').attr('href', clicked.nextImg);
        }else{
            $(this).attr('href', clicked.nextImg);
            $('a.previous').attr('href', clicked.prevImg);
        }

        showHideControls();

        return false;

    }

    function showHideControls(){

        var total = ($('li').not('.clearfix').length);

        if(total === clicked.nextImg){
            $('a.next').hide();
        }else{
            $('a.next').show()
        }

        if(clicked.prevImg === -1){
            $('a.previous').hide();
        }else{
            $('a.previous').show()
        }
    }

    $(this).on('click', 'a.controls', nextPrevHandler);
    $('li').not('.clearfix').each(function(i){
        $(this).attr('data-index',i);
        var img = $(this).find('img');
        img.on('click',showModal);
    });
    //end 图片查看器

});

function vote(postid,type) {
    var result ={"inc":0,"dec":0};
    $.ajax({
        async:false,//需要修改为同步 即当ajax执行结束再执行之后的内容
        url: "/post/vote/?postid=" + postid+'&type='+type,
        contentType: "application/json;charset=utf-8",
        cache: false,
        dataType:"json",
        type: "GET",
        beforeSend:function () {
            //alert('before send');
        },
        success: function (e) {
            //alert(e.change);
            if(e.false){
                alert('提交发生了错误，可能是用户账号错误导致');
            }
            else if (e.change) {
                if(e.inc){
                   result.inc = 1;
                }
                if(e.dec){
                    result.dec =1;
                }
            }
            else{
                alert('已提交');
            }
            return false;
        },
        complete:function () {
            //alert('complete');
        },
        error: function () {
            console.log("error");
            alert('发生了错误！');
        }
    });
    return result;
}
