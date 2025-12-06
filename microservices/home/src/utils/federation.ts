// src/utils/ensureRemote.ts
export async function ensureRemote(
  remoteName: string,
  remoteUrl: string,
  exposedModule = "",
  timeoutMs = 8000
) {
  // Já carregado pelo runtime do federation?
  if (window.__federation_import__) {
    try {
      await window.__federation_import__(`${remoteName}${exposedModule}`);
      return;
    } catch (_) {}
  }

  // Verifica se script já existe no DOM
  if (!document.querySelector(`script[data-mf="${remoteName}"]`)) {
    await new Promise<void>((resolve, reject) => {
      const s = document.createElement("script");
      s.src = remoteUrl;
      s.type = "module"; // IMPORTANTE → não gera erro de import.meta
      s.dataset.mf = remoteName;
      s.onload = () => resolve();
      s.onerror = () =>
        reject(new Error(`Falha ao carregar remoteEntry: ${remoteUrl}`));
      document.head.appendChild(s);
    });
  }

  // Aguarda o runtime inicializar
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (window.__federation_import__) {
      try {
        const mod = await window.__federation_import__(
          `${remoteName}${exposedModule}`
        );
        return mod;
      } catch (err) {
        // ainda inicializando
      }
    }
    await new Promise(r => setTimeout(r, 50));
  }

  throw new Error(
    `Timeout: remote '${remoteName}' não inicializou (${remoteUrl})`
  );
}
