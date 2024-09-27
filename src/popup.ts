import { initStorage, StorageData, Graph } from "./listen-to-tabs";
const groupBtn = document.querySelector("#groupBtn");
const clearBtn = document.querySelector("#clearBtn");
const watchedTabsBtn = document.querySelector("#watchedTabsBtn");
if (groupBtn && clearBtn && watchedTabsBtn) {
  groupBtn.addEventListener("click", async () => {
    console.log("group");
  });
  clearBtn.addEventListener("click", async () => {
    chrome.runtime.sendMessage({ message: "clear" });
  });
  watchedTabsBtn.addEventListener("click", async () => {
    const result: StorageData = await chrome.storage.local.get([
      "lastHighlight",
      "graph",
    ]);
    console.log(result.graph);
  });
}
