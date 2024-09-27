/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/listen-to-tabs.js":
/*!*******************************!*\
  !*** ./src/listen-to-tabs.js ***!
  \*******************************/
/***/ (() => {

// Initialize default API suggestions
chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === "install") {
    chrome.storage.local.set({
      lastHighlight: null,
      graph: {},
    });
  }
});

function addEdge(graph, node1, node2, weight) {
  if (!graph[node1]) {
    graph[node1] = {};
    if (!graph[node2]) {
      graph[node2] = {};
    }
    graph[node1][node2] = weight;
    graph[node2][node1] = weight;
  }
}
// chrome.tabs.onCreated.addListener(async (tab) => {
//   await addTabId(tab.id);
//   console.log(await getWatchedTabs());
// });

// chrome.tabs.onRemoved.addListener(async (tabId) => {
//   await removeTabId(tabId);
//   console.log(await getWatchedTabs());
// });

chrome.tabs.onHighlighted.addListener((highlightInfo) => {
  const tabIds = highlightInfo.tabIds;
  if (tabIds.length != 1) {
    return;
  }
  const tabId = tabIds[0];
  console.log(tabId);
});

async function addTabId(addTabId) {
  const { watchedTabs } = await chrome.storage.local.get("watchedTabs");
  watchedTabs.push(addTabId);
  return chrome.storage.local.set({ watchedTabs });
}

async function removeTabId(removeTabId) {
  const { watchedTabs } = await chrome.storage.local.get("watchedTabs");
  watchedTabs.filter((tabId) => tabId !== removeTabId);
  return chrome.storage.local.set({ watchedTabs });
}

async function isTabWatched(tabId) {
  const { watchedTabs } = await chrome.storage.local.get("watchedTabs");
  return watchedTabs.includes(tabId);
}

async function getWatchedTabs() {
  const { watchedTabs } = await chrome.storage.local.get("watchedTabs");
  return watchedTabs;
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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*******************************!*\
  !*** ./src/service-worker.js ***!
  \*******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _listen_to_tabs_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./listen-to-tabs.js */ "./src/listen-to-tabs.js");
