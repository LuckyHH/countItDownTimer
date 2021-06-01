import { TimerCallBack, TimerCallBackMeta } from './types'
import { setTimeoutInterval } from './setTimeoutInterval'

export class Timer {
  cbs: TimerCallBackMeta[] = []

  private timerId: any
  private delay: number
  private count = 0
  private instanceId = 0

  constructor(delay = 1000) {
    this.delay = delay
  }

  private start() {
    setTimeoutInterval((timerId) => {
      this.timerId = timerId
      for (let i = 0; i < this.cbs.length; i++) {
        const { cb, interval } = this.cbs[i]
        if (!(this.count * this.delay % interval)) {
          cb()
        }
      }
      this.count++
    }, this.delay)
  }

  private stop() {
    clearTimeout(this.timerId)
  }

  add(cb: TimerCallBack, interval = 1000) {
    const id = this.instanceId++
    this.cbs.push({ cb, interval, id })

    if (!this.timerId) this.start()

    return id
  }

  remove(id: number) {
    const idx = this.cbs.findIndex(item => item.id === id)

    if (idx !== -1) {
      this.cbs.splice(idx, 1)

      if (!this.cbs.length) {
        this.stop()
      }
    }
  }

  removeAll() {
    this.cbs = []
    this.stop()
  }
}

export const timer = new Timer()
