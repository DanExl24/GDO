import { $ as noop, Q as listenOpts, it as createComponent, lt as isRuntimeSsrPreHydration } from "./network-Dbb0uhtP.js";
import { C as nextTick, E as onBeforeUnmount, G as ref, k as onMounted, x as h, y as getCurrentInstance } from "./pinia-3_kWn-gx.js";
//#region node_modules/quasar/src/composables/use-hydration/use-hydration.js
function useHydration() {
	const isHydrated = ref(!isRuntimeSsrPreHydration.value);
	if (!isHydrated.value) onMounted(() => {
		isHydrated.value = true;
	});
	return { isHydrated };
}
//#endregion
//#region node_modules/quasar/src/components/resize-observer/QResizeObserver.js
var hasObserver = typeof ResizeObserver !== "undefined";
var resizeProps = hasObserver ? {} : {
	style: "display:block;position:absolute;top:0;left:0;right:0;bottom:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1;",
	url: "about:blank"
};
var QResizeObserver_default = createComponent({
	name: "QResizeObserver",
	props: { debounce: {
		type: [String, Number],
		default: 100
	} },
	emits: ["resize"],
	setup(props, { emit }) {
		let timer = null, targetEl, size = {
			width: -1,
			height: -1
		};
		function trigger(immediately) {
			if (immediately === true || props.debounce === 0 || props.debounce === "0") emitEvent();
			else if (timer === null) timer = setTimeout(emitEvent, props.debounce);
		}
		function emitEvent() {
			if (timer !== null) {
				clearTimeout(timer);
				timer = null;
			}
			if (targetEl) {
				const { offsetWidth: width, offsetHeight: height } = targetEl;
				if (width !== size.width || height !== size.height) {
					size = {
						width,
						height
					};
					emit("resize", size);
				}
			}
		}
		const { proxy } = getCurrentInstance();
		proxy.trigger = trigger;
		if (hasObserver) {
			let observer;
			const init = (stop) => {
				targetEl = proxy.$el.parentNode;
				if (targetEl) {
					observer = new ResizeObserver(trigger);
					observer.observe(targetEl);
					emitEvent();
				} else if (!stop) nextTick(() => {
					init(true);
				});
			};
			onMounted(() => {
				init();
			});
			onBeforeUnmount(() => {
				if (timer !== null) clearTimeout(timer);
				if (observer !== void 0) {
					if (observer.disconnect !== void 0) observer.disconnect();
					else if (targetEl) observer.unobserve(targetEl);
				}
			});
			return noop;
		}
		const { isHydrated } = useHydration();
		let curDocView;
		const cleanup = () => {
			if (timer !== null) {
				clearTimeout(timer);
				timer = null;
			}
			if (curDocView !== void 0) {
				if (curDocView.removeEventListener !== void 0) curDocView.removeEventListener("resize", trigger, listenOpts.passive);
				curDocView = void 0;
			}
		};
		const onObjLoad = () => {
			cleanup();
			if (targetEl?.contentDocument) {
				curDocView = targetEl.contentDocument.defaultView;
				curDocView.addEventListener("resize", trigger, listenOpts.passive);
				emitEvent();
			}
		};
		onMounted(() => {
			nextTick(() => {
				targetEl = proxy.$el;
				if (targetEl) onObjLoad();
			});
		});
		onBeforeUnmount(cleanup);
		return () => {
			if (isHydrated.value) return h("object", {
				class: "q--avoid-card-border",
				style: resizeProps.style,
				tabindex: -1,
				type: "text/html",
				data: resizeProps.url,
				"aria-hidden": "true",
				onLoad: onObjLoad
			});
		};
	}
});
//#endregion
export { QResizeObserver_default as t };

//# sourceMappingURL=QResizeObserver-DtwSlKXn.js.map