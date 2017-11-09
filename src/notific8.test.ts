import { Notific8 } from './notific8';
import { Notific8Options } from './notific8-notification';

describe('Notific8 tests', () => {
  const defaultOptions: Notific8Options = {
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

  describe('default options', () => {
    const mock = {
      mock: () => {
        // mock handler
      }
    };

    it('should set the closeText default value', () => {
      const newDefaults = Notific8.setDefault('closeText', 'adios');
      expect(newDefaults.closeText).toBe('adios');
    });

    it('should set the color default value', () => {
      const newDefaults = Notific8.setDefault('color', 'chartreuse');
      expect(newDefaults.color).toBe('chartreuse');
    });

    it('should set the horizontalEdge default value', () => {
      const newDefaults = Notific8.setDefault('horizontalEdge', 'top');
      expect(newDefaults.horizontalEdge).toBe('top');
    });

    it('should set the life default value', () => {
      const newDefaults = Notific8.setDefault('life', 5000);
      expect(newDefaults.life).toBe(5000);
    });

    it('should set the namespace default value', () => {
      const newDefaults = Notific8.setDefault('namespace', 'notific8test');
      expect(newDefaults.namespace).toBe('notific8test');
    });

    it('should set the queue default value', () => {
      const newDefaults = Notific8.setDefault('queue', true);
      expect(newDefaults.queue).toBe(true);
    });

    it('should set the sticky default value', () => {
      const newDefaults = Notific8.setDefault('sticky', true);
      expect(newDefaults.sticky).toBe(true);
    });

    it('should set the theme default value', () => {
      const newDefaults = Notific8.setDefault('theme', 'bananas');
      expect(newDefaults.theme).toBe('bananas');
    });

    it('should set the verticalEdge default value', () => {
      const newDefaults = Notific8.setDefault('verticalEdge', 'left');
      expect(newDefaults.verticalEdge).toBe('left');
    });

    it('should set the zindex default value', () => {
      const newDefaults = Notific8.setDefault('zindex', 1500);
      expect(newDefaults.zindex).toBe(1500);
    });

    it('should set the default onClose handlers', () => {
      const newDefaults = Notific8.setDefault('onClose', mock);
      expect(newDefaults.onClose).toEqual(mock);
    });

    it('should set the default onContainerCreate handlers', () => {
      const newDefaults = Notific8.setDefault('onContainerCreate', mock);
      expect(newDefaults.onContainerCreate).toEqual(mock);
    });

    it('should set the default onCreate handlers', () => {
      const newDefaults = Notific8.setDefault('onCreate', mock);
      expect(newDefaults.onCreate).toEqual(mock);
    });

    it('should set the default onInit handlers', () => {
      const newDefaults = Notific8.setDefault('onInit', mock);
      expect(newDefaults.onInit).toEqual(mock);
    });

    afterEach(() => {
      Notific8.setDefault('closeText', defaultOptions.closeText as string);
      Notific8.setDefault('color', defaultOptions.color as string);
      Notific8.setDefault('horizontalEdge', defaultOptions.horizontalEdge as string);
      Notific8.setDefault('life', defaultOptions.life as number);
      Notific8.setDefault('namespace', defaultOptions.namespace as string);
      Notific8.setDefault('queue', defaultOptions.queue as boolean);
      Notific8.setDefault('sticky', defaultOptions.sticky as boolean);
      Notific8.setDefault('theme', defaultOptions.theme as string);
      Notific8.setDefault('verticalEdge', defaultOptions.verticalEdge as string);
      Notific8.setDefault('zindex', defaultOptions.zindex as number);
      Notific8.setDefault('onClose', defaultOptions.onClose as { [ key: string ]: Function });
      Notific8.setDefault('onContainerCreate', defaultOptions.onContainerCreate as { [ key: string ]: Function });
      Notific8.setDefault('onCreate', defaultOptions.onCreate as { [ key: string ]: Function });
      Notific8.setDefault('onInit', defaultOptions.onInit as { [ key: string ]: Function });
    });
  });

  describe('default handler tests', () => {
    it('should add and remove default handlers', () => {
      let defaults = Notific8.getDefaults();
      expect(Object.keys(defaults.onClose as { [ key: string ]: Function }).length).toBe(0);
      expect(Object.keys(defaults.onContainerCreate as { [ key: string ]: Function }).length).toBe(0);
      expect(Object.keys(defaults.onCreate as { [ key: string ]: Function }).length).toBe(0);
      expect(Object.keys(defaults.onInit as { [ key: string ]: Function }).length).toBe(0);
      Notific8.addDefaultHandler('onCreate', () => {
        // mock for unit test
      });
      Notific8.addDefaultHandler('onClose', () => {
        // mock for unit test
      });
      Notific8.addDefaultHandler('onContainerCreate', () => {
        // mock for unit test
      });
      Notific8.addDefaultHandler('onInit', () => {
        // mock for unit test
      }, 'myCustomOnInit');
      defaults = Notific8.getDefaults();
      expect(Object.keys(defaults.onClose as { [ key: string ]: Function }).length).toBe(1);
      expect(Object.keys(defaults.onContainerCreate as { [ key: string ]: Function }).length).toBe(1);
      expect(Object.keys(defaults.onCreate as { [ key: string ]: Function }).length).toBe(1);
      expect(Object.keys(defaults.onInit as { [ key: string ]: Function }).length).toBe(1);
      Notific8.removeDefaultHandler('onCreate', 'handler1');
      Notific8.removeDefaultHandler('onClose', 'handler1');
      Notific8.removeDefaultHandler('onContainerCreate', 'handler1');
      Notific8.removeDefaultHandler('onInit', 'myCustomOnInit');
      defaults = Notific8.getDefaults();
      expect(Object.keys(defaults.onClose as { [ key: string ]: Function }).length).toBe(0);
      expect(Object.keys(defaults.onContainerCreate as { [ key: string ]: Function }).length).toBe(0);
      expect(Object.keys(defaults.onCreate as { [ key: string ]: Function }).length).toBe(0);
      expect(Object.keys(defaults.onInit as { [ key: string ]: Function }).length).toBe(0);
    });
  });

  it('should test that the defaults are set', () => {
    const notification = Notific8.notification('Hello, world!', {});
    expect(notification.options).toEqual(defaultOptions);
    expect(document.querySelectorAll('.notific8-container').length).toBe(4);
    expect((document.querySelector('.notific8-container') as HTMLElement).style.zIndex).toBe('1100');
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });
});
