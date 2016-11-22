/**
  kakagan.stateMachine.js
**/

;(function (root, factory) {
  root.StateMachine = factory();
})(window, function () {

  var mapEventToState, buildActionMethod, transition, doCallback;

  mapEventToState = function (stateMap, event) {
    (stateMap[event.from] ||
     (stateMap[event.from] = [])).push(event.eventName);
  };

  buildActionMethod = function (eventName, to) {
    return function () {
      var args = Array.prototype.slice.call(arguments);
      transition.apply(this, [ eventName, to ].concat(args));
    }
  };

  transition = function (eventName, to) {
    var args = Array.prototype.slice.call(arguments, 2);
    var from = this.currentState;

    this.currentState = to;

    StateMachine.onEnterState.call(this, eventName, from, to, args);
    StateMachine.onChangeState.call(this, eventName, from, to, args);
    StateMachine.onAfterEvent.call(this, eventName, from, to, args);
  };

  doCallback = function (callback, eventName, from, to, args) {
    callback && callback.apply(this, [eventName, from, to].concat(args));
  };

  var StateMachine = {
    create: function (stateObject) {

      // 得到初始化信息包括状态、事件
      var initial = typeof stateObject.initial === 'string'
        ? { state: stateObject.initial }
        : stateObject.initial;
      var eventName = initial.eventName || 'startup';
      var events = stateObject.events || [];
      var actionMap = stateObject.actionMap || {};
      var stateMap = {};

      var stateMachine = {
        // 某一时刻的当前状态
        currentState: 'pending',
        states: function () {
          return Object.keys(stateMap).sort()
        }
      };

      // 假如给定了初始状态，那么将状态机从默认pending状态transition到初始状态
      mapEventToState(stateMap, {
        eventName: eventName,
        from: stateMachine.currentState,
        to: initial.state
      });

      // 记录状态总数
      events.forEach(function (event) {
        mapEventToState(stateMap, event);
      });

      stateMachine[eventName] = buildActionMethod(eventName, initial.state);

      events.forEach(function (event) {
        stateMachine[event.eventName] = buildActionMethod(event.eventName, event.to);
      });

      Object
        .keys(actionMap)
        .forEach(function (key) {
          stateMachine[key] = actionMap[key];
        });

      if (initial && initial.state) {
        stateMachine[eventName]();
      }

      return stateMachine;
    },
    onEnterState: function (eventName, from, to, args) {
      return doCallback.call(this, this['onenter' + to], eventName, from, to, args);
    },
    onChangeState: function () {
      return doCallback.call(this, this['onchangestate'])
    },
    onAfterEvent: function (eventName, from, to, args) {
      return doCallback.call(this, this['onafter' + eventName], eventName, from, to, args)
    }
  };

  return StateMachine;
});
