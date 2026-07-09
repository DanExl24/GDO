import { t as createPinia } from "./pinia-3_kWn-gx.js";
import { z as boot } from "./index-C6i8igny.js";
//#region src/boot/pinia.ts
var pinia_default = boot(({ app }) => {
	const pinia = createPinia();
	app.use(pinia);
	console.log("🍍 Pinia registrado manualmente en la app");
});
//#endregion
export { pinia_default as default };

//# sourceMappingURL=pinia-swN4aULs.js.map