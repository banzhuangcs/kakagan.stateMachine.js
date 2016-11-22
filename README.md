# kakagan.stateMachine
一个简单的JavaScript`状态机`

# 使用  
    var fsm = StateMachine.create({
      initial: 'xxoo',
      events: [
        { eventName: 'play', from: 'xxoo', to: 'ooxx' }
      ],
      actionMap: {
        onenterxxoo: function (eventName, from, to, a) {
          console.log('进入到'+ to +'状态');
        },
        onchangestate: function () {
          console.log('改变当前状态');
        },
        onafterstartup: function (eventName) {
          console.log('触发'+ eventName +'行为后');
        },
        onenterooxx: function (eventName, from, to) {
          console.log('进入到' + to + '状态');
        },
        onafterplay: function (eventName) {
          console.log('触发' + eventName + '行为后');
        }
      }
    });

    console.log(fsm.currentState); // 'xxoo'
    fsm.play(); // 依次触发onenterooxx、onchangestate、onafterplay
    console.log(fsm.currentState); // 'ooxx'
