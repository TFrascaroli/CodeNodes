// svg-pan-zoom v3.5.1
// https://github.com/ariutta/svg-pan-zoom
! function t(e, n, o) {
    function i(r, a) {
        if (!n[r]) {
            if (!e[r]) { var l = "function" == typeof require && require; if (!a && l) return l(r, !0); if (s) return s(r, !0); var u = new Error("Cannot find module '" + r + "'"); throw u.code = "MODULE_NOT_FOUND", u }
            var h = n[r] = { exports: {} };
            e[r][0].call(h.exports, function(t) { var n = e[r][1][t]; return i(n ? n : t) }, h, h.exports, t, e, n, o)
        }
        return n[r].exports
    }
    for (var s = "function" == typeof require && require, r = 0; r < o.length; r++) i(o[r]);
    return i
}({
    1: [function(t, e, n) { var o = t("./svg-pan-zoom.js");! function(t, n) { "function" == typeof define && define.amd ? define("svg-pan-zoom", function() { return o }) : "undefined" != typeof e && e.exports && (e.exports = o, t.svgPanZoom = o) }(window, document) }, { "./svg-pan-zoom.js": 4 }],
    2: [function(t, e, n) {
        var o = t("./svg-utilities");
        e.exports = {
            enable: function(t) {
                var e = t.svg.querySelector("defs");
                e || (e = document.createElementNS(o.svgNS, "defs"), t.svg.appendChild(e));
                var n = e.querySelector("style#svg-pan-zoom-controls-styles");
                if (!n) {
                    var i = document.createElementNS(o.svgNS, "style");
                    i.setAttribute("id", "svg-pan-zoom-controls-styles"), i.setAttribute("type", "text/css"), i.textContent = ".svg-pan-zoom-control { cursor: pointer; fill: black; fill-opacity: 0.333; } .svg-pan-zoom-control:hover { fill-opacity: 0.8; } .svg-pan-zoom-control-background { fill: white; fill-opacity: 0.5; } .svg-pan-zoom-control-background { fill-opacity: 0.8; }", e.appendChild(i)
                }
                var s = document.createElementNS(o.svgNS, "g");
                s.setAttribute("id", "svg-pan-zoom-controls"), s.setAttribute("transform", "translate(" + (t.width - 70) + " " + (t.height - 76) + ") scale(0.75)"), s.setAttribute("class", "svg-pan-zoom-control"), s.appendChild(this._createZoomIn(t)), s.appendChild(this._createZoomReset(t)), s.appendChild(this._createZoomOut(t)), t.svg.appendChild(s), t.controlIcons = s
            },
            _createZoomIn: function(t) {
                var e = document.createElementNS(o.svgNS, "g");
                e.setAttribute("id", "svg-pan-zoom-zoom-in"), e.setAttribute("transform", "translate(30.5 5) scale(0.015)"), e.setAttribute("class", "svg-pan-zoom-control"), e.addEventListener("click", function() { t.getPublicInstance().zoomIn() }, !1), e.addEventListener("touchstart", function() { t.getPublicInstance().zoomIn() }, !1);
                var n = document.createElementNS(o.svgNS, "rect");
                n.setAttribute("x", "0"), n.setAttribute("y", "0"), n.setAttribute("width", "1500"), n.setAttribute("height", "1400"), n.setAttribute("class", "svg-pan-zoom-control-background"), e.appendChild(n);
                var i = document.createElementNS(o.svgNS, "path");
                return i.setAttribute("d", "M1280 576v128q0 26 -19 45t-45 19h-320v320q0 26 -19 45t-45 19h-128q-26 0 -45 -19t-19 -45v-320h-320q-26 0 -45 -19t-19 -45v-128q0 -26 19 -45t45 -19h320v-320q0 -26 19 -45t45 -19h128q26 0 45 19t19 45v320h320q26 0 45 19t19 45zM1536 1120v-960 q0 -119 -84.5 -203.5t-203.5 -84.5h-960q-119 0 -203.5 84.5t-84.5 203.5v960q0 119 84.5 203.5t203.5 84.5h960q119 0 203.5 -84.5t84.5 -203.5z"), i.setAttribute("class", "svg-pan-zoom-control-element"), e.appendChild(i), e
            },
            _createZoomReset: function(t) {
                var e = document.createElementNS(o.svgNS, "g");
                e.setAttribute("id", "svg-pan-zoom-reset-pan-zoom"), e.setAttribute("transform", "translate(5 35) scale(0.4)"), e.setAttribute("class", "svg-pan-zoom-control"), e.addEventListener("click", function() { t.getPublicInstance().reset() }, !1), e.addEventListener("touchstart", function() { t.getPublicInstance().reset() }, !1);
                var n = document.createElementNS(o.svgNS, "rect");
                n.setAttribute("x", "2"), n.setAttribute("y", "2"), n.setAttribute("width", "182"), n.setAttribute("height", "58"), n.setAttribute("class", "svg-pan-zoom-control-background"), e.appendChild(n);
                var i = document.createElementNS(o.svgNS, "path");
                i.setAttribute("d", "M33.051,20.632c-0.742-0.406-1.854-0.609-3.338-0.609h-7.969v9.281h7.769c1.543,0,2.701-0.188,3.473-0.562c1.365-0.656,2.048-1.953,2.048-3.891C35.032,22.757,34.372,21.351,33.051,20.632z"), i.setAttribute("class", "svg-pan-zoom-control-element"), e.appendChild(i);
                var s = document.createElementNS(o.svgNS, "path");
                return s.setAttribute("d", "M170.231,0.5H15.847C7.102,0.5,0.5,5.708,0.5,11.84v38.861C0.5,56.833,7.102,61.5,15.847,61.5h154.384c8.745,0,15.269-4.667,15.269-10.798V11.84C185.5,5.708,178.976,0.5,170.231,0.5z M42.837,48.569h-7.969c-0.219-0.766-0.375-1.383-0.469-1.852c-0.188-0.969-0.289-1.961-0.305-2.977l-0.047-3.211c-0.03-2.203-0.41-3.672-1.142-4.406c-0.732-0.734-2.103-1.102-4.113-1.102h-7.05v13.547h-7.055V14.022h16.524c2.361,0.047,4.178,0.344,5.45,0.891c1.272,0.547,2.351,1.352,3.234,2.414c0.731,0.875,1.31,1.844,1.737,2.906s0.64,2.273,0.64,3.633c0,1.641-0.414,3.254-1.242,4.84s-2.195,2.707-4.102,3.363c1.594,0.641,2.723,1.551,3.387,2.73s0.996,2.98,0.996,5.402v2.32c0,1.578,0.063,2.648,0.19,3.211c0.19,0.891,0.635,1.547,1.333,1.969V48.569z M75.579,48.569h-26.18V14.022h25.336v6.117H56.454v7.336h16.781v6H56.454v8.883h19.125V48.569z M104.497,46.331c-2.44,2.086-5.887,3.129-10.34,3.129c-4.548,0-8.125-1.027-10.731-3.082s-3.909-4.879-3.909-8.473h6.891c0.224,1.578,0.662,2.758,1.316,3.539c1.196,1.422,3.246,2.133,6.15,2.133c1.739,0,3.151-0.188,4.236-0.562c2.058-0.719,3.087-2.055,3.087-4.008c0-1.141-0.504-2.023-1.512-2.648c-1.008-0.609-2.607-1.148-4.796-1.617l-3.74-0.82c-3.676-0.812-6.201-1.695-7.576-2.648c-2.328-1.594-3.492-4.086-3.492-7.477c0-3.094,1.139-5.664,3.417-7.711s5.623-3.07,10.036-3.07c3.685,0,6.829,0.965,9.431,2.895c2.602,1.93,3.966,4.73,4.093,8.402h-6.938c-0.128-2.078-1.057-3.555-2.787-4.43c-1.154-0.578-2.587-0.867-4.301-0.867c-1.907,0-3.428,0.375-4.565,1.125c-1.138,0.75-1.706,1.797-1.706,3.141c0,1.234,0.561,2.156,1.682,2.766c0.721,0.406,2.25,0.883,4.589,1.43l6.063,1.43c2.657,0.625,4.648,1.461,5.975,2.508c2.059,1.625,3.089,3.977,3.089,7.055C108.157,41.624,106.937,44.245,104.497,46.331z M139.61,48.569h-26.18V14.022h25.336v6.117h-18.281v7.336h16.781v6h-16.781v8.883h19.125V48.569z M170.337,20.14h-10.336v28.43h-7.266V20.14h-10.383v-6.117h27.984V20.14z"), s.setAttribute("class", "svg-pan-zoom-control-element"), e.appendChild(s), e
            },
            _createZoomOut: function(t) {
                var e = document.createElementNS(o.svgNS, "g");
                e.setAttribute("id", "svg-pan-zoom-zoom-out"), e.setAttribute("transform", "translate(30.5 70) scale(0.015)"), e.setAttribute("class", "svg-pan-zoom-control"), e.addEventListener("click", function() { t.getPublicInstance().zoomOut() }, !1), e.addEventListener("touchstart", function() { t.getPublicInstance().zoomOut() }, !1);
                var n = document.createElementNS(o.svgNS, "rect");
                n.setAttribute("x", "0"), n.setAttribute("y", "0"), n.setAttribute("width", "1500"), n.setAttribute("height", "1400"), n.setAttribute("class", "svg-pan-zoom-control-background"), e.appendChild(n);
                var i = document.createElementNS(o.svgNS, "path");
                return i.setAttribute("d", "M1280 576v128q0 26 -19 45t-45 19h-896q-26 0 -45 -19t-19 -45v-128q0 -26 19 -45t45 -19h896q26 0 45 19t19 45zM1536 1120v-960q0 -119 -84.5 -203.5t-203.5 -84.5h-960q-119 0 -203.5 84.5t-84.5 203.5v960q0 119 84.5 203.5t203.5 84.5h960q119 0 203.5 -84.5 t84.5 -203.5z"), i.setAttribute("class", "svg-pan-zoom-control-element"), e.appendChild(i), e
            },
            disable: function(t) { t.controlIcons && (t.controlIcons.parentNode.removeChild(t.controlIcons), t.controlIcons = null) }
        }
    }, { "./svg-utilities": 5 }],
    3: [function(t, e, n) {
        var o = t("./svg-utilities"),
            i = t("./utilities"),
            s = function(t, e) { this.init(t, e) };
        s.prototype.init = function(t, e) {
            this.viewport = t, this.options = e, this.originalState = { zoom: 1, x: 0, y: 0 }, this.activeState = { zoom: 1, x: 0, y: 0 }, this.updateCTMCached = i.proxy(this.updateCTM, this), this.requestAnimationFrame = i.createRequestAnimationFrame(this.options.refreshRate), this.viewBox = { x: 0, y: 0, width: 0, height: 0 }, this.cacheViewBox();
            var n = this.processCTM();
            this.setCTM(n), this.updateCTM()
        }, s.prototype.cacheViewBox = function() {
            var t = this.options.svg.getAttribute("viewBox");
            if (t) {
                var e = t.split(/[\s\,]/).filter(function(t) { return t }).map(parseFloat);
                this.viewBox.x = e[0], this.viewBox.y = e[1], this.viewBox.width = e[2], this.viewBox.height = e[3];
                var n = Math.min(this.options.width / this.viewBox.width, this.options.height / this.viewBox.height);
                this.activeState.zoom = n, this.activeState.x = (this.options.width - this.viewBox.width * n) / 2, this.activeState.y = (this.options.height - this.viewBox.height * n) / 2, this.updateCTMOnNextFrame(), this.options.svg.removeAttribute("viewBox")
            } else this.simpleViewBoxCache()
        }, s.prototype.simpleViewBoxCache = function() {
            var t = this.viewport.getBBox();
            this.viewBox.x = t.x, this.viewBox.y = t.y, this.viewBox.width = t.width, this.viewBox.height = t.height
        }, s.prototype.getViewBox = function() { return i.extend({}, this.viewBox) }, s.prototype.processCTM = function() {
            var t = this.getCTM();
            if (this.options.fit || this.options.contain) {
                var e;
                e = this.options.fit ? Math.min(this.options.width / this.viewBox.width, this.options.height / this.viewBox.height) : Math.max(this.options.width / this.viewBox.width, this.options.height / this.viewBox.height), t.a = e, t.d = e, t.e = -this.viewBox.x * e, t.f = -this.viewBox.y * e
            }
            if (this.options.center) {
                var n = .5 * (this.options.width - (this.viewBox.width + 2 * this.viewBox.x) * t.a),
                    o = .5 * (this.options.height - (this.viewBox.height + 2 * this.viewBox.y) * t.a);
                t.e = n, t.f = o
            }
            return this.originalState.zoom = t.a, this.originalState.x = t.e, this.originalState.y = t.f, t
        }, s.prototype.getOriginalState = function() { return i.extend({}, this.originalState) }, s.prototype.getState = function() { return i.extend({}, this.activeState) }, s.prototype.getZoom = function() { return this.activeState.zoom }, s.prototype.getRelativeZoom = function() { return this.activeState.zoom / this.originalState.zoom }, s.prototype.computeRelativeZoom = function(t) { return t / this.originalState.zoom }, s.prototype.getPan = function() { return { x: this.activeState.x, y: this.activeState.y } }, s.prototype.getCTM = function() { var t = this.options.svg.createSVGMatrix(); return t.a = this.activeState.zoom, t.b = 0, t.c = 0, t.d = this.activeState.zoom, t.e = this.activeState.x, t.f = this.activeState.y, t }, s.prototype.setCTM = function(t) {
            var e = this.isZoomDifferent(t),
                n = this.isPanDifferent(t);
            if (e || n) {
                if (e && (this.options.beforeZoom(this.getRelativeZoom(), this.computeRelativeZoom(t.a)) === !1 ? (t.a = t.d = this.activeState.zoom, e = !1) : (this.updateCache(t), this.options.onZoom(this.getRelativeZoom()))), n) {
                    var o = this.options.beforePan(this.getPan(), { x: t.e, y: t.f }),
                        s = !1,
                        r = !1;
                    o === !1 ? (t.e = this.getPan().x, t.f = this.getPan().y, s = r = !0) : i.isObject(o) && (o.x === !1 ? (t.e = this.getPan().x, s = !0) : i.isNumber(o.x) && (t.e = o.x), o.y === !1 ? (t.f = this.getPan().y, r = !0) : i.isNumber(o.y) && (t.f = o.y)), s && r || !this.isPanDifferent(t) ? n = !1 : (this.updateCache(t), this.options.onPan(this.getPan()))
                }(e || n) && this.updateCTMOnNextFrame()
            }
        }, s.prototype.isZoomDifferent = function(t) { return this.activeState.zoom !== t.a }, s.prototype.isPanDifferent = function(t) { return this.activeState.x !== t.e || this.activeState.y !== t.f }, s.prototype.updateCache = function(t) { this.activeState.zoom = t.a, this.activeState.x = t.e, this.activeState.y = t.f }, s.prototype.pendingUpdate = !1, s.prototype.updateCTMOnNextFrame = function() { this.pendingUpdate || (this.pendingUpdate = !0, this.requestAnimationFrame.call(window, this.updateCTMCached)) }, s.prototype.updateCTM = function() {
            var t = this.getCTM();
            o.setCTM(this.viewport, t, this.defs), this.pendingUpdate = !1, this.options.onUpdatedCTM && this.options.onUpdatedCTM(t)
        }, e.exports = function(t, e) { return new s(t, e) }
    }, { "./svg-utilities": 5, "./utilities": 7 }],
    4: [function(t, e, n) {
        var o = t("./uniwheel"),
            i = t("./control-icons"),
            s = t("./utilities"),
            r = t("./svg-utilities"),
            a = t("./shadow-viewport"),
            l = function(t, e) { this.init(t, e) },
            u = { viewportSelector: ".svg-pan-zoom_viewport", panEnabled: !0, controlIconsEnabled: !1, zoomEnabled: !0, dblClickZoomEnabled: !0, mouseWheelZoomEnabled: !0, preventMouseEventsDefault: !0, zoomScaleSensitivity: .1, minZoom: .5, maxZoom: 10, fit: !0, contain: !1, center: !0, refreshRate: "auto", beforeZoom: null, onZoom: null, beforePan: null, onPan: null, customEventsHandler: null, eventsListenerElement: null, onUpdatedCTM: null };
        l.prototype.init = function(t, e) {
            var n = this;
            this.svg = t, this.defs = t.querySelector("defs"), r.setupSvgAttributes(this.svg), this.options = s.extend(s.extend({}, u), e), this.state = "none";
            var o = r.getBoundingClientRectNormalized(t);
            this.width = o.width, this.height = o.height, this.viewport = a(r.getOrCreateViewport(this.svg, this.options.viewportSelector), { svg: this.svg, width: this.width, height: this.height, fit: this.options.fit, contain: this.options.contain, center: this.options.center, refreshRate: this.options.refreshRate, beforeZoom: function(t, e) { return n.viewport && n.options.beforeZoom ? n.options.beforeZoom(t, e) : void 0 }, onZoom: function(t) { return n.viewport && n.options.onZoom ? n.options.onZoom(t) : void 0 }, beforePan: function(t, e) { return n.viewport && n.options.beforePan ? n.options.beforePan(t, e) : void 0 }, onPan: function(t) { return n.viewport && n.options.onPan ? n.options.onPan(t) : void 0 }, onUpdatedCTM: function(t) { return n.viewport && n.options.onUpdatedCTM ? n.options.onUpdatedCTM(t) : void 0 } });
            var l = this.getPublicInstance();
            l.setBeforeZoom(this.options.beforeZoom), l.setOnZoom(this.options.onZoom), l.setBeforePan(this.options.beforePan), l.setOnPan(this.options.onPan), l.setOnUpdatedCTM(this.options.onUpdatedCTM), this.options.controlIconsEnabled && i.enable(this), this.lastMouseWheelEventTime = Date.now(), this.setupHandlers()
        }, l.prototype.setupHandlers = function() {
            var t = this,
                e = null;
            if (this.eventListeners = { mousedown: function(n) { if (n.target instanceof HTMLInputElement) return; var o = t.handleMouseDown(n, e); return e = n, o }, touchstart: function(n) { if (n.target instanceof HTMLInputElement) return; var o = t.handleMouseDown(n, e); return e = n, o }, mouseup: function(e) { if (e.target instanceof HTMLInputElement) return; return t.handleMouseUp(e) }, touchend: function(e) { if (e.target instanceof HTMLInputElement) return; return t.handleMouseUp(e) }, mousemove: function(e) { if (e.target instanceof HTMLInputElement) return; return t.handleMouseMove(e) }, touchmove: function(e) { if (n.target instanceof HTMLInputElement) return; return t.handleMouseMove(e) }, mouseleave: function(e) { return t.handleMouseUp(e) }, touchleave: function(e) { return t.handleMouseUp(e) }, touchcancel: function(e) { return t.handleMouseUp(e) } }, null != this.options.customEventsHandler) {
                this.options.customEventsHandler.init({ svgElement: this.svg, eventsListenerElement: this.options.eventsListenerElement, instance: this.getPublicInstance() });
                var n = this.options.customEventsHandler.haltEventListeners;
                if (n && n.length)
                    for (var o = n.length - 1; o >= 0; o--) this.eventListeners.hasOwnProperty(n[o]) && delete this.eventListeners[n[o]]
            }
            for (var i in this.eventListeners)(this.options.eventsListenerElement || this.svg).addEventListener(i, this.eventListeners[i], !1);
            this.options.mouseWheelZoomEnabled && (this.options.mouseWheelZoomEnabled = !1, this.enableMouseWheelZoom())
        }, l.prototype.enableMouseWheelZoom = function() {
            if (!this.options.mouseWheelZoomEnabled) {
                var t = this;
                this.wheelListener = function(e) { return t.handleMouseWheel(e) }, o.on(this.options.eventsListenerElement || this.svg, this.wheelListener, !1), this.options.mouseWheelZoomEnabled = !0
            }
        }, l.prototype.disableMouseWheelZoom = function() { this.options.mouseWheelZoomEnabled && (o.off(this.options.eventsListenerElement || this.svg, this.wheelListener, !1), this.options.mouseWheelZoomEnabled = !1) }, l.prototype.handleMouseWheel = function(t) {
            if (this.options.zoomEnabled && "none" === this.state) {
                this.options.preventMouseEventsDefault && (t.preventDefault ? t.preventDefault() : t.returnValue = !1);
                var e = t.deltaY || 1,
                    n = Date.now() - this.lastMouseWheelEventTime,
                    o = 3 + Math.max(0, 30 - n);
                this.lastMouseWheelEventTime = Date.now(), "deltaMode" in t && 0 === t.deltaMode && t.wheelDelta && (e = 0 === t.deltaY ? 0 : Math.abs(t.wheelDelta) / t.deltaY), e = e > -.3 && .3 > e ? e : (e > 0 ? 1 : -1) * Math.log(Math.abs(e) + 10) / o;
                var i = this.svg.getScreenCTM().inverse(),
                    s = r.getEventPoint(t, this.svg).matrixTransform(i),
                    a = Math.pow(1 + this.options.zoomScaleSensitivity, -1 * e);
                this.zoomAtPoint(a, s)
            }
        }, l.prototype.zoomAtPoint = function(t, e, n) {
            var o = this.viewport.getOriginalState();
            n ? (t = Math.max(this.options.minZoom * o.zoom, Math.min(this.options.maxZoom * o.zoom, t)), t /= this.getZoom()) : this.getZoom() * t < this.options.minZoom * o.zoom ? t = this.options.minZoom * o.zoom / this.getZoom() : this.getZoom() * t > this.options.maxZoom * o.zoom && (t = this.options.maxZoom * o.zoom / this.getZoom());
            var i = this.viewport.getCTM(),
                s = e.matrixTransform(i.inverse()),
                r = this.svg.createSVGMatrix().translate(s.x, s.y).scale(t).translate(-s.x, -s.y),
                a = i.multiply(r);
            a.a !== i.a && this.viewport.setCTM(a)
        }, l.prototype.zoom = function(t, e) { this.zoomAtPoint(t, r.getSvgCenterPoint(this.svg, this.width, this.height), e) }, l.prototype.publicZoom = function(t, e) { e && (t = this.computeFromRelativeZoom(t)), this.zoom(t, e) }, l.prototype.publicZoomAtPoint = function(t, e, n) {
            if (n && (t = this.computeFromRelativeZoom(t)), "SVGPoint" !== s.getType(e)) {
                if (!("x" in e && "y" in e)) throw new Error("Given point is invalid");
                e = r.createSVGPoint(this.svg, e.x, e.y)
            }
            this.zoomAtPoint(t, e, n)
        }, l.prototype.getZoom = function() { return this.viewport.getZoom() }, l.prototype.getRelativeZoom = function() { return this.viewport.getRelativeZoom() }, l.prototype.computeFromRelativeZoom = function(t) { return t * this.viewport.getOriginalState().zoom }, l.prototype.resetZoom = function() {
            var t = this.viewport.getOriginalState();
            this.zoom(t.zoom, !0)
        }, l.prototype.resetPan = function() { this.pan(this.viewport.getOriginalState()) }, l.prototype.reset = function() { this.resetZoom(), this.resetPan() }, l.prototype.handleDblClick = function(t) {
            if (this.options.preventMouseEventsDefault && (t.preventDefault ? t.preventDefault() : t.returnValue = !1), this.options.controlIconsEnabled) { var e = t.target.getAttribute("class") || ""; if (e.indexOf("svg-pan-zoom-control") > -1) return !1 }
            var n;
            n = t.shiftKey ? 1 / (2 * (1 + this.options.zoomScaleSensitivity)) : 2 * (1 + this.options.zoomScaleSensitivity);
            var o = r.getEventPoint(t, this.svg).matrixTransform(this.svg.getScreenCTM().inverse());
            this.zoomAtPoint(n, o)
        }, l.prototype.handleMouseDown = function(t, e) { this.options.preventMouseEventsDefault && (t.preventDefault ? t.preventDefault() : t.returnValue = !1), s.mouseAndTouchNormalize(t, this.svg), this.options.dblClickZoomEnabled && s.isDblClick(t, e) ? this.handleDblClick(t) : (this.state = "pan", this.firstEventCTM = this.viewport.getCTM(), this.stateOrigin = r.getEventPoint(t, this.svg).matrixTransform(this.firstEventCTM.inverse())) }, l.prototype.handleMouseMove = function(t) {
            if (this.options.preventMouseEventsDefault && (t.preventDefault ? t.preventDefault() : t.returnValue = !1), "pan" === this.state && this.options.panEnabled) {
                var e = r.getEventPoint(t, this.svg).matrixTransform(this.firstEventCTM.inverse()),
                    n = this.firstEventCTM.translate(e.x - this.stateOrigin.x, e.y - this.stateOrigin.y);
                this.viewport.setCTM(n)
            }
        }, l.prototype.handleMouseUp = function(t) { this.options.preventMouseEventsDefault && (t.preventDefault ? t.preventDefault() : t.returnValue = !1), "pan" === this.state && (this.state = "none") }, l.prototype.fit = function() {
            var t = this.viewport.getViewBox(),
                e = Math.min(this.width / t.width, this.height / t.height);
            this.zoom(e, !0)
        }, l.prototype.contain = function() {
            var t = this.viewport.getViewBox(),
                e = Math.max(this.width / t.width, this.height / t.height);
            this.zoom(e, !0)
        }, l.prototype.center = function() {
            var t = this.viewport.getViewBox(),
                e = .5 * (this.width - (t.width + 2 * t.x) * this.getZoom()),
                n = .5 * (this.height - (t.height + 2 * t.y) * this.getZoom());
            this.getPublicInstance().pan({ x: e, y: n })
        }, l.prototype.updateBBox = function() { this.viewport.simpleViewBoxCache() }, l.prototype.pan = function(t) {
            var e = this.viewport.getCTM();
            e.e = t.x, e.f = t.y, this.viewport.setCTM(e)
        }, l.prototype.panBy = function(t) {
            var e = this.viewport.getCTM();
            e.e += t.x, e.f += t.y, this.viewport.setCTM(e)
        }, l.prototype.getPan = function() { var t = this.viewport.getState(); return { x: t.x, y: t.y } }, l.prototype.resize = function() {
            var t = r.getBoundingClientRectNormalized(this.svg);
            this.width = t.width, this.height = t.height;
            var e = this.viewport;
            e.options.width = this.width, e.options.height = this.height, e.processCTM(), this.options.controlIconsEnabled && (this.getPublicInstance().disableControlIcons(), this.getPublicInstance().enableControlIcons())
        }, l.prototype.destroy = function() {
            var t = this;
            this.beforeZoom = null, this.onZoom = null, this.beforePan = null, this.onPan = null, this.onUpdatedCTM = null, null != this.options.customEventsHandler && this.options.customEventsHandler.destroy({ svgElement: this.svg, eventsListenerElement: this.options.eventsListenerElement, instance: this.getPublicInstance() });
            for (var e in this.eventListeners)(this.options.eventsListenerElement || this.svg).removeEventListener(e, this.eventListeners[e], !1);
            this.disableMouseWheelZoom(), this.getPublicInstance().disableControlIcons(), this.reset(), h = h.filter(function(e) { return e.svg !== t.svg }), delete this.options, delete this.viewport, delete this.publicInstance, delete this.pi, this.getPublicInstance = function() { return null }
        }, l.prototype.getPublicInstance = function() { var t = this; return this.publicInstance || (this.publicInstance = this.pi = { enablePan: function() { return t.options.panEnabled = !0, t.pi }, disablePan: function() { return t.options.panEnabled = !1, t.pi }, isPanEnabled: function() { return !!t.options.panEnabled }, pan: function(e) { return t.pan(e), t.pi }, panBy: function(e) { return t.panBy(e), t.pi }, getPan: function() { return t.getPan() }, setBeforePan: function(e) { return t.options.beforePan = null === e ? null : s.proxy(e, t.publicInstance), t.pi }, setOnPan: function(e) { return t.options.onPan = null === e ? null : s.proxy(e, t.publicInstance), t.pi }, enableZoom: function() { return t.options.zoomEnabled = !0, t.pi }, disableZoom: function() { return t.options.zoomEnabled = !1, t.pi }, isZoomEnabled: function() { return !!t.options.zoomEnabled }, enableControlIcons: function() { return t.options.controlIconsEnabled || (t.options.controlIconsEnabled = !0, i.enable(t)), t.pi }, disableControlIcons: function() { return t.options.controlIconsEnabled && (t.options.controlIconsEnabled = !1, i.disable(t)), t.pi }, isControlIconsEnabled: function() { return !!t.options.controlIconsEnabled }, enableDblClickZoom: function() { return t.options.dblClickZoomEnabled = !0, t.pi }, disableDblClickZoom: function() { return t.options.dblClickZoomEnabled = !1, t.pi }, isDblClickZoomEnabled: function() { return !!t.options.dblClickZoomEnabled }, enableMouseWheelZoom: function() { return t.enableMouseWheelZoom(), t.pi }, disableMouseWheelZoom: function() { return t.disableMouseWheelZoom(), t.pi }, isMouseWheelZoomEnabled: function() { return !!t.options.mouseWheelZoomEnabled }, setZoomScaleSensitivity: function(e) { return t.options.zoomScaleSensitivity = e, t.pi }, setMinZoom: function(e) { return t.options.minZoom = e, t.pi }, setMaxZoom: function(e) { return t.options.maxZoom = e, t.pi }, setBeforeZoom: function(e) { return t.options.beforeZoom = null === e ? null : s.proxy(e, t.publicInstance), t.pi }, setOnZoom: function(e) { return t.options.onZoom = null === e ? null : s.proxy(e, t.publicInstance), t.pi }, zoom: function(e) { return t.publicZoom(e, !0), t.pi }, zoomBy: function(e) { return t.publicZoom(e, !1), t.pi }, zoomAtPoint: function(e, n) { return t.publicZoomAtPoint(e, n, !0), t.pi }, zoomAtPointBy: function(e, n) { return t.publicZoomAtPoint(e, n, !1), t.pi }, zoomIn: function() { return this.zoomBy(1 + t.options.zoomScaleSensitivity), t.pi }, zoomOut: function() { return this.zoomBy(1 / (1 + t.options.zoomScaleSensitivity)), t.pi }, getZoom: function() { return t.getRelativeZoom() }, setOnUpdatedCTM: function(e) { return t.options.onUpdatedCTM = null === e ? null : s.proxy(e, t.publicInstance), t.pi }, resetZoom: function() { return t.resetZoom(), t.pi }, resetPan: function() { return t.resetPan(), t.pi }, reset: function() { return t.reset(), t.pi }, fit: function() { return t.fit(), t.pi }, contain: function() { return t.contain(), t.pi }, center: function() { return t.center(), t.pi }, updateBBox: function() { return t.updateBBox(), t.pi }, resize: function() { return t.resize(), t.pi }, getSizes: function() { return { width: t.width, height: t.height, realZoom: t.getZoom(), viewBox: t.viewport.getViewBox() } }, destroy: function() { return t.destroy(), t.pi } }), this.publicInstance };
        var h = [],
            c = function(t, e) {
                var n = s.getSvg(t);
                if (null === n) return null;
                for (var o = h.length - 1; o >= 0; o--)
                    if (h[o].svg === n) return h[o].instance.getPublicInstance();
                return h.push({ svg: n, instance: new l(n, e) }), h[h.length - 1].instance.getPublicInstance()
            };
        e.exports = c
    }, { "./control-icons": 2, "./shadow-viewport": 3, "./svg-utilities": 5, "./uniwheel": 6, "./utilities": 7 }],
    5: [function(t, e, n) {
        var o = t("./utilities"),
            i = "unknown";
        document.documentMode && (i = "ie"), e.exports = {
            svgNS: "http://www.w3.org/2000/svg",
            xmlNS: "http://www.w3.org/XML/1998/namespace",
            xmlnsNS: "http://www.w3.org/2000/xmlns/",
            xlinkNS: "http://www.w3.org/1999/xlink",
            evNS: "http://www.w3.org/2001/xml-events",
            getBoundingClientRectNormalized: function(t) { if (t.clientWidth && t.clientHeight) return { width: t.clientWidth, height: t.clientHeight }; if (t.getBoundingClientRect()) return t.getBoundingClientRect(); throw new Error("Cannot get BoundingClientRect for SVG.") },
            getOrCreateViewport: function(t, e) {
                var n = null;
                if (n = o.isElement(e) ? e : t.querySelector(e), !n) {
                    var i = Array.prototype.slice.call(t.childNodes || t.children).filter(function(t) { return "defs" !== t.nodeName && "#text" !== t.nodeName });
                    1 === i.length && "g" === i[0].nodeName && null === i[0].getAttribute("transform") && (n = i[0])
                }
                if (!n) {
                    var s = "viewport-" + (new Date).toISOString().replace(/\D/g, "");
                    n = document.createElementNS(this.svgNS, "g"), n.setAttribute("id", s);
                    var r = t.childNodes || t.children;
                    if (r && r.length > 0)
                        for (var a = r.length; a > 0; a--) "defs" !== r[r.length - a].nodeName && n.appendChild(r[r.length - a]);
                    t.appendChild(n)
                }
                var l = [];
                return n.getAttribute("class") && (l = n.getAttribute("class").split(" ")), ~l.indexOf("svg-pan-zoom_viewport") || (l.push("svg-pan-zoom_viewport"), n.setAttribute("class", l.join(" "))), n
            },
            setupSvgAttributes: function(t) { if (t.setAttribute("xmlns", this.svgNS), t.setAttributeNS(this.xmlnsNS, "xmlns:xlink", this.xlinkNS), t.setAttributeNS(this.xmlnsNS, "xmlns:ev", this.evNS), null !== t.parentNode) { var e = t.getAttribute("style") || ""; - 1 === e.toLowerCase().indexOf("overflow") && t.setAttribute("style", "overflow: hidden; " + e) } },
            internetExplorerRedisplayInterval: 300,
            refreshDefsGlobal: o.throttle(function() {
                for (var t = document.querySelectorAll("defs"), e = t.length, n = 0; e > n; n++) {
                    var o = t[n];
                    o.parentNode.insertBefore(o, o)
                }
            }, this.internetExplorerRedisplayInterval),
            setCTM: function(t, e, n) {
                var o = this,
                    s = "matrix(" + e.a + "," + e.b + "," + e.c + "," + e.d + "," + e.e + "," + e.f + ")";
                t.setAttributeNS(null, "transform", s), "transform" in t.style ? t.style.transform = s : "-ms-transform" in t.style ? t.style["-ms-transform"] = s : "-webkit-transform" in t.style && (t.style["-webkit-transform"] = s), "ie" === i && n && (n.parentNode.insertBefore(n, n), window.setTimeout(function() { o.refreshDefsGlobal() }, o.internetExplorerRedisplayInterval))
            },
            getEventPoint: function(t, e) { var n = e.createSVGPoint(); return o.mouseAndTouchNormalize(t, e), n.x = t.clientX, n.y = t.clientY, n },
            getSvgCenterPoint: function(t, e, n) { return this.createSVGPoint(t, e / 2, n / 2) },
            createSVGPoint: function(t, e, n) { var o = t.createSVGPoint(); return o.x = e, o.y = n, o }
        }
    }, { "./utilities": 7 }],
    6: [function(t, e, n) {
        e.exports = function() {
            function t(t, e, n) { var o = function(t) {!t && (t = window.event); var n = { originalEvent: t, target: t.target || t.srcElement, type: "wheel", deltaMode: "MozMousePixelScroll" == t.type ? 0 : 1, deltaX: 0, delatZ: 0, preventDefault: function() { t.preventDefault ? t.preventDefault() : t.returnValue = !1 } }; return "mousewheel" == u ? (n.deltaY = -1 / 40 * t.wheelDelta, t.wheelDeltaX && (n.deltaX = -1 / 40 * t.wheelDeltaX)) : n.deltaY = t.detail, e(n) }; return c.push({ element: t, fn: o, capture: n }), o }

            function e(t, e) {
                for (var n = 0; n < c.length; n++)
                    if (c[n].element === t && c[n].capture === e) return c[n].fn;
                return function() {}
            }

            function n(t, e) {
                for (var n = 0; n < c.length; n++)
                    if (c[n].element === t && c[n].capture === e) return c.splice(n, 1)
            }

            function o(e, n, o, i) {
                var s;
                s = "wheel" === u ? o : t(e, o, i), e[a](h + n, s, i || !1)
            }

            function i(t, o, i, s) {
                var r;
                r = "wheel" === u ? i : e(t, s), t[l](h + o, r, s || !1), n(t, s)
            }

            function s(t, e, n) { o(t, u, e, n), "DOMMouseScroll" == u && o(t, "MozMousePixelScroll", e, n) }

            function r(t, e, n) { i(t, u, e, n), "DOMMouseScroll" == u && i(t, "MozMousePixelScroll", e, n) }
            var a, l, u, h = "",
                c = [];
            return window.addEventListener ? (a = "addEventListener", l = "removeEventListener") : (a = "attachEvent", l = "detachEvent", h = "on"), u = "onwheel" in document.createElement("div") ? "wheel" : void 0 !== document.onmousewheel ? "mousewheel" : "DOMMouseScroll", { on: s, off: r }
        }()
    }, {}],
    7: [function(t, e, n) {
        function o(t) { return function(e) { window.setTimeout(e, t) } }
        e.exports = {
            extend: function(t, e) { t = t || {}; for (var n in e) this.isObject(e[n]) ? t[n] = this.extend(t[n], e[n]) : t[n] = e[n]; return t },
            isElement: function(t) { return t instanceof HTMLElement || t instanceof SVGElement || t instanceof SVGSVGElement || t && "object" == typeof t && null !== t && 1 === t.nodeType && "string" == typeof t.nodeName },
            isObject: function(t) { return "[object Object]" === Object.prototype.toString.call(t) },
            isNumber: function(t) { return !isNaN(parseFloat(t)) && isFinite(t) },
            getSvg: function(t) {
                var e, n;
                if (this.isElement(t)) e = t;
                else { if (!("string" == typeof t || t instanceof String)) throw new Error("Provided selector is not an HTML object nor String"); if (e = document.querySelector(t), !e) throw new Error("Provided selector did not find any elements. Selector: " + t) }
                if ("svg" === e.tagName.toLowerCase()) n = e;
                else if ("object" === e.tagName.toLowerCase()) n = e.contentDocument.documentElement;
                else {
                    if ("embed" !== e.tagName.toLowerCase()) throw "img" === e.tagName.toLowerCase() ? new Error('Cannot script an SVG in an "img" element. Please use an "object" element or an in-line SVG.') : new Error("Cannot get SVG.");
                    n = e.getSVGDocument().documentElement
                }
                return n
            },
            proxy: function(t, e) { return function() { return t.apply(e, arguments) } },
            getType: function(t) { return Object.prototype.toString.apply(t).replace(/^\[object\s/, "").replace(/\]$/, "") },
            mouseAndTouchNormalize: function(t, e) {
                if (void 0 === t.clientX || null === t.clientX)
                    if (t.clientX = 0, t.clientY = 0, void 0 !== t.changedTouches && t.changedTouches.length) {
                        if (void 0 !== t.changedTouches[0].clientX) t.clientX = t.changedTouches[0].clientX, t.clientY = t.changedTouches[0].clientY;
                        else if (void 0 !== t.changedTouches[0].pageX) {
                            var n = e.getBoundingClientRect();
                            t.clientX = t.changedTouches[0].pageX - n.left, t.clientY = t.changedTouches[0].pageY - n.top
                        }
                    } else void 0 !== t.originalEvent && void 0 !== t.originalEvent.clientX && (t.clientX = t.originalEvent.clientX, t.clientY = t.originalEvent.clientY)
            },
            isDblClick: function(t, e) {
                if (2 === t.detail) return !0;
                if (void 0 !== e && null !== e) {
                    var n = t.timeStamp - e.timeStamp,
                        o = Math.sqrt(Math.pow(t.clientX - e.clientX, 2) + Math.pow(t.clientY - e.clientY, 2));
                    return 250 > n && 10 > o
                }
                return !1
            },
            now: Date.now || function() { return (new Date).getTime() },
            throttle: function(t, e, n) {
                var o, i, s, r = this,
                    a = null,
                    l = 0;
                n || (n = {});
                var u = function() { l = n.leading === !1 ? 0 : r.now(), a = null, s = t.apply(o, i), a || (o = i = null) };
                return function() {
                    var h = r.now();
                    l || n.leading !== !1 || (l = h);
                    var c = e - (h - l);
                    return o = this, i = arguments, 0 >= c || c > e ? (clearTimeout(a), a = null, l = h, s = t.apply(o, i), a || (o = i = null)) : a || n.trailing === !1 || (a = setTimeout(u, c)), s
                }
            },
            createRequestAnimationFrame: function(t) { var e = null; return "auto" !== t && 60 > t && t > 1 && (e = Math.floor(1e3 / t)), null === e ? window.requestAnimationFrame || o(33) : o(e) }
        }
    }, {}]
}, {}, [1]);

