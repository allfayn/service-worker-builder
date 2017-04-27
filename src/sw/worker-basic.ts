import { ExternalContentCache } from '@angular/service-worker/plugins/external';
import { Push } from '@angular/service-worker/plugins/push';
import { RouteRedirection } from '@angular/service-worker/plugins/routes';
import { StaticContentCache } from '@angular/service-worker/plugins/static';
import { bootstrapServiceWorker } from '@angular/service-worker/worker';
import { CustomListeners } from './plugins/custom-listeners';
import {Dynamic, FreshnessStrategy, PerformanceStrategy} from '@angular/service-worker/plugins/dynamic';
import {Verbosity, HttpHandler} from '@angular/service-worker/worker';

bootstrapServiceWorker({
  manifestUrl: 'ngsw-manifest.json',
  plugins: [
    StaticContentCache(),
    Dynamic([
      new FreshnessStrategy(),
      new PerformanceStrategy(),
    ]),
    ExternalContentCache(),
    RouteRedirection(),
    Push(),
    CustomListeners()
  ],
  logLevel: Verbosity.DEBUG,
  // logHandlers: [
  //   new HttpHandler('/ngsw-log'),
  // ],
});
