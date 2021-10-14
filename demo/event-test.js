import EventEmitter from 'events'

class Dispatcher extends EventEmitter {
  subscribe(eventName, cb) {
    console.log(`[Subscribe...] ${eventName}`)
    this.on(eventName, cb)
  }

  dispatch(eventName, data) {
    console.log(`[Dispatching...] ${eventName}`)
    this.emit(eventName, data)
  }
}

export default Dispatcher
