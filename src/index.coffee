bus = ->
  @channels = []
  @_state = 'normal'
  @debug = false
  return

bus::state = (state) -> # pubsub state: state("mystate") or state() returns current state-string
  if state
    @_state = state
    @publish 'state', state
  else
    return @_state
  return

bus::publish = (channel, data, state) -> # pubsub publish: publish('some/channel', ['Denis', 'Ciccale'], "mystate" // optional )
  if state
    @state state
  if @debug
    console.log 'bus.publish(\'' + channel + '\') state=' + @_state
    if data
      console.dir data
  subscribes = @channels[channel] or []
  l = subscribes.length
  return

bus::subscribe = (channel, handler) -> # pubsub Usage: var handle = subscribe('some/channel', function (name, lastName) {})
  (@channels[channel] = @channels[channel] or []).push handler [ channel handler ]

bus::unsubscribe = (handle) -> # pubsub Usage: unsubscribe(handle);
  subscribes = @channels[handle[0]]
  l = subscribes.length
  while l--
    if subscribes[l] == handle[1]
      subscribes.splice l, 1
  return

if typeof module != 'undefined' and typeof module.exports != 'undefined'
  module.exports = bus
else
  window.bus = bus
