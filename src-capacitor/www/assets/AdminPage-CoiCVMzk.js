import { B as layoutKey, C as QAvatar_default, E as hMergeSlot, O as hSlot, R as emptyRenderFn, c as QBtn_default, ft as TransitionGroup, ht as withModifiers, i as api, it as createComponent, t as useNetworkStore, w as QIcon_default } from "./network-Dbb0uhtP.js";
import { A as onUnmounted, G as ref, H as withDirectives, M as openBlock, P as renderList, S as inject, V as withCtx, _ as createVNode, d as createBlock, f as createCommentVNode, g as createTextVNode, h as createSlots, k as onMounted, l as computed, o as Fragment, p as createElementBlock, u as createBaseVNode, ut as toDisplayString, v as defineComponent, x as h, y as getCurrentInstance } from "./pinia-3_kWn-gx.js";
import { f as useRouter, p as _plugin_vue_export_helper_default } from "./use-dark-DPLXRKW0.js";
import { t as databaseService } from "./database-DoILKR0-.js";
import { R as getSocket, d as QSeparator_default, f as QCardActions_default, h as QDialog_default, m as QCard_default, p as QCardSection_default, t as QInput_default } from "./index-C6i8igny.js";
import { t as QSpinnerDots_default } from "./QSpinnerDots-BlrGZuFe.js";
import { n as ClosePopup_default, t as useQuasar } from "./use-quasar-CgO-gf7R.js";
import { t as QPage_default } from "./QPage-BYBG-CUN.js";
//#region node_modules/quasar/src/components/badge/QBadge.js
var alignValues = [
	"top",
	"middle",
	"bottom"
];
var QBadge_default = createComponent({
	name: "QBadge",
	props: {
		color: String,
		textColor: String,
		floating: Boolean,
		transparent: Boolean,
		multiLine: Boolean,
		outline: Boolean,
		rounded: Boolean,
		label: [Number, String],
		align: {
			type: String,
			validator: (v) => alignValues.includes(v)
		}
	},
	setup(props, { slots }) {
		const style = computed(() => props.align !== void 0 ? { verticalAlign: props.align } : null);
		const classes = computed(() => {
			const text = props.outline ? props.color || props.textColor : props.textColor;
			return `q-badge flex inline items-center no-wrap q-badge--${props.multiLine ? "multi" : "single"}-line` + (props.outline ? " q-badge--outline" : props.color !== void 0 ? ` bg-${props.color}` : "") + (text !== void 0 ? ` text-${text}` : "") + (props.floating ? " q-badge--floating" : "") + (props.rounded ? " q-badge--rounded" : "") + (props.transparent ? " q-badge--transparent" : "");
		});
		return () => h("div", {
			class: classes.value,
			style: style.value,
			role: "status",
			"aria-label": props.label
		}, hMergeSlot(slots.default, props.label !== void 0 ? [props.label] : []));
	}
});
//#endregion
//#region node_modules/quasar/src/components/page-sticky/use-page-sticky.js
var usePageStickyProps = {
	position: {
		type: String,
		default: "bottom-right",
		validator: (v) => [
			"top-right",
			"top-left",
			"bottom-right",
			"bottom-left",
			"top",
			"right",
			"bottom",
			"left"
		].includes(v)
	},
	offset: {
		type: Array,
		validator: (v) => v.length === 2
	},
	expand: Boolean
};
function usePageSticky() {
	const { props, proxy: { $q } } = getCurrentInstance();
	const $layout = inject(layoutKey, emptyRenderFn);
	if ($layout === emptyRenderFn) {
		console.error("QPageSticky needs to be child of QLayout");
		return emptyRenderFn;
	}
	const attach = computed(() => {
		const pos = props.position;
		return {
			top: pos.includes("top"),
			right: pos.includes("right"),
			bottom: pos.includes("bottom"),
			left: pos.includes("left"),
			vertical: pos === "top" || pos === "bottom",
			horizontal: pos === "left" || pos === "right"
		};
	});
	const top = computed(() => $layout.header.offset);
	const right = computed(() => $layout.right.offset);
	const bottom = computed(() => $layout.footer.offset);
	const left = computed(() => $layout.left.offset);
	const style = computed(() => {
		let posX = 0, posY = 0;
		const side = attach.value;
		const dir = $q.lang.rtl ? -1 : 1;
		if (side.top && top.value !== 0) posY = `${top.value}px`;
		else if (side.bottom && bottom.value !== 0) posY = `${-bottom.value}px`;
		if (side.left && left.value !== 0) posX = `${dir * left.value}px`;
		else if (side.right && right.value !== 0) posX = `${-dir * right.value}px`;
		const css = { transform: `translate(${posX}, ${posY})` };
		if (props.offset) css.margin = `${props.offset[1]}px ${props.offset[0]}px`;
		if (side.vertical) {
			if (left.value !== 0) css[$q.lang.rtl ? "right" : "left"] = `${left.value}px`;
			if (right.value !== 0) css[$q.lang.rtl ? "left" : "right"] = `${right.value}px`;
		} else if (side.horizontal) {
			if (top.value !== 0) css.top = `${top.value}px`;
			if (bottom.value !== 0) css.bottom = `${bottom.value}px`;
		}
		return css;
	});
	const classes = computed(() => `q-page-sticky row flex-center fixed-${props.position} q-page-sticky--${props.expand ? "expand" : "shrink"}`);
	function getStickyContent(slots) {
		const content = hSlot(slots.default);
		return h("div", {
			class: classes.value,
			style: style.value
		}, props.expand ? content : [h("div", content)]);
	}
	return {
		$layout,
		getStickyContent
	};
}
//#endregion
//#region node_modules/quasar/src/components/page-sticky/QPageSticky.js
var QPageSticky_default = createComponent({
	name: "QPageSticky",
	props: usePageStickyProps,
	setup(_, { slots }) {
		const { getStickyContent } = usePageSticky();
		return () => getStickyContent(slots);
	}
});
//#endregion
//#region src/pages/AdminPage.vue?vue&type=script&setup=true&lang.ts
var AdminPage_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "AdminPage",
	setup(__props, { expose: __expose }) {
		__expose();
		const $q = useQuasar();
		const router = useRouter();
		const networkStore = useNetworkStore();
		const usuarios = ref([]);
		const loading = ref(true);
		const searchQuery = ref("");
		const showCreateDialog = ref(false);
		const showUserInfo = ref(false);
		const saving = ref(false);
		const editingUser = ref(null);
		const selectedUser = ref(null);
		const selectedUserData = ref([]);
		const form = ref({
			documento: "",
			nombre: "",
			apellido: "",
			telefono: "",
			direccion: "",
			password: ""
		});
		const filteredUsers = computed(() => {
			if (!searchQuery.value) return usuarios.value;
			const q = searchQuery.value.toLowerCase();
			return usuarios.value.filter((u) => u.nombre.toLowerCase().includes(q) || u.apellido.toLowerCase().includes(q) || u.documento.includes(q));
		});
		const activeUsers = ref([]);
		function isUserOnline(userId) {
			return activeUsers.value.some((u) => u.usuario_id === userId);
		}
		onMounted(async () => {
			await loadUsers();
			const socket = getSocket();
			if (socket) {
				socket.on("active-users", (users) => {
					activeUsers.value = users;
				});
				socket.on("data-updated", loadUsers);
				socket.emit("register", {
					usuario_id: 0,
					role: "admin",
					nombre: "Administrador"
				});
			}
		});
		onUnmounted(() => {
			const socket = getSocket();
			if (socket) {
				socket.off("active-users");
				socket.off("data-updated", loadUsers);
			}
		});
		async function loadUsers() {
			loading.value = true;
			try {
				if (networkStore.isOnline) {
					const response = await api.get("/usuarios");
					usuarios.value = response.data;
					await databaseService.saveUsuarios(response.data);
				} else usuarios.value = await databaseService.getUsuarios();
			} catch {
				usuarios.value = await databaseService.getUsuarios();
			} finally {
				loading.value = false;
			}
		}
		async function selectUser(user) {
			selectedUser.value = user;
			selectedUserData.value = [];
			showUserInfo.value = true;
			try {
				if (networkStore.isOnline) {
					const response = await api.get(`/usuarios/${user.id}`);
					selectedUserData.value = response.data.datos || [];
				} else {
					const datos = await databaseService.getDatosActuales(user.id);
					selectedUserData.value = datos.map((d) => ({
						campo: d.campo,
						valor: d.valor
					}));
				}
			} catch {
				const datos = await databaseService.getDatosActuales(user.id);
				selectedUserData.value = datos.map((d) => ({
					campo: d.campo,
					valor: d.valor
				}));
			}
		}
		function editUser(user) {
			editingUser.value = user;
			form.value = {
				documento: user.documento,
				nombre: user.nombre,
				apellido: user.apellido,
				telefono: user.telefono || "",
				direccion: user.direccion || "",
				password: user.password || ""
			};
			showCreateDialog.value = true;
		}
		async function saveUser() {
			if (!form.value.documento || !form.value.nombre || !form.value.apellido) {
				$q.notify({
					type: "warning",
					message: "Complete todos los campos"
				});
				return;
			}
			saving.value = true;
			try {
				if (editingUser.value) {
					await api.put(`/usuarios/${editingUser.value.id}`, form.value);
					$q.notify({
						type: "positive",
						message: "Usuario actualizado"
					});
				} else {
					await api.post("/usuarios", form.value);
					$q.notify({
						type: "positive",
						message: "Usuario creado exitosamente"
					});
				}
				closeDialog();
				await loadUsers();
			} catch (err) {
				const axiosErr = err;
				$q.notify({
					type: "negative",
					message: axiosErr.response?.data?.error || "Error al guardar usuario"
				});
			} finally {
				saving.value = false;
			}
		}
		function confirmDelete(user) {
			$q.dialog({
				title: "Eliminar usuario",
				message: `¿Está seguro de eliminar a ${user.nombre} ${user.apellido}?`,
				cancel: {
					flat: true,
					color: "grey-5"
				},
				ok: {
					color: "negative",
					label: "Eliminar",
					unelevated: true
				},
				dark: true,
				persistent: true
			}).onOk(async () => {
				try {
					await api.delete(`/usuarios/${user.id}`);
					$q.notify({
						type: "positive",
						message: "Usuario eliminado"
					});
					await loadUsers();
				} catch {
					$q.notify({
						type: "negative",
						message: "Error al eliminar usuario"
					});
				}
			});
		}
		function viewHistory(user) {
			showUserInfo.value = false;
			router.push(`/history/${user.id}`);
		}
		function closeDialog() {
			showCreateDialog.value = false;
			editingUser.value = null;
			form.value = {
				documento: "",
				nombre: "",
				apellido: "",
				telefono: "",
				direccion: "",
				password: ""
			};
		}
		const __returned__ = {
			$q,
			router,
			networkStore,
			usuarios,
			loading,
			searchQuery,
			showCreateDialog,
			showUserInfo,
			saving,
			editingUser,
			selectedUser,
			selectedUserData,
			form,
			filteredUsers,
			activeUsers,
			isUserOnline,
			loadUsers,
			selectUser,
			editUser,
			saveUser,
			confirmDelete,
			viewHistory,
			closeDialog
		};
		Object.defineProperty(__returned__, "__isScriptSetup", {
			enumerable: false,
			value: true
		});
		return __returned__;
	}
});
//#endregion
//#region src/pages/AdminPage.vue
var _hoisted_1 = { class: "row q-col-gutter-sm q-mb-md" };
var _hoisted_2 = { class: "col-6" };
var _hoisted_3 = { class: "glass-card q-pa-md text-center" };
var _hoisted_4 = {
	class: "text-h4 text-weight-bold",
	style: { "color": "var(--color-primary)" }
};
var _hoisted_5 = { class: "col-6" };
var _hoisted_6 = { class: "glass-card q-pa-md text-center" };
var _hoisted_7 = {
	class: "text-h4 text-weight-bold",
	style: { "color": "var(--color-secondary)" }
};
var _hoisted_8 = {
	key: 0,
	class: "text-center q-pa-xl"
};
var _hoisted_9 = {
	key: 1,
	class: "text-center q-pa-xl"
};
var _hoisted_10 = { class: "text-grey-5 q-mt-md" };
var _hoisted_11 = ["onClick"];
var _hoisted_12 = { class: "row items-center no-wrap" };
var _hoisted_13 = { class: "col" };
var _hoisted_14 = { class: "user-card__name" };
var _hoisted_15 = { class: "user-card__doc" };
var _hoisted_16 = { class: "text-h6 text-weight-bold" };
var _hoisted_17 = { class: "text-h6 text-weight-bold" };
var _hoisted_18 = { class: "text-caption text-grey-5" };
var _hoisted_19 = {
	key: 0,
	class: "text-grey-6 text-center q-pa-md"
};
var _hoisted_20 = { key: 1 };
var _hoisted_21 = { class: "field-row__label" };
var _hoisted_22 = { class: "field-row__value" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
	return openBlock(), createBlock(QPage_default, {
		class: "q-pa-md",
		style: { "padding-top": "16px" }
	}, {
		default: withCtx(() => [
			_cache[16] || (_cache[16] = createBaseVNode("div", { class: "q-mb-md" }, [createBaseVNode("h2", {
				class: "text-h5 text-weight-bold q-mb-none",
				style: { "color": "var(--color-primary)" }
			}, " Panel de Administrador "), createBaseVNode("p", { class: "text-body2 text-grey-6 q-mt-xs" }, " Gestione los usuarios del sistema ")], -1)),
			createBaseVNode("div", _hoisted_1, [createBaseVNode("div", _hoisted_2, [createBaseVNode("div", _hoisted_3, [createBaseVNode("div", _hoisted_4, toDisplayString($setup.usuarios.length), 1), _cache[12] || (_cache[12] = createBaseVNode("div", { class: "text-caption text-grey-5" }, "Usuarios", -1))])]), createBaseVNode("div", _hoisted_5, [createBaseVNode("div", _hoisted_6, [createBaseVNode("div", _hoisted_7, toDisplayString($setup.networkStore.pendingChanges), 1), _cache[13] || (_cache[13] = createBaseVNode("div", { class: "text-caption text-grey-5" }, "Pendientes", -1))])])]),
			createVNode(QInput_default, {
				modelValue: $setup.searchQuery,
				"onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.searchQuery = $event),
				outlined: "",
				dark: "",
				dense: "",
				placeholder: "Buscar usuario...",
				class: "q-mb-md",
				style: { "border-radius": "12px" }
			}, createSlots({
				prepend: withCtx(() => [createVNode(QIcon_default, { name: "search" })]),
				_: 2
			}, [$setup.searchQuery ? {
				name: "append",
				fn: withCtx(() => [createVNode(QIcon_default, {
					name: "close",
					class: "cursor-pointer",
					onClick: _cache[0] || (_cache[0] = ($event) => $setup.searchQuery = "")
				})]),
				key: "0"
			} : void 0]), 1032, ["modelValue"]),
			$setup.loading ? (openBlock(), createElementBlock("div", _hoisted_8, [createVNode(QSpinnerDots_default, {
				size: "40px",
				color: "primary"
			}), _cache[14] || (_cache[14] = createBaseVNode("p", { class: "text-grey-5 q-mt-md" }, "Cargando usuarios...", -1))])) : $setup.filteredUsers.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_9, [createVNode(QIcon_default, {
				name: "people_outline",
				size: "64px",
				color: "grey-7"
			}), createBaseVNode("p", _hoisted_10, toDisplayString($setup.searchQuery ? "Sin resultados" : "No hay usuarios registrados"), 1)])) : (openBlock(), createBlock(TransitionGroup, {
				key: 2,
				name: "list",
				tag: "div"
			}, {
				default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList($setup.filteredUsers, (user) => {
					return openBlock(), createElementBlock("div", {
						key: user.id,
						class: "glass-card user-card",
						onClick: ($event) => $setup.selectUser(user)
					}, [createBaseVNode("div", _hoisted_12, [
						createVNode(QAvatar_default, {
							size: "42px",
							color: "primary",
							"text-color": "dark",
							class: "q-mr-md",
							style: { "font-weight": "700" }
						}, {
							default: withCtx(() => [createTextVNode(toDisplayString(user.nombre.charAt(0)) + toDisplayString(user.apellido.charAt(0)) + " ", 1), $setup.isUserOnline(user.id) ? (openBlock(), createBlock(QBadge_default, {
								key: 0,
								floating: "",
								color: "positive",
								rounded: "",
								style: { "padding": "4px" }
							})) : createCommentVNode("", true)]),
							_: 2
						}, 1024),
						createBaseVNode("div", _hoisted_13, [createBaseVNode("div", _hoisted_14, toDisplayString(user.nombre) + " " + toDisplayString(user.apellido), 1), createBaseVNode("div", _hoisted_15, [createVNode(QIcon_default, {
							name: "badge",
							size: "12px",
							class: "q-mr-xs"
						}), createTextVNode(" " + toDisplayString(user.documento), 1)])]),
						createBaseVNode("div", null, [
							createVNode(QBtn_default, {
								flat: "",
								round: "",
								dense: "",
								icon: "edit",
								color: "primary",
								size: "sm",
								onClick: withModifiers(($event) => $setup.editUser(user), ["stop"])
							}, null, 8, ["onClick"]),
							createVNode(QBtn_default, {
								flat: "",
								round: "",
								dense: "",
								icon: "delete",
								color: "negative",
								size: "sm",
								onClick: withModifiers(($event) => $setup.confirmDelete(user), ["stop"])
							}, null, 8, ["onClick"]),
							createVNode(QBtn_default, {
								flat: "",
								round: "",
								dense: "",
								icon: "history",
								color: "grey-5",
								size: "sm",
								onClick: withModifiers(($event) => $setup.viewHistory(user), ["stop"])
							}, null, 8, ["onClick"])
						])
					])], 8, _hoisted_11);
				}), 128))]),
				_: 1
			})),
			createVNode(QPageSticky_default, {
				position: "bottom-right",
				offset: [18, 18]
			}, {
				default: withCtx(() => [createVNode(QBtn_default, {
					fab: "",
					icon: "person_add",
					color: "primary",
					"text-color": "dark",
					class: "fab-animated",
					onClick: _cache[2] || (_cache[2] = ($event) => $setup.showCreateDialog = true)
				})]),
				_: 1
			}),
			createVNode(QDialog_default, {
				modelValue: $setup.showCreateDialog,
				"onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => $setup.showCreateDialog = $event),
				persistent: ""
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
							default: withCtx(() => [createBaseVNode("div", _hoisted_16, [createVNode(QIcon_default, {
								name: $setup.editingUser ? "edit" : "person_add",
								color: "primary",
								class: "q-mr-sm"
							}, null, 8, ["name"]), createTextVNode(" " + toDisplayString($setup.editingUser ? "Editar Usuario" : "Nuevo Usuario"), 1)])]),
							_: 1
						}),
						createVNode(QCardSection_default, { class: "q-pt-none" }, {
							default: withCtx(() => [
								createVNode(QInput_default, {
									modelValue: $setup.form.documento,
									"onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $setup.form.documento = $event),
									label: "Documento",
									outlined: "",
									dark: "",
									dense: "",
									maxlength: "10",
									class: "q-mb-sm",
									disable: !!$setup.editingUser
								}, {
									prepend: withCtx(() => [createVNode(QIcon_default, { name: "badge" })]),
									_: 1
								}, 8, ["modelValue", "disable"]),
								createVNode(QInput_default, {
									modelValue: $setup.form.nombre,
									"onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $setup.form.nombre = $event),
									label: "Nombre",
									outlined: "",
									dark: "",
									dense: "",
									maxlength: "20",
									class: "q-mb-sm"
								}, {
									prepend: withCtx(() => [createVNode(QIcon_default, { name: "person" })]),
									_: 1
								}, 8, ["modelValue"]),
								createVNode(QInput_default, {
									modelValue: $setup.form.apellido,
									"onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $setup.form.apellido = $event),
									label: "Apellido",
									outlined: "",
									dark: "",
									dense: "",
									maxlength: "20",
									class: "q-mb-sm"
								}, {
									prepend: withCtx(() => [createVNode(QIcon_default, { name: "person_outline" })]),
									_: 1
								}, 8, ["modelValue"]),
								createVNode(QInput_default, {
									modelValue: $setup.form.telefono,
									"onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $setup.form.telefono = $event),
									label: "Teléfono",
									outlined: "",
									dark: "",
									dense: "",
									maxlength: "20",
									class: "q-mb-sm"
								}, {
									prepend: withCtx(() => [createVNode(QIcon_default, { name: "phone" })]),
									_: 1
								}, 8, ["modelValue"]),
								createVNode(QInput_default, {
									modelValue: $setup.form.direccion,
									"onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $setup.form.direccion = $event),
									label: "Dirección",
									outlined: "",
									dark: "",
									dense: "",
									maxlength: "100",
									class: "q-mb-sm"
								}, {
									prepend: withCtx(() => [createVNode(QIcon_default, { name: "home" })]),
									_: 1
								}, 8, ["modelValue"]),
								createVNode(QInput_default, {
									modelValue: $setup.form.password,
									"onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => $setup.form.password = $event),
									label: "Contraseña",
									outlined: "",
									dark: "",
									dense: "",
									maxlength: "20",
									type: "password"
								}, {
									prepend: withCtx(() => [createVNode(QIcon_default, { name: "lock" })]),
									_: 1
								}, 8, ["modelValue"])
							]),
							_: 1
						}),
						createVNode(QCardActions_default, {
							align: "right",
							class: "q-px-md q-pb-md"
						}, {
							default: withCtx(() => [createVNode(QBtn_default, {
								flat: "",
								label: "Cancelar",
								color: "grey-5",
								onClick: $setup.closeDialog
							}), createVNode(QBtn_default, {
								unelevated: "",
								label: $setup.editingUser ? "Actualizar" : "Crear",
								color: "primary",
								"text-color": "dark",
								loading: $setup.saving,
								onClick: $setup.saveUser,
								style: {
									"border-radius": "8px",
									"font-weight": "700"
								}
							}, null, 8, ["label", "loading"])]),
							_: 1
						})
					]),
					_: 1
				})]),
				_: 1
			}, 8, ["modelValue"]),
			createVNode(QDialog_default, {
				modelValue: $setup.showUserInfo,
				"onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => $setup.showUserInfo = $event)
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
							default: withCtx(() => [createBaseVNode("div", _hoisted_17, [createVNode(QIcon_default, {
								name: "person",
								color: "primary",
								class: "q-mr-sm"
							}), createTextVNode(" " + toDisplayString($setup.selectedUser?.nombre) + " " + toDisplayString($setup.selectedUser?.apellido), 1)]), createBaseVNode("div", _hoisted_18, " Doc: " + toDisplayString($setup.selectedUser?.documento), 1)]),
							_: 1
						}),
						createVNode(QSeparator_default, { dark: "" }),
						createVNode(QCardSection_default, null, {
							default: withCtx(() => [_cache[15] || (_cache[15] = createBaseVNode("div", { class: "text-subtitle2 text-grey-5 q-mb-sm" }, "Datos personales actuales", -1)), $setup.selectedUserData.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_19, " Sin datos registrados ")) : (openBlock(), createElementBlock("div", _hoisted_20, [(openBlock(true), createElementBlock(Fragment, null, renderList($setup.selectedUserData, (dato) => {
								return openBlock(), createElementBlock("div", {
									key: dato.campo,
									class: "field-row"
								}, [createBaseVNode("span", _hoisted_21, toDisplayString(dato.campo), 1), createBaseVNode("span", _hoisted_22, toDisplayString(dato.valor), 1)]);
							}), 128))]))]),
							_: 1
						}),
						createVNode(QCardActions_default, {
							align: "right",
							class: "q-px-md q-pb-md"
						}, {
							default: withCtx(() => [withDirectives(createVNode(QBtn_default, {
								flat: "",
								label: "Cerrar",
								color: "grey-5"
							}, null, 512), [[ClosePopup_default]]), createVNode(QBtn_default, {
								flat: "",
								label: "Ver historial",
								color: "primary",
								icon: "history",
								onClick: _cache[10] || (_cache[10] = ($event) => $setup.viewHistory($setup.selectedUser))
							})]),
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
var AdminPage_default = /*#__PURE__*/ _plugin_vue_export_helper_default(AdminPage_vue_vue_type_script_setup_true_lang_default, [
	["render", _sfc_render],
	["__scopeId", "data-v-c27ee197"],
	["__file", "AdminPage.vue"]
]);
//#endregion
export { AdminPage_default as default };

//# sourceMappingURL=AdminPage-CoiCVMzk.js.map