import { Notific8Module } from './notific8-module';
import {
  Notific8Notification,
  Notific8Options,
  Notific8OptionTypes
} from './notific8-notification';

export class Notific8 {
  public static registerModule(
    moduleName: string,
    position: string,
    defaultOptions: {},
    callbackMethod: Function
  ) {
    const module = new Notific8Module(moduleName, position, defaultOptions, callbackMethod);

    this.modules.push(module);
  }

  public static notification(
    message: string,
    options: { [ key: string ]: Notific8OptionTypes|undefined }
  ): Notific8Notification {
    const sanitizedOptions: Notific8Options = this.ensureValuesAreSet(options);
    const notification = new Notific8Notification(message, sanitizedOptions);

    this.initContainers(notification.options);

    return notification;
  }

  public static setDefault(property: string, value: Notific8OptionTypes): Notific8Options {
    switch (property) {
      case 'closeText':
        this.defaultOptions.closeText = value as string;
        break;
      case 'color':
        this.defaultOptions.color = value as string;
        break;
      case 'horizontalEdge':
        this.defaultOptions.horizontalEdge = value as string;
        break;
      case 'life':
        this.defaultOptions.life = value as number;
        break;
      case 'namespace':
        this.defaultOptions.namespace = value as string;
        break;
      case 'queue':
        this.defaultOptions.queue = value as boolean;
        break;
      case 'sticky':
        this.defaultOptions.sticky = value as boolean;
        break;
      case 'theme':
        this.defaultOptions.theme = value as string;
        break;
      case 'verticalEdge':
        this.defaultOptions.verticalEdge = value as string;
        break;
      case 'zindex':
        this.defaultOptions.zindex = value as number;
        break;
      case 'onClose':
        this.defaultOptions.onClose = value as { [ key: string ]: Function };
        break;
      case 'onContainerCreate':
        this.defaultOptions.onContainerCreate = value as {
          [ key: string ]: (container: Element, options: Notific8Options) => {}
        };
        break;
      case 'onCreate':
        this.defaultOptions.onCreate = value as { [ key: string ]: Function };
        break;
      case 'onInit':
        this.defaultOptions.onInit = value as { [ key: string ]: Function };
        break;
    }

    return this.defaultOptions;
  }

  public static getDefaults(): Notific8Options {
    return this.defaultOptions;
  }

  public static addDefaultHandler(
    handlerType: 'onCreate'|'onContainerCreate'|'onClose'|'onInit',
    handler: Function,
    id?: string
  ): { [ key: string ]: Function } {
    if (!id) {
      id = `handler${Object.keys(this.defaultOptions[handlerType] as Object).length + 1}`;
    }

    (this.defaultOptions[handlerType] as { [ key: string ]: Function })[id] = handler;

    return (this.defaultOptions[handlerType] as { [ key: string ]: Function });
  }

  public static removeDefaultHandler(
    handlerType: 'onCreate'|'onContainerCreate'|'onClose'|'onInit',
    id: string
  ): { [ key: string ]: Function } {
    delete (this.defaultOptions[handlerType] as { [ key: string ]: Function })[id];

    return (this.defaultOptions[handlerType] as { [ key: string ]: Function });
  }

  private static modules: Notific8Module[] = [];
  private static defaultOptions: Notific8Options = {
    closeText: 'close',
    color: 'teal',
    horizontalEdge: 'top',
    life: 10000,
    modules: [],
    namespace: 'notific8',
    onClose: {},
    onContainerCreate: {},
    onCreate: {},
    onInit: {},
    queue: false,
    sticky: false,
    theme: 'ocho',
    verticalEdge: 'right',
    zindex: 1100
  };
  private static containerClass: string;
  private static dataStore = {};

