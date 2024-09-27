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


/***/ }),

/***/ "./src/popup.ts":
/*!**********************!*\
  !*** ./src/popup.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
const listen_to_tabs_1 = __webpack_require__(/*! ./listen-to-tabs */ "./src/listen-to-tabs.ts");
const groupBtn = document.querySelector("#groupBtn");
const clearBtn = document.querySelector("#clearBtn");
const watchedTabsBtn = document.querySelector("#watchedTabsBtn");
if (groupBtn && clearBtn && watchedTabsBtn) {
    groupBtn.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
        console.log("group");
    }));
    clearBtn.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
        (0, listen_to_tabs_1.initStorage)();
    }));
    watchedTabsBtn.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield chrome.storage.local.get([
            "lastHighlight",
            "graph",
        ]);
        console.log(result.graph);
    }));
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/popup.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBVUEsa0NBT0M7QUFQRCxTQUFnQixXQUFXO0lBQ3pCLE1BQU0sV0FBVyxHQUFnQjtRQUMvQixhQUFhLEVBQUUsSUFBSTtRQUNuQixLQUFLLEVBQUUsRUFBRTtLQUNWLENBQUM7SUFFRixNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDeEMsQ0FBQztBQUNELE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRTtJQUNwRCxJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUUsQ0FBQztRQUN6QixXQUFXLEVBQUUsQ0FBQztJQUNoQixDQUFDO0FBQ0gsQ0FBQyxDQUFDLENBQUM7QUFFSCxTQUFTLE9BQU8sQ0FDZCxLQUFZLEVBQ1osS0FBYSxFQUNiLEtBQWEsRUFDYixTQUFpQixDQUFDO0lBRWxCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztRQUNsQixLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7UUFDbEIsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBQ0QsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLE1BQU0sQ0FBQztJQUM3QixLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsTUFBTSxDQUFDO0FBQy9CLENBQUM7QUFFRCxTQUFTLGtCQUFrQixDQUFDLEtBQVksRUFBRSxLQUFhLEVBQUUsS0FBYTtJQUNwRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7UUFDMUMsT0FBTyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDL0IsQ0FBQztTQUFNLENBQUM7UUFDTixLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pCLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0IsQ0FBQztBQUNILENBQUM7QUFFRCxTQUFTLFVBQVUsQ0FBQyxLQUFZLEVBQUUsSUFBWTtJQUM1QyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQ2hCLEtBQUssSUFBSSxRQUFRLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDakMsT0FBTyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0IsQ0FBQztRQUNELE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JCLENBQUM7QUFDSCxDQUFDO0FBRUQsU0FBUyxnQkFBZ0IsQ0FBQyxLQUFZO0lBQ3BDLElBQUksTUFBTSxHQUErQixFQUFFLENBQUM7SUFDNUMsSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDO0lBRXRCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDbEMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztJQUN0QixDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNsQixTQUFTLEdBQUcsSUFBSSxDQUFDO1FBRWpCLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFFdEMsS0FBSyxJQUFJLElBQUksSUFBSSxLQUFLLEVBQUUsQ0FBQztZQUN2QixJQUFJLFdBQVcsR0FBZ0MsRUFBRSxDQUFDO1lBRWxELEtBQUssSUFBSSxRQUFRLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7Z0JBQ2pDLElBQUksYUFBYSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDckMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDO29CQUNoQyxXQUFXLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNqQyxDQUFDO2dCQUNELFdBQVcsQ0FBQyxhQUFhLENBQUMsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdEQsQ0FBQztZQUVELElBQUksU0FBUyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQ3ZELFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUN4QyxDQUFDO1lBRUYsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssU0FBUyxFQUFFLENBQUM7Z0JBQy9CLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxTQUFTLENBQUM7Z0JBQ3pCLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFDcEIsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDO0lBRUQsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQUNELElBQUksVUFBVSxHQUFHLEtBQUssQ0FBQztBQUN2QixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBTyxLQUFLLEVBQUUsRUFBRTtJQUNoRCxVQUFVLEdBQUcsSUFBSSxDQUFDO0lBQ2xCLFNBQVMsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztBQUM5QixDQUFDLEVBQUMsQ0FBQztBQUNILFNBQWUsbUJBQW1CLENBQUMsS0FBYTs7UUFDOUMsTUFBTSxNQUFNLEdBQWdCLE1BQU0sTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO1lBQ3pELGVBQWU7WUFDZixPQUFPO1NBQ1IsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFDN0IsT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDMUMsQ0FBQztDQUFBO0FBRUQsU0FBZSxXQUFXLENBQUMsSUFBWSxFQUFFLElBQVk7O1FBQ25ELE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzFDLE1BQU0sTUFBTSxHQUFnQixNQUFNLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztZQUN6RCxlQUFlO1lBQ2YsT0FBTztTQUNSLENBQUMsQ0FBQztRQUNILGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzdDLE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzFDLENBQUM7Q0FBQTtBQUVELFNBQWUsU0FBUyxDQUFDLEtBQWE7O1FBQ3BDLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2pDLE1BQU0sTUFBTSxHQUFnQixNQUFNLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztZQUN6RCxlQUFlO1lBQ2YsT0FBTztTQUNSLENBQUMsQ0FBQztRQUNILFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2hDLE1BQU0sQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1FBQzVCLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNuQyxDQUFDO0NBQUE7QUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBTyxhQUFhLEVBQUUsRUFBRTtJQUM1RCxJQUFJLFVBQVUsRUFBRSxDQUFDO1FBQ2YsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUNuQixPQUFPO0lBQ1QsQ0FBQztJQUNELE1BQU0sTUFBTSxHQUFHLGFBQWEsQ0FBQyxNQUFNLENBQUM7SUFDcEMsSUFBSSxNQUFNLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQ3ZCLE9BQU87SUFDVCxDQUFDO0lBQ0QsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ25DLE1BQU0sV0FBVyxHQUFnQixNQUFNLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztRQUM5RCxlQUFlO1FBQ2YsT0FBTztLQUNSLENBQUMsQ0FBQztJQUNILElBQUksV0FBVyxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQzlCLE1BQU0sV0FBVyxDQUFDLEtBQUssRUFBRSxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUNELG1CQUFtQixDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzdCLENBQUMsRUFBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcEpILGdHQUFtRTtBQUNuRSxNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ3JELE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDckQsTUFBTSxjQUFjLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBQ2pFLElBQUksUUFBUSxJQUFJLFFBQVEsSUFBSSxjQUFjLEVBQUUsQ0FBQztJQUMzQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEdBQVMsRUFBRTtRQUM1QyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3ZCLENBQUMsRUFBQyxDQUFDO0lBQ0gsUUFBUSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxHQUFTLEVBQUU7UUFDNUMsZ0NBQVcsR0FBRSxDQUFDO0lBQ2hCLENBQUMsRUFBQyxDQUFDO0lBQ0gsY0FBYyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxHQUFTLEVBQUU7UUFDbEQsTUFBTSxNQUFNLEdBQWdCLE1BQU0sTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO1lBQ3pELGVBQWU7WUFDZixPQUFPO1NBQ1IsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUIsQ0FBQyxFQUFDLENBQUM7QUFDTCxDQUFDOzs7Ozs7O1VDbEJEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7VUV0QkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vcmdhbmlzZS10YWJzLy4vc3JjL2xpc3Rlbi10by10YWJzLnRzIiwid2VicGFjazovL29yZ2FuaXNlLXRhYnMvLi9zcmMvcG9wdXAudHMiLCJ3ZWJwYWNrOi8vb3JnYW5pc2UtdGFicy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vcmdhbmlzZS10YWJzL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vb3JnYW5pc2UtdGFicy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vb3JnYW5pc2UtdGFicy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IHR5cGUgR3JhcGggPSB7XHJcbiAgW25vZGU6IHN0cmluZ106IHtcclxuICAgIFtuZWlnaGJvcjogc3RyaW5nXTogbnVtYmVyO1xyXG4gIH07XHJcbn07XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFN0b3JhZ2VEYXRhIHtcclxuICBsYXN0SGlnaGxpZ2h0OiBzdHJpbmcgfCBudWxsO1xyXG4gIGdyYXBoOiBHcmFwaDtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gaW5pdFN0b3JhZ2UoKSB7XHJcbiAgY29uc3QgaW5pdGlhbERhdGE6IFN0b3JhZ2VEYXRhID0ge1xyXG4gICAgbGFzdEhpZ2hsaWdodDogbnVsbCxcclxuICAgIGdyYXBoOiB7fSxcclxuICB9O1xyXG5cclxuICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQoaW5pdGlhbERhdGEpO1xyXG59XHJcbmNocm9tZS5ydW50aW1lLm9uSW5zdGFsbGVkLmFkZExpc3RlbmVyKCh7IHJlYXNvbiB9KSA9PiB7XHJcbiAgaWYgKHJlYXNvbiA9PT0gXCJpbnN0YWxsXCIpIHtcclxuICAgIGluaXRTdG9yYWdlKCk7XHJcbiAgfVxyXG59KTtcclxuXHJcbmZ1bmN0aW9uIGFkZEVkZ2UoXHJcbiAgZ3JhcGg6IEdyYXBoLFxyXG4gIG5vZGUxOiBzdHJpbmcsXHJcbiAgbm9kZTI6IHN0cmluZyxcclxuICB3ZWlnaHQ6IG51bWJlciA9IDFcclxuKTogdm9pZCB7XHJcbiAgaWYgKCFncmFwaFtub2RlMV0pIHtcclxuICAgIGdyYXBoW25vZGUxXSA9IHt9O1xyXG4gIH1cclxuICBpZiAoIWdyYXBoW25vZGUyXSkge1xyXG4gICAgZ3JhcGhbbm9kZTJdID0ge307XHJcbiAgfVxyXG4gIGdyYXBoW25vZGUxXVtub2RlMl0gPSB3ZWlnaHQ7XHJcbiAgZ3JhcGhbbm9kZTJdW25vZGUxXSA9IHdlaWdodDtcclxufVxyXG5cclxuZnVuY3Rpb24gaW5jcmVhc2VFZGdlV2VpZ2h0KGdyYXBoOiBHcmFwaCwgbm9kZTE6IHN0cmluZywgbm9kZTI6IHN0cmluZyk6IHZvaWQge1xyXG4gIGlmICghZ3JhcGhbbm9kZTFdIHx8ICFncmFwaFtub2RlMV1bbm9kZTJdKSB7XHJcbiAgICBhZGRFZGdlKGdyYXBoLCBub2RlMSwgbm9kZTIpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBncmFwaFtub2RlMV1bbm9kZTJdICs9IDE7XHJcbiAgICBncmFwaFtub2RlMl1bbm9kZTFdICs9IDE7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiByZW1vdmVOb2RlKGdyYXBoOiBHcmFwaCwgbm9kZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgaWYgKGdyYXBoW25vZGVdKSB7XHJcbiAgICBmb3IgKGxldCBuZWlnaGJvciBpbiBncmFwaFtub2RlXSkge1xyXG4gICAgICBkZWxldGUgZ3JhcGhbbmVpZ2hib3JdW25vZGVdO1xyXG4gICAgfVxyXG4gICAgZGVsZXRlIGdyYXBoW25vZGVdO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gbGFiZWxQcm9wYWdhdGlvbihncmFwaDogR3JhcGgpOiB7IFtub2RlOiBzdHJpbmddOiBzdHJpbmcgfSB7XHJcbiAgbGV0IGxhYmVsczogeyBbbm9kZTogc3RyaW5nXTogc3RyaW5nIH0gPSB7fTtcclxuICBsZXQgY29udmVyZ2VkID0gZmFsc2U7XHJcblxyXG4gIE9iamVjdC5rZXlzKGdyYXBoKS5mb3JFYWNoKChub2RlKSA9PiB7XHJcbiAgICBsYWJlbHNbbm9kZV0gPSBub2RlO1xyXG4gIH0pO1xyXG5cclxuICB3aGlsZSAoIWNvbnZlcmdlZCkge1xyXG4gICAgY29udmVyZ2VkID0gdHJ1ZTtcclxuXHJcbiAgICBjb25zdCBub2RlcyA9IE9iamVjdC5rZXlzKGdyYXBoKTtcclxuICAgIG5vZGVzLnNvcnQoKCkgPT4gTWF0aC5yYW5kb20oKSAtIDAuNSk7XHJcblxyXG4gICAgZm9yIChsZXQgbm9kZSBvZiBub2Rlcykge1xyXG4gICAgICBsZXQgbGFiZWxDb3VudHM6IHsgW2xhYmVsOiBzdHJpbmddOiBudW1iZXIgfSA9IHt9O1xyXG5cclxuICAgICAgZm9yIChsZXQgbmVpZ2hib3IgaW4gZ3JhcGhbbm9kZV0pIHtcclxuICAgICAgICBsZXQgbmVpZ2hib3JMYWJlbCA9IGxhYmVsc1tuZWlnaGJvcl07XHJcbiAgICAgICAgaWYgKCFsYWJlbENvdW50c1tuZWlnaGJvckxhYmVsXSkge1xyXG4gICAgICAgICAgbGFiZWxDb3VudHNbbmVpZ2hib3JMYWJlbF0gPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsYWJlbENvdW50c1tuZWlnaGJvckxhYmVsXSArPSBncmFwaFtub2RlXVtuZWlnaGJvcl07XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGxldCBiZXN0TGFiZWwgPSBPYmplY3Qua2V5cyhsYWJlbENvdW50cykucmVkdWNlKChhLCBiKSA9PlxyXG4gICAgICAgIGxhYmVsQ291bnRzW2FdID4gbGFiZWxDb3VudHNbYl0gPyBhIDogYlxyXG4gICAgICApO1xyXG5cclxuICAgICAgaWYgKGxhYmVsc1tub2RlXSAhPT0gYmVzdExhYmVsKSB7XHJcbiAgICAgICAgbGFiZWxzW25vZGVdID0gYmVzdExhYmVsO1xyXG4gICAgICAgIGNvbnZlcmdlZCA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gbGFiZWxzO1xyXG59XHJcbmxldCByZW1vdmVkVGFiID0gZmFsc2U7XHJcbmNocm9tZS50YWJzLm9uUmVtb3ZlZC5hZGRMaXN0ZW5lcihhc3luYyAodGFiSWQpID0+IHtcclxuICByZW1vdmVkVGFiID0gdHJ1ZTtcclxuICByZW1vdmVUYWIodGFiSWQudG9TdHJpbmcoKSk7XHJcbn0pO1xyXG5hc3luYyBmdW5jdGlvbiB1cGRhdGVMYXN0SGlnaGxpZ2h0KHRhYklkOiBzdHJpbmcpIHtcclxuICBjb25zdCByZXN1bHQ6IFN0b3JhZ2VEYXRhID0gYXdhaXQgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KFtcclxuICAgIFwibGFzdEhpZ2hsaWdodFwiLFxyXG4gICAgXCJncmFwaFwiLFxyXG4gIF0pO1xyXG4gIHJlc3VsdC5sYXN0SGlnaGxpZ2h0ID0gdGFiSWQ7XHJcbiAgcmV0dXJuIGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldChyZXN1bHQpO1xyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBjb25uZWN0VGFicyh0YWJBOiBzdHJpbmcsIHRhYkI6IHN0cmluZykge1xyXG4gIGNvbnNvbGUubG9nKFwiY29ubmVjdGVkIHRhYnNcIiwgdGFiQSwgdGFiQik7XHJcbiAgY29uc3QgcmVzdWx0OiBTdG9yYWdlRGF0YSA9IGF3YWl0IGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldChbXHJcbiAgICBcImxhc3RIaWdobGlnaHRcIixcclxuICAgIFwiZ3JhcGhcIixcclxuICBdKTtcclxuICBpbmNyZWFzZUVkZ2VXZWlnaHQocmVzdWx0LmdyYXBoLCB0YWJBLCB0YWJCKTtcclxuICByZXR1cm4gY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KHJlc3VsdCk7XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIHJlbW92ZVRhYih0YWJJZDogc3RyaW5nKSB7XHJcbiAgY29uc29sZS5sb2coXCJyZW1vdmUgdGFiXCIsIHRhYklkKTtcclxuICBjb25zdCByZXN1bHQ6IFN0b3JhZ2VEYXRhID0gYXdhaXQgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KFtcclxuICAgIFwibGFzdEhpZ2hsaWdodFwiLFxyXG4gICAgXCJncmFwaFwiLFxyXG4gIF0pO1xyXG4gIHJlbW92ZU5vZGUocmVzdWx0LmdyYXBoLCB0YWJJZCk7XHJcbiAgcmVzdWx0Lmxhc3RIaWdobGlnaHQgPSBudWxsO1xyXG4gIGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldChyZXN1bHQpO1xyXG59XHJcbmNocm9tZS50YWJzLm9uSGlnaGxpZ2h0ZWQuYWRkTGlzdGVuZXIoYXN5bmMgKGhpZ2hsaWdodEluZm8pID0+IHtcclxuICBpZiAocmVtb3ZlZFRhYikge1xyXG4gICAgcmVtb3ZlZFRhYiA9IGZhbHNlO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuICBjb25zdCB0YWJJZHMgPSBoaWdobGlnaHRJbmZvLnRhYklkcztcclxuICBpZiAodGFiSWRzLmxlbmd0aCAhPSAxKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG4gIGNvbnN0IHRhYklkID0gdGFiSWRzWzBdLnRvU3RyaW5nKCk7XHJcbiAgY29uc3Qgc3RvcmFnZURhdGE6IFN0b3JhZ2VEYXRhID0gYXdhaXQgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KFtcclxuICAgIFwibGFzdEhpZ2hsaWdodFwiLFxyXG4gICAgXCJncmFwaFwiLFxyXG4gIF0pO1xyXG4gIGlmIChzdG9yYWdlRGF0YS5sYXN0SGlnaGxpZ2h0KSB7XHJcbiAgICBhd2FpdCBjb25uZWN0VGFicyh0YWJJZCwgc3RvcmFnZURhdGEubGFzdEhpZ2hsaWdodCk7XHJcbiAgfVxyXG4gIHVwZGF0ZUxhc3RIaWdobGlnaHQodGFiSWQpO1xyXG59KTtcclxuIiwiaW1wb3J0IHsgaW5pdFN0b3JhZ2UsIFN0b3JhZ2VEYXRhLCBHcmFwaCB9IGZyb20gXCIuL2xpc3Rlbi10by10YWJzXCI7XHJcbmNvbnN0IGdyb3VwQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNncm91cEJ0blwiKTtcclxuY29uc3QgY2xlYXJCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NsZWFyQnRuXCIpO1xyXG5jb25zdCB3YXRjaGVkVGFic0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjd2F0Y2hlZFRhYnNCdG5cIik7XHJcbmlmIChncm91cEJ0biAmJiBjbGVhckJ0biAmJiB3YXRjaGVkVGFic0J0bikge1xyXG4gIGdyb3VwQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhcImdyb3VwXCIpO1xyXG4gIH0pO1xyXG4gIGNsZWFyQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoKSA9PiB7XHJcbiAgICBpbml0U3RvcmFnZSgpO1xyXG4gIH0pO1xyXG4gIHdhdGNoZWRUYWJzQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoKSA9PiB7XHJcbiAgICBjb25zdCByZXN1bHQ6IFN0b3JhZ2VEYXRhID0gYXdhaXQgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KFtcclxuICAgICAgXCJsYXN0SGlnaGxpZ2h0XCIsXHJcbiAgICAgIFwiZ3JhcGhcIixcclxuICAgIF0pO1xyXG4gICAgY29uc29sZS5sb2cocmVzdWx0LmdyYXBoKTtcclxuICB9KTtcclxufVxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvcG9wdXAudHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=