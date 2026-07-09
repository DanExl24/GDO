import { C as QAvatar_default, c as QBtn_default, dt as Transition, i as api, mt as withKeys, t as useNetworkStore, w as QIcon_default } from "./network-Dbb0uhtP.js";
import { A as onUnmounted, G as ref, H as withDirectives, M as openBlock, P as renderList, V as withCtx, _ as createVNode, d as createBlock, f as createCommentVNode, g as createTextVNode, k as onMounted, o as Fragment, p as createElementBlock, u as createBaseVNode, ut as toDisplayString, v as defineComponent, z as watch } from "./pinia-3_kWn-gx.js";
import { f as useRouter, p as _plugin_vue_export_helper_default } from "./use-dark-DPLXRKW0.js";
import { t as databaseService } from "./database-DoILKR0-.js";
import { F as useAuthStore, R as getSocket, f as QCardActions_default, h as QDialog_default, m as QCard_default, p as QCardSection_default, t as QInput_default } from "./index-C6i8igny.js";
import { t as QChip_default } from "./QChip-Bx6UGqzI.js";
import { t as QTooltip_default } from "./QTooltip-C_4HRcAA.js";
import { t as QSpinnerDots_default } from "./QSpinnerDots-BlrGZuFe.js";
import { n as ClosePopup_default, t as useQuasar } from "./use-quasar-CgO-gf7R.js";
import { t as QPage_default } from "./QPage-BYBG-CUN.js";
import { t as QBanner_default } from "./QBanner-DKkKU3O2.js";
//#region src/pages/UserPage.vue?vue&type=script&setup=true&lang.ts
var UserPage_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "UserPage",
	setup(__props, { expose: __expose }) {
		__expose();
		const $q = useQuasar();
		const router = useRouter();
		const authStore = useAuthStore();
		const networkStore = useNetworkStore();
		const loadingData = ref(true);
		const showEditDialog = ref(false);
		const savingField = ref(false);
		const editingFieldKey = ref("");
		const editingFieldLabel = ref("");
		const editValue = ref("");
		const pendingFields = ref([]);
		const userData = ref({});
		const availableFields = [
			{
				key: "nombre",
				label: "Nombre",
				icon: "person"
			},
			{
				key: "apellido",
				label: "Apellido",
				icon: "person_outline"
			},
			{
				key: "documento",
				label: "Documento",
				icon: "badge"
			},
			{
				key: "telefono",
				label: "Teléfono",
				icon: "phone"
			},
			{
				key: "direccion",
				label: "Dirección",
				icon: "home"
			},
			{
				key: "password",
				label: "Contraseña",
				icon: "lock"
			}
		];
		async function handleDataUpdated() {
			if (networkStore.isOnline && authStore.user && !savingField.value) await loadUserData();
		}
		onMounted(async () => {
			await loadUserData();
			const socket = getSocket();
			if (socket) socket.on("data-updated", handleDataUpdated);
		});
		onUnmounted(() => {
			const socket = getSocket();
			if (socket) socket.off("data-updated", handleDataUpdated);
		});
		watch(() => networkStore.pendingChanges, async (newVal, oldVal) => {
			const pendientes = await databaseService.getCambiosPendientes();
			pendingFields.value = pendientes.filter((p) => p.usuario_id === authStore.user.id).map((p) => p.campo);
			if (oldVal !== void 0 && oldVal > 0 && newVal === 0) await loadUserData();
		});
		async function loadUserData() {
			if (!authStore.user) return;
			loadingData.value = true;
			try {
				if (networkStore.isOnline) {
					const response = await api.get(`/usuarios/${authStore.user.id}`);
					const user = response.data;
					userData.value = {
						nombre: user.nombre || "",
						apellido: user.apellido || "",
						documento: user.documento || "",
						telefono: user.telefono || "",
						direccion: user.direccion || "",
						password: user.password || ""
					};
					authStore.updateProfileFields({
						nombre: user.nombre || "",
						apellido: user.apellido || ""
					});
					const datos = response.data.datos || [];
					for (const d of datos) if (userData.value[d.campo] === void 0) userData.value[d.campo] = d.valor;
					try {
						const fullHistory = (await api.get(`/usuarios/${authStore.user.id}/historial`)).data || [];
						await databaseService.syncLocalHistoryWithServer(authStore.user.id, fullHistory.map((h) => ({
							id: h.id,
							usuario_id: h.usuario_id,
							campo: h.campo,
							valor: h.valor,
							version: h.version,
							es_actual: h.es_actual,
							origen: h.origen,
							fecha_creacion: h.fecha_creacion,
							fecha_ultima_activacion: h.fecha_ultima_activacion,
							veces_reutilizado: h.veces_reutilizado
						})));
					} catch (histError) {
						console.error("Error cargando historial para caché local:", histError);
					}
				} else {
					userData.value = {};
					const localUser = (await databaseService.getUsuarios()).find((u) => u.id === authStore.user.id);
					if (localUser) userData.value = {
						nombre: localUser.nombre || "",
						apellido: localUser.apellido || "",
						documento: localUser.documento || "",
						telefono: localUser.telefono || "",
						direccion: localUser.direccion || "",
						password: localUser.password || ""
					};
					const datos = await databaseService.getDatosActuales(authStore.user.id);
					for (const d of datos) if (userData.value[d.campo] === void 0) userData.value[d.campo] = d.valor;
					const userPendientes = (await databaseService.getCambiosPendientes()).filter((p) => p.usuario_id === authStore.user.id);
					for (const p of userPendientes) userData.value[p.campo] = p.valor;
				}
				const pendientes = await databaseService.getCambiosPendientes();
				pendingFields.value = pendientes.filter((p) => p.usuario_id === authStore.user.id).map((p) => p.campo);
				networkStore.updatePendingCount(pendientes.length);
			} catch (error) {
				networkStore.setOnline(false);
				userData.value = {};
				const localUser = (await databaseService.getUsuarios()).find((u) => u.id === authStore.user.id);
				if (localUser) userData.value = {
					nombre: localUser.nombre || "",
					apellido: localUser.apellido || "",
					documento: localUser.documento || "",
					telefono: localUser.telefono || "",
					direccion: localUser.direccion || "",
					password: localUser.password || ""
				};
				const datos = await databaseService.getDatosActuales(authStore.user.id);
				for (const d of datos) if (userData.value[d.campo] === void 0) userData.value[d.campo] = d.valor;
				if (userData.value.nombre || userData.value.apellido) authStore.updateProfileFields({
					nombre: userData.value.nombre || "",
					apellido: userData.value.apellido || ""
				});
			} finally {
				loadingData.value = false;
			}
		}
		function getFieldValue(key) {
			return userData.value[key] || "";
		}
		function getFieldIcon(key) {
			return availableFields.find((f) => f.key === key)?.icon || "edit";
		}
		function isPending(key) {
			return pendingFields.value.includes(key);
		}
		function editField(key) {
			const field = availableFields.find((f) => f.key === key);
			if (!field) return;
			editingFieldKey.value = key;
			editingFieldLabel.value = field.label;
			editValue.value = getFieldValue(key);
			showEditDialog.value = true;
		}
		async function saveField() {
			if (!editValue.value.trim()) {
				$q.notify({
					type: "warning",
					message: "El campo no puede estar vacío"
				});
				return;
			}
			if (!authStore.user) return;
			try {
				const duplicate = (await databaseService.getHistorialLocal(authStore.user.id)).find((h) => h.campo === editingFieldKey.value && h.valor.trim().toLowerCase() === editValue.value.trim().toLowerCase());
				const currentValue = (userData.value[editingFieldKey.value] || "").trim();
				if (editValue.value.trim() === currentValue) {
					showEditDialog.value = false;
					return;
				}
				if (duplicate) {
					if (duplicate.es_actual) {
						showEditDialog.value = false;
						return;
					}
					$q.dialog({
						title: "Reutilizar Valor Histórico",
						dark: true,
						message: `El valor "${editValue.value.trim()}" ya fue utilizado anteriormente como la Versión ${duplicate.version}. ¿Desea reactivar esta versión manteniendo su número original en lugar de crear una nueva versión?`,
						cancel: {
							label: "Cancelar",
							color: "grey-5",
							flat: true
						},
						ok: {
							label: "Reutilizar",
							color: "primary"
						},
						persistent: true
					}).onOk(async () => {
						await ejecutarGuardado();
					});
				} else await ejecutarGuardado();
			} catch (err) {
				console.error("Error pre-guardado:", err);
				$q.notify({
					type: "negative",
					message: "Error al verificar el historial"
				});
			}
		}
		async function ejecutarGuardado() {
			if (!authStore.user) return;
			savingField.value = true;
			try {
				if (networkStore.isOnline) {
					await api.post(`/usuarios/${authStore.user.id}/datos`, {
						campo: editingFieldKey.value,
						valor: editValue.value.trim()
					});
					await databaseService.updateUsuarioColumnaLocal(authStore.user.id, editingFieldKey.value, editValue.value.trim());
					await loadUserData();
					$q.notify({
						type: "positive",
						message: `${editingFieldLabel.value} actualizado`,
						icon: "cloud_done"
					});
				} else {
					await databaseService.updateDatoLocal(authStore.user.id, editingFieldKey.value, editValue.value.trim());
					$q.notify({
						type: "info",
						message: `${editingFieldLabel.value} guardado localmente`,
						caption: "Se sincronizará al reconectar",
						icon: "wifi_off"
					});
				}
				userData.value[editingFieldKey.value] = editValue.value.trim();
				showEditDialog.value = false;
				if (editingFieldKey.value === "nombre" || editingFieldKey.value === "apellido") authStore.updateProfileFields({
					nombre: userData.value.nombre || "",
					apellido: userData.value.apellido || ""
				});
				const pendientes = await databaseService.getCambiosPendientes();
				pendingFields.value = pendientes.filter((p) => p.usuario_id === authStore.user.id).map((p) => p.campo);
				networkStore.updatePendingCount(pendientes.length);
			} catch (error) {
				console.error("Error guardando campo:", error);
				const axiosErr = error;
				if (!axiosErr.response || axiosErr.response.status && axiosErr.response.status >= 500) try {
					await databaseService.updateDatoLocal(authStore.user.id, editingFieldKey.value, editValue.value.trim());
					networkStore.setOnline(false);
					$q.notify({
						type: "warning",
						message: "Servidor no disponible. Guardado localmente.",
						caption: "Se sincronizará automáticamente al restablecer conexión",
						icon: "wifi_off",
						timeout: 4e3
					});
					userData.value[editingFieldKey.value] = editValue.value.trim();
					showEditDialog.value = false;
					if (editingFieldKey.value === "nombre" || editingFieldKey.value === "apellido") authStore.updateProfileFields({
						nombre: userData.value.nombre || "",
						apellido: userData.value.apellido || ""
					});
					const pendientes = await databaseService.getCambiosPendientes();
					pendingFields.value = pendientes.filter((p) => p.usuario_id === authStore.user.id).map((p) => p.campo);
					networkStore.updatePendingCount(pendientes.length);
					return;
				} catch (localErr) {
					console.error("Error en fallback local:", localErr);
				}
				$q.notify({
					type: "negative",
					message: "Error al guardar. Verifique su conexión."
				});
			} finally {
				savingField.value = false;
			}
		}
		function goToHistory() {
			if (!authStore.user) return;
			router.push(`/history/${authStore.user.id}`);
		}
		const __returned__ = {
			$q,
			router,
			authStore,
			networkStore,
			loadingData,
			showEditDialog,
			savingField,
			editingFieldKey,
			editingFieldLabel,
			editValue,
			pendingFields,
			userData,
			availableFields,
			handleDataUpdated,
			loadUserData,
			getFieldValue,
			getFieldIcon,
			isPending,
			editField,
			saveField,
			ejecutarGuardado,
			goToHistory
		};
		Object.defineProperty(__returned__, "__isScriptSetup", {
			enumerable: false,
			value: true
		});
		return __returned__;
	}
});
//#endregion
//#region src/pages/UserPage.vue
var _hoisted_1 = { class: "glass-card q-pa-lg q-mb-md" };
var _hoisted_2 = { class: "row items-center no-wrap" };
var _hoisted_3 = { class: "col" };
var _hoisted_4 = { class: "text-h6 text-weight-bold" };
var _hoisted_5 = { class: "text-caption text-grey-5" };
var _hoisted_6 = { class: "text-warning text-weight-medium" };
var _hoisted_7 = {
	key: 0,
	class: "text-center q-pa-xl"
};
var _hoisted_8 = {
	key: 1,
	class: "glass-card q-mb-md",
	style: { "overflow": "hidden" }
};
var _hoisted_9 = ["onClick"];
var _hoisted_10 = { class: "field-row__label" };
var _hoisted_11 = { class: "field-row__value" };
var _hoisted_12 = { class: "row items-center no-wrap" };
var _hoisted_13 = {
	key: 0,
	class: "pending-badge q-mr-sm"
};
var _hoisted_14 = { class: "text-h6 text-weight-bold" };
var _hoisted_15 = {
	key: 0,
	class: "q-mt-sm"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
	return openBlock(), createBlock(QPage_default, {
		class: "q-pa-md",
		style: { "padding-top": "16px" }
	}, {
		default: withCtx(() => [
			createBaseVNode("div", _hoisted_1, [createBaseVNode("div", _hoisted_2, [
				createVNode(QAvatar_default, {
					size: "56px",
					color: "primary",
					"text-color": "dark",
					class: "q-mr-md",
					style: {
						"font-weight": "700",
						"font-size": "20px"
					}
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString($setup.authStore.user?.nombre?.charAt(0)) + toDisplayString($setup.authStore.user?.apellido?.charAt(0)), 1)]),
					_: 1
				}),
				createBaseVNode("div", _hoisted_3, [createBaseVNode("div", _hoisted_4, toDisplayString($setup.authStore.user?.nombre) + " " + toDisplayString($setup.authStore.user?.apellido), 1), createBaseVNode("div", _hoisted_5, [createVNode(QIcon_default, {
					name: "badge",
					size: "12px",
					class: "q-mr-xs"
				}), createTextVNode(" " + toDisplayString($setup.authStore.user?.documento), 1)])]),
				createVNode(QBtn_default, {
					flat: "",
					round: "",
					icon: "history",
					color: "primary",
					onClick: $setup.goToHistory
				}, {
					default: withCtx(() => [createVNode(QTooltip_default, null, {
						default: withCtx(() => [..._cache[2] || (_cache[2] = [createTextVNode("Ver historial", -1)])]),
						_: 1
					})]),
					_: 1
				})
			])]),
			createVNode(Transition, { name: "sync-progress" }, {
				default: withCtx(() => [$setup.networkStore.pendingChanges > 0 ? (openBlock(), createBlock(QBanner_default, {
					key: 0,
					dense: "",
					class: "q-mb-md",
					style: {
						"background": "rgba(255,152,0,0.1)",
						"border": "1px solid rgba(255,152,0,0.2)",
						"border-radius": "12px"
					}
				}, {
					avatar: withCtx(() => [createVNode(QIcon_default, {
						name: "pending",
						color: "warning"
					})]),
					default: withCtx(() => [createBaseVNode("span", _hoisted_6, toDisplayString($setup.networkStore.pendingChanges) + " cambio" + toDisplayString($setup.networkStore.pendingChanges > 1 ? "s" : "") + " pendiente" + toDisplayString($setup.networkStore.pendingChanges > 1 ? "s" : "") + " de sincronización ", 1)]),
					_: 1
				})) : createCommentVNode("", true)]),
				_: 1
			}),
			_cache[4] || (_cache[4] = createBaseVNode("div", { class: "q-mb-sm" }, [createBaseVNode("div", {
				class: "text-subtitle1 text-weight-bold q-mb-xs",
				style: { "color": "var(--color-primary)" }
			}, " Información Personal "), createBaseVNode("div", { class: "text-caption text-grey-6" }, " Toque un campo para editarlo ")], -1)),
			$setup.loadingData ? (openBlock(), createElementBlock("div", _hoisted_7, [createVNode(QSpinnerDots_default, {
				size: "40px",
				color: "primary"
			})])) : (openBlock(), createElementBlock("div", _hoisted_8, [(openBlock(), createElementBlock(Fragment, null, renderList($setup.availableFields, (field) => {
				return createBaseVNode("div", {
					key: field.key,
					class: "field-row",
					onClick: ($event) => $setup.editField(field.key)
				}, [createBaseVNode("div", null, [createBaseVNode("div", _hoisted_10, toDisplayString(field.label), 1), createBaseVNode("div", _hoisted_11, toDisplayString($setup.getFieldValue(field.key) || "—"), 1)]), createBaseVNode("div", _hoisted_12, [$setup.isPending(field.key) ? (openBlock(), createElementBlock("span", _hoisted_13, [createVNode(QIcon_default, {
					name: "schedule",
					size: "10px"
				}), _cache[3] || (_cache[3] = createTextVNode(" pendiente ", -1))])) : createCommentVNode("", true), createVNode(QIcon_default, {
					name: "chevron_right",
					color: "grey-6",
					size: "20px"
				})])], 8, _hoisted_9);
			}), 64))])),
			createVNode(QDialog_default, {
				modelValue: $setup.showEditDialog,
				"onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.showEditDialog = $event)
			}, {
				default: withCtx(() => [createVNode(QCard_default, {
					style: {
						"width": "340px",
						"max-width": "95vw"
					},
					class: "bg-dark"
				}, {
					default: withCtx(() => [
						createVNode(QCardSection_default, null, {
							default: withCtx(() => [createBaseVNode("div", _hoisted_14, [createVNode(QIcon_default, {
								name: "edit",
								color: "primary",
								class: "q-mr-sm"
							}), createTextVNode(" Editar " + toDisplayString($setup.editingFieldLabel), 1)])]),
							_: 1
						}),
						createVNode(QCardSection_default, { class: "q-pt-none" }, {
							default: withCtx(() => [createVNode(QInput_default, {
								modelValue: $setup.editValue,
								"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.editValue = $event),
								label: $setup.editingFieldLabel,
								outlined: "",
								dark: "",
								dense: "",
								autofocus: "",
								maxlength: $setup.editingFieldKey === "documento" ? 10 : 50,
								onKeyup: withKeys($setup.saveField, ["enter"])
							}, {
								prepend: withCtx(() => [createVNode(QIcon_default, {
									name: $setup.getFieldIcon($setup.editingFieldKey),
									color: "primary"
								}, null, 8, ["name"])]),
								_: 1
							}, 8, [
								"modelValue",
								"label",
								"maxlength"
							]), !$setup.networkStore.isOnline ? (openBlock(), createElementBlock("div", _hoisted_15, [createVNode(QChip_default, {
								dense: "",
								color: "warning",
								"text-color": "dark",
								icon: "wifi_off",
								label: "Se guardará localmente",
								size: "sm"
							})])) : createCommentVNode("", true)]),
							_: 1
						}),
						createVNode(QCardActions_default, {
							align: "right",
							class: "q-px-md q-pb-md"
						}, {
							default: withCtx(() => [withDirectives(createVNode(QBtn_default, {
								flat: "",
								label: "Cancelar",
								color: "grey-5"
							}, null, 512), [[ClosePopup_default]]), createVNode(QBtn_default, {
								unelevated: "",
								label: "Guardar",
								color: "primary",
								"text-color": "dark",
								loading: $setup.savingField,
								onClick: $setup.saveField,
								style: {
									"border-radius": "8px",
									"font-weight": "700"
								}
							}, null, 8, ["loading"])]),
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
var UserPage_default = /*#__PURE__*/ _plugin_vue_export_helper_default(UserPage_vue_vue_type_script_setup_true_lang_default, [["render", _sfc_render], ["__file", "UserPage.vue"]]);
//#endregion
export { UserPage_default as default };

//# sourceMappingURL=UserPage-Clls2yHi.js.map