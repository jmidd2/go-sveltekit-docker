import type { EventType, MountType } from './enums';

export type DockerEvent = {
  Status?: string;
  ID?: string;
  From?: string;
  Type: EventType;
  Action: Action;
  Actor: { Attributes: Record<string, string> };
  Scope?: string;
  Time?: number;
  TimeNano?: number;
};

export type Port = {
  IP?: string;
  PrivatePort: number;
  PublicPort?: number;
  Type: string;
};

export type HostConfig = {
  NetworkMode?: string;
};

export type EndpointIPAMConfig = {
  IPv4Address?: string;
  IPv6Address?: string;
  LinkLocalIPs?: string[];
};

export type EndpointSettings = {
  IPAMConfig?: EndpointIPAMConfig;
  Links: string[];
  Aliases: string[];
  MacAddress: string;
  NetworkID: string;
  EndpointID: string;
  Gateway: string;
  IPAddress: string;
  IPPrefixLen: number;
  IPv6Gateway: string;
  GlobalIPv6Address: string;
  GlobalIPv6PrefixLen: number;
  DriverOpts: Record<string, string>;
  DNSNames: string[];
};

export type SummaryNetworkSettings = {
  Networks: Record<string, EndpointSettings>;
};

export type MountPoint = {
  Type?: MountType;
  Name?: string;
  Source: string;
  Destination: string;
  Driver?: string;
  Mode: string;
  RW: boolean;
  Propagation: Propagation;
};

export type Container = {
  Id: string;
  Names: string[];
  Image: string;
  ImageID: string;
  Command: string;
  Created: number;
  Ports: Port[];
  SizeRw?: number;
  SizeRootFs?: number;
  Labels: Record<string, string>;
  State: string;
  Status: string;
  HostConfig: HostConfig;
  NetworkSettings?: SummaryNetworkSettings;
  Mounts: MountPoint[];
};
