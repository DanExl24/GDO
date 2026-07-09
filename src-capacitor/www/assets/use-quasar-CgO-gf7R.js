import { K as isKeyCode, at as createDirective } from "./network-Dbb0uhtP.js";
import { S as inject } from "./pinia-3_kWn-gx.js";
import { D as closePortals, O as getPortalProxy } from "./index-C6i8igny.js";
//#region node_modules/quasar/src/directives/close-popup/ClosePopup.js
function getDepth(value) {
	if (value === false) return 0;
	if (value === true || value === void 0) return 1;
	return Number.parseInt(value, 10) || 0;
}
var ClosePopup_default = createDirective({
	name: "close-popup",
	beforeMount(el, { value }) {
		const ctx = {
			depth: getDepth(value),
			handler(evt) {
				if (ctx.depth !== 0) setTimeout(() => {
					const proxy = getPortalProxy(el);
					if (proxy !== void 0) closePortals(proxy, evt, ctx.depth);
				});
			},
			handlerKey(evt) {
				if (isKeyCode(evt, 13)) ctx.handler(evt);
			}
		};
		el.__qclosepopup = ctx;
		el.addEventListener("click", ctx.handler);
		el.addEventListener("keyup", ctx.handlerKey);
	},
	updated(el, { value, oldValue }) {
		if (value !== oldValue) el.__qclosepopup.depth = getDepth(value);
	},
	beforeUnmount(el) {
		const ctx = el.__qclosepopup;
		el.removeEventListener("click", ctx.handler);
		el.removeEventListener("keyup", ctx.handlerKey);
		delete el.__qclosepopup;
	}
});
//#endregion
//#region node_modules/quasar/src/composables/use-quasar/use-quasar.js
/**
* Returns the $q instance.
* Equivalent to `this.$q` inside templates.
*/
function useQuasar() {
	return inject("_q_");
}
//#endregion
export { ClosePopup_default as n, useQuasar as t };

//# sourceMappingURL=use-quasar-CgO-gf7R.js.map