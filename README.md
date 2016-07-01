a tiny stateful eventbus in few lines of js

![Build Status](https://travis-ci.org/coderofsalvation/stateful-event.svg?branch=master)

## Usage

    var se = require('stateful-event')

    var bus   = new se()
    bus.debug = true                                      // will output publish() calls in console

    var x = bus.subscribe("someprocess/start", function(data, state){
      if( state == "offline" ) return
      // do stuff 
    })

    bus.subscribe("state", function(state){
      if( state == "online"  ) console.log("fooooo!")
      if( state == "cleanup" ) bus.unsubscribe(x)
    })

    bus.state("online")                                   // sets state to online 
    bus.publish("someprocess/start",{foo:"bar"})          // will fire doFoo()
    bus.state("offline")                                  // set state to online
    bus.publish("someprocess/start",{foo:"bar"})          // won't fire doFoo
    bus.publish("someprocess/start",{foo:"bar"},"online") // set state to "online", and will fire doFoo
    bus.publish("someprocess/start",{foo:"bar"})          // will fire doFoo()
    console.log( bus.state() )                            // will return "online"
    bus.state("cleanup")                                  // will trigger bus.unsubscribe(x)

> hint: for (arguably) more pretty code, you could use string-variables named like `ONLINE` instead of "online"

## Features

* event listening and triggering
* be able to unsubscribe or ignore events in certain state
* easier to use / extendable compared to EventEmitter 
* maintain state in bus instead of global scope

## Functions

    bus.state(state)                  // set/get state: state("mystate") or state() returns current state-string
    bus.publish(channel, data, state) // publish: publish('some/channel', ['Denis', 'Ciccale'], "mystate" // optional )
    bus.subscribe(channel, handler)   // usage: var handle = subscribe('some/channel', function (name, lastName) {})
    bus.unsubscribe(handle)           // usage: unsubscribe(handle);
