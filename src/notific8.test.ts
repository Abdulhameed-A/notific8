import { Notific8 } from './notific8';
import { Notific8Options } from './notific8-notification';

describe('Notific8 tests', function() {
  describe('configuration related functions', function() {
    it('should set the zindex', function() {
      expect(Notific8.zindex()).toEqual(1100);
      Notific8.zindex(2000);
      expect(Notific8.zindex()).toEqual(2000);
    });

    afterEach(function() {
      Notific8.zindex(1100);
    });
  });

  it('should test that the defaults are set', function() {
    const notification = Notific8.notification('Hello, world!', {});
    expect(notification.options).toEqual({
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
      zindex: 1100
    })
  });
});