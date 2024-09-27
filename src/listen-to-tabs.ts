type Graph = {
  [node: string]: {
      [neighbor: string]: number; 
  };
};

// chrome.runtime.onInstalled.addListener(({ reason }) => {
//   if (reason === "install") {
//     chrome.storage.local.set({
//       lastHighlight: null,
//       graph: {},
//     });
//   }
// });

chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === "install") {
    chrome.storage.local.set({
      watchedTabs: [],
    });
  }
});
function addEdge(graph: Graph, node1: string, node2: string, weight: number) {
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
});

async function addTabId(addTabId:number) {
  const { watchedTabs } = await chrome.storage.local.get("watchedTabs");
  watchedTabs.push(addTabId);
  return chrome.storage.local.set({ watchedTabs });
}

async function removeTabId(removeTabId:number) {
  const { watchedTabs } = await chrome.storage.local.get("watchedTabs");
  watchedTabs.filter((tabId:number) => tabId !== removeTabId);
  return chrome.storage.local.set({ watchedTabs });
}

async function isTabWatched(tabId:number) {
  const { watchedTabs } = await chrome.storage.local.get("watchedTabs");
  return watchedTabs.includes(tabId);
}

async function getWatchedTabs() {
  const { watchedTabs } = await chrome.storage.local.get("watchedTabs");
  return watchedTabs;
}
