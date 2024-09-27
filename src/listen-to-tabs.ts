export type Graph = {
  [node: string]: {
    [neighbor: string]: number;
  };
};

export interface StorageData {
  lastHighlight: string | null;
  graph: Graph;
}
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

function labelPropagation(graph: Graph): { [node: string]: string } {
  let labels: { [node: string]: string } = {};
  let converged = false;

  Object.keys(graph).forEach((node) => {
    labels[node] = node;
  });

  while (!converged) {
    converged = true;

    const nodes = Object.keys(graph);
    nodes.sort(() => Math.random() - 0.5);

    for (let node of nodes) {
      let labelCounts: { [label: string]: number } = {};

      for (let neighbor in graph[node]) {
        let neighborLabel = labels[neighbor];
        if (!labelCounts[neighborLabel]) {
          labelCounts[neighborLabel] = 0;
        }
        labelCounts[neighborLabel] += graph[node][neighbor];
      }

      let bestLabel = Object.keys(labelCounts).reduce((a, b) =>
        labelCounts[a] > labelCounts[b] ? a : b
      );

      if (labels[node] !== bestLabel) {
        labels[node] = bestLabel;
        converged = false;
      }
    }
  }

  return labels;
}
let removedTab = false;
chrome.tabs.onRemoved.addListener(async (tabId) => {
  removedTab = true;
  removeTab(tabId.toString());
});
async function updateLastHighlight(tabId: string) {
  const result: StorageData = await chrome.storage.local.get([
    "lastHighlight",
    "graph",
  ]);
  result.lastHighlight = tabId;
  return chrome.storage.local.set(result);
}

async function connectTabs(tabA: string, tabB: string) {
  console.log("connected tabs", tabA, tabB);
  const result: StorageData = await chrome.storage.local.get([
    "lastHighlight",
    "graph",
  ]);
  increaseEdgeWeight(result.graph, tabA, tabB);
  return chrome.storage.local.set(result);
}

async function removeTab(tabId: string) {
  console.log("remove tab", tabId);
  const result: StorageData = await chrome.storage.local.get([
    "lastHighlight",
    "graph",
  ]);
  removeNode(result.graph, tabId);
  result.lastHighlight = null;
  chrome.storage.local.set(result);
}
chrome.tabs.onHighlighted.addListener(async (highlightInfo) => {
  if (removedTab) {
    removedTab = false;
    return;
  }
  const tabIds = highlightInfo.tabIds;
  if (tabIds.length != 1) {
    return;
  }
  const tabId = tabIds[0].toString();
  const storageData: StorageData = await chrome.storage.local.get([
    "lastHighlight",
    "graph",
  ]);
  if (storageData.lastHighlight) {
    await connectTabs(tabId, storageData.lastHighlight);
  }
  updateLastHighlight(tabId);
});
