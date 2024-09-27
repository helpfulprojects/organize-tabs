const groupBtn = document.querySelector("#groupBtn");
const clearBtn = document.querySelector("#clearBtn");
const watchedTabsBtn = document.querySelector("#watchedTabsBtn");
if(groupBtn && clearBtn && watchedTabsBtn){
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
}

