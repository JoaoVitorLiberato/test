/**
 * Helper function to import remote modules via Module Federation
 * This ensures the remote is loaded correctly at runtime
 *
 * The Module Federation plugin should transform dynamic imports automatically,
 * but we need to ensure the remoteEntry.js is loaded first and use import maps.
 */
const loadedRemotes = new Map<string, Promise<void>>();

async function loadRemoteEntry(remoteName: string, remoteUrl: string): Promise<void> {
  if (loadedRemotes.has(remoteName)) {
    return loadedRemotes.get(remoteName)!;
  }

  const loadPromise = new Promise<void>((resolve, reject) => {
    // Check if script already exists
    const existingScript = document.querySelector(`script[data-remote="${remoteName}"]`);
    if (existingScript) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = remoteUrl;
    script.async = true;
    script.setAttribute('data-remote', remoteName);

    script.onload = () => {
      // Wait a bit for the remote to initialize
      setTimeout(() => resolve(), 100);
    };

    script.onerror = () => {
      reject(new Error(`Failed to load remote entry for ${remoteName} from ${remoteUrl}`));
    };

    document.head.appendChild(script);
  });

  loadedRemotes.set(remoteName, loadPromise);
  return loadPromise;
}

export async function importRemote<T = any>(
  remoteName: string,
  modulePath: string = '',
  remoteUrl?: string
): Promise<T> {
  // Determine the remote URL if not provided
  if (!remoteUrl) {
    const isDev = import.meta.env.DEV;
    if (remoteName === 'core') {
      remoteUrl = isDev
        ? 'http://localhost:8080/core/remoteEntry.js'
        : 'http://localhost:8080/core/remoteEntry.js';
    } else {
      throw new Error(`Remote URL not provided for ${remoteName}`);
    }
  }

  // Load the remoteEntry.js first if not already loaded
  await loadRemoteEntry(remoteName, remoteUrl);

  // Create or update import map to resolve the remote module
  let importMap = document.querySelector('script[type="importmap"]');
  if (!importMap) {
    importMap = document.createElement('script');
    importMap.type = 'importmap';
    document.head.appendChild(importMap);
  }

  try {
    // Wait for the remote to be fully initialized
    await new Promise(resolve => setTimeout(resolve, 300));

    const moduleFullPath = modulePath ? `${remoteName}/${modulePath}` : `${remoteName}/`;

    // @originjs/vite-plugin-federation exposes remotes via __federation_import__
    // Try to access the federation runtime
    // @ts-ignore
    if (typeof window !== 'undefined' && window.__federation_import__) {
      try {
        // @ts-ignore
        const module = await window.__federation_import__(remoteName, modulePath || '.');
        return module as T;
      } catch (federationError) {
        console.warn('__federation_import__ failed:', federationError);
      }
    }

    // Try accessing via the container that should be created by the remoteEntry
    // @ts-ignore
    const containerKey = `__FEDERATION_CONTAINER_${remoteName}__`;
    // @ts-ignore
    if (window[containerKey] && typeof window[containerKey].get === 'function') {
      try {
        // @ts-ignore
        const factory = await window[containerKey].get(modulePath || '.');
        const module = typeof factory === 'function' ? factory() : factory;
        return module as T;
      } catch (containerError) {
        console.warn('Container.get failed:', containerError);
      }
    }

    // Fallback: Try direct import (may work if plugin transformed it)
    try {
      // @ts-ignore - This will be resolved by Module Federation at runtime
      const module = await import(/* @vite-ignore */ moduleFullPath);
      return module as T;
    } catch (directImportError) {
      // Last resort: check if remote is available on window with get method
      // @ts-ignore
      if (window[remoteName] && typeof window[remoteName].get === 'function') {
        try {
          // @ts-ignore
          const factory = await window[remoteName].get(modulePath || '.');
          return typeof factory === 'function' ? factory() : factory;
        } catch (windowError) {
          console.warn('Window[remoteName].get failed:', windowError);
        }
      }

      console.error('All import methods failed. Available window properties:', Object.keys(window).filter(k => k.includes('FEDERATION') || k.includes('federation') || k === remoteName));
      throw directImportError;
    }
  } catch (error) {
    console.error(`Failed to import remote ${remoteName}:`, error);
    console.error('Remote URL:', remoteUrl);
    console.error('Module path:', modulePath || '.');
    throw error;
  }
}

