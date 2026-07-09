import { $ as noop, E as hMergeSlot, F as isDeepEqual, J as debounce, K as isKeyCode, O as hSlot, _ as childHasFocus, c as QBtn_default, dt as Transition, et as position, i as api, it as createComponent, k as hUniqueSlot, l as useRouterLink, nt as stop, q as shouldIgnoreKey, rt as stopAndPrevent, t as useNetworkStore, tt as prevent, u as useRouterLinkProps, w as QIcon_default } from "./network-Dbb0uhtP.js";
import { C as nextTick, D as onBeforeUpdate, E as onBeforeUnmount, G as ref, M as openBlock, O as onDeactivated, P as renderList, T as onBeforeMount, V as withCtx, _ as createVNode, d as createBlock, f as createCommentVNode, g as createTextVNode, j as onUpdated, k as onMounted, l as computed, lt as normalizeClass, o as Fragment, p as createElementBlock, u as createBaseVNode, ut as toDisplayString, v as defineComponent, w as onActivated, x as h, y as getCurrentInstance, z as watch } from "./pinia-3_kWn-gx.js";
import { c as useTimeout, d as useRoute, f as useRouter, n as useDarkProps, p as _plugin_vue_export_helper_default, r as addFocusFn, s as useTick, t as useDark } from "./use-dark-DPLXRKW0.js";
import { t as databaseService } from "./database-DoILKR0-.js";
import { A as useTransition, E as closePortalMenus, M as useModelToggle, N as useModelToggleEmits, P as useModelToggleProps, T as usePortal, _ as removeFocusout, a as fieldValueIsFilled, c as useFieldProps, g as addFocusout, h as QDialog_default, i as useFormProps, j as useTransitionProps, l as useFieldState, n as useKeyComposition, o as useField, r as useFormInputNameAttr, s as useFieldEmits, v as addEscapeKey, w as scrollTargetProp, x as getScrollTarget, y as removeEscapeKey } from "./index-C6i8igny.js";
import { t as QChip_default } from "./QChip-Bx6UGqzI.js";
import { a as addClickOutside, c as useAnchor, i as validatePosition, l as useAnchorProps, n as setPosition, o as removeClickOutside, r as validateOffset, s as useScrollTarget, t as parsePosition } from "./position-engine-Cdoa99XV.js";
import { t as QSpinnerDots_default } from "./QSpinnerDots-BlrGZuFe.js";
import { t as QPage_default } from "./QPage-BYBG-CUN.js";
import { t as rtlHasScrollBug } from "./rtl-BP7sjZXh.js";
//#region node_modules/quasar/src/components/field/QField.js
var QField_default = createComponent({
	name: "QField",
	inheritAttrs: false,
	props: {
		...useFieldProps,
		tag: {
			type: String,
			default: "label"
		}
	},
	emits: useFieldEmits,
	setup() {
		return useField(useFieldState({ tagProp: true }));
	}
});
//#endregion
//#region node_modules/quasar/src/components/item/QItem.js
var QItem_default = createComponent({
	name: "QItem",
	props: {
		...useDarkProps,
		...useRouterLinkProps,
		tag: {
			type: String,
			default: "div"
		},
		active: {
			type: Boolean,
			default: null
		},
		clickable: Boolean,
		dense: Boolean,
		insetLevel: Number,
		tabindex: [String, Number],
		focused: Boolean,
		manualFocus: Boolean
	},
	emits: ["click", "keyup"],
	setup(props, { slots, emit }) {
		const { proxy: { $q } } = getCurrentInstance();
		const isDark = useDark(props, $q);
		const { hasLink, linkAttrs, linkClass, linkTag, navigateOnClick } = useRouterLink();
		const rootRef = ref(null);
		const blurTargetRef = ref(null);
		const isActionable = computed(() => props.clickable || hasLink.value || props.tag === "label");
		const isClickable = computed(() => !props.disable && isActionable.value);
		const classes = computed(() => "q-item q-item-type row no-wrap" + (props.dense ? " q-item--dense" : "") + (isDark.value ? " q-item--dark" : "") + (hasLink.value && props.active === null ? linkClass.value : props.active ? ` q-item--active${props.activeClass !== void 0 ? ` ${props.activeClass}` : ""}` : "") + (props.disable ? " disabled" : "") + (isClickable.value ? " q-item--clickable q-link cursor-pointer " + (props.manualFocus ? "q-manual-focusable" : "q-focusable q-hoverable") + (props.focused ? " q-manual-focusable--focused" : "") : ""));
		const style = computed(() => {
			if (props.insetLevel === void 0) return null;
			return { ["padding" + ($q.lang.rtl ? "Right" : "Left")]: 16 + props.insetLevel * 56 + "px" };
		});
		function onClick(e) {
			if (isClickable.value) {
				if (blurTargetRef.value !== null && !e.qAvoidFocus) {
					if (!e.qKeyEvent && document.activeElement === rootRef.value) blurTargetRef.value.focus();
					else if (document.activeElement === blurTargetRef.value) rootRef.value.focus();
				}
				navigateOnClick(e);
			}
		}
		function onKeyup(e) {
			if (isClickable.value && isKeyCode(e, [13, 32])) {
				stopAndPrevent(e);
				e.qKeyEvent = true;
				const evt = new MouseEvent("click", e);
				evt.qKeyEvent = true;
				rootRef.value.dispatchEvent(evt);
			}
			emit("keyup", e);
		}
		function getContent() {
			const child = hUniqueSlot(slots.default, []);
			if (isClickable.value) child.unshift(h("div", {
				class: "q-focus-helper",
				tabindex: -1,
				ref: blurTargetRef
			}));
			return child;
		}
		return () => {
			const data = {
				ref: rootRef,
				class: classes.value,
				style: style.value,
				role: "listitem",
				onClick,
				onKeyup
			};
			if (isClickable.value) {
				data.tabindex = props.tabindex || "0";
				Object.assign(data, linkAttrs.value);
			} else if (isActionable.value) data["aria-disabled"] = "true";
			return h(linkTag.value, data, getContent());
		};
	}
});
//#endregion
//#region node_modules/quasar/src/components/item/QItemSection.js
var QItemSection_default = createComponent({
	name: "QItemSection",
	props: {
		avatar: Boolean,
		thumbnail: Boolean,
		side: Boolean,
		top: Boolean,
		noWrap: Boolean
	},
	setup(props, { slots }) {
		const classes = computed(() => `q-item__section column q-item__section--${props.avatar || props.side || props.thumbnail ? "side" : "main"}` + (props.top ? " q-item__section--top justify-start" : " justify-center") + (props.avatar ? " q-item__section--avatar" : "") + (props.thumbnail ? " q-item__section--thumbnail" : "") + (props.noWrap ? " q-item__section--nowrap" : ""));
		return () => h("div", { class: classes.value }, hSlot(slots.default));
	}
});
//#endregion
//#region node_modules/quasar/src/components/item/QItemLabel.js
var QItemLabel_default = createComponent({
	name: "QItemLabel",
	props: {
		overline: Boolean,
		caption: Boolean,
		header: Boolean,
		lines: [Number, String]
	},
	setup(props, { slots }) {
		const parsedLines = computed(() => Number.parseInt(props.lines, 10));
		const classes = computed(() => "q-item__label" + (props.overline ? " q-item__label--overline text-overline" : "") + (props.caption ? " q-item__label--caption text-caption" : "") + (props.header ? " q-item__label--header" : "") + (parsedLines.value === 1 ? " ellipsis" : ""));
		const style = computed(() => props.lines !== void 0 && parsedLines.value > 1 ? {
			overflow: "hidden",
			display: "-webkit-box",
			"-webkit-box-orient": "vertical",
			"-webkit-line-clamp": parsedLines.value
		} : null);
		return () => h("div", {
			style: style.value,
			class: classes.value
		}, hSlot(slots.default));
	}
});
//#endregion
//#region node_modules/quasar/src/components/menu/QMenu.js
var QMenu_default = createComponent({
	name: "QMenu",
	inheritAttrs: false,
	props: {
		...useAnchorProps,
		...useModelToggleProps,
		...useDarkProps,
		...useTransitionProps,
		persistent: Boolean,
		autoClose: Boolean,
		separateClosePopup: Boolean,
		noEscDismiss: Boolean,
		noRouteDismiss: Boolean,
		noRefocus: Boolean,
		noFocus: Boolean,
		fit: Boolean,
		cover: Boolean,
		square: Boolean,
		anchor: {
			type: String,
			validator: validatePosition
		},
		self: {
			type: String,
			validator: validatePosition
		},
		offset: {
			type: Array,
			validator: validateOffset
		},
		scrollTarget: scrollTargetProp,
		touchPosition: Boolean,
		maxHeight: {
			type: String,
			default: null
		},
		maxWidth: {
			type: String,
			default: null
		}
	},
	emits: [
		...useModelToggleEmits,
		"click",
		"escapeKey"
	],
	setup(props, { slots, emit, attrs }) {
		let refocusTarget = null, absoluteOffset, unwatchPosition, avoidAutoClose;
		const vm = getCurrentInstance();
		const { proxy } = vm;
		const { $q } = proxy;
		const innerRef = ref(null);
		const showing = ref(false);
		const hideOnRouteChange = computed(() => !props.persistent && !props.noRouteDismiss);
		const isDark = useDark(props, $q);
		const { registerTick, removeTick } = useTick();
		const { registerTimeout } = useTimeout();
		const { transitionProps, transitionStyle } = useTransition(props);
		const { localScrollTarget, changeScrollEvent, unconfigureScrollTarget } = useScrollTarget(props, configureScrollTarget);
		const { anchorEl, canShow } = useAnchor({ showing });
		const { hide } = useModelToggle({
			showing,
			canShow,
			handleShow,
			handleHide,
			hideOnRouteChange,
			processOnMount: true
		});
		const { showPortal, hidePortal, renderPortal } = usePortal(vm, innerRef, renderPortalContent, "menu");
		const clickOutsideProps = {
			anchorEl,
			innerRef,
			onClickOutside(e) {
				if (!props.persistent && showing.value) {
					hide(e);
					if (e.type === "touchstart" || e.target.classList.contains("q-dialog__backdrop")) stopAndPrevent(e);
					return true;
				}
			}
		};
		const anchorOrigin = computed(() => parsePosition(props.anchor || (props.cover ? "center middle" : "bottom start"), $q.lang.rtl));
		const selfOrigin = computed(() => props.cover ? anchorOrigin.value : parsePosition(props.self || "top start", $q.lang.rtl));
		const menuClass = computed(() => (props.square ? " q-menu--square" : "") + (isDark.value ? " q-menu--dark q-dark" : ""));
		const onEvents = computed(() => props.autoClose ? { onClick: onAutoClose } : {});
		const handlesFocus = computed(() => showing.value && !props.persistent);
		watch(handlesFocus, (val) => {
			if (val) {
				addEscapeKey(onEscapeKey);
				addClickOutside(clickOutsideProps);
			} else {
				removeEscapeKey(onEscapeKey);
				removeClickOutside(clickOutsideProps);
			}
		});
		function focus() {
			addFocusFn(() => {
				let node = innerRef.value;
				if (node && !node.contains(document.activeElement)) {
					node = node.querySelector("[autofocus][tabindex], [data-autofocus][tabindex]") || node.querySelector("[autofocus] [tabindex], [data-autofocus] [tabindex]") || node.querySelector("[autofocus], [data-autofocus]") || node;
					node.focus({ preventScroll: true });
				}
			});
		}
		function handleShow(evt) {
			refocusTarget = props.noRefocus ? null : document.activeElement;
			addFocusout(onFocusout);
			showPortal();
			configureScrollTarget();
			absoluteOffset = void 0;
			if (evt !== void 0 && (props.touchPosition || props.contextMenu)) {
				const pos = position(evt);
				if (pos.left !== void 0) {
					const { top, left } = anchorEl.value.getBoundingClientRect();
					absoluteOffset = {
						left: pos.left - left,
						top: pos.top - top
					};
				}
			}
			if (unwatchPosition === void 0) unwatchPosition = watch(() => $q.screen.width + "|" + $q.screen.height + "|" + props.self + "|" + props.anchor + "|" + $q.lang.rtl, updatePosition);
			if (!props.noFocus) document.activeElement.blur();
			registerTick(() => {
				updatePosition();
				if (!props.noFocus) focus();
			});
			registerTimeout(() => {
				if ($q.platform.is.ios) {
					avoidAutoClose = props.autoClose;
					innerRef.value.click();
				}
				updatePosition();
				showPortal(true);
				emit("show", evt);
			}, props.transitionDuration);
		}
		function handleHide(evt) {
			removeTick();
			hidePortal();
			anchorCleanup(true);
			if (refocusTarget !== null && (evt === void 0 || !evt.qClickOutside)) {
				((evt?.type.indexOf("key") === 0 ? refocusTarget.closest("[tabindex]:not([tabindex^=\"-\"])") : void 0) || refocusTarget).focus();
				refocusTarget = null;
			}
			registerTimeout(() => {
				hidePortal(true);
				emit("hide", evt);
			}, props.transitionDuration);
		}
		function anchorCleanup(hiding) {
			absoluteOffset = void 0;
			if (unwatchPosition !== void 0) {
				unwatchPosition();
				unwatchPosition = void 0;
			}
			if (hiding || showing.value) {
				removeFocusout(onFocusout);
				unconfigureScrollTarget();
				removeClickOutside(clickOutsideProps);
				removeEscapeKey(onEscapeKey);
			}
			if (!hiding) refocusTarget = null;
		}
		function configureScrollTarget() {
			if (anchorEl.value !== null || props.scrollTarget !== void 0) {
				localScrollTarget.value = getScrollTarget(anchorEl.value, props.scrollTarget);
				changeScrollEvent(localScrollTarget.value, updatePosition);
			}
		}
		function onAutoClose(e) {
			if (!avoidAutoClose) {
				closePortalMenus(proxy, e);
				emit("click", e);
			} else avoidAutoClose = false;
		}
		function onFocusout(evt) {
			if (handlesFocus.value && !props.noFocus && !childHasFocus(innerRef.value, evt.target)) focus();
		}
		function onEscapeKey(evt) {
			if (!props.noEscDismiss) {
				emit("escapeKey");
				hide(evt);
			}
		}
		function updatePosition() {
			setPosition({
				targetEl: innerRef.value,
				offset: props.offset,
				anchorEl: anchorEl.value,
				anchorOrigin: anchorOrigin.value,
				selfOrigin: selfOrigin.value,
				absoluteOffset,
				fit: props.fit,
				cover: props.cover,
				maxHeight: props.maxHeight,
				maxWidth: props.maxWidth
			});
		}
		function renderPortalContent() {
			return h(Transition, transitionProps.value, () => showing.value ? h("div", {
				role: "menu",
				...attrs,
				ref: innerRef,
				tabindex: -1,
				class: ["q-menu q-position-engine scroll" + menuClass.value, attrs.class],
				style: [attrs.style, transitionStyle.value],
				...onEvents.value
			}, hSlot(slots.default)) : null);
		}
		onBeforeUnmount(() => {
			anchorCleanup();
		});
		Object.assign(proxy, {
			focus,
			updatePosition
		});
		return renderPortal;
	}
});
//#endregion
//#region node_modules/quasar/src/components/virtual-scroll/use-virtual-scroll.js
var aggBucketSize = 1e3;
var scrollToEdges = [
	"start",
	"center",
	"end",
	"start-force",
	"center-force",
	"end-force"
];
var filterProto = Array.prototype.filter;
var setOverflowAnchor = window.getComputedStyle(document.body).overflowAnchor === void 0 ? noop : function setOverflowAnchor(contentEl, index) {
	if (contentEl === null) return;
	if (contentEl._qOverflowAnimationFrame !== void 0) cancelAnimationFrame(contentEl._qOverflowAnimationFrame);
	contentEl._qOverflowAnimationFrame = requestAnimationFrame(() => {
		if (contentEl === null) return;
		contentEl._qOverflowAnimationFrame = void 0;
		const children = contentEl.children || [];
		filterProto.call(children, (el) => el.dataset && el.dataset.qVsAnchor !== void 0).forEach((el) => {
			delete el.dataset.qVsAnchor;
		});
		const el = children[index];
		if (el?.dataset) el.dataset.qVsAnchor = "";
	});
};
function sumFn(acc, item) {
	return acc + item;
}
function getScrollDetails(parent, child, beforeRef, afterRef, horizontal, rtl, stickyStart, stickyEnd) {
	const parentCalc = parent === window ? document.scrollingElement || document.documentElement : parent, propElSize = horizontal ? "offsetWidth" : "offsetHeight", details = {
		scrollStart: 0,
		scrollViewSize: -stickyStart - stickyEnd,
		scrollMaxSize: 0,
		offsetStart: -stickyStart,
		offsetEnd: -stickyEnd
	};
	if (horizontal) {
		if (parent === window) {
			details.scrollStart = window.pageXOffset || window.scrollX || document.body.scrollLeft || 0;
			details.scrollViewSize += document.documentElement.clientWidth;
		} else {
			details.scrollStart = parentCalc.scrollLeft;
			details.scrollViewSize += parentCalc.clientWidth;
		}
		details.scrollMaxSize = parentCalc.scrollWidth;
		if (rtl) details.scrollStart = (rtlHasScrollBug ? details.scrollMaxSize - details.scrollViewSize : 0) - details.scrollStart;
	} else {
		if (parent === window) {
			details.scrollStart = window.pageYOffset || window.scrollY || document.body.scrollTop || 0;
			details.scrollViewSize += document.documentElement.clientHeight;
		} else {
			details.scrollStart = parentCalc.scrollTop;
			details.scrollViewSize += parentCalc.clientHeight;
		}
		details.scrollMaxSize = parentCalc.scrollHeight;
	}
	if (beforeRef !== null) {
		for (let el = beforeRef.previousElementSibling; el !== null; el = el.previousElementSibling) if (!el.classList.contains("q-virtual-scroll--skip")) details.offsetStart += el[propElSize];
	}
	if (afterRef !== null) {
		for (let el = afterRef.nextElementSibling; el !== null; el = el.nextElementSibling) if (!el.classList.contains("q-virtual-scroll--skip")) details.offsetEnd += el[propElSize];
	}
	if (child !== parent) {
		const parentRect = parentCalc.getBoundingClientRect(), childRect = child.getBoundingClientRect();
		if (horizontal) {
			details.offsetStart += childRect.left - parentRect.left;
			details.offsetEnd -= childRect.width;
		} else {
			details.offsetStart += childRect.top - parentRect.top;
			details.offsetEnd -= childRect.height;
		}
		if (parent !== window) details.offsetStart += details.scrollStart;
		details.offsetEnd += details.scrollMaxSize - details.offsetStart;
	}
	return details;
}
function setScroll(parent, scroll, horizontal, rtl) {
	if (scroll === "end") scroll = (parent === window ? document.body : parent)[horizontal ? "scrollWidth" : "scrollHeight"];
	if (parent === window) if (horizontal) {
		if (rtl) scroll = (rtlHasScrollBug ? document.body.scrollWidth - document.documentElement.clientWidth : 0) - scroll;
		window.scrollTo(scroll, window.pageYOffset || window.scrollY || document.body.scrollTop || 0);
	} else window.scrollTo(window.pageXOffset || window.scrollX || document.body.scrollLeft || 0, scroll);
	else if (horizontal) {
		if (rtl) scroll = (rtlHasScrollBug ? parent.scrollWidth - parent.offsetWidth : 0) - scroll;
		parent.scrollLeft = scroll;
	} else parent.scrollTop = scroll;
}
function sumSize(sizeAgg, size, from, to) {
	if (from >= to) return 0;
	const lastTo = size.length, fromAgg = Math.floor(from / aggBucketSize), toAgg = Math.floor((to - 1) / aggBucketSize) + 1;
	let total = sizeAgg.slice(fromAgg, toAgg).reduce(sumFn, 0);
	if (from % aggBucketSize !== 0) total -= size.slice(fromAgg * aggBucketSize, from).reduce(sumFn, 0);
	if (to % aggBucketSize !== 0 && to !== lastTo) total -= size.slice(to, toAgg * aggBucketSize).reduce(sumFn, 0);
	return total;
}
var commonVirtScrollProps = {
	virtualScrollSliceSize: {
		type: [Number, String],
		default: 10
	},
	virtualScrollSliceRatioBefore: {
		type: [Number, String],
		default: 1
	},
	virtualScrollSliceRatioAfter: {
		type: [Number, String],
		default: 1
	},
	virtualScrollItemSize: {
		type: [Number, String],
		default: 24
	},
	virtualScrollStickySizeStart: {
		type: [Number, String],
		default: 0
	},
	virtualScrollStickySizeEnd: {
		type: [Number, String],
		default: 0
	},
	tableColspan: [Number, String]
};
Object.keys(commonVirtScrollProps);
var useVirtualScrollProps = {
	virtualScrollHorizontal: Boolean,
	onVirtualScroll: Function,
	...commonVirtScrollProps
};
function useVirtualScroll({ virtualScrollLength, getVirtualScrollTarget, getVirtualScrollEl, virtualScrollItemSizeComputed }) {
	const { props, emit, proxy } = getCurrentInstance();
	const { $q } = proxy;
	let prevScrollStart, prevToIndex, localScrollViewSize, virtualScrollSizesAgg = [], virtualScrollSizes;
	const virtualScrollPaddingBefore = ref(0);
	const virtualScrollPaddingAfter = ref(0);
	const virtualScrollSliceSizeComputed = ref({});
	const beforeRef = ref(null);
	const afterRef = ref(null);
	const contentRef = ref(null);
	const virtualScrollSliceRange = ref({
		from: 0,
		to: 0
	});
	const colspanAttr = computed(() => props.tableColspan !== void 0 ? props.tableColspan : 100);
	if (virtualScrollItemSizeComputed === void 0) virtualScrollItemSizeComputed = computed(() => props.virtualScrollItemSize);
	const needsReset = computed(() => virtualScrollItemSizeComputed.value + ";" + props.virtualScrollHorizontal);
	watch(computed(() => needsReset.value + ";" + props.virtualScrollSliceRatioBefore + ";" + props.virtualScrollSliceRatioAfter), () => {
		setVirtualScrollSize();
	});
	watch(needsReset, reset);
	function reset() {
		localResetVirtualScroll(prevToIndex, true);
	}
	function refresh(toIndex) {
		localResetVirtualScroll(toIndex === void 0 ? prevToIndex : toIndex);
	}
	function scrollTo(toIndex, edge) {
		const scrollEl = getVirtualScrollTarget();
		if (scrollEl === void 0 || scrollEl === null || scrollEl.nodeType === 8) return;
		const scrollDetails = getScrollDetails(scrollEl, getVirtualScrollEl(), beforeRef.value, afterRef.value, props.virtualScrollHorizontal, $q.lang.rtl, props.virtualScrollStickySizeStart, props.virtualScrollStickySizeEnd);
		if (localScrollViewSize !== scrollDetails.scrollViewSize) setVirtualScrollSize(scrollDetails.scrollViewSize);
		setVirtualScrollSliceRange(scrollEl, scrollDetails, Math.min(virtualScrollLength.value - 1, Math.max(0, Number.parseInt(toIndex, 10) || 0)), 0, scrollToEdges.includes(edge) ? edge : prevToIndex !== -1 && toIndex > prevToIndex ? "end" : "start");
	}
	function localOnVirtualScrollEvt() {
		const scrollEl = getVirtualScrollTarget();
		if (scrollEl === void 0 || scrollEl === null || scrollEl.nodeType === 8) return;
		const scrollDetails = getScrollDetails(scrollEl, getVirtualScrollEl(), beforeRef.value, afterRef.value, props.virtualScrollHorizontal, $q.lang.rtl, props.virtualScrollStickySizeStart, props.virtualScrollStickySizeEnd), listLastIndex = virtualScrollLength.value - 1, listEndOffset = scrollDetails.scrollMaxSize - scrollDetails.offsetStart - scrollDetails.offsetEnd - virtualScrollPaddingAfter.value;
		if (prevScrollStart === scrollDetails.scrollStart) return;
		if (scrollDetails.scrollMaxSize <= 0) {
			setVirtualScrollSliceRange(scrollEl, scrollDetails, 0, 0);
			return;
		}
		if (localScrollViewSize !== scrollDetails.scrollViewSize) setVirtualScrollSize(scrollDetails.scrollViewSize);
		updateVirtualScrollSizes(virtualScrollSliceRange.value.from);
		const scrollMaxStart = Math.floor(scrollDetails.scrollMaxSize - Math.max(scrollDetails.scrollViewSize, scrollDetails.offsetEnd) - Math.min(virtualScrollSizes[listLastIndex], scrollDetails.scrollViewSize / 2));
		if (scrollMaxStart > 0 && Math.ceil(scrollDetails.scrollStart) >= scrollMaxStart) {
			setVirtualScrollSliceRange(scrollEl, scrollDetails, listLastIndex, scrollDetails.scrollMaxSize - scrollDetails.offsetEnd - virtualScrollSizesAgg.reduce(sumFn, 0));
			return;
		}
		let toIndex = 0, listOffset = scrollDetails.scrollStart - scrollDetails.offsetStart, offset = listOffset;
		if (listOffset <= listEndOffset && listOffset + scrollDetails.scrollViewSize >= virtualScrollPaddingBefore.value) {
			listOffset -= virtualScrollPaddingBefore.value;
			toIndex = virtualScrollSliceRange.value.from;
			offset = listOffset;
		} else for (let j = 0; listOffset >= virtualScrollSizesAgg[j] && toIndex < listLastIndex; j++) {
			listOffset -= virtualScrollSizesAgg[j];
			toIndex += aggBucketSize;
		}
		while (listOffset > 0 && toIndex < listLastIndex) {
			listOffset -= virtualScrollSizes[toIndex];
			if (listOffset > -scrollDetails.scrollViewSize) {
				toIndex++;
				offset = listOffset;
			} else offset = virtualScrollSizes[toIndex] + listOffset;
		}
		setVirtualScrollSliceRange(scrollEl, scrollDetails, toIndex, offset);
	}
	function setVirtualScrollSliceRange(scrollEl, scrollDetails, toIndex, offset, align) {
		const alignForce = typeof align === "string" && align.includes("-force");
		const alignEnd = alignForce ? align.replace("-force", "") : align;
		const alignRange = alignEnd !== void 0 ? alignEnd : "start";
		let from = Math.max(0, toIndex - virtualScrollSliceSizeComputed.value[alignRange]), to = from + virtualScrollSliceSizeComputed.value.total;
		if (to > virtualScrollLength.value) {
			to = virtualScrollLength.value;
			from = Math.max(0, to - virtualScrollSliceSizeComputed.value.total);
		}
		prevScrollStart = scrollDetails.scrollStart;
		const rangeChanged = from !== virtualScrollSliceRange.value.from || to !== virtualScrollSliceRange.value.to;
		if (!rangeChanged && alignEnd === void 0) {
			emitScroll(toIndex);
			return;
		}
		const { activeElement } = document;
		const contentEl = contentRef.value;
		if (rangeChanged && contentEl !== null && contentEl !== activeElement && contentEl.contains(activeElement)) {
			contentEl.addEventListener("focusout", onBlurRefocusFn);
			setTimeout(() => {
				contentEl?.removeEventListener("focusout", onBlurRefocusFn);
			});
		}
		setOverflowAnchor(contentEl, toIndex - from);
		const sizeBefore = alignEnd !== void 0 ? virtualScrollSizes.slice(from, toIndex).reduce(sumFn, 0) : 0;
		if (rangeChanged) {
			const tempTo = to >= virtualScrollSliceRange.value.from && from <= virtualScrollSliceRange.value.to ? virtualScrollSliceRange.value.to : to;
			virtualScrollSliceRange.value = {
				from,
				to: tempTo
			};
			virtualScrollPaddingBefore.value = sumSize(virtualScrollSizesAgg, virtualScrollSizes, 0, from);
			virtualScrollPaddingAfter.value = sumSize(virtualScrollSizesAgg, virtualScrollSizes, to, virtualScrollLength.value);
			requestAnimationFrame(() => {
				if (virtualScrollSliceRange.value.to !== to && prevScrollStart === scrollDetails.scrollStart) {
					virtualScrollSliceRange.value = {
						from: virtualScrollSliceRange.value.from,
						to
					};
					virtualScrollPaddingAfter.value = sumSize(virtualScrollSizesAgg, virtualScrollSizes, to, virtualScrollLength.value);
				}
			});
		}
		requestAnimationFrame(() => {
			if (prevScrollStart !== scrollDetails.scrollStart) return;
			if (rangeChanged) updateVirtualScrollSizes(from);
			const sizeAfter = virtualScrollSizes.slice(from, toIndex).reduce(sumFn, 0), posStart = sizeAfter + scrollDetails.offsetStart + virtualScrollPaddingBefore.value, posEnd = posStart + virtualScrollSizes[toIndex];
			let scrollPosition = posStart + offset;
			if (alignEnd !== void 0) {
				const sizeDiff = sizeAfter - sizeBefore;
				const scrollStart = scrollDetails.scrollStart + sizeDiff;
				scrollPosition = !alignForce && scrollStart < posStart && posEnd < scrollStart + scrollDetails.scrollViewSize ? scrollStart : alignEnd === "end" ? posEnd - scrollDetails.scrollViewSize : posStart - (alignEnd === "start" ? 0 : Math.round((scrollDetails.scrollViewSize - virtualScrollSizes[toIndex]) / 2));
			}
			prevScrollStart = scrollPosition;
			setScroll(scrollEl, scrollPosition, props.virtualScrollHorizontal, $q.lang.rtl);
			emitScroll(toIndex);
		});
	}
	function updateVirtualScrollSizes(from) {
		const contentEl = contentRef.value;
		if (contentEl) {
			const children = filterProto.call(contentEl.children, (el) => el.classList && !el.classList.contains("q-virtual-scroll--skip")), childrenLength = children.length, sizeFn = props.virtualScrollHorizontal ? (el) => el.getBoundingClientRect().width : (el) => el.offsetHeight;
			let index = from, size, diff;
			for (let i = 0; i < childrenLength;) {
				size = sizeFn(children[i]);
				i++;
				while (i < childrenLength && children[i].classList.contains("q-virtual-scroll--with-prev")) {
					size += sizeFn(children[i]);
					i++;
				}
				diff = size - virtualScrollSizes[index];
				if (diff !== 0) {
					virtualScrollSizes[index] += diff;
					virtualScrollSizesAgg[Math.floor(index / aggBucketSize)] += diff;
				}
				index++;
			}
		}
	}
	function onBlurRefocusFn() {
		contentRef.value?.focus();
	}
	function localResetVirtualScroll(toIndex, fullReset) {
		const defaultSize = Number(virtualScrollItemSizeComputed.value);
		if (fullReset || !Array.isArray(virtualScrollSizes)) virtualScrollSizes = [];
		const oldVirtualScrollSizesLength = virtualScrollSizes.length;
		virtualScrollSizes.length = virtualScrollLength.value;
		for (let i = virtualScrollLength.value - 1; i >= oldVirtualScrollSizesLength; i--) virtualScrollSizes[i] = defaultSize;
		const jMax = Math.floor((virtualScrollLength.value - 1) / aggBucketSize);
		virtualScrollSizesAgg = [];
		for (let j = 0; j <= jMax; j++) {
			let size = 0;
			const iMax = Math.min((j + 1) * aggBucketSize, virtualScrollLength.value);
			for (let i = j * aggBucketSize; i < iMax; i++) size += virtualScrollSizes[i];
			virtualScrollSizesAgg.push(size);
		}
		prevToIndex = -1;
		prevScrollStart = void 0;
		virtualScrollPaddingBefore.value = sumSize(virtualScrollSizesAgg, virtualScrollSizes, 0, virtualScrollSliceRange.value.from);
		virtualScrollPaddingAfter.value = sumSize(virtualScrollSizesAgg, virtualScrollSizes, virtualScrollSliceRange.value.to, virtualScrollLength.value);
		if (toIndex >= 0) {
			updateVirtualScrollSizes(virtualScrollSliceRange.value.from);
			nextTick(() => {
				scrollTo(toIndex);
			});
		} else onVirtualScrollEvt();
	}
	function setVirtualScrollSize(scrollViewSize) {
		if (scrollViewSize === void 0 && typeof window !== "undefined") {
			const scrollEl = getVirtualScrollTarget();
			if (scrollEl !== void 0 && scrollEl !== null && scrollEl.nodeType !== 8) scrollViewSize = getScrollDetails(scrollEl, getVirtualScrollEl(), beforeRef.value, afterRef.value, props.virtualScrollHorizontal, $q.lang.rtl, props.virtualScrollStickySizeStart, props.virtualScrollStickySizeEnd).scrollViewSize;
		}
		localScrollViewSize = scrollViewSize;
		const virtualScrollSliceRatioBefore = Number.parseFloat(props.virtualScrollSliceRatioBefore) || 0;
		const virtualScrollSliceRatioAfter = Number.parseFloat(props.virtualScrollSliceRatioAfter) || 0;
		const multiplier = 1 + virtualScrollSliceRatioBefore + virtualScrollSliceRatioAfter;
		const view = scrollViewSize === void 0 || scrollViewSize <= 0 ? 1 : Math.ceil(scrollViewSize / virtualScrollItemSizeComputed.value);
		const baseSize = Math.max(1, view, Math.ceil((props.virtualScrollSliceSize > 0 ? props.virtualScrollSliceSize : 10) / multiplier));
		virtualScrollSliceSizeComputed.value = {
			total: Math.ceil(baseSize * multiplier),
			start: Math.ceil(baseSize * virtualScrollSliceRatioBefore),
			center: Math.ceil(baseSize * (.5 + virtualScrollSliceRatioBefore)),
			end: Math.ceil(baseSize * (1 + virtualScrollSliceRatioBefore)),
			view
		};
	}
	function padVirtualScroll(tag, content) {
		const paddingSize = props.virtualScrollHorizontal ? "width" : "height";
		const style = { ["--q-virtual-scroll-item-" + paddingSize]: virtualScrollItemSizeComputed.value + "px" };
		return [
			tag === "tbody" ? h(tag, {
				class: "q-virtual-scroll__padding",
				key: "before",
				ref: beforeRef
			}, [h("tr", [h("td", {
				style: {
					[paddingSize]: `${virtualScrollPaddingBefore.value}px`,
					...style
				},
				colspan: colspanAttr.value
			})])]) : h(tag, {
				class: "q-virtual-scroll__padding",
				key: "before",
				ref: beforeRef,
				style: {
					[paddingSize]: `${virtualScrollPaddingBefore.value}px`,
					...style
				}
			}),
			h(tag, {
				class: "q-virtual-scroll__content",
				key: "content",
				ref: contentRef,
				tabindex: -1
			}, content.flat()),
			tag === "tbody" ? h(tag, {
				class: "q-virtual-scroll__padding",
				key: "after",
				ref: afterRef
			}, [h("tr", [h("td", {
				style: {
					[paddingSize]: `${virtualScrollPaddingAfter.value}px`,
					...style
				},
				colspan: colspanAttr.value
			})])]) : h(tag, {
				class: "q-virtual-scroll__padding",
				key: "after",
				ref: afterRef,
				style: {
					[paddingSize]: `${virtualScrollPaddingAfter.value}px`,
					...style
				}
			})
		];
	}
	function emitScroll(index) {
		if (prevToIndex !== index) {
			if (props.onVirtualScroll !== void 0) emit("virtualScroll", {
				index,
				from: virtualScrollSliceRange.value.from,
				to: virtualScrollSliceRange.value.to - 1,
				direction: index < prevToIndex ? "decrease" : "increase",
				ref: proxy
			});
			prevToIndex = index;
		}
	}
	setVirtualScrollSize();
	const onVirtualScrollEvt = debounce(localOnVirtualScrollEvt, $q.platform.is.ios ? 120 : 35);
	onBeforeMount(() => {
		setVirtualScrollSize();
	});
	let shouldActivate = false;
	onDeactivated(() => {
		shouldActivate = true;
	});
	onActivated(() => {
		if (!shouldActivate) return;
		const scrollEl = getVirtualScrollTarget();
		if (prevScrollStart !== void 0 && scrollEl !== void 0 && scrollEl !== null && scrollEl.nodeType !== 8) setScroll(scrollEl, prevScrollStart, props.virtualScrollHorizontal, $q.lang.rtl);
		else scrollTo(prevToIndex);
	});
	onBeforeUnmount(() => {
		onVirtualScrollEvt.cancel();
	});
	Object.assign(proxy, {
		scrollTo,
		reset,
		refresh
	});
	return {
		virtualScrollSliceRange,
		virtualScrollSliceSizeComputed,
		setVirtualScrollSize,
		onVirtualScrollEvt,
		localResetVirtualScroll,
		padVirtualScroll,
		scrollTo,
		reset,
		refresh
	};
}
//#endregion
//#region node_modules/quasar/src/utils/format/format.js
function normalizeToInterval(v, min, max) {
	if (max <= min) return min;
	const size = max - min + 1;
	let index = min + (v - min) % size;
	if (index < min) index = size + index;
	return index === 0 ? 0 : index;
}
//#endregion
//#region node_modules/quasar/src/components/select/QSelect.js
var validateNewValueMode = (v) => [
	"add",
	"add-unique",
	"toggle"
].includes(v);
var reEscapeList = ".*+?^${}()|[]\\";
var fieldPropsList = Object.keys(useFieldProps);
function getPropValueFn(userPropName, defaultPropName) {
	if (typeof userPropName === "function") return userPropName;
	const propName = userPropName !== void 0 ? userPropName : defaultPropName;
	return (opt) => opt !== null && typeof opt === "object" && propName in opt ? opt[propName] : opt;
}
var QSelect_default = createComponent({
	name: "QSelect",
	inheritAttrs: false,
	props: {
		...useVirtualScrollProps,
		...useFormProps,
		...useFieldProps,
		modelValue: { required: true },
		multiple: Boolean,
		displayValue: [String, Number],
		displayValueHtml: Boolean,
		dropdownIcon: String,
		options: {
			type: Array,
			default: () => []
		},
		optionValue: [Function, String],
		optionLabel: [Function, String],
		optionDisable: [Function, String],
		hideSelected: Boolean,
		hideDropdownIcon: Boolean,
		fillInput: Boolean,
		maxValues: [Number, String],
		optionsDense: Boolean,
		optionsDark: {
			type: Boolean,
			default: null
		},
		optionsSelectedClass: String,
		optionsHtml: Boolean,
		optionsCover: Boolean,
		menuShrink: Boolean,
		menuAnchor: String,
		menuSelf: String,
		menuOffset: Array,
		popupContentClass: String,
		popupContentStyle: [
			String,
			Array,
			Object
		],
		popupNoRouteDismiss: Boolean,
		useInput: Boolean,
		useChips: Boolean,
		newValueMode: {
			type: String,
			validator: validateNewValueMode
		},
		mapOptions: Boolean,
		emitValue: Boolean,
		disableTabSelection: Boolean,
		inputDebounce: {
			type: [Number, String],
			default: 500
		},
		inputClass: [
			Array,
			String,
			Object
		],
		inputStyle: [
			Array,
			String,
			Object
		],
		tabindex: {
			type: [String, Number],
			default: 0
		},
		autocomplete: String,
		transitionShow: {},
		transitionHide: {},
		transitionDuration: {},
		behavior: {
			type: String,
			validator: (v) => [
				"default",
				"menu",
				"dialog"
			].includes(v),
			default: "default"
		},
		virtualScrollItemSize: useVirtualScrollProps.virtualScrollItemSize.type,
		onNewValue: Function,
		onFilter: Function
	},
	emits: [
		...useFieldEmits,
		"add",
		"remove",
		"inputValue",
		"keyup",
		"keypress",
		"keydown",
		"popupShow",
		"popupHide",
		"filterAbort"
	],
	setup(props, { slots, emit }) {
		const { proxy } = getCurrentInstance();
		const { $q } = proxy;
		const menu = ref(false);
		const dialog = ref(false);
		const optionIndex = ref(-1);
		const inputValue = ref("");
		const dialogFieldFocused = ref(false);
		const innerLoadingIndicator = ref(false);
		let filterTimer = null, inputValueTimer = null, innerValueCache, hasDialog, userInputValue, filterId = null, defaultInputValue, transitionShowComputed, searchBuffer, searchBufferExp;
		const inputRef = ref(null);
		const targetRef = ref(null);
		const menuRef = ref(null);
		const dialogRef = ref(null);
		const menuContentRef = ref(null);
		const nameProp = useFormInputNameAttr(props);
		const onComposition = useKeyComposition(onInput);
		const virtualScrollLength = computed(() => Array.isArray(props.options) ? props.options.length : 0);
		const { virtualScrollSliceRange, virtualScrollSliceSizeComputed, localResetVirtualScroll, padVirtualScroll, onVirtualScrollEvt, scrollTo, setVirtualScrollSize } = useVirtualScroll({
			virtualScrollLength,
			getVirtualScrollTarget,
			getVirtualScrollEl,
			virtualScrollItemSizeComputed: computed(() => props.virtualScrollItemSize === void 0 ? props.optionsDense ? 24 : 48 : props.virtualScrollItemSize)
		});
		const state = useFieldState();
		const innerValue = computed(() => {
			const mapNull = props.mapOptions && !props.multiple, val = props.modelValue !== void 0 && (props.modelValue !== null || mapNull) ? props.multiple && Array.isArray(props.modelValue) ? props.modelValue : [props.modelValue] : [];
			if (props.mapOptions && Array.isArray(props.options)) {
				const cache = props.mapOptions && innerValueCache !== void 0 ? innerValueCache : [];
				const values = val.map((v) => getOption(v, cache));
				return props.modelValue === null && mapNull ? values.filter((v) => v !== null) : values;
			}
			return val;
		});
		const innerFieldProps = computed(() => {
			const acc = {};
			fieldPropsList.forEach((key) => {
				const val = props[key];
				if (val !== void 0) acc[key] = val;
			});
			return acc;
		});
		const isOptionsDark = computed(() => props.optionsDark === null ? state.isDark.value : props.optionsDark);
		const hasValue = computed(() => fieldValueIsFilled(innerValue.value));
		const computedInputClass = computed(() => {
			let cls = "q-field__input q-placeholder col";
			if (props.hideSelected || innerValue.value.length === 0) return [cls, props.inputClass];
			cls += " q-field__input--padding";
			return props.inputClass === void 0 ? cls : [cls, props.inputClass];
		});
		const menuContentClass = computed(() => (props.virtualScrollHorizontal ? "q-virtual-scroll--horizontal" : "") + (props.popupContentClass ? " " + props.popupContentClass : ""));
		const noOptions = computed(() => virtualScrollLength.value === 0);
		const selectedString = computed(() => innerValue.value.map((opt) => getOptionLabel.value(opt)).join(", "));
		const ariaCurrentValue = computed(() => props.displayValue !== void 0 ? props.displayValue : selectedString.value);
		const needsHtmlFn = computed(() => props.optionsHtml ? () => true : (opt) => opt?.html === true);
		const valueAsHtml = computed(() => props.displayValueHtml || props.displayValue === void 0 && (props.optionsHtml || innerValue.value.some(needsHtmlFn.value)));
		const tabindex = computed(() => state.focused.value ? props.tabindex : -1);
		const comboboxAttrs = computed(() => {
			const attrs = {
				tabindex: props.tabindex,
				role: "combobox",
				"aria-label": props.label,
				"aria-readonly": props.readonly ? "true" : "false",
				"aria-autocomplete": props.useInput ? "list" : "none",
				"aria-expanded": menu.value ? "true" : "false",
				"aria-controls": `${state.targetUid.value}_lb`
			};
			if (optionIndex.value >= 0) attrs["aria-activedescendant"] = `${state.targetUid.value}_${optionIndex.value}`;
			return attrs;
		});
		const listboxAttrs = computed(() => ({
			id: `${state.targetUid.value}_lb`,
			role: "listbox",
			"aria-multiselectable": props.multiple ? "true" : "false"
		}));
		const selectedScope = computed(() => innerValue.value.map((opt, i) => ({
			index: i,
			opt,
			html: needsHtmlFn.value(opt),
			selected: true,
			removeAtIndex: removeAtIndexAndFocus,
			toggleOption,
			tabindex: tabindex.value
		})));
		const optionScope = computed(() => {
			if (virtualScrollLength.value === 0) return [];
			const { from, to } = virtualScrollSliceRange.value;
			return props.options.slice(from, to).map((opt, i) => {
				const disable = isOptionDisabled.value(opt) === true;
				const active = isOptionSelected(opt);
				const index = from + i;
				const itemProps = {
					clickable: true,
					active,
					activeClass: computedOptionsSelectedClass.value,
					manualFocus: true,
					focused: false,
					disable,
					tabindex: -1,
					dense: props.optionsDense,
					dark: isOptionsDark.value,
					role: "option",
					"aria-selected": active ? "true" : "false",
					id: `${state.targetUid.value}_${index}`,
					onClick: () => {
						toggleOption(opt);
					}
				};
				if (!disable) {
					if (optionIndex.value === index) itemProps.focused = true;
					if ($q.platform.is.desktop) itemProps.onMousemove = () => {
						if (menu.value) setOptionIndex(index);
					};
				}
				return {
					index,
					opt,
					html: needsHtmlFn.value(opt),
					label: getOptionLabel.value(opt),
					selected: itemProps.active,
					focused: itemProps.focused,
					toggleOption,
					setOptionIndex,
					itemProps
				};
			});
		});
		const dropdownArrowIcon = computed(() => props.dropdownIcon !== void 0 ? props.dropdownIcon : $q.iconSet.arrow.dropdown);
		const squaredMenu = computed(() => !props.optionsCover && !props.outlined && !props.standout && !props.borderless && !props.rounded);
		const computedOptionsSelectedClass = computed(() => props.optionsSelectedClass !== void 0 ? props.optionsSelectedClass : props.color !== void 0 ? `text-${props.color}` : "");
		const getOptionValue = computed(() => getPropValueFn(props.optionValue, "value"));
		const getOptionLabel = computed(() => getPropValueFn(props.optionLabel, "label"));
		const isOptionDisabled = computed(() => getPropValueFn(props.optionDisable, "disable"));
		const innerOptionsValue = computed(() => innerValue.value.map(getOptionValue.value));
		const inputControlEvents = computed(() => {
			const evt = {
				onInput,
				onChange: onComposition,
				onKeydown: onTargetKeydown,
				onKeyup: onTargetAutocomplete,
				onKeypress: onTargetKeypress,
				onFocus: selectInputText,
				onClick(e) {
					if (hasDialog) stop(e);
				}
			};
			evt.onCompositionstart = evt.onCompositionupdate = evt.onCompositionend = onComposition;
			return evt;
		});
		watch(innerValue, (val) => {
			innerValueCache = val;
			if (props.useInput && props.fillInput && !props.multiple && !state.innerLoading.value && (!dialog.value && !menu.value || !hasValue.value)) {
				if (!userInputValue) resetInputValue();
				if (dialog.value || menu.value) filter("");
			}
		}, { immediate: true });
		watch(() => props.fillInput, resetInputValue);
		watch(menu, updateMenu);
		watch(virtualScrollLength, rerenderMenu);
		function getEmittingOptionValue(opt) {
			return props.emitValue ? getOptionValue.value(opt) : opt;
		}
		function removeAtIndex(index) {
			if (index !== -1 && index < innerValue.value.length) if (props.multiple) {
				const model = [...props.modelValue];
				emit("remove", {
					index,
					value: model.splice(index, 1)[0]
				});
				emit("update:modelValue", model);
			} else emit("update:modelValue", null);
		}
		function removeAtIndexAndFocus(index) {
			removeAtIndex(index);
			state.focus();
		}
		function add(opt, unique) {
			const val = getEmittingOptionValue(opt);
			if (!props.multiple) {
				if (props.fillInput) updateInputValue(getOptionLabel.value(opt), true, true);
				emit("update:modelValue", val);
				return;
			}
			if (innerValue.value.length === 0) {
				emit("add", {
					index: 0,
					value: val
				});
				emit("update:modelValue", props.multiple ? [val] : val);
				return;
			}
			if (unique && isOptionSelected(opt)) return;
			if (props.maxValues !== void 0 && props.modelValue.length >= props.maxValues) return;
			const model = [...props.modelValue];
			emit("add", {
				index: model.length,
				value: val
			});
			model.push(val);
			emit("update:modelValue", model);
		}
		function toggleOption(opt, keepOpen) {
			if (!state.editable.value || opt === void 0 || isOptionDisabled.value(opt) === true) return;
			const optValue = getOptionValue.value(opt);
			if (!props.multiple) {
				if (!keepOpen) {
					updateInputValue(props.fillInput ? getOptionLabel.value(opt) : "", true, true);
					hidePopup();
				}
				targetRef.value?.focus();
				if (innerValue.value.length === 0 || !isDeepEqual(getOptionValue.value(innerValue.value[0]), optValue)) emit("update:modelValue", props.emitValue ? optValue : opt);
				return;
			}
			if (!hasDialog || dialogFieldFocused.value) state.focus();
			selectInputText();
			if (innerValue.value.length === 0) {
				const val = props.emitValue ? optValue : opt;
				emit("add", {
					index: 0,
					value: val
				});
				emit("update:modelValue", props.multiple ? [val] : val);
				return;
			}
			const model = [...props.modelValue], index = innerOptionsValue.value.findIndex((v) => isDeepEqual(v, optValue));
			if (index !== -1) emit("remove", {
				index,
				value: model.splice(index, 1)[0]
			});
			else {
				if (props.maxValues !== void 0 && model.length >= props.maxValues) return;
				const val = props.emitValue ? optValue : opt;
				emit("add", {
					index: model.length,
					value: val
				});
				model.push(val);
			}
			emit("update:modelValue", model);
		}
		function setOptionIndex(index) {
			if (!$q.platform.is.desktop) return;
			const val = index !== -1 && index < virtualScrollLength.value ? index : -1;
			if (optionIndex.value !== val) optionIndex.value = val;
		}
		function moveOptionSelection(localOffset = 1, skipInputValue) {
			if (menu.value) {
				let index = optionIndex.value;
				do
					index = normalizeToInterval(index + localOffset, -1, virtualScrollLength.value - 1);
				while (index !== -1 && index !== optionIndex.value && isOptionDisabled.value(props.options[index]) === true);
				if (optionIndex.value !== index) {
					setOptionIndex(index);
					scrollTo(index);
					if (!skipInputValue && props.useInput && props.fillInput) setInputValue(index >= 0 ? getOptionLabel.value(props.options[index]) : defaultInputValue, true);
				}
			}
		}
		function getOption(value, valueCache) {
			const fn = (opt) => isDeepEqual(getOptionValue.value(opt), value);
			return props.options.find(fn) || valueCache.find(fn) || value;
		}
		function isOptionSelected(opt) {
			const val = getOptionValue.value(opt);
			return innerOptionsValue.value.find((v) => isDeepEqual(v, val)) !== void 0;
		}
		function selectInputText(e) {
			if (props.useInput && targetRef.value !== null && (e === void 0 || targetRef.value === e.target && e.target.value === selectedString.value)) targetRef.value.select();
		}
		function onTargetKeyup(e) {
			if (isKeyCode(e, 27) && menu.value) {
				stop(e);
				hidePopup();
				resetInputValue();
			}
			emit("keyup", e);
		}
		function onTargetAutocomplete(e) {
			const { value } = e.target;
			if (e.keyCode !== void 0) {
				onTargetKeyup(e);
				return;
			}
			e.target.value = "";
			if (filterTimer !== null) {
				clearTimeout(filterTimer);
				filterTimer = null;
			}
			if (inputValueTimer !== null) {
				clearTimeout(inputValueTimer);
				inputValueTimer = null;
			}
			resetInputValue();
			if (typeof value === "string" && value.length !== 0) {
				const needle = value.toLocaleLowerCase();
				const findFn = (extractFn) => {
					const option = props.options.find((opt) => String(extractFn.value(opt)).toLocaleLowerCase() === needle);
					if (option === void 0) return false;
					if (innerValue.value.includes(option)) hidePopup();
					else toggleOption(option);
					return true;
				};
				const fillFn = (afterFilter) => {
					if (!findFn(getOptionValue) && !afterFilter && !findFn(getOptionLabel)) filter(value, true, () => fillFn(true));
				};
				fillFn();
			} else state.clearValue(e);
		}
		function onTargetKeypress(e) {
			emit("keypress", e);
		}
		function onTargetKeydown(e) {
			emit("keydown", e);
			if (shouldIgnoreKey(e)) return;
			const newValueModeValid = inputValue.value.length !== 0 && (props.newValueMode !== void 0 || props.onNewValue !== void 0);
			const tabShouldSelect = !e.shiftKey && !props.disableTabSelection && !props.multiple && (optionIndex.value !== -1 || newValueModeValid);
			if (e.keyCode === 27) {
				prevent(e);
				return;
			}
			if (e.keyCode === 9 && !tabShouldSelect) {
				closeMenu();
				return;
			}
			if (e.target === void 0 || e.target.id !== state.targetUid.value || !state.editable.value) return;
			if (e.keyCode === 40 && !state.innerLoading.value && !menu.value) {
				stopAndPrevent(e);
				showPopup();
				return;
			}
			if (e.keyCode === 8 && (props.useChips || props.clearable) && !props.hideSelected && inputValue.value.length === 0) {
				if (props.multiple && Array.isArray(props.modelValue)) removeAtIndex(props.modelValue.length - 1);
				else if (!props.multiple && props.modelValue !== null) emit("update:modelValue", null);
				return;
			}
			if ((e.keyCode === 35 || e.keyCode === 36) && (typeof inputValue.value !== "string" || inputValue.value.length === 0)) {
				stopAndPrevent(e);
				optionIndex.value = -1;
				moveOptionSelection(e.keyCode === 36 ? 1 : -1, props.multiple);
			}
			if ((e.keyCode === 33 || e.keyCode === 34) && virtualScrollSliceSizeComputed.value !== void 0) {
				stopAndPrevent(e);
				optionIndex.value = Math.max(-1, Math.min(virtualScrollLength.value, optionIndex.value + (e.keyCode === 33 ? -1 : 1) * virtualScrollSliceSizeComputed.value.view));
				moveOptionSelection(e.keyCode === 33 ? 1 : -1, props.multiple);
			}
			if (e.keyCode === 38 || e.keyCode === 40) {
				stopAndPrevent(e);
				moveOptionSelection(e.keyCode === 38 ? -1 : 1, props.multiple);
			}
			const optionsLength = virtualScrollLength.value;
			if (searchBuffer === void 0 || searchBufferExp < Date.now()) searchBuffer = "";
			if (optionsLength > 0 && !props.useInput && e.key !== void 0 && e.key.length === 1 && !e.altKey && !e.ctrlKey && !e.metaKey && (e.keyCode !== 32 || searchBuffer.length !== 0)) {
				if (!menu.value) showPopup(e);
				const char = e.key.toLocaleLowerCase(), keyRepeat = searchBuffer.length === 1 && searchBuffer[0] === char;
				searchBufferExp = Date.now() + 1500;
				if (!keyRepeat) {
					stopAndPrevent(e);
					searchBuffer += char;
				}
				const searchRe = new RegExp("^" + [...searchBuffer].map((l) => reEscapeList.includes(l) ? "\\" + l : l).join(".*"), "i");
				let index = optionIndex.value;
				if (keyRepeat || index < 0 || !searchRe.test(getOptionLabel.value(props.options[index]))) do
					index = normalizeToInterval(index + 1, -1, optionsLength - 1);
				while (index !== optionIndex.value && (isOptionDisabled.value(props.options[index]) === true || !searchRe.test(getOptionLabel.value(props.options[index]))));
				if (optionIndex.value !== index) nextTick(() => {
					setOptionIndex(index);
					scrollTo(index);
					if (index >= 0 && props.useInput && props.fillInput) setInputValue(getOptionLabel.value(props.options[index]), true);
				});
				return;
			}
			if (e.keyCode !== 13 && (e.keyCode !== 32 || props.useInput || searchBuffer !== "") && (e.keyCode !== 9 || !tabShouldSelect)) return;
			if (e.keyCode !== 9) stopAndPrevent(e);
			if (optionIndex.value !== -1 && optionIndex.value < optionsLength) {
				toggleOption(props.options[optionIndex.value]);
				return;
			}
			if (newValueModeValid) {
				const done = (val, mode) => {
					if (mode) {
						if (!validateNewValueMode(mode)) return;
					} else mode = props.newValueMode;
					updateInputValue("", !props.multiple, true);
					if (val === void 0 || val === null) return;
					(mode === "toggle" ? toggleOption : add)(val, mode === "add-unique");
					if (!props.multiple) {
						targetRef.value?.focus();
						hidePopup();
					}
				};
				if (props.onNewValue !== void 0) emit("newValue", inputValue.value, done);
				else done(inputValue.value);
				if (!props.multiple) return;
			}
			if (menu.value) closeMenu();
			else if (!state.innerLoading.value) showPopup();
		}
		function getVirtualScrollEl() {
			return hasDialog ? menuContentRef.value : menuRef.value !== null && menuRef.value.contentEl !== null ? menuRef.value.contentEl : void 0;
		}
		function getVirtualScrollTarget() {
			return getVirtualScrollEl();
		}
		function getSelection() {
			if (props.hideSelected) return [];
			if (slots["selected-item"] !== void 0) return selectedScope.value.map((scope) => slots["selected-item"](scope));
			if (slots.selected !== void 0) return [slots.selected()].flat();
			if (props.useChips) return selectedScope.value.map((scope, i) => h(QChip_default, {
				key: "option-" + i,
				removable: state.editable.value && isOptionDisabled.value(scope.opt) !== true,
				dense: true,
				textColor: props.color,
				tabindex: tabindex.value,
				onRemove() {
					scope.removeAtIndex(i);
				}
			}, () => h("span", {
				class: "ellipsis",
				[scope.html ? "innerHTML" : "textContent"]: getOptionLabel.value(scope.opt)
			})));
			return [h("span", {
				class: "ellipsis",
				[valueAsHtml.value ? "innerHTML" : "textContent"]: ariaCurrentValue.value
			})];
		}
		function getAllOptions() {
			if (noOptions.value) return slots["no-option"] !== void 0 ? slots["no-option"]({ inputValue: inputValue.value }) : void 0;
			const fn = slots.option !== void 0 ? slots.option : (scope) => h(QItem_default, {
				key: scope.index,
				...scope.itemProps
			}, () => h(QItemSection_default, () => h(QItemLabel_default, () => h("span", { [scope.html ? "innerHTML" : "textContent"]: scope.label }))));
			let options = padVirtualScroll("div", optionScope.value.map(fn));
			if (slots["before-options"] !== void 0) options = [slots["before-options"](), ...options].flat();
			return hMergeSlot(slots["after-options"], options);
		}
		function getInput(fromDialog, isTarget) {
			const attrs = isTarget ? {
				...comboboxAttrs.value,
				...state.splitAttrs.attributes.value
			} : void 0;
			const data = {
				ref: isTarget ? targetRef : void 0,
				key: "i_t",
				class: computedInputClass.value,
				style: props.inputStyle,
				value: inputValue.value !== void 0 ? inputValue.value : "",
				type: "search",
				...attrs,
				id: isTarget ? state.targetUid.value : void 0,
				maxlength: props.maxlength,
				autocomplete: props.autocomplete,
				"data-autofocus": fromDialog === true || props.autofocus || void 0,
				disabled: props.disable,
				readonly: props.readonly,
				...inputControlEvents.value
			};
			if (!fromDialog && hasDialog) if (Array.isArray(data.class)) data.class = [...data.class, "no-pointer-events"];
			else data.class += " no-pointer-events";
			return h("input", data);
		}
		function onInput(e) {
			if (filterTimer !== null) {
				clearTimeout(filterTimer);
				filterTimer = null;
			}
			if (inputValueTimer !== null) {
				clearTimeout(inputValueTimer);
				inputValueTimer = null;
			}
			if (e?.target?.qComposing) return;
			setInputValue(e.target.value || "");
			userInputValue = true;
			defaultInputValue = inputValue.value;
			if (!state.focused.value && (!hasDialog || dialogFieldFocused.value)) state.focus();
			if (props.onFilter !== void 0) filterTimer = setTimeout(() => {
				filterTimer = null;
				filter(inputValue.value);
			}, props.inputDebounce);
		}
		function setInputValue(val, emitImmediately) {
			if (inputValue.value !== val) {
				inputValue.value = val;
				if (emitImmediately || props.inputDebounce === 0 || props.inputDebounce === "0") emit("inputValue", val);
				else inputValueTimer = setTimeout(() => {
					inputValueTimer = null;
					emit("inputValue", val);
				}, props.inputDebounce);
			}
		}
		function updateInputValue(val, noFiltering, internal) {
			userInputValue = internal !== true;
			if (props.useInput) {
				setInputValue(val, true);
				if (noFiltering || userInputValue) defaultInputValue = val;
				if (!noFiltering) filter(val);
			}
		}
		function filter(val, keepClosed, afterUpdateFn) {
			if (props.onFilter === void 0 || !keepClosed && !state.focused.value) return;
			if (state.innerLoading.value) emit("filterAbort");
			else {
				state.innerLoading.value = true;
				innerLoadingIndicator.value = true;
			}
			if (val !== "" && !props.multiple && innerValue.value.length !== 0 && !userInputValue && val === getOptionLabel.value(innerValue.value[0])) val = "";
			const localFilterId = setTimeout(() => {
				if (menu.value) menu.value = false;
			}, 10);
			if (filterId !== null) clearTimeout(filterId);
			filterId = localFilterId;
			emit("filter", val, (fn, afterFn) => {
				if ((keepClosed || state.focused.value) && filterId === localFilterId) {
					clearTimeout(filterId);
					if (typeof fn === "function") fn();
					innerLoadingIndicator.value = false;
					nextTick(() => {
						state.innerLoading.value = false;
						if (state.editable.value) if (keepClosed) {
							if (menu.value) hidePopup();
						} else if (menu.value) updateMenu(true);
						else menu.value = true;
						if (typeof afterFn === "function") nextTick(() => {
							afterFn(proxy);
						});
						if (typeof afterUpdateFn === "function") nextTick(() => {
							afterUpdateFn(proxy);
						});
					});
				}
			}, () => {
				if (state.focused.value && filterId === localFilterId) {
					clearTimeout(filterId);
					state.innerLoading.value = false;
					innerLoadingIndicator.value = false;
				}
				if (menu.value) menu.value = false;
			});
		}
		function getMenu() {
			return h(QMenu_default, {
				ref: menuRef,
				class: menuContentClass.value,
				style: props.popupContentStyle,
				modelValue: menu.value,
				fit: !props.menuShrink,
				cover: props.optionsCover && !noOptions.value && !props.useInput,
				anchor: props.menuAnchor,
				self: props.menuSelf,
				offset: props.menuOffset,
				dark: isOptionsDark.value,
				noParentEvent: true,
				noRefocus: true,
				noFocus: true,
				noRouteDismiss: props.popupNoRouteDismiss,
				square: squaredMenu.value,
				transitionShow: props.transitionShow,
				transitionHide: props.transitionHide,
				transitionDuration: props.transitionDuration,
				separateClosePopup: true,
				...listboxAttrs.value,
				onScrollPassive: onVirtualScrollEvt,
				onBeforeShow: onControlPopupShow,
				onBeforeHide: onMenuBeforeHide,
				onShow: onMenuShow
			}, getAllOptions);
		}
		function onMenuBeforeHide(e) {
			onControlPopupHide(e);
			closeMenu();
		}
		function onMenuShow() {
			setVirtualScrollSize();
		}
		function onDialogFieldFocus(e) {
			stop(e);
			targetRef.value?.focus();
			dialogFieldFocused.value = true;
			window.scrollTo(window.pageXOffset || window.scrollX || document.body.scrollLeft || 0, 0);
		}
		function onDialogFieldBlur(e) {
			stop(e);
			nextTick(() => {
				dialogFieldFocused.value = false;
			});
		}
		function getDialog() {
			const content = [h(QField_default, {
				class: `col-auto ${state.fieldClass.value}`,
				...innerFieldProps.value,
				for: state.targetUid.value,
				dark: isOptionsDark.value,
				square: true,
				loading: innerLoadingIndicator.value,
				itemAligned: false,
				filled: true,
				stackLabel: inputValue.value.length !== 0,
				...state.splitAttrs.listeners.value,
				onFocus: onDialogFieldFocus,
				onBlur: onDialogFieldBlur
			}, {
				...slots,
				rawControl: () => state.getControl(true),
				before: void 0,
				after: void 0
			})];
			if (menu.value) content.push(h("div", {
				ref: menuContentRef,
				class: menuContentClass.value + " scroll",
				style: props.popupContentStyle,
				...listboxAttrs.value,
				onClick: prevent,
				onScrollPassive: onVirtualScrollEvt
			}, getAllOptions()));
			return h(QDialog_default, {
				ref: dialogRef,
				modelValue: dialog.value,
				position: props.useInput ? "top" : void 0,
				transitionShow: transitionShowComputed,
				transitionHide: props.transitionHide,
				transitionDuration: props.transitionDuration,
				noRouteDismiss: props.popupNoRouteDismiss,
				onBeforeShow: onControlPopupShow,
				onBeforeHide: onDialogBeforeHide,
				onHide: onDialogHide,
				onShow: onDialogShow
			}, () => h("div", { class: "q-select__dialog" + (isOptionsDark.value ? " q-select__dialog--dark q-dark" : "") + (dialogFieldFocused.value ? " q-select__dialog--focused" : "") }, content));
		}
		function onDialogBeforeHide(e) {
			onControlPopupHide(e);
			if (dialogRef.value !== null) dialogRef.value.__updateRefocusTarget(state.rootRef.value.querySelector(".q-field__native > [tabindex]:last-child"));
			state.focused.value = false;
		}
		function onDialogHide(e) {
			hidePopup();
			if (!state.focused.value) emit("blur", e);
			resetInputValue();
		}
		function onDialogShow() {
			const el = document.activeElement;
			if ((el === null || el.id !== state.targetUid.value) && targetRef.value !== null && targetRef.value !== el) targetRef.value.focus();
			setVirtualScrollSize();
		}
		function closeMenu() {
			if (dialog.value) return;
			optionIndex.value = -1;
			if (menu.value) menu.value = false;
			if (!state.focused.value) {
				if (filterId !== null) {
					clearTimeout(filterId);
					filterId = null;
				}
				if (state.innerLoading.value) {
					emit("filterAbort");
					state.innerLoading.value = false;
					innerLoadingIndicator.value = false;
				}
			}
		}
		function showPopup(e) {
			if (!state.editable.value) return;
			if (hasDialog) {
				state.onControlFocusin(e);
				dialog.value = true;
				nextTick(() => {
					state.focus();
				});
			} else state.focus();
			if (props.onFilter !== void 0) filter(inputValue.value);
			else if (!noOptions.value || slots["no-option"] !== void 0) menu.value = true;
		}
		function hidePopup() {
			dialog.value = false;
			closeMenu();
		}
		function resetInputValue() {
			if (props.useInput) updateInputValue(!props.multiple && props.fillInput && innerValue.value.length !== 0 ? getOptionLabel.value(innerValue.value[0]) || "" : "", true, true);
		}
		function updateMenu(show) {
			let localOptionIndex = -1;
			if (show) {
				if (innerValue.value.length !== 0) {
					const val = getOptionValue.value(innerValue.value[0]);
					localOptionIndex = props.options.findIndex((v) => isDeepEqual(getOptionValue.value(v), val));
				}
				localResetVirtualScroll(localOptionIndex);
			}
			setOptionIndex(localOptionIndex);
		}
		function rerenderMenu(newLength, oldLength) {
			if (menu.value && !state.innerLoading.value) {
				localResetVirtualScroll(-1, true);
				nextTick(() => {
					if (menu.value && !state.innerLoading.value) if (newLength > oldLength) localResetVirtualScroll();
					else updateMenu(true);
				});
			}
		}
		function updateMenuPosition() {
			if (!dialog.value) menuRef.value?.updatePosition();
		}
		function onControlPopupShow(e) {
			if (e !== void 0) stop(e);
			emit("popupShow", e);
			state.hasPopupOpen = true;
			state.onControlFocusin(e);
		}
		function onControlPopupHide(e) {
			if (e !== void 0) stop(e);
			emit("popupHide", e);
			state.hasPopupOpen = false;
			state.onControlFocusout(e);
		}
		function updatePreState() {
			hasDialog = !$q.platform.is.mobile && props.behavior !== "dialog" ? false : props.behavior !== "menu" && (props.useInput ? slots["no-option"] !== void 0 || props.onFilter !== void 0 || !noOptions.value : true);
			transitionShowComputed = $q.platform.is.ios && hasDialog && props.useInput ? "fade" : props.transitionShow;
		}
		onBeforeUpdate(updatePreState);
		onUpdated(updateMenuPosition);
		updatePreState();
		onBeforeUnmount(() => {
			if (filterTimer !== null) clearTimeout(filterTimer);
			if (inputValueTimer !== null) clearTimeout(inputValueTimer);
		});
		Object.assign(proxy, {
			showPopup,
			hidePopup,
			removeAtIndex,
			add,
			toggleOption,
			getOptionIndex: () => optionIndex.value,
			setOptionIndex,
			moveOptionSelection,
			filter,
			updateMenuPosition,
			updateInputValue,
			isOptionSelected,
			getEmittingOptionValue,
			isOptionDisabled: (...args) => isOptionDisabled.value(...args) === true,
			getOptionValue: (...args) => getOptionValue.value(...args),
			getOptionLabel: (...args) => getOptionLabel.value(...args)
		});
		Object.assign(state, {
			innerValue,
			fieldClass: computed(() => `q-select q-field--auto-height q-select--with${props.useInput ? "" : "out"}-input q-select--with${props.useChips ? "" : "out"}-chips q-select--${props.multiple ? "multiple" : "single"}`),
			inputRef,
			targetRef,
			hasValue,
			showPopup,
			floatingLabel: computed(() => !props.hideSelected && hasValue.value || typeof inputValue.value === "number" || inputValue.value.length !== 0 || fieldValueIsFilled(props.displayValue)),
			getControlChild: () => {
				if (state.editable.value && (dialog.value || !noOptions.value || slots["no-option"] !== void 0)) return hasDialog ? getDialog() : getMenu();
				else if (state.hasPopupOpen) state.hasPopupOpen = false;
			},
			controlEvents: {
				onFocusin(e) {
					state.onControlFocusin(e);
				},
				onFocusout(e) {
					state.onControlFocusout(e, () => {
						resetInputValue();
						closeMenu();
					});
				},
				onClick(e) {
					prevent(e);
					if (!hasDialog && menu.value) {
						closeMenu();
						targetRef.value?.focus();
						return;
					}
					showPopup(e);
				}
			},
			getControl: (fromDialog) => {
				const child = getSelection();
				const isTarget = fromDialog === true || !dialog.value || !hasDialog;
				if (props.useInput) child.push(getInput(fromDialog, isTarget));
				else if (state.editable.value) {
					const attrs = isTarget ? comboboxAttrs.value : void 0;
					child.push(h("input", {
						ref: isTarget ? targetRef : void 0,
						key: "d_t",
						class: "q-select__focus-target",
						id: isTarget ? state.targetUid.value : void 0,
						value: ariaCurrentValue.value,
						readonly: true,
						"data-autofocus": fromDialog === true || props.autofocus || void 0,
						...attrs,
						onKeydown: onTargetKeydown,
						onKeyup: onTargetKeyup,
						onKeypress: onTargetKeypress
					}));
					if (isTarget && typeof props.autocomplete === "string" && props.autocomplete.length !== 0) child.push(h("input", {
						class: "q-select__autocomplete-input",
						autocomplete: props.autocomplete,
						tabindex: -1,
						onKeyup: onTargetAutocomplete
					}));
				}
				if (nameProp.value !== void 0 && !props.disable && innerOptionsValue.value.length !== 0) {
					const opts = innerOptionsValue.value.map((value) => h("option", {
						value,
						selected: true
					}));
					child.push(h("select", {
						class: "hidden",
						name: nameProp.value,
						multiple: props.multiple
					}, opts));
				}
				return h("div", {
					class: "q-field__native row items-center",
					...props.useInput || !isTarget ? void 0 : state.splitAttrs.attributes.value,
					...state.splitAttrs.listeners.value
				}, child);
			},
			getInnerAppend: () => !props.loading && !innerLoadingIndicator.value && !props.hideDropdownIcon ? [h(QIcon_default, {
				class: "q-select__dropdown-icon" + (menu.value ? " rotate-180" : ""),
				name: dropdownArrowIcon.value
			})] : null
		});
		return useField(state);
	}
});
//#endregion
//#region src/pages/HistoryPage.vue?vue&type=script&setup=true&lang.ts
var HistoryPage_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "HistoryPage",
	setup(__props, { expose: __expose }) {
		__expose();
		const route = useRoute();
		const router = useRouter();
		const networkStore = useNetworkStore();
		const userId = Number(route.params.id);
		const userName = ref("Cargando usuario...");
		const history = ref([]);
		const loading = ref(true);
		const selectedField = ref("todos");
		const fieldOptions = [
			{
				label: "Todos los campos",
				value: "todos"
			},
			{
				label: "Nombre",
				value: "nombre"
			},
			{
				label: "Apellido",
				value: "apellido"
			},
			{
				label: "Documento",
				value: "documento"
			},
			{
				label: "Teléfono",
				value: "telefono"
			},
			{
				label: "Dirección",
				value: "direccion"
			},
			{
				label: "Contraseña",
				value: "password"
			}
		];
		onMounted(async () => {
			await loadUserInfo();
			await loadHistory();
		});
		async function loadUserInfo() {
			try {
				if (networkStore.isOnline) {
					const response = await api.get(`/usuarios/${userId}`);
					userName.value = `${response.data.nombre} ${response.data.apellido} (${response.data.documento})`;
				} else {
					const user = (await databaseService.getUsuarios()).find((u) => u.id === userId);
					if (user) userName.value = `${user.nombre} ${user.apellido} (${user.documento})`;
					else userName.value = `Usuario #${userId}`;
				}
			} catch {
				userName.value = `Usuario #${userId}`;
			}
		}
		async function loadHistory() {
			loading.value = true;
			const campoFilter = selectedField.value === "todos" ? void 0 : selectedField.value;
			try {
				if (networkStore.isOnline) {
					const response = await api.get(`/usuarios/${userId}/historial`, { params: { campo: campoFilter } });
					history.value = response.data;
				} else {
					const localHistory = await databaseService.getHistorialLocal(userId);
					if (campoFilter) history.value = localHistory.filter((h) => h.campo === campoFilter);
					else history.value = localHistory;
				}
			} catch {
				const localHistory = await databaseService.getHistorialLocal(userId);
				if (campoFilter) history.value = localHistory.filter((h) => h.campo === campoFilter);
				else history.value = localHistory;
			} finally {
				loading.value = false;
			}
		}
		function getFieldLabel(key) {
			const opt = fieldOptions.find((o) => o.value === key);
			return opt ? opt.label : key;
		}
		function getRankLabel(item) {
			const index = history.value.filter((h) => h.campo === item.campo).sort((a, b) => {
				const aActual = String(a.es_actual) === "true" || a.es_actual === true || a.es_actual === 1;
				const bActual = String(b.es_actual) === "true" || b.es_actual === true || b.es_actual === 1;
				if (aActual && !bActual) return -1;
				if (!aActual && bActual) return 1;
				return b.version - a.version;
			}).findIndex((h) => h.id === item.id);
			if (index === 0) return "PRINCIPAL";
			if (index === 1) return "SECUNDARIO";
			if (index === 2) return "TERCIARIO";
			if (index === 3) return "CUATERNARIO";
			if (index === 4) return "QUINTO";
			if (index === 5) return "SEXTO";
			if (index === 6) return "SÉPTIMO";
			return `HISTÓRICO (${index + 1}°)`;
		}
		function goBack() {
			router.back();
		}
		function formatDate(iso) {
			if (!iso) return "—";
			return new Date(iso).toLocaleString("es-CO", {
				hour: "2-digit",
				minute: "2-digit",
				day: "2-digit",
				month: "short",
				year: "numeric"
			});
		}
		const __returned__ = {
			route,
			router,
			networkStore,
			userId,
			userName,
			history,
			loading,
			selectedField,
			fieldOptions,
			loadUserInfo,
			loadHistory,
			getFieldLabel,
			getRankLabel,
			goBack,
			formatDate
		};
		Object.defineProperty(__returned__, "__isScriptSetup", {
			enumerable: false,
			value: true
		});
		return __returned__;
	}
});
//#endregion
//#region src/pages/HistoryPage.vue
var _hoisted_1 = { class: "row items-center q-mb-md" };
var _hoisted_2 = { class: "text-body2 text-grey-6 q-mt-xs" };
var _hoisted_3 = {
	key: 0,
	class: "text-center q-pa-xl"
};
var _hoisted_4 = {
	key: 1,
	class: "text-center q-pa-xl"
};
var _hoisted_5 = { key: 2 };
var _hoisted_6 = { class: "row justify-between items-center" };
var _hoisted_7 = { class: "history-item__version" };
var _hoisted_8 = { class: "history-item__value" };
var _hoisted_9 = { class: "text-grey-5 text-weight-medium text-caption block text-uppercase" };
var _hoisted_10 = {
	key: 0,
	class: "q-my-xs text-caption text-primary row items-center"
};
var _hoisted_11 = {
	key: 0,
	class: "text-grey-5 q-ml-xs"
};
var _hoisted_12 = { class: "history-item__date row items-center justify-between text-grey-6 text-caption" };
var _hoisted_13 = { key: 0 };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
	return openBlock(), createBlock(QPage_default, {
		class: "q-pa-md",
		style: { "padding-top": "16px" }
	}, {
		default: withCtx(() => [
			createBaseVNode("div", _hoisted_1, [createVNode(QBtn_default, {
				flat: "",
				round: "",
				icon: "arrow_back",
				color: "primary",
				class: "q-mr-sm",
				onClick: $setup.goBack
			}), createBaseVNode("div", null, [_cache[1] || (_cache[1] = createBaseVNode("h2", {
				class: "text-h5 text-weight-bold q-mb-none",
				style: { "color": "var(--color-primary)" }
			}, " Historial de Cambios ", -1)), createBaseVNode("p", _hoisted_2, toDisplayString($setup.userName), 1)])]),
			createVNode(QSelect_default, {
				modelValue: $setup.selectedField,
				"onUpdate:modelValue": [_cache[0] || (_cache[0] = ($event) => $setup.selectedField = $event), $setup.loadHistory],
				options: $setup.fieldOptions,
				label: "Filtrar por campo",
				outlined: "",
				dark: "",
				dense: "",
				"emit-value": "",
				"map-options": "",
				class: "q-mb-md",
				style: { "border-radius": "12px" }
			}, {
				prepend: withCtx(() => [createVNode(QIcon_default, { name: "filter_list" })]),
				_: 1
			}, 8, ["modelValue"]),
			$setup.loading ? (openBlock(), createElementBlock("div", _hoisted_3, [createVNode(QSpinnerDots_default, {
				size: "40px",
				color: "primary"
			})])) : $setup.history.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_4, [createVNode(QIcon_default, {
				name: "history_toggle_off",
				size: "64px",
				color: "grey-7"
			}), _cache[2] || (_cache[2] = createBaseVNode("p", { class: "text-grey-5 q-mt-md" }, "No hay cambios registrados", -1))])) : (openBlock(), createElementBlock("div", _hoisted_5, [(openBlock(true), createElementBlock(Fragment, null, renderList($setup.history, (item, index) => {
				return openBlock(), createElementBlock("div", {
					key: item.id,
					class: normalizeClass(["history-item q-mb-md", { "history-item--old": !item.es_actual }])
				}, [
					createBaseVNode("div", _hoisted_6, [createBaseVNode("div", _hoisted_7, [createTextVNode(" Versión " + toDisplayString(item.version) + " ", 1), createVNode(QChip_default, {
						dense: "",
						color: item.es_actual ? "primary" : "grey-8",
						"text-color": item.es_actual ? "dark" : "white",
						label: $setup.getRankLabel(item),
						class: "text-weight-bold q-ml-sm",
						size: "xs"
					}, null, 8, [
						"color",
						"text-color",
						"label"
					])]), createBaseVNode("div", null, [createVNode(QChip_default, {
						dense: "",
						color: item.origen === "ONLINE" ? "secondary" : "warning",
						"text-color": "dark",
						icon: item.origen === "ONLINE" ? "cloud" : "wifi_off",
						label: item.origen,
						size: "xs",
						class: "text-weight-bold"
					}, null, 8, [
						"color",
						"icon",
						"label"
					])])]),
					createBaseVNode("div", _hoisted_8, [createBaseVNode("span", _hoisted_9, toDisplayString($setup.getFieldLabel(item.campo)), 1), createTextVNode(" " + toDisplayString(item.valor), 1)]),
					item.veces_reutilizado && Number(item.veces_reutilizado) > 0 ? (openBlock(), createElementBlock("div", _hoisted_10, [
						createVNode(QIcon_default, {
							name: "replay",
							size: "14px",
							class: "q-mr-xs"
						}),
						createBaseVNode("span", null, [_cache[3] || (_cache[3] = createTextVNode("Reutilizado ", -1)), createBaseVNode("strong", null, toDisplayString(item.veces_reutilizado) + " veces", 1)]),
						item.fecha_ultima_activacion ? (openBlock(), createElementBlock("span", _hoisted_11, " (Última activación: " + toDisplayString($setup.formatDate(item.fecha_ultima_activacion)) + ") ", 1)) : createCommentVNode("", true)
					])) : createCommentVNode("", true),
					createBaseVNode("div", _hoisted_12, [createBaseVNode("span", null, [createVNode(QIcon_default, {
						name: "event",
						size: "12px",
						class: "q-mr-xs"
					}), createTextVNode(" Creado: " + toDisplayString($setup.formatDate(item.fecha_creacion)), 1)]), item.fecha_sincronizacion ? (openBlock(), createElementBlock("span", _hoisted_13, [createVNode(QIcon_default, {
						name: "sync",
						size: "12px",
						class: "q-mr-xs"
					}), createTextVNode(" Sinc: " + toDisplayString($setup.formatDate(item.fecha_sincronizacion)), 1)])) : createCommentVNode("", true)])
				], 2);
			}), 128))]))
		]),
		_: 1
	});
}
var HistoryPage_default = /*#__PURE__*/ _plugin_vue_export_helper_default(HistoryPage_vue_vue_type_script_setup_true_lang_default, [["render", _sfc_render], ["__file", "HistoryPage.vue"]]);
//#endregion
export { HistoryPage_default as default };

//# sourceMappingURL=HistoryPage-CqDQiyR0.js.map