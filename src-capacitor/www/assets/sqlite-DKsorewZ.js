import { t as databaseService } from "./database-DoILKR0-.js";
import { z as boot } from "./index-C6i8igny.js";
//#region src/boot/sqlite.ts
var sqlite_default = boot(async () => {
	try {
		await databaseService.initialize();
		console.log("✅ Base de datos local inicializada");
	} catch (error) {
		console.error("❌ Error inicializando base de datos local:", error);
	}
});
//#endregion
export { sqlite_default as default };

//# sourceMappingURL=sqlite-DKsorewZ.js.map