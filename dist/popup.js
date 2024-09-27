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
                    let bestLabel = Object.keys(labelCounts).reduce((a, b) => labelCounts[a] > labelCounts[b] ? a : b);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb3JnYW5pc2UtdGFicy8uL3NyYy9wb3B1cC50cyIsIndlYnBhY2s6Ly9vcmdhbmlzZS10YWJzL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vb3JnYW5pc2UtdGFicy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vb3JnYW5pc2UtdGFicy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaW5pdFN0b3JhZ2UsIFN0b3JhZ2VEYXRhLCBHcmFwaCB9IGZyb20gXCIuL2xpc3Rlbi10by10YWJzXCI7XHJcbmNvbnN0IGdyb3VwQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNncm91cEJ0blwiKTtcclxuY29uc3QgdW5ncm91cEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdW5ncm91cEJ0blwiKTtcclxuY29uc3QgY2xlYXJCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NsZWFyQnRuXCIpO1xyXG5jb25zdCB3YXRjaGVkVGFic0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjd2F0Y2hlZFRhYnNCdG5cIik7XHJcbmlmIChncm91cEJ0biAmJiBjbGVhckJ0biAmJiB3YXRjaGVkVGFic0J0biAmJiB1bmdyb3VwQnRuKSB7XHJcbiAgdW5ncm91cEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKCkgPT4ge1xyXG4gICAgcmVtb3ZlR3JvdXBzKCk7XHJcbiAgfSk7XHJcbiAgZ3JvdXBCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jICgpID0+IHtcclxuICAgIGF3YWl0IHJlbW92ZUdyb3VwcygpO1xyXG4gICAgY29uc3Qgc3RvcmFnZURhdGE6IFN0b3JhZ2VEYXRhID0gYXdhaXQgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KFtcclxuICAgICAgXCJsYXN0SGlnaGxpZ2h0XCIsXHJcbiAgICAgIFwiZ3JhcGhcIixcclxuICAgIF0pO1xyXG4gICAgZnVuY3Rpb24gbGFiZWxQcm9wYWdhdGlvbihncmFwaDogR3JhcGgpOiB7IFtub2RlOiBzdHJpbmddOiBzdHJpbmcgfSB7XHJcbiAgICAgIGxldCBsYWJlbHM6IHsgW25vZGU6IHN0cmluZ106IHN0cmluZyB9ID0ge307XHJcbiAgICAgIGxldCBjb252ZXJnZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgIE9iamVjdC5rZXlzKGdyYXBoKS5mb3JFYWNoKChub2RlKSA9PiB7XHJcbiAgICAgICAgbGFiZWxzW25vZGVdID0gbm9kZTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICB3aGlsZSAoIWNvbnZlcmdlZCkge1xyXG4gICAgICAgIGNvbnZlcmdlZCA9IHRydWU7XHJcblxyXG4gICAgICAgIGNvbnN0IG5vZGVzID0gT2JqZWN0LmtleXMoZ3JhcGgpO1xyXG4gICAgICAgIG5vZGVzLnNvcnQoKCkgPT4gTWF0aC5yYW5kb20oKSAtIDAuNSk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IG5vZGUgb2Ygbm9kZXMpIHtcclxuICAgICAgICAgIGxldCBsYWJlbENvdW50czogeyBbbGFiZWw6IHN0cmluZ106IG51bWJlciB9ID0ge307XHJcblxyXG4gICAgICAgICAgZm9yIChsZXQgbmVpZ2hib3IgaW4gZ3JhcGhbbm9kZV0pIHtcclxuICAgICAgICAgICAgbGV0IG5laWdoYm9yTGFiZWwgPSBsYWJlbHNbbmVpZ2hib3JdO1xyXG4gICAgICAgICAgICBpZiAoIWxhYmVsQ291bnRzW25laWdoYm9yTGFiZWxdKSB7XHJcbiAgICAgICAgICAgICAgbGFiZWxDb3VudHNbbmVpZ2hib3JMYWJlbF0gPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxhYmVsQ291bnRzW25laWdoYm9yTGFiZWxdICs9IGdyYXBoW25vZGVdW25laWdoYm9yXTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBsZXQgYmVzdExhYmVsID0gT2JqZWN0LmtleXMobGFiZWxDb3VudHMpLnJlZHVjZSgoYSwgYikgPT5cclxuICAgICAgICAgICAgbGFiZWxDb3VudHNbYV0gPiBsYWJlbENvdW50c1tiXSA/IGEgOiBiXHJcbiAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgIGlmIChsYWJlbHNbbm9kZV0gIT09IGJlc3RMYWJlbCkge1xyXG4gICAgICAgICAgICBsYWJlbHNbbm9kZV0gPSBiZXN0TGFiZWw7XHJcbiAgICAgICAgICAgIGNvbnZlcmdlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIGxhYmVscztcclxuICAgIH1cclxuICAgIGxldCBsYWJlbHMgPSBsYWJlbFByb3BhZ2F0aW9uKHN0b3JhZ2VEYXRhLmdyYXBoKTtcclxuICAgIGxldCByZXZlcnNlZExhYmVsczogeyBbbGFiZWw6IHN0cmluZ106IHN0cmluZ1tdIH0gPSB7fTtcclxuXHJcbiAgICBmb3IgKGxldCBub2RlIGluIGxhYmVscykge1xyXG4gICAgICBsZXQgbGFiZWwgPSBsYWJlbHNbbm9kZV07XHJcblxyXG4gICAgICBpZiAoIXJldmVyc2VkTGFiZWxzW2xhYmVsXSkge1xyXG4gICAgICAgIHJldmVyc2VkTGFiZWxzW2xhYmVsXSA9IFtdO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXZlcnNlZExhYmVsc1tsYWJlbF0ucHVzaChub2RlKTtcclxuICAgIH1cclxuICAgIGNvbnN0IHRhYnMgPSBhd2FpdCBjaHJvbWUudGFicy5xdWVyeSh7fSk7XHJcbiAgICBjb25zdCBjdXJyZW50VGFicyA9IHRhYnMubWFwKCh7IGlkIH0pID0+IGlkKTtcclxuICAgIGxldCBjb3VudCA9IDE7XHJcbiAgICBmb3IgKGxldCBsYWJlbCBpbiByZXZlcnNlZExhYmVscykge1xyXG4gICAgICBsZXQgdGFiSWRzID0gcmV2ZXJzZWRMYWJlbHNbbGFiZWxdLm1hcCgoaWRTdHIpID0+IHBhcnNlSW50KGlkU3RyLCAxMCkpO1xyXG4gICAgICB0YWJJZHMgPSB0YWJJZHMuZmlsdGVyKChpZCkgPT4gY3VycmVudFRhYnMuaW5jbHVkZXMoaWQpKTtcclxuICAgICAgaWYgKHRhYklkcy5sZW5ndGggPD0gMSkgY29udGludWU7XHJcbiAgICAgIGNvbnN0IGdyb3VwID0gYXdhaXQgY2hyb21lLnRhYnMuZ3JvdXAoeyB0YWJJZHMgfSk7XHJcbiAgICAgIGF3YWl0IGNocm9tZS50YWJHcm91cHMudXBkYXRlKGdyb3VwLCB7IHRpdGxlOiBjb3VudC50b1N0cmluZygpIH0pO1xyXG4gICAgICBjb3VudCArPSAxO1xyXG4gICAgfVxyXG4gICAgY29uc29sZS5sb2cocmV2ZXJzZWRMYWJlbHMpO1xyXG4gIH0pO1xyXG5cclxuICBhc3luYyBmdW5jdGlvbiByZW1vdmVHcm91cHMoKSB7XHJcbiAgICBjb25zdCB0YWJzID0gYXdhaXQgY2hyb21lLnRhYnMucXVlcnkoe30pO1xyXG4gICAgbGV0IGN1cnJlbnRUYWJzID0gdGFicy5tYXAoKHsgaWQgfSkgPT4gaWQpO1xyXG4gICAgYXdhaXQgY2hyb21lLnRhYnMudW5ncm91cChcclxuICAgICAgY3VycmVudFRhYnMuZmlsdGVyKChpZCkgPT4gdHlwZW9mIGlkICE9PSBcInVuZGVmaW5lZFwiKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGNsZWFyQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoKSA9PiB7XHJcbiAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7IG1lc3NhZ2U6IFwiY2xlYXJcIiB9KTtcclxuICB9KTtcclxuICB3YXRjaGVkVGFic0J0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKCkgPT4ge1xyXG4gICAgY29uc3QgcmVzdWx0OiBTdG9yYWdlRGF0YSA9IGF3YWl0IGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldChbXHJcbiAgICAgIFwibGFzdEhpZ2hsaWdodFwiLFxyXG4gICAgICBcImdyYXBoXCIsXHJcbiAgICBdKTtcclxuICAgIGNvbnNvbGUubG9nKHJlc3VsdC5ncmFwaCk7XHJcbiAgfSk7XHJcbn1cclxuIiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSB7fTtcbl9fd2VicGFja19tb2R1bGVzX19bXCIuL3NyYy9wb3B1cC50c1wiXSgwLCBfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==