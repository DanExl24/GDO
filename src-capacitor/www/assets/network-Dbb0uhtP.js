import { $ as hyphenate, E as onBeforeUnmount, G as ref, H as withDirectives, I as resolveTransitionHooks, J as toRaw, L as setTransitionHooks, Q as extend$1, R as useTransitionState, U as markRaw, W as reactive, X as camelize, Y as unref, Z as capitalize, _ as createVNode, a as BaseTransitionPropsValidators, at as isOn, b as getTransitionRawChildren, c as callWithAsyncErrorHandling, ct as isSymbol, dt as toNumber, et as includeBooleanAttr, i as BaseTransition, it as isObject$2, j as onUpdated, l as computed, m as createRenderer, n as defineStore, nt as isFunction$2, o as Fragment, ot as isSpecialBooleanAttr, rt as isModelListener, st as isString$1, tt as isArray$1, v as defineComponent, x as h, y as getCurrentInstance } from "./pinia-3_kWn-gx.js";
import { t as Capacitor } from "./dist-DAO462gx.js";
import { n as _defineProperty, t as databaseService } from "./database-DoILKR0-.js";
//#region \0rolldown/runtime.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
//#endregion
//#region node_modules/@vue/runtime-dom/dist/runtime-dom.esm-bundler.js
/**
* @vue/runtime-dom v3.5.39
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
var policy = void 0;
var tt = typeof window !== "undefined" && window.trustedTypes;
if (tt) try {
	policy = /* @__PURE__ */ tt.createPolicy("vue", { createHTML: (val) => val });
} catch (e) {}
var unsafeToTrustedHTML = policy ? (val) => policy.createHTML(val) : (val) => val;
var svgNS = "http://www.w3.org/2000/svg";
var mathmlNS = "http://www.w3.org/1998/Math/MathML";
var doc = typeof document !== "undefined" ? document : null;
var templateContainer = doc && /* @__PURE__ */ doc.createElement("template");
var nodeOps = {
	insert: (child, parent, anchor) => {
		parent.insertBefore(child, anchor || null);
	},
	remove: (child) => {
		const parent = child.parentNode;
		if (parent) parent.removeChild(child);
	},
	createElement: (tag, namespace, is, props) => {
		const el = namespace === "svg" ? doc.createElementNS(svgNS, tag) : namespace === "mathml" ? doc.createElementNS(mathmlNS, tag) : is ? doc.createElement(tag, { is }) : doc.createElement(tag);
		if (tag === "select" && props && props.multiple != null) el.setAttribute("multiple", props.multiple);
		return el;
	},
	createText: (text) => doc.createTextNode(text),
	createComment: (text) => doc.createComment(text),
	setText: (node, text) => {
		node.nodeValue = text;
	},
	setElementText: (el, text) => {
		el.textContent = text;
	},
	parentNode: (node) => node.parentNode,
	nextSibling: (node) => node.nextSibling,
	querySelector: (selector) => doc.querySelector(selector),
	setScopeId(el, id) {
		el.setAttribute(id, "");
	},
	insertStaticContent(content, parent, anchor, namespace, start, end) {
		const before = anchor ? anchor.previousSibling : parent.lastChild;
		if (start && (start === end || start.nextSibling)) while (true) {
			parent.insertBefore(start.cloneNode(true), anchor);
			if (start === end || !(start = start.nextSibling)) break;
		}
		else {
			templateContainer.innerHTML = unsafeToTrustedHTML(namespace === "svg" ? `<svg>${content}</svg>` : namespace === "mathml" ? `<math>${content}</math>` : content);
			const template = templateContainer.content;
			if (namespace === "svg" || namespace === "mathml") {
				const wrapper = template.firstChild;
				while (wrapper.firstChild) template.appendChild(wrapper.firstChild);
				template.removeChild(wrapper);
			}
			parent.insertBefore(template, anchor);
		}
		return [before ? before.nextSibling : parent.firstChild, anchor ? anchor.previousSibling : parent.lastChild];
	}
};
var TRANSITION = "transition";
var ANIMATION = "animation";
var vtcKey = /* @__PURE__ */ Symbol("_vtc");
var DOMTransitionPropsValidators = {
	name: String,
	type: String,
	css: {
		type: Boolean,
		default: true
	},
	duration: [
		String,
		Number,
		Object
	],
	enterFromClass: String,
	enterActiveClass: String,
	enterToClass: String,
	appearFromClass: String,
	appearActiveClass: String,
	appearToClass: String,
	leaveFromClass: String,
	leaveActiveClass: String,
	leaveToClass: String
};
var TransitionPropsValidators = /* @__PURE__ */ extend$1({}, BaseTransitionPropsValidators, DOMTransitionPropsValidators);
var decorate$1 = (t) => {
	t.displayName = "Transition";
	t.props = TransitionPropsValidators;
	return t;
};
var Transition = /* @__PURE__ */ decorate$1((props, { slots }) => h(BaseTransition, resolveTransitionProps(props), slots));
var callHook = (hook, args = []) => {
	if (isArray$1(hook)) hook.forEach((h2) => h2(...args));
	else if (hook) hook(...args);
};
var hasExplicitCallback = (hook) => {
	return hook ? isArray$1(hook) ? hook.some((h2) => h2.length > 1) : hook.length > 1 : false;
};
function resolveTransitionProps(rawProps) {
	const baseProps = {};
	for (const key in rawProps) if (!(key in DOMTransitionPropsValidators)) baseProps[key] = rawProps[key];
	if (rawProps.css === false) return baseProps;
	const { name = "v", type, duration, enterFromClass = `${name}-enter-from`, enterActiveClass = `${name}-enter-active`, enterToClass = `${name}-enter-to`, appearFromClass = enterFromClass, appearActiveClass = enterActiveClass, appearToClass = enterToClass, leaveFromClass = `${name}-leave-from`, leaveActiveClass = `${name}-leave-active`, leaveToClass = `${name}-leave-to` } = rawProps;
	const durations = normalizeDuration(duration);
	const enterDuration = durations && durations[0];
	const leaveDuration = durations && durations[1];
	const { onBeforeEnter, onEnter, onEnterCancelled, onLeave, onLeaveCancelled, onBeforeAppear = onBeforeEnter, onAppear = onEnter, onAppearCancelled = onEnterCancelled } = baseProps;
	const finishEnter = (el, isAppear, done, isCancelled) => {
		el._enterCancelled = isCancelled;
		removeTransitionClass(el, isAppear ? appearToClass : enterToClass);
		removeTransitionClass(el, isAppear ? appearActiveClass : enterActiveClass);
		done && done();
	};
	const finishLeave = (el, done) => {
		el._isLeaving = false;
		removeTransitionClass(el, leaveFromClass);
		removeTransitionClass(el, leaveToClass);
		removeTransitionClass(el, leaveActiveClass);
		done && done();
	};
	const makeEnterHook = (isAppear) => {
		return (el, done) => {
			const hook = isAppear ? onAppear : onEnter;
			const resolve = () => finishEnter(el, isAppear, done);
			callHook(hook, [el, resolve]);
			nextFrame(() => {
				removeTransitionClass(el, isAppear ? appearFromClass : enterFromClass);
				addTransitionClass(el, isAppear ? appearToClass : enterToClass);
				if (!hasExplicitCallback(hook)) whenTransitionEnds(el, type, enterDuration, resolve);
			});
		};
	};
	return extend$1(baseProps, {
		onBeforeEnter(el) {
			callHook(onBeforeEnter, [el]);
			addTransitionClass(el, enterFromClass);
			addTransitionClass(el, enterActiveClass);
		},
		onBeforeAppear(el) {
			callHook(onBeforeAppear, [el]);
			addTransitionClass(el, appearFromClass);
			addTransitionClass(el, appearActiveClass);
		},
		onEnter: makeEnterHook(false),
		onAppear: makeEnterHook(true),
		onLeave(el, done) {
			el._isLeaving = true;
			const resolve = () => finishLeave(el, done);
			addTransitionClass(el, leaveFromClass);
			if (!el._enterCancelled) {
				forceReflow(el);
				addTransitionClass(el, leaveActiveClass);
			} else {
				addTransitionClass(el, leaveActiveClass);
				forceReflow(el);
			}
			nextFrame(() => {
				if (!el._isLeaving) return;
				removeTransitionClass(el, leaveFromClass);
				addTransitionClass(el, leaveToClass);
				if (!hasExplicitCallback(onLeave)) whenTransitionEnds(el, type, leaveDuration, resolve);
			});
			callHook(onLeave, [el, resolve]);
		},
		onEnterCancelled(el) {
			finishEnter(el, false, void 0, true);
			callHook(onEnterCancelled, [el]);
		},
		onAppearCancelled(el) {
			finishEnter(el, true, void 0, true);
			callHook(onAppearCancelled, [el]);
		},
		onLeaveCancelled(el) {
			finishLeave(el);
			callHook(onLeaveCancelled, [el]);
		}
	});
}
function normalizeDuration(duration) {
	if (duration == null) return null;
	else if (isObject$2(duration)) return [NumberOf(duration.enter), NumberOf(duration.leave)];
	else {
		const n = NumberOf(duration);
		return [n, n];
	}
}
function NumberOf(val) {
	return toNumber(val);
}
function addTransitionClass(el, cls) {
	cls.split(/\s+/).forEach((c) => c && el.classList.add(c));
	(el[vtcKey] || (el[vtcKey] = /* @__PURE__ */ new Set())).add(cls);
}
function removeTransitionClass(el, cls) {
	cls.split(/\s+/).forEach((c) => c && el.classList.remove(c));
	const _vtc = el[vtcKey];
	if (_vtc) {
		_vtc.delete(cls);
		if (!_vtc.size) el[vtcKey] = void 0;
	}
}
function nextFrame(cb) {
	requestAnimationFrame(() => {
		requestAnimationFrame(cb);
	});
}
var endId = 0;
function whenTransitionEnds(el, expectedType, explicitTimeout, resolve) {
	const id = el._endId = ++endId;
	const resolveIfNotStale = () => {
		if (id === el._endId) resolve();
	};
	if (explicitTimeout != null) return setTimeout(resolveIfNotStale, explicitTimeout);
	const { type, timeout, propCount } = getTransitionInfo(el, expectedType);
	if (!type) return resolve();
	const endEvent = type + "end";
	let ended = 0;
	const end = () => {
		el.removeEventListener(endEvent, onEnd);
		resolveIfNotStale();
	};
	const onEnd = (e) => {
		if (e.target === el && ++ended >= propCount) end();
	};
	setTimeout(() => {
		if (ended < propCount) end();
	}, timeout + 1);
	el.addEventListener(endEvent, onEnd);
}
function getTransitionInfo(el, expectedType) {
	const styles = window.getComputedStyle(el);
	const getStyleProperties = (key) => (styles[key] || "").split(", ");
	const transitionDelays = getStyleProperties(`${TRANSITION}Delay`);
	const transitionDurations = getStyleProperties(`${TRANSITION}Duration`);
	const transitionTimeout = getTimeout(transitionDelays, transitionDurations);
	const animationDelays = getStyleProperties(`${ANIMATION}Delay`);
	const animationDurations = getStyleProperties(`${ANIMATION}Duration`);
	const animationTimeout = getTimeout(animationDelays, animationDurations);
	let type = null;
	let timeout = 0;
	let propCount = 0;
	if (expectedType === TRANSITION) {
		if (transitionTimeout > 0) {
			type = TRANSITION;
			timeout = transitionTimeout;
			propCount = transitionDurations.length;
		}
	} else if (expectedType === ANIMATION) {
		if (animationTimeout > 0) {
			type = ANIMATION;
			timeout = animationTimeout;
			propCount = animationDurations.length;
		}
	} else {
		timeout = Math.max(transitionTimeout, animationTimeout);
		type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
		propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
	}
	const hasTransform = type === TRANSITION && /\b(?:transform|all)(?:,|$)/.test(getStyleProperties(`${TRANSITION}Property`).toString());
	return {
		type,
		timeout,
		propCount,
		hasTransform
	};
}
function getTimeout(delays, durations) {
	while (delays.length < durations.length) delays = delays.concat(delays);
	return Math.max(...durations.map((d, i) => toMs(d) + toMs(delays[i])));
}
function toMs(s) {
	if (s === "auto") return 0;
	return Number(s.slice(0, -1).replace(",", ".")) * 1e3;
}
function forceReflow(el) {
	return (el ? el.ownerDocument : document).body.offsetHeight;
}
function patchClass(el, value, isSVG) {
	const transitionClasses = el[vtcKey];
	if (transitionClasses) value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(" ");
	if (value == null) el.removeAttribute("class");
	else if (isSVG) el.setAttribute("class", value);
	else el.className = value;
}
var vShowOriginalDisplay = /* @__PURE__ */ Symbol("_vod");
var vShowHidden = /* @__PURE__ */ Symbol("_vsh");
var CSS_VAR_TEXT = /* @__PURE__ */ Symbol("");
var displayRE = /(?:^|;)\s*display\s*:/;
function patchStyle(el, prev, next) {
	const style = el.style;
	const isCssString = isString$1(next);
	let hasControlledDisplay = false;
	if (next && !isCssString) {
		if (prev) if (!isString$1(prev)) {
			for (const key in prev) if (next[key] == null) setStyle(style, key, "");
		} else for (const prevStyle of prev.split(";")) {
			const key = prevStyle.slice(0, prevStyle.indexOf(":")).trim();
			if (next[key] == null) setStyle(style, key, "");
		}
		for (const key in next) {
			if (key === "display") hasControlledDisplay = true;
			const value = next[key];
			if (value != null) {
				if (!shouldPreserveTextareaResizeStyle(el, key, !isString$1(prev) && prev ? prev[key] : void 0, value)) setStyle(style, key, value);
			} else setStyle(style, key, "");
		}
	} else if (isCssString) {
		if (prev !== next) {
			const cssVarText = style[CSS_VAR_TEXT];
			if (cssVarText) next += ";" + cssVarText;
			style.cssText = next;
			hasControlledDisplay = displayRE.test(next);
		}
	} else if (prev) el.removeAttribute("style");
	if (vShowOriginalDisplay in el) {
		el[vShowOriginalDisplay] = hasControlledDisplay ? style.display : "";
		if (el[vShowHidden]) style.display = "none";
	}
}
var importantRE = /\s*!important$/;
function setStyle(style, name, val) {
	if (isArray$1(val)) val.forEach((v) => setStyle(style, name, v));
	else {
		if (val == null) val = "";
		if (name.startsWith("--")) style.setProperty(name, val);
		else {
			const prefixed = autoPrefix(style, name);
			if (importantRE.test(val)) style.setProperty(hyphenate(prefixed), val.replace(importantRE, ""), "important");
			else style[prefixed] = val;
		}
	}
}
var prefixes = [
	"Webkit",
	"Moz",
	"ms"
];
var prefixCache = {};
function autoPrefix(style, rawName) {
	const cached = prefixCache[rawName];
	if (cached) return cached;
	let name = camelize(rawName);
	if (name !== "filter" && name in style) return prefixCache[rawName] = name;
	name = capitalize(name);
	for (let i = 0; i < prefixes.length; i++) {
		const prefixed = prefixes[i] + name;
		if (prefixed in style) return prefixCache[rawName] = prefixed;
	}
	return rawName;
}
function shouldPreserveTextareaResizeStyle(el, key, prev, next) {
	return el.tagName === "TEXTAREA" && (key === "width" || key === "height") && isString$1(next) && prev === next;
}
var xlinkNS = "http://www.w3.org/1999/xlink";
function patchAttr(el, key, value, isSVG, instance, isBoolean = isSpecialBooleanAttr(key)) {
	if (isSVG && key.startsWith("xlink:")) if (value == null) el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
	else el.setAttributeNS(xlinkNS, key, value);
	else if (value == null || isBoolean && !includeBooleanAttr(value)) el.removeAttribute(key);
	else el.setAttribute(key, isBoolean ? "" : isSymbol(value) ? String(value) : value);
}
function patchDOMProp(el, key, value, parentComponent, attrName) {
	if (key === "innerHTML" || key === "textContent") {
		if (value != null) el[key] = key === "innerHTML" ? unsafeToTrustedHTML(value) : value;
		return;
	}
	const tag = el.tagName;
	if (key === "value" && tag !== "PROGRESS" && !tag.includes("-")) {
		const oldValue = tag === "OPTION" ? el.getAttribute("value") || "" : el.value;
		const newValue = value == null ? el.type === "checkbox" ? "on" : "" : String(value);
		if (oldValue !== newValue || !("_value" in el)) el.value = newValue;
		if (value == null) el.removeAttribute(key);
		el._value = value;
		return;
	}
	let needRemove = false;
	if (value === "" || value == null) {
		const type = typeof el[key];
		if (type === "boolean") value = includeBooleanAttr(value);
		else if (value == null && type === "string") {
			value = "";
			needRemove = true;
		} else if (type === "number") {
			value = 0;
			needRemove = true;
		}
	}
	try {
		el[key] = value;
	} catch (e) {}
	needRemove && el.removeAttribute(attrName || key);
}
function addEventListener(el, event, handler, options) {
	el.addEventListener(event, handler, options);
}
function removeEventListener(el, event, handler, options) {
	el.removeEventListener(event, handler, options);
}
var veiKey = /* @__PURE__ */ Symbol("_vei");
function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
	const invokers = el[veiKey] || (el[veiKey] = {});
	const existingInvoker = invokers[rawName];
	if (nextValue && existingInvoker) existingInvoker.value = nextValue;
	else {
		const [name, options] = parseName(rawName);
		if (nextValue) addEventListener(el, name, invokers[rawName] = createInvoker(nextValue, instance), options);
		else if (existingInvoker) {
			removeEventListener(el, name, existingInvoker, options);
			invokers[rawName] = void 0;
		}
	}
}
var optionsModifierRE = /(Once|Passive|Capture)$/;
var optionsModifierEventRE = /^on:?(?:Once|Passive|Capture)$/;
function parseName(name) {
	let options;
	let m;
	while ((m = name.match(optionsModifierRE)) && !optionsModifierEventRE.test(name)) {
		if (!options) options = {};
		name = name.slice(0, name.length - m[1].length);
		options[m[1].toLowerCase()] = true;
	}
	return [name[2] === ":" ? name.slice(3) : hyphenate(name.slice(2)), options];
}
var cachedNow = 0;
var p = /* @__PURE__ */ Promise.resolve();
var getNow = () => cachedNow || (p.then(() => cachedNow = 0), cachedNow = Date.now());
function createInvoker(initialValue, instance) {
	const invoker = (e) => {
		if (!e._vts) e._vts = Date.now();
		else if (e._vts <= invoker.attached) return;
		const value = invoker.value;
		if (isArray$1(value)) {
			const originalStop = e.stopImmediatePropagation;
			e.stopImmediatePropagation = () => {
				originalStop.call(e);
				e._stopped = true;
			};
			const handlers = value.slice();
			const args = [e];
			for (let i = 0; i < handlers.length; i++) {
				if (e._stopped) break;
				const handler = handlers[i];
				if (handler) callWithAsyncErrorHandling(handler, instance, 5, args);
			}
		} else callWithAsyncErrorHandling(value, instance, 5, [e]);
	};
	invoker.value = initialValue;
	invoker.attached = getNow();
	return invoker;
}
var isNativeOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && key.charCodeAt(2) > 96 && key.charCodeAt(2) < 123;
var patchProp = (el, key, prevValue, nextValue, namespace, parentComponent) => {
	const isSVG = namespace === "svg";
	if (key === "class") patchClass(el, nextValue, isSVG);
	else if (key === "style") patchStyle(el, prevValue, nextValue);
	else if (isOn(key)) {
		if (!isModelListener(key)) patchEvent(el, key, prevValue, nextValue, parentComponent);
	} else if (key[0] === "." ? (key = key.slice(1), true) : key[0] === "^" ? (key = key.slice(1), false) : shouldSetAsProp(el, key, nextValue, isSVG)) {
		patchDOMProp(el, key, nextValue);
		if (!el.tagName.includes("-") && (key === "value" || key === "checked" || key === "selected")) patchAttr(el, key, nextValue, isSVG, parentComponent, key !== "value");
	} else if (el._isVueCE && (shouldSetAsPropForVueCE(el, key) || el._def.__asyncLoader && (/[A-Z]/.test(key) || !isString$1(nextValue)))) patchDOMProp(el, camelize(key), nextValue, parentComponent, key);
	else {
		if (key === "true-value") el._trueValue = nextValue;
		else if (key === "false-value") el._falseValue = nextValue;
		patchAttr(el, key, nextValue, isSVG);
	}
};
function shouldSetAsProp(el, key, value, isSVG) {
	if (isSVG) {
		if (key === "innerHTML" || key === "textContent") return true;
		if (key in el && isNativeOn(key) && isFunction$2(value)) return true;
		return false;
	}
	if (key === "spellcheck" || key === "draggable" || key === "translate" || key === "autocorrect") return false;
	if (key === "sandbox" && el.tagName === "IFRAME") return false;
	if (key === "form") return false;
	if (key === "list" && el.tagName === "INPUT") return false;
	if (key === "type" && el.tagName === "TEXTAREA") return false;
	if (key === "width" || key === "height") {
		const tag = el.tagName;
		if (tag === "IMG" || tag === "VIDEO" || tag === "CANVAS" || tag === "SOURCE") return false;
	}
	if (isNativeOn(key) && isString$1(value)) return false;
	return key in el;
}
function shouldSetAsPropForVueCE(el, key) {
	const props = el._def.props;
	if (!props) return false;
	const camelKey = camelize(key);
	return Array.isArray(props) ? props.some((prop) => camelize(prop) === camelKey) : Object.keys(props).some((prop) => camelize(prop) === camelKey);
}
var positionMap = /* @__PURE__ */ new WeakMap();
var newPositionMap = /* @__PURE__ */ new WeakMap();
var moveCbKey = /* @__PURE__ */ Symbol("_moveCb");
var enterCbKey = /* @__PURE__ */ Symbol("_enterCb");
var decorate = (t) => {
	delete t.props.mode;
	return t;
};
var TransitionGroup = /* @__PURE__ */ decorate({
	name: "TransitionGroup",
	props: /* @__PURE__ */ extend$1({}, TransitionPropsValidators, {
		tag: String,
		moveClass: String
	}),
	setup(props, { slots }) {
		const instance = getCurrentInstance();
		const state = useTransitionState();
		let prevChildren;
		let children;
		onUpdated(() => {
			if (!prevChildren.length) return;
			const moveClass = props.moveClass || `${props.name || "v"}-move`;
			if (!hasCSSTransform(prevChildren[0].el, instance.vnode.el, moveClass)) {
				prevChildren = [];
				return;
			}
			prevChildren.forEach(callPendingCbs);
			prevChildren.forEach(recordPosition);
			const movedChildren = prevChildren.filter(applyTranslation);
			forceReflow(instance.vnode.el);
			movedChildren.forEach((c) => {
				const el = c.el;
				const style = el.style;
				addTransitionClass(el, moveClass);
				style.transform = style.webkitTransform = style.transitionDuration = "";
				const cb = el[moveCbKey] = (e) => {
					if (e && e.target !== el) return;
					if (!e || e.propertyName.endsWith("transform")) {
						el.removeEventListener("transitionend", cb);
						el[moveCbKey] = null;
						removeTransitionClass(el, moveClass);
					}
				};
				el.addEventListener("transitionend", cb);
			});
			prevChildren = [];
		});
		return () => {
			const rawProps = toRaw(props);
			const cssTransitionProps = resolveTransitionProps(rawProps);
			let tag = rawProps.tag || Fragment;
			prevChildren = [];
			if (children) for (let i = 0; i < children.length; i++) {
				const child = children[i];
				if (child.el && child.el instanceof Element && !child.el[vShowHidden]) {
					prevChildren.push(child);
					setTransitionHooks(child, resolveTransitionHooks(child, cssTransitionProps, state, instance));
					positionMap.set(child, getPosition(child.el));
				}
			}
			children = slots.default ? getTransitionRawChildren(slots.default()) : [];
			for (let i = 0; i < children.length; i++) {
				const child = children[i];
				if (child.key != null) setTransitionHooks(child, resolveTransitionHooks(child, cssTransitionProps, state, instance));
			}
			return createVNode(tag, null, children);
		};
	}
});
function callPendingCbs(c) {
	const el = c.el;
	if (el[moveCbKey]) el[moveCbKey]();
	if (el[enterCbKey]) el[enterCbKey]();
}
function recordPosition(c) {
	newPositionMap.set(c, getPosition(c.el));
}
function applyTranslation(c) {
	const oldPos = positionMap.get(c);
	const newPos = newPositionMap.get(c);
	const dx = oldPos.left - newPos.left;
	const dy = oldPos.top - newPos.top;
	if (dx || dy) {
		const el = c.el;
		const s = el.style;
		const rect = el.getBoundingClientRect();
		let scaleX = 1;
		let scaleY = 1;
		if (el.offsetWidth) scaleX = rect.width / el.offsetWidth;
		if (el.offsetHeight) scaleY = rect.height / el.offsetHeight;
		if (!Number.isFinite(scaleX) || scaleX === 0) scaleX = 1;
		if (!Number.isFinite(scaleY) || scaleY === 0) scaleY = 1;
		if (Math.abs(scaleX - 1) < .01) scaleX = 1;
		if (Math.abs(scaleY - 1) < .01) scaleY = 1;
		s.transform = s.webkitTransform = `translate(${dx / scaleX}px,${dy / scaleY}px)`;
		s.transitionDuration = "0s";
		return c;
	}
}
function getPosition(el) {
	const rect = el.getBoundingClientRect();
	return {
		left: rect.left,
		top: rect.top
	};
}
function hasCSSTransform(el, root, moveClass) {
	const clone = el.cloneNode();
	const _vtc = el[vtcKey];
	if (_vtc) _vtc.forEach((cls) => {
		cls.split(/\s+/).forEach((c) => c && clone.classList.remove(c));
	});
	moveClass.split(/\s+/).forEach((c) => c && clone.classList.add(c));
	clone.style.display = "none";
	const container = root.nodeType === 1 ? root : root.parentNode;
	container.appendChild(clone);
	const { hasTransform } = getTransitionInfo(clone);
	container.removeChild(clone);
	return hasTransform;
}
var systemModifiers = [
	"ctrl",
	"shift",
	"alt",
	"meta"
];
var modifierGuards = {
	stop: (e) => e.stopPropagation(),
	prevent: (e) => e.preventDefault(),
	self: (e) => e.target !== e.currentTarget,
	ctrl: (e) => !e.ctrlKey,
	shift: (e) => !e.shiftKey,
	alt: (e) => !e.altKey,
	meta: (e) => !e.metaKey,
	left: (e) => "button" in e && e.button !== 0,
	middle: (e) => "button" in e && e.button !== 1,
	right: (e) => "button" in e && e.button !== 2,
	exact: (e, modifiers) => systemModifiers.some((m) => e[`${m}Key`] && !modifiers.includes(m))
};
var withModifiers = (fn, modifiers) => {
	if (!fn) return fn;
	const cache = fn._withMods || (fn._withMods = {});
	const cacheKey = modifiers.join(".");
	return cache[cacheKey] || (cache[cacheKey] = ((event, ...args) => {
		for (let i = 0; i < modifiers.length; i++) {
			const guard = modifierGuards[modifiers[i]];
			if (guard && guard(event, modifiers)) return;
		}
		return fn(event, ...args);
	}));
};
var keyNames = {
	esc: "escape",
	space: " ",
	up: "arrow-up",
	left: "arrow-left",
	right: "arrow-right",
	down: "arrow-down",
	delete: "backspace"
};
var withKeys = (fn, modifiers) => {
	const cache = fn._withKeys || (fn._withKeys = {});
	const cacheKey = modifiers.join(".");
	return cache[cacheKey] || (cache[cacheKey] = ((event) => {
		if (!("key" in event)) return;
		const eventKey = hyphenate(event.key);
		if (modifiers.some((k) => k === eventKey || keyNames[k] === eventKey)) return fn(event);
	}));
};
var rendererOptions = /* @__PURE__ */ extend$1({ patchProp }, nodeOps);
var renderer;
function ensureRenderer() {
	return renderer || (renderer = createRenderer(rendererOptions));
}
var createApp = ((...args) => {
	const app = ensureRenderer().createApp(...args);
	const { mount } = app;
	app.mount = (containerOrSelector) => {
		const container = normalizeContainer(containerOrSelector);
		if (!container) return;
		const component = app._component;
		if (!isFunction$2(component) && !component.render && !component.template) component.template = container.innerHTML;
		if (container.nodeType === 1) container.textContent = "";
		const proxy = mount(container, false, resolveRootNamespace(container));
		if (container instanceof Element) {
			container.removeAttribute("v-cloak");
			container.setAttribute("data-v-app", "");
		}
		return proxy;
	};
	return app;
});
function resolveRootNamespace(container) {
	if (container instanceof SVGElement) return "svg";
	if (typeof MathMLElement === "function" && container instanceof MathMLElement) return "mathml";
}
function normalizeContainer(container) {
	if (isString$1(container)) return document.querySelector(container);
	return container;
}
//#endregion
//#region node_modules/quasar/src/utils/private.inject-obj-prop/inject-obj-prop.js
function injectProp(target, propName, get, set) {
	Object.defineProperty(target, propName, {
		get,
		set,
		enumerable: true
	});
	return target;
}
//#endregion
//#region node_modules/quasar/src/plugins/platform/Platform.js
/**
* __ QUASAR_SSR __            -> runs on SSR on client or server
* __ QUASAR_SSR_SERVER __     -> runs on SSR on server
* __ QUASAR_SSR_CLIENT __     -> runs on SSR on client
* __ QUASAR_SSR_PWA __        -> built with SSR+PWA; may run on SSR on client or on PWA client
*                              (needs runtime detection)
*/
var isRuntimeSsrPreHydration = ref(false);
var preHydrationBrowser;
function getMatch(userAgent, platformMatch) {
	const match = /(edg|edge|edga|edgios)\/([\w.]+)/.exec(userAgent) || /(opr)[\/]([\w.]+)/.exec(userAgent) || /(vivaldi)[\/]([\w.]+)/.exec(userAgent) || /(chrome|crios)[\/]([\w.]+)/.exec(userAgent) || /(version)(applewebkit)[\/]([\w.]+).*(safari)[\/]([\w.]+)/.exec(userAgent) || /(webkit)[\/]([\w.]+).*(version)[\/]([\w.]+).*(safari)[\/]([\w.]+)/.exec(userAgent) || /(firefox|fxios)[\/]([\w.]+)/.exec(userAgent) || /(webkit)[\/]([\w.]+)/.exec(userAgent) || /(opera)(?:.*version|)[\/]([\w.]+)/.exec(userAgent) || [];
	return {
		browser: match[5] || match[3] || match[1] || "",
		version: match[4] || match[2] || "0",
		platform: platformMatch[0] || ""
	};
}
function getPlatformMatch(userAgent) {
	return /(ipad)/.exec(userAgent) || /(ipod)/.exec(userAgent) || /(windows phone)/.exec(userAgent) || /(iphone)/.exec(userAgent) || /(kindle)/.exec(userAgent) || /(silk)/.exec(userAgent) || /(android)/.exec(userAgent) || /(win)/.exec(userAgent) || /(mac)/.exec(userAgent) || /(linux)/.exec(userAgent) || /(cros)/.exec(userAgent) || /(playbook)/.exec(userAgent) || /(bb)/.exec(userAgent) || /(blackberry)/.exec(userAgent) || [];
}
var hasTouch = "ontouchstart" in window || window.navigator.maxTouchPoints > 0;
function getPlatform(UA) {
	const userAgent = UA.toLowerCase();
	const matched = getMatch(userAgent, getPlatformMatch(userAgent));
	const browser = {
		mobile: false,
		desktop: false,
		cordova: false,
		capacitor: false,
		nativeMobile: false,
		electron: false,
		bex: false,
		linux: false,
		mac: false,
		win: false,
		cros: false,
		chrome: false,
		firefox: false,
		opera: false,
		safari: false,
		vivaldi: false,
		edge: false,
		edgeChromium: false,
		ie: false,
		webkit: false,
		android: false,
		ios: false,
		ipad: false,
		iphone: false,
		ipod: false,
		kindle: false,
		winphone: false,
		blackberry: false,
		playbook: false,
		silk: false
	};
	if (matched.browser) {
		browser[matched.browser] = true;
		browser.version = matched.version;
		browser.versionNumber = Number.parseInt(matched.version, 10);
	}
	if (matched.platform) browser[matched.platform] = true;
	const knownMobiles = browser.android || browser.ios || browser.bb || browser.blackberry || browser.ipad || browser.iphone || browser.ipod || browser.kindle || browser.playbook || browser.silk || browser["windows phone"];
	if (knownMobiles === true || userAgent.includes("mobile")) browser.mobile = true;
	else browser.desktop = true;
	if (browser["windows phone"]) {
		browser.winphone = true;
		delete browser["windows phone"];
	}
	if (browser.edga || browser.edgios || browser.edg) {
		browser.edge = true;
		matched.browser = "edge";
	} else if (browser.crios) {
		browser.chrome = true;
		matched.browser = "chrome";
	} else if (browser.fxios) {
		browser.firefox = true;
		matched.browser = "firefox";
	}
	if (browser.ipod || browser.ipad || browser.iphone) browser.ios = true;
	if (browser.vivaldi) {
		matched.browser = "vivaldi";
		browser.vivaldi = true;
	}
	if (browser.chrome || browser.opr || browser.safari || browser.vivaldi || browser.mobile && !browser.ios && !knownMobiles) browser.webkit = true;
	if (browser.opr) {
		matched.browser = "opera";
		browser.opera = true;
	}
	if (browser.safari) {
		if (browser.blackberry || browser.bb) {
			matched.browser = "blackberry";
			browser.blackberry = true;
		} else if (browser.playbook) {
			matched.browser = "playbook";
			browser.playbook = true;
		} else if (browser.android) {
			matched.browser = "android";
			browser.android = true;
		} else if (browser.kindle) {
			matched.browser = "kindle";
			browser.kindle = true;
		} else if (browser.silk) {
			matched.browser = "silk";
			browser.silk = true;
		}
	}
	browser.name = matched.browser;
	browser.platform = matched.platform;
	if (userAgent.includes("electron")) browser.electron = true;
	else if (document.location.href.includes("-extension://")) browser.bex = true;
	else {
		if (window.Capacitor !== void 0) {
			browser.capacitor = true;
			browser.nativeMobile = true;
			browser.nativeMobileWrapper = "capacitor";
		} else if (window._cordovaNative !== void 0 || window.cordova !== void 0) {
			browser.cordova = true;
			browser.nativeMobile = true;
			browser.nativeMobileWrapper = "cordova";
		}
		if (isRuntimeSsrPreHydration.value) preHydrationBrowser = { is: { ...browser } };
		if (hasTouch && browser.mac && (browser.desktop && browser.safari || browser.nativeMobile && !browser.android && !browser.ios && !browser.ipad)) {
			delete browser.mac;
			delete browser.desktop;
			const platform = Math.min(window.innerHeight, window.innerWidth) > 414 ? "ipad" : "iphone";
			Object.assign(browser, {
				mobile: true,
				ios: true,
				platform,
				[platform]: true
			});
		}
		if (!browser.mobile && window.navigator.userAgentData && window.navigator.userAgentData.mobile) {
			delete browser.desktop;
			browser.mobile = true;
		}
	}
	return browser;
}
var userAgent = navigator.userAgent || navigator.vendor || window.opera;
var ssrClient = {
	has: {
		touch: false,
		webStorage: false
	},
	within: { iframe: false }
};
var client = {
	userAgent,
	is: getPlatform(userAgent),
	has: { touch: hasTouch },
	within: { iframe: window.self !== window.top }
};
var Platform = { install(opts) {
	const { $q } = opts;
	if (isRuntimeSsrPreHydration.value) {
		opts.onSSRHydrated.push(() => {
			Object.assign($q.platform, client);
			isRuntimeSsrPreHydration.value = false;
		});
		$q.platform = reactive(this);
	} else $q.platform = this;
} };
{
	let hasWebStorage;
	injectProp(client.has, "webStorage", () => {
		if (hasWebStorage !== void 0) return hasWebStorage;
		try {
			if (window.localStorage) {
				hasWebStorage = true;
				return true;
			}
		} catch {}
		hasWebStorage = false;
		return false;
	});
	Object.assign(Platform, client);
	if (isRuntimeSsrPreHydration.value) {
		Object.assign(Platform, preHydrationBrowser, ssrClient);
		preHydrationBrowser = null;
	}
}
//#endregion
//#region node_modules/quasar/src/utils/private.create/create.js
function createComponent(raw) {
	return markRaw(defineComponent(raw));
}
function createDirective(raw) {
	return markRaw(raw);
}
var createReactivePlugin = (state, plugin) => {
	const reactiveState = reactive(state);
	for (const name in state) injectProp(plugin, name, () => reactiveState[name], (val) => {
		reactiveState[name] = val;
	});
	return plugin;
};
//#endregion
//#region node_modules/quasar/src/utils/event/event.js
var listenOpts = {
	hasPassive: false,
	passiveCapture: true,
	notPassiveCapture: true
};
try {
	const opts = Object.defineProperty({}, "passive", { get() {
		Object.assign(listenOpts, {
			hasPassive: true,
			passive: { passive: true },
			notPassive: { passive: false },
			passiveCapture: {
				passive: true,
				capture: true
			},
			notPassiveCapture: {
				passive: false,
				capture: true
			}
		});
	} });
	window.addEventListener("qtest", null, opts);
	window.removeEventListener("qtest", null, opts);
} catch {}
function noop$1() {}
function position(e) {
	if (e.touches && e.touches[0]) e = e.touches[0];
	else if (e.changedTouches && e.changedTouches[0]) e = e.changedTouches[0];
	else if (e.targetTouches && e.targetTouches[0]) e = e.targetTouches[0];
	return {
		top: e.clientY,
		left: e.clientX
	};
}
function getEventPath(e) {
	if (e.path) return e.path;
	if (e.composedPath) return e.composedPath();
	const path = [];
	let el = e.target;
	while (el) {
		path.push(el);
		if (el.tagName === "HTML") {
			path.push(document, window);
			return path;
		}
		el = el.parentElement;
	}
}
function stop(e) {
	e.stopPropagation();
}
function prevent(e) {
	if (e.cancelable !== false) e.preventDefault();
}
function stopAndPrevent(e) {
	if (e.cancelable !== false) e.preventDefault();
	e.stopPropagation();
}
function addEvt(ctx, targetName, events) {
	const name = `__q_${targetName}_evt`;
	ctx[name] = [...ctx[name] ?? [], ...events];
	events.forEach((evt) => {
		evt[0].addEventListener(evt[1], ctx[evt[2]], listenOpts[evt[3]]);
	});
}
function cleanEvt(ctx, targetName) {
	const name = `__q_${targetName}_evt`;
	if (ctx[name] !== void 0) {
		ctx[name].forEach((evt) => {
			evt[0].removeEventListener(evt[1], ctx[evt[2]], listenOpts[evt[3]]);
		});
		ctx[name] = void 0;
	}
}
//#endregion
//#region node_modules/quasar/src/utils/debounce/debounce.js
function debounce(fn, wait = 250, immediate) {
	let timer = null;
	function debounced(...args) {
		const later = () => {
			timer = null;
			if (!immediate) fn.apply(this, args);
		};
		if (timer !== null) clearTimeout(timer);
		else if (immediate) fn.apply(this, args);
		timer = setTimeout(later, wait);
	}
	debounced.cancel = () => {
		if (timer !== null) clearTimeout(timer);
	};
	return debounced;
}
//#endregion
//#region node_modules/quasar/src/plugins/screen/Screen.js
var SIZE_LIST = [
	"sm",
	"md",
	"lg",
	"xl"
];
var { passive } = listenOpts;
var Screen_default = createReactivePlugin({
	width: 0,
	height: 0,
	name: "xs",
	sizes: {
		sm: 600,
		md: 1024,
		lg: 1440,
		xl: 1920
	},
	lt: {
		sm: true,
		md: true,
		lg: true,
		xl: true
	},
	gt: {
		xs: false,
		sm: false,
		md: false,
		lg: false
	},
	xs: true,
	sm: false,
	md: false,
	lg: false,
	xl: false
}, {
	setSizes: noop$1,
	setDebounce: noop$1,
	install({ $q, onSSRHydrated }) {
		$q.screen = this;
		if (this.__installed) {
			if ($q.config.screen !== void 0) if (!$q.config.screen.bodyClasses) document.body.classList.remove(`screen--${this.name}`);
			else this.__update(true);
			return;
		}
		const { visualViewport } = window;
		const target = visualViewport || window;
		const scrollingElement = document.scrollingElement || document.documentElement;
		const getSize = visualViewport === void 0 || client.is.mobile ? () => [Math.max(window.innerWidth, scrollingElement.clientWidth), Math.max(window.innerHeight, scrollingElement.clientHeight)] : () => [visualViewport.width * visualViewport.scale + window.innerWidth - scrollingElement.clientWidth, visualViewport.height * visualViewport.scale + window.innerHeight - scrollingElement.clientHeight];
		const useBodyClasses = $q.config.screen?.bodyClasses === true;
		this.__update = (force) => {
			const [w, h] = getSize();
			if (h !== this.height) this.height = h;
			if (w !== this.width) this.width = w;
			else if (force !== true) return;
			let s = this.sizes;
			this.gt.xs = w >= s.sm;
			this.gt.sm = w >= s.md;
			this.gt.md = w >= s.lg;
			this.gt.lg = w >= s.xl;
			this.lt.sm = w < s.sm;
			this.lt.md = w < s.md;
			this.lt.lg = w < s.lg;
			this.lt.xl = w < s.xl;
			this.xs = this.lt.sm;
			this.sm = this.gt.xs && this.lt.md;
			this.md = this.gt.sm && this.lt.lg;
			this.lg = this.gt.md && this.lt.xl;
			this.xl = this.gt.lg;
			s = this.xs && "xs" || this.sm && "sm" || this.md && "md" || this.lg && "lg" || "xl";
			if (s !== this.name) {
				if (useBodyClasses) {
					document.body.classList.remove(`screen--${this.name}`);
					document.body.classList.add(`screen--${s}`);
				}
				this.name = s;
			}
		};
		let updateEvt, updateSizes = {}, updateDebounce = 16;
		this.setSizes = (sizes) => {
			SIZE_LIST.forEach((name) => {
				if (sizes[name] !== void 0) updateSizes[name] = sizes[name];
			});
		};
		this.setDebounce = (deb) => {
			updateDebounce = deb;
		};
		const start = () => {
			const style = getComputedStyle(document.body);
			if (style.getPropertyValue("--q-size-sm")) SIZE_LIST.forEach((name) => {
				this.sizes[name] = Number.parseInt(style.getPropertyValue(`--q-size-${name}`), 10);
			});
			this.setSizes = (sizes) => {
				SIZE_LIST.forEach((name) => {
					if (sizes[name]) this.sizes[name] = sizes[name];
				});
				this.__update(true);
			};
			this.setDebounce = (delay) => {
				if (updateEvt !== void 0) target.removeEventListener("resize", updateEvt, passive);
				updateEvt = delay > 0 ? debounce(this.__update, delay) : this.__update;
				target.addEventListener("resize", updateEvt, passive);
			};
			this.setDebounce(updateDebounce);
			if (Object.keys(updateSizes).length !== 0) {
				this.setSizes(updateSizes);
				updateSizes = void 0;
			} else this.__update();
			if (useBodyClasses && this.name === "xs") document.body.classList.add("screen--xs");
		};
		if (isRuntimeSsrPreHydration.value) onSSRHydrated.push(start);
		else start();
	}
});
//#endregion
//#region node_modules/quasar/src/plugins/dark/Dark.js
var Plugin$2 = createReactivePlugin({
	isActive: false,
	mode: false
}, {
	__media: void 0,
	set(val) {
		Plugin$2.mode = val;
		if (val === "auto") {
			if (Plugin$2.__media === void 0) {
				Plugin$2.__media = window.matchMedia("(prefers-color-scheme: dark)");
				Plugin$2.__updateMedia = () => {
					Plugin$2.set("auto");
				};
				Plugin$2.__media.addListener(Plugin$2.__updateMedia);
			}
			val = Plugin$2.__media.matches;
		} else if (Plugin$2.__media !== void 0) {
			Plugin$2.__media.removeListener(Plugin$2.__updateMedia);
			Plugin$2.__media = void 0;
		}
		Plugin$2.isActive = val === true;
		document.body.classList.remove(`body--${val === true ? "light" : "dark"}`);
		document.body.classList.add(`body--${val === true ? "dark" : "light"}`);
	},
	toggle() {
		Plugin$2.set(!Plugin$2.isActive);
	},
	install({ $q, ssrContext }) {
		const dark = $q.config.dark;
		$q.dark = this;
		if (!this.__installed) this.set(dark !== void 0 ? dark : false);
	}
});
//#endregion
//#region node_modules/quasar/src/utils/css-var/set-css-var.js
function setCssVar(propName, value, element = document.body) {
	if (typeof propName !== "string") throw new TypeError("Expected a string as propName");
	if (typeof value !== "string") throw new TypeError("Expected a string as value");
	if (!(element instanceof Element)) throw new TypeError("Expected a DOM element");
	element.style.setProperty(`--q-${propName}`, value);
}
//#endregion
//#region node_modules/quasar/src/utils/private.keyboard/key-composition.js
var lastKeyCompositionStatus = false;
function onKeyDownComposition(evt) {
	lastKeyCompositionStatus = evt.isComposing === true;
}
function shouldIgnoreKey(evt) {
	return lastKeyCompositionStatus || evt !== Object(evt) || evt.isComposing || evt.qKeyEvent;
}
function isKeyCode(evt, keyCodes) {
	return !shouldIgnoreKey(evt) && [keyCodes].flat().includes(evt.keyCode);
}
//#endregion
//#region node_modules/quasar/src/plugins/private.body/Body.js
function getMobilePlatform(is) {
	if (is.ios) return "ios";
	if (is.android) return "android";
}
function getBodyClasses({ is, has, within }, cfg) {
	const cls = [is.desktop ? "desktop" : "mobile", `${has.touch ? "" : "no-"}touch`];
	if (is.mobile) {
		const mobile = getMobilePlatform(is);
		if (mobile !== void 0) cls.push("platform-" + mobile);
	}
	if (is.nativeMobile) {
		const type = is.nativeMobileWrapper;
		cls.push(type, "native-mobile");
		if (is.ios && (cfg[type] === void 0 || cfg[type].iosStatusBarPadding)) cls.push("q-ios-padding");
	} else if (is.electron) cls.push("electron");
	else if (is.bex) cls.push("bex");
	if (within.iframe) cls.push("within-iframe");
	return cls;
}
function applyClientSsrCorrections() {
	const { is } = client;
	const classes = document.body.className;
	const classList = new Set(classes.replaceAll(/ {2}/g, " ").split(" "));
	if (!is.nativeMobile && !is.electron && !is.bex) {
		if (is.desktop) {
			classList.delete("mobile");
			classList.delete("platform-ios");
			classList.delete("platform-android");
			classList.add("desktop");
		} else if (is.mobile) {
			classList.delete("desktop");
			classList.add("mobile");
			classList.delete("platform-ios");
			classList.delete("platform-android");
			const mobile = getMobilePlatform(is);
			if (mobile !== void 0) classList.add(`platform-${mobile}`);
		}
	}
	if (client.has.touch) {
		classList.delete("no-touch");
		classList.add("touch");
	}
	if (client.within.iframe) classList.add("within-iframe");
	const newCls = [...classList].join(" ");
	if (classes !== newCls) document.body.className = newCls;
}
function setColors(brand) {
	for (const color in brand) setCssVar(color, brand[color]);
}
var Body_default = { install(opts) {
	if (this.__installed) return;
	if (isRuntimeSsrPreHydration.value) applyClientSsrCorrections();
	else {
		const { $q } = opts;
		if ($q.config.brand !== void 0) setColors($q.config.brand);
		document.body.classList.add(...getBodyClasses(client, $q.config));
	}
	if (client.is.ios) document.body.addEventListener("touchstart", noop$1);
	window.addEventListener("keydown", onKeyDownComposition, true);
} };
//#endregion
//#region node_modules/quasar/src/plugins/private.history/History.js
var getTrue = () => true;
function filterInvalidPath(path) {
	return typeof path === "string" && path !== "" && path !== "/" && path !== "#/";
}
function normalizeExitPath(path) {
	if (path.startsWith("#")) path = path.slice(1);
	if (!path.startsWith("/")) path = "/" + path;
	if (path.endsWith("/")) path = path.slice(0, -1);
	return "#" + path;
}
function getShouldExitFn(cfg) {
	if (cfg.backButtonExit === false) return () => false;
	if (cfg.backButtonExit === "*") return getTrue;
	const exitPaths = ["#/"];
	if (Array.isArray(cfg.backButtonExit)) exitPaths.push(...cfg.backButtonExit.filter(filterInvalidPath).map(normalizeExitPath));
	return () => exitPaths.includes(window.location.hash);
}
var History_default = {
	__history: [],
	add: noop$1,
	remove: noop$1,
	install({ $q }) {
		if (this.__installed) return;
		const { cordova, capacitor } = client.is;
		if (!cordova && !capacitor) return;
		const qConf = $q.config[cordova ? "cordova" : "capacitor"];
		if (qConf?.backButton === false) return;
		if (capacitor && (window.Capacitor === void 0 || window.Capacitor.Plugins.App === void 0)) return;
		this.add = (entry) => {
			if (entry.condition === void 0) entry.condition = getTrue;
			this.__history.push(entry);
		};
		this.remove = (entry) => {
			const index = this.__history.indexOf(entry);
			if (index !== -1) this.__history.splice(index, 1);
		};
		const shouldExit = getShouldExitFn({
			backButtonExit: true,
			...qConf
		});
		const backHandler = () => {
			if (this.__history.length !== 0) {
				const entry = this.__history.at(-1);
				if (entry.condition()) {
					this.__history.pop();
					entry.handler();
				}
			} else if (shouldExit()) navigator.app.exitApp();
			else window.history.back();
		};
		if (cordova) document.addEventListener("deviceready", () => {
			document.addEventListener("backbutton", backHandler, false);
		});
		else window.Capacitor.Plugins.App.addListener("backButton", backHandler);
	}
};
//#endregion
//#region node_modules/quasar/lang/en-US.js
var en_US_default = {
	isoName: "en-US",
	nativeName: "English (US)",
	label: {
		clear: "Clear",
		ok: "OK",
		cancel: "Cancel",
		close: "Close",
		set: "Set",
		select: "Select",
		reset: "Reset",
		remove: "Remove",
		update: "Update",
		create: "Create",
		search: "Search",
		filter: "Filter",
		refresh: "Refresh",
		expand: (label) => label ? `Expand "${label}"` : "Expand",
		collapse: (label) => label ? `Collapse "${label}"` : "Collapse"
	},
	date: {
		days: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
		daysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
		months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
		monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
		firstDayOfWeek: 0,
		format24h: false,
		pluralDay: "days",
		prevMonth: "Previous month",
		nextMonth: "Next month",
		prevYear: "Previous year",
		nextYear: "Next year",
		today: "Today",
		prevRangeYears: (range) => `Previous ${range} years`,
		nextRangeYears: (range) => `Next ${range} years`
	},
	table: {
		noData: "No data available",
		noResults: "No matching records found",
		loading: "Loading...",
		selectedRecords: (rows) => rows === 1 ? "1 record selected." : (rows === 0 ? "No" : rows) + " records selected.",
		recordsPerPage: "Records per page:",
		allRows: "All",
		pagination: (start, end, total) => start + " - " + end + " of " + total,
		columns: "Columns"
	},
	pagination: {
		first: "First page",
		prev: "Previous page",
		next: "Next page",
		last: "Last page"
	},
	editor: {
		url: "URL",
		bold: "Bold",
		italic: "Italic",
		strikethrough: "Strikethrough",
		underline: "Underline",
		unorderedList: "Unordered List",
		orderedList: "Ordered List",
		subscript: "Subscript",
		superscript: "Superscript",
		hyperlink: "Hyperlink",
		toggleFullscreen: "Toggle Fullscreen",
		quote: "Quote",
		left: "Left align",
		center: "Center align",
		right: "Right align",
		justify: "Justify align",
		print: "Print",
		outdent: "Decrease indentation",
		indent: "Increase indentation",
		removeFormat: "Remove formatting",
		formatting: "Formatting",
		fontSize: "Font Size",
		align: "Align",
		hr: "Insert Horizontal Rule",
		undo: "Undo",
		redo: "Redo",
		heading1: "Heading 1",
		heading2: "Heading 2",
		heading3: "Heading 3",
		heading4: "Heading 4",
		heading5: "Heading 5",
		heading6: "Heading 6",
		paragraph: "Paragraph",
		code: "Code",
		size1: "Very small",
		size2: "A bit small",
		size3: "Normal",
		size4: "Medium-large",
		size5: "Big",
		size6: "Very big",
		size7: "Maximum",
		defaultFont: "Default Font",
		viewSource: "View Source"
	},
	tree: {
		noNodes: "No nodes available",
		noResults: "No matching nodes found"
	}
};
//#endregion
//#region node_modules/quasar/src/plugins/lang/Lang.js
function getLocale() {
	const val = Array.isArray(navigator.languages) && navigator.languages.length !== 0 ? navigator.languages[0] : navigator.language;
	if (typeof val === "string") return val.split(/[-_]/).map((v, i) => i === 0 ? v.toLowerCase() : i > 1 || v.length < 4 ? v.toUpperCase() : v[0].toUpperCase() + v.slice(1).toLowerCase()).join("-");
}
var Plugin$1 = createReactivePlugin({ __qLang: {} }, {
	getLocale,
	set(langObject = en_US_default, ssrContext) {
		const lang = {
			...langObject,
			rtl: langObject.rtl === true,
			getLocale
		};
		lang.set = Plugin$1.set;
		if (Plugin$1.__langConfig === void 0 || !Plugin$1.__langConfig.noHtmlAttrs) {
			const el = document.documentElement;
			el.setAttribute("dir", lang.rtl ? "rtl" : "ltr");
			el.setAttribute("lang", lang.isoName);
		}
		Object.assign(Plugin$1.__qLang, lang);
	},
	install({ $q, lang, ssrContext }) {
		$q.lang = Plugin$1.__qLang;
		Plugin$1.__langConfig = $q.config.lang;
		if (this.__installed) {
			if (lang !== void 0) this.set(lang);
		} else {
			this.props = new Proxy(this.__qLang, {
				get: Reflect.get,
				ownKeys(target) {
					return Reflect.ownKeys(target).filter((key) => key !== "set" && key !== "getLocale");
				}
			});
			this.set(lang || en_US_default);
		}
	}
});
//#endregion
//#region node_modules/quasar/icon-set/material-icons.js
var material_icons_default = {
	name: "material-icons",
	type: {
		positive: "check_circle",
		negative: "warning",
		info: "info",
		warning: "priority_high"
	},
	arrow: {
		up: "arrow_upward",
		right: "arrow_forward",
		down: "arrow_downward",
		left: "arrow_back",
		dropdown: "arrow_drop_down"
	},
	chevron: {
		left: "chevron_left",
		right: "chevron_right"
	},
	colorPicker: {
		spectrum: "gradient",
		tune: "tune",
		palette: "style"
	},
	pullToRefresh: { icon: "refresh" },
	carousel: {
		left: "chevron_left",
		right: "chevron_right",
		up: "keyboard_arrow_up",
		down: "keyboard_arrow_down",
		navigationIcon: "lens"
	},
	chip: {
		remove: "cancel",
		selected: "check"
	},
	datetime: {
		arrowLeft: "chevron_left",
		arrowRight: "chevron_right",
		now: "access_time",
		today: "today"
	},
	editor: {
		bold: "format_bold",
		italic: "format_italic",
		strikethrough: "strikethrough_s",
		underline: "format_underlined",
		unorderedList: "format_list_bulleted",
		orderedList: "format_list_numbered",
		subscript: "vertical_align_bottom",
		superscript: "vertical_align_top",
		hyperlink: "link",
		toggleFullscreen: "fullscreen",
		quote: "format_quote",
		left: "format_align_left",
		center: "format_align_center",
		right: "format_align_right",
		justify: "format_align_justify",
		print: "print",
		outdent: "format_indent_decrease",
		indent: "format_indent_increase",
		removeFormat: "format_clear",
		formatting: "text_format",
		fontSize: "format_size",
		align: "format_align_left",
		hr: "remove",
		undo: "undo",
		redo: "redo",
		heading: "format_size",
		code: "code",
		size: "format_size",
		font: "font_download",
		viewSource: "code"
	},
	expansionItem: {
		icon: "keyboard_arrow_down",
		denseIcon: "arrow_drop_down"
	},
	fab: {
		icon: "add",
		activeIcon: "close"
	},
	field: {
		clear: "cancel",
		error: "error"
	},
	pagination: {
		first: "first_page",
		prev: "keyboard_arrow_left",
		next: "keyboard_arrow_right",
		last: "last_page"
	},
	rating: { icon: "grade" },
	stepper: {
		done: "check",
		active: "edit",
		error: "warning"
	},
	tabs: {
		left: "chevron_left",
		right: "chevron_right",
		up: "keyboard_arrow_up",
		down: "keyboard_arrow_down"
	},
	table: {
		arrowUp: "arrow_upward",
		warning: "warning",
		firstPage: "first_page",
		prevPage: "chevron_left",
		nextPage: "chevron_right",
		lastPage: "last_page"
	},
	tree: { icon: "play_arrow" },
	uploader: {
		done: "done",
		clear: "clear",
		add: "add_box",
		upload: "cloud_upload",
		removeQueue: "clear_all",
		removeUploaded: "done_all"
	}
};
//#endregion
//#region node_modules/quasar/src/plugins/icon-set/IconSet.js
var Plugin = createReactivePlugin({
	iconMapFn: null,
	__qIconSet: {}
}, {
	set(setObject, ssrContext) {
		const def = { ...setObject };
		def.set = Plugin.set;
		Object.assign(Plugin.__qIconSet, def);
	},
	install({ $q, iconSet, ssrContext }) {
		if ($q.config.iconMapFn !== void 0) this.iconMapFn = $q.config.iconMapFn;
		$q.iconSet = this.__qIconSet;
		injectProp($q, "iconMapFn", () => this.iconMapFn, (val) => {
			this.iconMapFn = val;
		});
		if (this.__installed) {
			if (iconSet !== void 0) this.set(iconSet);
		} else {
			this.props = new Proxy(this.__qIconSet, {
				get: Reflect.get,
				ownKeys(target) {
					return Reflect.ownKeys(target).filter((key) => key !== "set");
				}
			});
			this.set(iconSet || material_icons_default);
		}
	}
});
//#endregion
//#region node_modules/quasar/src/utils/private.symbols/symbols.js
var layoutKey = "_q_l_";
var pageContainerKey = "_q_pc_";
var formKey = "_q_fo_";
var tabsKey = "_q_tabs_";
function emptyRenderFn() {}
//#endregion
//#region node_modules/quasar/src/utils/is/is.js
function isDeepEqual(a, b) {
	if (a === b) return true;
	if (a !== null && b !== null && typeof a === "object" && typeof b === "object") {
		if (a.constructor !== b.constructor) return false;
		let length, i;
		if (a.constructor === Array) {
			length = a.length;
			if (length !== b.length) return false;
			for (i = length; i-- !== 0;) if (!isDeepEqual(a[i], b[i])) return false;
			return true;
		}
		if (a.constructor === Map) {
			if (a.size !== b.size) return false;
			let iter = a.entries();
			i = iter.next();
			while (!i.done) {
				if (!b.has(i.value[0])) return false;
				i = iter.next();
			}
			iter = a.entries();
			i = iter.next();
			while (!i.done) {
				if (!isDeepEqual(i.value[1], b.get(i.value[0]))) return false;
				i = iter.next();
			}
			return true;
		}
		if (a.constructor === Set) {
			if (a.size !== b.size) return false;
			const iter = a.entries();
			i = iter.next();
			while (!i.done) {
				if (!b.has(i.value[0])) return false;
				i = iter.next();
			}
			return true;
		}
		if (a.buffer != null && a.buffer.constructor === ArrayBuffer) {
			length = a.length;
			if (length !== b.length) return false;
			for (i = length; i-- !== 0;) if (a[i] !== b[i]) return false;
			return true;
		}
		if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
		if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
		if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();
		const keys = Object.keys(a).filter((key) => a[key] !== void 0);
		length = keys.length;
		if (length !== Object.keys(b).filter((key) => b[key] !== void 0).length) return false;
		for (i = length; i-- !== 0;) {
			const key = keys[i];
			if (!isDeepEqual(a[key], b[key])) return false;
		}
		return true;
	}
	return a !== a && b !== b;
}
function isObject$1(v) {
	return v !== null && typeof v === "object" && !Array.isArray(v);
}
function isDate$1(v) {
	return Object.prototype.toString.call(v) === "[object Date]";
}
function isRegexp(v) {
	return Object.prototype.toString.call(v) === "[object RegExp]";
}
//#endregion
//#region node_modules/quasar/src/utils/private.config/instance-config.js
var globalConfig = {};
var globalConfigIsFrozen = false;
function freezeGlobalConfig() {
	globalConfigIsFrozen = true;
}
//#endregion
//#region node_modules/quasar/src/install-quasar.js
/**
* If the list below changes, make sure
* to also edit /ui/testing/specs/generators/generator.plugin.js
* on the "autoInstalledPlugins" array
*/
var autoInstalledPlugins = [
	Platform,
	Body_default,
	Plugin$2,
	Screen_default,
	History_default,
	Plugin$1,
	Plugin
];
function createChildApp(appCfg, parentApp) {
	const app = createApp(appCfg);
	app.config.globalProperties = parentApp.config.globalProperties;
	const { reload, ...appContext } = parentApp._context;
	Object.assign(app._context, appContext);
	return app;
}
function installPlugins(pluginOpts, pluginList) {
	pluginList.forEach((Plugin) => {
		Plugin.install(pluginOpts);
		Plugin.__installed = true;
	});
}
function prepareApp(app, uiOpts, pluginOpts) {
	app.config.globalProperties.$q = pluginOpts.$q;
	app.provide("_q_", pluginOpts.$q);
	installPlugins(pluginOpts, autoInstalledPlugins);
	if (uiOpts.components !== void 0) Object.values(uiOpts.components).forEach((c) => {
		if (isObject$1(c) && c.name !== void 0) app.component(c.name, c);
	});
	if (uiOpts.directives !== void 0) Object.values(uiOpts.directives).forEach((d) => {
		if (isObject$1(d) && d.name !== void 0) app.directive(d.name, d);
	});
	if (uiOpts.plugins !== void 0) installPlugins(pluginOpts, Object.values(uiOpts.plugins).filter((p) => typeof p.install === "function" && !autoInstalledPlugins.includes(p)));
	if (isRuntimeSsrPreHydration.value) pluginOpts.$q.onSSRHydrated = () => {
		pluginOpts.onSSRHydrated.forEach((fn) => {
			fn();
		});
		pluginOpts.$q.onSSRHydrated = () => {};
	};
}
var install_quasar_default = function installQuasar(parentApp, opts = {}) {
	const $q = { version: "2.20.2" };
	if (!globalConfigIsFrozen) {
		if (opts.config !== void 0) Object.assign(globalConfig, opts.config);
		$q.config = { ...globalConfig };
		freezeGlobalConfig();
	} else $q.config = opts.config || {};
	prepareApp(parentApp, opts, {
		parentApp,
		$q,
		lang: opts.lang,
		iconSet: opts.iconSet,
		onSSRHydrated: []
	});
};
//#endregion
//#region node_modules/quasar/src/composables/private.use-size/use-size.js
var useSizeDefaults = {
	xs: 18,
	sm: 24,
	md: 32,
	lg: 38,
	xl: 46
};
var useSizeProps = { size: String };
function useSize(props, sizes = useSizeDefaults) {
	return computed(() => props.size !== void 0 ? { fontSize: props.size in sizes ? `${sizes[props.size]}px` : props.size } : null);
}
//#endregion
//#region node_modules/quasar/src/utils/private.render/render.js
function hSlot(slot, otherwise) {
	return slot !== void 0 ? slot() || otherwise : otherwise;
}
function hUniqueSlot(slot, otherwise) {
	if (slot !== void 0) {
		const vnode = slot();
		if (vnode !== void 0 && vnode !== null) return [...vnode];
	}
	return otherwise;
}
/**
* Source definitely exists,
* so it's merged with the possible slot
*/
function hMergeSlot(slot, source) {
	return slot !== void 0 ? source.concat(slot()) : source;
}
/**
* Merge with possible slot,
* even if source might not exist
*/
function hMergeSlotSafely(slot, source) {
	if (slot === void 0) return source;
	return source !== void 0 ? source.concat(slot()) : slot();
}
function hDir(tag, data, children, key, condition, getDirsFn) {
	data.key = key + condition;
	const vnode = h(tag, data, children);
	return condition ? withDirectives(vnode, getDirsFn()) : vnode;
}
//#endregion
//#region node_modules/quasar/src/components/icon/QIcon.js
var defaultViewBox = "0 0 24 24";
var sameFn = (i) => i;
var ionFn = (i) => `ionicons ${i}`;
var libMap = {
	"mdi-": (i) => `mdi ${i}`,
	"icon-": sameFn,
	"bt-": (i) => `bt ${i}`,
	"eva-": (i) => `eva ${i}`,
	"ion-md": ionFn,
	"ion-ios": ionFn,
	"ion-logo": ionFn,
	"iconfont ": sameFn,
	"ti-": (i) => `themify-icon ${i}`,
	"bi-": (i) => `bootstrap-icons ${i}`,
	"i-": sameFn
};
var matMap = {
	o_: "-outlined",
	r_: "-round",
	s_: "-sharp"
};
var symMap = {
	sym_o_: "-outlined",
	sym_r_: "-rounded",
	sym_s_: "-sharp"
};
var libRE = new RegExp("^(" + Object.keys(libMap).join("|") + ")");
var matRE = new RegExp("^(" + Object.keys(matMap).join("|") + ")");
var symRE = new RegExp("^(" + Object.keys(symMap).join("|") + ")");
var mRE = /^[Mm]\s?[-+]?\.?\d/;
var imgRE = /^img:/;
var svgUseRE = /^svguse:/;
var ionRE = /^ion-/;
var faRE = /^(fa-(classic|sharp|solid|regular|light|brands|duotone|thin)|[lf]a[srlbdk]?) /;
var QIcon_default = createComponent({
	name: "QIcon",
	props: {
		...useSizeProps,
		tag: {
			type: String,
			default: "i"
		},
		name: String,
		color: String,
		left: Boolean,
		right: Boolean
	},
	setup(props, { slots }) {
		const { proxy: { $q } } = getCurrentInstance();
		const sizeStyle = useSize(props);
		const classes = computed(() => "q-icon" + (props.left ? " on-left" : "") + (props.right ? " on-right" : "") + (props.color !== void 0 ? ` text-${props.color}` : ""));
		const type = computed(() => {
			let cls;
			let icon = props.name;
			if (icon === "none" || !icon) return { none: true };
			if ($q.iconMapFn !== null) {
				const res = $q.iconMapFn(icon);
				if (res !== void 0) if (res.icon !== void 0) {
					icon = res.icon;
					if (icon === "none" || !icon) return { none: true };
				} else return {
					cls: res.cls,
					content: res.content !== void 0 ? res.content : " "
				};
			}
			if (mRE.test(icon)) {
				const [def, viewBox = defaultViewBox] = icon.split("|");
				return {
					svg: true,
					viewBox,
					nodes: def.split("&&").map((path) => {
						const [d, style, transform] = path.split("@@");
						return h("path", {
							style,
							d,
							transform
						});
					})
				};
			}
			if (imgRE.test(icon)) return {
				img: true,
				src: icon.slice(4)
			};
			if (svgUseRE.test(icon)) {
				const [def, viewBox = defaultViewBox] = icon.split("|");
				return {
					svguse: true,
					src: def.slice(7),
					viewBox
				};
			}
			let content = " ";
			const matches = icon.match(libRE);
			if (matches !== null) cls = libMap[matches[1]](icon);
			else if (faRE.test(icon)) cls = icon;
			else if (ionRE.test(icon)) cls = `ionicons ion-${$q.platform.is.ios ? "ios" : "md"}${icon.slice(3)}`;
			else if (symRE.test(icon)) {
				cls = "notranslate material-symbols";
				const symMatches = icon.match(symRE);
				if (symMatches !== null) {
					icon = icon.slice(6);
					cls += symMap[symMatches[1]];
				}
				content = icon;
			} else {
				cls = "notranslate material-icons";
				const matMatches = icon.match(matRE);
				if (matMatches !== null) {
					icon = icon.slice(2);
					cls += matMap[matMatches[1]];
				}
				content = icon;
			}
			return {
				cls,
				content
			};
		});
		return () => {
			const data = {
				class: classes.value,
				style: sizeStyle.value,
				"aria-hidden": "true"
			};
			if (type.value.none) return h(props.tag, data, hSlot(slots.default));
			if (type.value.img) return h(props.tag, data, hMergeSlot(slots.default, [h("img", { src: type.value.src })]));
			if (type.value.svg) return h(props.tag, data, hMergeSlot(slots.default, [h("svg", { viewBox: type.value.viewBox || "0 0 24 24" }, type.value.nodes)]));
			if (type.value.svguse) return h(props.tag, data, hMergeSlot(slots.default, [h("svg", { viewBox: type.value.viewBox }, [h("use", { "xlink:href": type.value.src })])]));
			if (type.value.cls !== void 0) data.class += " " + type.value.cls;
			return h(props.tag, data, hMergeSlot(slots.default, [type.value.content]));
		};
	}
});
//#endregion
//#region node_modules/quasar/src/components/avatar/QAvatar.js
var QAvatar_default = createComponent({
	name: "QAvatar",
	props: {
		...useSizeProps,
		fontSize: String,
		color: String,
		textColor: String,
		icon: String,
		square: Boolean,
		rounded: Boolean
	},
	setup(props, { slots }) {
		const sizeStyle = useSize(props);
		const classes = computed(() => "q-avatar" + (props.color ? ` bg-${props.color}` : "") + (props.textColor ? ` text-${props.textColor} q-chip--colored` : "") + (props.square ? " q-avatar--square" : props.rounded ? " rounded-borders" : ""));
		const contentStyle = computed(() => props.fontSize ? { fontSize: props.fontSize } : null);
		return () => {
			const icon = props.icon !== void 0 ? [h(QIcon_default, { name: props.icon })] : void 0;
			return h("div", {
				class: classes.value,
				style: sizeStyle.value
			}, [h("div", {
				class: "q-avatar__content row flex-center overflow-hidden",
				style: contentStyle.value
			}, hMergeSlotSafely(slots.default, icon))]);
		};
	}
});
//#endregion
//#region node_modules/quasar/src/components/spinner/use-spinner.js
var useSpinnerProps = {
	size: {
		type: [String, Number],
		default: "1em"
	},
	color: String
};
function useSpinner(props) {
	return {
		cSize: computed(() => props.size in useSizeDefaults ? `${useSizeDefaults[props.size]}px` : props.size),
		classes: computed(() => "q-spinner" + (props.color ? ` text-${props.color}` : ""))
	};
}
//#endregion
//#region node_modules/quasar/src/components/spinner/QSpinner.js
var QSpinner_default = createComponent({
	name: "QSpinner",
	props: {
		...useSpinnerProps,
		thickness: {
			type: Number,
			default: 5
		}
	},
	setup(props) {
		const { cSize, classes } = useSpinner(props);
		return () => h("svg", {
			class: classes.value + " q-spinner-mat",
			width: cSize.value,
			height: cSize.value,
			viewBox: "25 25 50 50"
		}, [h("circle", {
			class: "path",
			cx: "50",
			cy: "50",
			r: "20",
			fill: "none",
			stroke: "currentColor",
			"stroke-width": props.thickness,
			"stroke-miterlimit": "10"
		})]);
	}
});
//#endregion
//#region node_modules/quasar/src/utils/dom/dom.js
function css(element, cssObject) {
	const elementStyle = element.style;
	for (const prop in cssObject) elementStyle[prop] = cssObject[prop];
}
function getElement(el) {
	if (el === void 0 || el === null) return;
	if (typeof el === "string") try {
		return document.querySelector(el) || void 0;
	} catch {
		return;
	}
	const target = unref(el);
	if (target) return target.$el || target;
}
function childHasFocus(el, focusedEl) {
	if (el === void 0 || el === null || el.contains(focusedEl)) return true;
	for (let next = el.nextElementSibling; next !== null; next = next.nextElementSibling) if (next.contains(focusedEl)) return true;
	return false;
}
//#endregion
//#region node_modules/quasar/src/utils/throttle/throttle.js
function throttle$1(fn, limit = 250) {
	let wait = false, result;
	return function runThrottle(...args) {
		if (!wait) {
			wait = true;
			setTimeout(() => {
				wait = false;
			}, limit);
			result = fn.apply(this, args);
		}
		return result;
	};
}
//#endregion
//#region node_modules/quasar/src/directives/ripple/Ripple.js
function showRipple(evt, el, ctx, forceCenter) {
	if (ctx.modifiers.stop) stop(evt);
	const color = ctx.modifiers.color, center = ctx.modifiers.center || forceCenter === true, node = document.createElement("span"), innerNode = document.createElement("span"), pos = position(evt), { left, top, width, height } = el.getBoundingClientRect(), diameter = Math.hypot(width, height), radius = diameter / 2, centerX = `${(width - diameter) / 2}px`, x = center ? centerX : `${pos.left - left - radius}px`, centerY = `${(height - diameter) / 2}px`, y = center ? centerY : `${pos.top - top - radius}px`;
	innerNode.className = "q-ripple__inner";
	css(innerNode, {
		height: `${diameter}px`,
		width: `${diameter}px`,
		transform: `translate3d(${x},${y},0) scale3d(.2,.2,1)`,
		opacity: 0
	});
	node.className = `q-ripple${color ? " text-" + color : ""}`;
	node.setAttribute("dir", "ltr");
	node.append(innerNode);
	el.append(node);
	const abort = () => {
		node.remove();
		clearTimeout(timer);
	};
	ctx.abort.push(abort);
	let timer = setTimeout(() => {
		innerNode.classList.add("q-ripple__inner--enter");
		innerNode.style.transform = `translate3d(${centerX},${centerY},0) scale3d(1,1,1)`;
		innerNode.style.opacity = .2;
		timer = setTimeout(() => {
			innerNode.classList.remove("q-ripple__inner--enter");
			innerNode.classList.add("q-ripple__inner--leave");
			innerNode.style.opacity = 0;
			timer = setTimeout(() => {
				node.remove();
				ctx.abort.splice(ctx.abort.indexOf(abort), 1);
			}, 275);
		}, 250);
	}, 50);
}
function updateModifiers(ctx, { modifiers, value, arg }) {
	const cfg = {
		...ctx.cfg.ripple,
		...modifiers,
		...value
	};
	ctx.modifiers = {
		early: cfg.early === true,
		stop: cfg.stop === true,
		center: cfg.center === true,
		color: cfg.color || arg,
		keyCodes: [cfg.keyCodes || 13].flat()
	};
}
var Ripple_default = createDirective({
	name: "ripple",
	beforeMount(el, binding) {
		const cfg = binding.instance.$.appContext.config.globalProperties.$q.config || {};
		if (cfg.ripple === false) return;
		const ctx = {
			cfg,
			enabled: binding.value !== false,
			modifiers: {},
			abort: [],
			start(evt) {
				if (ctx.enabled && !evt.qSkipRipple && evt.type === (ctx.modifiers.early ? "pointerdown" : "click")) showRipple(evt, el, ctx, evt.qKeyEvent === true);
			},
			keystart: throttle$1((evt) => {
				if (ctx.enabled && !evt.qSkipRipple && isKeyCode(evt, ctx.modifiers.keyCodes) && evt.type === `key${ctx.modifiers.early ? "down" : "up"}`) showRipple(evt, el, ctx, true);
			}, 300)
		};
		updateModifiers(ctx, binding);
		el.__qripple = ctx;
		addEvt(ctx, "main", [
			[
				el,
				"pointerdown",
				"start",
				"passive"
			],
			[
				el,
				"click",
				"start",
				"passive"
			],
			[
				el,
				"keydown",
				"keystart",
				"passive"
			],
			[
				el,
				"keyup",
				"keystart",
				"passive"
			]
		]);
	},
	updated(el, binding) {
		if (binding.oldValue !== binding.value) {
			const ctx = el.__qripple;
			if (ctx !== void 0) {
				ctx.enabled = binding.value !== false;
				if (ctx.enabled && Object(binding.value) === binding.value) updateModifiers(ctx, binding);
			}
		}
	},
	beforeUnmount(el) {
		const ctx = el.__qripple;
		if (ctx !== void 0) {
			ctx.abort.forEach((fn) => {
				fn();
			});
			cleanEvt(ctx, "main");
			delete el.__qripple;
		}
	}
});
//#endregion
//#region node_modules/quasar/src/composables/private.use-align/use-align.js
var alignMap = {
	left: "start",
	center: "center",
	right: "end",
	between: "between",
	around: "around",
	evenly: "evenly",
	stretch: "stretch"
};
var alignValues = Object.keys(alignMap);
var useAlignProps = { align: {
	type: String,
	validator: (v) => alignValues.includes(v)
} };
function useAlign(props) {
	return computed(() => {
		const align = props.align === void 0 ? props.vertical ? "stretch" : "left" : props.align;
		return `${props.vertical ? "items" : "justify"}-${alignMap[align]}`;
	});
}
//#endregion
//#region node_modules/quasar/src/utils/private.vm/vm.js
function getParentProxy(proxy) {
	if (Object(proxy.$parent) === proxy.$parent) return proxy.$parent;
	let { parent } = proxy.$;
	while (Object(parent) === parent) {
		if (Object(parent.proxy) === parent.proxy) return parent.proxy;
		parent = parent.parent;
	}
}
function vmHasRouter(vm) {
	return vm.appContext.config.globalProperties.$router !== void 0;
}
function vmIsDestroyed(vm) {
	return vm.isUnmounted === true || vm.isDeactivated === true;
}
//#endregion
//#region node_modules/quasar/src/composables/private.use-router-link/use-router-link.js
function getOriginalPath(record) {
	return record ? record.aliasOf ? record.aliasOf.path : record.path : "";
}
function isSameRouteRecord(a, b) {
	return (a.aliasOf || a) === (b.aliasOf || b);
}
function includesParams(outer, inner) {
	for (const key in inner) {
		const innerValue = inner[key], outerValue = outer[key];
		if (typeof innerValue === "string") {
			if (innerValue !== outerValue) return false;
		} else if (!Array.isArray(outerValue) || outerValue.length !== innerValue.length || innerValue.some((value, i) => value !== outerValue[i])) return false;
	}
	return true;
}
function isEquivalentArray(a, b) {
	return Array.isArray(b) ? a.length === b.length && a.every((value, i) => value === b[i]) : a.length === 1 && a[0] === b;
}
function isSameRouteLocationParamsValue(a, b) {
	return Array.isArray(a) ? isEquivalentArray(a, b) : Array.isArray(b) ? isEquivalentArray(b, a) : a === b;
}
function isSameRouteLocationParams(a, b) {
	if (Object.keys(a).length !== Object.keys(b).length) return false;
	for (const key in a) if (!isSameRouteLocationParamsValue(a[key], b[key])) return false;
	return true;
}
var useRouterLinkNonMatchingProps = {
	to: [String, Object],
	replace: Boolean,
	href: String,
	target: String,
	disable: Boolean
};
var useRouterLinkProps = {
	...useRouterLinkNonMatchingProps,
	exact: Boolean,
	activeClass: {
		type: String,
		default: "q-router-link--active"
	},
	exactActiveClass: {
		type: String,
		default: "q-router-link--exact-active"
	}
};
function useRouterLink({ fallbackTag, useDisableForRouterLinkProps = true } = {}) {
	const vm = getCurrentInstance();
	const { props, proxy, emit } = vm;
	const hasRouter = vmHasRouter(vm);
	const hasHrefLink = computed(() => !props.disable && props.href !== void 0);
	const hasRouterLinkProps = useDisableForRouterLinkProps ? computed(() => hasRouter && !props.disable && !hasHrefLink.value && props.to !== void 0 && props.to !== null && props.to !== "") : computed(() => hasRouter && !hasHrefLink.value && props.to !== void 0 && props.to !== null && props.to !== "");
	const resolvedLink = computed(() => hasRouterLinkProps.value ? getLink(props.to) : null);
	const hasRouterLink = computed(() => resolvedLink.value !== null);
	const hasLink = computed(() => hasHrefLink.value || hasRouterLink.value);
	const linkTag = computed(() => props.type === "a" || hasLink.value ? "a" : props.tag || fallbackTag || "div");
	const linkAttrs = computed(() => hasHrefLink.value ? {
		href: props.href,
		target: props.target
	} : hasRouterLink.value ? {
		href: resolvedLink.value.href,
		target: props.target
	} : {});
	const linkActiveIndex = computed(() => {
		if (!hasRouterLink.value) return -1;
		const { matched } = resolvedLink.value, { length } = matched, routeMatched = matched[length - 1];
		if (routeMatched === void 0) return -1;
		const currentMatched = proxy.$route.matched;
		if (currentMatched.length === 0) return -1;
		const index = currentMatched.findIndex(isSameRouteRecord.bind(null, routeMatched));
		if (index !== -1) return index;
		const parentRecordPath = getOriginalPath(matched[length - 2]);
		return length > 1 && getOriginalPath(routeMatched) === parentRecordPath && currentMatched.at(-1).path !== parentRecordPath ? currentMatched.findIndex(isSameRouteRecord.bind(null, matched[length - 2])) : index;
	});
	const linkIsActive = computed(() => hasRouterLink.value && linkActiveIndex.value !== -1 && includesParams(proxy.$route.params, resolvedLink.value.params));
	const linkIsExactActive = computed(() => linkIsActive.value && linkActiveIndex.value === proxy.$route.matched.length - 1 && isSameRouteLocationParams(proxy.$route.params, resolvedLink.value.params));
	const linkClass = computed(() => hasRouterLink.value ? linkIsExactActive.value ? ` ${props.exactActiveClass} ${props.activeClass}` : props.exact ? "" : linkIsActive.value ? ` ${props.activeClass}` : "" : "");
	function getLink(to) {
		try {
			return proxy.$router.resolve(to);
		} catch {}
		return null;
	}
	/**
	* @returns Promise<RouterError | false | undefined>
	*/
	function navigateToRouterLink(e, { returnRouterError, to = props.to, replace = props.replace } = {}) {
		if (props.disable) {
			e.preventDefault();
			return Promise.resolve(false);
		}
		if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey || e.button !== void 0 && e.button !== 0 || props.target === "_blank") return Promise.resolve(false);
		e.preventDefault();
		const promise = proxy.$router[replace ? "replace" : "push"](to);
		return returnRouterError ? promise : promise.then(() => {}).catch(() => {});
	}
	function navigateOnClick(e) {
		if (hasRouterLink.value) {
			const go = (opts) => navigateToRouterLink(e, opts);
			emit("click", e, go);
			if (!e.defaultPrevented) go();
		} else emit("click", e);
	}
	return {
		hasRouterLink,
		hasHrefLink,
		hasLink,
		linkTag,
		resolvedLink,
		linkIsActive,
		linkIsExactActive,
		linkClass,
		linkAttrs,
		getLink,
		navigateToRouterLink,
		navigateOnClick
	};
}
//#endregion
//#region node_modules/quasar/src/components/btn/use-btn.js
var btnPadding = {
	none: 0,
	xs: 4,
	sm: 8,
	md: 16,
	lg: 24,
	xl: 32
};
var defaultSizes = {
	xs: 8,
	sm: 10,
	md: 14,
	lg: 20,
	xl: 24
};
var formTypes = [
	"button",
	"submit",
	"reset"
];
var mediaTypeRE = /[^\s]\/[^\s]/;
var btnDesignOptions = [
	"flat",
	"outline",
	"push",
	"unelevated"
];
function getBtnDesign(props, defaultValue) {
	if (props.flat) return "flat";
	if (props.outline) return "outline";
	if (props.push) return "push";
	if (props.unelevated) return "unelevated";
	return defaultValue;
}
var useBtnProps = {
	...useSizeProps,
	...useRouterLinkNonMatchingProps,
	type: {
		type: String,
		default: "button"
	},
	label: [Number, String],
	icon: String,
	iconRight: String,
	...btnDesignOptions.reduce((acc, val) => (acc[val] = Boolean) && acc, {}),
	square: Boolean,
	rounded: Boolean,
	glossy: Boolean,
	size: String,
	fab: Boolean,
	fabMini: Boolean,
	padding: String,
	color: String,
	textColor: String,
	noCaps: Boolean,
	noWrap: Boolean,
	dense: Boolean,
	tabindex: [Number, String],
	ripple: {
		type: [Boolean, Object],
		default: true
	},
	align: {
		...useAlignProps.align,
		default: "center"
	},
	stack: Boolean,
	stretch: Boolean,
	loading: {
		type: Boolean,
		default: null
	},
	disable: Boolean,
	round: Boolean
};
function useBtn(props) {
	const sizeStyle = useSize(props, defaultSizes);
	const alignClass = useAlign(props);
	const { hasRouterLink, hasLink, linkTag, linkAttrs, navigateOnClick } = useRouterLink({ fallbackTag: "button" });
	const style = computed(() => {
		const obj = props.fab || props.fabMini ? {} : sizeStyle.value;
		return props.padding !== void 0 ? {
			...obj,
			padding: props.padding.split(/\s+/).map((v) => v in btnPadding ? btnPadding[v] + "px" : v).join(" "),
			minWidth: "0",
			minHeight: "0"
		} : obj;
	});
	const isRounded = computed(() => props.rounded || props.fab || props.fabMini);
	const isActionable = computed(() => !props.disable && !props.loading);
	const tabIndex = computed(() => isActionable.value ? props.tabindex || 0 : -1);
	const design = computed(() => getBtnDesign(props, "standard"));
	const attributes = computed(() => {
		const acc = { tabindex: tabIndex.value };
		if (hasLink.value) Object.assign(acc, linkAttrs.value);
		else if (formTypes.includes(props.type)) acc.type = props.type;
		if (linkTag.value === "a") {
			if (props.disable) acc["aria-disabled"] = "true";
			else if (acc.href === void 0) acc.role = "button";
			if (!hasRouterLink.value && mediaTypeRE.test(props.type)) acc.type = props.type;
		} else if (props.disable) {
			acc.disabled = "";
			acc["aria-disabled"] = "true";
		}
		if (props.loading && props.percentage !== void 0) Object.assign(acc, {
			role: "progressbar",
			"aria-valuemin": 0,
			"aria-valuemax": 100,
			"aria-valuenow": props.percentage
		});
		return acc;
	});
	return {
		classes: computed(() => {
			let colors;
			if (props.color !== void 0) colors = props.flat || props.outline ? `text-${props.textColor || props.color}` : `bg-${props.color} text-${props.textColor || "white"}`;
			else if (props.textColor) colors = `text-${props.textColor}`;
			const shape = props.round ? "round" : `rectangle${isRounded.value ? " q-btn--rounded" : props.square ? " q-btn--square" : ""}`;
			return `q-btn--${design.value} q-btn--${shape}` + (colors !== void 0 ? " " + colors : "") + (isActionable.value ? " q-btn--actionable q-focusable q-hoverable" : props.disable ? " disabled" : "") + (props.fab ? " q-btn--fab" : props.fabMini ? " q-btn--fab-mini" : "") + (props.noCaps ? " q-btn--no-uppercase" : "") + (props.dense ? " q-btn--dense" : "") + (props.stretch ? " no-border-radius self-stretch" : "") + (props.glossy ? " glossy" : "") + (props.square ? " q-btn--square" : "");
		}),
		style,
		innerClasses: computed(() => alignClass.value + (props.stack ? " column" : " row") + (props.noWrap ? " no-wrap text-no-wrap" : "") + (props.loading ? " q-btn__content--hidden" : "")),
		attributes,
		hasLink,
		linkTag,
		navigateOnClick,
		isActionable
	};
}
//#endregion
//#region node_modules/quasar/src/components/btn/QBtn.js
var { passiveCapture } = listenOpts;
var touchTarget = null, keyboardTarget = null, mouseTarget = null;
function onLoadingEvt(evt) {
	stopAndPrevent(evt);
	evt.qSkipRipple = true;
}
var QBtn_default = createComponent({
	name: "QBtn",
	props: {
		...useBtnProps,
		percentage: Number,
		darkPercentage: Boolean,
		onTouchstart: [Function, Array]
	},
	emits: [
		"click",
		"keydown",
		"mousedown",
		"keyup"
	],
	setup(props, { slots, emit }) {
		const { proxy } = getCurrentInstance();
		const { classes, style, innerClasses, attributes, hasLink, linkTag, navigateOnClick, isActionable } = useBtn(props);
		const rootRef = ref(null);
		const blurTargetRef = ref(null);
		let localTouchTargetEl = null, avoidMouseRipple, mouseTimer = null;
		const hasLabel = computed(() => props.label !== void 0 && props.label !== null && props.label !== "");
		const ripple = computed(() => props.disable || props.ripple === false ? false : {
			keyCodes: hasLink.value ? [13, 32] : [13],
			...props.ripple === true ? {} : props.ripple
		});
		const rippleProps = computed(() => ({ center: props.round }));
		const percentageStyle = computed(() => {
			const val = Math.max(0, Math.min(100, props.percentage));
			return val > 0 ? {
				transition: "transform 0.6s",
				transform: `translateX(${val - 100}%)`
			} : {};
		});
		const onEvents = computed(() => {
			if (props.loading) return {
				onMousedown: onLoadingEvt,
				onTouchstart: onLoadingEvt,
				onClick: onLoadingEvt,
				onKeydown: onLoadingEvt,
				onKeyup: onLoadingEvt
			};
			if (isActionable.value) {
				const acc = {
					onClick,
					onKeydown,
					onMousedown
				};
				if (proxy.$q.platform.has.touch) {
					const suffix = props.onTouchstart !== void 0 ? "" : "Passive";
					acc[`onTouchstart${suffix}`] = onTouchstart;
				}
				return acc;
			}
			return { onClick: stopAndPrevent };
		});
		const nodeProps = computed(() => ({
			ref: rootRef,
			class: "q-btn q-btn-item non-selectable no-outline " + classes.value,
			style: style.value,
			...attributes.value,
			...onEvents.value
		}));
		function onClick(e) {
			if (rootRef.value === null) return;
			if (e !== void 0) {
				if (e.defaultPrevented) return;
				const el = document.activeElement;
				if (props.type === "submit" && el !== document.body && !rootRef.value.contains(el) && !el.contains(rootRef.value)) {
					if (!e.qAvoidFocus) rootRef.value.focus();
					const onClickCleanup = () => {
						document.removeEventListener("keydown", stopAndPrevent, true);
						document.removeEventListener("keyup", onClickCleanup, passiveCapture);
						rootRef.value?.removeEventListener("blur", onClickCleanup, passiveCapture);
					};
					document.addEventListener("keydown", stopAndPrevent, true);
					document.addEventListener("keyup", onClickCleanup, passiveCapture);
					rootRef.value.addEventListener("blur", onClickCleanup, passiveCapture);
				}
			}
			navigateOnClick(e);
		}
		function onKeydown(e) {
			if (rootRef.value === null) return;
			emit("keydown", e);
			if (isKeyCode(e, [13, 32]) && keyboardTarget !== rootRef.value) {
				if (keyboardTarget !== null) cleanup();
				if (!e.defaultPrevented) {
					if (!e.qAvoidFocus) rootRef.value.focus();
					keyboardTarget = rootRef.value;
					rootRef.value.classList.add("q-btn--active");
					document.addEventListener("keyup", onPressEnd, true);
					rootRef.value.addEventListener("blur", onPressEnd, passiveCapture);
				}
				stopAndPrevent(e);
			}
		}
		function onTouchstart(e) {
			if (rootRef.value === null) return;
			emit("touchstart", e);
			if (e.defaultPrevented) return;
			if (touchTarget !== rootRef.value) {
				if (touchTarget !== null) cleanup();
				touchTarget = rootRef.value;
				localTouchTargetEl = e.target;
				localTouchTargetEl.addEventListener("touchcancel", onPressEnd, passiveCapture);
				localTouchTargetEl.addEventListener("touchend", onPressEnd, passiveCapture);
			}
			avoidMouseRipple = true;
			if (mouseTimer !== null) clearTimeout(mouseTimer);
			mouseTimer = setTimeout(() => {
				mouseTimer = null;
				avoidMouseRipple = false;
			}, 200);
		}
		function onMousedown(e) {
			if (rootRef.value === null) return;
			e.qSkipRipple = avoidMouseRipple === true;
			emit("mousedown", e);
			if (!e.defaultPrevented && mouseTarget !== rootRef.value) {
				if (mouseTarget !== null) cleanup();
				mouseTarget = rootRef.value;
				rootRef.value.classList.add("q-btn--active");
				document.addEventListener("mouseup", onPressEnd, passiveCapture);
			}
		}
		function onPressEnd(e) {
			if (rootRef.value === null) return;
			if (e?.type === "blur" && document.activeElement === rootRef.value) return;
			if (e?.type === "keyup") {
				if (keyboardTarget === rootRef.value && isKeyCode(e, [13, 32])) {
					const evt = new MouseEvent("click", e);
					evt.qKeyEvent = true;
					if (e.defaultPrevented) prevent(evt);
					if (e.cancelBubble) stop(evt);
					rootRef.value.dispatchEvent(evt);
					stopAndPrevent(e);
					e.qKeyEvent = true;
				}
				emit("keyup", e);
			}
			cleanup();
		}
		function cleanup(destroying) {
			const blurTarget = blurTargetRef.value;
			if (!destroying && (touchTarget === rootRef.value || mouseTarget === rootRef.value) && blurTarget !== null && blurTarget !== document.activeElement) {
				blurTarget.setAttribute("tabindex", -1);
				blurTarget.focus();
			}
			if (touchTarget === rootRef.value) {
				if (localTouchTargetEl !== null) {
					localTouchTargetEl.removeEventListener("touchcancel", onPressEnd, passiveCapture);
					localTouchTargetEl.removeEventListener("touchend", onPressEnd, passiveCapture);
				}
				touchTarget = localTouchTargetEl = null;
			}
			if (mouseTarget === rootRef.value) {
				document.removeEventListener("mouseup", onPressEnd, passiveCapture);
				mouseTarget = null;
			}
			if (keyboardTarget === rootRef.value) {
				document.removeEventListener("keyup", onPressEnd, true);
				rootRef.value?.removeEventListener("blur", onPressEnd, passiveCapture);
				keyboardTarget = null;
			}
			rootRef.value?.classList.remove("q-btn--active");
		}
		onBeforeUnmount(() => {
			cleanup(true);
		});
		Object.assign(proxy, { click: (e) => {
			if (isActionable.value) onClick(e);
		} });
		return () => {
			let inner = [];
			if (props.icon !== void 0) inner.push(h(QIcon_default, {
				name: props.icon,
				left: !props.stack && hasLabel.value,
				role: "img"
			}));
			if (hasLabel.value) inner.push(h("span", { class: "block" }, [props.label]));
			inner = hMergeSlot(slots.default, inner);
			if (props.iconRight !== void 0 && !props.round) inner.push(h(QIcon_default, {
				name: props.iconRight,
				right: !props.stack && hasLabel.value,
				role: "img"
			}));
			const child = [h("span", {
				class: "q-focus-helper",
				ref: blurTargetRef
			})];
			if (props.loading && props.percentage !== void 0) child.push(h("span", { class: "q-btn__progress absolute-full overflow-hidden" + (props.darkPercentage ? " q-btn__progress--dark" : "") }, [h("span", {
				class: "q-btn__progress-indicator fit block",
				style: percentageStyle.value
			})]));
			child.push(h("span", { class: "q-btn__content text-center col items-center q-anchor--skip " + innerClasses.value }, inner));
			if (props.loading !== null) child.push(h(Transition, { name: "q-transition--fade" }, () => props.loading ? [h("span", {
				key: "loading",
				class: "absolute-full flex flex-center"
			}, slots.loading !== void 0 ? slots.loading() : [h(QSpinner_default)])] : null));
			return withDirectives(h(linkTag.value, nodeProps.value, child), [[
				Ripple_default,
				ripple.value,
				void 0,
				rippleProps.value
			]]);
		};
	}
});
//#endregion
//#region node_modules/quasar/src/utils/private.config/nodes.js
var nodesList = [];
var portalTypeList = [];
var portalIndex = 1;
var target = document.body;
function createGlobalNode(id, portalType) {
	const el = document.createElement("div");
	el.id = portalType !== void 0 ? `q-portal--${portalType}--${portalIndex++}` : id;
	if (globalConfig.globalNodes !== void 0) {
		const cls = globalConfig.globalNodes.class;
		if (cls !== void 0) el.className = cls;
	}
	target.append(el);
	nodesList.push(el);
	portalTypeList.push(portalType);
	return el;
}
function removeGlobalNode(el) {
	const nodeIndex = nodesList.indexOf(el);
	nodesList.splice(nodeIndex, 1);
	portalTypeList.splice(nodeIndex, 1);
	el.remove();
}
//#endregion
//#region node_modules/quasar/src/plugins/notify/Notify.js
var uid = 0;
var defaults$1 = {};
var groups = {};
var notificationsList = {};
var positionClass = {};
var emptyRE = /^\s*$/;
var notifRefs = [];
var invalidTimeoutValues = [
	void 0,
	null,
	true,
	false,
	""
];
var positionList = [
	"top-left",
	"top-right",
	"bottom-left",
	"bottom-right",
	"top",
	"bottom",
	"left",
	"right",
	"center"
];
var badgePositions = [
	"top-left",
	"top-right",
	"bottom-left",
	"bottom-right"
];
var notifTypes = {
	positive: {
		icon: ($q) => $q.iconSet.type.positive,
		color: "positive"
	},
	negative: {
		icon: ($q) => $q.iconSet.type.negative,
		color: "negative"
	},
	warning: {
		icon: ($q) => $q.iconSet.type.warning,
		color: "warning",
		textColor: "dark"
	},
	info: {
		icon: ($q) => $q.iconSet.type.info,
		color: "info"
	},
	ongoing: {
		group: false,
		timeout: 0,
		spinner: true,
		color: "grey-8"
	}
};
function addNotification(config, $q, originalApi) {
	if (!config) return logError("parameter required");
	let Api;
	const notif = { textColor: "white" };
	if (!config.ignoreDefaults) Object.assign(notif, defaults$1);
	if (!isObject$1(config)) {
		if (notif.type) Object.assign(notif, notifTypes[notif.type]);
		config = { message: config };
	}
	Object.assign(notif, notifTypes[config.type || notif.type], config);
	if (typeof notif.icon === "function") notif.icon = notif.icon($q);
	if (!notif.spinner) notif.spinner = false;
	else notif.spinner = notif.spinner === true ? QSpinner_default : markRaw(notif.spinner);
	notif.meta = {
		hasMedia: Boolean(notif.spinner || notif.icon || notif.avatar),
		hasText: hasContent(notif.message) || hasContent(notif.caption)
	};
	if (notif.position) {
		if (!positionList.includes(notif.position)) return logError("wrong position", config);
	} else notif.position = "bottom";
	if (invalidTimeoutValues.includes(notif.timeout)) notif.timeout = 5e3;
	else {
		const t = Number.parseFloat(notif.timeout);
		if (!Number.isFinite(t) || t < 0) return logError("wrong timeout", config);
		notif.timeout = t;
	}
	if (notif.timeout === 0) notif.progress = false;
	else if (notif.progress) {
		notif.meta.progressClass = "q-notification__progress" + (notif.progressClass ? ` ${notif.progressClass}` : "");
		notif.meta.progressStyle = { animationDuration: `${notif.timeout + 1e3}ms` };
	}
	const actions = [
		...Array.isArray(config.actions) ? config.actions : [],
		...!config.ignoreDefaults && Array.isArray(defaults$1.actions) ? defaults$1.actions : [],
		...Array.isArray(notifTypes[config.type]?.actions) ? notifTypes[config.type].actions : []
	];
	const { closeBtn } = notif;
	if (closeBtn) actions.push({ label: typeof closeBtn === "string" ? closeBtn : $q.lang.label.close });
	notif.actions = actions.map(({ handler, noDismiss, ...item }) => ({
		flat: true,
		...item,
		onClick: typeof handler === "function" ? () => {
			handler();
			if (!noDismiss) dismiss();
		} : () => {
			dismiss();
		}
	}));
	if (notif.multiLine === void 0) notif.multiLine = notif.actions.length > 1;
	Object.assign(notif.meta, {
		class: `q-notification row items-stretch q-notification--${notif.multiLine ? "multi-line" : "standard"}` + (notif.color !== void 0 ? ` bg-${notif.color}` : "") + (notif.textColor !== void 0 ? ` text-${notif.textColor}` : "") + (notif.classes !== void 0 ? ` ${notif.classes}` : ""),
		wrapperClass: "q-notification__wrapper col relative-position border-radius-inherit " + (notif.multiLine ? "column no-wrap justify-center" : "row items-center"),
		contentClass: "q-notification__content row items-center" + (notif.multiLine ? "" : " col"),
		leftClass: notif.meta.hasText ? "additional" : "single",
		attrs: {
			role: "alert",
			...notif.attrs
		}
	});
	if (notif.group === false) {
		notif.group = void 0;
		notif.meta.group = void 0;
	} else {
		if (notif.group === void 0 || notif.group === true) notif.group = [
			notif.message,
			notif.caption,
			notif.multiline,
			...notif.actions.map((props) => `${props.label}*${props.icon}`)
		].join("|");
		notif.meta.group = notif.group + "|" + notif.position;
	}
	if (notif.actions.length === 0) notif.actions = void 0;
	else notif.meta.actionsClass = "q-notification__actions row items-center " + (notif.multiLine ? "justify-end" : "col-auto") + (notif.meta.hasMedia ? " q-notification__actions--with-media" : "");
	if (originalApi !== void 0) {
		if (originalApi.notif.meta.timer) {
			clearTimeout(originalApi.notif.meta.timer);
			originalApi.notif.meta.timer = void 0;
		}
		notif.meta.uid = originalApi.notif.meta.uid;
		const index = notificationsList[notif.position].value.indexOf(originalApi.notif);
		notificationsList[notif.position].value[index] = notif;
	} else {
		const original = groups[notif.meta.group];
		if (original === void 0) {
			notif.meta.uid = uid++;
			notif.meta.badge = 1;
			if ([
				"left",
				"right",
				"center"
			].includes(notif.position)) notificationsList[notif.position].value.splice(Math.floor(notificationsList[notif.position].value.length / 2), 0, notif);
			else {
				const action = notif.position.includes("top") ? "unshift" : "push";
				notificationsList[notif.position].value[action](notif);
			}
			if (notif.group !== void 0) groups[notif.meta.group] = notif;
		} else {
			if (original.meta.timer) {
				clearTimeout(original.meta.timer);
				original.meta.timer = void 0;
			}
			if (notif.badgePosition !== void 0) {
				if (!badgePositions.includes(notif.badgePosition)) return logError("wrong badgePosition", config);
			} else notif.badgePosition = `top-${notif.position.includes("left") ? "right" : "left"}`;
			notif.meta.uid = original.meta.uid;
			notif.meta.badge = original.meta.badge + 1;
			notif.meta.badgeClass = `q-notification__badge q-notification__badge--${notif.badgePosition}` + (notif.badgeColor !== void 0 ? ` bg-${notif.badgeColor}` : "") + (notif.badgeTextColor !== void 0 ? ` text-${notif.badgeTextColor}` : "") + (notif.badgeClass ? ` ${notif.badgeClass}` : "");
			const index = notificationsList[notif.position].value.indexOf(original);
			notificationsList[notif.position].value[index] = groups[notif.meta.group] = notif;
		}
	}
	const dismiss = () => {
		removeNotification(notif);
		Api = void 0;
	};
	if (notif.timeout > 0) notif.meta.timer = setTimeout(() => {
		notif.meta.timer = void 0;
		dismiss();
	}, notif.timeout + 1e3);
	if (notif.group !== void 0) return (props) => {
		if (props !== void 0) logError("trying to update a grouped one which is forbidden", config);
		else dismiss();
	};
	Api = {
		dismiss,
		config,
		notif
	};
	if (originalApi !== void 0) {
		Object.assign(originalApi, Api);
		return;
	}
	return (props) => {
		if (Api !== void 0) if (props === void 0) Api.dismiss();
		else addNotification({
			...Api.config,
			...props,
			group: false,
			position: notif.position
		}, $q, Api);
	};
}
function removeNotification(notif) {
	if (notif.meta.timer) {
		clearTimeout(notif.meta.timer);
		notif.meta.timer = void 0;
	}
	const index = notificationsList[notif.position].value.indexOf(notif);
	if (index !== -1) {
		if (notif.group !== void 0) delete groups[notif.meta.group];
		const el = notifRefs[String(notif.meta.uid)];
		if (el) {
			const { width, height } = getComputedStyle(el);
			el.style.left = `${el.offsetLeft}px`;
			el.style.width = width;
			el.style.height = height;
		}
		notificationsList[notif.position].value.splice(index, 1);
		if (typeof notif.onDismiss === "function") notif.onDismiss();
	}
}
function hasContent(str) {
	return str !== void 0 && str !== null && !emptyRE.test(str);
}
function logError(error, config) {
	console.error(`Notify: ${error}`, config);
	return false;
}
function getComponent() {
	return createComponent({
		name: "QNotifications",
		devtools: { hide: true },
		setup() {
			return () => h("div", { class: "q-notifications" }, positionList.map((pos) => h(TransitionGroup, {
				key: pos,
				class: positionClass[pos],
				tag: "div",
				name: `q-notification--${pos}`
			}, () => notificationsList[pos].value.map((notif) => {
				const meta = notif.meta;
				const mainChild = [];
				if (meta.hasMedia) {
					if (notif.spinner) mainChild.push(h(notif.spinner, {
						class: "q-notification__spinner q-notification__spinner--" + meta.leftClass,
						color: notif.spinnerColor,
						size: notif.spinnerSize
					}));
					else if (notif.icon) mainChild.push(h(QIcon_default, {
						class: "q-notification__icon q-notification__icon--" + meta.leftClass,
						name: notif.icon,
						color: notif.iconColor,
						size: notif.iconSize,
						role: "img"
					}));
					else if (notif.avatar) mainChild.push(h(QAvatar_default, { class: "q-notification__avatar q-notification__avatar--" + meta.leftClass }, () => h("img", {
						src: notif.avatar,
						"aria-hidden": "true"
					})));
				}
				if (meta.hasText) {
					let msgChild;
					const msgData = { class: "q-notification__message col" };
					if (notif.html) msgData.innerHTML = notif.caption ? `<div>${notif.message}</div><div class="q-notification__caption">${notif.caption}</div>` : notif.message;
					else {
						const msgNode = [notif.message];
						msgChild = notif.caption ? [h("div", msgNode), h("div", { class: "q-notification__caption" }, [notif.caption])] : msgNode;
					}
					mainChild.push(h("div", msgData, msgChild));
				}
				const child = [h("div", { class: meta.contentClass }, mainChild)];
				if (notif.progress) child.push(h("div", {
					key: `${meta.uid}|p|${meta.badge}`,
					class: meta.progressClass,
					style: meta.progressStyle
				}));
				if (notif.actions) child.push(h("div", { class: meta.actionsClass }, notif.actions.map((props) => h(QBtn_default, props))));
				if (meta.badge > 1) child.push(h("div", {
					key: `${meta.uid}|${meta.badge}`,
					class: notif.meta.badgeClass,
					style: notif.badgeStyle
				}, [meta.badge]));
				return h("div", {
					ref: (el) => {
						notifRefs[String(meta.uid)] = el;
					},
					key: meta.uid,
					class: meta.class,
					...meta.attrs
				}, [h("div", { class: meta.wrapperClass }, child)]);
			}))));
		}
	});
}
var Notify_default = {
	setDefaults(opts) {
		if (isObject$1(opts)) Object.assign(defaults$1, opts);
	},
	registerType(typeName, typeOpts) {
		if (isObject$1(typeOpts)) notifTypes[typeName] = typeOpts;
	},
	install({ $q, parentApp }) {
		$q.notify = this.create = (opts) => addNotification(opts, $q);
		$q.notify.setDefaults = this.setDefaults;
		$q.notify.registerType = this.registerType;
		if ($q.config.notify !== void 0) this.setDefaults($q.config.notify);
		if (!this.__installed) {
			positionList.forEach((pos) => {
				notificationsList[pos] = ref([]);
				const vert = pos === "left" || pos === "center" || pos === "right" ? "center" : pos.includes("top") ? "top" : "bottom", align = pos.includes("left") ? "start" : pos.includes("right") ? "end" : "center";
				positionClass[pos] = `q-notifications__list q-notifications__list--${vert} fixed column no-wrap ${pos === "left" || pos === "right" ? `items-${pos === "left" ? "start" : "end"} justify-center` : pos === "center" ? "flex-center" : `items-${align}`}`;
			});
			const el = createGlobalNode("q-notify");
			createChildApp(getComponent(), parentApp).mount(el);
		}
	}
};
//#endregion
//#region node_modules/axios/lib/helpers/bind.js
/**
* Create a bound version of a function with a specified `this` context
*
* @param {Function} fn - The function to bind
* @param {*} thisArg - The value to be passed as the `this` parameter
* @returns {Function} A new function that will call the original function with the specified `this` context
*/
function bind(fn, thisArg) {
	return function wrap() {
		return fn.apply(thisArg, arguments);
	};
}
//#endregion
//#region node_modules/axios/lib/utils.js
var { toString } = Object.prototype;
var { getPrototypeOf } = Object;
var { iterator, toStringTag } = Symbol;
var hasOwnProperty = (({ hasOwnProperty }) => (obj, prop) => hasOwnProperty.call(obj, prop))(Object.prototype);
/**
* Walk the prototype chain (excluding the shared Object.prototype) looking for
* an own `prop`. This distinguishes genuine own/inherited members — including
* class accessors and template prototypes — from members injected via
* Object.prototype pollution (e.g. `Object.prototype.username = '...'`), which
* live on Object.prototype itself and are therefore never matched.
*
* @param {*} thing The value whose chain to inspect
* @param {string|symbol} prop The property key to look for
*
* @returns {boolean} True when `prop` is owned below Object.prototype
*/
var hasOwnInPrototypeChain = (thing, prop) => {
	let obj = thing;
	const seen = [];
	while (obj != null && obj !== Object.prototype) {
		if (seen.indexOf(obj) !== -1) return false;
		seen.push(obj);
		if (hasOwnProperty(obj, prop)) return true;
		obj = getPrototypeOf(obj);
	}
	return false;
};
/**
* Read `obj[prop]` only when it is safe from Object.prototype pollution. Own
* properties and members inherited from a non-Object.prototype source (a class
* instance or template object) are honored; a value reachable only through a
* polluted Object.prototype is ignored and `undefined` is returned.
*
* @param {*} obj The source object
* @param {string|symbol} prop The property key to read
*
* @returns {*} The resolved value, or undefined when unsafe/absent
*/
var getSafeProp = (obj, prop) => obj != null && hasOwnInPrototypeChain(obj, prop) ? obj[prop] : void 0;
var kindOf = ((cache) => (thing) => {
	const str = toString.call(thing);
	return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
})(Object.create(null));
var kindOfTest = (type) => {
	type = type.toLowerCase();
	return (thing) => kindOf(thing) === type;
};
var typeOfTest = (type) => (thing) => typeof thing === type;
/**
* Determine if a value is a non-null object
*
* @param {Object} val The value to test
*
* @returns {boolean} True if value is an Array, otherwise false
*/
var { isArray } = Array;
/**
* Determine if a value is undefined
*
* @param {*} val The value to test
*
* @returns {boolean} True if the value is undefined, otherwise false
*/
var isUndefined = typeOfTest("undefined");
/**
* Determine if a value is a Buffer
*
* @param {*} val The value to test
*
* @returns {boolean} True if value is a Buffer, otherwise false
*/
function isBuffer(val) {
	return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && isFunction$1(val.constructor.isBuffer) && val.constructor.isBuffer(val);
}
/**
* Determine if a value is an ArrayBuffer
*
* @param {*} val The value to test
*
* @returns {boolean} True if value is an ArrayBuffer, otherwise false
*/
var isArrayBuffer = kindOfTest("ArrayBuffer");
/**
* Determine if a value is a view on an ArrayBuffer
*
* @param {*} val The value to test
*
* @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
*/
function isArrayBufferView(val) {
	let result;
	if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) result = ArrayBuffer.isView(val);
	else result = val && val.buffer && isArrayBuffer(val.buffer);
	return result;
}
/**
* Determine if a value is a String
*
* @param {*} val The value to test
*
* @returns {boolean} True if value is a String, otherwise false
*/
var isString = typeOfTest("string");
/**
* Determine if a value is a Function
*
* @param {*} val The value to test
* @returns {boolean} True if value is a Function, otherwise false
*/
var isFunction$1 = typeOfTest("function");
/**
* Determine if a value is a Number
*
* @param {*} val The value to test
*
* @returns {boolean} True if value is a Number, otherwise false
*/
var isNumber = typeOfTest("number");
/**
* Determine if a value is an Object
*
* @param {*} thing The value to test
*
* @returns {boolean} True if value is an Object, otherwise false
*/
var isObject = (thing) => thing !== null && typeof thing === "object";
/**
* Determine if a value is a Boolean
*
* @param {*} thing The value to test
* @returns {boolean} True if value is a Boolean, otherwise false
*/
var isBoolean = (thing) => thing === true || thing === false;
/**
* Determine if a value is a plain Object
*
* @param {*} val The value to test
*
* @returns {boolean} True if value is a plain Object, otherwise false
*/
var isPlainObject = (val) => {
	if (!isObject(val)) return false;
	const prototype = getPrototypeOf(val);
	return (prototype === null || prototype === Object.prototype || getPrototypeOf(prototype) === null) && !hasOwnInPrototypeChain(val, toStringTag) && !hasOwnInPrototypeChain(val, iterator);
};
/**
* Determine if a value is an empty object (safely handles Buffers)
*
* @param {*} val The value to test
*
* @returns {boolean} True if value is an empty object, otherwise false
*/
var isEmptyObject = (val) => {
	if (!isObject(val) || isBuffer(val)) return false;
	try {
		return Object.keys(val).length === 0 && Object.getPrototypeOf(val) === Object.prototype;
	} catch (e) {
		return false;
	}
};
/**
* Determine if a value is a Date
*
* @param {*} val The value to test
*
* @returns {boolean} True if value is a Date, otherwise false
*/
var isDate = kindOfTest("Date");
/**
* Determine if a value is a File
*
* @param {*} val The value to test
*
* @returns {boolean} True if value is a File, otherwise false
*/
var isFile = kindOfTest("File");
/**
* Determine if a value is a React Native Blob
* React Native "blob": an object with a `uri` attribute. Optionally, it can
* also have a `name` and `type` attribute to specify filename and content type
*
* @see https://github.com/facebook/react-native/blob/26684cf3adf4094eb6c405d345a75bf8c7c0bf88/Libraries/Network/FormData.js#L68-L71
*
* @param {*} value The value to test
*
* @returns {boolean} True if value is a React Native Blob, otherwise false
*/
var isReactNativeBlob = (value) => {
	return !!(value && typeof value.uri !== "undefined");
};
/**
* Determine if environment is React Native
* ReactNative `FormData` has a non-standard `getParts()` method
*
* @param {*} formData The formData to test
*
* @returns {boolean} True if environment is React Native, otherwise false
*/
var isReactNative = (formData) => formData && typeof formData.getParts !== "undefined";
/**
* Determine if a value is a Blob
*
* @param {*} val The value to test
*
* @returns {boolean} True if value is a Blob, otherwise false
*/
var isBlob = kindOfTest("Blob");
/**
* Determine if a value is a FileList
*
* @param {*} val The value to test
*
* @returns {boolean} True if value is a FileList, otherwise false
*/
var isFileList = kindOfTest("FileList");
/**
* Determine if a value is a Stream
*
* @param {*} val The value to test
*
* @returns {boolean} True if value is a Stream, otherwise false
*/
var isStream = (val) => isObject(val) && isFunction$1(val.pipe);
/**
* Determine if a value is a FormData
*
* @param {*} thing The value to test
*
* @returns {boolean} True if value is an FormData, otherwise false
*/
function getGlobal() {
	if (typeof globalThis !== "undefined") return globalThis;
	if (typeof self !== "undefined") return self;
	if (typeof window !== "undefined") return window;
	if (typeof global !== "undefined") return global;
	return {};
}
var G = getGlobal();
var FormDataCtor = typeof G.FormData !== "undefined" ? G.FormData : void 0;
var isFormData = (thing) => {
	if (!thing) return false;
	if (FormDataCtor && thing instanceof FormDataCtor) return true;
	const proto = getPrototypeOf(thing);
	if (!proto || proto === Object.prototype) return false;
	if (!isFunction$1(thing.append)) return false;
	const kind = kindOf(thing);
	return kind === "formdata" || kind === "object" && isFunction$1(thing.toString) && thing.toString() === "[object FormData]";
};
/**
* Determine if a value is a URLSearchParams object
*
* @param {*} val The value to test
*
* @returns {boolean} True if value is a URLSearchParams object, otherwise false
*/
var isURLSearchParams = kindOfTest("URLSearchParams");
var [isReadableStream, isRequest, isResponse, isHeaders] = [
	"ReadableStream",
	"Request",
	"Response",
	"Headers"
].map(kindOfTest);
/**
* Trim excess whitespace off the beginning and end of a string
*
* @param {String} str The String to trim
*
* @returns {String} The String freed of excess whitespace
*/
var trim = (str) => {
	return str.trim ? str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
};
/**
* Iterate over an Array or an Object invoking a function for each item.
*
* If `obj` is an Array callback will be called passing
* the value, index, and complete array for each item.
*
* If 'obj' is an Object callback will be called passing
* the value, key, and complete object for each property.
*
* @param {Object|Array<unknown>} obj The object to iterate
* @param {Function} fn The callback to invoke for each item
*
* @param {Object} [options]
* @param {Boolean} [options.allOwnKeys = false]
* @returns {any}
*/
function forEach(obj, fn, { allOwnKeys = false } = {}) {
	if (obj === null || typeof obj === "undefined") return;
	let i;
	let l;
	if (typeof obj !== "object") obj = [obj];
	if (isArray(obj)) for (i = 0, l = obj.length; i < l; i++) fn.call(null, obj[i], i, obj);
	else {
		if (isBuffer(obj)) return;
		const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
		const len = keys.length;
		let key;
		for (i = 0; i < len; i++) {
			key = keys[i];
			fn.call(null, obj[key], key, obj);
		}
	}
}
/**
* Finds a key in an object, case-insensitive, returning the actual key name.
* Returns null if the object is a Buffer or if no match is found.
*
* @param {Object} obj - The object to search.
* @param {string} key - The key to find (case-insensitive).
* @returns {?string} The actual key name if found, otherwise null.
*/
function findKey(obj, key) {
	if (isBuffer(obj)) return null;
	key = key.toLowerCase();
	const keys = Object.keys(obj);
	let i = keys.length;
	let _key;
	while (i-- > 0) {
		_key = keys[i];
		if (key === _key.toLowerCase()) return _key;
	}
	return null;
}
var _global = (() => {
	if (typeof globalThis !== "undefined") return globalThis;
	return typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : global;
})();
var isContextDefined = (context) => !isUndefined(context) && context !== _global;
/**
* Accepts varargs expecting each argument to be an object, then
* immutably merges the properties of each object and returns result.
*
* When multiple objects contain the same key the later object in
* the arguments list will take precedence.
*
* Example:
*
* ```js
* const result = merge({foo: 123}, {foo: 456});
* console.log(result.foo); // outputs 456
* ```
*
* @param {Object} obj1 Object to merge
*
* @returns {Object} Result of all merge properties
*/
function merge(...objs) {
	const { caseless, skipUndefined } = isContextDefined(this) && this || {};
	const result = {};
	const assignValue = (val, key) => {
		if (key === "__proto__" || key === "constructor" || key === "prototype") return;
		const targetKey = caseless && typeof key === "string" && findKey(result, key) || key;
		const existing = hasOwnProperty(result, targetKey) ? result[targetKey] : void 0;
		if (isPlainObject(existing) && isPlainObject(val)) result[targetKey] = merge(existing, val);
		else if (isPlainObject(val)) result[targetKey] = merge({}, val);
		else if (isArray(val)) result[targetKey] = val.slice();
		else if (!skipUndefined || !isUndefined(val)) result[targetKey] = val;
	};
	for (let i = 0, l = objs.length; i < l; i++) {
		const source = objs[i];
		if (!source || isBuffer(source)) continue;
		forEach(source, assignValue);
		if (typeof source !== "object" || isArray(source)) continue;
		const symbols = Object.getOwnPropertySymbols(source);
		for (let j = 0; j < symbols.length; j++) {
			const symbol = symbols[j];
			if (propertyIsEnumerable.call(source, symbol)) assignValue(source[symbol], symbol);
		}
	}
	return result;
}
/**
* Extends object a by mutably adding to it the properties of object b.
*
* @param {Object} a The object to be extended
* @param {Object} b The object to copy properties from
* @param {Object} thisArg The object to bind function to
*
* @param {Object} [options]
* @param {Boolean} [options.allOwnKeys]
* @returns {Object} The resulting value of object a
*/
var extend = (a, b, thisArg, { allOwnKeys } = {}) => {
	forEach(b, (val, key) => {
		if (thisArg && isFunction$1(val)) Object.defineProperty(a, key, {
			__proto__: null,
			value: bind(val, thisArg),
			writable: true,
			enumerable: true,
			configurable: true
		});
		else Object.defineProperty(a, key, {
			__proto__: null,
			value: val,
			writable: true,
			enumerable: true,
			configurable: true
		});
	}, { allOwnKeys });
	return a;
};
/**
* Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
*
* @param {string} content with BOM
*
* @returns {string} content value without BOM
*/
var stripBOM = (content) => {
	if (content.charCodeAt(0) === 65279) content = content.slice(1);
	return content;
};
/**
* Inherit the prototype methods from one constructor into another
* @param {function} constructor
* @param {function} superConstructor
* @param {object} [props]
* @param {object} [descriptors]
*
* @returns {void}
*/
var inherits = (constructor, superConstructor, props, descriptors) => {
	constructor.prototype = Object.create(superConstructor.prototype, descriptors);
	Object.defineProperty(constructor.prototype, "constructor", {
		__proto__: null,
		value: constructor,
		writable: true,
		enumerable: false,
		configurable: true
	});
	Object.defineProperty(constructor, "super", {
		__proto__: null,
		value: superConstructor.prototype
	});
	props && Object.assign(constructor.prototype, props);
};
/**
* Resolve object with deep prototype chain to a flat object
* @param {Object} sourceObj source object
* @param {Object} [destObj]
* @param {Function|Boolean} [filter]
* @param {Function} [propFilter]
*
* @returns {Object}
*/
var toFlatObject = (sourceObj, destObj, filter, propFilter) => {
	let props;
	let i;
	let prop;
	const merged = {};
	destObj = destObj || {};
	if (sourceObj == null) return destObj;
	do {
		props = Object.getOwnPropertyNames(sourceObj);
		i = props.length;
		while (i-- > 0) {
			prop = props[i];
			if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
				destObj[prop] = sourceObj[prop];
				merged[prop] = true;
			}
		}
		sourceObj = filter !== false && getPrototypeOf(sourceObj);
	} while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);
	return destObj;
};
/**
* Determines whether a string ends with the characters of a specified string
*
* @param {String} str
* @param {String} searchString
* @param {Number} [position= 0]
*
* @returns {boolean}
*/
var endsWith = (str, searchString, position) => {
	str = String(str);
	if (position === void 0 || position > str.length) position = str.length;
	position -= searchString.length;
	const lastIndex = str.indexOf(searchString, position);
	return lastIndex !== -1 && lastIndex === position;
};
/**
* Returns new array from array like object or null if failed
*
* @param {*} [thing]
*
* @returns {?Array}
*/
var toArray = (thing) => {
	if (!thing) return null;
	if (isArray(thing)) return thing;
	let i = thing.length;
	if (!isNumber(i)) return null;
	const arr = new Array(i);
	while (i-- > 0) arr[i] = thing[i];
	return arr;
};
/**
* Checking if the Uint8Array exists and if it does, it returns a function that checks if the
* thing passed in is an instance of Uint8Array
*
* @param {TypedArray}
*
* @returns {Array}
*/
var isTypedArray = ((TypedArray) => {
	return (thing) => {
		return TypedArray && thing instanceof TypedArray;
	};
})(typeof Uint8Array !== "undefined" && getPrototypeOf(Uint8Array));
/**
* For each entry in the object, call the function with the key and value.
*
* @param {Object<any, any>} obj - The object to iterate over.
* @param {Function} fn - The function to call for each entry.
*
* @returns {void}
*/
var forEachEntry = (obj, fn) => {
	const _iterator = (obj && obj[iterator]).call(obj);
	let result;
	while ((result = _iterator.next()) && !result.done) {
		const pair = result.value;
		fn.call(obj, pair[0], pair[1]);
	}
};
/**
* It takes a regular expression and a string, and returns an array of all the matches
*
* @param {string} regExp - The regular expression to match against.
* @param {string} str - The string to search.
*
* @returns {Array<boolean>}
*/
var matchAll = (regExp, str) => {
	let matches;
	const arr = [];
	while ((matches = regExp.exec(str)) !== null) arr.push(matches);
	return arr;
};
var isHTMLForm = kindOfTest("HTMLFormElement");
var toCamelCase = (str) => {
	return str.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function replacer(m, p1, p2) {
		return p1.toUpperCase() + p2;
	});
};
var { propertyIsEnumerable } = Object.prototype;
/**
* Determine if a value is a RegExp object
*
* @param {*} val The value to test
*
* @returns {boolean} True if value is a RegExp object, otherwise false
*/
var isRegExp = kindOfTest("RegExp");
var reduceDescriptors = (obj, reducer) => {
	const descriptors = Object.getOwnPropertyDescriptors(obj);
	const reducedDescriptors = {};
	forEach(descriptors, (descriptor, name) => {
		let ret;
		if ((ret = reducer(descriptor, name, obj)) !== false) reducedDescriptors[name] = ret || descriptor;
	});
	Object.defineProperties(obj, reducedDescriptors);
};
/**
* Makes all methods read-only
* @param {Object} obj
*/
var freezeMethods = (obj) => {
	reduceDescriptors(obj, (descriptor, name) => {
		if (isFunction$1(obj) && [
			"arguments",
			"caller",
			"callee"
		].includes(name)) return false;
		const value = obj[name];
		if (!isFunction$1(value)) return;
		descriptor.enumerable = false;
		if ("writable" in descriptor) {
			descriptor.writable = false;
			return;
		}
		if (!descriptor.set) descriptor.set = () => {
			throw Error("Can not rewrite read-only method '" + name + "'");
		};
	});
};
/**
* Converts an array or a delimited string into an object set with values as keys and true as values.
* Useful for fast membership checks.
*
* @param {Array|string} arrayOrString - The array or string to convert.
* @param {string} delimiter - The delimiter to use if input is a string.
* @returns {Object} An object with keys from the array or string, values set to true.
*/
var toObjectSet = (arrayOrString, delimiter) => {
	const obj = {};
	const define = (arr) => {
		arr.forEach((value) => {
			obj[value] = true;
		});
	};
	isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));
	return obj;
};
var noop = () => {};
var toFiniteNumber = (value, defaultValue) => {
	return value != null && Number.isFinite(value = +value) ? value : defaultValue;
};
/**
* If the thing is a FormData object, return true, otherwise return false.
*
* @param {unknown} thing - The thing to check.
*
* @returns {boolean}
*/
function isSpecCompliantForm(thing) {
	return !!(thing && isFunction$1(thing.append) && thing[toStringTag] === "FormData" && thing[iterator]);
}
/**
* Recursively converts an object to a JSON-compatible object, handling circular references and Buffers.
*
* @param {Object} obj - The object to convert.
* @returns {Object} The JSON-compatible object.
*/
var toJSONObject = (obj) => {
	const visited = /* @__PURE__ */ new WeakSet();
	const visit = (source) => {
		if (isObject(source)) {
			if (visited.has(source)) return;
			if (isBuffer(source)) return source;
			if (!("toJSON" in source)) {
				visited.add(source);
				const target = isArray(source) ? [] : {};
				forEach(source, (value, key) => {
					const reducedValue = visit(value);
					!isUndefined(reducedValue) && (target[key] = reducedValue);
				});
				visited.delete(source);
				return target;
			}
		}
		return source;
	};
	return visit(obj);
};
/**
* Determines if a value is an async function.
*
* @param {*} thing - The value to test.
* @returns {boolean} True if value is an async function, otherwise false.
*/
var isAsyncFn = kindOfTest("AsyncFunction");
/**
* Determines if a value is thenable (has then and catch methods).
*
* @param {*} thing - The value to test.
* @returns {boolean} True if value is thenable, otherwise false.
*/
var isThenable = (thing) => thing && (isObject(thing) || isFunction$1(thing)) && isFunction$1(thing.then) && isFunction$1(thing.catch);
/**
* Provides a cross-platform setImmediate implementation.
* Uses native setImmediate if available, otherwise falls back to postMessage or setTimeout.
*
* @param {boolean} setImmediateSupported - Whether setImmediate is supported.
* @param {boolean} postMessageSupported - Whether postMessage is supported.
* @returns {Function} A function to schedule a callback asynchronously.
*/
var _setImmediate = ((setImmediateSupported, postMessageSupported) => {
	if (setImmediateSupported) return setImmediate;
	return postMessageSupported ? ((token, callbacks) => {
		_global.addEventListener("message", ({ source, data }) => {
			if (source === _global && data === token) callbacks.length && callbacks.shift()();
		}, false);
		return (cb) => {
			callbacks.push(cb);
			_global.postMessage(token, "*");
		};
	})(`axios@${Math.random()}`, []) : (cb) => setTimeout(cb);
})(typeof setImmediate === "function", isFunction$1(_global.postMessage));
/**
* Schedules a microtask or asynchronous callback as soon as possible.
* Uses queueMicrotask if available, otherwise falls back to process.nextTick or _setImmediate.
*
* @type {Function}
*/
var asap = typeof queueMicrotask !== "undefined" ? queueMicrotask.bind(_global) : typeof process !== "undefined" && process.nextTick || _setImmediate;
var isIterable = (thing) => thing != null && isFunction$1(thing[iterator]);
/**
* Determine if a value is iterable via an iterator that is NOT sourced solely
* from a polluted Object.prototype. Use this instead of `isIterable` whenever
* the iterable comes from untrusted input (e.g. user-supplied header sources),
* so `Object.prototype[Symbol.iterator] = ...` cannot turn an ordinary object
* into an attacker-controlled entries iterator.
*
* @param {*} thing The value to test
*
* @returns {boolean} True if value has a non-polluted iterator
*/
var isSafeIterable = (thing) => thing != null && hasOwnInPrototypeChain(thing, iterator) && isIterable(thing);
var utils_default = {
	isArray,
	isArrayBuffer,
	isBuffer,
	isFormData,
	isArrayBufferView,
	isString,
	isNumber,
	isBoolean,
	isObject,
	isPlainObject,
	isEmptyObject,
	isReadableStream,
	isRequest,
	isResponse,
	isHeaders,
	isUndefined,
	isDate,
	isFile,
	isReactNativeBlob,
	isReactNative,
	isBlob,
	isRegExp,
	isFunction: isFunction$1,
	isStream,
	isURLSearchParams,
	isTypedArray,
	isFileList,
	forEach,
	merge,
	extend,
	trim,
	stripBOM,
	inherits,
	toFlatObject,
	kindOf,
	kindOfTest,
	endsWith,
	toArray,
	forEachEntry,
	matchAll,
	isHTMLForm,
	hasOwnProperty,
	hasOwnProp: hasOwnProperty,
	hasOwnInPrototypeChain,
	getSafeProp,
	reduceDescriptors,
	freezeMethods,
	toObjectSet,
	toCamelCase,
	noop,
	toFiniteNumber,
	findKey,
	global: _global,
	isContextDefined,
	isSpecCompliantForm,
	toJSONObject,
	isAsyncFn,
	isThenable,
	setImmediate: _setImmediate,
	asap,
	isIterable,
	isSafeIterable
};
//#endregion
//#region node_modules/axios/lib/helpers/parseHeaders.js
var ignoreDuplicateOf = utils_default.toObjectSet([
	"age",
	"authorization",
	"content-length",
	"content-type",
	"etag",
	"expires",
	"from",
	"host",
	"if-modified-since",
	"if-unmodified-since",
	"last-modified",
	"location",
	"max-forwards",
	"proxy-authorization",
	"referer",
	"retry-after",
	"user-agent"
]);
/**
* Parse headers into an object
*
* ```
* Date: Wed, 27 Aug 2014 08:58:49 GMT
* Content-Type: application/json
* Connection: keep-alive
* Transfer-Encoding: chunked
* ```
*
* @param {String} rawHeaders Headers needing to be parsed
*
* @returns {Object} Headers parsed into an object
*/
var parseHeaders_default = (rawHeaders) => {
	const parsed = {};
	let key;
	let val;
	let i;
	rawHeaders && rawHeaders.split("\n").forEach(function parser(line) {
		i = line.indexOf(":");
		key = line.substring(0, i).trim().toLowerCase();
		val = line.substring(i + 1).trim();
		if (!key || parsed[key] && ignoreDuplicateOf[key]) return;
		if (key === "set-cookie") if (parsed[key]) parsed[key].push(val);
		else parsed[key] = [val];
		else parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
	});
	return parsed;
};
//#endregion
//#region node_modules/axios/lib/helpers/sanitizeHeaderValue.js
function trimSPorHTAB(str) {
	let start = 0;
	let end = str.length;
	while (start < end) {
		const code = str.charCodeAt(start);
		if (code !== 9 && code !== 32) break;
		start += 1;
	}
	while (end > start) {
		const code = str.charCodeAt(end - 1);
		if (code !== 9 && code !== 32) break;
		end -= 1;
	}
	return start === 0 && end === str.length ? str : str.slice(start, end);
}
var INVALID_UNICODE_HEADER_VALUE_CHARS = /* @__PURE__ */ new RegExp("[\\u0000-\\u0008\\u000a-\\u001f\\u007f]+", "g");
var INVALID_BYTE_STRING_HEADER_VALUE_CHARS = /* @__PURE__ */ new RegExp("[^\\u0009\\u0020-\\u007e\\u0080-\\u00ff]+", "g");
function sanitizeValue(value, invalidChars) {
	if (utils_default.isArray(value)) return value.map((item) => sanitizeValue(item, invalidChars));
	return trimSPorHTAB(String(value).replace(invalidChars, ""));
}
var sanitizeHeaderValue = (value) => sanitizeValue(value, INVALID_UNICODE_HEADER_VALUE_CHARS);
var sanitizeByteStringHeaderValue = (value) => sanitizeValue(value, INVALID_BYTE_STRING_HEADER_VALUE_CHARS);
function toByteStringHeaderObject(headers) {
	const byteStringHeaders = Object.create(null);
	utils_default.forEach(headers.toJSON(), (value, header) => {
		byteStringHeaders[header] = sanitizeByteStringHeaderValue(value);
	});
	return byteStringHeaders;
}
//#endregion
//#region node_modules/axios/lib/core/AxiosHeaders.js
var $internals = Symbol("internals");
function normalizeHeader(header) {
	return header && String(header).trim().toLowerCase();
}
function normalizeValue(value) {
	if (value === false || value == null) return value;
	return utils_default.isArray(value) ? value.map(normalizeValue) : sanitizeHeaderValue(String(value));
}
function parseTokens(str) {
	const tokens = Object.create(null);
	const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
	let match;
	while (match = tokensRE.exec(str)) tokens[match[1]] = match[2];
	return tokens;
}
var isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());
function matchHeaderValue(context, value, header, filter, isHeaderNameFilter) {
	if (utils_default.isFunction(filter)) return filter.call(this, value, header);
	if (isHeaderNameFilter) value = header;
	if (!utils_default.isString(value)) return;
	if (utils_default.isString(filter)) return value.indexOf(filter) !== -1;
	if (utils_default.isRegExp(filter)) return filter.test(value);
}
function formatHeader(header) {
	return header.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (w, char, str) => {
		return char.toUpperCase() + str;
	});
}
function buildAccessors(obj, header) {
	const accessorName = utils_default.toCamelCase(" " + header);
	[
		"get",
		"set",
		"has"
	].forEach((methodName) => {
		Object.defineProperty(obj, methodName + accessorName, {
			__proto__: null,
			value: function(arg1, arg2, arg3) {
				return this[methodName].call(this, header, arg1, arg2, arg3);
			},
			configurable: true
		});
	});
}
var AxiosHeaders = class {
	constructor(headers) {
		headers && this.set(headers);
	}
	set(header, valueOrRewrite, rewrite) {
		const self = this;
		function setHeader(_value, _header, _rewrite) {
			const lHeader = normalizeHeader(_header);
			if (!lHeader) return;
			const key = utils_default.findKey(self, lHeader);
			if (!key || self[key] === void 0 || _rewrite === true || _rewrite === void 0 && self[key] !== false) self[key || _header] = normalizeValue(_value);
		}
		const setHeaders = (headers, _rewrite) => utils_default.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));
		if (utils_default.isPlainObject(header) || header instanceof this.constructor) setHeaders(header, valueOrRewrite);
		else if (utils_default.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) setHeaders(parseHeaders_default(header), valueOrRewrite);
		else if (utils_default.isObject(header) && utils_default.isSafeIterable(header)) {
			let obj = Object.create(null), dest, key;
			for (const entry of header) {
				if (!utils_default.isArray(entry)) throw new TypeError("Object iterator must return a key-value pair");
				key = entry[0];
				if (utils_default.hasOwnProp(obj, key)) {
					dest = obj[key];
					obj[key] = utils_default.isArray(dest) ? [...dest, entry[1]] : [dest, entry[1]];
				} else obj[key] = entry[1];
			}
			setHeaders(obj, valueOrRewrite);
		} else header != null && setHeader(valueOrRewrite, header, rewrite);
		return this;
	}
	get(header, parser) {
		header = normalizeHeader(header);
		if (header) {
			const key = utils_default.findKey(this, header);
			if (key) {
				const value = this[key];
				if (!parser) return value;
				if (parser === true) return parseTokens(value);
				if (utils_default.isFunction(parser)) return parser.call(this, value, key);
				if (utils_default.isRegExp(parser)) return parser.exec(value);
				throw new TypeError("parser must be boolean|regexp|function");
			}
		}
	}
	has(header, matcher) {
		header = normalizeHeader(header);
		if (header) {
			const key = utils_default.findKey(this, header);
			return !!(key && this[key] !== void 0 && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
		}
		return false;
	}
	delete(header, matcher) {
		const self = this;
		let deleted = false;
		function deleteHeader(_header) {
			_header = normalizeHeader(_header);
			if (_header) {
				const key = utils_default.findKey(self, _header);
				if (key && (!matcher || matchHeaderValue(self, self[key], key, matcher))) {
					delete self[key];
					deleted = true;
				}
			}
		}
		if (utils_default.isArray(header)) header.forEach(deleteHeader);
		else deleteHeader(header);
		return deleted;
	}
	clear(matcher) {
		const keys = Object.keys(this);
		let i = keys.length;
		let deleted = false;
		while (i--) {
			const key = keys[i];
			if (!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
				delete this[key];
				deleted = true;
			}
		}
		return deleted;
	}
	normalize(format) {
		const self = this;
		const headers = {};
		utils_default.forEach(this, (value, header) => {
			const key = utils_default.findKey(headers, header);
			if (key) {
				self[key] = normalizeValue(value);
				delete self[header];
				return;
			}
			const normalized = format ? formatHeader(header) : String(header).trim();
			if (normalized !== header) delete self[header];
			self[normalized] = normalizeValue(value);
			headers[normalized] = true;
		});
		return this;
	}
	concat(...targets) {
		return this.constructor.concat(this, ...targets);
	}
	toJSON(asStrings) {
		const obj = Object.create(null);
		utils_default.forEach(this, (value, header) => {
			value != null && value !== false && (obj[header] = asStrings && utils_default.isArray(value) ? value.join(", ") : value);
		});
		return obj;
	}
	[Symbol.iterator]() {
		return Object.entries(this.toJSON())[Symbol.iterator]();
	}
	toString() {
		return Object.entries(this.toJSON()).map(([header, value]) => header + ": " + value).join("\n");
	}
	getSetCookie() {
		return this.get("set-cookie") || [];
	}
	get [Symbol.toStringTag]() {
		return "AxiosHeaders";
	}
	static from(thing) {
		return thing instanceof this ? thing : new this(thing);
	}
	static concat(first, ...targets) {
		const computed = new this(first);
		targets.forEach((target) => computed.set(target));
		return computed;
	}
	static accessor(header) {
		const accessors = (this[$internals] = this[$internals] = { accessors: {} }).accessors;
		const prototype = this.prototype;
		function defineAccessor(_header) {
			const lHeader = normalizeHeader(_header);
			if (!accessors[lHeader]) {
				buildAccessors(prototype, _header);
				accessors[lHeader] = true;
			}
		}
		utils_default.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);
		return this;
	}
};
AxiosHeaders.accessor([
	"Content-Type",
	"Content-Length",
	"Accept",
	"Accept-Encoding",
	"User-Agent",
	"Authorization"
]);
utils_default.reduceDescriptors(AxiosHeaders.prototype, ({ value }, key) => {
	let mapped = key[0].toUpperCase() + key.slice(1);
	return {
		get: () => value,
		set(headerValue) {
			this[mapped] = headerValue;
		}
	};
});
utils_default.freezeMethods(AxiosHeaders);
//#endregion
//#region node_modules/axios/lib/core/AxiosError.js
var REDACTED = "[REDACTED ****]";
function hasOwnOrPrototypeToJSON(source) {
	if (utils_default.hasOwnProp(source, "toJSON")) return true;
	let prototype = Object.getPrototypeOf(source);
	while (prototype && prototype !== Object.prototype) {
		if (utils_default.hasOwnProp(prototype, "toJSON")) return true;
		prototype = Object.getPrototypeOf(prototype);
	}
	return false;
}
function redactConfig(config, redactKeys) {
	const lowerKeys = new Set(redactKeys.map((k) => String(k).toLowerCase()));
	const seen = [];
	const visit = (source) => {
		if (source === null || typeof source !== "object") return source;
		if (utils_default.isBuffer(source)) return source;
		if (seen.indexOf(source) !== -1) return void 0;
		if (source instanceof AxiosHeaders) source = source.toJSON();
		seen.push(source);
		let result;
		if (utils_default.isArray(source)) {
			result = [];
			source.forEach((v, i) => {
				const reducedValue = visit(v);
				if (!utils_default.isUndefined(reducedValue)) result[i] = reducedValue;
			});
		} else {
			if (!utils_default.isPlainObject(source) && hasOwnOrPrototypeToJSON(source)) {
				seen.pop();
				return source;
			}
			result = Object.create(null);
			for (const [key, value] of Object.entries(source)) {
				const reducedValue = lowerKeys.has(key.toLowerCase()) ? REDACTED : visit(value);
				if (!utils_default.isUndefined(reducedValue)) result[key] = reducedValue;
			}
		}
		seen.pop();
		return result;
	};
	return visit(config);
}
var AxiosError = class AxiosError extends Error {
	static from(error, code, config, request, response, customProps) {
		const axiosError = new AxiosError(error.message, code || error.code, config, request, response);
		Object.defineProperty(axiosError, "cause", {
			__proto__: null,
			value: error,
			writable: true,
			enumerable: false,
			configurable: true
		});
		axiosError.name = error.name;
		if (error.status != null && axiosError.status == null) axiosError.status = error.status;
		customProps && Object.assign(axiosError, customProps);
		return axiosError;
	}
	/**
	* Create an Error with the specified message, config, error code, request and response.
	*
	* @param {string} message The error message.
	* @param {string} [code] The error code (for example, 'ECONNABORTED').
	* @param {Object} [config] The config.
	* @param {Object} [request] The request.
	* @param {Object} [response] The response.
	*
	* @returns {Error} The created error.
	*/
	constructor(message, code, config, request, response) {
		super(message);
		Object.defineProperty(this, "message", {
			__proto__: null,
			value: message,
			enumerable: true,
			writable: true,
			configurable: true
		});
		this.name = "AxiosError";
		this.isAxiosError = true;
		code && (this.code = code);
		config && (this.config = config);
		request && (this.request = request);
		if (response) {
			this.response = response;
			this.status = response.status;
		}
	}
	toJSON() {
		const config = this.config;
		const redactKeys = config && utils_default.hasOwnProp(config, "redact") ? config.redact : void 0;
		const serializedConfig = utils_default.isArray(redactKeys) && redactKeys.length > 0 ? redactConfig(config, redactKeys) : utils_default.toJSONObject(config);
		return {
			message: this.message,
			name: this.name,
			description: this.description,
			number: this.number,
			fileName: this.fileName,
			lineNumber: this.lineNumber,
			columnNumber: this.columnNumber,
			stack: this.stack,
			config: serializedConfig,
			code: this.code,
			status: this.status
		};
	}
};
AxiosError.ERR_BAD_OPTION_VALUE = "ERR_BAD_OPTION_VALUE";
AxiosError.ERR_BAD_OPTION = "ERR_BAD_OPTION";
AxiosError.ECONNABORTED = "ECONNABORTED";
AxiosError.ETIMEDOUT = "ETIMEDOUT";
AxiosError.ECONNREFUSED = "ECONNREFUSED";
AxiosError.ERR_NETWORK = "ERR_NETWORK";
AxiosError.ERR_FR_TOO_MANY_REDIRECTS = "ERR_FR_TOO_MANY_REDIRECTS";
AxiosError.ERR_DEPRECATED = "ERR_DEPRECATED";
AxiosError.ERR_BAD_RESPONSE = "ERR_BAD_RESPONSE";
AxiosError.ERR_BAD_REQUEST = "ERR_BAD_REQUEST";
AxiosError.ERR_CANCELED = "ERR_CANCELED";
AxiosError.ERR_NOT_SUPPORT = "ERR_NOT_SUPPORT";
AxiosError.ERR_INVALID_URL = "ERR_INVALID_URL";
AxiosError.ERR_FORM_DATA_DEPTH_EXCEEDED = "ERR_FORM_DATA_DEPTH_EXCEEDED";
/**
* Determines if the given thing is a array or js object.
*
* @param {string} thing - The object or array to be visited.
*
* @returns {boolean}
*/
function isVisitable(thing) {
	return utils_default.isPlainObject(thing) || utils_default.isArray(thing);
}
/**
* It removes the brackets from the end of a string
*
* @param {string} key - The key of the parameter.
*
* @returns {string} the key without the brackets.
*/
function removeBrackets(key) {
	return utils_default.endsWith(key, "[]") ? key.slice(0, -2) : key;
}
/**
* It takes a path, a key, and a boolean, and returns a string
*
* @param {string} path - The path to the current key.
* @param {string} key - The key of the current object being iterated over.
* @param {string} dots - If true, the key will be rendered with dots instead of brackets.
*
* @returns {string} The path to the current key.
*/
function renderKey(path, key, dots) {
	if (!path) return key;
	return path.concat(key).map(function each(token, i) {
		token = removeBrackets(token);
		return !dots && i ? "[" + token + "]" : token;
	}).join(dots ? "." : "");
}
/**
* If the array is an array and none of its elements are visitable, then it's a flat array.
*
* @param {Array<any>} arr - The array to check
*
* @returns {boolean}
*/
function isFlatArray(arr) {
	return utils_default.isArray(arr) && !arr.some(isVisitable);
}
var predicates = utils_default.toFlatObject(utils_default, {}, null, function filter(prop) {
	return /^is[A-Z]/.test(prop);
});
/**
* Convert a data object to FormData
*
* @param {Object} obj
* @param {?Object} [formData]
* @param {?Object} [options]
* @param {Function} [options.visitor]
* @param {Boolean} [options.metaTokens = true]
* @param {Boolean} [options.dots = false]
* @param {?Boolean} [options.indexes = false]
*
* @returns {Object}
**/
/**
* It converts an object into a FormData object
*
* @param {Object<any, any>} obj - The object to convert to form data.
* @param {string} formData - The FormData object to append to.
* @param {Object<string, any>} options
*
* @returns
*/
function toFormData(obj, formData, options) {
	if (!utils_default.isObject(obj)) throw new TypeError("target must be an object");
	formData = formData || new FormData();
	options = utils_default.toFlatObject(options, {
		metaTokens: true,
		dots: false,
		indexes: false
	}, false, function defined(option, source) {
		return !utils_default.isUndefined(source[option]);
	});
	const metaTokens = options.metaTokens;
	const visitor = options.visitor || defaultVisitor;
	const dots = options.dots;
	const indexes = options.indexes;
	const _Blob = options.Blob || typeof Blob !== "undefined" && Blob;
	const maxDepth = options.maxDepth === void 0 ? 100 : options.maxDepth;
	const useBlob = _Blob && utils_default.isSpecCompliantForm(formData);
	const stack = [];
	if (!utils_default.isFunction(visitor)) throw new TypeError("visitor must be a function");
	function convertValue(value) {
		if (value === null) return "";
		if (utils_default.isDate(value)) return value.toISOString();
		if (utils_default.isBoolean(value)) return value.toString();
		if (!useBlob && utils_default.isBlob(value)) throw new AxiosError("Blob is not supported. Use a Buffer instead.");
		if (utils_default.isArrayBuffer(value) || utils_default.isTypedArray(value)) {
			if (useBlob && typeof _Blob === "function") return new _Blob([value]);
			if (typeof Buffer !== "undefined") return Buffer.from(value);
			throw new AxiosError("Blob is not supported. Use a Buffer instead.", AxiosError.ERR_NOT_SUPPORT);
		}
		return value;
	}
	function throwIfMaxDepthExceeded(depth) {
		if (depth > maxDepth) throw new AxiosError("Object is too deeply nested (" + depth + " levels). Max depth: " + maxDepth, AxiosError.ERR_FORM_DATA_DEPTH_EXCEEDED);
	}
	function stringifyWithDepthLimit(value, depth) {
		if (maxDepth === Infinity) return JSON.stringify(value);
		const ancestors = [];
		return JSON.stringify(value, function limitDepth(_key, currentValue) {
			if (!utils_default.isObject(currentValue)) return currentValue;
			while (ancestors.length && ancestors[ancestors.length - 1] !== this) ancestors.pop();
			ancestors.push(currentValue);
			throwIfMaxDepthExceeded(depth + ancestors.length - 1);
			return currentValue;
		});
	}
	/**
	* Default visitor.
	*
	* @param {*} value
	* @param {String|Number} key
	* @param {Array<String|Number>} path
	* @this {FormData}
	*
	* @returns {boolean} return true to visit the each prop of the value recursively
	*/
	function defaultVisitor(value, key, path) {
		let arr = value;
		if (utils_default.isReactNative(formData) && utils_default.isReactNativeBlob(value)) {
			formData.append(renderKey(path, key, dots), convertValue(value));
			return false;
		}
		if (value && !path && typeof value === "object") {
			if (utils_default.endsWith(key, "{}")) {
				key = metaTokens ? key : key.slice(0, -2);
				value = stringifyWithDepthLimit(value, 1);
			} else if (utils_default.isArray(value) && isFlatArray(value) || (utils_default.isFileList(value) || utils_default.endsWith(key, "[]")) && (arr = utils_default.toArray(value))) {
				key = removeBrackets(key);
				arr.forEach(function each(el, index) {
					!(utils_default.isUndefined(el) || el === null) && formData.append(indexes === true ? renderKey([key], index, dots) : indexes === null ? key : key + "[]", convertValue(el));
				});
				return false;
			}
		}
		if (isVisitable(value)) return true;
		formData.append(renderKey(path, key, dots), convertValue(value));
		return false;
	}
	const exposedHelpers = Object.assign(predicates, {
		defaultVisitor,
		convertValue,
		isVisitable
	});
	function build(value, path, depth = 0) {
		if (utils_default.isUndefined(value)) return;
		throwIfMaxDepthExceeded(depth);
		if (stack.indexOf(value) !== -1) throw new Error("Circular reference detected in " + path.join("."));
		stack.push(value);
		utils_default.forEach(value, function each(el, key) {
			if ((!(utils_default.isUndefined(el) || el === null) && visitor.call(formData, el, utils_default.isString(key) ? key.trim() : key, path, exposedHelpers)) === true) build(el, path ? path.concat(key) : [key], depth + 1);
		});
		stack.pop();
	}
	if (!utils_default.isObject(obj)) throw new TypeError("data must be an object");
	build(obj);
	return formData;
}
//#endregion
//#region node_modules/axios/lib/helpers/AxiosURLSearchParams.js
/**
* It encodes a string by replacing all characters that are not in the unreserved set with
* their percent-encoded equivalents
*
* @param {string} str - The string to encode.
*
* @returns {string} The encoded string.
*/
function encode$1(str) {
	const charMap = {
		"!": "%21",
		"'": "%27",
		"(": "%28",
		")": "%29",
		"~": "%7E",
		"%20": "+"
	};
	return encodeURIComponent(str).replace(/[!'()~]|%20/g, function replacer(match) {
		return charMap[match];
	});
}
/**
* It takes a params object and converts it to a FormData object
*
* @param {Object<string, any>} params - The parameters to be converted to a FormData object.
* @param {Object<string, any>} options - The options object passed to the Axios constructor.
*
* @returns {void}
*/
function AxiosURLSearchParams(params, options) {
	this._pairs = [];
	params && toFormData(params, this, options);
}
var prototype = AxiosURLSearchParams.prototype;
prototype.append = function append(name, value) {
	this._pairs.push([name, value]);
};
prototype.toString = function toString(encoder) {
	const _encode = encoder ? (value) => encoder.call(this, value, encode$1) : encode$1;
	return this._pairs.map(function each(pair) {
		return _encode(pair[0]) + "=" + _encode(pair[1]);
	}, "").join("&");
};
//#endregion
//#region node_modules/axios/lib/helpers/buildURL.js
/**
* It replaces URL-encoded forms of `:`, `$`, `,`, and spaces with
* their plain counterparts (`:`, `$`, `,`, `+`).
*
* @param {string} val The value to be encoded.
*
* @returns {string} The encoded value.
*/
function encode(val) {
	return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+");
}
/**
* Build a URL by appending params to the end
*
* @param {string} url The base of the url (e.g., http://www.google.com)
* @param {object} [params] The params to be appended
* @param {?(object|Function)} options
*
* @returns {string} The formatted url
*/
function buildURL(url, params, options) {
	if (!params) return url;
	url = url || "";
	const _options = utils_default.isFunction(options) ? { serialize: options } : options;
	const _encode = utils_default.getSafeProp(_options, "encode") || encode;
	const serializeFn = utils_default.getSafeProp(_options, "serialize");
	let serializedParams;
	if (serializeFn) serializedParams = serializeFn(params, _options);
	else serializedParams = utils_default.isURLSearchParams(params) ? params.toString() : new AxiosURLSearchParams(params, _options).toString(_encode);
	if (serializedParams) {
		const hashmarkIndex = url.indexOf("#");
		if (hashmarkIndex !== -1) url = url.slice(0, hashmarkIndex);
		url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
	}
	return url;
}
//#endregion
//#region node_modules/axios/lib/core/InterceptorManager.js
var InterceptorManager = class {
	constructor() {
		this.handlers = [];
	}
	/**
	* Add a new interceptor to the stack
	*
	* @param {Function} fulfilled The function to handle `then` for a `Promise`
	* @param {Function} rejected The function to handle `reject` for a `Promise`
	* @param {Object} options The options for the interceptor, synchronous and runWhen
	*
	* @return {Number} An ID used to remove interceptor later
	*/
	use(fulfilled, rejected, options) {
		this.handlers.push({
			fulfilled,
			rejected,
			synchronous: options ? options.synchronous : false,
			runWhen: options ? options.runWhen : null
		});
		return this.handlers.length - 1;
	}
	/**
	* Remove an interceptor from the stack
	*
	* @param {Number} id The ID that was returned by `use`
	*
	* @returns {void}
	*/
	eject(id) {
		if (this.handlers[id]) this.handlers[id] = null;
	}
	/**
	* Clear all interceptors from the stack
	*
	* @returns {void}
	*/
	clear() {
		if (this.handlers) this.handlers = [];
	}
	/**
	* Iterate over all the registered interceptors
	*
	* This method is particularly useful for skipping over any
	* interceptors that may have become `null` calling `eject`.
	*
	* @param {Function} fn The function to call for each interceptor
	*
	* @returns {void}
	*/
	forEach(fn) {
		utils_default.forEach(this.handlers, function forEachHandler(h) {
			if (h !== null) fn(h);
		});
	}
};
//#endregion
//#region node_modules/axios/lib/defaults/transitional.js
var transitional_default = {
	silentJSONParsing: true,
	forcedJSONParsing: true,
	clarifyTimeoutError: false,
	legacyInterceptorReqResOrdering: true,
	advertiseZstdAcceptEncoding: false,
	validateStatusUndefinedResolves: true
};
//#endregion
//#region node_modules/axios/lib/platform/browser/index.js
var browser_default = {
	isBrowser: true,
	classes: {
		URLSearchParams: typeof URLSearchParams !== "undefined" ? URLSearchParams : AxiosURLSearchParams,
		FormData: typeof FormData !== "undefined" ? FormData : null,
		Blob: typeof Blob !== "undefined" ? Blob : null
	},
	protocols: [
		"http",
		"https",
		"file",
		"blob",
		"url",
		"data"
	]
};
//#endregion
//#region node_modules/axios/lib/platform/common/utils.js
var utils_exports = /* @__PURE__ */ __exportAll({
	hasBrowserEnv: () => hasBrowserEnv,
	hasStandardBrowserEnv: () => hasStandardBrowserEnv,
	hasStandardBrowserWebWorkerEnv: () => hasStandardBrowserWebWorkerEnv,
	navigator: () => _navigator,
	origin: () => origin
});
var hasBrowserEnv = typeof window !== "undefined" && typeof document !== "undefined";
var _navigator = typeof navigator === "object" && navigator || void 0;
/**
* Determine if we're running in a standard browser environment
*
* This allows axios to run in a web worker, and react-native.
* Both environments support XMLHttpRequest, but not fully standard globals.
*
* web workers:
*  typeof window -> undefined
*  typeof document -> undefined
*
* react-native:
*  navigator.product -> 'ReactNative'
* nativescript
*  navigator.product -> 'NativeScript' or 'NS'
*
* @returns {boolean}
*/
var hasStandardBrowserEnv = hasBrowserEnv && (!_navigator || [
	"ReactNative",
	"NativeScript",
	"NS"
].indexOf(_navigator.product) < 0);
/**
* Determine if we're running in a standard browser webWorker environment
*
* Although the `isStandardBrowserEnv` method indicates that
* `allows axios to run in a web worker`, the WebWorker will still be
* filtered out due to its judgment standard
* `typeof window !== 'undefined' && typeof document !== 'undefined'`.
* This leads to a problem when axios post `FormData` in webWorker
*/
var hasStandardBrowserWebWorkerEnv = (() => {
	return typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope && typeof self.importScripts === "function";
})();
var origin = hasBrowserEnv && window.location.href || "http://localhost";
//#endregion
//#region node_modules/axios/lib/platform/index.js
var platform_default = {
	...utils_exports,
	...browser_default
};
//#endregion
//#region node_modules/axios/lib/helpers/toURLEncodedForm.js
function toURLEncodedForm(data, options) {
	return toFormData(data, new platform_default.classes.URLSearchParams(), {
		visitor: function(value, key, path, helpers) {
			if (platform_default.isNode && utils_default.isBuffer(value)) {
				this.append(key, value.toString("base64"));
				return false;
			}
			return helpers.defaultVisitor.apply(this, arguments);
		},
		...options
	});
}
//#endregion
//#region node_modules/axios/lib/helpers/formDataToJSON.js
var MAX_DEPTH = 100;
function throwIfDepthExceeded(index) {
	if (index > MAX_DEPTH) throw new AxiosError("FormData field is too deeply nested (" + index + " levels). Max depth: " + MAX_DEPTH, AxiosError.ERR_FORM_DATA_DEPTH_EXCEEDED);
}
/**
* It takes a string like `foo[x][y][z]` and returns an array like `['foo', 'x', 'y', 'z']
*
* @param {string} name - The name of the property to get.
*
* @returns An array of strings.
*/
function parsePropPath(name) {
	const path = [];
	const pattern = /\w+|\[(\w*)]/g;
	let match;
	while ((match = pattern.exec(name)) !== null) {
		throwIfDepthExceeded(path.length);
		path.push(match[0] === "[]" ? "" : match[1] || match[0]);
	}
	return path;
}
/**
* Convert an array to an object.
*
* @param {Array<any>} arr - The array to convert to an object.
*
* @returns An object with the same keys and values as the array.
*/
function arrayToObject(arr) {
	const obj = {};
	const keys = Object.keys(arr);
	let i;
	const len = keys.length;
	let key;
	for (i = 0; i < len; i++) {
		key = keys[i];
		obj[key] = arr[key];
	}
	return obj;
}
/**
* It takes a FormData object and returns a JavaScript object
*
* @param {string} formData The FormData object to convert to JSON.
*
* @returns {Object<string, any> | null} The converted object.
*/
function formDataToJSON(formData) {
	function buildPath(path, value, target, index) {
		throwIfDepthExceeded(index);
		let name = path[index++];
		if (name === "__proto__") return true;
		const isNumericKey = Number.isFinite(+name);
		const isLast = index >= path.length;
		name = !name && utils_default.isArray(target) ? target.length : name;
		if (isLast) {
			if (utils_default.hasOwnProp(target, name)) target[name] = utils_default.isArray(target[name]) ? target[name].concat(value) : [target[name], value];
			else target[name] = value;
			return !isNumericKey;
		}
		if (!utils_default.hasOwnProp(target, name) || !utils_default.isObject(target[name])) target[name] = [];
		if (buildPath(path, value, target[name], index) && utils_default.isArray(target[name])) target[name] = arrayToObject(target[name]);
		return !isNumericKey;
	}
	if (utils_default.isFormData(formData) && utils_default.isFunction(formData.entries)) {
		const obj = {};
		utils_default.forEachEntry(formData, (name, value) => {
			buildPath(parsePropPath(name), value, obj, 0);
		});
		return obj;
	}
	return null;
}
//#endregion
//#region node_modules/axios/lib/defaults/index.js
var own = (obj, key) => obj != null && utils_default.hasOwnProp(obj, key) ? obj[key] : void 0;
/**
* It takes a string, tries to parse it, and if it fails, it returns the stringified version
* of the input
*
* @param {any} rawValue - The value to be stringified.
* @param {Function} parser - A function that parses a string into a JavaScript object.
* @param {Function} encoder - A function that takes a value and returns a string.
*
* @returns {string} A stringified version of the rawValue.
*/
function stringifySafely(rawValue, parser, encoder) {
	if (utils_default.isString(rawValue)) try {
		(parser || JSON.parse)(rawValue);
		return utils_default.trim(rawValue);
	} catch (e) {
		if (e.name !== "SyntaxError") throw e;
	}
	return (encoder || JSON.stringify)(rawValue);
}
var defaults = {
	transitional: transitional_default,
	adapter: [
		"xhr",
		"http",
		"fetch"
	],
	transformRequest: [function transformRequest(data, headers) {
		const contentType = headers.getContentType() || "";
		const hasJSONContentType = contentType.indexOf("application/json") > -1;
		const isObjectPayload = utils_default.isObject(data);
		if (isObjectPayload && utils_default.isHTMLForm(data)) data = new FormData(data);
		if (utils_default.isFormData(data)) return hasJSONContentType ? JSON.stringify(formDataToJSON(data)) : data;
		if (utils_default.isArrayBuffer(data) || utils_default.isBuffer(data) || utils_default.isStream(data) || utils_default.isFile(data) || utils_default.isBlob(data) || utils_default.isReadableStream(data)) return data;
		if (utils_default.isArrayBufferView(data)) return data.buffer;
		if (utils_default.isURLSearchParams(data)) {
			headers.setContentType("application/x-www-form-urlencoded;charset=utf-8", false);
			return data.toString();
		}
		let isFileList;
		if (isObjectPayload) {
			const formSerializer = own(this, "formSerializer");
			if (contentType.indexOf("application/x-www-form-urlencoded") > -1) return toURLEncodedForm(data, formSerializer).toString();
			if ((isFileList = utils_default.isFileList(data)) || contentType.indexOf("multipart/form-data") > -1) {
				const env = own(this, "env");
				const _FormData = env && env.FormData;
				return toFormData(isFileList ? { "files[]": data } : data, _FormData && new _FormData(), formSerializer);
			}
		}
		if (isObjectPayload || hasJSONContentType) {
			headers.setContentType("application/json", false);
			return stringifySafely(data);
		}
		return data;
	}],
	transformResponse: [function transformResponse(data) {
		const transitional = own(this, "transitional") || defaults.transitional;
		const forcedJSONParsing = transitional && transitional.forcedJSONParsing;
		const responseType = own(this, "responseType");
		const JSONRequested = responseType === "json";
		if (utils_default.isResponse(data) || utils_default.isReadableStream(data)) return data;
		if (data && utils_default.isString(data) && (forcedJSONParsing && !responseType || JSONRequested)) {
			const strictJSONParsing = !(transitional && transitional.silentJSONParsing) && JSONRequested;
			try {
				return JSON.parse(data, own(this, "parseReviver"));
			} catch (e) {
				if (strictJSONParsing) {
					if (e.name === "SyntaxError") throw AxiosError.from(e, AxiosError.ERR_BAD_RESPONSE, this, null, own(this, "response"));
					throw e;
				}
			}
		}
		return data;
	}],
	/**
	* A timeout in milliseconds to abort a request. If set to 0 (default) a
	* timeout is not created.
	*/
	timeout: 0,
	xsrfCookieName: "XSRF-TOKEN",
	xsrfHeaderName: "X-XSRF-TOKEN",
	maxContentLength: -1,
	maxBodyLength: -1,
	env: {
		FormData: platform_default.classes.FormData,
		Blob: platform_default.classes.Blob
	},
	validateStatus: function validateStatus(status) {
		return status >= 200 && status < 300;
	},
	headers: { common: {
		Accept: "application/json, text/plain, */*",
		"Content-Type": void 0
	} }
};
utils_default.forEach([
	"delete",
	"get",
	"head",
	"post",
	"put",
	"patch",
	"query"
], (method) => {
	defaults.headers[method] = {};
});
//#endregion
//#region node_modules/axios/lib/core/transformData.js
/**
* Transform the data for a request or a response
*
* @param {Array|Function} fns A single function or Array of functions
* @param {?Object} response The response object
*
* @returns {*} The resulting transformed data
*/
function transformData(fns, response) {
	const config = this || defaults;
	const context = response || config;
	const headers = AxiosHeaders.from(context.headers);
	let data = context.data;
	utils_default.forEach(fns, function transform(fn) {
		data = fn.call(config, data, headers.normalize(), response ? response.status : void 0);
	});
	headers.normalize();
	return data;
}
//#endregion
//#region node_modules/axios/lib/cancel/isCancel.js
function isCancel(value) {
	return !!(value && value.__CANCEL__);
}
//#endregion
//#region node_modules/axios/lib/cancel/CanceledError.js
var CanceledError = class extends AxiosError {
	/**
	* A `CanceledError` is an object that is thrown when an operation is canceled.
	*
	* @param {string=} message The message.
	* @param {Object=} config The config.
	* @param {Object=} request The request.
	*
	* @returns {CanceledError} The created error.
	*/
	constructor(message, config, request) {
		super(message == null ? "canceled" : message, AxiosError.ERR_CANCELED, config, request);
		this.name = "CanceledError";
		this.__CANCEL__ = true;
	}
};
//#endregion
//#region node_modules/axios/lib/core/settle.js
/**
* Resolve or reject a Promise based on response status.
*
* @param {Function} resolve A function that resolves the promise.
* @param {Function} reject A function that rejects the promise.
* @param {object} response The response.
*
* @returns {object} The response.
*/
function settle(resolve, reject, response) {
	const validateStatus = response.config.validateStatus;
	if (!response.status || !validateStatus || validateStatus(response.status)) resolve(response);
	else reject(new AxiosError("Request failed with status code " + response.status, response.status >= 400 && response.status < 500 ? AxiosError.ERR_BAD_REQUEST : AxiosError.ERR_BAD_RESPONSE, response.config, response.request, response));
}
//#endregion
//#region node_modules/axios/lib/helpers/parseProtocol.js
function parseProtocol(url) {
	const match = /^([-+\w]{1,25}):(?:\/\/)?/.exec(url);
	return match && match[1] || "";
}
//#endregion
//#region node_modules/axios/lib/helpers/speedometer.js
/**
* Calculate data maxRate
* @param {Number} [samplesCount= 10]
* @param {Number} [min= 1000]
* @returns {Function}
*/
function speedometer(samplesCount, min) {
	samplesCount = samplesCount || 10;
	const bytes = new Array(samplesCount);
	const timestamps = new Array(samplesCount);
	let head = 0;
	let tail = 0;
	let firstSampleTS;
	min = min !== void 0 ? min : 1e3;
	return function push(chunkLength) {
		const now = Date.now();
		const startedAt = timestamps[tail];
		if (!firstSampleTS) firstSampleTS = now;
		bytes[head] = chunkLength;
		timestamps[head] = now;
		let i = tail;
		let bytesCount = 0;
		while (i !== head) {
			bytesCount += bytes[i++];
			i = i % samplesCount;
		}
		head = (head + 1) % samplesCount;
		if (head === tail) tail = (tail + 1) % samplesCount;
		if (now - firstSampleTS < min) return;
		const passed = startedAt && now - startedAt;
		return passed ? Math.round(bytesCount * 1e3 / passed) : void 0;
	};
}
//#endregion
//#region node_modules/axios/lib/helpers/throttle.js
/**
* Throttle decorator
* @param {Function} fn
* @param {Number} freq
* @return {Function}
*/
function throttle(fn, freq) {
	let timestamp = 0;
	let threshold = 1e3 / freq;
	let lastArgs;
	let timer;
	const invoke = (args, now = Date.now()) => {
		timestamp = now;
		lastArgs = null;
		if (timer) {
			clearTimeout(timer);
			timer = null;
		}
		fn(...args);
	};
	const throttled = (...args) => {
		const now = Date.now();
		const passed = now - timestamp;
		if (passed >= threshold) invoke(args, now);
		else {
			lastArgs = args;
			if (!timer) timer = setTimeout(() => {
				timer = null;
				invoke(lastArgs);
			}, threshold - passed);
		}
	};
	const flush = () => lastArgs && invoke(lastArgs);
	return [throttled, flush];
}
//#endregion
//#region node_modules/axios/lib/helpers/progressEventReducer.js
var progressEventReducer = (listener, isDownloadStream, freq = 3) => {
	let bytesNotified = 0;
	const _speedometer = speedometer(50, 250);
	return throttle((e) => {
		if (!e || typeof e.loaded !== "number") return;
		const rawLoaded = e.loaded;
		const total = e.lengthComputable ? e.total : void 0;
		const loaded = total != null ? Math.min(rawLoaded, total) : rawLoaded;
		const progressBytes = Math.max(0, loaded - bytesNotified);
		const rate = _speedometer(progressBytes);
		bytesNotified = Math.max(bytesNotified, loaded);
		listener({
			loaded,
			total,
			progress: total ? loaded / total : void 0,
			bytes: progressBytes,
			rate: rate ? rate : void 0,
			estimated: rate && total ? (total - loaded) / rate : void 0,
			event: e,
			lengthComputable: total != null,
			[isDownloadStream ? "download" : "upload"]: true
		});
	}, freq);
};
var progressEventDecorator = (total, throttled) => {
	const lengthComputable = total != null;
	return [(loaded) => throttled[0]({
		lengthComputable,
		total,
		loaded
	}), throttled[1]];
};
var asyncDecorator = (fn) => (...args) => utils_default.asap(() => fn(...args));
//#endregion
//#region node_modules/axios/lib/helpers/isURLSameOrigin.js
var isURLSameOrigin_default = platform_default.hasStandardBrowserEnv ? ((origin, isMSIE) => (url) => {
	url = new URL(url, platform_default.origin);
	return origin.protocol === url.protocol && origin.host === url.host && (isMSIE || origin.port === url.port);
})(new URL(platform_default.origin), platform_default.navigator && /(msie|trident)/i.test(platform_default.navigator.userAgent)) : () => true;
//#endregion
//#region node_modules/axios/lib/helpers/cookies.js
var cookies_default = platform_default.hasStandardBrowserEnv ? {
	write(name, value, expires, path, domain, secure, sameSite) {
		if (typeof document === "undefined") return;
		const cookie = [`${name}=${encodeURIComponent(value)}`];
		if (utils_default.isNumber(expires)) cookie.push(`expires=${new Date(expires).toUTCString()}`);
		if (utils_default.isString(path)) cookie.push(`path=${path}`);
		if (utils_default.isString(domain)) cookie.push(`domain=${domain}`);
		if (secure === true) cookie.push("secure");
		if (utils_default.isString(sameSite)) cookie.push(`SameSite=${sameSite}`);
		document.cookie = cookie.join("; ");
	},
	read(name) {
		if (typeof document === "undefined") return null;
		const cookies = document.cookie.split(";");
		for (let i = 0; i < cookies.length; i++) {
			const cookie = cookies[i].replace(/^\s+/, "");
			const eq = cookie.indexOf("=");
			if (eq !== -1 && cookie.slice(0, eq) === name) try {
				return decodeURIComponent(cookie.slice(eq + 1));
			} catch (e) {
				return cookie.slice(eq + 1);
			}
		}
		return null;
	},
	remove(name) {
		this.write(name, "", Date.now() - 864e5, "/");
	}
} : {
	write() {},
	read() {
		return null;
	},
	remove() {}
};
//#endregion
//#region node_modules/axios/lib/helpers/isAbsoluteURL.js
/**
* Determines whether the specified URL is absolute
*
* @param {string} url The URL to test
*
* @returns {boolean} True if the specified URL is absolute, otherwise false
*/
function isAbsoluteURL(url) {
	if (typeof url !== "string") return false;
	return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}
