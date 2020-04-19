import { InjectionToken, Provider, Type } from '@angular/core';

export interface PluginInitializerDeclaration {
  type?: string;
  name?: string;
  initializer?: Type<PluginInitializerService<any, any>>;
  initializerFn?: InitlializerFn<any, any>;
}

export const PLUGIN_INITIALIZER = new InjectionToken<PluginInitializerDeclaration>('PLUGIN_INITIALIZER');

export function providePluginInitializer<TConfig, TResult>(initializerType: Type<PluginInitializerService<TConfig, TResult>>,
                                            type?: string, name?: string): Provider[] {
  return [
    {
    provide: PLUGIN_INITIALIZER,
    useValue: {
      initializer: initializerType,
      type: type,
      name: name
    },
      multi: true
  },
    initializerType
  ];
}

export function providePluginInitializerFn<TConfig, TResult>(initializerFn: InitlializerFn<TConfig, TResult>,
                                              type?: string, name?: string): Provider {
  return {
    provide: PLUGIN_INITIALIZER,
    useValue: {
      initializerFn: initializerFn,
      type: type,
      name: name
    },
    multi: true
  };
}

export type InitlializerFn<TConfig, TResult> = (config?: TConfig) => TResult;

export abstract class PluginInitializerService<TConfig, TResult> {
  abstract initialize(config?: TConfig): TResult;
}
