import { B as layoutKey, O as hSlot, R as emptyRenderFn, it as createComponent } from "./network-Dbb0uhtP.js";
import { S as inject, l as computed, x as h, y as getCurrentInstance } from "./pinia-3_kWn-gx.js";
//#region node_modules/quasar/src/components/page/QPage.js
var QPage_default = createComponent({
	name: "QPage",
	props: {
		padding: Boolean,
		styleFn: Function
	},
	setup(props, { slots }) {
		const { proxy: { $q } } = getCurrentInstance();
		const $layout = inject(layoutKey, emptyRenderFn);
		if ($layout === emptyRenderFn) {
			console.error("QPage needs to be a deep child of QLayout");
			return emptyRenderFn;
		}
		if (inject("_q_pc_", emptyRenderFn) === emptyRenderFn) {
			console.error("QPage needs to be child of QPageContainer");
			return emptyRenderFn;
		}
		const style = computed(() => {
			const offset = ($layout.header.space ? $layout.header.size : 0) + ($layout.footer.space ? $layout.footer.size : 0);
			if (typeof props.styleFn === "function") {
				const height = $layout.isContainer.value ? $layout.containerHeight.value : $q.screen.height;
				return props.styleFn(offset, height);
			}
			return { minHeight: $layout.isContainer.value ? $layout.containerHeight.value - offset + "px" : $q.screen.height === 0 ? offset !== 0 ? `calc(100vh - ${offset}px)` : "100vh" : $q.screen.height - offset + "px" };
		});
		const classes = computed(() => `q-page${props.padding ? " q-layout-padding" : ""}`);
		return () => h("main", {
			class: classes.value,
			style: style.value
		}, hSlot(slots.default));
	}
});
//#endregion
export { QPage_default as t };

//# sourceMappingURL=QPage-BYBG-CUN.js.map