  private static ensureValuesAreSet(
    options: { [ key: string ]: Notific8OptionTypes|undefined|Array<{ [key: string]: Notific8OptionTypes|undefined }> }
  ): Notific8Options {
    options.closeText         = options.closeText         || this.defaultOptions.closeText;
    options.color             = options.color             || this.defaultOptions.color;
    options.horizontalEdge    = options.horizontalEdge    || this.defaultOptions.horizontalEdge;
    options.life              = options.life              || this.defaultOptions.life;
    options.namespace         = options.namespace         || this.defaultOptions.namespace;
    options.onCreate          = options.onCreate          || this.defaultOptions.onCreate;
    options.onContainerCreate = options.onContainerCreate || this.defaultOptions.onContainerCreate;
    options.onClose           = options.onClose           || this.defaultOptions.onClose;
    options.onInit            = options.onInit            || this.defaultOptions.onInit;
    options.queue             = options.queue             || this.defaultOptions.queue;
    options.sticky            = options.sticky            || this.defaultOptions.sticky;
    options.theme             = options.theme             || this.defaultOptions.theme;
    options.verticalEdge      = options.verticalEdge      || this.defaultOptions.verticalEdge;
    options.zindex            = options.zindex            || this.defaultOptions.zindex;
    options.modules           = options.modules           || this.defaultOptions.modules;

    return options as Notific8Options;
  }

  private static initContainers(options: Notific8Options): void {
    this.containerClass = `${options.namespace}-container`;
    if (document.querySelectorAll(`.${this.containerClass}`).length === 0) {
      const body: HTMLElement = document.querySelector('body') as HTMLElement;
      const containerClasses: string[] = [ this.containerClass ];
      let containerStr: string = '';
        // beforeContainerModules,
        // insideContainerModules,
        // afterContainerModules,
        // containerPositions,
      const containerPositions: string[] = ['top right', 'top left', 'bottom right', 'bottom left'];
        // onContainerCreateHandlers;

      body.dataset.notific8s = '0';

      // @TODO before container modules
      // beforeContainerModules = notific8RegisteredModules.beforeContainer;
      // for (let i = 0, len = beforeContainerModules.length; i < len; i++) {
      //   let module = beforeContainerModules[i],
      //     moduleResults = module.callbackMethod(notific8Defaults);
      //   containerClasses = containerClasses.concat(moduleResults.classes);
      //   containerStr += moduleResults.html;
      // }

      containerStr += '<div class="$classes $pos">';
      // @TODO inside container modules
      // insideContainerModules = notific8RegisteredModules.insideContainer;
      // for (let j = 0, len = insideContainerModules.length; j < len; j++) {
      //   let module = insideContainerModules[j],
      //     moduleResults = module.callbackMethod(notific8Defaults);
      //   containerClasses = containerClasses.concat(moduleResults.classes);
      //   containerStr += moduleResults.html;
      // }
      containerStr += '</div>';

      // @TODO after container modules
      // afterContainerModules = notific8RegisteredModules.afterContainer;
      // for (let k = 0, len = afterContainerModules.length; k < len; k++) {
      //   let module = afterContainerModules[k],
      //     moduleResults = module.callbackMethod(notific8Defaults);
      //   containerClasses = containerClasses.concat(moduleResults.classes);
      //   containerStr += moduleResults.html;
      // }

      for (const position of containerPositions) {
        const modifiedContainerStr: string = containerStr.replace('$pos', position)
          .replace('$classes', containerClasses.join(' '));
        const tempDoc: HTMLDocument = document.implementation.createHTMLDocument('tempDoc');
        tempDoc.body.innerHTML = modifiedContainerStr;
        document.body.appendChild(tempDoc.body.firstChild as Node);
      }

      const containers: NodeListOf<Element> = document.querySelectorAll(`.${this.containerClass}`);
      for (let o = 0, len = containers.length; o < len; o++) {
        const container = containers[o] as HTMLElement;
        container.style.zIndex = (this.defaultOptions.zindex as number).toString() as string;

        // @TODO onContainerCreate handlers
        // onContainerCreateHandlers = notific8ContainerHandlers.onContainerCreate;
        // for (let p = 0, len = onContainerCreateHandlers.length; p < len; p++) {
        //   let handler = onContainerCreateHandlers[p];
        //   handler(container, options);
        // }

        container.addEventListener('click', (event: Event) => {
          // let data,
          // let data;
            // target = event.target,
            // notification = target.parentElement,
          const notification = event.currentTarget as HTMLElement;
            // notificationClass = `${options.namespace}-notification`;
          const notificationClass = `${options.namespace}-notification`;

          if (notification.className.split(' ').indexOf(notificationClass) === -1) {
            return;
          }

          // data = notific8DataStore[notification.id];
          // closeNotification(notification.id, data);
          // @TODO get the datastore for the notification
          // @TODO close the given notification
        });
      }
    }
  }
}
