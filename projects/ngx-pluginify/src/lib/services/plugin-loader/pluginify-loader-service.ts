import { Injectable, Injector, NgModuleRef } from '@angular/core';
import { PluginLoaderService } from './plugin-loader.service';
import {
  PLUGIN_INITIALIZER,
  PluginInitializerDeclaration,
  PluginInitializerService
} from '../plugin-initializer/plugin-initializer.service';

export interface PluginLoadResult<T> {
  moduleRef: NgModuleRef<any>;
  result: T;
}

@Injectable()
export class PluginifyLoaderService {

  public constructor(
    private injector: Injector,
    private pluginLoader: PluginLoaderService
  ) {
  }

  public load<TConfig, TResult>(pluginName: string, pluginType?: string, config?: TConfig): Promise<PluginLoadResult<TResult>> {
    return this.pluginLoader.load(pluginName).then(moduleFactory => {
      const moduleRef = moduleFactory.create(this.injector);

      const pluginInitializers = moduleRef.injector.get(PLUGIN_INITIALIZER) as PluginInitializerDeclaration[];
      if (!!pluginInitializers && pluginInitializers.length) {
        for (let pluginInitializer of pluginInitializers) {
          if (!!pluginInitializer.name && pluginInitializer.name !== pluginName) {
            console.error('Invalid plugin name');
          } else {
            // plugin with name found
            if (!!pluginType && !!pluginInitializer.type && pluginType !== pluginInitializer.type) {
              console.error('Invalid plugin type');
            } else {
              console.log('Initialize plugin ' + pluginName);
              if (pluginInitializer.initializerFn) {
                return {
                  moduleRef: moduleRef,
                  result: pluginInitializer.initializerFn(config)
                };
              } else if (pluginInitializer.initializer) {
                const initlializerInstance = moduleRef.injector
                  .get<PluginInitializerService<TConfig, TResult>>(pluginInitializer.initializer);
                if (initlializerInstance) {
                  return {
                    moduleRef: moduleRef,
                    result: initlializerInstance.initialize(config)
                  };
                } else {
                  throw Error('Cant find initilizer instance of type ' + pluginInitializer.initializer);
                }
              } else {
                console.error('Missing initlizer in plugin ' + pluginName);
              }
            }
            // plugin with name loaded
          }
        }
      }
    });
  }
}