/* harmony import */ var _listen_to_tabs_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_listen_to_tabs_js__WEBPACK_IMPORTED_MODULE_0__);


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2dyb3VuZC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBLDBDQUEwQyxRQUFRO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZixLQUFLO0FBQ0w7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxVQUFVLGNBQWM7QUFDeEI7QUFDQSxvQ0FBb0MsYUFBYTtBQUNqRDtBQUNBO0FBQ0E7QUFDQSxVQUFVLGNBQWM7QUFDeEI7QUFDQSxvQ0FBb0MsYUFBYTtBQUNqRDtBQUNBO0FBQ0E7QUFDQSxVQUFVLGNBQWM7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLGNBQWM7QUFDeEI7QUFDQTs7Ozs7OztVQzNEQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7QUNONkIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vcmdhbmlzZS10YWJzLy4vc3JjL2xpc3Rlbi10by10YWJzLmpzIiwid2VicGFjazovL29yZ2FuaXNlLXRhYnMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb3JnYW5pc2UtdGFicy93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9vcmdhbmlzZS10YWJzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vcmdhbmlzZS10YWJzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb3JnYW5pc2UtdGFicy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29yZ2FuaXNlLXRhYnMvLi9zcmMvc2VydmljZS13b3JrZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gSW5pdGlhbGl6ZSBkZWZhdWx0IEFQSSBzdWdnZXN0aW9uc1xyXG5jaHJvbWUucnVudGltZS5vbkluc3RhbGxlZC5hZGRMaXN0ZW5lcigoeyByZWFzb24gfSkgPT4ge1xyXG4gIGlmIChyZWFzb24gPT09IFwiaW5zdGFsbFwiKSB7XHJcbiAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQoe1xyXG4gICAgICBsYXN0SGlnaGxpZ2h0OiBudWxsLFxyXG4gICAgICBncmFwaDoge30sXHJcbiAgICB9KTtcclxuICB9XHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gYWRkRWRnZShncmFwaCwgbm9kZTEsIG5vZGUyLCB3ZWlnaHQpIHtcclxuICBpZiAoIWdyYXBoW25vZGUxXSkge1xyXG4gICAgZ3JhcGhbbm9kZTFdID0ge307XHJcbiAgICBpZiAoIWdyYXBoW25vZGUyXSkge1xyXG4gICAgICBncmFwaFtub2RlMl0gPSB7fTtcclxuICAgIH1cclxuICAgIGdyYXBoW25vZGUxXVtub2RlMl0gPSB3ZWlnaHQ7XHJcbiAgICBncmFwaFtub2RlMl1bbm9kZTFdID0gd2VpZ2h0O1xyXG4gIH1cclxufVxyXG4vLyBjaHJvbWUudGFicy5vbkNyZWF0ZWQuYWRkTGlzdGVuZXIoYXN5bmMgKHRhYikgPT4ge1xyXG4vLyAgIGF3YWl0IGFkZFRhYklkKHRhYi5pZCk7XHJcbi8vICAgY29uc29sZS5sb2coYXdhaXQgZ2V0V2F0Y2hlZFRhYnMoKSk7XHJcbi8vIH0pO1xyXG5cclxuLy8gY2hyb21lLnRhYnMub25SZW1vdmVkLmFkZExpc3RlbmVyKGFzeW5jICh0YWJJZCkgPT4ge1xyXG4vLyAgIGF3YWl0IHJlbW92ZVRhYklkKHRhYklkKTtcclxuLy8gICBjb25zb2xlLmxvZyhhd2FpdCBnZXRXYXRjaGVkVGFicygpKTtcclxuLy8gfSk7XHJcblxyXG5jaHJvbWUudGFicy5vbkhpZ2hsaWdodGVkLmFkZExpc3RlbmVyKChoaWdobGlnaHRJbmZvKSA9PiB7XHJcbiAgY29uc3QgdGFiSWRzID0gaGlnaGxpZ2h0SW5mby50YWJJZHM7XHJcbiAgaWYgKHRhYklkcy5sZW5ndGggIT0gMSkge1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuICBjb25zdCB0YWJJZCA9IHRhYklkc1swXTtcclxuICBjb25zb2xlLmxvZyh0YWJJZCk7XHJcbn0pO1xyXG5cclxuYXN5bmMgZnVuY3Rpb24gYWRkVGFiSWQoYWRkVGFiSWQpIHtcclxuICBjb25zdCB7IHdhdGNoZWRUYWJzIH0gPSBhd2FpdCBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoXCJ3YXRjaGVkVGFic1wiKTtcclxuICB3YXRjaGVkVGFicy5wdXNoKGFkZFRhYklkKTtcclxuICByZXR1cm4gY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KHsgd2F0Y2hlZFRhYnMgfSk7XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIHJlbW92ZVRhYklkKHJlbW92ZVRhYklkKSB7XHJcbiAgY29uc3QgeyB3YXRjaGVkVGFicyB9ID0gYXdhaXQgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KFwid2F0Y2hlZFRhYnNcIik7XHJcbiAgd2F0Y2hlZFRhYnMuZmlsdGVyKCh0YWJJZCkgPT4gdGFiSWQgIT09IHJlbW92ZVRhYklkKTtcclxuICByZXR1cm4gY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KHsgd2F0Y2hlZFRhYnMgfSk7XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGlzVGFiV2F0Y2hlZCh0YWJJZCkge1xyXG4gIGNvbnN0IHsgd2F0Y2hlZFRhYnMgfSA9IGF3YWl0IGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldChcIndhdGNoZWRUYWJzXCIpO1xyXG4gIHJldHVybiB3YXRjaGVkVGFicy5pbmNsdWRlcyh0YWJJZCk7XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGdldFdhdGNoZWRUYWJzKCkge1xyXG4gIGNvbnN0IHsgd2F0Y2hlZFRhYnMgfSA9IGF3YWl0IGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldChcIndhdGNoZWRUYWJzXCIpO1xyXG4gIHJldHVybiB3YXRjaGVkVGFicztcclxufVxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFwiLi9saXN0ZW4tdG8tdGFicy5qc1wiO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=