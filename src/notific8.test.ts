import { Notific8 } from './notific8';
import { Notific8Options } from './notific8-notification';

describe('Notific8 tests', function() {
  const defaultOptions: Notific8Options = {
    closeText: 'close',
    color: 'teal',
    horizontalEdge: 'top',
    life: 10000,
    namespace: 'notific8',
    onCreate: [],
    onClose: [],
    onInit: [],
    queue: false,
    sticky: false,
    theme: 'ocho',
    verticalEdge: 'right',
    zindex: 1100,
    modules: []
  };

  describe('default options', function() {
    it('should set the closeText default value', function() {
      const newDefaults = Notific8.setDefault('closeText', 'adios');
      expect(newDefaults.closeText).toBe('adios');
    });

    it('should set the color default value', function() {
      const newDefaults = Notific8.setDefault('color', 'chartreuse');
      expect(newDefaults.color).toBe('chartreuse');
    });

    it('should set the horizontalEdge default value', function() {
      const newDefaults = Notific8.setDefault('horizontalEdge', 'top');
      expect(newDefaults.horizontalEdge).toBe('top');
    });

    it('should set the life default value', function() {
      const newDefaults = Notific8.setDefault('life', 5000);
      expect(newDefaults.life).toBe(5000);
    });

    it('should set the namespace default value', function() {
      const newDefaults = Notific8.setDefault('namespace', 'notific8test');
      expect(newDefaults.namespace).toBe('notific8test');
    });

    xit('should set the onCreate default value', function() {
      let newDefaults = Notific8.setDefault('onCreate', function() {});
      expect((newDefaults.onCreate as Function[]).length).toBe(1);
      newDefaults = Notific8.setDefault('onCreate',[ function() {}, function() {}])
      expect((newDefaults.onCreate as Function[]).length).toBe(3);
    });

    xit('should set the onClose default value', function() {
      let newDefaults = Notific8.setDefault('onClose', function() {});
      expect((newDefaults.onClose as Function[]).length).toBe(1);
      newDefaults = Notific8.setDefault('onClose',[ function() {}, function() {}])
      expect((newDefaults.onClose as Function[]).length).toBe(3);
    });

    xit('should set the onInit default value', function() {
      let newDefaults = Notific8.setDefault('onInit', function() {});
      expect((newDefaults.onInit as Function[]).length).toBe(1);
      newDefaults = Notific8.setDefault('onInit',[ function() {}, function() {}])
      expect((newDefaults.onInit as Function[]).length).toBe(3);
    });

    it('should set the queue default value', function() {
      const newDefaults = Notific8.setDefault('queue', true);
      expect(newDefaults.queue).toBe(true);
    });

    it('should set the sticky default value', function() {
      const newDefaults = Notific8.setDefault('sticky', true);
      expect(newDefaults.sticky).toBe(true);
    });

    it('should set the theme default value', function() {
      const newDefaults = Notific8.setDefault('theme', 'bananas');
      expect(newDefaults.theme).toBe('bananas');
    });

    it('should set the verticalEdge default value', function() {
      const newDefaults = Notific8.setDefault('verticalEdge', 'left');
      expect(newDefaults.verticalEdge).toBe('left');
    });

    it('should set the zindex default value', function() {
      const newDefaults = Notific8.setDefault('zindex', 1500);
      expect(newDefaults.zindex).toBe(1500);
    });

    afterEach(function() {
      Notific8.setDefault('closeText', defaultOptions.closeText as string);
      Notific8.setDefault('color', defaultOptions.color as string);
      Notific8.setDefault('horizontalEdge', defaultOptions.horizontalEdge as string);
      Notific8.setDefault('life', defaultOptions.life as number);
      Notific8.setDefault('namespace', defaultOptions.namespace as string);
      // Notific8.setDefault('onCreate', []);
      // Notific8.setDefault('onClose', []);
      // Notific8.setDefault('onInit', []);
      Notific8.setDefault('queue', defaultOptions.queue as boolean);
      Notific8.setDefault('sticky', defaultOptions.sticky as boolean);
      Notific8.setDefault('theme', defaultOptions.theme as string);
      Notific8.setDefault('verticalEdge', defaultOptions.verticalEdge as string);
      Notific8.setDefault('zindex', defaultOptions.zindex as number);
    });
  });

  it('should test that the defaults are set', function() {
    const notification = Notific8.notification('Hello, world!', {});
    expect(notification.options).toEqual(defaultOptions);
  });
});