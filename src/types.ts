export type WingetSearchOutput = {
  name: string;
  moniker: string;
  id: string;
  version: string;
  match?: string;
  source: string;
};

export type WingetListOutput = {
  name: string;
  moniker: string;
  id: string;
  version: string;
  availableVersion?: string;
  source?: string;
};
