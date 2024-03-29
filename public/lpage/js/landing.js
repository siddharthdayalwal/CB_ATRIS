!function() {
    "use strict";
    const e = document.getElementsByClassName("tm");
    if (e.length > 0)
        for (let t = 0; t < e.length; t++)
            e[t].addEventListener("click", function() {
                this.parentNode.classList.toggle("ty");
                const e = this.nextElementSibling;
                e.style.maxHeight ? e.style.maxHeight = null : e.style.maxHeight = e.scrollHeight + "px"
            })
}(),
function() {
    "use strict";
    let e = {
        touchStartX: 0,
        touchEndX: 0,
        minSwipePixels: 30,
        detectionZone: void 0,
        swipeCallback: function() {},
        init: function(t, n) {
            e.swipeCallback = n,
            t.addEventListener("touchstart", function(t) {
                e.touchStartX = t.changedTouches[0].screenX
            }, !1),
            t.addEventListener("touchend", function(t) {
                e.touchEndX = t.changedTouches[0].screenX,
                e.handleSwipeGesture()
            }, !1)
        },
        handleSwipeGesture: function() {
            let t, n;
            e.touchEndX <= e.touchStartX && (n = e.touchStartX - e.touchEndX,
            t = "left"),
            e.touchEndX >= e.touchStartX && (n = e.touchEndX - e.touchStartX,
            t = "right"),
            n > e.minSwipePixels && "undefined" !== t && e.swipe(t, n)
        },
        swipe: function(t, n) {
            let s = {};
            s.direction = t,
            s.movedPixels = n,
            e.swipeCallback(s)
        }
    };
    const t = document.getElementsByClassName("is-carousel");
    function n(e, t) {
        void 0 === t && (t = "next");
        let n = e.getElementsByClassName("tq ty")[0]
          , s = "next" === t ? n.nextElementSibling : n.previousElementSibling
          , i = n.getAttribute("data-carousel")
          , a = e.getElementsByClassName("ne")[i]
          , l = "next" === t ? a.nextElementSibling : a.previousElementSibling;
        n.classList.remove("ty"),
        a.classList.remove("ty"),
        s ? (s.classList.add("ty"),
        l.classList.add("ty")) : "next" === t ? (e.getElementsByClassName("carousel-items")[0].firstElementChild.classList.add("ty"),
        e.getElementsByClassName("tz")[0].firstElementChild.classList.add("ty")) : (e.getElementsByClassName("carousel-items")[0].lastElementChild.classList.add("ty"),
        e.getElementsByClassName("tz")[0].lastElementChild.classList.add("ty"))
    }
    function s(e, t) {
        let n, s = 0;
        for (let e = 0; e < t.length; e++)
            t[0].parentNode.style.minHeight = s + "px",
            t[e].classList.add("w"),
            n = t[e].offsetHeight,
            t[e].classList.remove("w"),
            n > s && (s = n);
        t[0].parentNode.style.minHeight = s + "px"
    }
    function i(e) {
        e && clearInterval(e)
    }
    if (t.length > 0)
        for (let a = 0; a < t.length; a++) {
            let l = t[a]
              , o = l.getElementsByClassName("carousel-items")[0]
              , c = l.getElementsByClassName("tq")
              , r = l.getAttribute("data-autorotate");
            const d = document.createElement("div");
            d.className = "tz",
            o.parentNode.insertBefore(d, o.nextSibling);
            for (let e = 0; e < c.length; e++) {
                c[e].setAttribute("data-carousel", e);
                let t = document.createElement("tbuttonn");
                t.className = "ne",
                t.setAttribute("data-bullet", e),
                l.getElementsByClassName("tz")[0].appendChild(t)
            }
            c[0].classList.add("ty");
            let u = l.getElementsByClassName("ne");
            u[0].classList.add("ty"),
            s(0, c),
            window.addEventListener("resize", function() {
                s(0, c)
            });
            let m = !1;
            r && (m = setInterval(function() {
                n(l, "next")
            }, r));
            for (let e = 0; e < u.length; e++) {
                let t = u[e];
                t.addEventListener("click", function(e) {
                    if (e.preventDefault(),
                    t.classList.contains("ty"))
                        return;
                    for (let e = 0; e < u.length; e++)
                        u[e].classList.remove("ty");
                    for (let e = 0; e < c.length; e++)
                        c[e].classList.remove("ty");
                    let n = this.getAttribute("data-bullet");
                    c[n].classList.add("ty"),
                    this.classList.add("ty"),
                    i(m)
                })
            }
            e.init(l, function(e) {
                "left" === e.direction ? n(l, "next") : "right" === e.direction && n(l, "prev"),
                i(m)
            })
        }
}(),
function() {
    "use strict";
    document.documentElement.classList.remove("no-js"),
    document.documentElement.classList.add("js"),
    window.addEventListener("load", function() {
        document.body.classList.add("n")
    })
}(),
function() {
    "use strict";
    const e = document.getElementById("tc")
      , t = document.getElementById("nm");
    e && (e.addEventListener("click", function() {
        document.body.classList.toggle("td"),
        t.classList.toggle("ty"),
        t.style.maxHeight ? t.style.maxHeight = null : t.style.maxHeight = t.scrollHeight + "px",
        "true" === this.getAttribute("aria-expanded") ? this.setAttribute("aria-expanded", "false") : this.setAttribute("aria-expanded", "true")
    }),
    document.addEventListener("click", function(n) {
        n.target === t || n.target === e || t.contains(n.target) || (document.body.classList.remove("td"),
        t.classList.remove("ty"),
        t.style.maxHeight = null,
        e.setAttribute("aria-expanded", "false"))
    }))
}(),
function() {
    "use strict";
    const e = document.getElementsByClassName("tw")
      , t = document.getElementsByClassName("modal-trigger");
    function n() {
        document.body.classList.remove("modal-is-active");
        for (let t = 0; t < e.length; t++)
            e[t].classList.remove("ty")
    }
    if (e.length > 0 && t.length > 0)
        for (let e = 0; e < t.length; e++) {
            let n = t[e]
              , s = document.getElementById(n.getAttribute("aria-controls"));
            s && (n.hasAttribute("data-video") && (null !== s.querySelector("iframe") ? s.querySelector("iframe").setAttribute("src", n.getAttribute("data-video")) : null !== s.querySelector("video") && s.querySelector("video").setAttribute("src", n.getAttribute("data-video"))),
            n.addEventListener("click", function(e) {
                var t;
                e.preventDefault(),
                n.hasAttribute("aria-controls") && (t = s) && (document.body.classList.add("modal-is-active"),
                t.classList.add("ty"))
            }))
        }
    document.addEventListener("click", function(e) {
        (e.target.classList.contains("tw") || e.target.classList.contains("modal-close-trigger")) && (e.preventDefault(),
        n())
    }),
    document.addEventListener("keydown", function(e) {
        27 === (e || window.event).keyCode && n()
    })
}(),
function() {
    "use strict";
    const e = document.getElementById("pricing-toggle");
    function t() {
        const t = document.getElementsByClassName("pricing-switchable");
        if (e.checked)
            for (let e = 0; e < t.length; e++)
                t[e].innerHTML = t[e].getAttribute("data-pricing-yearly");
        else
            for (let e = 0; e < t.length; e++)
                t[e].innerHTML = t[e].getAttribute("data-pricing-monthly")
    }
    e && (window.addEventListener("load", t),
    e.addEventListener("change", t))
}(),
function() {
    "use strict";
    const e = document.querySelectorAll("[class*=reveal-]");
    let t = window.innerHeight;
    function n(e, t) {
        var n = 0;
        return function() {
            var s = (new Date).getTime();
            if (!(s - n < e))
                return n = s,
                t.apply(void 0, arguments)
        }
    }
    function s() {
        for (let s = 0; s < e.length; s++) {
            let i = e[s]
              , a = i.getAttribute("data-reveal-delay")
              , l = i.getAttribute("data-reveal-offset") ? i.getAttribute("data-reveal-offset") : "200"
              , o = i.getAttribute("data-reveal-container") ? i.closest(i.getAttribute("data-reveal-container")) : i;
            n = l,
            o.getBoundingClientRect().top <= t - n && !i.classList.contains("is-revealed") && (a && 0 !== a ? setTimeout(function() {
                i.classList.add("is-revealed")
            }, a) : i.classList.add("is-revealed"))
        }
        var n;
        !function() {
            if (e.length > document.querySelectorAll("[class*=reveal-].is-revealed").length)
                return;
            window.removeEventListener("load", s),
            window.removeEventListener("scroll", i),
            window.removeEventListener("resize", a)
        }()
    }
    function i() {
        n(30, s())
    }
    function a() {
        t = window.innerHeight,
        n(30, s())
    }
    e.length > 0 && document.body.classList.contains("t") && (window.addEventListener("load", s),
    window.addEventListener("scroll", i),
    window.addEventListener("resize", a))
}(),
function() {
    "use strict";
    const e = document.getElementsByClassName("smooth-scroll")
      , t = (e,n,s,i,a)=>{
        const l = n - e;
        let o = l / s;
        const c = function(e) {
            return e < .5 ? 2 * e * e : (4 - 2 * e) * e - 1
        }(o = Math.min(o, 1));
        window.scroll(0, a + i * c),
        l < s && window.requestAnimationFrame(n=>{
            const l = n || (new Date).getTime();
            t(e, l, s, i, a)
        }
        )
    }
    ;
    if (e.length > 0)
        for (let n = 0; n < e.length; n++) {
            e[n].addEventListener("click", function(e) {
                e.preventDefault();
                const n = e.target.closest(".smooth-scroll")
                  , s = n.href.split("#")[1]
                  , i = document.getElementById(s)
                  , a = n.getAttribute("data-duration") || 1e3;
                i && window.requestAnimationFrame(e=>{
                    const n = e || (new Date).getTime()
                      , s = n
                      , l = window.pageYOffset
                      , o = i.getBoundingClientRect().top;
                    t(s, n, a, o, l)
                }
                )
            })
        }
}();
