/**
  kakagan.stateMachine.js
**/

;(function (root, factory) {
  root.StateMachine = factory();
})(window, function () {

  var mapStateToMachine, bindEvents;

  mapStateToMachine = function (map, group) {

  };

  bindEvents = function (stateMachine, from, to) {
    return function () {

    }
  };

  var StateMachine = {
    create: function (stateObject) {
      var stateMachine = {};

      // 得到初始化状态
      var initial = typeof stateObject.initial === 'string'
        ? { state: stateObject.initial }
        : stateObject.initial;

      // 得到初始化行为
      var action = initial.action || 'initial';
      var actions = stateObject.actions || [];
      var behaviors = stateObject.behaviors || {};

      // 添加状态机的行为
      actions.forEach(function (act) {
        StateMachine
      });


      return stateMachine;
    }

  };

  return StateMachine;
});
