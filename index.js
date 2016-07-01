bus = function(){
  this.channels = []
  this._state = "normal"
  this.debug = false
}

bus.prototype.state = function(state){ // pubsub state: state("mystate") or state() returns current state-string
  if(state){
    this._state = state
    this.publish("state",state)
  }else return this._state
}

bus.prototype.publish = function (channel, data, state) { // pubsub publish: publish('some/channel', ['Denis', 'Ciccale'], "mystate" // optional )
  if( state ) this.state(state)
  if( this.debug ){
    console.log("--> bus.publish('"+channel+"') state="+this._state)
    if( data ) console.dir(data)
  }
  var me = this
  var subscribes = (this.channels[channel] || []).map( function (handler) {
    handler( data, me._state )
  }) 
};

bus.prototype.subscribe = function (channel, handler) { // pubsub Usage: var handle = subscribe('some/channel', function (name, lastName) {})
  (this.channels[channel] = this.channels[channel] || []).push(handler);
  return [channel, handler];
};

bus.prototype.unsubscribe = function (handle) { // pubsub Usage: unsubscribe(handle);
  var subscribes = this.channels[handle[0]],
    l = subscribes.length;
  while (l--) {
    if (subscribes[l] === handle[1]) {
      subscribes.splice(l, 1);
    }
  }
};

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
  module.exports = bus;
else
  window.bus = bus 
