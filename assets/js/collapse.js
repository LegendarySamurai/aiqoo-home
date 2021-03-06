!function (e, t) { "object" == typeof exports && "undefined" != typeof module ? module.exports = t(require("jquery")) : "function" == typeof define && define.amd ? define(["jquery"], t) : (e = e || self).Util = t(e.jQuery) }(this, function (o) { "use strict"; o = o && o.hasOwnProperty("default") ? o.default : o; var t = "transitionend"; function e(e) { var t = this, n = !1; return o(this).one(s.TRANSITION_END, function () { n = !0 }), setTimeout(function () { n || s.triggerTransitionEnd(t) }, e), this } var s = { TRANSITION_END: "bsTransitionEnd", getUID: function (e) { for (; e += ~~(1e6 * Math.random()), document.getElementById(e);); return e }, getSelectorFromElement: function (e) { var t = e.getAttribute("data-target"); if (!t || "#" === t) { var n = e.getAttribute("href"); t = n && "#" !== n ? n.trim() : "" } try { return document.querySelector(t) ? t : null } catch (e) { return null } }, getTransitionDurationFromElement: function (e) { if (!e) return 0; var t = o(e).css("transition-duration"), n = o(e).css("transition-delay"), r = parseFloat(t), i = parseFloat(n); return r || i ? (t = t.split(",")[0], n = n.split(",")[0], 1e3 * (parseFloat(t) + parseFloat(n))) : 0 }, reflow: function (e) { return e.offsetHeight }, triggerTransitionEnd: function (e) { o(e).trigger(t) }, supportsTransitionEnd: function () { return Boolean(t) }, isElement: function (e) { return (e[0] || e).nodeType }, typeCheckConfig: function (e, t, n) { for (var r in n) if (Object.prototype.hasOwnProperty.call(n, r)) { var i = n[r], o = t[r], a = o && s.isElement(o) ? "element" : (l = o, {}.toString.call(l).match(/\s([a-z]+)/i)[1].toLowerCase()); if (!new RegExp(i).test(a)) throw new Error(e.toUpperCase() + ': Option "' + r + '" provided type "' + a + '" but expected type "' + i + '".') } var l }, findShadowRoot: function (e) { if (!document.documentElement.attachShadow) return null; if ("function" != typeof e.getRootNode) return e instanceof ShadowRoot ? e : e.parentNode ? s.findShadowRoot(e.parentNode) : null; var t = e.getRootNode(); return t instanceof ShadowRoot ? t : null } }; return o.fn.emulateTransitionEnd = e, o.event.special[s.TRANSITION_END] = { bindType: t, delegateType: t, handle: function (e) { if (o(e.target).is(this)) return e.handleObj.handler.apply(this, arguments) } }, s }), function (e, t) { "object" == typeof exports && "undefined" != typeof module ? module.exports = t(require("jquery"), require("./util.js")) : "function" == typeof define && define.amd ? define(["jquery", "./util.js"], t) : (e = e || self).Collapse = t(e.jQuery, e.Util) }(this, function (s, u) { "use strict"; function i(e, t) { for (var n = 0; n < t.length; n++) { var r = t[n]; r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r) } } function o(i) { for (var e = 1; e < arguments.length; e++) { var o = null != arguments[e] ? arguments[e] : {}, t = Object.keys(o); "function" == typeof Object.getOwnPropertySymbols && (t = t.concat(Object.getOwnPropertySymbols(o).filter(function (e) { return Object.getOwnPropertyDescriptor(o, e).enumerable }))), t.forEach(function (e) { var t, n, r; t = i, r = o[n = e], n in t ? Object.defineProperty(t, n, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : t[n] = r }) } return i } s = s && s.hasOwnProperty("default") ? s.default : s, u = u && u.hasOwnProperty("default") ? u.default : u; var a = "collapse", c = "bs.collapse", e = "." + c, t = s.fn[a], f = { toggle: !0, parent: "" }, g = { toggle: "boolean", parent: "(string|element)" }, h = { SHOW: "show" + e, SHOWN: "shown" + e, HIDE: "hide" + e, HIDDEN: "hidden" + e, CLICK_DATA_API: "click" + e + ".data-api" }, d = "show", p = "collapse", m = "collapsing", _ = "collapsed", y = "width", v = "height", C = ".show, .collapsing", T = '[data-toggle="collapse"]', l = function () { function l(t, e) { this._isTransitioning = !1, this._element = t, this._config = this._getConfig(e), this._triggerArray = [].slice.call(document.querySelectorAll('[data-toggle="collapse"][href="#' + t.id + '"],[data-toggle="collapse"][data-target="#' + t.id + '"]')); for (var n = [].slice.call(document.querySelectorAll(T)), r = 0, i = n.length; r < i; r++) { var o = n[r], a = u.getSelectorFromElement(o), l = [].slice.call(document.querySelectorAll(a)).filter(function (e) { return e === t }); null !== a && 0 < l.length && (this._selector = a, this._triggerArray.push(o)) } this._parent = this._config.parent ? this._getParent() : null, this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray), this._config.toggle && this.toggle() } var e, t, n, r = l.prototype; return r.toggle = function () { s(this._element).hasClass(d) ? this.hide() : this.show() }, r.show = function () { var e, t, n = this; if (!this._isTransitioning && !s(this._element).hasClass(d) && (this._parent && 0 === (e = [].slice.call(this._parent.querySelectorAll(C)).filter(function (e) { return "string" == typeof n._config.parent ? e.getAttribute("data-parent") === n._config.parent : e.classList.contains(p) })).length && (e = null), !(e && (t = s(e).not(this._selector).data(c)) && t._isTransitioning))) { var r = s.Event(h.SHOW); if (s(this._element).trigger(r), !r.isDefaultPrevented()) { e && (l._jQueryInterface.call(s(e).not(this._selector), "hide"), t || s(e).data(c, null)); var i = this._getDimension(); s(this._element).removeClass(p).addClass(m), this._element.style[i] = 0, this._triggerArray.length && s(this._triggerArray).removeClass(_).attr("aria-expanded", !0), this.setTransitioning(!0); var o = "scroll" + (i[0].toUpperCase() + i.slice(1)), a = u.getTransitionDurationFromElement(this._element); s(this._element).one(u.TRANSITION_END, function () { s(n._element).removeClass(m).addClass(p).addClass(d), n._element.style[i] = "", n.setTransitioning(!1), s(n._element).trigger(h.SHOWN) }).emulateTransitionEnd(a), this._element.style[i] = this._element[o] + "px" } } }, r.hide = function () { var e = this; if (!this._isTransitioning && s(this._element).hasClass(d)) { var t = s.Event(h.HIDE); if (s(this._element).trigger(t), !t.isDefaultPrevented()) { var n = this._getDimension(); this._element.style[n] = this._element.getBoundingClientRect()[n] + "px", u.reflow(this._element), s(this._element).addClass(m).removeClass(p).removeClass(d); var r = this._triggerArray.length; if (0 < r) for (var i = 0; i < r; i++) { var o = this._triggerArray[i], a = u.getSelectorFromElement(o); if (null !== a) s([].slice.call(document.querySelectorAll(a))).hasClass(d) || s(o).addClass(_).attr("aria-expanded", !1) } this.setTransitioning(!0); this._element.style[n] = ""; var l = u.getTransitionDurationFromElement(this._element); s(this._element).one(u.TRANSITION_END, function () { e.setTransitioning(!1), s(e._element).removeClass(m).addClass(p).trigger(h.HIDDEN) }).emulateTransitionEnd(l) } } }, r.setTransitioning = function (e) { this._isTransitioning = e }, r.dispose = function () { s.removeData(this._element, c), this._config = null, this._parent = null, this._element = null, this._triggerArray = null, this._isTransitioning = null }, r._getConfig = function (e) { return (e = o({}, f, e)).toggle = Boolean(e.toggle), u.typeCheckConfig(a, e, g), e }, r._getDimension = function () { return s(this._element).hasClass(y) ? y : v }, r._getParent = function () { var e, n = this; u.isElement(this._config.parent) ? (e = this._config.parent, void 0 !== this._config.parent.jquery && (e = this._config.parent[0])) : e = document.querySelector(this._config.parent); var t = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]', r = [].slice.call(e.querySelectorAll(t)); return s(r).each(function (e, t) { n._addAriaAndCollapsedClass(l._getTargetFromElement(t), [t]) }), e }, r._addAriaAndCollapsedClass = function (e, t) { var n = s(e).hasClass(d); t.length && s(t).toggleClass(_, !n).attr("aria-expanded", n) }, l._getTargetFromElement = function (e) { var t = u.getSelectorFromElement(e); return t ? document.querySelector(t) : null }, l._jQueryInterface = function (r) { return this.each(function () { var e = s(this), t = e.data(c), n = o({}, f, e.data(), "object" == typeof r && r ? r : {}); if (!t && n.toggle && /show|hide/.test(r) && (n.toggle = !1), t || (t = new l(this, n), e.data(c, t)), "string" == typeof r) { if (void 0 === t[r]) throw new TypeError('No method named "' + r + '"'); t[r]() } }) }, e = l, n = [{ key: "VERSION", get: function () { return "4.3.1" } }, { key: "Default", get: function () { return f } }], (t = null) && i(e.prototype, t), n && i(e, n), l }(); return s(document).on(h.CLICK_DATA_API, T, function (e) { "A" === e.currentTarget.tagName && e.preventDefault(); var n = s(this), t = u.getSelectorFromElement(this), r = [].slice.call(document.querySelectorAll(t)); s(r).each(function () { var e = s(this), t = e.data(c) ? "toggle" : n.data(); l._jQueryInterface.call(e, t) }) }), s.fn[a] = l._jQueryInterface, s.fn[a].Constructor = l, s.fn[a].noConflict = function () { return s.fn[a] = t, l._jQueryInterface }, l });

// Changed Igor 25-08-2020
$(document).ready(() => {
	$.each($('.faq-accordion .card'), function (index, value) {
		// console.log(value);
		const card = $(value);
		const collapse = card.find('.collapse');
		const cardCollapsed = collapse.hasClass('show');
		if (cardCollapsed) {
			card.addClass('expanded');
		}
		else {
			card.removeClass('expanded');
		}
	});

	$('.faq-accordion .card button').click(function () {
		const card = $(this).parents('.card');
		const collapse = card.find('.collapse');
		const allCollapses = $('.collapse');

		if (card.hasClass('expanded') && collapse.hasClass('show')) {
			card.removeClass('expanded');
		}
		else {
			$.each(allCollapses, function (index, value) {
				const card = $(value).parents('.card');
				$(value).removeClass('show');

				card.removeClass('expanded');

				// for inactive items
				// if(!($(value).hasClass('show'))) {
				//
				// }
				// for active items
				// else {
				//
				// }
			});

			card.addClass('expanded');
		}



		// $(value).removeClass('show');


		// if (collapse.hasClass('show')) {
		// 	card.removeClass('expanded');
		// }
		// else {
		// 	card.addClass('expanded');
		// }





		// $.each($('.faq-accordion .card'), function (index, value) {

		// card.removeClass('expanded');
		// $(this).removeClass('show');
		// });
		// console.log('step 1');


		// if(!card.hasClass('expanded')) {
		// 	console.log('111111111');
		// } else {
		// 	console.log('2222222222222');
		// }
	});
});
