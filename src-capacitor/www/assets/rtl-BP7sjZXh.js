//#region node_modules/quasar/src/utils/private.rtl/rtl.js
var rtlHasScrollBug = false;
{
	const scroller = document.createElement("div");
	scroller.setAttribute("dir", "rtl");
	Object.assign(scroller.style, {
		width: "1px",
		height: "1px",
		overflow: "auto"
	});
	const spacer = document.createElement("div");
	Object.assign(spacer.style, {
		width: "1000px",
		height: "1px"
	});
	document.body.append(scroller);
	scroller.append(spacer);
	scroller.scrollLeft = -1e3;
	rtlHasScrollBug = scroller.scrollLeft >= 0;
	scroller.remove();
}
//#endregion
export { rtlHasScrollBug as t };

//# sourceMappingURL=rtl-BP7sjZXh.js.map