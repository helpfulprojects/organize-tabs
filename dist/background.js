/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/listen-to-tabs.ts":
/*!*******************************!*\
  !*** ./src/listen-to-tabs.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.initStorage = initStorage;
let storageData;
chrome.storage.local.get(["lastHighlight", "graph"], (result) => {
    storageData = result;
});
function initStorage() {
    const initialData = {
        lastHighlight: null,
        graph: {},
    };
    chrome.storage.local.set(initialData);
}
chrome.runtime.onInstalled.addListener(({ reason }) => {
    if (reason === "install") {
        initStorage();
    }
});
function addEdge(graph, node1, node2, weight = 1) {
    if (!graph[node1]) {
        graph[node1] = {};
    }
    if (!graph[node2]) {
        graph[node2] = {};
    }
    graph[node1][node2] = weight;
    graph[node2][node1] = weight;
}
function increaseEdgeWeight(graph, node1, node2) {
    if (!graph[node1] || !graph[node1][node2]) {
        addEdge(graph, node1, node2);
    }
    else {
        graph[node1][node2] += 1;
        graph[node2][node1] += 1;
    }
}
function removeNode(graph, node) {
    if (graph[node]) {
        for (let neighbor in graph[node]) {
            delete graph[neighbor][node];
        }
        delete graph[node];
    }
}
chrome.tabs.onRemoved.addListener((tabId) => {
    if (!storageData)
        return;
    removeTab(tabId.toString());
    updateLastHighlight(null);
    chrome.storage.local.set(storageData);
});
function updateLastHighlight(tabId) {
    if (!storageData)
        return;
    storageData.lastHighlight = tabId;
}
function connectTabs(tabA, tabB) {
    if (!storageData)
        return;
    increaseEdgeWeight(storageData.graph, tabA, tabB);
}
function removeTab(tabId) {
    if (!storageData)
        return;
    removeNode(storageData.graph, tabId);
}
chrome.tabs.onHighlighted.addListener((highlightInfo) => {
    if (!storageData)
        return;
    const tabIds = highlightInfo.tabIds;
    if (tabIds.length != 1) {
        return;
    }
    const tabId = tabIds[0].toString();
    if (storageData.lastHighlight) {
        connectTabs(storageData.lastHighlight, tabId);
    }
    updateLastHighlight(tabId);
    chrome.storage.local.set(storageData);
});
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.message === "clear") {
        storageData = null;
        initStorage();
        chrome.storage.local.get(["lastHighlight", "graph"], (result) => {
            storageData = result;
        });
    }
});


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!*******************************!*\
  !*** ./src/service-worker.ts ***!
  \*******************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(/*! ./listen-to-tabs */ "./src/listen-to-tabs.ts");

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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WTtJQUMxRSxJQUFJLE9BQU8sQ0FBQyxPQUFPLEtBQUssT0FBTyxFQUFFLENBQUM7UUFDaEMsV0FBVyxHQUFHLElBQUksQ0FBQztRQUNuQixXQUFXLEVBQUUsQ0FBQztRQUNkLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FDdEIsQ0FBQyxlQUFlLEVBQUUsT0FBTyxDQUFDLEVBQzFCLENBQUMsTUFBbUIsRUFBRSxFQUFFO1lBQ3RCLFdBQVcsR0FBRyxNQUFNLENBQUM7UUFDdkIsQ0FBQyxDQUNGLENBQUM7SUFDSixDQUFDO0FBQ0gsQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7VUM3R0g7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7Ozs7Ozs7O0FDdEJBLHVFQUEwQiIsInNvdXJjZXMiOlsid2VicGFjazovL29yZ2FuaXNlLXRhYnMvLi9zcmMvbGlzdGVuLXRvLXRhYnMudHMiLCJ3ZWJwYWNrOi8vb3JnYW5pc2UtdGFicy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vcmdhbmlzZS10YWJzLy4vc3JjL3NlcnZpY2Utd29ya2VyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCB0eXBlIEdyYXBoID0ge1xyXG4gIFtub2RlOiBzdHJpbmddOiB7XHJcbiAgICBbbmVpZ2hib3I6IHN0cmluZ106IG51bWJlcjtcclxuICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBTdG9yYWdlRGF0YSB7XHJcbiAgbGFzdEhpZ2hsaWdodDogc3RyaW5nIHwgbnVsbDtcclxuICBncmFwaDogR3JhcGg7XHJcbn1cclxuXHJcbmxldCBzdG9yYWdlRGF0YTogU3RvcmFnZURhdGEgfCBudWxsO1xyXG5jaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoW1wibGFzdEhpZ2hsaWdodFwiLCBcImdyYXBoXCJdLCAocmVzdWx0OiBTdG9yYWdlRGF0YSkgPT4ge1xyXG4gIHN0b3JhZ2VEYXRhID0gcmVzdWx0O1xyXG59KTtcclxuZXhwb3J0IGZ1bmN0aW9uIGluaXRTdG9yYWdlKCkge1xyXG4gIGNvbnN0IGluaXRpYWxEYXRhOiBTdG9yYWdlRGF0YSA9IHtcclxuICAgIGxhc3RIaWdobGlnaHQ6IG51bGwsXHJcbiAgICBncmFwaDoge30sXHJcbiAgfTtcclxuXHJcbiAgY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KGluaXRpYWxEYXRhKTtcclxufVxyXG5cclxuY2hyb21lLnJ1bnRpbWUub25JbnN0YWxsZWQuYWRkTGlzdGVuZXIoKHsgcmVhc29uIH0pID0+IHtcclxuICBpZiAocmVhc29uID09PSBcImluc3RhbGxcIikge1xyXG4gICAgaW5pdFN0b3JhZ2UoKTtcclxuICB9XHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gYWRkRWRnZShcclxuICBncmFwaDogR3JhcGgsXHJcbiAgbm9kZTE6IHN0cmluZyxcclxuICBub2RlMjogc3RyaW5nLFxyXG4gIHdlaWdodDogbnVtYmVyID0gMVxyXG4pOiB2b2lkIHtcclxuICBpZiAoIWdyYXBoW25vZGUxXSkge1xyXG4gICAgZ3JhcGhbbm9kZTFdID0ge307XHJcbiAgfVxyXG4gIGlmICghZ3JhcGhbbm9kZTJdKSB7XHJcbiAgICBncmFwaFtub2RlMl0gPSB7fTtcclxuICB9XHJcbiAgZ3JhcGhbbm9kZTFdW25vZGUyXSA9IHdlaWdodDtcclxuICBncmFwaFtub2RlMl1bbm9kZTFdID0gd2VpZ2h0O1xyXG59XHJcblxyXG5mdW5jdGlvbiBpbmNyZWFzZUVkZ2VXZWlnaHQoZ3JhcGg6IEdyYXBoLCBub2RlMTogc3RyaW5nLCBub2RlMjogc3RyaW5nKTogdm9pZCB7XHJcbiAgaWYgKCFncmFwaFtub2RlMV0gfHwgIWdyYXBoW25vZGUxXVtub2RlMl0pIHtcclxuICAgIGFkZEVkZ2UoZ3JhcGgsIG5vZGUxLCBub2RlMik7XHJcbiAgfSBlbHNlIHtcclxuICAgIGdyYXBoW25vZGUxXVtub2RlMl0gKz0gMTtcclxuICAgIGdyYXBoW25vZGUyXVtub2RlMV0gKz0gMTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbW92ZU5vZGUoZ3JhcGg6IEdyYXBoLCBub2RlOiBzdHJpbmcpOiB2b2lkIHtcclxuICBpZiAoZ3JhcGhbbm9kZV0pIHtcclxuICAgIGZvciAobGV0IG5laWdoYm9yIGluIGdyYXBoW25vZGVdKSB7XHJcbiAgICAgIGRlbGV0ZSBncmFwaFtuZWlnaGJvcl1bbm9kZV07XHJcbiAgICB9XHJcbiAgICBkZWxldGUgZ3JhcGhbbm9kZV07XHJcbiAgfVxyXG59XHJcblxyXG5jaHJvbWUudGFicy5vblJlbW92ZWQuYWRkTGlzdGVuZXIoKHRhYklkKSA9PiB7XHJcbiAgaWYgKCFzdG9yYWdlRGF0YSkgcmV0dXJuO1xyXG4gIHJlbW92ZVRhYih0YWJJZC50b1N0cmluZygpKTtcclxuICB1cGRhdGVMYXN0SGlnaGxpZ2h0KG51bGwpO1xyXG4gIGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldChzdG9yYWdlRGF0YSk7XHJcbn0pO1xyXG5mdW5jdGlvbiB1cGRhdGVMYXN0SGlnaGxpZ2h0KHRhYklkOiBzdHJpbmcgfCBudWxsKSB7XHJcbiAgaWYgKCFzdG9yYWdlRGF0YSkgcmV0dXJuO1xyXG4gIHN0b3JhZ2VEYXRhLmxhc3RIaWdobGlnaHQgPSB0YWJJZDtcclxufVxyXG5cclxuZnVuY3Rpb24gY29ubmVjdFRhYnModGFiQTogc3RyaW5nLCB0YWJCOiBzdHJpbmcpIHtcclxuICBpZiAoIXN0b3JhZ2VEYXRhKSByZXR1cm47XHJcbiAgaW5jcmVhc2VFZGdlV2VpZ2h0KHN0b3JhZ2VEYXRhLmdyYXBoLCB0YWJBLCB0YWJCKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlVGFiKHRhYklkOiBzdHJpbmcpIHtcclxuICBpZiAoIXN0b3JhZ2VEYXRhKSByZXR1cm47XHJcbiAgcmVtb3ZlTm9kZShzdG9yYWdlRGF0YS5ncmFwaCwgdGFiSWQpO1xyXG59XHJcbmNocm9tZS50YWJzLm9uSGlnaGxpZ2h0ZWQuYWRkTGlzdGVuZXIoKGhpZ2hsaWdodEluZm8pID0+IHtcclxuICBpZiAoIXN0b3JhZ2VEYXRhKSByZXR1cm47XHJcbiAgY29uc3QgdGFiSWRzID0gaGlnaGxpZ2h0SW5mby50YWJJZHM7XHJcbiAgaWYgKHRhYklkcy5sZW5ndGggIT0gMSkge1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuICBjb25zdCB0YWJJZCA9IHRhYklkc1swXS50b1N0cmluZygpO1xyXG4gIGlmIChzdG9yYWdlRGF0YS5sYXN0SGlnaGxpZ2h0KSB7XHJcbiAgICBjb25uZWN0VGFicyhzdG9yYWdlRGF0YS5sYXN0SGlnaGxpZ2h0LCB0YWJJZCk7XHJcbiAgfVxyXG4gIHVwZGF0ZUxhc3RIaWdobGlnaHQodGFiSWQpO1xyXG4gIGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldChzdG9yYWdlRGF0YSk7XHJcbn0pO1xyXG5cclxuY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKGZ1bmN0aW9uIChyZXF1ZXN0LCBzZW5kZXIsIHNlbmRSZXNwb25zZSkge1xyXG4gIGlmIChyZXF1ZXN0Lm1lc3NhZ2UgPT09IFwiY2xlYXJcIikge1xyXG4gICAgc3RvcmFnZURhdGEgPSBudWxsO1xyXG4gICAgaW5pdFN0b3JhZ2UoKTtcclxuICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldChcclxuICAgICAgW1wibGFzdEhpZ2hsaWdodFwiLCBcImdyYXBoXCJdLFxyXG4gICAgICAocmVzdWx0OiBTdG9yYWdlRGF0YSkgPT4ge1xyXG4gICAgICAgIHN0b3JhZ2VEYXRhID0gcmVzdWx0O1xyXG4gICAgICB9XHJcbiAgICApO1xyXG4gIH1cclxufSk7XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJpbXBvcnQgXCIuL2xpc3Rlbi10by10YWJzXCI7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==