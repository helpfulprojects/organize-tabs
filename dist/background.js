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
function labelPropagation(graph) {
    let labels = {};
    let converged = false;
    Object.keys(graph).forEach((node) => {
        labels[node] = node;
    });
    while (!converged) {
        converged = true;
        const nodes = Object.keys(graph);
        nodes.sort(() => Math.random() - 0.5);
        for (let node of nodes) {
            let labelCounts = {};
            for (let neighbor in graph[node]) {
                let neighborLabel = labels[neighbor];
                if (!labelCounts[neighborLabel]) {
                    labelCounts[neighborLabel] = 0;
                }
                labelCounts[neighborLabel] += graph[node][neighbor];
            }
            let bestLabel = Object.keys(labelCounts).reduce((a, b) => labelCounts[a] > labelCounts[b] ? a : b);
            if (labels[node] !== bestLabel) {
                labels[node] = bestLabel;
                converged = false;
            }
        }
    }
    return labels;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDO1FBQzlCLFdBQVcsQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFDRCxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMzQixNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDeEMsQ0FBQyxDQUFDLENBQUM7QUFFSCxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsVUFBVSxPQUFPLEVBQUUsTUFBTSxFQUFFLFlBQVk7SUFDMUUsSUFBSSxPQUFPLENBQUMsT0FBTyxLQUFLLE9BQU8sRUFBRSxDQUFDO1FBQ2hDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDbkIsV0FBVyxFQUFFLENBQUM7UUFDZCxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQ3RCLENBQUMsZUFBZSxFQUFFLE9BQU8sQ0FBQyxFQUMxQixDQUFDLE1BQW1CLEVBQUUsRUFBRTtZQUN0QixXQUFXLEdBQUcsTUFBTSxDQUFDO1FBQ3ZCLENBQUMsQ0FDRixDQUFDO0lBQ0osQ0FBQztBQUNILENBQUMsQ0FBQyxDQUFDOzs7Ozs7O1VDbkpIO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7Ozs7Ozs7OztBQ3RCQSx1RUFBMEIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vcmdhbmlzZS10YWJzLy4vc3JjL2xpc3Rlbi10by10YWJzLnRzIiwid2VicGFjazovL29yZ2FuaXNlLXRhYnMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb3JnYW5pc2UtdGFicy8uL3NyYy9zZXJ2aWNlLXdvcmtlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgdHlwZSBHcmFwaCA9IHtcclxuICBbbm9kZTogc3RyaW5nXToge1xyXG4gICAgW25laWdoYm9yOiBzdHJpbmddOiBudW1iZXI7XHJcbiAgfTtcclxufTtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgU3RvcmFnZURhdGEge1xyXG4gIGxhc3RIaWdobGlnaHQ6IHN0cmluZyB8IG51bGw7XHJcbiAgZ3JhcGg6IEdyYXBoO1xyXG59XHJcblxyXG5sZXQgc3RvcmFnZURhdGE6IFN0b3JhZ2VEYXRhIHwgbnVsbDtcclxuY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KFtcImxhc3RIaWdobGlnaHRcIiwgXCJncmFwaFwiXSwgKHJlc3VsdDogU3RvcmFnZURhdGEpID0+IHtcclxuICBzdG9yYWdlRGF0YSA9IHJlc3VsdDtcclxufSk7XHJcbmV4cG9ydCBmdW5jdGlvbiBpbml0U3RvcmFnZSgpIHtcclxuICBjb25zdCBpbml0aWFsRGF0YTogU3RvcmFnZURhdGEgPSB7XHJcbiAgICBsYXN0SGlnaGxpZ2h0OiBudWxsLFxyXG4gICAgZ3JhcGg6IHt9LFxyXG4gIH07XHJcblxyXG4gIGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldChpbml0aWFsRGF0YSk7XHJcbn1cclxuXHJcbmNocm9tZS5ydW50aW1lLm9uSW5zdGFsbGVkLmFkZExpc3RlbmVyKCh7IHJlYXNvbiB9KSA9PiB7XHJcbiAgaWYgKHJlYXNvbiA9PT0gXCJpbnN0YWxsXCIpIHtcclxuICAgIGluaXRTdG9yYWdlKCk7XHJcbiAgfVxyXG59KTtcclxuXHJcbmZ1bmN0aW9uIGFkZEVkZ2UoXHJcbiAgZ3JhcGg6IEdyYXBoLFxyXG4gIG5vZGUxOiBzdHJpbmcsXHJcbiAgbm9kZTI6IHN0cmluZyxcclxuICB3ZWlnaHQ6IG51bWJlciA9IDFcclxuKTogdm9pZCB7XHJcbiAgaWYgKCFncmFwaFtub2RlMV0pIHtcclxuICAgIGdyYXBoW25vZGUxXSA9IHt9O1xyXG4gIH1cclxuICBpZiAoIWdyYXBoW25vZGUyXSkge1xyXG4gICAgZ3JhcGhbbm9kZTJdID0ge307XHJcbiAgfVxyXG4gIGdyYXBoW25vZGUxXVtub2RlMl0gPSB3ZWlnaHQ7XHJcbiAgZ3JhcGhbbm9kZTJdW25vZGUxXSA9IHdlaWdodDtcclxufVxyXG5cclxuZnVuY3Rpb24gaW5jcmVhc2VFZGdlV2VpZ2h0KGdyYXBoOiBHcmFwaCwgbm9kZTE6IHN0cmluZywgbm9kZTI6IHN0cmluZyk6IHZvaWQge1xyXG4gIGlmICghZ3JhcGhbbm9kZTFdIHx8ICFncmFwaFtub2RlMV1bbm9kZTJdKSB7XHJcbiAgICBhZGRFZGdlKGdyYXBoLCBub2RlMSwgbm9kZTIpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBncmFwaFtub2RlMV1bbm9kZTJdICs9IDE7XHJcbiAgICBncmFwaFtub2RlMl1bbm9kZTFdICs9IDE7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiByZW1vdmVOb2RlKGdyYXBoOiBHcmFwaCwgbm9kZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgaWYgKGdyYXBoW25vZGVdKSB7XHJcbiAgICBmb3IgKGxldCBuZWlnaGJvciBpbiBncmFwaFtub2RlXSkge1xyXG4gICAgICBkZWxldGUgZ3JhcGhbbmVpZ2hib3JdW25vZGVdO1xyXG4gICAgfVxyXG4gICAgZGVsZXRlIGdyYXBoW25vZGVdO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gbGFiZWxQcm9wYWdhdGlvbihncmFwaDogR3JhcGgpOiB7IFtub2RlOiBzdHJpbmddOiBzdHJpbmcgfSB7XHJcbiAgbGV0IGxhYmVsczogeyBbbm9kZTogc3RyaW5nXTogc3RyaW5nIH0gPSB7fTtcclxuICBsZXQgY29udmVyZ2VkID0gZmFsc2U7XHJcblxyXG4gIE9iamVjdC5rZXlzKGdyYXBoKS5mb3JFYWNoKChub2RlKSA9PiB7XHJcbiAgICBsYWJlbHNbbm9kZV0gPSBub2RlO1xyXG4gIH0pO1xyXG5cclxuICB3aGlsZSAoIWNvbnZlcmdlZCkge1xyXG4gICAgY29udmVyZ2VkID0gdHJ1ZTtcclxuXHJcbiAgICBjb25zdCBub2RlcyA9IE9iamVjdC5rZXlzKGdyYXBoKTtcclxuICAgIG5vZGVzLnNvcnQoKCkgPT4gTWF0aC5yYW5kb20oKSAtIDAuNSk7XHJcblxyXG4gICAgZm9yIChsZXQgbm9kZSBvZiBub2Rlcykge1xyXG4gICAgICBsZXQgbGFiZWxDb3VudHM6IHsgW2xhYmVsOiBzdHJpbmddOiBudW1iZXIgfSA9IHt9O1xyXG5cclxuICAgICAgZm9yIChsZXQgbmVpZ2hib3IgaW4gZ3JhcGhbbm9kZV0pIHtcclxuICAgICAgICBsZXQgbmVpZ2hib3JMYWJlbCA9IGxhYmVsc1tuZWlnaGJvcl07XHJcbiAgICAgICAgaWYgKCFsYWJlbENvdW50c1tuZWlnaGJvckxhYmVsXSkge1xyXG4gICAgICAgICAgbGFiZWxDb3VudHNbbmVpZ2hib3JMYWJlbF0gPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsYWJlbENvdW50c1tuZWlnaGJvckxhYmVsXSArPSBncmFwaFtub2RlXVtuZWlnaGJvcl07XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGxldCBiZXN0TGFiZWwgPSBPYmplY3Qua2V5cyhsYWJlbENvdW50cykucmVkdWNlKChhLCBiKSA9PlxyXG4gICAgICAgIGxhYmVsQ291bnRzW2FdID4gbGFiZWxDb3VudHNbYl0gPyBhIDogYlxyXG4gICAgICApO1xyXG5cclxuICAgICAgaWYgKGxhYmVsc1tub2RlXSAhPT0gYmVzdExhYmVsKSB7XHJcbiAgICAgICAgbGFiZWxzW25vZGVdID0gYmVzdExhYmVsO1xyXG4gICAgICAgIGNvbnZlcmdlZCA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gbGFiZWxzO1xyXG59XHJcbmNocm9tZS50YWJzLm9uUmVtb3ZlZC5hZGRMaXN0ZW5lcigodGFiSWQpID0+IHtcclxuICBpZiAoIXN0b3JhZ2VEYXRhKSByZXR1cm47XHJcbiAgcmVtb3ZlVGFiKHRhYklkLnRvU3RyaW5nKCkpO1xyXG4gIHVwZGF0ZUxhc3RIaWdobGlnaHQobnVsbCk7XHJcbiAgY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KHN0b3JhZ2VEYXRhKTtcclxufSk7XHJcbmZ1bmN0aW9uIHVwZGF0ZUxhc3RIaWdobGlnaHQodGFiSWQ6IHN0cmluZyB8IG51bGwpIHtcclxuICBpZiAoIXN0b3JhZ2VEYXRhKSByZXR1cm47XHJcbiAgc3RvcmFnZURhdGEubGFzdEhpZ2hsaWdodCA9IHRhYklkO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjb25uZWN0VGFicyh0YWJBOiBzdHJpbmcsIHRhYkI6IHN0cmluZykge1xyXG4gIGlmICghc3RvcmFnZURhdGEpIHJldHVybjtcclxuICBpbmNyZWFzZUVkZ2VXZWlnaHQoc3RvcmFnZURhdGEuZ3JhcGgsIHRhYkEsIHRhYkIpO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZW1vdmVUYWIodGFiSWQ6IHN0cmluZykge1xyXG4gIGlmICghc3RvcmFnZURhdGEpIHJldHVybjtcclxuICByZW1vdmVOb2RlKHN0b3JhZ2VEYXRhLmdyYXBoLCB0YWJJZCk7XHJcbn1cclxuY2hyb21lLnRhYnMub25IaWdobGlnaHRlZC5hZGRMaXN0ZW5lcigoaGlnaGxpZ2h0SW5mbykgPT4ge1xyXG4gIGlmICghc3RvcmFnZURhdGEpIHJldHVybjtcclxuICBjb25zdCB0YWJJZHMgPSBoaWdobGlnaHRJbmZvLnRhYklkcztcclxuICBpZiAodGFiSWRzLmxlbmd0aCAhPSAxKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG4gIGNvbnN0IHRhYklkID0gdGFiSWRzWzBdLnRvU3RyaW5nKCk7XHJcbiAgaWYgKHN0b3JhZ2VEYXRhLmxhc3RIaWdobGlnaHQpIHtcclxuICAgIGNvbm5lY3RUYWJzKHN0b3JhZ2VEYXRhLmxhc3RIaWdobGlnaHQsIHRhYklkKTtcclxuICB9XHJcbiAgdXBkYXRlTGFzdEhpZ2hsaWdodCh0YWJJZCk7XHJcbiAgY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KHN0b3JhZ2VEYXRhKTtcclxufSk7XHJcblxyXG5jaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoZnVuY3Rpb24gKHJlcXVlc3QsIHNlbmRlciwgc2VuZFJlc3BvbnNlKSB7XHJcbiAgaWYgKHJlcXVlc3QubWVzc2FnZSA9PT0gXCJjbGVhclwiKSB7XHJcbiAgICBzdG9yYWdlRGF0YSA9IG51bGw7XHJcbiAgICBpbml0U3RvcmFnZSgpO1xyXG4gICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KFxyXG4gICAgICBbXCJsYXN0SGlnaGxpZ2h0XCIsIFwiZ3JhcGhcIl0sXHJcbiAgICAgIChyZXN1bHQ6IFN0b3JhZ2VEYXRhKSA9PiB7XHJcbiAgICAgICAgc3RvcmFnZURhdGEgPSByZXN1bHQ7XHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgfVxyXG59KTtcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsImltcG9ydCBcIi4vbGlzdGVuLXRvLXRhYnNcIjtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9