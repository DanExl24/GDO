const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./web-CX-bidKt.js","./dist-DAO462gx.js","./web-D_3pUgEa.js","./LoginPage-B1mR8RIT.js","./network-Dbb0uhtP.js","./pinia-3_kWn-gx.js","./database-DoILKR0-.js","./preload-helper-iIio8xkS.js","./use-dark-DPLXRKW0.js","./QChip-Bx6UGqzI.js","./QResizeObserver-DtwSlKXn.js","./rtl-BP7sjZXh.js","./QBanner-DKkKU3O2.js","./LoginPage-C4YiLKAr.css","./MainLayout-ecHZP3_e.js","./QTooltip-C_4HRcAA.js","./position-engine-Cdoa99XV.js","./QSpinnerDots-BlrGZuFe.js","./use-quasar-CgO-gf7R.js","./MainLayout-CwdaBIgW.css","./AdminPage-CoiCVMzk.js","./QPage-BYBG-CUN.js","./AdminPage-Cx-uTNFi.css","./UserPage-Clls2yHi.js","./HistoryPage-CqDQiyR0.js","./pinia-swN4aULs.js","./sqlite-DKsorewZ.js"])))=>i.map(i=>d[i]);
import { $ as noop, A as useSize, E as hMergeSlot, G as History_default, I as isObject$1, J as debounce, K as isKeyCode, L as isRegexp, M as createChildApp, N as install_quasar_default, O as hSlot, P as isDate, Q as listenOpts, U as Plugin$3, W as Plugin$2, Z as getEventPath, _ as childHasFocus, a as Notify_default, b as QSpinner_default, c as QBtn_default, ct as client, d as getParentProxy, dt as Transition, f as vmHasRouter, gt as __exportAll, h as useAlignProps, it as createComponent, j as useSizeProps, lt as isRuntimeSsrPreHydration, m as useAlign, nt as stop, o as createGlobalNode, ot as createReactivePlugin, pt as createApp, q as shouldIgnoreKey, r as API_URL, rt as stopAndPrevent, s as removeGlobalNode, t as useNetworkStore, tt as prevent, ut as injectProp, v as css, w as QIcon_default, y as getElement, z as formKey } from "./network-Dbb0uhtP.js";
import { A as onUnmounted, C as nextTick$1, D as onBeforeUpdate, E as onBeforeUnmount, F as resolveComponent, G as ref, J as toRaw, M as openBlock, O as onDeactivated, S as inject, U as markRaw, d as createBlock, k as onMounted, l as computed, n as defineStore, s as Teleport, t as createPinia, v as defineComponent, w as onActivated, x as h, y as getCurrentInstance, z as watch } from "./pinia-3_kWn-gx.js";
import { r as registerPlugin } from "./dist-DAO462gx.js";
import { t as __vitePreload } from "./preload-helper-iIio8xkS.js";
import { a as removeFocusFn, c as useTimeout, i as addFocusWaitFlag, l as createRouter, n as useDarkProps, o as removeFocusWaitFlag, p as _plugin_vue_export_helper_default, r as addFocusFn, s as useTick, t as useDark, u as createWebHashHistory } from "./use-dark-DPLXRKW0.js";
registerPlugin("App", { web: () => __vitePreload(() => import("./web-CX-bidKt.js").then((m) => new m.AppWeb()), __vite__mapDeps([0,1]), import.meta.url) });
//#endregion
//#region src-capacitor/node_modules/@capacitor/splash-screen/dist/esm/index.js
var SplashScreen = registerPlugin("SplashScreen", { web: () => __vitePreload(() => import("./web-D_3pUgEa.js").then((m) => new m.SplashScreenWeb()), __vite__mapDeps([2,1]), import.meta.url) });
//#endregion
//#region node_modules/quasar/src/vue-plugin.js
var vue_plugin_default = {
	name: "Quasar",
	version: "2.20.2",
	install: install_quasar_default,
	lang: Plugin$2,
	iconSet: Plugin$3
};
//#endregion
//#region src/App.vue?vue&type=script&setup=true&lang.ts
var App_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "App",
	setup(__props, { expose: __expose }) {
		__expose();
		const __returned__ = {};
		Object.defineProperty(__returned__, "__isScriptSetup", {
			enumerable: false,
			value: true
		});
		return __returned__;
	}
});
//#endregion
//#region src/App.vue
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
	const _component_router_view = resolveComponent("router-view");
	return openBlock(), createBlock(_component_router_view);
}
var App_default = /*#__PURE__*/ _plugin_vue_export_helper_default(App_vue_vue_type_script_setup_true_lang_default, [["render", _sfc_render], ["__file", "App.vue"]]);
//#endregion
//#region node_modules/quasar/wrappers/index.js
/*******************************************************
* Warning!
* All these are deprecated starting with
*    @quasar/app-vite v2
*    @quasar/app-webpack v4
*
* Use the new wrappers from #q-app instead
*******************************************************/
function boot(callback) {
	return callback;
}
function store(callback) {
	return callback;
}
//#endregion
//#region src/stores/index.ts
var stores_default = store(() => {
	return createPinia();
});
//#endregion
//#region src/router/routes.ts
var routes = [
	{
		path: "/login",
		component: () => __vitePreload(() => import("./LoginPage-B1mR8RIT.js"), __vite__mapDeps([3,4,5,1,6,7,8,9,10,11,12,13]), import.meta.url)
	},
	{
		path: "/",
		component: () => __vitePreload(() => import("./MainLayout-ecHZP3_e.js"), __vite__mapDeps([14,4,5,1,6,7,8,9,15,16,10,17,18,19]), import.meta.url),
		children: [
			{
				path: "",
				redirect: "/admin"
			},
			{
				path: "admin",
				component: () => __vitePreload(() => import("./AdminPage-CoiCVMzk.js"), __vite__mapDeps([20,4,5,1,6,7,8,17,18,21,22]), import.meta.url),
				meta: {
					requiresAuth: true,
					role: "admin"
				}
			},
			{
				path: "user",
				component: () => __vitePreload(() => import("./UserPage-Clls2yHi.js"), __vite__mapDeps([23,4,5,1,6,7,8,9,15,16,17,18,21,12]), import.meta.url),
				meta: {
					requiresAuth: true,
					role: "user"
				}
			},
			{
				path: "history/:id",
				component: () => __vitePreload(() => import("./HistoryPage-CqDQiyR0.js"), __vite__mapDeps([24,4,5,1,6,7,8,9,16,17,21,11]), import.meta.url),
				meta: { requiresAuth: true }
			}
		]
	},
	{
		path: "/:catchAll(.*)*",
		component: () => __vitePreload(() => import("./LoginPage-B1mR8RIT.js"), __vite__mapDeps([3,4,5,1,6,7,8,9,10,11,12,13]), import.meta.url)
	}
];
//#endregion
//#region node_modules/engine.io-parser/build/esm/commons.js
var PACKET_TYPES = Object.create(null);
PACKET_TYPES["open"] = "0";
PACKET_TYPES["close"] = "1";
PACKET_TYPES["ping"] = "2";
PACKET_TYPES["pong"] = "3";
PACKET_TYPES["message"] = "4";
PACKET_TYPES["upgrade"] = "5";
PACKET_TYPES["noop"] = "6";
var PACKET_TYPES_REVERSE = Object.create(null);
Object.keys(PACKET_TYPES).forEach((key) => {
	PACKET_TYPES_REVERSE[PACKET_TYPES[key]] = key;
});
var ERROR_PACKET = {
	type: "error",
	data: "parser error"
};
//#endregion
//#region node_modules/engine.io-parser/build/esm/encodePacket.browser.js
var withNativeBlob$1 = typeof Blob === "function" || typeof Blob !== "undefined" && Object.prototype.toString.call(Blob) === "[object BlobConstructor]";
var withNativeArrayBuffer$2 = typeof ArrayBuffer === "function";
var isView$1 = (obj) => {
	return typeof ArrayBuffer.isView === "function" ? ArrayBuffer.isView(obj) : obj && obj.buffer instanceof ArrayBuffer;
};
var encodePacket = ({ type, data }, supportsBinary, callback) => {
	if (withNativeBlob$1 && data instanceof Blob) if (supportsBinary) return callback(data);
	else return encodeBlobAsBase64(data, callback);
	else if (withNativeArrayBuffer$2 && (data instanceof ArrayBuffer || isView$1(data))) if (supportsBinary) return callback(data);
	else return encodeBlobAsBase64(new Blob([data]), callback);
	return callback(PACKET_TYPES[type] + (data || ""));
};
var encodeBlobAsBase64 = (data, callback) => {
	const fileReader = new FileReader();
	fileReader.onload = function() {
		const content = fileReader.result.split(",")[1];
		callback("b" + (content || ""));
	};
	return fileReader.readAsDataURL(data);
};
function toArray(data) {
	if (data instanceof Uint8Array) return data;
	else if (data instanceof ArrayBuffer) return new Uint8Array(data);
	else return new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
}
var TEXT_ENCODER;
function encodePacketToBinary(packet, callback) {
	if (withNativeBlob$1 && packet.data instanceof Blob) return packet.data.arrayBuffer().then(toArray).then(callback);
	else if (withNativeArrayBuffer$2 && (packet.data instanceof ArrayBuffer || isView$1(packet.data))) return callback(toArray(packet.data));
	encodePacket(packet, false, (encoded) => {
		if (!TEXT_ENCODER) TEXT_ENCODER = new TextEncoder();
		callback(TEXT_ENCODER.encode(encoded));
	});
}
//#endregion
//#region node_modules/engine.io-parser/build/esm/contrib/base64-arraybuffer.js
var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var lookup$1 = typeof Uint8Array === "undefined" ? [] : /* @__PURE__ */ new Uint8Array(256);
for (let i = 0; i < 64; i++) lookup$1[chars.charCodeAt(i)] = i;
var decode$2 = (base64) => {
	let bufferLength = base64.length * .75, len = base64.length, i, p = 0, encoded1, encoded2, encoded3, encoded4;
	if (base64[base64.length - 1] === "=") {
		bufferLength--;
		if (base64[base64.length - 2] === "=") bufferLength--;
	}
	const arraybuffer = new ArrayBuffer(bufferLength), bytes = new Uint8Array(arraybuffer);
	for (i = 0; i < len; i += 4) {
		encoded1 = lookup$1[base64.charCodeAt(i)];
		encoded2 = lookup$1[base64.charCodeAt(i + 1)];
		encoded3 = lookup$1[base64.charCodeAt(i + 2)];
		encoded4 = lookup$1[base64.charCodeAt(i + 3)];
		bytes[p++] = encoded1 << 2 | encoded2 >> 4;
		bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
		bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
	}
	return arraybuffer;
};
//#endregion
//#region node_modules/engine.io-parser/build/esm/decodePacket.browser.js
var withNativeArrayBuffer$1 = typeof ArrayBuffer === "function";
var decodePacket = (encodedPacket, binaryType) => {
	if (typeof encodedPacket !== "string") return {
		type: "message",
		data: mapBinary(encodedPacket, binaryType)
	};
	const type = encodedPacket.charAt(0);
	if (type === "b") return {
		type: "message",
		data: decodeBase64Packet(encodedPacket.substring(1), binaryType)
	};
	if (!PACKET_TYPES_REVERSE[type]) return ERROR_PACKET;
	return encodedPacket.length > 1 ? {
		type: PACKET_TYPES_REVERSE[type],
		data: encodedPacket.substring(1)
	} : { type: PACKET_TYPES_REVERSE[type] };
};
var decodeBase64Packet = (data, binaryType) => {
	if (withNativeArrayBuffer$1) return mapBinary(decode$2(data), binaryType);
	else return {
		base64: true,
		data
	};
};
var mapBinary = (data, binaryType) => {
	switch (binaryType) {
		case "blob": if (data instanceof Blob) return data;
		else return new Blob([data]);
		default: if (data instanceof ArrayBuffer) return data;
		else return data.buffer;
	}
};
//#endregion
//#region node_modules/engine.io-parser/build/esm/index.js
var SEPARATOR = String.fromCharCode(30);
var encodePayload = (packets, callback) => {
	const length = packets.length;
	const encodedPackets = new Array(length);
	let count = 0;
	packets.forEach((packet, i) => {
		encodePacket(packet, false, (encodedPacket) => {
			encodedPackets[i] = encodedPacket;
			if (++count === length) callback(encodedPackets.join(SEPARATOR));
		});
	});
};
var decodePayload = (encodedPayload, binaryType) => {
	const encodedPackets = encodedPayload.split(SEPARATOR);
	const packets = [];
	for (let i = 0; i < encodedPackets.length; i++) {
		const decodedPacket = decodePacket(encodedPackets[i], binaryType);
		packets.push(decodedPacket);
		if (decodedPacket.type === "error") break;
	}
	return packets;
};
function createPacketEncoderStream() {
	return new TransformStream({ transform(packet, controller) {
		encodePacketToBinary(packet, (encodedPacket) => {
			const payloadLength = encodedPacket.length;
			let header;
			if (payloadLength < 126) {
				header = /* @__PURE__ */ new Uint8Array(1);
				new DataView(header.buffer).setUint8(0, payloadLength);
			} else if (payloadLength < 65536) {
				header = /* @__PURE__ */ new Uint8Array(3);
				const view = new DataView(header.buffer);
				view.setUint8(0, 126);
				view.setUint16(1, payloadLength);
			} else {
				header = /* @__PURE__ */ new Uint8Array(9);
				const view = new DataView(header.buffer);
				view.setUint8(0, 127);
				view.setBigUint64(1, BigInt(payloadLength));
			}
			if (packet.data && typeof packet.data !== "string") header[0] |= 128;
			controller.enqueue(header);
			controller.enqueue(encodedPacket);
		});
	} });
}
var TEXT_DECODER;
function totalLength(chunks) {
	return chunks.reduce((acc, chunk) => acc + chunk.length, 0);
}
function concatChunks(chunks, size) {
	if (chunks[0].length === size) return chunks.shift();
	const buffer = new Uint8Array(size);
	let j = 0;
	for (let i = 0; i < size; i++) {
		buffer[i] = chunks[0][j++];
		if (j === chunks[0].length) {
			chunks.shift();
			j = 0;
		}
	}
	if (chunks.length && j < chunks[0].length) chunks[0] = chunks[0].slice(j);
	return buffer;
}
function createPacketDecoderStream(maxPayload, binaryType) {
	if (!TEXT_DECODER) TEXT_DECODER = new TextDecoder();
	const chunks = [];
	let state = 0;
	let expectedLength = -1;
	let isBinary = false;
	return new TransformStream({ transform(chunk, controller) {
		chunks.push(chunk);
		while (true) {
			if (state === 0) {
				if (totalLength(chunks) < 1) break;
				const header = concatChunks(chunks, 1);
				isBinary = (header[0] & 128) === 128;
				expectedLength = header[0] & 127;
				if (expectedLength < 126) state = 3;
				else if (expectedLength === 126) state = 1;
				else state = 2;
			} else if (state === 1) {
				if (totalLength(chunks) < 2) break;
				const headerArray = concatChunks(chunks, 2);
				expectedLength = new DataView(headerArray.buffer, headerArray.byteOffset, headerArray.length).getUint16(0);
				state = 3;
			} else if (state === 2) {
				if (totalLength(chunks) < 8) break;
				const headerArray = concatChunks(chunks, 8);
				const view = new DataView(headerArray.buffer, headerArray.byteOffset, headerArray.length);
				const n = view.getUint32(0);
				if (n > Math.pow(2, 21) - 1) {
					controller.enqueue(ERROR_PACKET);
					break;
				}
				expectedLength = n * Math.pow(2, 32) + view.getUint32(4);
				state = 3;
			} else {
				if (totalLength(chunks) < expectedLength) break;
				const data = concatChunks(chunks, expectedLength);
				controller.enqueue(decodePacket(isBinary ? data : TEXT_DECODER.decode(data), binaryType));
				state = 0;
			}
			if (expectedLength === 0 || expectedLength > maxPayload) {
				controller.enqueue(ERROR_PACKET);
				break;
			}
		}
	} });
}
//#endregion
//#region node_modules/@socket.io/component-emitter/lib/esm/index.js
/**
* Initialize a new `Emitter`.
*
* @api public
*/
function Emitter(obj) {
	if (obj) return mixin(obj);
}
/**
* Mixin the emitter properties.
*
* @param {Object} obj
* @return {Object}
* @api private
*/
function mixin(obj) {
	for (var key in Emitter.prototype) obj[key] = Emitter.prototype[key];
	return obj;
}
/**
* Listen on the given `event` with `fn`.
*
* @param {String} event
* @param {Function} fn
* @return {Emitter}
* @api public
*/
Emitter.prototype.on = Emitter.prototype.addEventListener = function(event, fn) {
	this._callbacks = this._callbacks || {};
	(this._callbacks["$" + event] = this._callbacks["$" + event] || []).push(fn);
	return this;
};
/**
* Adds an `event` listener that will be invoked a single
* time then automatically removed.
*
* @param {String} event
* @param {Function} fn
* @return {Emitter}
* @api public
*/
Emitter.prototype.once = function(event, fn) {
	function on() {
		this.off(event, on);
		fn.apply(this, arguments);
	}
	on.fn = fn;
	this.on(event, on);
	return this;
};
/**
* Remove the given callback for `event` or all
* registered callbacks.
*
* @param {String} event
* @param {Function} fn
* @return {Emitter}
* @api public
*/
Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function(event, fn) {
	this._callbacks = this._callbacks || {};
	if (0 == arguments.length) {
		this._callbacks = {};
		return this;
	}
	var callbacks = this._callbacks["$" + event];
	if (!callbacks) return this;
	if (1 == arguments.length) {
		delete this._callbacks["$" + event];
		return this;
	}
	var cb;
	for (var i = 0; i < callbacks.length; i++) {
		cb = callbacks[i];
		if (cb === fn || cb.fn === fn) {
			callbacks.splice(i, 1);
			break;
		}
	}
	if (callbacks.length === 0) delete this._callbacks["$" + event];
	return this;
};
/**
* Emit `event` with the given args.
*
* @param {String} event
* @param {Mixed} ...
* @return {Emitter}
*/
Emitter.prototype.emit = function(event) {
	this._callbacks = this._callbacks || {};
	var args = new Array(arguments.length - 1), callbacks = this._callbacks["$" + event];
	for (var i = 1; i < arguments.length; i++) args[i - 1] = arguments[i];
	if (callbacks) {
		callbacks = callbacks.slice(0);
		for (var i = 0, len = callbacks.length; i < len; ++i) callbacks[i].apply(this, args);
	}
	return this;
};
Emitter.prototype.emitReserved = Emitter.prototype.emit;
/**
* Return array of callbacks for `event`.
*
* @param {String} event
* @return {Array}
* @api public
*/
Emitter.prototype.listeners = function(event) {
	this._callbacks = this._callbacks || {};
	return this._callbacks["$" + event] || [];
};
/**
* Check if this emitter has `event` handlers.
*
* @param {String} event
* @return {Boolean}
* @api public
*/
Emitter.prototype.hasListeners = function(event) {
	return !!this.listeners(event).length;
};
//#endregion
//#region node_modules/engine.io-client/build/esm/globals.js
var nextTick = (() => {
	if (typeof Promise === "function" && typeof Promise.resolve === "function") return (cb) => Promise.resolve().then(cb);
	else return (cb, setTimeoutFn) => setTimeoutFn(cb, 0);
})();
var globalThisShim = (() => {
	if (typeof self !== "undefined") return self;
	else if (typeof window !== "undefined") return window;
	else return Function("return this")();
})();
var defaultBinaryType = "arraybuffer";
//#endregion
//#region node_modules/engine.io-client/build/esm/util.js
function pick(obj, ...attr) {
	return attr.reduce((acc, k) => {
		if (obj.hasOwnProperty(k)) acc[k] = obj[k];
		return acc;
	}, {});
}
var NATIVE_SET_TIMEOUT = globalThisShim.setTimeout;
var NATIVE_CLEAR_TIMEOUT = globalThisShim.clearTimeout;
function installTimerFunctions(obj, opts) {
	if (opts.useNativeTimers) {
		obj.setTimeoutFn = NATIVE_SET_TIMEOUT.bind(globalThisShim);
		obj.clearTimeoutFn = NATIVE_CLEAR_TIMEOUT.bind(globalThisShim);
	} else {
		obj.setTimeoutFn = globalThisShim.setTimeout.bind(globalThisShim);
		obj.clearTimeoutFn = globalThisShim.clearTimeout.bind(globalThisShim);
	}
}
var BASE64_OVERHEAD = 1.33;
function byteLength(obj) {
	if (typeof obj === "string") return utf8Length(obj);
	return Math.ceil((obj.byteLength || obj.size) * BASE64_OVERHEAD);
}
function utf8Length(str) {
	let c = 0, length = 0;
	for (let i = 0, l = str.length; i < l; i++) {
		c = str.charCodeAt(i);
		if (c < 128) length += 1;
		else if (c < 2048) length += 2;
		else if (c < 55296 || c >= 57344) length += 3;
		else {
			i++;
			length += 4;
		}
	}
	return length;
}
/**
* Generates a random 8-characters string.
*/
function randomString() {
	return Date.now().toString(36).substring(3) + Math.random().toString(36).substring(2, 5);
}
//#endregion
//#region node_modules/engine.io-client/build/esm/contrib/parseqs.js
/**
* Compiles a querystring
* Returns string representation of the object
*
* @param {Object}
* @api private
*/
function encode$1(obj) {
	let str = "";
	for (let i in obj) if (obj.hasOwnProperty(i)) {
		if (str.length) str += "&";
		str += encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]);
	}
	return str;
}
/**
* Parses a simple querystring into an object
*
* @param {String} qs
* @api private
*/
function decode$1(qs) {
	let qry = {};
	let pairs = qs.split("&");
	for (let i = 0, l = pairs.length; i < l; i++) {
		let pair = pairs[i].split("=");
		qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
	}
	return qry;
}
//#endregion
//#region node_modules/engine.io-client/build/esm/transport.js
var TransportError = class extends Error {
	constructor(reason, description, context) {
		super(reason);
		this.description = description;
		this.context = context;
		this.type = "TransportError";
	}
};
var Transport = class extends Emitter {
	/**
	* Transport abstract constructor.
	*
	* @param {Object} opts - options
	* @protected
	*/
	constructor(opts) {
		super();
		this.writable = false;
		installTimerFunctions(this, opts);
		this.opts = opts;
		this.query = opts.query;
		this.socket = opts.socket;
		this.supportsBinary = !opts.forceBase64;
	}
	/**
	* Emits an error.
	*
	* @param {String} reason
	* @param description
	* @param context - the error context
	* @return {Transport} for chaining
	* @protected
	*/
	onError(reason, description, context) {
		super.emitReserved("error", new TransportError(reason, description, context));
		return this;
	}
	/**
	* Opens the transport.
	*/
	open() {
		this.readyState = "opening";
		this.doOpen();
		return this;
	}
	/**
	* Closes the transport.
	*/
	close() {
		if (this.readyState === "opening" || this.readyState === "open") {
			this.doClose();
			this.onClose();
		}
		return this;
	}
	/**
	* Sends multiple packets.
	*
	* @param {Array} packets
	*/
	send(packets) {
		if (this.readyState === "open") this.write(packets);
	}
	/**
	* Called upon open
	*
	* @protected
	*/
	onOpen() {
		this.readyState = "open";
		this.writable = true;
		super.emitReserved("open");
	}
	/**
	* Called with data.
	*
	* @param {String} data
	* @protected
	*/
	onData(data) {
		const packet = decodePacket(data, this.socket.binaryType);
		this.onPacket(packet);
	}
	/**
	* Called with a decoded packet.
	*
	* @protected
	*/
	onPacket(packet) {
		super.emitReserved("packet", packet);
	}
	/**
	* Called upon close.
	*
	* @protected
	*/
	onClose(details) {
		this.readyState = "closed";
		super.emitReserved("close", details);
	}
	/**
	* Pauses the transport, in order not to lose packets during an upgrade.
	*
	* @param onPause
	*/
	pause(onPause) {}
	createUri(schema, query = {}) {
		return schema + "://" + this._hostname() + this._port() + this.opts.path + this._query(query);
	}
	_hostname() {
		const hostname = this.opts.hostname;
		return hostname.indexOf(":") === -1 ? hostname : "[" + hostname + "]";
	}
	_port() {
		if (this.opts.port && (this.opts.secure && Number(this.opts.port) !== 443 || !this.opts.secure && Number(this.opts.port) !== 80)) return ":" + this.opts.port;
		else return "";
	}
	_query(query) {
		const encodedQuery = encode$1(query);
		return encodedQuery.length ? "?" + encodedQuery : "";
	}
};
//#endregion
//#region node_modules/engine.io-client/build/esm/transports/polling.js
var Polling = class extends Transport {
	constructor() {
		super(...arguments);
		this._polling = false;
	}
	get name() {
		return "polling";
	}
	/**
	* Opens the socket (triggers polling). We write a PING message to determine
	* when the transport is open.
	*
	* @protected
	*/
	doOpen() {
		this._poll();
	}
	/**
	* Pauses polling.
	*
	* @param {Function} onPause - callback upon buffers are flushed and transport is paused
	* @package
	*/
	pause(onPause) {
		this.readyState = "pausing";
		const pause = () => {
			this.readyState = "paused";
			onPause();
		};
		if (this._polling || !this.writable) {
			let total = 0;
			if (this._polling) {
				total++;
				this.once("pollComplete", function() {
					--total || pause();
				});
			}
			if (!this.writable) {
				total++;
				this.once("drain", function() {
					--total || pause();
				});
			}
		} else pause();
	}
	/**
	* Starts polling cycle.
	*
	* @private
	*/
	_poll() {
		this._polling = true;
		this.doPoll();
		this.emitReserved("poll");
	}
	/**
	* Overloads onData to detect payloads.
	*
	* @protected
	*/
	onData(data) {
		const callback = (packet) => {
			if ("opening" === this.readyState && packet.type === "open") this.onOpen();
			if ("close" === packet.type) {
				this.onClose({ description: "transport closed by the server" });
				return false;
			}
			this.onPacket(packet);
		};
		decodePayload(data, this.socket.binaryType).forEach(callback);
		if ("closed" !== this.readyState) {
			this._polling = false;
			this.emitReserved("pollComplete");
			if ("open" === this.readyState) this._poll();
		}
	}
	/**
	* For polling, send a close packet.
	*
	* @protected
	*/
	doClose() {
		const close = () => {
			this.write([{ type: "close" }]);
		};
		if ("open" === this.readyState) close();
		else this.once("open", close);
	}
	/**
	* Writes a packets payload.
	*
	* @param {Array} packets - data packets
	* @protected
	*/
	write(packets) {
		this.writable = false;
		encodePayload(packets, (data) => {
			this.doWrite(data, () => {
				this.writable = true;
				this.emitReserved("drain");
			});
		});
	}
	/**
	* Generates uri for connection.
	*
	* @private
	*/
	uri() {
		const schema = this.opts.secure ? "https" : "http";
		const query = this.query || {};
		if (false !== this.opts.timestampRequests) query[this.opts.timestampParam] = randomString();
		if (!this.supportsBinary && !query.sid) query.b64 = 1;
		return this.createUri(schema, query);
	}
};
//#endregion
//#region node_modules/engine.io-client/build/esm/contrib/has-cors.js
var value = false;
try {
	value = typeof XMLHttpRequest !== "undefined" && "withCredentials" in new XMLHttpRequest();
} catch (err) {}
var hasCORS = value;
//#endregion
//#region node_modules/engine.io-client/build/esm/transports/polling-xhr.js
function empty() {}
var BaseXHR = class extends Polling {
	/**
	* XHR Polling constructor.
	*
	* @param {Object} opts
	* @package
	*/
	constructor(opts) {
		super(opts);
		if (typeof location !== "undefined") {
			const isSSL = "https:" === location.protocol;
			let port = location.port;
			if (!port) port = isSSL ? "443" : "80";
			this.xd = typeof location !== "undefined" && opts.hostname !== location.hostname || port !== opts.port;
		}
	}
	/**
	* Sends data.
	*
	* @param {String} data - data to send.
	* @param {Function} fn - called upon flush.
	* @private
	*/
	doWrite(data, fn) {
		const req = this.request({
			method: "POST",
			data
		});
		req.on("success", fn);
		req.on("error", (xhrStatus, context) => {
			this.onError("xhr post error", xhrStatus, context);
		});
	}
	/**
	* Starts a poll cycle.
	*
	* @private
	*/
	doPoll() {
		const req = this.request();
		req.on("data", this.onData.bind(this));
		req.on("error", (xhrStatus, context) => {
			this.onError("xhr poll error", xhrStatus, context);
		});
		this.pollXhr = req;
	}
};
var Request = class Request extends Emitter {
	/**
	* Request constructor
	*
	* @param {Object} options
	* @package
	*/
	constructor(createRequest, uri, opts) {
		super();
		this.createRequest = createRequest;
		installTimerFunctions(this, opts);
		this._opts = opts;
		this._method = opts.method || "GET";
		this._uri = uri;
		this._data = void 0 !== opts.data ? opts.data : null;
		this._create();
	}
	/**
	* Creates the XHR object and sends the request.
	*
	* @private
	*/
	_create() {
		var _a;
		const opts = pick(this._opts, "agent", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "autoUnref");
		opts.xdomain = !!this._opts.xd;
		const xhr = this._xhr = this.createRequest(opts);
		try {
			xhr.open(this._method, this._uri, true);
			try {
				if (this._opts.extraHeaders) {
					xhr.setDisableHeaderCheck && xhr.setDisableHeaderCheck(true);
					for (let i in this._opts.extraHeaders) if (this._opts.extraHeaders.hasOwnProperty(i)) xhr.setRequestHeader(i, this._opts.extraHeaders[i]);
				}
			} catch (e) {}
			if ("POST" === this._method) try {
				xhr.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
			} catch (e) {}
			try {
				xhr.setRequestHeader("Accept", "*/*");
			} catch (e) {}
			(_a = this._opts.cookieJar) === null || _a === void 0 || _a.addCookies(xhr);
			if ("withCredentials" in xhr) xhr.withCredentials = this._opts.withCredentials;
			if (this._opts.requestTimeout) xhr.timeout = this._opts.requestTimeout;
			xhr.onreadystatechange = () => {
				var _a;
				if (xhr.readyState === 3) (_a = this._opts.cookieJar) === null || _a === void 0 || _a.parseCookies(xhr.getResponseHeader("set-cookie"));
				if (4 !== xhr.readyState) return;
				if (200 === xhr.status || 1223 === xhr.status) this._onLoad();
				else this.setTimeoutFn(() => {
					this._onError(typeof xhr.status === "number" ? xhr.status : 0);
				}, 0);
			};
			xhr.send(this._data);
		} catch (e) {
			this.setTimeoutFn(() => {
				this._onError(e);
			}, 0);
			return;
		}
		if (typeof document !== "undefined") {
			this._index = Request.requestsCount++;
			Request.requests[this._index] = this;
		}
	}
	/**
	* Called upon error.
	*
	* @private
	*/
	_onError(err) {
		this.emitReserved("error", err, this._xhr);
		this._cleanup(true);
	}
	/**
	* Cleans up house.
	*
	* @private
	*/
	_cleanup(fromError) {
		if ("undefined" === typeof this._xhr || null === this._xhr) return;
		this._xhr.onreadystatechange = empty;
		if (fromError) try {
			this._xhr.abort();
		} catch (e) {}
		if (typeof document !== "undefined") delete Request.requests[this._index];
		this._xhr = null;
	}
	/**
	* Called upon load.
	*
	* @private
	*/
	_onLoad() {
		const data = this._xhr.responseText;
		if (data !== null) {
			this.emitReserved("data", data);
			this.emitReserved("success");
			this._cleanup();
		}
	}
	/**
	* Aborts the request.
	*
	* @package
	*/
	abort() {
		this._cleanup();
	}
};
Request.requestsCount = 0;
Request.requests = {};
/**
* Aborts pending requests when unloading the window. This is needed to prevent
* memory leaks (e.g. when using IE) and to ensure that no spurious error is
* emitted.
*/
if (typeof document !== "undefined") {
	if (typeof attachEvent === "function") attachEvent("onunload", unloadHandler);
	else if (typeof addEventListener === "function") {
		const terminationEvent = "onpagehide" in globalThisShim ? "pagehide" : "unload";
		addEventListener(terminationEvent, unloadHandler, false);
	}
}
function unloadHandler() {
	for (let i in Request.requests) if (Request.requests.hasOwnProperty(i)) Request.requests[i].abort();
}
var hasXHR2 = (function() {
	const xhr = newRequest({ xdomain: false });
	return xhr && xhr.responseType !== null;
})();
/**
* HTTP long-polling based on the built-in `XMLHttpRequest` object.
*
* Usage: browser
*
* @see https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
*/
var XHR = class extends BaseXHR {
	constructor(opts) {
		super(opts);
		const forceBase64 = opts && opts.forceBase64;
		this.supportsBinary = hasXHR2 && !forceBase64;
	}
	request(opts = {}) {
		Object.assign(opts, { xd: this.xd }, this.opts);
		return new Request(newRequest, this.uri(), opts);
	}
};
function newRequest(opts) {
	const xdomain = opts.xdomain;
	try {
		if ("undefined" !== typeof XMLHttpRequest && (!xdomain || hasCORS)) return new XMLHttpRequest();
	} catch (e) {}
	if (!xdomain) try {
		return new globalThisShim[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP");
	} catch (e) {}
}
//#endregion
//#region node_modules/engine.io-client/build/esm/transports/websocket.js
var isReactNative = typeof navigator !== "undefined" && typeof navigator.product === "string" && navigator.product.toLowerCase() === "reactnative";
var BaseWS = class extends Transport {
	get name() {
		return "websocket";
	}
	doOpen() {
		const uri = this.uri();
		const protocols = this.opts.protocols;
		const opts = isReactNative ? {} : pick(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress", "protocolVersion", "origin", "maxPayload", "family", "checkServerIdentity");
		if (this.opts.extraHeaders) opts.headers = this.opts.extraHeaders;
		try {
			this.ws = this.createSocket(uri, protocols, opts);
		} catch (err) {
			return this.emitReserved("error", err);
		}
		this.ws.binaryType = this.socket.binaryType;
		this.addEventListeners();
	}
	/**
	* Adds event listeners to the socket
	*
	* @private
	*/
	addEventListeners() {
		this.ws.onopen = () => {
			if (this.opts.autoUnref) this.ws._socket.unref();
			this.onOpen();
		};
		this.ws.onclose = (closeEvent) => this.onClose({
			description: "websocket connection closed",
			context: closeEvent
		});
		this.ws.onmessage = (ev) => this.onData(ev.data);
		this.ws.onerror = (e) => this.onError("websocket error", e);
	}
	write(packets) {
		this.writable = false;
		for (let i = 0; i < packets.length; i++) {
			const packet = packets[i];
			const lastPacket = i === packets.length - 1;
			encodePacket(packet, this.supportsBinary, (data) => {
				try {
					this.doWrite(packet, data);
				} catch (e) {}
				if (lastPacket) nextTick(() => {
					this.writable = true;
					this.emitReserved("drain");
				}, this.setTimeoutFn);
			});
		}
	}
	doClose() {
		if (typeof this.ws !== "undefined") {
			this.ws.onerror = () => {};
			this.ws.close();
			this.ws = null;
		}
	}
	/**
	* Generates uri for connection.
	*
	* @private
	*/
	uri() {
		const schema = this.opts.secure ? "wss" : "ws";
		const query = this.query || {};
		if (this.opts.timestampRequests) query[this.opts.timestampParam] = randomString();
		if (!this.supportsBinary) query.b64 = 1;
		return this.createUri(schema, query);
	}
};
var WebSocketCtor = globalThisShim.WebSocket || globalThisShim.MozWebSocket;
/**
* WebSocket transport based on the built-in `WebSocket` object.
*
* Usage: browser, Node.js (since v21), Deno, Bun
*
* @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
* @see https://caniuse.com/mdn-api_websocket
* @see https://nodejs.org/api/globals.html#websocket
*/
var WS = class extends BaseWS {
	createSocket(uri, protocols, opts) {
		return !isReactNative ? protocols ? new WebSocketCtor(uri, protocols) : new WebSocketCtor(uri) : new WebSocketCtor(uri, protocols, opts);
	}
	doWrite(_packet, data) {
		this.ws.send(data);
	}
};
//#endregion
//#region node_modules/engine.io-client/build/esm/transports/webtransport.js
/**
* WebTransport transport based on the built-in `WebTransport` object.
*
* Usage: browser, Node.js (with the `@fails-components/webtransport` package)
*
* @see https://developer.mozilla.org/en-US/docs/Web/API/WebTransport
* @see https://caniuse.com/webtransport
*/
var WT = class extends Transport {
	get name() {
		return "webtransport";
	}
	doOpen() {
		try {
			this._transport = new WebTransport(this.createUri("https"), this.opts.transportOptions[this.name]);
		} catch (err) {
			return this.emitReserved("error", err);
		}
		this._transport.closed.then(() => {
			this.onClose();
		}).catch((err) => {
			this.onError("webtransport error", err);
		});
		this._transport.ready.then(() => {
			this._transport.createBidirectionalStream().then((stream) => {
				const decoderStream = createPacketDecoderStream(Number.MAX_SAFE_INTEGER, this.socket.binaryType);
				const reader = stream.readable.pipeThrough(decoderStream).getReader();
				const encoderStream = createPacketEncoderStream();
				encoderStream.readable.pipeTo(stream.writable);
				this._writer = encoderStream.writable.getWriter();
				const read = () => {
					reader.read().then(({ done, value }) => {
						if (done) return;
						this.onPacket(value);
						read();
					}).catch((err) => {});
				};
				read();
				const packet = { type: "open" };
				if (this.query.sid) packet.data = `{"sid":"${this.query.sid}"}`;
				this._writer.write(packet).then(() => this.onOpen());
			});
		});
	}
	write(packets) {
		this.writable = false;
		for (let i = 0; i < packets.length; i++) {
			const packet = packets[i];
			const lastPacket = i === packets.length - 1;
			this._writer.write(packet).then(() => {
				if (lastPacket) nextTick(() => {
					this.writable = true;
					this.emitReserved("drain");
				}, this.setTimeoutFn);
			});
		}
	}
	doClose() {
		var _a;
		(_a = this._transport) === null || _a === void 0 || _a.close();
	}
};
//#endregion
//#region node_modules/engine.io-client/build/esm/transports/index.js
var transports = {
	websocket: WS,
	webtransport: WT,
	polling: XHR
};
//#endregion
//#region node_modules/engine.io-client/build/esm/contrib/parseuri.js
/**
* Parses a URI
*
* Note: we could also have used the built-in URL object, but it isn't supported on all platforms.
*
* See:
* - https://developer.mozilla.org/en-US/docs/Web/API/URL
* - https://caniuse.com/url
* - https://www.rfc-editor.org/rfc/rfc3986#appendix-B
*
* History of the parse() method:
* - first commit: https://github.com/socketio/socket.io-client/commit/4ee1d5d94b3906a9c052b459f1a818b15f38f91c
* - export into its own module: https://github.com/socketio/engine.io-client/commit/de2c561e4564efeb78f1bdb1ba39ef81b2822cb3
* - reimport: https://github.com/socketio/engine.io-client/commit/df32277c3f6d622eec5ed09f493cae3f3391d242
*
* @author Steven Levithan <stevenlevithan.com> (MIT license)
* @api private
*/
var re = /^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
var parts = [
	"source",
	"protocol",
	"authority",
	"userInfo",
	"user",
	"password",
	"host",
	"port",
	"relative",
	"path",
	"directory",
	"file",
	"query",
	"anchor"
];
function parse(str) {
	if (str.length > 8e3) throw "URI too long";
	const src = str, b = str.indexOf("["), e = str.indexOf("]");
	if (b != -1 && e != -1) str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ";") + str.substring(e, str.length);
	let m = re.exec(str || ""), uri = {}, i = 14;
	while (i--) uri[parts[i]] = m[i] || "";
	if (b != -1 && e != -1) {
		uri.source = src;
		uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ":");
		uri.authority = uri.authority.replace("[", "").replace("]", "").replace(/;/g, ":");
		uri.ipv6uri = true;
	}
	uri.pathNames = pathNames(uri, uri["path"]);
	uri.queryKey = queryKey(uri, uri["query"]);
	return uri;
}
function pathNames(obj, path) {
	const names = path.replace(/\/{2,9}/g, "/").split("/");
	if (path.slice(0, 1) == "/" || path.length === 0) names.splice(0, 1);
	if (path.slice(-1) == "/") names.splice(names.length - 1, 1);
	return names;
}
function queryKey(uri, query) {
	const data = {};
	query.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function($0, $1, $2) {
		if ($1) data[$1] = $2;
	});
	return data;
}
//#endregion
//#region node_modules/engine.io-client/build/esm/socket.js
var withEventListeners = typeof addEventListener === "function" && typeof removeEventListener === "function";
var OFFLINE_EVENT_LISTENERS = [];
if (withEventListeners) addEventListener("offline", () => {
	OFFLINE_EVENT_LISTENERS.forEach((listener) => listener());
}, false);
/**
* This class provides a WebSocket-like interface to connect to an Engine.IO server. The connection will be established
* with one of the available low-level transports, like HTTP long-polling, WebSocket or WebTransport.
*
* This class comes without upgrade mechanism, which means that it will keep the first low-level transport that
* successfully establishes the connection.
*
* In order to allow tree-shaking, there are no transports included, that's why the `transports` option is mandatory.
*
* @example
* import { SocketWithoutUpgrade, WebSocket } from "engine.io-client";
*
* const socket = new SocketWithoutUpgrade({
*   transports: [WebSocket]
* });
*
* socket.on("open", () => {
*   socket.send("hello");
* });
*
* @see SocketWithUpgrade
* @see Socket
*/
var SocketWithoutUpgrade = class SocketWithoutUpgrade extends Emitter {
	/**
	* Socket constructor.
	*
	* @param {String|Object} uri - uri or options
	* @param {Object} opts - options
	*/
	constructor(uri, opts) {
		super();
		this.binaryType = defaultBinaryType;
		this.writeBuffer = [];
		this._prevBufferLen = 0;
		this._pingInterval = -1;
		this._pingTimeout = -1;
		this._maxPayload = -1;
		/**
		* The expiration timestamp of the {@link _pingTimeoutTimer} object is tracked, in case the timer is throttled and the
		* callback is not fired on time. This can happen for example when a laptop is suspended or when a phone is locked.
		*/
		this._pingTimeoutTime = Infinity;
		if (uri && "object" === typeof uri) {
			opts = uri;
			uri = null;
		}
		if (uri) {
			const parsedUri = parse(uri);
			opts.hostname = parsedUri.host;
			opts.secure = parsedUri.protocol === "https" || parsedUri.protocol === "wss";
			opts.port = parsedUri.port;
			if (parsedUri.query) opts.query = parsedUri.query;
		} else if (opts.host) opts.hostname = parse(opts.host).host;
		installTimerFunctions(this, opts);
		this.secure = null != opts.secure ? opts.secure : typeof location !== "undefined" && "https:" === location.protocol;
		if (opts.hostname && !opts.port) opts.port = this.secure ? "443" : "80";
		this.hostname = opts.hostname || (typeof location !== "undefined" ? location.hostname : "localhost");
		this.port = opts.port || (typeof location !== "undefined" && location.port ? location.port : this.secure ? "443" : "80");
		this.transports = [];
		this._transportsByName = {};
		opts.transports.forEach((t) => {
			const transportName = t.prototype.name;
			this.transports.push(transportName);
			this._transportsByName[transportName] = t;
		});
		this.opts = Object.assign({
			path: "/engine.io",
			agent: false,
			withCredentials: false,
			upgrade: true,
			timestampParam: "t",
			rememberUpgrade: false,
			addTrailingSlash: true,
			rejectUnauthorized: true,
			perMessageDeflate: { threshold: 1024 },
			transportOptions: {},
			closeOnBeforeunload: false
		}, opts);
		this.opts.path = this.opts.path.replace(/\/$/, "") + (this.opts.addTrailingSlash ? "/" : "");
		if (typeof this.opts.query === "string") this.opts.query = decode$1(this.opts.query);
		if (withEventListeners) {
			if (this.opts.closeOnBeforeunload) {
				this._beforeunloadEventListener = () => {
					if (this.transport) {
						this.transport.removeAllListeners();
						this.transport.close();
					}
				};
				addEventListener("beforeunload", this._beforeunloadEventListener, false);
			}
			if (this.hostname !== "localhost") {
				this._offlineEventListener = () => {
					this._onClose("transport close", { description: "network connection lost" });
				};
				OFFLINE_EVENT_LISTENERS.push(this._offlineEventListener);
			}
		}
		if (this.opts.withCredentials) this._cookieJar = void 0;
		this._open();
	}
	/**
	* Creates transport of the given type.
	*
	* @param {String} name - transport name
	* @return {Transport}
	* @private
	*/
	createTransport(name) {
		const query = Object.assign({}, this.opts.query);
		query.EIO = 4;
		query.transport = name;
		if (this.id) query.sid = this.id;
		const opts = Object.assign({}, this.opts, {
			query,
			socket: this,
			hostname: this.hostname,
			secure: this.secure,
			port: this.port
		}, this.opts.transportOptions[name]);
		return new this._transportsByName[name](opts);
	}
	/**
	* Initializes transport to use and starts probe.
	*
	* @private
	*/
	_open() {
		if (this.transports.length === 0) {
			this.setTimeoutFn(() => {
				this.emitReserved("error", "No transports available");
			}, 0);
			return;
		}
		const transportName = this.opts.rememberUpgrade && SocketWithoutUpgrade.priorWebsocketSuccess && this.transports.indexOf("websocket") !== -1 ? "websocket" : this.transports[0];
		this.readyState = "opening";
		const transport = this.createTransport(transportName);
		transport.open();
		this.setTransport(transport);
	}
	/**
	* Sets the current transport. Disables the existing one (if any).
	*
	* @private
	*/
	setTransport(transport) {
		if (this.transport) this.transport.removeAllListeners();
		this.transport = transport;
		transport.on("drain", this._onDrain.bind(this)).on("packet", this._onPacket.bind(this)).on("error", this._onError.bind(this)).on("close", (reason) => this._onClose("transport close", reason));
	}
	/**
	* Called when connection is deemed open.
	*
	* @private
	*/
	onOpen() {
		this.readyState = "open";
		SocketWithoutUpgrade.priorWebsocketSuccess = "websocket" === this.transport.name;
		this.emitReserved("open");
		this.flush();
	}
	/**
	* Handles a packet.
	*
	* @private
	*/
	_onPacket(packet) {
		if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
			this.emitReserved("packet", packet);
			this.emitReserved("heartbeat");
			switch (packet.type) {
				case "open":
					this.onHandshake(JSON.parse(packet.data));
					break;
				case "ping":
					this._sendPacket("pong");
					this.emitReserved("ping");
					this.emitReserved("pong");
					this._resetPingTimeout();
					break;
				case "error":
					const err = /* @__PURE__ */ new Error("server error");
					err.code = packet.data;
					this._onError(err);
					break;
				case "message":
					this.emitReserved("data", packet.data);
					this.emitReserved("message", packet.data);
					break;
			}
		}
	}
	/**
	* Called upon handshake completion.
	*
	* @param {Object} data - handshake obj
	* @private
	*/
	onHandshake(data) {
		this.emitReserved("handshake", data);
		this.id = data.sid;
		this.transport.query.sid = data.sid;
		this._pingInterval = data.pingInterval;
		this._pingTimeout = data.pingTimeout;
		this._maxPayload = data.maxPayload;
		this.onOpen();
		if ("closed" === this.readyState) return;
		this._resetPingTimeout();
	}
	/**
	* Sets and resets ping timeout timer based on server pings.
	*
	* @private
	*/
	_resetPingTimeout() {
		this.clearTimeoutFn(this._pingTimeoutTimer);
		const delay = this._pingInterval + this._pingTimeout;
		this._pingTimeoutTime = Date.now() + delay;
		this._pingTimeoutTimer = this.setTimeoutFn(() => {
			this._onClose("ping timeout");
		}, delay);
		if (this.opts.autoUnref) this._pingTimeoutTimer.unref();
	}
	/**
	* Called on `drain` event
	*
	* @private
	*/
	_onDrain() {
		this.writeBuffer.splice(0, this._prevBufferLen);
		this._prevBufferLen = 0;
		if (0 === this.writeBuffer.length) this.emitReserved("drain");
		else this.flush();
	}
	/**
	* Flush write buffers.
	*
	* @private
	*/
	flush() {
		if ("closed" !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length) {
			const packets = this._getWritablePackets();
			this.transport.send(packets);
			this._prevBufferLen = packets.length;
			this.emitReserved("flush");
		}
	}
	/**
	* Ensure the encoded size of the writeBuffer is below the maxPayload value sent by the server (only for HTTP
	* long-polling)
	*
	* @private
	*/
	_getWritablePackets() {
		if (!(this._maxPayload && this.transport.name === "polling" && this.writeBuffer.length > 1)) return this.writeBuffer;
		let payloadSize = 1;
		for (let i = 0; i < this.writeBuffer.length; i++) {
			const data = this.writeBuffer[i].data;
			if (data) payloadSize += byteLength(data);
			if (i > 0 && payloadSize > this._maxPayload) return this.writeBuffer.slice(0, i);
			payloadSize += 2;
		}
		return this.writeBuffer;
	}
	/**
	* Checks whether the heartbeat timer has expired but the socket has not yet been notified.
	*
	* Note: this method is private for now because it does not really fit the WebSocket API, but if we put it in the
	* `write()` method then the message would not be buffered by the Socket.IO client.
	*
	* @return {boolean}
	* @private
	*/
	_hasPingExpired() {
		if (!this._pingTimeoutTime) return true;
		const hasExpired = Date.now() > this._pingTimeoutTime;
		if (hasExpired) {
			this._pingTimeoutTime = 0;
			nextTick(() => {
				this._onClose("ping timeout");
			}, this.setTimeoutFn);
		}
		return hasExpired;
	}
	/**
	* Sends a message.
	*
	* @param {String} msg - message.
	* @param {Object} options.
	* @param {Function} fn - callback function.
	* @return {Socket} for chaining.
	*/
	write(msg, options, fn) {
		this._sendPacket("message", msg, options, fn);
		return this;
	}
	/**
	* Sends a message. Alias of {@link Socket#write}.
	*
	* @param {String} msg - message.
	* @param {Object} options.
	* @param {Function} fn - callback function.
	* @return {Socket} for chaining.
	*/
	send(msg, options, fn) {
		this._sendPacket("message", msg, options, fn);
		return this;
	}
	/**
	* Sends a packet.
	*
	* @param {String} type - packet type.
	* @param {String} data.
	* @param {Object} options.
	* @param {Function} fn - callback function.
	* @private
	*/
	_sendPacket(type, data, options, fn) {
		if ("function" === typeof data) {
			fn = data;
			data = void 0;
		}
		if ("function" === typeof options) {
			fn = options;
			options = null;
		}
		if ("closing" === this.readyState || "closed" === this.readyState) return;
		options = options || {};
		options.compress = false !== options.compress;
		const packet = {
			type,
			data,
			options
		};
		this.emitReserved("packetCreate", packet);
		this.writeBuffer.push(packet);
		if (fn) this.once("flush", fn);
		this.flush();
	}
	/**
	* Closes the connection.
	*/
	close() {
		const close = () => {
			this._onClose("forced close");
			this.transport.close();
		};
		const cleanupAndClose = () => {
			this.off("upgrade", cleanupAndClose);
			this.off("upgradeError", cleanupAndClose);
			close();
		};
		const waitForUpgrade = () => {
			this.once("upgrade", cleanupAndClose);
			this.once("upgradeError", cleanupAndClose);
		};
		if ("opening" === this.readyState || "open" === this.readyState) {
			this.readyState = "closing";
			if (this.writeBuffer.length) this.once("drain", () => {
				if (this.upgrading) waitForUpgrade();
				else close();
			});
			else if (this.upgrading) waitForUpgrade();
			else close();
		}
		return this;
	}
	/**
	* Called upon transport error
	*
	* @private
	*/
	_onError(err) {
		SocketWithoutUpgrade.priorWebsocketSuccess = false;
		if (this.opts.tryAllTransports && this.transports.length > 1 && this.readyState === "opening") {
			this.transports.shift();
			return this._open();
		}
		this.emitReserved("error", err);
		this._onClose("transport error", err);
	}
	/**
	* Called upon transport close.
	*
	* @private
	*/
	_onClose(reason, description) {
		if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
			this.clearTimeoutFn(this._pingTimeoutTimer);
			this.transport.removeAllListeners("close");
			this.transport.close();
			this.transport.removeAllListeners();
			if (withEventListeners) {
				if (this._beforeunloadEventListener) removeEventListener("beforeunload", this._beforeunloadEventListener, false);
				if (this._offlineEventListener) {
					const i = OFFLINE_EVENT_LISTENERS.indexOf(this._offlineEventListener);
					if (i !== -1) OFFLINE_EVENT_LISTENERS.splice(i, 1);
				}
			}
			this.readyState = "closed";
			this.id = null;
			this.emitReserved("close", reason, description);
			this.writeBuffer = [];
			this._prevBufferLen = 0;
		}
	}
};
SocketWithoutUpgrade.protocol = 4;
/**
* This class provides a WebSocket-like interface to connect to an Engine.IO server. The connection will be established
* with one of the available low-level transports, like HTTP long-polling, WebSocket or WebTransport.
*
* This class comes with an upgrade mechanism, which means that once the connection is established with the first
* low-level transport, it will try to upgrade to a better transport.
*
* In order to allow tree-shaking, there are no transports included, that's why the `transports` option is mandatory.
*
* @example
* import { SocketWithUpgrade, WebSocket } from "engine.io-client";
*
* const socket = new SocketWithUpgrade({
*   transports: [WebSocket]
* });
*
* socket.on("open", () => {
*   socket.send("hello");
* });
*
* @see SocketWithoutUpgrade
* @see Socket
*/
var SocketWithUpgrade = class extends SocketWithoutUpgrade {
	constructor() {
		super(...arguments);
		this._upgrades = [];
	}
	onOpen() {
		super.onOpen();
		if ("open" === this.readyState && this.opts.upgrade) for (let i = 0; i < this._upgrades.length; i++) this._probe(this._upgrades[i]);
	}
	/**
	* Probes a transport.
	*
	* @param {String} name - transport name
	* @private
	*/
	_probe(name) {
		let transport = this.createTransport(name);
		let failed = false;
		SocketWithoutUpgrade.priorWebsocketSuccess = false;
		const onTransportOpen = () => {
			if (failed) return;
			transport.send([{
				type: "ping",
				data: "probe"
			}]);
			transport.once("packet", (msg) => {
				if (failed) return;
				if ("pong" === msg.type && "probe" === msg.data) {
					this.upgrading = true;
					this.emitReserved("upgrading", transport);
					if (!transport) return;
					SocketWithoutUpgrade.priorWebsocketSuccess = "websocket" === transport.name;
					this.transport.pause(() => {
						if (failed) return;
						if ("closed" === this.readyState) return;
						cleanup();
						this.setTransport(transport);
						transport.send([{ type: "upgrade" }]);
						this.emitReserved("upgrade", transport);
						transport = null;
						this.upgrading = false;
						this.flush();
					});
				} else {
					const err = /* @__PURE__ */ new Error("probe error");
					err.transport = transport.name;
					this.emitReserved("upgradeError", err);
				}
			});
		};
		function freezeTransport() {
			if (failed) return;
			failed = true;
			cleanup();
			transport.close();
			transport = null;
		}
		const onerror = (err) => {
			const error = /* @__PURE__ */ new Error("probe error: " + err);
			error.transport = transport.name;
			freezeTransport();
			this.emitReserved("upgradeError", error);
		};
		function onTransportClose() {
			onerror("transport closed");
		}
		function onclose() {
			onerror("socket closed");
		}
		function onupgrade(to) {
			if (transport && to.name !== transport.name) freezeTransport();
		}
		const cleanup = () => {
			transport.removeListener("open", onTransportOpen);
			transport.removeListener("error", onerror);
			transport.removeListener("close", onTransportClose);
			this.off("close", onclose);
			this.off("upgrading", onupgrade);
		};
		transport.once("open", onTransportOpen);
		transport.once("error", onerror);
		transport.once("close", onTransportClose);
		this.once("close", onclose);
		this.once("upgrading", onupgrade);
		if (this._upgrades.indexOf("webtransport") !== -1 && name !== "webtransport") this.setTimeoutFn(() => {
			if (!failed) transport.open();
		}, 200);
		else transport.open();
	}
	onHandshake(data) {
		this._upgrades = this._filterUpgrades(data.upgrades);
		super.onHandshake(data);
	}
	/**
	* Filters upgrades, returning only those matching client transports.
	*
	* @param {Array} upgrades - server upgrades
	* @private
	*/
	_filterUpgrades(upgrades) {
		const filteredUpgrades = [];
		for (let i = 0; i < upgrades.length; i++) if (~this.transports.indexOf(upgrades[i])) filteredUpgrades.push(upgrades[i]);
		return filteredUpgrades;
	}
};
/**
* This class provides a WebSocket-like interface to connect to an Engine.IO server. The connection will be established
* with one of the available low-level transports, like HTTP long-polling, WebSocket or WebTransport.
*
* This class comes with an upgrade mechanism, which means that once the connection is established with the first
* low-level transport, it will try to upgrade to a better transport.
*
* @example
* import { Socket } from "engine.io-client";
*
* const socket = new Socket();
*
* socket.on("open", () => {
*   socket.send("hello");
* });
*
* @see SocketWithoutUpgrade
* @see SocketWithUpgrade
*/
var Socket$1 = class extends SocketWithUpgrade {
	constructor(uri, opts = {}) {
		const isOptionsOnly = typeof uri === "object";
		const o = isOptionsOnly ? { ...uri } : { ...opts };
		if (!o.transports || o.transports && typeof o.transports[0] === "string") o.transports = (o.transports || [
			"polling",
			"websocket",
			"webtransport"
		]).map((transportName) => transports[transportName]).filter((t) => !!t);
		super(isOptionsOnly ? o : uri, o);
	}
};
Socket$1.protocol;
//#endregion
//#region node_modules/socket.io-client/build/esm/url.js
/**
* URL parser.
*
* @param uri - url
* @param path - the request path of the connection
* @param loc - An object meant to mimic window.location.
*        Defaults to window.location.
* @public
*/
function url(uri, path = "", loc) {
	let obj = uri;
	loc = loc || typeof location !== "undefined" && location;
	if (null == uri) uri = loc.protocol + "//" + loc.host;
	if (typeof uri === "string") {
		if ("/" === uri.charAt(0)) if ("/" === uri.charAt(1)) uri = loc.protocol + uri;
		else uri = loc.host + uri;
		if (!/^(https?|wss?):\/\//.test(uri)) if ("undefined" !== typeof loc) uri = loc.protocol + "//" + uri;
		else uri = "https://" + uri;
		obj = parse(uri);
	}
	if (!obj.port) {
		if (/^(http|ws)$/.test(obj.protocol)) obj.port = "80";
		else if (/^(http|ws)s$/.test(obj.protocol)) obj.port = "443";
	}
	obj.path = obj.path || "/";
	const host = obj.host.indexOf(":") !== -1 ? "[" + obj.host + "]" : obj.host;
	obj.id = obj.protocol + "://" + host + ":" + obj.port + path;
	obj.href = obj.protocol + "://" + host + (loc && loc.port === obj.port ? "" : ":" + obj.port);
	return obj;
}
//#endregion
//#region node_modules/socket.io-parser/build/esm/is-binary.js
var withNativeArrayBuffer = typeof ArrayBuffer === "function";
var isView = (obj) => {
	return typeof ArrayBuffer.isView === "function" ? ArrayBuffer.isView(obj) : obj.buffer instanceof ArrayBuffer;
};
var toString = Object.prototype.toString;
var withNativeBlob = typeof Blob === "function" || typeof Blob !== "undefined" && toString.call(Blob) === "[object BlobConstructor]";
var withNativeFile = typeof File === "function" || typeof File !== "undefined" && toString.call(File) === "[object FileConstructor]";
/**
* Returns true if obj is a Buffer, an ArrayBuffer, a Blob or a File.
*
* @private
*/
function isBinary(obj) {
	return withNativeArrayBuffer && (obj instanceof ArrayBuffer || isView(obj)) || withNativeBlob && obj instanceof Blob || withNativeFile && obj instanceof File;
}
function hasBinary(obj, toJSON) {
	if (!obj || typeof obj !== "object") return false;
	if (Array.isArray(obj)) {
		for (let i = 0, l = obj.length; i < l; i++) if (hasBinary(obj[i])) return true;
		return false;
	}
	if (isBinary(obj)) return true;
	if (obj.toJSON && typeof obj.toJSON === "function" && arguments.length === 1) return hasBinary(obj.toJSON(), true);
	for (const key in obj) if (Object.prototype.hasOwnProperty.call(obj, key) && hasBinary(obj[key])) return true;
	return false;
}
//#endregion
//#region node_modules/socket.io-parser/build/esm/binary.js
/**
* Replaces every Buffer | ArrayBuffer | Blob | File in packet with a numbered placeholder.
*
* @param {Object} packet - socket.io event packet
* @return {Object} with deconstructed packet and list of buffers
* @public
*/
function deconstructPacket(packet) {
	const buffers = [];
	const packetData = packet.data;
	const pack = packet;
	pack.data = _deconstructPacket(packetData, buffers);
	pack.attachments = buffers.length;
	return {
		packet: pack,
		buffers
	};
}
function _deconstructPacket(data, buffers) {
	if (!data) return data;
	if (isBinary(data)) {
		const placeholder = {
			_placeholder: true,
			num: buffers.length
		};
		buffers.push(data);
		return placeholder;
	} else if (Array.isArray(data)) {
		const newData = new Array(data.length);
		for (let i = 0; i < data.length; i++) newData[i] = _deconstructPacket(data[i], buffers);
		return newData;
	} else if (typeof data === "object" && !(data instanceof Date)) {
		const newData = {};
		for (const key in data) if (Object.prototype.hasOwnProperty.call(data, key)) newData[key] = _deconstructPacket(data[key], buffers);
		return newData;
	}
	return data;
}
/**
* Reconstructs a binary packet from its placeholder packet and buffers
*
* @param {Object} packet - event packet with placeholders
* @param {Array} buffers - binary buffers to put in placeholder positions
* @return {Object} reconstructed packet
* @public
*/
function reconstructPacket(packet, buffers) {
	packet.data = _reconstructPacket(packet.data, buffers);
	delete packet.attachments;
	return packet;
}
function _reconstructPacket(data, buffers) {
	if (!data) return data;
	if (data && data._placeholder === true) if (typeof data.num === "number" && data.num >= 0 && data.num < buffers.length) return buffers[data.num];
	else throw new Error("illegal attachments");
	else if (Array.isArray(data)) for (let i = 0; i < data.length; i++) data[i] = _reconstructPacket(data[i], buffers);
	else if (typeof data === "object") {
		for (const key in data) if (Object.prototype.hasOwnProperty.call(data, key)) data[key] = _reconstructPacket(data[key], buffers);
	}
	return data;
}
//#endregion
//#region node_modules/socket.io-parser/build/esm/index.js
var esm_exports = /* @__PURE__ */ __exportAll({
	Decoder: () => Decoder,
	Encoder: () => Encoder,
	PacketType: () => PacketType,
	isPacketValid: () => isPacketValid,
	protocol: () => 5
});
/**
* These strings must not be used as event names, as they have a special meaning.
*/
var RESERVED_EVENTS$1 = [
	"connect",
	"connect_error",
	"disconnect",
	"disconnecting",
	"newListener",
	"removeListener"
];
var PacketType;
(function(PacketType) {
	PacketType[PacketType["CONNECT"] = 0] = "CONNECT";
	PacketType[PacketType["DISCONNECT"] = 1] = "DISCONNECT";
	PacketType[PacketType["EVENT"] = 2] = "EVENT";
	PacketType[PacketType["ACK"] = 3] = "ACK";
	PacketType[PacketType["CONNECT_ERROR"] = 4] = "CONNECT_ERROR";
	PacketType[PacketType["BINARY_EVENT"] = 5] = "BINARY_EVENT";
	PacketType[PacketType["BINARY_ACK"] = 6] = "BINARY_ACK";
})(PacketType || (PacketType = {}));
/**
* A socket.io Encoder instance
*/
var Encoder = class {
	/**
	* Encoder constructor
	*
	* @param {function} replacer - custom replacer to pass down to JSON.parse
	*/
	constructor(replacer) {
		this.replacer = replacer;
	}
	/**
	* Encode a packet as a single string if non-binary, or as a
	* buffer sequence, depending on packet type.
	*
	* @param {Object} obj - packet object
	*/
	encode(obj) {
		if (obj.type === PacketType.EVENT || obj.type === PacketType.ACK) {
			if (hasBinary(obj)) return this.encodeAsBinary({
				type: obj.type === PacketType.EVENT ? PacketType.BINARY_EVENT : PacketType.BINARY_ACK,
				nsp: obj.nsp,
				data: obj.data,
				id: obj.id
			});
		}
		return [this.encodeAsString(obj)];
	}
	/**
	* Encode packet as string.
	*/
	encodeAsString(obj) {
		let str = "" + obj.type;
		if (obj.type === PacketType.BINARY_EVENT || obj.type === PacketType.BINARY_ACK) str += obj.attachments + "-";
		if (obj.nsp && "/" !== obj.nsp) str += obj.nsp + ",";
		if (null != obj.id) str += obj.id;
		if (null != obj.data) str += JSON.stringify(obj.data, this.replacer);
		return str;
	}
	/**
	* Encode packet as 'buffer sequence' by removing blobs, and
	* deconstructing packet into object with placeholders and
	* a list of buffers.
	*/
	encodeAsBinary(obj) {
		const deconstruction = deconstructPacket(obj);
		const pack = this.encodeAsString(deconstruction.packet);
		const buffers = deconstruction.buffers;
		buffers.unshift(pack);
		return buffers;
	}
};
/**
* A socket.io Decoder instance
*
* @return {Object} decoder
*/
var Decoder = class Decoder extends Emitter {
	/**
	* Decoder constructor
	*/
	constructor(opts) {
		super();
		this.opts = Object.assign({
			reviver: void 0,
			maxAttachments: 10
		}, typeof opts === "function" ? { reviver: opts } : opts);
	}
	/**
	* Decodes an encoded packet string into packet JSON.
	*
	* @param {String} obj - encoded packet
	*/
	add(obj) {
		let packet;
		if (typeof obj === "string") {
			if (this.reconstructor) throw new Error("got plaintext data when reconstructing a packet");
			packet = this.decodeString(obj);
			const isBinaryEvent = packet.type === PacketType.BINARY_EVENT;
			if (isBinaryEvent || packet.type === PacketType.BINARY_ACK) {
				packet.type = isBinaryEvent ? PacketType.EVENT : PacketType.ACK;
				this.reconstructor = new BinaryReconstructor(packet);
				if (packet.attachments === 0) super.emitReserved("decoded", packet);
			} else super.emitReserved("decoded", packet);
		} else if (isBinary(obj) || obj.base64) if (!this.reconstructor) throw new Error("got binary data when not reconstructing a packet");
		else {
			packet = this.reconstructor.takeBinaryData(obj);
			if (packet) {
				this.reconstructor = null;
				super.emitReserved("decoded", packet);
			}
		}
		else throw new Error("Unknown type: " + obj);
	}
	/**
	* Decode a packet String (JSON data)
	*
	* @param {String} str
	* @return {Object} packet
	*/
	decodeString(str) {
		let i = 0;
		const p = { type: Number(str.charAt(0)) };
		if (PacketType[p.type] === void 0) throw new Error("unknown packet type " + p.type);
		if (p.type === PacketType.BINARY_EVENT || p.type === PacketType.BINARY_ACK) {
			const start = i + 1;
			while (str.charAt(++i) !== "-" && i != str.length);
			const buf = str.substring(start, i);
			if (buf != Number(buf) || str.charAt(i) !== "-") throw new Error("Illegal attachments");
			const n = Number(buf);
			if (!isInteger(n) || n < 0) throw new Error("Illegal attachments");
			else if (n > this.opts.maxAttachments) throw new Error("too many attachments");
			p.attachments = n;
		}
		if ("/" === str.charAt(i + 1)) {
			const start = i + 1;
			while (++i) {
				if ("," === str.charAt(i)) break;
				if (i === str.length) break;
			}
			p.nsp = str.substring(start, i);
		} else p.nsp = "/";
		const next = str.charAt(i + 1);
		if ("" !== next && Number(next) == next) {
			const start = i + 1;
			while (++i) {
				const c = str.charAt(i);
				if (null == c || Number(c) != c) {
					--i;
					break;
				}
				if (i === str.length) break;
			}
			p.id = Number(str.substring(start, i + 1));
		}
		if (str.charAt(++i)) {
			const payload = this.tryParse(str.substr(i));
			if (Decoder.isPayloadValid(p.type, payload)) p.data = payload;
			else throw new Error("invalid payload");
		}
		return p;
	}
	tryParse(str) {
		try {
			return JSON.parse(str, this.opts.reviver);
		} catch (e) {
			return false;
		}
	}
	static isPayloadValid(type, payload) {
		switch (type) {
			case PacketType.CONNECT: return isObject(payload);
			case PacketType.DISCONNECT: return payload === void 0;
			case PacketType.CONNECT_ERROR: return typeof payload === "string" || isObject(payload);
			case PacketType.EVENT:
			case PacketType.BINARY_EVENT: return Array.isArray(payload) && (typeof payload[0] === "number" || typeof payload[0] === "string" && RESERVED_EVENTS$1.indexOf(payload[0]) === -1);
			case PacketType.ACK:
			case PacketType.BINARY_ACK: return Array.isArray(payload);
		}
	}
	/**
	* Deallocates a parser's resources
	*/
	destroy() {
		if (this.reconstructor) {
			this.reconstructor.finishedReconstruction();
			this.reconstructor = null;
		}
	}
};
/**
* A manager of a binary event's 'buffer sequence'. Should
* be constructed whenever a packet of type BINARY_EVENT is
* decoded.
*
* @param {Object} packet
* @return {BinaryReconstructor} initialized reconstructor
*/
var BinaryReconstructor = class {
	constructor(packet) {
		this.packet = packet;
		this.buffers = [];
		this.reconPack = packet;
	}
	/**
	* Method to be called when binary data received from connection
	* after a BINARY_EVENT packet.
	*
	* @param {Buffer | ArrayBuffer} binData - the raw binary data received
	* @return {null | Object} returns null if more binary data is expected or
	*   a reconstructed packet object if all buffers have been received.
	*/
	takeBinaryData(binData) {
		this.buffers.push(binData);
		if (this.buffers.length === this.reconPack.attachments) {
			const packet = reconstructPacket(this.reconPack, this.buffers);
			this.finishedReconstruction();
			return packet;
		}
		return null;
	}
	/**
	* Cleans up binary packet reconstruction variables.
	*/
	finishedReconstruction() {
		this.reconPack = null;
		this.buffers = [];
	}
};
function isNamespaceValid(nsp) {
	return typeof nsp === "string";
}
var isInteger = Number.isInteger || function(value) {
	return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
};
function isAckIdValid(id) {
	return id === void 0 || isInteger(id);
}
function isObject(value) {
	return Object.prototype.toString.call(value) === "[object Object]";
}
function isDataValid(type, payload) {
	switch (type) {
		case PacketType.CONNECT: return payload === void 0 || isObject(payload);
		case PacketType.DISCONNECT: return payload === void 0;
		case PacketType.EVENT: return Array.isArray(payload) && (typeof payload[0] === "number" || typeof payload[0] === "string" && RESERVED_EVENTS$1.indexOf(payload[0]) === -1);
		case PacketType.ACK: return Array.isArray(payload);
		case PacketType.CONNECT_ERROR: return typeof payload === "string" || isObject(payload);
		default: return false;
	}
}
function isPacketValid(packet) {
	return isNamespaceValid(packet.nsp) && isAckIdValid(packet.id) && isDataValid(packet.type, packet.data);
}
//#endregion
//#region node_modules/socket.io-client/build/esm/on.js
function on(obj, ev, fn) {
	obj.on(ev, fn);
	return function subDestroy() {
		obj.off(ev, fn);
	};
}
//#endregion
//#region node_modules/socket.io-client/build/esm/socket.js
/**
* Internal events.
* These events can't be emitted by the user.
*/
var RESERVED_EVENTS = Object.freeze({
	connect: 1,
	connect_error: 1,
	disconnect: 1,
	disconnecting: 1,
	newListener: 1,
	removeListener: 1
});
/**
* A Socket is the fundamental class for interacting with the server.
*
* A Socket belongs to a certain Namespace (by default /) and uses an underlying {@link Manager} to communicate.
*
* @example
* const socket = io();
*
* socket.on("connect", () => {
*   console.log("connected");
* });
*
* // send an event to the server
* socket.emit("foo", "bar");
*
* socket.on("foobar", () => {
*   // an event was received from the server
* });
*
* // upon disconnection
* socket.on("disconnect", (reason) => {
*   console.log(`disconnected due to ${reason}`);
* });
*/
var Socket = class extends Emitter {
	/**
	* `Socket` constructor.
	*/
	constructor(io, nsp, opts) {
		super();
		/**
		* Whether the socket is currently connected to the server.
		*
		* @example
		* const socket = io();
		*
		* socket.on("connect", () => {
		*   console.log(socket.connected); // true
		* });
		*
		* socket.on("disconnect", () => {
		*   console.log(socket.connected); // false
		* });
		*/
		this.connected = false;
		/**
		* Whether the connection state was recovered after a temporary disconnection. In that case, any missed packets will
		* be transmitted by the server.
		*/
		this.recovered = false;
		/**
		* Buffer for packets received before the CONNECT packet
		*/
		this.receiveBuffer = [];
		/**
		* Buffer for packets that will be sent once the socket is connected
		*/
		this.sendBuffer = [];
		/**
		* The queue of packets to be sent with retry in case of failure.
		*
		* Packets are sent one by one, each waiting for the server acknowledgement, in order to guarantee the delivery order.
		* @private
		*/
		this._queue = [];
		/**
		* A sequence to generate the ID of the {@link QueuedPacket}.
		* @private
		*/
		this._queueSeq = 0;
		this.ids = 0;
		/**
		* A map containing acknowledgement handlers.
		*
		* The `withError` attribute is used to differentiate handlers that accept an error as first argument:
		*
		* - `socket.emit("test", (err, value) => { ... })` with `ackTimeout` option
		* - `socket.timeout(5000).emit("test", (err, value) => { ... })`
		* - `const value = await socket.emitWithAck("test")`
		*
		* From those that don't:
		*
		* - `socket.emit("test", (value) => { ... });`
		*
		* In the first case, the handlers will be called with an error when:
		*
		* - the timeout is reached
		* - the socket gets disconnected
		*
		* In the second case, the handlers will be simply discarded upon disconnection, since the client will never receive
		* an acknowledgement from the server.
		*
		* @private
		*/
		this.acks = {};
		this.flags = {};
		this.io = io;
		this.nsp = nsp;
		if (opts && opts.auth) this.auth = opts.auth;
		this._opts = Object.assign({}, opts);
		if (this.io._autoConnect) this.open();
	}
	/**
	* Whether the socket is currently disconnected
	*
	* @example
	* const socket = io();
	*
	* socket.on("connect", () => {
	*   console.log(socket.disconnected); // false
	* });
	*
	* socket.on("disconnect", () => {
	*   console.log(socket.disconnected); // true
	* });
	*/
	get disconnected() {
		return !this.connected;
	}
	/**
	* Subscribe to open, close and packet events
	*
	* @private
	*/
	subEvents() {
		if (this.subs) return;
		const io = this.io;
		this.subs = [
			on(io, "open", this.onopen.bind(this)),
			on(io, "packet", this.onpacket.bind(this)),
			on(io, "error", this.onerror.bind(this)),
			on(io, "close", this.onclose.bind(this))
		];
	}
	/**
	* Whether the Socket will try to reconnect when its Manager connects or reconnects.
	*
	* @example
	* const socket = io();
	*
	* console.log(socket.active); // true
	*
	* socket.on("disconnect", (reason) => {
	*   if (reason === "io server disconnect") {
	*     // the disconnection was initiated by the server, you need to manually reconnect
	*     console.log(socket.active); // false
	*   }
	*   // else the socket will automatically try to reconnect
	*   console.log(socket.active); // true
	* });
	*/
	get active() {
		return !!this.subs;
	}
	/**
	* "Opens" the socket.
	*
	* @example
	* const socket = io({
	*   autoConnect: false
	* });
	*
	* socket.connect();
	*/
	connect() {
		if (this.connected) return this;
		this.subEvents();
		if (!this.io["_reconnecting"]) this.io.open();
		if ("open" === this.io._readyState) this.onopen();
		return this;
	}
	/**
	* Alias for {@link connect()}.
	*/
	open() {
		return this.connect();
	}
	/**
	* Sends a `message` event.
	*
	* This method mimics the WebSocket.send() method.
	*
	* @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/send
	*
	* @example
	* socket.send("hello");
	*
	* // this is equivalent to
	* socket.emit("message", "hello");
	*
	* @return self
	*/
	send(...args) {
		args.unshift("message");
		this.emit.apply(this, args);
		return this;
	}
	/**
	* Override `emit`.
	* If the event is in `events`, it's emitted normally.
	*
	* @example
	* socket.emit("hello", "world");
	*
	* // all serializable datastructures are supported (no need to call JSON.stringify)
	* socket.emit("hello", 1, "2", { 3: ["4"], 5: Uint8Array.from([6]) });
	*
	* // with an acknowledgement from the server
	* socket.emit("hello", "world", (val) => {
	*   // ...
	* });
	*
	* @return self
	*/
	emit(ev, ...args) {
		var _a, _b, _c;
		if (RESERVED_EVENTS.hasOwnProperty(ev)) throw new Error("\"" + ev.toString() + "\" is a reserved event name");
		args.unshift(ev);
		if (this._opts.retries && !this.flags.fromQueue && !this.flags.volatile) {
			this._addToQueue(args);
			return this;
		}
		const packet = {
			type: PacketType.EVENT,
			data: args
		};
		packet.options = {};
		packet.options.compress = this.flags.compress !== false;
		if ("function" === typeof args[args.length - 1]) {
			const id = this.ids++;
			const ack = args.pop();
			this._registerAckCallback(id, ack);
			packet.id = id;
		}
		const isTransportWritable = (_b = (_a = this.io.engine) === null || _a === void 0 ? void 0 : _a.transport) === null || _b === void 0 ? void 0 : _b.writable;
		const isConnected = this.connected && !((_c = this.io.engine) === null || _c === void 0 ? void 0 : _c._hasPingExpired());
		if (this.flags.volatile && !isTransportWritable) {} else if (isConnected) {
			this.notifyOutgoingListeners(packet);
			this.packet(packet);
		} else this.sendBuffer.push(packet);
		this.flags = {};
		return this;
	}
	/**
	* @private
	*/
	_registerAckCallback(id, ack) {
		var _a;
		const timeout = (_a = this.flags.timeout) !== null && _a !== void 0 ? _a : this._opts.ackTimeout;
		if (timeout === void 0) {
			this.acks[id] = ack;
			return;
		}
		const timer = this.io.setTimeoutFn(() => {
			delete this.acks[id];
			for (let i = 0; i < this.sendBuffer.length; i++) if (this.sendBuffer[i].id === id) this.sendBuffer.splice(i, 1);
			ack.call(this, /* @__PURE__ */ new Error("operation has timed out"));
		}, timeout);
		const fn = (...args) => {
			this.io.clearTimeoutFn(timer);
			ack.apply(this, args);
		};
		fn.withError = true;
		this.acks[id] = fn;
	}
	/**
	* Emits an event and waits for an acknowledgement
	*
	* @example
	* // without timeout
	* const response = await socket.emitWithAck("hello", "world");
	*
	* // with a specific timeout
	* try {
	*   const response = await socket.timeout(1000).emitWithAck("hello", "world");
	* } catch (err) {
	*   // the server did not acknowledge the event in the given delay
	* }
	*
	* @return a Promise that will be fulfilled when the server acknowledges the event
	*/
	emitWithAck(ev, ...args) {
		return new Promise((resolve, reject) => {
			const fn = (arg1, arg2) => {
				return arg1 ? reject(arg1) : resolve(arg2);
			};
			fn.withError = true;
			args.push(fn);
			this.emit(ev, ...args);
		});
	}
	/**
	* Add the packet to the queue.
	* @param args
	* @private
	*/
	_addToQueue(args) {
		let ack;
		if (typeof args[args.length - 1] === "function") ack = args.pop();
		const packet = {
			id: this._queueSeq++,
			tryCount: 0,
			pending: false,
			args,
			flags: Object.assign({ fromQueue: true }, this.flags)
		};
		args.push((err, ...responseArgs) => {
			if (packet !== this._queue[0]) {}
			if (err !== null) {
				if (packet.tryCount > this._opts.retries) {
					this._queue.shift();
					if (ack) ack(err);
				}
			} else {
				this._queue.shift();
				if (ack) ack(null, ...responseArgs);
			}
			packet.pending = false;
			return this._drainQueue();
		});
		this._queue.push(packet);
		this._drainQueue();
	}
	/**
	* Send the first packet of the queue, and wait for an acknowledgement from the server.
	* @param force - whether to resend a packet that has not been acknowledged yet
	*
	* @private
	*/
	_drainQueue(force = false) {
		if (!this.connected || this._queue.length === 0) return;
		const packet = this._queue[0];
		if (packet.pending && !force) return;
		packet.pending = true;
		packet.tryCount++;
		this.flags = packet.flags;
		this.emit.apply(this, packet.args);
	}
	/**
	* Sends a packet.
	*
	* @param packet
	* @private
	*/
	packet(packet) {
		packet.nsp = this.nsp;
		this.io._packet(packet);
	}
	/**
	* Called upon engine `open`.
	*
	* @private
	*/
	onopen() {
		if (typeof this.auth == "function") this.auth((data) => {
			this._sendConnectPacket(data);
		});
		else this._sendConnectPacket(this.auth);
	}
	/**
	* Sends a CONNECT packet to initiate the Socket.IO session.
	*
	* @param data
	* @private
	*/
	_sendConnectPacket(data) {
		this.packet({
			type: PacketType.CONNECT,
			data: this._pid ? Object.assign({
				pid: this._pid,
				offset: this._lastOffset
			}, data) : data
		});
	}
	/**
	* Called upon engine or manager `error`.
	*
	* @param err
	* @private
	*/
	onerror(err) {
		if (!this.connected) this.emitReserved("connect_error", err);
	}
	/**
	* Called upon engine `close`.
	*
	* @param reason
	* @param description
	* @private
	*/
	onclose(reason, description) {
		this.connected = false;
		delete this.id;
		this.emitReserved("disconnect", reason, description);
		this._clearAcks();
	}
	/**
	* Clears the acknowledgement handlers upon disconnection, since the client will never receive an acknowledgement from
	* the server.
	*
	* @private
	*/
	_clearAcks() {
		Object.keys(this.acks).forEach((id) => {
			if (!this.sendBuffer.some((packet) => String(packet.id) === id)) {
				const ack = this.acks[id];
				delete this.acks[id];
				if (ack.withError) ack.call(this, /* @__PURE__ */ new Error("socket has been disconnected"));
			}
		});
	}
	/**
	* Called with socket packet.
	*
	* @param packet
	* @private
	*/
	onpacket(packet) {
		if (!(packet.nsp === this.nsp)) return;
		switch (packet.type) {
			case PacketType.CONNECT:
				if (packet.data && packet.data.sid) this.onconnect(packet.data.sid, packet.data.pid);
				else this.emitReserved("connect_error", /* @__PURE__ */ new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
				break;
			case PacketType.EVENT:
			case PacketType.BINARY_EVENT:
				this.onevent(packet);
				break;
			case PacketType.ACK:
			case PacketType.BINARY_ACK:
				this.onack(packet);
				break;
			case PacketType.DISCONNECT:
				this.ondisconnect();
				break;
			case PacketType.CONNECT_ERROR:
				this.destroy();
				const err = new Error(packet.data.message);
				err.data = packet.data.data;
				this.emitReserved("connect_error", err);
				break;
		}
	}
	/**
	* Called upon a server event.
	*
	* @param packet
	* @private
	*/
	onevent(packet) {
		const args = packet.data || [];
		if (null != packet.id) args.push(this.ack(packet.id));
		if (this.connected) this.emitEvent(args);
		else this.receiveBuffer.push(Object.freeze(args));
	}
	emitEvent(args) {
		if (this._anyListeners && this._anyListeners.length) {
			const listeners = this._anyListeners.slice();
			for (const listener of listeners) listener.apply(this, args);
		}
		super.emit.apply(this, args);
		if (this._pid && args.length && typeof args[args.length - 1] === "string") this._lastOffset = args[args.length - 1];
	}
	/**
	* Produces an ack callback to emit with an event.
	*
	* @private
	*/
	ack(id) {
		const self = this;
		let sent = false;
		return function(...args) {
			if (sent) return;
			sent = true;
			self.packet({
				type: PacketType.ACK,
				id,
				data: args
			});
		};
	}
	/**
	* Called upon a server acknowledgement.
	*
	* @param packet
	* @private
	*/
	onack(packet) {
		const ack = this.acks[packet.id];
		if (typeof ack !== "function") return;
		delete this.acks[packet.id];
		if (ack.withError) packet.data.unshift(null);
		ack.apply(this, packet.data);
	}
	/**
	* Called upon server connect.
	*
	* @private
	*/
	onconnect(id, pid) {
		this.id = id;
		this.recovered = pid && this._pid === pid;
		this._pid = pid;
		this.connected = true;
		this.emitBuffered();
		this._drainQueue(true);
		this.emitReserved("connect");
	}
	/**
	* Emit buffered events (received and emitted).
	*
	* @private
	*/
	emitBuffered() {
		this.receiveBuffer.forEach((args) => this.emitEvent(args));
		this.receiveBuffer = [];
		this.sendBuffer.forEach((packet) => {
			this.notifyOutgoingListeners(packet);
			this.packet(packet);
		});
		this.sendBuffer = [];
	}
	/**
	* Called upon server disconnect.
	*
	* @private
	*/
	ondisconnect() {
		this.destroy();
		this.onclose("io server disconnect");
	}
	/**
	* Called upon forced client/server side disconnections,
	* this method ensures the manager stops tracking us and
	* that reconnections don't get triggered for this.
	*
	* @private
	*/
	destroy() {
		if (this.subs) {
			this.subs.forEach((subDestroy) => subDestroy());
			this.subs = void 0;
		}
		this.io["_destroy"](this);
	}
	/**
	* Disconnects the socket manually. In that case, the socket will not try to reconnect.
	*
	* If this is the last active Socket instance of the {@link Manager}, the low-level connection will be closed.
	*
	* @example
	* const socket = io();
	*
	* socket.on("disconnect", (reason) => {
	*   // console.log(reason); prints "io client disconnect"
	* });
	*
	* socket.disconnect();
	*
	* @return self
	*/
	disconnect() {
		if (this.connected) this.packet({ type: PacketType.DISCONNECT });
		this.destroy();
		if (this.connected) this.onclose("io client disconnect");
		return this;
	}
	/**
	* Alias for {@link disconnect()}.
	*
	* @return self
	*/
	close() {
		return this.disconnect();
	}
	/**
	* Sets the compress flag.
	*
	* @example
	* socket.compress(false).emit("hello");
	*
	* @param compress - if `true`, compresses the sending data
	* @return self
	*/
	compress(compress) {
		this.flags.compress = compress;
		return this;
	}
	/**
	* Sets a modifier for a subsequent event emission that the event message will be dropped when this socket is not
	* ready to send messages.
	*
	* @example
	* socket.volatile.emit("hello"); // the server may or may not receive it
	*
	* @returns self
	*/
	get volatile() {
		this.flags.volatile = true;
		return this;
	}
	/**
	* Sets a modifier for a subsequent event emission that the callback will be called with an error when the
	* given number of milliseconds have elapsed without an acknowledgement from the server:
	*
	* @example
	* socket.timeout(5000).emit("my-event", (err) => {
	*   if (err) {
	*     // the server did not acknowledge the event in the given delay
	*   }
	* });
	*
	* @returns self
	*/
	timeout(timeout) {
		this.flags.timeout = timeout;
		return this;
	}
	/**
	* Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
	* callback.
	*
	* @example
	* socket.onAny((event, ...args) => {
	*   console.log(`got ${event}`);
	* });
	*
	* @param listener
	*/
	onAny(listener) {
		this._anyListeners = this._anyListeners || [];
		this._anyListeners.push(listener);
		return this;
	}
	/**
	* Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
	* callback. The listener is added to the beginning of the listeners array.
	*
	* @example
	* socket.prependAny((event, ...args) => {
	*   console.log(`got event ${event}`);
	* });
	*
	* @param listener
	*/
	prependAny(listener) {
		this._anyListeners = this._anyListeners || [];
		this._anyListeners.unshift(listener);
		return this;
	}
	/**
	* Removes the listener that will be fired when any event is emitted.
	*
	* @example
	* const catchAllListener = (event, ...args) => {
	*   console.log(`got event ${event}`);
	* }
	*
	* socket.onAny(catchAllListener);
	*
	* // remove a specific listener
	* socket.offAny(catchAllListener);
	*
	* // or remove all listeners
	* socket.offAny();
	*
	* @param listener
	*/
	offAny(listener) {
		if (!this._anyListeners) return this;
		if (listener) {
			const listeners = this._anyListeners;
			for (let i = 0; i < listeners.length; i++) if (listener === listeners[i]) {
				listeners.splice(i, 1);
				return this;
			}
		} else this._anyListeners = [];
		return this;
	}
	/**
	* Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
	* e.g. to remove listeners.
	*/
	listenersAny() {
		return this._anyListeners || [];
	}
	/**
	* Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
	* callback.
	*
	* Note: acknowledgements sent to the server are not included.
	*
	* @example
	* socket.onAnyOutgoing((event, ...args) => {
	*   console.log(`sent event ${event}`);
	* });
	*
	* @param listener
	*/
	onAnyOutgoing(listener) {
		this._anyOutgoingListeners = this._anyOutgoingListeners || [];
		this._anyOutgoingListeners.push(listener);
		return this;
	}
	/**
	* Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
	* callback. The listener is added to the beginning of the listeners array.
	*
	* Note: acknowledgements sent to the server are not included.
	*
	* @example
	* socket.prependAnyOutgoing((event, ...args) => {
	*   console.log(`sent event ${event}`);
	* });
	*
	* @param listener
	*/
	prependAnyOutgoing(listener) {
		this._anyOutgoingListeners = this._anyOutgoingListeners || [];
		this._anyOutgoingListeners.unshift(listener);
		return this;
	}
	/**
	* Removes the listener that will be fired when any event is emitted.
	*
	* @example
	* const catchAllListener = (event, ...args) => {
	*   console.log(`sent event ${event}`);
	* }
	*
	* socket.onAnyOutgoing(catchAllListener);
	*
	* // remove a specific listener
	* socket.offAnyOutgoing(catchAllListener);
	*
	* // or remove all listeners
	* socket.offAnyOutgoing();
	*
	* @param [listener] - the catch-all listener (optional)
	*/
	offAnyOutgoing(listener) {
		if (!this._anyOutgoingListeners) return this;
		if (listener) {
			const listeners = this._anyOutgoingListeners;
			for (let i = 0; i < listeners.length; i++) if (listener === listeners[i]) {
				listeners.splice(i, 1);
				return this;
			}
		} else this._anyOutgoingListeners = [];
		return this;
	}
	/**
	* Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
	* e.g. to remove listeners.
	*/
	listenersAnyOutgoing() {
		return this._anyOutgoingListeners || [];
	}
	/**
	* Notify the listeners for each packet sent
	*
	* @param packet
	*
	* @private
	*/
	notifyOutgoingListeners(packet) {
		if (this._anyOutgoingListeners && this._anyOutgoingListeners.length) {
			const listeners = this._anyOutgoingListeners.slice();
			for (const listener of listeners) listener.apply(this, packet.data);
		}
	}
};
//#endregion
//#region node_modules/socket.io-client/build/esm/contrib/backo2.js
/**
* Initialize backoff timer with `opts`.
*
* - `min` initial timeout in milliseconds [100]
* - `max` max timeout [10000]
* - `jitter` [0]
* - `factor` [2]
*
* @param {Object} opts
* @api public
*/
function Backoff(opts) {
	opts = opts || {};
	this.ms = opts.min || 100;
	this.max = opts.max || 1e4;
	this.factor = opts.factor || 2;
	this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
	this.attempts = 0;
}
/**
* Return the backoff duration.
*
* @return {Number}
* @api public
*/
Backoff.prototype.duration = function() {
	var ms = this.ms * Math.pow(this.factor, this.attempts++);
	if (this.jitter) {
		var rand = Math.random();
		var deviation = Math.floor(rand * this.jitter * ms);
		ms = (Math.floor(rand * 10) & 1) == 0 ? ms - deviation : ms + deviation;
	}
	return Math.min(ms, this.max) | 0;
};
/**
* Reset the number of attempts.
*
* @api public
*/
Backoff.prototype.reset = function() {
	this.attempts = 0;
};
/**
* Set the minimum duration
*
* @api public
*/
Backoff.prototype.setMin = function(min) {
	this.ms = min;
};
/**
* Set the maximum duration
*
* @api public
*/
Backoff.prototype.setMax = function(max) {
	this.max = max;
};
/**
* Set the jitter
*
* @api public
*/
Backoff.prototype.setJitter = function(jitter) {
	this.jitter = jitter;
};
//#endregion
//#region node_modules/socket.io-client/build/esm/manager.js
var Manager = class extends Emitter {
	constructor(uri, opts) {
		var _a;
		super();
		this.nsps = {};
		this.subs = [];
		if (uri && "object" === typeof uri) {
			opts = uri;
			uri = void 0;
		}
		opts = opts || {};
		opts.path = opts.path || "/socket.io";
		this.opts = opts;
		installTimerFunctions(this, opts);
		this.reconnection(opts.reconnection !== false);
		this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
		this.reconnectionDelay(opts.reconnectionDelay || 1e3);
		this.reconnectionDelayMax(opts.reconnectionDelayMax || 5e3);
		this.randomizationFactor((_a = opts.randomizationFactor) !== null && _a !== void 0 ? _a : .5);
		this.backoff = new Backoff({
			min: this.reconnectionDelay(),
			max: this.reconnectionDelayMax(),
			jitter: this.randomizationFactor()
		});
		this.timeout(null == opts.timeout ? 2e4 : opts.timeout);
		this._readyState = "closed";
		this.uri = uri;
		const _parser = opts.parser || esm_exports;
		this.encoder = new _parser.Encoder();
		this.decoder = new _parser.Decoder();
		this._autoConnect = opts.autoConnect !== false;
		if (this._autoConnect) this.open();
	}
	reconnection(v) {
		if (!arguments.length) return this._reconnection;
		this._reconnection = !!v;
		if (!v) this.skipReconnect = true;
		return this;
	}
	reconnectionAttempts(v) {
		if (v === void 0) return this._reconnectionAttempts;
		this._reconnectionAttempts = v;
		return this;
	}
	reconnectionDelay(v) {
		var _a;
		if (v === void 0) return this._reconnectionDelay;
		this._reconnectionDelay = v;
		(_a = this.backoff) === null || _a === void 0 || _a.setMin(v);
		return this;
	}
	randomizationFactor(v) {
		var _a;
		if (v === void 0) return this._randomizationFactor;
		this._randomizationFactor = v;
		(_a = this.backoff) === null || _a === void 0 || _a.setJitter(v);
		return this;
	}
	reconnectionDelayMax(v) {
		var _a;
		if (v === void 0) return this._reconnectionDelayMax;
		this._reconnectionDelayMax = v;
		(_a = this.backoff) === null || _a === void 0 || _a.setMax(v);
		return this;
	}
	timeout(v) {
		if (!arguments.length) return this._timeout;
		this._timeout = v;
		return this;
	}
	/**
	* Starts trying to reconnect if reconnection is enabled and we have not
	* started reconnecting yet
	*
	* @private
	*/
	maybeReconnectOnOpen() {
		if (!this._reconnecting && this._reconnection && this.backoff.attempts === 0) this.reconnect();
	}
	/**
	* Sets the current transport `socket`.
	*
	* @param {Function} fn - optional, callback
	* @return self
	* @public
	*/
	open(fn) {
		if (~this._readyState.indexOf("open")) return this;
		this.engine = new Socket$1(this.uri, this.opts);
		const socket = this.engine;
		const self = this;
		this._readyState = "opening";
		this.skipReconnect = false;
		const openSubDestroy = on(socket, "open", function() {
			self.onopen();
			fn && fn();
		});
		const onError = (err) => {
			this.cleanup();
			this._readyState = "closed";
			this.emitReserved("error", err);
			if (fn) fn(err);
			else this.maybeReconnectOnOpen();
		};
		const errorSub = on(socket, "error", onError);
		if (false !== this._timeout) {
			const timeout = this._timeout;
			const timer = this.setTimeoutFn(() => {
				openSubDestroy();
				onError(/* @__PURE__ */ new Error("timeout"));
				socket.close();
			}, timeout);
			if (this.opts.autoUnref) timer.unref();
			this.subs.push(() => {
				this.clearTimeoutFn(timer);
			});
		}
		this.subs.push(openSubDestroy);
		this.subs.push(errorSub);
		return this;
	}
	/**
	* Alias for open()
	*
	* @return self
	* @public
	*/
	connect(fn) {
		return this.open(fn);
	}
	/**
	* Called upon transport open.
	*
	* @private
	*/
	onopen() {
		this.cleanup();
		this._readyState = "open";
		this.emitReserved("open");
		const socket = this.engine;
		this.subs.push(on(socket, "ping", this.onping.bind(this)), on(socket, "data", this.ondata.bind(this)), on(socket, "error", this.onerror.bind(this)), on(socket, "close", this.onclose.bind(this)), on(this.decoder, "decoded", this.ondecoded.bind(this)));
	}
	/**
	* Called upon a ping.
	*
	* @private
	*/
	onping() {
		this.emitReserved("ping");
	}
	/**
	* Called with data.
	*
	* @private
	*/
	ondata(data) {
		try {
			this.decoder.add(data);
		} catch (e) {
			this.onclose("parse error", e);
		}
	}
	/**
	* Called when parser fully decodes a packet.
	*
	* @private
	*/
	ondecoded(packet) {
		nextTick(() => {
			this.emitReserved("packet", packet);
		}, this.setTimeoutFn);
	}
	/**
	* Called upon socket error.
	*
	* @private
	*/
	onerror(err) {
		this.emitReserved("error", err);
	}
	/**
	* Creates a new socket for the given `nsp`.
	*
	* @return {Socket}
	* @public
	*/
	socket(nsp, opts) {
		let socket = this.nsps[nsp];
		if (!socket) {
			socket = new Socket(this, nsp, opts);
			this.nsps[nsp] = socket;
		} else if (this._autoConnect && !socket.active) socket.connect();
		return socket;
	}
	/**
	* Called upon a socket close.
	*
	* @param socket
	* @private
	*/
	_destroy(socket) {
		const nsps = Object.keys(this.nsps);
		for (const nsp of nsps) if (this.nsps[nsp].active) return;
		this._close();
	}
	/**
	* Writes a packet.
	*
	* @param packet
	* @private
	*/
	_packet(packet) {
		const encodedPackets = this.encoder.encode(packet);
		for (let i = 0; i < encodedPackets.length; i++) this.engine.write(encodedPackets[i], packet.options);
	}
	/**
	* Clean up transport subscriptions and packet buffer.
	*
	* @private
	*/
	cleanup() {
		this.subs.forEach((subDestroy) => subDestroy());
		this.subs.length = 0;
		this.decoder.destroy();
	}
	/**
	* Close the current socket.
	*
	* @private
	*/
	_close() {
		this.skipReconnect = true;
		this._reconnecting = false;
		this.onclose("forced close");
	}
	/**
	* Alias for close()
	*
	* @private
	*/
	disconnect() {
		return this._close();
	}
	/**
	* Called when:
	*
	* - the low-level engine is closed
	* - the parser encountered a badly formatted packet
	* - all sockets are disconnected
	*
	* @private
	*/
	onclose(reason, description) {
		var _a;
		this.cleanup();
		(_a = this.engine) === null || _a === void 0 || _a.close();
		this.backoff.reset();
		this._readyState = "closed";
		this.emitReserved("close", reason, description);
		if (this._reconnection && !this.skipReconnect) this.reconnect();
	}
	/**
	* Attempt a reconnection.
	*
	* @private
	*/
	reconnect() {
		if (this._reconnecting || this.skipReconnect) return this;
		const self = this;
		if (this.backoff.attempts >= this._reconnectionAttempts) {
			this.backoff.reset();
			this.emitReserved("reconnect_failed");
			this._reconnecting = false;
		} else {
			const delay = this.backoff.duration();
			this._reconnecting = true;
			const timer = this.setTimeoutFn(() => {
				if (self.skipReconnect) return;
				this.emitReserved("reconnect_attempt", self.backoff.attempts);
				if (self.skipReconnect) return;
				self.open((err) => {
					if (err) {
						self._reconnecting = false;
						self.reconnect();
						this.emitReserved("reconnect_error", err);
					} else self.onreconnect();
				});
			}, delay);
			if (this.opts.autoUnref) timer.unref();
			this.subs.push(() => {
				this.clearTimeoutFn(timer);
			});
		}
	}
	/**
	* Called upon successful reconnect.
	*
	* @private
	*/
	onreconnect() {
		const attempt = this.backoff.attempts;
		this._reconnecting = false;
		this.backoff.reset();
		this.emitReserved("reconnect", attempt);
	}
};
//#endregion
//#region node_modules/socket.io-client/build/esm/index.js
/**
* Managers cache.
*/
var cache = {};
function lookup(uri, opts) {
	if (typeof uri === "object") {
		opts = uri;
		uri = void 0;
	}
	opts = opts || {};
	const parsed = url(uri, opts.path || "/socket.io");
	const source = parsed.source;
	const id = parsed.id;
	const path = parsed.path;
	const sameNamespace = cache[id] && path in cache[id]["nsps"];
	const newConnection = opts.forceNew || opts["force new connection"] || false === opts.multiplex || sameNamespace;
	let io;
	if (newConnection) io = new Manager(source, opts);
	else {
		if (!cache[id]) cache[id] = new Manager(source, opts);
		io = cache[id];
	}
	if (parsed.query && !opts.query) opts.query = parsed.queryKey;
	return io.socket(parsed.path, opts);
}
Object.assign(lookup, {
	Manager,
	Socket,
	io: lookup,
	connect: lookup
});
//#endregion
//#region src/services/socket.ts
var socket = null;
var reconnectTimer = null;
function getSocket() {
	return socket;
}
function connectSocket() {
	const authStore = useAuthStore();
	const networkStore = useNetworkStore();
	if (socket) socket.disconnect();
	console.log(`🔌 Conectando WebSocket a: ${API_URL}`);
	socket = lookup(API_URL, {
		transports: ["websocket"],
		autoConnect: true,
		reconnection: true,
		reconnectionDelay: 2e3,
		reconnectionDelayMax: 5e3
	});
	socket.on("connect", () => {
		networkStore.setOnline(true);
		console.log("🔌 WebSocket conectado al servidor con éxito");
		if (reconnectTimer) {
			clearTimeout(reconnectTimer);
			reconnectTimer = null;
		}
		if (authStore.user) socket?.emit("register", {
			usuario_id: authStore.user.id,
			role: authStore.role,
			nombre: `${authStore.user.nombre} ${authStore.user.apellido}`
		});
		else if (authStore.role === "admin") socket?.emit("register", {
			usuario_id: 0,
			role: "admin",
			nombre: "Administrador"
		});
	});
	socket.on("disconnect", (reason) => {
		networkStore.setOnline(false);
		console.warn(`🔌 WebSocket desconectado del servidor. Razón: ${reason}`);
	});
	socket.on("connect_error", (error) => {
		networkStore.setOnline(false);
		console.debug("🔌 Error en la conexión del WebSocket:", error.message);
	});
	socket.on("db-status", (data) => {
		const isDbOnline = data.database === "connected";
		if (networkStore.isOnline !== isDbOnline) networkStore.setOnline(isDbOnline);
	});
	socket.on("user-connected", (data) => {
		if (authStore.role === "admin") Notify_default.create({
			type: "info",
			message: `👤 ${data.nombre} (${data.role}) está en línea`,
			position: "bottom-right",
			timeout: 2e3
		});
	});
	socket.on("user-disconnected", (data) => {
		if (authStore.role === "admin") Notify_default.create({
			type: "info",
			message: `👤 ${data.nombre} se ha desconectado`,
			position: "bottom-right",
			timeout: 2e3
		});
	});
	socket.on("sync-started", (data) => {
		if (authStore.role === "admin") Notify_default.create({
			type: "warning",
			message: `🔄 ${data.nombre} inició sincronización`,
			position: "bottom-right",
			timeout: 2500
		});
	});
	socket.on("sync-completed", (data) => {
		if (authStore.role === "admin") Notify_default.create({
			type: "positive",
			message: `✅ ${data.nombre} terminó sincronización`,
			caption: `${data.count} cambio(s) consolidado(s)`,
			position: "bottom-right",
			timeout: 3e3
		});
	});
}
function disconnectSocket() {
	if (socket) {
		socket.disconnect();
		socket = null;
	}
}
//#endregion
//#region src/stores/auth.ts
var useAuthStore = defineStore("auth", () => {
	const user = ref(null);
	const role = ref(null);
	const isAuthenticated = computed(() => role.value !== null);
	function loginAsAdmin() {
		role.value = "admin";
		user.value = null;
		localStorage.setItem("auth_role", "admin");
		localStorage.removeItem("auth_user");
		connectSocket();
	}
	function loginAsUser(usuario) {
		role.value = "user";
		user.value = usuario;
		localStorage.setItem("auth_role", "user");
		localStorage.setItem("auth_user", JSON.stringify(usuario));
		connectSocket();
	}
	function logout() {
		role.value = null;
		user.value = null;
		localStorage.removeItem("auth_role");
		localStorage.removeItem("auth_user");
		disconnectSocket();
	}
	function restoreSession() {
		const savedRole = localStorage.getItem("auth_role");
		const savedUser = localStorage.getItem("auth_user");
		if (savedRole === "admin") role.value = "admin";
		else if (savedRole === "user" && savedUser) {
			role.value = "user";
			user.value = JSON.parse(savedUser);
		}
	}
	function updateProfileFields(fields) {
		if (user.value) {
			user.value = {
				...user.value,
				...fields
			};
			localStorage.setItem("auth_user", JSON.stringify(user.value));
		}
	}
	return {
		user,
		role,
		isAuthenticated,
		loginAsAdmin,
		loginAsUser,
		logout,
		restoreSession,
		updateProfileFields
	};
});
//#endregion
//#region src/router/index.ts
function router_default() {
	const Router = createRouter({
		scrollBehavior: () => ({
			left: 0,
			top: 0
		}),
		routes,
		history: createWebHashHistory("")
	});
	Router.beforeEach((to, _from, next) => {
		const auth = useAuthStore();
		if (to.meta.requiresAuth && !auth.isAuthenticated) {
			next("/login");
			return;
		}
		if (to.meta.role === "admin" && auth.role !== "admin") {
			next("/user");
			return;
		}
		if (to.meta.role === "user" && auth.role === "admin") {
			next("/admin");
			return;
		}
		next();
	});
	return Router;
}
//#endregion
//#region .quasar/prod-capacitor-android/app.js
var RootComponent = defineComponent({
	name: "AppWrapper",
	setup(props) {
		onMounted(() => {
			SplashScreen.hide();
		});
		return () => h(App_default, props);
	}
});
async function app_default(createAppFn, quasarUserOptions) {
	const app = createAppFn(RootComponent);
	app.config.performance = true;
	app.use(vue_plugin_default, quasarUserOptions);
	app.config.globalProperties.$q.capacitor = window.Capacitor;
	const store = typeof stores_default === "function" ? await stores_default({}) : stores_default;
	app.use(store);
	const router = markRaw(typeof router_default === "function" ? await router_default({ store }) : router_default);
	store.use(({ store }) => {
		store.router = router;
	});
	return {
		app,
		store,
		router
	};
}
//#endregion
//#region node_modules/quasar/src/composables/private.use-history/use-history.js
function useHistory(showing, hide, hideOnRouteChange) {
	let historyEntry;
	function removeFromHistory() {
		if (historyEntry !== void 0) {
			History_default.remove(historyEntry);
			historyEntry = void 0;
		}
	}
	onBeforeUnmount(() => {
		if (showing.value) removeFromHistory();
	});
	return {
		removeFromHistory,
		addToHistory() {
			historyEntry = {
				condition: () => hideOnRouteChange.value,
				handler: hide
			};
			History_default.add(historyEntry);
		}
	};
}
//#endregion
//#region node_modules/quasar/src/composables/private.use-model-toggle/use-model-toggle.js
var useModelToggleProps = {
	modelValue: {
		type: Boolean,
		default: null
	},
	"onUpdate:modelValue": [Function, Array]
};
var useModelToggleEmits = [
	"beforeShow",
	"show",
	"beforeHide",
	"hide"
];
function useModelToggle({ showing, canShow, hideOnRouteChange, handleShow, handleHide, processOnMount }) {
	const vm = getCurrentInstance();
	const { props, emit, proxy } = vm;
	let payload;
	function toggle(evt) {
		if (showing.value) hide(evt);
		else show(evt);
	}
	function show(evt) {
		if (props.disable || evt?.qAnchorHandled === true || canShow !== void 0 && !canShow(evt)) return;
		const listener = props["onUpdate:modelValue"] !== void 0;
		if (listener && true) {
			emit("update:modelValue", true);
			payload = evt;
			nextTick$1(() => {
				if (payload === evt) payload = void 0;
			});
		}
		if (props.modelValue === null || !listener) processShow(evt);
	}
	function processShow(evt) {
		if (showing.value) return;
		showing.value = true;
		emit("beforeShow", evt);
		if (handleShow !== void 0) handleShow(evt);
		else emit("show", evt);
	}
	function hide(evt) {
		if (props.disable) return;
		const listener = props["onUpdate:modelValue"] !== void 0;
		if (listener && true) {
			emit("update:modelValue", false);
			payload = evt;
			nextTick$1(() => {
				if (payload === evt) payload = void 0;
			});
		}
		if (props.modelValue === null || !listener) processHide(evt);
	}
	function processHide(evt) {
		if (!showing.value) return;
		showing.value = false;
		emit("beforeHide", evt);
		if (handleHide !== void 0) handleHide(evt);
		else emit("hide", evt);
	}
	function processModelChange(val) {
		if (props.disable && val) {
			if (props["onUpdate:modelValue"] !== void 0) emit("update:modelValue", false);
		} else if (val === true !== showing.value) (val ? processShow : processHide)(payload);
	}
	watch(() => props.modelValue, processModelChange);
	if (hideOnRouteChange !== void 0 && vmHasRouter(vm)) watch(() => proxy.$route.fullPath, () => {
		if (hideOnRouteChange.value && showing.value) hide();
	});
	if (processOnMount) onMounted(() => {
		processModelChange(props.modelValue);
	});
	const publicMethods = {
		show,
		hide,
		toggle
	};
	Object.assign(proxy, publicMethods);
	return publicMethods;
}
//#endregion
//#region node_modules/quasar/src/composables/private.use-transition/use-transition.js
var useTransitionProps = {
	transitionShow: {
		type: String,
		default: "fade"
	},
	transitionHide: {
		type: String,
		default: "fade"
	},
	transitionDuration: {
		type: [String, Number],
		default: 300
	}
};
function useTransition(props, defaultShowFn = () => {}, defaultHideFn = () => {}) {
	return {
		transitionProps: computed(() => {
			const show = `q-transition--${props.transitionShow || defaultShowFn()}`;
			const hide = `q-transition--${props.transitionHide || defaultHideFn()}`;
			return {
				appear: true,
				enterFromClass: `${show}-enter-from`,
				enterActiveClass: `${show}-enter-active`,
				enterToClass: `${show}-enter-to`,
				leaveFromClass: `${hide}-leave-from`,
				leaveActiveClass: `${hide}-leave-active`,
				leaveToClass: `${hide}-leave-to`
			};
		}),
		transitionStyle: computed(() => `--q-transition-duration: ${props.transitionDuration}ms`)
	};
}
//#endregion
//#region node_modules/quasar/src/utils/private.portal/portal.js
var portalProxyList = [];
function getPortalProxy(el) {
	return portalProxyList.find((proxy) => proxy.contentEl !== null && proxy.contentEl.contains(el));
}
function closePortalMenus(proxy, evt) {
	do {
		if (proxy.$options.name === "QMenu") {
			proxy.hide(evt);
			if (proxy.$props.separateClosePopup) return getParentProxy(proxy);
		} else if (proxy.__qPortal) {
			const parent = getParentProxy(proxy);
			if (parent?.$options.name === "QPopupProxy") {
				proxy.hide(evt);
				return parent;
			}
			return proxy;
		}
		proxy = getParentProxy(proxy);
	} while (proxy !== void 0 && proxy !== null);
}
function closePortals(proxy, evt, depth) {
	while (depth !== 0 && proxy !== void 0 && proxy !== null) {
		if (proxy.__qPortal) {
			depth--;
			if (proxy.$options.name === "QMenu") {
				proxy = closePortalMenus(proxy, evt);
				continue;
			}
			proxy.hide(evt);
		}
		proxy = getParentProxy(proxy);
	}
}
//#endregion
//#region node_modules/quasar/src/composables/private.use-portal/use-portal.js
/**
* Noop internal component to ease testing
* of the teleported content.
*
* const wrapper = mount(QDialog, { ... })
* const teleportedWrapper = wrapper.findComponent({ name: 'QPortal' })
*/
var QPortal = createComponent({
	name: "QPortal",
	setup(_, { slots }) {
		return () => slots.default();
	}
});
function isOnGlobalDialog(vm) {
	vm = vm.parent;
	while (vm !== void 0 && vm !== null) {
		if (vm.type.name === "QGlobalDialog") return true;
		if (vm.type.name === "QDialog" || vm.type.name === "QMenu") return false;
		vm = vm.parent;
	}
	return false;
}
function usePortal(vm, innerRef, renderPortalContent, type) {
	const portalIsActive = ref(false);
	const portalIsAccessible = ref(false);
	let portalEl = null;
	const focusObj = {};
	const onGlobalDialog = type === "dialog" && isOnGlobalDialog(vm);
	function showPortal(isReady) {
		if (isReady) {
			removeFocusWaitFlag(focusObj);
			portalIsAccessible.value = true;
			return;
		}
		portalIsAccessible.value = false;
		if (!portalIsActive.value) {
			if (!onGlobalDialog && portalEl === null) portalEl = createGlobalNode(false, type);
			portalIsActive.value = true;
			portalProxyList.push(vm.proxy);
			addFocusWaitFlag(focusObj);
		}
	}
	function hidePortal(isReady) {
		portalIsAccessible.value = false;
		if (!isReady) return;
		removeFocusWaitFlag(focusObj);
		portalIsActive.value = false;
		const index = portalProxyList.indexOf(vm.proxy);
		if (index !== -1) portalProxyList.splice(index, 1);
		if (portalEl !== null) {
			removeGlobalNode(portalEl);
			portalEl = null;
		}
	}
	onUnmounted(() => {
		hidePortal(true);
	});
	vm.proxy.__qPortal = true;
	injectProp(vm.proxy, "contentEl", () => innerRef.value);
	return {
		showPortal,
		hidePortal,
		portalIsActive,
		portalIsAccessible,
		renderPortal: () => onGlobalDialog ? renderPortalContent() : portalIsActive.value ? [h(Teleport, { to: portalEl }, h(QPortal, renderPortalContent))] : void 0
	};
}
//#endregion
//#region node_modules/quasar/src/utils/scroll/scroll.js
var scrollTargetProp = [Element, String];
var scrollTargets = [
	null,
	document,
	document.body,
	document.scrollingElement,
	document.documentElement
];
function getScrollTarget(el, targetEl) {
	let target = getElement(targetEl);
	if (target === void 0) {
		if (el === void 0 || el === null) return window;
		target = el.closest(".scroll,.scroll-y,.overflow-auto");
	}
	return scrollTargets.includes(target) ? window : target;
}
function getVerticalScrollPosition(scrollTarget) {
	return scrollTarget === window ? window.pageYOffset || window.scrollY || document.body.scrollTop || 0 : scrollTarget.scrollTop;
}
function getHorizontalScrollPosition(scrollTarget) {
	return scrollTarget === window ? window.pageXOffset || window.scrollX || document.body.scrollLeft || 0 : scrollTarget.scrollLeft;
}
var size;
function getScrollbarWidth() {
	if (size !== void 0) return size;
	const inner = document.createElement("p"), outer = document.createElement("div");
	css(inner, {
		width: "100%",
		height: "200px"
	});
	css(outer, {
		position: "absolute",
		top: "0px",
		left: "0px",
		visibility: "hidden",
		width: "200px",
		height: "150px",
		overflow: "hidden"
	});
	outer.append(inner);
	document.body.append(outer);
	const w1 = inner.offsetWidth;
	outer.style.overflow = "scroll";
	let w2 = inner.offsetWidth;
	if (w1 === w2) w2 = outer.clientWidth;
	outer.remove();
	size = w1 - w2;
	return size;
}
var autoAndScroll = ["auto", "scroll"];
function hasScrollbar(el, onY = true) {
	if (!el || el.nodeType !== Node.ELEMENT_NODE) return false;
	return onY ? el.scrollHeight > el.clientHeight && (el.classList.contains("scroll") || el.classList.contains("overflow-auto") || autoAndScroll.includes(window.getComputedStyle(el)["overflow-y"])) : el.scrollWidth > el.clientWidth && (el.classList.contains("scroll") || el.classList.contains("overflow-auto") || autoAndScroll.includes(window.getComputedStyle(el)["overflow-x"]));
}
//#endregion
//#region node_modules/quasar/src/utils/scroll/prevent-scroll.js
var registered = 0, scrollPositionX, scrollPositionY, maxScrollTop, vpPendingUpdate = false, bodyLeft, bodyTop, href, closeTimer = null;
function onWheel(e) {
	if (shouldPreventScroll(e)) stopAndPrevent(e);
}
function shouldPreventScroll(e) {
	if (e.target === document.body || e.target.classList.contains("q-layout__backdrop")) return true;
	const path = getEventPath(e), shift = e.shiftKey && !e.deltaX, scrollY = !shift && Math.abs(e.deltaX) <= Math.abs(e.deltaY), delta = shift || scrollY ? e.deltaY : e.deltaX;
	for (let index = 0; index < path.length; index++) {
		const el = path[index];
		if (hasScrollbar(el, scrollY)) return scrollY ? delta < 0 && el.scrollTop === 0 ? true : delta > 0 && el.scrollTop + el.clientHeight === el.scrollHeight : delta < 0 && el.scrollLeft === 0 ? true : delta > 0 && el.scrollLeft + el.clientWidth === el.scrollWidth;
	}
	return true;
}
function onAppleScroll(e) {
	if (e.target === document) document.scrollingElement.scrollTop = document.scrollingElement.scrollTop;
}
function onAppleResize(evt) {
	if (vpPendingUpdate) return;
	vpPendingUpdate = true;
	requestAnimationFrame(() => {
		vpPendingUpdate = false;
		const { height } = evt.target, { clientHeight, scrollTop } = document.scrollingElement;
		if (maxScrollTop === void 0 || height !== window.innerHeight) {
			maxScrollTop = clientHeight - height;
			document.scrollingElement.scrollTop = scrollTop;
		}
		if (scrollTop > maxScrollTop) document.scrollingElement.scrollTop -= Math.ceil((scrollTop - maxScrollTop) / 8);
	});
}
function apply(action) {
	const body = document.body, hasViewport = window.visualViewport !== void 0;
	if (action === "add") {
		const { overflowY, overflowX } = window.getComputedStyle(body);
		scrollPositionX = getHorizontalScrollPosition(window);
		scrollPositionY = getVerticalScrollPosition(window);
		bodyLeft = body.style.left;
		bodyTop = body.style.top;
		href = window.location.href;
		body.style.left = `-${scrollPositionX}px`;
		body.style.top = `-${scrollPositionY}px`;
		if (overflowX !== "hidden" && (overflowX === "scroll" || body.scrollWidth > window.innerWidth)) body.classList.add("q-body--force-scrollbar-x");
		if (overflowY !== "hidden" && (overflowY === "scroll" || body.scrollHeight > window.innerHeight)) body.classList.add("q-body--force-scrollbar-y");
		body.classList.add("q-body--prevent-scroll");
		document.qScrollPrevented = true;
		if (client.is.ios) if (hasViewport) {
			window.scrollTo(0, 0);
			window.visualViewport.addEventListener("resize", onAppleResize, listenOpts.passiveCapture);
			window.visualViewport.addEventListener("scroll", onAppleResize, listenOpts.passiveCapture);
			window.scrollTo(0, 0);
		} else window.addEventListener("scroll", onAppleScroll, listenOpts.passiveCapture);
	}
	if (client.is.desktop && client.is.mac) window[`${action}EventListener`]("wheel", onWheel, listenOpts.notPassive);
	if (action === "remove") {
		if (client.is.ios) if (hasViewport) {
			window.visualViewport.removeEventListener("resize", onAppleResize, listenOpts.passiveCapture);
			window.visualViewport.removeEventListener("scroll", onAppleResize, listenOpts.passiveCapture);
		} else window.removeEventListener("scroll", onAppleScroll, listenOpts.passiveCapture);
		body.classList.remove("q-body--prevent-scroll", "q-body--force-scrollbar-x", "q-body--force-scrollbar-y");
		document.qScrollPrevented = false;
		body.style.left = bodyLeft;
		body.style.top = bodyTop;
		if (window.location.href === href) window.scrollTo(scrollPositionX, scrollPositionY);
		maxScrollTop = void 0;
	}
}
function preventScroll(state) {
	let action = "add";
	if (state === true) {
		registered++;
		if (closeTimer !== null) {
			clearTimeout(closeTimer);
			closeTimer = null;
			return;
		}
		if (registered > 1) return;
	} else {
		if (registered === 0) return;
		registered--;
		if (registered > 0) return;
		action = "remove";
		if (client.is.ios && client.is.nativeMobile) {
			if (closeTimer !== null) clearTimeout(closeTimer);
			closeTimer = setTimeout(() => {
				apply(action);
				closeTimer = null;
			}, 100);
			return;
		}
	}
	apply(action);
}
//#endregion
//#region node_modules/quasar/src/composables/private.use-prevent-scroll/use-prevent-scroll.js
function usePreventScroll() {
	let currentState;
	return { preventBodyScroll(state) {
		if (state !== currentState && (currentState !== void 0 || state)) {
			currentState = state;
			preventScroll(state);
		}
	} };
}
//#endregion
//#region node_modules/quasar/src/utils/private.keyboard/escape-key.js
var handlers$1 = [];
var escDown;
function onKeydown$2(evt) {
	escDown = evt.keyCode === 27;
}
function onBlur() {
	if (escDown) escDown = false;
}
function onKeyup(evt) {
	if (escDown) {
		escDown = false;
		if (isKeyCode(evt, 27)) handlers$1.at(-1)(evt);
	}
}
function update(action) {
	window[action]("keydown", onKeydown$2);
	window[action]("blur", onBlur);
	window[action]("keyup", onKeyup);
	escDown = false;
}
function addEscapeKey(fn) {
	if (client.is.desktop) {
		handlers$1.push(fn);
		if (handlers$1.length === 1) update("addEventListener");
	}
}
function removeEscapeKey(fn) {
	const index = handlers$1.indexOf(fn);
	if (index !== -1) {
		handlers$1.splice(index, 1);
		if (handlers$1.length === 0) update("removeEventListener");
	}
}
//#endregion
//#region node_modules/quasar/src/utils/private.focus/focusout.js
var handlers = [];
function trigger(e) {
	handlers.at(-1)(e);
}
function addFocusout(fn) {
	if (client.is.desktop) {
		handlers.push(fn);
		if (handlers.length === 1) document.body.addEventListener("focusin", trigger);
	}
}
function removeFocusout(fn) {
	const index = handlers.indexOf(fn);
	if (index !== -1) {
		handlers.splice(index, 1);
		if (handlers.length === 0) document.body.removeEventListener("focusin", trigger);
	}
}
//#endregion
//#region node_modules/quasar/src/components/dialog/QDialog.js
var maximizedModals = 0;
var positionClass = {
	standard: "fixed-full flex-center",
	top: "fixed-top justify-center",
	bottom: "fixed-bottom justify-center",
	right: "fixed-right items-center",
	left: "fixed-left items-center"
};
var defaultTransitions = {
	standard: ["scale", "scale"],
	top: ["slide-down", "slide-up"],
	bottom: ["slide-up", "slide-down"],
	right: ["slide-left", "slide-right"],
	left: ["slide-right", "slide-left"]
};
var QDialog_default = createComponent({
	name: "QDialog",
	inheritAttrs: false,
	props: {
		...useModelToggleProps,
		...useTransitionProps,
		transitionShow: String,
		transitionHide: String,
		persistent: Boolean,
		autoClose: Boolean,
		allowFocusOutside: Boolean,
		noEscDismiss: Boolean,
		noBackdropDismiss: Boolean,
		noRouteDismiss: Boolean,
		noRefocus: Boolean,
		noFocus: Boolean,
		noShake: Boolean,
		seamless: Boolean,
		maximized: Boolean,
		fullWidth: Boolean,
		fullHeight: Boolean,
		square: Boolean,
		backdropFilter: String,
		position: {
			type: String,
			default: "standard",
			validator: (val) => [
				"standard",
				"top",
				"bottom",
				"left",
				"right"
			].includes(val)
		}
	},
	emits: [
		...useModelToggleEmits,
		"shake",
		"click",
		"escapeKey"
	],
	setup(props, { slots, emit, attrs }) {
		const vm = getCurrentInstance();
		const innerRef = ref(null);
		const showing = ref(false);
		const animating = ref(false);
		let shakeTimeout = null, refocusTarget = null, isMaximized = false, avoidAutoClose = false;
		const hideOnRouteChange = computed(() => !props.persistent && !props.noRouteDismiss && !props.seamless);
		const { preventBodyScroll } = usePreventScroll();
		const { registerTimeout } = useTimeout();
		const { registerTick, removeTick } = useTick();
		const { transitionProps, transitionStyle } = useTransition(props, () => defaultTransitions[props.position][0], () => defaultTransitions[props.position][1]);
		const backdropStyle = computed(() => transitionStyle.value + (props.backdropFilter !== void 0 ? `;backdrop-filter:${props.backdropFilter};-webkit-backdrop-filter:${props.backdropFilter}` : ""));
		const { showPortal, hidePortal, portalIsAccessible, renderPortal } = usePortal(vm, innerRef, renderPortalContent, "dialog");
		const { hide } = useModelToggle({
			showing,
			hideOnRouteChange,
			handleShow,
			handleHide,
			processOnMount: true
		});
		const { addToHistory, removeFromHistory } = useHistory(showing, hide, hideOnRouteChange);
		const classes = computed(() => `q-dialog__inner flex no-pointer-events q-dialog__inner--${props.maximized ? "maximized" : "minimized"} q-dialog__inner--${props.position} ${positionClass[props.position]}` + (animating.value ? " q-dialog__inner--animating" : "") + (props.fullWidth ? " q-dialog__inner--fullwidth" : "") + (props.fullHeight ? " q-dialog__inner--fullheight" : "") + (props.square ? " q-dialog__inner--square" : ""));
		const useBackdrop = computed(() => showing.value && !props.seamless);
		const onEvents = computed(() => props.autoClose ? { onClick: onAutoClose } : {});
		const rootClasses = computed(() => [`q-dialog fullscreen no-pointer-events q-dialog--${useBackdrop.value ? "modal" : "seamless"}`, attrs.class]);
		watch(() => props.maximized, (state) => {
			if (showing.value) updateMaximized(state);
		});
		watch(useBackdrop, (val) => {
			preventBodyScroll(val);
			if (val) {
				addFocusout(onFocusChange);
				addEscapeKey(onEscapeKey);
			} else {
				removeFocusout(onFocusChange);
				removeEscapeKey(onEscapeKey);
			}
		});
		function handleShow(evt) {
			addToHistory();
			refocusTarget = !props.noRefocus && document.activeElement !== null ? document.activeElement : null;
			updateMaximized(props.maximized);
			showPortal();
			animating.value = true;
			if (props.noFocus) removeTick();
			else {
				document.activeElement?.blur();
				registerTick(focus);
			}
			registerTimeout(() => {
				if (vm.proxy.$q.platform.is.ios) {
					if (!props.seamless && document.activeElement) {
						const { top, bottom } = document.activeElement.getBoundingClientRect(), { innerHeight } = window, height = window.visualViewport !== void 0 ? window.visualViewport.height : innerHeight;
						if (top > 0 && bottom > height / 2) document.scrollingElement.scrollTop = Math.min(document.scrollingElement.scrollHeight - height, bottom >= innerHeight ? Infinity : Math.ceil(document.scrollingElement.scrollTop + bottom - height / 2));
						document.activeElement.scrollIntoView();
					}
					avoidAutoClose = true;
					innerRef.value.click();
					avoidAutoClose = false;
				}
				showPortal(true);
				animating.value = false;
				emit("show", evt);
			}, props.transitionDuration);
		}
		function handleHide(evt) {
			removeTick();
			removeFromHistory();
			cleanup(true);
			animating.value = true;
			hidePortal();
			if (refocusTarget !== null) {
				((evt?.type.indexOf("key") === 0 ? refocusTarget.closest("[tabindex]:not([tabindex^=\"-\"])") : void 0) || refocusTarget).focus();
				refocusTarget = null;
			}
			registerTimeout(() => {
				hidePortal(true);
				animating.value = false;
				emit("hide", evt);
			}, props.transitionDuration);
		}
		function focus(selector) {
			addFocusFn(() => {
				let node = innerRef.value;
				if (node === null) return;
				if (selector !== void 0) {
					const target = node.querySelector(selector);
					if (target !== null) {
						target.focus({ preventScroll: true });
						return;
					}
				}
				if (!node.contains(document.activeElement)) {
					node = node.querySelector("[autofocus][tabindex], [data-autofocus][tabindex]") || node.querySelector("[autofocus] [tabindex], [data-autofocus] [tabindex]") || node.querySelector("[autofocus], [data-autofocus]") || node;
					node.focus({ preventScroll: true });
				}
			});
		}
		function shake(focusTarget) {
			if (focusTarget && typeof focusTarget.focus === "function") focusTarget.focus({ preventScroll: true });
			else focus();
			emit("shake");
			const node = innerRef.value;
			if (node !== null) {
				node.classList.remove("q-animate--scale");
				node.classList.add("q-animate--scale");
				if (shakeTimeout !== null) clearTimeout(shakeTimeout);
				shakeTimeout = setTimeout(() => {
					shakeTimeout = null;
					if (innerRef.value !== null) {
						node.classList.remove("q-animate--scale");
						focus();
					}
				}, 170);
			}
		}
		function onEscapeKey() {
			if (!props.seamless) if (props.persistent || props.noEscDismiss) {
				if (!props.maximized && !props.noShake) shake();
			} else {
				emit("escapeKey");
				hide();
			}
		}
		function cleanup(hiding) {
			if (shakeTimeout !== null) {
				clearTimeout(shakeTimeout);
				shakeTimeout = null;
			}
			if (hiding || showing.value) {
				updateMaximized(false);
				if (!props.seamless) {
					preventBodyScroll(false);
					removeFocusout(onFocusChange);
					removeEscapeKey(onEscapeKey);
				}
			}
			if (!hiding) refocusTarget = null;
		}
		function updateMaximized(active) {
			if (active) {
				if (!isMaximized) {
					if (maximizedModals < 1) document.body.classList.add("q-body--dialog");
					maximizedModals++;
					isMaximized = true;
				}
			} else if (isMaximized) {
				if (maximizedModals < 2) document.body.classList.remove("q-body--dialog");
				maximizedModals--;
				isMaximized = false;
			}
		}
		function onAutoClose(e) {
			if (!avoidAutoClose) {
				hide(e);
				emit("click", e);
			}
		}
		function onBackdropClick(e) {
			if (!props.persistent && !props.noBackdropDismiss) hide(e);
			else if (!props.noShake) shake();
		}
		function onFocusChange(evt) {
			if (!props.allowFocusOutside && portalIsAccessible.value && !childHasFocus(innerRef.value, evt.target)) focus("[tabindex]:not([tabindex=\"-1\"])");
		}
		Object.assign(vm.proxy, {
			focus,
			shake,
			__updateRefocusTarget(target) {
				refocusTarget = target || null;
			}
		});
		onBeforeUnmount(cleanup);
		function renderPortalContent() {
			return h("div", {
				role: "dialog",
				"aria-modal": useBackdrop.value ? "true" : "false",
				...attrs,
				class: rootClasses.value
			}, [h(Transition, {
				name: "q-transition--fade",
				appear: true
			}, () => useBackdrop.value ? h("div", {
				class: "q-dialog__backdrop fixed-full",
				style: backdropStyle.value,
				"aria-hidden": "true",
				onClick: onBackdropClick
			}) : null), h(Transition, transitionProps.value, () => showing.value ? h("div", {
				ref: innerRef,
				class: classes.value,
				style: transitionStyle.value,
				tabindex: -1,
				...onEvents.value
			}, hSlot(slots.default)) : null)]);
		}
		return renderPortal;
	}
});
//#endregion
//#region node_modules/quasar/src/components/card/QCard.js
var QCard_default = createComponent({
	name: "QCard",
	props: {
		...useDarkProps,
		tag: {
			type: String,
			default: "div"
		},
		square: Boolean,
		flat: Boolean,
		bordered: Boolean
	},
	setup(props, { slots }) {
		const { proxy: { $q } } = getCurrentInstance();
		const isDark = useDark(props, $q);
		const classes = computed(() => "q-card" + (isDark.value ? " q-card--dark q-dark" : "") + (props.bordered ? " q-card--bordered" : "") + (props.square ? " q-card--square no-border-radius" : "") + (props.flat ? " q-card--flat no-shadow" : ""));
		return () => h(props.tag, { class: classes.value }, hSlot(slots.default));
	}
});
//#endregion
//#region node_modules/quasar/src/components/card/QCardSection.js
var QCardSection_default = createComponent({
	name: "QCardSection",
	props: {
		tag: {
			type: String,
			default: "div"
		},
		horizontal: Boolean
	},
	setup(props, { slots }) {
		const classes = computed(() => `q-card__section q-card__section--${props.horizontal ? "horiz row no-wrap" : "vert"}`);
		return () => h(props.tag, { class: classes.value }, hSlot(slots.default));
	}
});
//#endregion
//#region node_modules/quasar/src/components/card/QCardActions.js
var QCardActions_default = createComponent({
	name: "QCardActions",
	props: {
		...useAlignProps,
		vertical: Boolean
	},
	setup(props, { slots }) {
		const alignClass = useAlign(props);
		const classes = computed(() => `q-card__actions ${alignClass.value} q-card__actions--${props.vertical ? "vert column" : "horiz row"}`);
		return () => h("div", { class: classes.value }, hSlot(slots.default));
	}
});
//#endregion
//#region node_modules/quasar/src/components/separator/QSeparator.js
var insetMap = {
	true: "inset",
	item: "item-inset",
	"item-thumbnail": "item-thumbnail-inset"
};
var margins = {
	xs: 2,
	sm: 4,
	md: 8,
	lg: 16,
	xl: 24
};
var QSeparator_default = createComponent({
	name: "QSeparator",
	props: {
		...useDarkProps,
		spaced: [Boolean, String],
		inset: [Boolean, String],
		vertical: Boolean,
		color: String,
		size: String
	},
	setup(props) {
		const isDark = useDark(props, getCurrentInstance().proxy.$q);
		const orientation = computed(() => props.vertical ? "vertical" : "horizontal");
		const orientClass = computed(() => ` q-separator--${orientation.value}`);
		const insetClass = computed(() => props.inset ? `${orientClass.value}-${insetMap[props.inset]}` : "");
		const classes = computed(() => `q-separator${orientClass.value}${insetClass.value}` + (props.color !== void 0 ? ` bg-${props.color}` : "") + (isDark.value ? " q-separator--dark" : ""));
		const style = computed(() => {
			const acc = {};
			if (props.size !== void 0) acc[props.vertical ? "width" : "height"] = props.size;
			if (props.spaced) {
				const size = props.spaced === true ? `${margins.md}px` : props.spaced in margins ? `${margins[props.spaced]}px` : props.spaced;
				const dir = props.vertical ? ["Left", "Right"] : ["Top", "Bottom"];
				acc[`margin${dir[0]}`] = acc[`margin${dir[1]}`] = size;
			}
			return acc;
		});
		return () => h("hr", {
			class: classes.value,
			style: style.value,
			"aria-orientation": orientation.value
		});
	}
});
//#endregion
//#region node_modules/quasar/src/utils/uid/uid.js
function createUidFn() {
	if (typeof crypto === "undefined") return () => {
		throw new Error("[Quasar uid()] Secure RNG not available. Cannot generate collision-resistant UUID.");
	};
	if (crypto.randomUUID) return () => crypto.randomUUID();
	const hex = Array.from({ length: 256 }, (_, i) => (i + 256).toString(16).slice(1));
	let buf, bufIdx;
	return () => {
		if (buf === void 0 || bufIdx + 16 > 4096) {
			bufIdx = 0;
			buf = /* @__PURE__ */ new Uint8Array(4096);
			crypto.getRandomValues(buf);
		}
		const i = bufIdx;
		bufIdx += 16;
		buf[i + 6] = buf[i + 6] & 15 | 64;
		buf[i + 8] = buf[i + 8] & 63 | 128;
		return hex[buf[i]] + hex[buf[i + 1]] + hex[buf[i + 2]] + hex[buf[i + 3]] + "-" + hex[buf[i + 4]] + hex[buf[i + 5]] + "-" + hex[buf[i + 6]] + hex[buf[i + 7]] + "-" + hex[buf[i + 8]] + hex[buf[i + 9]] + "-" + hex[buf[i + 10]] + hex[buf[i + 11]] + hex[buf[i + 12]] + hex[buf[i + 13]] + hex[buf[i + 14]] + hex[buf[i + 15]];
	};
}
var uid_default = createUidFn();
//#endregion
//#region node_modules/quasar/src/composables/use-id/use-id.js
function parseValue(val) {
	return val === void 0 || val === null ? null : val;
}
function getId(val, required) {
	return val === void 0 || val === null ? required ? `f_${uid_default()}` : null : val;
}
/**
* Returns an "id" which is a ref() that can be used as
* a unique identifier to apply to a DOM node attribute.
*
* On SSR, it takes care of generating the id on the client side (only) to
* avoid hydration errors.
*/
function useId({ getValue, required = true } = {}) {
	if (isRuntimeSsrPreHydration.value) {
		const id = getValue !== void 0 ? ref(parseValue(getValue())) : ref(null);
		if (required && id.value === null) onMounted(() => {
			id.value = `f_${uid_default()}`;
		});
		if (getValue !== void 0) watch(getValue, (newId) => {
			id.value = getId(newId, required);
		});
		return id;
	}
	return getValue !== void 0 ? computed(() => getId(getValue(), required)) : ref(`f_${uid_default()}`);
}
//#endregion
//#region node_modules/quasar/src/composables/use-split-attrs/use-split-attrs.js
var listenerRE = /^on[A-Z]/;
function useSplitAttrs() {
	const { attrs, vnode } = getCurrentInstance();
	const acc = {
		listeners: ref({}),
		attributes: ref({})
	};
	function update() {
		const attributes = {};
		const listeners = {};
		for (const key in attrs) if (key !== "class" && key !== "style" && !listenerRE.test(key)) attributes[key] = attrs[key];
		for (const key in vnode.props) if (listenerRE.test(key)) listeners[key] = vnode.props[key];
		acc.attributes.value = attributes;
		acc.listeners.value = listeners;
	}
	onBeforeUpdate(update);
	update();
	return acc;
}
//#endregion
//#region node_modules/quasar/src/composables/use-form/use-form-child.js
function useFormChild({ validate, resetValidation, requiresQForm }) {
	const $form = inject(formKey, false);
	if ($form !== false) {
		const { props, proxy } = getCurrentInstance();
		Object.assign(proxy, {
			validate,
			resetValidation
		});
		watch(() => props.disable, (val) => {
			if (val) {
				if (typeof resetValidation === "function") resetValidation();
				$form.unbindComponent(proxy);
			} else $form.bindComponent(proxy);
		});
		onMounted(() => {
			if (!props.disable) $form.bindComponent(proxy);
		});
		onBeforeUnmount(() => {
			if (!props.disable) $form.unbindComponent(proxy);
		});
	} else if (requiresQForm) console.error("Parent QForm not found on useFormChild()!");
}
//#endregion
//#region node_modules/quasar/src/utils/patterns/patterns.js
var hexRE = /^#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/, hexaRE = /^#[0-9a-fA-F]{4}([0-9a-fA-F]{4})?$/, hexOrHexaRE = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/, rgbRE = /^rgb\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5])\)$/, rgbaRE = /^rgba\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),(0|0\.[0-9]+[1-9]|0\.[1-9]+|1)\)$/, dateRE = /^-?[\d]+\/[0-1]\d\/[0-3]\d$/, timeRE = /^([0-1]?\d|2[0-3]):[0-5]\d$/, fulltimeRE = /^([0-1]?\d|2[0-3]):[0-5]\d:[0-5]\d$/, timeOrFulltimeRE = /^([0-1]?\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/, emailRE = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var testPattern = {
	date: (v) => dateRE.test(v),
	time: (v) => timeRE.test(v),
	fulltime: (v) => fulltimeRE.test(v),
	timeOrFulltime: (v) => timeOrFulltimeRE.test(v),
	email: (v) => emailRE.test(v),
	hexColor: (v) => hexRE.test(v),
	hexaColor: (v) => hexaRE.test(v),
	hexOrHexaColor: (v) => hexOrHexaRE.test(v),
	rgbColor: (v) => rgbRE.test(v),
	rgbaColor: (v) => rgbaRE.test(v),
	rgbOrRgbaColor: (v) => rgbRE.test(v) || rgbaRE.test(v),
	hexOrRgbColor: (v) => hexRE.test(v) || rgbRE.test(v),
	hexaOrRgbaColor: (v) => hexaRE.test(v) || rgbaRE.test(v),
	anyColor: (v) => hexOrHexaRE.test(v) || rgbRE.test(v) || rgbaRE.test(v)
};
//#endregion
//#region node_modules/quasar/src/composables/private.use-validate/use-validate.js
var lazyRulesValues = [
	true,
	false,
	"ondemand"
];
var useValidateProps = {
	modelValue: {},
	error: {
		type: Boolean,
		default: null
	},
	errorMessage: String,
	noErrorIcon: Boolean,
	rules: Array,
	reactiveRules: Boolean,
	lazyRules: {
		type: [Boolean, String],
		default: false,
		validator: (v) => lazyRulesValues.includes(v)
	}
};
function useValidate(focused, innerLoading) {
	const { props, proxy } = getCurrentInstance();
	const innerError = ref(false);
	const innerErrorMessage = ref(null);
	const isDirtyModel = ref(false);
	useFormChild({
		validate,
		resetValidation
	});
	let validateIndex = 0, unwatchRules;
	const hasRules = computed(() => props.rules !== void 0 && props.rules !== null && props.rules.length !== 0);
	const canDebounceValidate = computed(() => !props.disable && hasRules.value && !innerLoading.value);
	const hasError = computed(() => props.error === true || innerError.value);
	const errorMessage = computed(() => typeof props.errorMessage === "string" && props.errorMessage.length !== 0 ? props.errorMessage : innerErrorMessage.value);
	watch(() => props.modelValue, () => {
		isDirtyModel.value = true;
		if (canDebounceValidate.value && props.lazyRules === false) debouncedValidate();
	});
	function onRulesChange() {
		if (props.lazyRules !== "ondemand" && canDebounceValidate.value && isDirtyModel.value) debouncedValidate();
	}
	watch(() => props.reactiveRules, (val) => {
		if (val) {
			if (unwatchRules === void 0) unwatchRules = watch(() => props.rules, onRulesChange, {
				immediate: true,
				deep: true
			});
		} else if (unwatchRules !== void 0) {
			unwatchRules();
			unwatchRules = void 0;
		}
	}, { immediate: true });
	watch(() => props.lazyRules, onRulesChange);
	watch(focused, (val) => {
		if (val) isDirtyModel.value = true;
		else if (canDebounceValidate.value && props.lazyRules !== "ondemand") debouncedValidate();
	});
	function resetValidation() {
		validateIndex++;
		innerLoading.value = false;
		isDirtyModel.value = false;
		innerError.value = false;
		innerErrorMessage.value = null;
		debouncedValidate.cancel();
	}
	function validate(val = props.modelValue) {
		if (props.disable || !hasRules.value) return true;
		const index = ++validateIndex;
		const setDirty = innerLoading.value ? () => {} : () => {
			isDirtyModel.value = true;
		};
		const update = (hasErr, msg) => {
			if (hasErr) setDirty();
			innerError.value = hasErr;
			innerErrorMessage.value = msg || null;
			innerLoading.value = false;
		};
		const promises = [];
		for (let i = 0; i < props.rules.length; i++) {
			const rule = props.rules[i];
			let res;
			if (typeof rule === "function") res = rule(val, testPattern);
			else if (typeof rule === "string" && testPattern[rule] !== void 0) res = testPattern[rule](val);
			if (res === false || typeof res === "string") {
				update(true, res);
				return false;
			} else if (res !== true && res !== void 0) promises.push(res);
		}
		if (promises.length === 0) {
			update(false);
			return true;
		}
		innerLoading.value = true;
		return Promise.all(promises).then((res) => {
			if (res === void 0 || !Array.isArray(res) || res.length === 0) {
				if (index === validateIndex) update(false);
				return true;
			}
			const msg = res.find((r) => r === false || typeof r === "string");
			if (index === validateIndex) update(msg !== void 0, msg);
			return msg === void 0;
		}, (err) => {
			if (index === validateIndex) {
				console.error(err);
				update(true);
			}
			return false;
		});
	}
	const debouncedValidate = debounce(validate, 0);
	onBeforeUnmount(() => {
		unwatchRules?.();
		debouncedValidate.cancel();
	});
	Object.assign(proxy, {
		resetValidation,
		validate
	});
	injectProp(proxy, "hasError", () => hasError.value);
	return {
		isDirtyModel,
		hasRules,
		hasError,
		errorMessage,
		validate,
		resetValidation
	};
}
//#endregion
//#region node_modules/quasar/src/composables/private.use-field/use-field.js
function fieldValueIsFilled(val) {
	return val !== void 0 && val !== null && String(val).length !== 0;
}
var useFieldProps = {
	...useDarkProps,
	...useValidateProps,
	label: String,
	stackLabel: Boolean,
	hint: String,
	hideHint: Boolean,
	prefix: String,
	suffix: String,
	labelColor: String,
	color: String,
	bgColor: String,
	filled: Boolean,
	outlined: Boolean,
	borderless: Boolean,
	standout: [Boolean, String],
	square: Boolean,
	loading: Boolean,
	labelSlot: Boolean,
	bottomSlots: Boolean,
	hideBottomSpace: Boolean,
	rounded: Boolean,
	dense: Boolean,
	itemAligned: Boolean,
	counter: Boolean,
	clearable: Boolean,
	clearIcon: String,
	disable: Boolean,
	readonly: Boolean,
	autofocus: Boolean,
	for: String,
	maxlength: [Number, String]
};
var useFieldEmits = [
	"update:modelValue",
	"clear",
	"focus",
	"blur"
];
function useFieldState({ requiredForAttr = true, tagProp, changeEvent = false } = {}) {
	const { props, proxy } = getCurrentInstance();
	const isDark = useDark(props, proxy.$q);
	const targetUid = useId({
		required: requiredForAttr,
		getValue: () => props.for
	});
	return {
		requiredForAttr,
		changeEvent,
		tag: tagProp ? computed(() => props.tag) : { value: "label" },
		isDark,
		editable: computed(() => !props.disable && !props.readonly),
		innerLoading: ref(false),
		focused: ref(false),
		hasPopupOpen: false,
		splitAttrs: useSplitAttrs(),
		targetUid,
		rootRef: ref(null),
		targetRef: ref(null),
		controlRef: ref(null)
	};
}
function getInnerAppendNode(key, content) {
	return content === null ? null : h("div", {
		key,
		class: "q-field__append q-field__marginal row no-wrap items-center q-anchor--skip"
	}, content);
}
function useField(state) {
	const { props, emit, slots, attrs, proxy } = getCurrentInstance();
	const { $q } = proxy;
	let focusoutTimer = null;
	if (state.hasValue === void 0) state.hasValue = computed(() => fieldValueIsFilled(props.modelValue));
	if (state.emitValue === void 0) state.emitValue = (value) => {
		emit("update:modelValue", value);
	};
	if (state.controlEvents === void 0) state.controlEvents = {
		onFocusin: onControlFocusin,
		onFocusout: onControlFocusout
	};
	Object.assign(state, {
		clearValue,
		onControlFocusin,
		onControlFocusout,
		focus
	});
	if (state.computedCounter === void 0) state.computedCounter = computed(() => {
		if (props.counter) {
			const len = typeof props.modelValue === "string" || typeof props.modelValue === "number" ? String(props.modelValue).length : Array.isArray(props.modelValue) ? props.modelValue.length : 0;
			const max = props.maxlength !== void 0 ? props.maxlength : props.maxValues;
			return len + (max !== void 0 ? " / " + max : "");
		}
	});
	const { isDirtyModel, hasRules, hasError, errorMessage, resetValidation } = useValidate(state.focused, state.innerLoading);
	const floatingLabel = state.floatingLabel !== void 0 ? computed(() => props.stackLabel || state.focused.value || state.floatingLabel.value) : computed(() => props.stackLabel || state.focused.value || state.hasValue.value);
	const shouldRenderBottom = computed(() => props.bottomSlots || props.hint !== void 0 || hasRules.value || props.counter || props.error !== null);
	const styleType = computed(() => {
		if (props.filled) return "filled";
		if (props.outlined) return "outlined";
		if (props.borderless) return "borderless";
		if (props.standout) return "standout";
		return "standard";
	});
	const classes = computed(() => `q-field row no-wrap items-start q-field--${styleType.value}` + (state.fieldClass !== void 0 ? ` ${state.fieldClass.value}` : "") + (props.rounded ? " q-field--rounded" : "") + (props.square ? " q-field--square" : "") + (floatingLabel.value ? " q-field--float" : "") + (hasLabel.value ? " q-field--labeled" : "") + (props.dense ? " q-field--dense" : "") + (props.itemAligned ? " q-field--item-aligned q-item-type" : "") + (state.isDark.value ? " q-field--dark" : "") + (state.getControl === void 0 ? " q-field--auto-height" : "") + (state.focused.value ? " q-field--focused" : "") + (hasError.value ? " q-field--error" : "") + (hasError.value || state.focused.value ? " q-field--highlighted" : "") + (!props.hideBottomSpace && shouldRenderBottom.value ? " q-field--with-bottom" : "") + (props.disable ? " q-field--disabled" : props.readonly ? " q-field--readonly" : ""));
	const contentClass = computed(() => "q-field__control relative-position row no-wrap" + (props.bgColor !== void 0 ? ` bg-${props.bgColor}` : "") + (hasError.value ? " text-negative" : typeof props.standout === "string" && props.standout.length !== 0 && state.focused.value ? ` ${props.standout}` : props.color !== void 0 ? ` text-${props.color}` : ""));
	const hasLabel = computed(() => props.labelSlot || props.label !== void 0);
	const labelClass = computed(() => "q-field__label no-pointer-events absolute ellipsis" + (props.labelColor !== void 0 && !hasError.value ? ` text-${props.labelColor}` : ""));
	const controlSlotScope = computed(() => ({
		id: state.targetUid.value,
		editable: state.editable.value,
		focused: state.focused.value,
		floatingLabel: floatingLabel.value,
		modelValue: props.modelValue,
		emitValue: state.emitValue
	}));
	const attributes = computed(() => {
		const acc = {};
		if (state.targetUid.value) acc.for = state.targetUid.value;
		if (props.disable) acc["aria-disabled"] = "true";
		return acc;
	});
	function focusHandler() {
		const el = document.activeElement;
		let target = state.targetRef?.value;
		if (target && (el === null || el.id !== state.targetUid.value)) {
			if (!target.hasAttribute("tabindex")) target = target.querySelector("[tabindex]");
			if (target !== el) target?.focus({ preventScroll: true });
		}
	}
	function focus() {
		addFocusFn(focusHandler);
	}
	function blur() {
		removeFocusFn(focusHandler);
		const el = document.activeElement;
		if (el !== null && state.rootRef.value.contains(el)) el.blur();
	}
	function onControlFocusin(e) {
		if (focusoutTimer !== null) {
			clearTimeout(focusoutTimer);
			focusoutTimer = null;
		}
		if (state.editable.value && !state.focused.value) {
			state.focused.value = true;
			emit("focus", e);
		}
	}
	function onControlFocusout(e, then) {
		if (focusoutTimer !== null) clearTimeout(focusoutTimer);
		focusoutTimer = setTimeout(() => {
			focusoutTimer = null;
			if (document.hasFocus() && (state.hasPopupOpen || state.controlRef === void 0 || state.controlRef.value === null || state.controlRef.value.contains(document.activeElement))) return;
			if (state.focused.value) {
				state.focused.value = false;
				emit("blur", e);
			}
			then?.();
		});
	}
	function clearValue(e) {
		stopAndPrevent(e);
		if (!$q.platform.is.mobile) (state.targetRef?.value || state.rootRef.value).focus();
		else if (state.rootRef.value.contains(document.activeElement)) document.activeElement.blur();
		if (props.type === "file") state.inputRef.value.value = null;
		emit("update:modelValue", null);
		if (state.changeEvent) emit("change", null);
		emit("clear", props.modelValue);
		nextTick$1(() => {
			const isDirty = isDirtyModel.value;
			resetValidation();
			isDirtyModel.value = isDirty;
		});
	}
	function onClearableKeyup(evt) {
		if ([13, 32].includes(evt.keyCode)) clearValue(evt);
	}
	function getContent() {
		const node = [];
		if (slots.prepend !== void 0) node.push(h("div", {
			class: "q-field__prepend q-field__marginal row no-wrap items-center",
			key: "prepend",
			onClick: prevent
		}, slots.prepend()));
		node.push(h("div", { class: "q-field__control-container col relative-position row no-wrap q-anchor--skip" }, getControlContainer()));
		if (hasError.value && !props.noErrorIcon) node.push(getInnerAppendNode("error", [h(QIcon_default, {
			name: $q.iconSet.field.error,
			color: "negative"
		})]));
		if (props.loading || state.innerLoading.value) node.push(getInnerAppendNode("inner-loading-append", slots.loading !== void 0 ? slots.loading() : [h(QSpinner_default, { color: props.color })]));
		else if (props.clearable && state.hasValue.value && state.editable.value) node.push(getInnerAppendNode("inner-clearable-append", [h(QIcon_default, {
			class: "q-field__focusable-action",
			name: props.clearIcon || $q.iconSet.field.clear,
			tabindex: 0,
			role: "button",
			"aria-hidden": "false",
			"aria-label": $q.lang.label.clear,
			onKeyup: onClearableKeyup,
			onClick: clearValue
		})]));
		if (slots.append !== void 0) node.push(h("div", {
			class: "q-field__append q-field__marginal row no-wrap items-center",
			key: "append",
			onClick: prevent
		}, slots.append()));
		if (state.getInnerAppend !== void 0) node.push(getInnerAppendNode("inner-append", state.getInnerAppend()));
		if (state.getControlChild !== void 0) node.push(state.getControlChild());
		return node;
	}
	function getControlContainer() {
		const node = [];
		if (props.prefix !== void 0 && props.prefix !== null) node.push(h("div", { class: "q-field__prefix no-pointer-events row items-center" }, props.prefix));
		if (state.getShadowControl !== void 0 && state.hasShadow.value) node.push(state.getShadowControl());
		if (hasLabel.value) node.push(h("div", { class: labelClass.value }, hSlot(slots.label, props.label)));
		if (state.getControl !== void 0) node.push(state.getControl());
		else if (slots.rawControl !== void 0) node.push(slots.rawControl());
		else if (slots.control !== void 0) node.push(h("div", {
			ref: state.targetRef,
			class: "q-field__native row",
			tabindex: -1,
			...state.splitAttrs.attributes.value,
			"data-autofocus": props.autofocus || void 0
		}, slots.control(controlSlotScope.value)));
		if (props.suffix !== void 0 && props.suffix !== null) node.push(h("div", { class: "q-field__suffix no-pointer-events row items-center" }, props.suffix));
		return node.concat(hSlot(slots.default));
	}
	function getBottom() {
		let msg, key;
		if (hasError.value) if (errorMessage.value !== null) {
			msg = [h("div", { role: "alert" }, errorMessage.value)];
			key = `q--slot-error-${errorMessage.value}`;
		} else {
			msg = hSlot(slots.error);
			key = "q--slot-error";
		}
		else if (!props.hideHint || state.focused.value) if (props.hint !== void 0) {
			msg = [h("div", props.hint)];
			key = `q--slot-hint-${props.hint}`;
		} else {
			msg = hSlot(slots.hint);
			key = "q--slot-hint";
		}
		const hasCounter = props.counter || slots.counter !== void 0;
		if (props.hideBottomSpace && !hasCounter && msg === void 0) return;
		const main = h("div", {
			key,
			class: "q-field__messages col"
		}, msg);
		return h("div", {
			class: "q-field__bottom row items-start q-field__bottom--" + (props.hideBottomSpace ? "stale" : "animated"),
			onClick: prevent
		}, [props.hideBottomSpace ? main : h(Transition, { name: "q-transition--field-message" }, () => main), hasCounter ? h("div", { class: "q-field__counter" }, slots.counter !== void 0 ? slots.counter() : state.computedCounter.value) : null]);
	}
	let shouldActivate = false;
	onDeactivated(() => {
		shouldActivate = true;
	});
	onActivated(() => {
		if (shouldActivate && props.autofocus) proxy.focus();
	});
	if (props.autofocus) onMounted(() => {
		proxy.focus();
	});
	onBeforeUnmount(() => {
		if (focusoutTimer !== null) clearTimeout(focusoutTimer);
	});
	Object.assign(proxy, {
		focus,
		blur
	});
	return function renderField() {
		const labelAttrs = state.getControl === void 0 && slots.control === void 0 ? {
			...state.splitAttrs.attributes.value,
			"data-autofocus": props.autofocus || void 0,
			...attributes.value
		} : attributes.value;
		return h(state.tag.value, {
			ref: state.rootRef,
			class: [classes.value, attrs.class],
			style: attrs.style,
			...labelAttrs
		}, [
			slots.before !== void 0 ? h("div", {
				class: "q-field__before q-field__marginal row no-wrap items-center",
				onClick: prevent
			}, slots.before()) : null,
			h("div", { class: "q-field__inner relative-position col self-stretch" }, [h("div", {
				ref: state.controlRef,
				class: contentClass.value,
				tabindex: -1,
				...state.controlEvents
			}, getContent()), shouldRenderBottom.value ? getBottom() : null]),
			slots.after !== void 0 ? h("div", {
				class: "q-field__after q-field__marginal row no-wrap items-center",
				onClick: prevent
			}, slots.after()) : null
		]);
	};
}
//#endregion
//#region node_modules/quasar/src/components/input/use-mask.js
var NAMED_MASKS = {
	date: "####/##/##",
	datetime: "####/##/## ##:##",
	time: "##:##",
	fulltime: "##:##:##",
	phone: "(###) ### - ####",
	card: "#### #### #### ####"
};
var { tokenMap: DEFAULT_TOKEN_MAP, tokenKeys: DEFAULT_TOKEN_MAP_KEYS } = getTokenMap({
	"#": {
		pattern: "[\\d]",
		negate: "[^\\d]"
	},
	S: {
		pattern: "[a-zA-Z]",
		negate: "[^a-zA-Z]"
	},
	N: {
		pattern: "[0-9a-zA-Z]",
		negate: "[^0-9a-zA-Z]"
	},
	A: {
		pattern: "[a-zA-Z]",
		negate: "[^a-zA-Z]",
		transform: (v) => v.toLocaleUpperCase()
	},
	a: {
		pattern: "[a-zA-Z]",
		negate: "[^a-zA-Z]",
		transform: (v) => v.toLocaleLowerCase()
	},
	X: {
		pattern: "[0-9a-zA-Z]",
		negate: "[^0-9a-zA-Z]",
		transform: (v) => v.toLocaleUpperCase()
	},
	x: {
		pattern: "[0-9a-zA-Z]",
		negate: "[^0-9a-zA-Z]",
		transform: (v) => v.toLocaleLowerCase()
	}
});
function getTokenMap(tokens) {
	const tokenKeys = Object.keys(tokens);
	const tokenMap = {};
	tokenKeys.forEach((key) => {
		const entry = tokens[key];
		tokenMap[key] = {
			...entry,
			regex: new RegExp(entry.pattern)
		};
	});
	return {
		tokenMap,
		tokenKeys
	};
}
function getTokenRegexMask(keys) {
	return new RegExp("\\\\([^.*+?^${}()|([\\]])|([.*+?^${}()|[\\]])|([" + keys.join("") + "])|(.)", "g");
}
var escRegex = /[.*+?^${}()|[\]\\]/g;
var DEFAULT_TOKEN_REGEX_MASK = getTokenRegexMask(DEFAULT_TOKEN_MAP_KEYS);
var MARKER = String.fromCodePoint(1);
var useMaskProps = {
	mask: String,
	reverseFillMask: Boolean,
	fillMask: [Boolean, String],
	unmaskedValue: Boolean,
	maskTokens: Object
};
function useMask(props, emit, emitValue, inputRef) {
	let maskMarked, maskReplaced, computedMask, computedUnmask, pastedTextStart, selectionAnchor;
	const tokens = computed(() => {
		if (props.maskTokens === void 0 || props.maskTokens === null) return {
			tokenMap: DEFAULT_TOKEN_MAP,
			tokenRegexMask: DEFAULT_TOKEN_REGEX_MASK
		};
		const { tokenMap: customTokens } = getTokenMap(props.maskTokens);
		const tokenMap = {
			...DEFAULT_TOKEN_MAP,
			...customTokens
		};
		return {
			tokenMap,
			tokenRegexMask: getTokenRegexMask(Object.keys(tokenMap))
		};
	});
	const hasMask = ref(null);
	const innerValue = ref(getInitialMaskedValue());
	function getIsTypeText() {
		return props.autogrow || [
			"textarea",
			"text",
			"search",
			"url",
			"tel",
			"password"
		].includes(props.type);
	}
	watch(() => props.type + props.autogrow, updateMaskInternals);
	watch(() => props.mask, (v) => {
		if (v !== void 0) updateMaskValue(innerValue.value, true);
		else {
			const val = unmaskValue(innerValue.value);
			updateMaskInternals();
			if (props.modelValue !== val) emit("update:modelValue", val);
		}
	});
	watch(() => props.fillMask + props.reverseFillMask, () => {
		if (hasMask.value) updateMaskValue(innerValue.value, true);
	});
	watch(() => props.unmaskedValue, () => {
		if (hasMask.value) updateMaskValue(innerValue.value);
	});
	function getInitialMaskedValue() {
		updateMaskInternals();
		if (hasMask.value) {
			const masked = maskValue(unmaskValue(props.modelValue));
			return props.fillMask !== false ? fillWithMask(masked) : masked;
		}
		return props.modelValue;
	}
	function getPaddedMaskMarked(size) {
		if (size < maskMarked.length) return maskMarked.slice(-size);
		let pad = "", localMaskMarked = maskMarked;
		const padPos = localMaskMarked.indexOf(MARKER);
		if (padPos !== -1) {
			for (let i = size - localMaskMarked.length; i > 0; i--) pad += MARKER;
			localMaskMarked = localMaskMarked.slice(0, padPos) + pad + localMaskMarked.slice(padPos);
		}
		return localMaskMarked;
	}
	function updateMaskInternals() {
		hasMask.value = props.mask !== void 0 && props.mask.length !== 0 && getIsTypeText();
		if (!hasMask.value) {
			computedUnmask = void 0;
			maskMarked = "";
			maskReplaced = "";
			return;
		}
		const localComputedMask = NAMED_MASKS[props.mask] === void 0 ? props.mask : NAMED_MASKS[props.mask], fillChar = typeof props.fillMask === "string" && props.fillMask.length !== 0 ? props.fillMask.slice(0, 1) : "_", fillCharEscaped = fillChar.replace(escRegex, String.raw`\$&`), unmask = [], extract = [], mask = [];
		let firstMatch = props.reverseFillMask, unmaskChar = "", negateChar = "";
		localComputedMask.replace(tokens.value.tokenRegexMask, (_, char1, esc, token, char2) => {
			if (token !== void 0) {
				const c = tokens.value.tokenMap[token];
				mask.push(c);
				negateChar = c.negate;
				if (firstMatch) {
					extract.push("(?:" + negateChar + "+)?(" + c.pattern + "+)?(?:" + negateChar + "+)?(" + c.pattern + "+)?");
					firstMatch = false;
				}
				extract.push("(?:" + negateChar + "+)?(" + c.pattern + ")?");
				return;
			}
			if (esc !== void 0) {
				unmaskChar = "\\" + (esc === "\\" ? "" : esc);
				mask.push(esc);
			} else {
				const c = char1 !== void 0 ? char1 : char2;
				unmaskChar = c === "\\" ? String.raw`\\\\` : c.replace(escRegex, String.raw`\\$&`);
				mask.push(c);
			}
			unmask.push("([^" + unmaskChar + "]+)?" + unmaskChar + "?");
		});
		const unmaskMatcher = new RegExp("^" + unmask.join("") + "(" + (unmaskChar === "" ? "." : "[^" + unmaskChar + "]") + "+)?" + (unmaskChar === "" ? "" : "[" + unmaskChar + "]*") + "$"), extractLast = extract.length - 1, extractMatcher = extract.map((re, index) => {
			if (index === 0 && props.reverseFillMask) return new RegExp("^" + fillCharEscaped + "*" + re);
			else if (index === extractLast) return new RegExp("^" + re + "(" + (negateChar === "" ? "." : negateChar) + "+)?" + (props.reverseFillMask ? "$" : fillCharEscaped + "*"));
			return new RegExp("^" + re);
		});
		computedMask = mask;
		computedUnmask = (val) => {
			const unmaskMatch = unmaskMatcher.exec(props.reverseFillMask ? val : val.slice(0, mask.length + 1));
			if (unmaskMatch !== null) val = unmaskMatch.slice(1).join("");
			const extractMatch = [], extractMatcherLength = extractMatcher.length;
			for (let i = 0, str = val; i < extractMatcherLength; i++) {
				const m = extractMatcher[i].exec(str);
				if (m === null) break;
				str = str.slice(m.shift().length);
				extractMatch.push(...m);
			}
			if (extractMatch.length !== 0) return extractMatch.join("");
			return val;
		};
		maskMarked = mask.map((v) => typeof v === "string" ? v : MARKER).join("");
		maskReplaced = maskMarked.split(MARKER).join(fillChar);
	}
	function updateMaskValue(rawVal, updateMaskInternalsFlag, inputType) {
		const inp = inputRef.value, end = inp.selectionEnd, endReverse = inp.value.length - end, unmasked = unmaskValue(rawVal);
		if (updateMaskInternalsFlag === true) updateMaskInternals();
		const preMasked = maskValue(unmasked, updateMaskInternalsFlag), masked = props.fillMask !== false ? fillWithMask(preMasked) : preMasked, changed = innerValue.value !== masked;
		if (inp.value !== masked) inp.value = masked;
		if (changed) innerValue.value = masked;
		if (document.activeElement === inp) nextTick$1(() => {
			if (masked === maskReplaced) {
				const cursor = props.reverseFillMask ? maskReplaced.length : 0;
				inp.setSelectionRange(cursor, cursor, "forward");
				return;
			}
			if (inputType === "insertFromPaste" && !props.reverseFillMask) {
				const maxEnd = inp.selectionEnd;
				let cursor = end - 1;
				for (let i = pastedTextStart; i <= cursor && i < maxEnd; i++) if (maskMarked[i] !== MARKER) cursor++;
				moveCursor.right(inp, cursor);
				return;
			}
			if (["deleteContentBackward", "deleteContentForward"].includes(inputType)) {
				const cursor = props.reverseFillMask ? end === 0 ? masked.length > preMasked.length ? 1 : 0 : Math.max(0, masked.length - (masked === maskReplaced ? 0 : Math.min(preMasked.length, endReverse) + 1)) + 1 : end;
				inp.setSelectionRange(cursor, cursor, "forward");
				return;
			}
			if (props.reverseFillMask) if (changed) {
				const cursor = Math.max(0, masked.length - (masked === maskReplaced ? 0 : Math.min(preMasked.length, endReverse + 1)));
				if (cursor === 1 && end === 1) inp.setSelectionRange(cursor, cursor, "forward");
				else moveCursor.rightReverse(inp, cursor);
			} else {
				const cursor = masked.length - endReverse;
				inp.setSelectionRange(cursor, cursor, "backward");
			}
			else if (changed) {
				const cursor = Math.max(0, maskMarked.indexOf(MARKER), Math.min(preMasked.length, end) - 1);
				moveCursor.right(inp, cursor);
			} else {
				const cursor = end - 1;
				moveCursor.right(inp, cursor);
			}
		});
		const val = props.unmaskedValue ? unmaskValue(masked) : masked;
		if (String(props.modelValue) !== val && (props.modelValue !== null || val !== "")) emitValue(val, true);
	}
	function moveCursorForPaste(inp, start, end) {
		const preMasked = maskValue(unmaskValue(inp.value));
		start = Math.max(0, maskMarked.indexOf(MARKER), Math.min(preMasked.length, start));
		pastedTextStart = start;
		inp.setSelectionRange(start, end, "forward");
	}
	const moveCursor = {
		left(inp, cursor) {
			const noMarkBefore = !maskMarked.slice(cursor - 1).includes(MARKER);
			let i = Math.max(0, cursor - 1);
			for (; i >= 0; i--) if (maskMarked[i] === MARKER) {
				cursor = i;
				if (noMarkBefore) cursor++;
				break;
			}
			if (i < 0 && maskMarked[cursor] !== void 0 && maskMarked[cursor] !== MARKER) return moveCursor.right(inp, 0);
			if (cursor >= 0) inp.setSelectionRange(cursor, cursor, "backward");
		},
		right(inp, cursor) {
			const limit = inp.value.length;
			let i = Math.min(limit, cursor + 1);
			for (; i <= limit; i++) if (maskMarked[i] === MARKER) {
				cursor = i;
				break;
			} else if (maskMarked[i - 1] === MARKER) cursor = i;
			if (i > limit && maskMarked[cursor - 1] !== void 0 && maskMarked[cursor - 1] !== MARKER) return moveCursor.left(inp, limit);
			inp.setSelectionRange(cursor, cursor, "forward");
		},
		leftReverse(inp, cursor) {
			const localMaskMarked = getPaddedMaskMarked(inp.value.length);
			let i = Math.max(0, cursor - 1);
			for (; i >= 0; i--) if (localMaskMarked[i - 1] === MARKER) {
				cursor = i;
				break;
			} else if (localMaskMarked[i] === MARKER) {
				cursor = i;
				if (i === 0) break;
			}
			if (i < 0 && localMaskMarked[cursor] !== void 0 && localMaskMarked[cursor] !== MARKER) return moveCursor.rightReverse(inp, 0);
			if (cursor >= 0) inp.setSelectionRange(cursor, cursor, "backward");
		},
		rightReverse(inp, cursor) {
			const limit = inp.value.length, localMaskMarked = getPaddedMaskMarked(limit), noMarkBefore = !localMaskMarked.slice(0, cursor + 1).includes(MARKER);
			let i = Math.min(limit, cursor + 1);
			for (; i <= limit; i++) if (localMaskMarked[i - 1] === MARKER) {
				cursor = i;
				if (cursor > 0 && noMarkBefore) cursor--;
				break;
			}
			if (i > limit && localMaskMarked[cursor - 1] !== void 0 && localMaskMarked[cursor - 1] !== MARKER) return moveCursor.leftReverse(inp, limit);
			inp.setSelectionRange(cursor, cursor, "forward");
		}
	};
	function onMaskedClick(e) {
		emit("click", e);
		selectionAnchor = void 0;
	}
	function onMaskedKeydown(e) {
		emit("keydown", e);
		if (shouldIgnoreKey(e) || e.altKey) return;
		const inp = inputRef.value, start = inp.selectionStart, end = inp.selectionEnd;
		if (!e.shiftKey) selectionAnchor = void 0;
		if (e.keyCode === 37 || e.keyCode === 39) {
			if (e.shiftKey && selectionAnchor === void 0) selectionAnchor = inp.selectionDirection === "forward" ? start : end;
			const fn = moveCursor[(e.keyCode === 39 ? "right" : "left") + (props.reverseFillMask ? "Reverse" : "")];
			e.preventDefault();
			fn(inp, selectionAnchor === start ? end : start);
			if (e.shiftKey) {
				const cursor = inp.selectionStart;
				inp.setSelectionRange(Math.min(selectionAnchor, cursor), Math.max(selectionAnchor, cursor), "forward");
			}
		} else if (e.keyCode === 8 && !props.reverseFillMask && start === end) {
			moveCursor.left(inp, start);
			inp.setSelectionRange(inp.selectionStart, end, "backward");
		} else if (e.keyCode === 46 && props.reverseFillMask && start === end) {
			moveCursor.rightReverse(inp, end);
			inp.setSelectionRange(start, inp.selectionEnd, "forward");
		}
	}
	function maskValue(val, updateMaskInternalsFlag) {
		if (val === void 0 || val === null || val === "") return "";
		if (props.reverseFillMask) return maskValueReverse(val, updateMaskInternalsFlag);
		const mask = computedMask;
		let valIndex = 0, output = "";
		for (let maskIndex = 0; maskIndex < mask.length; maskIndex++) {
			const valChar = val[valIndex], maskDef = mask[maskIndex];
			if (typeof maskDef === "string") {
				output += maskDef;
				if (updateMaskInternalsFlag === true && valChar === maskDef) valIndex++;
			} else if (valChar !== void 0 && maskDef.regex.test(valChar)) {
				output += maskDef.transform !== void 0 ? maskDef.transform(valChar) : valChar;
				valIndex++;
			} else return output;
		}
		return output;
	}
	function maskValueReverse(val, updateMaskInternalsFlag) {
		const mask = computedMask, firstTokenIndex = maskMarked.indexOf(MARKER);
		let valIndex = val.length - 1, output = "";
		for (let maskIndex = mask.length - 1; maskIndex >= 0 && valIndex !== -1; maskIndex--) {
			const maskDef = mask[maskIndex];
			let valChar = val[valIndex];
			if (typeof maskDef === "string") {
				output = maskDef + output;
				if (updateMaskInternalsFlag === true && valChar === maskDef) valIndex--;
			} else if (valChar !== void 0 && maskDef.regex.test(valChar)) do {
				output = (maskDef.transform !== void 0 ? maskDef.transform(valChar) : valChar) + output;
				valIndex--;
				valChar = val[valIndex];
			} while (firstTokenIndex === maskIndex && valChar !== void 0 && maskDef.regex.test(valChar));
			else return output;
		}
		return output;
	}
	function unmaskValue(val) {
		return typeof val !== "string" || computedUnmask === void 0 ? typeof val === "number" ? computedUnmask(String(val)) : val : computedUnmask(val);
	}
	function fillWithMask(val) {
		if (maskReplaced.length - val.length <= 0) return val;
		return props.reverseFillMask && val.length !== 0 ? maskReplaced.slice(0, -val.length) + val : val + maskReplaced.slice(val.length);
	}
	return {
		innerValue,
		hasMask,
		moveCursorForPaste,
		updateMaskValue,
		onMaskedKeydown,
		onMaskedClick
	};
}
//#endregion
//#region node_modules/quasar/src/composables/use-form/private.use-form.js
var useFormProps = { name: String };
function useFormInject(formAttrs = {}) {
	return (child, action, className) => {
		child[action](h("input", {
			class: "hidden" + (className || ""),
			...formAttrs.value
		}));
	};
}
function useFormInputNameAttr(props) {
	return computed(() => props.name || props.for);
}
//#endregion
//#region node_modules/quasar/src/composables/private.use-file/use-file-dom-props.js
function useFileDomProps(props, typeGuard) {
	function getFormDomProps() {
		const model = props.modelValue;
		try {
			const dt = "DataTransfer" in window ? new DataTransfer() : "ClipboardEvent" in window ? new ClipboardEvent("").clipboardData : void 0;
			if (Object(model) === model) ("length" in model ? [...model] : [model]).forEach((file) => {
				dt.items.add(file);
			});
			return { files: dt.files };
		} catch {
			return { files: void 0 };
		}
	}
	return typeGuard ? computed(() => {
		if (props.type !== "file") return;
		return getFormDomProps();
	}) : computed(getFormDomProps);
}
//#endregion
//#region node_modules/quasar/src/composables/private.use-key-composition/use-key-composition.js
var isJapanese = /[\u3000-\u303F\u3040-\u309F\u30A0-\u30FF\uFF00-\uFF9F\u4E00-\u9FAF\u3400-\u4DBF]/;
var isChinese = /[\u4E00-\u9FFF\u3400-\u4DBF\u{20000}-\u{2A6DF}\u{2A700}-\u{2B73F}\u{2B740}-\u{2B81F}\u{2B820}-\u{2CEAF}\uF900-\uFAFF\u3300-\u33FF\uFE30-\uFE4F\uF900-\uFAFF\u{2F800}-\u{2FA1F}]/u;
var isKorean = /[\u3131-\u314E\u314F-\u3163\uAC00-\uD7A3]/;
var isPlainText = /[a-z0-9_ -]$/i;
function useKeyComposition(onInput) {
	return function onComposition(e) {
		if (e.type === "compositionend" || e.type === "change") {
			if (!e.target.qComposing) return;
			e.target.qComposing = false;
			onInput(e);
		} else if (e.type === "compositionupdate" && !e.target.qComposing && typeof e.data === "string") {
			if (client.is.firefox ? !isPlainText.test(e.data) : isJapanese.test(e.data) || isChinese.test(e.data) || isKorean.test(e.data)) e.target.qComposing = true;
		}
	};
}
//#endregion
//#region node_modules/quasar/src/components/input/QInput.js
var QInput_default = createComponent({
	name: "QInput",
	inheritAttrs: false,
	props: {
		...useFieldProps,
		...useMaskProps,
		...useFormProps,
		modelValue: [
			String,
			Number,
			FileList
		],
		shadowText: String,
		type: {
			type: String,
			default: "text"
		},
		debounce: [String, Number],
		autogrow: Boolean,
		inputClass: [
			Array,
			String,
			Object
		],
		inputStyle: [
			Array,
			String,
			Object
		]
	},
	emits: [
		...useFieldEmits,
		"paste",
		"change",
		"keydown",
		"click",
		"animationend"
	],
	setup(props, { emit, attrs }) {
		const { proxy } = getCurrentInstance();
		const { $q } = proxy;
		const temp = {};
		let emitCachedValue = NaN, typedNumber = false, stopValueWatcher = false, emitTimer = null, emitValueFn;
		const inputRef = ref(null);
		const nameProp = useFormInputNameAttr(props);
		const { innerValue, hasMask, moveCursorForPaste, updateMaskValue, onMaskedKeydown, onMaskedClick } = useMask(props, emit, emitValue, inputRef);
		const formDomProps = useFileDomProps(props, true);
		const hasValue = computed(() => fieldValueIsFilled(innerValue.value));
		const onComposition = useKeyComposition(onInput);
		const state = useFieldState({ changeEvent: true });
		const isTextarea = computed(() => props.type === "textarea" || props.autogrow);
		const isTypeText = computed(() => isTextarea.value || [
			"text",
			"search",
			"url",
			"tel",
			"password"
		].includes(props.type));
		const onEvents = computed(() => {
			const evt = {
				...state.splitAttrs.listeners.value,
				onInput,
				onPaste,
				onChange,
				onBlur: onFinishEditing,
				onFocus: stop
			};
			evt.onCompositionstart = evt.onCompositionupdate = evt.onCompositionend = onComposition;
			if (hasMask.value) {
				evt.onKeydown = onMaskedKeydown;
				evt.onClick = onMaskedClick;
			}
			if (props.autogrow) evt.onAnimationend = onAnimationend;
			return evt;
		});
		const inputAttrs = computed(() => {
			const acc = {
				tabindex: 0,
				"data-autofocus": props.autofocus || void 0,
				rows: props.type === "textarea" ? 6 : void 0,
				"aria-label": props.label,
				name: nameProp.value,
				...state.splitAttrs.attributes.value,
				id: state.targetUid.value,
				maxlength: props.maxlength,
				disabled: props.disable,
				readonly: props.readonly
			};
			if (!isTextarea.value) acc.type = props.type;
			if (props.autogrow) acc.rows = 1;
			return acc;
		});
		watch(() => props.type, () => {
			if (inputRef.value) inputRef.value.value = props.modelValue;
		});
		watch(() => props.modelValue, (v) => {
			if (hasMask.value) {
				if (stopValueWatcher) {
					stopValueWatcher = false;
					if (String(v) === emitCachedValue) return;
				}
				updateMaskValue(v);
			} else if (innerValue.value !== v) {
				innerValue.value = v;
				if (props.type === "number" && Object.hasOwn(temp, "value")) if (typedNumber) typedNumber = false;
				else delete temp.value;
			}
			if (props.autogrow) nextTick$1(adjustHeight);
		});
		watch(() => props.autogrow, (val) => {
			if (val) nextTick$1(adjustHeight);
			else if (inputRef.value !== null && attrs.rows > 0) inputRef.value.style.height = "auto";
		});
		watch(() => props.dense, () => {
			if (props.autogrow) nextTick$1(adjustHeight);
		});
		function focus() {
			addFocusFn(() => {
				const el = document.activeElement;
				if (inputRef.value !== null && inputRef.value !== el && (el === null || el.id !== state.targetUid.value)) inputRef.value.focus({ preventScroll: true });
			});
		}
		function select() {
			inputRef.value?.select();
		}
		function onPaste(e) {
			if (hasMask.value && props.reverseFillMask !== true) {
				const inp = e.target;
				moveCursorForPaste(inp, inp.selectionStart, inp.selectionEnd);
			}
			emit("paste", e);
		}
		function onInput(e) {
			if (!e || !e.target) return;
			if (props.type === "file") {
				emit("update:modelValue", e.target.files);
				return;
			}
			const val = e.target.value;
			if (e.target.qComposing) {
				temp.value = val;
				return;
			}
			if (hasMask.value) updateMaskValue(val, false, e.inputType);
			else {
				emitValue(val);
				if (isTypeText.value && e.target === document.activeElement) {
					const { selectionStart, selectionEnd } = e.target;
					if (selectionStart !== void 0 && selectionEnd !== void 0) nextTick$1(() => {
						if (e.target === document.activeElement && val.indexOf(e.target.value) === 0) e.target.setSelectionRange(selectionStart, selectionEnd);
					});
				}
			}
			if (props.autogrow) adjustHeight();
		}
		function onAnimationend(e) {
			emit("animationend", e);
			adjustHeight();
		}
		function emitValue(val, stopWatcher) {
			emitValueFn = () => {
				emitTimer = null;
				if (props.type !== "number" && Object.hasOwn(temp, "value")) delete temp.value;
				if (props.modelValue !== val && emitCachedValue !== val) {
					emitCachedValue = val;
					if (stopWatcher === true) stopValueWatcher = true;
					emit("update:modelValue", val);
					nextTick$1(() => {
						if (emitCachedValue === val) emitCachedValue = NaN;
					});
				}
				emitValueFn = void 0;
			};
			if (props.type === "number") {
				typedNumber = true;
				temp.value = val;
			}
			if (props.debounce !== void 0) {
				if (emitTimer !== null) clearTimeout(emitTimer);
				temp.value = val;
				emitTimer = setTimeout(emitValueFn, props.debounce);
			} else emitValueFn();
		}
		function adjustHeight() {
			requestAnimationFrame(() => {
				const inp = inputRef.value;
				if (inp !== null) {
					const parentStyle = inp.parentNode.style;
					const { scrollTop } = inp;
					const { overflowY, maxHeight } = $q.platform.is.firefox ? {} : window.getComputedStyle(inp);
					const changeOverflow = overflowY !== void 0 && overflowY !== "scroll";
					if (changeOverflow) inp.style.overflowY = "hidden";
					parentStyle.marginBottom = inp.scrollHeight - 1 + "px";
					inp.style.height = "1px";
					inp.style.height = inp.scrollHeight + "px";
					if (changeOverflow) inp.style.overflowY = Number.parseInt(maxHeight, 10) < inp.scrollHeight ? "auto" : "hidden";
					parentStyle.marginBottom = "";
					inp.scrollTop = scrollTop;
				}
			});
		}
		function onChange(e) {
			onComposition(e);
			if (emitTimer !== null) {
				clearTimeout(emitTimer);
				emitTimer = null;
			}
			emitValueFn?.();
			emit("change", e.target.value);
		}
		function onFinishEditing(e) {
			if (e !== void 0) stop(e);
			if (emitTimer !== null) {
				clearTimeout(emitTimer);
				emitTimer = null;
			}
			emitValueFn?.();
			typedNumber = false;
			stopValueWatcher = false;
			delete temp.value;
			if (props.type !== "file") setTimeout(() => {
				if (inputRef.value !== null) inputRef.value.value = innerValue.value !== void 0 ? innerValue.value : "";
			});
		}
		function getCurValue() {
			return Object.hasOwn(temp, "value") ? temp.value : innerValue.value !== void 0 ? innerValue.value : "";
		}
		onBeforeUnmount(() => {
			onFinishEditing();
		});
		onMounted(() => {
			if (props.autogrow) adjustHeight();
		});
		Object.assign(state, {
			innerValue,
			fieldClass: computed(() => `q-${isTextarea.value ? "textarea" : "input"}` + (props.autogrow ? " q-textarea--autogrow" : "")),
			hasShadow: computed(() => props.type !== "file" && typeof props.shadowText === "string" && props.shadowText.length !== 0),
			inputRef,
			emitValue,
			hasValue,
			floatingLabel: computed(() => hasValue.value && (props.type !== "number" || Number.isFinite(Number(innerValue.value))) || fieldValueIsFilled(props.displayValue)),
			getControl: () => h(isTextarea.value ? "textarea" : "input", {
				ref: inputRef,
				class: ["q-field__native q-placeholder", props.inputClass],
				style: props.inputStyle,
				...inputAttrs.value,
				...onEvents.value,
				...props.type !== "file" ? { value: getCurValue() } : formDomProps.value
			}),
			getShadowControl: () => h("div", { class: "q-field__native q-field__shadow absolute-bottom no-pointer-events" + (isTextarea.value ? "" : " text-no-wrap") }, [h("span", { class: "invisible" }, getCurValue()), h("span", props.shadowText)])
		});
		const renderFn = useField(state);
		Object.assign(proxy, {
			focus,
			select,
			getNativeElement: () => inputRef.value
		});
		injectProp(proxy, "nativeEl", () => inputRef.value);
		return renderFn;
	}
});
//#endregion
//#region node_modules/quasar/src/composables/private.use-refocus-target/use-refocus-target.js
function useRefocusTarget(props, rootRef) {
	const refocusRef = ref(null);
	const refocusTargetEl = computed(() => {
		if (props.disable) return null;
		return h("span", {
			ref: refocusRef,
			class: "no-outline",
			tabindex: -1
		});
	});
	function refocusTarget(e) {
		const root = rootRef.value;
		if (e?.qAvoidFocus === true) return;
		if (e?.type.indexOf("key") === 0) {
			if (document.activeElement !== root && root?.contains(document.activeElement) === true) root.focus();
		} else if (refocusRef.value !== null && (e === void 0 || root?.contains(e.target) === true)) refocusRef.value.focus();
	}
	return {
		refocusTargetEl,
		refocusTarget
	};
}
//#endregion
//#region node_modules/quasar/src/utils/private.option-sizes/option-sizes.js
var option_sizes_default = {
	xs: 30,
	sm: 35,
	md: 40,
	lg: 50,
	xl: 60
};
//#endregion
//#region node_modules/quasar/src/components/radio/QRadio.js
var createSvg = () => h("svg", {
	key: "svg",
	class: "q-radio__bg absolute non-selectable",
	viewBox: "0 0 24 24"
}, [h("path", { d: "M12,22a10,10 0 0 1 -10,-10a10,10 0 0 1 10,-10a10,10 0 0 1 10,10a10,10 0 0 1 -10,10m0,-22a12,12 0 0 0 -12,12a12,12 0 0 0 12,12a12,12 0 0 0 12,-12a12,12 0 0 0 -12,-12" }), h("path", {
	class: "q-radio__check",
	d: "M12,6a6,6 0 0 0 -6,6a6,6 0 0 0 6,6a6,6 0 0 0 6,-6a6,6 0 0 0 -6,-6"
})]);
function onKeydown$1(e) {
	if (e.keyCode === 13 || e.keyCode === 32) stopAndPrevent(e);
}
var QRadio_default = createComponent({
	name: "QRadio",
	props: {
		...useDarkProps,
		...useSizeProps,
		...useFormProps,
		modelValue: { required: true },
		val: { required: true },
		label: String,
		leftLabel: Boolean,
		checkedIcon: String,
		uncheckedIcon: String,
		color: String,
		keepColor: Boolean,
		dense: Boolean,
		disable: Boolean,
		tabindex: [String, Number]
	},
	emits: ["update:modelValue"],
	setup(props, { slots, emit }) {
		const { proxy } = getCurrentInstance();
		const isDark = useDark(props, proxy.$q);
		const sizeStyle = useSize(props, option_sizes_default);
		const rootRef = ref(null);
		const { refocusTargetEl, refocusTarget } = useRefocusTarget(props, rootRef);
		const isTrue = computed(() => toRaw(props.modelValue) === toRaw(props.val));
		const classes = computed(() => "q-radio cursor-pointer no-outline row inline no-wrap items-center" + (props.disable ? " disabled" : "") + (isDark.value ? " q-radio--dark" : "") + (props.dense ? " q-radio--dense" : "") + (props.leftLabel ? " reverse" : ""));
		const innerClass = computed(() => {
			const color = props.color !== void 0 && (props.keepColor || isTrue.value) ? ` text-${props.color}` : "";
			return `q-radio__inner relative-position q-radio__inner--${isTrue.value ? "truthy" : "falsy"}${color}`;
		});
		const icon = computed(() => (isTrue.value ? props.checkedIcon : props.uncheckedIcon) || null);
		const tabindex = computed(() => props.disable ? -1 : props.tabindex || 0);
		const injectFormInput = useFormInject(computed(() => {
			const prop = { type: "radio" };
			if (props.name !== void 0) Object.assign(prop, {
				".checked": isTrue.value,
				"^checked": isTrue.value ? "checked" : void 0,
				name: props.name,
				value: props.val
			});
			return prop;
		}));
		function onClick(e) {
			if (e !== void 0) {
				stopAndPrevent(e);
				refocusTarget(e);
			}
			if (!props.disable && !isTrue.value) emit("update:modelValue", props.val, e);
		}
		function onKeyup(e) {
			if (e.keyCode === 13 || e.keyCode === 32) onClick(e);
		}
		Object.assign(proxy, { set: onClick });
		const svg = createSvg();
		return () => {
			const content = icon.value !== null ? [h("div", {
				key: "icon",
				class: "q-radio__icon-container absolute-full flex flex-center no-wrap"
			}, [h(QIcon_default, {
				class: "q-radio__icon",
				name: icon.value
			})])] : [svg];
			if (!props.disable) injectFormInput(content, "unshift", " q-radio__native q-ma-none q-pa-none");
			const child = [h("div", {
				class: innerClass.value,
				style: sizeStyle.value,
				"aria-hidden": "true"
			}, content)];
			if (refocusTargetEl.value !== null) child.push(refocusTargetEl.value);
			const label = props.label !== void 0 ? hMergeSlot(slots.default, [props.label]) : hSlot(slots.default);
			if (label !== void 0) child.push(h("div", { class: "q-radio__label q-anchor--skip" }, label));
			return h("div", {
				ref: rootRef,
				class: classes.value,
				tabindex: tabindex.value,
				role: "radio",
				"aria-label": props.label,
				"aria-checked": isTrue.value ? "true" : "false",
				"aria-disabled": props.disable ? "true" : void 0,
				onClick,
				onKeydown: onKeydown$1,
				onKeyup
			}, child);
		};
	}
});
//#endregion
//#region node_modules/quasar/src/components/checkbox/use-checkbox.js
var useCheckboxProps = {
	...useDarkProps,
	...useSizeProps,
	...useFormProps,
	modelValue: {
		required: true,
		default: null
	},
	val: {},
	trueValue: { default: true },
	falseValue: { default: false },
	indeterminateValue: { default: null },
	checkedIcon: String,
	uncheckedIcon: String,
	indeterminateIcon: String,
	toggleOrder: {
		type: String,
		validator: (v) => v === "tf" || v === "ft"
	},
	toggleIndeterminate: Boolean,
	label: String,
	leftLabel: Boolean,
	color: String,
	keepColor: Boolean,
	dense: Boolean,
	disable: Boolean,
	tabindex: [String, Number]
};
var useCheckboxEmits = ["update:modelValue"];
function onKeydown(e) {
	if (e.keyCode === 13 || e.keyCode === 32) stopAndPrevent(e);
}
function useCheckbox(type, getInner) {
	const { props, slots, emit, proxy } = getCurrentInstance();
	const { $q } = proxy;
	const isDark = useDark(props, $q);
	const rootRef = ref(null);
	const { refocusTargetEl, refocusTarget } = useRefocusTarget(props, rootRef);
	const sizeStyle = useSize(props, option_sizes_default);
	const modelIsArray = computed(() => props.val !== void 0 && Array.isArray(props.modelValue));
	const index = computed(() => {
		const val = toRaw(props.val);
		return modelIsArray.value ? props.modelValue.findIndex((opt) => toRaw(opt) === val) : -1;
	});
	const isTrue = computed(() => modelIsArray.value ? index.value !== -1 : toRaw(props.modelValue) === toRaw(props.trueValue));
	const isFalse = computed(() => modelIsArray.value ? index.value === -1 : toRaw(props.modelValue) === toRaw(props.falseValue));
	const isIndeterminate = computed(() => !isTrue.value && !isFalse.value);
	const tabindex = computed(() => props.disable ? -1 : props.tabindex || 0);
	const classes = computed(() => `q-${type} cursor-pointer no-outline row inline no-wrap items-center` + (props.disable ? " disabled" : "") + (isDark.value ? ` q-${type}--dark` : "") + (props.dense ? ` q-${type}--dense` : "") + (props.leftLabel ? " reverse" : ""));
	const innerClass = computed(() => {
		return `q-${type}__inner relative-position non-selectable q-${type}__inner--${isTrue.value ? "truthy" : isFalse.value ? "falsy" : "indet"}${props.color !== void 0 && (props.keepColor || (type === "toggle" ? isTrue.value : !isFalse.value)) ? ` text-${props.color}` : ""}`;
	});
	const injectFormInput = useFormInject(computed(() => {
		const prop = { type: "checkbox" };
		if (props.name !== void 0) Object.assign(prop, {
			".checked": isTrue.value,
			"^checked": isTrue.value ? "checked" : void 0,
			name: props.name,
			value: modelIsArray.value ? props.val : props.trueValue
		});
		return prop;
	}));
	const attributes = computed(() => {
		const attrs = {
			tabindex: tabindex.value,
			role: type === "toggle" ? "switch" : "checkbox",
			"aria-label": props.label,
			"aria-checked": isIndeterminate.value ? "mixed" : isTrue.value ? "true" : "false"
		};
		if (props.disable) attrs["aria-disabled"] = "true";
		return attrs;
	});
	function onClick(e) {
		if (e !== void 0) {
			stopAndPrevent(e);
			refocusTarget(e);
		}
		if (!props.disable) emit("update:modelValue", getNextValue(), e);
	}
	function getNextValue() {
		if (modelIsArray.value) {
			if (isTrue.value) {
				const val = [...props.modelValue];
				val.splice(index.value, 1);
				return val;
			}
			return [...props.modelValue, props.val];
		}
		if (isTrue.value) {
			if (props.toggleOrder !== "ft" || !props.toggleIndeterminate) return props.falseValue;
		} else if (isFalse.value) {
			if (props.toggleOrder === "ft" || !props.toggleIndeterminate) return props.trueValue;
		} else return props.toggleOrder !== "ft" ? props.trueValue : props.falseValue;
		return props.indeterminateValue;
	}
	function onKeyup(e) {
		if (e.keyCode === 13 || e.keyCode === 32) onClick(e);
	}
	const getInnerContent = getInner(isTrue, isIndeterminate);
	Object.assign(proxy, { toggle: onClick });
	return () => {
		const inner = getInnerContent();
		if (!props.disable) injectFormInput(inner, "unshift", ` q-${type}__native absolute q-ma-none q-pa-none`);
		const child = [h("div", {
			class: innerClass.value,
			style: sizeStyle.value,
			"aria-hidden": "true"
		}, inner)];
		if (refocusTargetEl.value !== null) child.push(refocusTargetEl.value);
		const label = props.label !== void 0 ? hMergeSlot(slots.default, [props.label]) : hSlot(slots.default);
		if (label !== void 0) child.push(h("div", { class: `q-${type}__label q-anchor--skip` }, label));
		return h("div", {
			ref: rootRef,
			class: classes.value,
			...attributes.value,
			onClick,
			onKeydown,
			onKeyup
		}, child);
	};
}
//#endregion
//#region node_modules/quasar/src/components/checkbox/QCheckbox.js
var createBgNode = () => h("div", {
	key: "svg",
	class: "q-checkbox__bg absolute"
}, [h("svg", {
	class: "q-checkbox__svg fit absolute-full",
	viewBox: "0 0 24 24"
}, [h("path", {
	class: "q-checkbox__truthy",
	fill: "none",
	d: "M1.73,12.91 8.1,19.28 22.79,4.59"
}), h("path", {
	class: "q-checkbox__indet",
	d: "M4,14H20V10H4"
})])]);
//#endregion
//#region node_modules/quasar/src/components/option-group/QOptionGroup.js
var components = {
	radio: QRadio_default,
	checkbox: createComponent({
		name: "QCheckbox",
		props: useCheckboxProps,
		emits: useCheckboxEmits,
		setup(props) {
			const bgNode = createBgNode();
			function getInner(isTrue, isIndeterminate) {
				const icon = computed(() => (isTrue.value ? props.checkedIcon : isIndeterminate.value ? props.indeterminateIcon : props.uncheckedIcon) || null);
				return () => icon.value !== null ? [h("div", {
					key: "icon",
					class: "q-checkbox__icon-container absolute-full flex flex-center no-wrap"
				}, [h(QIcon_default, {
					class: "q-checkbox__icon",
					name: icon.value
				})])] : [bgNode];
			}
			return useCheckbox("checkbox", getInner);
		}
	}),
	toggle: createComponent({
		name: "QToggle",
		props: {
			...useCheckboxProps,
			icon: String,
			iconColor: String
		},
		emits: useCheckboxEmits,
		setup(props) {
			function getInner(isTrue, isIndeterminate) {
				const icon = computed(() => (isTrue.value ? props.checkedIcon : isIndeterminate.value ? props.indeterminateIcon : props.uncheckedIcon) || props.icon);
				const color = computed(() => isTrue.value ? props.iconColor : null);
				return () => [h("div", { class: "q-toggle__track" }), h("div", { class: "q-toggle__thumb absolute flex flex-center no-wrap" }, icon.value !== void 0 ? [h(QIcon_default, {
					name: icon.value,
					color: color.value
				})] : void 0)];
			}
			return useCheckbox("toggle", getInner);
		}
	})
};
var typeValues = Object.keys(components);
function getPropValueFn(userPropName, defaultPropName) {
	if (typeof userPropName === "function") return userPropName;
	const propName = userPropName !== void 0 ? userPropName : defaultPropName;
	return (opt) => opt[propName];
}
var QOptionGroup_default = createComponent({
	name: "QOptionGroup",
	props: {
		...useDarkProps,
		modelValue: { required: true },
		options: {
			type: Array,
			validator: (opts) => opts.every(isObject$1),
			default: () => []
		},
		optionValue: [Function, String],
		optionLabel: [Function, String],
		optionDisable: [Function, String],
		name: String,
		type: {
			type: String,
			default: "radio",
			validator: (v) => typeValues.includes(v)
		},
		color: String,
		keepColor: Boolean,
		dense: Boolean,
		size: String,
		leftLabel: Boolean,
		inline: Boolean,
		disable: Boolean
	},
	emits: ["update:modelValue"],
	setup(props, { emit, slots }) {
		const { proxy: { $q } } = getCurrentInstance();
		const arrayModel = Array.isArray(props.modelValue);
		if (props.type === "radio") {
			if (arrayModel) console.error("q-option-group: model should not be array");
		} else if (!arrayModel) console.error("q-option-group: model should be array in your case");
		const isDark = useDark(props, $q);
		const component = computed(() => components[props.type]);
		const getOptionValue = computed(() => getPropValueFn(props.optionValue, "value"));
		const getOptionLabel = computed(() => getPropValueFn(props.optionLabel, "label"));
		const getOptionDisable = computed(() => getPropValueFn(props.optionDisable, "disable"));
		const innerOptions = computed(() => props.options.map((opt) => ({
			val: getOptionValue.value(opt),
			name: opt.name === void 0 ? props.name : opt.name,
			disable: props.disable || getOptionDisable.value(opt),
			leftLabel: opt.leftLabel === void 0 ? props.leftLabel : opt.leftLabel,
			color: opt.color === void 0 ? props.color : opt.color,
			checkedIcon: opt.checkedIcon,
			uncheckedIcon: opt.uncheckedIcon,
			dark: opt.dark === void 0 ? isDark.value : opt.dark,
			size: opt.size === void 0 ? props.size : opt.size,
			dense: props.dense,
			keepColor: opt.keepColor === void 0 ? props.keepColor : opt.keepColor
		})));
		const classes = computed(() => "q-option-group q-gutter-x-sm" + (props.inline ? " q-option-group--inline" : ""));
		const attrs = computed(() => {
			const acc = { role: "group" };
			if (props.type === "radio") {
				acc.role = "radiogroup";
				if (props.disable) acc["aria-disabled"] = "true";
			}
			return acc;
		});
		function onUpdateModelValue(value) {
			emit("update:modelValue", value);
		}
		return () => h("div", {
			class: classes.value,
			...attrs.value
		}, props.options.map((opt, i) => {
			const child = slots["label-" + i] !== void 0 ? () => slots["label-" + i](opt) : slots.label !== void 0 ? () => slots.label(opt) : void 0;
			return h("div", [h(component.value, {
				label: child === void 0 ? getOptionLabel.value(opt) : null,
				modelValue: props.modelValue,
				"onUpdate:modelValue": onUpdateModelValue,
				...innerOptions.value[i]
			}, child)]);
		}));
	}
});
//#endregion
//#region node_modules/quasar/src/plugins/dialog/component/DialogPluginComponent.js
var DialogPluginComponent_default = createComponent({
	name: "DialogPluginComponent",
	props: {
		...useDarkProps,
		title: String,
		message: String,
		prompt: Object,
		options: Object,
		progress: [Boolean, Object],
		html: Boolean,
		ok: {
			type: [
				String,
				Object,
				Boolean
			],
			default: true
		},
		cancel: [
			String,
			Object,
			Boolean
		],
		focus: {
			type: String,
			default: "ok",
			validator: (v) => [
				"ok",
				"cancel",
				"none"
			].includes(v)
		},
		stackButtons: Boolean,
		color: String,
		cardClass: [
			String,
			Array,
			Object
		],
		cardStyle: [
			String,
			Array,
			Object
		]
	},
	emits: ["ok", "hide"],
	setup(props, { emit }) {
		const { proxy } = getCurrentInstance();
		const { $q } = proxy;
		const isDark = useDark(props, $q);
		const dialogRef = ref(null);
		const model = ref(props.prompt !== void 0 ? props.prompt.model : props.options !== void 0 ? props.options.model : void 0);
		const classes = computed(() => "q-dialog-plugin" + (isDark.value ? " q-dialog-plugin--dark q-dark" : "") + (props.progress !== false ? " q-dialog-plugin--progress" : ""));
		const vmColor = computed(() => props.color || (isDark.value ? "amber" : "primary"));
		const spinner = computed(() => props.progress === false ? null : isObject$1(props.progress) ? {
			component: props.progress.spinner || QSpinner_default,
			props: { color: props.progress.color || vmColor.value }
		} : {
			component: QSpinner_default,
			props: { color: vmColor.value }
		});
		const hasForm = computed(() => props.prompt !== void 0 || props.options !== void 0);
		const formProps = computed(() => {
			if (!hasForm.value) return {};
			const { model, isValid, items, ...acc } = props.prompt !== void 0 ? props.prompt : props.options;
			return acc;
		});
		const okLabel = computed(() => isObject$1(props.ok) ? $q.lang.label.ok : props.ok === true ? $q.lang.label.ok : props.ok);
		const cancelLabel = computed(() => isObject$1(props.cancel) ? $q.lang.label.cancel : props.cancel === true ? $q.lang.label.cancel : props.cancel);
		const okDisabled = computed(() => {
			if (props.prompt !== void 0) return props.prompt.isValid !== void 0 && !props.prompt.isValid(model.value);
			if (props.options !== void 0) return props.options.isValid !== void 0 && !props.options.isValid(model.value);
			return false;
		});
		const okProps = computed(() => ({
			color: vmColor.value,
			label: okLabel.value,
			ripple: false,
			disable: okDisabled.value,
			...isObject$1(props.ok) ? props.ok : { flat: true },
			"data-autofocus": props.focus === "ok" && !hasForm.value || void 0,
			onClick: onOk
		}));
		const cancelProps = computed(() => ({
			color: vmColor.value,
			label: cancelLabel.value,
			ripple: false,
			...isObject$1(props.cancel) ? props.cancel : { flat: true },
			"data-autofocus": props.focus === "cancel" && !hasForm.value || void 0,
			onClick: onCancel
		}));
		watch(() => props.prompt && props.prompt.model, onUpdateModel);
		watch(() => props.options && props.options.model, onUpdateModel);
		function show() {
			dialogRef.value.show();
		}
		function hide() {
			dialogRef.value.hide();
		}
		function onOk() {
			emit("ok", toRaw(model.value));
			hide();
		}
		function onCancel() {
			hide();
		}
		function onDialogHide() {
			emit("hide");
		}
		function onUpdateModel(val) {
			model.value = val;
		}
		function onInputKeyup(evt) {
			if (!okDisabled.value && props.prompt.type !== "textarea" && isKeyCode(evt, 13)) onOk();
		}
		function getSection(sectionClass, text) {
			return props.html ? h(QCardSection_default, {
				class: sectionClass,
				innerHTML: text
			}) : h(QCardSection_default, { class: sectionClass }, () => text);
		}
		function getPrompt() {
			return [h(QInput_default, {
				color: vmColor.value,
				dense: true,
				autofocus: true,
				dark: isDark.value,
				...formProps.value,
				modelValue: model.value,
				"onUpdate:modelValue": onUpdateModel,
				onKeyup: onInputKeyup
			})];
		}
		function getOptions() {
			return [h(QOptionGroup_default, {
				color: vmColor.value,
				options: props.options.items,
				dark: isDark.value,
				...formProps.value,
				modelValue: model.value,
				"onUpdate:modelValue": onUpdateModel
			})];
		}
		function getButtons() {
			const child = [];
			if (props.cancel) child.push(h(QBtn_default, cancelProps.value));
			if (props.ok) child.push(h(QBtn_default, okProps.value));
			return h(QCardActions_default, {
				class: props.stackButtons ? "items-end" : "",
				vertical: props.stackButtons,
				align: "right"
			}, () => child);
		}
		function getCardContent() {
			const child = [];
			if (props.title) child.push(getSection("q-dialog__title", props.title));
			if (props.progress !== false) child.push(h(QCardSection_default, { class: "q-dialog__progress" }, () => h(spinner.value.component, spinner.value.props)));
			if (props.message) child.push(getSection("q-dialog__message", props.message));
			if (props.prompt !== void 0) child.push(h(QCardSection_default, { class: "scroll q-dialog-plugin__form" }, getPrompt));
			else if (props.options !== void 0) child.push(h(QSeparator_default, { dark: isDark.value }), h(QCardSection_default, { class: "scroll q-dialog-plugin__form" }, getOptions), h(QSeparator_default, { dark: isDark.value }));
			if (props.ok || props.cancel) child.push(getButtons());
			return child;
		}
		function getContent() {
			return [h(QCard_default, {
				class: [classes.value, props.cardClass],
				style: props.cardStyle,
				dark: isDark.value
			}, getCardContent)];
		}
		Object.assign(proxy, {
			show,
			hide
		});
		return () => h(QDialog_default, {
			ref: dialogRef,
			onHide: onDialogHide
		}, getContent);
	}
});
//#endregion
//#region node_modules/quasar/src/utils/private.dialog/create-dialog.js
function merge(target, source) {
	for (const key in source) if (key !== "spinner" && Object(source[key]) === source[key]) {
		target[key] = Object(target[key]) !== target[key] ? {} : { ...target[key] };
		merge(target[key], source[key]);
	} else target[key] = source[key];
}
function createDialog(DefaultComponent, supportsCustomComponent, parentApp) {
	return (pluginProps) => {
		let DialogComponent, props;
		const isCustom = supportsCustomComponent && pluginProps.component !== void 0;
		if (isCustom) {
			const { component, componentProps } = pluginProps;
			DialogComponent = typeof component === "string" ? parentApp.component(component) : component;
			props = componentProps || {};
		} else {
			const { class: klass, style, ...otherProps } = pluginProps;
			DialogComponent = DefaultComponent;
			props = otherProps;
			if (klass !== void 0) otherProps.cardClass = klass;
			if (style !== void 0) otherProps.cardStyle = style;
		}
		let vm;
		let emittedOK = false;
		const dialogRef = ref(null);
		const el = createGlobalNode(false, "dialog");
		const applyState = (cmd) => {
			if (dialogRef.value?.[cmd] !== void 0) {
				dialogRef.value[cmd]();
				return;
			}
			const target = vm.$.subTree;
			if (target?.component) {
				if (target.component.proxy && target.component.proxy[cmd]) {
					target.component.proxy[cmd]();
					return;
				}
				if (target.component.subTree && target.component.subTree.component && target.component.subTree.component.proxy && target.component.subTree.component.proxy[cmd]) {
					target.component.subTree.component.proxy[cmd]();
					return;
				}
			}
			console.error("[Quasar] Incorrectly defined Dialog component");
		};
		const okFns = [], cancelFns = [], API = {
			onOk(fn) {
				okFns.push(fn);
				return API;
			},
			onCancel(fn) {
				cancelFns.push(fn);
				return API;
			},
			onDismiss(fn) {
				okFns.push(fn);
				cancelFns.push(fn);
				return API;
			},
			hide() {
				applyState("hide");
				return API;
			},
			update(componentProps) {
				if (vm !== null) {
					if (isCustom) Object.assign(props, componentProps);
					else {
						const { class: klass, style, ...cfg } = componentProps;
						if (klass !== void 0) cfg.cardClass = klass;
						if (style !== void 0) cfg.cardStyle = style;
						merge(props, cfg);
					}
					vm.$forceUpdate();
				}
				return API;
			}
		};
		const onOk = (data) => {
			emittedOK = true;
			okFns.forEach((fn) => {
				fn(data);
			});
		};
		const onHide = () => {
			app.unmount(el);
			removeGlobalNode(el);
			app = null;
			vm = null;
			if (!emittedOK) cancelFns.forEach((fn) => {
				fn();
			});
		};
		let app = createChildApp({
			name: "QGlobalDialog",
			setup: () => () => h(DialogComponent, {
				...props,
				ref: dialogRef,
				onOk,
				onHide,
				onVnodeMounted(...args) {
					if (typeof props.onVnodeMounted === "function") props.onVnodeMounted(...args);
					nextTick$1(() => applyState("show"));
				}
			})
		}, parentApp);
		vm = app.mount(el);
		return API;
	};
}
//#endregion
//#region node_modules/quasar/src/plugins/dialog/Dialog.js
var Dialog_default = { install({ $q, parentApp }) {
	$q.dialog = this.create = createDialog(DialogPluginComponent_default, true, parentApp);
} };
//#endregion
//#region node_modules/quasar/src/plugins/loading/Loading.js
var app, vm, uid = 0, timeout = null, props = {}, activeGroups = {};
var originalDefaults = {
	group: "__default_quasar_group__",
	delay: 0,
	message: false,
	html: false,
	spinnerSize: 80,
	spinnerColor: "",
	messageColor: "",
	backgroundColor: "",
	boxClass: "",
	spinner: QSpinner_default,
	customClass: ""
};
var defaults = { ...originalDefaults };
function registerProps(opts) {
	if (opts?.group !== void 0 && activeGroups[opts.group] !== void 0) return Object.assign(activeGroups[opts.group], opts);
	const newProps = isObject$1(opts) && opts.ignoreDefaults ? {
		...originalDefaults,
		...opts
	} : {
		...defaults,
		...opts
	};
	activeGroups[newProps.group] = newProps;
	return newProps;
}
var Plugin$1 = createReactivePlugin({ isActive: false }, {
	show(opts) {
		props = registerProps(opts);
		const { group } = props;
		Plugin$1.isActive = true;
		if (app !== void 0) {
			props.uid = uid;
			vm.$forceUpdate();
		} else {
			props.uid = ++uid;
			if (timeout !== null) clearTimeout(timeout);
			timeout = setTimeout(() => {
				timeout = null;
				const el = createGlobalNode("q-loading");
				app = createChildApp({
					name: "QLoading",
					setup() {
						onMounted(() => {
							preventScroll(true);
						});
						function onAfterLeave() {
							if (!Plugin$1.isActive && app !== void 0) {
								preventScroll(false);
								app.unmount(el);
								removeGlobalNode(el);
								app = void 0;
								vm = void 0;
							}
						}
						function getContent() {
							if (!Plugin$1.isActive) return null;
							const content = [h(props.spinner, {
								class: "q-loading__spinner",
								color: props.spinnerColor,
								size: props.spinnerSize
							})];
							if (props.message) content.push(h("div", {
								class: "q-loading__message" + (props.messageColor ? ` text-${props.messageColor}` : ""),
								[props.html ? "innerHTML" : "textContent"]: props.message
							}));
							return h("div", {
								class: "q-loading fullscreen flex flex-center z-max " + props.customClass.trim(),
								key: props.uid
							}, [h("div", { class: "q-loading__backdrop" + (props.backgroundColor ? ` bg-${props.backgroundColor}` : "") }), h("div", { class: "q-loading__box column items-center " + props.boxClass }, content)]);
						}
						return () => h(Transition, {
							name: "q-transition--fade",
							appear: true,
							onAfterLeave
						}, getContent);
					}
				}, Plugin$1.__parentApp);
				vm = app.mount(el);
			}, props.delay);
		}
		return (paramProps) => {
			if (paramProps === void 0 || Object(paramProps) !== paramProps) {
				Plugin$1.hide(group);
				return;
			}
			Plugin$1.show({
				...paramProps,
				group
			});
		};
	},
	hide(group) {
		if (Plugin$1.isActive) {
			if (group === void 0) activeGroups = {};
			else if (activeGroups[group] === void 0) return;
			else {
				delete activeGroups[group];
				const keys = Object.keys(activeGroups);
				if (keys.length !== 0) {
					const lastGroup = keys.at(-1);
					Plugin$1.show({ group: lastGroup });
					return;
				}
			}
			if (timeout !== null) {
				clearTimeout(timeout);
				timeout = null;
			}
			Plugin$1.isActive = false;
		}
	},
	setDefaults(opts) {
		if (isObject$1(opts)) Object.assign(defaults, opts);
	},
	install({ $q, parentApp }) {
		$q.loading = this;
		Plugin$1.__parentApp = parentApp;
		if ($q.config.loading !== void 0) this.setDefaults($q.config.loading);
	}
});
//#endregion
//#region node_modules/quasar/src/plugins/storage/engine/web-storage.js
function encode(value) {
	if (isDate(value)) return "__q_date|" + value.getTime();
	if (isRegexp(value)) return "__q_expr|" + value.source;
	if (typeof value === "number") return "__q_numb|" + value;
	if (typeof value === "boolean") return "__q_bool|" + (value ? "1" : "0");
	if (typeof value === "string") return "__q_strn|" + value;
	if (typeof value === "function") return "__q_strn|" + value.toString();
	if (value === Object(value)) return "__q_objt|" + JSON.stringify(value);
	return value;
}
var numberRE = /^-?\d+$/;
function decode(value) {
	if (value.length < 9) return value;
	const type = value.slice(0, 8);
	const source = value.slice(9);
	switch (type) {
		case "__q_date": return new Date(numberRE.test(source) ? Number.parseInt(source, 10) : source);
		case "__q_expr": return new RegExp(source);
		case "__q_numb": return Number(source);
		case "__q_bool": return Boolean(source === "1");
		case "__q_strn": return String(source);
		case "__q_objt": return JSON.parse(source);
		default: return value;
	}
}
function getEmptyStorage() {
	return {
		has: () => false,
		hasItem: () => false,
		getLength: () => 0,
		getItem: () => null,
		getIndex: () => null,
		getKey: () => null,
		getAll: () => ({}),
		getAllKeys: () => [],
		set: noop,
		setItem: noop,
		remove: noop,
		removeItem: noop,
		clear: noop,
		isEmpty: () => true
	};
}
function getStorage(type) {
	const webStorage = window[type + "Storage"], get = (key) => {
		const item = webStorage.getItem(key);
		return item ? decode(item) : null;
	};
	const hasItem = (key) => webStorage.getItem(key) !== null;
	const setItem = (key, value) => {
		webStorage.setItem(key, encode(value));
	};
	const removeItem = (key) => {
		webStorage.removeItem(key);
	};
	return {
		has: hasItem,
		hasItem,
		getLength: () => webStorage.length,
		getItem: get,
		getIndex: (index) => index < webStorage.length ? get(webStorage.key(index)) : null,
		getKey: (index) => index < webStorage.length ? webStorage.key(index) : null,
		getAll: () => {
			let key;
			const result = {}, len = webStorage.length;
			for (let i = 0; i < len; i++) {
				key = webStorage.key(i);
				result[key] = get(key);
			}
			return result;
		},
		getAllKeys: () => {
			const result = [], len = webStorage.length;
			for (let i = 0; i < len; i++) result.push(webStorage.key(i));
			return result;
		},
		set: setItem,
		setItem,
		remove: removeItem,
		removeItem,
		clear: () => {
			webStorage.clear();
		},
		isEmpty: () => webStorage.length === 0
	};
}
//#endregion
//#region node_modules/quasar/src/plugins/storage/LocalStorage.js
var storage = !client.has.webStorage ? getEmptyStorage() : getStorage("local");
//#endregion
//#region .quasar/prod-capacitor-android/quasar-user-options.js
/**
* THIS FILE IS GENERATED AUTOMATICALLY.
* DO NOT EDIT.
*
* You are probably looking on adding startup/initialization code.
* Use "quasar new boot <name>" and add it there.
* One boot file per concern. Then reference the file(s) in quasar.config file > boot:
* boot: ['file', ...] // do not add ".js" extension to it.
*
* Boot files are your "main.js"
**/
var quasar_user_options_default = {
	config: {
		"dark": true,
		"brand": {
			"primary": "#00BCD4",
			"secondary": "#26A69A",
			"accent": "#9C27B0",
			"dark": "#1D1D1D",
			"dark-page": "#121212",
			"positive": "#4CAF50",
			"negative": "#F44336",
			"info": "#2196F3",
			"warning": "#FF9800"
		}
	},
	plugins: {
		Notify: Notify_default,
		Dialog: Dialog_default,
		Loading: Plugin$1,
		LocalStorage: {
			install({ $q }) {
				$q.localStorage = storage;
			},
			...storage
		}
	}
};
//#endregion
//#region .quasar/prod-capacitor-android/client-entry.js
/**
* THIS FILE IS GENERATED AUTOMATICALLY.
* DO NOT EDIT.
*
* You are probably looking on adding startup/initialization code.
* Use "quasar new boot <name>" and add it there.
* One boot file per concern. Then reference the file(s) in quasar.config file > boot:
* boot: ['file', ...] // do not add ".js" extension to it.
*
* Boot files are your "main.js"
**/
var publicPath = ``;
async function start({ app, router, store }, bootFiles) {
	let hasRedirected = false;
	const getRedirectUrl = (url) => {
		try {
			return router.resolve(url).href;
		} catch (err) {}
		return Object(url) === url ? null : url;
	};
	const redirect = (url) => {
		hasRedirected = true;
		if (typeof url === "string" && /^https?:\/\//.test(url)) {
			window.location.href = url;
			return;
		}
		const href = getRedirectUrl(url);
		if (href !== null) {
			window.location.href = href;
			window.location.reload();
		}
	};
	const urlPath = window.location.href.replace(window.location.origin, "");
	for (let i = 0; hasRedirected === false && i < bootFiles.length; i++) try {
		await bootFiles[i]({
			app,
			router,
			store,
			ssrContext: null,
			redirect,
			urlPath,
			publicPath
		});
	} catch (err) {
		if (err && err.url) {
			redirect(err.url);
			return;
		}
		console.error("[Quasar] boot error:", err);
		return;
	}
	if (hasRedirected === true) return;
	app.use(router);
	app.mount("#q-app");
}
app_default(createApp, quasar_user_options_default).then((app) => {
	const [method, mapFn] = Promise.allSettled !== void 0 ? ["allSettled", (bootFiles) => bootFiles.map((result) => {
		if (result.status === "rejected") {
			console.error("[Quasar] boot error:", result.reason);
			return;
		}
		return result.value.default;
	})] : ["all", (bootFiles) => bootFiles.map((entry) => entry.default)];
	return Promise[method]([
		__vitePreload(() => import("./pinia-swN4aULs.js"), __vite__mapDeps([25,5]), import.meta.url),
		__vitePreload(() => import("./sqlite-DKsorewZ.js"), __vite__mapDeps([26,6,1,7]), import.meta.url),
		__vitePreload(() => import("./network-Bd6Y3nLH.js"), [], import.meta.url)
	]).then((bootFiles) => {
		start(app, mapFn(bootFiles).filter((entry) => typeof entry === "function"));
	});
});
//#endregion
export { useTransition as A, getVerticalScrollPosition as C, closePortals as D, closePortalMenus as E, useAuthStore as F, connectSocket as I, disconnectSocket as L, useModelToggle as M, useModelToggleEmits as N, getPortalProxy as O, useModelToggleProps as P, getSocket as R, getScrollbarWidth as S, usePortal as T, removeFocusout as _, fieldValueIsFilled as a, getHorizontalScrollPosition as b, useFieldProps as c, QSeparator_default as d, QCardActions_default as f, addFocusout as g, QDialog_default as h, useFormProps as i, useTransitionProps as j, portalProxyList as k, useFieldState as l, QCard_default as m, useKeyComposition as n, useField as o, QCardSection_default as p, useFormInputNameAttr as r, useFieldEmits as s, QInput_default as t, uid_default as u, addEscapeKey as v, scrollTargetProp as w, getScrollTarget as x, removeEscapeKey as y, boot as z };

//# sourceMappingURL=index-C6i8igny.js.map