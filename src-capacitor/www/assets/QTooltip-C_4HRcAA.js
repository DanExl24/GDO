import { O as hSlot, X as cleanEvt, Y as addEvt, dt as Transition, it as createComponent, rt as stopAndPrevent } from "./network-Dbb0uhtP.js";
import { E as onBeforeUnmount, G as ref, l as computed, x as h, y as getCurrentInstance, z as watch } from "./pinia-3_kWn-gx.js";
import { c as useTimeout, s as useTick } from "./use-dark-DPLXRKW0.js";
import { A as useTransition, M as useModelToggle, N as useModelToggleEmits, P as useModelToggleProps, T as usePortal, j as useTransitionProps, w as scrollTargetProp, x as getScrollTarget } from "./index-C6i8igny.js";
import { a as addClickOutside, c as useAnchor, d as clearSelection, i as validatePosition, n as setPosition, o as removeClickOutside, r as validateOffset, s as useScrollTarget, t as parsePosition, u as useAnchorStaticProps } from "./position-engine-Cdoa99XV.js";
//#region node_modules/quasar/src/components/tooltip/QTooltip.js
var QTooltip_default = createComponent({
	name: "QTooltip",
	inheritAttrs: false,
	props: {
		...useAnchorStaticProps,
		...useModelToggleProps,
		...useTransitionProps,
		maxHeight: {
			type: String,
			default: null
		},
		maxWidth: {
			type: String,
			default: null
		},
		transitionShow: {
			...useTransitionProps.transitionShow,
			default: "jump-down"
		},
		transitionHide: {
			...useTransitionProps.transitionHide,
			default: "jump-up"
		},
		anchor: {
			type: String,
			default: "bottom middle",
			validator: validatePosition
		},
		self: {
			type: String,
			default: "top middle",
			validator: validatePosition
		},
		offset: {
			type: Array,
			default: () => [14, 14],
			validator: validateOffset
		},
		scrollTarget: scrollTargetProp,
		delay: {
			type: Number,
			default: 0
		},
		hideDelay: {
			type: Number,
			default: 0
		},
		persistent: Boolean
	},
	emits: [...useModelToggleEmits],
	setup(props, { slots, emit, attrs }) {
		let unwatchPosition, observer;
		const vm = getCurrentInstance();
		const { proxy: { $q } } = vm;
		const innerRef = ref(null);
		const showing = ref(false);
		const anchorOrigin = computed(() => parsePosition(props.anchor, $q.lang.rtl));
		const selfOrigin = computed(() => parsePosition(props.self, $q.lang.rtl));
		const hideOnRouteChange = computed(() => !props.persistent);
		const { registerTick, removeTick } = useTick();
		const { registerTimeout } = useTimeout();
		const { transitionProps, transitionStyle } = useTransition(props);
		const { localScrollTarget, changeScrollEvent, unconfigureScrollTarget } = useScrollTarget(props, configureScrollTarget);
		const { anchorEl, canShow, anchorEvents } = useAnchor({
			showing,
			configureAnchorEl
		});
		const { show, hide } = useModelToggle({
			showing,
			canShow,
			handleShow,
			handleHide,
			hideOnRouteChange,
			processOnMount: true
		});
		Object.assign(anchorEvents, {
			delayShow,
			delayHide
		});
		const { showPortal, hidePortal, renderPortal } = usePortal(vm, innerRef, renderPortalContent, "tooltip");
		if ($q.platform.is.mobile) {
			const clickOutsideProps = {
				anchorEl,
				innerRef,
				onClickOutside(e) {
					hide(e);
					if (e.target.classList.contains("q-dialog__backdrop")) stopAndPrevent(e);
					return true;
				}
			};
			watch(computed(() => props.modelValue === null && !props.persistent && showing.value), (val) => {
				(val ? addClickOutside : removeClickOutside)(clickOutsideProps);
			});
			onBeforeUnmount(() => {
				removeClickOutside(clickOutsideProps);
			});
		}
		function handleShow(evt) {
			showPortal();
			registerTick(() => {
				observer = new MutationObserver(() => updatePosition());
				observer.observe(innerRef.value, {
					attributes: false,
					childList: true,
					characterData: true,
					subtree: true
				});
				updatePosition();
				configureScrollTarget();
			});
			if (unwatchPosition === void 0) unwatchPosition = watch(() => $q.screen.width + "|" + $q.screen.height + "|" + props.self + "|" + props.anchor + "|" + $q.lang.rtl, updatePosition);
			registerTimeout(() => {
				showPortal(true);
				emit("show", evt);
			}, props.transitionDuration);
		}
		function handleHide(evt) {
			removeTick();
			hidePortal();
			anchorCleanup();
			registerTimeout(() => {
				hidePortal(true);
				emit("hide", evt);
			}, props.transitionDuration);
		}
		function anchorCleanup() {
			if (observer !== void 0) {
				observer.disconnect();
				observer = void 0;
			}
			if (unwatchPosition !== void 0) {
				unwatchPosition();
				unwatchPosition = void 0;
			}
			unconfigureScrollTarget();
			cleanEvt(anchorEvents, "tooltipTemp");
		}
		function updatePosition() {
			setPosition({
				targetEl: innerRef.value,
				offset: props.offset,
				anchorEl: anchorEl.value,
				anchorOrigin: anchorOrigin.value,
				selfOrigin: selfOrigin.value,
				maxHeight: props.maxHeight,
				maxWidth: props.maxWidth
			});
		}
		function delayShow(evt) {
			if ($q.platform.is.mobile) {
				clearSelection();
				document.body.classList.add("non-selectable");
				const target = anchorEl.value;
				const evts = [
					"touchmove",
					"touchcancel",
					"touchend",
					"click"
				].map((e) => [
					target,
					e,
					"delayHide",
					"passiveCapture"
				]);
				addEvt(anchorEvents, "tooltipTemp", evts);
			}
			registerTimeout(() => {
				show(evt);
			}, props.delay);
		}
		function delayHide(evt) {
			if ($q.platform.is.mobile) {
				cleanEvt(anchorEvents, "tooltipTemp");
				clearSelection();
				setTimeout(() => {
					document.body.classList.remove("non-selectable");
				}, 10);
			}
			registerTimeout(() => {
				hide(evt);
			}, props.hideDelay);
		}
		function configureAnchorEl() {
			if (props.noParentEvent || anchorEl.value === null) return;
			const evts = $q.platform.is.mobile ? [[
				anchorEl.value,
				"touchstart",
				"delayShow",
				"passive"
			]] : [[
				anchorEl.value,
				"mouseenter",
				"delayShow",
				"passive"
			], [
				anchorEl.value,
				"mouseleave",
				"delayHide",
				"passive"
			]];
			addEvt(anchorEvents, "anchor", evts);
		}
		function configureScrollTarget() {
			if (anchorEl.value !== null || props.scrollTarget !== void 0) {
				localScrollTarget.value = getScrollTarget(anchorEl.value, props.scrollTarget);
				const fn = props.noParentEvent ? updatePosition : hide;
				changeScrollEvent(localScrollTarget.value, fn);
			}
		}
		function getTooltipContent() {
			return showing.value ? h("div", {
				...attrs,
				ref: innerRef,
				class: ["q-tooltip q-tooltip--style q-position-engine no-pointer-events", attrs.class],
				style: [attrs.style, transitionStyle.value],
				role: "tooltip"
			}, hSlot(slots.default)) : null;
		}
		function renderPortalContent() {
			return h(Transition, transitionProps.value, getTooltipContent);
		}
		onBeforeUnmount(anchorCleanup);
		Object.assign(vm.proxy, { updatePosition });
		return renderPortal;
	}
});
//#endregion
export { QTooltip_default as t };

//# sourceMappingURL=QTooltip-C_4HRcAA.js.map