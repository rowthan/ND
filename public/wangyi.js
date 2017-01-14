function _ntes_void() {
}
function neteaseTracker(e, t, n, i) {
    function a(e, t) {
        var n = ntes_get_cookie(e), i = ntes_get_cookie(t);
        return -1 == n ? -1 == i ? "" : i : n
    }

    if (!is_spider()) {
        var r = i || _ntes_nacc;
        _ntes_nurl = escape(t || document.location), _ntes_ntit = escape(n || document.title), _ntes_nref = e === !0 ? "" : escape(e || document.referrer), _ntes_flsh = ntes_get_flashver();
        var o = (new Date).getTime();
        if (null == _ntes_cookie_enabled && (document.cookie = "__ntes__test__cookies=" + o, _ntes_cookie_enabled = ntes_get_cookie("__ntes__test__cookies") == o ? !0 : !1, document.cookie = "__ntes__test__cookies=" + o + "; expires=" + new Date("1970/01/01").toUTCString()), "undefined" != r && r && 0 == _ntes_nurl.indexOf("http")) {
            for (var s = 0, c = 0; c < _ntes_domain_array.length; c++)if (_ntes_cdmn == "." + _ntes_domain_array[c]) {
                s = 1;
                break
            }
            if (0 == s)for (c = 0; c < _non_ntes_domain_array.length; c++)if (_non_ntes_cdmn == "." + _non_ntes_domain_array[c]) {
                s = 1, _ntes_cdmn = _non_ntes_cdmn;
                break
            }
            if (1 == s) {
                var l = ntes_get_cookie("_ntes_nnid");
                if (-1 == l)_ntes_cookie_enabled && (_ntes_nvid = fetch_visitor_hash(), _ntes_nvfi = 1, ntes_set_cookie_long("_ntes_nnid", _ntes_nvid + "," + (new Date).getTime())); else {
                    var u = l.indexOf(","), h = l.indexOf("|"), d = !1;
                    -1 == h && (h = l.length), _ntes_nvid = l.substr(0, u), _ntes_surv = l.substr(u + 1, h - u - 1), 0 == _ntes_surv && (_ntes_surv = (new Date).getTime(), d = !0), _ntes_nvid || (_ntes_nvid = fetch_visitor_hash(), d = !0), d && ntes_set_cookie_long("_ntes_nnid", _ntes_nvid + "," + _ntes_surv), 0 != _ntes_surv && o - _ntes_surv > 31536e6 && (_ntes_surv = 0, ntes_set_cookie_long("_ntes_nnid", _ntes_nvid + "," + (new Date).getTime()))
                }
                _ntes_nssn = a("P_INFO", "P_OINFO"), _ntes_nssn = _ntes_nssn ? _ntes_nssn.substr(0, _ntes_nssn.indexOf("|")) : "", _ntes_nstm = a("S_INFO", "S_OINFO") ? 1 : 0, ntes_get_navigation_info();
                var p = ["_nacc=", r, "&_nvid=", _ntes_nvid, "&_nvtm=", _ntes_nvtm, "&_nvsf=", _ntes_nvsf, "&_nvfi=", _ntes_nvfi, "&_nlag=", _ntes_nlag, "&_nlmf=", _ntes_nlmf, "&_nres=", _ntes_nres, "&_nscd=", _ntes_nscd, "&_nstm=", _ntes_nstm, "&_nurl=", _ntes_nurl, "&_ntit=", _ntes_ntit, "&_nref=", _ntes_nref, "&_nfla=", _ntes_flsh, "&_nssn=", _ntes_nssn, "&_nxkey=", (o + "" + Math.random()).substring(6, 20), "&_end1"].join("");
                _ntes_nvsf = 0, _ntes_sendInfo("base", _ntes_src_addr + "/ntes?" + p, neteaseTracker.callback), neteaseTracker.callback = null;
                var f = /(?:iPhone|iPad|iPod|Android|Adr |Windows Phone)/i;
                "analytics" == _ntes_nacc || "research" == _ntes_nacc || "siteinfo" == _ntes_nacc || 0 == _ntes_nurl.indexOf("https") || f.test(navigator.userAgent) || ntes_survey_popup()
            }
        }
    }
}
function neteaseClickTracker(e, t, n, i, a) {
    if (e && !is_spider()) {
        var r = e;
        (1 === r.nodeType || 9 === r.nodeType) && (r = [e]);
        var o, s, c, l = r.length, u = 0;
        if (l) {
            var h, d = function (e) {
                var r = _ntes_fixEvent(e || window.event), o = this;
                if (2 != this.clickTrackeState) {
                    if (1 == this.clickTrackeState)return r.preventDefault(), void r.stopPropagation();
                    this.clickTrackeState = 1, window.setTimeout(function () {
                        o.clickTrackeState = 2
                    }, 500), neteaseTracker.callback = function () {
                        var e = o.getAttribute("href");
                        e && (window.location.href = e), window.setTimeout(function () {
                            o.clickTrackeState = 0
                        }, 500)
                    }, neteaseTracker(t, n, i, a), window.setTimeout(function () {
                        neteaseTracker.callback && neteaseTracker.callback()
                    }, 1500), r.preventDefault()
                }
            }, p = function () {
                neteaseTracker(t, n, i, a)
            }, f = document.getElementsByTagName("head")[0];
            for (f && (h = (f.getElementsByTagName("base")[0] || {}).target); l > u; u++)o = r[u], s = o.tagName.toLowerCase(), "a" != s || (c = o.getAttribute("target") || h, c && "_self" != c) ? _ntes_bindEvent(o, "click", p) : _ntes_bindEvent(o, "click", d)
        }
    }
}
function ntes_survey_popup() {
    if (0 == _ntes_surv) {
        var e = Math.round(255 * Math.random()).toString(16);
        if (e = 1 == e.length ? "0" + e : e, "undefined" == typeof _ntes_nvid || 32 != _ntes_nvid.length || _ntes_nvid.substr(30, 2) != e)return;
        var t = "//research.163.com/survey/";
        t = t + "?_nacc=" + _ntes_nacc + "&_nvid=" + _ntes_nvid, window.open(t, "", "width=680, height=450, top=100, left=120, scrollbars=yes"), ntes_set_cookie_long("_ntes_nnid", _ntes_nvid + "," + (new Date).getTime())
    }
}
function ntes_get_navigation_info() {
    _ntes_nres = "-", _ntes_nscd = "-", _ntes_nlag = "-";
    var e = window.self, t = window.screen, n = window.navigator;
    if (e.screen)_ntes_nres = t.width + "x" + t.height, _ntes_nscd = t.colorDepth + "-bit"; else if (e.java) {
        var i = java.awt.Toolkit.getDefaultToolkit(), a = i.getScreenSize();
        _ntes_nres = a.width + "x" + a.height
    }
    n.language ? _ntes_nlag = n.language.toLowerCase() : n.browserLanguage && (_ntes_nlag = n.browserLanguage.toLowerCase());
    var r = new Date(document.lastModified);
    _ntes_nlmf = r.getTime() / 1e3
}
function fetch_visitor_hash() {
    var e = new Date, t = document.body.clientWidth + ":" + document.body.clientHeight, n = str_to_ent(e.getTime() + Math.random() + document.location + document.referrer + screen.width + screen.height + navigator.userAgent + document.cookie + t);
    return ntes_hex_md5(n)
}
function ntes_get_domain() {
    var e = document.domain, t = e.split("."), n = t.length, i = /^\d+$/g;
    if (i.test(t[n - 1]))return e;
    if (t.length < 3)return "." + e;
    var a, r = ["com", "net", "org", "gov", "co"], o = !1;
    for (a = 0; a < r.length; a++)t[n - 2] == r[a] && (o = !0);
    return o ? "." + t[n - 3] + "." + t[n - 2] + "." + t[n - 1] : "." + t[n - 2] + "." + t[n - 1]
}
function non_ntes_get_domain() {
    var e = document.domain, t = e.split("."), n = t.length;
    if (pattern = /^\d+$/g, pattern.test(t[n - 1]))return e;
    if (t.length < 4)return "." + e;
    var i, a = ["com", "net", "org", "gov", "co"], r = !1;
    for (i = 0; i < a.length; i++)t[n - 2] == a[i] && (r = !0);
    return r ? "." + t[n - 4] + "." + t[n - 3] + "." + t[n - 2] + "." + t[n - 1] : "." + t[n - 3] + "." + t[n - 2] + "." + t[n - 1]
}
function ntes_set_cookie_long(e, t) {
    var n = new Date;
    n.setTime(n.getTime() + 31536e8), document.cookie = e + "=" + t + "; expires=" + n.toGMTString() + "; path=/; domain=" + _ntes_cdmn
}
function ntes_set_cookie(e, t) {
    var n = new Date;
    n.setTime(n.getTime() + 0), document.cookie = e + "=" + t + "; path=/; domain=" + _ntes_cdmn
}
function ntes_set_cookie_new(e, t, n) {
    n && "" != n || (n = 31536e6);
    var i = new Date;
    i.setTime(i.getTime() + n), document.cookie = e + "=" + t + "; expires=" + i.toGMTString() + "; path=/; domain=" + _ntes_cdmn
}
function ntes_get_cookie(e) {
    for (var t = document.cookie, n = e + "=", i = t.length, a = 0; i > a;) {
        var r = a + n.length;
        if (t.substring(a, r) == n) {
            var o = t.indexOf(";", r);
            return -1 == o && (o = i), unescape(t.substring(r, o))
        }
        if (a = t.indexOf(" ", a) + 1, 0 == a)break
    }
    return -1
}
function ntes_get_flashver() {
    var f = "", n = navigator;
    if (n.plugins && n.plugins.length) {
        for (var ii = 0; ii < n.plugins.length; ii++)if (-1 != n.plugins[ii].name.indexOf("Shockwave Flash")) {
            f = n.plugins[ii].description.split("Shockwave Flash")[1];
            break
        }
    } else if (window.ActiveXObject)for (var ii = 10; ii >= 2; ii--)try {
        var fl = eval("new ActiveXObject('ShockwaveFlash.ShockwaveFlash." + ii + "');");
        if (fl) {
            f = ii + ".0";
            break
        }
    } catch (e) {
    }
    return f
}
function ntes_hex_md5(e) {
    return binl2hex(ntes_core_md5(str2binl(e), e.length * _ntes_chrsz))
}
function ntes_core_md5(e, t) {
    e[t >> 5] |= 128 << t % 32, e[(t + 64 >>> 9 << 4) + 14] = t;
    for (var n = 1732584193, i = -271733879, a = -1732584194, r = 271733878, o = 0; o < e.length; o += 16) {
        var s = n, c = i, l = a, u = r;
        n = md5_ff(n, i, a, r, e[o + 0], 7, -680876936), r = md5_ff(r, n, i, a, e[o + 1], 12, -389564586), a = md5_ff(a, r, n, i, e[o + 2], 17, 606105819), i = md5_ff(i, a, r, n, e[o + 3], 22, -1044525330), n = md5_ff(n, i, a, r, e[o + 4], 7, -176418897), r = md5_ff(r, n, i, a, e[o + 5], 12, 1200080426), a = md5_ff(a, r, n, i, e[o + 6], 17, -1473231341), i = md5_ff(i, a, r, n, e[o + 7], 22, -45705983), n = md5_ff(n, i, a, r, e[o + 8], 7, 1770035416), r = md5_ff(r, n, i, a, e[o + 9], 12, -1958414417), a = md5_ff(a, r, n, i, e[o + 10], 17, -42063), i = md5_ff(i, a, r, n, e[o + 11], 22, -1990404162), n = md5_ff(n, i, a, r, e[o + 12], 7, 1804603682), r = md5_ff(r, n, i, a, e[o + 13], 12, -40341101), a = md5_ff(a, r, n, i, e[o + 14], 17, -1502002290), i = md5_ff(i, a, r, n, e[o + 15], 22, 1236535329), n = md5_gg(n, i, a, r, e[o + 1], 5, -165796510), r = md5_gg(r, n, i, a, e[o + 6], 9, -1069501632), a = md5_gg(a, r, n, i, e[o + 11], 14, 643717713), i = md5_gg(i, a, r, n, e[o + 0], 20, -373897302), n = md5_gg(n, i, a, r, e[o + 5], 5, -701558691), r = md5_gg(r, n, i, a, e[o + 10], 9, 38016083), a = md5_gg(a, r, n, i, e[o + 15], 14, -660478335), i = md5_gg(i, a, r, n, e[o + 4], 20, -405537848), n = md5_gg(n, i, a, r, e[o + 9], 5, 568446438), r = md5_gg(r, n, i, a, e[o + 14], 9, -1019803690), a = md5_gg(a, r, n, i, e[o + 3], 14, -187363961), i = md5_gg(i, a, r, n, e[o + 8], 20, 1163531501), n = md5_gg(n, i, a, r, e[o + 13], 5, -1444681467), r = md5_gg(r, n, i, a, e[o + 2], 9, -51403784), a = md5_gg(a, r, n, i, e[o + 7], 14, 1735328473), i = md5_gg(i, a, r, n, e[o + 12], 20, -1926607734), n = md5_hh(n, i, a, r, e[o + 5], 4, -378558), r = md5_hh(r, n, i, a, e[o + 8], 11, -2022574463), a = md5_hh(a, r, n, i, e[o + 11], 16, 1839030562), i = md5_hh(i, a, r, n, e[o + 14], 23, -35309556), n = md5_hh(n, i, a, r, e[o + 1], 4, -1530992060), r = md5_hh(r, n, i, a, e[o + 4], 11, 1272893353), a = md5_hh(a, r, n, i, e[o + 7], 16, -155497632), i = md5_hh(i, a, r, n, e[o + 10], 23, -1094730640), n = md5_hh(n, i, a, r, e[o + 13], 4, 681279174), r = md5_hh(r, n, i, a, e[o + 0], 11, -358537222), a = md5_hh(a, r, n, i, e[o + 3], 16, -722521979), i = md5_hh(i, a, r, n, e[o + 6], 23, 76029189), n = md5_hh(n, i, a, r, e[o + 9], 4, -640364487), r = md5_hh(r, n, i, a, e[o + 12], 11, -421815835), a = md5_hh(a, r, n, i, e[o + 15], 16, 530742520), i = md5_hh(i, a, r, n, e[o + 2], 23, -995338651), n = md5_ii(n, i, a, r, e[o + 0], 6, -198630844), r = md5_ii(r, n, i, a, e[o + 7], 10, 1126891415), a = md5_ii(a, r, n, i, e[o + 14], 15, -1416354905), i = md5_ii(i, a, r, n, e[o + 5], 21, -57434055), n = md5_ii(n, i, a, r, e[o + 12], 6, 1700485571), r = md5_ii(r, n, i, a, e[o + 3], 10, -1894986606), a = md5_ii(a, r, n, i, e[o + 10], 15, -1051523), i = md5_ii(i, a, r, n, e[o + 1], 21, -2054922799), n = md5_ii(n, i, a, r, e[o + 8], 6, 1873313359), r = md5_ii(r, n, i, a, e[o + 15], 10, -30611744), a = md5_ii(a, r, n, i, e[o + 6], 15, -1560198380), i = md5_ii(i, a, r, n, e[o + 13], 21, 1309151649), n = md5_ii(n, i, a, r, e[o + 4], 6, -145523070), r = md5_ii(r, n, i, a, e[o + 11], 10, -1120210379), a = md5_ii(a, r, n, i, e[o + 2], 15, 718787259), i = md5_ii(i, a, r, n, e[o + 9], 21, -343485551), n = safe_add(n, s), i = safe_add(i, c), a = safe_add(a, l), r = safe_add(r, u)
    }
    return Array(n, i, a, r)
}
function md5_cmn(e, t, n, i, a, r) {
    return safe_add(bit_rol(safe_add(safe_add(t, e), safe_add(i, r)), a), n)
}
function md5_ff(e, t, n, i, a, r, o) {
    return md5_cmn(t & n | ~t & i, e, t, a, r, o)
}
function md5_gg(e, t, n, i, a, r, o) {
    return md5_cmn(t & i | n & ~i, e, t, a, r, o)
}
function md5_hh(e, t, n, i, a, r, o) {
    return md5_cmn(t ^ n ^ i, e, t, a, r, o)
}
function md5_ii(e, t, n, i, a, r, o) {
    return md5_cmn(n ^ (t | ~i), e, t, a, r, o)
}
function safe_add(e, t) {
    var n = (65535 & e) + (65535 & t), i = (e >> 16) + (t >> 16) + (n >> 16);
    return i << 16 | 65535 & n
}
function bit_rol(e, t) {
    return e << t | e >>> 32 - t
}
function str2binl(e) {
    for (var t = new Array, n = (1 << _ntes_chrsz) - 1, i = 0; i < e.length * _ntes_chrsz; i += _ntes_chrsz)t[i >> 5] |= (e.charCodeAt(i / _ntes_chrsz) & n) << i % 32;
    return t
}
function binl2hex(e) {
    for (var t = _ntes_hexcase ? "0123456789ABCDEF" : "0123456789abcdef", n = "", i = 0; i < 4 * e.length; i++)n += t.charAt(e[i >> 2] >> i % 4 * 8 + 4 & 15) + t.charAt(e[i >> 2] >> i % 4 * 8 & 15);
    return n
}
function str_to_ent(e) {
    var t, n = "";
    for (t = 0; t < e.length; t++) {
        var i = e.charCodeAt(t), a = "";
        if (i > 255) {
            for (; i >= 1;)a = "0123456789".charAt(i % 10) + a, i /= 10;
            "" == a && (a = "0"), a = "#" + a, a = "&" + a, a += ";", n += a
        } else n += e.charAt(t)
    }
    return n
}
function ntes_page_click_stat(e) {
    var t, n = this.tagName.toLowerCase(), i = _ntes_fixEvent(e || window.event), a = "", r = "";
    switch (n) {
        case"a":
        case"area":
            a = this.getAttribute("href", 2) || this.nodeName, r = this.innerText || this.textContent || this.title || this.alt || this.name || "", "a" != n || r || (t = this.getElementsByTagName("img"), t[0] && (r = t[0].title || t[0].alt || ""));
            break;
        case"button":
        case"input":
            a = this.nodeName, r = this.value || this.title || this.name || "";
            break;
        default:
            return
    }
    var o = escape(a), s = escape(r), c = escape(document.URL), l = "CSS1Compat" === document.compatMode ? document.documentElement.clientWidth : document.body.clientWidth, u = document.documentElement.scrollLeft || document.body.scrollLeft || 0, h = document.documentElement.scrollTop || document.body.scrollTop || 0, d = "CSS1Compat" === document.compatMode ? document.documentElement.clientHeight : document.body.clientHeight, p = _ntes_page_data.getRunTime(), f = Math.round(i.pageX), m = Math.round(i.pageY), g = ["_nacc=", _ntes_nacc, "&_npurl=", c, "&_nah=", o, "&_nat=", s, "&_ncw=", l, "&_nch=", d, "&_nsl=", u, "&_nst=", h, "&_nmx=", f, "&_nmy=", m, "&_nct=", p, "&_end"].join("");
    _ntes_page_data.maxClick++, _ntes_sendInfo("pst", _ntes_src_addr + "/ntes_p?" + g)
}
function ntes_page_unload_stat(e) {
    var t = escape(document.URL), n = "CSS1Compat" === document.compatMode ? document.documentElement.clientWidth : document.body.clientWidth, i = document.documentElement.scrollLeft || document.body.scrollLeft || 0, a = document.documentElement.scrollTop || document.body.scrollTop || 0, r = "CSS1Compat" === document.compatMode ? document.documentElement.clientHeight : document.body.clientHeight, o = _ntes_page_data.getRunTime(), s = Math.max(_ntes_page_data.maxScroll, a), c = _ntes_page_data.maxClick, l = _ntes_page_data.getActionTime(), u = ["_nacc=", _ntes_nacc, "&_npurl=", t, "&_ncw=", n, "&_nch=", r, "&_nsl=", i, "&_nst=", a, "&_nct=", o, "&_msl=", s, "&_mcn=", c, "&_nit=", l, "&_end"].join("");
    _ntes_sendInfo("puld", _ntes_src_addr + "/ntes_u?" + u)
}
function neteaseClickStat(e) {
    if ("undefined" != typeof _ntes_nacc && _ntes_nacc && !is_spider()) {
        var t = Math.random(), n = Math.abs(e || 30);
        if (t = parseInt(t * n), 0 == t) {
            for (var i = document.getElementsByTagName("a"), a = i.length, r = 0; a > r; r++)_ntes_bindEvent(i[r], "click", ntes_page_click_stat);
            var o = document.getElementsByTagName("button");
            for (a = o.length, r = 0; a > r; r++)_ntes_bindEvent(o[r], "click", ntes_page_click_stat);
            var s = document.getElementsByTagName("input");
            for (a = s.length, r = 0; a > r; r++)("button" == s[r].type || "submit" == s[r].type || "img" == s[r].type) && _ntes_bindEvent(s[r], "click", ntes_page_click_stat);
            var c = document.getElementsByTagName("area");
            for (a = c.length, r = 0; a > r; r++)_ntes_bindEvent(c[r], "click", ntes_page_click_stat);
            var l;
            _ntes_bindEvent(window, "scroll", l = function () {
                _ntes_page_data.maxScroll = Math.max(_ntes_page_data.maxScroll, document.documentElement.scrollTop || document.body.scrollTop), _ntes_page_data.fireAction()
            }), l();
            var u = document.getElementsByTagName("a");
            for (a = u.length, r = 0; a > r; r++)u[r].href.indexOf("javascript:") >= 0 && _ntes_bindEvent(u[r], "click", function (e) {
                _ntes_fixEvent(e || window.event).preventDefault();
                var t, n = this.href.split("javascript:")[1] || "";
                return n ? (t = new Function(n), t.call(this)) : void 0
            });
            _ntes_bindEvent(window, "beforeunload", ntes_page_unload_stat);
            var h = window.navigator.userAgent.toLowerCase();
            !/compatible/.test(h) && /firefox/.test(h) && _ntes_bindEvent(window, "unload", ntes_page_unload_stat), _ntes_bindEvent(document, "mousemove", _ntes_page_data.fireAction), _ntes_bindEvent(document, "mousedown", _ntes_page_data.fireAction), _ntes_bindEvent(document, "keypress", _ntes_page_data.fireAction)
        }
    }
}
function _ntes_bindEvent(e, t, n) {
    if (e.addEventListener)e.addEventListener(t, n, !1); else if (e.attachEvent)e.attachEvent("on" + t, function () {
        return n.apply(e, arguments)
    }); else {
        var i = e["on" + t] || function () {
                };
        e["on" + t] = function () {
            i.apply(e, arguments), n.apply(e, arguments)
        }
    }
}
function _ntes_fixEvent(e) {
    for (var t, n = {}, i = "altKey ctrlKey shiftKey keyCode button clientX clientY offsetX offsetY pageX pageY target relatedTarget srcElement fromElement toElement".split(" "), a = i.length; a;)t = i[--a], n[t] = e[t];
    if (n.orgEvent = e, n.target = e.target || e.srcElement || document, 3 === n.target.nodeType && (n.target = n.target.parentNode), !n.relatedTarget && n.fromElement && (n.relatedTarget = n.fromElement === n.target ? n.toElement : n.fromElement), null == n.pageX && null != n.clientX) {
        var r = document.documentElement, o = document.body;
        n.pageX = n.clientX + (r && r.scrollLeft || o && o.scrollLeft || 0) - (r && r.clientLeft || o && o.clientLeft || 0), n.pageY = n.clientY + (r && r.scrollTop || o && o.scrollTop || 0) - (r && r.clientTop || o && o.clientTop || 0), r = o = null
    }
    return n.preventDefault = e.preventDefault ? function () {
        e.preventDefault()
    } : function () {
        e.returnValue = !1
    }, n.stopPropagation = e.stopPropagation ? function () {
        e.stopPropagation()
    } : function () {
        e.cancelBubble = !0
    }, n
}
function _ntes_sendInfo(e, t, n) {
    var i, a = e + "_" + +new Date + parseInt(100 * Math.random()), r = n || _ntes_void;
    i = window[a] = new Image, i.onload = function () {
        window[a] = null, r()
    }, i.onerror = function () {
        window[a] = null, r()
    }, i.src = t, i = null
}
function recordAction(e, t, n, i, a) {
    var r = "";
    r += "s=" + _ntes_nacc, r += "&u=" + _ntes_nvid, r += "&a=" + escape(e), r += "&v=" + escape(t), r += "&n=" + escape(n), r += "&p1=" + i, void 0 != a && (r += "&p2=" + a), r += "&r=" + _ntes_nurl, r += "&_nxkey=" + (Number(new Date) + "" + Math.random()).substring(6, 20) + "&_end1", _ntes_sendInfo("log", _ntes_src_addr + "/ntesv?" + r)
}
function neteaseClickStatForArea(e, t, n) {
    if ("undefined" != typeof _ntes_nacc && _ntes_nacc && 1 == (e || {}).nodeType) {
        var i = Math.random(), a = Math.abs(n || 30);
        if (i = parseInt(i * a), 0 == i) {
            for (var r = t || document.URL, o = function (t) {
                ntes_area_click_stat.call(this, t, e, r)
            }, s = e.getElementsByTagName("a"), c = s.length, l = 0; c > l; l++)_ntes_bindEvent(s[l], "click", o);
            var u = e.getElementsByTagName("button");
            for (c = u.length, l = 0; c > l; l++)_ntes_bindEvent(u[l], "click", o);
            var h = e.getElementsByTagName("input");
            for (c = h.length, l = 0; c > l; l++)("button" == h[l].type || "submit" == h[l].type || "img" == h[l].type) && _ntes_bindEvent(h[l], "click", o);
            var d = e.getElementsByTagName("area");
            for (c = d.length, l = 0; c > l; l++)_ntes_bindEvent(d[l], "click", o)
        }
    }
}
function ntes_area_click_stat(e, t, n) {
    var i, a = this.tagName.toLowerCase(), r = _ntes_fixEvent(e || window.event), o = "", s = "";
    switch (a) {
        case"a":
        case"area":
            o = this.getAttribute("href", 2) || this.nodeName, s = this.innerText || this.textContent || this.title || this.alt || this.name || "", "a" != a || s || (i = this.getElementsByTagName("img"), i[0] && (s = i[0].title || i[0].alt || ""));
            break;
        case"button":
        case"input":
            o = this.nodeName, s = this.value || this.title || this.name || "";
            break;
        default:
            return
    }
    var c = ntes_area_click_tools.getOffset(t), l = ntes_area_click_tools.getSize(t), u = escape(o), h = escape(s), d = escape(n), p = l.width, f = l.height, m = t.scrollLeft || 0, g = t.scrollTop || 0, v = _ntes_page_data.getRunTime(), _ = Math.round(r.pageX) - c.x + m, y = Math.round(r.pageY) - c.y + g, w = ["_nacc=", _ntes_nacc, "&_npurl=", d, "&_nah=", u, "&_nat=", h, "&_ncw=", p, "&_nch=", f, "&_nsl=", m, "&_nst=", g, "&_nmx=", _, "&_nmy=", y, "&_nct=", v, "&_end"].join("");
    _ntes_sendInfo("pst", _ntes_src_addr + "/ntes_p?" + w)
}
function is_spider() {
    return /baiduspider/gi.test(window.navigator.userAgent)
}
var Zepto = function () {
    function e(e) {
        return null == e ? String(e) : Q[V.call(e)] || "object"
    }

    function t(t) {
        return "function" == e(t)
    }

    function n(e) {
        return null != e && e == e.window
    }

    function i(e) {
        return null != e && e.nodeType == e.DOCUMENT_NODE
    }

    function a(t) {
        return "object" == e(t)
    }

    function r(e) {
        return a(e) && !n(e) && Object.getPrototypeOf(e) == Object.prototype
    }

    function o(e) {
        return "number" == typeof e.length
    }

    function s(e) {
        return C.call(e, function (e) {
            return null != e
        })
    }

    function c(e) {
        return e.length > 0 ? x.fn.concat.apply([], e) : e
    }

    function l(e) {
        return e.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()
    }

    function u(e) {
        return e in I ? I[e] : I[e] = new RegExp("(^|\\s)" + e + "(\\s|$)")
    }

    function h(e, t) {
        return "number" != typeof t || M[l(e)] ? t : t + "px"
    }

    function d(e) {
        var t, n;
        return D[e] || (t = P.createElement(e), P.body.appendChild(t), n = getComputedStyle(t, "").getPropertyValue("display"), t.parentNode.removeChild(t), "none" == n && (n = "block"), D[e] = n), D[e]
    }

    function p(e) {
        return "children" in e ? A.call(e.children) : x.map(e.childNodes, function (e) {
            return 1 == e.nodeType ? e : void 0
        })
    }

    function f(e, t, n) {
        for (k in t)n && (r(t[k]) || Z(t[k])) ? (r(t[k]) && !r(e[k]) && (e[k] = {}), Z(t[k]) && !Z(e[k]) && (e[k] = []), f(e[k], t[k], n)) : t[k] !== b && (e[k] = t[k])
    }

    function m(e, t) {
        return null == t ? x(e) : x(e).filter(t)
    }

    function g(e, n, i, a) {
        return t(n) ? n.call(e, i, a) : n
    }

    function v(e, t, n) {
        null == n ? e.removeAttribute(t) : e.setAttribute(t, n)
    }

    function _(e, t) {
        var n = e.className || "", i = n && n.baseVal !== b;
        return t === b ? i ? n.baseVal : n : void(i ? n.baseVal = t : e.className = t)
    }

    function y(e) {
        try {
            return e ? "true" == e || ("false" == e ? !1 : "null" == e ? null : +e + "" == e ? +e : /^[\[\{]/.test(e) ? x.parseJSON(e) : e) : e
        } catch (t) {
            return e
        }
    }

    function w(e, t) {
        t(e);
        for (var n = 0, i = e.childNodes.length; i > n; n++)w(e.childNodes[n], t)
    }

    var b, k, x, S, E, T, L = [], A = L.slice, C = L.filter, P = window.document, D = {}, I = {}, M = {
        "column-count": 1,
        columns: 1,
        "font-weight": 1,
        "line-height": 1,
        opacity: 1,
        "z-index": 1,
        zoom: 1
    }, O = /^\s*<(\w+|!)[^>]*>/, N = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, j = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, R = /^(?:body|html)$/i, B = /([A-Z])/g, F = ["val", "css", "html", "text", "data", "width", "height", "offset"], U = ["after", "prepend", "before", "append"], z = P.createElement("table"), H = P.createElement("tr"), W = {
        tr: P.createElement("tbody"),
        tbody: z,
        thead: z,
        tfoot: z,
        td: H,
        th: H,
        "*": P.createElement("div")
    }, q = /complete|loaded|interactive/, $ = /^[\w-]*$/, Q = {}, V = Q.toString, G = {}, X = P.createElement("div"), J = {
        tabindex: "tabIndex",
        readonly: "readOnly",
        "for": "htmlFor",
        "class": "className",
        maxlength: "maxLength",
        cellspacing: "cellSpacing",
        cellpadding: "cellPadding",
        rowspan: "rowSpan",
        colspan: "colSpan",
        usemap: "useMap",
        frameborder: "frameBorder",
        contenteditable: "contentEditable"
    }, Z = Array.isArray || function (e) {
                return e instanceof Array
            };
    return G.matches = function (e, t) {
        if (!t || !e || 1 !== e.nodeType)return !1;
        var n = e.webkitMatchesSelector || e.mozMatchesSelector || e.oMatchesSelector || e.matchesSelector;
        if (n)return n.call(e, t);
        var i, a = e.parentNode, r = !a;
        return r && (a = X).appendChild(e), i = ~G.qsa(a, t).indexOf(e), r && X.removeChild(e), i
    }, E = function (e) {
        return e.replace(/-+(.)?/g, function (e, t) {
            return t ? t.toUpperCase() : ""
        })
    }, T = function (e) {
        return C.call(e, function (t, n) {
            return e.indexOf(t) == n
        })
    }, G.fragment = function (e, t, n) {
        var i, a, o;
        return N.test(e) && (i = x(P.createElement(RegExp.$1))), i || (e.replace && (e = e.replace(j, "<$1></$2>")), t === b && (t = O.test(e) && RegExp.$1), t in W || (t = "*"), o = W[t], o.innerHTML = "" + e, i = x.each(A.call(o.childNodes), function () {
            o.removeChild(this)
        })), r(n) && (a = x(i), x.each(n, function (e, t) {
            F.indexOf(e) > -1 ? a[e](t) : a.attr(e, t)
        })), i
    }, G.Z = function (e, t) {
        return e = e || [], e.__proto__ = x.fn, e.selector = t || "", e
    }, G.isZ = function (e) {
        return e instanceof G.Z
    }, G.init = function (e, n) {
        var i;
        if (!e)return G.Z();
        if ("string" == typeof e)if (e = e.trim(), "<" == e[0] && O.test(e))i = G.fragment(e, RegExp.$1, n), e = null; else {
            if (n !== b)return x(n).find(e);
            i = G.qsa(P, e)
        } else {
            if (t(e))return x(P).ready(e);
            if (G.isZ(e))return e;
            if (Z(e))i = s(e); else if (a(e))i = [e], e = null; else if (O.test(e))i = G.fragment(e.trim(), RegExp.$1, n), e = null; else {
                if (n !== b)return x(n).find(e);
                i = G.qsa(P, e)
            }
        }
        return G.Z(i, e)
    }, x = function (e, t) {
        return G.init(e, t)
    }, x.extend = function (e) {
        var t, n = A.call(arguments, 1);
        return "boolean" == typeof e && (t = e, e = n.shift()), n.forEach(function (n) {
            f(e, n, t)
        }), e
    }, G.qsa = function (e, t) {
        var n, a = "#" == t[0], r = !a && "." == t[0], o = a || r ? t.slice(1) : t, s = $.test(o);
        return i(e) && s && a ? (n = e.getElementById(o)) ? [n] : [] : 1 !== e.nodeType && 9 !== e.nodeType ? [] : A.call(s && !a ? r ? e.getElementsByClassName(o) : e.getElementsByTagName(t) : e.querySelectorAll(t))
    }, x.contains = P.documentElement.contains ? function (e, t) {
        return e !== t && e.contains(t)
    } : function (e, t) {
        for (; t && (t = t.parentNode);)if (t === e)return !0;
        return !1
    }, x.type = e, x.isFunction = t, x.isWindow = n, x.isArray = Z, x.isPlainObject = r, x.isEmptyObject = function (e) {
        var t;
        for (t in e)return !1;
        return !0
    }, x.inArray = function (e, t, n) {
        return L.indexOf.call(t, e, n)
    }, x.camelCase = E, x.trim = function (e) {
        return null == e ? "" : String.prototype.trim.call(e)
    }, x.uuid = 0, x.support = {}, x.expr = {}, x.map = function (e, t) {
        var n, i, a, r = [];
        if (o(e))for (i = 0; i < e.length; i++)n = t(e[i], i), null != n && r.push(n); else for (a in e)n = t(e[a], a), null != n && r.push(n);
        return c(r)
    }, x.each = function (e, t) {
        var n, i;
        if (o(e)) {
            for (n = 0; n < e.length; n++)if (t.call(e[n], n, e[n]) === !1)return e
        } else for (i in e)if (t.call(e[i], i, e[i]) === !1)return e;
        return e
    }, x.grep = function (e, t) {
        return C.call(e, t)
    }, window.JSON && (x.parseJSON = JSON.parse), x.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (e, t) {
        Q["[object " + t + "]"] = t.toLowerCase()
    }), x.fn = {
        forEach: L.forEach,
        reduce: L.reduce,
        push: L.push,
        sort: L.sort,
        indexOf: L.indexOf,
        concat: L.concat,
        map: function (e) {
            return x(x.map(this, function (t, n) {
                return e.call(t, n, t)
            }))
        },
        slice: function () {
            return x(A.apply(this, arguments))
        },
        ready: function (e) {
            return q.test(P.readyState) && P.body ? e(x) : P.addEventListener("DOMContentLoaded", function () {
                e(x)
            }, !1), this
        },
        get: function (e) {
            return e === b ? A.call(this) : this[e >= 0 ? e : e + this.length]
        },
        toArray: function () {
            return this.get()
        },
        size: function () {
            return this.length
        },
        remove: function () {
            return this.each(function () {
                null != this.parentNode && this.parentNode.removeChild(this)
            })
        },
        each: function (e) {
            return L.every.call(this, function (t, n) {
                return e.call(t, n, t) !== !1
            }), this
        },
        filter: function (e) {
            return t(e) ? this.not(this.not(e)) : x(C.call(this, function (t) {
                return G.matches(t, e)
            }))
        },
        add: function (e, t) {
            return x(T(this.concat(x(e, t))))
        },
        is: function (e) {
            return this.length > 0 && G.matches(this[0], e)
        },
        not: function (e) {
            var n = [];
            if (t(e) && e.call !== b)this.each(function (t) {
                e.call(this, t) || n.push(this)
            }); else {
                var i = "string" == typeof e ? this.filter(e) : o(e) && t(e.item) ? A.call(e) : x(e);
                this.forEach(function (e) {
                    i.indexOf(e) < 0 && n.push(e)
                })
            }
            return x(n)
        },
        has: function (e) {
            return this.filter(function () {
                return a(e) ? x.contains(this, e) : x(this).find(e).size()
            })
        },
        eq: function (e) {
            return -1 === e ? this.slice(e) : this.slice(e, +e + 1)
        },
        first: function () {
            var e = this[0];
            return e && !a(e) ? e : x(e)
        },
        last: function () {
            var e = this[this.length - 1];
            return e && !a(e) ? e : x(e)
        },
        find: function (e) {
            var t, n = this;
            return t = e ? "object" == typeof e ? x(e).filter(function () {
                var e = this;
                return L.some.call(n, function (t) {
                    return x.contains(t, e)
                })
            }) : 1 == this.length ? x(G.qsa(this[0], e)) : this.map(function () {
                return G.qsa(this, e)
            }) : x()
        },
        closest: function (e, t) {
            var n = this[0], a = !1;
            for ("object" == typeof e && (a = x(e)); n && !(a ? a.indexOf(n) >= 0 : G.matches(n, e));)n = n !== t && !i(n) && n.parentNode;
            return x(n)
        },
        parents: function (e) {
            for (var t = [], n = this; n.length > 0;)n = x.map(n, function (e) {
                return (e = e.parentNode) && !i(e) && t.indexOf(e) < 0 ? (t.push(e), e) : void 0
            });
            return m(t, e)
        },
        parent: function (e) {
            return m(T(this.pluck("parentNode")), e)
        },
        children: function (e) {
            return m(this.map(function () {
                return p(this)
            }), e)
        },
        contents: function () {
            return this.map(function () {
                return A.call(this.childNodes)
            })
        },
        siblings: function (e) {
            return m(this.map(function (e, t) {
                return C.call(p(t.parentNode), function (e) {
                    return e !== t
                })
            }), e)
        },
        empty: function () {
            return this.each(function () {
                this.innerHTML = ""
            })
        },
        pluck: function (e) {
            return x.map(this, function (t) {
                return t[e]
            })
        },
        show: function () {
            return this.each(function () {
                "none" == this.style.display && (this.style.display = ""), "none" == getComputedStyle(this, "").getPropertyValue("display") && (this.style.display = d(this.nodeName))
            })
        },
        replaceWith: function (e) {
            return this.before(e).remove()
        },
        wrap: function (e) {
            var n = t(e);
            if (this[0] && !n)var i = x(e).get(0), a = i.parentNode || this.length > 1;
            return this.each(function (t) {
                x(this).wrapAll(n ? e.call(this, t) : a ? i.cloneNode(!0) : i)
            })
        },
        wrapAll: function (e) {
            if (this[0]) {
                x(this[0]).before(e = x(e));
                for (var t; (t = e.children()).length;)e = t.first();
                x(e).append(this)
            }
            return this
        },
        wrapInner: function (e) {
            var n = t(e);
            return this.each(function (t) {
                var i = x(this), a = i.contents(), r = n ? e.call(this, t) : e;
                a.length ? a.wrapAll(r) : i.append(r)
            })
        },
        unwrap: function () {
            return this.parent().each(function () {
                x(this).replaceWith(x(this).children())
            }), this
        },
        clone: function () {
            return this.map(function () {
                return this.cloneNode(!0)
            })
        },
        hide: function () {
            return this.css("display", "none")
        },
        toggle: function (e) {
            return this.each(function () {
                var t = x(this);
                (e === b ? "none" == t.css("display") : e) ? t.show() : t.hide()
            })
        },
        prev: function (e) {
            return x(this.pluck("previousElementSibling")).filter(e || "*")
        },
        next: function (e) {
            return x(this.pluck("nextElementSibling")).filter(e || "*")
        },
        html: function (e) {
            return 0 in arguments ? this.each(function (t) {
                var n = this.innerHTML;
                x(this).empty().append(g(this, e, t, n))
            }) : 0 in this ? this[0].innerHTML : null
        },
        text: function (e) {
            return 0 in arguments ? this.each(function (t) {
                var n = g(this, e, t, this.textContent);
                this.textContent = null == n ? "" : "" + n
            }) : 0 in this ? this[0].textContent : null
        },
        attr: function (e, t) {
            var n;
            return "string" != typeof e || 1 in arguments ? this.each(function (n) {
                if (1 === this.nodeType)if (a(e))for (k in e)v(this, k, e[k]); else v(this, e, g(this, t, n, this.getAttribute(e)))
            }) : this.length && 1 === this[0].nodeType ? !(n = this[0].getAttribute(e)) && e in this[0] ? this[0][e] : n : b
        },
        removeAttr: function (e) {
            return this.each(function () {
                1 === this.nodeType && e.split(" ").forEach(function (e) {
                    v(this, e)
                }, this)
            })
        },
        prop: function (e, t) {
            return e = J[e] || e, 1 in arguments ? this.each(function (n) {
                this[e] = g(this, t, n, this[e])
            }) : this[0] && this[0][e]
        },
        data: function (e, t) {
            var n = "data-" + e.replace(B, "-$1").toLowerCase(), i = 1 in arguments ? this.attr(n, t) : this.attr(n);
            return null !== i ? y(i) : b
        },
        val: function (e) {
            return 0 in arguments ? this.each(function (t) {
                this.value = g(this, e, t, this.value)
            }) : this[0] && (this[0].multiple ? x(this[0]).find("option").filter(function () {
                return this.selected
            }).pluck("value") : this[0].value)
        },
        offset: function (e) {
            if (e)return this.each(function (t) {
                var n = x(this), i = g(this, e, t, n.offset()), a = n.offsetParent().offset(), r = {
                    top: i.top - a.top,
                    left: i.left - a.left
                };
                "static" == n.css("position") && (r.position = "relative"), n.css(r)
            });
            if (!this.length)return null;
            var t = this[0].getBoundingClientRect();
            return {
                left: t.left + window.pageXOffset,
                top: t.top + window.pageYOffset,
                width: Math.round(t.width),
                height: Math.round(t.height)
            }
        },
        css: function (t, n) {
            if (arguments.length < 2) {
                var i, a = this[0];
                if (!a)return;
                if (i = getComputedStyle(a, ""), "string" == typeof t)return a.style[E(t)] || i.getPropertyValue(t);
                if (Z(t)) {
                    var r = {};
                    return x.each(t, function (e, t) {
                        r[t] = a.style[E(t)] || i.getPropertyValue(t)
                    }), r
                }
            }
            var o = "";
            if ("string" == e(t))n || 0 === n ? o = l(t) + ":" + h(t, n) : this.each(function () {
                this.style.removeProperty(l(t))
            }); else for (k in t)t[k] || 0 === t[k] ? o += l(k) + ":" + h(k, t[k]) + ";" : this.each(function () {
                this.style.removeProperty(l(k))
            });
            return this.each(function () {
                this.style.cssText += ";" + o
            })
        },
        index: function (e) {
            return e ? this.indexOf(x(e)[0]) : this.parent().children().indexOf(this[0])
        },
        hasClass: function (e) {
            return e ? L.some.call(this, function (e) {
                return this.test(_(e))
            }, u(e)) : !1
        },
        addClass: function (e) {
            return e ? this.each(function (t) {
                if ("className" in this) {
                    S = [];
                    var n = _(this), i = g(this, e, t, n);
                    i.split(/\s+/g).forEach(function (e) {
                        x(this).hasClass(e) || S.push(e)
                    }, this), S.length && _(this, n + (n ? " " : "") + S.join(" "))
                }
            }) : this
        },
        removeClass: function (e) {
            return this.each(function (t) {
                if ("className" in this) {
                    if (e === b)return _(this, "");
                    S = _(this), g(this, e, t, S).split(/\s+/g).forEach(function (e) {
                        S = S.replace(u(e), " ")
                    }), _(this, S.trim())
                }
            })
        },
        toggleClass: function (e, t) {
            return e ? this.each(function (n) {
                var i = x(this), a = g(this, e, n, _(this));
                a.split(/\s+/g).forEach(function (e) {
                    (t === b ? !i.hasClass(e) : t) ? i.addClass(e) : i.removeClass(e)
                })
            }) : this
        },
        scrollTop: function (e) {
            if (this.length) {
                var t = "scrollTop" in this[0];
                return e === b ? t ? this[0].scrollTop : this[0].pageYOffset : this.each(t ? function () {
                    this.scrollTop = e
                } : function () {
                    this.scrollTo(this.scrollX, e)
                })
            }
        },
        scrollLeft: function (e) {
            if (this.length) {
                var t = "scrollLeft" in this[0];
                return e === b ? t ? this[0].scrollLeft : this[0].pageXOffset : this.each(t ? function () {
                    this.scrollLeft = e
                } : function () {
                    this.scrollTo(e, this.scrollY)
                })
            }
        },
        position: function () {
            if (this.length) {
                var e = this[0], t = this.offsetParent(), n = this.offset(), i = R.test(t[0].nodeName) ? {
                    top: 0,
                    left: 0
                } : t.offset();
                return n.top -= parseFloat(x(e).css("margin-top")) || 0, n.left -= parseFloat(x(e).css("margin-left")) || 0, i.top += parseFloat(x(t[0]).css("border-top-width")) || 0, i.left += parseFloat(x(t[0]).css("border-left-width")) || 0, {
                    top: n.top - i.top,
                    left: n.left - i.left
                }
            }
        },
        offsetParent: function () {
            return this.map(function () {
                for (var e = this.offsetParent || P.body; e && !R.test(e.nodeName) && "static" == x(e).css("position");)e = e.offsetParent;
                return e
            })
        }
    }, x.fn.detach = x.fn.remove, ["width", "height"].forEach(function (e) {
        var t = e.replace(/./, function (e) {
            return e[0].toUpperCase()
        });
        x.fn[e] = function (a) {
            var r, o = this[0];
            return a === b ? n(o) ? o["inner" + t] : i(o) ? o.documentElement["scroll" + t] : (r = this.offset()) && r[e] : this.each(function (t) {
                o = x(this), o.css(e, g(this, a, t, o[e]()))
            })
        }
    }), U.forEach(function (t, n) {
        var i = n % 2;
        x.fn[t] = function () {
            var t, a, r = x.map(arguments, function (n) {
                return t = e(n), "object" == t || "array" == t || null == n ? n : G.fragment(n)
            }), o = this.length > 1;
            return r.length < 1 ? this : this.each(function (e, t) {
                a = i ? t : t.parentNode, t = 0 == n ? t.nextSibling : 1 == n ? t.firstChild : 2 == n ? t : null;
                var s = x.contains(P.documentElement, a);
                r.forEach(function (e) {
                    if (o)e = e.cloneNode(!0); else if (!a)return x(e).remove();
                    a.insertBefore(e, t), s && w(e, function (e) {
                        null == e.nodeName || "SCRIPT" !== e.nodeName.toUpperCase() || e.type && "text/javascript" !== e.type || e.src || window.eval.call(window, e.innerHTML)
                    })
                })
            })
        }, x.fn[i ? t + "To" : "insert" + (n ? "Before" : "After")] = function (e) {
            return x(e)[t](this), this
        }
    }), G.Z.prototype = x.fn, G.uniq = T, G.deserializeValue = y, x.zepto = G, x
}();
window.Zepto = Zepto, void 0 === window.$ && (window.$ = Zepto), function (e) {
    function t(e) {
        return e._zid || (e._zid = d++)
    }

    function n(e, n, r, o) {
        if (n = i(n), n.ns)var s = a(n.ns);
        return (g[t(e)] || []).filter(function (e) {
            return !(!e || n.e && e.e != n.e || n.ns && !s.test(e.ns) || r && t(e.fn) !== t(r) || o && e.sel != o)
        })
    }

    function i(e) {
        var t = ("" + e).split(".");
        return {e: t[0], ns: t.slice(1).sort().join(" ")}
    }

    function a(e) {
        return new RegExp("(?:^| )" + e.replace(" ", " .* ?") + "(?: |$)")
    }

    function r(e, t) {
        return e.del && !_ && e.e in y || !!t
    }

    function o(e) {
        return w[e] || _ && y[e] || e
    }

    function s(n, a, s, c, u, d, p) {
        var f = t(n), m = g[f] || (g[f] = []);
        a.split(/\s/).forEach(function (t) {
            if ("ready" == t)return e(document).ready(s);
            var a = i(t);
            a.fn = s, a.sel = u, a.e in w && (s = function (t) {
                var n = t.relatedTarget;
                return !n || n !== this && !e.contains(this, n) ? a.fn.apply(this, arguments) : void 0
            }), a.del = d;
            var f = d || s;
            a.proxy = function (e) {
                if (e = l(e),
                                !e.isImmediatePropagationStopped()) {
                    e.data = c;
                    var t = f.apply(n, e._args == h ? [e] : [e].concat(e._args));
                    return t === !1 && (e.preventDefault(), e.stopPropagation()), t
                }
            }, a.i = m.length, m.push(a), "addEventListener" in n && n.addEventListener(o(a.e), a.proxy, r(a, p))
        })
    }

    function c(e, i, a, s, c) {
        var l = t(e);
        (i || "").split(/\s/).forEach(function (t) {
            n(e, t, a, s).forEach(function (t) {
                delete g[l][t.i], "removeEventListener" in e && e.removeEventListener(o(t.e), t.proxy, r(t, c))
            })
        })
    }

    function l(t, n) {
        return (n || !t.isDefaultPrevented) && (n || (n = t), e.each(S, function (e, i) {
            var a = n[e];
            t[e] = function () {
                return this[i] = b, a && a.apply(n, arguments)
            }, t[i] = k
        }), (n.defaultPrevented !== h ? n.defaultPrevented : "returnValue" in n ? n.returnValue === !1 : n.getPreventDefault && n.getPreventDefault()) && (t.isDefaultPrevented = b)), t
    }

    function u(e) {
        var t, n = {originalEvent: e};
        for (t in e)x.test(t) || e[t] === h || (n[t] = e[t]);
        return l(n, e)
    }

    var h, d = 1, p = Array.prototype.slice, f = e.isFunction, m = function (e) {
        return "string" == typeof e
    }, g = {}, v = {}, _ = "onfocusin" in window, y = {
        focus: "focusin",
        blur: "focusout"
    }, w = {mouseenter: "mouseover", mouseleave: "mouseout"};
    v.click = v.mousedown = v.mouseup = v.mousemove = "MouseEvents", e.event = {
        add: s,
        remove: c
    }, e.proxy = function (n, i) {
        var a = 2 in arguments && p.call(arguments, 2);
        if (f(n)) {
            var r = function () {
                return n.apply(i, a ? a.concat(p.call(arguments)) : arguments)
            };
            return r._zid = t(n), r
        }
        if (m(i))return a ? (a.unshift(n[i], n), e.proxy.apply(null, a)) : e.proxy(n[i], n);
        throw new TypeError("expected function")
    }, e.fn.bind = function (e, t, n) {
        return this.on(e, t, n)
    }, e.fn.unbind = function (e, t) {
        return this.off(e, t)
    }, e.fn.one = function (e, t, n, i) {
        return this.on(e, t, n, i, 1)
    };
    var b = function () {
        return !0
    }, k = function () {
        return !1
    }, x = /^([A-Z]|returnValue$|layer[XY]$)/, S = {
        preventDefault: "isDefaultPrevented",
        stopImmediatePropagation: "isImmediatePropagationStopped",
        stopPropagation: "isPropagationStopped"
    };
    e.fn.delegate = function (e, t, n) {
        return this.on(t, e, n)
    }, e.fn.undelegate = function (e, t, n) {
        return this.off(t, e, n)
    }, e.fn.live = function (t, n) {
        return e(document.body).delegate(this.selector, t, n), this
    }, e.fn.die = function (t, n) {
        return e(document.body).undelegate(this.selector, t, n), this
    }, e.fn.on = function (t, n, i, a, r) {
        var o, l, d = this;
        return t && !m(t) ? (e.each(t, function (e, t) {
            d.on(e, n, i, t, r)
        }), d) : (m(n) || f(a) || a === !1 || (a = i, i = n, n = h), (f(i) || i === !1) && (a = i, i = h), a === !1 && (a = k), d.each(function (h, d) {
            r && (o = function (e) {
                return c(d, e.type, a), a.apply(this, arguments)
            }), n && (l = function (t) {
                var i, r = e(t.target).closest(n, d).get(0);
                return r && r !== d ? (i = e.extend(u(t), {
                    currentTarget: r,
                    liveFired: d
                }), (o || a).apply(r, [i].concat(p.call(arguments, 1)))) : void 0
            }), s(d, t, a, i, n, l || o)
        }))
    }, e.fn.off = function (t, n, i) {
        var a = this;
        return t && !m(t) ? (e.each(t, function (e, t) {
            a.off(e, n, t)
        }), a) : (m(n) || f(i) || i === !1 || (i = n, n = h), i === !1 && (i = k), a.each(function () {
            c(this, t, i, n)
        }))
    }, e.fn.trigger = function (t, n) {
        return t = m(t) || e.isPlainObject(t) ? e.Event(t) : l(t), t._args = n, this.each(function () {
            t.type in y && "function" == typeof this[t.type] ? this[t.type]() : "dispatchEvent" in this ? this.dispatchEvent(t) : e(this).triggerHandler(t, n)
        })
    }, e.fn.triggerHandler = function (t, i) {
        var a, r;
        return this.each(function (o, s) {
            a = u(m(t) ? e.Event(t) : t), a._args = i, a.target = s, e.each(n(s, t.type || t), function (e, t) {
                return r = t.proxy(a), a.isImmediatePropagationStopped() ? !1 : void 0
            })
        }), r
    }, "focusin focusout focus blur load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function (t) {
        e.fn[t] = function (e) {
            return 0 in arguments ? this.bind(t, e) : this.trigger(t)
        }
    }), e.Event = function (e, t) {
        m(e) || (t = e, e = t.type);
        var n = document.createEvent(v[e] || "Events"), i = !0;
        if (t)for (var a in t)"bubbles" == a ? i = !!t[a] : n[a] = t[a];
        return n.initEvent(e, i, !0), l(n)
    }
}(Zepto), function (e) {
    function t(t, n, i) {
        var a = e.Event(n);
        return e(t).trigger(a, i), !a.isDefaultPrevented()
    }

    function n(e, n, i, a) {
        return e.global ? t(n || _, i, a) : void 0
    }

    function i(t) {
        t.global && 0 === e.active++ && n(t, null, "ajaxStart")
    }

    function a(t) {
        t.global && !--e.active && n(t, null, "ajaxStop")
    }

    function r(e, t) {
        var i = t.context;
        return t.beforeSend.call(i, e, t) === !1 || n(t, i, "ajaxBeforeSend", [e, t]) === !1 ? !1 : void n(t, i, "ajaxSend", [e, t])
    }

    function o(e, t, i, a) {
        var r = i.context, o = "success";
        i.success.call(r, e, o, t), a && a.resolveWith(r, [e, o, t]), n(i, r, "ajaxSuccess", [t, i, e]), c(o, t, i)
    }

    function s(e, t, i, a, r) {
        var o = a.context;
        a.error.call(o, i, t, e), r && r.rejectWith(o, [i, t, e]), n(a, o, "ajaxError", [i, a, e || t]), c(t, i, a)
    }

    function c(e, t, i) {
        var r = i.context;
        i.complete.call(r, t, e), n(i, r, "ajaxComplete", [t, i]), a(i)
    }

    function l() {
    }

    function u(e) {
        return e && (e = e.split(";", 2)[0]), e && (e == x ? "html" : e == k ? "json" : w.test(e) ? "script" : b.test(e) && "xml") || "text"
    }

    function h(e, t) {
        return "" == t ? e : (e + "&" + t).replace(/[&?]{1,2}/, "?")
    }

    function d(t) {
        t.processData && t.data && "string" != e.type(t.data) && (t.data = e.param(t.data, t.traditional)), !t.data || t.type && "GET" != t.type.toUpperCase() || (t.url = h(t.url, t.data), t.data = void 0)
    }

    function p(t, n, i, a) {
        return e.isFunction(n) && (a = i, i = n, n = void 0), e.isFunction(i) || (a = i, i = void 0), {
            url: t,
            data: n,
            success: i,
            dataType: a
        }
    }

    function f(t, n, i, a) {
        var r, o = e.isArray(n), s = e.isPlainObject(n);
        e.each(n, function (n, c) {
            r = e.type(c), a && (n = i ? a : a + "[" + (s || "object" == r || "array" == r ? n : "") + "]"), !a && o ? t.add(c.name, c.value) : "array" == r || !i && "object" == r ? f(t, c, i, n) : t.add(n, c)
        })
    }

    var m, g, v = 0, _ = window.document, y = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, w = /^(?:text|application)\/javascript/i, b = /^(?:text|application)\/xml/i, k = "application/json", x = "text/html", S = /^\s*$/, E = _.createElement("a");
    E.href = window.location.href, e.active = 0, e.ajaxJSONP = function (t, n) {
        if (!("type" in t))return e.ajax(t);
        var i, a, c = t.jsonpCallback, l = (e.isFunction(c) ? c() : c) || "jsonp" + ++v, u = _.createElement("script"), h = window[l], d = function (t) {
            e(u).triggerHandler("error", t || "abort")
        }, p = {abort: d};
        return n && n.promise(p), e(u).on("load error", function (r, c) {
            clearTimeout(a), e(u).off().remove(), "error" != r.type && i ? o(i[0], p, t, n) : s(null, c || "error", p, t, n), window[l] = h, i && e.isFunction(h) && h(i[0]), h = i = void 0
        }), r(p, t) === !1 ? (d("abort"), p) : (window[l] = function () {
            i = arguments
        }, u.src = t.url.replace(/\?(.+)=\?/, "?$1=" + l), _.head.appendChild(u), t.timeout > 0 && (a = setTimeout(function () {
            d("timeout")
        }, t.timeout)), p)
    }, e.ajaxSettings = {
        type: "GET",
        beforeSend: l,
        success: l,
        error: l,
        complete: l,
        context: null,
        global: !0,
        xhr: function () {
            return new window.XMLHttpRequest
        },
        accepts: {
            script: "text/javascript, application/javascript, application/x-javascript",
            json: k,
            xml: "application/xml, text/xml",
            html: x,
            text: "text/plain"
        },
        crossDomain: !1,
        timeout: 0,
        processData: !0,
        cache: !0
    }, e.ajax = function (t) {
        var n, a = e.extend({}, t || {}), c = e.Deferred && e.Deferred();
        for (m in e.ajaxSettings)void 0 === a[m] && (a[m] = e.ajaxSettings[m]);
        i(a), a.crossDomain || (n = _.createElement("a"), n.href = a.url, n.href = n.href, a.crossDomain = E.protocol + "//" + E.host != n.protocol + "//" + n.host), a.url || (a.url = window.location.toString()), d(a);
        var p = a.dataType, f = /\?.+=\?/.test(a.url);
        if (f && (p = "jsonp"), a.cache !== !1 && (t && t.cache === !0 || "script" != p && "jsonp" != p) || (a.url = h(a.url, "_=" + Date.now())), "jsonp" == p)return f || (a.url = h(a.url, a.jsonp ? a.jsonp + "=?" : a.jsonp === !1 ? "" : "callback=?")), e.ajaxJSONP(a, c);
        var v, y = a.accepts[p], w = {}, b = function (e, t) {
            w[e.toLowerCase()] = [e, t]
        }, k = /^([\w-]+:)\/\//.test(a.url) ? RegExp.$1 : window.location.protocol, x = a.xhr(), T = x.setRequestHeader;
        if (c && c.promise(x), a.crossDomain || b("X-Requested-With", "XMLHttpRequest"), b("Accept", y || "*/*"), (y = a.mimeType || y) && (y.indexOf(",") > -1 && (y = y.split(",", 2)[0]), x.overrideMimeType && x.overrideMimeType(y)), (a.contentType || a.contentType !== !1 && a.data && "GET" != a.type.toUpperCase()) && b("Content-Type", a.contentType || "application/x-www-form-urlencoded"), a.headers)for (g in a.headers)b(g, a.headers[g]);
        if (x.setRequestHeader = b, x.onreadystatechange = function () {
                    if (4 == x.readyState) {
                        x.onreadystatechange = l, clearTimeout(v);
                        var t, n = !1;
                        if (x.status >= 200 && x.status < 300 || 304 == x.status || 0 == x.status && "file:" == k) {
                            p = p || u(a.mimeType || x.getResponseHeader("content-type")), t = x.responseText;
                            try {
                                "script" == p ? (1, eval)(t) : "xml" == p ? t = x.responseXML : "json" == p && (t = S.test(t) ? null : e.parseJSON(t))
                            } catch (i) {
                                n = i
                            }
                            n ? s(n, "parsererror", x, a, c) : o(t, x, a, c)
                        } else s(x.statusText || null, x.status ? "error" : "abort", x, a, c)
                    }
                }, r(x, a) === !1)return x.abort(), s(null, "abort", x, a, c), x;
        if (a.xhrFields)for (g in a.xhrFields)x[g] = a.xhrFields[g];
        var L = "async" in a ? a.async : !0;
        x.open(a.type, a.url, L, a.username, a.password);
        for (g in w)T.apply(x, w[g]);
        return a.timeout > 0 && (v = setTimeout(function () {
            x.onreadystatechange = l, x.abort(), s(null, "timeout", x, a, c)
        }, a.timeout)), x.send(a.data ? a.data : null), x
    }, e.get = function () {
        return e.ajax(p.apply(null, arguments))
    }, e.post = function () {
        var t = p.apply(null, arguments);
        return t.type = "POST", e.ajax(t)
    }, e.getJSON = function () {
        var t = p.apply(null, arguments);
        return t.dataType = "json", e.ajax(t)
    }, e.fn.load = function (t, n, i) {
        if (!this.length)return this;
        var a, r = this, o = t.split(/\s/), s = p(t, n, i), c = s.success;
        return o.length > 1 && (s.url = o[0], a = o[1]), s.success = function (t) {
            r.html(a ? e("<div>").html(t.replace(y, "")).find(a) : t), c && c.apply(r, arguments)
        }, e.ajax(s), this
    };
    var T = encodeURIComponent;
    e.param = function (t, n) {
        var i = [];
        return i.add = function (t, n) {
            e.isFunction(n) && (n = n()), null == n && (n = ""), this.push(T(t) + "=" + T(n))
        }, f(i, t, n), i.join("&").replace(/%20/g, "+")
    }
}(Zepto), function (e) {
    e.fn.serializeArray = function () {
        var t, n, i = [], a = function (e) {
            return e.forEach ? e.forEach(a) : void i.push({name: t, value: e})
        };
        return this[0] && e.each(this[0].elements, function (i, r) {
            n = r.type, t = r.name, t && "fieldset" != r.nodeName.toLowerCase() && !r.disabled && "submit" != n && "reset" != n && "button" != n && "file" != n && ("radio" != n && "checkbox" != n || r.checked) && a(e(r).val())
        }), i
    }, e.fn.serialize = function () {
        var e = [];
        return this.serializeArray().forEach(function (t) {
            e.push(encodeURIComponent(t.name) + "=" + encodeURIComponent(t.value))
        }), e.join("&")
    }, e.fn.submit = function (t) {
        if (0 in arguments)this.bind("submit", t); else if (this.length) {
            var n = e.Event("submit");
            this.eq(0).trigger(n), n.isDefaultPrevented() || this.get(0).submit()
        }
        return this
    }
}(Zepto), function (e) {
    "__proto__" in {} || e.extend(e.zepto, {
        Z: function (t, n) {
            return t = t || [], e.extend(t, e.fn), t.selector = n || "", t.__Z = !0, t
        }, isZ: function (t) {
            return "array" === e.type(t) && "__Z" in t
        }
    });
    try {
        getComputedStyle(void 0)
    } catch (t) {
        var n = getComputedStyle;
        window.getComputedStyle = function (e) {
            try {
                return n(e)
            } catch (t) {
                return null
            }
        }
    }
}(Zepto), function (e) {
    e.Callbacks = function (t) {
        t = e.extend({}, t);
        var n, i, a, r, o, s, c = [], l = !t.once && [], u = function (e) {
            for (n = t.memory && e, i = !0, s = r || 0, r = 0, o = c.length, a = !0; c && o > s; ++s)if (c[s].apply(e[0], e[1]) === !1 && t.stopOnFalse) {
                n = !1;
                break
            }
            a = !1, c && (l ? l.length && u(l.shift()) : n ? c.length = 0 : h.disable())
        }, h = {
            add: function () {
                if (c) {
                    var i = c.length, s = function (n) {
                        e.each(n, function (e, n) {
                            "function" == typeof n ? t.unique && h.has(n) || c.push(n) : n && n.length && "string" != typeof n && s(n)
                        })
                    };
                    s(arguments), a ? o = c.length : n && (r = i, u(n))
                }
                return this
            }, remove: function () {
                return c && e.each(arguments, function (t, n) {
                    for (var i; (i = e.inArray(n, c, i)) > -1;)c.splice(i, 1), a && (o >= i && --o, s >= i && --s)
                }), this
            }, has: function (t) {
                return !(!c || !(t ? e.inArray(t, c) > -1 : c.length))
            }, empty: function () {
                return o = c.length = 0, this
            }, disable: function () {
                return c = l = n = void 0, this
            }, disabled: function () {
                return !c
            }, lock: function () {
                return l = void 0, n || h.disable(), this
            }, locked: function () {
                return !l
            }, fireWith: function (e, t) {
                return !c || i && !l || (t = t || [], t = [e, t.slice ? t.slice() : t], a ? l.push(t) : u(t)), this
            }, fire: function () {
                return h.fireWith(this, arguments)
            }, fired: function () {
                return !!i
            }
        };
        return h
    }
}(Zepto), function (e) {
    function t(n) {
        var i = [["resolve", "done", e.Callbacks({
            once: 1,
            memory: 1
        }), "resolved"], ["reject", "fail", e.Callbacks({
            once: 1,
            memory: 1
        }), "rejected"], ["notify", "progress", e.Callbacks({memory: 1})]], a = "pending", r = {
            state: function () {
                return a
            }, always: function () {
                return o.done(arguments).fail(arguments), this
            }, then: function () {
                var n = arguments;
                return t(function (t) {
                    e.each(i, function (i, a) {
                        var s = e.isFunction(n[i]) && n[i];
                        o[a[1]](function () {
                            var n = s && s.apply(this, arguments);
                            if (n && e.isFunction(n.promise))n.promise().done(t.resolve).fail(t.reject).progress(t.notify); else {
                                var i = this === r ? t.promise() : this, o = s ? [n] : arguments;
                                t[a[0] + "With"](i, o)
                            }
                        })
                    }), n = null
                }).promise()
            }, promise: function (t) {
                return null != t ? e.extend(t, r) : r
            }
        }, o = {};
        return e.each(i, function (e, t) {
            var n = t[2], s = t[3];
            r[t[1]] = n.add, s && n.add(function () {
                a = s
            }, i[1 ^ e][2].disable, i[2][2].lock), o[t[0]] = function () {
                return o[t[0] + "With"](this === o ? r : this, arguments), this
            }, o[t[0] + "With"] = n.fireWith
        }), r.promise(o), n && n.call(o, o), o
    }

    var n = Array.prototype.slice;
    e.when = function (i) {
        var a, r, o, s = n.call(arguments), c = s.length, l = 0, u = 1 !== c || i && e.isFunction(i.promise) ? c : 0, h = 1 === u ? i : t(), d = function (e, t, i) {
            return function (r) {
                t[e] = this, i[e] = arguments.length > 1 ? n.call(arguments) : r, i === a ? h.notifyWith(t, i) : --u || h.resolveWith(t, i)
            }
        };
        if (c > 1)for (a = new Array(c), r = new Array(c), o = new Array(c); c > l; ++l)s[l] && e.isFunction(s[l].promise) ? s[l].promise().done(d(l, o, s)).fail(h.reject).progress(d(l, r, a)) : --u;
        return u || h.resolveWith(o, s), h.promise()
    }, e.Deferred = t
}(Zepto), function () {
    "use strict";
    function e(t, i) {
        function a(e, t) {
            return function () {
                return e.apply(t, arguments)
            }
        }

        var r;
        if (i = i || {}, this.trackingClick = !1, this.trackingClickStart = 0, this.targetElement = null, this.touchStartX = 0, this.touchStartY = 0, this.lastTouchIdentifier = 0, this.touchBoundary = i.touchBoundary || 10, this.layer = t, this.tapDelay = i.tapDelay || 200, this.tapTimeout = i.tapTimeout || 700, !e.notNeeded(t)) {
            for (var o = ["onMouse", "onClick", "onTouchStart", "onTouchMove", "onTouchEnd", "onTouchCancel"], s = this, c = 0, l = o.length; l > c; c++)s[o[c]] = a(s[o[c]], s);
            n && (t.addEventListener("mouseover", this.onMouse, !0), t.addEventListener("mousedown", this.onMouse, !0), t.addEventListener("mouseup", this.onMouse, !0)), t.addEventListener("click", this.onClick, !0), t.addEventListener("touchstart", this.onTouchStart, !1), t.addEventListener("touchmove", this.onTouchMove, !1), t.addEventListener("touchend", this.onTouchEnd, !1), t.addEventListener("touchcancel", this.onTouchCancel, !1), Event.prototype.stopImmediatePropagation || (t.removeEventListener = function (e, n, i) {
                var a = Node.prototype.removeEventListener;
                "click" === e ? a.call(t, e, n.hijacked || n, i) : a.call(t, e, n, i)
            }, t.addEventListener = function (e, n, i) {
                var a = Node.prototype.addEventListener;
                "click" === e ? a.call(t, e, n.hijacked || (n.hijacked = function (e) {
                            e.propagationStopped || n(e)
                        }), i) : a.call(t, e, n, i)
            }), "function" == typeof t.onclick && (r = t.onclick, t.addEventListener("click", function (e) {
                r(e)
            }, !1), t.onclick = null)
        }
    }

    var t = navigator.userAgent.indexOf("Windows Phone") >= 0, n = navigator.userAgent.indexOf("Android") > 0 && !t, i = /iP(ad|hone|od)/.test(navigator.userAgent) && !t, a = i && /OS 4_\d(_\d)?/.test(navigator.userAgent), r = i && /OS [6-7]_\d/.test(navigator.userAgent), o = navigator.userAgent.indexOf("BB10") > 0;
    e.prototype.needsClick = function (e) {
        switch (e.nodeName.toLowerCase()) {
            case"button":
            case"select":
            case"textarea":
                if (e.disabled)return !0;
                break;
            case"input":
                if (i && "file" === e.type || e.disabled)return !0;
                break;
            case"label":
            case"iframe":
            case"video":
                return !0
        }
        return /\bneedsclick\b/.test(e.className)
    }, e.prototype.needsFocus = function (e) {
        switch (e.nodeName.toLowerCase()) {
            case"textarea":
                return !0;
            case"select":
                return !n;
            case"input":
                switch (e.type) {
                    case"button":
                    case"checkbox":
                    case"file":
                    case"image":
                    case"radio":
                    case"submit":
                        return !1
                }
                return !e.disabled && !e.readOnly;
            default:
                return /\bneedsfocus\b/.test(e.className)
        }
    }, e.prototype.sendClick = function (e, t) {
        var n, i;
        document.activeElement && document.activeElement !== e && document.activeElement.blur(), i = t.changedTouches[0], n = document.createEvent("MouseEvents"), n.initMouseEvent(this.determineEventType(e), !0, !0, window, 1, i.screenX, i.screenY, i.clientX, i.clientY, !1, !1, !1, !1, 0, null), n.forwardedTouchEvent = !0, e.dispatchEvent(n)
    }, e.prototype.determineEventType = function (e) {
        return n && "select" === e.tagName.toLowerCase() ? "mousedown" : "click"
    }, e.prototype.focus = function (e) {
        var t;
        i && e.setSelectionRange && 0 !== e.type.indexOf("date") && "time" !== e.type && "month" !== e.type ? (t = e.value.length, e.setSelectionRange(t, t)) : e.focus()
    }, e.prototype.updateScrollParent = function (e) {
        var t, n;
        if (t = e.fastClickScrollParent, !t || !t.contains(e)) {
            n = e;
            do {
                if (n.scrollHeight > n.offsetHeight) {
                    t = n, e.fastClickScrollParent = n;
                    break
                }
                n = n.parentElement
            } while (n)
        }
        t && (t.fastClickLastScrollTop = t.scrollTop)
    }, e.prototype.getTargetElementFromEventTarget = function (e) {
        return e.nodeType === Node.TEXT_NODE ? e.parentNode : e
    }, e.prototype.onTouchStart = function (e) {
        var t, n, r;
        if (e.targetTouches.length > 1)return !0;
        if (t = this.getTargetElementFromEventTarget(e.target), n = e.targetTouches[0], i) {
            if (r = window.getSelection(), r.rangeCount && !r.isCollapsed)return !0;
            if (!a) {
                if (n.identifier && n.identifier === this.lastTouchIdentifier)return e.preventDefault(), !1;
                this.lastTouchIdentifier = n.identifier, this.updateScrollParent(t)
            }
        }
        return this.trackingClick = !0, this.trackingClickStart = e.timeStamp, this.targetElement = t, this.touchStartX = n.pageX, this.touchStartY = n.pageY, e.timeStamp - this.lastClickTime < this.tapDelay && e.preventDefault(), !0
    }, e.prototype.touchHasMoved = function (e) {
        var t = e.changedTouches[0], n = this.touchBoundary;
        return Math.abs(t.pageX - this.touchStartX) > n || Math.abs(t.pageY - this.touchStartY) > n ? !0 : !1
    }, e.prototype.onTouchMove = function (e) {
        return this.trackingClick ? ((this.targetElement !== this.getTargetElementFromEventTarget(e.target) || this.touchHasMoved(e)) && (this.trackingClick = !1, this.targetElement = null), !0) : !0
    }, e.prototype.findControl = function (e) {
        return void 0 !== e.control ? e.control : e.htmlFor ? document.getElementById(e.htmlFor) : e.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")
    }, e.prototype.onTouchEnd = function (e) {
        var t, o, s, c, l, u = this.targetElement;
        if (!this.trackingClick)return !0;
        if (e.timeStamp - this.lastClickTime < this.tapDelay)return this.cancelNextClick = !0, !0;
        if (e.timeStamp - this.trackingClickStart > this.tapTimeout)return !0;
        if (this.cancelNextClick = !1, this.lastClickTime = e.timeStamp, o = this.trackingClickStart, this.trackingClick = !1, this.trackingClickStart = 0, r && (l = e.changedTouches[0], u = document.elementFromPoint(l.pageX - window.pageXOffset, l.pageY - window.pageYOffset) || u, u.fastClickScrollParent = this.targetElement.fastClickScrollParent), s = u.tagName.toLowerCase(), "label" === s) {
            if (t = this.findControl(u)) {
                if (this.focus(u), n)return !1;
                u = t
            }
        } else if (this.needsFocus(u))return e.timeStamp - o > 100 || i && window.top !== window && "input" === s ? (this.targetElement = null, !1) : (this.focus(u), this.sendClick(u, e), i && "select" === s || (this.targetElement = null, e.preventDefault()), !1);
        return i && !a && (c = u.fastClickScrollParent, c && c.fastClickLastScrollTop !== c.scrollTop) ? !0 : (this.needsClick(u) || (e.preventDefault(), this.sendClick(u, e)), !1)
    }, e.prototype.onTouchCancel = function () {
        this.trackingClick = !1, this.targetElement = null
    }, e.prototype.onMouse = function (e) {
        return this.targetElement ? e.forwardedTouchEvent ? !0 : e.cancelable && (!this.needsClick(this.targetElement) || this.cancelNextClick) ? (e.stopImmediatePropagation ? e.stopImmediatePropagation() : e.propagationStopped = !0, e.stopPropagation(), e.preventDefault(), !1) : !0 : !0
    }, e.prototype.onClick = function (e) {
        var t;
        return this.trackingClick ? (this.targetElement = null, this.trackingClick = !1, !0) : "submit" === e.target.type && 0 === e.detail ? !0 : (t = this.onMouse(e), t || (this.targetElement = null), t)
    }, e.prototype.destroy = function () {
        var e = this.layer;
        n && (e.removeEventListener("mouseover", this.onMouse, !0), e.removeEventListener("mousedown", this.onMouse, !0), e.removeEventListener("mouseup", this.onMouse, !0)), e.removeEventListener("click", this.onClick, !0), e.removeEventListener("touchstart", this.onTouchStart, !1), e.removeEventListener("touchmove", this.onTouchMove, !1), e.removeEventListener("touchend", this.onTouchEnd, !1), e.removeEventListener("touchcancel", this.onTouchCancel, !1)
    }, e.notNeeded = function (e) {
        var t, i, a, r;
        if ("undefined" == typeof window.ontouchstart)return !0;
        if (i = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1]) {
            if (!n)return !0;
            if (t = document.querySelector("meta[name=viewport]")) {
                if (-1 !== t.content.indexOf("user-scalable=no"))return !0;
                if (i > 31 && document.documentElement.scrollWidth <= window.outerWidth)return !0
            }
        }
        if (o && (a = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/), a[1] >= 10 && a[2] >= 3 && (t = document.querySelector("meta[name=viewport]")))) {
            if (-1 !== t.content.indexOf("user-scalable=no"))return !0;
            if (document.documentElement.scrollWidth <= window.outerWidth)return !0
        }
        return "none" === e.style.msTouchAction || "manipulation" === e.style.touchAction ? !0 : (r = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1], r >= 27 && (t = document.querySelector("meta[name=viewport]"), t && (-1 !== t.content.indexOf("user-scalable=no") || document.documentElement.scrollWidth <= window.outerWidth)) ? !0 : "none" === e.style.touchAction || "manipulation" === e.style.touchAction ? !0 : !1)
    }, e.attach = function (t, n) {
        return new e(t, n)
    }, "function" == typeof define && "object" == typeof define.amd && define.amd ? define(function () {
        return e
    }) : "undefined" != typeof module && module.exports ? (module.exports = e.attach, module.exports.FastClick = e) : window.FastClick = e
}(), function () {
    function e() {
    }

    function t(e) {
        return e
    }

    function n(e) {
        return !!e
    }

    function i(e) {
        return !e
    }

    function a(e) {
        return function () {
            if (null === e)throw new Error("Callback was already called.");
            e.apply(this, arguments), e = null
        }
    }

    function r(e) {
        return function () {
            null !== e && (e.apply(this, arguments), e = null)
        }
    }

    function o(e) {
        return j(e) || "number" == typeof e.length && e.length >= 0 && e.length % 1 === 0
    }

    function s(e, t) {
        for (var n = -1, i = e.length; ++n < i;)t(e[n], n, e)
    }

    function c(e, t) {
        for (var n = -1, i = e.length, a = Array(i); ++n < i;)a[n] = t(e[n], n, e);
        return a
    }

    function l(e) {
        return c(Array(e), function (e, t) {
            return t
        })
    }

    function u(e, t, n) {
        return s(e, function (e, i, a) {
            n = t(n, e, i, a)
        }), n
    }

    function h(e, t) {
        s(B(e), function (n) {
            t(e[n], n)
        })
    }

    function d(e, t) {
        for (var n = 0; n < e.length; n++)if (e[n] === t)return n;
        return -1
    }

    function p(e) {
        var t, n, i = -1;
        return o(e) ? (t = e.length, function () {
            return i++, t > i ? i : null
        }) : (n = B(e), t = n.length, function () {
            return i++, t > i ? n[i] : null
        })
    }

    function f(e, t) {
        return t = null == t ? e.length - 1 : +t, function () {
            for (var n = Math.max(arguments.length - t, 0), i = Array(n), a = 0; n > a; a++)i[a] = arguments[a + t];
            switch (t) {
                case 0:
                    return e.call(this, i);
                case 1:
                    return e.call(this, arguments[0], i)
            }
        }
    }

    function m(e) {
        return function (t, n, i) {
            return e(t, i)
        }
    }

    function g(t) {
        return function (n, i, o) {
            o = r(o || e), n = n || [];
            var s = p(n);
            if (0 >= t)return o(null);
            var c = !1, l = 0, u = !1;
            !function h() {
                if (c && 0 >= l)return o(null);
                for (; t > l && !u;) {
                    var e = s();
                    if (null === e)return c = !0, void(0 >= l && o(null));
                    l += 1, i(n[e], e, a(function (e) {
                        l -= 1, e ? (o(e), u = !0) : h()
                    }))
                }
            }()
        }
    }

    function v(e) {
        return function (t, n, i) {
            return e(M.eachOf, t, n, i)
        }
    }

    function _(e) {
        return function (t, n, i, a) {
            return e(g(n), t, i, a)
        }
    }

    function y(e) {
        return function (t, n, i) {
            return e(M.eachOfSeries, t, n, i)
        }
    }

    function w(t, n, i, a) {
        a = r(a || e), n = n || [];
        var s = o(n) ? [] : {};
        t(n, function (e, t, n) {
            i(e, function (e, i) {
                s[t] = i, n(e)
            })
        }, function (e) {
            a(e, s)
        })
    }

    function b(e, t, n, i) {
        var a = [];
        e(t, function (e, t, i) {
            n(e, function (n) {
                n && a.push({index: t, value: e}), i()
            })
        }, function () {
            i(c(a.sort(function (e, t) {
                return e.index - t.index
            }), function (e) {
                return e.value
            }))
        })
    }

    function k(e, t, n, i) {
        b(e, t, function (e, t) {
            n(e, function (e) {
                t(!e)
            })
        }, i)
    }

    function x(e, t, n) {
        return function (i, a, r, o) {
            function s() {
                o && o(n(!1, void 0))
            }

            function c(e, i, a) {
                return o ? void r(e, function (i) {
                    o && t(i) && (o(n(!0, e)), o = r = !1), a()
                }) : a()
            }

            arguments.length > 3 ? e(i, a, c, s) : (o = r, r = a, e(i, c, s))
        }
    }

    function S(e, t) {
        return t
    }

    function E(t, n, i) {
        i = i || e;
        var a = o(n) ? [] : {};
        t(n, function (e, t, n) {
            e(f(function (e, i) {
                i.length <= 1 && (i = i[0]), a[t] = i, n(e)
            }))
        }, function (e) {
            i(e, a)
        })
    }

    function T(e, t, n, i) {
        var a = [];
        e(t, function (e, t, i) {
            n(e, function (e, t) {
                a = a.concat(t || []), i(e)
            })
        }, function (e) {
            i(e, a)
        })
    }

    function L(t, n, i) {
        function r(t, n, i, a) {
            if (null != a && "function" != typeof a)throw new Error("task callback must be a function");
            return t.started = !0, j(n) || (n = [n]), 0 === n.length && t.idle() ? M.setImmediate(function () {
                t.drain()
            }) : (s(n, function (n) {
                var r = {data: n, callback: a || e};
                i ? t.tasks.unshift(r) : t.tasks.push(r), t.tasks.length === t.concurrency && t.saturated()
            }), void M.setImmediate(t.process))
        }

        function o(e, t) {
            return function () {
                l -= 1;
                var n = !1, i = arguments;
                s(t, function (e) {
                    s(u, function (t, i) {
                        t !== e || n || (u.splice(i, 1), n = !0)
                    }), e.callback.apply(e, i)
                }), e.tasks.length + l === 0 && e.drain(), e.process()
            }
        }

        if (null == n)n = 1; else if (0 === n)throw new Error("Concurrency must not be zero");
        var l = 0, u = [], h = {
            tasks: [],
            concurrency: n,
            payload: i,
            saturated: e,
            empty: e,
            drain: e,
            started: !1,
            paused: !1,
            push: function (e, t) {
                r(h, e, !1, t)
            },
            kill: function () {
                h.drain = e, h.tasks = []
            },
            unshift: function (e, t) {
                r(h, e, !0, t)
            },
            process: function () {
                for (; !h.paused && l < h.concurrency && h.tasks.length;) {
                    var e = h.payload ? h.tasks.splice(0, h.payload) : h.tasks.splice(0, h.tasks.length), n = c(e, function (e) {
                        return e.data
                    });
                    0 === h.tasks.length && h.empty(), l += 1, u.push(e[0]);
                    var i = a(o(h, e));
                    t(n, i)
                }
            },
            length: function () {
                return h.tasks.length
            },
            running: function () {
                return l
            },
            workersList: function () {
                return u
            },
            idle: function () {
                return h.tasks.length + l === 0
            },
            pause: function () {
                h.paused = !0
            },
            resume: function () {
                if (h.paused !== !1) {
                    h.paused = !1;
                    for (var e = Math.min(h.concurrency, h.tasks.length), t = 1; e >= t; t++)M.setImmediate(h.process)
                }
            }
        };
        return h
    }

    function A(e) {
        return f(function (t, n) {
            t.apply(null, n.concat([f(function (t, n) {
                "object" == typeof console && (t ? console.error && console.error(t) : console[e] && s(n, function (t) {
                    console[e](t)
                }))
            })]))
        })
    }

    function C(e) {
        return function (t, n, i) {
            e(l(t), n, i)
        }
    }

    function P(e) {
        return f(function (t, n) {
            var i = f(function (n) {
                var i = this, a = n.pop();
                return e(t, function (e, t, a) {
                    e.apply(i, n.concat([a]))
                }, a)
            });
            return n.length ? i.apply(this, n) : i
        })
    }

    function D(e) {
        return f(function (t) {
            var n = t.pop();
            t.push(function () {
                var e = arguments;
                i ? M.setImmediate(function () {
                    n.apply(null, e)
                }) : n.apply(null, e)
            });
            var i = !0;
            e.apply(this, t), i = !1
        })
    }

    var I, M = {}, O = "object" == typeof self && self.self === self && self || "object" == typeof global && global.global === global && global || this;
    null != O && (I = O.async), M.noConflict = function () {
        return O.async = I, M
    };
    var N = Object.prototype.toString, j = Array.isArray || function (e) {
                return "[object Array]" === N.call(e)
            }, R = function (e) {
        var t = typeof e;
        return "function" === t || "object" === t && !!e
    }, B = Object.keys || function (e) {
                var t = [];
                for (var n in e)e.hasOwnProperty(n) && t.push(n);
                return t
            }, F = "function" == typeof setImmediate && setImmediate, U = F ? function (e) {
        F(e)
    } : function (e) {
        setTimeout(e, 0)
    };
    "object" == typeof process && "function" == typeof process.nextTick ? M.nextTick = process.nextTick : M.nextTick = U, M.setImmediate = F ? U : M.nextTick, M.forEach = M.each = function (e, t, n) {
        return M.eachOf(e, m(t), n)
    }, M.forEachSeries = M.eachSeries = function (e, t, n) {
        return M.eachOfSeries(e, m(t), n)
    }, M.forEachLimit = M.eachLimit = function (e, t, n, i) {
        return g(t)(e, m(n), i)
    }, M.forEachOf = M.eachOf = function (t, n, i) {
        function o(e) {
            l--, e ? i(e) : null === s && 0 >= l && i(null)
        }

        i = r(i || e), t = t || [];
        for (var s, c = p(t), l = 0; null != (s = c());)l += 1, n(t[s], s, a(o));
        0 === l && i(null)
    }, M.forEachOfSeries = M.eachOfSeries = function (t, n, i) {
        function o() {
            var e = !0;
            return null === c ? i(null) : (n(t[c], c, a(function (t) {
                if (t)i(t); else {
                    if (c = s(), null === c)return i(null);
                    e ? M.setImmediate(o) : o()
                }
            })), void(e = !1))
        }

        i = r(i || e), t = t || [];
        var s = p(t), c = s();
        o()
    }, M.forEachOfLimit = M.eachOfLimit = function (e, t, n, i) {
        g(t)(e, n, i)
    }, M.map = v(w), M.mapSeries = y(w), M.mapLimit = _(w), M.inject = M.foldl = M.reduce = function (e, t, n, i) {
        M.eachOfSeries(e, function (e, i, a) {
            n(t, e, function (e, n) {
                t = n, a(e)
            })
        }, function (e) {
            i(e, t)
        })
    }, M.foldr = M.reduceRight = function (e, n, i, a) {
        var r = c(e, t).reverse();
        M.reduce(r, n, i, a)
    }, M.transform = function (e, t, n, i) {
        3 === arguments.length && (i = n, n = t, t = j(e) ? [] : {}), M.eachOf(e, function (e, i, a) {
            n(t, e, i, a)
        }, function (e) {
            i(e, t)
        })
    }, M.select = M.filter = v(b), M.selectLimit = M.filterLimit = _(b), M.selectSeries = M.filterSeries = y(b), M.reject = v(k), M.rejectLimit = _(k), M.rejectSeries = y(k), M.any = M.some = x(M.eachOf, n, t), M.someLimit = x(M.eachOfLimit, n, t), M.all = M.every = x(M.eachOf, i, i), M.everyLimit = x(M.eachOfLimit, i, i), M.detect = x(M.eachOf, t, S), M.detectSeries = x(M.eachOfSeries, t, S), M.detectLimit = x(M.eachOfLimit, t, S), M.sortBy = function (e, t, n) {
        function i(e, t) {
            var n = e.criteria, i = t.criteria;
            return i > n ? -1 : n > i ? 1 : 0
        }

        M.map(e, function (e, n) {
            t(e, function (t, i) {
                t ? n(t) : n(null, {value: e, criteria: i})
            })
        }, function (e, t) {
            return e ? n(e) : void n(null, c(t.sort(i), function (e) {
                return e.value
            }))
        })
    }, M.auto = function (t, n, i) {
        function a(e) {
            v.unshift(e)
        }

        function o(e) {
            var t = d(v, e);
            t >= 0 && v.splice(t, 1)
        }

        function c() {
            p--, s(v.slice(0), function (e) {
                e()
            })
        }

        "function" == typeof arguments[1] && (i = n, n = null), i = r(i || e);
        var l = B(t), p = l.length;
        if (!p)return i(null);
        n || (n = p);
        var m = {}, g = 0, v = [];
        a(function () {
            p || i(null, m)
        }), s(l, function (e) {
            function r() {
                return n > g && u(_, function (e, t) {
                            return e && m.hasOwnProperty(t)
                        }, !0) && !m.hasOwnProperty(e)
            }

            function s() {
                r() && (g++, o(s), p[p.length - 1](v, m))
            }

            for (var l, p = j(t[e]) ? t[e] : [t[e]], v = f(function (t, n) {
                if (g--, n.length <= 1 && (n = n[0]), t) {
                    var a = {};
                    h(m, function (e, t) {
                        a[t] = e
                    }), a[e] = n, i(t, a)
                } else m[e] = n, M.setImmediate(c)
            }), _ = p.slice(0, p.length - 1), y = _.length; y--;) {
                if (!(l = t[_[y]]))throw new Error("Has inexistant dependency");
                if (j(l) && d(l, e) >= 0)throw new Error("Has cyclic dependencies")
            }
            r() ? (g++, p[p.length - 1](v, m)) : a(s)
        })
    }, M.retry = function (e, t, n) {
        function i(e, t) {
            if ("number" == typeof t)e.times = parseInt(t, 10) || r; else {
                if ("object" != typeof t)throw new Error("Unsupported argument type for 'times': " + typeof t);
                e.times = parseInt(t.times, 10) || r, e.interval = parseInt(t.interval, 10) || o
            }
        }

        function a(e, t) {
            function n(e, n) {
                return function (i) {
                    e(function (e, t) {
                        i(!e || n, {err: e, result: t})
                    }, t)
                }
            }

            function i(e) {
                return function (t) {
                    setTimeout(function () {
                        t(null)
                    }, e)
                }
            }

            for (; c.times;) {
                var a = !(c.times -= 1);
                s.push(n(c.task, a)), !a && c.interval > 0 && s.push(i(c.interval))
            }
            M.series(s, function (t, n) {
                n = n[n.length - 1], (e || c.callback)(n.err, n.result)
            })
        }

        var r = 5, o = 0, s = [], c = {times: r, interval: o}, l = arguments.length;
        if (1 > l || l > 3)throw new Error("Invalid arguments - must be either (task), (task, callback), (times, task) or (times, task, callback)");
        return 2 >= l && "function" == typeof e && (n = t, t = e), "function" != typeof e && i(c, e), c.callback = n, c.task = t, c.callback ? a() : a
    }, M.waterfall = function (t, n) {
        function i(e) {
            return f(function (t, a) {
                if (t)n.apply(null, [t].concat(a)); else {
                    var r = e.next();
                    r ? a.push(i(r)) : a.push(n), D(e).apply(null, a)
                }
            })
        }

        if (n = r(n || e), !j(t)) {
            var a = new Error("First argument to waterfall must be an array of functions");
            return n(a)
        }
        return t.length ? void i(M.iterator(t))() : n()
    }, M.parallel = function (e, t) {
        E(M.eachOf, e, t)
    }, M.parallelLimit = function (e, t, n) {
        E(g(t), e, n)
    }, M.series = function (e, t) {
        E(M.eachOfSeries, e, t)
    }, M.iterator = function (e) {
        function t(n) {
            function i() {
                return e.length && e[n].apply(null, arguments), i.next()
            }

            return i.next = function () {
                return n < e.length - 1 ? t(n + 1) : null
            }, i
        }

        return t(0)
    }, M.apply = f(function (e, t) {
        return f(function (n) {
            return e.apply(null, t.concat(n))
        })
    }), M.concat = v(T), M.concatSeries = y(T), M.whilst = function (t, n, i) {
        if (i = i || e, t()) {
            var a = f(function (e, r) {
                e ? i(e) : t.apply(this, r) ? n(a) : i.apply(null, [null].concat(r))
            });
            n(a)
        } else i(null)
    }, M.doWhilst = function (e, t, n) {
        var i = 0;
        return M.whilst(function () {
            return ++i <= 1 || t.apply(this, arguments)
        }, e, n)
    }, M.until = function (e, t, n) {
        return M.whilst(function () {
            return !e.apply(this, arguments)
        }, t, n)
    }, M.doUntil = function (e, t, n) {
        return M.doWhilst(e, function () {
            return !t.apply(this, arguments)
        }, n)
    }, M.during = function (t, n, i) {
        i = i || e;
        var a = f(function (e, n) {
            e ? i(e) : (n.push(r), t.apply(this, n))
        }), r = function (e, t) {
            e ? i(e) : t ? n(a) : i(null)
        };
        t(r)
    }, M.doDuring = function (e, t, n) {
        var i = 0;
        M.during(function (e) {
            i++ < 1 ? e(null, !0) : t.apply(this, arguments)
        }, e, n)
    }, M.queue = function (e, t) {
        var n = L(function (t, n) {
            e(t[0], n)
        }, t, 1);
        return n
    }, M.priorityQueue = function (t, n) {
        function i(e, t) {
            return e.priority - t.priority
        }

        function a(e, t, n) {
            for (var i = -1, a = e.length - 1; a > i;) {
                var r = i + (a - i + 1 >>> 1);
                n(t, e[r]) >= 0 ? i = r : a = r - 1
            }
            return i
        }

        function r(t, n, r, o) {
            if (null != o && "function" != typeof o)throw new Error("task callback must be a function");
            return t.started = !0, j(n) || (n = [n]), 0 === n.length ? M.setImmediate(function () {
                t.drain()
            }) : void s(n, function (n) {
                var s = {data: n, priority: r, callback: "function" == typeof o ? o : e};
                t.tasks.splice(a(t.tasks, s, i) + 1, 0, s), t.tasks.length === t.concurrency && t.saturated(), M.setImmediate(t.process)
            })
        }

        var o = M.queue(t, n);
        return o.push = function (e, t, n) {
            r(o, e, t, n)
        }, delete o.unshift, o
    }, M.cargo = function (e, t) {
        return L(e, 1, t)
    }, M.log = A("log"), M.dir = A("dir"), M.memoize = function (e, n) {
        var i = {}, a = {};
        n = n || t;
        var r = f(function (t) {
            var r = t.pop(), o = n.apply(null, t);
            o in i ? M.setImmediate(function () {
                r.apply(null, i[o])
            }) : o in a ? a[o].push(r) : (a[o] = [r], e.apply(null, t.concat([f(function (e) {
                i[o] = e;
                var t = a[o];
                delete a[o];
                for (var n = 0, r = t.length; r > n; n++)t[n].apply(null, e)
            })])))
        });
        return r.memo = i, r.unmemoized = e, r
    }, M.unmemoize = function (e) {
        return function () {
            return (e.unmemoized || e).apply(null, arguments)
        }
    }, M.times = C(M.map), M.timesSeries = C(M.mapSeries), M.timesLimit = function (e, t, n, i) {
        return M.mapLimit(l(e), t, n, i)
    }, M.seq = function () {
        var t = arguments;
        return f(function (n) {
            var i = this, a = n[n.length - 1];
            "function" == typeof a ? n.pop() : a = e, M.reduce(t, n, function (e, t, n) {
                t.apply(i, e.concat([f(function (e, t) {
                    n(e, t)
                })]))
            }, function (e, t) {
                a.apply(i, [e].concat(t))
            })
        })
    }, M.compose = function () {
        return M.seq.apply(null, Array.prototype.reverse.call(arguments))
    }, M.applyEach = P(M.eachOf), M.applyEachSeries = P(M.eachOfSeries), M.forever = function (t, n) {
        function i(e) {
            return e ? r(e) : void o(i)
        }

        var r = a(n || e), o = D(t);
        i()
    }, M.ensureAsync = D, M.constant = f(function (e) {
        var t = [null].concat(e);
        return function (e) {
            return e.apply(this, t)
        }
    }), M.wrapSync = M.asyncify = function (e) {
        return f(function (t) {
            var n, i = t.pop();
            try {
                n = e.apply(this, t)
            } catch (a) {
                return i(a)
            }
            R(n) && "function" == typeof n.then ? n.then(function (e) {
                i(null, e)
            })["catch"](function (e) {
                i(e.message ? e : new Error(e))
            }) : i(null, n)
        })
    }, "object" == typeof module && module.exports ? module.exports = M : "function" == typeof define && define.amd ? define([], function () {
        return M
    }) : O.async = M
}(), function (e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.Handlebars = t() : e.Handlebars = t()
}(this, function () {
    return function (e) {
        function t(i) {
            if (n[i])return n[i].exports;
            var a = n[i] = {exports: {}, id: i, loaded: !1};
            return e[i].call(a.exports, a, a.exports, t), a.loaded = !0, a.exports
        }

        var n = {};
        return t.m = e, t.c = n, t.p = "", t(0)
    }([function (e, t, n) {
        "use strict";
        function i() {
            var e = new s.HandlebarsEnvironment;
            return p.extend(e, s), e.SafeString = l["default"], e.Exception = h["default"], e.Utils = p, e.escapeExpression = p.escapeExpression, e.VM = m, e.template = function (t) {
                return m.template(t, e)
            }, e
        }

        var a = n(1)["default"], r = n(2)["default"];
        t.__esModule = !0;
        var o = n(3), s = a(o), c = n(17), l = r(c), u = n(5), h = r(u), d = n(4), p = a(d), f = n(18), m = a(f), g = n(19), v = r(g), _ = i();
        _.create = i, v["default"](_), _["default"] = _, t["default"] = _, e.exports = t["default"]
    }, function (e, t) {
        "use strict";
        t["default"] = function (e) {
            if (e && e.__esModule)return e;
            var t = {};
            if (null != e)for (var n in e)Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
            return t["default"] = e, t
        }, t.__esModule = !0
    }, function (e, t) {
        "use strict";
        t["default"] = function (e) {
            return e && e.__esModule ? e : {"default": e}
        }, t.__esModule = !0
    }, function (e, t, n) {
        "use strict";
        function i(e, t, n) {
            this.helpers = e || {}, this.partials = t || {}, this.decorators = n || {}, c.registerDefaultHelpers(this), l.registerDefaultDecorators(this)
        }

        var a = n(2)["default"];
        t.__esModule = !0, t.HandlebarsEnvironment = i;
        var r = n(4), o = n(5), s = a(o), c = n(6), l = n(14), u = n(16), h = a(u), d = "4.0.5";
        t.VERSION = d;
        var p = 7;
        t.COMPILER_REVISION = p;
        var f = {
            1: "<= 1.0.rc.2",
            2: "== 1.0.0-rc.3",
            3: "== 1.0.0-rc.4",
            4: "== 1.x.x",
            5: "== 2.0.0-alpha.x",
            6: ">= 2.0.0-beta.1",
            7: ">= 4.0.0"
        };
        t.REVISION_CHANGES = f;
        var m = "[object Object]";
        i.prototype = {
            constructor: i, logger: h["default"], log: h["default"].log, registerHelper: function (e, t) {
                if (r.toString.call(e) === m) {
                    if (t)throw new s["default"]("Arg not supported with multiple helpers");
                    r.extend(this.helpers, e)
                } else this.helpers[e] = t
            }, unregisterHelper: function (e) {
                delete this.helpers[e]
            }, registerPartial: function (e, t) {
                if (r.toString.call(e) === m)r.extend(this.partials, e); else {
                    if ("undefined" == typeof t)throw new s["default"]('Attempting to register a partial called "' + e + '" as undefined');
                    this.partials[e] = t
                }
            }, unregisterPartial: function (e) {
                delete this.partials[e]
            }, registerDecorator: function (e, t) {
                if (r.toString.call(e) === m) {
                    if (t)throw new s["default"]("Arg not supported with multiple decorators");
                    r.extend(this.decorators, e)
                } else this.decorators[e] = t
            }, unregisterDecorator: function (e) {
                delete this.decorators[e]
            }
        };
        var g = h["default"].log;
        t.log = g, t.createFrame = r.createFrame, t.logger = h["default"]
    }, function (e, t) {
        "use strict";
        function n(e) {
            return u[e]
        }

        function i(e) {
            for (var t = 1; t < arguments.length; t++)for (var n in arguments[t])Object.prototype.hasOwnProperty.call(arguments[t], n) && (e[n] = arguments[t][n]);
            return e
        }

        function a(e, t) {
            for (var n = 0, i = e.length; i > n; n++)if (e[n] === t)return n;
            return -1
        }

        function r(e) {
            if ("string" != typeof e) {
                if (e && e.toHTML)return e.toHTML();
                if (null == e)return "";
                if (!e)return e + "";
                e = "" + e
            }
            return d.test(e) ? e.replace(h, n) : e
        }

        function o(e) {
            return e || 0 === e ? m(e) && 0 === e.length ? !0 : !1 : !0
        }

        function s(e) {
            var t = i({}, e);
            return t._parent = e, t
        }

        function c(e, t) {
            return e.path = t, e
        }

        function l(e, t) {
            return (e ? e + "." : "") + t
        }

        t.__esModule = !0, t.extend = i, t.indexOf = a, t.escapeExpression = r, t.isEmpty = o, t.createFrame = s, t.blockParams = c, t.appendContextPath = l;
        var u = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#x27;",
            "`": "&#x60;",
            "=": "&#x3D;"
        }, h = /[&<>"'`=]/g, d = /[&<>"'`=]/, p = Object.prototype.toString;
        t.toString = p;
        var f = function (e) {
            return "function" == typeof e
        };
        f(/x/) && (t.isFunction = f = function (e) {
            return "function" == typeof e && "[object Function]" === p.call(e)
        }), t.isFunction = f;
        var m = Array.isArray || function (e) {
                    return e && "object" == typeof e ? "[object Array]" === p.call(e) : !1
                };
        t.isArray = m
    }, function (e, t) {
        "use strict";
        function n(e, t) {
            var a = t && t.loc, r = void 0, o = void 0;
            a && (r = a.start.line, o = a.start.column, e += " - " + r + ":" + o);
            for (var s = Error.prototype.constructor.call(this, e), c = 0; c < i.length; c++)this[i[c]] = s[i[c]];
            Error.captureStackTrace && Error.captureStackTrace(this, n), a && (this.lineNumber = r, this.column = o)
        }

        t.__esModule = !0;
        var i = ["description", "fileName", "lineNumber", "message", "name", "number", "stack"];
        n.prototype = new Error, t["default"] = n, e.exports = t["default"]
    }, function (e, t, n) {
        "use strict";
        function i(e) {
            o["default"](e), c["default"](e), u["default"](e), d["default"](e), f["default"](e), g["default"](e), _["default"](e)
        }

        var a = n(2)["default"];
        t.__esModule = !0, t.registerDefaultHelpers = i;
        var r = n(7), o = a(r), s = n(8), c = a(s), l = n(9), u = a(l), h = n(10), d = a(h), p = n(11), f = a(p), m = n(12), g = a(m), v = n(13), _ = a(v)
    }, function (e, t, n) {
        "use strict";
        t.__esModule = !0;
        var i = n(4);
        t["default"] = function (e) {
            e.registerHelper("blockHelperMissing", function (t, n) {
                var a = n.inverse, r = n.fn;
                if (t === !0)return r(this);
                if (t === !1 || null == t)return a(this);
                if (i.isArray(t))return t.length > 0 ? (n.ids && (n.ids = [n.name]), e.helpers.each(t, n)) : a(this);
                if (n.data && n.ids) {
                    var o = i.createFrame(n.data);
                    o.contextPath = i.appendContextPath(n.data.contextPath, n.name), n = {data: o}
                }
                return r(t, n)
            })
        }, e.exports = t["default"]
    }, function (e, t, n) {
        "use strict";
        var i = n(2)["default"];
        t.__esModule = !0;
        var a = n(4), r = n(5), o = i(r);
        t["default"] = function (e) {
            e.registerHelper("each", function (e, t) {
                function n(t, n, r) {
                    l && (l.key = t, l.index = n, l.first = 0 === n, l.last = !!r, u && (l.contextPath = u + t)), c += i(e[t], {
                        data: l,
                        blockParams: a.blockParams([e[t], t], [u + t, null])
                    })
                }

                if (!t)throw new o["default"]("Must pass iterator to #each");
                var i = t.fn, r = t.inverse, s = 0, c = "", l = void 0, u = void 0;
                if (t.data && t.ids && (u = a.appendContextPath(t.data.contextPath, t.ids[0]) + "."), a.isFunction(e) && (e = e.call(this)), t.data && (l = a.createFrame(t.data)), e && "object" == typeof e)if (a.isArray(e))for (var h = e.length; h > s; s++)s in e && n(s, s, s === e.length - 1); else {
                    var d = void 0;
                    for (var p in e)e.hasOwnProperty(p) && (void 0 !== d && n(d, s - 1), d = p, s++);
                    void 0 !== d && n(d, s - 1, !0)
                }
                return 0 === s && (c = r(this)), c
            })
        }, e.exports = t["default"]
    }, function (e, t, n) {
        "use strict";
        var i = n(2)["default"];
        t.__esModule = !0;
        var a = n(5), r = i(a);
        t["default"] = function (e) {
            e.registerHelper("helperMissing", function () {
                if (1 === arguments.length)return void 0;
                throw new r["default"]('Missing helper: "' + arguments[arguments.length - 1].name + '"')
            })
        }, e.exports = t["default"]
    }, function (e, t, n) {
        "use strict";
        t.__esModule = !0;
        var i = n(4);
        t["default"] = function (e) {
            e.registerHelper("if", function (e, t) {
                return i.isFunction(e) && (e = e.call(this)), !t.hash.includeZero && !e || i.isEmpty(e) ? t.inverse(this) : t.fn(this)
            }), e.registerHelper("unless", function (t, n) {
                return e.helpers["if"].call(this, t, {fn: n.inverse, inverse: n.fn, hash: n.hash})
            })
        }, e.exports = t["default"]
    }, function (e, t) {
        "use strict";
        t.__esModule = !0, t["default"] = function (e) {
            e.registerHelper("log", function () {
                for (var t = [void 0], n = arguments[arguments.length - 1], i = 0; i < arguments.length - 1; i++)t.push(arguments[i]);
                var a = 1;
                null != n.hash.level ? a = n.hash.level : n.data && null != n.data.level && (a = n.data.level), t[0] = a, e.log.apply(e, t)
            })
        }, e.exports = t["default"]
    }, function (e, t) {
        "use strict";
        t.__esModule = !0, t["default"] = function (e) {
            e.registerHelper("lookup", function (e, t) {
                return e && e[t]
            })
        }, e.exports = t["default"]
    }, function (e, t, n) {
        "use strict";
        t.__esModule = !0;
        var i = n(4);
        t["default"] = function (e) {
            e.registerHelper("with", function (e, t) {
                i.isFunction(e) && (e = e.call(this));
                var n = t.fn;
                if (i.isEmpty(e))return t.inverse(this);
                var a = t.data;
                return t.data && t.ids && (a = i.createFrame(t.data), a.contextPath = i.appendContextPath(t.data.contextPath, t.ids[0])), n(e, {
                    data: a,
                    blockParams: i.blockParams([e], [a && a.contextPath])
                })
            })
        }, e.exports = t["default"]
    }, function (e, t, n) {
        "use strict";
        function i(e) {
            o["default"](e)
        }

        var a = n(2)["default"];
        t.__esModule = !0, t.registerDefaultDecorators = i;
        var r = n(15), o = a(r)
    }, function (e, t, n) {
        "use strict";
        t.__esModule = !0;
        var i = n(4);
        t["default"] = function (e) {
            e.registerDecorator("inline", function (e, t, n, a) {
                var r = e;
                return t.partials || (t.partials = {}, r = function (a, r) {
                    var o = n.partials;
                    n.partials = i.extend({}, o, t.partials);
                    var s = e(a, r);
                    return n.partials = o, s
                }), t.partials[a.args[0]] = a.fn, r
            })
        }, e.exports = t["default"]
    }, function (e, t, n) {
        "use strict";
        t.__esModule = !0;
        var i = n(4), a = {
            methodMap: ["debug", "info", "warn", "error"], level: "info", lookupLevel: function (e) {
                if ("string" == typeof e) {
                    var t = i.indexOf(a.methodMap, e.toLowerCase());
                    e = t >= 0 ? t : parseInt(e, 10)
                }
                return e
            }, log: function (e) {
                if (e = a.lookupLevel(e), "undefined" != typeof console && a.lookupLevel(a.level) <= e) {
                    var t = a.methodMap[e];
                    console[t] || (t = "log");
                    for (var n = arguments.length, i = Array(n > 1 ? n - 1 : 0), r = 1; n > r; r++)i[r - 1] = arguments[r];
                    console[t].apply(console, i)
                }
            }
        };
        t["default"] = a, e.exports = t["default"]
    }, function (e, t) {
        "use strict";
        function n(e) {
            this.string = e
        }

        t.__esModule = !0, n.prototype.toString = n.prototype.toHTML = function () {
            return "" + this.string
        }, t["default"] = n, e.exports = t["default"]
    }, function (e, t, n) {
        "use strict";
        function i(e) {
            var t = e && e[0] || 1, n = v.COMPILER_REVISION;
            if (t !== n) {
                if (n > t) {
                    var i = v.REVISION_CHANGES[n], a = v.REVISION_CHANGES[t];
                    throw new g["default"]("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version (" + i + ") or downgrade your runtime to an older version (" + a + ").")
                }
                throw new g["default"]("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version (" + e[1] + ").")
            }
        }

        function a(e, t) {
            function n(n, i, a) {
                a.hash && (i = f.extend({}, i, a.hash), a.ids && (a.ids[0] = !0)), n = t.VM.resolvePartial.call(this, n, i, a);
                var r = t.VM.invokePartial.call(this, n, i, a);
                if (null == r && t.compile && (a.partials[a.name] = t.compile(n, e.compilerOptions, t), r = a.partials[a.name](i, a)), null != r) {
                    if (a.indent) {
                        for (var o = r.split("\n"), s = 0, c = o.length; c > s && (o[s] || s + 1 !== c); s++)o[s] = a.indent + o[s];
                        r = o.join("\n")
                    }
                    return r
                }
                throw new g["default"]("The partial " + a.name + " could not be compiled when running in runtime-only mode")
            }

            function i(t) {
                function n(t) {
                    return "" + e.main(a, t, a.helpers, a.partials, o, c, s)
                }

                var r = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1], o = r.data;
                i._setup(r), !r.partial && e.useData && (o = l(t, o));
                var s = void 0, c = e.useBlockParams ? [] : void 0;
                return e.useDepths && (s = r.depths ? t !== r.depths[0] ? [t].concat(r.depths) : r.depths : [t]), (n = u(e.main, n, a, r.depths || [], o, c))(t, r)
            }

            if (!t)throw new g["default"]("No environment passed to template");
            if (!e || !e.main)throw new g["default"]("Unknown template object: " + typeof e);
            e.main.decorator = e.main_d, t.VM.checkRevision(e.compiler);
            var a = {
                strict: function (e, t) {
                    if (!(t in e))throw new g["default"]('"' + t + '" not defined in ' + e);
                    return e[t]
                }, lookup: function (e, t) {
                    for (var n = e.length, i = 0; n > i; i++)if (e[i] && null != e[i][t])return e[i][t]
                }, lambda: function (e, t) {
                    return "function" == typeof e ? e.call(t) : e
                }, escapeExpression: f.escapeExpression, invokePartial: n, fn: function (t) {
                    var n = e[t];
                    return n.decorator = e[t + "_d"], n
                }, programs: [], program: function (e, t, n, i, a) {
                    var o = this.programs[e], s = this.fn(e);
                    return t || a || i || n ? o = r(this, e, s, t, n, i, a) : o || (o = this.programs[e] = r(this, e, s)), o
                }, data: function (e, t) {
                    for (; e && t--;)e = e._parent;
                    return e
                }, merge: function (e, t) {
                    var n = e || t;
                    return e && t && e !== t && (n = f.extend({}, t, e)), n
                }, noop: t.VM.noop, compilerInfo: e.compiler
            };
            return i.isTop = !0, i._setup = function (n) {
                n.partial ? (a.helpers = n.helpers, a.partials = n.partials, a.decorators = n.decorators) : (a.helpers = a.merge(n.helpers, t.helpers), e.usePartial && (a.partials = a.merge(n.partials, t.partials)), (e.usePartial || e.useDecorators) && (a.decorators = a.merge(n.decorators, t.decorators)))
            }, i._child = function (t, n, i, o) {
                if (e.useBlockParams && !i)throw new g["default"]("must pass block params");
                if (e.useDepths && !o)throw new g["default"]("must pass parent depths");
                return r(a, t, e[t], n, 0, i, o)
            }, i
        }

        function r(e, t, n, i, a, r, o) {
            function s(t) {
                var a = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1], s = o;
                return o && t !== o[0] && (s = [t].concat(o)), n(e, t, e.helpers, e.partials, a.data || i, r && [a.blockParams].concat(r), s)
            }

            return s = u(n, s, e, o, i, r), s.program = t, s.depth = o ? o.length : 0, s.blockParams = a || 0, s
        }

        function o(e, t, n) {
            return e ? e.call || n.name || (n.name = e, e = n.partials[e]) : e = "@partial-block" === n.name ? n.data["partial-block"] : n.partials[n.name], e
        }

        function s(e, t, n) {
            n.partial = !0, n.ids && (n.data.contextPath = n.ids[0] || n.data.contextPath);
            var i = void 0;
            if (n.fn && n.fn !== c && (n.data = v.createFrame(n.data), i = n.data["partial-block"] = n.fn, i.partials && (n.partials = f.extend({}, n.partials, i.partials))), void 0 === e && i && (e = i), void 0 === e)throw new g["default"]("The partial " + n.name + " could not be found");
            return e instanceof Function ? e(t, n) : void 0
        }

        function c() {
            return ""
        }

        function l(e, t) {
            return t && "root" in t || (t = t ? v.createFrame(t) : {}, t.root = e), t
        }

        function u(e, t, n, i, a, r) {
            if (e.decorator) {
                var o = {};
                t = e.decorator(t, o, n, i && i[0], a, r, i), f.extend(t, o)
            }
            return t
        }

        var h = n(1)["default"], d = n(2)["default"];
        t.__esModule = !0, t.checkRevision = i, t.template = a, t.wrapProgram = r, t.resolvePartial = o, t.invokePartial = s, t.noop = c;
        var p = n(4), f = h(p), m = n(5), g = d(m), v = n(3)
    }, function (e, t) {
        (function (n) {
            "use strict";
            t.__esModule = !0, t["default"] = function (e) {
                var t = "undefined" != typeof n ? n : window, i = t.Handlebars;
                e.noConflict = function () {
                    return t.Handlebars === e && (t.Handlebars = i), e
                }
            }, e.exports = t["default"]
        }).call(t, function () {
            return this
        }())
    }])
}), function () {
    var e = Handlebars.template, t = Handlebars.templates = Handlebars.templates || {};
    t.columnAD_tpl = e({
        1: function (e, t, n, i, a) {
            return 'target="_blank"'
        }, compiler: [7, ">= 4.0.0"], main: function (e, t, n, i, a) {
            var r, o, s, c = null != t ? t : {}, l = n.helperMissing, u = "function", h = e.escapeExpression, d = '<section class="m_adv_m0 m_adv ad-item clearfix" id="' + h((o = null != (o = n.docid || (null != t ? t.docid : t)) ? o : l, typeof o === u ? o.call(c, {
                        name: "docid",
                        hash: {},
                        data: a
                    }) : o)) + '">\r\n    <div class="m_adv_title">' + h((o = null != (o = n.title || (null != t ? t.title : t)) ? o : l, typeof o === u ? o.call(c, {
                        name: "title",
                        hash: {},
                        data: a
                    }) : o)) + '</div>\r\n    <div class="m_adv_img">\r\n        <a ';
            return o = null != (o = n.notIosSafari || (null != t ? t.notIosSafari : t)) ? o : l, s = {
                name: "notIosSafari",
                hash: {},
                fn: e.program(1, a, 0),
                inverse: e.noop,
                data: a
            }, r = typeof o === u ? o.call(c, s) : o, n.notIosSafari || (r = n.blockHelperMissing.call(t, r, s)), null != r && (d += r), d + ' href="' + h((o = null != (o = n.link || (null != t ? t.link : t)) ? o : l, typeof o === u ? o.call(c, {
                name: "link",
                hash: {},
                data: a
            }) : o)) + '"><img src="' + h((n.getone || t && t.getone || l).call(c, null != t ? t.pic_info : t, 0, "url", {
                name: "getone",
                hash: {},
                data: a
            })) + '"></a>\r\n    </div>\r\n</section>'
        }, useData: !0
    }), t.columsAD_tpl = e({
        1: function (e, t, n, i, a) {
            return 'target="_blank"'
        }, compiler: [7, ">= 4.0.0"], main: function (e, t, n, i, a) {
            var r, o, s, c = null != t ? t : {}, l = n.helperMissing, u = "function", h = e.escapeExpression, d = '<section class="m_papa_m0 m_papa papa-item clearfix" id="' + h((o = null != (o = n.docid || (null != t ? t.docid : t)) ? o : l, typeof o === u ? o.call(c, {
                        name: "docid",
                        hash: {},
                        data: a
                    }) : o)) + '">\r\n    <a ';
            return o = null != (o = n.notIosSafari || (null != t ? t.notIosSafari : t)) ? o : l, s = {
                name: "notIosSafari",
                hash: {},
                fn: e.program(1, a, 0),
                inverse: e.noop,
                data: a
            }, r = typeof o === u ? o.call(c, s) : o, n.notIosSafari || (r = n.blockHelperMissing.call(t, r, s)), null != r && (d += r), d + ' href="' + h((o = null != (o = n.link || (null != t ? t.link : t)) ? o : l, typeof o === u ? o.call(c, {
                name: "link",
                hash: {},
                data: a
            }) : o)) + '">\r\n        <div class="m_papa_title">' + h((o = null != (o = n.title || (null != t ? t.title : t)) ? o : l, typeof o === u ? o.call(c, {
                name: "title",
                hash: {},
                data: a
            }) : o)) + '</div>\r\n        <div class="m_papa_img">\r\n            <img src="' + h((n.getone || t && t.getone || l).call(c, null != t ? t.pic_info : t, 0, "url", {
                name: "getone",
                hash: {},
                data: a
            })) + '">\r\n        </div>\r\n    </a>\r\n</section>'
        }, useData: !0
    }), t.colums_tpl = e({
        1: function (e, t, n, i, a) {
            return 'target="_blank"'
        }, compiler: [7, ">= 4.0.0"], main: function (e, t, n, i, a) {
            var r, o, s, c = null != t ? t : {}, l = n.helperMissing, u = "function", h = e.escapeExpression, d = '<section class="m_article_m1 m_article list-item clearfix" id="' + h((o = null != (o = n.docid || (null != t ? t.docid : t)) ? o : l, typeof o === u ? o.call(c, {
                        name: "docid",
                        hash: {},
                        data: a
                    }) : o)) + '">\r\n    <a ';
            return o = null != (o = n.notIosSafari || (null != t ? t.notIosSafari : t)) ? o : l, s = {
                name: "notIosSafari",
                hash: {},
                fn: e.program(1, a, 0),
                inverse: e.noop,
                data: a
            }, r = typeof o === u ? o.call(c, s) : o, n.notIosSafari || (r = n.blockHelperMissing.call(t, r, s)), null != r && (d += r), d + ' href="' + h((o = null != (o = n.link || (null != t ? t.link : t)) ? o : l, typeof o === u ? o.call(c, {
                name: "link",
                hash: {},
                data: a
            }) : o)) + '">\r\n        <div class="m_article_title">' + h((o = null != (o = n.title || (null != t ? t.title : t)) ? o : l, typeof o === u ? o.call(c, {
                name: "title",
                hash: {},
                data: a
            }) : o)) + '</div>\r\n        <div class="m_article_img">\r\n            <img src="' + h((n.getone || t && t.getone || l).call(c, null != t ? t.pic_info : t, 0, "url", {
                name: "getone",
                hash: {},
                data: a
            })) + '">\r\n        </div>\r\n    </a>\r\n</section>'
        }, useData: !0
    }), t.contentList_tpl = e({
        compiler: [7, ">= 4.0.0"], main: function (e, t, n, i, a) {
            var r;
            return '<div class="contents-tablist-wrap fl" id="channel_' + e.escapeExpression((r = null != (r = n.term || (null != t ? t.term : t)) ? r : n.helperMissing, "function" == typeof r ? r.call(null != t ? t : {}, {
                        name: "term",
                        hash: {},
                        data: a
                    }) : r)) + '"></div>'
        }, useData: !0
    }), t.docAD_tpl = e({
        1: function (e, t, n, i, a) {
            return 'target="_blank"'
        }, compiler: [7, ">= 4.0.0"], main: function (e, t, n, i, a) {
            var r, o, s, c = null != t ? t : {}, l = n.helperMissing, u = "function", h = e.escapeExpression, d = '<section class="m_papa papa-item clearfix" id="' + h((o = null != (o = n.docid || (null != t ? t.docid : t)) ? o : l, typeof o === u ? o.call(c, {
                        name: "docid",
                        hash: {},
                        data: a
                    }) : o)) + '">\r\n    <a ';
            return o = null != (o = n.notIosSafari || (null != t ? t.notIosSafari : t)) ? o : l, s = {
                name: "notIosSafari",
                hash: {},
                fn: e.program(1, a, 0),
                inverse: e.noop,
                data: a
            }, r = typeof o === u ? o.call(c, s) : o, n.notIosSafari || (r = n.blockHelperMissing.call(t, r, s)), null != r && (d += r), d + ' href="' + h((o = null != (o = n.link || (null != t ? t.link : t)) ? o : l, typeof o === u ? o.call(c, {
                name: "link",
                hash: {},
                data: a
            }) : o)) + '" >\r\n        <div class="m_papa_img">\r\n            <img src="' + h((n.getone || t && t.getone || l).call(c, null != t ? t.pic_info : t, 0, "url", {
                name: "getone",
                hash: {},
                data: a
            })) + '">\r\n        </div>\r\n        <div class="m_papa_info">\r\n            <div class="m_papa_title">\r\n                ' + h((o = null != (o = n.title || (null != t ? t.title : t)) ? o : l, typeof o === u ? o.call(c, {
                name: "title",
                hash: {},
                data: a
            }) : o)) + '\r\n            </div>\r\n            <div class="m_papa_desc clearfix">\r\n                <div class="m_papa_desc_l">\r\n                    <span class="m_papa_promote">' + h((o = null != (o = n.source || (null != t ? t.source : t)) ? o : l, typeof o === u ? o.call(c, {
                name: "source",
                hash: {},
                data: a
            }) : o)) + '</span>\r\n                    <span class="m_papa_time">' + h((o = null != (o = n.ptime || (null != t ? t.ptime : t)) ? o : l, typeof o === u ? o.call(c, {
                name: "ptime",
                hash: {},
                data: a
            }) : o)) + '</span>\r\n                </div>\r\n                <div class="m_article_desc_r"></div>\r\n            </div>\r\n        </div>\r\n    </a>\r\n</section>'
        }, useData: !0
    }), t.docDebate_tpl = e({
        1: function (e, t, n, i, a) {
            return 'target="_blank"'
        }, compiler: [7, ">= 4.0.0"], main: function (e, t, n, i, a) {
            var r, o, s, c = null != t ? t : {}, l = n.helperMissing, u = "function", h = e.escapeExpression, d = ' <section class="m_article_debate m_article list-item clearfix" id="">\r\n    <div class="m_separate">\r\n        <div class="m_debate_title">\r\n            <a ';
            return o = null != (o = n.notIosSafari || (null != t ? t.notIosSafari : t)) ? o : l, s = {
                name: "notIosSafari",
                hash: {},
                fn: e.program(1, a, 0),
                inverse: e.noop,
                data: a
            }, r = typeof o === u ? o.call(c, s) : o, n.notIosSafari || (r = n.blockHelperMissing.call(t, r, s)), null != r && (d += r), d + ' href="' + h((o = null != (o = n.link || (null != t ? t.link : t)) ? o : l, typeof o === u ? o.call(c, {
                name: "link",
                hash: {},
                data: a
            }) : o)) + '" >' + h((o = null != (o = n.title || (null != t ? t.title : t)) ? o : l, typeof o === u ? o.call(c, {
                name: "title",
                hash: {},
                data: a
            }) : o)) + '</a>\r\n        </div>\r\n        <div class="m_debate_contents clearfix">\r\n            <div class="debate_positive debate_btn">\u5b58\u5728</div>\r\n            <div class="debate_view">\r\n                <div class="data_positive" style="width:.978rem;">\r\n                    <div class="data">488</div>\r\n                    <div class="chart" data-num="488"></div>\r\n                </div>\r\n                <div class="chart_wall"></div>\r\n                <div class="data_opposing" style="width:2.022rem;">\r\n                    <div class="data">1009</div>\r\n                    <div class="chart" data-num="1009"></div>\r\n                </div>\r\n            </div>\r\n            <div class="debate_opposing debate_btn">\u4e0d\u5b58\u5728</div>\r\n        </div>\r\n        <div class="m_debate_info">\r\n            <div class="m_debate_desc clearfix">\r\n                <div class="m_debate_desc_l">\r\n                    <span class="m_debate_channel">\u6001\u5ea6</span>\r\n                    <span class="m_debate_time">' + h((o = null != (o = n.ptime || (null != t ? t.ptime : t)) ? o : l, typeof o === u ? o.call(c, {
                name: "ptime",
                hash: {},
                data: a
            }) : o)) + "</span>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</section>"
        }, useData: !0
    }), t.doc_simple_tpl = e({
        1: function (e, t, n, i, a) {
            return 'target="_blank"'
        }, 3: function (e, t, n, i, a) {
            var r, o = null != t ? t : {}, s = n.helperMissing, c = "function", l = e.escapeExpression;
            return '                <div class="m_article_channel">\r\n                    <span>' + l((r = null != (r = n.category || (null != t ? t.category : t)) ? r : s, typeof r === c ? r.call(o, {
                        name: "category",
                        hash: {},
                        data: a
                    }) : r)) + '</span>\r\n                </div>\r\n                <div class="m_article_title">\r\n                    <span>' + l((r = null != (r = n.title || (null != t ? t.title : t)) ? r : s, typeof r === c ? r.call(o, {
                        name: "title",
                        hash: {},
                        data: a
                    }) : r)) + "</span>\r\n                </div>\r\n"
        }, 5: function (e, t, n, i, a) {
            var r;
            return '                <div class="m_article_title_long">\r\n                    <span>' + e.escapeExpression((r = null != (r = n.title || (null != t ? t.title : t)) ? r : n.helperMissing, "function" == typeof r ? r.call(null != t ? t : {}, {
                        name: "title",
                        hash: {},
                        data: a
                    }) : r)) + "</span>\r\n                </div>\r\n"
        }, 7: function (e, t, n, i, a) {
            return '                    <div class="m_article_desc_r">\r\n                        <span class="iconfont">&#xe606;</span>' + e.escapeExpression((n.tcounthandle || t && t.tcounthandle || n.helperMissing).call(null != t ? t : {}, null != t ? t.tcount : t, 9999, {
                        name: "tcounthandle",
                        hash: {},
                        data: a
                    })) + "\r\n                    </div>\r\n"
        }, compiler: [7, ">= 4.0.0"], main: function (e, t, n, i, a) {
            var r, o, s, c = null != t ? t : {}, l = n.helperMissing, u = "function", h = e.escapeExpression, d = '<section class="m_article_simple list-item clearfix" id="' + h((o = null != (o = n.docid || (null != t ? t.docid : t)) ? o : l, typeof o === u ? o.call(c, {
                        name: "docid",
                        hash: {},
                        data: a
                    }) : o)) + '">\r\n    <a ';
            return o = null != (o = n.notIosSafari || (null != t ? t.notIosSafari : t)) ? o : l, s = {
                name: "notIosSafari",
                hash: {},
                fn: e.program(1, a, 0),
                inverse: e.noop,
                data: a
            }, r = typeof o === u ? o.call(c, s) : o, n.notIosSafari || (r = n.blockHelperMissing.call(t, r, s)), null != r && (d += r), d + ' href="' + h((o = null != (o = n.link || (null != t ? t.link : t)) ? o : l, typeof o === u ? o.call(c, {
                name: "link",
                hash: {},
                data: a
            }) : o)) + '" >\r\n        <div class="m_article_info">\r\n' + (null != (r = n["if"].call(c, null != t ? t.category : t, {
                name: "if",
                hash: {},
                fn: e.program(3, a, 0),
                inverse: e.program(5, a, 0),
                data: a
            })) ? r : "") + '            <div class="m_article_desc clearfix">\r\n' + (null != (r = (n.nozero || t && t.nozero || l).call(c, null != t ? t.tcount : t, {
                name: "nozero",
                hash: {},
                fn: e.program(7, a, 0),
                inverse: e.noop,
                data: a
            })) ? r : "") + "            </div>\r\n        </div>\r\n    </a>\r\n</section>"
        }, useData: !0
    }), t.doc_tpl = e({
        1: function (e, t, n, i, a) {
            var r, o, s, c = null != t ? t : {}, l = n.helperMissing, u = "function", h = e.escapeExpression, d = '<section class="m_article list-item ' + (null != (r = n["if"].call(c, null != t ? t.tag : t, {
                        name: "if",
                        hash: {},
                        fn: e.program(2, a, 0),
                        inverse: e.program(4, a, 0),
                        data: a
                    })) ? r : "") + " " + (null != (r = (n.isSpecial || t && t.isSpecial || l).call(c, null != t ? t.tag : t, {
                        name: "isSpecial",
                        hash: {},
                        fn: e.program(6, a, 0),
                        inverse: e.noop,
                        data: a
                    })) ? r : "") + ' clearfix" id="' + h((o = null != (o = n.docid || (null != t ? t.docid : t)) ? o : l, typeof o === u ? o.call(c, {
                        name: "docid",
                        hash: {},
                        data: a
                    }) : o)) + '">\r\n    <a ';
            return o = null != (o = n.notIosSafari || (null != t ? t.notIosSafari : t)) ? o : l, s = {
                name: "notIosSafari",
                hash: {},
                fn: e.program(8, a, 0),
                inverse: e.noop,
                data: a
            }, r = typeof o === u ? o.call(c, s) : o, n.notIosSafari || (r = n.blockHelperMissing.call(t, r, s)), null != r && (d += r), d + ' href="' + h((o = null != (o = n.link || (null != t ? t.link : t)) ? o : l, typeof o === u ? o.call(c, {
                name: "link",
                hash: {},
                data: a
            }) : o)) + '" >\r\n        <div class="m_article_img">\r\n' + (null != (r = n["if"].call(c, null != t ? t.tag : t, {
                name: "if",
                hash: {},
                fn: e.program(10, a, 0),
                inverse: e.noop,
                data: a
            })) ? r : "") + '                <img src="' + h((n.getone || t && t.getone || l).call(c, null != t ? t.pic_info : t, 0, "url", {
                name: "getone",
                hash: {},
                data: a
            })) + '">\r\n        </div>\r\n        <div class="m_article_info">\r\n            <div class="m_article_title">\r\n                <span>' + h((o = null != (o = n.title || (null != t ? t.title : t)) ? o : l, typeof o === u ? o.call(c, {
                name: "title",
                hash: {},
                data: a
            }) : o)) + '</span>\r\n            </div>\r\n            <div class="m_article_desc clearfix">\r\n                <div class="m_article_desc_l">\r\n' + (null != (r = n["if"].call(c, null != t ? t.category : t, {
                name: "if",
                hash: {},
                fn: e.program(12, a, 0),
                inverse: e.noop,
                data: a
            })) ? r : "") + '                    <span class="m_article_time">' + h((n.getDvalueDay || t && t.getDvalueDay || l).call(c, null != t ? t.ptime : t, {
                name: "getDvalueDay",
                hash: {},
                data: a
            })) + "</span>\r\n                </div>\r\n" + (null != (r = (n.nozero || t && t.nozero || l).call(c, null != t ? t.tcount : t, {
                name: "nozero",
                hash: {},
                fn: e.program(14, a, 0),
                inverse: e.noop,
                data: a
            })) ? r : "") + "            </div>\r\n        </div>\r\n" + (null != (r = n["if"].call(c, null != (r = null != t ? t.thot : t) ? r.isopen : r, {
                name: "if",
                hash: {},
                fn: e.program(16, a, 0),
                inverse: e.noop,
                data: a
            })) ? r : "") + "    </a>\r\n</section>\r\n"
        }, 2: function (e, t, n, i, a) {
            return ""
        }, 4: function (e, t, n, i, a) {
            return "list-article"
        }, 6: function (e, t, n, i, a) {
            return "special_section"
        }, 8: function (e, t, n, i, a) {
            return 'target="_blank"'
        }, 10: function (e, t, n, i, a) {
            var r;
            return '                    <div class="m_article_mark mark_new">' + e.escapeExpression((r = null != (r = n.tag || (null != t ? t.tag : t)) ? r : n.helperMissing, "function" == typeof r ? r.call(null != t ? t : {}, {
                        name: "tag",
                        hash: {},
                        data: a
                    }) : r)) + "</div>\r\n"
        }, 12: function (e, t, n, i, a) {
            var r;
            return '                        <span class="m_article_channel">' + e.escapeExpression((r = null != (r = n.category || (null != t ? t.category : t)) ? r : n.helperMissing, "function" == typeof r ? r.call(null != t ? t : {}, {
                        name: "category",
                        hash: {},
                        data: a
                    }) : r)) + "</span>\r\n"
        }, 14: function (e, t, n, i, a) {
            return '                    <div class="m_article_desc_r">\r\n                        <div class="left_hands_desc">\r\n                            <span class="iconfont">&#xe606;</span>' + e.escapeExpression((n.tcounthandle || t && t.tcounthandle || n.helperMissing).call(null != t ? t : {}, null != t ? t.tcount : t, 9999, {
                        name: "tcounthandle",
                        hash: {},
                        data: a
                    })) + "\r\n                        </div>\r\n                    </div>\r\n"
        }, 16: function (e, t, n, i, a) {
            var r;
            return '            <div class="m_article_hot">\r\n                <div class="m_article_hot_icon"></div>\r\n                <div class="m_article_hot_content">\r\n                    ' + e.escapeExpression(e.lambda(null != (r = null != t ? t.thot : t) ? r.comment : r, t)) + "\r\n                </div>\r\n            </div>\r\n"
        }, 18: function (e, t, n, i, a) {
            var r, o, s, c = null != t ? t : {}, l = n.helperMissing, u = "function", h = e.escapeExpression, d = '<section class="m_article m_article_m0 list-item ' + (null != (r = n["if"].call(c, null != t ? t.tag : t, {
                        name: "if",
                        hash: {},
                        fn: e.program(2, a, 0),
                        inverse: e.program(4, a, 0),
                        data: a
                    })) ? r : "") + " " + (null != (r = (n.isSpecial || t && t.isSpecial || l).call(c, null != t ? t.tag : t, {
                        name: "isSpecial",
                        hash: {},
                        fn: e.program(6, a, 0),
                        inverse: e.noop,
                        data: a
                    })) ? r : "") + ' clearfix" id="' + h((o = null != (o = n.docid || (null != t ? t.docid : t)) ? o : l, typeof o === u ? o.call(c, {
                        name: "docid",
                        hash: {},
                        data: a
                    }) : o)) + '">\r\n    <a ';
            return o = null != (o = n.notIosSafari || (null != t ? t.notIosSafari : t)) ? o : l, s = {
                name: "notIosSafari",
                hash: {},
                fn: e.program(8, a, 0),
                inverse: e.noop,
                data: a
            }, r = typeof o === u ? o.call(c, s) : o, n.notIosSafari || (r = n.blockHelperMissing.call(t, r, s)), null != r && (d += r), d + ' href="' + h((o = null != (o = n.link || (null != t ? t.link : t)) ? o : l, typeof o === u ? o.call(c, {
                name: "link",
                hash: {},
                data: a
            }) : o)) + '" >\r\n        <div class="m_article_info">\r\n            <div class="m_article_title">\r\n                ' + h((o = null != (o = n.title || (null != t ? t.title : t)) ? o : l, typeof o === u ? o.call(c, {
                name: "title",
                hash: {},
                data: a
            }) : o)) + '\r\n            </div>\r\n            <div class="m_article_desc clearfix">\r\n                <div class="m_article_desc_l">\r\n' + (null != (r = n["if"].call(c, null != t ? t.category : t, {
                name: "if",
                hash: {},
                fn: e.program(12, a, 0),
                inverse: e.noop,
                data: a
            })) ? r : "") + '                    <span class="m_article_time">' + h((n.getDvalueDay || t && t.getDvalueDay || l).call(c, null != t ? t.ptime : t, {
                name: "getDvalueDay",
                hash: {},
                data: a
            })) + "</span>\r\n                </div>\r\n" + (null != (r = (n.nozero || t && t.nozero || l).call(c, null != t ? t.tcount : t, {
                name: "nozero",
                hash: {},
                fn: e.program(14, a, 0),
                inverse: e.noop,
                data: a
            })) ? r : "") + "            </div>\r\n        </div>\r\n" + (null != (r = n["if"].call(c, null != (r = null != t ? t.thot : t) ? r.isopen : r, {
                name: "if",
                hash: {},
                fn: e.program(16, a, 0),
                inverse: e.noop,
                data: a
            })) ? r : "") + "    </a>\r\n</section>\r\n"
        }, compiler: [7, ">= 4.0.0"], main: function (e, t, n, i, a) {
            var r;
            return null != (r = (n.hasimg || t && t.hasimg || n.helperMissing).call(null != t ? t : {}, null != t ? t.pic_info : t, {
                name: "hasimg",
                hash: {},
                fn: e.program(1, a, 0),
                inverse: e.program(18, a, 0),
                data: a
            })) ? r : ""
        }, useData: !0
    }), t.headslide_tpl = e({
        1: function (e, t, n, i, a) {
            var r, o = null != t ? t : {};
            return '    <ul class="slides">\r\n' + (null != (r = n.each.call(o, null != t ? t.data : t, {
                        name: "each",
                        hash: {},
                        fn: e.program(2, a, 0),
                        inverse: e.noop,
                        data: a
                    })) ? r : "") + "    </ul>\r\n" + (null != (r = (n.arrLengthNot || t && t.arrLengthNot || n.helperMissing).call(o, null != t ? t.data : t, 1, {
                        name: "arrLengthNot",
                        hash: {},
                        fn: e.program(5, a, 0),
                        inverse: e.noop,
                        data: a
                    })) ? r : "")
        }, 2: function (e, t, n, i, a) {
            var r, o, s, c = null != t ? t : {}, l = n.helperMissing, u = "function", h = e.escapeExpression, d = '            <li class="page" data-id="' + h((o = null != (o = n.index || a && a.index) ? o : l, typeof o === u ? o.call(c, {
                        name: "index",
                        hash: {},
                        data: a
                    }) : o)) + '"><a ';
            return o = null != (o = n.notIosSafari || (null != t ? t.notIosSafari : t)) ? o : l, s = {
                name: "notIosSafari",
                hash: {},
                fn: e.program(3, a, 0),
                inverse: e.noop,
                data: a
            }, r = typeof o === u ? o.call(c, s) : o, n.notIosSafari || (r = n.blockHelperMissing.call(t, r, s)), null != r && (d += r), d + ' class="news-pic" href="' + h((o = null != (o = n.link || (null != t ? t.link : t)) ? o : l, typeof o === u ? o.call(c, {
                name: "link",
                hash: {},
                data: a
            }) : o)) + '"><img src="' + h((n.getone || t && t.getone || l).call(c, null != t ? t.pic_info : t, 0, "url", {
                name: "getone",
                hash: {},
                data: a
            })) + '"><span class="title">' + h((o = null != (o = n.title || (null != t ? t.title : t)) ? o : l, typeof o === u ? o.call(c, {
                name: "title",
                hash: {},
                data: a
            }) : o)) + "</span></a>\r\n            </li>\r\n"
        }, 3: function (e, t, n, i, a) {
            return 'target="_blank"'
        }, 5: function (e, t, n, i, a) {
            return '    <ul class="ctrls">\r\n\r\n    </ul>\r\n'
        }, compiler: [7, ">= 4.0.0"], main: function (e, t, n, i, a) {
            var r;
            return null != (r = (n.arrLengthNot || t && t.arrLengthNot || n.helperMissing).call(null != t ? t : {}, null != t ? t.data : t, 0, {
                name: "arrLengthNot",
                hash: {},
                fn: e.program(1, a, 0),
                inverse: e.noop,
                data: a
            })) ? r : ""
        }, useData: !0
    }), t.iframeAD_photoset_tpl = e({
        compiler: [7, ">= 4.0.0"], main: function (e, t, n, i, a) {
            var r;
            return '<section class="m_papa_iframe_photoset m_papa papa-item clearfix">\r\n    <div class="m_papa_iframe_wrap">\r\n         <iframe src="' + e.escapeExpression((r = null != (r = n.link || (null != t ? t.link : t)) ? r : n.helperMissing, "function" == typeof r ? r.call(null != t ? t : {}, {
                        name: "link",
                        hash: {},
                        data: a
                    }) : r)) + '" frameborder="0" allowtransparency="true" scrolling="no"></iframe>\r\n    </div>\r\n</section>'
        }, useData: !0
    }), t.iframeAD_tpl = e({
        compiler: [7, ">= 4.0.0"], main: function (e, t, n, i, a) {
            var r;
            return '<section class="m_papa_iframe m_papa papa-item clearfix">\r\n    <div class="m_papa_iframe_wrap">\r\n         <iframe src="' + e.escapeExpression((r = null != (r = n.link || (null != t ? t.link : t)) ? r : n.helperMissing, "function" == typeof r ? r.call(null != t ? t : {}, {
                        name: "link", hash: {}, data: a
                    }) : r)) + '" frameborder="0" allowtransparency="true" scrolling="no"></iframe>\r\n    </div>\r\n</section>'
        }, useData: !0
    }), t.listmore_tpl = e({
        compiler: [7, ">= 4.0.0"], main: function (e, t, n, i, a) {
            return '<div class="list-more">\r\n    <div class="loading-wrap">\r\n        <div class="loading">\r\n            <div class="loading-icon iconfont">&#xe600;</div>\r\n        </div>\r\n        <div class="loadtext">\u6b63\u5728\u52a0\u8f7d\u66f4\u591a</div>\r\n    </div>\r\n</div>'
        }, useData: !0
    }), t.noAD_tpl = e({
        1: function (e, t, n, i, a) {
            return 'target="_blank"'
        }, compiler: [7, ">= 4.0.0"], main: function (e, t, n, i, a) {
            var r, o, s, c = '<section class="m_papa_no m_papa papa-item clearfix">\r\n<a ';
            return o = null != (o = n.notIosSafari || (null != t ? t.notIosSafari : t)) ? o : n.helperMissing, s = {
                name: "notIosSafari",
                hash: {},
                fn: e.program(1, a, 0),
                inverse: e.noop,
                data: a
            }, r = "function" == typeof o ? o.call(null != t ? t : {}, s) : o, n.notIosSafari || (r = n.blockHelperMissing.call(t, r, s)), null != r && (c += r), c + ' href="http://3g.163.com/ntes/special/003417TF/suggest_test.html?from=index.flow">\r\n    <div class="m_papa_img">\r\n        <img src="http://img2.cache.netease.com/f2e/wap/touch/trunk/common/images/no_papa.png" onclick="javascript:return false;">\r\n    </div>\r\n    <div class="m_papa_info">\r\n        <div class="m_papa_title">\r\n            \u63d0\u5efa\u8bae\uff0c\u53d1\u7ea2\u5305\r\n        </div>\r\n\r\n        <div class="m_papa_desc clearfix">\r\n            <div class="m_papa_desc_l">\r\n                <span class="m_papa_promote">\u63a8\u5e7f</span>\r\n                <span class="m_papa_time">3\u5c0f\u65f6\u524d</span>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</a>\r\n</section>'
        }, useData: !0
    }), t.openList_tpl = e({
        1: function (e, t, n, i, a) {
            return 'target="_blank"'
        }, compiler: [7, ">= 4.0.0"], main: function (e, t, n, i, a) {
            var r, o, s, c = null != t ? t : {}, l = n.helperMissing, u = "function", h = e.escapeExpression, d = n.blockHelperMissing, p = '<section class="o_article js-shareinfo" data-title=' + h((o = null != (o = n.title || (null != t ? t.title : t)) ? o : l, typeof o === u ? o.call(c, {
                        name: "title",
                        hash: {},
                        data: a
                    }) : o)) + " data-desc=" + h((o = null != (o = n.description || (null != t ? t.description : t)) ? o : l, typeof o === u ? o.call(c, {
                        name: "description",
                        hash: {},
                        data: a
                    }) : o)) + " data-img=" + h((o = null != (o = n.picUrl || (null != t ? t.picUrl : t)) ? o : l, typeof o === u ? o.call(c, {
                        name: "picUrl",
                        hash: {},
                        data: a
                    }) : o)) + " data-url=" + h((o = null != (o = n.pageUrl || (null != t ? t.pageUrl : t)) ? o : l, typeof o === u ? o.call(c, {
                        name: "pageUrl",
                        hash: {},
                        data: a
                    }) : o)) + "?plid=" + h((o = null != (o = n.plid || (null != t ? t.plid : t)) ? o : l, typeof o === u ? o.call(c, {
                        name: "plid",
                        hash: {},
                        data: a
                    }) : o)) + "&rid=" + h((o = null != (o = n.rid || (null != t ? t.rid : t)) ? o : l, typeof o === u ? o.call(c, {
                        name: "rid",
                        hash: {},
                        data: a
                    }) : o)) + ">\r\n    <a ";
            return o = null != (o = n.notIosSafari || (null != t ? t.notIosSafari : t)) ? o : l, s = {
                name: "notIosSafari",
                hash: {},
                fn: e.program(1, a, 0),
                inverse: e.noop,
                data: a
            }, r = typeof o === u ? o.call(c, s) : o, n.notIosSafari || (r = d.call(t, r, s)), null != r && (p += r), p += ' href="' + h((o = null != (o = n.link || (null != t ? t.link : t)) ? o : l, typeof o === u ? o.call(c, {
                        name: "link",
                        hash: {},
                        data: a
                    }) : o)) + "?plid=" + h((o = null != (o = n.plid || (null != t ? t.plid : t)) ? o : l, typeof o === u ? o.call(c, {
                        name: "plid",
                        hash: {},
                        data: a
                    }) : o)) + "&rid=" + h((o = null != (o = n.rid || (null != t ? t.rid : t)) ? o : l, typeof o === u ? o.call(c, {
                        name: "rid",
                        hash: {},
                        data: a
                    }) : o)) + '">\r\n        <div class="o_article_img">\r\n            <img src="' + h((o = null != (o = n.picUrl || (null != t ? t.picUrl : t)) ? o : l, typeof o === u ? o.call(c, {
                        name: "picUrl",
                        hash: {},
                        data: a
                    }) : o)) + '" alt="" />\r\n            <div class="o_article_length">\r\n                <span class="o_article_length_icon"></span>\r\n                <span class="o_article_length_value">' + h((o = null != (o = n.quantity || (null != t ? t.quantity : t)) ? o : l, typeof o === u ? o.call(c, {
                        name: "quantity",
                        hash: {},
                        data: a
                    }) : o)) + '</span>\r\n            </div>\r\n        </div>\r\n    </a>\r\n    <div class="o_article_info">\r\n        <div class="o_article_infot">\r\n            <span class="o_article_tag" style="background:' + h((o = null != (o = n.tagBgColor || (null != t ? t.tagBgColor : t)) ? o : l, typeof o === u ? o.call(c, {
                        name: "tagBgColor",
                        hash: {},
                        data: a
                    }) : o)) + '">' + h((o = null != (o = n.courseType || (null != t ? t.courseType : t)) ? o : l, typeof o === u ? o.call(c, {
                        name: "courseType",
                        hash: {},
                        data: a
                    }) : o)) + '</span>\r\n            <span class="o_article_time">' + h((n.date_format || t && t.date_format || l).call(c, null != t ? t.dbCreateTime : t, {
                        name: "date_format",
                        hash: {},
                        data: a
                    })) + "</span>\r\n        </div>\r\n        <a ", o = null != (o = n.notIosSafari || (null != t ? t.notIosSafari : t)) ? o : l, s = {
                name: "notIosSafari",
                hash: {},
                fn: e.program(1, a, 0),
                inverse: e.noop,
                data: a
            }, r = typeof o === u ? o.call(c, s) : o, n.notIosSafari || (r = d.call(t, r, s)), null != r && (p += r), p + ' href="' + h((o = null != (o = n.link || (null != t ? t.link : t)) ? o : l, typeof o === u ? o.call(c, {
                name: "link",
                hash: {},
                data: a
            }) : o)) + "?plid=" + h((o = null != (o = n.plid || (null != t ? t.plid : t)) ? o : l, typeof o === u ? o.call(c, {
                name: "plid",
                hash: {},
                data: a
            }) : o)) + "&rid=" + h((o = null != (o = n.rid || (null != t ? t.rid : t)) ? o : l, typeof o === u ? o.call(c, {
                name: "rid",
                hash: {},
                data: a
            }) : o)) + '">\r\n            <div class="o_article_title">\r\n                <span>' + h((o = null != (o = n.title || (null != t ? t.title : t)) ? o : l, typeof o === u ? o.call(c, {
                name: "title",
                hash: {},
                data: a
            }) : o)) + '</span>\r\n            </div>\r\n            <div class="o_article_desc">\r\n                <span>' + h((o = null != (o = n.description || (null != t ? t.description : t)) ? o : l, typeof o === u ? o.call(c, {
                name: "description",
                hash: {},
                data: a
            }) : o)) + '</span>\r\n            </div>\r\n        </a>\r\n        <div class="o_article_infob clearfix">\r\n            <span class="o_article_playtimes">' + h((n.fixThousands || t && t.fixThousands || l).call(c, null != t ? t.viewcount : t, {
                name: "fixThousands",
                hash: {},
                data: a
            })) + '</span>\u4eba\u89c2\u770b\r\n            <span class="o_share_btn js-sharebtn"></span>\r\n        </div>\r\n    </div>\r\n</section>'
        }, useData: !0
    }), t.photosetAD_tpl = e({
        1: function (e, t, n, i, a) {
            return 'target="_blank"'
        }, 3: function (e, t, n, i, a) {
            return '                    <img src="' + e.escapeExpression(e.lambda(null != t ? t.url : t, t)) + '"">\r\n'
        }, compiler: [7, ">= 4.0.0"], main: function (e, t, n, i, a) {
            var r, o, s, c = null != t ? t : {}, l = n.helperMissing, u = "function", h = e.escapeExpression, d = '<section class="m_papa_m1 m_papa papa-item clearfix" id="' + h((o = null != (o = n.docid || (null != t ? t.docid : t)) ? o : l, typeof o === u ? o.call(c, {
                        name: "docid",
                        hash: {},
                        data: a
                    }) : o)) + '">\r\n    <a ';
            return o = null != (o = n.notIosSafari || (null != t ? t.notIosSafari : t)) ? o : l, s = {
                name: "notIosSafari",
                hash: {},
                fn: e.program(1, a, 0),
                inverse: e.noop,
                data: a
            }, r = typeof o === u ? o.call(c, s) : o, n.notIosSafari || (r = n.blockHelperMissing.call(t, r, s)), null != r && (d += r), d + ' href="' + h((o = null != (o = n.link || (null != t ? t.link : t)) ? o : l, typeof o === u ? o.call(c, {
                name: "link",
                hash: {},
                data: a
            }) : o)) + '" >\r\n        <div class="m_papa_title">\r\n            ' + h((o = null != (o = n.title || (null != t ? t.title : t)) ? o : l, typeof o === u ? o.call(c, {
                name: "title",
                hash: {},
                data: a
            }) : o)) + '\r\n            <span class="m_papa_promote">' + h((o = null != (o = n.source || (null != t ? t.source : t)) ? o : l, typeof o === u ? o.call(c, {
                name: "source",
                hash: {},
                data: a
            }) : o)) + '</span>\r\n        </div>\r\n        <div class="m_papa_pic">\r\n            <div class="m_papa_pic_wrap clearfix">\r\n' + (null != (r = n.each.call(c, null != t ? t.pic_info : t, {
                name: "each",
                hash: {},
                fn: e.program(3, a, 0),
                inverse: e.noop,
                data: a
            })) ? r : "") + "            </div>\r\n        </div>\r\n    </a>\r\n</section>"
        }, useData: !0
    }), t.photosetchild_tpl = e({
        compiler: [7, ">= 4.0.0"], main: function (e, t, n, i, a) {
            return '<div class="childchannel-photoset swipe-content">\r\n    <div class="u_p_items">\r\n        <div class="item_cell childchannel_beauty" data-scn="beauty" data-cnn="beauty">\r\n            <div class="img_box"><span class="channel_font iconfont">&#xe613;</span></div>\r\n            <div class="channel_title">\u7f8e\u56fe</div>\r\n        </div>\r\n        <div class="item_cell childchannel_news" data-scn="news" data-cnn="news">\r\n            <div class="img_box"><span class="channel_font iconfont">&#xe612;</span></div>\r\n            <div class="channel_title">\u65b0\u95fb</div>\r\n        </div>\r\n        <div class="item_cell childchannel_star" data-scn="star" data-cnn="star">\r\n            <div class="img_box"><span class="channel_font iconfont">&#xe614;</span></div>\r\n            <div class="channel_title">\u660e\u661f</div>\r\n        </div>\r\n        <div class="item_cell childchannel_sports" data-scn="sports" data-cnn="sports">\r\n            <div class="img_box"><span class="channel_font iconfont">&#xe611;</span></div>\r\n            <div class="channel_title">\u4f53\u575b</div>\r\n        </div>\r\n        <div class="item_cell childchannel_all" data-scn="all" data-cnn="all">\r\n            <div class="img_box"><span class="channel_font iconfont">&#xe615;</span></div>\r\n            <div class="channel_title">\u70ed\u70b9</div>\r\n        </div>\r\n    </div>\r\n</div>'
        }, useData: !0
    }), t.photosetlist_tpl = e({
        compiler: [7, ">= 4.0.0"], main: function (e, t, n, i, a) {
            return '<div class="content-list swipe-content clearfix">\r\n    <div class="content-list-east"></div>\r\n    <div class="content-list-west"></div>\r\n</div>'
        }, useData: !0
    }), t.photoset_square_tpl = e({
        1: function (e, t, n, i, a) {
            return 'target="_blank"'
        }, 3: function (e, t, n, i, a) {
            return '                    <div class="m_photoset_square_desc_r">\r\n                        <span class="iconfont">&#xe606;</span>' + e.escapeExpression((n.tcounthandle || t && t.tcounthandle || n.helperMissing).call(null != t ? t : {}, null != t ? t.tcount : t, 9999, {
                        name: "tcounthandle",
                        hash: {},
                        data: a
                    })) + "\r\n                    </div>\r\n"
        }, compiler: [7, ">= 4.0.0"], main: function (e, t, n, i, a) {
            var r, o, s, c = null != t ? t : {}, l = n.helperMissing, u = "function", h = e.escapeExpression, d = '<section class="m_photoset_square m_article list-item clearfix" id="' + h((o = null != (o = n.docid || (null != t ? t.docid : t)) ? o : l, typeof o === u ? o.call(c, {
                        name: "docid",
                        hash: {},
                        data: a
                    }) : o)) + '">\r\n    <a ';
            return o = null != (o = n.notIosSafari || (null != t ? t.notIosSafari : t)) ? o : l, s = {
                name: "notIosSafari",
                hash: {},
                fn: e.program(1, a, 0),
                inverse: e.noop,
                data: a
            }, r = typeof o === u ? o.call(c, s) : o, n.notIosSafari || (r = n.blockHelperMissing.call(t, r, s)), null != r && (d += r), d + ' href="' + h((o = null != (o = n.link || (null != t ? t.link : t)) ? o : l, typeof o === u ? o.call(c, {
                name: "link",
                hash: {},
                data: a
            }) : o)) + '" >\r\n        <div class="m_photoset_square_img">\r\n            <img src="' + h((n.getone || t && t.getone || l).call(c, null != t ? t.pic_info : t, 0, "url", {
                name: "getone",
                hash: {},
                data: a
            })) + '">\r\n        </div>\r\n        <div class="m_photoset_square_info">\r\n            <div class="m_photoset_square_title">\r\n                <span>' + h((o = null != (o = n.title || (null != t ? t.title : t)) ? o : l, typeof o === u ? o.call(c, {
                name: "title",
                hash: {},
                data: a
            }) : o)) + '</span>\r\n            </div>\r\n            <div class="m_photoset_square_desc clearfix">\r\n                <div class="m_photoset_square_desc_l">\r\n                    <span class="iconfont">&#xe616;</span>' + h((o = null != (o = n.imgsum || (null != t ? t.imgsum : t)) ? o : l, typeof o === u ? o.call(c, {
                name: "imgsum",
                hash: {},
                data: a
            }) : o)) + "\r\n                </div>\r\n" + (null != (r = (n.nozero || t && t.nozero || l).call(c, null != t ? t.tcount : t, {
                name: "nozero",
                hash: {},
                fn: e.program(3, a, 0),
                inverse: e.noop,
                data: a
            })) ? r : "") + "            </div>\r\n        </div>\r\n    </a>\r\n</section>"
        }, useData: !0
    }), t.photoset_tpl = e({
        1: function (e, t, n, i, a) {
            return 'target="_blank"'
        }, 3: function (e, t, n, i, a) {
            return '                    <img src="' + e.escapeExpression(e.lambda(null != t ? t.url : t, t)) + '">\r\n'
        }, 5: function (e, t, n, i, a) {
            var r;
            return '                        <span class="m_article_channel">' + e.escapeExpression((r = null != (r = n.category || (null != t ? t.category : t)) ? r : n.helperMissing, "function" == typeof r ? r.call(null != t ? t : {}, {
                        name: "category",
                        hash: {},
                        data: a
                    }) : r)) + "</span>\r\n"
        }, 7: function (e, t, n, i, a) {
            return '                    <div class="m_article_desc_r">\r\n                        <div class="left_hands_desc">\r\n                            <span class="iconfont">&#xe606;</span>' + e.escapeExpression((n.tcounthandle || t && t.tcounthandle || n.helperMissing).call(null != t ? t : {}, null != t ? t.tcount : t, 9999, {
                        name: "tcounthandle",
                        hash: {},
                        data: a
                    })) + "\r\n                        </div>\r\n                    </div>\r\n"
        }, compiler: [7, ">= 4.0.0"], main: function (e, t, n, i, a) {
            var r, o, s, c = null != t ? t : {}, l = n.helperMissing, u = "function", h = e.escapeExpression, d = '<section class="m_photoset m_article list-item clearfix" id="' + h((o = null != (o = n.docid || (null != t ? t.docid : t)) ? o : l, typeof o === u ? o.call(c, {
                        name: "docid",
                        hash: {},
                        data: a
                    }) : o)) + '">\r\n    <a ';
            return o = null != (o = n.notIosSafari || (null != t ? t.notIosSafari : t)) ? o : l, s = {
                name: "notIosSafari",
                hash: {},
                fn: e.program(1, a, 0),
                inverse: e.noop,
                data: a
            }, r = typeof o === u ? o.call(c, s) : o, n.notIosSafari || (r = n.blockHelperMissing.call(t, r, s)), null != r && (d += r), d + ' href="' + h((o = null != (o = n.link || (null != t ? t.link : t)) ? o : l, typeof o === u ? o.call(c, {
                name: "link",
                hash: {},
                data: a
            }) : o)) + '" >\r\n        <div class="m_photoset_title">\r\n            ' + h((o = null != (o = n.title || (null != t ? t.title : t)) ? o : l, typeof o === u ? o.call(c, {
                name: "title",
                hash: {},
                data: a
            }) : o)) + '\r\n        </div>\r\n        <div class="m_photoset_pic">\r\n            <div class="m_photoset_pic_wrap clearfix">\r\n' + (null != (r = n.each.call(c, null != t ? t.pic_info : t, {
                name: "each",
                hash: {},
                fn: e.program(3, a, 0),
                inverse: e.noop,
                data: a
            })) ? r : "") + '            </div>\r\n        </div>\r\n        <div class="m_photoset_info">\r\n            <div class="m_article_desc clearfix">\r\n                <div class="m_article_desc_l">\r\n' + (null != (r = n["if"].call(c, null != t ? t.category : t, {
                name: "if",
                hash: {},
                fn: e.program(5, a, 0),
                inverse: e.noop,
                data: a
            })) ? r : "") + '                    <span class="m_article_time">' + h((n.getDvalueDay || t && t.getDvalueDay || l).call(c, null != t ? t.ptime : t, {
                name: "getDvalueDay",
                hash: {},
                data: a
            })) + "</span>\r\n                </div>\r\n" + (null != (r = (n.nozero || t && t.nozero || l).call(c, null != t ? t.tcount : t, {
                name: "nozero",
                hash: {},
                fn: e.program(7, a, 0),
                inverse: e.noop,
                data: a
            })) ? r : "") + "            </div>\r\n        </div>\r\n    </a>\r\n</section>"
        }, useData: !0
    }), t.QQshare_tpl = e({
        compiler: [7, ">= 4.0.0"], main: function (e, t, n, i, a) {
            return '<div class="QQ_share_show"></div>'
        }, useData: !0
    }), t.replylink_tpl = e({
        compiler: [7, ">= 4.0.0"], main: function (e, t, n, i, a) {
            var r, o = null != t ? t : {}, s = n.helperMissing, c = "function", l = e.escapeExpression;
            return "http://3g.163.com/touch/comment.html?docid=" + l((r = null != (r = n.docid || (null != t ? t.docid : t)) ? r : s, typeof r === c ? r.call(o, {
                        name: "docid",
                        hash: {},
                        data: a
                    }) : r)) + "&board=" + l((r = null != (r = n.board || (null != t ? t.board : t)) ? r : s, typeof r === c ? r.call(o, {
                        name: "board",
                        hash: {},
                        data: a
                    }) : r)) + "&title=" + l((r = null != (r = n.title || (null != t ? t.title : t)) ? r : s, typeof r === c ? r.call(o, {
                        name: "title",
                        hash: {},
                        data: a
                    }) : r))
        }, useData: !0
    }), t.share_tpl = e({
        compiler: [7, ">= 4.0.0"], main: function (e, t, n, i, a) {
            return '<div class="h5share_panel">\r\n	<span class="item wxzone js-schema" data-type="wxzone"><i class="iconfont">&#xe60b;</i></span>\r\n	<span class="item wb js-openurl" data-type="wb" data-uc="SinaWeibo" data-ios="kSinaWeibo"><i class="iconfont">&#xe60a;</i></span>\r\n	<span class="item qzone js-openurl" data-type="qq" data-uc="Qzone" data-ios="kQZone"><i class="iconfont">&#xe605;</i></span>\r\n	<span class="item wx js-schema" data-type="wx"><i class="iconfont">&#xe603;</i></span>\r\n	<span class="item yx js-openurl" data-type="yx"><i class="iconfont">&#xe604;</i></span>\r\n	<!-- <span class="item more-share" data-type="wxzone"><i class="iconfont">&#xe608;</i></span> -->\r\n</div>\r\n<div class="share_shutdown">\r\n<span>\u53d6\u6d88</span>\r\n</div>'
        }, useData: !0
    }), t.textAD_tpl = e({
        1: function (e, t, n, i, a) {
            return 'target="_blank"'
        }, compiler: [7, ">= 4.0.0"], main: function (e, t, n, i, a) {
            var r, o, s, c = null != t ? t : {}, l = n.helperMissing, u = "function", h = e.escapeExpression, d = '<section class="m_papa_m2 m_papa papa-item clearfix" id="' + h((o = null != (o = n.docid || (null != t ? t.docid : t)) ? o : l, typeof o === u ? o.call(c, {
                        name: "docid",
                        hash: {},
                        data: a
                    }) : o)) + '">\r\n    <div class="m_separate">\r\n        <div class="m_papa_content"><a ';
            return o = null != (o = n.notIosSafari || (null != t ? t.notIosSafari : t)) ? o : l, s = {
                name: "notIosSafari",
                hash: {},
                fn: e.program(1, a, 0),
                inverse: e.noop,
                data: a
            }, r = typeof o === u ? o.call(c, s) : o, n.notIosSafari || (r = n.blockHelperMissing.call(t, r, s)), null != r && (d += r), d + ' href="' + h((o = null != (o = n.link || (null != t ? t.link : t)) ? o : l, typeof o === u ? o.call(c, {
                name: "link",
                hash: {},
                data: a
            }) : o)) + '" >' + h((o = null != (o = n.title || (null != t ? t.title : t)) ? o : l, typeof o === u ? o.call(c, {
                name: "title",
                hash: {},
                data: a
            }) : o)) + '</a><span class="m_papa_promote">' + h((o = null != (o = n.source || (null != t ? t.source : t)) ? o : l, typeof o === u ? o.call(c, {
                name: "source",
                hash: {},
                data: a
            }) : o)) + "</span></div>\r\n    </div>\r\n</section>"
        }, useData: !0
    }), t.warning_box_tpl = e({
        compiler: [7, ">= 4.0.0"], main: function (e, t, n, i, a) {
            var r, o = null != t ? t : {}, s = n.helperMissing, c = "function", l = e.escapeExpression;
            return '<div class="warning_box">\r\n    <div class="warning_content">\r\n        <h1>' + l((r = null != (r = n.title || (null != t ? t.title : t)) ? r : s, typeof r === c ? r.call(o, {
                        name: "title",
                        hash: {},
                        data: a
                    }) : r)) + "</h1>\r\n        <p>" + l((r = null != (r = n.info || (null != t ? t.info : t)) ? r : s, typeof r === c ? r.call(o, {
                        name: "info",
                        hash: {},
                        data: a
                    }) : r)) + '</p>\r\n    </div>\r\n    <div class="warning_btn">\r\n        <div class="warning_cancel">' + l((r = null != (r = n.cancel || (null != t ? t.cancel : t)) ? r : s, typeof r === c ? r.call(o, {
                        name: "cancel",
                        hash: {},
                        data: a
                    }) : r)) + '</div>\r\n        <div class="warning_enter">' + l((r = null != (r = n.enter || (null != t ? t.enter : t)) ? r : s, typeof r === c ? r.call(o, {
                        name: "enter",
                        hash: {},
                        data: a
                    }) : r)) + "</div>\r\n    </div>\r\n</div>"
        }, useData: !0
    }), t.weixinshare_tpl = e({
        compiler: [7, ">= 4.0.0"], main: function (e, t, n, i, a) {
            return '<div class="weixin_share_show"></div>'
        }, useData: !0
    })
}(), function (e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.StateMan = t() : e.StateMan = t()
}(this, function () {
    return function (e) {
        function t(i) {
            if (n[i])return n[i].exports;
            var a = n[i] = {exports: {}, id: i, loaded: !1};
            return e[i].call(a.exports, a, a.exports, t), a.loaded = !0, a.exports
        }

        var n = {};
        return t.m = e, t.c = n, t.p = "", t(0)
    }([function (e, t, n) {
        var i = n(1);
        i.Histery = n(4), i.util = n(3), i.State = n(2), e.exports = i
    }, function (e, t, n) {
        function i(e) {
            return this instanceof i == !1 ? new i(e) : (e = e || {}, this._states = {}, this._stashCallback = [], this.strict = e.strict, this.current = this.active = this, this.title = e.title, void this.on("end", function () {
                for (var e, t = this.current; t && !(e = t.title);)t = t.parent;
                document.title = "function" == typeof e ? t.title() : String(e || s)
            }))
        }

        var a = n(2), r = n(4), o = (n(5), n(3)), s = document.title, c = a.prototype.state;
        o.extend(o.emitable(i), {
            name: "", state: function (e, t) {
                var n = this.active;
                return "string" == typeof e && n && (e = e.replace("~", n.name), n.parent && (e = e.replace("^", n.parent.name || ""))), c.apply(this, arguments)
            }, start: function (e) {
                return this.history || (this.history = new r(e)), this.history.isStart || (this.history.on("change", o.bind(this._afterPathChange, this)), this.history.start()), this
            }, stop: function () {
                this.history.stop()
            }, go: function (e, t, n) {
                if (t = t || {}, "string" == typeof e && (e = this.state(e)), e) {
                    if ("function" == typeof t && (n = t, t = {}), t.encode !== !1) {
                        var i = e.encode(t.param);
                        t.path = i, this.nav(i, {silent: !0, replace: t.replace})
                    }
                    return this._go(e, t, n), this
                }
            }, nav: function (e, t, n) {
                return "function" == typeof t && (n = t, t = {}), t = t || {}, t.path = e, this.history.nav(e, o.extend({silent: !0}, t)), t.silent || this._afterPathChange(o.cleanPath(e), t, n), this
            }, decode: function (e) {
                var t = e.split("?"), n = this._findQuery(t[1]);
                e = t[0];
                var i = this._findState(this, e);
                return i && o.extend(i.param, n), i
            }, encode: function (e, t) {
                var n = this.state(e);
                return n ? n.encode(t) : ""
            }, is: function (e, t, n) {
                if (!e)return !1;
                var e = e.name || e, i = this.current, a = i.name, r = n ? a === e : 0 === (a + ".").indexOf(e + ".");
                return r && (!t || o.eql(t, this.param))
            }, _afterPathChange: function (e, t, n) {
                this.emit("history:change", e);
                var i = this.decode(e);
                return t = t || {}, t.path = e, i ? (t.param = i.param, void this._go(i, t, n)) : this._notfound(t)
            }, _notfound: function (e) {
                return this.emit("notfound", e)
            }, _go: function (e, t, n) {
                function i(e) {
                    a = !0, e !== !1 && l.emit("end"), l.pending = null, l._popStash(t)
                }

                var a;
                if (e.hasNext && this.strict)return this._notfound({name: e.name});
                t.param = t.param || {};
                var r = this.current, s = this._findBase(r, e), c = this.path, l = this;
                "function" == typeof n && this._stashCallback.push(n), t.previous = r, t.current = e, r !== e && (t.stop = function () {
                    i(!1), l.nav(c ? c : "/", {silent: !0})
                }, l.emit("begin", t)), a !== !0 && (r !== e ? (t.phase = "permission", this._walk(r, e, t, !0, o.bind(function (n) {
                    return n === !1 ? (c && this.nav(c, {silent: !0}), i(!1, 2), this.emit("abort", t)) : (this.pending && this.pending.stop(), this.pending = t, this.path = t.path, this.current = t.current, this.param = t.param, this.previous = t.previous, t.phase = "navigation", void this._walk(r, e, t, !1, o.bind(function (e) {
                        return e === !1 ? (this.current = this.active, i(!1), this.emit("abort", t)) : (this.active = t.current, t.phase = "completion", i())
                    }, this)))
                }, this))) : (l._checkQueryAndParam(s, t), this.pending = null, i()))
            }, _popStash: function (e) {
                var t = this._stashCallback, n = t.length;
                if (this._stashCallback = [], n)for (var i = 0; n > i; i++)t[i].call(this, e)
            }, _walk: function (e, t, n, i, a) {
                var r = this._findBase(e, t);
                n.basckward = !0, this._transit(e, r, n, i, o.bind(function (e) {
                    return e === !1 ? a(e) : (i || this._checkQueryAndParam(r, n), n.basckward = !1, void this._transit(r, t, n, i, a))
                }, this))
            }, _transit: function (e, t, n, i, a) {
                if (e === t)return a();
                var r, s = e.name.length > t.name.length, c = s ? "leave" : "enter";
                i && (c = "can" + c.replace(/^\w/, function (e) {
                            return e.toUpperCase()
                        }));
                var l = o.bind(function (i) {
                    return r === t || i === !1 ? a(i) : (r = r ? this._computeNext(r, t) : s ? e : this._computeNext(e, t), s && r === t || !r ? a(i) : void this._moveOn(r, c, n, l))
                }, this);
                l()
            }, _moveOn: function (e, t, n, i) {
                function a(e) {
                    r || (s = !1, r = !0, i(e))
                }

                var r = !1, s = !1;
                n.async = function () {
                    return s = !0, a
                }, n.stop = function () {
                    a(!1)
                }, this.active = e;
                var c = e[t] ? e[t](n) : !0;
                return "enter" === t && (e.visited = !0), o.isPromise(c) ? this._wrapPromise(c, a) : void(s || a(c))
            }, _wrapPromise: function (e, t) {
                return e.then(t, function () {
                    t(!1)
                })
            }, _computeNext: function (e, t) {
                var n = e.name, i = t.name, a = i.split("."), r = n.split("."), o = a.length, s = r.length;
                return "" === n && (s = 0), "" === i && (o = 0), o > s ? r[s] = a[s] : r.pop(), this.state(r.join("."))
            }, _findQuery: function (e) {
                var t = e && e.split("&"), n = {};
                if (t)for (var i = t.length, n = {}, a = 0; i > a; a++) {
                    var r = t[a].split("=");
                    n[r[0]] = r[1]
                }
                return n
            }, _findState: function (e, t) {
                var n, i, a = e._states;
                if (e.hasNext)for (var r in a)if (a.hasOwnProperty(r) && (n = this._findState(a[r], t)))return n;
                return i = e.regexp && e.decode(t), i ? (e.param = i, e) : !1
            }, _findBase: function (e, t) {
                if (!e || !t || e == this || t == this)return this;
                for (var n, i = e, a = t; i && a;) {
                    for (n = a; n;) {
                        if (i === n)return n;
                        n = n.parent
                    }
                    i = i.parent
                }
            }, _checkQueryAndParam: function (e, t) {
                for (var n = e; n !== this;)n.update && n.update(t), n = n.parent
            }
        }, !0), e.exports = i
    }, function (e, t, n) {
        function i(e) {
            this._states = {}, this._pending = !1, this.visited = !1, e && this.config(e)
        }

        var a = n(3);
        i.rCache = {}, a.extend(a.emitable(i), {
            state: function (e, t) {
                if ("object" === a.typeOf(e)) {
                    for (var n in e)this.state(n, e[n]);
                    return this
                }
                var r, o, s, c = this._states, n = 0;
                "string" == typeof e && (e = e.split("."));
                var l = e.length, r = this, u = [];
                do {
                    if (s = e[n], o = c[s], u.push(s), !o) {
                        if (!t)return;
                        o = c[s] = new i, a.extend(o, {
                            parent: r,
                            manager: r.manager || r,
                            name: u.join("."),
                            currentName: s
                        }), r.hasNext = !0, o.configUrl()
                    }
                    r = o, c = o._states
                } while (++n < l);
                return t ? (o.config(t), this) : r
            }, config: function (e) {
                e = this._getConfig(e);
                for (var t in e) {
                    var n = e[t];
                    switch (t) {
                        case"url":
                            "string" == typeof n && (this.url = n, this.configUrl());
                            break;
                        case"events":
                            this.on(n);
                            break;
                        default:
                            this[t] = n
                    }
                }
            }, _getConfig: function (e) {
                return "function" == typeof e ? {enter: e} : e
            }, configUrl: function () {
                for (var e = "", t = this; t;) {
                    if (e = ("string" == typeof t.url ? t.url : t.currentName || "") + "/" + e, 0 === e.indexOf("^/")) {
                        e = e.slice(1);
                        break
                    }
                    t = t.parent
                }
                this.pattern = a.cleanPath("/" + e);
                var n = this.pattern.split("?");
                this.pattern = n[0], a.extend(this, a.normalize(this.pattern), !0)
            }, encode: function (e) {
                var t = this;
                e = e || {};
                var n = "%", i = t.matches.replace(/\(([\w-]+)\)/g, function (t, i) {
                            var a = e[i] || "";
                            return n += i + "%", a
                        }) + "?";
                for (var r in e)-1 === n.indexOf("%" + r + "%") && (i += r + "=" + e[r] + "&");
                return a.cleanPath(i.replace(/(?:\?|&)$/, ""))
            }, decode: function (e) {
                var t = this.regexp.exec(e), n = this.keys;
                if (t) {
                    for (var i = {}, a = 0, r = n.length; r > a; a++)i[n[a]] = t[a + 1];
                    return i
                }
                return !1
            }, async: function () {
                throw new Error("please use option.async instead")
            }
        }), e.exports = i
    }, function (e, t) {
        function n(e) {
            var t = 0, n = [], a = 0, r = "";
            e = i.cleanPath(e);
            var o = e.replace(/\:([\w-]+)(?:\(([^\/]+?)\))?|(?:\(([^\/]+)\))|(\*{2,})|(\*(?!\*))/g, function (i, o, s, c, l, u, h) {
                return h > t && (r += e.slice(t, h)), t = h + i.length, o ? (r += "(" + o + ")", n.push(o), "(" + (s || "[\\w-]+") + ")") : (r += "(" + a + ")", n.push(a++), c ? "(" + c + ")" : l ? "(.*)" : u ? "([^\\/]*)" : void 0)
            });
            return t !== e.length && (r += e.slice(t)), {regexp: new RegExp("^" + o + "/?$"), keys: n, matches: r || e}
        }

        var i = e.exports = {}, a = [].slice, r = {}.toString;
        i.extend = function (e, t, n) {
            for (var i in t)(n || void 0 === e[i]) && (e[i] = t[i]);
            return e
        }, i.slice = function (e, t) {
            return a.call(e, t)
        }, i.typeOf = function (e) {
            return null == e ? String(e) : r.call(e).slice(8, -1).toLowerCase()
        }, i.eql = function (e, t) {
            var n = i.typeOf(e), a = i.typeOf(t);
            if (n !== a)return !1;
            if ("object" === n) {
                var r = !0;
                for (var o in e)e[o] !== t[o] && (r = !1);
                return r
            }
            return e === t
        }, i.emitable = function () {
            function e(e) {
                var t = (e || "").split(":");
                return {event: t[0], namespace: t[1]}
            }

            var t = {
                once: function (e, t) {
                    var n = function () {
                        t.apply(this, arguments), this.off(e, n)
                    };
                    return this.on(e, n)
                }, on: function (t, n) {
                    if ("object" == typeof t) {
                        for (var i in t)this.on(i, t[i]);
                        return this
                    }
                    var a = e(t);
                    if (t = a.event, t && "function" == typeof n) {
                        var r = this._handles || (this._handles = {}), o = r[t] || (r[t] = []);
                        n._ns = a.namespace, o.push(n)
                    }
                    return this
                }, off: function (t, n) {
                    var i = e(t);
                    t = i.event, t && this._handles || (this._handles = {});
                    var a, r = this._handles;
                    if (a = r[t])if (n || i.namespace) {
                        for (var o = 0, s = a.length; s > o; o++)if (!(n && n !== a[o] || i.namespace && a[o]._ns !== i.namespace))return a.splice(o, 1), this
                    } else r[t] = [];
                    return this
                }, emit: function (t) {
                    var n = e(t);
                    t = n.event;
                    var a, r = i.slice(arguments, 1), o = this._handles;
                    if (!o || !(a = o[t]))return this;
                    for (var s = 0, c = a.length; c > s; s++) {
                        var l = a[s];
                        n.namespace && l._ns !== n.namespace || l.apply(this, r)
                    }
                    return this
                }
            };
            return function (e) {
                return e = "function" == typeof e ? e.prototype : e, i.extend(e, t)
            }
        }(), i.bind = function (e, t) {
            return function () {
                return e.apply(t, arguments)
            }
        };
        var o = /\/+/g, s = /\/$/;
        i.cleanPath = function (e) {
            return ("/" + e).replace(o, "/").replace(s, "") || "/"
        }, i.log = function (e, t) {
            "undefined" != typeof console && console[t || "log"](e)
        }, i.isPromise = function (e) {
            return !!e && ("object" == typeof e || "function" == typeof e) && "function" == typeof e.then
        }, i.normalize = n
    }, function (e, t, n) {
        function i(e) {
            e = e || {}, this.location = e.location || a.location, this.html5 = e.html5, this.mode = e.html5 && a.history ? c : s, a.hash || (this.mode = o), e.mode && (this.mode = e.mode), this.prefix = "#" + (e.prefix || ""), this.rPrefix = new RegExp(this.prefix + "(.*)$"), this.interval = e.interval || 66, this.root = e.root || "/", this.rRoot = new RegExp("^" + this.root), this._fixInitState(), this.autolink = e.autolink !== !1, this.curPath = void 0
        }

        var a = n(5), r = n(3), o = 3, s = 1, c = 2;
        r.extend(r.emitable(i), {
            start: function () {
                var e = this.getPath();
                if (this._checkPath = r.bind(this.checkPath, this), !this.isStart) {
                    switch (this.isStart = !0, this.mode === o && this._fixHashProbelm(e), this.mode) {
                        case s:
                            a.on(window, "hashchange", this._checkPath);
                            break;
                        case c:
                            a.on(window, "popstate", this._checkPath);
                            break;
                        case o:
                            this._checkLoop()
                    }
                    this.autolink && this._autolink(), this.curPath = e, this.emit("change", e)
                }
            }, stop: function () {
                a.off(window, "hashchange", this._checkPath), a.off(window, "popstate", this._checkPath), clearTimeout(this.tid), this.isStart = !1, this._checkPath = null
            }, checkPath: function (e) {
                var t = this.getPath(), n = this.curPath;
                t === n && this.iframe && (t = this.getPath(this.iframe.location)), t !== n && (this.iframe && this.nav(t, {silent: !0}), this.curPath = t, this.emit("change", t))
            }, getPath: function (e) {
                var t, e = e || this.location;
                return this.mode !== c ? (t = e.href.match(this.rPrefix), t && t[1] ? t[1] : "") : r.cleanPath((e.pathname + e.search || "").replace(this.rRoot, "/"))
            }, nav: function (e, t) {
                var n = this.iframe;
                t = t || {}, e = r.cleanPath(e), this.curPath != e && (this.curPath = e, this.mode !== c ? (this._setHash(this.location, e, t.replace), n && this.getPath(n.location) !== e && (t.replace || n.document.open().close(), this._setHash(this.iframe.location, e, t.replace))) : history[t.replace ? "replaceState" : "pushState"]({}, t.title || "", r.cleanPath(this.root + e) + window.location.search), t.silent || this.emit("change", e))
            }, _autolink: function () {
                if (this.mode === c) {
                    var e = (this.prefix, this);
                    a.on(document.body, "click", function (t) {
                        var n = t.target || t.srcElement;
                        if ("a" === n.tagName.toLowerCase()) {
                            var i = (a.getHref(n) || "").match(e.rPrefix), r = i && i[1] ? i[1] : "";
                            if (r)return t.preventDefault && t.preventDefault(), e.nav(r), t.returnValue = !1
                        }
                    })
                }
            }, _setHash: function (e, t, n) {
                var i = e.href.replace(/(javascript:|#).*$/, "");
                n ? e.replace(i + this.prefix + t) : e.hash = this.prefix + t
            }, _checkLoop: function () {
                var e = this;
                this.tid = setTimeout(function () {
                    e._checkPath(), e._checkLoop()
                }, this.interval)
            }, _fixInitState: function () {
                var e, t, n = r.cleanPath(this.location.pathname);
                this.mode !== c && this.html5 ? (t = n.replace(this.rRoot, ""), t && this.location.replace(this.root + this.prefix + t)) : this.mode === c && (e = this.location.hash.replace(this.prefix, ""), e && history.replaceState({}, document.title, r.cleanPath(this.root + e)))
            }, _fixHashProbelm: function (e) {
                var t = document.createElement("iframe"), n = document.body;
                t.src = "javascript:;", t.style.display = "none", t.tabIndex = -1, t.title = "", this.iframe = n.insertBefore(t, n.firstChild).contentWindow, this.iframe.document.open().close(), this.iframe.location.hash = "#" + e
            }
        }), e.exports = i
    }, function (e, t) {
        var n = window, i = document;
        e.exports = {
            hash: "onhashchange" in n && (!i.documentMode || i.documentMode > 7),
            history: n.history && "onpopstate" in n,
            location: n.location,
            getHref: function (e) {
                return "href" in e ? e.getAttribute("href", 2) : e.getAttribute("href")
            },
            on: "addEventListener" in n ? function (e, t, n) {
                return e.addEventListener(t, n)
            } : function (e, t, n) {
                return e.attachEvent("on" + t, n)
            },
            off: "removeEventListener" in n ? function (e, t, n) {
                return e.removeEventListener(t, n)
            } : function (e, t, n) {
                return e.detachEvent("on" + t, n)
            }
        }
    }])
}), function (e, t, n) {
    for (var i, a = 0, r = "webkit moz ms o".split(" "), o = window.requestAnimationFrame, s = window.cancelAnimationFrame, c = 0; c < r.length && (!o || !s); c++)i = r[c], o = o || window[i + "RequestAnimationFrame"], s = s || window[i + "CancelAnimationFrame"] || window[i + "CancelRequestAnimationFrame"];
    o && s || (o = function (e, t) {
        var n = (new Date).getTime(), i = Math.max(0, 16 - (n - a)), r = window.setTimeout(function () {
            e(n + i)
        }, i);
        return a = n + i, r
    }, s = function (e) {
        window.clearTimeout(e)
    }), window.requestAnimationFrame = o, window.cancelAnimationFrame = s, t.tools = {
        uaMatch: {
            iOS5: null != navigator.userAgent.match(/OS 5_/i),
            isIos9: null != navigator.userAgent.match(/OS 9_/i),
            isIphone: !!navigator.userAgent.match(/iphone/gi),
            isIos: !!navigator.userAgent.match(/iphone|ipad/gi),
            isIpad: !!navigator.userAgent.match(/ipad/gi),
            isNewsapp: !!navigator.userAgent.match(/NewsApp/gi),
            isWinPhone: !!navigator.userAgent.match(/Windows Phone/gi),
            isWeixin: !!navigator.userAgent.match(/MicroMessenger/gi),
            isSogou: !!navigator.userAgent.match(/sogoumobilebrowser/gi),
            isUCBrowser: !!navigator.userAgent.match(/UCBrowser/gi),
            isQQBrowser: !!navigator.userAgent.match(/MQQBrowser/gi),
            isBaidu: !!navigator.userAgent.match(/baidu/gi),
            isTrident: navigator.userAgent.indexOf("Trident") > -1,
            isPresto: navigator.userAgent.indexOf("Presto") > -1,
            isWebKit: navigator.userAgent.indexOf("AppleWebKit") > -1,
            isGecko: navigator.userAgent.indexOf("Gecko") > -1 && -1 == navigator.userAgent.indexOf("KHTML"),
            isMobile: !!navigator.userAgent.match(/AppleWebKit.*Mobile.*/),
            isTIOS: !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
            isAndroid: navigator.userAgent.indexOf("Android") > -1 || navigator.userAgent.indexOf("Adr") > -1,
            iswebApp: -1 == navigator.userAgent.indexOf("Safari"),
            isQQ: !!navigator.userAgent.match(/QQ\//i),
            isIosSafari: function () {
                var e = navigator.userAgent, t = /applewebkit\/\d+(\.\d+)*\d+\s*\(KHTML,\s*like\s*Gecko\)\s*version\/\d+(\.\d+)*\.\d+\s*mobile\/\d+\w\d+\s*safari\/\d+(\.\d+)*\.\d+$/i, n = window.hasOwnProperty("isLBBrowser");
                return t.test(e) && !n
            }()
        }, publicMethod: {
            localParam: function (e, t) {
                var n;
                return e = e || window.location.search, t = t || window.location.hash, n = function (e, t) {
                    var n;
                    return e ? (n = {}, e.replace(t, function (e, t, i, a) {
                        n[t] = a
                    }), n) : void 0
                }, {
                    search: n(e, new RegExp("([^?=&]+)(=([^&]*))?", "g")) || {},
                    hash: n(t, new RegExp("([^#=&]+)(=([^&]*))?", "g")) || {}
                }
            }, preDefault: function (e) {
                e.preventDefault()
            }, fetchdata: function (n, i, a) {
                function r(n, i) {
                    n ? e.ajax(i) : t.AJAX = t.DP.ajax(i)
                }

                var o = this;
                1 === arguments.length && "function" == typeof n && (i = n, n = {}), n = "object" == typeof n ? n : {};
                var s = n.offset || 0, c = n.size || 10, l = n.channel || "0001", u = n.url, h = void 0 === n.cache ? !0 : n.cache, d = n.child || "all", p = (n.abort,
                        !!n.notformat), f = "undefined" == typeof n.useflag ? !0 : n.useflag, m = {
                    type: n.type || "GET",
                    cache: h,
                    url: u || "newap_article_list?offset=" + s + "&size=" + c + "&channel=" + l + "&child=" + d,
                    dataType: n.dataType || "jsonp",
                    success: function (e) {
                        o._runflag = !1, i && i.call(o, e)
                    },
                    error: function (e) {
                        o._runflag = !1, a && a.call(o)
                    }
                };
                f ? 0 == this._runflag && (this._runflag = !0, r(p, m)) : r(p, m)
            }, fetch: function (n) {
                function i(n, i) {
                    n ? e.ajax(i) : t.AJAX = t.DP.ajax(i)
                }

                var a, r, o = this, s = "newap_article_list", c = n.DPData || {}, l = n.success, u = n.error, h = e.Deferred(), d = !!n.notformat, p = "undefined" == typeof n.useflag ? !0 : n.useflag;
                return c.offset = c.offset || 0, c.size = c.size || 10, n.url ? (a = n.url + "?", d || e.each(c, function (e, t) {
                    a += e + "=" + t + "&"
                })) : (a = s + "?", e.each(c, function (e, t) {
                    a += e + "=" + t + "&"
                })), a = a.slice(0, -1), n.url = a, r = e.extend(n, {
                    success: function (e) {
                        o._runflag = !1, h.resolve(e), l && l.call(o, e)
                    }, error: function (e) {
                        o._runflag = !1, h.reject(e), u && u.call(o, e)
                    }
                }), p ? this._runflag || (this._runflag = !0, i(d, r)) : i(d, r), h
            }, jsonp: function (t, n) {
                var i, a = document.getElementsByTagName("head")[0], r = t.callbackName, o = t.url, s = t.isDeferred || !0;
                s && (i = e.Deferred && e.Deferred()), window[r] = void 0, window[r] = function (e) {
                    a.removeChild(c), n && n(e), i && i.resolve(e)
                };
                var c = document.createElement("script");
                return c.src = o, a.appendChild(c), c.onerror = function (e) {
                    a.removeChild(c), i && i.reject(e)
                }, i && i.promise()
            }, generateHtml: function (t, i, a, r) {
                var o, s, c, l, u = "", h = r ? t.find("section").length : 0, d = [], p = 0;
                if ("string" == typeof a && (r = a, a = void 0), "object" == e.type(i)) {
                    if (a) {
                        var f, m = a.focus ? a.focus : [];
                        for (o = m ? this.arrToObj(m, "adposition") : {}, c = i.data.slice(0, 3), l = c.length + m.slice(0, c.length).length; d.length < l;)p += 1, o[p] ? d.push({
                            link: "#",
                            pic_info: [{url: "http://img1.cache.netease.com/f2e/wap/touch_index_rc/images/bg_img_sm.png"}]
                        }) : (f = c.shift(), d.push(f))
                    } else d = i.data;
                    try {
                        u = n.templates.headslide_tpl({data: d})
                    } catch (g) {
                        console.log(g)
                    }
                } else"array" == e.type(i) && (s = a && a.list ? this.arrToObj(a.list, "adposition") : {}, e.each(s, function (e, t) {
                    var n, a = parseInt(e) - 1;
                    a >= h && a <= h + i.length && (n = 0 == h ? a : a - h, i.splice(n, 0, t))
                }), e.each(i, function (e, t) {
                    if (t.type)if ("photoset" == t.type)try {
                        u += t.pic_info.length < 3 ? n.templates.doc_tpl(t) : n.templates.photoset_tpl(t)
                    } catch (i) {
                        console.log(i)
                    } else try {
                        u += n.templates[t.type + "_tpl"](t)
                    } catch (i) {
                        console.log(i)
                    } else if (void 0 !== t.adposition)try {
                        u += n.templates.noAD_tpl({})
                    } catch (i) {
                        console.log(i)
                    }
                }));
                "before" === r ? t.prepend(u) : "after" === r ? t.append(u) : t.html(u)
            }, getDayDvalue: function (t) {
                var n, i = "number" != e.type(t) ? t.replace(/\-/g, "/") : t, a = new Date(i).getTime(), r = (new Date).getTime(), o = r - a, s = Math.ceil(o / 1e3 / 60);
                return n = 60 > s ? s.toFixed() + "\u5206\u949f\u524d" : s >= 60 && 1440 > s ? (s / 60).toFixed() + "\u5c0f\u65f6\u524d" : s >= 1440 && 2880 > s ? "\u6628\u5929" : s >= 2880 && 4320 > s ? "\u524d\u5929" : "3\u5929\u524d"
            }, arrToObj: function (e, t) {
                for (var n = {}, i = 0, a = e.length; a > i; i++)e[i][t] && (n[e[i][t]] = e[i]);
                return n
            }, getDirection: function () {
                function e(e) {
                    i.x = e.touches[0].clientX, i.y = e.touches[0].clientY
                }

                function t(e) {
                    if (a.x = e.changedTouches[0].clientX - i.x, a.y = e.changedTouches[0].clientY - i.y, Math.abs(a.x) > Math.abs(a.y)) {
                        if (a.x > 0)return "right";
                        if (a.x < 0)return "left"
                    } else if (Math.abs(a.x) < Math.abs(a.y)) {
                        if (a.y > 0)return "bottom";
                        if (a.y < 0)return "top"
                    }
                }

                function n(e) {
                    a = {}
                }

                var i = {}, a = {};
                return {start: e, move: t, end: n}
            }, find: function (e, t) {
                for (var n, i = 0, a = e.length; a > i; i++)if (t(i, e[i])) {
                    n = e[i];
                    break
                }
                return n
            }, reviseViewPort: function (t, n) {
                var i = t || 200, a = 0, r = n || 5, o = setInterval(function () {
                    var t, n = screen.width > 0 && window.innerWidth >= screen.width ? screen.width : window.innerWidth;
                    n < window.screenWidth_ ? (window.screenWidth_ = n, e(window).trigger("viewPort:changed", n), t = n > 1080 ? 144 : n / 7.5, t = t > 32 ? t : 32, document.getElementsByTagName("html")[0].style.fontSize = t + "px", clearInterval(o)) : a++, a >= r && clearInterval(o)
                }, i)
            }, isSupportSticky: function () {
                for (var e = ["", "-webkit-", "-ms-", "-moz-", "-o-"], t = "", n = 0; n < e.length; n++)t += "position:" + e[n] + "sticky;";
                var i = document.createElement("div"), a = document.body;
                i.style.cssText = "display:none;" + t, a.appendChild(i);
                var r = /sticky/i.test(window.getComputedStyle(i).position);
                return a.removeChild(i), i = null, r
            }, cookie: {
                getItem: function (e) {
                    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(e).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null
                }, setItem: function (e, t, n, i, a, r) {
                    if (!e || /^(?:expires|max\-age|path|domain|secure)$/i.test(e))return !1;
                    var o = "";
                    if (n)switch (n.constructor) {
                        case Number:
                            o = n === 1 / 0 ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + n;
                            break;
                        case String:
                            o = "; expires=" + n;
                            break;
                        case Date:
                            o = "; expires=" + n.toUTCString()
                    }
                    return document.cookie = encodeURIComponent(e) + "=" + encodeURIComponent(t) + o + (a ? "; domain=" + a : "") + (i ? "; path=" + i : "") + (r ? "; secure" : ""), !0
                }, removeItem: function (e, t, n) {
                    return e && this.hasItem(e) ? (document.cookie = encodeURIComponent(e) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (n ? "; domain=" + n : "") + (t ? "; path=" + t : ""), !0) : !1
                }, hasItem: function (e) {
                    return new RegExp("(?:^|;\\s*)" + encodeURIComponent(e).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=").test(document.cookie)
                }, keys: function () {
                    for (var e = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/), t = 0; t < e.length; t++)e[t] = decodeURIComponent(e[t]);
                    return e
                }
            }, getRandom: function (e, t) {
                return Math.round(Math.random() * (t - e) + e)
            }, isLocalStorageSupported: function () {
                var e = "test", t = window.localStorage;
                try {
                    t.setItem(e, "testValue")
                } catch (n) {
                    return console.log("localStorage.setItem\u4e0d\u53ef\u4ee5\u6267\u884c"), !1
                }
                try {
                    return "testValue" != t.getItem(e) ? !1 : (t.removeItem(e), !0)
                } catch (n) {
                    return console.log("localStorage.getItem\u4e0d\u53ef\u4ee5\u6267\u884c"), !1
                }
            }, isCookieSupported: function () {
                var e = "test", n = t.tools.publicMethod.cookie;
                try {
                    n.setItem(e, "testValue")
                } catch (i) {
                    return console.log("docCookies.setItem\u4e0d\u53ef\u4ee5\u6267\u884c"), !1
                }
                try {
                    return "testValue" != n.getItem(e) ? !1 : (n.removeItem(e), !0)
                } catch (i) {
                    return console.log("docCookies.getItem\u4e0d\u53ef\u4ee5\u6267\u884c"), !1
                }
            }, urlAddSearch: function (e, t, n) {
                var i, a = n ? n : !0, r = function (e) {
                    var t = document.createElement("a");
                    return t.href = e, t
                }, e = new r(e), o = e.href.match(/\?/) && e.href.match(/\?$/) ? "?" : "", s = e.search;
                o || e.href.match(/\?/) || (o = "?"), s += o;
                for (var c in t)if (t[c] && ("string" == typeof t[c] || "number" == typeof t[c]))if (a) {
                    var l = this.localParam(s);
                    if (l.search[c]) {
                        var u = new RegExp(c + "=([^&]*)", "");
                        s = s.replace(u, function (e, n) {
                            return c + "=" + t[c]
                        })
                    } else s += "&" + c + "=" + t[c]
                } else s += "&" + c + "=" + t[c];
                return s = s.replace(/\?&/g, function () {
                    return "?"
                }), i = e.origin + e.pathname + s + e.hash
            }, inheritSearch: function (e, t, n) {
                var i = n ? n : location.href, a = i.replace(/.*(\?.*)/, function (e, t) {
                    return t
                }), r = t, o = {}, s = this.localParam(a).search;
                return e.forEach(function (e, t, n) {
                    s[e] && (o[e] = s[e])
                }), r = this.urlAddSearch(r, o)
            }, getLoginInfo: function () {
                try {
                    document.domain = "163.com"
                } catch (t) {
                }
                var n = e.Deferred(), i = this.cookie.getItem("P_INFO") ? this.cookie.getItem("P_INFO").split("|") : "", a = this.cookie.getItem("S_INFO"), r = i[0], o = {
                    userName: r ? r.split("@")[0] : "",
                    userMail: r,
                    userDomain: r ? r.split("@")[1] : "",
                    userIp: this.cookie.getItem("USERTRACK"),
                    logined: !(!r || !a && 1 != i[2])
                };
                return o.logined ? this.fetch({
                    url: "http://sdk.comment.163.com/api/v1/products/a2869674571f77b5a0867c3d71db5856/users/myInfo",
                    dataType: "jsonp",
                    notformat: !0,
                    success: function (t) {
                        var i = {nickname: t.nickname, avatar: t.avatar};
                        e.extend(!0, o, i), n.resolve(o)
                    }
                }) : n.resolve(o), n
            }, scrollY: function () {
                return document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
            }, simpleTransition: function (e, t, n, i) {
                var a = function (e) {
                    e += (t - e) * n, e = Math.abs(t - e) < 1 ? t : e, i(e), e !== t && o(function () {
                        a(e)
                    })
                }, r = o(function () {
                    a(e)
                });
                return {
                    stop: function () {
                        s(r)
                    }
                }
            }, getQD: function () {
                var e = this.localParam(), t = "_";
                return e.search.qd ? t += e.search.qd : !e.search.from || "gionee" != e.search.from && "sogou" != e.search.from ? e.search.lb && "gionee" == e.search.lb ? t += e.search.lb : t = "" : t += e.search.from, t
            }
        }, ADMethod: {
            getDetailADData: function (n, i, a) {
                var r = [], o = {}, s = 0, c = [];
                e.each(n, function (t, n) {
                    e.each(n, function (n, i) {
                        r.push(e.extend(i, {ADType: t}))
                    })
                }), function l() {
                    var n = e.extend(!0, {}, r[s]);
                    t.tools.publicMethod.jsonp({url: n.url, callbackName: i}, function (t) {
                        c.push(e.extend(n, t))
                    }).then(function () {
                        s == r.length - 1 ? (e.each(c, function (e, t) {
                            o[t.ADType] = o[t.ADType] || [], o[t.ADType].push(t)
                        }), a && a(o)) : (s += 1, l())
                    }, function () {
                        s == r.length - 1 ? (c.push(n), e.each(c, function (e, t) {
                            o[t.ADType] = o[t.ADType] || [], o[t.ADType].push(t)
                        }), a && a(o)) : (c.push(n), s += 1, l())
                    })
                }()
            }, getChannelAllAD: function (n, i, a, r, o, s) {
                var c, l = e.Deferred(), u = 1, h = !1;
                return i ? (c = setInterval(function () {
                    u += 1, u > 10 && (h = !0, clearInterval(c), e(window).trigger("noAD", [o, s]))
                }, 500), a ? t.tools.publicMethod.jsonp({url: a, callbackName: r}, function (i) {
                    h || (clearInterval(c), e(window).trigger("getADListSucc", [i, o, s]), "article" == n && (i.banner.pop(), i.banner.pop()), t.tools.ADMethod.getDetailADData(i, "ad_info", function (t) {
                        e(window).trigger("getADSucc", [t, s])
                    }))
                }).then(function () {
                    l.resolve()
                }, function () {
                    l.reject()
                }) : (clearInterval(c), l.reject(), e(window).trigger("noAD", [o, s])), l.promise()) : (e(window).trigger("noAD", [o, s]), l.reject(), l.promise())
            }, replaceListAD: function (i, a, r) {
                var o = t.tools.publicMethod.arrToObj(a.list, "adposition");
                e.each(o, function (e, t) {
                    try {
                        t.type && r ? i.eq(e - 1).replaceWith(n.templates[t.type + "_tpl"](t)) : i.eq(e - 1).hide()
                    } catch (a) {
                        console.log(a)
                    }
                })
            }
        }, commentMethod: {
            submitReply: function (e, t, n, i) {
                var a = this.createCORSRequest("post", e);
                if (a) {
                    a.withCredentials = !0, a.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), a.onload = function () {
                        n && n(a.responseText)
                    }, a.onerror = function () {
                        i && i(a.responseText)
                    };
                    var r = this.serialize(t);
                    a.send(r)
                }
            }, createCORSRequest: function (e, t) {
                var n = new XMLHttpRequest;
                return "withCredentials" in n ? n.open(e, t, !0) : "undefined" != typeof XDomainRequest ? (n = new XDomainRequest, n.open(e, t)) : n = null, n
            }, serialize: function (t) {
                return t ? "string" == typeof t ? t : e.param(t) : null
            }, replayHandle: function (e) {
                var t = +e.rcount + +e.cmtVote + +e.cmtAgainst;
                parseInt(t) > 99999 && (t = parseInt(t / 1e4) + "\u4e07");
                var i = n.templates.replylink_tpl({
                    docid: e.docId,
                    board: e.boardId,
                    title: encodeURI(encodeURI(e.title))
                });
                return {comCount: t, comLink: i}
            }
        }
    }
}(Zepto, window.NEWAP = window.NEWAP || {}, Handlebars), !function (e) {
    "use strict";
    var t = function () {
        var e = document.createElement("div");
        return e.style.cssText = "font-size: 1rem;", /rem/.test(e.style.fontSize)
    }, n = function () {
        for (var e = document.getElementsByTagName("link"), t = [], n = 0; n < e.length; n++)"stylesheet" === e[n].rel.toLowerCase() && null === e[n].getAttribute("data-norem") && t.push(e[n].href);
        return t
    }, i = function () {
        for (var e = 0; e < d.length; e++)l(d[e], a)
    }, a = function (e, t) {
        if (g.push(e.responseText), v.push(t), v.length === d.length) {
            for (var n = 0; n < v.length; n++)r(g[n], v[n]);
            (d = p.slice(0)).length > 0 ? (v = [], g = [], p = [], i()) : o()
        }
    }, r = function (e, t) {
        for (var n, i = u(e).replace(/\/\*[\s\S]*?\*\//g, ""), a = /[\w\d\s\-\/\\\[\]:,.'"*()<>+~%#^$_=|@]+\{[\w\d\s\-\/\\%#:!;,.'"*()]+\d*\.?\d+rem[\w\d\s\-\/\\%#:!;,.'"*()]*\}/g, r = i.match(a), o = /\d*\.?\d+rem/g, s = i.match(o), c = /(.*\/)/, l = c.exec(t)[0], h = /@import (?:url\()?['"]?([^'\)"]*)['"]?\)?[^;]*/gm; null !== (n = h.exec(e));)p.push(0 === n[1].indexOf("/") ? n[1] : l + n[1]);
        null !== r && 0 !== r.length && (f = f.concat(r), m = m.concat(s))
    }, o = function () {
        for (var e = /[\w\d\s\-\/\\%#:,.'"*()]+\d*\.?\d+rem[\w\d\s\-\/\\%#:!,.'"*()]*[;}]/g, t = 0; t < f.length; t++) {
            h += f[t].substr(0, f[t].indexOf("{") + 1);
            for (var n = f[t].match(e), i = 0; i < n.length; i++)h += n[i], i === n.length - 1 && "}" !== h[h.length - 1] && (h += "\n}")
        }
        s()
    }, s = function () {
        for (var e = 0; e < m.length; e++)_[e] = Math.round(parseFloat(m[e].substr(0, m[e].length - 3) * y)) + "px";
        c()
    }, c = function () {
        for (var e = 0; e < _.length; e++)_[e] && (h = h.replace(m[e], _[e]));
        var t = document.createElement("style");
        t.setAttribute("type", "text/css"), t.id = "remReplace", document.getElementsByTagName("head")[0].appendChild(t), t.styleSheet ? t.styleSheet.cssText = h : t.appendChild(document.createTextNode(h))
    }, l = function (t, n) {
        try {
            var i = e.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") || new ActiveXObject("Msxml2.XMLHTTP") : new XMLHttpRequest;
            i.open("GET", t, !0), i.onreadystatechange = function () {
                4 === i.readyState && n(i, t)
            }, i.send(null)
        } catch (a) {
            if (e.XDomainRequest) {
                var r = new XDomainRequest;
                r.open("get", t), r.onload = function () {
                    n(r, t)
                }, r.onerror = function () {
                    return !1
                }, r.send()
            }
        }
    }, u = function (t) {
        return e.matchMedia || e.msMatchMedia || (t = t.replace(/@media[\s\S]*?\}\s*\}/g, "")), t
    };
    if (!t()) {
        var h = "", d = n(), p = [], f = [], m = [], g = [], v = [], _ = [], y = "";
        y = function () {
            var e, t = document, n = t.documentElement, i = t.body || t.createElement("body"), a = !t.body, r = t.createElement("div"), o = i.style.fontSize;
            return a && n.appendChild(i), r.style.cssText = "width:1em; position:absolute; visibility:hidden; padding: 0;", i.style.fontSize = "1em", i.appendChild(r), e = r.offsetWidth, a ? n.removeChild(i) : (i.removeChild(r), i.style.fontSize = o), e
        }(), i()
    }
}(window), function (e) {
    "use strict";
    function t(e) {
        var t = "", n = !0;
        return e.forEach(function (e) {
            var i = encodeURIComponent(e.name), a = encodeURIComponent(e.value);
            n || (t += "&"), t += i + "=" + a, n = !1
        }), t.replace(/%20/g, "+")
    }

    function n(e, t) {
        var n = e.split("&");
        t && -1 === n[0].indexOf("=") && (n[0] = "=" + n[0]);
        var i = [];
        n.forEach(function (e) {
            if (0 !== e.length) {
                var t = e.indexOf("=");
                if (-1 !== t)var n = e.substring(0, t), a = e.substring(t + 1); else n = e, a = "";
                n = n.replace(/\+/g, " "), a = a.replace(/\+/g, " "), i.push({name: n, value: a})
            }
        });
        var a = [];
        return i.forEach(function (e) {
            a.push({name: decodeURIComponent(e.name), value: decodeURIComponent(e.value)})
        }), a
    }

    function i(e) {
        if (o)return new s(e);
        var t = document.createElement("a");
        return t.href = e, t
    }

    function a(e) {
        var i = this;
        this._list = [], (void 0 === e || null === e) && (e = ""), Object(e) === e && e instanceof a || (e = String(e)), "string" == typeof e && "?" === e.substring(0, 1) && (e = e.substring(1)), "string" == typeof e ? this._list = n(e) : this._list = e._list.slice(), this._url_object = null, this._setList = function (e) {
            r || (i._list = e)
        };
        var r = !1;
        this._update_steps = function () {
            r || (r = !0, i._url_object && ("about:" === i._url_object.protocol && -1 !== i._url_object.pathname.indexOf("?") && (i._url_object.pathname = i._url_object.pathname.split("?")[0]), i._url_object.search = t(i._list), r = !1))
        }
    }

    function r(t, r) {
        function c() {
            var e = u.href.replace(/#$|\?$|\?(?=#)/g, "");
            u.href !== e && (u.href = e)
        }

        function l() {
            p._setList(u.search ? n(u.search.substring(1)) : []), p._update_steps()
        }

        if (!(this instanceof e.URL))throw new TypeError("Failed to construct 'URL': Please use the 'new' operator.");
        r && (t = function () {
            if (o)return new s(t, r).href;
            var e;
            if (document.implementation && document.implementation.createHTMLDocument ? e = document.implementation.createHTMLDocument("") : document.implementation && document.implementation.createDocument ? (e = document.implementation.createElement("http://www.w3.org/1999/xhtml", "html", null), e.documentElement.appendChild(e.createElement("head")), e.documentElement.appendChild(e.createElement("body"))) : window.ActiveXObject && (e = new window.ActiveXObject("htmlfile"), e.write("<head></head><body></body>"), e.close()), !e)throw Error("base not supported");
            var n = e.createElement("base");
            n.href = r, e.getElementsByTagName("head")[0].appendChild(n);
            var i = e.createElement("a");
            return i.href = t, i.href
        }());
        var u = i(t || ""), h = function () {
            if (!("defineProperties" in Object))return !1;
            try {
                var e = {};
                return Object.defineProperties(e, {
                    prop: {
                        get: function () {
                            return !0
                        }
                    }
                }), e.prop
            } catch (t) {
                return !1
            }
        }(), d = h ? this : document.createElement("a"), p = new a(u.search ? u.search.substring(1) : null);
        return p._url_object = d, Object.defineProperties(d, {
            href: {
                get: function () {
                    return u.href
                }, set: function (e) {
                    u.href = e, c(), l()
                }, enumerable: !0, configurable: !0
            }, origin: {
                get: function () {
                    return "origin" in u ? u.origin : this.protocol + "//" + this.host
                }, enumerable: !0, configurable: !0
            }, protocol: {
                get: function () {
                    return u.protocol
                }, set: function (e) {
                    u.protocol = e
                }, enumerable: !0, configurable: !0
            }, username: {
                get: function () {
                    return u.username
                }, set: function (e) {
                    u.username = e
                }, enumerable: !0, configurable: !0
            }, password: {
                get: function () {
                    return u.password
                }, set: function (e) {
                    u.password = e
                }, enumerable: !0, configurable: !0
            }, host: {
                get: function () {
                    var e = {"http:": /:80$/, "https:": /:443$/, "ftp:": /:21$/}[u.protocol];
                    return e ? u.host.replace(e, "") : u.host
                }, set: function (e) {
                    u.host = e
                }, enumerable: !0, configurable: !0
            }, hostname: {
                get: function () {
                    return u.hostname
                }, set: function (e) {
                    u.hostname = e
                }, enumerable: !0, configurable: !0
            }, port: {
                get: function () {
                    return u.port
                }, set: function (e) {
                    u.port = e
                }, enumerable: !0, configurable: !0
            }, pathname: {
                get: function () {
                    return "/" !== u.pathname.charAt(0) ? "/" + u.pathname : u.pathname
                }, set: function (e) {
                    u.pathname = e
                }, enumerable: !0, configurable: !0
            }, search: {
                get: function () {
                    return u.search
                }, set: function (e) {
                    u.search !== e && (u.search = e, c(), l())
                }, enumerable: !0, configurable: !0
            }, searchParams: {
                get: function () {
                    return p
                }, enumerable: !0, configurable: !0
            }, hash: {
                get: function () {
                    return u.hash
                }, set: function (e) {
                    u.hash = e, c()
                }, enumerable: !0, configurable: !0
            }, toString: {
                value: function () {
                    return u.toString()
                }, enumerable: !1, configurable: !0
            }, valueOf: {
                value: function () {
                    return u.valueOf()
                }, enumerable: !1, configurable: !0
            }
        }), d
    }

    var o, s = e.URL;
    try {
        if (s) {
            if (o = new e.URL("http://example.com"), "searchParams" in o)return;
            "href" in o || (o = void 0)
        }
    } catch (c) {
    }
    if (Object.defineProperties(a.prototype, {
                append: {
                    value: function (e, t) {
                        this._list.push({name: e, value: t}), this._update_steps()
                    }, writable: !0, enumerable: !0, configurable: !0
                }, "delete": {
                    value: function (e) {
                        for (var t = 0; t < this._list.length;)this._list[t].name === e ? this._list.splice(t, 1) : ++t;
                        this._update_steps()
                    }, writable: !0, enumerable: !0, configurable: !0
                }, get: {
                    value: function (e) {
                        for (var t = 0; t < this._list.length; ++t)if (this._list[t].name === e)return this._list[t].value;
                        return null
                    }, writable: !0, enumerable: !0, configurable: !0
                }, getAll: {
                    value: function (e) {
                        for (var t = [], n = 0; n < this._list.length; ++n)this._list[n].name === e && t.push(this._list[n].value);
                        return t
                    }, writable: !0, enumerable: !0, configurable: !0
                }, has: {
                    value: function (e) {
                        for (var t = 0; t < this._list.length; ++t)if (this._list[t].name === e)return !0;
                        return !1
                    }, writable: !0, enumerable: !0, configurable: !0
                }, set: {
                    value: function (e, t) {
                        for (var n = !1, i = 0; i < this._list.length;)this._list[i].name === e ? n ? this._list.splice(i, 1) : (this._list[i].value = t, n = !0, ++i) : ++i;
                        n || this._list.push({name: e, value: t}), this._update_steps()
                    }, writable: !0, enumerable: !0, configurable: !0
                }, entries: {
                    value: function () {
                        var e = this, t = 0;
                        return {
                            next: function () {
                                if (t >= e._list.length)return {done: !0, value: void 0};
                                var n = e._list[t++];
                                return {done: !1, value: [n.name, n.value]}
                            }
                        }
                    }, writable: !0, enumerable: !0, configurable: !0
                }, keys: {
                    value: function () {
                        var e = this, t = 0;
                        return {
                            next: function () {
                                if (t >= e._list.length)return {done: !0, value: void 0};
                                var n = e._list[t++];
                                return {done: !1, value: n.name}
                            }
                        }
                    }, writable: !0, enumerable: !0, configurable: !0
                }, values: {
                    value: function () {
                        var e = this, t = 0;
                        return {
                            next: function () {
                                if (t >= e._list.length)return {done: !0, value: void 0};
                                var n = e._list[t++];
                                return {done: !1, value: n.value}
                            }
                        }
                    }, writable: !0, enumerable: !0, configurable: !0
                }, forEach: {
                    value: function (e) {
                        var t = arguments.length > 1 ? arguments[1] : void 0;
                        this._list.forEach(function (n, i) {
                            e.call(t, n.name, n.value)
                        })
                    }, writable: !0, enumerable: !0, configurable: !0
                }, toString: {
                    value: function () {
                        return t(this._list)
                    }, writable: !0, enumerable: !1, configurable: !0
                }
            }), "Symbol" in e && "iterator" in e.Symbol && Object.defineProperty(a.prototype, e.Symbol.iterator, {
                value: a.prototype.entries,
                writable: !0,
                enumerable: !0,
                configurable: !0
            }), s)for (var l in s)s.hasOwnProperty(l) && "function" == typeof s[l] && (r[l] = s[l]);
    e.URL = r, e.URLSearchParams = a
}(self);
var _ntes_nacc, _ntes_nvid = "VISITOR_CLIENT_NO_COOKIE_SUPPORT", _ntes_nvtm = 0, _ntes_nvfi = 0, _ntes_nvsf = 1, _ntes_nstm = 0, _ntes_nurl = "", _ntes_ntit = "", _ntes_nref = "", _ntes_nres = "", _ntes_nlag = "", _ntes_nscd = "", _ntes_nlmf = 0, _ntes_flsh = "", _ntes_nssn = "", _ntes_surv = 0, _ntes_domain_array = ["163.com", "188.com", "netease.com", "126.com", "126.net", "nease.net", "yeah.net", "gz2010.cn", "co188.com", "warcraftchina.com", "youdao.com", "leihuo.net", "gzapg2010.cn", "126.am", "lofter.com", "lede.com", "diablo3.cc", "starcraft2.com.cn", "battlenet.com.cn", "wowchina.com", "hearthstone.com.cn", "heroesofthestorm.com.cn", "bobo.com", "yixin.im", "kaola.com", "diablo3.com.cn", "tottenhamhotspur.com", "temai163.com", "16163.com", "iaafbeijing2015.com", "playoverwatch.cn", "lmlc.com", "blizzard.cn"], _non_ntes_domain_array = ["163.letv.com"], _ntes_cdmn = ntes_get_domain(), _non_ntes_cdmn = non_ntes_get_domain(), _ntes_src_addr = "//analytics.163.com", _ntes_cookie_enabled = null, _ntes_page_data = {
    initTime: window.performance && window.performance.timing ? window.performance.timing.connectStart : +new Date,
    getRunTime: function () {
        return Math.round((+new Date - this.initTime) / 1e3)
    },
    maxScroll: 0,
    maxClick: 0,
    actionTime: 0,
    fireAction: function () {
        var e = _ntes_page_data;
        e._actStart || (e._actStart = +new Date), e._actTimer && window.clearTimeout(e._actTimer), e._actTimer = window.setTimeout(e.actStop, 2e4)
    },
    actStop: function () {
        var e = _ntes_page_data;
        e.actionTime += +new Date - e._actStart - 2e4, e._actStart = 0
    },
    getActionTime: function () {
        var e = this;
        return e._actStart ? Math.round((e.actionTime + +new Date - e._actStart) / 1e3) : Math.round(e.actionTime / 1e3)
    }
}, _ntes_hexcase = 0, _ntes_chrsz = 8, ntes_area_click_tools = {
    getOffset: function (e) {
        if (void 0 === this.boxModel) {
            var t = document.createElement("div");
            t.style.width = t.style.paddingLeft = "1px", document.body.appendChild(t), this.boxModel = 2 === t.offsetWidth, document.body.removeChild(t).style.display = "none", t = null
        }
        var n = e.getBoundingClientRect(), i = e.ownerDocument, a = i.body, r = i.documentElement, o = r.clientTop || a.clientTop || 0, s = r.clientLeft || a.clientLeft || 0, c = n.top + (self.pageYOffset || this.boxModel && r.scrollTop || a.scrollTop) - o, l = n.left + (self.pageXOffset || this.boxModel && r.scrollLeft || a.scrollLeft) - s;
        return {x: l, y: c}
    }, swapForSize: function (e, t) {
        var n = {};
        for (var i in options)n[i] = e.style[i], e.style[i] = options[i];
        t.call(e);
        for (var i in options)e.style[i] = n[i]
    }, getSize: function (e) {
        var t, n = function () {
            t = {width: e.offsetWidth, height: e.offsetHeight}
        };
        return 0 !== e.offsetWidth ? n() : this.swapForSize(e, n), t.width = Math.max(0, Math.round(t.width)), t.height = Math.max(0, Math.round(t.height)), t
    }
};
!function (e, t, n) {
    n.Static = n.Static || {};
    var i = n.Static, a = n.tools;
    i.versionModel = {
        findVersionflag: function (e) {
            if (this.isLocalStorageSupported()) {
                var t = this.getStorage(e);
                if (t) {
                    var n = JSON.parse(t).flag;
                    if (n && 100 >= n && n >= 1)return n
                }
            }
            if (this.isCookieSupported()) {
                var i = this.getCookie(e);
                if (i) {
                    var n = JSON.parse(i).flag;
                    if (n && 100 >= n && n >= 1)return n
                }
            }
            return console.log("\u6ca1\u6709\u627e\u5230flag\u6807\u5fd7\u6216\u8005\u64cd\u4f5c\u5931\u8d25\uff01"), !1
        },
        writeVersionflag: function (e, t) {
            return this.isLocalStorageSupported() && this.writeStorage(e, t) ? !0 : this.isCookieSupported() && this.writeCookie(e, t) ? !0 : (neteaseTracker && neteaseTracker(!1, "http://click.portal.163.com/wap/" + this.analysisKeyname + "/#versionPlantFail", "AB\u7248\u672c\u968f\u673a\u503c\u79cd\u690d\u5931\u8d25\u7684\u91cf", "clickp"), console.log("localStorage\u3001cookie\u90fd\u65e0\u6cd5\u4f7f\u7528"), !1)
        },
        getRandom: a.publicMethod.getRandom,
        isLocalStorageSupported: a.publicMethod.isLocalStorageSupported,
        isCookieSupported: a.publicMethod.isCookieSupported,
        docCookies: a.publicMethod.cookie,
        writeStorage: function (e, t) {
            var n = '{"flag":' + t + ',"pushdate":' + (new Date).getTime() + "}";
            try {
                return window.localStorage.setItem(e, n), neteaseTracker && neteaseTracker(!1, "http://click.portal.163.com/wap/" + this.analysisKeyname + "/#versionAllCount", "AB\u7248\u672c\u968f\u673a\u503c\u603b\u91cf", "clickp"), neteaseTracker && neteaseTracker(!1, "http://click.portal.163.com/wap/" + this.analysisKeyname + "/#versionRandom" + t, "AB\u7248\u672c\u968f\u673a\u503c" + t, "clickp"), !0
            } catch (i) {
                return console.log("localStorage.setItem\u5931\u8d25"), !1
            }
        },
        writeCookie: function (e, t) {
            var n = '{"flag":' + t + ',"pushdate":' + (new Date).getTime() + "}";
            try {
                return this.docCookies.setItem(e, n, 1 / 0), neteaseTracker && neteaseTracker(!1, "http://click.portal.163.com/wap/" + this.analysisKeyname + "/#versionAllCount", "AB\u7248\u672c\u968f\u673a\u503c\u603b\u91cf", "clickp"), neteaseTracker && neteaseTracker(!1, "http://click.portal.163.com/wap/" + this.analysisKeyname + "/#versionRandom" + t, "AB\u7248\u672c\u968f\u673a\u503c" + t, "clickp"), !0
            } catch (i) {
                return neteaseTracker && neteaseTracker(!1, "http://click.portal.163.com/wap/" + this.analysisKeyname + "/#versionPlantFail", "AB\u7248\u672c\u968f\u673a\u503c\u79cd\u690d\u5931\u8d25\u7684\u91cf", "clickp"), console.log("docCookies.setItem\u5931\u8d25"), !1
            }
        },
        getStorage: function (e) {
            var t, n, i = window.localStorage;
            try {
                t = i.getItem(e), n = t
            } catch (a) {
                console.log("localStorage.getItem\u4e0d\u80fd\u6267\u884c")
            }
            return n
        },
        getCookie: function (e) {
            var t, n, i = this.docCookies;
            try {
                t = i.getItem(e), n = t
            } catch (a) {
                console.log("docCookies.getItem\u4e0d\u80fd\u6267\u884c")
            }
            return n
        },
        matchVersions: function (e, t) {
            if (e && t) {
                for (var n in e)if (e[n] instanceof Array) {
                    for (var i = 0; i < e[n].length; i++)if (e[n][i] == t)return n
                } else if ("string" == typeof e[n] && e[n].indexOf("-")) {
                    var a = e[n].split("-");
                    if (2 == a.length && t >= a[0] && t <= a[1])return n
                }
                return "normal"
            }
            return "normal"
        },
        changeSearch: function (e, t) {
            var n = a.publicMethod.localParam().search, i = window.location.href;
            if (!n.debug)if ("normal" != e) {
                if (n[t]) {
                    var r = new RegExp(t + "=([^&|^#]*)", "");
                    i = i.replace(r, function (n, i) {
                        return t + "=" + e
                    })
                } else {
                    var o = {};
                    o[t] = e, i = a.publicMethod.urlAddSearch(i, o, 1)
                }
                try {
                    history.replaceState(null, "", i)
                } catch (s) {
                    console.warn("html5--history.pushState on error!")
                }
            } else {
                if (n[t]) {
                    var r = new RegExp("(&)?" + t + "=([^&]*)(&)?", "");
                    i = i.replace(r, function (e, t, n, i) {
                        return t && i ? "&" : ""
                    })
                }
                try {
                    history.replaceState(null, "", i)
                } catch (s) {
                    console.warn("html5--history.pushState on error!")
                }
            }
        },
        run: function (e, t, n) {
            this.analysisKeyname = n;
            var i, a = this.findVersionflag(t);
            if (0 == a) {
                var r = this.getRandom(1, 100);
                if (i = this.writeVersionflag(t, r), 0 == i)return "normal";
                i = r
            } else i = +a;
            return i ? this.matchVersions(e, i) : "normal"
        }
    }
}(Zepto, Handlebars, window.NEWAP = window.NEWAP || {}), function (e) {
    var t = NEWAP.tools, n = t.publicMethod.cookie, i = function () {
        var i = function (i) {
            var a = n.getItem("NTES_CMT_USER_INFO") && n.getItem("NTES_CMT_USER_INFO").split("|") || [], o = n.getItem("P_INFO") && n.getItem("P_INFO").split("|") || [], s = n.getItem("S_INFO"), c = o[0] || "", l = {
                userName: c.split("@")[0],
                userMail: c,
                userDomain: c ? c.split("@")[1] : "",
                userIp: n.getItem("USERTRACK"),
                logined: !(!c || !s && 1 != o[2])
            };
            !l.logined && n.getItem("S_OINFO") && (c = n.getItem("P_OINFO").replace(/\|.*/, ""), l.logined = !0, l.thirdParty = !0), e.extend(l, {
                userName: c.split("@")[0],
                userMail: c,
                userDomain: c ? c.split("@")[1] : ""
            });
            var u = e.Deferred();
            return a.length && o.length && a[1] === o[0].replace(/@[^@]+\.com$/i, "") ? (l.nickname = (a[1] || "").replace(/@[^@]+\.com$/i, ""), l.avatar = a[2] || "", l.account = a[0], l.avatar90 = l.avatar ? "http://s.cimg.163.com/i/" + encodeURIComponent(l.avatar.replace(/http:\/\//, "")) + ".90x500.auto.jpg" : "http://img2.cache.netease.com/f2e/wap/touch_index_2016/qa/images/not_logined.png", i && i(l), u.resolve(l)) : r() ? t.publicMethod.fetch({
                url: "http://comment.api.163.com/api/v1/products/a2869674571f77b5a0867c3d71db5856/users/myInfo",
                dataType: "jsonp",
                cache: !1,
                useflag: !1,
                notformat: !0,
                success: function (e) {
                    l.nickname = e.nickname, l.avatar = e.avatar, l.account = e.userId, l.avatar90 = l.avatar ? "http://s.cimg.163.com/i/" + encodeURIComponent(l.avatar.replace(/http:\/\//, "")) + ".90x500.auto.jpg" : "http://img2.cache.netease.com/f2e/wap/touch_index_2016/qa/images/not_logined.png", i && i(l), u.resolve(l)
                }
            }) : (i && i(l), u.resolve(l)), u.promise()
        }, a = function (t, n) {
            var a = document.createElement("div"), r = '<iframe src="javascript:false;" name="changeCookie" frameborder="0" style="width:0;height:0;display:none;"></iframe>', o = e.Deferred();
            a.innerHTML = r;
            var s = a.firstChild;
            return document.body.appendChild(s), s.onload = s.onreadystatechange = function () {
                this.readyState && "loaded" !== this.readyState && "complete" !== this.readyState || (document.body.removeChild(s), s = null, i(function (e) {
                    n && n(e), o.resolve(e)
                }))
            }, s.onerror = function () {
                n && n(null), o.resolve(null)
            }, s.src = t, o.promise()
        }, r = function () {
            var e = n.getItem("S_INFO"), t = n.getItem("P_INFO") ? n.getItem("P_INFO").split("|") : [];
            return !!e && "2" !== t[2] || n.getItem("S_OINFO")
        }, o = function (e) {
            var t = n.getItem("P_INFO") ? n.getItem("P_INFO").split("|") : [];
            return r() || "1" !== t[2] ? void i(e) : void a("http://reg.163.com/chgcookie.jsp?username=" + t[0] + "&retUrl=http://www.163.com/special/0077450P/login_frame.html&loginUrl=http://www.163.com/special/0077450P/login_frame.html", e)
        }, s = function () {
            var e = n.getItem("P_INFO").split("|");
            return r() || "1" !== e[2] ? i() : a("http://reg.163.com/chgcookie.jsp?username=" + e[0] + "&retUrl=http://www.163.com/special/0077450P/login_frame.html&loginUrl=http://www.163.com/special/0077450P/login_frame.html")
        };
        return {verifyCookie: r, checkLogin: o, checkLoginPromise: s, importIframe: a}
    }(), a = function () {
        function t() {
            try {
                document.domain = "163.com"
            } catch (t) {
            }
            var n = {
                listenFrame: !0,
                loginAction: "https://reg.163.com/mlogin.jsp",
                loginRedirect: "http://reg.163.com/redirect.jsp",
                successAction: "http://3g.163.com/ntes/special/00341JC9/wap_login_frame.html",
                failedAction: "http://3g.163.com/ntes/special/00341JC9/wap_login_frame.html",
                success: {},
                failed: {},
                errorMsg: {
                    412: "\u60a8\u5c1d\u8bd5\u6b21\u6570\u592a\u591a,\u8bf7\u8fc7\u4e00\u6bb5\u65f6\u95f4\u518d\u8bd5",
                    414: "\u60a8\u7684IP\u767b\u5f55\u5931\u8d25\u6b21\u6570\u8fc7\u591a,\u8bf7\u7a0d\u540e\u518d\u8bd5",
                    415: "\u60a8\u4eca\u5929\u767b\u5f55\u9519\u8bef\u6b21\u6570\u592a\u591a,\u8bf7\u660e\u5929\u518d\u8bd5",
                    416: "\u60a8\u7684IP\u4eca\u5929\u767b\u5f55\u8fc7\u4e8e\u9891\u7e41\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5",
                    417: "\u60a8\u7684IP\u4eca\u5929\u767b\u5f55\u6b21\u6570\u8fc7\u591a\uff0c\u8bf7\u660e\u5929\u518d\u8bd5",
                    418: "\u60a8\u4eca\u5929\u767b\u5f55\u6b21\u6570\u8fc7\u591a,\u8bf7\u660e\u5929\u518d\u8bd5",
                    419: "\u60a8\u7684\u767b\u5f55\u64cd\u4f5c\u8fc7\u4e8e\u9891\u7e41\uff0c\u8bf7\u7a0d\u5019\u518d\u8bd5",
                    420: "\u7528\u6237\u540d\u4e0d\u5b58\u5728",
                    422: "\u5e10\u53f7\u88ab\u9501\u5b9a\uff0c\u8bf7\u60a8\u89e3\u9501\u540e\u518d\u767b\u5f55",
                    424: "\u8be5\u9753\u53f7\u670d\u52a1\u5df2\u5230\u671f\uff0c\u8bf7\u60a8\u7eed\u8d39",
                    425: "\u5916\u57df\u5e10\u53f7\u5e76\u4e14\u5728\u6fc0\u6d3b\u6709\u6548\u671f\u4ee5\u5185",
                    426: "\u5916\u57df\u5e10\u53f7\u5e76\u4e14\u5df2\u7ecf\u8fc7\u4e86\u6fc0\u6d3b\u6709\u6548\u671f\u9650",
                    427: "\u8d85\u65f6\uff0c\u5df2\u8d85\u8fc75\u5206\u949f\u6709\u6548\u671f",
                    428: "\u9700\u8981\u8fdb\u5165\u4e2d\u95f4\u63d0\u9192\u9875\u9762",
                    460: "\u5bc6\u7801\u4e0d\u6b63\u786e",
                    500: "\u7cfb\u7edf\u7e41\u5fd9\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u8bd5",
                    503: "\u7cfb\u7edf\u7ef4\u62a4\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u8bd5",
                    1e3: "\u7528\u6237\u540d\u6216\u5bc6\u7801\u4e0d\u6b63\u786e"
                },
                commit: function (e) {
                    e && (this.frame || this.createElements(), this.form.username.value = e.username, this.form.password.value = e.password, e.product && (this.form.product.value = e.product), this.form.type.value = e.type, this.form.savelogin.value = e.savelogin, this.form.product.value = "3g_163", a.beforeSubmit && a.beforeSubmit() && this.form.submit())
                },
                verifyLogin: function () {
                    var t = arguments[0];
                    i.verifyCookie() ? e.each(this.success, function (n, i) {
                        e.isFunction(i) && i.call(this, t)
                    }) : e.each(this.failed, function (n, i) {
                        e.isFunction(i) && i.call(this, t)
                    })
                },
                getSearches: function (e) {
                    e = e || window.location.search;
                    for (var t = e.substring(1).split("&"), n = {}, i = 0; t.length > i; i++) {
                        var a = t[i].split("=");
                        a[0] && (n[a[0]] = a[1] || null)
                    }
                    return n
                },
                createElements: function () {
                    var e = this;
                    e.iframeId = (new Date).getTime();
                    var t = document.createElement("div");
                    t.innerHTML = '<iframe id="login_util_frame_' + e.iframeId + '" src="javascript:false;" name="login_util_frame_' + e.iframeId + '" border="no" style="display:none"></iframe><form method="post" action="' + e.loginAction + '" target="login_util_frame_' + e.iframeId + '" style="display:none"><input name="username"/><input name="password"/><input name="url" value="' + e.successAction + '"/><input name="url2" value="' + e.failedAction + '"/><input name="savelogin" value="1"/><input type="hidden" name="product" value=""><input type="hidden" name="type" value="0"></form>';
                    var n = this.frame = document.body.appendChild(t.firstChild);
                    this.form = document.body.appendChild(t.firstChild);
                    t = null, e.listenFrame && (n.onload = n.onreadystatechange = function () {
                        this.readyState && "loaded" != this.readyState && "complete" != this.readyState || this.contentWindow.location.search && e.verifyLogin(e.getSearches(this.contentWindow.location.search))
                    })
                }
            };
            n.success.userProduct = function (e) {
                d.errorMsg = "", r()
            }, n.failed.userProduct = function (e) {
                if (e)switch (d.errorMsg = n.errorMsg[e.errorType] || n.errorMsg[1e3], parseInt(e.errorType, 10)) {
                    case 420:
                        setTimeout(function () {
                            h.username.focus()
                        }, 1e3);
                        break;
                    case 428:
                        window.open(e.url ? [unescape(e.url), "url=" + location.href].join("&") : n.loginRedirect, "_self");
                        break;
                    case 460:
                        setTimeout(function () {
                            h.password.focus()
                        }, 1e3)
                }
                r(), a.loginFailCallback && a.loginFailCallback(d)
            };
            var o = {
                mailReg: /^\w+([\-+.]\w+)*@\w+([\-.]\w+)*\.\w+([\-.]\w+)*$/i,
                nameTmp: "",
                passTmp: "",
                passportLoaded: !1
            };
            o.submit = function () {
                var e = h.username.val().trim(), t = h.password.val().trim();
                o.nameTmp = e, o.passTmp = t, n.commit({
                    username: e,
                    password: t,
                    savelogin: h.save && h.save[0].checked ? 1 : 0,
                    product: h.form && h.form.find("[name=product]").val() || "163",
                    type: 1
                })
            }, h.submit && h.submit.bind("click", o.submit)
        }

        function r(t) {
            i.checkLogin(function (i) {
                if (t && e.extend(d, t), i && e.extend(d, i), !d.logined && n.getItem("S_OINFO")) {
                    var r = n.getItem("P_OINFO");
                    if (/(\S+?)\|/.test(r)) {
                        var o = RegExp.$1;
                        e.extend(d, {
                            userName: o.split("@")[0],
                            userMail: o,
                            userDomain: o ? o.split("@")[1] : "",
                            logined: !0,
                            thirdParty: !0
                        })
                    }
                }
                d.logined ? (d.logoutUrl = "http://reg.163.com/Logout.jsp?username=" + d.userName + "&url=" + location.href, a.loginSuccessCallback && a.loginSuccessCallback(d)) : (d.userMail && h.username && !h.username.val().trim() && h.username.val(d.userMail), a.loginFailCallback && a.loginFailCallback(d))
            })
        }

        function o(e) {
            u = e.ele, a.loginSuccessCallback = e.success, a.loginFailCallback = e.fail, a.beforeSubmit = e.beforeSubmit, h.username = u.find("#email"), h.password = u.find("#password"), h.submit = u.find("#dologin"), h.form = u, r(), t()
        }

        function s(t, a) {
            i.checkLogin(function (i) {
                if (t && e.extend(d, t), i && e.extend(d, i), !d.logined && n.getItem("S_OINFO")) {
                    var r = n.getItem("P_OINFO");
                    if (/(\S+?)\|/.test(r)) {
                        var o = RegExp.$1;
                        e.extend(d, {
                            userName: o.split("@")[0],
                            userMail: o,
                            userDomain: o ? o.split("@")[1] : "",
                            logined: !0,
                            thirdParty: !0
                        })
                    }
                }
                d.logined && (d.logoutUrl = "http://reg.163.com/Logout.jsp?username=" + d.userName + "&url=" + location.href), a && a()
            })
        }

        function c(e) {
            i.checkLogin(function (t) {
                if (!t.logined && n.getItem("S_OINFO")) {
                    var i = n.getItem("P_OINFO");
                    /(\S+?)\|/.test(i) && (t.logined = !0)
                }
                e && e(t)
            })
        }

        function l() {
            i.importIframe("http://reg.163.com/Logout.jsp?username=" + d.userName + "&url=" + location.href, function () {
                r()
            })
        }

        var u, h = {}, d = {logined: !1, thirdParty: !1};
        return {init: o, update: s, checklogin: c, logOut: l}
    }();
    NEWAP.wapLogin = a
}(window.Zepto), function (e, t) {
    var n = {
        slidedownRefresh: function (n, i) {
            function a() {
                return 0 == e("body").scrollTop()
            }

            var r, o, s, c, l, u, h, d = n.maxtop || 150, p = (n.point || .7) * d, f = !1, m = /\w+(?=\))/;
            h = t.directionFunc(), n.ele.on("touchstart", function (t) {
                u = void 0, f = !1, a() && (s = 0, e(this).trigger("slidestart"))
            }), n.ele.on("touchmove", function (t) {
                function n() {
                    return c > 0 && 0 > l || 0 > c && l > 0 || 0 == c && 0 == l
                }

                u = u ? u : h(t), a() ? void 0 != u && "top" != u && (t.preventDefault(), "bottom" == u && (o = parseInt(parseInt(e(this).css("transform").match(m)[0])), l = c, c = t.changedTouches[0].clientY - r, r = t.changedTouches[0].clientY, n() && (f = !1), d > o && c > 0 ? (s = parseInt(o + (d - o) * c / 100), o > p && 0 == f && (e(this).trigger("slideenough", s), f = !0)) : 0 > c && o > 0 && (s = o + c, p > o && 0 == f && (e(this).trigger("slideunenough", s), f = !0)), s = 0 > s ? 0 : s, e(this).css("transform", "translateY(" + s + "px)"), e(this).trigger("slidemoving", s))) : r = void 0
            }), n.ele.on("touchend", function (t) {
                f = !1, a() && "bottom" == u && (p > o ? e(this).trigger("slidefail", s) : e(this).trigger("slidesucc", i), r = void 0)
            })
        }, clickRefresh: function (e, n) {
            var i = e.ele, a = e.top || 60;
            i.addClass("anim").css("transform", "translateY(" + a + "px)"), this.fetch({
                page: t.page[t.channel],
                size: 10,
                channel: t.channel,
                success: function (e) {
                    i.css("transform", "translateY(0px)"), n && n(e)
                },
                error: function (e) {
                    console.log(e)
                }
            })
        }, dateFormat: function (e) {
            var t = {
                "M+": this.getMonth() + 1,
                "d+": this.getDate(),
                "h+": this.getHours(),
                "m+": this.getMinutes(),
                "s+": this.getSeconds(),
                "q+": Math.floor((this.getMonth() + 3) / 3),
                S: this.getMilliseconds()
            };
            /(y+)/.test(e) && (e = e.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length)));
            for (var n in t)new RegExp("(" + n + ")").test(e) && (e = e.replace(RegExp.$1, 1 == RegExp.$1.length ? t[n] : ("00" + t[n]).substr(("" + t[n]).length)));
            return e
        }, isBottom: function (t, n) {
            var i = 0, a = t.condition;
            1 == arguments.length && "function" == typeof t && (n = t, t = void 0), window.onscroll = function () {
                var t = e(window).scrollTop(), r = e(window).height(), o = e(document).height(), s = {
                    scrollTop: t,
                    winHeight: r,
                    docHeight: o
                };
                t > i && a(s) && n && n(), i = t
            }
        }, storageLocalVal: function (e) {
            var t = e.str || "", n = e.type || "", i = e.key || "warning";
            if ("object" != typeof e || "" == e.str || void 0 == e.str || null == e.str)return localStorage.getItem("NEWAP_" + i + n);
            try {
                localStorage.setItem("NEWAP_" + i + n, t)
            } catch (a) {
                "QuotaExceededError" == a.name && console.log("\u8d85\u51fa\u672c\u5730\u5b58\u50a8\u9650\u989d\uff01\u6216\u8005\u6d4f\u89c8\u5668\u963b\u6b62\u50a8\u5b58\uff01")
            }
        }, spLocalStorage: function () {
            try {
                localStorage.setItem("spLocalStorage", "")
            } catch (e) {
                return "QuotaExceededError" == e.name && console.log("\u8d85\u51fa\u672c\u5730\u5b58\u50a8\u9650\u989d\uff01\u6216\u8005\u6d4f\u89c8\u5668\u963b\u6b62\u50a8\u5b58\uff01"), !1
            }
            return localStorage.removeItem("spLocalStorage"), !0
        }
    };
    t.indexTools = n
}(Zepto, window.NEWAP = NEWAP ? NEWAP : {}), function (e) {
    function t() {
        this.navLength = 2, this.navHeight = 1, this.navCssHeight = .82, this.hasChild = !0, this.navDOM = {}, this.hasSpecificStyle = {}, this.noBottomLine = {}, this.config = {
            topmenu: ".u_topmenu",
            wrap: "#slider_wrap",
            navbar: "#slider_wrap .u_c_items",
            navitem: ".item_cell",
            morebtn: ".u_c_more .more_channel",
            content: ".contents",
            childmenu: ".u_topmenu_child",
            child: ".slider_child .item_cell",
            children: ".slider_child"
        }, this.otherChannelConfig = {}, this.qd = n.publicMethod.getQD()
    }

    var n = NEWAP.tools;
    t.prototype = {
        initPrimarynav: function (e, t) {
            for (var n = [], i = "", a = e || n, r = this.navLength = a.length, o = (this.navHeight = parseInt(r / 7 + 1), 0); o < a.length; o++) {
                var s = a[o].childroute[0] ? a[o].childroute[0].term : "all", c = "";
                "local" === a[o].term && (c = a[o].name.length >= 4 ? "little_size" : "normal_size"), i += '<div class="' + this.config.navitem.replace(/./, "") + " nav_" + a[o].term + " " + c + '" data-child="' + s + '" data-cnn="' + a[o].term + '"><span data-href="#/' + a[o].term + '">' + a[o].name + "</span></div>"
            }
            return i
        }, initSubsidiarynav: function (t, n) {
            for (var i, a = t, r = 0; r < a.length; r++)if (i = "", !a[r].childroute || 0 == a[r].childroute.length || a[r].term in this.hasSpecificStyle) {
                if (a[r].term in this.hasSpecificStyle) {
                    var o = this.navDOM[a[r].term] ? this.navDOM[a[r].term] : "";
                    i = '<div class="slider_child line channel_' + a[r].term + '" id="channel_wrap_' + a[r].term + '"><div class="scroll_wrap_child"><div class="u_c_items">' + o + "</div></div></div>", e(this.config.childmenu).append(i)
                }
            } else {
                i = '<div class="slider_child line channel_' + a[r].term + '" id="channel_wrap_' + a[r].term + '"><div class="scroll_wrap_child"><div class="u_c_items">';
                for (var s = "", c = "", l = 0; l < a[r].childroute.length; l++) {
                    var u = a[r].term + "/subchannel/" + a[r].childroute[l].term;
                    c = (0 == l ? " current" : "") + " childchannel_" + a[r].childroute[l].term, s += '<div class="' + this.config.navitem.replace(/./, "") + c + '" data-cnn="' + a[r].childroute[l].term + '"><span data-href="#/' + u + '">' + a[r].childroute[l].name + "</span></div>" + (l != a[r].childroute.length - 1 ? "/" : "")
                }
                i = i + s + "</div></div></div>", e(this.config.childmenu).append(i)
            }
        }, show: function (t, n) {
            var i = this.initPrimarynav(t, n), a = this;
            e(this.config.navbar).append(i), e(a.config.navitem).eq(0).addClass("current"), e(a.config.morebtn).on("click", function () {
                var t = e(a.config.topmenu);
                a.morebtn(t)
            }), e(a.config.navitem, a.config.topmenu).on("click", function (e) {
                e.preventDefault();
                var t = a.clickChannel(this, a.config.topmenu), n = t.first.match("link_");
                if ("function" == typeof neteaseTracker && a.qd && neteaseTracker(!1, "http://click.portal.163.com/wap/touch/#parentNav1ChannelClick_" + t.first + a.qd, "\u8001\u7248\u4e00\u7ea7\u5bfc\u822a\u70b9\u51fb\u91cf", "clickp"), t.second || n) {
                    if (t.second)stateman.go(":firstname(" + NEWAP.routename + t.first + ")/subchannel/:secondname(" + t.second + ")", {
                        param: {
                            firstname: NEWAP.routename + t.first,
                            secondname: t.second
                        }
                    }); else if (n)try {
                        window.open(t.link)
                    } catch (e) {
                        window.location.href = t.link
                    }
                } else stateman.go(":firstname(" + NEWAP.routename + t.first + ")", {param: {firstname: NEWAP.routename + t.first}})
            }), this.hasChild && (this.initSubsidiarynav(t, n), e(a.config.navitem, a.config.childmenu).on("click", function (e) {
                var t = a.clickChannel(this, a.config.childmenu), n = t.second.match("link_");
                if ("function" == typeof neteaseTracker && a.qd && neteaseTracker(!1, "http://click.portal.163.com/wap/touch/#childNav1ChannelClick_" + t.first + "_" + t.second + a.qd, "\u8001\u7248\u4e00\u7ea7\u5bfc\u822a\u70b9\u51fb\u91cf", "clickp"), t.second && !n)stateman.go(":firstname(" + NEWAP.routename + t.first + ")/subchannel/:secondname(" + t.second + ")", {
                    param: {
                        firstname: NEWAP.routename + t.first,
                        secondname: t.second
                    }
                }); else if (n)try {
                    window.open(t.link)
                } catch (e) {
                    window.location.href = t.link
                }
            }))
        }, smoothTo: function (t) {
            try {
                var n, i = this, a = t.offsetLeft - 75;
                a = 0 > a ? 0 : a > e(i.config.wrap)[0].scrollWidth - e(i.config.wrap)[0].clientWidth ? e(i.config.wrap)[0].scrollWidth - e(i.config.wrap)[0].clientWidth : a, n && n.stop(), n = NEWAP.tools.publicMethod.simpleTransition(e(i.config.wrap)[0].scrollLeft, a, .2, function (t) {
                    e(i.config.wrap).scrollLeft(t)
                })
            } catch (r) {
            }
        }, toChannel: function (t, n) {
            for (var i = t.replace("channel=", ""), a = "" || n, r = e(this.config.navbar).find(this.config.navitem), o = !1, s = NEWAP.channelMap.length - 1; s >= 0; s--) {
                if (NEWAP.channelMap[s].term == i) {
                    r.eq(s).attr("scroll-left");
                    if (r.removeClass("current"), r.eq(s).addClass("current"), r.eq(s).attr("data-child", n), this.smoothTo(r.eq(s)[0]), e(this.config.children).removeClass("current"), e(".channel_" + i).addClass("current"), "" != a && void 0 != a && null != a)if (i in this.otherChannelConfig)e(this.otherChannelConfig[i].child).removeClass("current"), e(this.otherChannelConfig[i].childbar).find(".childchannel_" + a).addClass("current"); else {
                        e(this.config.child).removeClass("current"), e(this.config.childmenu).find(".childchannel_" + a).addClass("current");
                        try {
                            var c = e(".childchannel_" + a).position().left - window.screenWidth_;
                            c > 0 && e(this.config.childmenu).find(".channel_" + i + " .scroll_wrap_child").scrollLeft(c + 80)
                        } catch (l) {
                        }
                    }
                    0 == NEWAP.channelMap[s].childroute.length || NEWAP.channelMap[s].term in this.noBottomLine ? e(this.config.topmenu).removeClass("childinto") : e(this.config.topmenu).addClass("childinto"), o = !0
                }
                if (o)return !1
            }
        }, clickChannel: function (t, n) {
            var i, a = e(n), r = e(t).attr("data-cnn"), o = [], s = [];
            if (r.match(/^link_\w+/)) {
                if (e(t).data("child"))return s = this.checkCnnset(r), o = {first: r}, e.extend(!0, o, {link: s.route}), o;
                i = e(this.config.navbar).children(".current"), s = this.checkCnnset(i.data("cnn")), o = {
                    first: i.data("cnn"),
                    second: r
                };
                var c = s.childroute.filter(function (e) {
                    return e.term === r ? e.route : void 0
                });
                return e.extend(!0, o, {link: c ? c[0].route : "#"}), o
            }
            return e(t).parent().find(this.config.navitem).removeClass("current"), e(t).addClass("current"), r = e(t).attr("data-cnn"), i = e(this.config.navbar).children(".current"), o = {first: i.attr("data-cnn")}, s = this.checkCnnset(i.attr("data-cnn")), e(t).data("child") ? (e(this.config.morebtn).hasClass("down") && this.morebtn(a), 0 != s.childroute.length ? (s.term in this.noBottomLine || e(this.config.topmenu).addClass("childinto"), e.extend(!0, o, {second: i.attr("data-child")})) : e(this.config.topmenu).removeClass("childinto"), this.smoothTo(t)) : (i.attr("data-child", r), s.childroute.length > 0 && e.extend(!0, o, {second: i.attr("data-child")})), e.extend(!0, o, {link: s.route}), o
        }, morebtn: function (t) {
            return e(this.config.content).hasClass("anim") && e(this.config.content).removeClass("anim"), e(this.config.morebtn).hasClass("up") ? (t.css({
                height: this.navCssHeight * this.navHeight + "rem",
                overflow: "none"
            }), e(this.config.morebtn).removeClass("up"), e(this.config.morebtn).addClass("down"), e(this.config.wrap).removeClass("line"), e(this.config.wrap).addClass("box"), e(this.config.topmenu).addClass("box"), !1) : e(this.config.morebtn).hasClass("down") ? (t.css({
                height: this.navCssHeight + "rem",
                overflow: "hidden"
            }), e(this.config.morebtn).removeClass("down"), e(this.config.morebtn).addClass("up"), e(this.config.wrap).removeClass("box"), e(this.config.topmenu).removeClass("box"), e(this.config.wrap).addClass("line"), !1) : void 0
        }, checkCnnset: function (e) {
            for (var t = NEWAP.channelMap.length - 1; t >= 0; t--)if (NEWAP.channelMap[t].term == e)return NEWAP.channelMap[t]
        }, photoChildBind: function () {
            var t = this;
            e("#channel_photo").on("click", ".childchannel-photoset .item_cell", function (e) {
                var n = t.clickChannel(this, ".childchannel-photoset");
                n.second && stateman.go(":firstname(" + NEWAP.routename + n.first + ")/subchannel/:secondname(" + n.second + ")", {
                    param: {
                        firstname: NEWAP.routename + n.first,
                        secondname: n.second
                    }
                })
            })
        }, idolChildBind: function () {
            var t = this;
            e("#channel_wrap_idol").on("click", ".u_c_items .item_cell", function (e) {
                var n = t.clickChannel(this, ".slider_child_wrap.channel_idol");
                n.second && stateman.go(":firstname(" + NEWAP.routename + n.first + ")/subchannel/:secondname(" + n.second + ")", {
                    param: {
                        firstname: NEWAP.routename + n.first,
                        secondname: n.second
                    }
                })
            })
        }
    };
    var i = n.publicMethod.localParam(), a = (i.search, {2: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]}), r = NEWAP.Static.versionModel.run(a, "NEWAP_version_branch", "wap3gindex");
    if (NEWAP.Static.versionModel.changeSearch(r, "nav"), "2" !== r) {
        NEWAP.Nav = new t
    }
}(Zepto, window.NEWAP = NEWAP ? NEWAP : {}), function (e, t) {
    function n(e) {
        this.showAD = "undefined" == typeof e ? !0 : e, this.ADpath = "", this.ADDetaildata = {}, this.qd = i.publicMethod.getQD(), this.banList = []
    }

    var i = t.tools;
    n.prototype = {
        config: {
            top_ad_con_colums: ".u_topad .u-top-colums",
            top_ad_con_push: ".u_topad .u-top-push",
            float_ad_con: ".u_floatad",
            key_ad: "NEWAP_AD_"
        }, getDetailADData: function (t, n, a) {
            var r = [], o = {}, s = 0, c = [], l = this;
            e.each(t, function (t, n) {
                e.each(n, function (n, i) {
                    r.push(e.extend(i, {ADType: t}))
                })
            }), function u() {
                var t = e.extend(!0, {}, r[s]);
                i.publicMethod.jsonp({url: t.url, callbackName: n}).then(function (n) {
                    l.adStat(n.stat_img), c.push(e.extend(t, n)), s == r.length - 1 ? (e.each(c, function (e, t) {
                        o[t.ADType] = o[t.ADType] || [], o[t.ADType].push(t)
                    }), a && a(o)) : (s += 1, u())
                }, function () {
                    s == r.length - 1 ? (c.push(t), e.each(c, function (e, t) {
                        o[t.ADType] = o[t.ADType] || [], o[t.ADType].push(t)
                    }), a && a(o)) : (c.push(t), s += 1, u())
                })
            }()
        }, getChannelAllAD: function (t, n, r, o, s) {
            var c, l = e.Deferred(), u = 1, h = !1, d = this;
            return !this.showAD || this.BanChannelAD(this.banList, o, s) ? (e(window).trigger("noAD", [r, o, s]), l.promise()) : (c = setInterval(function () {
                u += 1, u > 5 && (h = !0, clearInterval(c), e(window).trigger("noAD", [r, o, s]))
            }, 500), t ? i.publicMethod.jsonp({url: t, callbackName: n}).then(function (t) {
                h || (clearInterval(c), t = a.banModuleAD(d.banList, t, o, s), e(window).trigger("getADListSucc", [t, r, o, s]), d.getDetailADData(t, "ad_info", function (t) {
                    t = a.banModuleAD(d.banList, t, o, s), e(window).trigger("getADSucc", [t, o, s]), l.resolve()
                }))
            }, function () {
                l.reject()
            }) : (l.resolve(), clearInterval(c), e(window).trigger("noAD", [r, o, s])), l.promise())
        }, adStat: function (t) {
            "array" == e.type(t) && t.length > 0 && e.each(t, function (e, t) {
                var n = new Image;
                n.src = t, console.log(n)
            })
        }, replaceListAD: function (t, n) {
            if (!n || !n.list)return !1;
            var a = i.publicMethod.arrToObj(n.list, "adposition");
            e.each(a, function (e, n) {
                var i = t.eq(e - 1);
                try {
                    n.type ? i.hasClass("m_papa_no") && i.replaceWith(Handlebars.templates[n.type + "_tpl"](n)) : i.hide()
                } catch (a) {
                    console.log(a)
                }
            })
        }, replacePhotochannelListAD: function (e, t) {
            this.replaceListAD(e.find(".content-list-east section"), t), this.replaceListAD(e.find(".content-list-west section"), t)
        }, replaceFocusAD: function (t, n) {
            if (!n.focus)return !1;
            var a = n.focus, r = i.publicMethod.arrToObj(a, "adposition");
            e.each(r, function (e, n) {
                var i = t.eq(e - 1);
                n.type ? (i.addClass("focus_papa"), i.find("a").attr("href", n.link), i.find("img").attr("src", n.pic_info[0].url), i.find(".title").text(n.title)) : i.remove()
            })
        }, setADPath: function (e, t, n) {
            var a, r, n, o = this;
            a = i.publicMethod.find(e, function (e, n) {
                return n.term === t
            }), r = a.childroute, r.length > 0 ? (n = i.publicMethod.find(r, function (e, t) {
                return t.term === n
            }), o.ADpath = n ? n.path : "") : this.ADpath = a.path
        }, setADDetailData: function (e, t, n, a) {
            var r, o;
            r = i.publicMethod.find(e, function (e, n) {
                return n.term === t
            }), o = r.childroute, o.length > 0 ? (this.ADDetaildata[t] = {}, this.ADDetaildata[t][n] = a) : this.ADDetaildata[t] = a
        }, getADDetailData: function (e, t) {
            return this.ADDetaildata[e] ? t ? this.ADDetaildata[e][t] : this.ADDetaildata[e] : void 0
        }, BanChannelAD: function (e, t, n) {
            var a, r;
            return r = i.publicMethod.find(e, function (e, t) {
                return "whole" === t.channel
            }), a = n ? i.publicMethod.find(e, function (e, i) {
                return i.channel === t && i.child === n
            }) : i.publicMethod.find(e, function (e, n) {
                return n.channel === t
            }), r && 0 == r.module.length ? !0 : !(!a || 0 != a.module.length)
        }, banModuleAD: function (t, n, a, r) {
            if (!n)return !1;
            var o, s;
            return s = i.publicMethod.find(t, function (e, t) {
                return "whole" === t.channel
            }), o = r ? i.publicMethod.find(t, function (e, t) {
                return t.channel === a && t.child === r
            }) : i.publicMethod.find(t, function (e, t) {
                return t.channel === a
            }), s && s.module.length > 0 && e.each(s.module, function (e, t) {
                delete n[t]
            }), o && o.module.length > 0 && e.each(o.module, function (e, t) {
                delete n[t]
            }), n
        }, render: function (e, t) {
            e = "object" == typeof e ? e : {};
            var n = e.pic_info, i = e.link, a = e.type, r = {columsAD: 0, enlargeAD: 0, pushAD: 0}, o = {floatAD: 0};
            if ("banner" == e.ADType) {
                if (!(a in r))return !1
            } else {
                if ("bottom" != e.ADType)return !1;
                if (!(a in o))return !1
            }
            switch (a) {
                case"columsAD":
                    return this.putColumn(n[0].url, i);
                case"enlargeAD":
                    return this.putEnlarge(n, i, t);
                case"pushAD":
                    return this.putPush(n[0].url, i, t);
                case"floatAD":
                    return this.putFloat(n[0].url, i, t);
                case"":
                    return !1
            }
        }, storageAD: function (e) {
            if ("object" != typeof e || "" == e.str || void 0 == e.str || null == e.str)return JSON.parse(localStorage.getItem(this.config.key_ad + e.cnn + e.type));
            try {
                localStorage.setItem(this.config.key_ad + e.cnn + e.type, e.str)
            } catch (t) {
                "QuotaExceededError" == t.name && console.log("\u8d85\u51fa\u672c\u5730\u5b58\u50a8\u9650\u989d\uff01\u6216\u8005\u6d4f\u89c8\u5668\u963b\u6b62\u50a8\u5b58\uff01")
            }
        }, putColumn: function (t, n) {
            var i = '<div class="u-ad-wrap column"><a href="' + n + '"><img src="' + t + '" alt=""></a></div>';
            e(this.config.top_ad_con_colums).html(i)
        }, putEnlarge: function (t, n, i) {
            var a, r, o, s = this, c = 0, l = {all: 0, news: 0, sports: 0};
            try {
                a = s.storageAD({cnn: i, type: "enlarge"})
            } catch (u) {
            }
            if ("" != a && null != a ? (r = new Date - new Date(a.enlarge.time) < 36e5 ? a.enlarge.times < 1 ? !0 : !1 : this.resetVal(i, "enlarge"), c = "changed" == r ? 0 : parseInt(a.enlarge.times) + 1) : r = !0, o = i in l, !(t[0].url && t[1].url && r && o))return !1;
            var h = t[0].url ? t[0].url : "images/bg_img_sm.png", d = new Image, p = '<div class="u-ad-wrap enlarge"><a href="' + n + '"><img src="' + h + '" alt=""></a></div>';
            e(this.config.top_ad_con_push).html(""), e(this.config.top_ad_con_push).html(p), d.onload = function () {
                e(s.config.top_ad_con_push).find(".enlarge").addClass("start"), setTimeout(function () {
                    e(s.config.top_ad_con_push).find(".enlarge").removeClass("start"), e(s.config.top_ad_con_push).find(".enlarge").addClass("end"), setTimeout(function () {
                        e(s.config.top_ad_con_push).find("img").attr({src: t[1].url ? t[1].url : "images/bg_img_sm.png"}), e(window).trigger("putEnlargeOver")
                    }, 1e3)
                }, 3e3)
            }, d.src = h;
            var f = '{"enlarge":{"time":"' + new Date + '","times":"' + c + '"}}';
            s.storageAD({str: f, cnn: i, type: "enlarge"})
        }, putPush: function (t, n, i) {
            var a, r, o, s = this, c = 0, l = 2, u = {all: 0, news: 0, sports: 0};
            try {
                a = s.storageAD({cnn: i, type: "push"})
            } catch (h) {
            }
            if ("sports" == i && (l = 1), "" != a && null != a ? (r = new Date - new Date(a.push.time) < 36e5 ? a.push.times < l - 1 ? !0 : !1 : this.resetVal(i, "push"), c = "changed" == r ? 0 : parseInt(a.push.times) + 1) : r = !0, o = i in u, !r || !o)return !1;
            var d = t ? t : "images/bg_img_sm.png", p = new Image, f = '<div class="u-ad-wrap push"><a href="' + n + '"><img src="' + d + '" alt=""></a></div>';
            e(this.config.top_ad_con_push).html(""), e(this.config.top_ad_con_push).html(f), p.onload = function () {
                e(s.config.top_ad_con_push).find(".push").addClass("start"), setTimeout(function () {
                    e(s.config.top_ad_con_push).find(".push").removeClass("start")
                }, 3e3)
            }, p.src = d;
            var m = '{"push":{"time":"' + new Date + '","times":"' + c + '"}}';
            s.storageAD({str: m, cnn: i, type: "push"})
        }, putFloat: function (t, n, i) {
            var a, r, o = document.getElementsByClassName("u_floatad")[0], s = 0, c = this;
            try {
                a = c.storageAD({cnn: i, type: "float"})
            } catch (l) {
            }
            if ("" != a && null != a ? (r = new Date - new Date(a.floatad.time) < 36e5 ? a.floatad.times < 1 ? !0 : !1 : this.resetVal(i, "float"), s = "changed" == r ? 0 : parseInt(a.floatad.times) + 1) : r = !0, o || !r || "all" != i)return !1;
            var c = this, u = t ? t : "images/bg_img_sm.png", h = new Image, d = '<div class="u_floatad"><div class="u-ad-wrap float"><a href="' + n + '"><img src="' + u + '" alt=""></a></div><div class="u-ad-close iconfont">&#xe610;</div></div>';
            e("body").append(d), h.onload = function () {
                e(c.config.float_ad_con).addClass("start"), e(c.config.float_ad_con).find(".u-ad-close").on("click", function () {
                    e(c.config.float_ad_con).remove()
                }), e(c.config.float_ad_con).find(".u-ad-wrap").on("click", function (e) {
                    "function" == typeof neteaseTracker && c.qd && neteaseTracker(!1, "http://click.portal.163.com/wap/touch/#floatADClick" + c.qd, "\u6d6e\u52a8\u5e7f\u544a\u70b9\u51fb\u91cf", "clickp")
                })
            }, h.src = u;
            var p = '{"floatad":{"time":"' + new Date + '","times":"' + s + '"}}';
            c.storageAD({str: p, cnn: i, type: "float"})
        }, resetVal: function (e, t) {
            return this.storageAD({str: "", cnn: e, type: t}), "changed"
        }, recurSetting: function (e, t, n) {
        }
    };
    var a = t.ad = new n
}(Zepto, window.NEWAP = NEWAP ? NEWAP : {}), function (e) {
    "use strict";
    var t = function (e, t) {
        var n;
        return e = e || window.location.search, t = t || window.location.hash, n = function (e, t) {
            var n;
            return e ? (n = {}, e.replace(t, function (e, t, i, a) {
                n[t] = a
            }), n) : void 0
        }, {
            search: n(e, new RegExp("([^?=&]+)(=([^&]*))?", "g")) || {},
            hash: n(t, new RegExp("([^#=&]+)(=([^&]*))?", "g")) || {}
        }
    }, n = function (e) {
        var t = document.createElement("div");
        t.id = "popWin", document.body.insertBefore(t, null), t = $(t), t.html(e).css({display: "block"}).addClass("anim_show"), setTimeout(function () {
            t && (t.remove(), t = null)
        }, 2200)
    }, i = function (e, n, i) {
        var r, e = new a(e), o = e.href.match(/\?/) ? "" : "?", s = e.search;
        s += o;
        for (var c in n)if (n[c] && ("string" == typeof n[c] || "number" == typeof n[c]))if (i) {
            var l = t(s);
            if (l.search[c]) {
                var u = new RegExp(c + "=([^&]*)", "");
                s = s.replace(u, function (e, t) {
                    return c + "=" + n[c]
                })
            } else s += "&" + c + "=" + n[c]
        } else s += "&" + c + "=" + n[c];
        return s = s.replace(/\?&/g, function () {
            return "?"
        }), r = e.origin + e.pathname + s + e.hash
    }, a = function (e) {
        var t = document.createElement("a");
        return t.href = e, t
    };
    e.OpenUrlShare = function (e) {
        this.shareContent = e || {
                    shareSummary: "",
                    shareTitle: "",
                    shareImg: "",
                    shareLink: ""
                }, this.params = {
            lofter: {from: "news", title: "", content: "", sourceUrl: "", charset: "utf8"},
            wb: {appkey: "603437721", url: "", title: "", pic: ""},
            renren: {resourceUrl: "", title: "", description: "", pic: ""},
            qq: {url: "", title: "", summary: "", pics: ""},
            yx: {type: "webpage", url: "", title: "", desc: "", appkey: "yx8997975393564cb89fc3a0350833afb1", pic: ""},
            youdao: {title: "", summary: ""}
        }, this.urls = {
            lofter: "http://www.lofter.com/sharetext/?",
            yx: "http://open.yixin.im/share?",
            wb: "http://service.weibo.com/share/share.php?",
            qq: "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?",
            renren: "http://widget.renren.com/dialog/share?",
            youdao: "http://note.youdao.com/memory?"
        }
    }, e.OpenUrlShare.prototype = {
        extend: function (e, t) {
            var n, i;
            i = [];
            for (n in e)e.hasOwnProperty(n) && "undefined" != typeof t[n] ? i.push(t[n] = e[n]) : i.push(void 0);
            return i
        }, shareToSns: function (e) {
            var t = this.shareContent.shareSummary, n = this.shareContent.shareTitle, a = this.shareContent.shareImg, r = this.params;
            e && this.extend({
                title: n,
                userdesc: t,
                description: t,
                desc: t,
                info: t,
                text: t,
                content: t,
                summary: t,
                pic: a,
                pics: a
            }, r[e]);
            var o = this.getShareUrl();
            r.lofter.sourceUrl = i(o, {f: "lofter"}), r.wb.url = i(o, {f: "wb"}), r.renren.resourceUrl = i(o, {f: "renren"}), r.qq.url = i(o, {f: "qq"}), r.yx.url = i(o, {f: "yx"}), r.youdao.url = i(o, {f: "youdao"}), "wb" === e && (r.wb.title = n);
            var s;
            s = [];
            for (var c in r[e])r[e].hasOwnProperty(c) && null != r[e][c] && s.push(c.toString() + "=" + encodeURIComponent(r[e][c].toString() || ""));
            window.open(this.urls[e] + s.join("&"))
        }, getShareUrl: function () {
            var e, n = this.shareContent.shareLink || location.href, r = new a(n).search, o = t(r), s = {};
            return o.search.s || (s.s = 163), e = +o.search.w, e ? s.w = e + 1 : s.w = 1, n = i(n, s, 1), n = n.replace(/\?$/, function () {
                return ""
            })
        }, changeShareConfig: function (e) {
            this.shareContent = e || {shareSummary: "", shareTitle: "", shareImg: "", shareLink: ""}
        }
    };
    var r = navigator.userAgent.indexOf("Android") > -1 || navigator.userAgent.indexOf("Adr") > -1, o = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), s = null != navigator.userAgent.match(/OS 9_/i), c = navigator.userAgent.indexOf("MQQBrowser") > -1, l = !!navigator.userAgent.match(/NewsApp/gi), u = !!navigator.userAgent.match(/ucbrowser/gi);
    e.Weixinshare = function (e) {
        this.flag = e && e.flag || "friendsArea", this.title = e && e.title || "\u624b\u673a\u7f51\u6613\u7f51", this.shareurl = e && e.shareLink || "http://3g.163.com/touch/", this.summary = e && e.summary || "\u624b\u673a\u7f51\u6613\u7f51", this.shareimg = e && e.shareImg || "http://img2.cache.netease.com/f2e/wap/common/images/weixinfixed.png", this.isAppendQQshareJS = !1, this.isRunning = !1, this.isWakeup = !1, this.pageVisibility = this.pageVisibilityTestFn();
        var t = this;
        this.pageVisibility.visibilitychange(function () {
            t.isWakeup = !0, t.isRunning = !1
        })
    }, e.Weixinshare.prototype = {
        inUCShare: function () {
            var e;
            if (r) {
                var t = this;
                e = "friendsArea" == this.flag ? "WechatTimeline" : "WechatFriends", setTimeout(function () {
                    ucweb.startRequest("shell.page_share", [t.title, t.summary, t.shareurl, e, "", "", ""])
                }, 500)
            } else if (o) {
                var t = this;
                e = "friendsArea" == this.flag ? "kWeixinFriend" : "kWeixin", setTimeout(function () {
                    ucbrowser.web_share(t.title, t.summary, t.shareurl, e, "", "", "")
                }, 500)
            }
        }, inQQbrowserShare: function () {
            var e;
            "friends" == this.flag ? e = 1 : "friendsArea" == this.flag && (e = 8);
            var t = {url: this.shareurl, title: this.title, img_url: this.shareimg, to_app: e, cus_txt: this.summary};
            this.isAppendQQshareJS ? browser && browser.app && browser.app.share ? browser.app.share(t) : "" : this.appendJS("http://jsapi.qq.com/get?api=app.share", function () {
                browser && browser.app && browser.app.share ? browser.app.share(t) : ""
            }, this.isAppendQQshareJS)
        }, inNewsappShare: function () {
            var e, t = document.createElement("iframe"), n = document.createElement("div"), i = document.createElement("div"), a = document.createElement("div"), r = document.createElement("div");
            t.style.display = "none", n.style.display = "none", i.style.display = "none", a.style.display = "none", r.style.display = "none", n.id = "__newsapp_sharewxtext", n.innerHTML = this.summary, document.body.appendChild(n), i.id = "__newsapp_sharewxtitle", i.innerHTML = this.title, document.body.appendChild(i), a.id = "__newsapp_sharewxthumburl", a.innerHTML = this.shareimg, document.body.appendChild(a), r.id = "__newsapp_sharewxurl", r.innerHTML = this.shareurl, document.body.appendChild(r), document.body.appendChild(t), e = "share://", t.src = e
        }, inOtherserShare: function () {
            var e;
            e = location.href.match(/\?/) ? "&" : "?";
            var t = document.createElement("iframe"), n = "mttbrowser://url=" + location.href + e + "shareFlag=" + this.flag;
            t.style.display = "none", s ? location.href = n : t.src = n
        }, browserRecognize: function () {
            var e;
            return e = c ? "isQQbrowser" : u ? "isUC" : l ? "isNewsapp" : "isOther"
        }, testShareResult: function () {
            var e, t = 5e3, i = this;
            setTimeout(function () {
                e = new Date, e - window.fnStartTime <= t + 550 && n("\u81ea\u52a8\u5206\u4eab\u6ca1\u6709\u6210\u529f\uff0c\u4f60\u53ef\u4ee5\u5c1d\u8bd5\u624b\u52a8\u5206\u4eab\u4e0b"), i.isRunning = !1
            }, t)
        }, appendJS: function (e, t, n) {
            var i = document.createElement("script");
            i.src = e, document.head.appendChild(i), i.onload = function () {
                n && (n = !0), t && t()
            }
        }, changeShareConfig: function (e) {
            this.flag = e && e.flag || "friendsArea", this.title = e && e.title || "\u624b\u673a\u7f51\u6613\u7f51", this.shareurl = e && e.shareLink || "http://3g.163.com/touch/", this.summary = e && e.summary || "\u624b\u673a\u7f51\u6613\u7f51"
        }, pageVisibilityTestFn: function () {
            var e, t = function (e, t) {
                return "" !== e ? e + t.slice(0, 1).toUpperCase() + t.slice(1) : t
            }, n = function () {
                var n = !1;
                return "number" == typeof window.screenX && ["webkit", "moz", "ms", "o", ""].forEach(function (i) {
                    0 == n && void 0 != document[t(i, "hidden")] && (e = i, n = !0)
                }), n
            }(), i = function () {
                return n ? document[t(e, "hidden")] : void 0
            }, a = function () {
                return n ? document[t(e, "visibilityState")] : void 0
            };
            return {
                hidden: i(), visibilityState: a(), visibilitychange: function (t, r) {
                    return r = !1, n && "function" == typeof t ? document.addEventListener(e + "visibilitychange", function (e) {
                        this.hidden = i(), this.visibilityState = a(), t.call(this, e)
                    }.bind(this), r) : void 0
                }
            }
        }, getShareUrl: function (e) {
            var n, i = e || location.href, a = i.match(/\?.*/) && i.match(/\?.*/)[0] || "", r = t(a);
            return r.search.s || (i += i.match(/\?/) ? "&s=163" : "?s=163"), n = +r.search.w, n ? i = i.replace(/&w=(\d+)/g, function (e, t) {
                return "&w=" + ++t
            }) : i += "&w=1", "friends" == this.flag ? i += "&from=wxfriends" : "friendsArea" == this.flag && (i += "&from=wxfriendsArea"), i
        }, run: function () {
            this.shareurl = this.getShareUrl(this.shareurl), this.isRunning = !0;
            var e;
            switch (e = this.browserRecognize(), window.fnStartTime = new Date, e) {
                case"isUC":
                    this.inUCShare();
                    break;
                case"isQQbrowser":
                    this.inQQbrowserShare();
                    break;
                case"isOther":
                    this.inOtherserShare();
                    break;
                case"isNewsapp":
                    this.inNewsappShare();
                    break;
                default:
                    alert("\u6ca1\u6709\u6267\u884c\u4efb\u4f55share\u65b9\u6cd5")
            }
            var t = this;
            "isOther" == e && setTimeout(function () {
                t.isWakeup || t.testShareResult()
            }, 500)
        }
    }
}(window.NEWAPShare = window.NEWAPShare || {}), function (e, t, n) {
    n.Static = n.Static || {};
    var i = n.Static, a = n.tools, r = a.publicMethod.localParam().search;
    n.InstanceList = n.InstanceList || {};
    var o = "";
    r.qd ? o = "_" + r.qd : "sogou" == r.from ? o = "_sogou" : "gionee" == r.from ? o = "_gionee_from" : "gionee" == r.lb && (o = "_gionee_lb"), i.Share = function (e, n, i) {
        this.container = e, this.docid = i && i.docid || "", this.shareContent = n || {
                    shareSummary: "",
                    shareTitle: "",
                    shareImg: "",
                    shareLink: ""
                }, this.template = t.templates.share_tpl({})
    }, i.Share.prototype = {
        itemClick: function (t) {
            var i, r, s, c, l, u, h = a.publicMethod.localParam().search.w || 1, d = t.target;
            for (r = this.shareContent.shareSummary, s = this.shareContent.shareTitle, i = this.shareContent.shareImg, c = this.shareContent.shareLink || location.href; d.classList && !d.classList.contains("item");)d = d.parentNode;
            if (d.classList) {
                if (d.classList.contains("more-share"))return e(d.parentNode).find(".item").removeClass("hide"), e(d).remove();
                if (d.classList.contains("js-openurl")) {
                    var p;
                    return u = d.dataset.type, l = {
                        shareTitle: s,
                        shareSummary: r,
                        shareImg: i,
                        shareLink: c
                    }, "wb" == u && (l.shareTitle = "\u5206\u4eab\u7f51\u6613\u65b0\u95fb\uff1a\u300c" + s + "," + r + "\u300d"), "wb" == u && (location.pathname.match(/open/) || location.hash.match(/channel=open/)) && (l.shareTitle = "\u72ec\u5b66\u800c\u65e0\u53cb\uff0c\u5219\u5b64\u964b\u800c\u5be1\u95fb\u3002\u8bda\u610f\u63a8\u8350\u7f51\u6613\u516c\u5f00\u8bfe\u300a" + s + "\u300b @\u7f51\u6613\u516c\u5f00\u8bfe \u671b\u8bf8\u4f4d\u8d50\u6559"), n.InstanceList.openUrlShare ? n.InstanceList.openUrlShare.changeShareConfig(l) : (p = new NEWAPShare.OpenUrlShare(l), n.InstanceList.openUrlShare = p), "function" == typeof neteaseTracker && neteaseTracker(!1, "http://sps.163.com/func/?func=sharedone&s=wap" + o + "&spss=163&spst=0&docid=" + this.docid + "&spsw=" + h + "&spsf=" + u, "", "sps"), n.InstanceList.openUrlShare.shareToSns(u)
                }
                if (d.classList.contains("js-schema")) {
                    var f, m;
                    u = d.dataset.type, "wx" == u ? m = "friends" : "wxzone" == u && (m = "friendsArea"), l = {
                        flag: m,
                        title: s,
                        summary: r,
                        shareImg: i,
                        shareLink: c
                    }, "friendsArea" == m && (location.pathname.match(/idol/) || location.hash.match(/channel=idol/)) && (l.title = r), n.InstanceList.weixinshare ? (n.InstanceList.weixinshare.changeShareConfig(l), n.InstanceList.weixinshare.run()) : (f = new NEWAPShare.Weixinshare(l), f.run(), n.InstanceList.weixinshare = f), "function" == typeof neteaseTracker && neteaseTracker(!1, "http://sps.163.com/func/?func=sharedone&s=wap" + o + "&spss=163&spst=0&docid=" + this.docid + "&spsw=" + h + "&spsf=" + u, "", "sps")
                }
            }
        }, itemEach: function (t) {
            a.uaMatch.isUCBrowser || a.uaMatch.isQQBrowser && !a.uaMatch.isWeixin || (e(this.itemWrapper).addClass("nowxshare"), e(t).each(function (t) {
                e(this).hasClass("js-schema") && e(this).hide()
            }))
        }, render: function () {
            var t = this;
            this.itemWrapper = ".h5share_panel", e(this.container).html(this.template), this.itemEach(this.itemWrapper + " .item");
            var t = this;
            e(this.itemWrapper).click(function (e) {
                t.itemClick(e)
            }), a.uaMatch.isUCBrowser ? e(this.container).bind("click", function () {
                window.scrollTo(100, 1), e(t.container).toggle(), document.removeEventListener("touchmove", a.publicMethod.preDefault, !1)
            }) : e(this.container).on("click", function (n) {
                for (var i = n.target || n.srcElement, r = !1; -1 == i.className.indexOf("js-share-mask");)0 == i.className.indexOf("h5share_panel ") && (r = !0), i = i.parentNode;
                r || (e(t.container).toggle(), document.removeEventListener("touchmove", a.publicMethod.preDefault, !1))
            }), e(window).on("Share:show", function () {
                a.uaMatch.isNewsapp ? t.inNewsappShare() : (e(".js-share-mask").toggle(), document.addEventListener("touchmove", a.publicMethod.preDefault, !1)), "function" == typeof neteaseTracker && neteaseTracker(null, "http://click.portal.163.com/wap/wap3garticle/#cooper_jump_clickshare", document.title, "clickp")
            })
        }, changeShareConfig: function (e) {
            this.shareContent = e || {shareSummary: "", shareTitle: "", shareImg: "", shareLink: ""}
        }, inNewsappShare: function () {
            var e, t = document.createElement("iframe"), n = document.createElement("div"), i = document.createElement("div"), a = document.createElement("div"), r = document.createElement("div");
            t.style.display = "none", n.style.display = "none", i.style.display = "none", a.style.display = "none", r.style.display = "none", n.id = "__newsapp_sharewxtext", n.innerHTML = this.shareContent.shareSummary,
                    document.body.appendChild(n), i.id = "__newsapp_sharewxtitle", i.innerHTML = this.shareContent.shareTitle, document.body.appendChild(i), a.id = "__newsapp_sharewxthumburl", a.innerHTML = this.shareContent.shareImg, document.body.appendChild(a), r.id = "__newsapp_sharewxurl", r.innerHTML = (this.shareContent.shareLink || location.href) + "from=newsapp", document.body.appendChild(r), document.body.appendChild(t), e = "share://0", t.src = e
        }
    }, i.WXinnerShare = function (e) {
        this.container = e, this.template = t.templates.weixinshare_tpl({})
    }, i.WXinnerShare.prototype.render = function () {
        e(this.container).html(this.template), e("body").addClass("in-weixin"), e(this.container).bind("click", function () {
            e(this).toggle(), document.removeEventListener("touchmove", a.publicMethod.preDefault, !1)
        }), e(window).on("Share:show", function () {
            e(".js-share-mask").toggle(), "function" == typeof neteaseTracker && neteaseTracker(null, "http://click.portal.163.com/wap/wap3garticle/#cooper_jump_clickshare", document.title, "clickp"), document.addEventListener("touchmove", a.publicMethod.preDefault, !1)
        })
    }, i.QQAPPinnerShare = function (e) {
        this.container = e, this.template = t.templates.QQshare_tpl({})
    }, i.QQAPPinnerShare.prototype.render = function () {
        e(this.container).html(this.template), e("body").addClass("in-QQ"), e(this.container).bind("click", function () {
            e(this).toggle(), document.removeEventListener("touchmove", a.publicMethod.preDefault, !1)
        }), e(window).on("Share:show", function () {
            e(".js-share-mask").toggle(), "function" == typeof neteaseTracker && neteaseTracker(null, "http://click.portal.163.com/wap/wap3garticle/#cooper_jump_clickshare", document.title, "clickp"), document.addEventListener("touchmove", a.publicMethod.preDefault, !1)
        })
    }
}(Zepto, Handlebars, window.NEWAP = window.NEWAP || {}), function () {
    "use strict";
    var e = {
        tuijian: {
            name: "\u63a8\u8350",
            channel: "all",
            route: "",
            articleList: {topicid: "BA8J7DG9wangning", topdataPriority: 999},
            appointList: {topicid: "BJITCBT7wangning", size: 5},
            secondFocus: {topicid: "BIP1MFVDwangning", size: 2, topdataPriority: 999}
        },
        war: {
            name: "\u519b\u4e8b",
            channel: "war",
            route: "",
            articleList: {topicid: "BAI67OGGwangning", topdataPriority: 89},
            tiename: "news",
            logoclassname: "war_logo"
        },
        "0001": {
            name: "\u65b0\u95fb",
            channel: "news",
            route: "",
            articleList: {topicid: "BBM54PGAwangning", topdataPriority: 999},
            tiename: "news",
            logoclassname: "news_logo",
            topList: {topicid: "BCR0CBQ2wangning", size: 1},
            appointList: {topicid: "BHB31870wangning", size: 5},
            child: {
                discovery: {
                    name: "\u63a2\u7d22",
                    channel: "news",
                    route: "",
                    articleList: {topicid: "BD29JDBPwangning", topdataPriority: 999}
                },
                society: {
                    name: "\u793e\u4f1a",
                    channel: "news",
                    route: "",
                    articleList: {topicid: "BCR1UC1Qwangning", topdataPriority: 999}
                },
                domestic: {
                    name: "\u56fd\u5185",
                    channel: "news",
                    route: "",
                    articleList: {topicid: "BD29LPUBwangning", topdataPriority: 999}
                },
                international: {
                    name: "\u56fd\u9645",
                    channel: "news",
                    route: "",
                    articleList: {topicid: "BD29MJTVwangning", topdataPriority: 999}
                }
            }
        },
        "0003": {
            name: "\u5a31\u4e50",
            channel: "ent",
            route: "",
            articleList: {topicid: "BA10TA81wangning", topdataPriority: 200},
            tiename: "ent",
            logoclassname: "ent_logo",
            secondFocus: {topicid: "BBM8NE05wangning", topdataPriority: 999},
            child: {
                television: {
                    name: "\u7535\u89c6",
                    channel: "ent",
                    route: "",
                    articleList: {topicid: "BD2A86BEwangning", topdataPriority: 999}
                },
                movie: {
                    name: "\u7535\u5f71",
                    channel: "ent",
                    route: "",
                    articleList: {topicid: "BD2A9LEIwangning", topdataPriority: 999}
                },
                star: {
                    name: "\u660e\u661f",
                    channel: "ent",
                    route: "",
                    articleList: {topicid: "BD2AB5L9wangning", topdataPriority: 999}
                },
                music: {
                    name: "\u97f3\u4e50",
                    channel: "ent",
                    route: "",
                    articleList: {topicid: "BD2AC4LMwangning", topdataPriority: 999}
                }
            }
        },
        "0004": {
            name: "\u72ec\u5bb6",
            channel: "exclusive",
            route: "",
            articleList: {topicid: "BAI5E21Owangning", topdataPriority: 100},
            tiename: "news",
            logoclassname: "exclusive_logo",
            child: {
                qsyk: {
                    name: "\u8f7b\u677e\u4e00\u523b",
                    channel: "exclusive",
                    route: "",
                    articleList: {topicid: "BD21K0DLwangning", topdataPriority: 999}
                },
                pbgt: {
                    name: "\u80d6\u7f16\u602a\u8c08",
                    channel: "exclusive",
                    route: "",
                    articleList: {topicid: "BD27I3V6wangning", topdataPriority: 999}
                },
                ydictionary: {
                    name: "\u6613\u767e\u79d1",
                    channel: "exclusive",
                    route: "",
                    articleList: {topicid: "BD27JIQ4wangning", topdataPriority: 999}
                },
                chatinnight: {
                    name: "\u6df1\u591c\u7545\u804a",
                    channel: "exclusive",
                    route: "",
                    articleList: {topicid: "BD27RALJwangning", topdataPriority: 999}
                },
                realityshow: {
                    name: "\u771f\u4eba\u79c0",
                    channel: "exclusive",
                    route: "",
                    articleList: {topicid: "BD27T12Kwangning", topdataPriority: 999}
                },
                clock7news: {
                    name: "\u65b0\u95fb\u4e03\u70b9\u6574",
                    channel: "exclusive",
                    route: "",
                    articleList: {topicid: "BD27UEEMwangning", topdataPriority: 999}
                },
                todayvoice: {
                    name: "\u4eca\u65e5\u4e4b\u58f0",
                    channel: "exclusive",
                    route: "",
                    articleList: {topicid: "BD284UM8wangning", topdataPriority: 999}
                }
            }
        },
        "0005": {
            name: "\u4f53\u80b2",
            channel: "sports",
            route: "",
            articleList: {topicid: "BA8E6OEOwangning", topdataPriority: 250},
            tiename: "sports",
            logoclassname: "sports_logo",
            secondFocus: {topicid: "BBM8S6RFwangning", topdataPriority: 999},
            articleListHead: {topicid: "BBUOPQ56wangning", topdataPriority: 999},
            child: {
                nba: {
                    name: "NBA",
                    channel: "sports",
                    route: "",
                    articleList: {topicid: "BD2AQH4Qwangning", topdataPriority: 999}
                },
                cba: {
                    name: "CBA",
                    channel: "sports",
                    route: "",
                    articleList: {topicid: "BD2ARVG2wangning", topdataPriority: 999}
                },
                csl: {
                    name: "\u4e2d\u8d85",
                    channel: "sports",
                    route: "",
                    articleList: {topicid: "BD2ASUDCwangning", topdataPriority: 999}
                },
                isocce: {
                    name: "\u56fd\u9645\u8db3\u7403",
                    channel: "sports",
                    route: "",
                    articleList: {topicid: "BD2ATMK0wangning", topdataPriority: 999}
                },
                synthesis: {
                    name: "\u7efc\u5408",
                    channel: "sports",
                    route: "",
                    articleList: {topicid: "BD2B0KQ2wangning", topdataPriority: 999}
                }
            }
        },
        "0006": {
            name: "\u65c5\u6e38",
            channel: "travel",
            route: "",
            articleList: {topicid: "BEO4GINLwangning", topdataPriority: 999}
        },
        "0007": {
            name: "\u81ea\u8425\u623f\u4ea7",
            channel: "house",
            route: "",
            articleList: {topicid: "BAI6MTODwangning", topdataPriority: 97}
        },
        "0008": {
            name: "\u6c7d\u8f66",
            channel: "auto",
            route: "",
            articleList: {topicid: "BA8DOPCSwangning", topdataPriority: 100},
            tiename: "auto",
            logoclassname: "auto_logo",
            secondFocus: {topicid: "BBM9IU4Cwangning", topdataPriority: 999}
        },
        "0009": {
            name: "\u79d1\u6280",
            channel: "tech",
            route: "",
            articleList: {topicid: "BA8D4A3Rwangning", topdataPriority: 200},
            tiename: "tech",
            logoclassname: "tech_logo",
            secondFocus: {topicid: "BBM95HDLwangning", topdataPriority: 999},
            child: {
                club: {
                    name: "\u521b\u4e1aClub",
                    channel: "tech",
                    route: "",
                    articleList: {topicid: "BGGMPEISwangning", topdataPriority: 999}
                },
                intelligent: {
                    name: "\u667a\u80fd\u786c\u4ef6",
                    channel: "tech",
                    route: "",
                    articleList: {topicid: "BGGN1FHGwangning", topdataPriority: 999}
                },
                neview: {
                    name: "\u6613\u89c1",
                    channel: "tech",
                    route: "",
                    articleList: {topicid: "BGGN3FV3wangning", topdataPriority: 999}
                },
                threeclock: {
                    name: "\u4e09\u70b9\u6574",
                    channel: "tech",
                    route: "",
                    articleList: {topicid: "BGGN5IDVwangning", topdataPriority: 999}
                },
                nejudge: {
                    name: "\u6613\u8bc4",
                    channel: "tech",
                    route: "",
                    articleList: {topicid: "BGGN89A5wangning", topdataPriority: 999}
                }
            }
        },
        "0010": {
            name: "\u5bb6\u5c45",
            channel: "home",
            route: "",
            articleList: {topicid: "BAI6P3NDwangning", topdataPriority: 90},
            tiename: "home",
            logoclassname: "home_logo"
        },
        "0011": {
            name: "\u624b\u673a",
            channel: "mobile",
            route: "",
            articleList: {topicid: "BAI6I0O5wangning", topdataPriority: 999},
            tiename: "news",
            logoclassname: "mobile_logo",
            child: {
                "new": {
                    name: "\u65b0\u673a",
                    channel: "mobile",
                    route: "",
                    articleList: {topicid: "BD2CG18Nwangning", topdataPriority: 999}
                },
                test: {
                    name: "\u8bc4\u6d4b",
                    channel: "mobile",
                    route: "",
                    articleList: {topicid: "BD2CH14Pwangning", topdataPriority: 999}
                },
                buy: {
                    name: "\u8d2d\u673a",
                    channel: "mobile",
                    route: "",
                    articleList: {topicid: "BD2CHIMLwangning", topdataPriority: 999}
                }
            }
        },
        "0016": {
            name: "\u6570\u7801",
            channel: "digi",
            route: "",
            articleList: {topicid: "BAI6JOD9wangning", topdataPriority: 99},
            tiename: "digi",
            logoclassname: "digi_logo",
            child: {
                notebook: {
                    name: "\u7b14\u8bb0\u672c\u8bc4\u6d4b",
                    channel: "digi",
                    route: "",
                    articleList: {topicid: "BD2CPSRDwangning", topdataPriority: 99}
                },
                cameratest: {
                    name: "\u76f8\u673a\u8bc4\u6d4b",
                    channel: "digi",
                    route: "",
                    articleList: {topicid: "BD2CQPTLwangning", topdataPriority: 99}
                },
                camera: {
                    name: "\u76f8\u673a\u884c\u60c5",
                    channel: "digi",
                    route: "",
                    articleList: {topicid: "BD2CSJEGwangning", topdataPriority: 99}
                },
                hea: {
                    name: "\u5bb6\u7535",
                    channel: "digi",
                    route: "",
                    articleList: {topicid: "BD2CU0MCwangning", topdataPriority: 99}
                }
            }
        },
        "0021": {
            name: "\u8bfb\u4e66",
            channel: "yuedu",
            route: "",
            articleList: {topicid: "BCGIKK4Vwangning", topdataPriority: 999},
            extraParameter: "utm_campaign=163ad2016&utm_source=163touchhome&utm_medium=tab_*&"
        },
        "0023": {
            name: "\u653f\u52a1",
            channel: "gov",
            route: "",
            articleList: {topicid: "BA8J7DG9wangning", topdataPriority: 999}
        },
        "0025": {
            name: "\u8d22\u7ecf",
            channel: "money",
            route: "",
            articleList: {topicid: "BA8EE5GMwangning", topdataPriority: 254},
            tiename: "money",
            logoclassname: "money_logo",
            secondFocus: {topicid: "BBM9DIC9wangning", topdataPriority: 999},
            child: {
                shares: {
                    name: "\u80a1\u7968",
                    channel: "money",
                    route: "",
                    articleList: {topicid: "BD2C01CQwangning", topdataPriority: 999}
                },
                fund: {
                    name: "\u57fa\u91d1",
                    channel: "money",
                    route: "",
                    articleList: {topicid: "BD2C1904wangning", topdataPriority: 999}
                },
                commercial: {
                    name: "\u5546\u4e1a",
                    channel: "money",
                    route: "",
                    articleList: {topicid: "BD2C24VCwangning", topdataPriority: 999}
                }
            }
        },
        "0026": {
            name: "\u65f6\u5c1a",
            channel: "lady",
            route: "",
            articleList: {topicid: "BA8F6ICNwangning", topdataPriority: 160},
            tiename: "lady",
            logoclassname: "lady_logo",
            child: {
                love: {
                    name: "\u60c5\u7231",
                    channel: "lady",
                    route: "",
                    articleList: {topicid: "BD2BDNBPwangning", topdataPriority: 999}
                },
                beauty: {
                    name: "\u7f8e\u5bb9",
                    channel: "lady",
                    route: "",
                    articleList: {topicid: "BD2BFD4Pwangning", topdataPriority: 999}
                },
                dress: {
                    name: "\u670d\u9970",
                    channel: "lady",
                    route: "",
                    articleList: {topicid: "BDC4UI29wangning", topdataPriority: 999}
                }
            }
        },
        "0029": {
            name: "\u6559\u80b2",
            channel: "edu",
            route: "",
            articleList: {topicid: "BA8FF5PRwangning", topdataPriority: 98},
            tiename: "edu",
            logoclassname: "edu_logo",
            child: {
                aboard: {
                    name: "\u7559\u5b66",
                    channel: "edu",
                    route: "",
                    articleList: {topicid: "BD2DGFADwangning", topdataPriority: 98}
                },
                migrant: {
                    name: "\u79fb\u6c11",
                    channel: "edu",
                    route: "",
                    articleList: {topicid: "BD2DHAH1wangning", topdataPriority: 98}
                },
                pmschool: {
                    name: "\u4e2d\u5c0f\u5b66",
                    channel: "edu",
                    route: "",
                    articleList: {topicid: "BD2DI0QJwangning", topdataPriority: 98}
                },
                foreign: {
                    name: "\u5916\u8bed",
                    channel: "edu",
                    route: "",
                    articleList: {topicid: "BD2DIR3Gwangning", topdataPriority: 98}
                }
            }
        },
        "0030": {
            name: "\u56fe\u7247",
            channel: "photo",
            tiename: "news",
            logoclassname: "photo_logo",
            route: "",
            type: "photolist",
            setList: {channelid: "0001", topicid: "00AN0001,00AO0001", channel: "photo"},
            topList: {channelid: "0001", topicid: "00AP0001,3R710001,4T8E0001", channel: "photo", size: 3},
            child: {
                news: {
                    name: "\u65b0\u95fb",
                    channel: "photo",
                    route: "",
                    type: "photolist",
                    setList: {channelid: "0001", topicid: "00AP0001,3R710001,4T8E0001", channel: "photo"},
                    topList: {channelid: "0001", topicid: "00AP0001,3R710001,4T8E0001", channel: "photo", size: 3}
                },
                star: {
                    name: "\u660e\u661f",
                    channel: "photo",
                    route: "",
                    type: "photolist",
                    setList: {
                        channelid: "0003",
                        topicid: "00AJ0003,0AJQ0003,3LF60003,00B70003,00B50003",
                        channel: "photo"
                    },
                    topList: {channelid: "0001", topicid: "00AP0001,3R710001,4T8E0001", channel: "photo", size: 3}
                },
                sports: {
                    name: "\u4f53\u575b",
                    channel: "photo",
                    route: "",
                    type: "photolist",
                    setList: {
                        channelid: "0005",
                        topicid: "00D80005,00DE0005,4TM10005,5GUP0005,00BV0005,00750005",
                        channel: "photo"
                    },
                    topList: {channelid: "0001", topicid: "00AP0001,3R710001,4T8E0001", channel: "photo", size: 3}
                },
                beauty: {
                    name: "\u7f8e\u56fe",
                    channel: "photo",
                    route: "",
                    type: "photolist",
                    setList: {channelid: "0031", topicid: "6LRK0031,6LRI0031", channel: "photo", anchor: "qd=163game"},
                    topList: {channelid: "0001", topicid: "00AP0001,3R710001,4T8E0001", channel: "photo", size: 3}
                }
            }
        },
        "0031": {
            name: "\u6e38\u620f",
            channel: "game",
            route: "",
            articleList: {topicid: "BAI6RHDKwangning", topdataPriority: 140},
            tiename: "game",
            logoclassname: "game_logo"
        },
        "0035": {
            name: "BOBO",
            channel: "bobo",
            route: "",
            articleList: {topicid: "BA8J7DG9wangning", topdataPriority: 999}
        },
        "0036": {
            name: "\u4eb2\u5b50",
            channel: "baby",
            route: "",
            articleList: {topicid: "BEO4PONRwangning", topdataPriority: 999}
        },
        "0038": {
            name: "\u5065\u5eb7",
            channel: "jiankang",
            route: "",
            articleList: {topicid: "BDC4QSV3wangning", topdataPriority: 999},
            tiename: "jiankang",
            logoclassname: "jiankang_logo"
        },
        "0039": {
            name: "\u70ed\u523a",
            channel: "tottenhamhotspur",
            route: "",
            articleList: {topicid: "BA8J7DG9wangning", topdataPriority: 999}
        },
        "0041": {
            name: "\u6536\u85cf",
            channel: "shoucang",
            route: "",
            articleList: {topicid: "BA8J7DG9wangning", topdataPriority: 999}
        },
        "0082": {
            name: "\u767d\u9152",
            channel: "jiu",
            route: "",
            articleList: {topicid: "BA8J7DG9wangning", topdataPriority: 999}
        },
        "0087": {
            name: "\u623f\u4ea7",
            channel: "house",
            route: "",
            articleList: {topicid: "BAI6MTODwangning", topdataPriority: 97},
            tiename: "house",
            logoclassname: "house_logo"
        },
        "0091": {
            name: "\u6821\u56ed",
            channel: "daxue",
            route: "",
            articleList: {topicid: "BA8J7DG9wangning", topdataPriority: 999}
        },
        "0093": {
            name: "\u516c\u76ca",
            channel: "gongyi",
            route: "",
            articleList: {topicid: "BA8J7DG9wangning", topdataPriority: 999}
        },
        "0095": {
            name: "\u541b\u5b50",
            channel: "men",
            route: "",
            articleList: {topicid: "BA8J7DG9wangning", topdataPriority: 999}
        },
        "0096": {
            name: "\u63a8\u8350",
            channel: "all",
            route: "",
            articleList: {topicid: "BA8J7DG9wangning", topdataPriority: 999}
        },
        joke: {
            name: "\u6bb5\u5b50",
            channel: "joke",
            route: "",
            type: "jokelist",
            tiename: "news",
            logoclassname: "joke_logo"
        },
        idol: {
            name: "\u661f\u95fb",
            channel: "idol",
            route: "",
            type: "idollist",
            tiename: "news",
            logoclassname: "idol_logo"
        },
        local: {
            name: "\u672c\u5730",
            channel: "local",
            route: "",
            articleList: {topicid: "\u5317\u4eac\u5e02", topdataPriority: 999},
            tiename: "news",
            logoclassname: "local_logo"
        },
        world: {
            name: "\u56fd\u9645",
            channel: "world",
            route: "",
            articleList: {topicid: "BA8J7DG9wangning", topdataPriority: 999}
        },
        dy: {
            name: "\u8ba2\u9605",
            channel: "dy",
            route: "",
            articleList: {topicid: "BBM50AKDwangning", topdataPriority: 999},
            tiename: "news",
            logoclassname: "dy_logo"
        },
        topdata: {
            name: "\u7126\u70b9\u56fe",
            channel: "tuijian",
            route: "",
            articleList: {topicid: "BABDD7EAwangning", topdataPriority: 254}
        }
    };
    this._channelMap = e
}.call(window.NEWAP), function () {
    "use strict";
    !function (e, t) {
        var n = function () {
            this.name = "data for touch, na~", this.version = "1.0"
        };
        n.channelMap = e._channelMap, n.importjs = function (e, t, n) {
            var i = document.createElement("script");
            i.src = e, n && (i.charset = n), i.onload = function () {
                this.onload = this.onerror = null, this.parentNode.removeChild(this)
            }, i.onerror = function () {
                this.onload = this.onerror = null, this.parentNode.removeChild(this), t && t(!0)
            }, document.head.appendChild(i)
        }, n.loc = function () {
            var e = 0, i = function () {
                var i = t.Deferred(), a = "http://ipservice.163.com/locate/api/getLoc?key=734FC2BD86B2CD0B8CF534073AD36EB2", r = "locBack" + e++;
                return a = a + "&callback=" + r, window[r] = function (e) {
                    "success" === e.reason && (n.loc.result = e.result, n.channelMap.local.articleList.topicid = e.result.province + "_" + e.result.city, i.resolve(e)), delete window[r]
                }, n.importjs(a, function (e) {
                    e && (i.reject(), delete window[r])
                }), i.promise()
            };
            return {update: (i(), i)}
        }(), n.dateFormat = function (e) {
            var t = {
                "M+": this.getMonth() + 1,
                "d+": this.getDate(),
                "h+": this.getHours(),
                "m+": this.getMinutes(),
                "s+": this.getSeconds(),
                "q+": Math.floor((this.getMonth() + 3) / 3),
                S: this.getMilliseconds()
            };
            /(y+)/.test(e) && (e = e.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length)));
            for (var n in t)new RegExp("(" + n + ")").test(e) && (e = e.replace(RegExp.$1, 1 == RegExp.$1.length ? t[n] : ("00" + t[n]).substr(("" + t[n]).length)));
            return e
        }, n.tplLink = function () {
            var e = {
                docid: "http://3g.163.com/touch/article.html",
                setid: "http://3g.163.com/touch/photoview.html",
                sid: "http://3g.163.com/ntes/special/003417G8/touch_specail_view.html",
                roomid: "http://3g.163.com/ntes/special/003417GE/touch_live.html",
                vid: "http://3g.163.com/ntes/special/0034073A/touch_videoplay.html",
                update: function (e) {
                    for (var t in this)this.hasOwnProperty(t) && "string" == typeof this[t] && -1 !== e.indexOf(t + "=") && (this[t] = e.replace(new RegExp(".*" + t + "=([^&]*).*"), "$1"))
                }
            };
            if (-1 != location.href.indexOf("_qa_") ? (e.docid = "http://3g.163.com/ntes/special/003417TF/article_qa_2016.html", e.setid = "http://3g.163.com/ntes/special/003417TF/photoset_qa_2016.html") : -1 != location.href.indexOf("trunk_") ? (e.docid = "http://3g.163.com/ntes/special/003417TF/trunk_article_2016.html", e.setid = "http://3g.163.com/ntes/special/003417TF/trunk_photoset_2016.html") : -1 != location.href.indexOf("3g.163.com/touch"), -1 != location.href.indexOf("dev.f2e.163.com")) {
                var t = "http://img2.cache.netease.com/f2e";
                e.docid = t + "/wap/touch_article_2016/trunk/article.shtml", e.sid = t + "/wap/touch_special_view/index.shtml", e.roomid = t + "/wap/touch_live/index.shtml", e.vid = t + "/wap/touch_video_2016/trunk/index.html", e.setid = t + "/wap/touch_photoset_2016/trunk/photoset.shtml"
            }
            return e
        }(), n.docidFromURL = function (e) {
            try {
                if (e.length > 22) {
                    var t = e.substring(e.lastIndexOf("/")), n = t.substring(1, 17);
                    return -1 != e.indexOf(n + ".html") && /[0-9A-Z]{16}/.test(n) ? n : ""
                }
                return 16 === e.length && e.toUpperCase() === e ? e : ""
            } catch (i) {
                return ""
            }
        }, n.routereg = function (e) {
            var i = n.channelMap, e = t.extend(!0, {}, e);
            if ("undefined" != typeof i[e.data.channelId])return i[e.data.channelId].route = e.route, !0;
            var a = {name: "", articleList: {topicid: "", topdataPriority: 0}};
            return a.name = e.data.name, a.channel = e.data.channel, a.route = e.route, a.articleList = e.data.articleList, i[e.data.channelId] = a, !0
        }, n.channelidFromRoute = function (e) {
            var t = n.channelMap;
            for (var i in t)if (t.hasOwnProperty(i) && t[i].route === e)return i.toString();
            return "tuijian"
        }, n.channelidFromChannel = function (e) {
            var t = n.channelMap;
            for (var i in t)if (t.hasOwnProperty(i) && t[i].channel === e)return i.toString();
            return "tuijian"
        }, n.removeURLImportantProperty = function (e, t) {
            var i = t ? n.o.inheritSearchList : n.o.inheritSearchBlockedList, a = e;
            if (t) {
                for (var r = {}, o = "", s = 0; s < i.length; s++)-1 !== a.indexOf(i[s] + "=") && (r[i[s]] = a.replace(new RegExp(".*" + i[s] + "=([^&]*).*"), "$1"), o += i[s] + "=" + r[i[s]] + "&");
                a = o
            } else for (var s = 0; s < i.length; s++)a = a.replace(new RegExp(i[s] + "=[^&]*[&]?", "gi"), "");
            return "&" === a[a.length - 1] && (a = a.substring(0, a.length - 1)), a
        }, n.locsearch = function () {
            if (!n.o.enableInheritSearch)return "";
            var e = location.search.substring(1);
            switch (n.o.enableInheritSearch) {
                case 1:
                    e = n.removeURLImportantProperty(e, !1);
                case 2:
                    e = n.removeURLImportantProperty(e, !0)
            }
            return e.length > 0 && "&" != e[e.length - 1] && (e += "&"), e
        }, n.extraFromURL = function (e) {
            var t = "", i = "";
            return e = n.removeURLImportantProperty(e), -1 !== e.indexOf("?") && (t = e.replace(/.*\?([^#]*).*/, "$1"), t.length > 0 && "&" !== t[t.length - 1] && (t += "&")), t = n.locsearch() + t, -1 !== e.indexOf("#") && (i = e.replace(/.*(#[^\?]*).*/, "$1")), {
                parameter: t,
                anchor: i
            }
        }, n.diff = {}, n.dataList = function () {
            var e = {code: 200, listdata: {page: 1, data: []}, topdata: {page: 1, data: []}, otherinfo: {}};
            return e
        }(), n.docItem = function () {
            var e = {
                docid: "",
                uuid: 0,
                ptime: "",
                title: "",
                stitle: "",
                digest: "",
                priority: "",
                link: "",
                type: "",
                source: "",
                category: "",
                adposition: 0,
                prevent: "",
                pic_info: [],
                ugc: {boardid: "", postid: "", channel: ""},
                tcount: 0,
                thot: {isopen: 0, comment: "\u70ed\u95e8\u8ddf\u8d34\u7528\u6237\u7559\u8a00"},
                tag: ""
            };
            return e
        }(), n.picItem = function () {
            var e = {height: 0, width: 0, picType: 0, title: "", ref: null, url: ""};
            return e
        }(), n.adItem = function () {
            var e = {
                adposition: -1,
                prevent: "",
                url: "",
                data: {uuid: "", ptime: "", title: "", link: "", type: "", source: "", impression: "", pic_info: []}
            };
            return e
        }(), n.locItem = function () {
            var e = {province: "", city: ""};
            return e
        }, n.formater = function (e, t) {
            this.url = e, this.callback = t, this.URLType = -1, this.docid, this.channelid, this.child, this.channelData = {}, this.pagesize = 0, this.hasTopimg = !1
        }, n.formater.prototype.getURLType = function (e) {
            var t = this.url;
            return "string" == typeof e && (t = e), 0 === t.indexOf("newap_article_list?") ? this.URLType = 0 : 0 === t.indexOf("newap_advertise_list?") ? this.URLType = 1 : 0 === t.indexOf("newap_article_full?") ? this.URLType = 2 : 0 === t.indexOf("newap_photo_list?") ? this.URLType = 3 : 0 === t.indexOf("newap_joke_list?") ? this.URLType = 4 : this.URLType = -1, this.URLType
        }, n.formater.prototype.transurl = function (e) {
            var i = this.url;
            switch (this.getURLType(i), this.URLType) {
                case-1:
                    this.callback("url formate error");
                    break;
                case 0:
                    var a = {offset: 0, size: 10, channel: "0096", child: "all", topicid: void 0, city: void 0};
                    for (var r in a)a.hasOwnProperty(r) && -1 !== i.indexOf(r + "=") && (a[r] = i.replace(new RegExp(".*" + r + "=([^&]*).*"), "$1"));
                    this.offset = parseInt(a.offset), this.channelid = a.channel, this.child = a.child;
                    var o = n.channelMap[this.channelid];
                    "all" !== this.child && "object" == typeof o.child && o.child[this.child] ? this.channelData = t.extend(!0, {}, o.child[this.child]) : this.channelData = t.extend(!0, {}, o);
                    var s = this.channelData.articleList;
                    if ("undefined" == typeof n.diff[this.channelid + this.child] || 0 === this.offset) {
                        var c = {docidList: []};
                        n.diff[this.channelid + this.child] = c
                    }
                    0 === this.offset && (this.hasTopimg = !0);
                    var l = this.offset, u = parseInt(a.size);
                    this.pagesize = u;
                    var h = parseInt(n.o.articleListMaxStart);
                    l > h && (u += l - h, l = h, u = 10, this.pagesize = u);
                    var d = s.topicid;
                    "undefined" != typeof a.topicid && (d = a.topicid, s.topicid = d), i = "http://3g.163.com/touch/article/list/" + d + "/" + l + "-" + u + ".html", "local" === this.channelid && (a.city && (d = a.city, s.topicid = d), i = "http://3g.163.com/touch/jsonp/article/local/" + d + "/" + l + "-" + u + ".html");
                    break;
                case 1:
                    break;
                case 2:
                    break;
                case 3:
                    var a = {offset: 0, size: 10, channel: "0030", child: "all", channelid: void 0, topicid: void 0};
                    for (var r in a)a.hasOwnProperty(r) && -1 !== i.indexOf(r + "=") && (a[r] = i.replace(new RegExp(".*" + r + "=([^&]*).*"), "$1"));
                    this.offset = parseInt(a.offset), this.channelid = a.channel, this.pchannelid = a.channelid, this.child = a.child;
                    var o = n.channelMap[this.channelid];
                    "all" !== this.child && "object" == typeof o.child && o.child[this.child] ? this.channelData = t.extend(!0, {}, o.child[this.child]) : this.channelData = t.extend(!0, {}, o);
                    var p = this.channelData.setList;
                    0 === this.offset && (this.hasTopimg = !0);
                    var l = this.offset, u = parseInt(a.size);
                    this.pagesize = u, this.pchannelid = p.channelid;
                    var d = p.topicid;
                    "undefined" != typeof a.topicid && (d = a.topicid, p.topicid = d, this.jsonpNum = "top"), "undefined" != typeof a.channelid && (this.pchannelid = a.channelid, p.channelid = this.pchannelid), this.jsonpNum = "_" + (this.jsonpNum || ""), this.callbackName = "cache_" + d.replace(/,/gi, "_") + this.jsonpNum, this.callbackName = this.callbackName.replace(new RegExp(p.channelid + "_", "gi"), "_"), i = "http://pic.news.163.com/photocenter/api/list/" + this.pchannelid + "/" + d + "/" + l + "/" + this.pagesize + "/" + this.callbackName + ".json";
                    break;
                case 4:
                    var a = {offset: 0, size: 10, channel: "0529", child: "all"};
                    for (var r in a)a.hasOwnProperty(r) && -1 !== i.indexOf(r + "=") && (a[r] = i.replace(new RegExp(".*" + r + "=([^&]*).*"), "$1"));
                    this.offset = parseInt(a.offset), this.channelid = a.channel;
                    var o = n.channelMap[this.channelid], l = this.offset, f = parseInt(a.size);
                    this.pagesize = f, this.callbackName = o.channel + n.jsonpNum[this.channelid]++, i = "http://j.news.163.com/hy/newshot.s?channel=8&offset=" + l + "&limit=" + f + "&callback=" + this.callbackName
            }
            return i
        }, n.formater.prototype.beforeReplaceURLProperty = function (e) {
            var t, n = "", i = e.url;
            if (!e.hasOwnProperty("skipType"))if ((t = i.split("|")).length > 1) {
                var a = t[0].substr(-4, 4), r = t[1];
                e.skipType = "photoset", e.skipURL = "http://3g.163.com/touch/photoview.html?channelid=" + a + "&setid=" + r + n
            } else if (t = /\/photoview\/([0-9A-Z]{8})\/(\d{1,7})\.html/.exec(i)) {
                var a = t[1].substr(-4, 4), r = t[2];
                -1 !== i.indexOf("#") && (n = i.replace(/.*(#[^\?]*).*/, "$1")), e.skipType = "photoset", e.skipURL = "http://3g.163.com/touch/photoview.html?channelid=" + a + "&setid=" + r + n
            }
        }, n.formater.prototype.replaceURLProperty = function (e, t) {
            this.beforeReplaceURLProperty(e), t = "offset=" + (this.offset + t) + "&";
            var i = "", a = e.url || "", r = e.stitle || "", o = this.channelid, s = n.channelMap[o].channel;
            s = "channel=" + s + "&";
            var c = "", l = "", u = "", h = "", d = "", p = n.channelMap[o].name, f = n.extraFromURL(a), m = f.parameter, g = f.anchor, v = n.docidFromURL(a);
            if (16 !== v.length && (v = e.docid, m = "", g = ""), e.hasOwnProperty("skipType")) {
                if (a = e.skipURL, f = n.extraFromURL(a), m = f.parameter, g = f.anchor, a = a.replace(/([^#]*)#.*/, "$1"), "special" === e.skipType) {
                    c = "", l = "", u = "";
                    try {
                        o = v.substring(8, 12), p = n.channelMap[o].name
                    } catch (_) {
                        p = n.channelMap[this.channelid].name
                    }
                    h = "doc", d = "\u4e13\u9898", i = "?" + s + m + t + "sid=" + e.specialID + g
                } else if ("photoset" === e.skipType) {
                    var y = a.replace(/.*setid=([^&]*).*/, "$1");
                    o = a.replace(/.*channelid=([^&]*).*/, "$1"), c = "photoview_bbs", l = "", u = o;
                    try {
                        p = n.channelMap[o].name
                    } catch (_) {
                        p = n.channelMap[this.channelid].name
                    }
                    h = "photoset", d = "\u56fe\u96c6", i = "?" + s + m + t + "setid=" + y + "&channelid=" + o + g
                } else if ("live" === e.skipType) {
                    var w = a.replace(/.*roomid=([^&]*).*/, "$1");
                    c = "", l = "", u = "", h = "doc", d = "\u76f4\u64ad", i = "?" + s + m + t + "roomid=" + w + g
                }
            } else if (0 === r.indexOf("V")) {
                var b = r;
                c = "", l = "", u = "", h = "doc", d = "\u89c6\u9891", i = "?" + s + m + t + "vid=" + b + g
            } else if (16 === v.length && v.toUpperCase() === v) {
                o = v.substring(8, 12), c = "3g_bbs", l = v, u = o;
                try {
                    p = n.channelMap[o].name
                } catch (_) {
                    p = n.channelMap[this.channelid].name
                }
                h = "doc", "\u89c6\u9891" === r ? d = "\u89c6\u9891" : "LIVE" === r ? d = "\u76f4\u64ad" : 0 === r.indexOf("v") && (d = "\u6295\u7968");
                var k = this.channelData.extraParameter || "";
                i = "?" + s + k + m + t + "docid=" + v + g
            }
            if (i.length > 0) {
                var x = !1;
                for (var S in n.tplLink)n.tplLink.hasOwnProperty(S) && -1 != i.indexOf(S) && (a = n.tplLink[S] + i, x = !0);
                x || (h = "")
            }
            return "tuijian" != this.channelid && (p = ""), this.isArticleListHead && (a += -1 != a.indexOf("?") ? "&s=163" : "?s=163", h = "colums"), -1 != n.diff[this.channelid + this.child].docidList.indexOf(v) ? h = "" : n.diff[this.channelid + this.child].docidList.push(v), {
                type: h,
                url: a,
                ugc: {boardid: c, postid: l, channel: u},
                tag: d,
                category: p
            }
        }, n.formater.prototype.fixPhotoview = function (e) {
            var i = t.Deferred(), a = e.listdata.data, r = e.topdata.data;
            return async.eachLimit(a.concat(r), 1, function (e, i) {
                if ("photoset" === e.type && e.pic_info.length < 3) {
                    var a = e.link.replace(/([^#]*)#.*/, "$1"), r = a.replace(/.*setid=([^&]*).*/, "$1"), o = a.replace(/.*channelid=([^&]*).*/, "$1");
                    e.pic_info = [], t.ajax({
                        type: "GET",
                        dataType: "jsonp",
                        url: "http://c.3g.163.com/photo/api/jsonp/set/" + o + "/" + r + ".json",
                        success: function (a) {
                            e.ugc.postid = a.postid;
                            for (var r = 0; r < a.photos.length && e.pic_info.length < 3; r++) {
                                var o = t.extend(!0, {}, n.picItem);
                                o.url = a.photos[r].imgurl, e.pic_info.push(o)
                            }
                            i()
                        }
                    })
                } else i()
            }, function (t) {
                t ? i.resolve(e) : i.resolve(e)
            }), i.promise()
        }, n.formater.prototype.resizePhoto = function (e) {
            for (var t = e.listdata.data, n = e.topdata.data, i = 0; i < n.length; i++)for (var a = 0; a < n[i].pic_info.length; a++) {
                var r = n[i].pic_info[a], o = r.url;
                r.o_url = o, (-1 === o.lastIndexOf(".gif") || "joke" === this.channelid) && (r.url = "http://imgsize.ph.126.net/?imgurl=" + o + "_750x380x1x85.jpg&enlarge=true", this.isArticleListHead && (r.url = "http://imgsize.ph.126.net/?imgurl=" + o + "_690x140x1x85.jpg&enlarge=true"))
            }
            for (var i = 0; i < t.length; i++)for (var a = 0; a < t[i].pic_info.length; a++) {
                var r = t[i].pic_info[a], o = r.url;
                r.o_url = o, (-1 === o.lastIndexOf(".gif") || "joke" === this.channelid) && (r.url = "http://imgsize.ph.126.net/?imgurl=" + o + "_220x165x1x85.jpg&enlarge=true", "joke" === this.channelid && (r.url = "http://imgsize.ph.126.net/?imgurl=" + o + "_" + r.width + "x" + r.height + "x1x85.jpg&enlarge=true", "number" != typeof r.width && (r.url = o)), "0030" === this.channelid && (r.url = "http://imgsize.ph.126.net/?imgurl=" + o + "_375x500x0x85.jpg&enlarge=true"))
            }
            return e
        }, n.formater.prototype.updateAppointData = function (e) {
            for (var i = e.listdata.data, a = (e.topdata.data, []), r = (new Date).getTime(), o = 0; o < i.length; o++) {
                var s = t.extend(!0, {}, n.adItem), c = i[o];
                s.data = c, delete s.data.adposition, delete s.data.prevent;
                try {
                    var l = JSON.parse(c.digest);
                    if (!(r >= l.startTime && r <= l.endTime))continue;
                    s.adposition = l.adPosition, s.prevent = l.prevent, s.isfocus = l.isfocus, s.data.impression = l.impression, s.data.digest = l.digest, a.push(s)
                } catch (u) {
                }
            }
            for (var h = {
                focus: [],
                list: []
            }, o = 0; o < a.length; o++)a[o].isfocus ? h.focus.push(a[o]) : h.list.push(a[o]);
            e.otherinfo.appointArticle = h
        }, n.formater.prototype.transdata = function (e) {
            var i = t.Deferred(), a = e, r = t.extend(!0, {}, n.dataList), o = this;
            switch (this.URLType) {
                case-1:
                    break;
                case 0:
                    var s = this.channelData.articleList, c = a[s.topicid], l = c.length - this.pagesize;
                    c = c.slice(0 > l ? 0 : l), "object" == typeof this.channelData.topList && (this.hasTopimg = !1);
                    var u = this.channelData.topList || {};
                    if (s.topicid === u.topicid)var h = parseInt(u.size) || 1;
                    var d = this.channelData.secondFocus || {};
                    if (s.topicid === d.topicid)var h = parseInt(d.size) || 1;
                    var p = this.channelData.articleListHead || {};
                    s.topicid === p.topicid && (this.isArticleListHead = !0, this.hasTopimg = !0);
                    var f = this.channelData.appointList || {};
                    s.topicid === f.topicid && (this.isAppointList = !0, this.hasTopimg = !1), "local" === this.channelData.channel && (r.otherinfo.province = e.province, r.otherinfo.city = e.city), function (e) {
                        for (var a = r.listdata.data, s = r.topdata.data, c = !1, l = 0; l < e.length; l++) {
                            var u = e[l], d = t.extend(!0, {}, n.docItem), p = t.extend(!0, {}, n.picItem), f = this.replaceURLProperty(u, l);
                            if (!(f.type.length <= 0)) {
                                if (d.docid = u.docid, d.ptime = u.ptime, d.title = u.title, d.digest = u.digest, d.tcount = u.commentCount, d.priority = u.priority, d.link = f.url, d.type = f.type, d.ugc = f.ugc, d.tag = f.tag, d.category = f.category, "undefined" != typeof u.imgsrc && u.imgsrc.length > 7 && (p.url = u.imgsrc, d.pic_info.push(p)), "photoset" === d.type && "undefined" != typeof u.imgextra && u.imgextra instanceof Array)for (var m = 0; m < u.imgextra.length; m++) {
                                    var g = t.extend(!0, {}, n.picItem);
                                    g.url = u.imgextra[m].imgsrc, d.pic_info.push(g)
                                }
                                h && s.length < h ? s.push(d) : this.hasTopimg && !c ? (s.push(d), c = !0) : a.push(d)
                            }
                        }
                        if ("0021" == this.channelid)for (var v = s.concat(a), _ = 0; _ < v.length; _++) {
                            var u = v[_];
                            u.link = u.link.replace(/utm_medium=tab_\*/gi, "utm_medium=tab_" + (this.offset + _ + 1))
                        }
                        if (this.isAppointList) {
                            this.updateAppointData(r), r.topdata.data = [], r.listdata.data = [];
                            for (var l = 0; l < r.otherinfo.appointArticle.focus.length; l++)r.topdata.data.push(r.otherinfo.appointArticle.focus[l].data);
                            for (var l = 0; l < r.otherinfo.appointArticle.list.length; l++)r.topdata.data.push(r.otherinfo.appointArticle.list[l].data)
                        }
                        n.o.enableFixPhotoview ? this.fixPhotoview(r).done(function (e) {
                            o.resizePhoto(e), i.resolve(e)
                        }) : (o.resizePhoto(r), i.resolve(r))
                    }.call(this, c);
                    break;
                case 1:
                    break;
                case 2:
                    break;
                case 3:
                    var m = this.channelData.setList;
                    "object" == typeof this.channelData.topList && (this.hasTopimg = !1);
                    var u = this.channelData.topList || {};
                    if (m.topicid === u.topicid)var h = parseInt(u.size) || 1;
                    var g;
                    -1 == this.jsonpNum.indexOf("top") && (g = this.child), function (e) {
                        for (var a = r.listdata.data, s = r.topdata.data, c = 0; c < e.length; c++) {
                            var l = e[c], u = t.extend(!0, {}, n.docItem), d = t.extend(!0, {}, n.picItem);
                            u.docid = l.setid, u.ptime = l.createdate, u.title = l.setname, u.digest = l.desc, u.tcount = l.replynum;
                            var p = l.seturl;
                            p = p.replace(/([^#]*)#.*/, "$1");
                            var f = p.replace(/.*\/(\d+).html.*/, "$1"), m = p.replace(/.*\/photoview\/(.*)\/(\d+).html.*/, "$1").replace(/.*(.{4})$/, "$1");
                            u.link = n.tplLink.setid + "?channel=photo&" + n.locsearch() + "setid=" + f + "&channelid=" + m + "&offset=" + (this.offset + c), g && (u.link += "&child=" + g), u.type = "photoset", u.tag = "\u56fe\u96c6", u.imgsum = l.imgsum, d.url = l.cover, u.pic_info.push(d);
                            for (var v = 0; v < l.pics.length && 3 > v; v++) {
                                var _ = t.extend(!0, {}, n.picItem);
                                _.url = l.pics[v], u.pic_info.push(_)
                            }
                            h && s.length < h ? s.push(u) : a.push(u)
                        }
                        o.resizePhoto(r), i.resolve(r)
                    }.call(this, a);
                    break;
                case 4:
                    (function (e) {
                        for (var a = r.listdata.data, s = r.topdata.data, c = 0; c < e.length; c++) {
                            var l = e[c], u = t.extend(!0, {}, n.docItem);
                            t.extend(!0, {}, n.picItem);
                            u.docid = l.docID, u.ptime = n.dateFormat.call(new Date(l.publish_time), "yyyy-MM-dd hh:mm:ss"), u.title = l.title, u.digest = l.summary, u.tcount = l.tcount, u.category = l.category, u.priority = l.priority, u.link = n.tplLink.docid + "?channel=joke&" + n.locsearch() + "offset=" + (this.offset + c) + "&docid=" + l.docID, u.type = "doc", u.tag = "", l.pic_url && (u.pic_info = JSON.parse(l.pic_url)), h && s.length < h ? s.push(u) : a.push(u)
                        }
                        o.resizePhoto(r), i.resolve(r)
                    }).call(this, a)
            }
            return i.promise()
        }, n.cache = {}, n.jsonpNum = {joke: 0}, n.jsonpCallbackArtiList = [], n.handleNetworkError = function (e, i) {
            switch (e.URLType) {
                case 0:
                    for (var a, r = -1, o = e.channelData.articleList.topicid, s = n.jsonpCallbackArtiList, c = 0; c < s.length; c++)if (s[c].id == o) {
                        r = c;
                        break
                    }
                    if (-1 == r)return;
                    a = s[r], n.jsonpCallbackArtiList.splice(r, 1), i = a.dtd;
                    break;
                case 3:
                    var l = e.callbackName;
                    delete window[l]
            }
            var u = t.extend(!0, {}, n.dataList);
            u.code = "network_error", i && i.resolve(u)
        }, n.fectch = function (e) {
            var i = t.Deferred(), a = e.url, r = e.success, o = new n.formater(a, r);
            switch (e.url = o.transurl(), e.cache = !0, o.URLType) {
                case-1:
                    break;
                case 0:
                    var s = function (e) {
                        var t, i, a = -1;
                        for (var r in e)if (e.hasOwnProperty(r) && e[r] instanceof Array) {
                            t = r;
                            break
                        }
                        for (var o = n.jsonpCallbackArtiList, s = 0; s < o.length; s++)if (o[s].id == t) {
                            a = s;
                            break
                        }
                        if (-1 != a) {
                            i = o[a], n.jsonpCallbackArtiList.splice(a, 1);
                            try {
                                i.context.transdata(e).done(function (e) {
                                    i.dtd.resolve(e)
                                })
                            } catch (c) {
                                throw c
                            }
                        }
                    };
                    n.jsonpCallbackArtiList.push({
                        id: o.channelData.articleList.topicid,
                        context: o,
                        dtd: i
                    }), window.artiList = s;
                    break;
                case 1:
                    break;
                case 2:
                    break;
                case 3:
                    var c = o.callbackName;
                    window[c] = function (e) {
                        delete window[c], o.transdata(e).done(function (e) {
                            i.resolve(e)
                        })
                    };
                    break;
                case 4:
                    var c = o.callbackName;
                    window[c] = function (e) {
                        delete window[c], o.transdata(e).done(function (e) {
                            i.resolve(e)
                        })
                    }
            }
            return n.importjs(e.url, function (e) {
                e && n.handleNetworkError(o, i)
            }), i.promise()
        }, n.ajax = function (e) {
            if (e["new"]) {
                e.cache = !0, e.dataType = "jsonp";
                var i = e.url, a = e.url.replace(/.*channel=([^&]*).*/, "$1"), r = n.channelMap[a], o = {
                    offset: 0,
                    size: 10,
                    channel: "0001",
                    child: "all"
                };
                for (var s in o)o.hasOwnProperty(s) && -1 !== i.indexOf(s + "=") && (o[s] = i.replace(new RegExp(".*" + s + "=([^&]*).*"), "$1"));
                o.channel = r.channel, "undefined" === o.child && (o.child = "all"), e.url = "http://3g.163.com/touch/jsonp/article/list/" + o.channel + "_" + o.child + "/" + o.offset + "-" + o.size + ".html";
                var c = e.success;
                return window.artiList = function (e) {
                    void 0 === e.otherinfo && (e.otherinfo = {}), c(e)
                }, t.ajax(e)
            }
            var l = t.Deferred(), u = e.success, h = e.error, a = e.url.replace(/.*channel=([^&]*).*/, "$1"), r = n.channelMap[a];
            "object" != typeof r && (e.url = e.url.replace(/channel=[^&]*[&]?/, "channel=tuijian"), r = n.channelMap.tuijian, a = "tuijian");
            var d = e.url.replace(/.*child=([^&]*).*/, "$1");
            "object" == typeof r.child && "object" == typeof r.child[d] && (r = r.child[d]);
            var p = "object" == typeof r.topList, f = "object" == typeof r.secondFocus, m = "object" == typeof r.articleListHead && 0 == e.url.replace(/.*offset=([^&]*).*/, "$1"), g = "object" == typeof r.appointList, v = r.hasOwnProperty("type"), _ = v && "photolist" === r.type;
            return n.tplLink.update(e.url), async.parallel({
                topdata: function (e) {
                    if (!p)return e(null, null);
                    var t = r.topList.topicid;
                    if ("undefined" != typeof n.cache[t] && n.cache[t].data.length > 0)return e(null, n.cache[t]);
                    var i = r.topList.size, o = {
                        type: "GET",
                        url: "newap_article_list?offset=0&size=" + i + "&channel=" + a + "&topicid=" + t,
                        dataType: "jsonp",
                        success: function (e) {
                            console.log("na~")
                        }
                    };
                    _ && (o.url = "newap_photo_list?offset=0&size=" + i + "&channel=" + a + "&channelid=" + r.topList.channelid + "&topicid=" + t), n.fectch(o).done(function (i) {
                        return 200 !== i.code ? e(i.code, i.topdata) : (n.cache[t] = i.topdata, void e(null, i.topdata))
                    })
                }, secondFocus: function (e) {
                    if (!f)return e(null, null);
                    var t = r.secondFocus.topicid, i = r.secondFocus.size || 1;
                    if ("undefined" != typeof n.cache[t] && n.cache[t].data.length > 0)return e(null, n.cache[t]);
                    var o = {
                        type: "GET",
                        url: "newap_article_list?offset=0&size=" + i + "&channel=" + a + "&topicid=" + t,
                        dataType: "jsonp",
                        success: function (e) {
                            console.log("na~")
                        }
                    };
                    n.fectch(o).done(function (i) {
                        return 200 !== i.code ? e(i.code, i.topdata) : (n.cache[t] = i.topdata, void e(null, i.topdata))
                    })
                }, listHead: function (e) {
                    if (!m)return e(null, null);
                    var t = r.articleListHead.topicid;
                    if ("undefined" != typeof n.cache[t] && n.cache[t].data.length > 0)return e(null, n.cache[t]);
                    var i = {
                        type: "GET",
                        url: "newap_article_list?offset=0&size=1&channel=" + a + "&topicid=" + t,
                        dataType: "jsonp",
                        success: function (e) {
                            console.log("na~")
                        }
                    };
                    n.fectch(i).done(function (i) {
                        return 200 !== i.code ? e(i.code, i.topdata) : (n.cache[t] = i.topdata, void e(null, i.topdata))
                    })
                }, appointdataList: function (e) {
                    if (!g)return e(null, null);
                    var t = r.appointList.topicid;
                    if (n.cache[t] instanceof Array && n.cache[t].length > 0)return e(null, n.cache[t]);
                    var i = r.appointList.size, o = {
                        type: "GET",
                        url: "newap_article_list?offset=0&size=" + i + "&channel=" + a + "&topicid=" + t,
                        dataType: "jsonp",
                        success: function (e) {
                        }
                    };
                    n.fectch(o).done(function (i) {
                        return 200 !== i.code ? e(i.code, i.otherinfo) : (n.cache[t] = i.otherinfo.appointArticle, void e(null, i.otherinfo.appointArticle))
                    })
                }, listdata: function (t) {
                    n.fectch(e).done(function (e) {
                        return 200 !== e.code ? t(e.code, e.topdata) : void t(null, e)
                    })
                }
            }, function (e, t) {
                if (e && "function" == typeof h && (l.reject(e), "function" == typeof h))return h(e);
                var n = t.listdata;
                p && (n.topdata = t.topdata), f && (n.topdata.data = n.topdata.data.concat(t.secondFocus.data)), m && n.listdata.data.unshift(t.listHead.data[0]), g && (n.otherinfo.appointArticle = t.appointdataList), "function" == typeof u && u(n), l.resolve(n)
            }), l.promise()
        }, n.o = {
            name: "data provider",
            description: "let fecth and format data reasonable"
        }, n.o.ajax = n.ajax, n.o.tplLink = n.tplLink, n.o.routereg = n.routereg, n.o.channelidFromRoute = n.channelidFromRoute, n.o.channelidFromChannel = n.channelidFromChannel, n.o.loc = n.loc, n.o.articleListMaxStart = 300, n.o.enableFixPhotoview = !1, n.o.inheritSearchBlockedList = ["docid", "sid", "setid", "channel", "channelid", "roomid", "vid"], n.o.inheritSearchList = ["qd"], n.o.enableInheritSearch = 1, void 0 === e.DP && (e.DP = n.o)
    }(this.NEWAP, this.Zepto)
}.call(window), function (e, t) {
    var n = function (e) {
        var n, i, a, r, o, s, c = t(".ctrls li", e.id), l = t(".slides", e.id)[0], u = t(".slides li", e.id), h = (t(".ctrls li", e.id), 0), d = 0, p = 0, f = 0, m = window.screenWidth_, g = m > 1080 ? 1080 : m, v = u.length, _ = 0, y = 0, w = !1, b = null, k = t(u[0]), x = NEWAP.tools.publicMethod.getDirection();
        uAgent.match(/iphone/i);
        _ = 1 == v ? v : v + 1;
        var S = g * _, E = function () {
            var n = "onorientationchange" in window ? "orientationchange" : "resize";
            t(window).on(n, function () {
                i()
            });
            var i = function () {
                var n = window.screenWidth_;
                g = n > 1080 ? 1080 : n, t(".slides li", e.id).css("width", g + "px"), S = g * _, resizeStart = -g * h, f = -h * g, d = f, t(".slides", e.id).css("width", S + "px"), t(l).css({
                    transform: "translate3d(" + resizeStart + "px,0,0)",
                    "-webkit-transform": "translate3d(" + resizeStart + "px,0,0)"
                }), t(l).css({"transition-duration": "0s", "-webkit-transition-duration": "0s"})
            }
        }, T = function () {
            t(".slides li", e.id).css("width", g + "px"), v > 1 && t(".slides", e.id).append(k.clone()), t(".slides", e.id).css("width", S + "px");
            for (var i = document.querySelectorAll(".slides li a", e.id), a = 0; a < i.length; a++)i[a].onclick = function () {
                return !n
            };
            E(), A(0, c), N(), L()
        }, L = function () {
            var n = "";
            if (1 === _)t(".ctrls", e.id).html(n); else {
                for (var i = 0; v > i; i++)n += 0 == i ? '<li class="on"></li>' : "<li></li>";
                t(".ctrls", e.id).html(n), c = t(".ctrls li", e.id);
                for (var i = 0; i < c.length; i++)!function (e) {
                    c[e].onmousemove = function () {
                        A(e, c)
                    }
                }(i)
            }
        }, A = function (t, n) {
            y = t, C(t, n), f = -t * g, d = f, P(f, .5), e.autoSlider && I()
        }, C = function (e, t) {
            for (var n = 0; n < t.length; n++)n == e % v ? t[n].className = "on" : t[n].className = ""
        }, P = function (e, n) {
            "undefined" == typeof l.style.webkitTransform ? l.style.marginLeft = e + "px" : (t(l).css({
                transform: "translate3d(" + e + "px,0,0)",
                "-webkit-transform": "translate3d(" + e + "px,0,0)"
            }), t(l).css({"transition-duration": n + "s", "-webkit-transition-duration": n + "s"}))
        }, D = function (e, t) {
            n = !1, w = !0, i = e, touchStartY = t
        }, I = function () {
            null !== b && clearTimeout(b), b = setTimeout(function () {
                w || A((y + 1) % v, c)
            }, e.autoTime)
        }, M = function (e, t) {
            w && (n || (n = !0), f = d + e - i, r = new Date - p, o = e - a, f > 0 ? (d += -v * g, f = d + e - i) : -g * v > f && (d += v * g, f = d + e - i), P(f, 0), p = new Date, a = e)
        }, O = function () {
            var e = o / (new Date - p + r), t = .2;
            h = -t > e ? y + 1 : e > t ? y - 1 : -Math.round(f / g), 0 > h && (h += v), h > v && (h -= v), A(h, c), w = !1
        }, N = function () {
            return 1 === _ ? (l.addEventListener("touchstart", function (e) {
                x.start(e)
            }), l.addEventListener("touchmove", function (e) {
                s || (s = x.move(e)), ("left" == s || "right" == s) && e.preventDefault()
            }), void l.addEventListener("touchend", function (e) {
                s = void 0
            })) : (l.addEventListener("touchstart", function (e) {
                x.start(e), D(e.touches[0].pageX, e.touches[0].pageY)
            }), l.addEventListener("touchmove", function (e) {
                s || (s = x.move(e)), ("left" == s || "right" == s) && (e.preventDefault(), e.stopPropagation(), M(e.touches[0].pageX, e.touches[0].pageY))
            }), void l.addEventListener("touchend", function (e) {
                ("left" == s || "right" == s) && (e.stopPropagation(), O()), s = void 0
            }))
        };
        T()
    };
    void 0 === e.makeScroll && (e.makeScroll = n)
}(window.NEWAP, window.Zepto);
