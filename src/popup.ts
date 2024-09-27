import { initStorage, StorageData, Graph } from "./listen-to-tabs";
const groupBtn = document.querySelector("#groupBtn");
const ungroupBtn = document.querySelector("#ungroupBtn");
const clearBtn = document.querySelector("#clearBtn");
const watchedTabsBtn = document.querySelector("#watchedTabsBtn");
if (groupBtn && clearBtn && watchedTabsBtn && ungroupBtn) {
  ungroupBtn.addEventListener("click", async () => {
    removeGroups();
  });
  groupBtn.addEventListener("click", async () => {
    await removeGroups();
    const storageData: StorageData = await chrome.storage.local.get([
      "lastHighlight",
      "graph",
    ]);
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
          let keys = Object.keys(labelCounts);
          if (keys.length <= 0) continue;
          let bestLabel = keys.reduce((a, b) =>
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
    let labels = labelPropagation(storageData.graph);
    let reversedLabels: { [label: string]: string[] } = {};

    for (let node in labels) {
      let label = labels[node];

      if (!reversedLabels[label]) {
        reversedLabels[label] = [];
      }

      reversedLabels[label].push(node);
    }
    const tabs = await chrome.tabs.query({});
    const currentTabs = tabs.map(({ id }) => id);
    let count = 1;
    for (let label in reversedLabels) {
      let tabIds = reversedLabels[label].map((idStr) => parseInt(idStr, 10));
      tabIds = tabIds.filter((id) => currentTabs.includes(id));
      if (tabIds.length <= 1) continue;
      const group = await chrome.tabs.group({ tabIds });
      await chrome.tabGroups.update(group, { title: count.toString() });
      count += 1;
    }
    console.log(reversedLabels);
  });

  async function removeGroups() {
    const tabs = await chrome.tabs.query({});
    let currentTabs = tabs.map(({ id }) => id);
    await chrome.tabs.ungroup(
      currentTabs.filter((id) => typeof id !== "undefined")
    );
  }

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
