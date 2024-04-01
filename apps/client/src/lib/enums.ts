export enum Action {
  Create = 'create',
  Start = 'start',
  Restart = 'restart',
  Stop = 'stop',
  Checkpoint = 'checkpoint',
  Pause = 'pause',
  UnPause = 'unpause',
  Attach = 'attach',
  Detach = 'detach',
  Resize = 'resize',
  Update = 'update',
  Rename = 'rename',
  Kill = 'kill',
  Die = 'die',
  OOM = 'oom',
  Destroy = 'destroy',
  Remove = 'remove',
  Commit = 'commit',
  Top = 'top',
  Copy = 'copy',
  ArchivePath = 'archive-path',
  ExtractToDir = 'extract-to-dir',
  Export = 'export',
  Import = 'import',
  Save = 'save',
  Load = 'load',
  Tag = 'tag',
  UnTag = 'untag',
  Push = 'push',
  Pull = 'pull',
  Prune = 'prune',
  Delete = 'delete',
  Enable = 'enable',
  Disable = 'disable',
  Connect = 'connect',
  Disconnect = 'disconnect',
  Reload = 'reload',
  Mount = 'mount',
  Unmount = 'unmount',
  ExecCreate = 'exec_create',
  ExecStart = 'exec_start',
  ExecDie = 'exec_die',
  ExecDetach = 'exec_detach',
  HealthStatus = 'health_status',
  HealthStatusRunning = 'health_status: running',
  HealthStatusHealthy = 'health_status: healthy',
  HealthStatusUnhealthy = 'health_status: unhealthy',
}

export enum EventType {
  Builder = 'builder', // BuilderEventType is the event type that the builder generates.
  Config = 'config', // ConfigEventType is the event type that configs generate.
  Container = 'container', // ContainerEventType is the event type that containers generate.
  Daemon = 'daemon', // DaemonEventType is the event type that daemon generate.
  Image = 'image', // ImageEventType is the event type that images generate.
  Network = 'network', // NetworkEventType is the event type that networks generate.
  Node = 'node', // NodeEventType is the event type that nodes generate.
  Plugin = 'plugin', // PluginEventType is the event type that plugins generate.
  Secret = 'secret', // SecretEventType is the event type that secrets generate.
  Service = 'service', // ServiceEventType is the event type that services generate.
  Volume = 'volume', // VolumeEventType is the event type that volumes generate.
}

export enum MountType {
  Bind = 'bind',
  Volume = 'volume',
  Tmpfs = 'tmpfs',
  NamedPipe = 'npipe',
  Cluster = 'cluster',
}

export enum Propagation {
  PropagationRPrivate = 'rprivate',
  PropagationPrivate = 'private',
  PropagationRShared = 'rshared',
  PropagationShared = 'shared',
  PropagationRSlave = 'rslave',
  PropagationSlave = 'slave',
}
