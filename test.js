var se = require('./.')
var called = 0

var bus   = new se()
bus.debug = true                                      // will output publish() calls in console

var x = bus.subscribe("someprocess/start", function(data, state){
  console.log("subscribe(data,"+state+")")
  if( state == "offline" ) return
  called++
})

bus.subscribe("state", function(state){
  if( state == "online"  ) console.log("fooooo!")
  if( state == "cleanup" ) bus.unsubscribe(x)
})

bus.state("online")                                   // sets state to online 
bus.publish("someprocess/start",{foo:"bar"})          // will fire doFoo()
bus.state("offline")                                  // set state to online
bus.publish("someprocess/start",{foo:"bar"})          // won't fire doFoo
bus.publish("someprocess/start",{foo:"bar"},"online") // will set state to online,  and fire doFoo
bus.publish("someprocess/start",{foo:"bar"})          // will fire doFoo()
console.log( bus.state() )                            // will return "online"
bus.state("cleanup")                                  // will trigger bus.unsubscribe(x)

console.log( called  )
if (bus.state() !== "cleanup" || called != 3) {
  process.exit(1)
} else {
  process.exit(0)
}
