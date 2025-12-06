// src/utils/federationLoader.ts
export async function ensureRemote(remoteName: string, remoteUrl: string, waitMs = 10000) {
  // se runtime do plugin já registrou o remote, ok
  // @ts-ignore
  if (typeof window !== 'undefined' && window.__federation_import__) {
    try {
      // tenta chamar helper do runtime
      // @ts-ignore
      if (window.__federation_import__(remoteName)) return;
    } catch (e) {
      // ignore
    }
  }

  // se o remote já foi carregado (script presente), espera até global aparecer
  const globalCheck = () => {
    // @originjs/vite-plugin-federation costuma criar window.__federation_sharing__ ou similares
    // mas o mais direto é tentar importar dinamicamente depois de carregar o script
    return !!(window as any)[remoteName] || !!(window as any).__federation_import__;
  };

  // cria e injeta script do remoteEntry
  await new Promise<void>((resolve, reject) => {
    if (globalCheck()) return resolve();

    const existing = document.querySelector(`script[data-mf="${remoteName}"]`);
    if (existing) {
      // esperar load
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', () => reject(new Error('Failed loading remoteEntry')));
      return;
    }

    const s = document.createElement('script');
    s.src = remoteUrl;
    s.setAttribute('data-mf', remoteName);
    s.onload = () => {
      // dê um tempo curto para runtime inicializar
      setTimeout(() => {
        if (globalCheck()) resolve();
        else resolve(); // mesmo que não exista global, deixa a import tentar
      }, 30);
    };
    s.onerror = () => reject(new Error(`Failed to load remoteEntry script: ${remoteUrl}`));
    document.head.appendChild(s);
  });

  // opcional: espera até que import('core') funcione (timeout)
  const start = Date.now();
  while (Date.now() - start < waitMs) {
    try {
      // tenta import; se funcionar, ok
      // @ts-ignore
      await import(remoteName); // ex: 'core' ou 'core/index' (use o caminho que você expôs)
      return;
    } catch (e) {
      // espera um pouco e tenta novamente
      await new Promise(r => setTimeout(r, 50));
    }
  }

  throw new Error(`Timed out waiting for remote ${remoteName} (${remoteUrl})`);
}
