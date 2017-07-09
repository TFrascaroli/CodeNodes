(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.codenodes = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var SvgPanZoom = require('./svg-pan-zoom.js');

module.exports = SvgPanZoom;

},{"./svg-pan-zoom.js":4}],2:[function(require,module,exports){
var SvgUtils = require('./svg-utilities');

module.exports = {
  enable: function(instance) {
    // Select (and create if necessary) defs
    var defs = instance.svg.querySelector('defs')
    if (!defs) {
      defs = document.createElementNS(SvgUtils.svgNS, 'defs')
      instance.svg.appendChild(defs)
    }

    // Check for style element, and create it if it doesn't exist
    var styleEl = defs.querySelector('style#svg-pan-zoom-controls-styles');
    if (!styleEl) {
      var style = document.createElementNS(SvgUtils.svgNS, 'style')
      style.setAttribute('id', 'svg-pan-zoom-controls-styles')
      style.setAttribute('type', 'text/css')
      style.textContent = '.svg-pan-zoom-control { cursor: pointer; fill: black; fill-opacity: 0.333; } .svg-pan-zoom-control:hover { fill-opacity: 0.8; } .svg-pan-zoom-control-background { fill: white; fill-opacity: 0.5; } .svg-pan-zoom-control-background { fill-opacity: 0.8; }'
      defs.appendChild(style)
    }

    // Zoom Group
    var zoomGroup = document.createElementNS(SvgUtils.svgNS, 'g');
    zoomGroup.setAttribute('id', 'svg-pan-zoom-controls');
    zoomGroup.setAttribute('transform', 'translate(' + ( instance.width - 70 ) + ' ' + ( instance.height - 76 ) + ') scale(0.75)');
    zoomGroup.setAttribute('class', 'svg-pan-zoom-control');

    // Control elements
    zoomGroup.appendChild(this._createZoomIn(instance))
    zoomGroup.appendChild(this._createZoomReset(instance))
    zoomGroup.appendChild(this._createZoomOut(instance))

    // Finally append created element
    instance.svg.appendChild(zoomGroup)

    // Cache control instance
    instance.controlIcons = zoomGroup
  }

, _createZoomIn: function(instance) {
    var zoomIn = document.createElementNS(SvgUtils.svgNS, 'g');
    zoomIn.setAttribute('id', 'svg-pan-zoom-zoom-in');
    zoomIn.setAttribute('transform', 'translate(30.5 5) scale(0.015)');
    zoomIn.setAttribute('class', 'svg-pan-zoom-control');
    zoomIn.addEventListener('click', function() {instance.getPublicInstance().zoomIn()}, false)
    zoomIn.addEventListener('touchstart', function() {instance.getPublicInstance().zoomIn()}, false)

    var zoomInBackground = document.createElementNS(SvgUtils.svgNS, 'rect'); // TODO change these background space fillers to rounded rectangles so they look prettier
    zoomInBackground.setAttribute('x', '0');
    zoomInBackground.setAttribute('y', '0');
    zoomInBackground.setAttribute('width', '1500'); // larger than expected because the whole group is transformed to scale down
    zoomInBackground.setAttribute('height', '1400');
    zoomInBackground.setAttribute('class', 'svg-pan-zoom-control-background');
    zoomIn.appendChild(zoomInBackground);

    var zoomInShape = document.createElementNS(SvgUtils.svgNS, 'path');
    zoomInShape.setAttribute('d', 'M1280 576v128q0 26 -19 45t-45 19h-320v320q0 26 -19 45t-45 19h-128q-26 0 -45 -19t-19 -45v-320h-320q-26 0 -45 -19t-19 -45v-128q0 -26 19 -45t45 -19h320v-320q0 -26 19 -45t45 -19h128q26 0 45 19t19 45v320h320q26 0 45 19t19 45zM1536 1120v-960 q0 -119 -84.5 -203.5t-203.5 -84.5h-960q-119 0 -203.5 84.5t-84.5 203.5v960q0 119 84.5 203.5t203.5 84.5h960q119 0 203.5 -84.5t84.5 -203.5z');
    zoomInShape.setAttribute('class', 'svg-pan-zoom-control-element');
    zoomIn.appendChild(zoomInShape);

    return zoomIn
  }

, _createZoomReset: function(instance){
    // reset
    var resetPanZoomControl = document.createElementNS(SvgUtils.svgNS, 'g');
    resetPanZoomControl.setAttribute('id', 'svg-pan-zoom-reset-pan-zoom');
    resetPanZoomControl.setAttribute('transform', 'translate(5 35) scale(0.4)');
    resetPanZoomControl.setAttribute('class', 'svg-pan-zoom-control');
    resetPanZoomControl.addEventListener('click', function() {instance.getPublicInstance().reset()}, false);
    resetPanZoomControl.addEventListener('touchstart', function() {instance.getPublicInstance().reset()}, false);

    var resetPanZoomControlBackground = document.createElementNS(SvgUtils.svgNS, 'rect'); // TODO change these background space fillers to rounded rectangles so they look prettier
    resetPanZoomControlBackground.setAttribute('x', '2');
    resetPanZoomControlBackground.setAttribute('y', '2');
    resetPanZoomControlBackground.setAttribute('width', '182'); // larger than expected because the whole group is transformed to scale down
    resetPanZoomControlBackground.setAttribute('height', '58');
    resetPanZoomControlBackground.setAttribute('class', 'svg-pan-zoom-control-background');
    resetPanZoomControl.appendChild(resetPanZoomControlBackground);

    var resetPanZoomControlShape1 = document.createElementNS(SvgUtils.svgNS, 'path');
    resetPanZoomControlShape1.setAttribute('d', 'M33.051,20.632c-0.742-0.406-1.854-0.609-3.338-0.609h-7.969v9.281h7.769c1.543,0,2.701-0.188,3.473-0.562c1.365-0.656,2.048-1.953,2.048-3.891C35.032,22.757,34.372,21.351,33.051,20.632z');
    resetPanZoomControlShape1.setAttribute('class', 'svg-pan-zoom-control-element');
    resetPanZoomControl.appendChild(resetPanZoomControlShape1);

    var resetPanZoomControlShape2 = document.createElementNS(SvgUtils.svgNS, 'path');
    resetPanZoomControlShape2.setAttribute('d', 'M170.231,0.5H15.847C7.102,0.5,0.5,5.708,0.5,11.84v38.861C0.5,56.833,7.102,61.5,15.847,61.5h154.384c8.745,0,15.269-4.667,15.269-10.798V11.84C185.5,5.708,178.976,0.5,170.231,0.5z M42.837,48.569h-7.969c-0.219-0.766-0.375-1.383-0.469-1.852c-0.188-0.969-0.289-1.961-0.305-2.977l-0.047-3.211c-0.03-2.203-0.41-3.672-1.142-4.406c-0.732-0.734-2.103-1.102-4.113-1.102h-7.05v13.547h-7.055V14.022h16.524c2.361,0.047,4.178,0.344,5.45,0.891c1.272,0.547,2.351,1.352,3.234,2.414c0.731,0.875,1.31,1.844,1.737,2.906s0.64,2.273,0.64,3.633c0,1.641-0.414,3.254-1.242,4.84s-2.195,2.707-4.102,3.363c1.594,0.641,2.723,1.551,3.387,2.73s0.996,2.98,0.996,5.402v2.32c0,1.578,0.063,2.648,0.19,3.211c0.19,0.891,0.635,1.547,1.333,1.969V48.569z M75.579,48.569h-26.18V14.022h25.336v6.117H56.454v7.336h16.781v6H56.454v8.883h19.125V48.569z M104.497,46.331c-2.44,2.086-5.887,3.129-10.34,3.129c-4.548,0-8.125-1.027-10.731-3.082s-3.909-4.879-3.909-8.473h6.891c0.224,1.578,0.662,2.758,1.316,3.539c1.196,1.422,3.246,2.133,6.15,2.133c1.739,0,3.151-0.188,4.236-0.562c2.058-0.719,3.087-2.055,3.087-4.008c0-1.141-0.504-2.023-1.512-2.648c-1.008-0.609-2.607-1.148-4.796-1.617l-3.74-0.82c-3.676-0.812-6.201-1.695-7.576-2.648c-2.328-1.594-3.492-4.086-3.492-7.477c0-3.094,1.139-5.664,3.417-7.711s5.623-3.07,10.036-3.07c3.685,0,6.829,0.965,9.431,2.895c2.602,1.93,3.966,4.73,4.093,8.402h-6.938c-0.128-2.078-1.057-3.555-2.787-4.43c-1.154-0.578-2.587-0.867-4.301-0.867c-1.907,0-3.428,0.375-4.565,1.125c-1.138,0.75-1.706,1.797-1.706,3.141c0,1.234,0.561,2.156,1.682,2.766c0.721,0.406,2.25,0.883,4.589,1.43l6.063,1.43c2.657,0.625,4.648,1.461,5.975,2.508c2.059,1.625,3.089,3.977,3.089,7.055C108.157,41.624,106.937,44.245,104.497,46.331z M139.61,48.569h-26.18V14.022h25.336v6.117h-18.281v7.336h16.781v6h-16.781v8.883h19.125V48.569z M170.337,20.14h-10.336v28.43h-7.266V20.14h-10.383v-6.117h27.984V20.14z');
    resetPanZoomControlShape2.setAttribute('class', 'svg-pan-zoom-control-element');
    resetPanZoomControl.appendChild(resetPanZoomControlShape2);

    return resetPanZoomControl
  }

, _createZoomOut: function(instance){
    // zoom out
    var zoomOut = document.createElementNS(SvgUtils.svgNS, 'g');
    zoomOut.setAttribute('id', 'svg-pan-zoom-zoom-out');
    zoomOut.setAttribute('transform', 'translate(30.5 70) scale(0.015)');
    zoomOut.setAttribute('class', 'svg-pan-zoom-control');
    zoomOut.addEventListener('click', function() {instance.getPublicInstance().zoomOut()}, false);
    zoomOut.addEventListener('touchstart', function() {instance.getPublicInstance().zoomOut()}, false);

    var zoomOutBackground = document.createElementNS(SvgUtils.svgNS, 'rect'); // TODO change these background space fillers to rounded rectangles so they look prettier
    zoomOutBackground.setAttribute('x', '0');
    zoomOutBackground.setAttribute('y', '0');
    zoomOutBackground.setAttribute('width', '1500'); // larger than expected because the whole group is transformed to scale down
    zoomOutBackground.setAttribute('height', '1400');
    zoomOutBackground.setAttribute('class', 'svg-pan-zoom-control-background');
    zoomOut.appendChild(zoomOutBackground);

    var zoomOutShape = document.createElementNS(SvgUtils.svgNS, 'path');
    zoomOutShape.setAttribute('d', 'M1280 576v128q0 26 -19 45t-45 19h-896q-26 0 -45 -19t-19 -45v-128q0 -26 19 -45t45 -19h896q26 0 45 19t19 45zM1536 1120v-960q0 -119 -84.5 -203.5t-203.5 -84.5h-960q-119 0 -203.5 84.5t-84.5 203.5v960q0 119 84.5 203.5t203.5 84.5h960q119 0 203.5 -84.5 t84.5 -203.5z');
    zoomOutShape.setAttribute('class', 'svg-pan-zoom-control-element');
    zoomOut.appendChild(zoomOutShape);

    return zoomOut
  }

, disable: function(instance) {
    if (instance.controlIcons) {
      instance.controlIcons.parentNode.removeChild(instance.controlIcons)
      instance.controlIcons = null
    }
  }
}

},{"./svg-utilities":5}],3:[function(require,module,exports){
var SvgUtils = require('./svg-utilities')
  , Utils = require('./utilities')
  ;

var ShadowViewport = function(viewport, options){
  this.init(viewport, options)
}

/**
 * Initialization
 *
 * @param  {SVGElement} viewport
 * @param  {Object} options
 */
ShadowViewport.prototype.init = function(viewport, options) {
  // DOM Elements
  this.viewport = viewport
  this.options = options

  // State cache
  this.originalState = {zoom: 1, x: 0, y: 0}
  this.activeState = {zoom: 1, x: 0, y: 0}

  this.updateCTMCached = Utils.proxy(this.updateCTM, this)

  // Create a custom requestAnimationFrame taking in account refreshRate
  this.requestAnimationFrame = Utils.createRequestAnimationFrame(this.options.refreshRate)

  // ViewBox
  this.viewBox = {x: 0, y: 0, width: 0, height: 0}
  this.cacheViewBox()

  // Process CTM
  var newCTM = this.processCTM()

  // Update viewport CTM and cache zoom and pan
  this.setCTM(newCTM)

  // Update CTM in this frame
  this.updateCTM()
}

/**
 * Cache initial viewBox value
 * If no viewBox is defined, then use viewport size/position instead for viewBox values
 */
ShadowViewport.prototype.cacheViewBox = function() {
  var svgViewBox = this.options.svg.getAttribute('viewBox')

  if (svgViewBox) {
    var viewBoxValues = svgViewBox.split(/[\s\,]/).filter(function(v){return v}).map(parseFloat)

    // Cache viewbox x and y offset
    this.viewBox.x = viewBoxValues[0]
    this.viewBox.y = viewBoxValues[1]
    this.viewBox.width = viewBoxValues[2]
    this.viewBox.height = viewBoxValues[3]

    var zoom = Math.min(this.options.width / this.viewBox.width, this.options.height / this.viewBox.height)

    // Update active state
    this.activeState.zoom = zoom
    this.activeState.x = (this.options.width - this.viewBox.width * zoom) / 2
    this.activeState.y = (this.options.height - this.viewBox.height * zoom) / 2

    // Force updating CTM
    this.updateCTMOnNextFrame()

    this.options.svg.removeAttribute('viewBox')
  } else {
    this.simpleViewBoxCache()
  }
}

/**
 * Recalculate viewport sizes and update viewBox cache
 */
ShadowViewport.prototype.simpleViewBoxCache = function() {
  var bBox = this.viewport.getBBox()

  this.viewBox.x = bBox.x
  this.viewBox.y = bBox.y
  this.viewBox.width = bBox.width
  this.viewBox.height = bBox.height
}

/**
 * Returns a viewbox object. Safe to alter
 *
 * @return {Object} viewbox object
 */
ShadowViewport.prototype.getViewBox = function() {
  return Utils.extend({}, this.viewBox)
}

/**
 * Get initial zoom and pan values. Save them into originalState
 * Parses viewBox attribute to alter initial sizes
 *
 * @return {CTM} CTM object based on options
 */
ShadowViewport.prototype.processCTM = function() {
  var newCTM = this.getCTM()

  if (this.options.fit || this.options.contain) {
    var newScale;
    if (this.options.fit) {
      newScale = Math.min(this.options.width/this.viewBox.width, this.options.height/this.viewBox.height);
    } else {
      newScale = Math.max(this.options.width/this.viewBox.width, this.options.height/this.viewBox.height);
    }

    newCTM.a = newScale; //x-scale
    newCTM.d = newScale; //y-scale
    newCTM.e = -this.viewBox.x * newScale; //x-transform
    newCTM.f = -this.viewBox.y * newScale; //y-transform
  }

  if (this.options.center) {
    var offsetX = (this.options.width - (this.viewBox.width + this.viewBox.x * 2) * newCTM.a) * 0.5
      , offsetY = (this.options.height - (this.viewBox.height + this.viewBox.y * 2) * newCTM.a) * 0.5

    newCTM.e = offsetX
    newCTM.f = offsetY
  }

  // Cache initial values. Based on activeState and fix+center opitons
  this.originalState.zoom = newCTM.a
  this.originalState.x = newCTM.e
  this.originalState.y = newCTM.f

  return newCTM
}

/**
 * Return originalState object. Safe to alter
 *
 * @return {Object}
 */
ShadowViewport.prototype.getOriginalState = function() {
  return Utils.extend({}, this.originalState)
}

/**
 * Return actualState object. Safe to alter
 *
 * @return {Object}
 */
ShadowViewport.prototype.getState = function() {
  return Utils.extend({}, this.activeState)
}

/**
 * Get zoom scale
 *
 * @return {Float} zoom scale
 */
ShadowViewport.prototype.getZoom = function() {
  return this.activeState.zoom
}

/**
 * Get zoom scale for pubilc usage
 *
 * @return {Float} zoom scale
 */
ShadowViewport.prototype.getRelativeZoom = function() {
  return this.activeState.zoom / this.originalState.zoom
}

/**
 * Compute zoom scale for pubilc usage
 *
 * @return {Float} zoom scale
 */
ShadowViewport.prototype.computeRelativeZoom = function(scale) {
  return scale / this.originalState.zoom
}

/**
 * Get pan
 *
 * @return {Object}
 */
ShadowViewport.prototype.getPan = function() {
  return {x: this.activeState.x, y: this.activeState.y}
}

/**
 * Return cached viewport CTM value that can be safely modified
 *
 * @return {SVGMatrix}
 */
ShadowViewport.prototype.getCTM = function() {
  var safeCTM = this.options.svg.createSVGMatrix()

  // Copy values manually as in FF they are not itterable
  safeCTM.a = this.activeState.zoom
  safeCTM.b = 0
  safeCTM.c = 0
  safeCTM.d = this.activeState.zoom
  safeCTM.e = this.activeState.x
  safeCTM.f = this.activeState.y

  return safeCTM
}

/**
 * Set a new CTM
 *
 * @param {SVGMatrix} newCTM
 */
ShadowViewport.prototype.setCTM = function(newCTM) {
  var willZoom = this.isZoomDifferent(newCTM)
    , willPan = this.isPanDifferent(newCTM)

  if (willZoom || willPan) {
    // Before zoom
    if (willZoom) {
      // If returns false then cancel zooming
      if (this.options.beforeZoom(this.getRelativeZoom(), this.computeRelativeZoom(newCTM.a)) === false) {
        newCTM.a = newCTM.d = this.activeState.zoom
        willZoom = false
      } else {
        this.updateCache(newCTM);
        this.options.onZoom(this.getRelativeZoom())
      }
    }

    // Before pan
    if (willPan) {
      var preventPan = this.options.beforePan(this.getPan(), {x: newCTM.e, y: newCTM.f})
          // If prevent pan is an object
        , preventPanX = false
        , preventPanY = false

      // If prevent pan is Boolean false
      if (preventPan === false) {
        // Set x and y same as before
        newCTM.e = this.getPan().x
        newCTM.f = this.getPan().y

        preventPanX = preventPanY = true
      } else if (Utils.isObject(preventPan)) {
        // Check for X axes attribute
        if (preventPan.x === false) {
          // Prevent panning on x axes
          newCTM.e = this.getPan().x
          preventPanX = true
        } else if (Utils.isNumber(preventPan.x)) {
          // Set a custom pan value
          newCTM.e = preventPan.x
        }

        // Check for Y axes attribute
        if (preventPan.y === false) {
          // Prevent panning on x axes
          newCTM.f = this.getPan().y
          preventPanY = true
        } else if (Utils.isNumber(preventPan.y)) {
          // Set a custom pan value
          newCTM.f = preventPan.y
        }
      }

      // Update willPan flag
      // Check if newCTM is still different
      if ((preventPanX && preventPanY) || !this.isPanDifferent(newCTM)) {
        willPan = false
      } else {
        this.updateCache(newCTM);
        this.options.onPan(this.getPan());
      }
    }

    // Check again if should zoom or pan
    if (willZoom || willPan) {
      this.updateCTMOnNextFrame()
    }
  }
}

ShadowViewport.prototype.isZoomDifferent = function(newCTM) {
  return this.activeState.zoom !== newCTM.a
}

ShadowViewport.prototype.isPanDifferent = function(newCTM) {
  return this.activeState.x !== newCTM.e || this.activeState.y !== newCTM.f
}


/**
 * Update cached CTM and active state
 *
 * @param {SVGMatrix} newCTM
 */
ShadowViewport.prototype.updateCache = function(newCTM) {
  this.activeState.zoom = newCTM.a
  this.activeState.x = newCTM.e
  this.activeState.y = newCTM.f
}

ShadowViewport.prototype.pendingUpdate = false

/**
 * Place a request to update CTM on next Frame
 */
ShadowViewport.prototype.updateCTMOnNextFrame = function() {
  if (!this.pendingUpdate) {
    // Lock
    this.pendingUpdate = true

    // Throttle next update
    this.requestAnimationFrame.call(window, this.updateCTMCached)
  }
}

/**
 * Update viewport CTM with cached CTM
 */
ShadowViewport.prototype.updateCTM = function() {
  var ctm = this.getCTM()

  // Updates SVG element
  SvgUtils.setCTM(this.viewport, ctm, this.defs)

  // Free the lock
  this.pendingUpdate = false

  // Notify about the update
  if(this.options.onUpdatedCTM) {
    this.options.onUpdatedCTM(ctm)
  }
}

module.exports = function(viewport, options){
  return new ShadowViewport(viewport, options)
}

},{"./svg-utilities":5,"./utilities":7}],4:[function(require,module,exports){
var Wheel = require('./uniwheel')
, ControlIcons = require('./control-icons')
, Utils = require('./utilities')
, SvgUtils = require('./svg-utilities')
, ShadowViewport = require('./shadow-viewport')

var SvgPanZoom = function(svg, options) {
  this.init(svg, options)
}

var optionsDefaults = {
  viewportSelector: '.svg-pan-zoom_viewport' // Viewport selector. Can be querySelector string or SVGElement
, panEnabled: true // enable or disable panning (default enabled)
, controlIconsEnabled: false // insert icons to give user an option in addition to mouse events to control pan/zoom (default disabled)
, zoomEnabled: true // enable or disable zooming (default enabled)
, dblClickZoomEnabled: true // enable or disable zooming by double clicking (default enabled)
, mouseWheelZoomEnabled: true // enable or disable zooming by mouse wheel (default enabled)
, preventMouseEventsDefault: true // enable or disable preventDefault for mouse events
, zoomScaleSensitivity: 0.1 // Zoom sensitivity
, minZoom: 0.5 // Minimum Zoom level
, maxZoom: 10 // Maximum Zoom level
, fit: true // enable or disable viewport fit in SVG (default true)
, contain: false // enable or disable viewport contain the svg (default false)
, center: true // enable or disable viewport centering in SVG (default true)
, refreshRate: 'auto' // Maximum number of frames per second (altering SVG's viewport)
, beforeZoom: null
, onZoom: null
, beforePan: null
, onPan: null
, customEventsHandler: null
, eventsListenerElement: null
, onUpdatedCTM: null
}

SvgPanZoom.prototype.init = function(svg, options) {
  var that = this

  this.svg = svg
  this.defs = svg.querySelector('defs')

  // Add default attributes to SVG
  SvgUtils.setupSvgAttributes(this.svg)

  // Set options
  this.options = Utils.extend(Utils.extend({}, optionsDefaults), options)

  // Set default state
  this.state = 'none'

  // Get dimensions
  var boundingClientRectNormalized = SvgUtils.getBoundingClientRectNormalized(svg)
  this.width = boundingClientRectNormalized.width
  this.height = boundingClientRectNormalized.height

  // Init shadow viewport
  this.viewport = ShadowViewport(SvgUtils.getOrCreateViewport(this.svg, this.options.viewportSelector), {
    svg: this.svg
  , width: this.width
  , height: this.height
  , fit: this.options.fit
  , contain: this.options.contain
  , center: this.options.center
  , refreshRate: this.options.refreshRate
  // Put callbacks into functions as they can change through time
  , beforeZoom: function(oldScale, newScale) {
      if (that.viewport && that.options.beforeZoom) {return that.options.beforeZoom(oldScale, newScale)}
    }
  , onZoom: function(scale) {
      if (that.viewport && that.options.onZoom) {return that.options.onZoom(scale)}
    }
  , beforePan: function(oldPoint, newPoint) {
      if (that.viewport && that.options.beforePan) {return that.options.beforePan(oldPoint, newPoint)}
    }
  , onPan: function(point) {
      if (that.viewport && that.options.onPan) {return that.options.onPan(point)}
    }
  , onUpdatedCTM: function(ctm) {
      if (that.viewport && that.options.onUpdatedCTM) {return that.options.onUpdatedCTM(ctm)}
    }
  })

  // Wrap callbacks into public API context
  var publicInstance = this.getPublicInstance()
  publicInstance.setBeforeZoom(this.options.beforeZoom)
  publicInstance.setOnZoom(this.options.onZoom)
  publicInstance.setBeforePan(this.options.beforePan)
  publicInstance.setOnPan(this.options.onPan)
  publicInstance.setOnUpdatedCTM(this.options.onUpdatedCTM)

  if (this.options.controlIconsEnabled) {
    ControlIcons.enable(this)
  }

  // Init events handlers
  this.lastMouseWheelEventTime = Date.now()
  this.setupHandlers()
}

/**
 * Register event handlers
 */
SvgPanZoom.prototype.setupHandlers = function() {
  var that = this
    , prevEvt = null // use for touchstart event to detect double tap
    ;

  this.eventListeners = {
    // Mouse down group
    mousedown: function(evt) {
      var result = that.handleMouseDown(evt, prevEvt);
      prevEvt = evt
      return result;
    }
  , touchstart: function(evt) {
      var result = that.handleMouseDown(evt, prevEvt);
      prevEvt = evt
      return result;
    }

    // Mouse up group
  , mouseup: function(evt) {
      return that.handleMouseUp(evt);
    }
  , touchend: function(evt) {
      return that.handleMouseUp(evt);
    }

    // Mouse move group
  , mousemove: function(evt) {
      return that.handleMouseMove(evt);
    }
  , touchmove: function(evt) {
      return that.handleMouseMove(evt);
    }

    // Mouse leave group
  , mouseleave: function(evt) {
      return that.handleMouseUp(evt);
    }
  , touchleave: function(evt) {
      return that.handleMouseUp(evt);
    }
  , touchcancel: function(evt) {
      return that.handleMouseUp(evt);
    }
  }

  // Init custom events handler if available
  if (this.options.customEventsHandler != null) { // jshint ignore:line
    this.options.customEventsHandler.init({
      svgElement: this.svg
    , eventsListenerElement: this.options.eventsListenerElement
    , instance: this.getPublicInstance()
    })

    // Custom event handler may halt builtin listeners
    var haltEventListeners = this.options.customEventsHandler.haltEventListeners
    if (haltEventListeners && haltEventListeners.length) {
      for (var i = haltEventListeners.length - 1; i >= 0; i--) {
        if (this.eventListeners.hasOwnProperty(haltEventListeners[i])) {
          delete this.eventListeners[haltEventListeners[i]]
        }
      }
    }
  }

  // Bind eventListeners
  for (var event in this.eventListeners) {
    // Attach event to eventsListenerElement or SVG if not available
    (this.options.eventsListenerElement || this.svg)
      .addEventListener(event, this.eventListeners[event], false)
  }

  // Zoom using mouse wheel
  if (this.options.mouseWheelZoomEnabled) {
    this.options.mouseWheelZoomEnabled = false // set to false as enable will set it back to true
    this.enableMouseWheelZoom()
  }
}

/**
 * Enable ability to zoom using mouse wheel
 */
SvgPanZoom.prototype.enableMouseWheelZoom = function() {
  if (!this.options.mouseWheelZoomEnabled) {
    var that = this

    // Mouse wheel listener
    this.wheelListener = function(evt) {
      return that.handleMouseWheel(evt);
    }

    // Bind wheelListener
    Wheel.on(this.options.eventsListenerElement || this.svg, this.wheelListener, false)

    this.options.mouseWheelZoomEnabled = true
  }
}

/**
 * Disable ability to zoom using mouse wheel
 */
SvgPanZoom.prototype.disableMouseWheelZoom = function() {
  if (this.options.mouseWheelZoomEnabled) {
    Wheel.off(this.options.eventsListenerElement || this.svg, this.wheelListener, false)
    this.options.mouseWheelZoomEnabled = false
  }
}

/**
 * Handle mouse wheel event
 *
 * @param  {Event} evt
 */
SvgPanZoom.prototype.handleMouseWheel = function(evt) {
  if (!this.options.zoomEnabled || this.state !== 'none') {
    return;
  }

  if (this.options.preventMouseEventsDefault){
    if (evt.preventDefault) {
      evt.preventDefault();
    } else {
      evt.returnValue = false;
    }
  }

  // Default delta in case that deltaY is not available
  var delta = evt.deltaY || 1
    , timeDelta = Date.now() - this.lastMouseWheelEventTime
    , divider = 3 + Math.max(0, 30 - timeDelta)

  // Update cache
  this.lastMouseWheelEventTime = Date.now()

  // Make empirical adjustments for browsers that give deltaY in pixels (deltaMode=0)
  if ('deltaMode' in evt && evt.deltaMode === 0 && evt.wheelDelta) {
    delta = evt.deltaY === 0 ? 0 :  Math.abs(evt.wheelDelta) / evt.deltaY
  }

  delta = -0.3 < delta && delta < 0.3 ? delta : (delta > 0 ? 1 : -1) * Math.log(Math.abs(delta) + 10) / divider

  var inversedScreenCTM = this.svg.getScreenCTM().inverse()
    , relativeMousePoint = SvgUtils.getEventPoint(evt, this.svg).matrixTransform(inversedScreenCTM)
    , zoom = Math.pow(1 + this.options.zoomScaleSensitivity, (-1) * delta); // multiplying by neg. 1 so as to make zoom in/out behavior match Google maps behavior

  this.zoomAtPoint(zoom, relativeMousePoint)
}

/**
 * Zoom in at a SVG point
 *
 * @param  {SVGPoint} point
 * @param  {Float} zoomScale    Number representing how much to zoom
 * @param  {Boolean} zoomAbsolute Default false. If true, zoomScale is treated as an absolute value.
 *                                Otherwise, zoomScale is treated as a multiplied (e.g. 1.10 would zoom in 10%)
 */
SvgPanZoom.prototype.zoomAtPoint = function(zoomScale, point, zoomAbsolute) {
  var originalState = this.viewport.getOriginalState()

  if (!zoomAbsolute) {
    // Fit zoomScale in set bounds
    if (this.getZoom() * zoomScale < this.options.minZoom * originalState.zoom) {
      zoomScale = (this.options.minZoom * originalState.zoom) / this.getZoom()
    } else if (this.getZoom() * zoomScale > this.options.maxZoom * originalState.zoom) {
      zoomScale = (this.options.maxZoom * originalState.zoom) / this.getZoom()
    }
  } else {
    // Fit zoomScale in set bounds
    zoomScale = Math.max(this.options.minZoom * originalState.zoom, Math.min(this.options.maxZoom * originalState.zoom, zoomScale))
    // Find relative scale to achieve desired scale
    zoomScale = zoomScale/this.getZoom()
  }

  var oldCTM = this.viewport.getCTM()
    , relativePoint = point.matrixTransform(oldCTM.inverse())
    , modifier = this.svg.createSVGMatrix().translate(relativePoint.x, relativePoint.y).scale(zoomScale).translate(-relativePoint.x, -relativePoint.y)
    , newCTM = oldCTM.multiply(modifier)

  if (newCTM.a !== oldCTM.a) {
    this.viewport.setCTM(newCTM)
  }
}

/**
 * Zoom at center point
 *
 * @param  {Float} scale
 * @param  {Boolean} absolute Marks zoom scale as relative or absolute
 */
SvgPanZoom.prototype.zoom = function(scale, absolute) {
  this.zoomAtPoint(scale, SvgUtils.getSvgCenterPoint(this.svg, this.width, this.height), absolute)
}

/**
 * Zoom used by public instance
 *
 * @param  {Float} scale
 * @param  {Boolean} absolute Marks zoom scale as relative or absolute
 */
SvgPanZoom.prototype.publicZoom = function(scale, absolute) {
  if (absolute) {
    scale = this.computeFromRelativeZoom(scale)
  }

  this.zoom(scale, absolute)
}

/**
 * Zoom at point used by public instance
 *
 * @param  {Float} scale
 * @param  {SVGPoint|Object} point    An object that has x and y attributes
 * @param  {Boolean} absolute Marks zoom scale as relative or absolute
 */
SvgPanZoom.prototype.publicZoomAtPoint = function(scale, point, absolute) {
  if (absolute) {
    // Transform zoom into a relative value
    scale = this.computeFromRelativeZoom(scale)
  }

  // If not a SVGPoint but has x and y then create a SVGPoint
  if (Utils.getType(point) !== 'SVGPoint') {
    if('x' in point && 'y' in point) {
      point = SvgUtils.createSVGPoint(this.svg, point.x, point.y)
    } else {
      throw new Error('Given point is invalid')
    }
  }

  this.zoomAtPoint(scale, point, absolute)
}

/**
 * Get zoom scale
 *
 * @return {Float} zoom scale
 */
SvgPanZoom.prototype.getZoom = function() {
  return this.viewport.getZoom()
}

/**
 * Get zoom scale for public usage
 *
 * @return {Float} zoom scale
 */
SvgPanZoom.prototype.getRelativeZoom = function() {
  return this.viewport.getRelativeZoom()
}

/**
 * Compute actual zoom from public zoom
 *
 * @param  {Float} zoom
 * @return {Float} zoom scale
 */
SvgPanZoom.prototype.computeFromRelativeZoom = function(zoom) {
  return zoom * this.viewport.getOriginalState().zoom
}

/**
 * Set zoom to initial state
 */
SvgPanZoom.prototype.resetZoom = function() {
  var originalState = this.viewport.getOriginalState()

  this.zoom(originalState.zoom, true);
}

/**
 * Set pan to initial state
 */
SvgPanZoom.prototype.resetPan = function() {
  this.pan(this.viewport.getOriginalState());
}

/**
 * Set pan and zoom to initial state
 */
SvgPanZoom.prototype.reset = function() {
  this.resetZoom()
  this.resetPan()
}

/**
 * Handle double click event
 * See handleMouseDown() for alternate detection method
 *
 * @param {Event} evt
 */
SvgPanZoom.prototype.handleDblClick = function(evt) {
  if (this.options.preventMouseEventsDefault) {
    if (evt.preventDefault) {
      evt.preventDefault()
    } else {
      evt.returnValue = false
    }
  }

  // Check if target was a control button
  if (this.options.controlIconsEnabled) {
    var targetClass = evt.target.getAttribute('class') || ''
    if (targetClass.indexOf('svg-pan-zoom-control') > -1) {
      return false
    }
  }

  var zoomFactor

  if (evt.shiftKey) {
    zoomFactor = 1/((1 + this.options.zoomScaleSensitivity) * 2) // zoom out when shift key pressed
  } else {
    zoomFactor = (1 + this.options.zoomScaleSensitivity) * 2
  }

  var point = SvgUtils.getEventPoint(evt, this.svg).matrixTransform(this.svg.getScreenCTM().inverse())
  this.zoomAtPoint(zoomFactor, point)
}

/**
 * Handle click event
 *
 * @param {Event} evt
 */
SvgPanZoom.prototype.handleMouseDown = function(evt, prevEvt) {
  if (this.options.preventMouseEventsDefault) {
    if (evt.preventDefault) {
      evt.preventDefault()
    } else {
      evt.returnValue = false
    }
  }

  Utils.mouseAndTouchNormalize(evt, this.svg)

  // Double click detection; more consistent than ondblclick
  if (this.options.dblClickZoomEnabled && Utils.isDblClick(evt, prevEvt)){
    this.handleDblClick(evt)
  } else {
    // Pan mode
    this.state = 'pan'
    this.firstEventCTM = this.viewport.getCTM()
    this.stateOrigin = SvgUtils.getEventPoint(evt, this.svg).matrixTransform(this.firstEventCTM.inverse())
  }
}

/**
 * Handle mouse move event
 *
 * @param  {Event} evt
 */
SvgPanZoom.prototype.handleMouseMove = function(evt) {
  if (this.options.preventMouseEventsDefault) {
    if (evt.preventDefault) {
      evt.preventDefault()
    } else {
      evt.returnValue = false
    }
  }

  if (this.state === 'pan' && this.options.panEnabled) {
    // Pan mode
    var point = SvgUtils.getEventPoint(evt, this.svg).matrixTransform(this.firstEventCTM.inverse())
      , viewportCTM = this.firstEventCTM.translate(point.x - this.stateOrigin.x, point.y - this.stateOrigin.y)

    this.viewport.setCTM(viewportCTM)
  }
}

/**
 * Handle mouse button release event
 *
 * @param {Event} evt
 */
SvgPanZoom.prototype.handleMouseUp = function(evt) {
  if (this.options.preventMouseEventsDefault) {
    if (evt.preventDefault) {
      evt.preventDefault()
    } else {
      evt.returnValue = false
    }
  }

  if (this.state === 'pan') {
    // Quit pan mode
    this.state = 'none'
  }
}

/**
 * Adjust viewport size (only) so it will fit in SVG
 * Does not center image
 */
SvgPanZoom.prototype.fit = function() {
  var viewBox = this.viewport.getViewBox()
    , newScale = Math.min(this.width/viewBox.width, this.height/viewBox.height)

  this.zoom(newScale, true)
}

/**
 * Adjust viewport size (only) so it will contain the SVG
 * Does not center image
 */
SvgPanZoom.prototype.contain = function() {
  var viewBox = this.viewport.getViewBox()
    , newScale = Math.max(this.width/viewBox.width, this.height/viewBox.height)

  this.zoom(newScale, true)
}

/**
 * Adjust viewport pan (only) so it will be centered in SVG
 * Does not zoom/fit/contain image
 */
SvgPanZoom.prototype.center = function() {
  var viewBox = this.viewport.getViewBox()
    , offsetX = (this.width - (viewBox.width + viewBox.x * 2) * this.getZoom()) * 0.5
    , offsetY = (this.height - (viewBox.height + viewBox.y * 2) * this.getZoom()) * 0.5

  this.getPublicInstance().pan({x: offsetX, y: offsetY})
}

/**
 * Update content cached BorderBox
 * Use when viewport contents change
 */
SvgPanZoom.prototype.updateBBox = function() {
  this.viewport.simpleViewBoxCache()
}

/**
 * Pan to a rendered position
 *
 * @param  {Object} point {x: 0, y: 0}
 */
SvgPanZoom.prototype.pan = function(point) {
  var viewportCTM = this.viewport.getCTM()
  viewportCTM.e = point.x
  viewportCTM.f = point.y
  this.viewport.setCTM(viewportCTM)
}

/**
 * Relatively pan the graph by a specified rendered position vector
 *
 * @param  {Object} point {x: 0, y: 0}
 */
SvgPanZoom.prototype.panBy = function(point) {
  var viewportCTM = this.viewport.getCTM()
  viewportCTM.e += point.x
  viewportCTM.f += point.y
  this.viewport.setCTM(viewportCTM)
}

/**
 * Get pan vector
 *
 * @return {Object} {x: 0, y: 0}
 */
SvgPanZoom.prototype.getPan = function() {
  var state = this.viewport.getState()

  return {x: state.x, y: state.y}
}

/**
 * Recalculates cached svg dimensions and controls position
 */
SvgPanZoom.prototype.resize = function() {
  // Get dimensions
  var boundingClientRectNormalized = SvgUtils.getBoundingClientRectNormalized(this.svg)
  this.width = boundingClientRectNormalized.width
  this.height = boundingClientRectNormalized.height

  // Recalculate original state
  var viewport = this.viewport
  viewport.options.width = this.width
  viewport.options.height = this.height
  viewport.processCTM()

  // Reposition control icons by re-enabling them
  if (this.options.controlIconsEnabled) {
    this.getPublicInstance().disableControlIcons()
    this.getPublicInstance().enableControlIcons()
  }
}

/**
 * Unbind mouse events, free callbacks and destroy public instance
 */
SvgPanZoom.prototype.destroy = function() {
  var that = this

  // Free callbacks
  this.beforeZoom = null
  this.onZoom = null
  this.beforePan = null
  this.onPan = null
  this.onUpdatedCTM = null

  // Destroy custom event handlers
  if (this.options.customEventsHandler != null) { // jshint ignore:line
    this.options.customEventsHandler.destroy({
      svgElement: this.svg
    , eventsListenerElement: this.options.eventsListenerElement
    , instance: this.getPublicInstance()
    })
  }

  // Unbind eventListeners
  for (var event in this.eventListeners) {
    (this.options.eventsListenerElement || this.svg)
      .removeEventListener(event, this.eventListeners[event], false)
  }

  // Unbind wheelListener
  this.disableMouseWheelZoom()

  // Remove control icons
  this.getPublicInstance().disableControlIcons()

  // Reset zoom and pan
  this.reset()

  // Remove instance from instancesStore
  instancesStore = instancesStore.filter(function(instance){
    return instance.svg !== that.svg
  })

  // Delete options and its contents
  delete this.options

  // Delete viewport to make public shadow viewport functions uncallable
  delete this.viewport

  // Destroy public instance and rewrite getPublicInstance
  delete this.publicInstance
  delete this.pi
  this.getPublicInstance = function(){
    return null
  }
}

/**
 * Returns a public instance object
 *
 * @return {Object} Public instance object
 */
SvgPanZoom.prototype.getPublicInstance = function() {
  var that = this

  // Create cache
  if (!this.publicInstance) {
    this.publicInstance = this.pi = {
      // Pan
      enablePan: function() {that.options.panEnabled = true; return that.pi}
    , disablePan: function() {that.options.panEnabled = false; return that.pi}
    , isPanEnabled: function() {return !!that.options.panEnabled}
    , pan: function(point) {that.pan(point); return that.pi}
    , panBy: function(point) {that.panBy(point); return that.pi}
    , getPan: function() {return that.getPan()}
      // Pan event
    , setBeforePan: function(fn) {that.options.beforePan = fn === null ? null : Utils.proxy(fn, that.publicInstance); return that.pi}
    , setOnPan: function(fn) {that.options.onPan = fn === null ? null : Utils.proxy(fn, that.publicInstance); return that.pi}
      // Zoom and Control Icons
    , enableZoom: function() {that.options.zoomEnabled = true; return that.pi}
    , disableZoom: function() {that.options.zoomEnabled = false; return that.pi}
    , isZoomEnabled: function() {return !!that.options.zoomEnabled}
    , enableControlIcons: function() {
        if (!that.options.controlIconsEnabled) {
          that.options.controlIconsEnabled = true
          ControlIcons.enable(that)
        }
        return that.pi
      }
    , disableControlIcons: function() {
        if (that.options.controlIconsEnabled) {
          that.options.controlIconsEnabled = false;
          ControlIcons.disable(that)
        }
        return that.pi
      }
    , isControlIconsEnabled: function() {return !!that.options.controlIconsEnabled}
      // Double click zoom
    , enableDblClickZoom: function() {that.options.dblClickZoomEnabled = true; return that.pi}
    , disableDblClickZoom: function() {that.options.dblClickZoomEnabled = false; return that.pi}
    , isDblClickZoomEnabled: function() {return !!that.options.dblClickZoomEnabled}
      // Mouse wheel zoom
    , enableMouseWheelZoom: function() {that.enableMouseWheelZoom(); return that.pi}
    , disableMouseWheelZoom: function() {that.disableMouseWheelZoom(); return that.pi}
    , isMouseWheelZoomEnabled: function() {return !!that.options.mouseWheelZoomEnabled}
      // Zoom scale and bounds
    , setZoomScaleSensitivity: function(scale) {that.options.zoomScaleSensitivity = scale; return that.pi}
    , setMinZoom: function(zoom) {that.options.minZoom = zoom; return that.pi}
    , setMaxZoom: function(zoom) {that.options.maxZoom = zoom; return that.pi}
      // Zoom event
    , setBeforeZoom: function(fn) {that.options.beforeZoom = fn === null ? null : Utils.proxy(fn, that.publicInstance); return that.pi}
    , setOnZoom: function(fn) {that.options.onZoom = fn === null ? null : Utils.proxy(fn, that.publicInstance); return that.pi}
      // Zooming
    , zoom: function(scale) {that.publicZoom(scale, true); return that.pi}
    , zoomBy: function(scale) {that.publicZoom(scale, false); return that.pi}
    , zoomAtPoint: function(scale, point) {that.publicZoomAtPoint(scale, point, true); return that.pi}
    , zoomAtPointBy: function(scale, point) {that.publicZoomAtPoint(scale, point, false); return that.pi}
    , zoomIn: function() {this.zoomBy(1 + that.options.zoomScaleSensitivity); return that.pi}
    , zoomOut: function() {this.zoomBy(1 / (1 + that.options.zoomScaleSensitivity)); return that.pi}
    , getZoom: function() {return that.getRelativeZoom()}
      // CTM update
    , setOnUpdatedCTM: function(fn) {that.options.onUpdatedCTM = fn === null ? null : Utils.proxy(fn, that.publicInstance); return that.pi}
      // Reset
    , resetZoom: function() {that.resetZoom(); return that.pi}
    , resetPan: function() {that.resetPan(); return that.pi}
    , reset: function() {that.reset(); return that.pi}
      // Fit, Contain and Center
    , fit: function() {that.fit(); return that.pi}
    , contain: function() {that.contain(); return that.pi}
    , center: function() {that.center(); return that.pi}
      // Size and Resize
    , updateBBox: function() {that.updateBBox(); return that.pi}
    , resize: function() {that.resize(); return that.pi}
    , getSizes: function() {
        return {
          width: that.width
        , height: that.height
        , realZoom: that.getZoom()
        , viewBox: that.viewport.getViewBox()
        }
      }
      // Destroy
    , destroy: function() {that.destroy(); return that.pi}
    }
  }

  return this.publicInstance
}

/**
 * Stores pairs of instances of SvgPanZoom and SVG
 * Each pair is represented by an object {svg: SVGSVGElement, instance: SvgPanZoom}
 *
 * @type {Array}
 */
var instancesStore = []

var svgPanZoom = function(elementOrSelector, options){
  var svg = Utils.getSvg(elementOrSelector)

  if (svg === null) {
    return null
  } else {
    // Look for existent instance
    for(var i = instancesStore.length - 1; i >= 0; i--) {
      if (instancesStore[i].svg === svg) {
        return instancesStore[i].instance.getPublicInstance()
      }
    }

    // If instance not found - create one
    instancesStore.push({
      svg: svg
    , instance: new SvgPanZoom(svg, options)
    })

    // Return just pushed instance
    return instancesStore[instancesStore.length - 1].instance.getPublicInstance()
  }
}

module.exports = svgPanZoom;

},{"./control-icons":2,"./shadow-viewport":3,"./svg-utilities":5,"./uniwheel":6,"./utilities":7}],5:[function(require,module,exports){
var Utils = require('./utilities')
  , _browser = 'unknown'
  ;

// http://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser
if (/*@cc_on!@*/false || !!document.documentMode) { // internet explorer
  _browser = 'ie';
}

module.exports = {
  svgNS:  'http://www.w3.org/2000/svg'
, xmlNS:  'http://www.w3.org/XML/1998/namespace'
, xmlnsNS:  'http://www.w3.org/2000/xmlns/'
, xlinkNS:  'http://www.w3.org/1999/xlink'
, evNS:  'http://www.w3.org/2001/xml-events'

  /**
   * Get svg dimensions: width and height
   *
   * @param  {SVGSVGElement} svg
   * @return {Object}     {width: 0, height: 0}
   */
, getBoundingClientRectNormalized: function(svg) {
    if (svg.clientWidth && svg.clientHeight) {
      return {width: svg.clientWidth, height: svg.clientHeight}
    } else if (!!svg.getBoundingClientRect()) {
      return svg.getBoundingClientRect();
    } else {
      throw new Error('Cannot get BoundingClientRect for SVG.');
    }
  }

  /**
   * Gets g element with class of "viewport" or creates it if it doesn't exist
   *
   * @param  {SVGSVGElement} svg
   * @return {SVGElement}     g (group) element
   */
, getOrCreateViewport: function(svg, selector) {
    var viewport = null

    if (Utils.isElement(selector)) {
      viewport = selector
    } else {
      viewport = svg.querySelector(selector)
    }

    // Check if there is just one main group in SVG
    if (!viewport) {
      var childNodes = Array.prototype.slice.call(svg.childNodes || svg.children).filter(function(el){
        return el.nodeName !== 'defs' && el.nodeName !== '#text'
      })

      // Node name should be SVGGElement and should have no transform attribute
      // Groups with transform are not used as viewport because it involves parsing of all transform possibilities
      if (childNodes.length === 1 && childNodes[0].nodeName === 'g' && childNodes[0].getAttribute('transform') === null) {
        viewport = childNodes[0]
      }
    }

    // If no favorable group element exists then create one
    if (!viewport) {
      var viewportId = 'viewport-' + new Date().toISOString().replace(/\D/g, '');
      viewport = document.createElementNS(this.svgNS, 'g');
      viewport.setAttribute('id', viewportId);

      // Internet Explorer (all versions?) can't use childNodes, but other browsers prefer (require?) using childNodes
      var svgChildren = svg.childNodes || svg.children;
      if (!!svgChildren && svgChildren.length > 0) {
        for (var i = svgChildren.length; i > 0; i--) {
          // Move everything into viewport except defs
          if (svgChildren[svgChildren.length - i].nodeName !== 'defs') {
            viewport.appendChild(svgChildren[svgChildren.length - i]);
          }
        }
      }
      svg.appendChild(viewport);
    }

    // Parse class names
    var classNames = [];
    if (viewport.getAttribute('class')) {
      classNames = viewport.getAttribute('class').split(' ')
    }

    // Set class (if not set already)
    if (!~classNames.indexOf('svg-pan-zoom_viewport')) {
      classNames.push('svg-pan-zoom_viewport')
      viewport.setAttribute('class', classNames.join(' '))
    }

    return viewport
  }

  /**
   * Set SVG attributes
   *
   * @param  {SVGSVGElement} svg
   */
  , setupSvgAttributes: function(svg) {
    // Setting default attributes
    svg.setAttribute('xmlns', this.svgNS);
    svg.setAttributeNS(this.xmlnsNS, 'xmlns:xlink', this.xlinkNS);
    svg.setAttributeNS(this.xmlnsNS, 'xmlns:ev', this.evNS);

    // Needed for Internet Explorer, otherwise the viewport overflows
    if (svg.parentNode !== null) {
      var style = svg.getAttribute('style') || '';
      if (style.toLowerCase().indexOf('overflow') === -1) {
        svg.setAttribute('style', 'overflow: hidden; ' + style);
      }
    }
  }

/**
 * How long Internet Explorer takes to finish updating its display (ms).
 */
, internetExplorerRedisplayInterval: 300

/**
 * Forces the browser to redisplay all SVG elements that rely on an
 * element defined in a 'defs' section. It works globally, for every
 * available defs element on the page.
 * The throttling is intentionally global.
 *
 * This is only needed for IE. It is as a hack to make markers (and 'use' elements?)
 * visible after pan/zoom when there are multiple SVGs on the page.
 * See bug report: https://connect.microsoft.com/IE/feedback/details/781964/
 * also see svg-pan-zoom issue: https://github.com/ariutta/svg-pan-zoom/issues/62
 */
, refreshDefsGlobal: Utils.throttle(function() {
    var allDefs = document.querySelectorAll('defs');
    var allDefsCount = allDefs.length;
    for (var i = 0; i < allDefsCount; i++) {
      var thisDefs = allDefs[i];
      thisDefs.parentNode.insertBefore(thisDefs, thisDefs);
    }
  }, this.internetExplorerRedisplayInterval)

  /**
   * Sets the current transform matrix of an element
   *
   * @param {SVGElement} element
   * @param {SVGMatrix} matrix  CTM
   * @param {SVGElement} defs
   */
, setCTM: function(element, matrix, defs) {
    var that = this
      , s = 'matrix(' + matrix.a + ',' + matrix.b + ',' + matrix.c + ',' + matrix.d + ',' + matrix.e + ',' + matrix.f + ')';

    element.setAttributeNS(null, 'transform', s);
    if ('transform' in element.style) {
      element.style.transform = s;
    } else if ('-ms-transform' in element.style) {
      element.style['-ms-transform'] = s;
    } else if ('-webkit-transform' in element.style) {
      element.style['-webkit-transform'] = s;
    }

    // IE has a bug that makes markers disappear on zoom (when the matrix "a" and/or "d" elements change)
    // see http://stackoverflow.com/questions/17654578/svg-marker-does-not-work-in-ie9-10
    // and http://srndolha.wordpress.com/2013/11/25/svg-line-markers-may-disappear-in-internet-explorer-11/
    if (_browser === 'ie' && !!defs) {
      // this refresh is intended for redisplaying the SVG during zooming
      defs.parentNode.insertBefore(defs, defs);
      // this refresh is intended for redisplaying the other SVGs on a page when panning a given SVG
      // it is also needed for the given SVG itself, on zoomEnd, if the SVG contains any markers that
      // are located under any other element(s).
      window.setTimeout(function() {
        that.refreshDefsGlobal();
      }, that.internetExplorerRedisplayInterval);
    }
  }

  /**
   * Instantiate an SVGPoint object with given event coordinates
   *
   * @param {Event} evt
   * @param  {SVGSVGElement} svg
   * @return {SVGPoint}     point
   */
, getEventPoint: function(evt, svg) {
    var point = svg.createSVGPoint()

    Utils.mouseAndTouchNormalize(evt, svg)

    point.x = evt.clientX
    point.y = evt.clientY

    return point
  }

  /**
   * Get SVG center point
   *
   * @param  {SVGSVGElement} svg
   * @return {SVGPoint}
   */
, getSvgCenterPoint: function(svg, width, height) {
    return this.createSVGPoint(svg, width / 2, height / 2)
  }

  /**
   * Create a SVGPoint with given x and y
   *
   * @param  {SVGSVGElement} svg
   * @param  {Number} x
   * @param  {Number} y
   * @return {SVGPoint}
   */
, createSVGPoint: function(svg, x, y) {
    var point = svg.createSVGPoint()
    point.x = x
    point.y = y

    return point
  }
}

},{"./utilities":7}],6:[function(require,module,exports){
// uniwheel 0.1.2 (customized)
// A unified cross browser mouse wheel event handler
// https://github.com/teemualap/uniwheel

module.exports = (function(){

  //Full details: https://developer.mozilla.org/en-US/docs/Web/Reference/Events/wheel

  var prefix = "", _addEventListener, _removeEventListener, onwheel, support, fns = [];

  // detect event model
  if ( window.addEventListener ) {
    _addEventListener = "addEventListener";
    _removeEventListener = "removeEventListener";
  } else {
    _addEventListener = "attachEvent";
    _removeEventListener = "detachEvent";
    prefix = "on";
  }

  // detect available wheel event
  support = "onwheel" in document.createElement("div") ? "wheel" : // Modern browsers support "wheel"
            document.onmousewheel !== undefined ? "mousewheel" : // Webkit and IE support at least "mousewheel"
            "DOMMouseScroll"; // let's assume that remaining browsers are older Firefox


  function createCallback(element,callback,capture) {

    var fn = function(originalEvent) {

      !originalEvent && ( originalEvent = window.event );

      // create a normalized event object
      var event = {
        // keep a ref to the original event object
        originalEvent: originalEvent,
        target: originalEvent.target || originalEvent.srcElement,
        type: "wheel",
        deltaMode: originalEvent.type == "MozMousePixelScroll" ? 0 : 1,
        deltaX: 0,
        delatZ: 0,
        preventDefault: function() {
          originalEvent.preventDefault ?
            originalEvent.preventDefault() :
            originalEvent.returnValue = false;
        }
      };

      // calculate deltaY (and deltaX) according to the event
      if ( support == "mousewheel" ) {
        event.deltaY = - 1/40 * originalEvent.wheelDelta;
        // Webkit also support wheelDeltaX
        originalEvent.wheelDeltaX && ( event.deltaX = - 1/40 * originalEvent.wheelDeltaX );
      } else {
        event.deltaY = originalEvent.detail;
      }

      // it's time to fire the callback
      return callback( event );

    };

    fns.push({
      element: element,
      fn: fn,
      capture: capture
    });

    return fn;
  }

  function getCallback(element,capture) {
    for (var i = 0; i < fns.length; i++) {
      if (fns[i].element === element && fns[i].capture === capture) {
        return fns[i].fn;
      }
    }
    return function(){};
  }

  function removeCallback(element,capture) {
    for (var i = 0; i < fns.length; i++) {
      if (fns[i].element === element && fns[i].capture === capture) {
        return fns.splice(i,1);
      }
    }
  }

  function _addWheelListener( elem, eventName, callback, useCapture ) {

    var cb;

    if (support === "wheel") {
      cb = callback;
    } else {
      cb = createCallback(elem,callback,useCapture);
    }

    elem[ _addEventListener ]( prefix + eventName, cb, useCapture || false );

  }

  function _removeWheelListener( elem, eventName, callback, useCapture ) {

    var cb;

    if (support === "wheel") {
      cb = callback;
    } else {
      cb = getCallback(elem,useCapture);
    }

    elem[ _removeEventListener ]( prefix + eventName, cb, useCapture || false );

    removeCallback(elem,useCapture);

  }

  function addWheelListener( elem, callback, useCapture ) {
    _addWheelListener( elem, support, callback, useCapture );

    // handle MozMousePixelScroll in older Firefox
    if( support == "DOMMouseScroll" ) {
        _addWheelListener( elem, "MozMousePixelScroll", callback, useCapture);
    }
  }

  function removeWheelListener(elem,callback,useCapture){
    _removeWheelListener(elem,support,callback,useCapture);

    // handle MozMousePixelScroll in older Firefox
    if( support == "DOMMouseScroll" ) {
        _removeWheelListener(elem, "MozMousePixelScroll", callback, useCapture);
    }
  }

  return {
    on: addWheelListener,
    off: removeWheelListener
  };

})();

},{}],7:[function(require,module,exports){
module.exports = {
  /**
   * Extends an object
   *
   * @param  {Object} target object to extend
   * @param  {Object} source object to take properties from
   * @return {Object}        extended object
   */
  extend: function(target, source) {
    target = target || {};
    for (var prop in source) {
      // Go recursively
      if (this.isObject(source[prop])) {
        target[prop] = this.extend(target[prop], source[prop])
      } else {
        target[prop] = source[prop]
      }
    }
    return target;
  }

  /**
   * Checks if an object is a DOM element
   *
   * @param  {Object}  o HTML element or String
   * @return {Boolean}   returns true if object is a DOM element
   */
, isElement: function(o){
    return (
      o instanceof HTMLElement || o instanceof SVGElement || o instanceof SVGSVGElement || //DOM2
      (o && typeof o === 'object' && o !== null && o.nodeType === 1 && typeof o.nodeName === 'string')
    );
  }

  /**
   * Checks if an object is an Object
   *
   * @param  {Object}  o Object
   * @return {Boolean}   returns true if object is an Object
   */
, isObject: function(o){
    return Object.prototype.toString.call(o) === '[object Object]';
  }

  /**
   * Checks if variable is Number
   *
   * @param  {Integer|Float}  n
   * @return {Boolean}   returns true if variable is Number
   */
, isNumber: function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  /**
   * Search for an SVG element
   *
   * @param  {Object|String} elementOrSelector DOM Element or selector String
   * @return {Object|Null}                   SVG or null
   */
, getSvg: function(elementOrSelector) {
    var element
      , svg;

    if (!this.isElement(elementOrSelector)) {
      // If selector provided
      if (typeof elementOrSelector === 'string' || elementOrSelector instanceof String) {
        // Try to find the element
        element = document.querySelector(elementOrSelector)

        if (!element) {
          throw new Error('Provided selector did not find any elements. Selector: ' + elementOrSelector)
          return null
        }
      } else {
        throw new Error('Provided selector is not an HTML object nor String')
        return null
      }
    } else {
      element = elementOrSelector
    }

    if (element.tagName.toLowerCase() === 'svg') {
      svg = element;
    } else {
      if (element.tagName.toLowerCase() === 'object') {
        svg = element.contentDocument.documentElement;
      } else {
        if (element.tagName.toLowerCase() === 'embed') {
          svg = element.getSVGDocument().documentElement;
        } else {
          if (element.tagName.toLowerCase() === 'img') {
            throw new Error('Cannot script an SVG in an "img" element. Please use an "object" element or an in-line SVG.');
          } else {
            throw new Error('Cannot get SVG.');
          }
          return null
        }
      }
    }

    return svg
  }

  /**
   * Attach a given context to a function
   * @param  {Function} fn      Function
   * @param  {Object}   context Context
   * @return {Function}           Function with certain context
   */
, proxy: function(fn, context) {
    return function() {
      return fn.apply(context, arguments)
    }
  }

  /**
   * Returns object type
   * Uses toString that returns [object SVGPoint]
   * And than parses object type from string
   *
   * @param  {Object} o Any object
   * @return {String}   Object type
   */
, getType: function(o) {
    return Object.prototype.toString.apply(o).replace(/^\[object\s/, '').replace(/\]$/, '')
  }

  /**
   * If it is a touch event than add clientX and clientY to event object
   *
   * @param  {Event} evt
   * @param  {SVGSVGElement} svg
   */
, mouseAndTouchNormalize: function(evt, svg) {
    // If no cilentX and but touch objects are available
    if (evt.clientX === void 0 || evt.clientX === null) {
      // Fallback
      evt.clientX = 0
      evt.clientY = 0

      // If it is a touch event
      if (evt.changedTouches !== void 0 && evt.changedTouches.length) {
        // If touch event has changedTouches
        if (evt.changedTouches[0].clientX !== void 0) {
          evt.clientX = evt.changedTouches[0].clientX
          evt.clientY = evt.changedTouches[0].clientY
        }
        // If changedTouches has pageX attribute
        else if (evt.changedTouches[0].pageX !== void 0) {
          var rect = svg.getBoundingClientRect();

          evt.clientX = evt.changedTouches[0].pageX - rect.left
          evt.clientY = evt.changedTouches[0].pageY - rect.top
        }
      // If it is a custom event
      } else if (evt.originalEvent !== void 0) {
        if (evt.originalEvent.clientX !== void 0) {
          evt.clientX = evt.originalEvent.clientX
          evt.clientY = evt.originalEvent.clientY
        }
      }
    }
  }

  /**
   * Check if an event is a double click/tap
   * TODO: For touch gestures use a library (hammer.js) that takes in account other events
   * (touchmove and touchend). It should take in account tap duration and traveled distance
   *
   * @param  {Event}  evt
   * @param  {Event}  prevEvt Previous Event
   * @return {Boolean}
   */
, isDblClick: function(evt, prevEvt) {
    // Double click detected by browser
    if (evt.detail === 2) {
      return true;
    }
    // Try to compare events
    else if (prevEvt !== void 0 && prevEvt !== null) {
      var timeStampDiff = evt.timeStamp - prevEvt.timeStamp // should be lower than 250 ms
        , touchesDistance = Math.sqrt(Math.pow(evt.clientX - prevEvt.clientX, 2) + Math.pow(evt.clientY - prevEvt.clientY, 2))

      return timeStampDiff < 250 && touchesDistance < 10
    }

    // Nothing found
    return false;
  }

  /**
   * Returns current timestamp as an integer
   *
   * @return {Number}
   */
, now: Date.now || function() {
    return new Date().getTime();
  }

  // From underscore.
  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
// jscs:disable
// jshint ignore:start
, throttle: function(func, wait, options) {
    var that = this;
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
      previous = options.leading === false ? 0 : that.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      var now = that.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  }
// jshint ignore:end
// jscs:enable

  /**
   * Create a requestAnimationFrame simulation
   *
   * @param  {Number|String} refreshRate
   * @return {Function}
   */
, createRequestAnimationFrame: function(refreshRate) {
    var timeout = null

    // Convert refreshRate to timeout
    if (refreshRate !== 'auto' && refreshRate < 60 && refreshRate > 1) {
      timeout = Math.floor(1000 / refreshRate)
    }

    if (timeout === null) {
      return window.requestAnimationFrame || requestTimeout(33)
    } else {
      return requestTimeout(timeout)
    }
  }
}

/**
 * Create a callback that will execute after a given timeout
 *
 * @param  {Function} timeout
 * @return {Function}
 */
function requestTimeout(timeout) {
  return function(callback) {
    window.setTimeout(callback, timeout)
  }
}

},{}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nodecanvas_1 = require("./nodecanvas");
var menu_1 = require("./menu");
var CodeNodes = (function () {
    function CodeNodes(types) {
        this.nodesCount = 0;
        var self = this;
        this.canvas = new nodecanvas_1.NodeCanvas();
        this.types = types.sort(function (a, b) {
            return b.name.localeCompare(a.name);
        }).reverse();
        this.menu = new menu_1.CodeNodesMenu(this);
        this.canvas.ondblclick = function (p, rawP) {
            self.menuPoint = p;
            self.menu.open(rawP.x + 20, rawP.y - 70);
        };
        this.canvas.onclick = function () {
            self.menu.close();
        };
    }
    ;
    CodeNodes.prototype.getSVG = function () {
        this.canvas.render();
        return this.canvas.svg;
    };
    ;
    CodeNodes.prototype.init = function () {
        this.canvas.init();
        this.canvas.svg.appendChild(this.menu.g);
    };
    ;
    CodeNodes.prototype.center = function () {
        this.canvas.center();
    };
    ;
    CodeNodes.prototype.clear = function () {
        this.canvas.clear();
    };
    CodeNodes.prototype.findType = function (tID) {
        var i = 0, len = this.types.length;
        for (; i < len; i++) {
            if (this.types[i].id === tID)
                return this.types[i];
        }
        return null;
    };
    CodeNodes.prototype.collectionTypeOf = function (t) {
        return {
            id: t.id,
            name: t.name,
            description: "(Collection) " + t.description,
            builder: this.collectionBuilder,
            clone: this.collectionClone,
            clonable: t.clonable,
            outputType: t.outputType,
            outputMultiple: true,
            schema: [
                {
                    name: " - " + t.name,
                    type: t.id,
                    mode: "in",
                    options: null,
                    multiple: false
                }
            ]
        };
    };
    CodeNodes.prototype.addNode = function (name, type) {
        var t = this.findType(type);
        if (t) {
            var outputType = t.outputType || type;
            var ot = this.findType(outputType);
            t["outputType"] = outputType;
            if (ot) {
                var p = this.menuPoint || { x: 10, y: 10 };
                this.canvas.addNode({
                    id: this.nodesCount++,
                    title: name,
                    type: t,
                    isCollection: false,
                    x: p.x,
                    y: p.y
                });
            }
            else {
                console.log("There is no type " + outputType + " registered. Can not assign output type.");
            }
        }
        else {
            console.log("There is no type " + type + " registered");
        }
    };
    ;
    CodeNodes.prototype.collectionBuilder = function () {
        function flatten(arr) {
            return arr.reduce(function (flat, toFlatten) {
                return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
            }, []);
        }
        return flatten(arguments).filter(function (v) {
            return typeof v !== "undefined";
        });
    };
    ;
    CodeNodes.prototype.collectionClone = function (arr) {
        return arr;
        // return arr.map(function (e) {
        //     return e.clone()
        // }); TODO: Arreglar això
    };
    ;
    CodeNodes.prototype.addCollection = function (name, ofType) {
        var t = this.findType(ofType);
        if (t) {
            var outputType = t.outputType || ofType;
            var ot = this.findType(outputType);
            t["outputType"] = outputType;
            if (ot) {
                var p = this.menuPoint || { x: 10, y: 10 };
                //name, this.collectionBuilder, collectionSchema, ofType, ot.clonable || false, this.collectionClone, true, outputType, p.x, p.y
                this.canvas.addNode({
                    id: this.nodesCount++,
                    title: name,
                    type: this.collectionTypeOf(t),
                    isCollection: true,
                    x: p.x,
                    y: p.y
                });
            }
            else {
                console.log("There is no type " + outputType + " registered. Can not assign output type.");
            }
        }
        else {
            console.log("There is no type " + ofType + " registered");
        }
    };
    ;
    CodeNodes.prototype.serialize = function () {
        return {
            nodes: this.canvas.serialize(),
            transform: this.canvas.getTransform()
        };
    };
    ;
    CodeNodes.prototype.parse = function (model) {
        var self = this;
        this.canvas.setTransform(model.transform);
        self.canvas.parse(model.nodes, this.types);
    };
    CodeNodes.prototype.getOfType = function (type) {
        return this.canvas.getOfType(type);
    };
    return CodeNodes;
}());
exports.CodeNodes = CodeNodes;

},{"./menu":9,"./nodecanvas":11}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var namespace = "http://www.w3.org/2000/svg";
var CodeNodesMenu = (function () {
    function CodeNodesMenu(main) {
        var self = this;
        var addMode = null;
        this.main = main;
        this.g = document.createElementNS(namespace, "g");
        this.g.classList.add("menu-g");
        var selectedValue = null;
        var popup = document.createElement("div");
        popup.classList.add("codenodes-menu-popup");
        this.popup = popup;
        var popupLayer = document.createElement("div");
        popupLayer.classList.add("layer");
        var popupContent = document.createElement("div");
        popupContent.classList.add("content");
        var popupWraper = document.createElement("div");
        popupWraper.classList.add("wraper");
        var popupTitle = document.createElement("div");
        popupTitle.classList.add("title");
        var entitySelector = document.createElement("div");
        entitySelector.classList.add("select");
        var entitySelectorWrap = document.createElement("div");
        entitySelectorWrap.classList.add("entity-selector");
        var entityName = document.createElement("input");
        entityName.type = "text";
        var entityNameWrap = document.createElement("div");
        entityNameWrap.classList.add("entity-name");
        var popupOK = document.createElement("div");
        popupOK.classList.add("ok");
        popup.appendChild(popupLayer);
        popup.appendChild(popupWraper);
        popupWraper.appendChild(popupContent);
        entityNameWrap.appendChild(entityName);
        popupContent.appendChild(entityNameWrap);
        entitySelectorWrap.appendChild(entitySelector);
        popupContent.appendChild(entitySelectorWrap);
        popupContent.appendChild(popupOK);
        document.body.appendChild(popup);
        popupOK.addEventListener("click", function () {
            self.close();
            switch (addMode) {
                case "node":
                    main.addNode(entityName.value, selectedValue);
                    break;
                case "collection":
                    main.addCollection(entityName.value, selectedValue);
                    break;
            }
        });
        function fillEntitySelector() {
            entitySelector.innerHTML = "";
            self.main.types.forEach(function (t) {
                var opt = document.createElement("div");
                opt.classList.add("option");
                var name = document.createElement("div");
                var desc = document.createElement("div");
                name.classList.add("name");
                desc.classList.add("desc");
                name.textContent = t.name;
                desc.textContent = t.description;
                opt.appendChild(name);
                opt.appendChild(desc);
                opt.addEventListener("click", function () {
                    [].forEach.call(entitySelector.querySelectorAll(".option"), function (o) {
                        o.classList.remove("selected");
                    });
                    opt.classList.add("selected");
                    selectedValue = t.id;
                });
                entitySelector.appendChild(opt);
            });
        }
        var _loop_1 = function (i) {
            var rect = document.createElementNS(namespace, "rect"), t = document.createElementNS(namespace, "text");
            rect.classList.add("menu-rect");
            t.classList.add("menu-t");
            rect.setAttribute("x", (5).toString());
            rect.setAttribute("y", (35 * i).toString());
            t.setAttribute("x", (10).toString());
            t.setAttribute("y", ((35 * i) + 19).toString());
            self.g.appendChild(rect);
            self.g.appendChild(t);
            switch (i) {
                case 0:
                    t.textContent = "Add node";
                    rect.addEventListener("click", function (evt) {
                        popupTitle.textContent = t.textContent;
                        entityName.value = "New node";
                        entityName.focus();
                        fillEntitySelector();
                        addMode = "node";
                        popup.classList.add("visible");
                        evt.stopPropagation();
                    });
                    break;
                case 1:
                    t.textContent = "Add collection";
                    rect.addEventListener("click", function (evt) {
                        popupTitle.textContent = t.textContent;
                        entityName.value = "New collection";
                        entityName.focus();
                        fillEntitySelector();
                        addMode = "collection";
                        popup.classList.add("visible");
                        evt.stopPropagation();
                    });
                    break;
                case 2:
                    t.textContent = "Center";
                    rect.addEventListener("click", function (evt) {
                        main.center();
                        self.close();
                        evt.stopPropagation();
                    });
                    break;
                case 3:
                    t.textContent = "Reset";
                    rect.addEventListener("click", function (evt) {
                        main.clear();
                        self.close();
                        evt.stopPropagation();
                    });
                    break;
            }
        };
        for (var i = 0; i < 4; i++) {
            _loop_1(i);
        }
    }
    CodeNodesMenu.prototype.open = function (x, y) {
        this.g.classList.add("visible");
        this.g.setAttribute("transform", "translate(" + x.toString() + "," + y.toString() + ")");
        this.g.classList.add("visible");
    };
    CodeNodesMenu.prototype.close = function () {
        this.popup.classList.remove("visible");
        this.g.classList.remove("visible");
    };
    return CodeNodesMenu;
}());
exports.CodeNodesMenu = CodeNodesMenu;

},{}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nodevalue_1 = require("./nodevalue");
var namespace = "http://www.w3.org/2000/svg";
var ROW_HEIGHT = 38;
var Node = (function () {
    function Node(opts) {
        this.builtWith = [];
        var self = this;
        this.options = opts;
        this.values = [];
        this.position = {
            x: this.options.x,
            y: this.options.y
        };
        this.nRows = this.options.type.schema.length + 2;
        this.onmousedown = null;
        this.outputConnectors = [];
        this.options.type.schema.forEach(function (prop) {
            self.setValueDefaults(prop);
            var p = prop;
            if (self.options.isCollection) {
                p = self.collectionValueOf(p);
            }
            self.values.push(new nodevalue_1.NodeValue(p, self));
        });
    }
    ;
    Node.prototype.setValueDefaults = function (v) {
        v.options = v.options || [];
        v.multiple = v.multiple || false;
        v.mode = v.mode || "edit";
    };
    Node.prototype.collectionValueOf = function (v) {
        return {
            id: v.id,
            name: v.name + " 0",
            type: v.type,
            mode: v.mode,
            options: v.options,
            multiple: v.multiple
        };
    };
    Node.prototype.dropPreBuilt = function () {
        if (this.options.type.ondrop instanceof Function) {
            this.options.type.ondrop(this.built);
            this.built = null;
        }
    };
    Node.prototype.render = function (parent) {
        var self = this;
        if (!this.g) {
            this.g = document.createElementNS(namespace, "g");
            this.g.setAttribute("transform", "translate(" + this.position.x + "," + this.position.y + ")");
            this.g.setAttribute("class", "entity");
            this.outputOffset = {
                x: 130,
                y: (this.nRows * ROW_HEIGHT) - 10
            };
            this.rect = document.createElementNS(namespace, "rect");
            this.rect.setAttribute("width", this.outputOffset.x.toString());
            this.rect.setAttribute("rx", "3");
            this.rect.setAttribute("height", ((this.nRows * ROW_HEIGHT) + 2).toString());
            this.rect.setAttribute("class", "draggable");
            this.rectDownHandler = function (evt) {
                if (this.onmousedown instanceof Function) {
                    this.onmousedown(evt, this);
                }
            }.bind(this);
            this.rect.addEventListener("mousedown", this.rectDownHandler);
            var t = document.createElementNS(namespace, "text");
            t.textContent = this.options.title;
            t.classList.add("title");
            t.setAttribute("x", "5");
            t.setAttribute("y", "15");
            this.g.appendChild(this.rect);
            this.g.appendChild(t);
            var output = document.createElementNS(namespace, "circle");
            this.output = output;
            output.setAttribute("cx", (this.outputOffset.x).toString());
            output.setAttribute("cy", (this.outputOffset.y).toString());
            output.setAttribute("r", "6");
            output.setAttribute("class", "output");
            this.outputDownHandler = function (evt) {
                if (this.outputMousedown instanceof Function) {
                    this.outputMousedown(evt, this);
                }
            }.bind(this);
            output.addEventListener("mousedown", this.outputDownHandler);
            var outputType = document.createElementNS(namespace, "text");
            this.outputText = outputType;
            if (this.options.type.outputMultiple) {
                outputType.textContent = "[" + this.options.type.outputType + "]";
            }
            else {
                outputType.textContent = this.options.type.outputType;
            }
            outputType.classList.add("output-type");
            outputType.setAttribute("x", (this.outputOffset.x - 10).toString());
            outputType.setAttribute("y", (this.outputOffset.y).toString());
            this.g.appendChild(output);
            this.g.appendChild(outputType);
            this.closeBtn = document.createElementNS(namespace, "circle");
            this.closeBtn.classList.add("close-btn");
            this.closeBtn.setAttribute("cx", (this.outputOffset.x - 10).toString());
            this.closeBtn.setAttribute("r", "6");
            this.closeBtn.setAttribute("cy", "15");
            this.close = function () {
                this.remove();
            }.bind(this);
            this.closeBtn.addEventListener("click", this.close);
            this.g.appendChild(this.closeBtn);
            parent.appendChild(this.g);
        }
        var i = 1;
        this.values.forEach(function (val) {
            val.render(self.g, i++);
        });
    };
    ;
    Node.prototype.cloneLastValue = function () {
        var self = this;
        if (this.options.isCollection) {
            var schema = this.options.type.schema, full = self.values.every(function (val) {
                return val.inputConnector !== null;
            });
            if (full) {
                var prop = JSON.parse(JSON.stringify(schema[schema.length - 1])), name_1 = prop.name + " " + schema.length;
                schema.push(prop);
                this.nRows++;
                var newN = new nodevalue_1.NodeValue(prop, self);
                self.values.push(newN);
                newN.render(self.g, schema.length);
                this.outputOffset.y = (this.nRows * ROW_HEIGHT) - 10;
                this.output.setAttribute("cx", (this.outputOffset.x).toString());
                this.output.setAttribute("cy", (this.outputOffset.y).toString());
                this.outputText.setAttribute("y", (this.outputOffset.y).toString());
                this.rect.setAttribute("height", ((this.nRows * ROW_HEIGHT) + 2).toString());
            }
        }
    };
    ;
    Node.prototype.move = function (x, y) {
        var self = this;
        this.position = {
            x: x,
            y: y
        };
        this.outputConnectors.forEach(function (con) {
            con.sp = {
                x: x + self.outputOffset.x,
                y: y + self.outputOffset.y
            };
            con.setPath();
        });
        this.values.forEach(function (val) {
            val.updateConectorPosition();
        });
        this.g.setAttribute("transform", "translate(" + this.position.x + "," + this.position.y + ")");
    };
    ;
    Node.prototype.serialize = function () {
        var self = this, model = {
            arguments: JSON.parse(JSON.stringify(this.options)),
            values: this.values.map(function (v) {
                return {
                    valueID: v.options.id,
                    value: v.__internalGetValue(true)
                };
            }),
            outputConnectors: this.outputConnectors.map(function (c) {
                return {
                    nodeTo: c.end2.parentNode.options.id,
                    valueTo: c.end2.options.id
                };
            })
        };
        model.arguments.type = this.options.type.id;
        model.arguments.x = this.position.x;
        model.arguments.y = this.position.y;
        return model;
    };
    ;
    Node.prototype.findValue = function (id) {
        var i, len = this.values.length;
        for (i = 0; i < len; i += 1) {
            if (this.values[i].options.id === id)
                return this.values[i];
        }
        return null;
    };
    Node.prototype.setValues = function (vs) {
        var self = this;
        if (!this.options.isCollection) {
            vs.forEach(function (v) {
                var value = self.values.filter(function (val) {
                    return val.options.id === v.valueID;
                })[0];
                if (value.__internalSetValue instanceof Function) {
                    value.__internalSetValue(v.value);
                }
            });
        }
    };
    ;
    Node.prototype.checkBuiltWithEquals = function (valuesArr) {
        if (this.builtWith.length === 0)
            return false;
        return this.builtWith.every(function (v, i) {
            return v === valuesArr[i];
        });
    };
    Node.prototype.build = function () {
        var schema = this.options.type.schema, valuesArr = [], self = this;
        valuesArr = this.values.map(function (v) {
            return v.getValue();
        });
        if (!this.checkBuiltWithEquals(valuesArr) && this.built) {
            this.dropPreBuilt();
        }
        if (!this.built || !this.checkBuiltWithEquals(valuesArr)) {
            this.built = this.options.type.builder.apply(this, valuesArr);
            this.builtWith = valuesArr;
            return this.built;
        }
        else {
            if (this.options.type.clonable) {
                return this.options.type.clone(this.built);
            }
            else {
                return this.built;
            }
        }
    };
    ;
    Node.prototype.remove = function () {
        var self = this;
        this.values.forEach(function (val) {
            val.remove();
        });
        this.values = null;
        [].concat(this.outputConnectors).forEach(function (con) {
            con.remove();
        });
        if (this.onremove instanceof Function) {
            this.onremove();
        }
        this.closeBtn.removeEventListener("click", this.close);
        this.rect.removeEventListener("mousedown", this.rectDownHandler);
        this.output.addEventListener("mousedown", this.outputDownHandler);
    };
    ;
    return Node;
}());
exports.Node = Node;

},{"./nodevalue":13}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var svgPanZoom = require("svg-pan-zoom");
var node_1 = require("./node");
var nodeconnector_1 = require("./nodeconnector");
var namespace = "http://www.w3.org/2000/svg";
var NodeCanvas = (function () {
    function NodeCanvas() {
        this.svg = null;
        this.g = null;
        this.paths = null;
        this.nodes = [];
        this.pt = null;
        this.draggingEntity = null;
        this.currentConnector = null;
        this.diff = null;
    }
    NodeCanvas.prototype.center = function () {
        this.zoomingSvg.reset();
    };
    NodeCanvas.prototype.cursorPoint = function (evt) {
        this.pt.x = evt.clientX;
        this.pt.y = evt.clientY;
        return this.pt.matrixTransform(this.svg.getScreenCTM().inverse());
    };
    ;
    NodeCanvas.prototype.render = function () {
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
            this.svg.addEventListener("dblclick", function (evt) {
                if (!(evt.target instanceof SVGSVGElement))
                    return;
                var p = self.cursorPoint(evt);
                self.ctm = self.g.getCTM().inverse();
                self.offset = self.svg.getBoundingClientRect();
                self.ondblclick(self.convertCoords(p), p);
            });
            this.svg.addEventListener("click", function (evt) {
                self.onclick();
            });
        }
        ;
    };
    ;
    NodeCanvas.prototype.getTransform = function () {
        var ctm = this.g.getCTM();
        return {
            pan: { x: ctm.e, y: ctm.f },
            zoom: ctm.a
        };
    };
    ;
    NodeCanvas.prototype.setTransform = function (transform) {
        this.zoomingSvg.zoom(transform.zoom);
        this.zoomingSvg.pan(transform.pan);
    };
    NodeCanvas.prototype.convertCoords = function (o) {
        var x = o.x, y = o.y;
        return {
            x: (this.ctm.a * x) + (this.ctm.c * y) + this.ctm.e,
            y: (this.ctm.b * x) + (this.ctm.d * y) + this.ctm.f //- this.offset.top
        };
    };
    NodeCanvas.prototype.addNode = function (opts) {
        var n = new node_1.Node(opts), self = this;
        function mouseMoveHandler(evt) {
            if (self.draggingEntity) {
                var p = self.cursorPoint(evt);
                p.x = p.x - self.diff.x;
                p.y = p.y - self.diff.y;
                var p1 = self.convertCoords(p);
                self.draggingEntity.move(p1.x, p1.y);
            }
        }
        function mouseUpHandler(evt) {
            self.svg.removeEventListener("mousemove", mouseMoveHandler);
            self.svg.removeEventListener("mouseup", mouseUpHandler);
            mouseMoveHandler(evt);
            self.draggingEntity = null;
        }
        function mouseMoveConnectorHandler(evt) {
            var p = self.convertCoords(self.cursorPoint(evt));
            self.currentConnector.moveEndPoint(p);
        }
        function mouseUpConnectorHandler(evt) {
            var p = self.convertCoords(self.cursorPoint(evt));
            self.svg.removeEventListener("mousemove", mouseMoveConnectorHandler);
            self.svg.removeEventListener("mouseup", mouseUpConnectorHandler);
            var dots = [].slice.call(document.querySelectorAll(".codenodes .dot"));
            var cc = self.currentConnector;
            var candidates = dots.map(function (dot) {
                var pos = dot.parentValue.getDotPosition();
                var dist = Math.sqrt(Math.pow(p.x - pos.x, 2) + Math.pow(p.y - pos.y, 2));
                return {
                    dist: dist,
                    dot: dot
                };
            }).filter(function (dot) {
                return dot.dist <= 30;
            }).sort(function (a, b) {
                return a.dist - b.dist;
            });
            if (candidates.length > 0) {
                var candidateDot = candidates[0].dot;
                if (cc.end1 === candidateDot.parentValue.parentNode) {
                    cc.remove();
                    return;
                }
                if (candidateDot.parentValue.options.type !== "any" && (candidateDot.parentValue.options.type !== cc.end1.options.type.outputType ||
                    (!candidateDot.parentValue.options.multiple && cc.end1.options.type.outputMultiple))) {
                    cc.remove();
                    return;
                }
                if (candidateDot.parentValue.inputConnector) {
                    candidateDot.parentValue.inputConnector.remove();
                }
                candidateDot.parentValue.inputConnector = cc;
                cc.end2 = candidateDot.parentValue;
                if (cc.end2.parentNode.options.isCollection) {
                    cc.end2.parentNode.cloneLastValue();
                }
                candidateDot.parentValue.updateConectorPosition();
            }
            else {
                cc.remove();
            }
            self.currentConnector = null;
        }
        this.nodes.push(n);
        n.outputMousedown = function (evt, entity) {
            var p = self.cursorPoint(evt);
            self.ctm = self.g.getCTM().inverse();
            self.offset = self.svg.getBoundingClientRect();
            var p1 = {
                x: entity.position.x + parseInt(entity.outputOffset.x.toString()),
                y: entity.position.y + parseInt(entity.outputOffset.y.toString())
            };
            self.currentConnector = new nodeconnector_1.NodeConnector(p1, entity);
            entity.outputConnectors.push(self.currentConnector);
            self.paths.appendChild(self.currentConnector.path);
            self.svg.addEventListener("mousemove", mouseMoveConnectorHandler);
            self.svg.addEventListener("mouseup", mouseUpConnectorHandler);
            evt.stopPropagation();
        };
        n.onmousedown = function (evt, entity) {
            var p = self.cursorPoint(evt);
            self.ctm = self.g.getCTM();
            self.offset = self.svg.getBoundingClientRect();
            var entPos = self.convertCoords(entity.position);
            self.diff = {
                x: p.x - entPos.x,
                y: p.y - entPos.y
            };
            self.ctm = self.ctm.inverse();
            evt.stopPropagation();
            self.draggingEntity = entity;
            if (self.draggingEntity) {
                self.svg.addEventListener("mousemove", mouseMoveHandler);
                self.svg.addEventListener("mouseup", mouseUpHandler);
            }
        }.bind(this);
        n.onremove = function () {
            n.outputMousedown = null;
            n.onmousedown = null;
            var ind = self.nodes.indexOf(n);
            if (ind >= 0) {
                self.nodes.splice(ind, 1);
            }
            self.g.removeChild(n.g);
        };
        n.render(self.g);
        return n;
    };
    ;
    NodeCanvas.prototype.init = function () {
        this.svg.setAttribute("viewBox", "0 0 " + this.svg.clientWidth + " " + this.svg.clientHeight);
        this.zoomingSvg = svgPanZoom(this.svg, {
            zoomScaleSensitivity: 0.4,
            dblClickZoomEnabled: false
        });
    };
    ;
    NodeCanvas.prototype.serialize = function () {
        return this.nodes.map(function (n) {
            return n.serialize();
        });
    };
    NodeCanvas.prototype.findNode = function (id) {
        var i, len = this.nodes.length;
        for (i = 0; i < len; i += 1) {
            if (this.nodes[i].options.id === id)
                return this.nodes[i];
        }
        return null;
    };
    NodeCanvas.prototype.findType = function (id, types) {
        var i = 0, len = types.length;
        for (; i < len; i++) {
            if (types[i].id === id)
                return types[i];
        }
        return null;
    };
    NodeCanvas.prototype.parse = function (nodes, types) {
        var _this = this;
        var self = this;
        nodes.forEach(function (nm) {
            var t = _this.findType(nm.arguments.type, types);
            if (t) {
                var args = {
                    id: nm.arguments.id,
                    title: nm.arguments.title,
                    type: t,
                    isCollection: nm.arguments.isCollection,
                    x: nm.arguments.x,
                    y: nm.arguments.y
                };
                var n = self.addNode(args);
                n.setValues(nm.values);
            }
        });
        nodes.forEach(function (nm) {
            var n = self.findNode(nm.arguments.id);
            nm.outputConnectors.forEach(function (cn) {
                var end2 = self.findNode(cn.nodeTo);
                var p1 = {
                    x: n.position.x + parseInt(n.outputOffset.x.toString()),
                    y: n.position.y + parseInt(n.outputOffset.y.toString())
                };
                var conn = new nodeconnector_1.NodeConnector(p1, n);
                n.outputConnectors.push(conn);
                self.paths.appendChild(conn.path);
                if (end2.options.isCollection) {
                    end2.cloneLastValue();
                }
                var val = end2.findValue(cn.valueTo);
                val.inputConnector = conn;
                conn.end2 = val;
                val.updateConectorPosition();
            });
        });
    };
    NodeCanvas.prototype.clear = function () {
        [].concat(this.nodes).forEach(function (node) {
            node.remove();
        });
        this.paths.innerHTML = "";
    };
    ;
    NodeCanvas.prototype.getTerminalNodes = function () {
        return this.nodes.filter(function (n) {
            return n.outputConnectors.length === 0;
        });
    };
    ;
    NodeCanvas.prototype.getOfType = function (type) {
        return this.nodes.filter(function (n) {
            return n.options.type.id === type;
        });
    };
    return NodeCanvas;
}());
exports.NodeCanvas = NodeCanvas;

},{"./node":10,"./nodeconnector":12,"svg-pan-zoom":1}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var namespace = "http://www.w3.org/2000/svg";
var NodeConnector = (function () {
    function NodeConnector(sp, node) {
        this.sp = sp;
        this.ep = sp;
        this.end1 = node;
        this.end2 = null;
        this.path = document.createElementNS(namespace, "path");
        this.setPath();
    }
    ;
    NodeConnector.prototype.setPath = function () {
        var c1 = {
            x: ((this.ep.x - this.sp.x) / 3) + this.sp.x,
            y: this.sp.y
        }, c2 = {
            x: -((this.ep.x - this.sp.x) / 3) + this.ep.x,
            y: this.ep.y
        };
        this.path.setAttribute("d", "M" + this.sp.x + "," + this.sp.y + " C" + c1.x + "," + c1.y + " " + c2.x + "," + c2.y + " " + this.ep.x + "," + this.ep.y);
    };
    ;
    NodeConnector.prototype.remove = function () {
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
            this.path.remove();
            this.path = null;
        }
    };
    ;
    NodeConnector.prototype.moveEndPoint = function (point) {
        this.ep = point;
        this.setPath();
    };
    return NodeConnector;
}());
exports.NodeConnector = NodeConnector;

},{}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var namespace = "http://www.w3.org/2000/svg";
var ROW_HEIGHT = 38;
var NodeValue = (function () {
    function NodeValue(opts, node) {
        this.popup = null;
        this.options = opts;
        this.inputConnector = null;
        this.__internalGetValue = null;
        this.svgEntity = null;
        this.gOffset = null;
        this.parentNode = node;
    }
    NodeValue.prototype.render = function (parent, position) {
        var self = this;
        if (!this.svgEntity) {
            var ent = document.createElementNS(namespace, "g");
            this.gOffset = {
                x: 1,
                y: ((position * ROW_HEIGHT) + 1)
            };
            ent.setAttribute("transform", "translate(" + this.gOffset.x + ", " + this.gOffset.y + ")");
            ent.setAttribute("class", "row");
            if (this.options.mode === "edit") {
                var rect = document.createElementNS(namespace, "rect"), fo = document.createElementNS(namespace, "foreignObject"), name_1 = document.createElementNS(namespace, "text"), div = document.createElementNS("http://www.w3.org/1999/xhtml", "div");
                name_1.textContent = this.options.name;
                name_1.setAttribute("x", "10");
                name_1.setAttribute("y", "6");
                rect.setAttribute("x", "1");
                div.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
                var input_1 = document.createElement("input");
                switch (this.options.type) {
                    case "range":
                        input_1.min = this.options[0];
                        input_1.max = this.options[1];
                    case "text":
                    case "number":
                    case "email":
                    case "date":
                    case "color":
                        this.__internalGetValue = function () {
                            return input_1.value;
                        };
                        this.__internalSetValue = function (v) {
                            input_1.value = v;
                        };
                        input_1.type = this.options.type;
                        div.appendChild(input_1);
                        break;
                    case "checkbox":
                        this.__internalGetValue = function () {
                            return input_1.checked;
                        };
                        this.__internalSetValue = function (v) {
                            input_1.checked = v;
                        };
                        input_1.type = "checkbox";
                        div.appendChild(input_1);
                        break;
                    case "select":
                        var div_select_1 = document.createElement("select");
                        this.options.options.forEach(function (op) {
                            var div_option = document.createElement("option");
                            div_option.textContent = op.show.toString();
                            div_option.setAttribute("value", op.save);
                            div_select_1.appendChild(div_option);
                        });
                        this.__internalGetValue = function () {
                            return div_select_1.value;
                        };
                        this.__internalSetValue = function (v) {
                            input_1.value = v;
                        };
                        div.appendChild(div_select_1);
                        break;
                    case "popup":
                        var btn = document.createElement("button");
                        btn.classList.add("popup-btn");
                        btn.textContent = "*Edit";
                        var popup_1 = document.createElement("div");
                        popup_1.classList.add("codenodes-popup");
                        this.popup = popup_1;
                        var popupLayer = document.createElement("div");
                        popupLayer.classList.add("layer");
                        var popupContent = document.createElement("div");
                        popupContent.classList.add("content");
                        var popupWraper = document.createElement("div");
                        popupWraper.classList.add("wraper");
                        var popupTextArea_1 = document.createElement("div");
                        popupTextArea_1.classList.add("text");
                        popupTextArea_1.setAttribute("contenteditable", "true");
                        var popupOK = document.createElement("div");
                        popupOK.classList.add("ok");
                        btn.addEventListener("click", function () {
                            popup_1.classList.add("visible");
                        });
                        var fnClose = function () {
                            popup_1.classList.remove("visible");
                        };
                        popup_1.appendChild(popupLayer);
                        popup_1.appendChild(popupWraper);
                        popupWraper.appendChild(popupContent);
                        popupContent.appendChild(popupTextArea_1);
                        popupContent.appendChild(popupOK);
                        popupOK.addEventListener("click", fnClose);
                        this.__internalGetValue = function () {
                            return popupTextArea_1.textContent;
                        };
                        this.__internalSetValue = function (v) {
                            popupTextArea_1.textContent = v;
                        };
                        document.body.appendChild(popup_1);
                        div.appendChild(btn);
                        break;
                }
                fo.appendChild(div);
                fo.setAttribute("transform", "translate(0,13)");
                //ent.appendChild(rect);
                ent.appendChild(name_1);
                ent.appendChild(fo);
            }
            if (this.options.mode === "in") {
                var name_2 = document.createElementNS(namespace, "text"), type = document.createElementNS(namespace, "text"), dot = document.createElementNS(namespace, "circle");
                dot.setAttribute("cx", "-1");
                dot.setAttribute("cy", "16");
                dot.setAttribute("r", "4");
                dot.setAttribute("class", "dot");
                dot.addEventListener("click", function (evt) {
                    if (self.inputConnector) {
                        self.inputConnector.remove();
                    }
                    evt.stopPropagation();
                });
                dot["parentValue"] = this;
                name_2.textContent = this.options.name;
                name_2.setAttribute("x", "10");
                name_2.setAttribute("y", "8");
                if (this.options.multiple) {
                    type.textContent = "[" + this.options.type + "]";
                }
                else {
                    type.textContent = this.options.type;
                }
                type.classList.add("value-type");
                type.setAttribute("x", "10");
                type.setAttribute("y", "25");
                this.__internalGetValue = function (serializing) {
                    if (!serializing && self.inputConnector) {
                        var built = self.inputConnector.end1.build();
                        if (self.options.multiple && !self.inputConnector.end1.options.type.outputMultiple) {
                            return [built];
                        }
                        else {
                            return built;
                        }
                    }
                    return undefined;
                };
                ent.appendChild(name_2);
                ent.appendChild(type);
                ent.appendChild(dot);
            }
            this.svgEntity = ent;
            parent.appendChild(ent);
        }
    };
    ;
    NodeValue.prototype.getSerializedValue = function () {
        if (this.options.mode === "edit" && this.__internalGetValue instanceof Function) {
            return this.__internalGetValue();
        }
        return null;
    };
    NodeValue.prototype.getDotPosition = function () {
        return {
            x: this.parentNode.position.x + this.gOffset.x - 1,
            y: this.parentNode.position.y + this.gOffset.y + 16
        };
    };
    ;
    NodeValue.prototype.remove = function () {
        if (this.inputConnector) {
            this.inputConnector.remove();
            this.inputConnector = null;
        }
        this.svgEntity.remove();
        this.svgEntity = null;
        if (this.popup) {
            document.body.removeChild(this.popup);
        }
        this.parentNode = null;
    };
    NodeValue.prototype.updateConectorPosition = function () {
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
    return NodeValue;
}());
exports.NodeValue = NodeValue;

},{}]},{},[8])(8)
});