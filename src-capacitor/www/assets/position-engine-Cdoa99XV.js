import { K as isKeyCode, Q as listenOpts, X as cleanEvt, Y as addEvt, ct as client, st as Platform, tt as prevent } from "./network-Dbb0uhtP.js";
import { C as nextTick, E as onBeforeUnmount, G as ref, k as onMounted, y as getCurrentInstance, z as watch } from "./pinia-3_kWn-gx.js";
import { S as getScrollbarWidth, k as portalProxyList } from "./index-C6i8igny.js";
//#region node_modules/quasar/src/utils/private.selection/selection.js
function clearSelection() {
	if (window.getSelection !== void 0) {
		const selection = window.getSelection();
		if (selection.empty !== void 0) selection.empty();
		else if (selection.removeAllRanges !== void 0) {
			selection.removeAllRanges();
			if (!Platform.is.mobile) selection.addRange(document.createRange());
		}
	} else if (document.selection !== void 0) document.selection.empty();
}
//#endregion
//#region node_modules/quasar/src/composables/private.use-anchor/use-anchor.js
var useAnchorStaticProps = {
	target: {
		type: [
			Boolean,
			String,
			Element
		],
		default: true
	},
	noParentEvent: Boolean
};
var useAnchorProps = {
	...useAnchorStaticProps,
	contextMenu: Boolean
};
function useAnchor({ showing, avoidEmit, configureAnchorEl }) {
	const { props, proxy, emit } = getCurrentInstance();
	const anchorEl = ref(null);
	let touchTimer = null;
	function canShow(evt) {
		return anchorEl.value === null ? false : evt === void 0 || evt.touches === void 0 || evt.touches.length <= 1;
	}
	const anchorEvents = {};
	if (configureAnchorEl === void 0) {
		Object.assign(anchorEvents, {
			hide(evt) {
				proxy.hide(evt);
			},
			toggle(evt) {
				proxy.toggle(evt);
				evt.qAnchorHandled = true;
			},
			toggleKey(evt) {
				if (isKeyCode(evt, 13)) anchorEvents.toggle(evt);
			},
			contextClick(evt) {
				proxy.hide(evt);
				prevent(evt);
				nextTick(() => {
					proxy.show(evt);
					evt.qAnchorHandled = true;
				});
			},
			prevent,
			mobileTouch(evt) {
				anchorEvents.mobileCleanup(evt);
				if (!canShow(evt)) return;
				proxy.hide(evt);
				anchorEl.value.classList.add("non-selectable");
				const target = evt.target;
				addEvt(anchorEvents, "anchor", [
					[
						target,
						"touchmove",
						"mobileCleanup",
						"passive"
					],
					[
						target,
						"touchend",
						"mobileCleanup",
						"passive"
					],
					[
						target,
						"touchcancel",
						"mobileCleanup",
						"passive"
					],
					[
						anchorEl.value,
						"contextmenu",
						"prevent",
						"notPassive"
					]
				]);
				touchTimer = setTimeout(() => {
					touchTimer = null;
					proxy.show(evt);
					evt.qAnchorHandled = true;
				}, 300);
			},
			mobileCleanup(evt) {
				anchorEl.value.classList.remove("non-selectable");
				if (touchTimer !== null) {
					clearTimeout(touchTimer);
					touchTimer = null;
				}
				if (showing.value && evt !== void 0) clearSelection();
			}
		});
		configureAnchorEl = function configureAnchorElFn(context = props.contextMenu) {
			if (props.noParentEvent || anchorEl.value === null) return;
			const evts = context ? proxy.$q.platform.is.mobile ? [[
				anchorEl.value,
				"touchstart",
				"mobileTouch",
				"passive"
			]] : [[
				anchorEl.value,
				"mousedown",
				"hide",
				"passive"
			], [
				anchorEl.value,
				"contextmenu",
				"contextClick",
				"notPassive"
			]] : [[
				anchorEl.value,
				"click",
				"toggle",
				"passive"
			], [
				anchorEl.value,
				"keyup",
				"toggleKey",
				"passive"
			]];
			addEvt(anchorEvents, "anchor", evts);
		};
	}
	function unconfigureAnchorEl() {
		cleanEvt(anchorEvents, "anchor");
	}
	function setAnchorEl(el) {
		anchorEl.value = el;
		while (anchorEl.value.classList.contains("q-anchor--skip")) anchorEl.value = anchorEl.value.parentNode;
		configureAnchorEl();
	}
	function pickAnchorEl() {
		if (props.target === false || props.target === "" || proxy.$el.parentNode === null) anchorEl.value = null;
		else if (props.target === true) setAnchorEl(proxy.$el.parentNode);
		else {
			let el = props.target;
			if (typeof props.target === "string") try {
				el = document.querySelector(props.target);
			} catch {
				el = void 0;
			}
			if (el !== void 0 && el !== null) {
				anchorEl.value = el.$el || el;
				configureAnchorEl();
			} else {
				anchorEl.value = null;
				console.error(`Anchor: target "${props.target}" not found`);
			}
		}
	}
	watch(() => props.contextMenu, (val) => {
		if (anchorEl.value !== null) {
			unconfigureAnchorEl();
			configureAnchorEl(val);
		}
	});
	watch(() => props.target, () => {
		if (anchorEl.value !== null) unconfigureAnchorEl();
		pickAnchorEl();
	});
	watch(() => props.noParentEvent, (val) => {
		if (anchorEl.value !== null) if (val) unconfigureAnchorEl();
		else configureAnchorEl();
	});
	onMounted(() => {
		pickAnchorEl();
		if (!avoidEmit && props.modelValue && anchorEl.value === null) emit("update:modelValue", false);
	});
	onBeforeUnmount(() => {
		if (touchTimer !== null) clearTimeout(touchTimer);
		unconfigureAnchorEl();
	});
	return {
		anchorEl,
		canShow,
		anchorEvents
	};
}
//#endregion
//#region node_modules/quasar/src/composables/private.use-scroll-target/use-scroll-target.js
function useScrollTarget(props, configureScrollTarget) {
	const localScrollTarget = ref(null);
	let scrollFn;
	function changeScrollEvent(scrollTarget, fn) {
		const fnProp = `${fn !== void 0 ? "add" : "remove"}EventListener`;
		const fnHandler = fn !== void 0 ? fn : scrollFn;
		if (scrollTarget !== window) scrollTarget[fnProp]("scroll", fnHandler, listenOpts.passive);
		window[fnProp]("scroll", fnHandler, listenOpts.passive);
		scrollFn = fn;
	}
	function unconfigureScrollTarget() {
		if (localScrollTarget.value !== null) {
			changeScrollEvent(localScrollTarget.value);
			localScrollTarget.value = null;
		}
	}
	onBeforeUnmount(watch(() => props.noParentEvent, () => {
		if (localScrollTarget.value !== null) {
			unconfigureScrollTarget();
			configureScrollTarget();
		}
	}));
	return {
		localScrollTarget,
		unconfigureScrollTarget,
		changeScrollEvent
	};
}
//#endregion
//#region node_modules/quasar/src/utils/private.click-outside/click-outside.js
var timer = null;
var { notPassiveCapture } = listenOpts, registeredList = [];
function globalHandler(evt) {
	if (timer !== null) {
		clearTimeout(timer);
		timer = null;
	}
	const target = evt.target;
	if (target === void 0 || target.nodeType === 8 || target.classList.contains("no-pointer-events")) return;
	let portalIndex = portalProxyList.length - 1;
	while (portalIndex >= 0) {
		const proxy = portalProxyList[portalIndex].$;
		if (proxy.type.name === "QTooltip") {
			portalIndex--;
			continue;
		}
		if (proxy.type.name !== "QDialog") break;
		if (!proxy.props.seamless) return;
		portalIndex--;
	}
	for (let i = registeredList.length - 1; i >= 0; i--) {
		const state = registeredList[i];
		if ((state.anchorEl.value === null || !state.anchorEl.value.contains(target)) && (target === document.body || state.innerRef.value !== null && !state.innerRef.value.contains(target))) {
			evt.qClickOutside = true;
			state.onClickOutside(evt);
		} else return;
	}
}
function addClickOutside(clickOutsideProps) {
	registeredList.push(clickOutsideProps);
	if (registeredList.length === 1) {
		document.addEventListener("mousedown", globalHandler, notPassiveCapture);
		document.addEventListener("touchstart", globalHandler, notPassiveCapture);
	}
}
function removeClickOutside(clickOutsideProps) {
	const index = registeredList.indexOf(clickOutsideProps);
	if (index !== -1) {
		registeredList.splice(index, 1);
		if (registeredList.length === 0) {
			if (timer !== null) {
				clearTimeout(timer);
				timer = null;
			}
			document.removeEventListener("mousedown", globalHandler, notPassiveCapture);
			document.removeEventListener("touchstart", globalHandler, notPassiveCapture);
		}
	}
}
//#endregion
//#region node_modules/quasar/src/utils/private.position-engine/position-engine.js
var vpLeft, vpTop;
var partsFirst = [
	"top",
	"center",
	"bottom"
], partsSecond = [
	"left",
	"middle",
	"right",
	"start",
	"end"
];
function validatePosition(pos) {
	const parts = pos.split(" ");
	if (parts.length !== 2) return false;
	if (!partsFirst.includes(parts[0])) {
		console.error("Anchor/Self position must start with one of top/center/bottom");
		return false;
	}
	if (!partsSecond.includes(parts[1])) {
		console.error("Anchor/Self position must end with one of left/middle/right/start/end");
		return false;
	}
	return true;
}
function validateOffset(val) {
	if (!val) return true;
	if (val.length !== 2) return false;
	if (typeof val[0] !== "number" || typeof val[1] !== "number") return false;
	return true;
}
var horizontalPos = {
	"start#ltr": "left",
	"start#rtl": "right",
	"end#ltr": "right",
	"end#rtl": "left"
};
[
	"left",
	"middle",
	"right"
].forEach((pos) => {
	horizontalPos[`${pos}#ltr`] = pos;
	horizontalPos[`${pos}#rtl`] = pos;
});
function parsePosition(pos, rtl) {
	const parts = pos.split(" ");
	return {
		vertical: parts[0],
		horizontal: horizontalPos[`${parts[1]}#${rtl ? "rtl" : "ltr"}`]
	};
}
function getAnchorProps(el, offset) {
	let { top, left, right, bottom, width, height } = el.getBoundingClientRect();
	if (offset !== void 0) {
		top -= offset[1];
		left -= offset[0];
		bottom += offset[1];
		right += offset[0];
		width += offset[0];
		height += offset[1];
	}
	return {
		top,
		bottom,
		height,
		left,
		right,
		width,
		middle: left + (right - left) / 2,
		center: top + (bottom - top) / 2
	};
}
function getAbsoluteAnchorProps(el, absoluteOffset, offset) {
	let { top, left } = el.getBoundingClientRect();
	top += absoluteOffset.top;
	left += absoluteOffset.left;
	if (offset !== void 0) {
		top += offset[1];
		left += offset[0];
	}
	return {
		top,
		bottom: top + 1,
		height: 1,
		left,
		right: left + 1,
		width: 1,
		middle: left,
		center: top
	};
}
function getTargetProps(width, height) {
	return {
		top: 0,
		center: height / 2,
		bottom: height,
		left: 0,
		middle: width / 2,
		right: width
	};
}
function getTopLeftProps(anchorProps, targetProps, anchorOrigin, selfOrigin) {
	return {
		top: anchorProps[anchorOrigin.vertical] - targetProps[selfOrigin.vertical],
		left: anchorProps[anchorOrigin.horizontal] - targetProps[selfOrigin.horizontal]
	};
}
function setPosition(cfg, retryNumber = 0) {
	if (cfg.targetEl === null || cfg.anchorEl === null || retryNumber > 5) return;
	if (cfg.targetEl.offsetHeight === 0 || cfg.targetEl.offsetWidth === 0) {
		setTimeout(() => {
			setPosition(cfg, retryNumber + 1);
		}, 10);
		return;
	}
	const { targetEl, offset, anchorEl, anchorOrigin, selfOrigin, absoluteOffset, fit, cover, maxHeight, maxWidth } = cfg;
	if (client.is.ios && window.visualViewport !== void 0) {
		const el = document.body.style;
		const { offsetLeft: left, offsetTop: top } = window.visualViewport;
		if (left !== vpLeft) {
			el.setProperty("--q-pe-left", left + "px");
			vpLeft = left;
		}
		if (top !== vpTop) {
			el.setProperty("--q-pe-top", top + "px");
			vpTop = top;
		}
	}
	const { scrollLeft, scrollTop } = targetEl;
	const anchorProps = absoluteOffset === void 0 ? getAnchorProps(anchorEl, cover ? [0, 0] : offset) : getAbsoluteAnchorProps(anchorEl, absoluteOffset, offset);
	/**
	* We "reset" the critical CSS properties
	* so we can take an accurate measurement.
	*
	* Ensure that targetEl has a max-width & max-height
	* set in CSS and that the value does NOT exceeds 100vw/vh.
	* All users of the position-engine (currently QMenu & QTooltip)
	* have CSS for this.
	*/
	Object.assign(targetEl.style, {
		top: 0,
		left: 0,
		minWidth: null,
		minHeight: null,
		maxWidth,
		maxHeight,
		visibility: "visible"
	});
	const { offsetWidth: origElWidth, offsetHeight: origElHeight } = targetEl;
	const { elWidth, elHeight } = fit || cover ? {
		elWidth: Math.max(anchorProps.width, origElWidth),
		elHeight: cover ? Math.max(anchorProps.height, origElHeight) : origElHeight
	} : {
		elWidth: origElWidth,
		elHeight: origElHeight
	};
	let elStyle = {
		maxWidth,
		maxHeight
	};
	if (fit || cover) {
		elStyle.minWidth = anchorProps.width + "px";
		if (cover) elStyle.minHeight = anchorProps.height + "px";
	}
	Object.assign(targetEl.style, elStyle);
	const targetProps = getTargetProps(elWidth, elHeight);
	let props = getTopLeftProps(anchorProps, targetProps, anchorOrigin, selfOrigin);
	if (absoluteOffset === void 0 || offset === void 0) applyBoundaries(props, anchorProps, targetProps, anchorOrigin, selfOrigin);
	else {
		const { top, left } = props;
		applyBoundaries(props, anchorProps, targetProps, anchorOrigin, selfOrigin);
		let hasChanged = false;
		if (props.top !== top) {
			hasChanged = true;
			const offsetY = 2 * offset[1];
			anchorProps.center = anchorProps.top -= offsetY;
			anchorProps.bottom -= offsetY + 2;
		}
		if (props.left !== left) {
			hasChanged = true;
			const offsetX = 2 * offset[0];
			anchorProps.middle = anchorProps.left -= offsetX;
			anchorProps.right -= offsetX + 2;
		}
		if (hasChanged) {
			props = getTopLeftProps(anchorProps, targetProps, anchorOrigin, selfOrigin);
			applyBoundaries(props, anchorProps, targetProps, anchorOrigin, selfOrigin);
		}
	}
	elStyle = {
		top: props.top + "px",
		left: props.left + "px"
	};
	if (props.maxHeight !== void 0) {
		elStyle.maxHeight = props.maxHeight + "px";
		if (anchorProps.height > props.maxHeight) elStyle.minHeight = elStyle.maxHeight;
	}
	if (props.maxWidth !== void 0) {
		elStyle.maxWidth = props.maxWidth + "px";
		if (anchorProps.width > props.maxWidth) elStyle.minWidth = elStyle.maxWidth;
	}
	Object.assign(targetEl.style, elStyle);
	if (targetEl.scrollTop !== scrollTop) targetEl.scrollTop = scrollTop;
	if (targetEl.scrollLeft !== scrollLeft) targetEl.scrollLeft = scrollLeft;
}
function applyBoundaries(props, anchorProps, targetProps, anchorOrigin, selfOrigin) {
	const currentHeight = targetProps.bottom, currentWidth = targetProps.right, margin = getScrollbarWidth(), innerHeight = window.innerHeight - margin, innerWidth = document.body.clientWidth;
	if (props.top < 0 || props.top + currentHeight > innerHeight) if (selfOrigin.vertical === "center") {
		props.top = anchorProps[anchorOrigin.vertical] > innerHeight / 2 ? Math.max(0, innerHeight - currentHeight) : 0;
		props.maxHeight = Math.min(currentHeight, innerHeight);
	} else if (anchorProps[anchorOrigin.vertical] > innerHeight / 2) {
		const anchorY = Math.min(innerHeight, anchorOrigin.vertical === "center" ? anchorProps.center : anchorOrigin.vertical === selfOrigin.vertical ? anchorProps.bottom : anchorProps.top);
		props.maxHeight = Math.min(currentHeight, anchorY);
		props.top = Math.max(0, anchorY - currentHeight);
	} else {
		props.top = Math.max(0, anchorOrigin.vertical === "center" ? anchorProps.center : anchorOrigin.vertical === selfOrigin.vertical ? anchorProps.top : anchorProps.bottom);
		props.maxHeight = Math.min(currentHeight, innerHeight - props.top);
	}
	if (props.left < 0 || props.left + currentWidth > innerWidth) {
		props.maxWidth = Math.min(currentWidth, innerWidth);
		if (selfOrigin.horizontal === "middle") props.left = anchorProps[anchorOrigin.horizontal] > innerWidth / 2 ? Math.max(0, innerWidth - currentWidth) : 0;
		else if (anchorProps[anchorOrigin.horizontal] > innerWidth / 2) {
			const anchorX = Math.min(innerWidth, anchorOrigin.horizontal === "middle" ? anchorProps.middle : anchorOrigin.horizontal === selfOrigin.horizontal ? anchorProps.right : anchorProps.left);
			props.maxWidth = Math.min(currentWidth, anchorX);
			props.left = Math.max(0, anchorX - props.maxWidth);
		} else {
			props.left = Math.max(0, anchorOrigin.horizontal === "middle" ? anchorProps.middle : anchorOrigin.horizontal === selfOrigin.horizontal ? anchorProps.left : anchorProps.right);
			props.maxWidth = Math.min(currentWidth, innerWidth - props.left);
		}
	}
}
//#endregion
export { addClickOutside as a, useAnchor as c, clearSelection as d, validatePosition as i, useAnchorProps as l, setPosition as n, removeClickOutside as o, validateOffset as r, useScrollTarget as s, parsePosition as t, useAnchorStaticProps as u };

//# sourceMappingURL=position-engine-Cdoa99XV.js.map