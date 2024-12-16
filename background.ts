function updateBlockedUrls() {
  chrome.storage.sync.get("blockedUrls", (data) => {
    const blockedUrls = data.blockedUrls || [];

    // Convertir las URLs en reglas declarativas
    const rules = blockedUrls.map((url: string, index: number) => ({
      id: index + 1,
      priority: 1,
      action: {
        type: "redirect",
        redirect: { url: chrome.runtime.getURL("blocked.html") }, // Redirigir a blocked.html
      },
      condition: {
        urlFilter: url,
        resourceTypes: ["main_frame"],
      },
    }));

    // Actualizar las reglas dinámicas en declarativeNetRequest
    chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: rules.map((rule) => rule.id),
      addRules: rules,
    });
  });
}

// Escuchar los cambios en el almacenamiento y actualizar las URLs bloqueadas
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === "sync" && changes.blockedUrls) {
    updateBlockedUrls();
  }
});

// Inicializar reglas al cargar el service worker
updateBlockedUrls();
