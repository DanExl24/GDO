const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./web-sKRy2w_A.js","./dist-DAO462gx.js"])))=>i.map(i=>d[i]);
import { r as registerPlugin } from "./dist-DAO462gx.js";
import { t as __vitePreload } from "./preload-helper-iIio8xkS.js";
//#region src-capacitor/node_modules/@capacitor-community/sqlite/dist/esm/index.js
var CapacitorSQLite = registerPlugin("CapacitorSQLite", {
	web: () => __vitePreload(() => import("./web-sKRy2w_A.js").then((m) => new m.CapacitorSQLiteWeb()), __vite__mapDeps([0,1]), import.meta.url),
	electron: () => window.CapacitorCustomPlatform.plugins.CapacitorSQLite
});
//#endregion
export { CapacitorSQLite };

//# sourceMappingURL=esm-CdXItFak.js.map