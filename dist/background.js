/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/listen-to-tabs.ts":
/*!*******************************!*\
  !*** ./src/listen-to-tabs.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
chrome.tabs.onHighlighted.addListener((highlightInfo) => __awaiter(void 0, void 0, void 0, function* () {
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
    yield removeMissingTabs();
    chrome.storage.local.set(storageData);
}));
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.message === "clear") {
        storageData = null;
        initStorage();
        chrome.storage.local.get(["lastHighlight", "graph"], (result) => {
            storageData = result;
        });
    }
});
function removeMissingTabs() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!storageData)
            return;
        const tabs = yield chrome.tabs.query({});
        const currentTabs = tabs.map(({ id }) => id === null || id === void 0 ? void 0 : id.toString());
        Object.keys(storageData.graph).forEach((node) => {
            if (!currentTabs.includes(node)) {
                removeTab(node);
            }
        });
    });
}


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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2dyb3VuZC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFlQSxrQ0FPQztBQVhELElBQUksV0FBK0IsQ0FBQztBQUNwQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxlQUFlLEVBQUUsT0FBTyxDQUFDLEVBQUUsQ0FBQyxNQUFtQixFQUFFLEVBQUU7SUFDM0UsV0FBVyxHQUFHLE1BQU0sQ0FBQztBQUN2QixDQUFDLENBQUMsQ0FBQztBQUNILFNBQWdCLFdBQVc7SUFDekIsTUFBTSxXQUFXLEdBQWdCO1FBQy9CLGFBQWEsRUFBRSxJQUFJO1FBQ25CLEtBQUssRUFBRSxFQUFFO0tBQ1YsQ0FBQztJQUVGLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUN4QyxDQUFDO0FBRUQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO0lBQ3BELElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRSxDQUFDO1FBQ3pCLFdBQVcsRUFBRSxDQUFDO0lBQ2hCLENBQUM7QUFDSCxDQUFDLENBQUMsQ0FBQztBQUVILFNBQVMsT0FBTyxDQUNkLEtBQVksRUFDWixLQUFhLEVBQ2IsS0FBYSxFQUNiLFNBQWlCLENBQUM7SUFFbEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO1FBQ2xCLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUNELElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztRQUNsQixLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFDRCxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsTUFBTSxDQUFDO0lBQzdCLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxNQUFNLENBQUM7QUFDL0IsQ0FBQztBQUVELFNBQVMsa0JBQWtCLENBQUMsS0FBWSxFQUFFLEtBQWEsRUFBRSxLQUFhO0lBQ3BFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztRQUMxQyxPQUFPLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztJQUMvQixDQUFDO1NBQU0sQ0FBQztRQUNOLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekIsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzQixDQUFDO0FBQ0gsQ0FBQztBQUVELFNBQVMsVUFBVSxDQUFDLEtBQVksRUFBRSxJQUFZO0lBQzVDLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDaEIsS0FBSyxJQUFJLFFBQVEsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUNqQyxPQUFPLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQixDQUFDO1FBQ0QsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDckIsQ0FBQztBQUNILENBQUM7QUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtJQUMxQyxJQUFJLENBQUMsV0FBVztRQUFFLE9BQU87SUFDekIsU0FBUyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBQzVCLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzFCLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUN4QyxDQUFDLENBQUMsQ0FBQztBQUNILFNBQVMsbUJBQW1CLENBQUMsS0FBb0I7SUFDL0MsSUFBSSxDQUFDLFdBQVc7UUFBRSxPQUFPO0lBQ3pCLFdBQVcsQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO0FBQ3BDLENBQUM7QUFFRCxTQUFTLFdBQVcsQ0FBQyxJQUFZLEVBQUUsSUFBWTtJQUM3QyxJQUFJLENBQUMsV0FBVztRQUFFLE9BQU87SUFDekIsa0JBQWtCLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDcEQsQ0FBQztBQUVELFNBQVMsU0FBUyxDQUFDLEtBQWE7SUFDOUIsSUFBSSxDQUFDLFdBQVc7UUFBRSxPQUFPO0lBQ3pCLFVBQVUsQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ3ZDLENBQUM7QUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBTyxhQUFhLEVBQUUsRUFBRTtJQUM1RCxJQUFJLENBQUMsV0FBVztRQUFFLE9BQU87SUFDekIsTUFBTSxNQUFNLEdBQUcsYUFBYSxDQUFDLE1BQU0sQ0FBQztJQUNwQyxJQUFJLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDdkIsT0FBTztJQUNULENBQUM7SUFDRCxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDbkMsSUFBSSxXQUFXLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDOUIsV0FBVyxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUNELG1CQUFtQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzNCLE1BQU0saUJBQWlCLEVBQUUsQ0FBQztJQUMxQixNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDeEMsQ0FBQyxFQUFDLENBQUM7QUFFSCxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsVUFBVSxPQUFPLEVBQUUsTUFBTSxFQUFFLFlBQVk7SUFDMUUsSUFBSSxPQUFPLENBQUMsT0FBTyxLQUFLLE9BQU8sRUFBRSxDQUFDO1FBQ2hDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDbkIsV0FBVyxFQUFFLENBQUM7UUFDZCxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQ3RCLENBQUMsZUFBZSxFQUFFLE9BQU8sQ0FBQyxFQUMxQixDQUFDLE1BQW1CLEVBQUUsRUFBRTtZQUN0QixXQUFXLEdBQUcsTUFBTSxDQUFDO1FBQ3ZCLENBQUMsQ0FDRixDQUFDO0lBQ0osQ0FBQztBQUNILENBQUMsQ0FBQyxDQUFDO0FBRUgsU0FBZSxpQkFBaUI7O1FBQzlCLElBQUksQ0FBQyxXQUFXO1lBQUUsT0FBTztRQUN6QixNQUFNLElBQUksR0FBRyxNQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3pDLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLGFBQUYsRUFBRSx1QkFBRixFQUFFLENBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUN6RCxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUM5QyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO2dCQUNoQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbEIsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUFBOzs7Ozs7O1VDekhEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7Ozs7Ozs7OztBQ3RCQSx1RUFBMEIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vcmdhbmlzZS10YWJzLy4vc3JjL2xpc3Rlbi10by10YWJzLnRzIiwid2VicGFjazovL29yZ2FuaXNlLXRhYnMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb3JnYW5pc2UtdGFicy8uL3NyYy9zZXJ2aWNlLXdvcmtlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgdHlwZSBHcmFwaCA9IHtcclxuICBbbm9kZTogc3RyaW5nXToge1xyXG4gICAgW25laWdoYm9yOiBzdHJpbmddOiBudW1iZXI7XHJcbiAgfTtcclxufTtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgU3RvcmFnZURhdGEge1xyXG4gIGxhc3RIaWdobGlnaHQ6IHN0cmluZyB8IG51bGw7XHJcbiAgZ3JhcGg6IEdyYXBoO1xyXG59XHJcblxyXG5sZXQgc3RvcmFnZURhdGE6IFN0b3JhZ2VEYXRhIHwgbnVsbDtcclxuY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KFtcImxhc3RIaWdobGlnaHRcIiwgXCJncmFwaFwiXSwgKHJlc3VsdDogU3RvcmFnZURhdGEpID0+IHtcclxuICBzdG9yYWdlRGF0YSA9IHJlc3VsdDtcclxufSk7XHJcbmV4cG9ydCBmdW5jdGlvbiBpbml0U3RvcmFnZSgpIHtcclxuICBjb25zdCBpbml0aWFsRGF0YTogU3RvcmFnZURhdGEgPSB7XHJcbiAgICBsYXN0SGlnaGxpZ2h0OiBudWxsLFxyXG4gICAgZ3JhcGg6IHt9LFxyXG4gIH07XHJcblxyXG4gIGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldChpbml0aWFsRGF0YSk7XHJcbn1cclxuXHJcbmNocm9tZS5ydW50aW1lLm9uSW5zdGFsbGVkLmFkZExpc3RlbmVyKCh7IHJlYXNvbiB9KSA9PiB7XHJcbiAgaWYgKHJlYXNvbiA9PT0gXCJpbnN0YWxsXCIpIHtcclxuICAgIGluaXRTdG9yYWdlKCk7XHJcbiAgfVxyXG59KTtcclxuXHJcbmZ1bmN0aW9uIGFkZEVkZ2UoXHJcbiAgZ3JhcGg6IEdyYXBoLFxyXG4gIG5vZGUxOiBzdHJpbmcsXHJcbiAgbm9kZTI6IHN0cmluZyxcclxuICB3ZWlnaHQ6IG51bWJlciA9IDFcclxuKTogdm9pZCB7XHJcbiAgaWYgKCFncmFwaFtub2RlMV0pIHtcclxuICAgIGdyYXBoW25vZGUxXSA9IHt9O1xyXG4gIH1cclxuICBpZiAoIWdyYXBoW25vZGUyXSkge1xyXG4gICAgZ3JhcGhbbm9kZTJdID0ge307XHJcbiAgfVxyXG4gIGdyYXBoW25vZGUxXVtub2RlMl0gPSB3ZWlnaHQ7XHJcbiAgZ3JhcGhbbm9kZTJdW25vZGUxXSA9IHdlaWdodDtcclxufVxyXG5cclxuZnVuY3Rpb24gaW5jcmVhc2VFZGdlV2VpZ2h0KGdyYXBoOiBHcmFwaCwgbm9kZTE6IHN0cmluZywgbm9kZTI6IHN0cmluZyk6IHZvaWQge1xyXG4gIGlmICghZ3JhcGhbbm9kZTFdIHx8ICFncmFwaFtub2RlMV1bbm9kZTJdKSB7XHJcbiAgICBhZGRFZGdlKGdyYXBoLCBub2RlMSwgbm9kZTIpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBncmFwaFtub2RlMV1bbm9kZTJdICs9IDE7XHJcbiAgICBncmFwaFtub2RlMl1bbm9kZTFdICs9IDE7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiByZW1vdmVOb2RlKGdyYXBoOiBHcmFwaCwgbm9kZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgaWYgKGdyYXBoW25vZGVdKSB7XHJcbiAgICBmb3IgKGxldCBuZWlnaGJvciBpbiBncmFwaFtub2RlXSkge1xyXG4gICAgICBkZWxldGUgZ3JhcGhbbmVpZ2hib3JdW25vZGVdO1xyXG4gICAgfVxyXG4gICAgZGVsZXRlIGdyYXBoW25vZGVdO1xyXG4gIH1cclxufVxyXG5cclxuY2hyb21lLnRhYnMub25SZW1vdmVkLmFkZExpc3RlbmVyKCh0YWJJZCkgPT4ge1xyXG4gIGlmICghc3RvcmFnZURhdGEpIHJldHVybjtcclxuICByZW1vdmVUYWIodGFiSWQudG9TdHJpbmcoKSk7XHJcbiAgdXBkYXRlTGFzdEhpZ2hsaWdodChudWxsKTtcclxuICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQoc3RvcmFnZURhdGEpO1xyXG59KTtcclxuZnVuY3Rpb24gdXBkYXRlTGFzdEhpZ2hsaWdodCh0YWJJZDogc3RyaW5nIHwgbnVsbCkge1xyXG4gIGlmICghc3RvcmFnZURhdGEpIHJldHVybjtcclxuICBzdG9yYWdlRGF0YS5sYXN0SGlnaGxpZ2h0ID0gdGFiSWQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNvbm5lY3RUYWJzKHRhYkE6IHN0cmluZywgdGFiQjogc3RyaW5nKSB7XHJcbiAgaWYgKCFzdG9yYWdlRGF0YSkgcmV0dXJuO1xyXG4gIGluY3JlYXNlRWRnZVdlaWdodChzdG9yYWdlRGF0YS5ncmFwaCwgdGFiQSwgdGFiQik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbW92ZVRhYih0YWJJZDogc3RyaW5nKSB7XHJcbiAgaWYgKCFzdG9yYWdlRGF0YSkgcmV0dXJuO1xyXG4gIHJlbW92ZU5vZGUoc3RvcmFnZURhdGEuZ3JhcGgsIHRhYklkKTtcclxufVxyXG5jaHJvbWUudGFicy5vbkhpZ2hsaWdodGVkLmFkZExpc3RlbmVyKGFzeW5jIChoaWdobGlnaHRJbmZvKSA9PiB7XHJcbiAgaWYgKCFzdG9yYWdlRGF0YSkgcmV0dXJuO1xyXG4gIGNvbnN0IHRhYklkcyA9IGhpZ2hsaWdodEluZm8udGFiSWRzO1xyXG4gIGlmICh0YWJJZHMubGVuZ3RoICE9IDEpIHtcclxuICAgIHJldHVybjtcclxuICB9XHJcbiAgY29uc3QgdGFiSWQgPSB0YWJJZHNbMF0udG9TdHJpbmcoKTtcclxuICBpZiAoc3RvcmFnZURhdGEubGFzdEhpZ2hsaWdodCkge1xyXG4gICAgY29ubmVjdFRhYnMoc3RvcmFnZURhdGEubGFzdEhpZ2hsaWdodCwgdGFiSWQpO1xyXG4gIH1cclxuICB1cGRhdGVMYXN0SGlnaGxpZ2h0KHRhYklkKTtcclxuICBhd2FpdCByZW1vdmVNaXNzaW5nVGFicygpO1xyXG4gIGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldChzdG9yYWdlRGF0YSk7XHJcbn0pO1xyXG5cclxuY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKGZ1bmN0aW9uIChyZXF1ZXN0LCBzZW5kZXIsIHNlbmRSZXNwb25zZSkge1xyXG4gIGlmIChyZXF1ZXN0Lm1lc3NhZ2UgPT09IFwiY2xlYXJcIikge1xyXG4gICAgc3RvcmFnZURhdGEgPSBudWxsO1xyXG4gICAgaW5pdFN0b3JhZ2UoKTtcclxuICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldChcclxuICAgICAgW1wibGFzdEhpZ2hsaWdodFwiLCBcImdyYXBoXCJdLFxyXG4gICAgICAocmVzdWx0OiBTdG9yYWdlRGF0YSkgPT4ge1xyXG4gICAgICAgIHN0b3JhZ2VEYXRhID0gcmVzdWx0O1xyXG4gICAgICB9XHJcbiAgICApO1xyXG4gIH1cclxufSk7XHJcblxyXG5hc3luYyBmdW5jdGlvbiByZW1vdmVNaXNzaW5nVGFicygpIHtcclxuICBpZiAoIXN0b3JhZ2VEYXRhKSByZXR1cm47XHJcbiAgY29uc3QgdGFicyA9IGF3YWl0IGNocm9tZS50YWJzLnF1ZXJ5KHt9KTtcclxuICBjb25zdCBjdXJyZW50VGFicyA9IHRhYnMubWFwKCh7IGlkIH0pID0+IGlkPy50b1N0cmluZygpKTtcclxuICBPYmplY3Qua2V5cyhzdG9yYWdlRGF0YS5ncmFwaCkuZm9yRWFjaCgobm9kZSkgPT4ge1xyXG4gICAgaWYgKCFjdXJyZW50VGFicy5pbmNsdWRlcyhub2RlKSkge1xyXG4gICAgICByZW1vdmVUYWIobm9kZSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsImltcG9ydCBcIi4vbGlzdGVuLXRvLXRhYnNcIjtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9