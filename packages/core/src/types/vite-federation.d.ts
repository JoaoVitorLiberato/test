declare module "@module-federation/vite" {
  interface SharedConfig {
    singleton?: boolean;
    eager?: boolean;
    version?: string;
    requiredVersion?: string;
    import?: boolean;
    strictVersion?: boolean;
  }

  interface Shared {
    [key: string]: SharedConfig | boolean | string;
  }
}

