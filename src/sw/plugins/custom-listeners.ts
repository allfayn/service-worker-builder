import { Operation, Plugin, PluginFactory, VersionWorker } from '@angular/service-worker/worker';

interface ExtendableEvent extends Event {
  waitUntil(fn: Promise<any>): void;
}

interface Notification {
  body: string;
  data: any;
  icon: string;
  lang: string;
  requireInteraction: boolean;
  silent: boolean;
  tag: string;
  timestamp: number;
  title: string;
  close(): void;
  requestPermission(): Promise<string>;
}

interface NotificationEvent extends ExtendableEvent {
  action: string;
  notification: Notification;
}

interface Client {
  frameType: ClientFrameType;
  id: string;
  url: string;
}

interface Clients {
  claim(): Promise<any>;
  get(id: string): Promise<Client>;
  matchAll(options?: ClientMatchOptions): Promise<Array<Client>>;
  openWindow(url: string): Promise<WindowClient>;
}

interface ClientMatchOptions {
  includeUncontrolled?: boolean;
  type?: ClientMatchTypes;
}

interface WindowClient {
  focused: boolean;
  visibilityState: WindowClientState;
  focus(): Promise<WindowClient>;
  navigate(url: string): Promise<WindowClient>;
}

type ClientFrameType = "auxiliary" | "top-level" | "nested" | "none";
type ClientMatchTypes = "window" | "worker" | "sharedworker" | "all";
type WindowClientState = "hidden" | "visible" | "prerender" | "unloaded";

declare var clients: Clients;

export function CustomListeners(): PluginFactory<CustomListenersImpl> {
  return (worker: VersionWorker) => new CustomListenersImpl(worker);
}

export class CustomListenersImpl implements Plugin<CustomListenersImpl> {

  setup(operations: Operation[]): void {

  }

  constructor(private worker: VersionWorker) {
    self.addEventListener('notificationclick', function (event: NotificationEvent) {
      // console.log('On notification click: ', event);
      event.notification.close();

      if (event.action === 'opentweet') {
        // console.log('Performing action opentweet');

        event.waitUntil(
          clients.openWindow(event.notification.data).then(function (windowClient) {
            // do something with the windowClient.
          })
        );
      } else {
        // console.log('Performing default click action');

        // This looks to see if the current is already open and
        // focuses if it is
        event.waitUntil(clients.matchAll({
          includeUncontrolled: true,
          type: 'window'
        }).then(function (clientList: any) {
          for (let i = 0; i < clientList.length; i++) {
            const client = clientList[i];
            if (client.url === '/' && 'focus' in client) {
              return client.focus();
            }
          }
          if (clients.openWindow) {
            return clients.openWindow('/');
          }
        }));
      }
    });

    self.addEventListener('notificationclose', function (event) {
      console.log('On notification close');
    });
  }

}

