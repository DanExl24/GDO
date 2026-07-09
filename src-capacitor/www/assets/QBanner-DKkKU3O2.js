import { O as hSlot, it as createComponent } from "./network-Dbb0uhtP.js";
import { l as computed, x as h, y as getCurrentInstance } from "./pinia-3_kWn-gx.js";
import { n as useDarkProps, t as useDark } from "./use-dark-DPLXRKW0.js";
//#region node_modules/quasar/src/components/banner/QBanner.js
var QBanner_default = createComponent({
	name: "QBanner",
	props: {
		...useDarkProps,
		inlineActions: Boolean,
		dense: Boolean,
		rounded: Boolean
	},
	setup(props, { slots }) {
		const { proxy: { $q } } = getCurrentInstance();
		const isDark = useDark(props, $q);
		const classes = computed(() => "q-banner row items-center" + (props.dense ? " q-banner--dense" : "") + (isDark.value ? " q-banner--dark q-dark" : "") + (props.rounded ? " rounded-borders" : ""));
		const actionClass = computed(() => `q-banner__actions row items-center justify-end col-${props.inlineActions ? "auto" : "all"}`);
		return () => {
			const child = [h("div", { class: "q-banner__avatar col-auto row items-center self-start" }, hSlot(slots.avatar)), h("div", { class: "q-banner__content col text-body2" }, hSlot(slots.default))];
			const actions = hSlot(slots.action);
			if (actions !== void 0) child.push(h("div", { class: actionClass.value }, actions));
			return h("div", {
				class: classes.value + (!props.inlineActions && actions !== void 0 ? " q-banner--top-padding" : ""),
				role: "alert"
			}, child);
		};
	}
});
//#endregion
export { QBanner_default as t };

//# sourceMappingURL=QBanner-DKkKU3O2.js.map