(function() {
    "use strict";

    var namespace = "http://www.w3.org/2000/svg";

    var NodeValue = function(name, type, mode, node) {
        this.name = name;
        this.type = type;
        this.mode = mode;
        this.inputConnector = null;
		this.__internalGetValue = null;
        this.svgEntity = null;
        this.gOffset = null;
        this.parentNode = node;
    };

    NodeValue.prototype.render = function(parent, position) {
        var self = this;
        if (!this.svgEntity) {
            var ent = document.createElementNS(namespace, "g");
            this.gOffset = {
                x: 1,
                y: ((position * Node.ROW_HEIGHT) + 1)
            };
            ent.setAttribute("transform", "translate(" + this.gOffset.x + ", " + this.gOffset.y + ")");
            ent.setAttribute("class", "row");
            if (this.mode === "edit") {
                var rect = document.createElementNS(namespace, "rect"),
                    fo = document.createElementNS(namespace, "foreignObject"),
                    name = document.createElementNS(namespace, "text"),
                    div = document.createElementNS("http://www.w3.org/1999/xhtml", "div"),
                    input = document.createElement("input");
				this.__internalGetValue = function () {
					return input.value;
				};
                name.textContent = this.name;
                name.setAttribute("x", "10");
                name.setAttribute("y", "6");
                rect.setAttribute("x", "1");
                div.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
                input.type = this.type;
                div.appendChild(input);
                fo.appendChild(div);
                fo.setAttribute("transform", "translate(0,13)");
                //ent.appendChild(rect);
                ent.appendChild(name);
                ent.appendChild(fo);
            }

            if (this.mode === "in") {
                var name = document.createElementNS(namespace, "text"),
                    type = document.createElementNS(namespace, "text"),
                    dot = document.createElementNS(namespace, "circle");

                dot.setAttribute("cx", "-1");
                dot.setAttribute("cy", "16");
                dot.setAttribute("r", "4");
                dot.setAttribute("class", "dot");
                dot.addEventListener("click", function(evt) {
                    if (self.inputConnector) {
                        self.inputConnector.remove();
                    }
                    evt.stopPropagation();
                });
                dot.parentValue = this;
                name.textContent = this.name;
                name.setAttribute("x", "10");
                name.setAttribute("y", "8");
                type.textContent = "[" + this.type + "]";
				type.classList.add("value-type");
                type.setAttribute("x", "10");
                type.setAttribute("y", "25");
				this.__internalGetValue = function () {
					if (this.inputConnector) {
						return this.inputConnector
					}
					return null
				};

                ent.appendChild(name);
                ent.appendChild(type);
                ent.appendChild(dot);
            }
            this.svgEntity = ent;
            parent.appendChild(ent);
        }
    };
    NodeValue.prototype.getDotPosition = function() {
        return {
            x: this.parentNode.position.x + this.gOffset.x - 1,
            y: this.parentNode.position.y + this.gOffset.y + 16
        };
    };
    NodeValue.prototype.updateConectorPosition = function() {
        if (this.inputConnector) {
            this.inputConnector.ep = this.getDotPosition();
            this.inputConnector.setPath();
        }
    };
	NodeValue.prototype.getValue = function () {
		if (this.__internalGetValue instanceof Function) {
			return this.__internalGetValue();
		}
		return null;
	};

    var NodeConnector = function(sp, node) {
        this.sp = sp;
        this.ep = sp;
        this.end1 = node;
        this.end2 = null;

        this.path = document.createElementNS(namespace, "path");
        this.setPath();
    };
    NodeConnector.prototype.setPath = function() {
        var c1 = {
                x: ((this.ep.x - this.sp.x) / 3) + this.sp.x,
                y: this.sp.y
            },
            c2 = {
                x: -((this.ep.x - this.sp.x) / 3) + this.ep.x,
                y: this.ep.y
            };
        this.path.setAttribute("d", "M" + this.sp.x + "," + this.sp.y + " C" + c1.x + "," + c1.y + " " + c2.x + "," + c2.y + " " + this.ep.x + "," + this.ep.y);
    };
    NodeConnector.prototype.remove = function() {
        if (this.end1) {
            var ind = this.end1.outputConnectors.indexOf(this);
            if (ind >= 0) {
                this.end1.outputConnectors.splice(ind, 1);
            }
            this.end1 = null;
        }
        if (this.end2) {
            this.end2.inputConnector = null;
        }
        if (this.path) {
            this.path.parentNode.removeChild(this.path);
            this.path = null;
        }
    };
    NodeConnector.prototype.moveEndPoint = function(point) {
        this.ep = point;
        this.setPath();
    };


    var Node = function(title, builder, schema, type, clonable, x, y) {
        var self = this;
        this.rect = null;
        this.g = null;
        this.output = null;
        this.outputOffset = null;
		this.built = null;
        this.title = title;
        this.builder = builder;
		this.clonable = clonable;
        this.type = type;
        this.values = {};
        this.position = {
            x: x,
            y: y
        };
        this.schema = schema;
        this.props = schema;
        this.nProps = this.props.length;
        this.nRows = this.nProps + 2;
        this.onmousedown = null;
        this.outputConnectors = [];
        this.props.forEach(function(prop) {
            self.values[prop.name] = new NodeValue(prop.name, prop.type, prop.mode, self);
        });
    };

    Node.ROW_HEIGHT = 38;
    Node.prototype.render = function render(parent) {
        var self = this;
        if (!this.g) {
            this.g = document.createElementNS(namespace, "g");
            this.g.setAttribute("transform", "translate(" + this.position.x + "," + this.position.y + ")");
            this.g.setAttribute("class", "entity");

            this.rect = document.createElementNS(namespace, "rect");
            this.rect.setAttribute("width", "110");
            this.rect.setAttribute("rx", "3");
            this.rect.setAttribute("height", ((this.nRows * Node.ROW_HEIGHT) + 2).toString());
            this.rect.setAttribute("class", "draggable");
            this.rectDownHandler = function(evt) {
                if (this.onmousedown instanceof Function) {
                    this.onmousedown(evt, this);
                }
            }.bind(this);
            this.rect.addEventListener("mousedown", this.rectDownHandler);


            var t = document.createElementNS(namespace, "text");
            t.textContent = this.title;
            t.classList.add("title");
            t.setAttribute("x", "5");
            t.setAttribute("y", "15");

            this.g.appendChild(this.rect);
            this.g.appendChild(t);

            var output = document.createElementNS(namespace, "circle");
            this.output = output;
            this.outputOffset = {
                x: 110,
                y: (this.nRows * Node.ROW_HEIGHT) - 10
            };
            output.setAttribute("cx", this.outputOffset.x);
            output.setAttribute("cy", this.outputOffset.y);
            output.setAttribute("r", "6");
            output.setAttribute("class", "output");
            this.outputDownHandler = function(evt) {
                if (this.onmousedown instanceof Function) {
                    this.outputMousedown(evt, this);
                }
            }.bind(this);
            output.addEventListener("mousedown", this.outputDownHandler);
            var outputType = document.createElementNS(namespace, "text");
            outputType.textContent = "[" + this.type + "]";
            outputType.classList.add("output-type");
            outputType.setAttribute("x", 100);
            outputType.setAttribute("y", this.outputOffset.y);
            this.g.appendChild(output);
            this.g.appendChild(outputType);


            this.closeBtn = document.createElementNS(namespace, "circle");
            this.closeBtn.classList.add("close-btn");
            this.closeBtn.setAttribute("cx", "100");
            this.closeBtn.setAttribute("r", "6");
            this.closeBtn.setAttribute("cy", "15");
        	this.close = function() {
				this.remove();
            }.bind(this);
            this.closeBtn.addEventListener("click", this.close);
            this.g.appendChild(this.closeBtn);

            parent.appendChild(this.g);
        }
        var i = 1;

        Object.keys(this.values).forEach(function(k) {
            if (self.values.hasOwnProperty(k)) {
                var val = self.values[k];
                val.render(self.g, i++);
            }
        });
    };

    Node.prototype.move = function move(x, y) {
        var self = this;
        this.position = {
            x: x,
            y: y
        };
        this.outputConnectors.forEach(function(con) {
            con.sp = {
                x: x + self.outputOffset.x,
                y: y + self.outputOffset.y
            };
            con.setPath();
        });
        Object.keys(this.values).forEach(function(k) {
            if (self.values.hasOwnProperty(k)) {
                var val = self.values[k];
                val.updateConectorPosition();
            }
        });
        this.g.setAttribute("transform", "translate(" + this.position.x + "," + this.position.y + ")");
    };
    Node.prototype.build = function() {
		if (!this.built) {
			var valuesArr = [],
				propsOnBuild = [],
				self = this;
			propsOnBuild = this.props.filter(function(p) {
				return p.onBuild;
			}).sort(function(a, b) {
				return a.order - b.order;
			});
			valuesArr = propsOnBuild.map(function(p) {
				return self.values[p.name].getValue();
			});
			this.built =  this.builder.apply(this, valuesArr);
			return this.built;
		} else {
			if (this.clonable) {
				return this.built.clone();
			} else {
				return this.built;
			}
		}
    };
    Node.prototype.remove = function() {
        var self = this;
        Object.keys(this.values).forEach(function(k) {
            if (self.values.hasOwnProperty(k)) {
                var val = self.values[k];
                if (val.inputConnector) {
                    val.inputConnector.remove();
                };
            }
        });
        [].concat(this.outputConnectors).forEach(function(con) {
            con.remove();
        });
		if (this.onremove instanceof Function) {
			this.onremove();
		}
        this.closeBtn.removeEventListener("click", this.close);
        this.rect.removeEventListener("mousedown", this.rectDownHandler);
        this.output.addEventListener("mousedown", this.outputDownHandler);
    };

    var NodesCanvas = function() {
        this.svg = null;
        this.g = null;
        this.paths = null;
        this.nodes = [];
        this.pt = null;
        this.draggingEntity = null;
        this.currentConnector = null;
        this.diff = null;
    };
    NodesCanvas.prototype.cursorPoint = function(evt) {
        this.pt.x = evt.clientX;
        this.pt.y = evt.clientY;
        return this.pt.matrixTransform(this.svg.getScreenCTM().inverse());
    };
    NodesCanvas.prototype.render = function render() {
        var self = this;
        if (!this.svg) {
            this.svg = document.createElementNS(namespace, "svg");
            this.svg.setAttribute("class", "codenodes");
            this.pt = this.svg.createSVGPoint();
            this.svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns", namespace);
            this.svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
            this.svg.setAttribute("width", "100%");
            this.svg.setAttribute("height", "100%");
            this.g = document.createElementNS(namespace, "g");
            this.paths = document.createElementNS(namespace, "g");
            this.g.classList.add("svg-pan-zoom_viewport");
            this.g.setAttribute("transform", "matrix(1,1,1,1,0,0)");
            this.g.appendChild(this.paths);
            this.svg.appendChild(this.g);
        }
        this.nodes.forEach(function(node) {
            node.render(self.g);
        });
    };
    NodesCanvas.prototype.addNode = function(title, builder, schema, type, clonable, x, y) {
        var n = new Node(title, builder, schema, type, clonable, x, y),
            self = this,
            ctm = null,
            offset = null;

        function convertCoords(o) {
            var x = o.x,
                y = o.y;
            return {
                x: (ctm.a * x) + (ctm.c * y) + ctm.e - offset.left,
                y: (ctm.b * x) + (ctm.d * y) + ctm.f - offset.top
            };
        }

        function mouseMoveHandler(evt) {
            if (self.draggingEntity) {
                var p = self.cursorPoint(evt);
                p.x = p.x - self.diff.x;
                p.y = p.y - self.diff.y;
                p = convertCoords(p);
                self.draggingEntity.move(p.x, p.y);
            }
        }

        function mouseUpHandler(evt) {
            self.svg.removeEventListener("mousemove", mouseMoveHandler);
            self.svg.removeEventListener("mouseup", mouseUpHandler);
            mouseMoveHandler(evt);
            self.draggingEntity = null;
        }

        function mouseMoveConnectorHandler(evt) {
            var p = convertCoords(self.cursorPoint(evt));
            self.currentConnector.moveEndPoint(p);
        }

        function mouseUpConnectorHandler(evt) {
            var p = convertCoords(self.cursorPoint(evt));
            self.svg.removeEventListener("mousemove", mouseMoveConnectorHandler);
            self.svg.removeEventListener("mouseup", mouseUpConnectorHandler);
            var dots = [].slice.call(document.querySelectorAll(".codenodes .dot"));
            var candidates = dots.map(function(dot) {
                var pos = dot.parentValue.getDotPosition();
                var dist = Math.sqrt(Math.pow(p.x - pos.x, 2) + Math.pow(p.y - pos.y, 2));
                return {
                    dist: dist,
                    dot: dot
                };
            }).filter(function(dot) {
                return dot.dist <= 30;
            }).sort(function(a, b) {
                return a.dist - b.dist;
            });
            if (candidates.length > 0) {
                if (candidates[0].dot.parentValue.inputConnector) {
                    candidates[0].dot.parentValue.inputConnector.remove();
                }
                candidates[0].dot.parentValue.inputConnector = self.currentConnector;
                self.currentConnector.end2 = candidates[0].dot.parentValue;
                if (self.currentConnector.end2.type !== self.currentConnector.end1.type) {
                    self.currentConnector.remove();
                }
                if (self.currentConnector.end1 === candidates[0].dot.parentValue.parentNode) {
                    self.currentConnector.remove();
                }
                candidates[0].dot.parentValue.updateConectorPosition();
            } else {
                self.currentConnector.remove();
            }
            self.currentConnector = null;
        }

        this.nodes.push(n);
        n.outputMousedown = function(evt, entity) {
            var p = self.cursorPoint(evt);
            ctm = self.g.getCTM().inverse();
            offset = self.svg.getBoundingClientRect();
            var p = {
                x: entity.position.x + parseInt(entity.output.getAttribute("cx")),
                y: entity.position.y + parseInt(entity.output.getAttribute("cy"))
            }
            self.currentConnector = new NodeConnector(p, entity);
            entity.outputConnectors.push(self.currentConnector);
            self.paths.appendChild(self.currentConnector.path);
            self.svg.addEventListener("mousemove", mouseMoveConnectorHandler);
            self.svg.addEventListener("mouseup", mouseUpConnectorHandler);
            evt.stopPropagation();
        };
        n.onmousedown = function(evt, entity) {
            var p = self.cursorPoint(evt);
            ctm = self.g.getCTM();
            offset = self.svg.getBoundingClientRect();
            var entPos = convertCoords(entity.position);
            self.diff = {
                x: p.x - entPos.x,
                y: p.y - entPos.y
            };
            ctm = ctm.inverse();
            evt.stopPropagation();
            self.draggingEntity = entity;
            if (self.draggingEntity) {
                self.svg.addEventListener("mousemove", mouseMoveHandler);
                self.svg.addEventListener("mouseup", mouseUpHandler);
            }
        }.bind(this);
        n.onremove = function() {
            n.outputMousedown = null;
            n.onmousedown = null;
            var ind = self.nodes.indexOf(n);
            if (ind >= 0) {
                self.nodes.splice(ind, 1);
            }
            self.g.removeChild(n.g);
        }
    };
    NodesCanvas.prototype.init = function() {
        this.svg.setAttribute("viewBox", "0 0 " + this.svg.clientWidth + " " + this.svg.clientHeight);
        this.zoomingSvg = svgPanZoom(this.svg, {
            zoomScaleSensitivity: 0.4
        });
    };
	NodesCanvas.prototype.clear = function () {
		//Alert the user about the action being irreversible
		var nds = [].concat(this.nodes);
		nds.forEach(function (node) {
			node.remove();
		});
	};
	NodesCanvas.prototype.getTerminalNodes = function () {
		return this.nodes.filter(function (n) {
			return n.outputConnectors.length === 0;
		});
	};

    var cn2 = function(types) {
        this.canvas = new cn2.NodesCanvas();
        this.types = types;
    };
    cn2.prototype.getSVG = function() {
        this.canvas.render();
        return this.canvas.svg;
    };
    cn2.prototype.init = function() {
        this.canvas.init();
    };
    cn2.prototype.addNode = function(name, type) {
        var t = this.types[type];
        if (t) {
            this.canvas.addNode(name, t.builder, t.schema, type, t.clonable || false, 10, 10);
        } else {
            console.log("There is no type " + type + " registered");
        }
    };

    cn2.NodeValue = NodeValue;
    cn2.NodeConnector = NodeConnector;
    cn2.NodesCanvas = NodesCanvas;
    cn2.Node = Node;


    window.codenodes = cn2;
}());