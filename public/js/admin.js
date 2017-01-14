//被压缩了两份大小

$(function () {
    $(".del").on("click", function () {
        var $a = $(this), parent = ($a.attr("data-id"), $a.closest("tr"));
        parent.remove()
    })
});