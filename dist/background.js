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
let removedTab = false;
chrome.tabs.onRemoved.addListener((tabId) => __awaiter(void 0, void 0, void 0, function* () {
    removedTab = true;
    removeTab(tabId.toString());
}));
function updateLastHighlight(tabId) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield chrome.storage.local.get([
            "lastHighlight",
            "graph",
        ]);
        result.lastHighlight = tabId;
        return chrome.storage.local.set(result);
    });
}
function connectTabs(tabA, tabB) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("connected tabs", tabA, tabB);
        const result = yield chrome.storage.local.get([
            "lastHighlight",
            "graph",
        ]);
        increaseEdgeWeight(result.graph, tabA, tabB);
        return chrome.storage.local.set(result);
    });
}
function removeTab(tabId) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("remove tab", tabId);
        const result = yield chrome.storage.local.get([
            "lastHighlight",
            "graph",
        ]);
        removeNode(result.graph, tabId);
        result.lastHighlight = null;
        chrome.storage.local.set(result);
    });
}
chrome.tabs.onHighlighted.addListener((highlightInfo) => __awaiter(void 0, void 0, void 0, function* () {
    if (removedTab) {
        removedTab = false;
        return;
    }
    const tabIds = highlightInfo.tabIds;
    if (tabIds.length != 1) {
        return;
    }
    const tabId = tabIds[0].toString();
    const storageData = yield chrome.storage.local.get([
        "lastHighlight",
        "graph",
    ]);
    if (storageData.lastHighlight) {
        yield connectTabs(tabId, storageData.lastHighlight);
    }
    updateLastHighlight(tabId);
}));


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QyxLQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ25DLENBQUM7Q0FBQTtBQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFPLGFBQWEsRUFBRSxFQUFFO0lBQzVELElBQUksVUFBVSxFQUFFLENBQUM7UUFDZixVQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ25CLE9BQU87SUFDVCxDQUFDO0lBQ0QsTUFBTSxNQUFNLEdBQUcsYUFBYSxDQUFDLE1BQU0sQ0FBQztJQUNwQyxJQUFJLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDdkIsT0FBTztJQUNULENBQUM7SUFDRCxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDbkMsTUFBTSxXQUFXLEdBQWdCLE1BQU0sTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO1FBQzlELGVBQWU7UUFDZixPQUFPO0tBQ1IsQ0FBQyxDQUFDO0lBQ0gsSUFBSSxXQUFXLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDOUIsTUFBTSxXQUFXLENBQUMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBQ0QsbUJBQW1CLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDN0IsQ0FBQyxFQUFDLENBQUM7Ozs7Ozs7VUNwSkg7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7Ozs7Ozs7O0FDdEJBLHVFQUEwQiIsInNvdXJjZXMiOlsid2VicGFjazovL29yZ2FuaXNlLXRhYnMvLi9zcmMvbGlzdGVuLXRvLXRhYnMudHMiLCJ3ZWJwYWNrOi8vb3JnYW5pc2UtdGFicy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vcmdhbmlzZS10YWJzLy4vc3JjL3NlcnZpY2Utd29ya2VyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCB0eXBlIEdyYXBoID0ge1xyXG4gIFtub2RlOiBzdHJpbmddOiB7XHJcbiAgICBbbmVpZ2hib3I6IHN0cmluZ106IG51bWJlcjtcclxuICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBTdG9yYWdlRGF0YSB7XHJcbiAgbGFzdEhpZ2hsaWdodDogc3RyaW5nIHwgbnVsbDtcclxuICBncmFwaDogR3JhcGg7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGluaXRTdG9yYWdlKCkge1xyXG4gIGNvbnN0IGluaXRpYWxEYXRhOiBTdG9yYWdlRGF0YSA9IHtcclxuICAgIGxhc3RIaWdobGlnaHQ6IG51bGwsXHJcbiAgICBncmFwaDoge30sXHJcbiAgfTtcclxuXHJcbiAgY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KGluaXRpYWxEYXRhKTtcclxufVxyXG5jaHJvbWUucnVudGltZS5vbkluc3RhbGxlZC5hZGRMaXN0ZW5lcigoeyByZWFzb24gfSkgPT4ge1xyXG4gIGlmIChyZWFzb24gPT09IFwiaW5zdGFsbFwiKSB7XHJcbiAgICBpbml0U3RvcmFnZSgpO1xyXG4gIH1cclxufSk7XHJcblxyXG5mdW5jdGlvbiBhZGRFZGdlKFxyXG4gIGdyYXBoOiBHcmFwaCxcclxuICBub2RlMTogc3RyaW5nLFxyXG4gIG5vZGUyOiBzdHJpbmcsXHJcbiAgd2VpZ2h0OiBudW1iZXIgPSAxXHJcbik6IHZvaWQge1xyXG4gIGlmICghZ3JhcGhbbm9kZTFdKSB7XHJcbiAgICBncmFwaFtub2RlMV0gPSB7fTtcclxuICB9XHJcbiAgaWYgKCFncmFwaFtub2RlMl0pIHtcclxuICAgIGdyYXBoW25vZGUyXSA9IHt9O1xyXG4gIH1cclxuICBncmFwaFtub2RlMV1bbm9kZTJdID0gd2VpZ2h0O1xyXG4gIGdyYXBoW25vZGUyXVtub2RlMV0gPSB3ZWlnaHQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluY3JlYXNlRWRnZVdlaWdodChncmFwaDogR3JhcGgsIG5vZGUxOiBzdHJpbmcsIG5vZGUyOiBzdHJpbmcpOiB2b2lkIHtcclxuICBpZiAoIWdyYXBoW25vZGUxXSB8fCAhZ3JhcGhbbm9kZTFdW25vZGUyXSkge1xyXG4gICAgYWRkRWRnZShncmFwaCwgbm9kZTEsIG5vZGUyKTtcclxuICB9IGVsc2Uge1xyXG4gICAgZ3JhcGhbbm9kZTFdW25vZGUyXSArPSAxO1xyXG4gICAgZ3JhcGhbbm9kZTJdW25vZGUxXSArPSAxO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlTm9kZShncmFwaDogR3JhcGgsIG5vZGU6IHN0cmluZyk6IHZvaWQge1xyXG4gIGlmIChncmFwaFtub2RlXSkge1xyXG4gICAgZm9yIChsZXQgbmVpZ2hib3IgaW4gZ3JhcGhbbm9kZV0pIHtcclxuICAgICAgZGVsZXRlIGdyYXBoW25laWdoYm9yXVtub2RlXTtcclxuICAgIH1cclxuICAgIGRlbGV0ZSBncmFwaFtub2RlXTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxhYmVsUHJvcGFnYXRpb24oZ3JhcGg6IEdyYXBoKTogeyBbbm9kZTogc3RyaW5nXTogc3RyaW5nIH0ge1xyXG4gIGxldCBsYWJlbHM6IHsgW25vZGU6IHN0cmluZ106IHN0cmluZyB9ID0ge307XHJcbiAgbGV0IGNvbnZlcmdlZCA9IGZhbHNlO1xyXG5cclxuICBPYmplY3Qua2V5cyhncmFwaCkuZm9yRWFjaCgobm9kZSkgPT4ge1xyXG4gICAgbGFiZWxzW25vZGVdID0gbm9kZTtcclxuICB9KTtcclxuXHJcbiAgd2hpbGUgKCFjb252ZXJnZWQpIHtcclxuICAgIGNvbnZlcmdlZCA9IHRydWU7XHJcblxyXG4gICAgY29uc3Qgbm9kZXMgPSBPYmplY3Qua2V5cyhncmFwaCk7XHJcbiAgICBub2Rlcy5zb3J0KCgpID0+IE1hdGgucmFuZG9tKCkgLSAwLjUpO1xyXG5cclxuICAgIGZvciAobGV0IG5vZGUgb2Ygbm9kZXMpIHtcclxuICAgICAgbGV0IGxhYmVsQ291bnRzOiB7IFtsYWJlbDogc3RyaW5nXTogbnVtYmVyIH0gPSB7fTtcclxuXHJcbiAgICAgIGZvciAobGV0IG5laWdoYm9yIGluIGdyYXBoW25vZGVdKSB7XHJcbiAgICAgICAgbGV0IG5laWdoYm9yTGFiZWwgPSBsYWJlbHNbbmVpZ2hib3JdO1xyXG4gICAgICAgIGlmICghbGFiZWxDb3VudHNbbmVpZ2hib3JMYWJlbF0pIHtcclxuICAgICAgICAgIGxhYmVsQ291bnRzW25laWdoYm9yTGFiZWxdID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGFiZWxDb3VudHNbbmVpZ2hib3JMYWJlbF0gKz0gZ3JhcGhbbm9kZV1bbmVpZ2hib3JdO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBsZXQgYmVzdExhYmVsID0gT2JqZWN0LmtleXMobGFiZWxDb3VudHMpLnJlZHVjZSgoYSwgYikgPT5cclxuICAgICAgICBsYWJlbENvdW50c1thXSA+IGxhYmVsQ291bnRzW2JdID8gYSA6IGJcclxuICAgICAgKTtcclxuXHJcbiAgICAgIGlmIChsYWJlbHNbbm9kZV0gIT09IGJlc3RMYWJlbCkge1xyXG4gICAgICAgIGxhYmVsc1tub2RlXSA9IGJlc3RMYWJlbDtcclxuICAgICAgICBjb252ZXJnZWQgPSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGxhYmVscztcclxufVxyXG5sZXQgcmVtb3ZlZFRhYiA9IGZhbHNlO1xyXG5jaHJvbWUudGFicy5vblJlbW92ZWQuYWRkTGlzdGVuZXIoYXN5bmMgKHRhYklkKSA9PiB7XHJcbiAgcmVtb3ZlZFRhYiA9IHRydWU7XHJcbiAgcmVtb3ZlVGFiKHRhYklkLnRvU3RyaW5nKCkpO1xyXG59KTtcclxuYXN5bmMgZnVuY3Rpb24gdXBkYXRlTGFzdEhpZ2hsaWdodCh0YWJJZDogc3RyaW5nKSB7XHJcbiAgY29uc3QgcmVzdWx0OiBTdG9yYWdlRGF0YSA9IGF3YWl0IGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldChbXHJcbiAgICBcImxhc3RIaWdobGlnaHRcIixcclxuICAgIFwiZ3JhcGhcIixcclxuICBdKTtcclxuICByZXN1bHQubGFzdEhpZ2hsaWdodCA9IHRhYklkO1xyXG4gIHJldHVybiBjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQocmVzdWx0KTtcclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gY29ubmVjdFRhYnModGFiQTogc3RyaW5nLCB0YWJCOiBzdHJpbmcpIHtcclxuICBjb25zb2xlLmxvZyhcImNvbm5lY3RlZCB0YWJzXCIsIHRhYkEsIHRhYkIpO1xyXG4gIGNvbnN0IHJlc3VsdDogU3RvcmFnZURhdGEgPSBhd2FpdCBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoW1xyXG4gICAgXCJsYXN0SGlnaGxpZ2h0XCIsXHJcbiAgICBcImdyYXBoXCIsXHJcbiAgXSk7XHJcbiAgaW5jcmVhc2VFZGdlV2VpZ2h0KHJlc3VsdC5ncmFwaCwgdGFiQSwgdGFiQik7XHJcbiAgcmV0dXJuIGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldChyZXN1bHQpO1xyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiByZW1vdmVUYWIodGFiSWQ6IHN0cmluZykge1xyXG4gIGNvbnNvbGUubG9nKFwicmVtb3ZlIHRhYlwiLCB0YWJJZCk7XHJcbiAgY29uc3QgcmVzdWx0OiBTdG9yYWdlRGF0YSA9IGF3YWl0IGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldChbXHJcbiAgICBcImxhc3RIaWdobGlnaHRcIixcclxuICAgIFwiZ3JhcGhcIixcclxuICBdKTtcclxuICByZW1vdmVOb2RlKHJlc3VsdC5ncmFwaCwgdGFiSWQpO1xyXG4gIHJlc3VsdC5sYXN0SGlnaGxpZ2h0ID0gbnVsbDtcclxuICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQocmVzdWx0KTtcclxufVxyXG5jaHJvbWUudGFicy5vbkhpZ2hsaWdodGVkLmFkZExpc3RlbmVyKGFzeW5jIChoaWdobGlnaHRJbmZvKSA9PiB7XHJcbiAgaWYgKHJlbW92ZWRUYWIpIHtcclxuICAgIHJlbW92ZWRUYWIgPSBmYWxzZTtcclxuICAgIHJldHVybjtcclxuICB9XHJcbiAgY29uc3QgdGFiSWRzID0gaGlnaGxpZ2h0SW5mby50YWJJZHM7XHJcbiAgaWYgKHRhYklkcy5sZW5ndGggIT0gMSkge1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuICBjb25zdCB0YWJJZCA9IHRhYklkc1swXS50b1N0cmluZygpO1xyXG4gIGNvbnN0IHN0b3JhZ2VEYXRhOiBTdG9yYWdlRGF0YSA9IGF3YWl0IGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldChbXHJcbiAgICBcImxhc3RIaWdobGlnaHRcIixcclxuICAgIFwiZ3JhcGhcIixcclxuICBdKTtcclxuICBpZiAoc3RvcmFnZURhdGEubGFzdEhpZ2hsaWdodCkge1xyXG4gICAgYXdhaXQgY29ubmVjdFRhYnModGFiSWQsIHN0b3JhZ2VEYXRhLmxhc3RIaWdobGlnaHQpO1xyXG4gIH1cclxuICB1cGRhdGVMYXN0SGlnaGxpZ2h0KHRhYklkKTtcclxufSk7XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJpbXBvcnQgXCIuL2xpc3Rlbi10by10YWJzXCI7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==