(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./notific8-module", "./notific8-notification"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var notific8_module_1 = require("./notific8-module");
    var notific8_notification_1 = require("./notific8-notification");
    var Notific8 = (function () {
        function Notific8() {
        }
        Notific8.registerModule = function (moduleName, position, defaultOptions, callbackMethod) {
            var module = new notific8_module_1.Notific8Module(moduleName, position, defaultOptions, callbackMethod);
            this.modules.push(module);
        };
        Notific8.notification = function (message, options) {
            var sanitizedOptions = this.ensureValuesAreSet(options);
            var notification = new notific8_notification_1.Notific8Notification(message, sanitizedOptions);
            this.initContainers(notification.options);
            return notification;
        };
        Notific8.setDefault = function (property, value) {
            switch (property) {
                case 'closeText':
                    this.defaultOptions.closeText = value;
                    break;
                case 'color':
                    this.defaultOptions.color = value;
                    break;
                case 'horizontalEdge':
                    this.defaultOptions.horizontalEdge = value;
                    break;
                case 'life':
                    this.defaultOptions.life = value;
                    break;
                case 'namespace':
                    this.defaultOptions.namespace = value;
                    break;
                case 'queue':
                    this.defaultOptions.queue = value;
                    break;
                case 'sticky':
                    this.defaultOptions.sticky = value;
                    break;
                case 'theme':
                    this.defaultOptions.theme = value;
                    break;
                case 'verticalEdge':
                    this.defaultOptions.verticalEdge = value;
                    break;
                case 'zindex':
                    this.defaultOptions.zindex = value;
                    break;
                case 'onClose':
                    this.defaultOptions.onClose = value;
                    break;
                case 'onContainerCreate':
                    this.defaultOptions.onContainerCreate = value;
                    break;
                case 'onCreate':
                    this.defaultOptions.onCreate = value;
                    break;
                case 'onInit':
                    this.defaultOptions.onInit = value;
                    break;
            }
            return this.defaultOptions;
        };
        Notific8.getDefaults = function () {
            return this.defaultOptions;
        };
        Notific8.addDefaultHandler = function (handlerType, handler, id) {
            if (!id) {
                id = "handler" + (Object.keys(this.defaultOptions[handlerType]).length + 1);
            }
            this.defaultOptions[handlerType][id] = handler;
            return this.defaultOptions[handlerType];
        };
        Notific8.removeDefaultHandler = function (handlerType, id) {
            delete this.defaultOptions[handlerType][id];
            return this.defaultOptions[handlerType];
        };
        Notific8.ensureValuesAreSet = function (options) {
            options.closeText = options.closeText || this.defaultOptions.closeText;
            options.color = options.color || this.defaultOptions.color;
            options.horizontalEdge = options.horizontalEdge || this.defaultOptions.horizontalEdge;
            options.life = options.life || this.defaultOptions.life;
            options.namespace = options.namespace || this.defaultOptions.namespace;
            options.onCreate = options.onCreate || this.defaultOptions.onCreate;
            options.onContainerCreate = options.onContainerCreate || this.defaultOptions.onContainerCreate;
            options.onClose = options.onClose || this.defaultOptions.onClose;
            options.onInit = options.onInit || this.defaultOptions.onInit;
            options.queue = options.queue || this.defaultOptions.queue;
            options.sticky = options.sticky || this.defaultOptions.sticky;
            options.theme = options.theme || this.defaultOptions.theme;
            options.verticalEdge = options.verticalEdge || this.defaultOptions.verticalEdge;
            options.zindex = options.zindex || this.defaultOptions.zindex;
            options.modules = options.modules || this.defaultOptions.modules;
            return options;
        };
        Notific8.initContainers = function (options) {
            this.containerClass = options.namespace + "-container";
            if (document.querySelectorAll("." + this.containerClass).length === 0) {
                var body = document.querySelector('body');
                var containerClasses = [this.containerClass];
                var containerStr = '';
                var containerPositions = ['top right', 'top left', 'bottom right', 'bottom left'];
                body.dataset.notific8s = '0';
                containerStr += '<div class="$classes $pos">';
                containerStr += '</div>';
                for (var _i = 0, containerPositions_1 = containerPositions; _i < containerPositions_1.length; _i++) {
                    var position = containerPositions_1[_i];
                    var modifiedContainerStr = containerStr.replace('$pos', position)
                        .replace('$classes', containerClasses.join(' '));
                    var tempDoc = document.implementation.createHTMLDocument('tempDoc');
                    tempDoc.body.innerHTML = modifiedContainerStr;
                    document.body.appendChild(tempDoc.body.firstChild);
                }
                var containers = document.querySelectorAll("." + this.containerClass);
                for (var o = 0, len = containers.length; o < len; o++) {
                    var container = containers[o];
                    container.style.zIndex = this.defaultOptions.zindex.toString();
                    container.addEventListener('click', function (event) {
                        var notification = event.currentTarget;
                        var notificationClass = options.namespace + "-notification";
                        if (notification.className.split(' ').indexOf(notificationClass) === -1) {
                            return;
                        }
                    });
                }
            }
        };
        Notific8.modules = [];
        Notific8.defaultOptions = {
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
        Notific8.dataStore = {};
        return Notific8;
    }());
});
//# sourceMappingURL=notific8.js.map