//#endregion
//#region node_modules/axios/lib/helpers/combineURLs.js
/**
* Creates a new URL by combining the specified URLs
*
* @param {string} baseURL The base URL
* @param {string} relativeURL The relative URL
*
* @returns {string} The combined URL
*/
function combineURLs(baseURL, relativeURL) {
	return relativeURL ? baseURL.replace(/\/?\/$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
}
//#endregion
//#region node_modules/axios/lib/core/buildFullPath.js
var malformedHttpProtocol = /^https?:(?!\/\/)/i;
var httpProtocolControlCharacters = /[\t\n\r]/g;
function stripLeadingC0ControlOrSpace(url) {
	let i = 0;
	while (i < url.length && url.charCodeAt(i) <= 32) i++;
	return url.slice(i);
}
function normalizeURLForProtocolCheck(url) {
	return stripLeadingC0ControlOrSpace(url).replace(httpProtocolControlCharacters, "");
}
function assertValidHttpProtocolURL(url, config) {
	if (typeof url === "string" && malformedHttpProtocol.test(normalizeURLForProtocolCheck(url))) throw new AxiosError("Invalid URL: missing \"//\" after protocol", AxiosError.ERR_INVALID_URL, config);
}
/**
* Creates a new URL by combining the baseURL with the requestedURL,
* only when the requestedURL is not already an absolute URL.
* If the requestURL is absolute, this function returns the requestedURL untouched.
*
* @param {string} baseURL The base URL
* @param {string} requestedURL Absolute or relative URL to combine
*
* @returns {string} The combined full path
*/
function buildFullPath(baseURL, requestedURL, allowAbsoluteUrls, config) {
	assertValidHttpProtocolURL(requestedURL, config);
	let isRelativeUrl = !isAbsoluteURL(requestedURL);
	if (baseURL && (isRelativeUrl || allowAbsoluteUrls === false)) {
		assertValidHttpProtocolURL(baseURL, config);
		return combineURLs(baseURL, requestedURL);
	}
	return requestedURL;
}
//#endregion
//#region node_modules/axios/lib/core/mergeConfig.js
var headersToObject = (thing) => thing instanceof AxiosHeaders ? { ...thing } : thing;
/**
* Config-specific merge-function which creates a new config-object
* by merging two configuration objects together.
*
* @param {Object} config1
* @param {Object} config2
*
* @returns {Object} New object resulting from merging config2 to config1
*/
function mergeConfig(config1, config2) {
	config1 = config1 || {};
	config2 = config2 || {};
	const config = Object.create(null);
	Object.defineProperty(config, "hasOwnProperty", {
		__proto__: null,
		value: Object.prototype.hasOwnProperty,
		enumerable: false,
		writable: true,
		configurable: true
	});
	function getMergedValue(target, source, prop, caseless) {
		if (utils_default.isPlainObject(target) && utils_default.isPlainObject(source)) return utils_default.merge.call({ caseless }, target, source);
		else if (utils_default.isPlainObject(source)) return utils_default.merge({}, source);
		else if (utils_default.isArray(source)) return source.slice();
		return source;
	}
	function mergeDeepProperties(a, b, prop, caseless) {
		if (!utils_default.isUndefined(b)) return getMergedValue(a, b, prop, caseless);
		else if (!utils_default.isUndefined(a)) return getMergedValue(void 0, a, prop, caseless);
	}
	function valueFromConfig2(a, b) {
		if (!utils_default.isUndefined(b)) return getMergedValue(void 0, b);
	}
	function defaultToConfig2(a, b) {
		if (!utils_default.isUndefined(b)) return getMergedValue(void 0, b);
		else if (!utils_default.isUndefined(a)) return getMergedValue(void 0, a);
	}
	function getMergedTransitionalOption(prop) {
		const transitional2 = utils_default.hasOwnProp(config2, "transitional") ? config2.transitional : void 0;
		if (!utils_default.isUndefined(transitional2)) if (utils_default.isPlainObject(transitional2)) {
			if (utils_default.hasOwnProp(transitional2, prop)) return transitional2[prop];
		} else return;
		const transitional1 = utils_default.hasOwnProp(config1, "transitional") ? config1.transitional : void 0;
		if (utils_default.isPlainObject(transitional1) && utils_default.hasOwnProp(transitional1, prop)) return transitional1[prop];
	}
	function mergeDirectKeys(a, b, prop) {
		if (utils_default.hasOwnProp(config2, prop)) return getMergedValue(a, b);
		else if (utils_default.hasOwnProp(config1, prop)) return getMergedValue(void 0, a);
	}
	const mergeMap = {
		url: valueFromConfig2,
		method: valueFromConfig2,
		data: valueFromConfig2,
		baseURL: defaultToConfig2,
		transformRequest: defaultToConfig2,
		transformResponse: defaultToConfig2,
		paramsSerializer: defaultToConfig2,
		timeout: defaultToConfig2,
		timeoutMessage: defaultToConfig2,
		withCredentials: defaultToConfig2,
		withXSRFToken: defaultToConfig2,
		adapter: defaultToConfig2,
		responseType: defaultToConfig2,
		xsrfCookieName: defaultToConfig2,
		xsrfHeaderName: defaultToConfig2,
		onUploadProgress: defaultToConfig2,
		onDownloadProgress: defaultToConfig2,
		decompress: defaultToConfig2,
		maxContentLength: defaultToConfig2,
		maxBodyLength: defaultToConfig2,
		beforeRedirect: defaultToConfig2,
		transport: defaultToConfig2,
		httpAgent: defaultToConfig2,
		httpsAgent: defaultToConfig2,
		cancelToken: defaultToConfig2,
		socketPath: defaultToConfig2,
		allowedSocketPaths: defaultToConfig2,
		responseEncoding: defaultToConfig2,
		validateStatus: mergeDirectKeys,
		headers: (a, b, prop) => mergeDeepProperties(headersToObject(a), headersToObject(b), prop, true)
	};
	utils_default.forEach(Object.keys({
		...config1,
		...config2
	}), function computeConfigValue(prop) {
		if (prop === "__proto__" || prop === "constructor" || prop === "prototype") return;
		const merge = utils_default.hasOwnProp(mergeMap, prop) ? mergeMap[prop] : mergeDeepProperties;
		const configValue = merge(utils_default.hasOwnProp(config1, prop) ? config1[prop] : void 0, utils_default.hasOwnProp(config2, prop) ? config2[prop] : void 0, prop);
		utils_default.isUndefined(configValue) && merge !== mergeDirectKeys || (config[prop] = configValue);
	});
	if (utils_default.hasOwnProp(config2, "validateStatus") && utils_default.isUndefined(config2.validateStatus) && getMergedTransitionalOption("validateStatusUndefinedResolves") === false) if (utils_default.hasOwnProp(config1, "validateStatus")) config.validateStatus = getMergedValue(void 0, config1.validateStatus);
	else delete config.validateStatus;
	return config;
}
//#endregion
//#region node_modules/axios/lib/helpers/resolveConfig.js
var FORM_DATA_CONTENT_HEADERS = ["content-type", "content-length"];
function setFormDataHeaders(headers, formHeaders, policy) {
	if (policy !== "content-only") {
		headers.set(formHeaders);
		return;
	}
	Object.entries(formHeaders || {}).forEach(([key, val]) => {
		if (FORM_DATA_CONTENT_HEADERS.includes(key.toLowerCase())) headers.set(key, val);
	});
}
/**
* Encode a UTF-8 string to a Latin-1 byte string for use with btoa().
* This is a modern replacement for the deprecated unescape(encodeURIComponent(str)) pattern.
*
* @param {string} str The string to encode
*
* @returns {string} UTF-8 bytes as a Latin-1 string
*/
var encodeUTF8$1 = (str) => encodeURIComponent(str).replace(/%([0-9A-F]{2})/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
function resolveConfig(config) {
	const newConfig = mergeConfig({}, config);
	const own = (key) => utils_default.hasOwnProp(newConfig, key) ? newConfig[key] : void 0;
	const data = own("data");
	let withXSRFToken = own("withXSRFToken");
	const xsrfHeaderName = own("xsrfHeaderName");
	const xsrfCookieName = own("xsrfCookieName");
	let headers = own("headers");
	const auth = own("auth");
	const baseURL = own("baseURL");
	const allowAbsoluteUrls = own("allowAbsoluteUrls");
	const url = own("url");
	newConfig.headers = headers = AxiosHeaders.from(headers);
	newConfig.url = buildURL(buildFullPath(baseURL, url, allowAbsoluteUrls, newConfig), own("params"), own("paramsSerializer"));
	if (auth) {
		const username = utils_default.getSafeProp(auth, "username") || "";
		const password = utils_default.getSafeProp(auth, "password") || "";
		try {
			headers.set("Authorization", "Basic " + btoa(username + ":" + (password ? encodeUTF8$1(password) : "")));
		} catch (e) {
			throw AxiosError.from(e, AxiosError.ERR_BAD_OPTION_VALUE, config);
		}
	}
	if (utils_default.isFormData(data)) {
		if (platform_default.hasStandardBrowserEnv || platform_default.hasStandardBrowserWebWorkerEnv || utils_default.isReactNative(data)) headers.setContentType(void 0);
		else if (utils_default.isFunction(data.getHeaders)) setFormDataHeaders(headers, data.getHeaders(), own("formDataHeaderPolicy"));
	}
	if (platform_default.hasStandardBrowserEnv) {
		if (utils_default.isFunction(withXSRFToken)) withXSRFToken = withXSRFToken(newConfig);
		if (withXSRFToken === true || withXSRFToken == null && isURLSameOrigin_default(newConfig.url)) {
			const xsrfValue = xsrfHeaderName && xsrfCookieName && cookies_default.read(xsrfCookieName);
			if (xsrfValue) headers.set(xsrfHeaderName, xsrfValue);
		}
	}
	return newConfig;
}
var xhr_default = typeof XMLHttpRequest !== "undefined" && function(config) {
	return new Promise(function dispatchXhrRequest(resolve, reject) {
		const _config = resolveConfig(config);
		let requestData = _config.data;
		const requestHeaders = AxiosHeaders.from(_config.headers).normalize();
		let { responseType, onUploadProgress, onDownloadProgress } = _config;
		let onCanceled;
		let uploadThrottled, downloadThrottled;
		let flushUpload, flushDownload;
		function done() {
			flushUpload && flushUpload();
			flushDownload && flushDownload();
			_config.cancelToken && _config.cancelToken.unsubscribe(onCanceled);
			_config.signal && _config.signal.removeEventListener("abort", onCanceled);
		}
		let request = new XMLHttpRequest();
		request.open(_config.method.toUpperCase(), _config.url, true);
		request.timeout = _config.timeout;
		function onloadend() {
			if (!request) return;
			const responseHeaders = AxiosHeaders.from("getAllResponseHeaders" in request && request.getAllResponseHeaders());
			settle(function _resolve(value) {
				resolve(value);
				done();
			}, function _reject(err) {
				reject(err);
				done();
			}, {
				data: !responseType || responseType === "text" || responseType === "json" ? request.responseText : request.response,
				status: request.status,
				statusText: request.statusText,
				headers: responseHeaders,
				config,
				request
			});
			request = null;
		}
		if ("onloadend" in request) request.onloadend = onloadend;
		else request.onreadystatechange = function handleLoad() {
			if (!request || request.readyState !== 4) return;
			if (request.status === 0 && !(request.responseURL && request.responseURL.startsWith("file:"))) return;
			setTimeout(onloadend);
		};
		request.onabort = function handleAbort() {
			if (!request) return;
			reject(new AxiosError("Request aborted", AxiosError.ECONNABORTED, config, request));
			done();
			request = null;
		};
		request.onerror = function handleError(event) {
			const err = new AxiosError(event && event.message ? event.message : "Network Error", AxiosError.ERR_NETWORK, config, request);
			err.event = event || null;
			reject(err);
			done();
			request = null;
		};
		request.ontimeout = function handleTimeout() {
			let timeoutErrorMessage = _config.timeout ? "timeout of " + _config.timeout + "ms exceeded" : "timeout exceeded";
			const transitional = _config.transitional || transitional_default;
			if (_config.timeoutErrorMessage) timeoutErrorMessage = _config.timeoutErrorMessage;
			reject(new AxiosError(timeoutErrorMessage, transitional.clarifyTimeoutError ? AxiosError.ETIMEDOUT : AxiosError.ECONNABORTED, config, request));
			done();
			request = null;
		};
		requestData === void 0 && requestHeaders.setContentType(null);
		if ("setRequestHeader" in request) utils_default.forEach(toByteStringHeaderObject(requestHeaders), function setRequestHeader(val, key) {
			request.setRequestHeader(key, val);
		});
		if (!utils_default.isUndefined(_config.withCredentials)) request.withCredentials = !!_config.withCredentials;
		if (responseType && responseType !== "json") request.responseType = _config.responseType;
		if (onDownloadProgress) {
			[downloadThrottled, flushDownload] = progressEventReducer(onDownloadProgress, true);
			request.addEventListener("progress", downloadThrottled);
		}
		if (onUploadProgress && request.upload) {
			[uploadThrottled, flushUpload] = progressEventReducer(onUploadProgress);
			request.upload.addEventListener("progress", uploadThrottled);
			request.upload.addEventListener("loadend", flushUpload);
		}
		if (_config.cancelToken || _config.signal) {
			onCanceled = (cancel) => {
				if (!request) return;
				reject(!cancel || cancel.type ? new CanceledError(null, config, request) : cancel);
				request.abort();
				done();
				request = null;
			};
			_config.cancelToken && _config.cancelToken.subscribe(onCanceled);
			if (_config.signal) _config.signal.aborted ? onCanceled() : _config.signal.addEventListener("abort", onCanceled);
		}
		const protocol = parseProtocol(_config.url);
		if (protocol && !platform_default.protocols.includes(protocol)) {
			reject(new AxiosError("Unsupported protocol " + protocol + ":", AxiosError.ERR_BAD_REQUEST, config));
			done();
			return;
		}
		request.send(requestData || null);
	});
};
//#endregion
//#region node_modules/axios/lib/helpers/composeSignals.js
var composeSignals = (signals, timeout) => {
	signals = signals ? signals.filter(Boolean) : [];
	if (!timeout && !signals.length) return;
	const controller = new AbortController();
	let aborted = false;
	const onabort = function(reason) {
		if (!aborted) {
			aborted = true;
			unsubscribe();
			const err = reason instanceof Error ? reason : this.reason;
			controller.abort(err instanceof AxiosError ? err : new CanceledError(err instanceof Error ? err.message : err));
		}
	};
	let timer = timeout && setTimeout(() => {
		timer = null;
		onabort(new AxiosError(`timeout of ${timeout}ms exceeded`, AxiosError.ETIMEDOUT));
	}, timeout);
	const unsubscribe = () => {
		if (!signals) return;
		timer && clearTimeout(timer);
		timer = null;
		signals.forEach((signal) => {
			signal.unsubscribe ? signal.unsubscribe(onabort) : signal.removeEventListener("abort", onabort);
		});
		signals = null;
	};
	signals.forEach((signal) => signal.addEventListener("abort", onabort, { once: true }));
	const { signal } = controller;
	signal.unsubscribe = () => utils_default.asap(unsubscribe);
	return signal;
};
//#endregion
//#region node_modules/axios/lib/helpers/trackStream.js
var streamChunk = function* (chunk, chunkSize) {
	let len = chunk.byteLength;
	if (!chunkSize || len < chunkSize) {
		yield chunk;
		return;
	}
	let pos = 0;
	let end;
	while (pos < len) {
		end = pos + chunkSize;
		yield chunk.slice(pos, end);
		pos = end;
	}
};
var readBytes = async function* (iterable, chunkSize) {
	for await (const chunk of readStream(iterable)) yield* streamChunk(chunk, chunkSize);
};
var readStream = async function* (stream) {
	if (stream[Symbol.asyncIterator]) {
		yield* stream;
		return;
	}
	const reader = stream.getReader();
	try {
		for (;;) {
			const { done, value } = await reader.read();
			if (done) break;
			yield value;
		}
	} finally {
		await reader.cancel();
	}
};
var trackStream = (stream, chunkSize, onProgress, onFinish) => {
	const iterator = readBytes(stream, chunkSize);
	let bytes = 0;
	let done;
	let _onFinish = (e) => {
		if (!done) {
			done = true;
			onFinish && onFinish(e);
		}
	};
	return new ReadableStream({
		async pull(controller) {
			try {
				const { done, value } = await iterator.next();
				if (done) {
					_onFinish();
					controller.close();
					return;
				}
				let len = value.byteLength;
				if (onProgress) onProgress(bytes += len);
				controller.enqueue(new Uint8Array(value));
			} catch (err) {
				_onFinish(err);
				throw err;
			}
		},
		cancel(reason) {
			_onFinish(reason);
			return iterator.return();
		}
	}, { highWaterMark: 2 });
};
//#endregion
//#region node_modules/axios/lib/helpers/estimateDataURLDecodedBytes.js
/**
* Estimate decoded byte length of a data:// URL *without* allocating large buffers.
* - For base64: compute exact decoded size using length and padding;
*               handle %XX at the character-count level (no string allocation).
* - For non-base64: compute the exact percent-decoded UTF-8 byte length.
*
* @param {string} url
* @returns {number}
*/
var isHexDigit = (charCode) => charCode >= 48 && charCode <= 57 || charCode >= 65 && charCode <= 70 || charCode >= 97 && charCode <= 102;
var isPercentEncodedByte = (str, i, len) => i + 2 < len && isHexDigit(str.charCodeAt(i + 1)) && isHexDigit(str.charCodeAt(i + 2));
function estimateDataURLDecodedBytes(url) {
	if (!url || typeof url !== "string") return 0;
	if (!url.startsWith("data:")) return 0;
	const comma = url.indexOf(",");
	if (comma < 0) return 0;
	const meta = url.slice(5, comma);
	const body = url.slice(comma + 1);
	if (/;base64/i.test(meta)) {
		let effectiveLen = body.length;
		const len = body.length;
		for (let i = 0; i < len; i++) if (body.charCodeAt(i) === 37 && i + 2 < len) {
			const a = body.charCodeAt(i + 1);
			const b = body.charCodeAt(i + 2);
			if (isHexDigit(a) && isHexDigit(b)) {
				effectiveLen -= 2;
				i += 2;
			}
		}
		let pad = 0;
		let idx = len - 1;
		const tailIsPct3D = (j) => j >= 2 && body.charCodeAt(j - 2) === 37 && body.charCodeAt(j - 1) === 51 && (body.charCodeAt(j) === 68 || body.charCodeAt(j) === 100);
		if (idx >= 0) {
			if (body.charCodeAt(idx) === 61) {
				pad++;
				idx--;
			} else if (tailIsPct3D(idx)) {
				pad++;
				idx -= 3;
			}
		}
		if (pad === 1 && idx >= 0) {
			if (body.charCodeAt(idx) === 61) pad++;
			else if (tailIsPct3D(idx)) pad++;
		}
		const bytes = Math.floor(effectiveLen / 4) * 3 - (pad || 0);
		return bytes > 0 ? bytes : 0;
	}
	let bytes = 0;
	for (let i = 0, len = body.length; i < len; i++) {
		const c = body.charCodeAt(i);
		if (c === 37 && isPercentEncodedByte(body, i, len)) {
			bytes += 1;
			i += 2;
		} else if (c < 128) bytes += 1;
		else if (c < 2048) bytes += 2;
		else if (c >= 55296 && c <= 56319 && i + 1 < len) {
			const next = body.charCodeAt(i + 1);
			if (next >= 56320 && next <= 57343) {
				bytes += 4;
				i++;
			} else bytes += 3;
		} else bytes += 3;
	}
	return bytes;
}
//#endregion
//#region node_modules/axios/lib/env/data.js
var VERSION = "1.18.1";
//#endregion
//#region node_modules/axios/lib/adapters/fetch.js
var DEFAULT_CHUNK_SIZE = 64 * 1024;
var { isFunction } = utils_default;
/**
* Encode a UTF-8 string to a Latin-1 byte string for use with btoa().
* This is a modern replacement for the deprecated unescape(encodeURIComponent(str)) pattern.
*
* @param {string} str The string to encode
*
* @returns {string} UTF-8 bytes as a Latin-1 string
*/
var encodeUTF8 = (str) => encodeURIComponent(str).replace(/%([0-9A-F]{2})/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
var decodeURIComponentSafe = (value) => {
	if (!utils_default.isString(value)) return value;
	try {
		return decodeURIComponent(value);
	} catch (error) {
		return value;
	}
};
var test = (fn, ...args) => {
	try {
		return !!fn(...args);
	} catch (e) {
		return false;
	}
};
var maybeWithAuthCredentials = (url) => {
	const protocolIndex = url.indexOf("://");
	let urlToCheck = url;
	if (protocolIndex !== -1) urlToCheck = urlToCheck.slice(protocolIndex + 3);
	return urlToCheck.includes("@") || urlToCheck.includes(":");
};
var factory = (env) => {
	const globalObject = utils_default.global !== void 0 && utils_default.global !== null ? utils_default.global : globalThis;
	const { ReadableStream, TextEncoder } = globalObject;
	env = utils_default.merge.call({ skipUndefined: true }, {
		Request: globalObject.Request,
		Response: globalObject.Response
	}, env);
	const { fetch: envFetch, Request, Response } = env;
	const isFetchSupported = envFetch ? isFunction(envFetch) : typeof fetch === "function";
	const isRequestSupported = isFunction(Request);
	const isResponseSupported = isFunction(Response);
	if (!isFetchSupported) return false;
	const isReadableStreamSupported = isFetchSupported && isFunction(ReadableStream);
	const encodeText = isFetchSupported && (typeof TextEncoder === "function" ? ((encoder) => (str) => encoder.encode(str))(new TextEncoder()) : async (str) => new Uint8Array(await new Request(str).arrayBuffer()));
	const supportsRequestStream = isRequestSupported && isReadableStreamSupported && test(() => {
		let duplexAccessed = false;
		const request = new Request(platform_default.origin, {
			body: new ReadableStream(),
			method: "POST",
			get duplex() {
				duplexAccessed = true;
				return "half";
			}
		});
		const hasContentType = request.headers.has("Content-Type");
		if (request.body != null) request.body.cancel();
		return duplexAccessed && !hasContentType;
	});
	const supportsResponseStream = isResponseSupported && isReadableStreamSupported && test(() => utils_default.isReadableStream(new Response("").body));
	const resolvers = { stream: supportsResponseStream && ((res) => res.body) };
	isFetchSupported && (() => {
		[
			"text",
			"arrayBuffer",
			"blob",
			"formData",
			"stream"
		].forEach((type) => {
			!resolvers[type] && (resolvers[type] = (res, config) => {
				let method = res && res[type];
				if (method) return method.call(res);
				throw new AxiosError(`Response type '${type}' is not supported`, AxiosError.ERR_NOT_SUPPORT, config);
			});
		});
	})();
	const getBodyLength = async (body) => {
		if (body == null) return 0;
		if (utils_default.isBlob(body)) return body.size;
		if (utils_default.isSpecCompliantForm(body)) return (await new Request(platform_default.origin, {
			method: "POST",
			body
		}).arrayBuffer()).byteLength;
		if (utils_default.isArrayBufferView(body) || utils_default.isArrayBuffer(body)) return body.byteLength;
		if (utils_default.isURLSearchParams(body)) body = body + "";
		if (utils_default.isString(body)) return (await encodeText(body)).byteLength;
	};
	const resolveBodyLength = async (headers, body) => {
		const length = utils_default.toFiniteNumber(headers.getContentLength());
		return length == null ? getBodyLength(body) : length;
	};
	return async (config) => {
		let { url, method, data, signal, cancelToken, timeout, onDownloadProgress, onUploadProgress, responseType, headers, withCredentials = "same-origin", fetchOptions, maxContentLength, maxBodyLength } = resolveConfig(config);
		const hasMaxContentLength = utils_default.isNumber(maxContentLength) && maxContentLength > -1;
		const hasMaxBodyLength = utils_default.isNumber(maxBodyLength) && maxBodyLength > -1;
		const own = (key) => utils_default.hasOwnProp(config, key) ? config[key] : void 0;
		let _fetch = envFetch || fetch;
		responseType = responseType ? (responseType + "").toLowerCase() : "text";
		let composedSignal = composeSignals([signal, cancelToken && cancelToken.toAbortSignal()], timeout);
		let request = null;
		const unsubscribe = composedSignal && composedSignal.unsubscribe && (() => {
			composedSignal.unsubscribe();
		});
		let requestContentLength;
		let pendingBodyError = null;
		const maxBodyLengthError = () => new AxiosError("Request body larger than maxBodyLength limit", AxiosError.ERR_BAD_REQUEST, config, request);
		try {
			let auth = void 0;
			const configAuth = own("auth");
			if (configAuth) auth = {
				username: utils_default.getSafeProp(configAuth, "username") || "",
				password: utils_default.getSafeProp(configAuth, "password") || ""
			};
			if (maybeWithAuthCredentials(url)) {
				const parsedURL = new URL(url, platform_default.origin);
				if (!auth && (parsedURL.username || parsedURL.password)) auth = {
					username: decodeURIComponentSafe(parsedURL.username),
					password: decodeURIComponentSafe(parsedURL.password)
				};
				if (parsedURL.username || parsedURL.password) {
					parsedURL.username = "";
					parsedURL.password = "";
					url = parsedURL.href;
				}
			}
			if (auth) {
				headers.delete("authorization");
				headers.set("Authorization", "Basic " + btoa(encodeUTF8((auth.username || "") + ":" + (auth.password || ""))));
			}
			if (hasMaxContentLength && typeof url === "string" && url.startsWith("data:")) {
				if (estimateDataURLDecodedBytes(url) > maxContentLength) throw new AxiosError("maxContentLength size of " + maxContentLength + " exceeded", AxiosError.ERR_BAD_RESPONSE, config, request);
			}
			if (hasMaxBodyLength && method !== "get" && method !== "head") {
				const outboundLength = await getBodyLength(data);
				if (typeof outboundLength === "number" && isFinite(outboundLength)) {
					requestContentLength = outboundLength;
					if (outboundLength > maxBodyLength) throw maxBodyLengthError();
				}
			}
			const mustEnforceStreamBody = hasMaxBodyLength && (utils_default.isReadableStream(data) || utils_default.isStream(data));
			const trackRequestStream = (stream, onProgress, flush) => trackStream(stream, DEFAULT_CHUNK_SIZE, (loadedBytes) => {
				if (hasMaxBodyLength && loadedBytes > maxBodyLength) throw pendingBodyError = maxBodyLengthError();
				onProgress && onProgress(loadedBytes);
			}, flush);
			if (supportsRequestStream && method !== "get" && method !== "head" && (onUploadProgress || mustEnforceStreamBody)) {
				requestContentLength = requestContentLength == null ? await resolveBodyLength(headers, data) : requestContentLength;
				if (requestContentLength !== 0 || mustEnforceStreamBody) {
					let _request = new Request(url, {
						method: "POST",
						body: data,
						duplex: "half"
					});
					let contentTypeHeader;
					if (utils_default.isFormData(data) && (contentTypeHeader = _request.headers.get("content-type"))) headers.setContentType(contentTypeHeader);
					if (_request.body) {
						const [onProgress, flush] = onUploadProgress && progressEventDecorator(requestContentLength, progressEventReducer(asyncDecorator(onUploadProgress))) || [];
						data = trackRequestStream(_request.body, onProgress, flush);
					}
				}
			} else if (mustEnforceStreamBody && !isRequestSupported && isReadableStreamSupported && method !== "get" && method !== "head") data = trackRequestStream(data);
			else if (mustEnforceStreamBody && isRequestSupported && !supportsRequestStream && method !== "get" && method !== "head") throw new AxiosError("Stream request bodies are not supported by the current fetch implementation", AxiosError.ERR_NOT_SUPPORT, config, request);
			if (!utils_default.isString(withCredentials)) withCredentials = withCredentials ? "include" : "omit";
			const isCredentialsSupported = isRequestSupported && "credentials" in Request.prototype;
			if (utils_default.isFormData(data)) {
				const contentType = headers.getContentType();
				if (contentType && /^multipart\/form-data/i.test(contentType) && !/boundary=/i.test(contentType)) headers.delete("content-type");
			}
			headers.set("User-Agent", "axios/" + VERSION, false);
			const resolvedOptions = {
				...fetchOptions,
				signal: composedSignal,
				method: method.toUpperCase(),
				headers: toByteStringHeaderObject(headers.normalize()),
				body: data,
				duplex: "half",
				credentials: isCredentialsSupported ? withCredentials : void 0
			};
			request = isRequestSupported && new Request(url, resolvedOptions);
			let response = await (isRequestSupported ? _fetch(request, fetchOptions) : _fetch(url, resolvedOptions));
			const responseHeaders = AxiosHeaders.from(response.headers);
			if (hasMaxContentLength) {
				const declaredLength = utils_default.toFiniteNumber(responseHeaders.getContentLength());
				if (declaredLength != null && declaredLength > maxContentLength) throw new AxiosError("maxContentLength size of " + maxContentLength + " exceeded", AxiosError.ERR_BAD_RESPONSE, config, request);
			}
			const isStreamResponse = supportsResponseStream && (responseType === "stream" || responseType === "response");
			if (supportsResponseStream && response.body && (onDownloadProgress || hasMaxContentLength || isStreamResponse && unsubscribe)) {
				const options = {};
				[
					"status",
					"statusText",
					"headers"
				].forEach((prop) => {
					options[prop] = response[prop];
				});
				const responseContentLength = utils_default.toFiniteNumber(responseHeaders.getContentLength());
				const [onProgress, flush] = onDownloadProgress && progressEventDecorator(responseContentLength, progressEventReducer(asyncDecorator(onDownloadProgress), true)) || [];
				let bytesRead = 0;
				const onChunkProgress = (loadedBytes) => {
					if (hasMaxContentLength) {
						bytesRead = loadedBytes;
						if (bytesRead > maxContentLength) throw new AxiosError("maxContentLength size of " + maxContentLength + " exceeded", AxiosError.ERR_BAD_RESPONSE, config, request);
					}
					onProgress && onProgress(loadedBytes);
				};
				response = new Response(trackStream(response.body, DEFAULT_CHUNK_SIZE, onChunkProgress, () => {
					flush && flush();
					unsubscribe && unsubscribe();
				}), options);
			}
			responseType = responseType || "text";
			let responseData = await resolvers[utils_default.findKey(resolvers, responseType) || "text"](response, config);
			if (hasMaxContentLength && !supportsResponseStream && !isStreamResponse) {
				let materializedSize;
				if (responseData != null) {
					if (typeof responseData.byteLength === "number") materializedSize = responseData.byteLength;
					else if (typeof responseData.size === "number") materializedSize = responseData.size;
					else if (typeof responseData === "string") materializedSize = typeof TextEncoder === "function" ? new TextEncoder().encode(responseData).byteLength : responseData.length;
				}
				if (typeof materializedSize === "number" && materializedSize > maxContentLength) throw new AxiosError("maxContentLength size of " + maxContentLength + " exceeded", AxiosError.ERR_BAD_RESPONSE, config, request);
			}
			!isStreamResponse && unsubscribe && unsubscribe();
			return await new Promise((resolve, reject) => {
				settle(resolve, reject, {
					data: responseData,
					headers: AxiosHeaders.from(response.headers),
					status: response.status,
					statusText: response.statusText,
					config,
					request
				});
			});
		} catch (err) {
			unsubscribe && unsubscribe();
			if (composedSignal && composedSignal.aborted && composedSignal.reason instanceof AxiosError) {
				const canceledError = composedSignal.reason;
				canceledError.config = config;
				request && (canceledError.request = request);
				if (err !== canceledError) Object.defineProperty(canceledError, "cause", {
					__proto__: null,
					value: err,
					writable: true,
					enumerable: false,
					configurable: true
				});
				throw canceledError;
			}
			if (pendingBodyError) {
				request && !pendingBodyError.request && (pendingBodyError.request = request);
				throw pendingBodyError;
			}
			if (err instanceof AxiosError) {
				request && !err.request && (err.request = request);
				throw err;
			}
			if (err && err.name === "TypeError" && /Load failed|fetch/i.test(err.message)) {
				const networkError = new AxiosError("Network Error", AxiosError.ERR_NETWORK, config, request, err && err.response);
				Object.defineProperty(networkError, "cause", {
					__proto__: null,
					value: err.cause || err,
					writable: true,
					enumerable: false,
					configurable: true
				});
				throw networkError;
			}
			throw AxiosError.from(err, err && err.code, config, request, err && err.response);
		}
	};
};
var seedCache = /* @__PURE__ */ new Map();
var getFetch = (config) => {
	let env = config && config.env || {};
	const { fetch, Request, Response } = env;
	const seeds = [
		Request,
		Response,
		fetch
	];
	let i = seeds.length, seed, target, map = seedCache;
	while (i--) {
		seed = seeds[i];
		target = map.get(seed);
		target === void 0 && map.set(seed, target = i ? /* @__PURE__ */ new Map() : factory(env));
		map = target;
	}
	return target;
};
getFetch();
//#endregion
//#region node_modules/axios/lib/adapters/adapters.js
/**
* Known adapters mapping.
* Provides environment-specific adapters for Axios:
* - `http` for Node.js
* - `xhr` for browsers
* - `fetch` for fetch API-based requests
*
* @type {Object<string, Function|Object>}
*/
var knownAdapters = {
	http: null,
	xhr: xhr_default,
	fetch: { get: getFetch }
};
utils_default.forEach(knownAdapters, (fn, value) => {
	if (fn) {
		try {
			Object.defineProperty(fn, "name", {
				__proto__: null,
				value
			});
		} catch (e) {}
		Object.defineProperty(fn, "adapterName", {
			__proto__: null,
			value
		});
	}
});
/**
* Render a rejection reason string for unknown or unsupported adapters
*
* @param {string} reason
* @returns {string}
*/
var renderReason = (reason) => `- ${reason}`;
/**
* Check if the adapter is resolved (function, null, or false)
*
* @param {Function|null|false} adapter
* @returns {boolean}
*/
var isResolvedHandle = (adapter) => utils_default.isFunction(adapter) || adapter === null || adapter === false;
/**
* Get the first suitable adapter from the provided list.
* Tries each adapter in order until a supported one is found.
* Throws an AxiosError if no adapter is suitable.
*
* @param {Array<string|Function>|string|Function} adapters - Adapter(s) by name or function.
* @param {Object} config - Axios request configuration
* @throws {AxiosError} If no suitable adapter is available
* @returns {Function} The resolved adapter function
*/
function getAdapter(adapters, config) {
	adapters = utils_default.isArray(adapters) ? adapters : [adapters];
	const { length } = adapters;
	let nameOrAdapter;
	let adapter;
	const rejectedReasons = {};
	for (let i = 0; i < length; i++) {
		nameOrAdapter = adapters[i];
		let id;
		adapter = nameOrAdapter;
		if (!isResolvedHandle(nameOrAdapter)) {
			adapter = knownAdapters[(id = String(nameOrAdapter)).toLowerCase()];
			if (adapter === void 0) throw new AxiosError(`Unknown adapter '${id}'`);
		}
		if (adapter && (utils_default.isFunction(adapter) || (adapter = adapter.get(config)))) break;
		rejectedReasons[id || "#" + i] = adapter;
	}
	if (!adapter) {
		const reasons = Object.entries(rejectedReasons).map(([id, state]) => `adapter ${id} ` + (state === false ? "is not supported by the environment" : "is not available in the build"));
		throw new AxiosError(`There is no suitable adapter to dispatch the request ` + (length ? reasons.length > 1 ? "since :\n" + reasons.map(renderReason).join("\n") : " " + renderReason(reasons[0]) : "as no adapter specified"), AxiosError.ERR_NOT_SUPPORT);
	}
	return adapter;
}
/**
* Exports Axios adapters and utility to resolve an adapter
*/
var adapters_default = {
	/**
	* Resolve an adapter from a list of adapter names or functions.
	* @type {Function}
	*/
	getAdapter,
	/**
	* Exposes all known adapters
	* @type {Object<string, Function|Object>}
	*/
	adapters: knownAdapters
};
//#endregion
//#region node_modules/axios/lib/core/dispatchRequest.js
/**
* Throws a `CanceledError` if cancellation has been requested.
*
* @param {Object} config The config that is to be used for the request
*
* @returns {void}
*/
function throwIfCancellationRequested(config) {
	if (config.cancelToken) config.cancelToken.throwIfRequested();
	if (config.signal && config.signal.aborted) throw new CanceledError(null, config);
}
/**
* Dispatch a request to the server using the configured adapter.
*
* @param {object} config The config that is to be used for the request
*
* @returns {Promise} The Promise to be fulfilled
*/
function dispatchRequest(config) {
	throwIfCancellationRequested(config);
	config.headers = AxiosHeaders.from(config.headers);
	config.data = transformData.call(config, config.transformRequest);
	if ([
		"post",
		"put",
		"patch"
	].indexOf(config.method) !== -1) config.headers.setContentType("application/x-www-form-urlencoded", false);
	return adapters_default.getAdapter(config.adapter || defaults.adapter, config)(config).then(function onAdapterResolution(response) {
		throwIfCancellationRequested(config);
		config.response = response;
		try {
			response.data = transformData.call(config, config.transformResponse, response);
		} finally {
			delete config.response;
		}
		response.headers = AxiosHeaders.from(response.headers);
		return response;
	}, function onAdapterRejection(reason) {
		if (!isCancel(reason)) {
			throwIfCancellationRequested(config);
			if (reason && reason.response) {
				config.response = reason.response;
				try {
					reason.response.data = transformData.call(config, config.transformResponse, reason.response);
				} finally {
					delete config.response;
				}
				reason.response.headers = AxiosHeaders.from(reason.response.headers);
			}
		}
		return Promise.reject(reason);
	});
}
//#endregion
//#region node_modules/axios/lib/helpers/validator.js
var validators$1 = {};
[
	"object",
	"boolean",
	"number",
	"function",
	"string",
	"symbol"
].forEach((type, i) => {
	validators$1[type] = function validator(thing) {
		return typeof thing === type || "a" + (i < 1 ? "n " : " ") + type;
	};
});
var deprecatedWarnings = {};
/**
* Transitional option validator
*
* @param {function|boolean?} validator - set to false if the transitional option has been removed
* @param {string?} version - deprecated version / removed since version
* @param {string?} message - some message with additional info
*
* @returns {function}
*/
validators$1.transitional = function transitional(validator, version, message) {
	function formatMessage(opt, desc) {
		return "[Axios v" + VERSION + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
	}
	return (value, opt, opts) => {
		if (validator === false) throw new AxiosError(formatMessage(opt, " has been removed" + (version ? " in " + version : "")), AxiosError.ERR_DEPRECATED);
		if (version && !deprecatedWarnings[opt]) {
			deprecatedWarnings[opt] = true;
			console.warn(formatMessage(opt, " has been deprecated since v" + version + " and will be removed in the near future"));
		}
		return validator ? validator(value, opt, opts) : true;
	};
};
validators$1.spelling = function spelling(correctSpelling) {
	return (value, opt) => {
		console.warn(`${opt} is likely a misspelling of ${correctSpelling}`);
		return true;
	};
};
/**
* Assert object's properties type
*
* @param {object} options
* @param {object} schema
* @param {boolean?} allowUnknown
*
* @returns {object}
*/
function assertOptions(options, schema, allowUnknown) {
	if (typeof options !== "object" || options === null) throw new AxiosError("options must be an object", AxiosError.ERR_BAD_OPTION_VALUE);
	const keys = Object.keys(options);
	let i = keys.length;
	while (i-- > 0) {
		const opt = keys[i];
		const validator = Object.prototype.hasOwnProperty.call(schema, opt) ? schema[opt] : void 0;
		if (validator) {
			const value = options[opt];
			const result = value === void 0 || validator(value, opt, options);
			if (result !== true) throw new AxiosError("option " + opt + " must be " + result, AxiosError.ERR_BAD_OPTION_VALUE);
			continue;
		}
		if (allowUnknown !== true) throw new AxiosError("Unknown option " + opt, AxiosError.ERR_BAD_OPTION);
	}
}
var validator_default = {
	assertOptions,
	validators: validators$1
};
//#endregion
//#region node_modules/axios/lib/core/Axios.js
var validators = validator_default.validators;
/**
* Create a new instance of Axios
*
* @param {Object} instanceConfig The default config for the instance
*
* @return {Axios} A new instance of Axios
*/
var Axios = class {
	constructor(instanceConfig) {
		this.defaults = instanceConfig || {};
		this.interceptors = {
			request: new InterceptorManager(),
			response: new InterceptorManager()
		};
	}
	/**
	* Dispatch a request
	*
	* @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
	* @param {?Object} config
	*
	* @returns {Promise} The Promise to be fulfilled
	*/
	async request(configOrUrl, config) {
		try {
			return await this._request(configOrUrl, config);
		} catch (err) {
			if (err instanceof Error) {
				let dummy = {};
				Error.captureStackTrace ? Error.captureStackTrace(dummy) : dummy = /* @__PURE__ */ new Error();
				const stack = (() => {
					if (!dummy.stack) return "";
					const firstNewlineIndex = dummy.stack.indexOf("\n");
					return firstNewlineIndex === -1 ? "" : dummy.stack.slice(firstNewlineIndex + 1);
				})();
				try {
					if (!err.stack) err.stack = stack;
					else if (stack) {
						const firstNewlineIndex = stack.indexOf("\n");
						const secondNewlineIndex = firstNewlineIndex === -1 ? -1 : stack.indexOf("\n", firstNewlineIndex + 1);
						const stackWithoutTwoTopLines = secondNewlineIndex === -1 ? "" : stack.slice(secondNewlineIndex + 1);
						if (!String(err.stack).endsWith(stackWithoutTwoTopLines)) err.stack += "\n" + stack;
					}
				} catch (e) {}
			}
			throw err;
		}
	}
	_request(configOrUrl, config) {
		if (typeof configOrUrl === "string") {
			config = config || {};
			config.url = configOrUrl;
		} else config = configOrUrl || {};
		config = mergeConfig(this.defaults, config);
		const { transitional, paramsSerializer, headers } = config;
		if (transitional !== void 0) validator_default.assertOptions(transitional, {
			silentJSONParsing: validators.transitional(validators.boolean),
			forcedJSONParsing: validators.transitional(validators.boolean),
			clarifyTimeoutError: validators.transitional(validators.boolean),
			legacyInterceptorReqResOrdering: validators.transitional(validators.boolean),
			advertiseZstdAcceptEncoding: validators.transitional(validators.boolean),
			validateStatusUndefinedResolves: validators.transitional(validators.boolean)
		}, false);
		if (paramsSerializer != null) if (utils_default.isFunction(paramsSerializer)) config.paramsSerializer = { serialize: paramsSerializer };
		else validator_default.assertOptions(paramsSerializer, {
			encode: validators.function,
			serialize: validators.function
		}, true);
		if (config.allowAbsoluteUrls !== void 0) {} else if (this.defaults.allowAbsoluteUrls !== void 0) config.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls;
		else config.allowAbsoluteUrls = true;
		validator_default.assertOptions(config, {
			baseUrl: validators.spelling("baseURL"),
			withXsrfToken: validators.spelling("withXSRFToken")
		}, true);
		config.method = (config.method || this.defaults.method || "get").toLowerCase();
		let contextHeaders = headers && utils_default.merge(headers.common, headers[config.method]);
		headers && utils_default.forEach([
			"delete",
			"get",
			"head",
			"post",
			"put",
			"patch",
			"query",
			"common"
		], (method) => {
			delete headers[method];
		});
		config.headers = AxiosHeaders.concat(contextHeaders, headers);
		const requestInterceptorChain = [];
		let synchronousRequestInterceptors = true;
		this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
			if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) return;
			synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
			const transitional = config.transitional || transitional_default;
			if (transitional && transitional.legacyInterceptorReqResOrdering) requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
			else requestInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
		});
		const responseInterceptorChain = [];
		this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
			responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
		});
		let promise;
		let i = 0;
		let len;
		if (!synchronousRequestInterceptors) {
			const chain = [dispatchRequest.bind(this), void 0];
			chain.unshift(...requestInterceptorChain);
			chain.push(...responseInterceptorChain);
			len = chain.length;
			promise = Promise.resolve(config);
			while (i < len) promise = promise.then(chain[i++], chain[i++]);
			return promise;
		}
		len = requestInterceptorChain.length;
		let newConfig = config;
		while (i < len) {
			const onFulfilled = requestInterceptorChain[i++];
			const onRejected = requestInterceptorChain[i++];
			try {
				newConfig = onFulfilled(newConfig);
			} catch (error) {
				onRejected.call(this, error);
				break;
			}
		}
		try {
			promise = dispatchRequest.call(this, newConfig);
		} catch (error) {
			return Promise.reject(error);
		}
		i = 0;
		len = responseInterceptorChain.length;
		while (i < len) promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
		return promise;
	}
	getUri(config) {
		config = mergeConfig(this.defaults, config);
		return buildURL(buildFullPath(config.baseURL, config.url, config.allowAbsoluteUrls, config), config.params, config.paramsSerializer);
	}
};
utils_default.forEach([
	"delete",
	"get",
	"head",
	"options"
], function forEachMethodNoData(method) {
	Axios.prototype[method] = function(url, config) {
		return this.request(mergeConfig(config || {}, {
			method,
			url,
			data: config && utils_default.hasOwnProp(config, "data") ? config.data : void 0
		}));
	};
});
utils_default.forEach([
	"post",
	"put",
	"patch",
	"query"
], function forEachMethodWithData(method) {
	function generateHTTPMethod(isForm) {
		return function httpMethod(url, data, config) {
			return this.request(mergeConfig(config || {}, {
				method,
				headers: isForm ? { "Content-Type": "multipart/form-data" } : {},
				url,
				data
			}));
		};
	}
	Axios.prototype[method] = generateHTTPMethod();
	if (method !== "query") Axios.prototype[method + "Form"] = generateHTTPMethod(true);
});
//#endregion
//#region node_modules/axios/lib/cancel/CancelToken.js
/**
* A `CancelToken` is an object that can be used to request cancellation of an operation.
*
* @param {Function} executor The executor function.
*
* @returns {CancelToken}
*/
var CancelToken = class CancelToken {
	constructor(executor) {
		if (typeof executor !== "function") throw new TypeError("executor must be a function.");
		let resolvePromise;
		this.promise = new Promise(function promiseExecutor(resolve) {
			resolvePromise = resolve;
		});
		const token = this;
		this.promise.then((cancel) => {
			if (!token._listeners) return;
			let i = token._listeners.length;
			while (i-- > 0) token._listeners[i](cancel);
			token._listeners = null;
		});
		this.promise.then = (onfulfilled) => {
			let _resolve;
			const promise = new Promise((resolve) => {
				token.subscribe(resolve);
				_resolve = resolve;
			}).then(onfulfilled);
			promise.cancel = function reject() {
				token.unsubscribe(_resolve);
			};
			return promise;
		};
		executor(function cancel(message, config, request) {
			if (token.reason) return;
			token.reason = new CanceledError(message, config, request);
			resolvePromise(token.reason);
		});
	}
	/**
	* Throws a `CanceledError` if cancellation has been requested.
	*/
	throwIfRequested() {
		if (this.reason) throw this.reason;
	}
	/**
	* Subscribe to the cancel signal
	*/
	subscribe(listener) {
		if (this.reason) {
			listener(this.reason);
			return;
		}
		if (this._listeners) this._listeners.push(listener);
		else this._listeners = [listener];
	}
	/**
	* Unsubscribe from the cancel signal
	*/
	unsubscribe(listener) {
		if (!this._listeners) return;
		const index = this._listeners.indexOf(listener);
		if (index !== -1) this._listeners.splice(index, 1);
	}
	toAbortSignal() {
		const controller = new AbortController();
		const abort = (err) => {
			controller.abort(err);
		};
		this.subscribe(abort);
		controller.signal.unsubscribe = () => this.unsubscribe(abort);
		return controller.signal;
	}
	/**
	* Returns an object that contains a new `CancelToken` and a function that, when called,
	* cancels the `CancelToken`.
	*/
	static source() {
		let cancel;
		return {
			token: new CancelToken(function executor(c) {
				cancel = c;
			}),
			cancel
		};
	}
};
//#endregion
//#region node_modules/axios/lib/helpers/spread.js
/**
* Syntactic sugar for invoking a function and expanding an array for arguments.
*
* Common use case would be to use `Function.prototype.apply`.
*
*  ```js
*  function f(x, y, z) {}
*  const args = [1, 2, 3];
*  f.apply(null, args);
*  ```
*
* With `spread` this example can be re-written.
*
*  ```js
*  spread(function(x, y, z) {})([1, 2, 3]);
*  ```
*
* @param {Function} callback
*
* @returns {Function}
*/
function spread(callback) {
	return function wrap(arr) {
		return callback.apply(null, arr);
	};
}
//#endregion
//#region node_modules/axios/lib/helpers/isAxiosError.js
/**
* Determines whether the payload is an error thrown by Axios
*
* @param {*} payload The value to test
*
* @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
*/
function isAxiosError(payload) {
	return utils_default.isObject(payload) && payload.isAxiosError === true;
}
//#endregion
//#region node_modules/axios/lib/helpers/HttpStatusCode.js
var HttpStatusCode = {
	Continue: 100,
	SwitchingProtocols: 101,
	Processing: 102,
	EarlyHints: 103,
	Ok: 200,
	Created: 201,
	Accepted: 202,
	NonAuthoritativeInformation: 203,
	NoContent: 204,
	ResetContent: 205,
	PartialContent: 206,
	MultiStatus: 207,
	AlreadyReported: 208,
	ImUsed: 226,
	MultipleChoices: 300,
	MovedPermanently: 301,
	Found: 302,
	SeeOther: 303,
	NotModified: 304,
	UseProxy: 305,
	Unused: 306,
	TemporaryRedirect: 307,
	PermanentRedirect: 308,
	BadRequest: 400,
	Unauthorized: 401,
	PaymentRequired: 402,
	Forbidden: 403,
	NotFound: 404,
	MethodNotAllowed: 405,
	NotAcceptable: 406,
	ProxyAuthenticationRequired: 407,
	RequestTimeout: 408,
	Conflict: 409,
	Gone: 410,
	LengthRequired: 411,
	PreconditionFailed: 412,
	PayloadTooLarge: 413,
	UriTooLong: 414,
	UnsupportedMediaType: 415,
	RangeNotSatisfiable: 416,
	ExpectationFailed: 417,
	ImATeapot: 418,
	MisdirectedRequest: 421,
	UnprocessableEntity: 422,
	Locked: 423,
	FailedDependency: 424,
	TooEarly: 425,
	UpgradeRequired: 426,
	PreconditionRequired: 428,
	TooManyRequests: 429,
	RequestHeaderFieldsTooLarge: 431,
	UnavailableForLegalReasons: 451,
	InternalServerError: 500,
	NotImplemented: 501,
	BadGateway: 502,
	ServiceUnavailable: 503,
	GatewayTimeout: 504,
	HttpVersionNotSupported: 505,
	VariantAlsoNegotiates: 506,
	InsufficientStorage: 507,
	LoopDetected: 508,
	NotExtended: 510,
	NetworkAuthenticationRequired: 511,
	WebServerIsDown: 521,
	ConnectionTimedOut: 522,
	OriginIsUnreachable: 523,
	TimeoutOccurred: 524,
	SslHandshakeFailed: 525,
	InvalidSslCertificate: 526
};
Object.entries(HttpStatusCode).forEach(([key, value]) => {
	HttpStatusCode[value] = key;
});
//#endregion
//#region node_modules/axios/lib/axios.js
/**
* Create an instance of Axios
*
* @param {Object} defaultConfig The default config for the instance
*
* @returns {Axios} A new instance of Axios
*/
function createInstance(defaultConfig) {
	const context = new Axios(defaultConfig);
	const instance = bind(Axios.prototype.request, context);
	utils_default.extend(instance, Axios.prototype, context, { allOwnKeys: true });
	utils_default.extend(instance, context, null, { allOwnKeys: true });
	instance.create = function create(instanceConfig) {
		return createInstance(mergeConfig(defaultConfig, instanceConfig));
	};
	return instance;
}
var axios = createInstance(defaults);
axios.Axios = Axios;
axios.CanceledError = CanceledError;
axios.CancelToken = CancelToken;
axios.isCancel = isCancel;
axios.VERSION = VERSION;
axios.toFormData = toFormData;
axios.AxiosError = AxiosError;
axios.Cancel = axios.CanceledError;
axios.all = function all(promises) {
	return Promise.all(promises);
};
axios.spread = spread;
axios.isAxiosError = isAxiosError;
axios.mergeConfig = mergeConfig;
axios.AxiosHeaders = AxiosHeaders;
axios.formToJSON = (thing) => formDataToJSON(utils_default.isHTMLForm(thing) ? new FormData(thing) : thing);
axios.getAdapter = adapters_default.getAdapter;
axios.HttpStatusCode = HttpStatusCode;
axios.default = axios;
//#endregion
//#region src/services/api.ts
var API_URL = "http://localhost:3005";
if (typeof window !== "undefined") {
	const hostname = window.location.hostname;
	if (Capacitor.isNativePlatform()) if (Capacitor.getPlatform() === "android") API_URL = "http://192.168.1.13:3005";
	else API_URL = "http://localhost:3005";
	else if (hostname && hostname !== "localhost" && hostname !== "127.0.0.1") API_URL = `http://${hostname}:3005`;
}
var api = axios.create({
	baseURL: `${API_URL}/api`,
	timeout: 15e3,
	headers: { "Content-Type": "application/json" }
});
api.interceptors.response.use((response) => response, (error) => {
	if (!(error.config?.url?.includes("/health") || error.config?.url?.includes("health")) && (!error.response || error.response.status >= 500)) console.warn("❌ Error API:", error.message);
	return Promise.reject(error);
});
//#endregion
//#region src/services/sync.ts
/**
* Motor de sincronización offline-online
*
* Detecta cambios pendientes en la BD local, los envía al servidor,
* y descarga datos actualizados del servidor a la BD local.
*/
var SyncService = class {
	constructor() {
		_defineProperty(this, "isSyncing", false);
	}
	/**
	* Ejecuta la sincronización completa:
	* 1. Sube cambios pendientes al servidor
	* 2. Descarga datos actualizados del servidor
	*/
	async fullSync(onProgress) {
		if (this.isSyncing) return {
			totalChanges: 0,
			syncedChanges: 0,
			failedChanges: 0,
			message: "Sincronización ya en progreso"
		};
		this.isSyncing = true;
		try {
			const pendientes = await databaseService.getCambiosPendientes();
			if (pendientes.length === 0) {
				await this.pullFromServer();
				return {
					totalChanges: 0,
					syncedChanges: 0,
					failedChanges: 0,
					message: "Sin cambios pendientes. Datos actualizados."
				};
			}
			const total = pendientes.length;
			let synced = 0;
			try {
				const response = await api.post("/sync", { cambios: pendientes.map((p) => ({
					usuario_id: p.usuario_id,
					campo: p.campo,
					valor: p.valor,
					fecha_creacion: p.fecha_creacion
				})) });
				if (response.data.results) synced = response.data.results.filter((r) => r.success).length;
				await databaseService.marcarSincronizados();
				if (onProgress) onProgress(synced, total);
			} catch (error) {
				console.error("Error enviando cambios:", error);
			}
			await this.pullFromServer();
			return {
				totalChanges: total,
				syncedChanges: synced,
				failedChanges: total - synced,
				message: `Sincronización completada: ${synced}/${total} cambios`
			};
		} finally {
			this.isSyncing = false;
		}
	}
	/**
	* Descarga todos los usuarios y sus datos actuales del servidor
	* y los guarda en la BD local.
	*/
	async pullFromServer() {
		try {
			const usersResponse = await api.get("/usuarios");
			await databaseService.saveUsuarios(usersResponse.data);
			const allDataResponse = await api.get("/sync/pull-all");
			for (const item of allDataResponse.data) if (item.datos && item.datos.length > 0) {
				const historialItems = item.datos.map((d) => ({
					id: d.id,
					usuario_id: item.usuario.id,
					campo: d.campo,
					valor: d.valor,
					version: d.version,
					es_actual: d.es_actual,
					origen: d.origen,
					fecha_creacion: d.fecha_creacion,
					fecha_ultima_activacion: d.fecha_ultima_activacion,
					veces_reutilizado: d.veces_reutilizado
				}));
				await databaseService.saveHistorialLocal(historialItems);
			}
		} catch (error) {
			console.error("Error en pull desde servidor:", error);
			throw error;
		}
	}
	/**
	* Verifica si hay cambios pendientes
	*/
	async hasPendingChanges() {
		return await databaseService.contarPendientes() > 0;
	}
	get syncing() {
		return this.isSyncing;
	}
};
var syncService = new SyncService();
//#endregion
//#region src/stores/network.ts
var useNetworkStore = defineStore("network", () => {
	const isOnline = ref(true);
	const isSyncing = ref(false);
	const pendingChanges = ref(0);
	const lastSyncDate = ref(null);
	const syncProgress = ref({
		current: 0,
		total: 0
	});
	const syncMessage = ref("");
	async function setOnline(status) {
		const wasOffline = !isOnline.value;
		isOnline.value = status;
		if (status && wasOffline) {
			Notify_default.create({
				type: "positive",
				message: "🟢 Conexión restablecida",
				position: "top",
				timeout: 2500,
				icon: "wifi"
			});
			if (await databaseService.contarPendientes() === 0) try {
				isSyncing.value = true;
				await syncService.pullFromServer();
				setSyncCompleted("Datos actualizados");
				Notify_default.create({
					type: "info",
					message: "✅ Datos actualizados desde el servidor",
					position: "top",
					timeout: 2e3
				});
			} catch (error) {
				console.error("Error al actualizar datos tras reconectar:", error);
				isSyncing.value = false;
			}
		} else if (!status && !wasOffline) Notify_default.create({
			type: "negative",
			message: "🔴 Sin conexión",
			caption: "Trabajando en modo offline",
			position: "top",
			timeout: 3e3,
			icon: "wifi_off"
		});
	}
	function setSyncing(status) {
		isSyncing.value = status;
		if (!status) syncProgress.value = {
			current: 0,
			total: 0
		};
	}
	function updatePendingCount(count) {
		pendingChanges.value = count;
	}
	function updateSyncProgress(current, total) {
		syncProgress.value = {
			current,
			total
		};
	}
	function setSyncCompleted(message) {
		lastSyncDate.value = (/* @__PURE__ */ new Date()).toISOString();
		syncMessage.value = message;
		isSyncing.value = false;
		pendingChanges.value = 0;
		syncProgress.value = {
			current: 0,
			total: 0
		};
	}
	return {
		isOnline,
		isSyncing,
		pendingChanges,
		lastSyncDate,
		syncProgress,
		syncMessage,
		setOnline,
		setSyncing,
		updatePendingCount,
		updateSyncProgress,
		setSyncCompleted
	};
});
//#endregion
export { noop$1 as $, useSize as A, layoutKey as B, QAvatar_default as C, hMergeSlotSafely as D, hMergeSlot as E, isDeepEqual as F, History_default as G, tabsKey as H, isObject$1 as I, debounce as J, isKeyCode as K, isRegexp as L, createChildApp as M, install_quasar_default as N, hSlot as O, isDate$1 as P, listenOpts as Q, emptyRenderFn as R, useSpinnerProps as S, hDir as T, Plugin as U, pageContainerKey as V, Plugin$1 as W, cleanEvt as X, addEvt as Y, getEventPath as Z, childHasFocus as _, Notify_default as a, createDirective as at, QSpinner_default as b, QBtn_default as c, client as ct, getParentProxy as d, Transition as dt, position as et, vmHasRouter as f, TransitionGroup as ft, Ripple_default as g, __exportAll as gt, useAlignProps as h, withModifiers as ht, api as i, createComponent as it, useSizeProps as j, hUniqueSlot as k, useRouterLink as l, isRuntimeSsrPreHydration as lt, useAlign as m, withKeys as mt, syncService as n, stop as nt, createGlobalNode as o, createReactivePlugin as ot, vmIsDestroyed as p, createApp as pt, shouldIgnoreKey as q, API_URL as r, stopAndPrevent as rt, removeGlobalNode as s, Platform as st, useNetworkStore as t, prevent as tt, useRouterLinkProps as u, injectProp as ut, css as v, QIcon_default as w, useSpinner as x, getElement as y, formKey as z };

//# sourceMappingURL=network-Dbb0uhtP.js.map