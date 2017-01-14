var userid = $('#userid').html();
var postid = $('#postid').html();
$('.vote').click(function () {
    var target = $(this);
    var another_target = target.siblings("a");
    var count = target.find('span').first().html();
    var another_count = another_target.find('span').first().html();
    var type = $(this).attr('type');
    if (!userid) {
        //模态框登录
        $('.theme-popover-mask').fadeIn(100);
        $('.theme-popover').slideDown(200);
    }
    else {
        var result = vote(postid,type);

        if(result.inc){
            target.find('span').first().html(Number(count) + 1);
        }
        if(result.dec){
            another_target.find('span').first().html(Number(another_count)-1);
        }
    }
});
$('.like').click(function () {
    var like_count = $('.like span').html();
    //alert('like count is'+like_count);
    if (!userid) {
        //模态框登录
        $('.theme-popover-mask').fadeIn(100);
        $('.theme-popover').slideDown(200);
    }
    else {
        $.ajax({
            url: "/post/like/?postid="+postid,
            cache: false,
            type: "get",
            error: function () {
                console.log("error")
                alert('发生了错误！');
            },
            success: function (e) {
                console.log('success');
                if(e.like){
                    console.log('the like is '+e.like);
                    $('.like span').html(Number(like_count)+1);
                    $('.heart').addClass("heartAnimation")//有待解决 布局问题
                }
                if(e.dislike){
                    console.log('the dislike is '+e.dislike);
                    $('.like span').html(Number(like_count)-1);
                    $('.heart').removeClass("heartAnimation")//有待解决 布局问题
                }
            }
        })
    }
});
$('.agree').click(function () {
    var target = $(this);
    var commentid = target.attr('commentid');
    var agree_count =target.children('span').html();
    if(!userid){//模态框登录
        $('.theme-popover-mask').fadeIn(100);
        $('.theme-popover').slideDown(200);alert('登陆后操作');
    }
    else{
        $.ajax({
            url: "/comment/agree/?commentid=" + commentid,
            contentType: "application/json;charset=utf-8",
            cache: false,
            dataType: "json",
            type: "GET",
            success: function (e) {
                if (e.agree) {
                    target.find('span').first().html(Number(agree_count) + 1);
                }
                if(e.disagree){
                    target.find('span').first().html(Number(agree_count) - 1);
                }
                else if(e.err){
                    alert('错误');
                }
            },
            error: function () {
                console.log("error")
                alert('发生了错误！');
            }
        })
    }
});
$('.collect').click(function () {
    if (!userid) {
        //模态框登录
        $('.theme-popover-mask').fadeIn(100);
        $('.theme-popover').slideDown(200);
    }
    else {
        $.ajax({
            url: "/collect?postid=" + postid,
            type: "get",
            error: function (e) {
                console.log("error"+e);
                alert('发生了错误！');
            },
            success: function (e) {
                if (e.collect) {
                    alert('收藏成功！');
                }
            }
        })
    }
});
var pid;
var _csrf;
$(".hf").click(function () {
    _csrf=$("#_csrf").attr("value");
    pid = $(this).attr("name");
    $(".hf").css("padding-bottom", "10px");
    $("#comment2").remove();
    //$(".huif").css({ "top": $(this).offset().top, "display": "block" });
    var appentxt = '<form  class="huif" id="comment2" method="POST"  action="/comment">' +
            '<input type="hidden" name="_csrf" value='+_csrf+'>' +
            '<textarea placeholder="回复" name="comment[content]" id="commentForm2" style="border-radius:5px;height:100px; width:100%;border-top: 1px solid #ebebeb;">' +
            '</textarea><input type="hidden" name="comment[post]" value='+postid+'><button type="submit"  class="btn btn-primary top10">回复</button><a class="qxhf" onclick="qx()">取消回复</a></form>';
    var addtext = '';
    $(this).parent().parent().after(appentxt);
    var target = $(this);//this 自身的dom节点
    var toId = target.data('tid');
    var commentId = target.data('cid');
    //alert(commentId+"and"+toId);
    if ($('#toId').length > 0) {
        $('#toId').val(toId)
    }
    else {
        $('<input>').attr({
            type: 'hidden',
            id: 'toId',
            name: 'comment[tid]',
            value: toId
        }).appendTo('#comment2')
    }
    if ($('#commentId').length > 0) {
        $('#commentId').val(commentId)
    }
    else {
        $('<input>').attr({
            type: 'hidden',
            id: 'commentId',
            name: 'comment[cid]',
            value: commentId
        }).appendTo('#comment2')//追加
    }
    $('#commentForm2').attr("placeholder", "在此留言回复");
});
function qx() {
    $(".hf").css("padding-bottom", "10px");
    $(".huif").css("display", "none");
    $("#comment2").remove();
}
function hftj() {
    var jhf = document.getElementById("textarea2").value;
    jhf = jhf.replace(/<[\\S\s]*?\1>|<\/?(a|img)[^>]*>/gi, "");
    var hfHTML = encodeURIComponent(jhf);
    if (hfHTML.length > 5) {
        var h = $.ajax({
            type: 'post',
            url: 'fyadd.aspx',
            data: {yy: pid, nr: hfHTML, ww: a},
            cache: false,
            dataType: 'text',
            success: function (data) {
                if (data == "y") {
                    window.location.reload();
                } else {
                    $("#err2").css("display", "block");
                    $("#err2").addClass("dou2");
                }
            },
            error: function () {
            }
        });
    }
}


function doZoom(target,size){
    document.getElementById(target).style.fontSize=size+'pt'
}