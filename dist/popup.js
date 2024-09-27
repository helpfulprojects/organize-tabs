/******/ (() => { // webpackBootstrap
/*!**********************!*\
  !*** ./src/popup.js ***!
  \**********************/
const groupBtn = document.querySelector("#groupBtn");
const clearBtn = document.querySelector("#clearBtn");
const watchedTabsBtn = document.querySelector("#watchedTabsBtn");
groupBtn.addEventListener("click", async () => {
  console.log("group");
});
clearBtn.addEventListener("click", async () => {
  chrome.storage.local.set({
    watchedTabs: [],
  });
});
watchedTabsBtn.addEventListener("click", async () => {
  const { watchedTabs } = await chrome.storage.local.get("watchedTabs");
  console.log(watchedTabs);
});

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAuanMiLCJtYXBwaW5ncyI6Ijs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7QUFDRDtBQUNBLFVBQVUsY0FBYztBQUN4QjtBQUNBLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vcmdhbmlzZS10YWJzLy4vc3JjL3BvcHVwLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGdyb3VwQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNncm91cEJ0blwiKTtcclxuY29uc3QgY2xlYXJCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NsZWFyQnRuXCIpO1xyXG5jb25zdCB3YXRjaGVkVGFic0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjd2F0Y2hlZFRhYnNCdG5cIik7XHJcbmdyb3VwQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoKSA9PiB7XHJcbiAgY29uc29sZS5sb2coXCJncm91cFwiKTtcclxufSk7XHJcbmNsZWFyQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoKSA9PiB7XHJcbiAgY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KHtcclxuICAgIHdhdGNoZWRUYWJzOiBbXSxcclxuICB9KTtcclxufSk7XHJcbndhdGNoZWRUYWJzQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoKSA9PiB7XHJcbiAgY29uc3QgeyB3YXRjaGVkVGFicyB9ID0gYXdhaXQgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KFwid2F0Y2hlZFRhYnNcIik7XHJcbiAgY29uc29sZS5sb2cod2F0Y2hlZFRhYnMpO1xyXG59KTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9