import * as core from '@angular/core';
import * as common from '@angular/common';
import * as forms from '@angular/forms';
import * as router from '@angular/router';
import * as rxjs from 'rxjs';
import * as tslib from 'tslib';
import { InjectionToken } from '@angular/core';
import * as ngxPluginify from '../../externals';

export interface PluginExternals {
  [key: string]: any;
}

export const PLUGIN_EXTERNALS_CONFIG = new InjectionToken<PluginExternals>('PLUGIN_EXTERNALS_CONFIG');

export const PLUGIN_EXTERNALS_MAP: PluginExternals = {
  'ng.core': core,
  'ng.common': common,
  'ng.forms': forms,
  'ng.router': router,
  rxjs,
  tslib,
  'ngx.pluginify': ngxPluginify
};
