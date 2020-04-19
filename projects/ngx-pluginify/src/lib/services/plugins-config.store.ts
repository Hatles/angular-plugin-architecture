import { Injectable } from '@angular/core';

export interface PluginsConfig {
  [key: string]: {
    name: string;
    path: string;
    deps: string[];
  };
}

@Injectable()
export class PluginsConfigStore {

  config: PluginsConfig;

  constructor() {
  }
}
