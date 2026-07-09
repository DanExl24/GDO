import { E as hMergeSlot, F as isDeepEqual, H as tabsKey, K as isKeyCode, O as hSlot, R as emptyRenderFn, c as QBtn_default, dt as Transition, g as Ripple_default, i as api, it as createComponent, mt as withKeys, q as shouldIgnoreKey, rt as stopAndPrevent, w as QIcon_default } from "./network-Dbb0uhtP.js";
import { E as onBeforeUnmount, G as ref, H as withDirectives, M as openBlock, N as provide, O as onDeactivated, S as inject, V as withCtx, _ as createVNode, d as createBlock, f as createCommentVNode, g as createTextVNode, k as onMounted, l as computed, p as createElementBlock, u as createBaseVNode, ut as toDisplayString, v as defineComponent, w as onActivated, x as h, y as getCurrentInstance, z as watch } from "./pinia-3_kWn-gx.js";
import { c as useTimeout, f as useRouter, p as _plugin_vue_export_helper_default, s as useTick } from "./use-dark-DPLXRKW0.js";
import { t as databaseService } from "./database-DoILKR0-.js";
import { F as useAuthStore, t as QInput_default, u as uid_default } from "./index-C6i8igny.js";
import { t as QChip_default } from "./QChip-Bx6UGqzI.js";
import { t as QResizeObserver_default } from "./QResizeObserver-DtwSlKXn.js";
import { t as rtlHasScrollBug } from "./rtl-BP7sjZXh.js";
import { t as QBanner_default } from "./QBanner-DKkKU3O2.js";
//#region node_modules/quasar/src/components/tabs/use-tab.js
var id = 0;
var useTabEmits = ["click", "keydown"];
var useTabProps = {
	icon: String,
	label: [Number, String],
	alert: [Boolean, String],
	alertIcon: String,
	name: {
		type: [Number, String],
		default: () => `t_${id++}`
	},
	noCaps: Boolean,
	tabindex: [String, Number],
	disable: Boolean,
	contentClass: String,
	ripple: {
		type: [Boolean, Object],
		default: true
	}
};
function useTab(props, slots, emit, routeData) {
	const $tabs = inject(tabsKey, emptyRenderFn);
	if ($tabs === emptyRenderFn) {
		console.error("QTab/QRouteTab component needs to be child of QTabs");
		return emptyRenderFn;
	}
	const { proxy } = getCurrentInstance();
	const blurTargetRef = ref(null);
	const rootRef = ref(null);
	const tabIndicatorRef = ref(null);
	const ripple = computed(() => props.disable || props.ripple === false ? false : {
		keyCodes: [13, 32],
		early: true,
		...props.ripple === true ? {} : props.ripple
	});
	const isActive = computed(() => $tabs.currentModel.value === props.name);
	const classes = computed(() => "q-tab relative-position self-stretch flex flex-center text-center" + (isActive.value ? " q-tab--active" + ($tabs.tabProps.value.activeClass ? " " + $tabs.tabProps.value.activeClass : "") + ($tabs.tabProps.value.activeColor ? ` text-${$tabs.tabProps.value.activeColor}` : "") + ($tabs.tabProps.value.activeBgColor ? ` bg-${$tabs.tabProps.value.activeBgColor}` : "") : " q-tab--inactive") + (props.icon && props.label && !$tabs.tabProps.value.inlineLabel ? " q-tab--full" : "") + (props.noCaps || $tabs.tabProps.value.noCaps ? " q-tab--no-caps" : "") + (props.disable ? " disabled" : " q-focusable q-hoverable cursor-pointer") + (routeData !== void 0 ? routeData.linkClass.value : ""));
	const innerClass = computed(() => "q-tab__content self-stretch flex-center relative-position q-anchor--skip non-selectable " + ($tabs.tabProps.value.inlineLabel ? "row no-wrap q-tab__content--inline" : "column") + (props.contentClass !== void 0 ? ` ${props.contentClass}` : ""));
	const tabIndex = computed(() => props.disable || $tabs.hasFocus.value || !isActive.value && $tabs.hasActiveTab.value ? -1 : props.tabindex || 0);
	function onClick(e, keyboard) {
		if (!keyboard && !e?.qAvoidFocus) blurTargetRef.value?.focus();
		if (props.disable) {
			if (routeData?.hasRouterLink.value === true) stopAndPrevent(e);
			return;
		}
		if (routeData === void 0) {
			$tabs.updateModel({ name: props.name });
			emit("click", e);
			return;
		}
		if (routeData.hasRouterLink.value) {
			const go = (opts = {}) => {
				let hardError;
				const reqId = opts.to === void 0 || isDeepEqual(opts.to, props.to) ? $tabs.avoidRouteWatcher = uid_default() : null;
				return routeData.navigateToRouterLink(e, {
					...opts,
					returnRouterError: true
				}).catch((err) => {
					hardError = err;
				}).then((softError) => {
					if (reqId === $tabs.avoidRouteWatcher) {
						$tabs.avoidRouteWatcher = false;
						if (hardError === void 0 && (softError === void 0 || softError.message?.startsWith("Avoided redundant navigation") === true)) $tabs.updateModel({ name: props.name });
					}
					if (opts.returnRouterError) return hardError !== void 0 ? Promise.reject(hardError) : softError;
				});
			};
			emit("click", e, go);
			if (!e.defaultPrevented) go();
			return;
		}
		emit("click", e);
	}
	function onKeydown(e) {
		if (isKeyCode(e, [13, 32])) onClick(e, true);
		else if (!shouldIgnoreKey(e) && e.keyCode >= 35 && e.keyCode <= 40 && !e.altKey && !e.metaKey && $tabs.onKbdNavigate(e.keyCode, proxy.$el)) stopAndPrevent(e);
		emit("keydown", e);
	}
	function getContent() {
		const narrow = $tabs.tabProps.value.narrowIndicator, content = [], indicator = h("div", {
			ref: tabIndicatorRef,
			class: ["q-tab__indicator", $tabs.tabProps.value.indicatorClass]
		});
		if (props.icon !== void 0) content.push(h(QIcon_default, {
			class: "q-tab__icon",
			name: props.icon
		}));
		if (props.label !== void 0) content.push(h("div", { class: "q-tab__label" }, props.label));
		if (props.alert) content.push(props.alertIcon !== void 0 ? h(QIcon_default, {
			class: "q-tab__alert-icon",
			color: props.alert !== true ? props.alert : void 0,
			name: props.alertIcon
		}) : h("div", { class: "q-tab__alert" + (props.alert !== true ? ` text-${props.alert}` : "") }));
		if (narrow) content.push(indicator);
		const node = [h("div", {
			class: "q-focus-helper",
			tabindex: -1,
			ref: blurTargetRef
		}), h("div", { class: innerClass.value }, hMergeSlot(slots.default, content))];
		if (!narrow) node.push(indicator);
		return node;
	}
	const tabData = {
		name: computed(() => props.name),
		rootRef,
		tabIndicatorRef,
		routeData
	};
	onBeforeUnmount(() => {
		$tabs.unregisterTab(tabData);
	});
	onMounted(() => {
		$tabs.registerTab(tabData);
	});
	function renderTab(tag, customData) {
		return withDirectives(h(tag, {
			ref: rootRef,
			class: classes.value,
			tabindex: tabIndex.value,
			role: "tab",
			"aria-selected": isActive.value ? "true" : "false",
			"aria-disabled": props.disable ? "true" : void 0,
			onClick,
			onKeydown,
			...customData
		}, getContent()), [[Ripple_default, ripple.value]]);
	}
	return {
		renderTab,
		$tabs
	};
}
//#endregion
//#region node_modules/quasar/src/components/tabs/QTab.js
var QTab_default = createComponent({
	name: "QTab",
	props: useTabProps,
	emits: useTabEmits,
	setup(props, { slots, emit }) {
		const { renderTab } = useTab(props, slots, emit);
		return () => renderTab("div");
	}
});
//#endregion
//#region node_modules/quasar/src/components/tabs/QTabs.js
function getIndicatorClass(color, top, vertical) {
	const pos = vertical ? ["left", "right"] : ["top", "bottom"];
	return `absolute-${top ? pos[0] : pos[1]}${color ? ` text-${color}` : ""}`;
}
function hasQueryIncluded(targetQuery, matchingQuery) {
	for (const key in targetQuery) if (targetQuery[key] !== matchingQuery[key]) return false;
	return true;
}
var alignValues = [
	"left",
	"center",
	"right",
	"justify"
];
var QTabs_default = createComponent({
	name: "QTabs",
	props: {
		modelValue: [Number, String],
		align: {
			type: String,
			default: "center",
			validator: (v) => alignValues.includes(v)
		},
		breakpoint: {
			type: [String, Number],
			default: 600
		},
		vertical: Boolean,
		shrink: Boolean,
		stretch: Boolean,
		activeClass: String,
		activeColor: String,
		activeBgColor: String,
		indicatorColor: String,
		leftIcon: String,
		rightIcon: String,
		outsideArrows: Boolean,
		mobileArrows: Boolean,
		switchIndicator: Boolean,
		narrowIndicator: Boolean,
		inlineLabel: Boolean,
		noCaps: Boolean,
		dense: Boolean,
		contentClass: String,
		"onUpdate:modelValue": [Function, Array]
	},
	setup(props, { slots, emit }) {
		const { proxy } = getCurrentInstance();
		const { $q } = proxy;
		const { registerTick: registerScrollTick } = useTick();
		const { registerTick: registerUpdateArrowsTick } = useTick();
		const { registerTick: registerAnimateTick } = useTick();
		const { registerTimeout: registerFocusTimeout, removeTimeout: removeFocusTimeout } = useTimeout();
		const { registerTimeout: registerScrollToTabTimeout, removeTimeout: removeScrollToTabTimeout } = useTimeout();
		const rootRef = ref(null);
		const contentRef = ref(null);
		const currentModel = ref(props.modelValue);
		const scrollable = ref(false);
		const leftArrow = ref(true);
		const rightArrow = ref(false);
		const justify = ref(false);
		const tabDataList = [];
		const tabDataListLen = ref(0);
		const hasFocus = ref(false);
		let animateTimer = null, scrollTimer = null, unwatchRoute;
		const tabProps = computed(() => ({
			activeClass: props.activeClass,
			activeColor: props.activeColor,
			activeBgColor: props.activeBgColor,
			indicatorClass: getIndicatorClass(props.indicatorColor, props.switchIndicator, props.vertical),
			narrowIndicator: props.narrowIndicator,
			inlineLabel: props.inlineLabel,
			noCaps: props.noCaps
		}));
		const hasActiveTab = computed(() => {
			const len = tabDataListLen.value;
			const val = currentModel.value;
			for (let i = 0; i < len; i++) if (tabDataList[i].name.value === val) return true;
			return false;
		});
		const alignClass = computed(() => {
			return `q-tabs__content--align-${scrollable.value ? "left" : justify.value ? "justify" : props.align}`;
		});
		const classes = computed(() => `q-tabs row no-wrap items-center q-tabs--${scrollable.value ? "" : "not-"}scrollable q-tabs--${props.vertical ? "vertical" : "horizontal"} q-tabs__arrows--${props.outsideArrows ? "outside" : "inside"} q-tabs--mobile-with${props.mobileArrows ? "" : "out"}-arrows` + (props.dense ? " q-tabs--dense" : "") + (props.shrink ? " col-shrink" : "") + (props.stretch ? " self-stretch" : ""));
		const innerClass = computed(() => "q-tabs__content scroll--mobile row no-wrap items-center self-stretch hide-scrollbar relative-position " + alignClass.value + (props.contentClass !== void 0 ? ` ${props.contentClass}` : ""));
		const domProps = computed(() => props.vertical ? {
			container: "height",
			content: "offsetHeight",
			scroll: "scrollHeight"
		} : {
			container: "width",
			content: "offsetWidth",
			scroll: "scrollWidth"
		});
		const isRTL = computed(() => !props.vertical && $q.lang.rtl === true);
		const rtlPosCorrection = computed(() => !rtlHasScrollBug && isRTL.value);
		watch(isRTL, updateArrows);
		watch(() => props.modelValue, (name) => {
			updateModel({
				name,
				setCurrent: true,
				skipEmit: true
			});
		});
		watch(() => props.outsideArrows, recalculateScroll);
		function updateModel({ name, setCurrent, skipEmit }) {
			if (currentModel.value === name) return;
			if (!skipEmit && props["onUpdate:modelValue"] !== void 0) emit("update:modelValue", name);
			if (setCurrent || props["onUpdate:modelValue"] === void 0) {
				animate(currentModel.value, name);
				currentModel.value = name;
			}
		}
		function recalculateScroll() {
			registerScrollTick(() => {
				if (rootRef.value) updateContainer({
					width: rootRef.value.offsetWidth,
					height: rootRef.value.offsetHeight
				});
			});
		}
		function updateContainer(domSize) {
			if (domProps.value === void 0 || contentRef.value === null) return;
			const size = domSize[domProps.value.container], scrollSize = Math.min(contentRef.value[domProps.value.scroll], Array.prototype.reduce.call(contentRef.value.children, (acc, el) => acc + (el[domProps.value.content] || 0), 0)), scroll = size > 0 && scrollSize > size;
			scrollable.value = scroll;
			if (scroll) registerUpdateArrowsTick(updateArrows);
			justify.value = size < Number.parseInt(props.breakpoint, 10);
		}
		function animate(oldName, newName) {
			const oldTab = oldName !== void 0 && oldName !== null && oldName !== "" ? tabDataList.find((tab) => tab.name.value === oldName) : null, newTab = newName !== void 0 && newName !== null && newName !== "" ? tabDataList.find((tab) => tab.name.value === newName) : null;
			if (hadActivated) hadActivated = false;
			else if (oldTab && newTab) {
				const oldEl = oldTab.tabIndicatorRef.value, newEl = newTab.tabIndicatorRef.value;
				if (animateTimer !== null) {
					clearTimeout(animateTimer);
					animateTimer = null;
				}
				oldEl.style.transition = "none";
				oldEl.style.transform = "none";
				newEl.style.transition = "none";
				newEl.style.transform = "none";
				const oldPos = oldEl.getBoundingClientRect(), newPos = newEl.getBoundingClientRect();
				newEl.style.transform = props.vertical ? `translate3d(0,${oldPos.top - newPos.top}px,0) scale3d(1,${newPos.height ? oldPos.height / newPos.height : 1},1)` : `translate3d(${oldPos.left - newPos.left}px,0,0) scale3d(${newPos.width ? oldPos.width / newPos.width : 1},1,1)`;
				registerAnimateTick(() => {
					animateTimer = setTimeout(() => {
						animateTimer = null;
						newEl.style.transition = "transform .25s cubic-bezier(.4, 0, .2, 1)";
						newEl.style.transform = "none";
					}, 70);
				});
			}
			if (newTab && scrollable.value) scrollToTabEl(newTab.rootRef.value);
		}
		function scrollToTabEl(el) {
			const { left, width, top, height } = contentRef.value.getBoundingClientRect(), newPos = el.getBoundingClientRect();
			let offset = props.vertical ? newPos.top - top : newPos.left - left;
			if (offset < 0) {
				contentRef.value[props.vertical ? "scrollTop" : "scrollLeft"] += Math.floor(offset);
				updateArrows();
				return;
			}
			offset += props.vertical ? newPos.height - height : newPos.width - width;
			if (offset > 0) {
				contentRef.value[props.vertical ? "scrollTop" : "scrollLeft"] += Math.ceil(offset);
				updateArrows();
			}
		}
		function updateArrows() {
			const content = contentRef.value;
			if (content === null) return;
			const rect = content.getBoundingClientRect(), pos = props.vertical ? content.scrollTop : Math.abs(content.scrollLeft);
			if (isRTL.value) {
				leftArrow.value = Math.ceil(pos + rect.width) < content.scrollWidth - 1;
				rightArrow.value = pos > 0;
			} else {
				leftArrow.value = pos > 0;
				rightArrow.value = props.vertical ? Math.ceil(pos + rect.height) < content.scrollHeight : Math.ceil(pos + rect.width) < content.scrollWidth;
			}
		}
		function animScrollTo(value) {
			if (scrollTimer !== null) clearInterval(scrollTimer);
			scrollTimer = setInterval(() => {
				if (scrollTowards(value)) stopAnimScroll();
			}, 5);
		}
		function scrollToStart() {
			animScrollTo(rtlPosCorrection.value ? Number.MAX_SAFE_INTEGER : 0);
		}
		function scrollToEnd() {
			animScrollTo(rtlPosCorrection.value ? 0 : Number.MAX_SAFE_INTEGER);
		}
		function stopAnimScroll() {
			if (scrollTimer !== null) {
				clearInterval(scrollTimer);
				scrollTimer = null;
			}
		}
		function onKbdNavigate(keyCode, fromEl) {
			const tabs = Array.prototype.filter.call(contentRef.value.children, (el) => el === fromEl || el.matches?.(".q-tab.q-focusable"));
			const len = tabs.length;
			if (len === 0) return;
			if (keyCode === 36) {
				scrollToTabEl(tabs[0]);
				tabs[0].focus();
				return true;
			}
			if (keyCode === 35) {
				scrollToTabEl(tabs[len - 1]);
				tabs[len - 1].focus();
				return true;
			}
			const dirPrev = keyCode === (props.vertical ? 38 : 37);
			const dirNext = keyCode === (props.vertical ? 40 : 39);
			const dir = dirPrev ? -1 : dirNext ? 1 : void 0;
			if (dir !== void 0) {
				const rtlDir = isRTL.value ? -1 : 1;
				const index = tabs.indexOf(fromEl) + dir * rtlDir;
				if (index >= 0 && index < len) {
					scrollToTabEl(tabs[index]);
					tabs[index].focus({ preventScroll: true });
				}
				return true;
			}
		}
		const posFn = computed(() => rtlPosCorrection.value ? {
			get: (content) => Math.abs(content.scrollLeft),
			set: (content, pos) => {
				content.scrollLeft = -pos;
			}
		} : props.vertical ? {
			get: (content) => content.scrollTop,
			set: (content, pos) => {
				content.scrollTop = pos;
			}
		} : {
			get: (content) => content.scrollLeft,
			set: (content, pos) => {
				content.scrollLeft = pos;
			}
		});
		function scrollTowards(value) {
			const content = contentRef.value, { get, set } = posFn.value;
			let done = false, pos = get(content);
			const direction = value < pos ? -1 : 1;
			pos += direction * 5;
			if (pos < 0) {
				done = true;
				pos = 0;
			} else if (direction === -1 && pos <= value || direction === 1 && pos >= value) {
				done = true;
				pos = value;
			}
			set(content, pos);
			updateArrows();
			return done;
		}
		function updateActiveRoute() {
			let name = null, bestScore = {
				matchedLen: 0,
				queryDiff: 9999,
				hrefLen: 0
			};
			const list = tabDataList.filter((tab) => tab.routeData?.hasRouterLink.value === true);
			const { hash: currentHash, query: currentQuery } = proxy.$route;
			const currentQueryLen = Object.keys(currentQuery).length;
			for (const tab of list) {
				const exact = tab.routeData.exact.value === true;
				if (!tab.routeData[exact ? "linkIsExactActive" : "linkIsActive"].value) continue;
				const { hash, query, matched, href } = tab.routeData.resolvedLink.value;
				const queryLen = Object.keys(query).length;
				if (exact) {
					if (hash !== currentHash) continue;
					if (queryLen !== currentQueryLen || !hasQueryIncluded(currentQuery, query)) continue;
					name = tab.name.value;
					break;
				}
				if (hash !== "" && hash !== currentHash) continue;
				if (queryLen !== 0 && !hasQueryIncluded(query, currentQuery)) continue;
				const newScore = {
					matchedLen: matched.length,
					queryDiff: currentQueryLen - queryLen,
					hrefLen: href.length - hash.length
				};
				if (newScore.matchedLen > bestScore.matchedLen) {
					name = tab.name.value;
					bestScore = newScore;
					continue;
				} else if (newScore.matchedLen !== bestScore.matchedLen) continue;
				if (newScore.queryDiff < bestScore.queryDiff) {
					name = tab.name.value;
					bestScore = newScore;
				} else if (newScore.queryDiff !== bestScore.queryDiff) continue;
				if (newScore.hrefLen > bestScore.hrefLen) {
					name = tab.name.value;
					bestScore = newScore;
				}
			}
			if (name === null && tabDataList.some((tab) => tab.routeData === void 0 && tab.name.value === currentModel.value)) {
				hadActivated = false;
				return;
			}
			updateModel({
				name,
				setCurrent: true
			});
		}
		function onFocusin(e) {
			removeFocusTimeout();
			if (!hasFocus.value && rootRef.value !== null && e.target && typeof e.target.closest === "function") {
				const tab = e.target.closest(".q-tab");
				if (tab && rootRef.value.contains(tab)) {
					hasFocus.value = true;
					if (scrollable.value) scrollToTabEl(tab);
				}
			}
		}
		function onFocusout() {
			registerFocusTimeout(() => {
				hasFocus.value = false;
			}, 30);
		}
		function verifyRouteModel() {
			if ($tabs.avoidRouteWatcher === false) registerScrollToTabTimeout(updateActiveRoute);
			else removeScrollToTabTimeout();
		}
		function watchRoute() {
			if (unwatchRoute === void 0) {
				const unwatch = watch(() => proxy.$route.fullPath, verifyRouteModel);
				unwatchRoute = () => {
					unwatch();
					unwatchRoute = void 0;
				};
			}
		}
		function registerTab(tabData) {
			tabDataList.push(tabData);
			tabDataListLen.value++;
			recalculateScroll();
			if (tabData.routeData === void 0 || proxy.$route === void 0) registerScrollToTabTimeout(() => {
				if (scrollable.value) {
					const value = currentModel.value;
					const newTab = value !== void 0 && value !== null && value !== "" ? tabDataList.find((tab) => tab.name.value === value) : null;
					if (newTab) scrollToTabEl(newTab.rootRef.value);
				}
			});
			else {
				watchRoute();
				if (tabData.routeData.hasRouterLink.value) verifyRouteModel();
			}
		}
		function unregisterTab(tabData) {
			tabDataList.splice(tabDataList.indexOf(tabData), 1);
			tabDataListLen.value--;
			recalculateScroll();
			if (unwatchRoute !== void 0 && tabData.routeData !== void 0) {
				if (tabDataList.every((tab) => tab.routeData === void 0)) unwatchRoute();
				verifyRouteModel();
			}
		}
		const $tabs = {
			currentModel,
			tabProps,
			hasFocus,
			hasActiveTab,
			registerTab,
			unregisterTab,
			verifyRouteModel,
			updateModel,
			onKbdNavigate,
			avoidRouteWatcher: false
		};
		provide(tabsKey, $tabs);
		function cleanup() {
			if (animateTimer !== null) clearTimeout(animateTimer);
			stopAnimScroll();
			unwatchRoute?.();
		}
		let hadRouteWatcher = false, hadActivated = false;
		onBeforeUnmount(cleanup);
		onDeactivated(() => {
			hadRouteWatcher = unwatchRoute !== void 0;
			cleanup();
		});
		onActivated(() => {
			if (hadRouteWatcher) {
				watchRoute();
				hadActivated = true;
				verifyRouteModel();
			}
			recalculateScroll();
		});
		return () => h("div", {
			ref: rootRef,
			class: classes.value,
			role: "tablist",
			onFocusin,
			onFocusout
		}, [
			h(QResizeObserver_default, { onResize: updateContainer }),
			h("div", {
				ref: contentRef,
				class: innerClass.value,
				onScroll: updateArrows
			}, hSlot(slots.default)),
			h(QIcon_default, {
				class: "q-tabs__arrow q-tabs__arrow--left absolute q-tab__icon" + (leftArrow.value ? "" : " q-tabs__arrow--faded"),
				name: props.leftIcon || $q.iconSet.tabs[props.vertical ? "up" : "left"],
				onMousedownPassive: scrollToStart,
				onTouchstartPassive: scrollToStart,
				onMouseupPassive: stopAnimScroll,
				onMouseleavePassive: stopAnimScroll,
				onTouchendPassive: stopAnimScroll
			}),
			h(QIcon_default, {
				class: "q-tabs__arrow q-tabs__arrow--right absolute q-tab__icon" + (rightArrow.value ? "" : " q-tabs__arrow--faded"),
				name: props.rightIcon || $q.iconSet.tabs[props.vertical ? "down" : "right"],
				onMousedownPassive: scrollToEnd,
				onTouchstartPassive: scrollToEnd,
				onMouseupPassive: stopAnimScroll,
				onMouseleavePassive: stopAnimScroll,
				onTouchendPassive: stopAnimScroll
			})
		]);
	}
});
//#endregion
//#region src/pages/LoginPage.vue?vue&type=script&setup=true&lang.ts
var LoginPage_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "LoginPage",
	setup(__props, { expose: __expose }) {
		__expose();
		const router = useRouter();
		const authStore = useAuthStore();
		const loginType = ref("user");
		const documento = ref("");
		const userPass = ref("");
		const showUserPassword = ref(false);
		const adminUser = ref("");
		const adminPass = ref("");
		const showPassword = ref(false);
		const loading = ref(false);
		const errorMsg = ref("");
		const isOnline = ref(navigator.onLine);
		onMounted(() => {
			window.addEventListener("online", () => isOnline.value = true);
			window.addEventListener("offline", () => isOnline.value = false);
			if (authStore.isAuthenticated) router.push(authStore.role === "admin" ? "/admin" : "/user");
		});
		async function handleLogin() {
			errorMsg.value = "";
			loading.value = true;
			try {
				if (loginType.value === "admin") {
					if (!adminUser.value || !adminPass.value) {
						errorMsg.value = "Complete todos los campos";
						return;
					}
					try {
						if ((await api.post("/auth/login", {
							tipo: "admin",
							documento: adminUser.value,
							password: adminPass.value
						})).data.success) {
							authStore.loginAsAdmin();
							router.push("/admin");
						}
					} catch (err) {
						if (err.response?.status === 401) errorMsg.value = "Credenciales incorrectas";
						else if (adminUser.value === "admin" && adminPass.value === "admin123") {
							authStore.loginAsAdmin();
							router.push("/admin");
						} else errorMsg.value = "Sin conexión. Use credenciales offline.";
					}
				} else {
					if (!documento.value || !userPass.value) {
						errorMsg.value = "Ingrese documento y contraseña";
						return;
					}
					try {
						const response = await api.post("/auth/login", {
							tipo: "user",
							documento: documento.value,
							password: userPass.value
						});
						if (response.data.success) {
							authStore.loginAsUser(response.data.usuario);
							router.push("/user");
						}
					} catch (err) {
						const axiosErr = err;
						if (axiosErr.response?.status === 401 || axiosErr.response?.status === 404) errorMsg.value = axiosErr.response.data?.error || "Credenciales incorrectas";
						else {
							const localUser = await databaseService.getUsuarioByDocumento(documento.value);
							if (localUser) if (!localUser.password || localUser.password.trim() === "" || localUser.password === userPass.value) {
								authStore.loginAsUser(localUser);
								router.push("/user");
								return;
							} else {
								errorMsg.value = "Contraseña incorrecta (modo offline)";
								return;
							}
							errorMsg.value = "Error de conexión. Intente más tarde.";
						}
					}
				}
			} finally {
				loading.value = false;
			}
		}
		const __returned__ = {
			router,
			authStore,
			loginType,
			documento,
			userPass,
			showUserPassword,
			adminUser,
			adminPass,
			showPassword,
			loading,
			errorMsg,
			isOnline,
			handleLogin
		};
		Object.defineProperty(__returned__, "__isScriptSetup", {
			enumerable: false,
			value: true
		});
		return __returned__;
	}
});
//#endregion
//#region src/pages/LoginPage.vue
var _hoisted_1 = { class: "gradient-bg login-container" };
var _hoisted_2 = { class: "glass-card login-card" };
var _hoisted_3 = { class: "q-mb-lg text-center" };
var _hoisted_4 = { key: 0 };
var _hoisted_5 = { key: 1 };
var _hoisted_6 = { class: "q-mt-lg text-center" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
	return openBlock(), createElementBlock("div", _hoisted_1, [
		_cache[9] || (_cache[9] = createBaseVNode("div", { class: "login-bg-circles" }, [
			createBaseVNode("div", { class: "circle circle-1" }),
			createBaseVNode("div", { class: "circle circle-2" }),
			createBaseVNode("div", { class: "circle circle-3" })
		], -1)),
		createBaseVNode("div", _hoisted_2, [
			createBaseVNode("div", _hoisted_3, [
				createVNode(QIcon_default, {
					name: "cloud_sync",
					size: "56px",
					color: "primary"
				}),
				_cache[7] || (_cache[7] = createBaseVNode("h1", { class: "login-title" }, "OfflineOnline", -1)),
				_cache[8] || (_cache[8] = createBaseVNode("p", { class: "login-subtitle" }, "Sistema de Gestión de Datos", -1))
			]),
			createVNode(QTabs_default, {
				modelValue: $setup.loginType,
				"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.loginType = $event),
				dense: "",
				class: "q-mb-lg",
				"active-color": "primary",
				"indicator-color": "primary",
				align: "center",
				"narrow-indicator": "",
				style: {
					"background": "rgba(255,255,255,0.03)",
					"border-radius": "12px"
				}
			}, {
				default: withCtx(() => [createVNode(QTab_default, {
					name: "user",
					label: "Usuario",
					icon: "person"
				}), createVNode(QTab_default, {
					name: "admin",
					label: "Admin",
					icon: "admin_panel_settings"
				})]),
				_: 1
			}, 8, ["modelValue"]),
			$setup.loginType === "user" ? (openBlock(), createElementBlock("div", _hoisted_4, [createVNode(QInput_default, {
				modelValue: $setup.documento,
				"onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.documento = $event),
				label: "Documento de identidad",
				outlined: "",
				dark: "",
				dense: "",
				type: "text",
				maxlength: "10",
				class: "q-mb-md",
				rules: [(val) => !!val || "Ingrese su documento"],
				onKeyup: withKeys($setup.handleLogin, ["enter"])
			}, {
				prepend: withCtx(() => [createVNode(QIcon_default, {
					name: "badge",
					color: "primary"
				})]),
				_: 1
			}, 8, ["modelValue", "rules"]), createVNode(QInput_default, {
				modelValue: $setup.userPass,
				"onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $setup.userPass = $event),
				label: "Contraseña",
				outlined: "",
				dark: "",
				dense: "",
				type: $setup.showUserPassword ? "text" : "password",
				class: "q-mb-md",
				onKeyup: withKeys($setup.handleLogin, ["enter"])
			}, {
				prepend: withCtx(() => [createVNode(QIcon_default, {
					name: "lock",
					color: "primary"
				})]),
				append: withCtx(() => [createVNode(QIcon_default, {
					name: $setup.showUserPassword ? "visibility_off" : "visibility",
					class: "cursor-pointer",
					onClick: _cache[2] || (_cache[2] = ($event) => $setup.showUserPassword = !$setup.showUserPassword)
				}, null, 8, ["name"])]),
				_: 1
			}, 8, ["modelValue", "type"])])) : (openBlock(), createElementBlock("div", _hoisted_5, [createVNode(QInput_default, {
				modelValue: $setup.adminUser,
				"onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $setup.adminUser = $event),
				label: "Usuario administrador",
				outlined: "",
				dark: "",
				dense: "",
				class: "q-mb-sm",
				onKeyup: withKeys($setup.handleLogin, ["enter"])
			}, {
				prepend: withCtx(() => [createVNode(QIcon_default, {
					name: "person",
					color: "primary"
				})]),
				_: 1
			}, 8, ["modelValue"]), createVNode(QInput_default, {
				modelValue: $setup.adminPass,
				"onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $setup.adminPass = $event),
				label: "Contraseña",
				outlined: "",
				dark: "",
				dense: "",
				type: $setup.showPassword ? "text" : "password",
				class: "q-mb-md",
				onKeyup: withKeys($setup.handleLogin, ["enter"])
			}, {
				prepend: withCtx(() => [createVNode(QIcon_default, {
					name: "lock",
					color: "primary"
				})]),
				append: withCtx(() => [createVNode(QIcon_default, {
					name: $setup.showPassword ? "visibility_off" : "visibility",
					class: "cursor-pointer",
					onClick: _cache[5] || (_cache[5] = ($event) => $setup.showPassword = !$setup.showPassword)
				}, null, 8, ["name"])]),
				_: 1
			}, 8, ["modelValue", "type"])])),
			createVNode(QBtn_default, {
				unelevated: "",
				color: "primary",
				"text-color": "dark",
				label: "Ingresar",
				class: "full-width q-py-sm",
				loading: $setup.loading,
				style: {
					"border-radius": "12px",
					"font-weight": "700",
					"font-size": "15px"
				},
				onClick: $setup.handleLogin
			}, null, 8, ["loading"]),
			createVNode(Transition, { name: "sync-progress" }, {
				default: withCtx(() => [$setup.errorMsg ? (openBlock(), createBlock(QBanner_default, {
					key: 0,
					dense: "",
					class: "q-mt-md text-negative",
					style: {
						"background": "rgba(244,67,54,0.1)",
						"border-radius": "8px",
						"border": "1px solid rgba(244,67,54,0.2)"
					}
				}, {
					avatar: withCtx(() => [createVNode(QIcon_default, {
						name: "error",
						color: "negative"
					})]),
					default: withCtx(() => [createTextVNode(" " + toDisplayString($setup.errorMsg), 1)]),
					_: 1
				})) : createCommentVNode("", true)]),
				_: 1
			})
		]),
		createBaseVNode("div", _hoisted_6, [createVNode(QChip_default, {
			color: $setup.isOnline ? "positive" : "negative",
			"text-color": "white",
			icon: $setup.isOnline ? "wifi" : "wifi_off",
			label: $setup.isOnline ? "Conectado" : "Sin conexión",
			dense: "",
			style: { "opacity": "0.7" }
		}, null, 8, [
			"color",
			"icon",
			"label"
		])])
	]);
}
var LoginPage_default = /*#__PURE__*/ _plugin_vue_export_helper_default(LoginPage_vue_vue_type_script_setup_true_lang_default, [
	["render", _sfc_render],
	["__scopeId", "data-v-49117b0c"],
	["__file", "LoginPage.vue"]
]);
//#endregion
export { LoginPage_default as default };

//# sourceMappingURL=LoginPage-B1mR8RIT.js.map