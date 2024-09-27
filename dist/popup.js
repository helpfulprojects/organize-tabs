/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/popup.ts":
/*!**********************!*\
  !*** ./src/popup.ts ***!
  \**********************/
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
const groupBtn = document.querySelector("#groupBtn");
const ungroupBtn = document.querySelector("#ungroupBtn");
const clearBtn = document.querySelector("#clearBtn");
const watchedTabsBtn = document.querySelector("#watchedTabsBtn");
if (groupBtn && clearBtn && watchedTabsBtn && ungroupBtn) {
    ungroupBtn.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
        removeGroups();
    }));
    groupBtn.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
        yield removeGroups();
        const storageData = yield chrome.storage.local.get([
            "lastHighlight",
            "graph",
        ]);
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
                    let keys = Object.keys(labelCounts);
                    if (keys.length <= 0)
                        continue;
                    let bestLabel = keys.reduce((a, b) => labelCounts[a] > labelCounts[b] ? a : b);
                    if (labels[node] !== bestLabel) {
                        labels[node] = bestLabel;
                        converged = false;
                    }
                }
            }
            return labels;
        }
        let labels = labelPropagation(storageData.graph);
        let reversedLabels = {};
        for (let node in labels) {
            let label = labels[node];
            if (!reversedLabels[label]) {
                reversedLabels[label] = [];
            }
            reversedLabels[label].push(node);
        }
        const tabs = yield chrome.tabs.query({});
        const currentTabs = tabs.map(({ id }) => id);
        let count = 1;
        for (let label in reversedLabels) {
            let tabIds = reversedLabels[label].map((idStr) => parseInt(idStr, 10));
            tabIds = tabIds.filter((id) => currentTabs.includes(id));
            if (tabIds.length <= 1)
                continue;
            const group = yield chrome.tabs.group({ tabIds });
            yield chrome.tabGroups.update(group, { title: count.toString() });
            count += 1;
        }
        console.log(reversedLabels);
    }));
    function removeGroups() {
        return __awaiter(this, void 0, void 0, function* () {
            const tabs = yield chrome.tabs.query({});
            let currentTabs = tabs.map(({ id }) => id);
            yield chrome.tabs.ungroup(currentTabs.filter((id) => typeof id !== "undefined"));
        });
    }
    clearBtn.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
        chrome.runtime.sendMessage({ message: "clear" });
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/popup.ts"](0, __webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1QixDQUFDLEVBQUMsQ0FBQztBQUNMLENBQUM7Ozs7Ozs7O1VFbEdEO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vcmdhbmlzZS10YWJzLy4vc3JjL3BvcHVwLnRzIiwid2VicGFjazovL29yZ2FuaXNlLXRhYnMvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9vcmdhbmlzZS10YWJzL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9vcmdhbmlzZS10YWJzL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpbml0U3RvcmFnZSwgU3RvcmFnZURhdGEsIEdyYXBoIH0gZnJvbSBcIi4vbGlzdGVuLXRvLXRhYnNcIjtcclxuY29uc3QgZ3JvdXBCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2dyb3VwQnRuXCIpO1xyXG5jb25zdCB1bmdyb3VwQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN1bmdyb3VwQnRuXCIpO1xyXG5jb25zdCBjbGVhckJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2xlYXJCdG5cIik7XHJcbmNvbnN0IHdhdGNoZWRUYWJzQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN3YXRjaGVkVGFic0J0blwiKTtcclxuaWYgKGdyb3VwQnRuICYmIGNsZWFyQnRuICYmIHdhdGNoZWRUYWJzQnRuICYmIHVuZ3JvdXBCdG4pIHtcclxuICB1bmdyb3VwQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoKSA9PiB7XHJcbiAgICByZW1vdmVHcm91cHMoKTtcclxuICB9KTtcclxuICBncm91cEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKCkgPT4ge1xyXG4gICAgYXdhaXQgcmVtb3ZlR3JvdXBzKCk7XHJcbiAgICBjb25zdCBzdG9yYWdlRGF0YTogU3RvcmFnZURhdGEgPSBhd2FpdCBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoW1xyXG4gICAgICBcImxhc3RIaWdobGlnaHRcIixcclxuICAgICAgXCJncmFwaFwiLFxyXG4gICAgXSk7XHJcbiAgICBmdW5jdGlvbiBsYWJlbFByb3BhZ2F0aW9uKGdyYXBoOiBHcmFwaCk6IHsgW25vZGU6IHN0cmluZ106IHN0cmluZyB9IHtcclxuICAgICAgbGV0IGxhYmVsczogeyBbbm9kZTogc3RyaW5nXTogc3RyaW5nIH0gPSB7fTtcclxuICAgICAgbGV0IGNvbnZlcmdlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgT2JqZWN0LmtleXMoZ3JhcGgpLmZvckVhY2goKG5vZGUpID0+IHtcclxuICAgICAgICBsYWJlbHNbbm9kZV0gPSBub2RlO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHdoaWxlICghY29udmVyZ2VkKSB7XHJcbiAgICAgICAgY29udmVyZ2VkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgY29uc3Qgbm9kZXMgPSBPYmplY3Qua2V5cyhncmFwaCk7XHJcbiAgICAgICAgbm9kZXMuc29ydCgoKSA9PiBNYXRoLnJhbmRvbSgpIC0gMC41KTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgbm9kZSBvZiBub2Rlcykge1xyXG4gICAgICAgICAgbGV0IGxhYmVsQ291bnRzOiB7IFtsYWJlbDogc3RyaW5nXTogbnVtYmVyIH0gPSB7fTtcclxuXHJcbiAgICAgICAgICBmb3IgKGxldCBuZWlnaGJvciBpbiBncmFwaFtub2RlXSkge1xyXG4gICAgICAgICAgICBsZXQgbmVpZ2hib3JMYWJlbCA9IGxhYmVsc1tuZWlnaGJvcl07XHJcbiAgICAgICAgICAgIGlmICghbGFiZWxDb3VudHNbbmVpZ2hib3JMYWJlbF0pIHtcclxuICAgICAgICAgICAgICBsYWJlbENvdW50c1tuZWlnaGJvckxhYmVsXSA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGFiZWxDb3VudHNbbmVpZ2hib3JMYWJlbF0gKz0gZ3JhcGhbbm9kZV1bbmVpZ2hib3JdO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgbGV0IGtleXMgPSBPYmplY3Qua2V5cyhsYWJlbENvdW50cyk7XHJcbiAgICAgICAgICBpZiAoa2V5cy5sZW5ndGggPD0gMCkgY29udGludWU7XHJcbiAgICAgICAgICBsZXQgYmVzdExhYmVsID0ga2V5cy5yZWR1Y2UoKGEsIGIpID0+XHJcbiAgICAgICAgICAgIGxhYmVsQ291bnRzW2FdID4gbGFiZWxDb3VudHNbYl0gPyBhIDogYlxyXG4gICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICBpZiAobGFiZWxzW25vZGVdICE9PSBiZXN0TGFiZWwpIHtcclxuICAgICAgICAgICAgbGFiZWxzW25vZGVdID0gYmVzdExhYmVsO1xyXG4gICAgICAgICAgICBjb252ZXJnZWQgPSBmYWxzZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBsYWJlbHM7XHJcbiAgICB9XHJcbiAgICBsZXQgbGFiZWxzID0gbGFiZWxQcm9wYWdhdGlvbihzdG9yYWdlRGF0YS5ncmFwaCk7XHJcbiAgICBsZXQgcmV2ZXJzZWRMYWJlbHM6IHsgW2xhYmVsOiBzdHJpbmddOiBzdHJpbmdbXSB9ID0ge307XHJcblxyXG4gICAgZm9yIChsZXQgbm9kZSBpbiBsYWJlbHMpIHtcclxuICAgICAgbGV0IGxhYmVsID0gbGFiZWxzW25vZGVdO1xyXG5cclxuICAgICAgaWYgKCFyZXZlcnNlZExhYmVsc1tsYWJlbF0pIHtcclxuICAgICAgICByZXZlcnNlZExhYmVsc1tsYWJlbF0gPSBbXTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV2ZXJzZWRMYWJlbHNbbGFiZWxdLnB1c2gobm9kZSk7XHJcbiAgICB9XHJcbiAgICBjb25zdCB0YWJzID0gYXdhaXQgY2hyb21lLnRhYnMucXVlcnkoe30pO1xyXG4gICAgY29uc3QgY3VycmVudFRhYnMgPSB0YWJzLm1hcCgoeyBpZCB9KSA9PiBpZCk7XHJcbiAgICBsZXQgY291bnQgPSAxO1xyXG4gICAgZm9yIChsZXQgbGFiZWwgaW4gcmV2ZXJzZWRMYWJlbHMpIHtcclxuICAgICAgbGV0IHRhYklkcyA9IHJldmVyc2VkTGFiZWxzW2xhYmVsXS5tYXAoKGlkU3RyKSA9PiBwYXJzZUludChpZFN0ciwgMTApKTtcclxuICAgICAgdGFiSWRzID0gdGFiSWRzLmZpbHRlcigoaWQpID0+IGN1cnJlbnRUYWJzLmluY2x1ZGVzKGlkKSk7XHJcbiAgICAgIGlmICh0YWJJZHMubGVuZ3RoIDw9IDEpIGNvbnRpbnVlO1xyXG4gICAgICBjb25zdCBncm91cCA9IGF3YWl0IGNocm9tZS50YWJzLmdyb3VwKHsgdGFiSWRzIH0pO1xyXG4gICAgICBhd2FpdCBjaHJvbWUudGFiR3JvdXBzLnVwZGF0ZShncm91cCwgeyB0aXRsZTogY291bnQudG9TdHJpbmcoKSB9KTtcclxuICAgICAgY291bnQgKz0gMTtcclxuICAgIH1cclxuICAgIGNvbnNvbGUubG9nKHJldmVyc2VkTGFiZWxzKTtcclxuICB9KTtcclxuXHJcbiAgYXN5bmMgZnVuY3Rpb24gcmVtb3ZlR3JvdXBzKCkge1xyXG4gICAgY29uc3QgdGFicyA9IGF3YWl0IGNocm9tZS50YWJzLnF1ZXJ5KHt9KTtcclxuICAgIGxldCBjdXJyZW50VGFicyA9IHRhYnMubWFwKCh7IGlkIH0pID0+IGlkKTtcclxuICAgIGF3YWl0IGNocm9tZS50YWJzLnVuZ3JvdXAoXHJcbiAgICAgIGN1cnJlbnRUYWJzLmZpbHRlcigoaWQpID0+IHR5cGVvZiBpZCAhPT0gXCJ1bmRlZmluZWRcIilcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBjbGVhckJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKCkgPT4ge1xyXG4gICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyBtZXNzYWdlOiBcImNsZWFyXCIgfSk7XHJcbiAgfSk7XHJcbiAgd2F0Y2hlZFRhYnNCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jICgpID0+IHtcclxuICAgIGNvbnN0IHJlc3VsdDogU3RvcmFnZURhdGEgPSBhd2FpdCBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoW1xyXG4gICAgICBcImxhc3RIaWdobGlnaHRcIixcclxuICAgICAgXCJncmFwaFwiLFxyXG4gICAgXSk7XHJcbiAgICBjb25zb2xlLmxvZyhyZXN1bHQuZ3JhcGgpO1xyXG4gIH0pO1xyXG59XHJcbiIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0ge307XG5fX3dlYnBhY2tfbW9kdWxlc19fW1wiLi9zcmMvcG9wdXAudHNcIl0oMCwgX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=