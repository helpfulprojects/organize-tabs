export type Graph = {
  [node: string]: {
    [neighbor: string]: number;
  };
};

export interface StorageData {
  lastHighlight: string | null;
  graph: Graph;
}

let storageData: StorageData | null;
chrome.storage.local.get(["lastHighlight", "graph"], (result: StorageData) => {
  storageData = result;
});
export function initStorage() {
  const initialData: StorageData = {
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

function addEdge(
  graph: Graph,
  node1: string,
  node2: string,
  weight: number = 1
): void {
  if (!graph[node1]) {
    graph[node1] = {};
  }
  if (!graph[node2]) {
    graph[node2] = {};
  }
  graph[node1][node2] = weight;
  graph[node2][node1] = weight;
}

function increaseEdgeWeight(graph: Graph, node1: string, node2: string): void {
  if (!graph[node1] || !graph[node1][node2]) {
    addEdge(graph, node1, node2);
  } else {
    graph[node1][node2] += 1;
    graph[node2][node1] += 1;
  }
}

function removeNode(graph: Graph, node: string): void {
  if (graph[node]) {
    for (let neighbor in graph[node]) {
      delete graph[neighbor][node];
    }
    delete graph[node];
  }
}

chrome.tabs.onRemoved.addListener((tabId) => {
  if (!storageData) return;
  removeTab(tabId.toString());
  updateLastHighlight(null);
  chrome.storage.local.set(storageData);
});
function updateLastHighlight(tabId: string | null) {
  if (!storageData) return;
  storageData.lastHighlight = tabId;
}

function connectTabs(tabA: string, tabB: string) {
  if (!storageData) return;
  increaseEdgeWeight(storageData.graph, tabA, tabB);
}

function removeTab(tabId: string) {
  if (!storageData) return;
  removeNode(storageData.graph, tabId);
}
chrome.tabs.onHighlighted.addListener(async (highlightInfo) => {
  if (!storageData) return;
  const tabIds = highlightInfo.tabIds;
  if (tabIds.length != 1) {
    return;
  }
  const tabId = tabIds[0].toString();
  if (storageData.lastHighlight) {
    connectTabs(storageData.lastHighlight, tabId);
  }
  updateLastHighlight(tabId);
  await removeMissingTabs();
  chrome.storage.local.set(storageData);
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "clear") {
    storageData = null;
    initStorage();
    chrome.storage.local.get(
      ["lastHighlight", "graph"],
      (result: StorageData) => {
        storageData = result;
      }
    );
  }
});

async function removeMissingTabs() {
  if (!storageData) return;
  const tabs = await chrome.tabs.query({});
  const currentTabs = tabs.map(({ id }) => id?.toString());
  Object.keys(storageData.graph).forEach((node) => {
    if (!currentTabs.includes(node)) {
      removeTab(node);
    }
  });
}
