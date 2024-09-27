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
const clearBtn = document.querySelector("#clearBtn");
const watchedTabsBtn = document.querySelector("#watchedTabsBtn");
if (groupBtn && clearBtn && watchedTabsBtn) {
    groupBtn.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
        console.log("group");
    }));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNyRCxNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ3JELE1BQU0sY0FBYyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUNqRSxJQUFJLFFBQVEsSUFBSSxRQUFRLElBQUksY0FBYyxFQUFFLENBQUM7SUFDM0MsUUFBUSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxHQUFTLEVBQUU7UUFDNUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN2QixDQUFDLEVBQUMsQ0FBQztJQUNILFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsR0FBUyxFQUFFO1FBQzVDLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDbkQsQ0FBQyxFQUFDLENBQUM7SUFDSCxjQUFjLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEdBQVMsRUFBRTtRQUNsRCxNQUFNLE1BQU0sR0FBZ0IsTUFBTSxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7WUFDekQsZUFBZTtZQUNmLE9BQU87U0FDUixDQUFDLENBQUM7UUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1QixDQUFDLEVBQUMsQ0FBQztBQUNMLENBQUM7Ozs7Ozs7O1VFbEJEO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vcmdhbmlzZS10YWJzLy4vc3JjL3BvcHVwLnRzIiwid2VicGFjazovL29yZ2FuaXNlLXRhYnMvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9vcmdhbmlzZS10YWJzL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9vcmdhbmlzZS10YWJzL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpbml0U3RvcmFnZSwgU3RvcmFnZURhdGEsIEdyYXBoIH0gZnJvbSBcIi4vbGlzdGVuLXRvLXRhYnNcIjtcclxuY29uc3QgZ3JvdXBCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2dyb3VwQnRuXCIpO1xyXG5jb25zdCBjbGVhckJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2xlYXJCdG5cIik7XHJcbmNvbnN0IHdhdGNoZWRUYWJzQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN3YXRjaGVkVGFic0J0blwiKTtcclxuaWYgKGdyb3VwQnRuICYmIGNsZWFyQnRuICYmIHdhdGNoZWRUYWJzQnRuKSB7XHJcbiAgZ3JvdXBCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jICgpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKFwiZ3JvdXBcIik7XHJcbiAgfSk7XHJcbiAgY2xlYXJCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jICgpID0+IHtcclxuICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHsgbWVzc2FnZTogXCJjbGVhclwiIH0pO1xyXG4gIH0pO1xyXG4gIHdhdGNoZWRUYWJzQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoKSA9PiB7XHJcbiAgICBjb25zdCByZXN1bHQ6IFN0b3JhZ2VEYXRhID0gYXdhaXQgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KFtcclxuICAgICAgXCJsYXN0SGlnaGxpZ2h0XCIsXHJcbiAgICAgIFwiZ3JhcGhcIixcclxuICAgIF0pO1xyXG4gICAgY29uc29sZS5sb2cocmVzdWx0LmdyYXBoKTtcclxuICB9KTtcclxufVxyXG4iLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IHt9O1xuX193ZWJwYWNrX21vZHVsZXNfX1tcIi4vc3JjL3BvcHVwLnRzXCJdKDAsIF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9