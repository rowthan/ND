/**
 * Created by rowthan on 2016/6/1 0001.
 */
(function () {
    "use strict";
    !function (e, t) {
        var n = function (e) {
            return new n.Class(e)
        };
        n.config = {
            appID: "/touch/com.163.3g", displayInterval: 0, displayMaxCount: 1 / 0, show: function () {
            }
        };
        var a = window.navigator.userAgent;
        n.defaultLocalValue = {
            lastDisplayTime: 0,
            lastDisplayCount: 0,
            added: !1
        }, n.isIOSDevice = /iphone|ipod|ipad/i.test(a), n.isAndroidChrome = a.indexOf("Android") > -1 && /Chrome\/[.0-9]*/.test(a), n.isMobileSafari = n.isIOSDevice && a.indexOf("Safari") > -1 && a.indexOf("CriOS") < 0, n.isStandalone = window.navigator.standalone || n.isAndroidChrome && screen.height - document.documentElement.clientHeight < 40, n.isCompatible = n.isMobileSafari || n.isAndroidChrome, n.Class = function (e) {
            var a = !0;
            this.config = t.extend(!1, {}, n.config), t.extend(!1, this.config, e), /\?cleartohome/.test(location.search) && this.clearLocal(), n.isCompatible || (a = !1);
            try {
                this.localValue = localStorage.getItem(this.config.appID), this.localValue = this.localValue ? JSON.parse(this.localValue) : void 0, this.localValue = this.localValue || n.defaultLocalValue, localStorage.setItem(this.config.appID, JSON.stringify(this.localValue)), n.hasLocalStorage = !0
            } catch (l) {
                n.hasLocalStorage = !1, this.localValue = n.defaultLocalValue
            }
            n.hasLocalStorage || (a = !1), this.localValue.added && (a = !1), n.isStandalone && (a = !1, this.localValue.added = !0, this.updateLocal()), a || (this.config.show = null)
        }, n.Class.prototype = {
            constructor: n.Class, show: function () {
                var e = Date.now(), t = this.localValue.lastDisplayTime, a = this.localValue.lastDisplayCount, l = this.config.displayInterval;
                if (isNaN(l) || !(l > e - t)) {
                    var i = this.config.displayMaxCount;
                    if (!(!isNaN(i) && a >= i || (this.localValue.lastDisplayTime = e, this.localValue.lastDisplayCount++, this.updateLocal(), "function" != typeof this.config.show))) {
                        var o = "";
                        n.isMobileSafari ? o = "MobileSafari" : n.isAndroidChrome && (o = "AndroidChrome"), this.config.show(o)
                    }
                }
            }, updateLocal: function () {
                n.hasLocalStorage && localStorage.setItem(this.config.appID, JSON.stringify(this.localValue))
            }, clearLocal: function () {
                this.localValue = n.defaultLocalValue, this.updateLocal()
            }
        }, void 0 === e.addToHomeScreen && (e.addToHomeScreen = n)
    }(this.NEWAP, this.Zepto)
}).call(window), function () {
    var e = Handlebars.template, t = Handlebars.templates = Handlebars.templates || {};
    t.joke_doc_tpl = e({
        1: function (e, t, n, a, l) {
            var i, o, s, r = null != t ? t : {}, c = n.helperMissing, h = "function", d = e.escapeExpression, u = '<section class="m_article_joke list-item clearfix" id="' + d((o = null != (o = n.docid || (null != t ? t.docid : t)) ? o : c, typeof o === h ? o.call(r, {
                        name: "docid",
                        hash: {},
                        data: l
                    }) : o)) + '">\r\n    <a ';
            return o = null != (o = n.notIosSafari || (null != t ? t.notIosSafari : t)) ? o : c, s = {
                name: "notIosSafari",
                hash: {},
                fn: e.program(2, l, 0),
                inverse: e.noop,
                data: l
            }, i = typeof o === h ? o.call(r, s) : o, n.notIosSafari || (i = n.blockHelperMissing.call(t, i, s)), null != i && (u += i), u + ' href="' + d((o = null != (o = n.link || (null != t ? t.link : t)) ? o : c, typeof o === h ? o.call(r, {
                name: "link",
                hash: {},
                data: l
            }) : o)) + '" >\r\n        <div class="m_article_info">\r\n' + (null != (i = n["if"].call(r, null != t ? t.digest : t, {
                name: "if",
                hash: {},
                fn: e.program(4, l, 0),
                inverse: e.noop,
                data: l
            })) ? i : "") + (null != (i = (n.isGif || t && t.isGif || c).call(r, null != t ? t.pic_info : t, 0, {
                name: "isGif",
                hash: {},
                fn: e.program(6, l, 0),
                inverse: e.program(8, l, 0),
                data: l
            })) ? i : "") + '        </div>\r\n    </a>\r\n    <div class="m_article_desc clearfix">\r\n        <div class="m_article_desc_l">\r\n            <span class="m_article_time">' + d((n.getDvalueDay || t && t.getDvalueDay || c).call(r, null != t ? t.ptime : t, {
                name: "getDvalueDay",
                hash: {},
                data: l
            })) + '</span>\r\n        </div>\r\n        <div class="m_article_desc_r">\r\n            <span class="iconfont share-joke" data-title="' + d((o = null != (o = n.title || (null != t ? t.title : t)) ? o : c, typeof o === h ? o.call(r, {
                name: "title",
                hash: {},
                data: l
            }) : o)) + '" data-link="' + d((o = null != (o = n.link || (null != t ? t.link : t)) ? o : c, typeof o === h ? o.call(r, {
                name: "link",
                hash: {},
                data: l
            }) : o)) + '" data-img="' + d((n.getone || t && t.getone || c).call(r, null != t ? t.pic_info : t, 0, "url", {
                name: "getone",
                hash: {},
                data: l
            })) + '" data-digest="' + d((o = null != (o = n.digest || (null != t ? t.digest : t)) ? o : c, typeof o === h ? o.call(r, {
                name: "digest",
                hash: {},
                data: l
            }) : o)) + '">&#xe619;</span>\r\n        </div>\r\n    </div>\r\n</section>\r\n'
        }, 2: function (e, t, n, a, l) {
            return 'target="_blank"'
        }, 4: function (e, t, n, a, l) {
            var i;
            return '            <div class="m_article_digest">\r\n                <span>' + e.escapeExpression((i = null != (i = n.digest || (null != t ? t.digest : t)) ? i : n.helperMissing, "function" == typeof i ? i.call(null != t ? t : {}, {
                        name: "digest",
                        hash: {},
                        data: l
                    }) : i)) + "</span>\r\n            </div>\r\n"
        }, 6: function (e, t, n, a, l) {
            var i, o = null != t ? t : {}, s = n.helperMissing, r = e.escapeExpression;
            return '                <div class="m_article_img">\r\n                    <div class="gif_wrap">\r\n                        <div class="play-btn-joke"></div>\r\n                    </div>\r\n                    <img class="js-imghook" src="' + r((n.getone || t && t.getone || s).call(o, null != t ? t.pic_info : t, 0, "url", {
                        name: "getone",
                        hash: {},
                        data: l
                    })) + '" data-ourl="' + r((n.getone || t && t.getone || s).call(o, null != t ? t.pic_info : t, 0, "o_url", {
                        name: "getone",
                        hash: {},
                        data: l
                    })) + '">\r\n                    <div class="m_article_title">\r\n                        <span>' + r((i = null != (i = n.title || (null != t ? t.title : t)) ? i : s, "function" == typeof i ? i.call(o, {
                        name: "title",
                        hash: {},
                        data: l
                    }) : i)) + "</span>\r\n                    </div>\r\n                </div>\r\n"
        }, 8: function (e, t, n, a, l) {
            var i, o, s = null != t ? t : {}, r = n.helperMissing, c = e.escapeExpression;
            return '                <div class="m_article_img">\r\n                    <img class="js-imghook" src="' + c((n.getone || t && t.getone || r).call(s, null != t ? t.pic_info : t, 0, "url", {
                        name: "getone",
                        hash: {},
                        data: l
                    })) + '" data-ourl="' + c((n.getone || t && t.getone || r).call(s, null != t ? t.pic_info : t, 0, "o_url", {
                        name: "getone",
                        hash: {},
                        data: l
                    })) + '">\r\n                    <div class="m_article_title">\r\n                        <span>' + c((o = null != (o = n.title || (null != t ? t.title : t)) ? o : r, "function" == typeof o ? o.call(s, {
                        name: "title",
                        hash: {},
                        data: l
                    }) : o)) + "</span>\r\n                    </div>\r\n                </div>\r\n" + (null != (i = (n.isExtraHigh || t && t.isExtraHigh || r).call(s, null != t ? t.pic_info : t, 0, {
                        name: "isExtraHigh",
                        hash: {},
                        fn: e.program(9, l, 0),
                        inverse: e.noop,
                        data: l
                    })) ? i : "")
        }, 9: function (e, t, n, a, l) {
            return '                    <div class="more">\u70b9\u51fb\u5c55\u5f00<span class="iconfont">&#xe60e;</span></div>\r\n'
        }, 11: function (e, t, n, a, l) {
            var i, o, s, r = null != t ? t : {}, c = n.helperMissing, h = "function", d = e.escapeExpression, u = '<section class="m_article_joke list-item clearfix" id="' + d((o = null != (o = n.docid || (null != t ? t.docid : t)) ? o : c, typeof o === h ? o.call(r, {
                        name: "docid",
                        hash: {},
                        data: l
                    }) : o)) + '">\r\n    <a ';
            return o = null != (o = n.notIosSafari || (null != t ? t.notIosSafari : t)) ? o : c, s = {
                name: "notIosSafari",
                hash: {},
                fn: e.program(2, l, 0),
                inverse: e.noop,
                data: l
            }, i = typeof o === h ? o.call(r, s) : o, n.notIosSafari || (i = n.blockHelperMissing.call(t, i, s)), null != i && (u += i), u + ' href="' + d((o = null != (o = n.link || (null != t ? t.link : t)) ? o : c, typeof o === h ? o.call(r, {
                name: "link",
                hash: {},
                data: l
            }) : o)) + '" >\r\n        <div class="m_article_info">\r\n' + (null != (i = n["if"].call(r, null != t ? t.digest : t, {
                name: "if",
                hash: {},
                fn: e.program(4, l, 0),
                inverse: e.noop,
                data: l
            })) ? i : "") + '        </div>\r\n    </a>\r\n    <div class="m_article_desc clearfix">\r\n        <div class="m_article_desc_l">\r\n            <span class="m_article_time">' + d((n.getDvalueDay || t && t.getDvalueDay || c).call(r, null != t ? t.ptime : t, {
                name: "getDvalueDay",
                hash: {},
                data: l
            })) + '</span>\r\n        </div>\r\n        <div class="m_article_desc_r">\r\n            <span class="iconfont share-joke" data-title="' + d((o = null != (o = n.title || (null != t ? t.title : t)) ? o : c, typeof o === h ? o.call(r, {
                name: "title",
                hash: {},
                data: l
            }) : o)) + '" data-link="' + d((o = null != (o = n.link || (null != t ? t.link : t)) ? o : c, typeof o === h ? o.call(r, {
                name: "link",
                hash: {},
                data: l
            }) : o)) + '" data-img="http://img2.cache.netease.com/f2e/wap/common/images/weixinfixed.png" data-digest="' + d((o = null != (o = n.digest || (null != t ? t.digest : t)) ? o : c, typeof o === h ? o.call(r, {
                name: "digest",
                hash: {},
                data: l
            }) : o)) + '">&#xe619;</span>\r\n        </div>\r\n    </div>\r\n</section>\r\n'
        }, compiler: [7, ">= 4.0.0"], main: function (e, t, n, a, l) {
            var i;
            return null != (i = (n.hasimg || t && t.hasimg || n.helperMissing).call(null != t ? t : {}, null != t ? t.pic_info : t, {
                name: "hasimg",
                hash: {},
                fn: e.program(1, l, 0),
                inverse: e.program(11, l, 0),
                data: l
            })) ? i : ""
        }, useData: !0
    }), t.module_ui_auto_link_tpl = e({
        compiler: [7, ">= 4.0.0"], main: function (e, t, n, a, l) {
            return '<section class="module_ui list-item link_auto">\r\n    <ul class="link_list_auto">\r\n        <li class="listinauto">\r\n            <a href="http://auto.3g.163.com/?from=3gwap">\r\n                <div class="wholeauto"></div>\r\n                <div class="info">\u6c7d\u8f66\u5927\u5168</div>\r\n            </a>\r\n        </li>\r\n        <li class="listinauto">\r\n            <a href="http://auto.3g.163.com/zhinan?from=3gwap#3g001">\r\n                <div class="buyauto"></div>\r\n                <div class="info">\u8d2d\u8f66\u6307\u5357</div>\r\n            </a>\r\n        </li>\r\n        <li class="listinauto">\r\n            <a href="http://auto.163.com/special/inn/m_in_index.html?cxgc02&from=3gwap">\r\n                <div class="innovateauto"></div>\r\n                <div class="info">\u521b\u65b0\u5de5\u5382</div>\r\n            </a>\r\n        </li>\r\n    </ul>\r\n</section>'
        }, useData: !0
    }), t.module_ui_flower_tpl = e({
        compiler: [7, ">= 4.0.0"], main: function (e, t, n, a, l) {
            return '<div class="ani-flower">\r\n    <div class="petal petal1"></div>\r\n    <div class="petal petal2"></div>\r\n    <div class="petal petal3"></div>\r\n    <div class="petal petal4"></div>\r\n    <div class="petal petal5"></div>\r\n</div>'
        }, useData: !0
    }), t.module_ui_idol_box_tpl = e({
        1: function (e, t, n, a, l) {
            var i, o = null != t ? t : {};
            return "                \u6210\u5458\uff1a" + e.escapeExpression((n.intercept || t && t.intercept || n.helperMissing).call(o, null != t ? t.groupMember : t, 3, {
                        name: "intercept",
                        hash: {},
                        data: l
                    })) + "<br/>\r\n                " + (null != (i = n["if"].call(o, null != t ? t.represent : t, {
                        name: "if",
                        hash: {},
                        fn: e.program(2, l, 0),
                        inverse: e.program(4, l, 0),
                        data: l
                    })) ? i : "")
        }, 2: function (e, t, n, a, l) {
            return "\u4ee3\u8868\u4f5c\uff1a" + e.escapeExpression((n.intercept || t && t.intercept || n.helperMissing).call(null != t ? t : {}, null != t ? t.represent : t, 3, {
                        name: "intercept",
                        hash: {},
                        data: l
                    })) + "\r\n                "
        }, 4: function (e, t, n, a, l) {
            var i;
            return (null != (i = n["if"].call(null != t ? t : {}, null != t ? t.appellation : t, {
                        name: "if",
                        hash: {},
                        fn: e.program(5, l, 0),
                        inverse: e.noop,
                        data: l
                    })) ? i : "") + "\r\n"
        }, 5: function (e, t, n, a, l) {
            var i;
            return "\u7c89\u4e1d\u79f0\u8c13\uff1a" + e.escapeExpression((i = null != (i = n.appellation || (null != t ? t.appellation : t)) ? i : n.helperMissing, "function" == typeof i ? i.call(null != t ? t : {}, {
                        name: "appellation",
                        hash: {},
                        data: l
                    }) : i))
        }, 7: function (e, t, n, a, l) {
            var i, o = null != t ? t : {}, s = n.helperMissing, r = e.escapeExpression;
            return "                \u51fa\u751f\u65e5\u671f\uff1a" + r((i = null != (i = n.birthdayData || (null != t ? t.birthdayData : t)) ? i : s, "function" == typeof i ? i.call(o, {
                        name: "birthdayData",
                        hash: {},
                        data: l
                    }) : i)) + "<br/>\r\n                \u4eba\u7269\u4fe1\u606f\uff1a" + r((n.getIdolInfo || t && t.getIdolInfo || s).call(o, t, {
                        name: "getIdolInfo",
                        hash: {},
                        data: l
                    })) + "\r\n"
        }, 9: function (e, t, n, a, l) {
            var i;
            return '        <div class="add-idol-wrap" data-id="' + e.escapeExpression((i = null != (i = n.id || (null != t ? t.id : t)) ? i : n.helperMissing, "function" == typeof i ? i.call(null != t ? t : {}, {
                        name: "id",
                        hash: {},
                        data: l
                    }) : i)) + '"><span class="iconfont add-idol">&#xe61f;</span></div>\r\n'
        }, compiler: [7, ">= 4.0.0"], main: function (e, t, n, a, l) {
            var i, o, s = null != t ? t : {}, r = n.helperMissing, c = "function", h = e.escapeExpression;
            return '<div class="idol_box">\r\n    <div class="idol_box_wrap" style="background: url(' + h((o = null != (o = n.profile || (null != t ? t.profile : t)) ? o : r, typeof o === c ? o.call(s, {
                        name: "profile",
                        hash: {},
                        data: l
                    }) : o)) + ') no-repeat;background-size: contain;">\r\n    </div>\r\n    <div class="idol_info_desc">\r\n        <div class="idol_sp_info">\r\n            <div class="name">' + h((o = null != (o = n.name || (null != t ? t.name : t)) ? o : r, typeof o === c ? o.call(s, {
                        name: "name",
                        hash: {},
                        data: l
                    }) : o)) + '</div>\r\n            <div class="info">\r\n' + (null != (i = n["if"].call(s, null != t ? t.groupStatus : t, {
                        name: "if",
                        hash: {},
                        fn: e.program(1, l, 0),
                        inverse: e.program(7, l, 0),
                        data: l
                    })) ? i : "") + '            </div>\r\n        </div>\r\n        <div class="idol_vote_info">\r\n            <div class="rank">TOP&nbsp;' + h((o = null != (o = n.currentRank || (null != t ? t.currentRank : t)) ? o : r, typeof o === c ? o.call(s, {
                        name: "currentRank",
                        hash: {},
                        data: l
                    }) : o)) + '</div>\r\n            <div class="count">' + h((o = null != (o = n.voteCount || (null != t ? t.voteCount : t)) ? o : r, typeof o === c ? o.call(s, {
                        name: "voteCount",
                        hash: {},
                        data: l
                    }) : o)) + '\u6735</div>\r\n            <div class="flower"><img src="http://img2.cache.netease.com/f2e/wap/touch_index_2016/qa/images/idol_flower_0.png"></div>\r\n        </div>\r\n    </div>\r\n    <div class="idol_vote_count">\r\n        <div class="flower">\r\n            <img src="http://img2.cache.netease.com/f2e/wap/touch_index_2016/qa/images/idol_flower_0.png">\r\n        </div>\r\n        <div class="cur_votecount">88</div>\r\n        <div class="cur_voteadd">+1</div>\r\n    </div>\r\n    <div class="operate">\r\n' + (null != (i = (n.showIdolFocus || t && t.showIdolFocus || r).call(s, null != t ? t.id : t, {
                        name: "showIdolFocus",
                        hash: {},
                        fn: e.program(9, l, 0),
                        inverse: e.noop,
                        data: l
                    })) ? i : "") + '        <div class="share-idol-wrap" data-title="' + h((o = null != (o = n.name || (null != t ? t.name : t)) ? o : r, typeof o === c ? o.call(s, {
                        name: "name",
                        hash: {},
                        data: l
                    }) : o)) + '" data-link="' + h((o = null != (o = n.link || (null != t ? t.link : t)) ? o : r, typeof o === c ? o.call(s, {
                        name: "link",
                        hash: {},
                        data: l
                    }) : o)) + '" data-img="' + h((o = null != (o = n.sharepic || (null != t ? t.sharepic : t)) ? o : r, typeof o === c ? o.call(s, {
                        name: "sharepic",
                        hash: {},
                        data: l
                    }) : o)) + '" data-digest="' + h((o = null != (o = n.sharedis || (null != t ? t.sharedis : t)) ? o : r, typeof o === c ? o.call(s, {
                        name: "sharedis",
                        hash: {},
                        data: l
                    }) : o)) + '"><span class="iconfont share-idol">&#xe619;</span></div>\r\n    </div>\r\n</div>'
        }, useData: !0
    }), t.module_ui_local_flag_tpl = e({
        compiler: [7, ">= 4.0.0"], main: function (e, t, n, a, l) {
            var i;
            return '<a href="' + e.escapeExpression((i = null != (i = n.href || (null != t ? t.href : t)) ? i : n.helperMissing, "function" == typeof i ? i.call(null != t ? t : {}, {
                        name: "href",
                        hash: {},
                        data: l
                    }) : i)) + '" class=\'change_position\'><div class="change-position"><span></span></div></a>'
        }, useData: !0
    }), t.module_ui_nav_idol_listmore_tpl = e({
        compiler: [7, ">= 4.0.0"], main: function (e, t, n, a, l) {
            var i;
            return '<a href="' + e.escapeExpression((i = null != (i = n.link || (null != t ? t.link : t)) ? i : n.helperMissing, "function" == typeof i ? i.call(null != t ? t : {}, {
                        name: "link",
                        hash: {},
                        data: l
                    }) : i)) + '"><div class="link_more">\u70b9\u51fb\u67e5\u770b\u66f4\u591a\u660e\u661f</div></a>'
        }, useData: !0
    }), t.module_ui_nav_idol_tpl = e({
        compiler: [7, ">= 4.0.0"], main: function (e, t, n, a, l) {
            return '<div class="slider_child line channel_idol" id="childchannel_wrap_idol">\r\n    <div class="scroll_wrap_child">\r\n        <div class="u_c_items">\r\n        </div>\r\n    </div>\r\n</div>'
        }, useData: !0
    }), t.module_ui_nav_v2_tpl = e({
        1: function (e, t, n, a, l) {
            var i;
            return null != (i = n["if"].call(null != t ? t : {}, null != t ? t.display : t, {
                name: "if",
                hash: {},
                fn: e.program(2, l, 0),
                inverse: e.noop,
                data: l
            })) ? i : ""
        }, 2: function (e, t, n, a, l) {
            var i, o = null != t ? t : {}, s = n.helperMissing, r = e.escapeExpression, c = e.lambda;
            return '                        <div class="topnav_item ' + r((n.getNavDisplaySet || t && t.getNavDisplaySet || s).call(o, null != t ? t.display : t, {
                        name: "getNavDisplaySet",
                        hash: {},
                        data: l
                    })) + '" id="topchild_' + r(c(null != t ? t.term : t, t)) + '" data-tcn="' + r(c(null != t ? t.term : t, t)) + '" data-scn="' + r((n.getChildName || t && t.getChildName || s).call(o, null != t ? t.childroute : t, {
                        name: "getChildName",
                        hash: {},
                        data: l
                    })) + '">\r\n                            <div class="topnav_item_box">\r\n                                <span class="topnav_item_text">' + (null != (i = c(null != t ? t.name : t, t)) ? i : "") + "</span>\r\n                            </div>\r\n                        </div>\r\n"
        }, 4: function (e, t, n, a, l, i, o) {
            var s, r = e.lambda, c = e.escapeExpression;
            return '            <div class="subnav_contain" id="subchild_' + c(r(null != t ? t.term : t, t)) + '">\r\n                <ul class="subnav_list" data-tcn="' + c(r(null != t ? t.term : t, t)) + '">\r\n' + (null != (s = n.each.call(null != t ? t : {}, null != t ? t.childroute : t, {
                        name: "each",
                        hash: {},
                        fn: e.program(5, l, 0, i, o),
                        inverse: e.noop,
                        data: l
                    })) ? s : "") + "                </ul>\r\n            </div>\r\n"
        }, 5: function (e, t, n, a, l, i, o) {
            var s, r = e.lambda, c = e.escapeExpression;
            return '                    <li class="subnav_item" id="subchild_' + c(r(null != o[1] ? o[1].term : o[1], t)) + "_" + c(r(null != t ? t.term : t, t)) + '" data-scn="' + c(r(null != t ? t.term : t, t)) + '">\r\n                        <span class="subnav_item_text">' + (null != (s = r(null != t ? t.name : t, t)) ? s : "") + "</span>\r\n                    </li>\r\n"
        }, 7: function (e, t, n, a, l) {
            var i;
            return null != (i = n["if"].call(null != t ? t : {}, null != t ? t.display : t, {
                name: "if",
                hash: {},
                fn: e.program(8, l, 0),
                inverse: e.noop,
                data: l
            })) ? i : ""
        }, 8: function (e, t, n, a, l) {
            var i;
            return null != (i = (n.getExpandLine || t && t.getExpandLine || n.helperMissing).call(null != t ? t : {}, null != t ? t.term : t, {
                name: "getExpandLine",
                hash: {},
                fn: e.program(9, l, 0),
                inverse: e.noop,
                data: l
            })) ? i : ""
        }, 9: function (e, t, n, a, l) {
            var i, o = e.lambda;
            return '                    <li class="pannel_item channel_text_item" data-tcn="' + e.escapeExpression(o(null != t ? t.term : t, t)) + '">' + (null != (i = o(null != t ? t.name : t, t)) ? i : "") + "</li>\r\n"
        }, 11: function (e, t, n, a, l) {
            var i = e.escapeExpression, o = e.lambda;
            return '                <li class="pannel_item channel_icon_item" data-tcn="' + i((n.getTopChannelName || t && t.getTopChannelName || n.helperMissing).call(null != t ? t : {}, t, {
                        name: "getTopChannelName",
                        hash: {},
                        data: l
                    })) + '" data-scn="' + i(o(null != t ? t.term : t, t)) + '" data-exsaber="' + i(o(null != t ? t.extension : t, t)) + '">\r\n                    <div class="icon_item_img">\r\n                        <img src="' + i(o(null != t ? t.pic : t, t)) + '" alt=""></div>\r\n                    <div class="icon_item_text">' + i(o(null != t ? t.name : t, t)) + "</div>\r\n                </li>\r\n"
        }, compiler: [7, ">= 4.0.0"], main: function (e, t, n, a, l, i, o) {
            var s, r = null != t ? t : {};
            return '<nav class="main_nav">\r\n    <div class="main_nav_bar">\r\n        <div class="main_nav_wrap main_nav_topnav_wrap">\r\n            <div class="topnav_list_contain">\r\n                <div class="topnav_list_scroll_wrap">\r\n                    <div class="topnav_list">\r\n' + (null != (s = n.each.call(r, null != t ? t.route : t, {
                        name: "each",
                        hash: {},
                        fn: e.program(1, l, 0, i, o),
                        inverse: e.noop,
                        data: l
                    })) ? s : "") + '                    </div>\r\n                </div>\r\n            </div>\r\n            <div class="topnav_expand_btn"></div>\r\n        </div>\r\n        <div class="subnav_wrap">\r\n            <div class="main_nav_wrap">\r\n' + (null != (s = n.each.call(r, null != t ? t.route : t, {
                        name: "each",
                        hash: {},
                        fn: e.program(4, l, 0, i, o),
                        inverse: e.noop,
                        data: l
                    })) ? s : "") + '            </div>\r\n        </div>\r\n        <div class="nav_expand_panel">\r\n            <ul class="expand_panel_channel with_line">\r\n' + (null != (s = n.each.call(r, null != t ? t.route : t, {
                        name: "each",
                        hash: {},
                        fn: e.program(7, l, 0, i, o),
                        inverse: e.noop,
                        data: l
                    })) ? s : "") + '            </ul>\r\n            <ul class="expand_panel_channel">\r\n' + (null != (s = n.each.call(r, null != t ? t.expand : t, {
                        name: "each",
                        hash: {},
                        fn: e.program(11, l, 0, i, o),
                        inverse: e.noop,
                        data: l
                    })) ? s : "") + "            </ul>\r\n        </div>\r\n\r\n    </div>\r\n</nav>"
        }, useData: !0, useDepths: !0
    }), t.module_ui_sport_live_tpl = e({
        1: function (e, t, n, a, l) {
            return 'target="_blank"'
        }, 3: function (e, t, n, a, l) {
            return '<div class="hot"></div>'
        }, 5: function (e, t, n, a, l) {
            var i;
            return null != (i = (n.iswatching || t && t.iswatching || n.helperMissing).call(null != t ? t : {}, null != t ? t.status : t, null != t ? t.date : t, {
                name: "iswatching",
                hash: {},
                fn: e.program(6, l, 0),
                inverse: e.program(8, l, 0),
                data: l
            })) ? i : ""
        }, 6: function (e, t, n, a, l) {
            return '                <span class="watch">&nbsp;|&nbsp;<span class="watchcount"></span>\u4eba\u5728\u770b</span>\r\n'
        }, 8: function (e, t, n, a, l) {
            return '                <span class="watch">&nbsp;|&nbsp;<span class="watchcount"></span>\u4eba\u5df2\u770b</span>\r\n'
        }, 10: function (e, t, n, a, l) {
            var i;
            return null != (i = (n.isbeforeLive || t && t.isbeforeLive || n.helperMissing).call(null != t ? t : {}, null != t ? t.status : t, null != t ? t.date : t, {
                name: "isbeforeLive",
                hash: {},
                fn: e.program(11, l, 0),
                inverse: e.program(16, l, 0),
                data: l
            })) ? i : ""
        }, 11: function (e, t, n, a, l) {
            var i;
            return null != (i = (n.islive || t && t.islive || n.helperMissing).call(null != t ? t : {}, null != t ? t.live : t, {
                name: "islive",
                hash: {},
                fn: e.program(12, l, 0),
                inverse: e.program(14, l, 0),
                data: l
            })) ? i : ""
        }, 12: function (e, t, n, a, l) {
            var i = null != t ? t : {}, o = n.helperMissing, s = e.escapeExpression;
            return '                    <span class="date">' + s((n.getliveday || t && t.getliveday || o).call(i, null != t ? t.liveday : t, {
                        name: "getliveday",
                        hash: {},
                        data: l
                    })) + "&nbsp;" + s((n.sliceTime || t && t.sliceTime || o).call(i, null != t ? t.date : t, {
                        name: "sliceTime",
                        hash: {},
                        data: l
                    })) + '</span>\r\n                    <span class="live before_live">\u56fe\u6587\u76f4\u64ad</span>\r\n'
        }, 14: function (e, t, n, a, l) {
            var i = null != t ? t : {}, o = n.helperMissing, s = e.escapeExpression;
            return '                    <span class="date">' + s((n.getliveday || t && t.getliveday || o).call(i, null != t ? t.liveday : t, {
                        name: "getliveday",
                        hash: {},
                        data: l
                    })) + "&nbsp;" + s((n.sliceTime || t && t.sliceTime || o).call(i, null != t ? t.date : t, {
                        name: "sliceTime",
                        hash: {},
                        data: l
                    })) + '</span>\r\n                    <span class="live before_live">\u6570\u636e\u76f4\u64ad</span>\r\n'
        }, 16: function (e, t, n, a, l) {
            var i;
            return null != (i = (n.islive || t && t.islive || n.helperMissing).call(null != t ? t : {}, null != t ? t.live : t, {
                name: "islive",
                hash: {},
                fn: e.program(17, l, 0),
                inverse: e.program(20, l, 0),
                data: l
            })) ? i : ""
        }, 17: function (e, t, n, a, l) {
            var i;
            return '                    <div class="living">\r\n                        <span class="live">\u56fe\u6587\u76f4\u64ad</span>\r\n                    </div>\r\n' + (null != (i = n["if"].call(null != t ? t : {}, null != t ? t.status : t, {
                        name: "if",
                        hash: {},
                        fn: e.program(18, l, 0),
                        inverse: e.noop,
                        data: l
                    })) ? i : "")
        }, 18: function (e, t, n, a, l) {
            var i;
            return '                    <span class="section">\u7b2c' + e.escapeExpression((i = null != (i = n.round || (null != t ? t.round : t)) ? i : n.helperMissing, "function" == typeof i ? i.call(null != t ? t : {}, {
                        name: "round",
                        hash: {},
                        data: l
                    }) : i)) + "\u8282</span>\r\n"
        }, 20: function (e, t, n, a, l) {
            var i;
            return '                    <div class="living">\r\n                        <span class="live">\u6570\u636e\u76f4\u64ad</span>\r\n                    </div>\r\n' + (null != (i = n["if"].call(null != t ? t : {}, null != t ? t.status : t, {
                        name: "if",
                        hash: {},
                        fn: e.program(18, l, 0),
                        inverse: e.noop,
                        data: l
                    })) ? i : "")
        }, 22: function (e, t, n, a, l) {
            var i = null != t ? t : {}, o = n.helperMissing, s = e.escapeExpression;
            return '                <div class="living after_live">\r\n                    <span class="live">\u56fe\u6587\u6218\u62a5</span>\r\n                </div>\r\n            <span class="section">' + s((n.getliveday || t && t.getliveday || o).call(i, null != t ? t.liveday : t, {
                        name: "getliveday",
                        hash: {},
                        data: l
                    })) + "&nbsp;" + s((n.sliceTime || t && t.sliceTime || o).call(i, null != t ? t.date : t, {
                        name: "sliceTime",
                        hash: {},
                        data: l
                    })) + "</span>\r\n"
        }, compiler: [7, ">= 4.0.0"], main: function (e, t, n, a, l) {
            var i, o, s, r = null != t ? t : {}, c = n.helperMissing, h = "function", d = e.escapeExpression, u = n.blockHelperMissing, m = '<section class="match live' + d((o = null != (o = n.live || (null != t ? t.live : t)) ? o : c, typeof o === h ? o.call(r, {
                        name: "live",
                        hash: {},
                        data: l
                    }) : o)) + " status" + d((o = null != (o = n.status || (null != t ? t.status : t)) ? o : c, typeof o === h ? o.call(r, {
                        name: "status",
                        hash: {},
                        data: l
                    }) : o)) + '" data-roomid="' + d((o = null != (o = n.roomId || (null != t ? t.roomId : t)) ? o : c, typeof o === h ? o.call(r, {
                        name: "roomId",
                        hash: {},
                        data: l
                    }) : o)) + '">\r\n    <a ';
            return o = null != (o = n.notIosSafari || (null != t ? t.notIosSafari : t)) ? o : c, s = {
                name: "notIosSafari",
                hash: {},
                fn: e.program(1, l, 0),
                inverse: e.noop,
                data: l
            }, i = typeof o === h ? o.call(r, s) : o, n.notIosSafari || (i = u.call(t, i, s)), null != i && (m += i), m += ' href="' + d((n.getSportLiveURL || t && t.getSportLiveURL || c).call(r, null != t ? t.roomId : t, null != t ? t.mid : t, {
                        name: "getSportLiveURL",
                        hash: {},
                        data: l
                    })) + '">\r\n    <!-- ', o = null != (o = n.ishot || (null != t ? t.ishot : t)) ? o : c, s = {
                name: "ishot",
                hash: {},
                fn: e.program(3, l, 0),
                inverse: e.noop,
                data: l
            }, i = typeof o === h ? o.call(r, s) : o, n.ishot || (i = u.call(t, i, s)), null != i && (m += i), m + ' -->\r\n    <div class="match_head">\r\n        <span class="type">' + d((o = null != (o = n.type || (null != t ? t.type : t)) ? o : c, typeof o === h ? o.call(r, {
                name: "type",
                hash: {},
                data: l
            }) : o)) + "</span>\r\n" + (null != (i = (n.isShowCount || t && t.isShowCount || c).call(r, null != t ? t.status : t, null != t ? t.live : t, null != t ? t.date : t, {
                name: "isShowCount",
                hash: {},
                fn: e.program(5, l, 0),
                inverse: e.noop,
                data: l
            })) ? i : "") + '    </div>\r\n    <div class="match_body clearfix">\r\n        <div class="match_team clearfix">\r\n            <div class="home clearfix">\r\n                <div class="logo"><img src="http://nba.sports.163.com/2015/images/team/mobile/team/' + d((o = null != (o = n.homeId || (null != t ? t.homeId : t)) ? o : c, typeof o === h ? o.call(r, {
                name: "homeId",
                hash: {},
                data: l
            }) : o)) + '.png" alt="' + d((o = null != (o = n.homeCn || (null != t ? t.homeCn : t)) ? o : c, typeof o === h ? o.call(r, {
                name: "homeCn",
                hash: {},
                data: l
            }) : o)) + '"></div>\r\n                <span class="name">' + d((o = null != (o = n.homeCn || (null != t ? t.homeCn : t)) ? o : c, typeof o === h ? o.call(r, {
                name: "homeCn",
                hash: {},
                data: l
            }) : o)) + '</span>\r\n                <span class="score">' + d((o = null != (o = n.homeScoreTotal || (null != t ? t.homeScoreTotal : t)) ? o : c, typeof o === h ? o.call(r, {
                name: "homeScoreTotal",
                hash: {},
                data: l
            }) : o)) + '</span>\r\n            </div>\r\n            <div class="away clearfix">\r\n                <div class="logo"><img src="http://nba.sports.163.com/2015/images/team/mobile/team/' + d((o = null != (o = n.awayId || (null != t ? t.awayId : t)) ? o : c, typeof o === h ? o.call(r, {
                name: "awayId",
                hash: {},
                data: l
            }) : o)) + '.png" alt="' + d((o = null != (o = n.awayCn || (null != t ? t.awayCn : t)) ? o : c, typeof o === h ? o.call(r, {
                name: "awayCn",
                hash: {},
                data: l
            }) : o)) + '"></div>\r\n                <span class="name">' + d((o = null != (o = n.awayCn || (null != t ? t.awayCn : t)) ? o : c, typeof o === h ? o.call(r, {
                name: "awayCn",
                hash: {},
                data: l
            }) : o)) + '</span>\r\n                <span class="score">' + d((o = null != (o = n.awayScoreTotal || (null != t ? t.awayScoreTotal : t)) ? o : c, typeof o === h ? o.call(r, {
                name: "awayScoreTotal",
                hash: {},
                data: l
            }) : o)) + '</span>\r\n            </div>\r\n        </div>\r\n        <div class="match_live">\r\n' + (null != (i = (n.isliving || t && t.isliving || c).call(r, null != t ? t.status : t, {
                name: "isliving",
                hash: {},
                fn: e.program(10, l, 0),
                inverse: e.program(22, l, 0),
                data: l
            })) ? i : "") + "        </div>\r\n    </div>\r\n    </a>\r\n</section>"
        }, useData: !0
    }), t.module_ui_sport_score_box1_tpl = e({
        1: function (e, t, n, a, l) {
            var i;
            return null != (i = (n.isliving || t && t.isliving || n.helperMissing).call(null != t ? t : {}, null != t ? t.status : t, {
                name: "isliving",
                hash: {},
                fn: e.program(2, l, 0),
                inverse: e.noop,
                data: l
            })) ? i : ""
        }, 2: function (e, t, n, a, l) {
            var i, o, s, r = null != t ? t : {}, c = n.helperMissing, h = e.escapeExpression, d = e.lambda, u = "            <a ";
            return o = null != (o = n.notIosSafari || (null != t ? t.notIosSafari : t)) ? o : c, s = {
                name: "notIosSafari",
                hash: {},
                fn: e.program(3, l, 0),
                inverse: e.noop,
                data: l
            }, i = "function" == typeof o ? o.call(r, s) : o, n.notIosSafari || (i = n.blockHelperMissing.call(t, i, s)), null != i && (u += i), u + ' href="' + h((n.getSportLiveURL || t && t.getSportLiveURL || c).call(r, null != t ? t.roomId : t, null != t ? t.mid : t, {
                name: "getSportLiveURL",
                hash: {},
                data: l
            })) + '">\r\n                <div class="match_item">\r\n                    <div class="status"><span>' + h((n.getMatchStatus || t && t.getMatchStatus || c).call(r, null != t ? t.status : t, null != t ? t.date : t, {
                name: "getMatchStatus",
                hash: {},
                data: l
            })) + '</span></div>\r\n                    <div class="team clearfix home">\r\n                        <div class="logo"><img src="http://nba.sports.163.com/2015/images/team/mobile/team/' + h(d(null != t ? t.homeId : t, t)) + '.png" alt=""></div>\r\n                        <div class="info">\r\n                            <div class="name">' + h(d(null != t ? t.homeCn : t, t)) + '</div>\r\n                            <div class="score">' + h(d(null != t ? t.homeScoreTotal : t, t)) + '</div>\r\n                        </div>\r\n                    </div>\r\n                    <div class="team clearfix away">\r\n                        <div class="logo"><img src="http://nba.sports.163.com/2015/images/team/mobile/team/' + h(d(null != t ? t.awayId : t, t)) + '.png" alt=""></div>\r\n                        <div class="info">\r\n                            <div class="name">' + h(d(null != t ? t.awayCn : t, t)) + '</div>\r\n                            <div class="score">' + h(d(null != t ? t.awayScoreTotal : t, t)) + "</div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </a>\r\n"
        }, 3: function (e, t, n, a, l) {
            return 'target="_blank"'
        }, compiler: [7, ">= 4.0.0"], main: function (e, t, n, a, l) {
            var i;
            return '<div class="nba_fastview_container clearfix">\r\n' + (null != (i = n.each.call(null != t ? t : {}, null != t ? t.data : t, {
                        name: "each",
                        hash: {},
                        fn: e.program(1, l, 0),
                        inverse: e.noop,
                        data: l
                    })) ? i : "") + "</div>"
        }, useData: !0
    }), t.module_ui_sport_score_box2_tpl = e({
        1: function (e, t, n, a, l) {
            var i, o, s, r = null != t ? t : {}, c = n.helperMissing, h = e.escapeExpression, d = e.lambda, u = "        <a ";
            return o = null != (o = n.notIosSafari || (null != t ? t.notIosSafari : t)) ? o : c, s = {
                name: "notIosSafari",
                hash: {},
                fn: e.program(2, l, 0),
                inverse: e.noop,
                data: l
            }, i = "function" == typeof o ? o.call(r, s) : o, n.notIosSafari || (i = n.blockHelperMissing.call(t, i, s)), null != i && (u += i), u + ' href="' + h((n.getSportLiveURL || t && t.getSportLiveURL || c).call(r, null != t ? t.roomId : t, null != t ? t.mid : t, {
                name: "getSportLiveURL",
                hash: {},
                data: l
            })) + '">\r\n            <div class="match_item clearfix">\r\n                <div class="team clearfix home">\r\n                    <div class="logo">\r\n                        <img src="http://nba.sports.163.com/2015/images/team/mobile/team/' + h(d(null != t ? t.homeId : t, t)) + '.png" alt="">\r\n                    </div>\r\n                    <div class="name">' + h(d(null != t ? t.homeCn : t, t)) + '</div>\r\n                </div>\r\n                <div class="info">\r\n                    <div class="type">' + h(d(null != t ? t.type : t, t)) + "</div>\r\n" + (null != (i = (n.isliving || t && t.isliving || c).call(r, null != t ? t.status : t, {
                name: "isliving",
                hash: {},
                fn: e.program(4, l, 0),
                inverse: e.program(9, l, 0),
                data: l
            })) ? i : "") + '                </div>\r\n                <div class="team clearfix away">\r\n                    <div class="logo">\r\n                        <img src="http://nba.sports.163.com/2015/images/team/mobile/team/' + h(d(null != t ? t.awayId : t, t)) + '.png" alt="">\r\n                    </div>\r\n                    <div class="name">' + h(d(null != t ? t.awayCn : t, t)) + "</div>\r\n                </div>\r\n            </div>\r\n        </a>\r\n"
        }, 2: function (e, t, n, a, l) {
            return 'target="_blank"'
        }, 4: function (e, t, n, a, l) {
            var i;
            return null != (i = (n.isbeforeLive || t && t.isbeforeLive || n.helperMissing).call(null != t ? t : {}, null != t ? t.status : t, null != t ? t.date : t, {
                name: "isbeforeLive",
                hash: {},
                fn: e.program(5, l, 0),
                inverse: e.program(7, l, 0),
                data: l
            })) ? i : ""
        }, 5: function (e, t, n, a, l) {
            var i = null != t ? t : {}, o = n.helperMissing, s = e.escapeExpression;
            return '                            <div class="score">' + s((n.getliveday || t && t.getliveday || o).call(i, null != t ? t.liveday : t, {
                        name: "getliveday",
                        hash: {},
                        data: l
                    })) + "&nbsp;" + s((n.sliceTime || t && t.sliceTime || o).call(i, null != t ? t.date : t, {
                        name: "sliceTime",
                        hash: {},
                        data: l
                    })) + '</div>\r\n                            <div class="status_beforematch"><span>' + s((n.getMatchStatus || t && t.getMatchStatus || o).call(i, null != t ? t.status : t, null != t ? t.date : t, {
                        name: "getMatchStatus",
                        hash: {},
                        data: l
                    })) + "</span></div>\r\n"
        }, 7: function (e, t, n, a, l) {
            var i = e.lambda, o = e.escapeExpression;
            return '                            <div class="score">' + o(i(null != t ? t.homeScoreTotal : t, t)) + "<span>vs</span>" + o(i(null != t ? t.awayScoreTotal : t, t)) + '</div>\r\n                            <div class="status_matching"><span>\u7b2c' + o(i(null != t ? t.round : t, t)) + "\u8282</span></div>\r\n"
        }, 9: function (e, t, n, a, l) {
            var i = e.lambda, o = e.escapeExpression;
            return '                        <div class="score">' + o(i(null != t ? t.homeScoreTotal : t, t)) + "<span>vs</span>" + o(i(null != t ? t.awayScoreTotal : t, t)) + '</div>\r\n                        <div class="status_matching"><span>' + o((n.getMatchStatus || t && t.getMatchStatus || n.helperMissing).call(null != t ? t : {}, null != t ? t.status : t, null != t ? t.date : t, {
                        name: "getMatchStatus",
                        hash: {},
                        data: l
                    })) + "</span></div>\r\n"
        }, compiler: [7, ">= 4.0.0"], main: function (e, t, n, a, l) {
            var i;
            return '<div class="nba_fastview_container_pen clearfix">\r\n' + (null != (i = n.each.call(null != t ? t : {}, null != t ? t.data : t, {
                        name: "each",
                        hash: {},
                        fn: e.program(1, l, 0),
                        inverse: e.noop,
                        data: l
                    })) ? i : "") + "</div>"
        }, useData: !0
    }), t.module_ui_sport_separate_over_tpl = e({
        compiler: [7, ">= 4.0.0"], main: function (e, t, n, a, l) {
            return '<div class="over">\r\n	<span>\u5df2\u7ed3\u675f</span>\r\n</div>';
        }, useData: !0
    }), t.module_ui_stars_rank_tpl = e({
        1: function (e, t, n, a, l) {
            return 'target="_blank"'
        }, compiler: [7, ">= 4.0.0"], main: function (e, t, n, a, l) {
            var i, o, s, r = null != t ? t : {}, c = n.helperMissing, h = "function", d = e.escapeExpression, u = e.lambda, m = '<section class="stars_rank module_ui mocule-item">\r\n    <div class="title_wrap">\r\n        <div class="title">\u5a31\u4e50\u98ce\u4e91\u699c</div>\r\n        <div class="digest">\u5feb\u6765\u7ed9\u4f60\u7684\u5076\u50cf\u9001\u82b1\u5427</div>\r\n    </div>\r\n    <a ';
            return o = null != (o = n.notIosSafari || (null != t ? t.notIosSafari : t)) ? o : c, s = {
                name: "notIosSafari",
                hash: {},
                fn: e.program(1, l, 0),
                inverse: e.noop,
                data: l
            }, i = typeof o === h ? o.call(r, s) : o, n.notIosSafari || (i = n.blockHelperMissing.call(t, i, s)), null != i && (m += i), m + ' href="' + d((o = null != (o = n.rankPageLink || (null != t ? t.rankPageLink : t)) ? o : c, typeof o === h ? o.call(r, {
                name: "rankPageLink",
                hash: {},
                data: l
            }) : o)) + '">\r\n        <div class="rank">\r\n            <div class="rank_1 rank_item">\r\n                <div class="head"><img src="' + d(u(null != (i = null != t ? t.rank_1 : t) ? i.icon : i, t)) + '" alt="' + d(u(null != (i = null != t ? t.rank_1 : t) ? i.name : i, t)) + '"></div>\r\n                <div class="name"><i>' + d(u(null != (i = null != t ? t.rank_1 : t) ? i.name : i, t)) + '</i></div>\r\n                <div class="support"><i>' + d(u(null != (i = null != t ? t.rank_1 : t) ? i.voteCount : i, t)) + '</i><span>\u6735</span></div>\r\n            </div>\r\n            <div class="rank_0 rank_item">\r\n                <div class="head"><img src="' + d(u(null != (i = null != t ? t.rank_0 : t) ? i.icon : i, t)) + '" alt="' + d(u(null != (i = null != t ? t.rank_0 : t) ? i.name : i, t)) + '"></div>\r\n                <div class="name"><i>' + d(u(null != (i = null != t ? t.rank_0 : t) ? i.name : i, t)) + '</i></div>\r\n                <div class="support"><i>' + d(u(null != (i = null != t ? t.rank_0 : t) ? i.voteCount : i, t)) + '</i><span>\u6735</span></div>\r\n            </div>\r\n            <div class="rank_2 rank_item">\r\n                <div class="head"><img src="' + d(u(null != (i = null != t ? t.rank_2 : t) ? i.icon : i, t)) + '" alt="' + d(u(null != (i = null != t ? t.rank_2 : t) ? i.name : i, t)) + '"></div>\r\n                <div class="name"><i>' + d(u(null != (i = null != t ? t.rank_2 : t) ? i.name : i, t)) + '</i></div>\r\n                <div class="support"><i>' + d(u(null != (i = null != t ? t.rank_2 : t) ? i.voteCount : i, t)) + "</i><span>\u6735</span></div>\r\n            </div>\r\n        </div>\r\n    </a>\r\n</section>"
        }, useData: !0
    }), t.openList_tpl = e({
        compiler: [7, ">= 4.0.0"], main: function (e, t, n, a, l) {
            var i, o = null != t ? t : {}, s = n.helperMissing, r = "function", c = e.escapeExpression;
            return '<section class="o_article js-shareinfo">\r\n    <a href="' + c((i = null != (i = n.link || (null != t ? t.link : t)) ? i : s, typeof i === r ? i.call(o, {
                        name: "link",
                        hash: {},
                        data: l
                    }) : i)) + "?plid=" + c((i = null != (i = n.plid || (null != t ? t.plid : t)) ? i : s, typeof i === r ? i.call(o, {
                        name: "plid",
                        hash: {},
                        data: l
                    }) : i)) + "&rid=" + c((i = null != (i = n.rid || (null != t ? t.rid : t)) ? i : s, typeof i === r ? i.call(o, {
                        name: "rid",
                        hash: {},
                        data: l
                    }) : i)) + '">\r\n        <div class="o_article_img">\r\n            <img src="' + c((i = null != (i = n.picUrl || (null != t ? t.picUrl : t)) ? i : s, typeof i === r ? i.call(o, {
                        name: "picUrl",
                        hash: {},
                        data: l
                    }) : i)) + '" alt="" />\r\n            <div class="o_article_length">\r\n                <span class="o_article_length_icon"></span>\r\n                <span class="o_article_length_value">' + c((i = null != (i = n.quantity || (null != t ? t.quantity : t)) ? i : s, typeof i === r ? i.call(o, {
                        name: "quantity",
                        hash: {},
                        data: l
                    }) : i)) + '</span>\r\n            </div>\r\n        </div>\r\n    </a>\r\n    <div class="o_article_info">\r\n        <div class="o_article_infot">\r\n            <span class="o_article_tag" style="background:' + c((i = null != (i = n.tagBgColor || (null != t ? t.tagBgColor : t)) ? i : s, typeof i === r ? i.call(o, {
                        name: "tagBgColor",
                        hash: {},
                        data: l
                    }) : i)) + '">' + c((i = null != (i = n.courseType || (null != t ? t.courseType : t)) ? i : s, typeof i === r ? i.call(o, {
                        name: "courseType",
                        hash: {},
                        data: l
                    }) : i)) + '</span>\r\n            <span class="o_article_time">' + c((n.date_format || t && t.date_format || s).call(o, null != t ? t.dbCreateTime : t, {
                        name: "date_format",
                        hash: {},
                        data: l
                    })) + '</span>\r\n        </div>\r\n        <a href="' + c((i = null != (i = n.link || (null != t ? t.link : t)) ? i : s, typeof i === r ? i.call(o, {
                        name: "link",
                        hash: {},
                        data: l
                    }) : i)) + "?plid=" + c((i = null != (i = n.plid || (null != t ? t.plid : t)) ? i : s, typeof i === r ? i.call(o, {
                        name: "plid",
                        hash: {},
                        data: l
                    }) : i)) + "&rid=" + c((i = null != (i = n.rid || (null != t ? t.rid : t)) ? i : s, typeof i === r ? i.call(o, {
                        name: "rid",
                        hash: {},
                        data: l
                    }) : i)) + '">\r\n            <div class="o_article_title">\r\n                <span>' + c((i = null != (i = n.title || (null != t ? t.title : t)) ? i : s, typeof i === r ? i.call(o, {
                        name: "title",
                        hash: {},
                        data: l
                    }) : i)) + '</span>\r\n            </div>\r\n            <div class="o_article_desc">\r\n                <span>' + c((i = null != (i = n.description || (null != t ? t.description : t)) ? i : s, typeof i === r ? i.call(o, {
                        name: "description",
                        hash: {},
                        data: l
                    }) : i)) + '</span>\r\n            </div>\r\n        </a>\r\n        <div class="o_article_infob clearfix">\r\n            <span class="o_article_playtimes">' + c((n.fixThousands || t && t.fixThousands || s).call(o, null != t ? t.viewcount : t, {
                        name: "fixThousands",
                        hash: {},
                        data: l
                    })) + '</span>\u4eba\u89c2\u770b\r\n            <span class="o_share_btn js-sharebtn" data-title=' + c((i = null != (i = n.title || (null != t ? t.title : t)) ? i : s, typeof i === r ? i.call(o, {
                        name: "title",
                        hash: {},
                        data: l
                    }) : i)) + " data-digest=" + c((i = null != (i = n.description || (null != t ? t.description : t)) ? i : s, typeof i === r ? i.call(o, {
                        name: "description",
                        hash: {},
                        data: l
                    }) : i)) + " data-img=" + c((i = null != (i = n.picUrl || (null != t ? t.picUrl : t)) ? i : s, typeof i === r ? i.call(o, {
                        name: "picUrl",
                        hash: {},
                        data: l
                    }) : i)) + " data-link=" + c((i = null != (i = n.link || (null != t ? t.link : t)) ? i : s, typeof i === r ? i.call(o, {
                        name: "link",
                        hash: {},
                        data: l
                    }) : i)) + "?plid=" + c((i = null != (i = n.plid || (null != t ? t.plid : t)) ? i : s, typeof i === r ? i.call(o, {
                        name: "plid",
                        hash: {},
                        data: l
                    }) : i)) + "&rid=" + c((i = null != (i = n.rid || (null != t ? t.rid : t)) ? i : s, typeof i === r ? i.call(o, {
                        name: "rid",
                        hash: {},
                        data: l
                    }) : i)) + "></span>\r\n        </div>\r\n    </div>\r\n</section>"
        }, useData: !0
    }), t.video_doc_tpl = e({
        1: function (e, t, n, a, l) {
            return 'target="_blank"'
        }, compiler: [7, ">= 4.0.0"], main: function (e, t, n, a, l) {
            var i, o, s, r = null != t ? t : {}, c = n.helperMissing, h = "function", d = e.escapeExpression, u = '<section class="video-item">\r\n    <a ';
            return o = null != (o = n.notIosSafari || (null != t ? t.notIosSafari : t)) ? o : c, s = {
                name: "notIosSafari",
                hash: {},
                fn: e.program(1, l, 0),
                inverse: e.noop,
                data: l
            }, i = typeof o === h ? o.call(r, s) : o, n.notIosSafari || (i = n.blockHelperMissing.call(t, i, s)), null != i && (u += i), u + ' href="http://3g.163.com/ntes/special/0034073A/touch_videoplay.html?vid=' + d((o = null != (o = n.vid || (null != t ? t.vid : t)) ? o : c, typeof o === h ? o.call(r, {
                name: "vid",
                hash: {},
                data: l
            }) : o)) + '">\r\n        <div class="v-poster">\r\n            <img src="' + d((o = null != (o = n.cover || (null != t ? t.cover : t)) ? o : c, typeof o === h ? o.call(r, {
                name: "cover",
                hash: {},
                data: l
            }) : o)) + '">\r\n        </div>\r\n        <div class="v-mask">\r\n            <div class="v-head">\r\n                <div class="v-play"></div>\r\n                <div class="v-title">' + (null != (o = null != (o = n.title || (null != t ? t.title : t)) ? o : c, i = typeof o === h ? o.call(r, {
                name: "title",
                hash: {},
                data: l
            }) : o) ? i : "") + '</div>\r\n            </div>            \r\n            <div class="v-detail">\r\n                <span class="v-source">' + d(e.lambda(null != (i = null != t ? t.videoTopic : t) ? i.tname : i, t)) + '</span>\r\n                <span class="v-tie">' + d((o = null != (o = n.replyCount || (null != t ? t.replyCount : t)) ? o : c, typeof o === h ? o.call(r, {
                name: "replyCount",
                hash: {},
                data: l
            }) : o)) + '</span>\r\n                <span class="v-time">' + d((n.videoLength || t && t.videoLength || c).call(r, null != t ? t.length : t, {
                name: "videoLength",
                hash: {},
                data: l
            })) + "</span>\r\n            </div>\r\n        </div>\r\n    </a>\r\n</section>"
        }, useData: !0
    }), t.weixinshare_tpl = e({
        compiler: [7, ">= 4.0.0"], main: function (e, t, n, a, l) {
            return '<div class="weixin_share_show"></div>'
        }, useData: !0
    })
}(), function (e, t) {
    function n() {
        this.getbannerFlag = !0, this.list = void 0
    }

    function a(e) {
        for (var n = e || o, a = 0; a < n.length; a++) {
            var l = n[a], s = {};
            if ("local" === l.term && i.spLocalStorage()) {
                var r = JSON.parse(i.storageLocalVal({key: "local_info"}));
                l.name = r ? r.selectCity ? r.selectCity.gcity : r.lastCity ? r.lastCity.cityPname ? r.lastCity.cityPname : "\u672c\u5730" : l.name : l.name
            }
            if (s.channelId = l.data.channelId, s.haschild = !1, s.ADpath = l.path, m.state(l.route, d), l.childroute.length > 0) {
                s.haschild = !0;
                for (var c = 0; c < l.childroute.length; c++)m.state(l.childroute[c].route, d)
            }
            t.DP.routereg(l), t.channelName[l.route] = s, t.channelPath[l.route] = l.path
        }
        t.channelMap = n
    }

    var l = t.tools, i = (t.Nav, t.indexTools), o = [{
        route: ":firstname(" + t.routename + "all)",
        term: "all",
        name: "\u63a8\u8350",
        path: "http://temp.163.com/special/00804KT2/wap_ad_sy.js",
        display: 2,
        data: {
            channelId: "tuijian",
            channel: "tuijian",
            name: "\u63a8\u8350",
            articleList: {topicid: "BA8J7DG9wangning", topdataPriority: 100}
        },
        childroute: []
    }, {
        route: ":firstname(" + t.routename + "news)",
        term: "news",
        name: "\u65b0\u95fb",
        path: "http://temp.163.com/special/00804KT2/wap_ad_news.js",
        display: 1,
        data: {channelId: "0001"},
        childroute: [{
            route: ":firstname(" + t.routename + "news)/subchannel/:secondname(all)",
            name: "\u9996\u9875",
            path: "http://temp.163.com/special/00804KT2/wap_ad_news.js",
            term: "all"
        }, {
            route: ":firstname(" + t.routename + "news)/subchannel/:secondname(discovery)",
            name: "\u63a2\u7d22",
            path: "",
            term: "discovery"
        }, {
            route: ":firstname(" + t.routename + "news)/subchannel/:secondname(society)",
            name: "\u793e\u4f1a",
            path: "",
            term: "society"
        }, {
            route: ":firstname(" + t.routename + "news)/subchannel/:secondname(domestic)",
            name: "\u56fd\u5185",
            path: "",
            term: "domestic"
        }, {
            route: ":firstname(" + t.routename + "news)/subchannel/:secondname(international)",
            name: "\u56fd\u9645",
            path: "",
            term: "international"
        }]
    }, {
        route: ":firstname(" + t.routename + "ent)",
        path: "http://temp.163.com/special/00804KT2/wap_ad_ent.js",
        display: 1,
        term: "ent",
        name: "\u5a31\u4e50",
        data: {channelId: "0003"},
        childroute: [{
            route: ":firstname(" + t.routename + "ent)/subchannel/:secondname(all)",
            name: "\u9996\u9875",
            path: "http://temp.163.com/special/00804KT2/wap_ad_ent.js",
            term: "all"
        }, {
            route: ":firstname(" + t.routename + "ent)/subchannel/:secondname(television)",
            name: "\u7535\u89c6",
            path: "",
            term: "television"
        }, {
            route: ":firstname(" + t.routename + "ent)/subchannel/:secondname(movie)",
            name: "\u7535\u5f71",
            path: "",
            term: "movie"
        }, {
            route: ":firstname(" + t.routename + "ent)/subchannel/:secondname(star)",
            name: "\u660e\u661f",
            path: "",
            term: "star"
        }, {
            route: ":firstname(" + t.routename + "ent)/subchannel/:secondname(music)",
            name: "\u97f3\u4e50",
            path: "",
            term: "music"
        }]
    }, {
        route: ":firstname(" + t.routename + "sports)",
        term: "sports",
        name: "\u4f53\u80b2",
        path: "http://temp.163.com/special/00804KT2/wap_ad_sports.js",
        display: 1,
        data: {channelId: "0005"},
        childroute: [{
            route: ":firstname(" + t.routename + "sports)/subchannel/:secondname(all)",
            name: "\u9996\u9875",
            path: "http://temp.163.com/special/00804KT2/wap_ad_sports.js",
            term: "all"
        }, {
            route: ":firstname(" + t.routename + "sports)/subchannel/:secondname(live)",
            name: "\u8d5b\u4e8b",
            path: "",
            term: "live"
        }, {
            route: ":firstname(" + t.routename + "sports)/subchannel/:secondname(nba)",
            name: "NBA",
            path: "",
            term: "nba"
        }, {
            route: ":firstname(" + t.routename + "sports)/subchannel/:secondname(cba)",
            name: "CBA",
            path: "",
            term: "cba"
        }, {
            route: ":firstname(" + t.routename + "sports)/subchannel/:secondname(csl)",
            name: "\u4e2d\u8d85",
            path: "",
            term: "csl"
        }, {
            route: ":firstname(" + t.routename + "sports)/subchannel/:secondname(isocce)",
            name: "\u56fd\u9645\u8db3\u7403",
            path: "",
            term: "isocce"
        }, {
            route: ":firstname(" + t.routename + "sports)/subchannel/:secondname(synthesis)",
            name: "\u7efc\u5408",
            path: "",
            term: "synthesis"
        }]
    }, {
        route: ":firstname(" + t.routename + "money)",
        term: "money",
        name: "\u8d22\u7ecf",
        path: "http://temp.163.com/special/00804KT2/wap_ad_money.js",
        display: 1,
        data: {channelId: "0025"},
        childroute: [{
            route: ":firstname(" + t.routename + "money)/subchannel/:secondname(all)",
            name: "\u9996\u9875",
            path: "http://temp.163.com/special/00804KT2/wap_ad_money.js",
            term: "all"
        }, {
            route: ":firstname(" + t.routename + "money)/subchannel/:secondname(shares)",
            name: "\u80a1\u7968",
            path: "",
            term: "shares"
        }, {
            route: ":firstname(" + t.routename + "money)/subchannel/:secondname(fund)",
            name: "\u57fa\u91d1",
            path: "",
            term: "fund"
        }, {
            route: ":firstname(" + t.routename + "money)/subchannel/:secondname(commercial)",
            name: "\u5546\u4e1a",
            path: "",
            term: "commercial"
        }]
    }, {
        route: ":firstname(" + t.routename + "auto)",
        term: "auto",
        name: "\u6c7d\u8f66",
        path: "http://temp.163.com/special/00804KT2/wap_ad_auto.js",
        display: 2,
        data: {channelId: "0008"},
        childroute: []
    }, {
        route: ":firstname(" + t.routename + "war)",
        name: "\u519b\u4e8b",
        term: "war",
        path: "",
        display: 1,
        data: {channelId: "war"},
        childroute: []
    }, {
        route: ":firstname(" + t.routename + "photo)",
        term: "photo",
        name: "\u56fe\u7247",
        path: "",
        display: -1,
        data: {channelId: "0030"},
        childroute: [{
            route: ":firstname(" + t.routename + "photo)/subchannel/:secondname(beauty)",
            name: "\u7f8e\u56fe",
            path: "",
            term: "beauty"
        }, {
            route: ":firstname(" + t.routename + "photo)/subchannel/:secondname(news)",
            name: "\u65b0\u95fb",
            path: "",
            term: "news"
        }, {
            route: ":firstname(" + t.routename + "photo)/subchannel/:secondname(star)",
            name: "\u660e\u661f",
            path: "",
            term: "star"
        }, {
            route: ":firstname(" + t.routename + "photo)/subchannel/:secondname(sports)",
            name: "\u4f53\u575b",
            path: "",
            term: "sports"
        }, {
            route: ":firstname(" + t.routename + "photo)/subchannel/:secondname(all)",
            name: "\u70ed\u70b9",
            path: "",
            term: "all"
        }]
    }, {
        route: ":firstname(" + t.routename + "video)",
        term: "video",
        name: "\u89c6\u9891",
        path: "",
        display: -1,
        data: {channelId: "0025"},
        childroute: [{
            route: ":firstname(" + t.routename + "video)/subchannel/:secondname(all)",
            name: "\u63a8\u8350",
            path: "",
            term: "all",
            data: {channelId: "VATL2LQO4"}
        }, {
            route: ":firstname(" + t.routename + "video)/subchannel/:secondname(amuse)",
            name: "\u641e\u7b11",
            path: "",
            term: "amuse",
            data: {channelId: "VAP4BFE3U"}
        }, {
            route: ":firstname(" + t.routename + "video)/subchannel/:secondname(beauty)",
            name: "\u7f8e\u5973",
            path: "",
            term: "beauty",
            data: {channelId: "VAP4BG6DL"}
        }, {
            route: ":firstname(" + t.routename + "video)/subchannel/:secondname(newscene)",
            name: "\u65b0\u95fb\u73b0\u573a",
            path: "",
            term: "newscene",
            data: {channelId: "VAV3H6JSN"}
        }, {
            route: ":firstname(" + t.routename + "video)/subchannel/:secondname(BoBo)",
            name: "BoBo",
            path: "",
            term: "BoBo",
            data: {channelId: "VBK3JKUIF"}
        }, {
            route: ":firstname(" + t.routename + "video)/subchannel/:secondname(moe)",
            name: "\u840c\u7269",
            path: "",
            term: "moe",
            data: {channelId: "VAP4BFR16"}
        }, {
            route: ":firstname(" + t.routename + "video)/subchannel/:secondname(goosip)",
            name: "\u516b\u5366",
            path: "",
            term: "goosip",
            data: {channelId: "VBF8EUDUS"}
        }, {
            route: ":firstname(" + t.routename + "video)/subchannel/:secondname(novelty)",
            name: "\u730e\u5947",
            path: "",
            term: "novelty",
            data: {channelId: "VBF8ET3S2"}
        }, {
            route: ":firstname(" + t.routename + "video)/subchannel/:secondname(sports)",
            name: "\u4f53\u80b2",
            path: "",
            term: "sports",
            data: {channelId: "VBF8F2E94"}
        }, {
            route: ":firstname(" + t.routename + "video)/subchannel/:secondname(blacktech)",
            name: "\u9ed1\u79d1\u6280",
            path: "",
            term: "blacktech",
            data: {channelId: "VBF8F2PKF"}
        }, {
            route: ":firstname(" + t.routename + "video)/subchannel/:secondname(knowladge)",
            name: "\u6da8\u59ff\u52bf",
            path: "",
            term: "knowladge",
            data: {channelId: "VBF8F3SGL"}
        }, {
            route: ":firstname(" + t.routename + "video)/subchannel/:secondname(acgn)",
            name: "\u4e8c\u6b21\u5143",
            path: "",
            term: "acgn",
            data: {channelId: "VBF8F1PSA"}
        }, {
            route: ":firstname(" + t.routename + "video)/subchannel/:secondname(equip)",
            name: "\u519b\u6b66",
            path: "",
            term: "equip",
            data: {channelId: "VBF8F3301"}
        }]
    }, {
        route: ":firstname(" + t.routename + "joke)",
        name: "\u6bb5\u5b50",
        term: "joke",
        path: "",
        display: -1,
        data: {channelId: "joke"},
        childroute: []
    }, {
        route: ":firstname(" + t.routename + "idol)",
        path: "",
        term: "idol",
        name: "\u661f\u95fb",
        display: -1,
        data: {channelId: "lovelive"},
        childroute: []
    }, {
        route: ":firstname(" + t.routename + "lady)",
        term: "lady",
        name: "\u65f6\u5c1a",
        path: "http://temp.163.com/special/00804KT2/wap_ad_lady.js",
        display: -1,
        data: {channelId: "0026"},
        childroute: [{
            route: ":firstname(" + t.routename + "lady)/subchannel/:secondname(all)",
            name: "\u9996\u9875",
            path: "http://temp.163.com/special/00804KT2/wap_ad_lady.js",
            term: "all"
        }, {
            route: ":firstname(" + t.routename + "lady)/subchannel/:secondname(love)",
            name: "\u60c5\u7231",
            path: "",
            term: "love"
        }, {
            route: ":firstname(" + t.routename + "lady)/subchannel/:secondname(dress)",
            name: "\u670d\u9970",
            path: "",
            term: "dress"
        }, {
            route: ":firstname(" + t.routename + "lady)/subchannel/:secondname(beauty)",
            name: "\u7f8e\u5bb9",
            path: "",
            term: "beauty"
        }]
    }, {
        route: ":firstname(" + t.routename + "local)",
        term: "local",
        name: "\u672c\u5730",
        path: "",
        display: -1,
        data: {channelId: "local"},
        childroute: []
    }, {
        route: ":firstname(" + t.routename + "dy)",
        term: "dy",
        display: -1,
        name: "\u8ba2\u9605",
        path: "http://temp.163.com/special/00804KT2/wap_ad_ydingyue.js",
        data: {channelId: "dy"},
        childroute: []
    }, {
        route: ":firstname(" + t.routename + "mobile)",
        term: "mobile",
        name: "\u624b\u673a",
        path: "http://temp.163.com/special/00804KT2/wap_ad_tech.js",
        display: -1,
        data: {channelId: "0011"},
        childroute: [{
            route: ":firstname(" + t.routename + "mobile)/subchannel/:secondname(all)",
            name: "\u9996\u9875",
            path: "http://temp.163.com/special/00804KT2/wap_ad_tech.js",
            term: "all"
        }, {
            route: ":firstname(" + t.routename + "mobile)/subchannel/:secondname(new)",
            name: "\u65b0\u673a",
            path: "",
            term: "new"
        }, {
            route: ":firstname(" + t.routename + "mobile)/subchannel/:secondname(test)",
            name: "\u8bc4\u6d4b",
            path: "",
            term: "test"
        }, {
            route: ":firstname(" + t.routename + "mobile)/subchannel/:secondname(buy)",
            name: "\u8d2d\u673a",
            path: "",
            term: "buy"
        }]
    }, {
        route: ":firstname(" + t.routename + "open)",
        term: "open",
        name: "\u516c\u5f00\u8bfe",
        path: "",
        display: -1,
        data: {channelId: "open"},
        childroute: []
    }, {
        route: ":firstname(" + t.routename + "tech)",
        term: "tech",
        name: "\u79d1\u6280",
        path: "http://temp.163.com/special/00804KT2/wap_ad_tech.js",
        display: -1,
        data: {channelId: "0009"},
        childroute: [{
            route: ":firstname(" + t.routename + "tech)/subchannel/:secondname(all)",
            name: "\u9996\u9875",
            path: "http://temp.163.com/special/00804KT2/wap_ad_tech.js",
            term: "all"
        }, {
            route: ":firstname(" + t.routename + "tech)/subchannel/:secondname(club)",
            name: "\u521b\u4e1aClub",
            path: "",
            term: "club"
        }, {
            route: ":firstname(" + t.routename + "tech)/subchannel/:secondname(intelligent)",
            name: "\u667a\u80fd\u786c\u4ef6",
            path: "",
            term: "intelligent"
        }, {
            route: ":firstname(" + t.routename + "tech)/subchannel/:secondname(neview)",
            name: "\u6613\u89c1",
            path: "",
            term: "neview"
        }, {
            route: ":firstname(" + t.routename + "tech)/subchannel/:secondname(threeclock)",
            name: "\u4e09\u70b9\u6574",
            path: "",
            term: "threeclock"
        }, {
            route: ":firstname(" + t.routename + "tech)/subchannel/:secondname(nejudge)",
            name: "\u6613\u8bc4",
            path: "",
            term: "nejudge"
        }]
    }, {
        route: ":firstname(" + t.routename + "game)",
        term: "game",
        name: "\u6e38\u620f",
        path: "http://temp.163.com/special/00804KT2/wap_ad_game.js",
        display: -1,
        data: {channelId: "0031"},
        childroute: []
    }, {
        route: ":firstname(" + t.routename + "digi)",
        term: "digi",
        name: "\u6570\u7801",
        path: "http://temp.163.com/special/00804KT2/wap_ad_tech.js",
        display: -1,
        data: {channelId: "0016"},
        childroute: [{
            route: ":firstname(" + t.routename + "digi)/subchannel/:secondname(all)",
            name: "\u9996\u9875",
            path: "http://temp.163.com/special/00804KT2/wap_ad_tech.js",
            term: "all"
        }, {
            route: ":firstname(" + t.routename + "digi)/subchannel/:secondname(notebook)",
            name: "\u7b14\u8bb0\u672c\u8bc4\u6d4b",
            path: "",
            term: "notebook"
        }, {
            route: ":firstname(" + t.routename + "digi)/subchannel/:secondname(cameratest)",
            name: "\u76f8\u673a\u8bc4\u6d4b",
            path: "",
            term: "cameratest"
        }, {
            route: ":firstname(" + t.routename + "digi)/subchannel/:secondname(camera)",
            name: "\u76f8\u673a\u884c\u60c5",
            path: "",
            term: "camera"
        }, {
            route: ":firstname(" + t.routename + "digi)/subchannel/:secondname(hea)",
            name: "\u5bb6\u7535",
            path: "",
            term: "hea"
        }]
    }, {
        route: ":firstname(" + t.routename + "edu)",
        term: "edu",
        name: "\u6559\u80b2",
        path: "",
        display: -1,
        data: {channelId: "0029"},
        childroute: [{
            route: ":firstname(" + t.routename + "edu)/subchannel/:secondname(all)",
            name: "\u9996\u9875",
            path: "",
            term: "all"
        }, {
            route: ":firstname(" + t.routename + "edu)/subchannel/:secondname(aboard)",
            name: "\u7559\u5b66",
            path: "",
            term: "aboard"
        }, {
            route: ":firstname(" + t.routename + "edu)/subchannel/:secondname(migrant)",
            name: "\u79fb\u6c11",
            path: "",
            term: "migrant"
        }, {
            route: ":firstname(" + t.routename + "edu)/subchannel/:secondname(pmschool)",
            name: "\u4e2d\u5c0f\u5b66",
            path: "",
            term: "pmschool"
        }, {
            route: ":firstname(" + t.routename + "edu)/subchannel/:secondname(foreign)",
            name: "\u5916\u8bed",
            path: "",
            term: "foreign"
        }]
    }, {
        route: ":firstname(" + t.routename + "jiankang)",
        term: "jiankang",
        name: "\u5065\u5eb7",
        path: "http://temp.163.com/special/00804KT2/wap_ad_jiankang.js",
        display: -1,
        data: {channelId: "0038"},
        childroute: []
    }, {
        route: ":firstname(" + t.routename + "exclusive)",
        term: "exclusive",
        name: "\u72ec\u5bb6",
        path: "http://temp.163.com/special/00804KT2/wap_ad_yuanchuang.js",
        display: -1,
        data: {channelId: "0004"},
        childroute: [{
            route: ":firstname(" + t.routename + "exclusive)/subchannel/:secondname(all)",
            name: "\u9996\u9875",
            path: "http://temp.163.com/special/00804KT2/wap_ad_yuanchuang.js",
            term: "all"
        }, {
            route: ":firstname(" + t.routename + "exclusive)/subchannel/:secondname(qsyk)",
            name: "\u8f7b\u677e\u4e00\u523b",
            path: "",
            term: "qsyk"
        }, {
            route: ":firstname(" + t.routename + "exclusive)/subchannel/:secondname(pbgt)",
            name: "\u80d6\u7f16\u602a\u8c08",
            path: "",
            term: "pbgt"
        }, {
            route: ":firstname(" + t.routename + "exclusive)/subchannel/:secondname(clock7news)",
            name: "\u65b0\u95fb\u4e03\u70b9\u6574",
            path: "",
            term: "clock7news"
        }, {
            route: ":firstname(" + t.routename + "exclusive)/subchannel/:secondname(todayvoice)",
            name: "\u4eca\u65e5\u4e4b\u58f0",
            path: "",
            term: "todayvoice"
        }, {
            route: ":firstname(" + t.routename + "exclusive)/subchannel/:secondname(chatinnight)",
            name: "\u6df1\u591c\u7545\u804a",
            path: "",
            term: "chatinnight"
        }, {route: "http://dada.3g.163.com", name: "\u54d2\u54d2", path: "", term: "link_dada"}]
    }, {
        route: ":firstname(" + t.routename + "travel)",
        term: "travel",
        name: "\u65c5\u6e38",
        path: "",
        display: -1,
        data: {channelId: "0006"},
        childroute: []
    }, {
        route: ":firstname(" + t.routename + "baby)",
        term: "baby",
        name: "\u4eb2\u5b50",
        path: "",
        display: -1,
        data: {channelId: "0036"},
        childroute: []
    }, {
        route: "http://house.3g.163.com",
        term: "link_house",
        name: "\u623f\u4ea7",
        path: "",
        display: -1,
        data: {channelId: ""},
        childroute: []
    }, {
        route: "http://home.3g.163.com",
        term: "link_home",
        name: "\u5bb6\u5c45",
        path: "",
        display: -1,
        data: {channelId: ""},
        childroute: []
    }, {
        route: "http://yuedu.3g.163.com",
        term: "link_yuedu",
        name: "\u5c0f\u8bf4",
        path: "",
        display: -1,
        data: {channelId: ""},
        childroute: []
    }, {
        route: "http://manhua.3g.163.com",
        term: "link_comic",
        name: "\u6f2b\u753b",
        path: "",
        display: -1,
        data: {channelId: ""},
        childroute: []
    }, {
        route: "http://3g.163.com/touch/navigation/",
        term: "link_navall",
        name: "\u66f4\u591a",
        display: 0,
        path: "",
        data: {},
        childroute: []
    }], s = [{
        route: ":firstname(" + t.routename + "all)",
        term: "all",
        name: "\u63a8\u8350",
        path: "http://temp.163.com/special/00804KT2/wap_ad_sy.js",
        display: -1,
        data: {
            channelId: "tuijian",
            channel: "tuijian",
            name: "\u63a8\u8350",
            articleList: {topicid: "BA8J7DG9wangning", topdataPriority: 100}
        },
        childroute: []
    }, {
        route: ":firstname(" + t.routename + "news)",
        term: "news",
        name: "\u65b0\u95fb",
        path: "http://temp.163.com/special/00804KT2/wap_ad_news.js",
        display: -1,
        data: {channelId: "0001"},
        childroute: [{
            route: ":firstname(" + t.routename + "news)/subchannel/:secondname(all)",
            name: "\u9996\u9875",
            path: "http://temp.163.com/special/00804KT2/wap_ad_news.js",
            term: "all"
        }, {
            route: ":firstname(" + t.routename + "news)/subchannel/:secondname(discovery)",
            name: "\u63a2\u7d22",
            path: "",
            term: "discovery"
        }, {
            route: ":firstname(" + t.routename + "news)/subchannel/:secondname(society)",
            name: "\u793e\u4f1a",
            path: "",
            term: "society"
        }, {
            route: ":firstname(" + t.routename + "news)/subchannel/:secondname(domestic)",
            name: "\u56fd\u5185",
            path: "",
            term: "domestic"
        }, {
            route: ":firstname(" + t.routename + "news)/subchannel/:secondname(international)",
            name: "\u56fd\u9645",
            path: "",
            term: "international"
        }]
    }, {
        route: ":firstname(" + t.routename + "ent)",
        path: "http://temp.163.com/special/00804KT2/wap_ad_ent.js",
        term: "ent",
        name: "\u5a31\u4e50",
        display: -1,
        data: {channelId: "0003"},
        childroute: [{
            route: ":firstname(" + t.routename + "ent)/subchannel/:secondname(all)",
            name: "\u9996\u9875",
            path: "http://temp.163.com/special/00804KT2/wap_ad_ent.js",
            term: "all"
        }, {
            route: ":firstname(" + t.routename + "ent)/subchannel/:secondname(television)",
            name: "\u7535\u89c6",
            path: "",
            term: "television"
        }, {
            route: ":firstname(" + t.routename + "ent)/subchannel/:secondname(movie)",
            name: "\u7535\u5f71",
            path: "",
            term: "movie"
        }, {
            route: ":firstname(" + t.routename + "ent)/subchannel/:secondname(star)",
            name: "\u660e\u661f",
            path: "",
            term: "star"
        }, {
            route: ":firstname(" + t.routename + "ent)/subchannel/:secondname(music)",
            name: "\u97f3\u4e50",
            path: "",
            term: "music"
        }]
    }, {
        route: ":firstname(" + t.routename + "sports)",
        term: "sports",
        name: "\u4f53\u80b2",
        path: "http://temp.163.com/special/00804KT2/wap_ad_sports.js",
        display: -1,
        data: {channelId: "0005"},
        childroute: [{
            route: ":firstname(" + t.routename + "sports)/subchannel/:secondname(all)",
            name: "\u9996\u9875",
            path: "http://temp.163.com/special/00804KT2/wap_ad_sports.js",
            term: "all"
        }, {
            route: ":firstname(" + t.routename + "sports)/subchannel/:secondname(live)",
            name: "\u8d5b\u4e8b",
            path: "",
            term: "live"
        }, {
            route: ":firstname(" + t.routename + "sports)/subchannel/:secondname(nba)",
            name: "NBA",
            path: "",
            term: "nba"
        }, {
            route: ":firstname(" + t.routename + "sports)/subchannel/:secondname(cba)",
            name: "CBA",
            path: "",
            term: "cba"
        }, {
            route: ":firstname(" + t.routename + "sports)/subchannel/:secondname(csl)",
            name: "\u4e2d\u8d85",
            path: "",
            term: "csl"
        }, {
            route: ":firstname(" + t.routename + "sports)/subchannel/:secondname(isocce)",
            name: "\u56fd\u9645\u8db3\u7403",
            path: "",
            term: "isocce"
        }, {
            route: ":firstname(" + t.routename + "sports)/subchannel/:secondname(synthesis)",
            name: "\u7efc\u5408",
            path: "",
            term: "synthesis"
        }]
    }, {
        route: ":firstname(" + t.routename + "money)",
        term: "money",
        name: "\u8d22\u7ecf",
        path: "http://temp.163.com/special/00804KT2/wap_ad_money.js",
        display: -1,
        data: {channelId: "0025"},
        childroute: [{
            route: ":firstname(" + t.routename + "money)/subchannel/:secondname(all)",
            name: "\u9996\u9875",
            path: "http://temp.163.com/special/00804KT2/wap_ad_money.js",
            term: "all"
        }, {
            route: ":firstname(" + t.routename + "money)/subchannel/:secondname(shares)",
            name: "\u80a1\u7968",
            path: "",
            term: "shares"
        }, {
            route: ":firstname(" + t.routename + "money)/subchannel/:secondname(fund)",
            name: "\u57fa\u91d1",
            path: "",
            term: "fund"
        }, {
            route: ":firstname(" + t.routename + "money)/subchannel/:secondname(commercial)",
            name: "\u5546\u4e1a",
            path: "",
            term: "commercial"
        }]
    }, {
        route: ":firstname(" + t.routename + "photo)",
        term: "photo",
        name: "\u56fe\u7247",
        display: -1,
        path: "",
        data: {channelId: "0030"},
        childroute: [{
            route: ":firstname(" + t.routename + "photo)/subchannel/:secondname(beauty)",
            name: "\u7f8e\u56fe",
            path: "",
            term: "beauty"
        }, {
            route: ":firstname(" + t.routename + "photo)/subchannel/:secondname(news)",
            name: "\u65b0\u95fb",
            path: "",
            term: "news"
        }, {
            route: ":firstname(" + t.routename + "photo)/subchannel/:secondname(star)",
            name: "\u660e\u661f",
            path: "",
            term: "star"
        }, {
            route: ":firstname(" + t.routename + "photo)/subchannel/:secondname(sports)",
            name: "\u4f53\u575b",
            path: "",
            term: "sports"
        }, {
            route: ":firstname(" + t.routename + "photo)/subchannel/:secondname(all)",
            name: "\u70ed\u70b9",
            path: "",
            term: "all"
        }]
    }, {
        route: ":firstname(" + t.routename + "tech)",
        term: "tech",
        name: "\u79d1\u6280",
        path: "http://temp.163.com/special/00804KT2/wap_ad_tech.js",
        display: -1,
        data: {channelId: "0009"},
        childroute: [{
            route: ":firstname(" + t.routename + "tech)/subchannel/:secondname(all)",
            name: "\u9996\u9875",
            path: "http://temp.163.com/special/00804KT2/wap_ad_tech.js",
            term: "all"
        }, {
            route: ":firstname(" + t.routename + "tech)/subchannel/:secondname(club)",
            name: "\u521b\u4e1aClub",
            path: "",
            term: "club"
        }, {
            route: ":firstname(" + t.routename + "tech)/subchannel/:secondname(intelligent)",
            name: "\u667a\u80fd\u786c\u4ef6",
            path: "",
            term: "intelligent"
        }, {
            route: ":firstname(" + t.routename + "tech)/subchannel/:secondname(neview)",
            name: "\u6613\u89c1",
            path: "",
            term: "neview"
        }, {
            route: ":firstname(" + t.routename + "tech)/subchannel/:secondname(threeclock)",
            name: "\u4e09\u70b9\u6574",
            path: "",
            term: "threeclock"
        }, {
            route: ":firstname(" + t.routename + "tech)/subchannel/:secondname(nejudge)",
            name: "\u6613\u8bc4",
            path: "",
            term: "nejudge"
        }]
    }], r = [{
        route: ":firstname(" + t.routename + "ent)",
        path: "http://temp.163.com/special/00804KT2/wap_ad_ent.js",
        term: "ent",
        name: "\u5a31\u4e50",
        display: -1,
        data: {channelId: "0003"},
        childroute: [{
            route: ":firstname(" + t.routename + "ent)/subchannel/:secondname(all)",
            name: "\u9996\u9875",
            path: "http://temp.163.com/special/00804KT2/wap_ad_ent.js",
            term: "all"
        }, {
            route: ":firstname(" + t.routename + "ent)/subchannel/:secondname(television)",
            name: "\u7535\u89c6",
            path: "",
            term: "television"
        }, {
            route: ":firstname(" + t.routename + "ent)/subchannel/:secondname(movie)",
            name: "\u7535\u5f71",
            path: "",
            term: "movie"
        }, {
            route: ":firstname(" + t.routename + "ent)/subchannel/:secondname(star)",
            name: "\u660e\u661f",
            path: "",
            term: "star"
        }, {
            route: ":firstname(" + t.routename + "ent)/subchannel/:secondname(music)",
            name: "\u97f3\u4e50",
            path: "",
            term: "music"
        }]
    }], c = [{
        route: ":firstname(" + t.routename + "tech)",
        term: "tech",
        name: "\u79d1\u6280",
        path: "http://temp.163.com/special/00804KT2/wap_ad_tech.js",
        display: -1,
        data: {channelId: "0009"},
        childroute: [{
            route: ":firstname(" + t.routename + "tech)/subchannel/:secondname(all)",
            name: "\u9996\u9875",
            path: "http://temp.163.com/special/00804KT2/wap_ad_tech.js",
            term: "all"
        }, {
            route: ":firstname(" + t.routename + "tech)/subchannel/:secondname(club)",
            name: "\u521b\u4e1aClub",
            path: "",
            term: "club"
        }, {
            route: ":firstname(" + t.routename + "tech)/subchannel/:secondname(intelligent)",
            name: "\u667a\u80fd\u786c\u4ef6",
            path: "",
            term: "intelligent"
        }, {
            route: ":firstname(" + t.routename + "tech)/subchannel/:secondname(neview)",
            name: "\u6613\u89c1",
            path: "",
            term: "neview"
        }, {
            route: ":firstname(" + t.routename + "tech)/subchannel/:secondname(threeclock)",
            name: "\u4e09\u70b9\u6574",
            path: "",
            term: "threeclock"
        }, {
            route: ":firstname(" + t.routename + "tech)/subchannel/:secondname(nejudge)",
            name: "\u6613\u8bc4",
            path: "",
            term: "nejudge"
        }]
    }], h = [{
        route: ":firstname(" + t.routename + "digi)",
        term: "digi",
        name: "\u6570\u7801",
        path: "http://temp.163.com/special/00804KT2/wap_ad_tech.js",
        display: -1,
        data: {channelId: "0016"},
        childroute: [{
            route: ":firstname(" + t.routename + "digi)/subchannel/:secondname(all)",
            name: "\u9996\u9875",
            path: "http://temp.163.com/special/00804KT2/wap_ad_tech.js",
            term: "all"
        }, {
            route: ":firstname(" + t.routename + "digi)/subchannel/:secondname(notebook)",
            name: "\u7b14\u8bb0\u672c\u8bc4\u6d4b",
            path: "",
            term: "notebook"
        }, {
            route: ":firstname(" + t.routename + "digi)/subchannel/:secondname(cameratest)",
            name: "\u76f8\u673a\u8bc4\u6d4b",
            path: "",
            term: "cameratest"
        }, {
            route: ":firstname(" + t.routename + "digi)/subchannel/:secondname(camera)",
            name: "\u76f8\u673a\u884c\u60c5",
            path: "",
            term: "camera"
        }, {
            route: ":firstname(" + t.routename + "digi)/subchannel/:secondname(hea)",
            name: "\u5bb6\u7535",
            path: "",
            term: "hea"
        }]
    }], d = {
        enter: function (n) {
            var a = ":firstname(" + n.param.firstname + ")";
            if (n.param.firstname && !n.param.secondname && t.channelName[a].haschild)return n.stop(), "channel=photo" === n.param.firstname || "photo" === n.param.firstname ? m.go(a + "/subchannel/:secondname(beauty)", {
                param: {
                    firstname: n.param.firstname,
                    secondname: "beauty"
                }, replace: !0
            }) : m.go(a + "/subchannel/:secondname(all)", {
                param: {firstname: n.param.firstname, secondname: "all"},
                replace: !0
            });
            var l = n.param.firstname;
            window.now_cnn = l.replace("channel=", ""), e(window).trigger("enterChannel", n.param)
        }, leave: function (t) {
            e(window).trigger("leaveChannel", t.previous)
        }
    };
    n.prototype.getAllRoutelist = function (e) {
        var n = this;
        this.getbannerFlag ? l.publicMethod.fetch({
            url: "http://star.3g.163.com/star/star/list.html",
            dataType: "jsonp",
            notformat: !0,
            useflag: !1,
            cache: !0,
            jsonpCallback: "star",
            success: function (t) {
                var a = t.data, l = n.getRouteMap(a);
                n.regChildRouteMap(l, "idol"), n.getbannerFlag = !1, n.list = a, e && e(n.list)
            },
            error: function (e) {
                console.log(e), m.go(":firstname(" + t.routename + "all)", {
                    param: {firstname: t.routename + "all"},
                    replace: !0
                })
            }
        }) : e && e(n.list)
    }, n.prototype.getRouteMap = function (e) {
        for (var n = [], a = 0; a < e.length; a++) {
            var l = '{"route":":firstname(' + t.routename + "idol)/subchannel/:secondname(star" + e[a].id + ')","name":"' + e[a].name + '","path":"","term":"star' + e[a].id + '"}';
            n.push(JSON.parse(l)), t.channelMap[3].childroute.push(JSON.parse(l))
        }
        return n
    }, n.prototype.regChildRouteMap = function (e, n) {
        for (var a = 0; a < t.channelMap.length; a++)t.channelMap[a].term == n && (t.channelMap[a].childroute = e);
        if (e.length > 0)for (var l = 0; l < e.length; l++)m.state(e[l].route, d)
    };
    var u = t.IdolRouteHandle = new n;
    t.channelName = {}, t.channelPath = {}, t.channelMap = [];
    var m = window.stateman = new window.StateMan, p = l.publicMethod.localParam(), f = p.search;
    "qd" in f && "" != f.qd ? "gdwf_top" == f.qd ? a(s) : "wo" == f.qd ? "wo_tech" == f.category ? a(c) : "wo_ent" == f.category ? a(r) : "wo_digi" == f.category ? a(h) : a() : a() : a(), m.on("notfound", function (n) {
        var a = this;
        if (n.path.match("idol") && (m.state(":firstname(idol)") || m.state(":firstname(channel=idol)"))) {
            var l = n.path.match(/(star\w+)/) ? n.path.match(/(star\w+)/)[1] : "";
            u.getAllRoutelist(function (n) {
                var i = e.grep(n, function (e, t) {
                    return e.id == parseInt(l.match(/\d+/))
                });
                0 == i.length ? a.go(":firstname(" + t.routename + "all)", {
                    param: {firstname: t.routename + "all"},
                    replace: !0
                }) : a.go(":firstname(" + t.routename + "idol)/subchannel/:secondname(" + l + ")", {
                    param: {
                        firstname: t.routename + "idol",
                        secondname: l
                    }, replace: !0
                })
            })
        } else this.go(":firstname(" + t.routename + "all)", {param: {firstname: t.routename + "all"}, replace: !0})
    })
}(Zepto, window.NEWAP = window.NEWAP || {}), function (e, t) {
    function n() {
        this.config = {
            tnListContain: ".topnav_list_contain",
            tnList: ".topnav_list",
            tnItems: ".topnav_item",
            navexpandPanel: ".nav_expand_panel",
            navexpandBtn: ".topnav_expand_btn",
            snList: ".subnav_contain",
            snItems: ".subnav_item",
            pannelItems: ".pannel_item",
            contents: ".contents"
        }, this.hasSpecificStyle = {}, this.noBottomLine = {}, this.otherChannelConfig = {}, this.qd = a.publicMethod.getQD()
    }

    var a = (e(window), t.tools);
    n.prototype = {
        init: function () {
            Handlebars.registerHelper("getNavDisplaySet", function (e) {
                return 1 == e ? "first_char" : 2 == e ? "last_char" : ""
            }), Handlebars.registerHelper("getExpandLine", function (e, t) {
                return expand_channel.filter(function (t) {
                    return (!t.parent_term || "" === t.parent_term) && t.term === e
                }).length > 0 ? t.inverse(this) : t.fn(this)
            }), Handlebars.registerHelper("getChildName", function (e) {
                return e && e[0] ? e[0].term : "all"
            }), Handlebars.registerHelper("getTopChannelName", function (e) {
                return e.parent_term ? e.parent_term : e.term
            });
            var n = Handlebars.templates.module_ui_nav_v2_tpl({route: t.channelMap, expand: expand_channel});
            e(".bar_wrap").html(n), this.clickEvent(), this.scrollEvent()
        }, clickEvent: function () {
            var n = e(this.config.tnItems), a = e(this.config.snItems), l = e(this.config.navexpandPanel), i = e(this.config.navexpandBtn), o = e(this.config.pannelItems), s = this;
            n.on("click", function () {
                var n, a = (e(this), e(this).data("tcn")), o = e(this).data("scn");
                if (n = s.clickChannel(a, o), "function" == typeof neteaseTracker && s.qd && neteaseTracker(!1, "http://click.portal.163.com/wap/touch/#parentNav2ChannelClick_" + n.route.first + s.qd, "\u65b0\u7248\u4e00\u7ea7\u5bfc\u822a\u70b9\u51fb\u91cf", "clickp"), n.route.second || n.route.isLink) {
                    if (n.route.second)stateman.go(":firstname(" + t.routename + n.route.first + ")/subchannel/:secondname(" + n.route.second + ")", {
                        param: {
                            firstname: t.routename + n.route.first,
                            secondname: n.route.second
                        }
                    }); else if (n.route.isLink)try {
                        window.open(n.route.link)
                    } catch (r) {
                        window.location.href = n.route.link
                    }
                } else stateman.go(":firstname(" + t.routename + n.route.first + ")", {param: {firstname: t.routename + n.route.first}});
                i.removeClass("expanded"), l.removeClass("show")
            }), a.on("click", function () {
                var n, a = (e(this), e(this).parent().data("tcn")), l = e(this).data("scn");
                if (n = s.clickChannel(a, l), "function" == typeof neteaseTracker && s.qd && neteaseTracker(!1, "http://click.portal.163.com/wap/touch/#parentNav2ChannelClick_" + n.route.first + "_" + n.route.second + s.qd, "\u65b0\u7248\u4e8c\u7ea7\u5bfc\u822a\u70b9\u51fb\u91cf", "clickp"), n.route.second && !n.route.isLink)stateman.go(":firstname(" + t.routename + n.route.first + ")/subchannel/:secondname(" + n.route.second + ")", {
                    param: {
                        firstname: t.routename + n.route.first,
                        secondname: n.route.second
                    }
                }); else if (n.route.isLink)try {
                    window.open(n.route.link)
                } catch (i) {
                    window.location.href = n.route.link
                }
            }), o.on("click", function () {
                var n, a = e(this).data("tcn"), o = e(this).data("scn");
                if (n = a === o && t.infoFlow.channelChildMap[a] ? s.clickChannel(a, t.infoFlow.channelChildMap[a]) : s.clickChannel(a, o), "function" == typeof neteaseTracker && s.qd && (n.route.second ? neteaseTracker(!1, "http://click.portal.163.com/wap/touch/#panelNav2ChannelClick_" + n.route.first + "_" + n.route.second + s.qd, "\u65b0\u7248\u5c55\u5f00\u5bfc\u822a\u70b9\u51fb\u91cf", "clickp") : neteaseTracker(!1, "http://click.portal.163.com/wap/touch/#panelNav2ChannelClick_" + n.route.first + s.qd, "\u65b0\u7248\u5c55\u5f00\u5bfc\u822a\u70b9\u51fb\u91cf", "clickp")), a.match(/^link_\w+/)) {
                    var r = e(this).data("exsaber");
                    try {
                        window.open(r)
                    } catch (c) {
                        window.location.href = r
                    }
                } else if (n.route.second || n.route.isLink) {
                    if (n.route.second)stateman.go(":firstname(" + t.routename + n.route.first + ")/subchannel/:secondname(" + n.route.second + ")", {
                        param: {
                            firstname: t.routename + n.route.first,
                            secondname: n.route.second
                        }
                    }), l.toggleClass("show"), i.toggleClass("expanded"); else if (n.route.isLink)try {
                        window.open(n.route.link)
                    } catch (c) {
                        window.location.href = n.route.link
                    }
                } else stateman.go(":firstname(" + t.routename + n.route.first + ")", {param: {firstname: t.routename + n.route.first}}), l.toggleClass("show"), i.toggleClass("expanded")
            }), i.on("click", function () {
                e(this).toggleClass("expanded"), l.toggleClass("show")
            }), l.on("touchmove", function (e) {
                e.preventDefault()
            })
        }, scrollEvent: function () {
            var t = e(this.config.tnList), n = e(this.config.tnListContain);
            t.on("scroll touchmove", function () {
                0 === this.scrollLeft && n.hasClass("onscroll") ? n.removeClass("onscroll") : n.hasClass("onscroll") || 0 === this.scrollLeft || n.addClass("onscroll")
            })
        }, smoothTo: function (e, n) {
            var a, l = 0;
            try {
                l = e[0].offsetLeft - 75
            } catch (i) {
            }
            l = 0 > l ? 0 : l > n[0].scrollWidth - n[0].clientWidth ? n[0].scrollWidth - n[0].clientWidth : l, a && a.stop(), a = t.tools.publicMethod.simpleTransition(n[0].scrollLeft, l, .25, function (e) {
                n.scrollLeft(e)
            })
        }, toChannel: function (n, a) {
            var l = n.replace("channel=", ""), i = a || "", o = this, s = [], r = e(this.config.tnItems), c = e("#topchild_" + l), h = e(this.config.tnList), d = e(this.config.contents), u = e(this.config.snList), m = !1, p = !1;
            if (c.hasClass("current") || (r.removeClass("current"), c.addClass("current"), o.smoothTo(c, h)), s = t.channelMap.filter(function (e) {
                        return e.term === l
                    }), p = s[0] ? s[0].childroute.length > 0 : !1, m = "" != i && p ? s[0].childroute.filter(function (e) {
                        return e.term === i
                    }) : !1, "" != i && p && m)if (l in this.otherChannelConfig)e(this.otherChannelConfig[l].child).removeClass("current"), e(this.otherChannelConfig[l].childbar).find(".childchannel_" + i).addClass("current"), d.css({
                transform: "translateY(0px)",
                "-webkit-transform": "translateY(0px)"
            }); else {
                u.removeClass("show"), e("#subchild_" + l).addClass("show"), e("#subchild_" + l).find(".subnav_item").removeClass("current"), e("#subchild_" + l + "_" + i).addClass("current"), e("#topchild_" + l).data("scn", i);
                var f = getComputedStyle(e("#subchild_" + l)[0]), v = f ? f.height : 0;
                d.css({
                    transform: "translateY(" + v + ")",
                    "-webkit-transform": "translateY(" + v + ")"
                }), o.smoothTo(e("#subchild_" + l + "_" + i), e("#subchild_" + l).children("ul"))
            } else d.css({transform: "translateY(0px)", "-webkit-transform": "translateY(0px)"});
            !s || !p || s[0].term in o.noBottomLine ? e(".main_nav_bar").removeClass(" has_subnav") : e(".main_nav_bar").addClass(" has_subnav")
        }, clickChannel: function (e, n) {
            var a = {route: {first: e, isLink: !1}}, l = [], i = !1, o = !1;
            if (l = t.channelMap.filter(function (t) {
                        return t.term === e
                    }), a.config = l[0], n) {
                i = l[0] ? l[0].childroute.length > 0 : !1;
                var s = l[0].childroute.filter(function (e) {
                    return e.term === n
                });
                o = i ? s.length > 0 : !1, o ? (a.route.second = n, n.match(/^link_\w+/) && (a.route.isLink = !0, a.route.link = s[0].route)) : l[0] && l[0].childroute.length > 0 && (a.route.second = l[0].childroute[0].term)
            }
            return l[0] && l[0].term.match(/^link_\w+/) && (a.route.isLink = !0, a.route.link = a.config.route), a
        }, photoChildBind: function () {
            var n = this;
            e("#channel_photo").on("click", ".childchannel-photoset .item_cell", function (a) {
                var l = n.clickChannel("photo", e(this).data("scn"));
                l.route.second && stateman.go(":firstname(" + t.routename + l.route.first + ")/subchannel/:secondname(" + l.route.second + ")", {
                    param: {
                        firstname: t.routename + l.route.first,
                        secondname: l.route.second
                    }
                })
            })
        }, idolChildBind: function () {
            var n = this;
            e("#subchild_idol").on("click", ".subnav_item", function (a) {
                var l = n.clickChannel("idol", e(this).data("cnn"));
                l.route.second && stateman.go(":firstname(" + t.routename + l.route.first + ")/subchannel/:secondname(" + l.route.second + ")", {
                    param: {
                        firstname: t.routename + l.route.first,
                        secondname: l.route.second
                    }
                })
            })
        }
    };
    var l = a.publicMethod.localParam(), i = (l.search, {2: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]}), o = t.Static.versionModel.run(i, "NEWAP_version_branch", "wap3gindex");
    if ("2" === o) {
        t.Nav = new n
    }
}(Zepto, window.NEWAP = NEWAP ? NEWAP : {}), function (e, t) {
    function n(t, n) {
        this.tabEle = t, this.AJAX = {}, this.channelChildMap = {}, this.offset = {}, this.bottomLock = {}, this.channel = "", this.channelId = "", this.child = "", this.channelHandle = s, this._runflag = !1, this.channelSwiper = null, this.channelData = n.channelData, this.simple = !1, this.bottomStrategy = {
            "default": function (e, t) {
                return e.docHeight - e.winHeight <= e.scrollTop + 80 && this.bottomLock[t] === !1
            }, photo: function (t, n) {
                var a = Math.abs(e(".content-list-east").height() - e(".content-list-west").height());
                return t.docHeight - t.winHeight - a - 300 <= t.scrollTop && this.bottomLock[n] === !1
            }
        }
    }

    var a = t.tools, l = t.ad, i = t.Nav, o = t.indexTools, s = {
        "default": {
            getFrameConfig: function () {
                return [{tag: "div", attr: {"class": "headslide"}}, {
                    tag: "div",
                    attr: {"class": "swipe-content content-list"}
                }, {tag: "div", attr: {"class": "list-more"}, template: Handlebars.templates.listmore_tpl}]
            }, init: function (t, n, i) {
                var o = this;
                if (o.setOffsetNum(t, function () {
                            return 0
                        }), i) {
                    if (0 != e("#channel_" + t + " .content-list section").length)return !1
                } else e("#channel_" + t).html("");
                o.createFrame("#channel_" + t, o.callHandle(t, n, "getFrameConfig")), e("#channel_" + t + " .list-more").show(), a.publicMethod.fetch({
                    DPData: {
                        channel: o.channelId,
                        child: n
                    }, useflag: !1, success: function (a) {
                        o.simple && e.each(a.listdata.data, function (e, t) {
                            t.type = "doc_simple"
                        }), o.processOtherinfo(a), l.getChannelAllAD(l.ADpath, "ad_callback", a, t, n).then(function () {
                            e("#channel_" + t + " .list-more").hide()
                        })
                    }, error: function (e) {
                        console.log(e)
                    }
                })
            }, bottom: function () {
                var t = this, n = t.channel;
                e("#channel_" + n + " .list-more").show(), t.setOffsetNum(n, function (e) {
                    return e += 10
                }), t.setBottomLock(n, !0), a.publicMethod.fetch({
                    DPData: {
                        offset: t.offset[n],
                        channel: t.channelId,
                        child: t.child
                    }, useflag: !1, success: function (i) {
                        t.setBottomLock(n, !1), e("#channel_" + n + " .list-more").hide(), t.simple && e.each(i.listdata.data, function (e, t) {
                            t.type = "doc_simple"
                        });
                        var o = l.getADDetailData(n, t.child);
                        a.publicMethod.generateHtml(e("#channel_" + n + " .content-list"), i.listdata.data, o, "after"), l.replaceListAD(e("#channel_" + n + " .content-list section"), o)
                    }, error: function (e) {
                        t.setBottomLock(n, !1)
                    }
                })
            }, ADListSucc: function (t, n, l) {
                a.publicMethod.generateHtml(e("#channel_" + l + " .headslide"), n.topdata, t), a.publicMethod.generateHtml(e("#channel_" + l + " .content-list"), n.listdata.data, t)
            }, noAD: function (n, l) {
                a.publicMethod.generateHtml(e("#channel_" + l + " .headslide"), n.topdata), a.publicMethod.generateHtml(e("#channel_" + l + " .content-list"), n.listdata.data), 0 != e("#channel_" + l + " .headslide li").length && t.makeScroll({
                    id: "#channel_" + l,
                    autoSlider: !1,
                    autoTime: 2e3,
                    openSlider: !0
                })
            }, ADSucc: function (n, a) {
                l.replaceFocusAD(e("#channel_" + a + " .headslide li"), n), 0 != e("#channel_" + a + " .headslide li").length && t.makeScroll({
                    id: "#channel_" + a,
                    autoSlider: !1,
                    autoTime: 2e3,
                    openSlider: !0
                }), l.replaceListAD(e("#channel_" + a + " .content-list section"), n)
            }
        }
    };
    n.prototype = {
        init: function (e) {
            var t = this.channelSlide();
            this.channelSwiper = new t({channeldata: this.channelData, channel: "channel_all"});
            var n = this;
            n.simple = e && e.simple || !1, this.handleEvent(), this.setOffsetNum(function () {
                return 0
            }), this.setBottomLock(!1), o.isBottom({
                condition: function (e) {
                    return n.bottomStrategy[n.channel] ? n.bottomStrategy[n.channel].call(n, e, n.channel) : n.bottomStrategy["default"].call(n, e, n.channel)
                }
            }, function () {
                n.callHandle(n.channel, n.child, "bottom")
            })
        }, handleEvent: function () {
            var n = this, a = /^channel_(\w+)$/;
            this.tabEle.on("swipeEnd", function (l, o) {
                var s = o.match(a)[1], r = e.grep(t.channelMap, function (e, t) {
                    return e.term == s
                })[0], c = r.childroute[0] ? r.childroute[0].term : "", h = n.channelChildMap[s] ? n.channelChildMap[s] : c;
                "channel_" + n.channel == o ? n.channelSwiper.toChannel(o) : (i.toChannel(t.routename + s), 0 == r.childroute.length ? stateman.go(":firstname(" + t.routename + s + ")", {param: {firstname: t.routename + s}}) : stateman.go(":firstname(" + t.routename + s + ")/subchannel/:secondname(" + h + ")", {
                    param: {
                        firstname: t.routename + s,
                        secondname: h
                    }
                }))
            })
        }, channelSlide: function () {
            function t(t) {
                t = t || {}, this.listWrap = t.listWrap || e(".contents-tablist"), this.listEles = t.listEles ? t.listEles : ".contents-tablist-wrap", this.throughEdge = t.throughEdge || .3, this.speedEdge = t.speedEdge || .6, this.duration = t.duration || .5, this._init(t)
            }

            var n, l, o, s, r, c, h, d, u, m, p = e(window).width(), f = e(window).height(), v = a.publicMethod.getDirection();
            return t.prototype = {
                _init: function (e) {
                    this._createPage(e.channeldata), this._setPage(e.channel), this._bindEvent()
                }, _createPage: function (t) {
                    var n = "", a = /^link_\w+$/;
                    e.each(t, function (e, t) {
                        a.test(t.term) || (n += Handlebars.templates.contentList_tpl(t))
                    }), this.listWrap.html(n), this.listEles = this.listWrap.find(this.listEles), i.photoChildBind()
                }, _setPage: function (e) {
                    var t = this.listEles, n = this.listWrap;
                    r = e, n.css("width", t.length * p), t.css({
                        width: p,
                        height: f,
                        "min-height": f
                    }), this.toChannel(r, !1)
                }, _bindEvent: function () {
                    var t = this;
                    this.listEles.on("touchstart", ".swipe-content", function (e) {
                        m = void 0, v.start(e), t._touchstart.call(t, e)
                    }), this.listEles.on("touchmove", ".swipe-content", function (e) {
                        m || (m = v.move(e)), ("left" == m || "right" == m) && (e.preventDefault(), t._touchmove.call(t, e))
                    }), e(document).on("touchend", function (e) {
                        ("left" == m || "right" == m) && t._touchend.call(t, e), m = void 0
                    })
                }, _touchstart: function (e) {
                    this.listWrap.css({
                        "transition-duration": "0s",
                        "-webkit-transition-duration": "0s"
                    }), o = e.timeStamp, n = e.touches[0].clientX, d = this._getPoint(r)
                }, _touchmove: function (e) {
                    var t = e.changedTouches[0].clientX, a = t - n;
                    this.listWrap.css({
                        "-webkit-transform": "translate3d(" + (d + a) + "px,0,0)",
                        transform: "translate3d(" + (d + a) + "px,0,0)"
                    })
                }, _touchend: function (e) {
                    var t, a, i;
                    this.listEles.length - 1;
                    s = e.timeStamp, l = e.changedTouches[0].clientX, a = s - o, t = l - n, i = Math.abs(t) / a, t > 0 ? (Math.abs(t) > p * this.throughEdge || i > this.speedEdge) && c ? this.listWrap.trigger("swipeEnd", c) : this.listWrap.trigger("swipeEnd", r) : (Math.abs(t) > p * this.throughEdge || i > this.speedEdge) && h ? this.listWrap.trigger("swipeEnd", h) : this.listWrap.trigger("swipeEnd", r)
                }, _getPoint: function (t) {
                    var n = this.listEles.index(e("#" + t));
                    return 0 == n ? 0 : n * -p
                }, toChannel: function (t, n) {
                    r = t, c = e("#" + r).prev().attr("id"), h = e("#" + r).next().attr("id"), n = void 0 === n ? !0 : n, n ? this.listWrap.css({
                        "transition-duration": this.duration + "s",
                        "-webkit-transition-duration": this.duration + "s"
                    }) : this.listWrap.css({
                        "transition-duration": "0s",
                        "-webkit-transition-duration": "0s"
                    }), this.listWrap.css({
                        "-webkit-transform": "translate3d(" + this._getPoint(r) + "px,0,0)",
                        transform: "translate3d(" + this._getPoint(r) + "px,0,0)"
                    }), e("#" + u).removeClass("active").css("height", f), e("#" + r).addClass("active").css("height", "auto"), u = t
                }
            }, t
        }, callHandle: function (e, t, n) {
            var a = Array.prototype.slice.call(arguments, 3);
            return this.channelHandle[e] ? this.channelHandle[e][t] ? this.channelHandle[e][t][n] && this.channelHandle[e][t][n].apply(this, a) : this.channelHandle[e]["default"][n] && this.channelHandle[e]["default"][n].apply(this, a) : this.channelHandle["default"][n] && this.channelHandle["default"][n].apply(this, a)
        }, setOffsetNum: function (t, n) {
            var a = this, l = this.offset[t];
            1 == arguments.length && "function" == e.type(t) && (n = t, t = void 0), t ? this.offset[t] = n(l) : e.each(this.channelData, function (e, t) {
                a.offset[t.term] = n()
            })
        }, setBottomLock: function (t, n) {
            var a = this;
            1 == arguments.length && "string" !== e.type(t) && (n = t, t = void 0), n = "function" === e.type(n) ? n() : n, t ? this.bottomLock[t] = n : e.each(this.channelData, function (e, t) {
                a.bottomLock[t.term] = n
            })
        }, createFrame: function (t, n) {
            "string" == e.type(t) && (t = e(t)), e.each(n, function (n, a) {
                var l = a.tag;
                if (e.each(a.attr, function (e, t) {
                            switch (e) {
                                case"id":
                                    l += "#" + t;
                                    break;
                                case"class":
                                    l += "." + t
                            }
                        }), t.find(l).length > 0)return !1;
                if (a.template)t.append(a.template()); else {
                    var i = document.createElement(a.tag), o = e(i);
                    o.attr(a.attr), t.append(o)
                }
            })
        }, processOtherinfo: function (e) {
            var t = e.otherinfo, n = e.listdata.data, a = e.topdata.data;
            t.appointArticle && (t.appointArticle.focus && t.appointArticle.focus.length > 0 && this.replaceData(t.appointArticle.focus, a), t.appointArticle.list && t.appointArticle.list.length > 0 && this.replaceData(t.appointArticle.list, n))
        }, replaceData: function (t, n) {
            e.each(t, function (e, t) {
                t.adposition > 0 && (n[t.adposition] = t.data)
            })
        }
    };
    t.infoFlow = new n(e(".contents-tablist"), {channelData: t.channelMap})
}(Zepto, window.NEWAP = NEWAP ? NEWAP : {}), function (e, t) {
    function n() {
    }

    var a = t.tools, l = t.ad, i = (t.indexTools, t.Nav);
    e.extend(!0, i.hasSpecificStyle, {photo: ""}), e.extend(!0, i.noBottomLine, {photo: ""}), e.extend(!0, i.otherChannelConfig, {
        photo: {
            childbar: ".childchannel-photoset",
            child: ".childchannel-photoset .item_cell"
        }
    }), n.prototype.generatePhotoChannelHtml = function (t, n, l, i) {
        var o = [], s = [], r = t.find(".content-list-east"), c = t.find(".content-list-west");
        e.each(n, function (e, t) {
            t.type = "photoset_square", e % 2 == 0 && o.length < .4 * n.length ? o.push(t) : s.push(t)
        }), r.height() > c.height() ? (a.publicMethod.generateHtml(r, o, l, i), a.publicMethod.generateHtml(c, s, l, i)) : (a.publicMethod.generateHtml(c, o, l, i), a.publicMethod.generateHtml(r, s, l, i))
    };
    var o = new n;
    e.extend(t.infoFlow.channelHandle, {
        photo: {
            "default": {
                getFrameConfig: function () {
                    return [{tag: "div", attr: {"class": "headslide"}}, {
                        tag: "div",
                        attr: {"class": "swipe-content childchannel-photoset"},
                        template: Handlebars.templates.photosetchild_tpl
                    }, {
                        tag: "div",
                        attr: {"class": "swipe-content content-list"},
                        template: Handlebars.templates.photosetlist_tpl
                    }, {tag: "div", attr: {"class": "list-more"}, template: Handlebars.templates.listmore_tpl}]
                }, init: function (t, n, i) {
                    var o = this;
                    if (o.setOffsetNum(t, function () {
                                return 0
                            }), i) {
                        if (0 != e("#channel_" + t + " .content-list section").length)return !1
                    } else e("#channel_" + t + " .content-list div").html("");
                    o.createFrame("#channel_" + t, o.callHandle(t, n, "getFrameConfig")), e("#channel_" + t + " .list-more").show(), a.publicMethod.fetch({
                        DPData: {
                            offset: o.offset[t],
                            size: 20,
                            channel: o.channelId,
                            child: n
                        }, useflag: !1, url: "newap_photo_list", success: function (a) {
                            l.getChannelAllAD(l.ADpath, "ad_callback", a, t, n).then(function () {
                                e("#channel_" + t + " .list-more").hide()
                            })
                        }
                    })
                }, bottom: function () {
                    var t = this, n = t.channel;
                    e("#channel_" + n + " .list-more").show(), t.setOffsetNum(n, function (e) {
                        return e += 20
                    }), t.setBottomLock(n, !0), a.publicMethod.fetch({
                        DPData: {
                            offset: t.offset[n],
                            size: 20,
                            channel: t.channelId,
                            child: t.child
                        }, useflag: !1, url: "newap_photo_list", success: function (a) {
                            t.setBottomLock(n, !1), e("#channel_" + n + " .list-more").hide(), o.generatePhotoChannelHtml(e("#channel_" + n + " .content-list"), a.listdata.data, "after")
                        }, error: function (e) {
                            t.setBottomLock(n, !1)
                        }
                    })
                }, ADListSucc: function (t, n, l) {
                    a.publicMethod.generateHtml(e("#channel_" + l + " .headslide"), n.topdata, t), o.generatePhotoChannelHtml(e("#channel_" + l + " .content-list"), n.listdata.data, t)
                }, noAD: function (n, l) {
                    0 == e("#channel_" + l + " .headslide li").length && (a.publicMethod.generateHtml(e("#channel_" + l + " .headslide"), n.topdata), 0 != e("#channel_" + l + " .headslide li").length && t.makeScroll({
                        id: "#channel_" + l,
                        autoSlider: !1,
                        autoTime: 2e3,
                        openSlider: !0
                    })), o.generatePhotoChannelHtml(e("#channel_" + l + " .content-list"), n.listdata.data)
                }, ADSucc: function (n, a) {
                    l.replaceFocusAD(e("#channel_" + a + " .headslide li"), n), 0 != e("#channel_" + a + " .headslide li").length && t.makeScroll({
                        id: "#channel_" + a,
                        autoSlider: !1,
                        autoTime: 2e3,
                        openSlider: !0
                    }), l.replacePhotochannelListAD(e("#channel_" + a + " .content-list"), n)
                }
            }
        }
    })
}(Zepto, window.NEWAP = NEWAP ? NEWAP : {}), function (e, t) {
    function n() {
        this.share = null
    }

    var a = t.tools, l = t.ad, i = (t.indexTools, t.Static || {});
    n.prototype.generateJokeHtml = function (t, n, l, i) {
        e.each(n, function (e, t) {
            t.type = "joke_doc"
        }), a.publicMethod.generateHtml(t, n, l, i)
    }, n.prototype.handleClick = function () {
        e("#channel_joke").on("click", ".gif_wrap", function (t) {
            t.preventDefault();
            var n = new Image, a = e(this).parent().children("img"), l = a.data("ourl"), i = this;
            n.onload = function () {
                e(i).parent().addClass("collapse"), e(i).remove(), a.attr("src", l)
            }, n.src = l, e(this).children().removeClass("play-btn-joke").addClass("loading-btn-joke")
        })
    }, n.prototype.handleGifFail = function () {
        e(".js-imghook").on("error", function (t) {
            e(this).removeClass("js-imghook"), e(this).attr("src", "http://img2.cache.netease.com/f2e/wap/touch_index_2016/trunk/images/joke_gif.png")
        })
    }, n.prototype.toggleLongImg = function () {
        e("#channel_joke").on("click", ".more", function (t) {
            t.preventDefault(), e(this).parent().children(".m_article_img").addClass("collapse"), e(this).hide()
        })
    }, n.prototype.handleShare = function () {
        var t = this;
        e("#channel_joke").on("click", ".share-joke", function (n) {
            var a = {
                shareSummary: e(this).data("digest"),
                shareTitle: e(this).data("title"),
                shareImg: e(this).data("img"),
                shareLink: e(this).data("link")
            };
            if (t.share)t.share.changeShareConfig(a); else {
                var l = new i.Share(".js-share-mask", a, {});
                l.render(), t.share = l
            }
            e(window).trigger("Share:show")
        })
    };
    var o = new n;
    e.extend(t.infoFlow.channelHandle, {
        joke: {
            "default": {
                getFrameConfig: function () {
                    return [{tag: "div", attr: {"class": "swipe-content content-list"}}, {
                        tag: "div",
                        attr: {"class": "list-more"},
                        template: Handlebars.templates.listmore_tpl
                    }]
                }, init: function (t, n, i) {
                    var s = this;
                    if (s.setOffsetNum(t, function () {
                                return 0
                            }), i) {
                        if (0 != e("#channel_" + t + " .content-list section").length)return !1
                    } else e("#channel_" + t).html("");
                    s.createFrame("#channel_" + t, s.callHandle(t, n, "getFrameConfig")), o.handleClick(), o.toggleLongImg(), o.handleShare(), e("#channel_" + t + " .list-more").show(), a.publicMethod.fetch({
                        DPData: {
                            offset: s.offset[t],
                            channel: s.channelId
                        }, useflag: !1, url: "newap_joke_list", success: function (a) {
                            l.getChannelAllAD(l.ADpath, "ad_callback", a, t, n).then(function () {
                                e("#channel_" + t + " .list-more").hide()
                            })
                        }
                    })
                }, bottom: function () {
                    var t = this, n = t.channel;
                    e("#channel_" + n + " .list-more").show(), t.setOffsetNum(n, function (e) {
                        return e += 10
                    }), t.setBottomLock(n, !0), a.publicMethod.fetch({
                        DPData: {offset: t.offset[n], channel: t.channelId},
                        url: "newap_joke_list",
                        useflag: !1,
                        success: function (a) {
                            t.setBottomLock(n, !1), e("#channel_" + n + " .list-more").hide(), o.generateJokeHtml(e("#channel_" + n + " .content-list"), a.listdata.data, "after"), o.handleGifFail()
                        },
                        error: function () {
                            t.setBottomLock(n, !1)
                        }
                    })
                }, ADListSucc: function (e, t, n) {
                }, noAD: function (t, n) {
                    o.generateJokeHtml(e("#channel_" + n + " .content-list"), t.listdata.data), o.handleGifFail()
                }, ADSucc: function (e, t) {
                }
            }
        }
    })
}(Zepto, window.NEWAP = NEWAP ? NEWAP : {}), function (e, t) {
    function n() {
        this.currentCity = {}, this.popup = null
    }

    var a = t.tools, l = t.ad, i = t.indexTools;
    n.prototype = {
        getLocalType: function (e) {
            var t = JSON.parse(i.storageLocalVal({key: "local_info"})) || {}, n = this;
            n.updateLocalCityInfo(function (a) {
                t.selectCity ? (n.currentCity = t.selectCity, e && e(a, t.selectCity)) : t.lastCity && a.city != t.lastCity.city ? n.selectTip("\u7cfb\u7edf\u68c0\u6d4b\u5230\u60a8\u73b0\u5728\u5728" + a.city + ",\u662f\u5426\u5207\u6362\u5230" + a.city + "?").then(function () {
                    n.currentCity = a, e && e(a)
                }, function () {
                    n.currentCity = t.lastCity, e && e(a, t.lastCity)
                }) : (n.currentCity = a, e && e(a))
            }, function () {
                t.selectCity ? (n.currentCity = t.selectCity, e && e(void 0, t.selectCity)) : t.lastCity ? (n.currentCity = t.lastCity, e && e(void 0, t.lastCity)) : (n.currentCity = {
                    province: "\u5317\u4eac\u5e02",
                    city: "\u5317\u4eac\u5e02",
                    gcity: "\u5317\u4eac",
                    sname: ""
                }, e && e(void 0, n.currentCity))
            })
        }, selectTip: function (t) {
            var n = e.Deferred(), a = this.getPopup(function () {
                a.hide(), n.resolve()
            }, function () {
                a.hide(), n.reject()
            });
            return a.find(".warning_content h1").text("\u63d0\u793a"), a.find(".warning_content p").text(t), a.find(".warning_cancel").text("\u53d6\u6d88"), a.find(".warning_enter").text("\u5207\u6362"), a.show(), n.promise()
        }, getPopup: function (t, n) {
            var a = Handlebars.templates.warning_box_tpl();
            return this.popup || (this.popup = e(".js-warning-mask").append(a), this.popup.find(".warning_cancel").click(n), this.popup.find(".warning_enter").click(t), this.popup.on("touchmove touchstart", function (e) {
                e.preventDefault()
            })), this.popup
        }, updateLocalCityInfo: function (e, n) {
            t.DP.loc.result ? e && e(t.DP.loc.result) : t.DP.loc.update().then(function (t) {
                e && e(t.result)
            }, function () {
                n && n()
            })
        }, setLastCity: function (e) {
            var t = JSON.parse(i.storageLocalVal({key: "local_info"})) || {};
            t.lastCity = {province: e.province, city: e.city};
            var n = JSON.stringify(t);
            i.storageLocalVal({key: "local_info", str: n})
        }, addCitySwitch: function (e) {
            var t;
            t = location.href.indexOf("dev.f2e") > -1 ? "/wap/touch_special_local/city_list/index.html" : "http://3g.163.com/ntes/special/00341JOP/city_list.html";
            var n = Handlebars.templates.module_ui_local_flag_tpl({href: t});
            0 != e.find(".change_position").length && e.find(".change_position").remove(), e.append(n)
        }
    };
    var o = new n;
    e.extend(t.infoFlow.channelHandle, {
        local: {
            "default": {
                getFrameConfig: function () {
                    return [{tag: "div", attr: {"class": "headslide"}}, {
                        tag: "div",
                        attr: {"class": "swipe-content content-list"}
                    }, {tag: "div", attr: {"class": "list-more"}, template: Handlebars.templates.listmore_tpl}]
                }, init: function (t, n, i) {
                    var s = this;
                    if (s.setOffsetNum(t, function () {
                                return 0
                            }), i) {
                        if (0 != e("#channel_" + t + " .content-list section").length)return !1
                    } else e("#channel_" + t).html("");
                    s.createFrame("#channel_" + t, s.callHandle(t, n, "getFrameConfig")), e("#channel_" + t + " .list-more").show(), o.getLocalType(function (i, r) {
                        i && o.setLastCity(i);
                        var c = {offset: s.offset[t], channel: s.channelId};
                        r && e.extend(c, {city: (r.province || "") + "_" + (r.gcity || r.city || "")}), o.addCitySwitch(e("#channel_" + t + " .headslide")), a.publicMethod.fetch({
                            DPData: c,
                            useflag: !1,
                            cache: !0,
                            url: "newap_article_list",
                            success: function (a) {
                                r ? document.title = r.gcity + "-\u624b\u673a\u7f51\u6613\u7f51" : (document.title = a.otherinfo.city + "-\u624b\u673a\u7f51\u6613\u7f51", e(".nav_local span").text(a.otherinfo.city), e("#topchild_local .topnav_item_text").text(a.otherinfo.city)), l.getChannelAllAD(l.ADpath, "ad_callback", a, t, n).then(function () {
                                    e("#channel_" + t + " .list-more").hide()
                                })
                            }
                        })
                    })
                }, bottom: function () {
                    var t = this, n = t.channel;
                    e("#channel_" + n + " .list-more").show(), t.setOffsetNum(n, function (e) {
                        return e += 10
                    }), t.setBottomLock(n, !0);
                    var l = {
                        offset: t.offset[n],
                        channel: t.channelId,
                        city: o.currentCity.province + "_" + o.currentCity.city
                    };
                    a.publicMethod.fetch({
                        useflag: !1, DPData: l, cache: !0, url: "newap_article_list", success: function (l) {
                            t.setBottomLock(n, !1), e("#channel_" + n + " .list-more").hide(), a.publicMethod.generateHtml(e("#channel_" + n + " .content-list"), l.listdata.data, "after")
                        }, error: function (e) {
                            t.setBottomLock(n, !1)
                        }
                    })
                }, left: function () {
                }, ADListSucc: function (e, t, n) {
                }, noAD: function (t, n) {
                    a.publicMethod.generateHtml(e("#channel_" + n + " .headslide"), t.topdata, "after"), 0 == e("#channel_local .headslide .slides").length && e("#channel_" + n + " .headslide").find(".change_position").addClass("column"), a.publicMethod.generateHtml(e("#channel_" + n + " .content-list"), t.listdata.data)
                }, ADSucc: function (e, t) {
                }
            }
        }
    })
}(Zepto, window.NEWAP = NEWAP ? NEWAP : {}), function (e, t) {
    function n() {
        this.template = Handlebars.templates.module_ui_auto_link_tpl, this.ele = void 0
    }

    var a = t.tools, l = t.ad;
    t.Nav, t.indexTools;
    n.prototype.init = function (e) {
        this.ele = e, this.generateHtml()
    }, n.prototype.generateHtml = function (e) {
        var t = this.template(e);
        this.ele.html(t)
    };
    var i = new n;
    e.extend(t.infoFlow.channelHandle, {
        auto: {
            "default": {
                getFrameConfig: function () {
                    return [{tag: "div", attr: {"class": "headslide"}}, {
                        tag: "div",
                        attr: {"class": "swipe-content link-auto"}
                    }, {tag: "div", attr: {"class": "swipe-content content-list"}}, {
                        tag: "div",
                        attr: {"class": "list-more"},
                        template: Handlebars.templates.listmore_tpl
                    }]
                }, init: function (t, n, o) {
                    var s = this;
                    if (s.setOffsetNum(t, function () {
                                return 0
                            }), o) {
                        if (0 != e("#channel_" + t + " .content-list section").length)return !1
                    } else e("#channel_" + t).html("");
                    s.createFrame("#channel_" + t, s.callHandle(t, n, "getFrameConfig")), e("#channel_" + t + " .list-more").show(), i.init(e("#channel_" + t + " .link-auto")), a.publicMethod.fetch({
                        DPData: {
                            channel: s.channelId,
                            child: n
                        }, useflag: !1, success: function (a) {
                            s.simple && e.each(a.listdata.data, function (e, t) {
                                t.type = "doc_simple"
                            }), l.getChannelAllAD(l.ADpath, "ad_callback", a, t, n).then(function () {
                                e("#channel_" + t + " .list-more").hide()
                            })
                        }, error: function (e) {
                            console.log(e)
                        }
                    })
                }, bottom: function () {
                    var t = this, n = t.channel;
                    e("#channel_" + n + " .list-more").show(), t.setOffsetNum(n, function (e) {
                        return e += 10
                    }), t.setBottomLock(n, !0), a.publicMethod.fetch({
                        DPData: {
                            offset: t.offset[n],
                            channel: t.channelId,
                            child: t.child
                        }, useflag: !1, success: function (i) {
                            t.setBottomLock(n, !1), e("#channel_" + n + " .list-more").hide(), t.simple && e.each(i.listdata.data, function (e, t) {
                                t.type = "doc_simple"
                            });
                            var o = l.getADDetailData(n, t.child);
                            a.publicMethod.generateHtml(e("#channel_" + n + " .content-list"), i.listdata.data, o, "after"), l.replaceListAD(e("#channel_" + n + " .content-list section"), o)
                        }, error: function (e) {
                            t.setBottomLock(n, !1)
                        }
                    })
                }, ADListSucc: function (t, n, l) {
                    a.publicMethod.generateHtml(e("#channel_" + l + " .headslide"), n.topdata, t), a.publicMethod.generateHtml(e("#channel_" + l + " .content-list"), n.listdata.data, t)
                }, noAD: function (n, l) {
                    a.publicMethod.generateHtml(e("#channel_" + l + " .headslide"), n.topdata), a.publicMethod.generateHtml(e("#channel_" + l + " .content-list"), n.listdata.data), 0 != e("#channel_" + l + " .headslide li").length && t.makeScroll({
                        id: "#channel_" + l,
                        autoSlider: !1,
                        autoTime: 2e3,
                        openSlider: !0
                    })
                }, ADSucc: function (n, a) {
                    l.replaceFocusAD(e("#channel_" + a + " .headslide li"), n), 0 != e("#channel_" + a + " .headslide li").length && t.makeScroll({
                        id: "#channel_" + a,
                        autoSlider: !1,
                        autoTime: 2e3,
                        openSlider: !0
                    }), l.replaceListAD(e("#channel_" + a + " .content-list section"), n)
                }
            }
        }
    })
}(Zepto, window.NEWAP = NEWAP ? NEWAP : {}), function (e, t) {
    function n() {
        this.getbannerFlag = !0, this.recommendationUrl = "http://star.3g.163.com/star/recommendation.html", this.list = {}
    }

    function a() {
        this.starInfo = void 0, this.championInfo = null
    }

    function l() {
        this.template = Handlebars.templates.module_ui_stars_rank_tpl, this.ele = void 0, this.rankPageLink = "http://3g.163.com/ntes/special/00341GKK/idol_ranklist_2016.html"
    }

    function i() {
        this.template = Handlebars.templates.module_ui_idol_box_tpl, this.ele = void 0, this.flowerTemplate = Handlebars.templates.module_ui_flower_tpl
    }

    var o = t.tools, s = t.ad, r = t.indexTools, c = t.Static || {}, h = t.Nav, d = t.IdolRouteHandle, u = o.publicMethod.cookie;
    e.extend(!0, h.hasSpecificStyle, {idol: ""}), n.prototype.generateNav = function (n, a) {
        function l(e) {
            var t = "", n = o.publicMethod.localParam(), a = n.search;
            if ("nav" in a && 2 == a.nav)for (var l = 0; l < e.length; l++) {
                var i = '<li class="subnav_item" id="subchild_idol_star' + e[l].id + '" data-cnn="star' + e[l].id + '"><div class="head"><img src="' + e[l].icon + '" alt="' + e[l].name + '"></div><span data-href="#/star/subchannel/star' + e[l].id + '">' + e[l].name + "</span></li>";
                t += i
            } else for (var l = 0; l < e.length; l++) {
                var i = '<div class="item_cell childchannel_star' + e[l].id + '" data-cnn="star' + e[l].id + '"><div class="head"><img src="' + e[l].icon + '" alt="' + e[l].name + '"></div><span data-href="#/star/subchannel/star' + e[l].id + '">' + e[l].name + "</span></div>";
                t += i
            }
            return t
        }

        function i() {
            var e = r.spLocalStorage();
            return e ? JSON.parse(r.storageLocalVal({key: "myidol_list"})) : !1
        }

        var s = this;
        if (this.getbannerFlag) {
            var c = i(), d = "", u = !1, m = Handlebars.templates.module_ui_nav_idol_listmore_tpl({link: "http://3g.163.com/ntes/special/0034073A/myidol_list.html"}), p = !0, f = n && n.match(/star(\d+)$/) ? n.match(/star(\d+)$/)[1] : "0";
            this.getRecommendIdol(function (n) {
                u = c ? c.length > 0 : !1, d = l(u ? c : n), e("#channel_wrap_idol .u_c_items").append(d), e("#subchild_idol ul").append(d), e("#channel_wrap_idol").append(m), e("#subchild_idol").append(m), s.getbannerFlag = !1, h.idolChildBind();
                for (var i in c)if (f == c[i].id) {
                    p = !1;
                    break
                }
                for (var i in n)if (f == n[i].id) {
                    p = !1;
                    break
                }
                var o = "0" != f ? f : u ? c[0].id : n[0].id;
                h.toChannel("idol", "star" + o), "0" == f && stateman.go(":firstname(" + t.routename + "idol)/subchannel/:secondname(star" + o + ")", {
                    param: {
                        firstname: t.routename + "idol",
                        secondname: "star" + o
                    }
                }), a && a()
            })
        }
    }, n.prototype.getRecommendIdol = function (e) {
        var n = this;
        this.getbannerFlag ? o.publicMethod.fetch({
            url: n.recommendationUrl,
            dataType: "jsonp",
            notformat: !0,
            useflag: !1,
            cache: !0,
            jsonpCallback: "idolrecommend",
            success: function (t) {
                var a = t.data;
                n.list = a, e && e(n.list)
            },
            error: function (e) {
                console.log(e), stateman.go(":firstname(" + t.routename + "all)", {
                    param: {firstname: t.routename + "all"},
                    replace: !0
                })
            }
        }) : e && e(n.list)
    };
    var m = new n;
    a.prototype = {
        scroll: function () {
            var n, a = e(window).scrollTop(), l = 0, i = e(".u_topmenu").offset().height, o = e(".bar_wrap").offset().height + i, s = this;
            e(window).on("scroll", function (i) {
                var r = e(window).scrollTop() - a > 0 ? "down" : "up", c = n !== r;
                c && (l = 0), n = r, a = e(window).scrollTop(), "idol" === t.infoFlow.channel && (0 == l && "down" == r && e(window).scrollTop() > o ? (l += 1, s.toggleSubNav("hide")) : 0 == l && "up" == r && e(window).scrollTop() < o && (l += 1, s.toggleSubNav("show")))
            })
        }, toggleSubNav: function (t) {
            "hide" == t ? e("#channel_wrap_idol").addClass("nav_hide") : e("#channel_wrap_idol").removeClass("nav_hide")
        }, getChampionInfo: function () {
            var e = this;
            return e.championInfo ? (e.renderTopBar(e.championInfo.icon, "http://3g.163.com/ntes/special/00341GKK/idol_ranklist_2016.html"), !1) : void t.tools.publicMethod.fetch({
                url: "http://star.3g.163.com/star/rank/champion.html",
                notformat: !0,
                dataType: "jsonp",
                cache: !0,
                jsonpCallback: "getChampiondata",
                success: function (t) {
                    var n = t.data;
                    e.championInfo = n, e.renderTopBar(n.icon, "http://3g.163.com/ntes/special/00341GKK/idol_ranklist_2016.html")
                }
            })
        }, renderTopBar: function (t, n) {
            var a = "";
            t && n && (a = '<div class="u-ad-wrap column"><a href="' + n + '"><img src="' + t + '" alt=""></a></div>'), e(".u-top-idol").html(a)
        }, getNextMondayDate: function () {
            var e = new Date, t = e.getTime(), n = e.getDay(), a = 7 - n + 1, l = 24 * a * 60 * 60 * 1e3, i = t + l, o = new Date(i), s = r.dateFormat.call(o, "yyyy-MM-dd"), c = new Date(s + " 00:00:00");
            return c
        }, setChampionCookie: function (e, t) {
            var n = this.getNextMondayDate(), a = JSON.stringify(t);
            u.setItem(e, a, n, "/", "163.com")
        }, checkIdolNew: function (t) {
            var n = !1;
            return e.each(t, function (e, t) {
                return 3 == parseInt(t.status) ? (n = !0, !1) : void 0
            }), n
        }
    };
    var p = new a;
    l.prototype = new a, l.prototype.init = function (e) {
        this.ele = e, this.getRankData()
    }, l.prototype.getRankData = function () {
        var e = this;
        o.publicMethod.fetch({
            dataType: "jsonp",
            useflag: !1,
            notformat: !0,
            cache: !0,
            jsonpCallback: "getRankList",
            url: "http://star.3g.163.com/star/rank/list/0-3.html",
            success: function (t) {
                e.generateRankList(t.data)
            },
            error: function (e) {
                console.log(e)
            }
        })
    }, l.prototype.transRankList = function (t) {
        var n = {};
        return e.each(t, function (e, t) {
            n["rank_" + (t.currentRank - 1)] = t
        }), n.rankPageLink = this.rankPageLink, n
    }, l.prototype.generateRankList = function (e) {
        var t = "", n = this.transRankList(e);
        t += this.template(n), this.ele.html(t)
    }, i.prototype = new a, i.prototype.init = function (e, t) {
        this.ele = e, this.generateBanner(t)
    }, i.prototype.generateBanner = function (e) {
        var t = this.template(e);
        this.ele.html(t)
    }, i.prototype.vote = function (e) {
        var t, n = 1, a = 0, l = e.maxClickTimes || 20, i = e.timeout || 3, o = e.clickCallback, s = e.sendCallback, r = this;
        this.ele.click(function (e) {
            e.stopPropagation(), clearInterval(t), a += 1, o && o.call(r, e, a), t = setInterval(function () {
                n += 1, n > i && (s && s.call(r, a), n = 1, a = 0, clearInterval(t))
            }, 1e3), a > l && (s && s.call(r, a), n = 1, a = 0, clearInterval(t)), n = 1
        })
    }, i.prototype.sendVoteData = function (e, t) {
        o.publicMethod.fetch({
            notformat: !0,
            url: "http://star.3g.163.com/star/rank/vote/" + e + ".html",
            jsonpCallback: "sendvote",
            cache: !0,
            dataType: "jsonp",
            success: function (e) {
            }
        })
    }, i.prototype.flowerAnimation = function (t) {
        var n = this.flowerTemplate(), a = e(n);
        this.ele.append(a), a.css({
            top: t.pageY - this.ele.offset().top - 27.5,
            left: t.pageX - this.ele.offset().left - 27.5
        }), setTimeout(function () {
            a.remove()
        }, 900)
    }, i.prototype.handleShare = function () {
        var t = this;
        e("#channel_idol .share-idol-wrap").click(function (n) {
            n.stopPropagation();
            var a = {
                shareSummary: e(this).data("digest"),
                shareTitle: e(this).data("title"),
                shareImg: e(this).data("img"),
                shareLink: e(this).data("link")
            };
            if (o.uaMatch.isWeixin) {
                if (!t.wxshare) {
                    var l = new c.WXinnerShare(".js-share-mask");
                    l.render(), t.wxshare = l
                }
            } else if (o.uaMatch.isQQ) {
                if (!t.QQAPPinnerShare) {
                    var i = new c.QQAPPinnerShare(".js-share-mask");
                    i.render(), t.QQAPPinnerShare = i
                }
            } else if (t.share)t.share.changeShareConfig(a); else {
                var s = new c.Share(".js-share-mask", a, {});
                s.render(), t.share = s
            }
            e(window).trigger("Share:show")
        })
    }, i.prototype.handleFocus = function (t) {
        var n = t || {};
        e("#channel_idol .add-idol-wrap").click(function (t) {
            t.stopPropagation();
            var a = e(this).data("id"), l = r.storageLocalVal({key: "myidol_list"}), i = [], o = {}, s = "", c = !1, d = m.list || {};
            o = e.grep(n, function (e, t) {
                return e.id == a
            }), s = '<div class="item_cell childchannel_star' + o[0].id + '" data-cnn="star' + o[0].id + '"><div class="head"><img src="' + o[0].icon + '" alt="' + o[0].name + '"></div><span data-href="#/star/subchannel/star' + o[0].id + '">' + o[0].name + "</span></div>", l && (i = JSON.parse(l));
            for (var u in d)if (a == d[u].id) {
                c = !0;
                break
            }
            i.push(o[0]), r.storageLocalVal({
                key: "myidol_list",
                str: JSON.stringify(i)
            }), c || e("#channel_wrap_idol .u_c_items").append(s), e(this).remove(), h.toChannel("idol", "star" + a)
        })
    }, t.StarRankList = l;
    var f = new l, v = new i;
    p.scroll(), e.extend(t.infoFlow.channelHandle, {
        idol: {
            "default": {
                getFrameConfig: function () {
                    return [{tag: "div", attr: {"class": "star-banner"}}, {
                        tag: "div",
                        attr: {"class": "swipe-content rank-list"}
                    }, {tag: "div", attr: {"class": "swipe-content content-list"}}, {
                        tag: "div",
                        attr: {"class": "list-more"},
                        template: Handlebars.templates.listmore_tpl
                    }]
                }, init: function (t, n, a) {
                    var l = this;
                    d.getAllRoutelist(function (i) {
                        m.generateNav(n, function () {
                            p.checkIdolNew(i) && e("#channel_wrap_idol .link_more").addClass("has_dot")
                        }), p.getChampionInfo();
                        var r = n && n.match(/star(\d+)$/) ? n.match(/star(\d+)$/)[1] : "0";
                        if ("0" == r)return !1;
                        if (l.setOffsetNum(t, function () {
                                    return 0
                                }), a) {
                            if (0 != e("#channel_" + t + " .content-list section").length)return !1
                        } else e("#channel_" + t).html("");
                        l.createFrame("#channel_" + t, l.callHandle(t, n, "getFrameConfig")), e("#channel_" + t + " .list-more").show(), p.starInfo = e.grep(i, function (e, t) {
                            return e.id === parseInt(r)
                        })[0], o.uaMatch.isWeixin && (e("#wxShareImg").remove(), e("body").prepend('<div id="wxShareImg" style="display: none"><img src="' + p.starInfo.sharepic + '"/></div>'), stateman.title = p.starInfo.sharedis), v.init(e("#channel_" + t + " .star-banner"), p.starInfo), v.handleShare(), v.handleFocus(i), v.vote({
                            maxClickTimes: 9999,
                            timeout: 6,
                            clickCallback: function (t, n) {
                                var a = this.ele.find(".idol_vote_count"), l = parseInt(p.starInfo.voteCount) || 0, i = e('<div class="cur_voteadd">+1</div>');
                                1 == n && a.addClass("showout"), this.ele.find(".count").text(l + 1 + "\u6735"), p.starInfo.voteCount = l + 1, a.find(".cur_votecount").text(n), a.append(i), this.sendVoteData(p.starInfo.id), this.flowerAnimation(t), setTimeout(function () {
                                    i.remove()
                                }, 400)
                            },
                            sendCallback: function (e) {
                                this.ele.find(".idol_vote_count").removeClass("showout")
                            }
                        }), f.init(e("#channel_" + t + " .rank-list")), o.publicMethod.fetch({
                            dataType: "jsonp",
                            jsonpCallback: "getIdolList",
                            useflag: !1,
                            data: {starId: p.starInfo.id},
                            cache: !0,
                            notformat: !0,
                            url: "http://star.3g.163.com/star/article/list/" + l.offset[t] + "-10.html",
                            success: function (a) {
                                var l = a.data;
                                e.each(l, function (e, t) {
                                    t.link = t.link + "&starId=" + p.starInfo.id
                                }), s.getChannelAllAD(s.ADpath, "ad_callback", l, t, n).then(function () {
                                    e("#channel_" + t + " .list-more").hide()
                                })
                            },
                            error: function (e) {
                                console.log(e)
                            }
                        })
                    })
                }, bottom: function () {
                    var t = this, n = t.channel;
                    e("#channel_" + n + " .list-more").show(), t.setOffsetNum(n, function (e) {
                        return e += 10
                    }), t.setBottomLock(n, !0), o.publicMethod.fetch({
                        dataType: "jsonp",
                        jsonpCallback: "getIdolList",
                        useflag: !1,
                        data: {starId: p.starInfo.id},
                        notformat: !0,
                        cache: !0,
                        url: "http://star.3g.163.com/star/article/list/" + t.offset[n] + "-10.html",
                        success: function (a) {
                            var l = a.data;
                            e.each(l, function (e, t) {
                                t.link = t.link + "&starId=" + p.starInfo.id
                            }), t.setBottomLock(n, !1), e("#channel_" + n + " .list-more").hide(), o.publicMethod.generateHtml(e("#channel_" + n + " .content-list"), l, "after")
                        },
                        error: function (e) {
                            t.setBottomLock(n, !1)
                        }
                    })
                }, left: function () {
                    p.renderTopBar()
                }, ADListSucc: function (e, t, n) {
                }, noAD: function (t, n) {
                    o.publicMethod.generateHtml(e("#channel_" + n + " .content-list"), t)
                }, ADSucc: function (e, t) {
                }
            }
        }
    })
}(Zepto, window.NEWAP = NEWAP ? NEWAP : {}), function (e, t) {
    var n = t.tools, a = t.ad, l = (t.Nav, t.indexTools, new t.StarRankList);
    e.extend(t.infoFlow.channelHandle, {
        ent: {
            "default": {
                getFrameConfig: function () {
                    return [{tag: "div", attr: {"class": "headslide"}}, {
                        tag: "div",
                        attr: {"class": "swipe-content content-list"}
                    }, {tag: "div", attr: {"class": "list-more"}, template: Handlebars.templates.listmore_tpl}]
                }, init: function (t, l, i) {
                    var o = this;
                    if (o.setOffsetNum(t, function () {
                                return 0
                            }), i) {
                        if (0 != e("#channel_" + t + " .content-list section").length)return !1
                    } else e("#channel_" + t).html("");
                    o.createFrame("#channel_" + t, o.callHandle(t, l, "getFrameConfig")), e("#channel_" + t + " .list-more").show(), n.publicMethod.fetch({
                        DPData: {
                            channel: o.channelId,
                            child: l
                        }, useflag: !1, success: function (n) {
                            o.simple && e.each(n.listdata.data, function (e, t) {
                                t.type = "doc_simple"
                            }), a.getChannelAllAD(a.ADpath, "ad_callback", n, t, l).then(function () {
                                e("#channel_" + t + " .list-more").hide()
                            })
                        }, error: function (e) {
                            console.log(e)
                        }
                    })
                }, bottom: function () {
                    var t = this, l = t.channel;
                    e("#channel_" + l + " .list-more").show(), t.setOffsetNum(l, function (e) {
                        return e += 10
                    }), t.setBottomLock(l, !0), n.publicMethod.fetch({
                        DPData: {
                            offset: t.offset[l],
                            channel: t.channelId,
                            child: t.child
                        }, useflag: !1, success: function (i) {
                            t.setBottomLock(l, !1), e("#channel_" + l + " .list-more").hide(), t.simple && e.each(i.listdata.data, function (e, t) {
                                t.type = "doc_simple"
                            });
                            var o = a.getADDetailData(l, t.child);
                            n.publicMethod.generateHtml(e("#channel_" + l + " .content-list"), i.listdata.data, o, "after"), a.replaceListAD(e("#channel_" + l + " .content-list section"), o)
                        }, error: function (e) {
                            t.setBottomLock(l, !1)
                        }
                    })
                }, ADListSucc: function (t, a, l) {
                    n.publicMethod.generateHtml(e("#channel_" + l + " .headslide"), a.topdata, t), n.publicMethod.generateHtml(e("#channel_" + l + " .content-list"), a.listdata.data, t)
                }, noAD: function (a, l) {
                    n.publicMethod.generateHtml(e("#channel_" + l + " .headslide"), a.topdata), n.publicMethod.generateHtml(e("#channel_" + l + " .content-list"), a.listdata.data), 0 != e("#channel_" + l + " .headslide li").length && t.makeScroll({
                        id: "#channel_" + l,
                        autoSlider: !1,
                        autoTime: 2e3,
                        openSlider: !0
                    })
                }, ADSucc: function (n, l) {
                    a.replaceFocusAD(e("#channel_" + l + " .headslide li"), n), 0 != e("#channel_" + l + " .headslide li").length && t.makeScroll({
                        id: "#channel_" + l,
                        autoSlider: !1,
                        autoTime: 2e3,
                        openSlider: !0
                    }), a.replaceListAD(e("#channel_" + l + " .content-list section"), n)
                }
            }, all: {
                getFrameConfig: function () {
                    return [{tag: "div", attr: {"class": "headslide"}}, {
                        tag: "div",
                        attr: {"class": "swipe-content rank-list"}
                    }, {tag: "div", attr: {"class": "swipe-content content-list"}}, {
                        tag: "div",
                        attr: {"class": "list-more"},
                        template: Handlebars.templates.listmore_tpl
                    }]
                }, init: function (t, i, o) {
                    var s = this;
                    if (s.setOffsetNum(t, function () {
                                return 0
                            }), o) {
                        if (0 != e("#channel_" + t + " .content-list section").length)return !1
                    } else e("#channel_" + t).html("");
                    s.createFrame("#channel_" + t, s.callHandle(t, i, "getFrameConfig")), e("#channel_" + t + " .list-more").show(), l.init(e("#channel_" + t + " .rank-list")), n.publicMethod.fetch({
                        DPData: {
                            channel: s.channelId,
                            child: i
                        }, useflag: !1, success: function (n) {
                            s.simple && e.each(n.listdata.data, function (e, t) {
                                t.type = "doc_simple"
                            }), a.getChannelAllAD(a.ADpath, "ad_callback", n, t, i).then(function () {
                                e("#channel_" + t + " .list-more").hide()
                            })
                        }, error: function (e) {
                            console.log(e)
                        }
                    })
                }, bottom: function () {
                    var t = this, l = t.channel;
                    e("#channel_" + l + " .list-more").show(), t.setOffsetNum(l, function (e) {
                        return e += 10
                    }), t.setBottomLock(l, !0), n.publicMethod.fetch({
                        DPData: {
                            offset: t.offset[l],
                            channel: t.channelId,
                            child: t.child
                        }, useflag: !1, success: function (i) {
                            t.setBottomLock(l, !1), e("#channel_" + l + " .list-more").hide(), t.simple && e.each(i.listdata.data, function (e, t) {
                                t.type = "doc_simple"
                            });
                            var o = a.getADDetailData(l, t.child);
                            n.publicMethod.generateHtml(e("#channel_" + l + " .content-list"), i.listdata.data, o, "after"), a.replaceListAD(e("#channel_" + l + " .content-list section"), o)
                        }, error: function (e) {
                            t.setBottomLock(l, !1)
                        }
                    })
                }, ADListSucc: function (t, a, l) {
                    n.publicMethod.generateHtml(e("#channel_" + l + " .headslide"), a.topdata, t), n.publicMethod.generateHtml(e("#channel_" + l + " .content-list"), a.listdata.data, t)
                }, noAD: function (a, l) {
                    n.publicMethod.generateHtml(e("#channel_" + l + " .headslide"), a.topdata), n.publicMethod.generateHtml(e("#channel_" + l + " .content-list"), a.listdata.data), 0 != e("#channel_" + l + " .headslide li").length && t.makeScroll({
                        id: "#channel_" + l,
                        autoSlider: !1,
                        autoTime: 2e3,
                        openSlider: !0
                    })
                }, ADSucc: function (n, l) {
                    a.replaceFocusAD(e("#channel_" + l + " .headslide li"), n), 0 != e("#channel_" + l + " .headslide li").length && t.makeScroll({
                        id: "#channel_" + l,
                        autoSlider: !1,
                        autoTime: 2e3,
                        openSlider: !0
                    }), a.replaceListAD(e("#channel_" + l + " .content-list section"), n)
                }
            }
        }
    })
}(Zepto, window.NEWAP = NEWAP ? NEWAP : {}), function (e, t) {
    function n() {
        this.template = Handlebars.templates.module_ui_sport_live_tpl
    }

    var a = t.tools, l = t.ad;
    t.indexTools, t.Nav;
    n.prototype = {
        transdata: function (t) {
            var n = [];
            return e.each(t, function (t, a) {
                e.each(a, function (e, a) {
                    a.liveday = t, n.push(a)
                })
            }), n
        }, separateData: function (t) {
            var n, a, l;
            return a = e.grep(t, function (e, t) {
                return 0 == e.status
            }), n = e.grep(t, function (e, t) {
                return 1 == e.status
            }), l = e.grep(t, function (e, t) {
                return 2 == e.status
            }), {matching: n, beforeMatch: a, afterMatch: l}
        }, renderLive: function (t, n) {
            var a = "", l = this;
            e.each(n.matching, function (e, t) {
                a += l.template(t)
            }), e.each(n.beforeMatch, function (e, t) {
                a += l.template(t)
            }), a += Handlebars.templates.module_ui_sport_separate_over_tpl();
            var i = "";
            e.each(n.afterMatch, function (e, t) {
                var n = l.template(t);
                n += i, i = n
            }), a += i, t.html(a)
        }, renderMatchScrollWrap: function (e, t) {
            var n = i.separateData(t), a = n.beforeMatch.concat(n.matching), l = Handlebars.templates.module_ui_sport_score_box2_tpl, o = Handlebars.templates.module_ui_sport_score_box1_tpl, s = "";
            a.length >= 3 ? s = o({data: a}) : 2 == a.length ? s = l({data: a}) : 1 == a.length ? s = l({data: a.concat(n.afterMatch.pop())}) : e.hide(), e.html(s)
        }, getLiveUserCount: function () {
            var t = [], n = 0;
            e("#channel_sports .live1.status1,#channel_sports .live1.status2").each(function () {
                t.push(e(this).data("roomid"))
            }), function l() {
                var i = t[n];
                a.publicMethod.jsonp({
                    url: "http://data.live.126.net/partake/usercount/" + i + ".json?callback=liveUsercount",
                    callbackName: "liveUsercount"
                }).then(function (a) {
                    var i = e("#channel_sports .content-list section").filter(function () {
                        return e(this).data("roomid") == t[n]
                    });
                    i.find(".watchcount").text(a.msg.user_count), n < t.length - 1 && (n += 1, l())
                }, function (e) {
                    n < t.length - 1 && (n += 1, l())
                })
            }()
        }
    };
    var i = new n;
    e.extend(t.infoFlow.channelHandle, {
        sports: {
            "default": {
                getFrameConfig: function () {
                    return [{tag: "div", attr: {"class": "headslide"}}, {
                        tag: "div",
                        attr: {"class": "swipe-content content-list"}
                    }, {tag: "div", attr: {"class": "list-more"}, template: Handlebars.templates.listmore_tpl}]
                }, init: function (t, n, i) {
                    var o = this;
                    if (o.setOffsetNum(t, function () {
                                return 0
                            }), i) {
                        if (0 != e("#channel_" + t + " .content-list section").length)return !1
                    } else e("#channel_" + t).html("");
                    o.createFrame("#channel_" + t, o.callHandle(t, n, "getFrameConfig")), e("#channel_" + t + " .list-more").show(), a.publicMethod.fetch({
                        DPData: {
                            channel: o.channelId,
                            child: n
                        }, useflag: !1, success: function (a) {
                            o.simple && e.each(a.listdata.data, function (e, t) {
                                t.type = "doc_simple"
                            }), l.getChannelAllAD(l.ADpath, "ad_callback", a, t, n).then(function () {
                                e("#channel_" + t + " .list-more").hide()
                            })
                        }, error: function (e) {
                            console.log(e)
                        }
                    })
                }, bottom: function () {
                    var t = this, n = t.channel;
                    e("#channel_" + n + " .list-more").show(), t.setOffsetNum(n, function (e) {
                        return e += 10
                    }), t.setBottomLock(n, !0), a.publicMethod.fetch({
                        DPData: {
                            offset: t.offset[n],
                            channel: t.channelId,
                            child: t.child
                        }, useflag: !1, success: function (i) {
                            t.setBottomLock(n, !1), e("#channel_" + n + " .list-more").hide(), t.simple && e.each(i.listdata.data, function (e, t) {
                                t.type = "doc_simple"
                            });
                            var o = l.getADDetailData(n, t.child);
                            a.publicMethod.generateHtml(e("#channel_" + n + " .content-list"), i.listdata.data, o, "after"), l.replaceListAD(e("#channel_" + n + " .content-list section"), o)
                        }, error: function (e) {
                            t.setBottomLock(n, !1)
                        }
                    })
                }, ADListSucc: function (t, n, l) {
                    a.publicMethod.generateHtml(e("#channel_" + l + " .headslide"), n.topdata, t), a.publicMethod.generateHtml(e("#channel_" + l + " .content-list"), n.listdata.data, t)
                }, noAD: function (n, l) {
                    a.publicMethod.generateHtml(e("#channel_" + l + " .headslide"), n.topdata), a.publicMethod.generateHtml(e("#channel_" + l + " .content-list"), n.listdata.data), 0 != e("#channel_" + l + " .headslide li").length && t.makeScroll({
                        id: "#channel_" + l,
                        autoSlider: !1,
                        autoTime: 2e3,
                        openSlider: !0
                    })
                }, ADSucc: function (n, a) {
                    l.replaceFocusAD(e("#channel_" + a + " .headslide li"), n), 0 != e("#channel_" + a + " .headslide li").length && t.makeScroll({
                        id: "#channel_" + a,
                        autoSlider: !1,
                        autoTime: 2e3,
                        openSlider: !0
                    }), l.replaceListAD(e("#channel_" + a + " .content-list section"), n)
                }
            }, all: {
                getFrameConfig: function () {
                    return [{tag: "div", attr: {"class": "headslide"}}, {
                        tag: "div",
                        attr: {"class": "match_scroll_wrap"}
                    }, {tag: "div", attr: {"class": "swipe-content content-list"}}, {
                        tag: "div",
                        attr: {"class": "list-more"},
                        template: Handlebars.templates.listmore_tpl
                    }]
                }, init: function (t, n, o) {
                    var s = this;
                    if (s.setOffsetNum(t, function () {
                                return 0
                            }), o) {
                        if (0 != e("#channel_" + t + " .content-list section").length)return !1
                    } else e("#channel_" + t).html("");
                    s.createFrame("#channel_" + t, s.callHandle(t, n, "getFrameConfig")), e("#channel_" + t + " .list-more").show(), a.publicMethod.fetch({
                        url: "http://api.sports.126.net/api/nba/schedule/all.json",
                        dataType: "jsonp",
                        cache: !0,
                        jsonp: "jsoncallback",
                        jsonpCallback: "getAllNBAMatch",
                        notformat: !0,
                        useflag: !1,
                        success: function (n) {
                            var a = i.transdata(n);
                            i.renderMatchScrollWrap(e("#channel_" + t + " .match_scroll_wrap"), a)
                        },
                        error: function (e) {
                            console.log(e)
                        }
                    }), a.publicMethod.fetch({
                        DPData: {channel: s.channelId, child: n}, useflag: !1, success: function (a) {
                            s.simple && e.each(a.listdata.data, function (e, t) {
                                t.type = "doc_simple"
                            }), l.getChannelAllAD(l.ADpath, "ad_callback", a, t, n).then(function () {
                                e("#channel_" + t + " .list-more").hide()
                            })
                        }, error: function (e) {
                            console.log(e)
                        }
                    })
                }, bottom: function () {
                    var t = this, n = t.channel;
                    e("#channel_" + n + " .list-more").show(), t.setOffsetNum(n, function (e) {
                        return e += 10
                    }), t.setBottomLock(n, !0), a.publicMethod.fetch({
                        DPData: {
                            offset: t.offset[n],
                            channel: t.channelId,
                            child: t.child
                        }, useflag: !1, success: function (i) {
                            t.setBottomLock(n, !1), e("#channel_" + n + " .list-more").hide(), t.simple && e.each(i.listdata.data, function (e, t) {
                                t.type = "doc_simple"
                            });
                            var o = l.getADDetailData(n, t.child);
                            a.publicMethod.generateHtml(e("#channel_" + n + " .content-list"), i.listdata.data, o, "after"), l.replaceListAD(e("#channel_" + n + " .content-list section"), o)
                        }, error: function (e) {
                            t.setBottomLock(n, !1)
                        }
                    })
                }, ADListSucc: function (t, n, l) {
                    a.publicMethod.generateHtml(e("#channel_" + l + " .headslide"), n.topdata, t), a.publicMethod.generateHtml(e("#channel_" + l + " .content-list"), n.listdata.data, t)
                }, noAD: function (n, l) {
                    a.publicMethod.generateHtml(e("#channel_" + l + " .headslide"), n.topdata), a.publicMethod.generateHtml(e("#channel_" + l + " .content-list"), n.listdata.data), 0 != e("#channel_" + l + " .headslide li").length && t.makeScroll({
                        id: "#channel_" + l,
                        autoSlider: !1,
                        autoTime: 2e3,
                        openSlider: !0
                    })
                }, ADSucc: function (n, a) {
                    l.replaceFocusAD(e("#channel_" + a + " .headslide li"), n), 0 != e("#channel_" + a + " .headslide li").length && t.makeScroll({
                        id: "#channel_" + a,
                        autoSlider: !1,
                        autoTime: 2e3,
                        openSlider: !0
                    }), l.replaceListAD(e("#channel_" + a + " .content-list section"), n)
                }
            }, live: {
                getFrameConfig: function () {
                    return [{tag: "div", attr: {"class": "swipe-content content-list"}}, {
                        tag: "div",
                        attr: {"class": "list-more"},
                        template: Handlebars.templates.listmore_tpl
                    }]
                }, init: function (t, n, l) {
                    var o = this;
                    if (o.setOffsetNum(t, function () {
                                return 0
                            }), l) {
                        if (0 != e("#channel_" + t + " .content-list section").length)return !1
                    } else e("#channel_" + t).html("");
                    o.createFrame("#channel_" + t, o.callHandle(t, n, "getFrameConfig")), e("#channel_" + t + " .list-more").show(), a.publicMethod.fetch({
                        url: "http://api.sports.126.net/api/nba/schedule/all.json",
                        dataType: "jsonp",
                        cache: !0,
                        jsonp: "jsoncallback",
                        jsonpCallback: "getAllNBAMatch",
                        notformat: !0,
                        useflag: !1,
                        success: function (n) {
                            var a = i.transdata(n), l = i.separateData(a);
                            i.renderLive(e("#channel_" + t + " .content-list"), l), e("#channel_" + t + " .list-more").hide(), i.getLiveUserCount()
                        },
                        error: function (e) {
                            console.log(e)
                        }
                    })
                }, bottom: function () {
                }, ADListSucc: function (e, t, n) {
                }, noAD: function (e, t) {
                }, ADSucc: function (e, t) {
                }
            }
        }
    })
}(Zepto, window.NEWAP = NEWAP ? NEWAP : {}), function (e, t) {
    function n() {
        this.childMap = {
            all: "VATL2LQO4",
            amuse: "VAP4BFE3U",
            beauty: "VAP4BG6DL",
            newscene: "VAV3H6JSN",
            BoBo: "VBK3JKUIF",
            moe: "VAP4BFR16",
            goosip: "VBF8EUDUS",
            novelty: "VBF8ET3S2",
            sports: "VBF8F2E94",
            blacktech: "VBF8F2PKF",
            knowladge: "VBF8F3SGL",
            acgn: "VBF8F1PSA",
            equip: "VBF8F3301"
        }, this.columnId = "VATL2LQO4"
    }

    var a = t.tools, l = t.ad;
    t.indexTools, t.Static || {};
    n.prototype = {
        processData: function (t) {
            return e.each(t, function (e, t) {
                t.type = "video_doc"
            }), t
        }
    };
    var i = new n;
    e.extend(t.infoFlow.channelHandle, {
        video: {
            "default": {
                getFrameConfig: function () {
                    return [{tag: "div", attr: {"class": "swipe-content content-list"}}, {
                        tag: "div",
                        attr: {"class": "list-more"},
                        template: Handlebars.templates.listmore_tpl
                    }]
                }, init: function (t, n, o) {
                    var s = this;
                    if (i.columnId = i.childMap[n], s.setOffsetNum(t, function () {
                                return 0
                            }), o) {
                        if (0 != e("#channel_" + t + " .content-list section").length)return !1
                    } else e("#channel_" + t).html("");
                    s.createFrame("#channel_" + t, s.callHandle(t, n, "getFrameConfig")), e("#channel_" + t + " .list-more").show(), a.publicMethod.fetch({
                        dataType: "jsonp",
                        useflag: !1,
                        cache: !0,
                        jsonpCallback: "getVideoList",
                        notformat: !0,
                        url: "http://c.m.163.com/nc/video/list/" + i.columnId + "/y/0-10.html",
                        success: function (a) {
                            l.getChannelAllAD(l.ADpath, "ad_callback", a, t, n).then(function () {
                                e("#channel_" + t + " .list-more").hide()
                            })
                        }
                    })
                }, bottom: function () {
                    var t = this, n = t.channel;
                    e("#channel_" + n + " .list-more").show(), t.setOffsetNum(n, function (e) {
                        return e += 10
                    }), t.setBottomLock(n, !0), a.publicMethod.fetch({
                        dataType: "jsonp",
                        useflag: !1,
                        cache: !0,
                        jsonpCallback: "getVideoList",
                        notformat: !0,
                        url: "http://c.m.163.com/nc/video/list/" + i.columnId + "/y/" + t.offset[n] + "-10.html",
                        success: function (l) {
                            var o = i.processData(l[i.columnId]);
                            t.setBottomLock(n, !1), e("#channel_" + n + " .list-more").hide(), a.publicMethod.generateHtml(e("#channel_" + n + " .content-list"), o, "after")
                        },
                        error: function () {
                            t.setBottomLock(n, !1)
                        }
                    })
                }, ADListSucc: function (e, t, n) {
                }, noAD: function (t, n) {
                    var l = i.processData(t[i.columnId]);
                    a.publicMethod.generateHtml(e("#channel_" + n + " .content-list"), l)
                }, ADSucc: function (e, t) {
                }
            }
        }
    })
}(Zepto, window.NEWAP = NEWAP ? NEWAP : {}), function (e, t) {
    function n() {
        this.share = null
    }

    Handlebars.registerHelper("date_format", function (e, t) {
        return e = new Date(e), e.getFullYear() + "/" + (e.getMonth() + 1) + "/" + e.getDate()
    }), Handlebars.registerHelper("fixThousands", function (e) {
        if (1e4 > e)return e;
        var t = Math.floor(e / 1e3);
        return t / 10 + "\u4e07"
    });
    var a = t.tools, l = t.ad, i = (t.indexTools, t.Static || {});
    n.prototype = {
        processData: function (t) {
            var n = [];
            return e.each(t, function (e, t) {
                2 == t.rtype && (t.type = "openList", t.link = "http://3g.163.com/ntes/special/0034073A/touch_openarticle.html", n.push(t))
            }), n
        }
    }, n.prototype.handleShare = function () {
        var t = this;
        e("#channel_open").on("click", ".o_share_btn", function (n) {
            var a = {
                shareSummary: e(this).data("digest"),
                shareTitle: e(this).data("title"),
                shareImg: e(this).data("img") || "http://img1.cache.netease.com/travel/2014/7/22/20140722172931b2127.png",
                shareLink: e(this).data("link") || window.location.href
            };
            if (t.share)t.share.changeShareConfig(a); else {
                var l = new i.Share(".js-share-mask", a, {});
                l.render(), t.share = l
            }
            e(window).trigger("Share:show")
        })
    };
    var o = new n;
    e.extend(t.infoFlow.channelHandle, {
        open: {
            "default": {
                getFrameConfig: function () {
                    return [{tag: "div", attr: {"class": "swipe-content content-list"}}, {
                        tag: "div",
                        attr: {"class": "list-more"},
                        template: Handlebars.templates.listmore_tpl
                    }]
                }, init: function (t, n, i) {
                    var s = this;
                    if (o.handleShare(), s.setOffsetNum(t, function () {
                                return 0
                            }), i) {
                        if (0 != e("#channel_" + t + " .content-list section").length)return !1
                    } else e("#channel_" + t).html("");
                    s.createFrame("#channel_" + t, s.callHandle(t, n, "getFrameConfig")), e("#channel_" + t + " .list-more").show(), a.publicMethod.fetch({
                        dataType: "jsonp",
                        useflag: !1,
                        cache: !0,
                        notformat: !0,
                        url: "http://c.open.163.com/mob/home/list.do?cursor=0&pagesize=10",
                        success: function (a) {
                            l.getChannelAllAD(l.ADpath, "ad_callback", a, t, n).then(function () {
                                e("#channel_" + t + " .list-more").hide()
                            })
                        }
                    })
                }, bottom: function () {
                    var t = this, n = t.channel;
                    e("#channel_" + n + " .list-more").show(), t.setOffsetNum(n, function (e) {
                        return e += 10
                    }), t.setBottomLock(n, !0), a.publicMethod.fetch({
                        dataType: "jsonp",
                        useflag: !1,
                        cache: !0,
                        notformat: !0,
                        url: "http://c.open.163.com/mob/home/list.do?cursor=" + t.offset[n] + "&pagesize=10",
                        success: function (l) {
                            var i = o.processData(l.data);
                            t.setBottomLock(n, !1), e("#channel_" + n + " .list-more").hide(), a.publicMethod.generateHtml(e("#channel_" + n + " .content-list"), i, "after")
                        },
                        error: function () {
                            t.setBottomLock(n, !1)
                        }
                    })
                }, ADListSucc: function (e, t, n) {
                }, noAD: function (t, n) {
                    var l = o.processData(t.data);
                    a.publicMethod.generateHtml(e("#channel_" + n + " .content-list"), l)
                }, ADSucc: function (e, t) {
                }
            }
        }
    })
}(Zepto, window.NEWAP = NEWAP ? NEWAP : {}), function (e) {
    var t = NEWAP.tools, n = (t.publicMethod.cookie, function () {
        var n = e("#login_panel"), a = e(".login_mask"), l = (e(".weixin_fixed"), e(".login_versions")), i = e(".login_app"), o = e(".icon_personal"), s = e(".icon_email"), r = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/, c = /@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*/, h = /@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/, d = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+/, u = this, m = ["@163.com", "@126.com", "@yeah.net", "@vip.163.com", "@vip.126.com", "@popo.163.com", "@188.com", "@vip.188.com", "@qq.com", "@sina.com"];
        this.conf = {}, this.showLoginPanel = function () {
            n.addClass("show"), a.addClass("show")
        }, this.hideLoginPanel = function () {
            a.removeClass("show"), n.removeClass("show")
        };
        var p = function (e) {
            var t = {
                "@163.com": {
                    read: 1,
                    name: "163",
                    url: "http://entry.mail.163.com/coremail/fcg/ntesdoor2?verifycookie=1&lightweight=1&style=11&df=3g_163"
                },
                "@126.com": {
                    read: 1,
                    name: "126",
                    url: "http://entry.mail.126.com/cgi/ntesdoor?verifycookie=1&lightweight=1&style=11&df=3g_163"
                },
                "@yeah.net": {
                    read: 1,
                    name: "yeah",
                    url: "http://entry.yeah.net/cgi/ntesdoor?verifycookie=1&lightweight=1&style=11&df=3g_163"
                },
                "@188.com": {read: 0, name: "188", url: "http://reg.mail.188.com/servlet/enter"},
                "@vip.126.com": {read: 0, name: "vip", url: "http://reg.vip.126.com/enterMail.m"},
                "@vip.163.com": {read: 0, name: "vip", url: "http://reg.vip.163.com/enterMail.m?enterVip=true"},
                "default": {read: 0, name: "gmail", url: "http://mail.163.com?s=wap"}
            };
            return t[e] ? t[e].url : t["default"].url
        };
        this.updatePanelView = function (a) {
            if (1 == a.logined) {
                n.find(".not_logined").hide(), n.find(".logined").show(), n.find("#email").val(""), n.find("#password").val(""), n.find(".avatar img").attr("src", a.avatar90), n.find(".nickname").text(a.nickname);
                var l = a.userMail.match(h)[0];
                e("#h_email").attr("href", p(l)), n.find("#my_email").attr("href", p(l)), console.log(l);
                try {
                    neteaseTracker(!1, "http://click.portal.163.com/wap/touch/#loginSuccessCount" + this.getQD(), "\u767b\u9646\u6210\u529f\u7684\u6b21\u6570", "clickp")
                } catch (i) {
                }
                t.publicMethod.fetch({
                    url: "http://msg.mail.163.com/cgi/mc?funcid=getusrnewmsgcnt&fid=0&template=newmsgres_setcookie.htm&username=" + a.userMail,
                    dataType: "jsonp",
                    cache: !0,
                    useflag: !1,
                    jsonpCallback: "mails",
                    notformat: !0,
                    success: function (e) {
                        n.find(".unread").text(e), n.find(".login_head").show(), s.find("span").show(), 0 == e && s.find("span").hide()
                    }
                })
            } else n.find(".logined").hide(), n.find(".not_logined").show(), n.find(".login_head").hide(), n.find(".nickname").text("\u672a\u767b\u5f55")
        }, this.init = function (t) {
            var n = this;
            e.extend(!0, this.conf, t), NEWAP.wapLogin.init({
                ele: e("#login-form"),
                success: this.updatePanelView,
                beforeSubmit: function () {
                    return n.validateForm(e("#login-form"), {
                        rules: {
                            "#email": {required: !0, isEmail: !0},
                            "#password": {required: !0}
                        }, errorHandle: {
                            "#email": {
                                required: function () {
                                    n.showTip("\u8bf7\u8f93\u5165\u90ae\u7bb1"), e("#email").focus()
                                }, isEmail: function () {
                                    n.showTip("\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u90ae\u7bb1"), e("#email").focus()
                                }
                            }, "#password": {
                                required: function () {
                                    n.showTip("\u8bf7\u8f93\u5165\u5bc6\u7801"), e("#password").focus()
                                }
                            }
                        }
                    })
                },
                fail: function (e) {
                    n.updatePanelView(e), e.errorMsg && n.showTip(e.errorMsg)
                }
            }), this.emailTip();
            var a = location.search.match(/version=(v_.+?)($|#|\/|&)/)[1];
            l.find("[data-version=" + a + "]").addClass("version_active")
        }, this.showTip = function (e, t) {
            var a = n.find(".login_warning");
            a.show().text(e);
            setTimeout(function () {
                a.hide().text("")
            }, t || 1500)
        }, this.emailTip = function () {
            var t = e(".emailTipList"), a = e("#email"), l = this;
            a.on("input", function () {
                if (n.hasClass("show")) {
                    var a = e(this).val();
                    l.renderEmailTip(t, a)
                }
            }).on("blur", function () {
                setTimeout(function () {
                    l.renderEmailTip(t, ""), t.hide()
                }, 0)
            }), t.on("click", "li", function () {
                a.val(e(this).text()), t.hide()
            })
        }, this.renderEmailTip = function (t, n) {
            var a = "", l = n.match(r), i = n.match(d), o = n.match(h), s = n.match(c);
            n ? (i && !l ? s ? e.each(m, function (e, t) {
                t.indexOf(s) > -1 && (a += "<li>" + i + t + "</li>")
            }) : e.each(m, function (e, t) {
                a += "<li>" + i + t + "</li>"
            }) : l && e.each(m, function (e, t) {
                t.indexOf(o) > -1 && (a += "<li>" + i + t + "</li>")
            }), t.html(a), a ? t.show() : t.hide()) : t.hide()
        }, this.validateForm = function (t, n) {
            var a = {
                required: function (e, t) {
                    return !!e == t
                }, isEmail: function (e) {
                    return r.test(e)
                }
            }, l = !0;
            return e.each(n.rules, function (i, o) {
                var s = t.find(i), r = s.val();
                return e.each(o, function (e, t) {
                    return a[e] && !a[e](r, t) ? (n.errorHandle[i][e] && n.errorHandle[i][e](), l = !1, !1) : void 0
                }), l ? void 0 : !1
            }), l
        }, this.run = function () {
            a.on("touchstart", function (e) {
                e.preventDefault(), u.hideLoginPanel()
            }), l.on("click", ".version", function (t) {
                var n = e(this).data("version");
                try {
                    u.conf.funcObj.versionClick(n)
                } catch (t) {
                }
            }), i.on("click", function (t) {
                var n = e(this).data("version");
                try {
                    u.conf.funcObj.versionClick(n)
                } catch (t) {
                }
            }), n.on("touchmove", function (e) {
                return e.preventDefault(), !1
            }), n.find(".item-cancel").click(function () {
                NEWAP.wapLogin.logOut(), s.find("span").hide()
            }), o.on("click", function () {
                u.showLoginPanel()
            })
        }
    });
    NEWAP.LoginPanel = n
}(window.Zepto), function (e, t) {
    function n() {
        this.config = {
            headerbar: ".bar_wrap",
            header: "#l-indexheader",
            subbox: ".sub_box",
            backTop: ".back_to_top",
            feedBack: ".feed_back"
        }, this.systemOptions = {
            width: screen.width > 0 && window.innerWidth >= screen.width ? screen.width : window.innerWidth,
            anchor: window.location.href,
            anchor_hash: window.location.hash,
            Dpr: 1,
            uAgent: window.navigator.userAgent,
            firstSrceenHeight: screen.height > 0 && window.innerHeight >= screen.height ? screen.height : window.innerHeight,
            scrollHeight: l.publicMethod.scrollY(),
            banBrowser: l.uaMatch.isWX || l.uaMatch.isQQBrowser || l.uaMatch.isUCBrowser || l.uaMatch.isBaidu,
            barHeight: e(".u_topmenu").offset().height,
            jokeMainWidth: Math.floor(6.9 * parseInt(document.getElementsByTagName("html")[0].style.fontSize))
        }, this.headerbar = e(".bar_wrap"), this.header = e("#l-indexheader"), this.subbox = e(".sub_box"), this.backtop = e(".back_to_top", this.subbox), this.feedback = e(".feed_back", this.subbox)
    }

    var a = t.infoFlow, l = t.tools, i = t.indexTools;
    n.prototype = {
        init: function () {
            l.uaMatch.isIos && (this.systemOptions.width = screen.width), l.publicMethod.reviseViewPort(200), this.initHHelper(), this.setDownloadLink(), this.dotStatus(".more_channel.up", "navDot"), this.statfocusClick()
        }, run: function () {
            this.backtop && this.backToTop(), this.feedback && this.feedBack(), this.scrolling(), this.spreadNav()
        }, backToTop: function () {
            this.backtop.click(function () {
                window.scrollTo(0, 0)
            })
        }, feedBack: function () {
            this.feedback.click(function () {
                window.open("http://3g.163.com/ntes/special/0034073A/suggest.html", "_blank")
            })
        }, scrolling: function () {
            var t, n = this, a = n.systemOptions.firstSrceenHeight, i = (n.systemOptions.barHeight, l.publicMethod.isSupportSticky());
            i ? (e(".fixedhack").addClass("ios_fixed"), e(window).on("scroll", function () {
                t = l.publicMethod.scrollY(), t > n.systemOptions.firstSrceenHeight ? n.subbox.show() : t < n.systemOptions.firstSrceenHeight && n.subbox.hide()
            })) : (e(window).on("touchend", function () {
                var a = e(n.config.header).offset().height;
                t = l.publicMethod.scrollY(), t > a && !n.headerbar.hasClass("fixedheader") ? (n.headerbar.addClass("fixedheader"), n.header.addClass("have_fixedbars")) : a > t && n.headerbar.hasClass("fixedheader") && (n.headerbar.removeClass("fixedheader"), n.header.removeClass("have_fixedbars"))
            }), e(".content-list").on("touchmove", function () {
                var a = e(n.config.header).offset().height;
                t = l.publicMethod.scrollY(), t > a ? n.headerbar.hasClass("fixedheader") || (n.headerbar.addClass("fixedheader"), n.header.addClass("have_fixedbars")) : n.headerbar.hasClass("fixedheader") && (n.headerbar.removeClass("fixedheader"), n.header.removeClass("have_fixedbars"))
            }), e(window).on("scroll", function () {
                var i = e(n.config.header).offset().height;
                t = l.publicMethod.scrollY(), t > i ? (n.headerbar.hasClass("fixedheader") || (n.headerbar.addClass("fixedheader"), n.header.addClass("have_fixedbars")), t > a ? n.subbox.show() : a > t && n.subbox.hide()) : i > t && n.headerbar.hasClass("fixedheader") && (n.headerbar.removeClass("fixedheader"), n.header.removeClass("have_fixedbars"))
            }))
        }, adListenerCallback: function () {
            e(window).on("getADSucc", function (n, l, i, o) {
                for (var s = l.banner, r = l.bottom ? l.bottom[0] : "", c = !1, h = s.length, d = h - 1; d >= 0; d--)t.ad.render(s[d], now_cnn), c = "enlargeAD" == s[d].type || "pushAD" == s[d].type ? !0 : c;
                c ? e(window).on("putEnlargeOver", function () {
                    t.ad.render(r, now_cnn)
                }) : t.ad.render(r, now_cnn), t.ad.setADDetailData(t.channelMap, i, a.child, l), t.infoFlow.callHandle(i, o, "ADSucc", l, i)
            }), e(window).on("getADListSucc", function (e, n, a, l, i) {
                t.infoFlow.callHandle(l, i, "ADListSucc", n, a, l)
            }), e(window).on("noAD", function (e, n, a, l) {
                t.infoFlow.callHandle(a, l, "noAD", n, a)
            })
        }, enterRoute: function (n) {
            var a = this;
            e(window).on("enterChannel", function (l, i) {
                e(window).scrollTop(0);
                var o = i.firstname, s = i.secondname, r = o.replace("channel=", ""), c = r !== t.infoFlow.channel;
                a.setTitle(t.channelMap, r);
                try {
                    neteaseTracker()
                } catch (l) {
                }
                t.infoFlow.channelSwiper.toChannel("channel_" + r), t.infoFlow.channelId = t.channelName[":firstname(" + o + ")"].channelId,
                        t.infoFlow.channel = r, t.infoFlow.child = s, t.infoFlow.channelChildMap[r] = s, t.ad.setADPath(t.channelMap, r, s), t.infoFlow.callHandle(r, s, "init", r, s, c), n.toChannel(o, s);
                var h;
                if (t.ad.getADDetailData(r, s) && (h = t.ad.getADDetailData(r, s)), e(t.ad.config.top_ad_con_push).html(""), (void 0 == h || null == h) && e(t.ad.config.top_ad_con_colums).html(""), e(t.ad.config.float_ad_con).remove(), r && ("all" == s || void 0 == s || null == s) && void 0 != h && null != h) {
                    for (var d = h.banner, u = h.bottom ? h.bottom[0] : "", m = !1, p = d.length, f = p - 1; f >= 0; f--)t.ad.render(d[f], r), m = "enlargeAD" == d[f].type || "pushAD" == d[f].type ? !0 : m;
                    m ? e(window).on("putEnlargeOver", function () {
                        t.ad.render(u, r)
                    }) : t.ad.render(u, r)
                }
            })
        }, leaveRoute: function () {
            e(window).on("leaveChannel", function (e, n) {
                var a = n.name.match(/firstname\(((channel=)?\w+)\)/)[1], l = n.name.match(/secondname\((\w+)\)/) ? n.name.match(/secondname\((\w+)\)/)[1] : "", i = a.replace("channel=", "");
                t.infoFlow.callHandle(i, l, "left", i, l)
            })
        }, initHHelper: function () {
            var n = this;
            t.Static.handlebars_helper(), Handlebars.registerHelper("isGif", function (e, t, n) {
                var a = e && e[t] && e[t].o_url, l = /.+\.gif$/;
                return a && l.test(a) ? n.fn(this) : n.inverse(this)
            }), Handlebars.registerHelper("isExtraHigh", function (e, t, a) {
                var l = n.systemOptions.jokeMainWidth, i = e[t].width, o = e[t].height, s = i / l, r = o / s;
                return r > 600 ? a.fn(this) : a.inverse(this)
            }), Handlebars.registerHelper("isliving", function (e, t) {
                return 0 == e || 1 == e ? t.fn(this) : t.inverse(this)
            }), Handlebars.registerHelper("isbeforeLive", function (e, t, n) {
                var a = new Date, l = a.getTime(), i = t.split(",")[0].replace(/\-/g, "/"), o = new Date(i), s = o.getTime();
                return 0 == e && s > l ? n.fn(this) : n.inverse(this)
            }), Handlebars.registerHelper("islive", function (e, t) {
                return 1 == e ? t.fn(this) : t.inverse(this)
            }), Handlebars.registerHelper("isShowCount", function (e, t, n, a) {
                var l = (new Date).getTime(), i = new Date(n.split(",")[0]).getTime();
                return (0 == e && l >= i || 1 == e || 2 == e) && 1 == t ? a.fn(this) : a.inverse(this)
            }), Handlebars.registerHelper("iswatching", function (e, t, n) {
                var a = (new Date).getTime(), l = new Date(t.split(",")[0]).getTime();
                return 1 == e || 0 == e && a >= l ? n.fn(this) : n.inverse(this)
            }), Handlebars.registerHelper("getliveday", function (e, t) {
                var n = "";
                switch (e) {
                    case"1":
                        n = "\u6628\u5929";
                        break;
                    case"2":
                        n = "\u4eca\u5929";
                        break;
                    case"3":
                        n = "\u660e\u5929"
                }
                return n
            }), Handlebars.registerHelper("sliceTime", function (e, t) {
                var n = /\s(.+)\:/;
                return e.match(n)[1]
            }), Handlebars.registerHelper("getSportLiveURL", function (e, t, n) {
                return "http://3g.163.com/ntes/special/0034073A/touch_nbalive.html?roomid=" + e + "&mid=" + t
            }), Handlebars.registerHelper("getMatchStatus", function (e, t, n) {
                var a = (new Date).getTime(), l = new Date(t.split(",")[0]).getTime();
                switch (0 == e && a >= l && (e = 1), e) {
                    case 0:
                        return "\u672a\u5f00\u59cb";
                    case 1:
                        return "\u6b63\u5728\u76f4\u64ad";
                    case 2:
                        return "\u5df2\u7ed3\u675f"
                }
            }), Handlebars.registerHelper("getIdolInfo", function (t, n) {
                var a = "", l = {
                    constellation: t.constellation,
                    height: t.height,
                    weight: t.weight,
                    blood: t.blood,
                    national: t.national,
                    country: t.country,
                    hometown: t.hometown,
                    professional: t.professional,
                    represent: t.represent,
                    appellation: t.appellation
                }, i = 0;
                return e.each(l, function (e, t) {
                    return t && 3 > i ? (a += "height" === e ? t + "cm|" : "weight" === e ? t + "kg|" : t + "|", void(i += 1)) : !1
                }), a = a.slice(0, -1)
            }), Handlebars.registerHelper("intercept", function (e, t, n) {
                var a = e.split(";"), l = a.slice(0, t), i = l.join(" ") + (a.length <= t ? "" : "\u7b49");
                return i
            }), Handlebars.registerHelper("showIdolFocus", function (t, n) {
                var a, l = i.storageLocalVal({key: "myidol_list"}), o = l ? JSON.parse(l) : null;
                return a = o ? e.grep(o, function (e, n) {
                    return e.id == t
                }) : [], 0 == a.length ? n.fn(this) : n.inverse(this)
            }), Handlebars.registerHelper("formatDate", function (e) {
                var t = new Date(e);
                return i.dateFormat.call(t, "yyyy\u5e74MM\u6708dd\u65e5")
            }), Handlebars.registerHelper("normalIndex", function (e) {
                return parseInt(e) + 1
            }), Handlebars.registerHelper("videoLength", function (e) {
                var t = parseInt(e / 60), n = e % 60;
                return t + '"' + n + '"'
            })
        }, versionChoice: function (e) {
            this.versionStatus(e)
        }, versionStatus: function (t, n) {
            var a, o, s, r = i.spLocalStorage(), c = l.publicMethod.localParam(), h = window.location.href, d = (window.location.hash, "v_standard"), u = n || !1;
            if (r ? a = i.storageLocalVal({key: "version"}) : o = window.location.search.match("version=v_simple"), d = a ? a : "v_standard", "version" in c.search && c.search.version == d ? (u = !1, s = h) : s = l.publicMethod.urlAddSearch(h, {version: d}, !0), u)try {
                history.replaceState(null, "", s)
            } catch (m) {
                console.warn("html5--history.pushState on error!")
            }
            return a && "v_standard" != a ? (e(".item", t).removeClass("current"), e("#" + a).addClass("current"), a) : "" != o && null != o && void 0 != o ? (e(".item", t).removeClass("current"), e("#v_simple").addClass("current"), o[0].replace("version=", "")) : !1
        }, versionClick: function (e) {
            var t = i.spLocalStorage();
            switch (e) {
                case"v_standard":
                    return this.versionStandard(t, e);
                case"v_simple":
                    return this.versionSimple(t, e);
                case"v_pc":
                    return this.versionPC(t, e);
                case"v_app":
                    return this.versionAPP(t, e);
                case"":
                    return !1
            }
        }, versionStandard: function (e, t) {
            var n, a = l.publicMethod.localParam(), o = window.location.origin + window.location.pathname, s = window.location.hash, r = "", c = 0, h = "v_standard";
            for (n in a.search)"version" === n && (a.search[n] = h), r += (0 === c ? "?" : "&") + n + "=" + a.search[n], c++;
            r.match("version") || (r += "" == r ? "?version=" + h : "&version=" + h), e ? (i.storageLocalVal({
                key: "version",
                str: t
            }), window.location.href = o + r + s) : (console.warn("Do not support LocalStorage."), window.location.href = o + r + s)
        }, versionSimple: function (e, t) {
            var n, a = l.publicMethod.localParam(), o = window.location.origin + window.location.pathname, s = window.location.hash, r = "", c = 0, h = "v_simple";
            for (n in a.search)"version" === n && (a.search[n] = h), r += (0 === c ? "?" : "&") + n + "=" + a.search[n], c++;
            r.match("version") || (r += "" == r ? "?version=" + h : "&version=" + h), e ? (i.storageLocalVal({
                key: "version",
                str: t
            }), window.location.href = o + r + s) : (console.warn("Do not support LocalStorage."), window.location.href = o + r + s)
        }, versionPC: function (e, t) {
            window.location.href = "http://www.163.com/special/00774IGO/ipad.html?from=3gindex"
        }, versionAPP: function (e, t) {
            var n = l.publicMethod.getQD();
            "function" == typeof neteaseTracker && (neteaseTracker(!1, "http://click.portal.163.com/wap/touch/#WakeupClientCount" + n, "\u5ba2\u6237\u7aef\u5524\u9192\u70b9\u51fb\u603b\u91cf", "clickp"), neteaseTracker(!1, "http://click.portal.163.com/wap/wap3gindex/#IndexBotWakeup" + n, "\u9996\u9875\u7248\u672c\u9009\u62e9\u5524\u9192", "clickp")), window.location.href = "http://3g.163.com/links/6740?s=wap" + n
        }, setDownloadLink: function () {
            e(".icon_appdownload").parent().click(function (e) {
                e.preventDefault();
                var t = l.publicMethod.getQD();
                "function" == typeof neteaseTracker && (neteaseTracker(!1, "http://click.portal.163.com/wap/touch/#WakeupClientCount" + t, "\u5ba2\u6237\u7aef\u5524\u9192\u70b9\u51fb\u603b\u91cf", "clickp"), neteaseTracker(!1, "http://click.portal.163.com/wap/wap3gindex/#topBarWakeUp" + t, "\u9876\u90e8\u4e0b\u8f7d\u6309\u94ae\u5524\u9192", "clickp")), window.location.href = "http://m.163.com/newsapp/applinks.html?s=wap" + t
            })
        }, setTitle: function (e, t) {
            var n = l.publicMethod.find(e, function (e, n) {
                return n.term === t
            });
            "all" !== t && n ? stateman.title = n.name + "\u9891\u9053-\u624b\u673a\u7f51\u6613\u7f51" : stateman.title = "\u624b\u673a\u7f51\u6613\u7f51"
        }, dotStatus: function (t, n, a) {
            var l = "has_dot", o = "1", s = i.spLocalStorage();
            s ? o = i.storageLocalVal({key: n}) : console.warn("\u4e0d\u652f\u6301LocalStorage\uff0c\u4e00\u76f4\u663e\u793adot"), "1" != o && o || (e(t).addClass(l), i.storageLocalVal({
                key: n,
                str: "0"
            }))
        }, spreadNav: function () {
            var t = l.publicMethod.localParam(), n = !1;
            n = "spreadnav" in t.search && "1" == t.search.spreadnav ? !0 : !1, n && setTimeout(function () {
                e(".more_channel").click()
            }, 1e3)
        }, initStyle: function (e) {
            var t = document.createElement("style"), n = "";
            switch (e) {
                case"gdwf_top":
                    n = ".m_article_desc_r,.m_photoset_square_desc_r{display:none;}";
                    break;
                case"wo":
                    n = ".u_topmenu,.main_nav_topnav_wrap{display:none;}.u_topmenu_child{padding-top:0;}#l-indexheader{height:43px;}.main_nav_bar{height:auto;}.main_nav_bar{border:0;}"
            }
            t.innerHTML = n, document.head.appendChild(t)
        }, statfocusClick: function () {
            e(".contents-tablist").on("click", ".news-pic", function (e) {
                var t = l.publicMethod.getQD();
                "function" == typeof neteaseTracker && t && neteaseTracker(!1, "http://click.portal.163.com/wap/touch/#clickFocus" + t, "\u7126\u70b9\u56fe\u70b9\u51fb\u603b\u91cf", "clickp")
            })
        }
    }, t.AF = n
}(Zepto, window.NEWAP = NEWAP ? NEWAP : {}), function (e, t, n) {
    n.Static = n.Static || {};
    var a = n.Static, l = n.tools;
    a.handlebars_helper = function () {
        t.registerHelper("hasimg", function (e, t) {
            return e.length > 0 ? t.fn(this) : t.inverse(this)
        }), t.registerHelper("getone", function (e, t, n, a) {
            return e[t][n] || ""
        }), t.registerHelper("isFirst", function (e, t) {
            0 == e ? t.fn(this) : t.inverse(this)
        }), t.registerHelper("tcounthandle", function (e, t, n) {
            var a = (t + "").length;
            return e > parseInt(t) ? (e / Math.pow(10, a)).toFixed(0) + "\u4e07" : e
        }), t.registerHelper("nozero", function (e, t) {
            var n = !1;
            return "0" == e && n ? t.inverse(this) : t.fn(this)
        }), t.registerHelper("getDvalueDay", function (e, t) {
            return l.publicMethod.getDayDvalue(e)
        }), t.registerHelper("arrLengthNot", function (e, t, n) {
            return e.length != t ? n.fn(this) : n.inverse(this)
        }), t.registerHelper("notIosSafari", function (e) {
            return l.uaMatch.isIosSafari ? e.inverse(this) : e.fn(this)
        }), t.registerHelper("isSpecial", function (e, t) {
            return "\u4e13\u9898" == e ? t.fn(this) : t.inverse(this)
        })
    }
}(Zepto, Handlebars, window.NEWAP = window.NEWAP || {}), function (e) {
    var t = NEWAP.tools, n = new NEWAP.AF, a = NEWAP.ad, l = t.publicMethod.localParam(), i = l.search;
    if ("qd" in i && "" != i.qd)if ("gdwf_top" == i.qd)a.banList = [{
        channel: "whole",
        child: "",
        module: []
    }], n.initStyle("gdwf_top"), e("body").addClass("no_special"); else if ("wo" == i.qd && ("wo_tech" == i.category || "wo_ent" == i.category || "wo_digi" == i.category)) {
        n.initStyle("wo");
        var o = '<iframe src="http://m.wo.cn/head/163.html" name="navbar_wo" frameborder="0" style="width:100%;height:43px;" scrolling="no"></iframe>';
        e("#l-indexheader").html(o)
    }
    var s = {2: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]}, r = NEWAP.Static.versionModel.run(s, "NEWAP_version_branch", "wap3gindex");
    n.init();
    var c = n.systemOptions.width;
    l = t.publicMethod.localParam(), i = l.search;
    var h = NEWAP.Nav;
    "2" === r ? (e("#l-indexheader").addClass("nav_v2"), h.init()) : h.show(NEWAP.channelMap, c), e(".nav_idol").addClass("new"), e(".nav_video").addClass("new"), e(".nav_open").addClass("new"), e(".nav_local").addClass("new"), n.run(), n.versionChoice("#version_choice");
    var d = n.versionStatus("#version_choice", !0), u = new NEWAP.LoginPanel;
    u.init({funcObj: n}), u.run(), document.body.style.hasOwnProperty("webkitBackdropFilter") && (e(".u_topmenu").addClass("ios9"), e(".u_topmenu_child").addClass("ios9")), n.adListenerCallback(), n.enterRoute(h), n.leaveRoute(), t.uaMatch.isSogou || !function () {
        var n = {
            appID: "/touch/com.163.3g", displayInterval: 604800, show: function (n) {
                if ("AndroidChrome" != n) {
                    var a = (document.querySelector("body"), document.querySelector(".ath_close_area"));
                    e(".u-layer-ath").show(), e(".u-layer-ath").addClass("u-ani-ath"), a.addEventListener("click", function () {
                        var n = t.publicMethod.getQD();
                        "function" == typeof neteaseTracker && n && neteaseTracker(!1, "http://click.portal.163.com/wap/touch/#addtohomescreenCount" + n, "\u6dfb\u52a0\u5230\u4e3b\u5c4f\u70b9\u51fb\u91cf", "clickp"), e(".u-layer-ath").removeClass("u-ani-ath"), e(".u-layer-ath").hide()
                    })
                }
            }
        };
        NEWAP.addToHomeScreen(n).show()
    }(window.Zepto), FastClick.attach(document.body);
    var m = NEWAP.infoFlow, t = NEWAP.tools;
    d = "v_simple" == d ? !0 : !1, m.init({simple: d}), stateman.start({html5: !NEWAP.hashrouter, root: "/touch"})
}($);
