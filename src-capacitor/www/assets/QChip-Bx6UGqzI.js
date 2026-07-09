import { A as useSize, D as hMergeSlotSafely, T as hDir, g as Ripple_default, it as createComponent, j as useSizeProps, rt as stopAndPrevent, w as QIcon_default } from "./network-Dbb0uhtP.js";
import { l as computed, x as h, y as getCurrentInstance } from "./pinia-3_kWn-gx.js";
import { n as useDarkProps, t as useDark } from "./use-dark-DPLXRKW0.js";
//#region node_modules/quasar/src/components/chip/QChip.js
var defaultSizes = {
	xs: 8,
	sm: 10,
	md: 14,
	lg: 20,
	xl: 24
};
var QChip_default = createComponent({
	name: "QChip",
	props: {
		...useDarkProps,
		...useSizeProps,
		dense: Boolean,
		icon: String,
		iconRight: String,
		iconRemove: String,
		iconSelected: String,
		label: [String, Number],
		color: String,
		textColor: String,
		modelValue: {
			type: Boolean,
			default: true
		},
		selected: {
			type: Boolean,
			default: null
		},
		square: Boolean,
		outline: Boolean,
		clickable: Boolean,
		removable: Boolean,
		removeAriaLabel: String,
		tabindex: [String, Number],
		disable: Boolean,
		ripple: {
			type: [Boolean, Object],
			default: true
		}
	},
	emits: [
		"update:modelValue",
		"update:selected",
		"remove",
		"click"
	],
	setup(props, { slots, emit }) {
		const { proxy: { $q } } = getCurrentInstance();
		const isDark = useDark(props, $q);
		const sizeStyle = useSize(props, defaultSizes);
		const hasLeftIcon = computed(() => props.selected || props.icon !== void 0);
		const leftIcon = computed(() => props.selected ? props.iconSelected || $q.iconSet.chip.selected : props.icon);
		const removeIcon = computed(() => props.iconRemove || $q.iconSet.chip.remove);
		const isClickable = computed(() => !props.disable && (props.clickable || props.selected !== null));
		const classes = computed(() => {
			const text = props.outline ? props.color || props.textColor : props.textColor;
			return "q-chip row inline no-wrap items-center" + (!props.outline && props.color !== void 0 ? ` bg-${props.color}` : "") + (text ? ` text-${text} q-chip--colored` : "") + (props.disable ? " disabled" : "") + (props.dense ? " q-chip--dense" : "") + (props.outline ? " q-chip--outline" : "") + (props.selected ? " q-chip--selected" : "") + (isClickable.value ? " q-chip--clickable cursor-pointer non-selectable q-hoverable" : "") + (props.square ? " q-chip--square" : "") + (isDark.value ? " q-chip--dark q-dark" : "");
		});
		const attributes = computed(() => {
			const chip = props.disable ? {
				tabindex: -1,
				"aria-disabled": "true"
			} : { tabindex: props.tabindex || 0 };
			return {
				chip,
				remove: {
					...chip,
					role: "button",
					"aria-hidden": "false",
					"aria-label": props.removeAriaLabel || $q.lang.label.remove
				}
			};
		});
		function onKeyup(e) {
			if (e.keyCode === 13) onClick(e);
		}
		function onClick(e) {
			if (!props.disable) {
				emit("update:selected", !props.selected);
				emit("click", e);
			}
		}
		function onRemove(e) {
			if (e.keyCode === void 0 || e.keyCode === 13) {
				stopAndPrevent(e);
				if (!props.disable) {
					emit("update:modelValue", false);
					emit("remove");
				}
			}
		}
		function getContent() {
			const child = [];
			if (isClickable.value) child.push(h("div", { class: "q-focus-helper" }));
			if (hasLeftIcon.value) child.push(h(QIcon_default, {
				class: "q-chip__icon q-chip__icon--left",
				name: leftIcon.value
			}));
			const label = props.label !== void 0 ? [h("div", { class: "ellipsis" }, [props.label])] : void 0;
			child.push(h("div", { class: "q-chip__content col row no-wrap items-center q-anchor--skip" }, hMergeSlotSafely(slots.default, label)));
			if (props.iconRight) child.push(h(QIcon_default, {
				class: "q-chip__icon q-chip__icon--right",
				name: props.iconRight
			}));
			if (props.removable) child.push(h(QIcon_default, {
				class: "q-chip__icon q-chip__icon--remove cursor-pointer",
				name: removeIcon.value,
				...attributes.value.remove,
				onClick: onRemove,
				onKeyup: onRemove
			}));
			return child;
		}
		return () => {
			if (!props.modelValue) return;
			const data = {
				class: classes.value,
				style: sizeStyle.value
			};
			if (isClickable.value) Object.assign(data, attributes.value.chip, {
				onClick,
				onKeyup
			});
			return hDir("div", data, getContent(), "ripple", props.ripple !== false && !props.disable, () => [[Ripple_default, props.ripple]]);
		};
	}
});
//#endregion
export { QChip_default as t };

//# sourceMappingURL=QChip-Bx6UGqzI.js.map