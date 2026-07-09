const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./web-jrKEuSYk.js","./dist-DAO462gx.js"])))=>i.map(i=>d[i]);
import { $ as noop, B as layoutKey, E as hMergeSlot, O as hSlot, Q as listenOpts, R as emptyRenderFn, S as useSpinnerProps, V as pageContainerKey, c as QBtn_default, dt as Transition, i as api, it as createComponent, k as hUniqueSlot, lt as isRuntimeSsrPreHydration, n as syncService, t as useNetworkStore, w as QIcon_default, x as useSpinner } from "./network-Dbb0uhtP.js";
import { A as onUnmounted, C as nextTick, E as onBeforeUnmount, F as resolveComponent, G as ref, H as withDirectives, M as openBlock, N as provide, P as renderList, S as inject, V as withCtx, W as reactive, _ as createVNode, d as createBlock, f as createCommentVNode, g as createTextVNode, k as onMounted, l as computed, lt as normalizeClass, o as Fragment, p as createElementBlock, u as createBaseVNode, ut as toDisplayString, v as defineComponent, x as h, y as getCurrentInstance, z as watch } from "./pinia-3_kWn-gx.js";
import { r as registerPlugin, t as Capacitor } from "./dist-DAO462gx.js";
import { t as __vitePreload } from "./preload-helper-iIio8xkS.js";
import { f as useRouter, p as _plugin_vue_export_helper_default } from "./use-dark-DPLXRKW0.js";
import { t as databaseService } from "./database-DoILKR0-.js";
import { C as getVerticalScrollPosition, F as useAuthStore, I as connectSocket, L as disconnectSocket, R as getSocket, S as getScrollbarWidth, b as getHorizontalScrollPosition, f as QCardActions_default, h as QDialog_default, m as QCard_default, p as QCardSection_default, w as scrollTargetProp, x as getScrollTarget } from "./index-C6i8igny.js";
import { t as QChip_default } from "./QChip-Bx6UGqzI.js";
import { t as QTooltip_default } from "./QTooltip-C_4HRcAA.js";
import { t as QResizeObserver_default } from "./QResizeObserver-DtwSlKXn.js";
import { t as QSpinnerDots_default } from "./QSpinnerDots-BlrGZuFe.js";
import { n as ClosePopup_default, t as useQuasar } from "./use-quasar-CgO-gf7R.js";
//#region node_modules/quasar/src/components/toolbar/QToolbarTitle.js
var QToolbarTitle_default = createComponent({
	name: "QToolbarTitle",
	props: { shrink: Boolean },
	setup(props, { slots }) {
		const classes = computed(() => "q-toolbar__title ellipsis" + (props.shrink ? " col-shrink" : ""));
		return () => h("div", { class: classes.value }, hSlot(slots.default));
	}
});
//#endregion
//#region node_modules/quasar/src/components/toolbar/QToolbar.js
var QToolbar_default = createComponent({
	name: "QToolbar",
	props: { inset: Boolean },
	setup(props, { slots }) {
		const classes = computed(() => "q-toolbar row no-wrap items-center" + (props.inset ? " q-toolbar--inset" : ""));
		return () => h("div", {
			class: classes.value,
			role: "toolbar"
		}, hSlot(slots.default));
	}
});
//#endregion
//#region node_modules/quasar/src/components/header/QHeader.js
function updateLocal$1(prop, val) {
	if (prop.value !== val) prop.value = val;
}
var QHeader_default = createComponent({
	name: "QHeader",
	props: {
		modelValue: {
			type: Boolean,
			default: true
		},
		reveal: Boolean,
		revealOffset: {
			type: Number,
			default: 250
		},
		bordered: Boolean,
		elevated: Boolean,
		heightHint: {
			type: [String, Number],
			default: 50
		}
	},
	emits: ["reveal", "focusin"],
	setup(props, { slots, emit }) {
		const { proxy: { $q } } = getCurrentInstance();
		const $layout = inject(layoutKey, emptyRenderFn);
		if ($layout === emptyRenderFn) {
			console.error("QHeader needs to be child of QLayout");
			return emptyRenderFn;
		}
		const size = ref(Number.parseInt(props.heightHint, 10));
		const revealed = ref(true);
		const fixed = computed(() => props.reveal || $layout.view.value.includes("H") || $q.platform.is.ios && $layout.isContainer.value);
		const offset = computed(() => {
			if (!props.modelValue) return 0;
			if (fixed.value) return revealed.value ? size.value : 0;
			const localOffset = size.value - $layout.scroll.value.position;
			return Math.max(localOffset, 0);
		});
		const hidden = computed(() => !props.modelValue || fixed.value && !revealed.value);
		const revealOnFocus = computed(() => props.modelValue && hidden.value && props.reveal);
		const classes = computed(() => "q-header q-layout__section--marginal " + (fixed.value ? "fixed" : "absolute") + "-top" + (props.bordered ? " q-header--bordered" : "") + (hidden.value ? " q-header--hidden" : "") + (props.modelValue ? "" : " q-layout--prevent-focus"));
		const style = computed(() => {
			const view = $layout.rows.value.top, css = {};
			if (view[0] === "l" && $layout.left.space) css[$q.lang.rtl ? "right" : "left"] = `${$layout.left.size}px`;
			if (view[2] === "r" && $layout.right.space) css[$q.lang.rtl ? "left" : "right"] = `${$layout.right.size}px`;
			return css;
		});
		function updateLayout(prop, val) {
			$layout.update("header", prop, val);
		}
		function onResize({ height }) {
			updateLocal$1(size, height);
			updateLayout("size", height);
		}
		function onFocusin(evt) {
			if (revealOnFocus.value) updateLocal$1(revealed, true);
			emit("focusin", evt);
		}
		watch(() => props.modelValue, (val) => {
			updateLayout("space", val);
			updateLocal$1(revealed, true);
			$layout.animate();
		});
		watch(offset, (val) => {
			updateLayout("offset", val);
		});
		watch(() => props.reveal, (val) => {
			if (!val) updateLocal$1(revealed, props.modelValue);
		});
		watch(revealed, (val) => {
			$layout.animate();
			emit("reveal", val);
		});
		watch($layout.scroll, (scroll) => {
			if (props.reveal) updateLocal$1(revealed, scroll.direction === "up" || scroll.position <= props.revealOffset || scroll.position - scroll.inflectionPoint < 100);
		});
		const instance = {};
		$layout.instances.header = instance;
		if (props.modelValue) updateLayout("size", size.value);
		updateLayout("space", props.modelValue);
		updateLayout("offset", offset.value);
		onBeforeUnmount(() => {
			if ($layout.instances.header === instance) {
				$layout.instances.header = void 0;
				updateLayout("size", 0);
				updateLayout("offset", 0);
				updateLayout("space", false);
			}
		});
		return () => {
			const child = hUniqueSlot(slots.default, []);
			if (props.elevated) child.push(h("div", { class: "q-layout__shadow absolute-full overflow-hidden no-pointer-events" }));
			child.push(h(QResizeObserver_default, {
				debounce: 0,
				onResize
			}));
			return h("header", {
				class: classes.value,
				style: style.value,
				onFocusin
			}, child);
		};
	}
});
//#endregion
//#region node_modules/quasar/src/components/page/QPageContainer.js
var QPageContainer_default = createComponent({
	name: "QPageContainer",
	setup(_, { slots }) {
		const { proxy: { $q } } = getCurrentInstance();
		const $layout = inject(layoutKey, emptyRenderFn);
		if ($layout === emptyRenderFn) {
			console.error("QPageContainer needs to be child of QLayout");
			return emptyRenderFn;
		}
		provide(pageContainerKey, true);
		const style = computed(() => {
			const css = {};
			if ($layout.header.space) css.paddingTop = `${$layout.header.size}px`;
			if ($layout.right.space) css[`padding${$q.lang.rtl ? "Left" : "Right"}`] = `${$layout.right.size}px`;
			if ($layout.footer.space) css.paddingBottom = `${$layout.footer.size}px`;
			if ($layout.left.space) css[`padding${$q.lang.rtl ? "Right" : "Left"}`] = `${$layout.left.size}px`;
			return css;
		});
		return () => h("div", {
			class: "q-page-container",
			style: style.value
		}, hSlot(slots.default));
	}
});
//#endregion
//#region node_modules/quasar/src/components/footer/QFooter.js
function updateLocal(prop, val) {
	if (prop.value !== val) prop.value = val;
}
var QFooter_default = createComponent({
	name: "QFooter",
	props: {
		modelValue: {
			type: Boolean,
			default: true
		},
		reveal: Boolean,
		bordered: Boolean,
		elevated: Boolean,
		heightHint: {
			type: [String, Number],
			default: 50
		}
	},
	emits: ["reveal", "focusin"],
	setup(props, { slots, emit }) {
		const { proxy: { $q } } = getCurrentInstance();
		const $layout = inject(layoutKey, emptyRenderFn);
		if ($layout === emptyRenderFn) {
			console.error("QFooter needs to be child of QLayout");
			return emptyRenderFn;
		}
		const size = ref(Number.parseInt(props.heightHint, 10));
		const revealed = ref(true);
		const windowHeight = ref(isRuntimeSsrPreHydration.value || $layout.isContainer.value ? 0 : window.innerHeight);
		const fixed = computed(() => props.reveal || $layout.view.value.includes("F") || $q.platform.is.ios && $layout.isContainer.value);
		const containerHeight = computed(() => $layout.isContainer.value ? $layout.containerHeight.value : windowHeight.value);
		const offset = computed(() => {
			if (!props.modelValue) return 0;
			if (fixed.value) return revealed.value ? size.value : 0;
			const localOffset = $layout.scroll.value.position + containerHeight.value + size.value - $layout.height.value;
			return Math.max(localOffset, 0);
		});
		const hidden = computed(() => !props.modelValue || fixed.value && !revealed.value);
		const revealOnFocus = computed(() => props.modelValue && hidden.value && props.reveal);
		const classes = computed(() => "q-footer q-layout__section--marginal " + (fixed.value ? "fixed" : "absolute") + "-bottom" + (props.bordered ? " q-footer--bordered" : "") + (hidden.value ? " q-footer--hidden" : "") + (props.modelValue ? "" : " q-layout--prevent-focus" + (fixed.value ? "" : " hidden")));
		const style = computed(() => {
			const view = $layout.rows.value.bottom, css = {};
			if (view[0] === "l" && $layout.left.space) css[$q.lang.rtl ? "right" : "left"] = `${$layout.left.size}px`;
			if (view[2] === "r" && $layout.right.space) css[$q.lang.rtl ? "left" : "right"] = `${$layout.right.size}px`;
			return css;
		});
		function updateLayout(prop, val) {
			$layout.update("footer", prop, val);
		}
		function onResize({ height }) {
			updateLocal(size, height);
			updateLayout("size", height);
		}
		function updateRevealed() {
			if (!props.reveal) return;
			const { direction, position, inflectionPoint } = $layout.scroll.value;
			updateLocal(revealed, direction === "up" || position - inflectionPoint < 100 || $layout.height.value - containerHeight.value - position - size.value < 300);
		}
		function onFocusin(evt) {
			if (revealOnFocus.value) updateLocal(revealed, true);
			emit("focusin", evt);
		}
		watch(() => props.modelValue, (val) => {
			updateLayout("space", val);
			updateLocal(revealed, true);
			$layout.animate();
		});
		watch(offset, (val) => {
			updateLayout("offset", val);
		});
		watch(() => props.reveal, (val) => {
			if (!val) updateLocal(revealed, props.modelValue);
		});
		watch(revealed, (val) => {
			$layout.animate();
			emit("reveal", val);
		});
		watch([
			size,
			$layout.scroll,
			$layout.height
		], updateRevealed);
		watch(() => $q.screen.height, (val) => {
			if (!$layout.isContainer.value) updateLocal(windowHeight, val);
		});
		const instance = {};
		$layout.instances.footer = instance;
		if (props.modelValue) updateLayout("size", size.value);
		updateLayout("space", props.modelValue);
		updateLayout("offset", offset.value);
		onBeforeUnmount(() => {
			if ($layout.instances.footer === instance) {
				$layout.instances.footer = void 0;
				updateLayout("size", 0);
				updateLayout("offset", 0);
				updateLayout("space", false);
			}
		});
		return () => {
			const child = hMergeSlot(slots.default, [h(QResizeObserver_default, {
				debounce: 0,
				onResize
			})]);
			if (props.elevated) child.push(h("div", { class: "q-layout__shadow absolute-full overflow-hidden no-pointer-events" }));
			return h("footer", {
				class: classes.value,
				style: style.value,
				onFocusin
			}, child);
		};
	}
});
//#endregion
//#region node_modules/quasar/src/components/spinner/QSpinnerGears.js
var innerHTML = "<g transform=\"translate(-20,-20)\"><path d=\"M79.9,52.6C80,51.8,80,50.9,80,50s0-1.8-0.1-2.6l-5.1-0.4c-0.3-2.4-0.9-4.6-1.8-6.7l4.2-2.9c-0.7-1.6-1.6-3.1-2.6-4.5 L70,35c-1.4-1.9-3.1-3.5-4.9-4.9l2.2-4.6c-1.4-1-2.9-1.9-4.5-2.6L59.8,27c-2.1-0.9-4.4-1.5-6.7-1.8l-0.4-5.1C51.8,20,50.9,20,50,20 s-1.8,0-2.6,0.1l-0.4,5.1c-2.4,0.3-4.6,0.9-6.7,1.8l-2.9-4.1c-1.6,0.7-3.1,1.6-4.5,2.6l2.1,4.6c-1.9,1.4-3.5,3.1-5,4.9l-4.5-2.1 c-1,1.4-1.9,2.9-2.6,4.5l4.1,2.9c-0.9,2.1-1.5,4.4-1.8,6.8l-5,0.4C20,48.2,20,49.1,20,50s0,1.8,0.1,2.6l5,0.4 c0.3,2.4,0.9,4.7,1.8,6.8l-4.1,2.9c0.7,1.6,1.6,3.1,2.6,4.5l4.5-2.1c1.4,1.9,3.1,3.5,5,4.9l-2.1,4.6c1.4,1,2.9,1.9,4.5,2.6l2.9-4.1 c2.1,0.9,4.4,1.5,6.7,1.8l0.4,5.1C48.2,80,49.1,80,50,80s1.8,0,2.6-0.1l0.4-5.1c2.3-0.3,4.6-0.9,6.7-1.8l2.9,4.2 c1.6-0.7,3.1-1.6,4.5-2.6L65,69.9c1.9-1.4,3.5-3,4.9-4.9l4.6,2.2c1-1.4,1.9-2.9,2.6-4.5L73,59.8c0.9-2.1,1.5-4.4,1.8-6.7L79.9,52.6 z M50,65c-8.3,0-15-6.7-15-15c0-8.3,6.7-15,15-15s15,6.7,15,15C65,58.3,58.3,65,50,65z\" fill=\"currentColor\"><animateTransform attributeName=\"transform\" type=\"rotate\" from=\"90 50 50\" to=\"0 50 50\" dur=\"1s\" repeatCount=\"indefinite\"></animateTransform></path></g><g transform=\"translate(20,20) rotate(15 50 50)\"><path d=\"M79.9,52.6C80,51.8,80,50.9,80,50s0-1.8-0.1-2.6l-5.1-0.4c-0.3-2.4-0.9-4.6-1.8-6.7l4.2-2.9c-0.7-1.6-1.6-3.1-2.6-4.5 L70,35c-1.4-1.9-3.1-3.5-4.9-4.9l2.2-4.6c-1.4-1-2.9-1.9-4.5-2.6L59.8,27c-2.1-0.9-4.4-1.5-6.7-1.8l-0.4-5.1C51.8,20,50.9,20,50,20 s-1.8,0-2.6,0.1l-0.4,5.1c-2.4,0.3-4.6,0.9-6.7,1.8l-2.9-4.1c-1.6,0.7-3.1,1.6-4.5,2.6l2.1,4.6c-1.9,1.4-3.5,3.1-5,4.9l-4.5-2.1 c-1,1.4-1.9,2.9-2.6,4.5l4.1,2.9c-0.9,2.1-1.5,4.4-1.8,6.8l-5,0.4C20,48.2,20,49.1,20,50s0,1.8,0.1,2.6l5,0.4 c0.3,2.4,0.9,4.7,1.8,6.8l-4.1,2.9c0.7,1.6,1.6,3.1,2.6,4.5l4.5-2.1c1.4,1.9,3.1,3.5,5,4.9l-2.1,4.6c1.4,1,2.9,1.9,4.5,2.6l2.9-4.1 c2.1,0.9,4.4,1.5,6.7,1.8l0.4,5.1C48.2,80,49.1,80,50,80s1.8,0,2.6-0.1l0.4-5.1c2.3-0.3,4.6-0.9,6.7-1.8l2.9,4.2 c1.6-0.7,3.1-1.6,4.5-2.6L65,69.9c1.9-1.4,3.5-3,4.9-4.9l4.6,2.2c1-1.4,1.9-2.9,2.6-4.5L73,59.8c0.9-2.1,1.5-4.4,1.8-6.7L79.9,52.6 z M50,65c-8.3,0-15-6.7-15-15c0-8.3,6.7-15,15-15s15,6.7,15,15C65,58.3,58.3,65,50,65z\" fill=\"currentColor\"><animateTransform attributeName=\"transform\" type=\"rotate\" from=\"0 50 50\" to=\"90 50 50\" dur=\"1s\" repeatCount=\"indefinite\"></animateTransform></path></g>";
var QSpinnerGears_default = createComponent({
	name: "QSpinnerGears",
	props: useSpinnerProps,
	setup(props) {
		const { cSize, classes } = useSpinner(props);
		return () => h("svg", {
			class: classes.value,
			width: cSize.value,
			height: cSize.value,
			viewBox: "0 0 100 100",
			preserveAspectRatio: "xMidYMid",
			xmlns: "http://www.w3.org/2000/svg",
			innerHTML
		});
	}
});
//#endregion
//#region node_modules/quasar/src/components/scroll-observer/QScrollObserver.js
var { passive } = listenOpts;
var axisValues = [
	"both",
	"horizontal",
	"vertical"
];
var QScrollObserver_default = createComponent({
	name: "QScrollObserver",
	props: {
		axis: {
			type: String,
			validator: (v) => axisValues.includes(v),
			default: "vertical"
		},
		debounce: [String, Number],
		scrollTarget: scrollTargetProp
	},
	emits: ["scroll"],
	setup(props, { emit }) {
		const scroll = {
			position: {
				top: 0,
				left: 0
			},
			direction: "down",
			directionChanged: false,
			delta: {
				top: 0,
				left: 0
			},
			inflectionPoint: {
				top: 0,
				left: 0
			}
		};
		let clearTimer = null, localScrollTarget, parentEl;
		watch(() => props.scrollTarget, () => {
			unconfigureScrollTarget();
			configureScrollTarget();
		});
		function emitEvent() {
			clearTimer?.();
			const top = Math.max(0, getVerticalScrollPosition(localScrollTarget));
			const left = getHorizontalScrollPosition(localScrollTarget);
			const delta = {
				top: top - scroll.position.top,
				left: left - scroll.position.left
			};
			if (props.axis === "vertical" && delta.top === 0 || props.axis === "horizontal" && delta.left === 0) return;
			const curDir = Math.abs(delta.top) >= Math.abs(delta.left) ? delta.top < 0 ? "up" : "down" : delta.left < 0 ? "left" : "right";
			scroll.position = {
				top,
				left
			};
			scroll.directionChanged = scroll.direction !== curDir;
			scroll.delta = delta;
			if (scroll.directionChanged) {
				scroll.direction = curDir;
				scroll.inflectionPoint = scroll.position;
			}
			emit("scroll", { ...scroll });
		}
		function configureScrollTarget() {
			localScrollTarget = getScrollTarget(parentEl, props.scrollTarget);
			localScrollTarget.addEventListener("scroll", trigger, passive);
			trigger(true);
		}
		function unconfigureScrollTarget() {
			if (localScrollTarget !== void 0) {
				localScrollTarget.removeEventListener("scroll", trigger, passive);
				localScrollTarget = void 0;
			}
		}
		function trigger(immediately) {
			if (immediately === true || props.debounce === 0 || props.debounce === "0") emitEvent();
			else if (clearTimer === null) {
				const [timer, fn] = props.debounce ? [setTimeout(emitEvent, props.debounce), clearTimeout] : [requestAnimationFrame(emitEvent), cancelAnimationFrame];
				clearTimer = () => {
					fn(timer);
					clearTimer = null;
				};
			}
		}
		const { proxy } = getCurrentInstance();
		watch(() => proxy.$q.lang.rtl, emitEvent);
		onMounted(() => {
			parentEl = proxy.$el.parentNode;
			configureScrollTarget();
		});
		onBeforeUnmount(() => {
			clearTimer?.();
			unconfigureScrollTarget();
		});
		Object.assign(proxy, {
			trigger,
			getPosition: () => scroll
		});
		return noop;
	}
});
//#endregion
//#region node_modules/quasar/src/components/layout/QLayout.js
var viewRE = /^(h|l)h(h|r) lpr (f|l)f(f|r)$/;
var QLayout_default = createComponent({
	name: "QLayout",
	props: {
		container: Boolean,
		view: {
			type: String,
			default: "hhh lpr fff",
			validator: (v) => viewRE.test(v.toLowerCase())
		},
		onScroll: Function,
		onScrollHeight: Function,
		onResize: Function
	},
	setup(props, { slots, emit }) {
		const { proxy: { $q } } = getCurrentInstance();
		const rootRef = ref(null);
		const height = ref($q.screen.height);
		const width = ref(props.container ? 0 : $q.screen.width);
		const scroll = ref({
			position: 0,
			direction: "down",
			inflectionPoint: 0
		});
		const containerHeight = ref(0);
		const scrollbarWidth = ref(isRuntimeSsrPreHydration.value ? 0 : getScrollbarWidth());
		const classes = computed(() => "q-layout q-layout--" + (props.container ? "containerized" : "standard"));
		const style = computed(() => props.container ? null : { minHeight: $q.screen.height + "px" });
		const targetStyle = computed(() => scrollbarWidth.value !== 0 ? { [$q.lang.rtl ? "left" : "right"]: `${scrollbarWidth.value}px` } : null);
		const targetChildStyle = computed(() => scrollbarWidth.value !== 0 ? {
			[$q.lang.rtl ? "right" : "left"]: 0,
			[$q.lang.rtl ? "left" : "right"]: `-${scrollbarWidth.value}px`,
			width: `calc(100% + ${scrollbarWidth.value}px)`
		} : null);
		function onPageScroll(data) {
			if (props.container || !document.qScrollPrevented) {
				const info = {
					position: data.position.top,
					direction: data.direction,
					directionChanged: data.directionChanged,
					inflectionPoint: data.inflectionPoint.top,
					delta: data.delta.top
				};
				scroll.value = info;
				if (props.onScroll !== void 0) emit("scroll", info);
			}
		}
		function onPageResize(data) {
			const { height: newHeight, width: newWidth } = data;
			let resized = false;
			if (height.value !== newHeight) {
				resized = true;
				height.value = newHeight;
				if (props.onScrollHeight !== void 0) emit("scrollHeight", newHeight);
				updateScrollbarWidth();
			}
			if (width.value !== newWidth) {
				resized = true;
				width.value = newWidth;
			}
			if (resized && props.onResize !== void 0) emit("resize", data);
		}
		function onContainerResize({ height: newHeight }) {
			if (containerHeight.value !== newHeight) {
				containerHeight.value = newHeight;
				updateScrollbarWidth();
			}
		}
		function updateScrollbarWidth() {
			if (props.container) {
				const newWidth = height.value > containerHeight.value ? getScrollbarWidth() : 0;
				if (scrollbarWidth.value !== newWidth) scrollbarWidth.value = newWidth;
			}
		}
		let animateTimer = null;
		const $layout = {
			instances: {},
			view: computed(() => props.view),
			isContainer: computed(() => props.container),
			rootRef,
			height,
			containerHeight,
			scrollbarWidth,
			totalWidth: computed(() => width.value + scrollbarWidth.value),
			rows: computed(() => {
				const rows = props.view.toLowerCase().split(" ");
				return {
					top: [...rows[0]],
					middle: [...rows[1]],
					bottom: [...rows[2]]
				};
			}),
			header: reactive({
				size: 0,
				offset: 0,
				space: false
			}),
			right: reactive({
				size: 300,
				offset: 0,
				space: false
			}),
			footer: reactive({
				size: 0,
				offset: 0,
				space: false
			}),
			left: reactive({
				size: 300,
				offset: 0,
				space: false
			}),
			scroll,
			animate() {
				if (animateTimer !== null) clearTimeout(animateTimer);
				else document.body.classList.add("q-body--layout-animate");
				animateTimer = setTimeout(() => {
					animateTimer = null;
					document.body.classList.remove("q-body--layout-animate");
				}, 155);
			},
			update(part, prop, val) {
				$layout[part][prop] = val;
			}
		};
		provide(layoutKey, $layout);
		if (getScrollbarWidth() > 0) {
			let timer = null;
			const el = document.body;
			const restoreScrollbar = () => {
				timer = null;
				el.classList.remove("hide-scrollbar");
			};
			const hideScrollbar = () => {
				if (timer === null) {
					if (el.scrollHeight > $q.screen.height) return;
					el.classList.add("hide-scrollbar");
				} else clearTimeout(timer);
				timer = setTimeout(restoreScrollbar, 300);
			};
			const updateScrollEvent = (action) => {
				if (timer !== null && action === "remove") {
					clearTimeout(timer);
					restoreScrollbar();
				}
				window[`${action}EventListener`]("resize", hideScrollbar);
			};
			watch(() => props.container ? "remove" : "add", updateScrollEvent);
			if (!props.container) updateScrollEvent("add");
			onUnmounted(() => {
				updateScrollEvent("remove");
			});
		}
		return () => {
			const content = hMergeSlot(slots.default, [h(QScrollObserver_default, { onScroll: onPageScroll }), h(QResizeObserver_default, { onResize: onPageResize })]);
			const layout = h("div", {
				class: classes.value,
				style: style.value,
				ref: props.container ? void 0 : rootRef,
				tabindex: -1
			}, content);
			if (props.container) return h("div", {
				class: "q-layout-container overflow-hidden",
				ref: rootRef
			}, [h(QResizeObserver_default, { onResize: onContainerResize }), h("div", {
				class: "absolute-full",
				style: targetStyle.value
			}, [h("div", {
				class: "scroll",
				style: targetChildStyle.value
			}, [layout])])]);
			return layout;
		};
	}
});
//#endregion
//#region src-capacitor/node_modules/@capacitor/network/dist/esm/index.js
var Network = registerPlugin("Network", { web: () => __vitePreload(() => import("./web-jrKEuSYk.js").then((m) => new m.NetworkWeb()), __vite__mapDeps([0,1]), import.meta.url) });
//#endregion
//#region src/composables/useNetwork.ts
function useNetwork() {
	const networkStore = useNetworkStore();
	let listenerHandle = null;
	async function checkStatus() {
		try {
			let physicalConnected = true;
			if (Capacitor.isNativePlatform()) physicalConnected = (await Network.getStatus()).connected;
			else if (typeof navigator !== "undefined" && !navigator.onLine) physicalConnected = false;
			if (!physicalConnected) {
				if (networkStore.isOnline) await networkStore.setOnline(false);
				return;
			}
			const socket = getSocket();
			if (!socket || !socket.connected) connectSocket();
		} catch (error) {
			console.warn("Error checking physical network status:", error);
			if (networkStore.isOnline) await networkStore.setOnline(false);
		}
		const count = await databaseService.contarPendientes();
		networkStore.updatePendingCount(count);
	}
	function startListening() {
		if (Capacitor.isNativePlatform()) Network.addListener("networkStatusChange", (status) => {
			checkStatus();
		}).then((handle) => {
			listenerHandle = handle;
		});
		else {
			window.addEventListener("online", () => checkStatus());
			window.addEventListener("offline", () => networkStore.setOnline(false));
		}
		connectSocket();
	}
	function stopListening() {
		if (listenerHandle) listenerHandle.remove();
		if (!Capacitor.isNativePlatform()) {
			window.removeEventListener("online", () => checkStatus());
			window.removeEventListener("offline", () => networkStore.setOnline(false));
		}
		disconnectSocket();
	}
	onMounted(() => {
		checkStatus();
		startListening();
	});
	onUnmounted(() => {
		stopListening();
	});
	return { checkStatus };
}
//#endregion
//#region src/components/NetworkBanner.vue?vue&type=script&setup=true&lang.ts
var NetworkBanner_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "NetworkBanner",
	setup(__props, { expose: __expose }) {
		__expose();
		const networkStore = useNetworkStore();
		const __returned__ = {
			networkStore,
			bannerClass: computed(() => {
				if (networkStore.isSyncing) return "network-banner--syncing";
				if (networkStore.isOnline) return "network-banner--online";
				return "network-banner--offline";
			}),
			iconName: computed(() => {
				if (networkStore.isSyncing) return "sync";
				if (networkStore.isOnline) return "wifi";
				return "wifi_off";
			}),
			statusText: computed(() => {
				if (networkStore.isSyncing) {
					const { current, total } = networkStore.syncProgress;
					if (total > 0) return `Sincronizando ${current}/${total}...`;
					return "Sincronizando...";
				}
				if (networkStore.isOnline) return "Online";
				return "Offline";
			})
		};
		Object.defineProperty(__returned__, "__isScriptSetup", {
			enumerable: false,
			value: true
		});
		return __returned__;
	}
});
//#endregion
//#region src/components/NetworkBanner.vue
var _hoisted_1$1 = {
	key: 1,
	class: "pending-badge q-ml-sm"
};
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
	return openBlock(), createBlock(Transition, { name: "sync-progress" }, {
		default: withCtx(() => [createBaseVNode("div", { class: normalizeClass(["network-banner", $setup.bannerClass]) }, [
			createVNode(QIcon_default, {
				name: $setup.iconName,
				size: "16px"
			}, null, 8, ["name"]),
			createBaseVNode("span", null, toDisplayString($setup.statusText), 1),
			$setup.networkStore.isSyncing ? (openBlock(), createBlock(QSpinnerDots_default, {
				key: 0,
				size: "16px",
				class: "q-ml-xs"
			})) : createCommentVNode("", true),
			$setup.networkStore.pendingChanges > 0 && !$setup.networkStore.isSyncing ? (openBlock(), createElementBlock("span", _hoisted_1$1, toDisplayString($setup.networkStore.pendingChanges) + " pendiente" + toDisplayString($setup.networkStore.pendingChanges > 1 ? "s" : ""), 1)) : createCommentVNode("", true)
		], 2)]),
		_: 1
	});
}
var NetworkBanner_default = /*#__PURE__*/ _plugin_vue_export_helper_default(NetworkBanner_vue_vue_type_script_setup_true_lang_default, [
	["render", _sfc_render$1],
	["__scopeId", "data-v-671ca904"],
	["__file", "NetworkBanner.vue"]
]);
//#endregion
//#region src/layouts/MainLayout.vue?vue&type=script&setup=true&lang.ts
var MainLayout_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "MainLayout",
	setup(__props, { expose: __expose }) {
		__expose();
		const router = useRouter();
		const authStore = useAuthStore();
		const networkStore = useNetworkStore();
		const $q = useQuasar();
		const { checkStatus } = useNetwork();
		const showSyncModal = ref(false);
		const syncStatus = ref("idle");
		const syncLogs = ref([]);
		watch(() => networkStore.isOnline, (isOnline) => {
			if (isOnline && networkStore.pendingChanges > 0) $q.dialog({
				title: "¡De vuelta en línea! 📡",
				message: `Se ha detectado conexión a internet y tienes ${networkStore.pendingChanges} cambio(s) guardado(s) localmente. ¿Deseas sincronizarlos con la nube de Render ahora?`,
				dark: true,
				cancel: {
					label: "Más tarde",
					color: "grey-5",
					flat: true
				},
				ok: {
					label: "Sincronizar ahora",
					color: "primary"
				},
				persistent: true
			}).onOk(() => {
				manualSync();
			});
		});
		watch(syncLogs, () => {
			nextTick(() => {
				const el = document.getElementById("sync-logs-container");
				if (el) el.scrollTop = el.scrollHeight;
			});
		}, { deep: true });
		function handleLogout() {
			authStore.logout();
			router.push("/login");
		}
		async function manualSync() {
			showSyncModal.value = true;
			syncStatus.value = "checking";
			syncLogs.value = ["🔄 Verificando conexión con el servidor y la base de datos de Render..."];
			const socket = getSocket();
			if (socket) socket.emit("sync-status", { status: "started" });
			try {
				if ((await api.get("/health")).data.status !== "ok") throw new Error("El servidor reporta problemas en la salud del servicio");
				networkStore.setOnline(true);
				syncLogs.value.push("🟢 Servidor y Base de Datos en línea. Conexión de red activa.");
				syncLogs.value.push("🔍 Consultando cambios locales pendientes...");
				const pendientes = await databaseService.getCambiosPendientes();
				if (pendientes.length === 0) {
					syncLogs.value.push("ℹ️ No se encontraron cambios pendientes locales por enviar.");
					syncLogs.value.push("⬇️ Descargando actualizaciones del servidor...");
					syncStatus.value = "syncing";
					await syncService.pullFromServer();
					syncLogs.value.push("✅ Base de datos local actualizada con éxito.");
					syncStatus.value = "completed";
					networkStore.updatePendingCount(0);
					networkStore.setSyncCompleted("Sincronizado");
					if (socket) socket.emit("sync-status", {
						status: "completed",
						count: 0
					});
					return;
				}
				syncStatus.value = "syncing";
				syncLogs.value.push(`📤 Encontrados ${pendientes.length} cambios locales por sincronizar.`);
				const results = (await api.post("/sync", { cambios: pendientes.map((p) => ({
					usuario_id: p.usuario_id,
					campo: p.campo,
					valor: p.valor,
					fecha_creacion: p.fecha_creacion
				})) })).data.results || [];
				let exitosos = 0;
				for (const res of results) {
					const p = pendientes.find((pen) => pen.usuario_id === res.usuario_id && pen.campo === res.campo);
					const valorStr = p ? p.valor : "";
					const labelCampo = res.campo.toUpperCase();
					if (res.success) {
						exitosos++;
						syncLogs.value.push(`✅ Sincronizado '${labelCampo}': '${valorStr}' -> Versión ${res.version} creada en la nube.`);
					} else syncLogs.value.push(`❌ Falló la sincronización de '${labelCampo}': '${valorStr}'.`);
				}
				await databaseService.marcarSincronizados();
				networkStore.updatePendingCount(0);
				syncLogs.value.push("⬇️ Descargando y consolidando datos desde la nube...");
				await syncService.pullFromServer();
				syncLogs.value.push("✅ Datos consolidados en la base de datos local.");
				syncStatus.value = "completed";
				syncLogs.value.push(`🎉 ¡Sincronización finalizada con éxito! ${exitosos}/${pendientes.length} cambios consolidados.`);
				networkStore.setSyncCompleted(`Sincronizados ${exitosos} cambios`);
				if (socket) socket.emit("sync-status", {
					status: "completed",
					count: exitosos
				});
			} catch (error) {
				console.error("Error durante la sincronización manual:", error);
				networkStore.setOnline(false);
				syncStatus.value = "error";
				syncLogs.value.push("❌ Error de conexión: El servidor local o la base de datos de Render no están disponibles.");
				syncLogs.value.push("⚠️ Se conservaron los cambios localmente en la caché. Se reintentará luego.");
				if (socket) socket.emit("sync-status", { status: "error" });
			}
		}
		function formatDate(iso) {
			return new Date(iso).toLocaleString("es-CO", {
				hour: "2-digit",
				minute: "2-digit",
				day: "2-digit",
				month: "short"
			});
		}
		const __returned__ = {
			router,
			authStore,
			networkStore,
			$q,
			checkStatus,
			showSyncModal,
			syncStatus,
			syncLogs,
			handleLogout,
			manualSync,
			formatDate,
			NetworkBanner: NetworkBanner_default
		};
		Object.defineProperty(__returned__, "__isScriptSetup", {
			enumerable: false,
			value: true
		});
		return __returned__;
	}
});
//#endregion
//#region src/layouts/MainLayout.vue
var _hoisted_1 = { class: "text-grey-6" };
var _hoisted_2 = { class: "text-h6 text-weight-bold row items-center" };
var _hoisted_3 = { class: "text-subtitle2 q-mt-md text-grey-4" };
var _hoisted_4 = {
	id: "sync-logs-container",
	style: {
		"height": "150px",
		"overflow-y": "auto",
		"background": "rgba(0,0,0,0.3)",
		"border-radius": "8px",
		"border": "1px solid rgba(255,255,255,0.05)",
		"padding": "8px",
		"font-family": "monospace",
		"font-size": "11px"
	}
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
	const _component_router_view = resolveComponent("router-view");
	return openBlock(), createBlock(QLayout_default, { view: "hHh lpR fFf" }, {
		default: withCtx(() => [
			createVNode($setup["NetworkBanner"]),
			createVNode(QHeader_default, {
				class: "bg-dark",
				style: {
					"margin-top": "32px",
					"border-bottom": "1px solid rgba(255,255,255,0.06)"
				}
			}, {
				default: withCtx(() => [createVNode(QToolbar_default, null, {
					default: withCtx(() => [
						createVNode(QToolbarTitle_default, {
							class: "text-weight-bold",
							style: { "font-size": "18px" }
						}, {
							default: withCtx(() => [createVNode(QIcon_default, {
								name: "storage",
								class: "q-mr-sm",
								color: "primary"
							}), _cache[1] || (_cache[1] = createTextVNode(" OfflineOnline ", -1))]),
							_: 1
						}),
						$setup.authStore.role === "admin" ? (openBlock(), createBlock(QChip_default, {
							key: 0,
							dense: "",
							color: "primary",
							"text-color": "dark",
							icon: "admin_panel_settings",
							label: "Admin",
							class: "text-weight-bold",
							style: { "font-size": "11px" }
						})) : $setup.authStore.user ? (openBlock(), createBlock(QChip_default, {
							key: 1,
							dense: "",
							outline: "",
							color: "primary",
							label: $setup.authStore.user.nombre,
							icon: "person",
							style: { "font-size": "11px" }
						}, null, 8, ["label"])) : createCommentVNode("", true),
						createVNode(QBtn_default, {
							flat: "",
							round: "",
							dense: "",
							icon: "sync",
							color: "primary",
							loading: $setup.networkStore.isSyncing,
							onClick: $setup.manualSync,
							class: "q-ml-sm"
						}, {
							default: withCtx(() => [createVNode(QTooltip_default, null, {
								default: withCtx(() => [..._cache[2] || (_cache[2] = [createTextVNode("Sincronizar ahora", -1)])]),
								_: 1
							})]),
							_: 1
						}, 8, ["loading"]),
						createVNode(QBtn_default, {
							flat: "",
							round: "",
							dense: "",
							icon: "logout",
							color: "grey-5",
							onClick: $setup.handleLogout,
							class: "q-ml-xs"
						}, {
							default: withCtx(() => [createVNode(QTooltip_default, null, {
								default: withCtx(() => [..._cache[3] || (_cache[3] = [createTextVNode("Cerrar sesión", -1)])]),
								_: 1
							})]),
							_: 1
						})
					]),
					_: 1
				})]),
				_: 1
			}),
			createVNode(QPageContainer_default, null, {
				default: withCtx(() => [createVNode(Transition, {
					"enter-active-class": "animated fadeIn",
					"leave-active-class": "animated fadeOut",
					mode: "out-in",
					duration: 200
				}, {
					default: withCtx(() => [createVNode(_component_router_view)]),
					_: 1
				})]),
				_: 1
			}),
			createVNode(QFooter_default, {
				class: "bg-dark text-center q-pa-xs",
				style: {
					"border-top": "1px solid rgba(255,255,255,0.06)",
					"font-size": "11px"
				}
			}, {
				default: withCtx(() => [createBaseVNode("span", _hoisted_1, [$setup.networkStore.lastSyncDate ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createTextVNode(" Última sincronización: " + toDisplayString($setup.formatDate($setup.networkStore.lastSyncDate)), 1)], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [createTextVNode(" Sin sincronización previa ")], 64))])]),
				_: 1
			}),
			createVNode(QDialog_default, {
				modelValue: $setup.showSyncModal,
				"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.showSyncModal = $event),
				persistent: ""
			}, {
				default: withCtx(() => [createVNode(QCard_default, {
					class: "bg-dark text-white q-pa-md",
					style: {
						"min-width": "350px",
						"max-width": "500px",
						"border-radius": "16px",
						"border": "1px solid rgba(255,255,255,0.08)"
					}
				}, {
					default: withCtx(() => [
						createVNode(QCardSection_default, { class: "row items-center justify-between q-pb-none" }, {
							default: withCtx(() => [createBaseVNode("div", _hoisted_2, [$setup.syncStatus === "syncing" || $setup.syncStatus === "checking" ? (openBlock(), createBlock(QSpinnerGears_default, {
								key: 0,
								color: "primary",
								size: "28px",
								class: "q-mr-sm"
							})) : $setup.syncStatus === "completed" ? (openBlock(), createBlock(QIcon_default, {
								key: 1,
								name: "check_circle",
								color: "positive",
								size: "28px",
								class: "q-mr-sm"
							})) : $setup.syncStatus === "error" ? (openBlock(), createBlock(QIcon_default, {
								key: 2,
								name: "error",
								color: "negative",
								size: "28px",
								class: "q-mr-sm"
							})) : createCommentVNode("", true), _cache[4] || (_cache[4] = createTextVNode(" Sincronización ", -1))]), $setup.syncStatus === "completed" || $setup.syncStatus === "error" ? withDirectives((openBlock(), createBlock(QBtn_default, {
								key: 0,
								flat: "",
								round: "",
								dense: "",
								icon: "close"
							}, null, 512)), [[ClosePopup_default]]) : createCommentVNode("", true)]),
							_: 1
						}),
						$setup.syncStatus === "syncing" || $setup.syncStatus === "checking" ? (openBlock(), createBlock(QCardSection_default, {
							key: 0,
							class: "text-center q-py-lg"
						}, {
							default: withCtx(() => [createVNode(QSpinnerDots_default, {
								color: "primary",
								size: "40px"
							}), createBaseVNode("div", _hoisted_3, toDisplayString($setup.syncStatus === "checking" ? "Verificando estado de la red..." : "Sincronizando datos con la nube..."), 1)]),
							_: 1
						})) : $setup.syncStatus === "completed" ? (openBlock(), createBlock(QCardSection_default, {
							key: 1,
							class: "text-center q-py-lg"
						}, {
							default: withCtx(() => [..._cache[5] || (_cache[5] = [
								createBaseVNode("div", { class: "text-h2 q-my-sm" }, "🎉", -1),
								createBaseVNode("div", { class: "text-subtitle1 text-weight-bold text-positive" }, "¡Todo al día!", -1),
								createBaseVNode("div", { class: "text-caption text-grey-5 q-mt-xs" }, "Todos los datos locales han sido sincronizados.", -1)
							])]),
							_: 1
						})) : $setup.syncStatus === "error" ? (openBlock(), createBlock(QCardSection_default, {
							key: 2,
							class: "text-center q-py-lg"
						}, {
							default: withCtx(() => [..._cache[6] || (_cache[6] = [
								createBaseVNode("div", { class: "text-h2 q-my-sm" }, "📡", -1),
								createBaseVNode("div", { class: "text-subtitle1 text-weight-bold text-negative" }, "Servidor no disponible", -1),
								createBaseVNode("div", { class: "text-caption text-grey-5 q-mt-xs" }, "No se pudo establecer conexión con la nube de Render.", -1)
							])]),
							_: 1
						})) : createCommentVNode("", true),
						createVNode(QCardSection_default, { class: "q-pt-none" }, {
							default: withCtx(() => [_cache[7] || (_cache[7] = createBaseVNode("div", { class: "text-caption text-grey-4 text-weight-bold q-mb-xs" }, "Registro de eventos:", -1)), createBaseVNode("div", _hoisted_4, [(openBlock(true), createElementBlock(Fragment, null, renderList($setup.syncLogs, (log, idx) => {
								return openBlock(), createElementBlock("div", {
									key: idx,
									class: normalizeClass(["q-py-xs", log.includes("❌") ? "text-negative" : log.includes("✅") ? "text-positive" : log.includes("🟢") ? "text-secondary" : "text-grey-4"])
								}, toDisplayString(log), 3);
							}), 128))])]),
							_: 1
						}),
						createVNode(QCardActions_default, {
							align: "right",
							class: "q-pt-none"
						}, {
							default: withCtx(() => [withDirectives(createVNode(QBtn_default, {
								disabled: $setup.syncStatus === "syncing" || $setup.syncStatus === "checking",
								flat: "",
								label: "Cerrar",
								color: "primary",
								style: { "border-radius": "8px" }
							}, null, 8, ["disabled"]), [[ClosePopup_default]])]),
							_: 1
						})
					]),
					_: 1
				})]),
				_: 1
			}, 8, ["modelValue"])
		]),
		_: 1
	});
}
var MainLayout_default = /*#__PURE__*/ _plugin_vue_export_helper_default(MainLayout_vue_vue_type_script_setup_true_lang_default, [["render", _sfc_render], ["__file", "MainLayout.vue"]]);
//#endregion
export { MainLayout_default as default };

//# sourceMappingURL=MainLayout-ecHZP3_e.js.map