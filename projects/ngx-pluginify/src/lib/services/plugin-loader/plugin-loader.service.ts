import { NgModuleFactory } from '@angular/core';
import { PluginExternals } from './plugin-externals';

export abstract class PluginLoaderService {
  protected constructor(externals: PluginExternals) {
    this.provideExternals(externals);
  }

  abstract provideExternals(externals: PluginExternals): void;

  abstract load<T>(pluginName): Promise<NgModuleFactory<T>>;
}
