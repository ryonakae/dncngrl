import { util } from '~/plugins/util'
import { resizeManager } from '~/plugins/resizeManager'

export class ScrollManager {
  constructor(options) {
    this.nameSpace = options.nameSpace

    this.scrollAmount = 0
    this.scrollDirection = null
    this.scrollTop = 0
    this.scrollBottom = 0

    this.$window = null
    this.functions = []
    this.fps = 60
    this.isRunning = false

    this.init()
  }

  init() {
    this.$window = $(window)
    this.update()

    // pcはwheelイベント、タッチデバイスはtouchmoveイベント
    this.$window.on(
      'wheel.' + this.nameSpace + ' touchmove.' + this.nameSpace,
      () => {
        if (this.isRunning) return

        this.isRunning = true

        if (window.requestAnimationFrame) {
          requestAnimationFrame(this.update.bind(this))
        } else {
          setTimeout(this.update.bind(this), 1000 / this.fps)
        }
      }
    )
  }

  add(func) {
    this.functions.push(func)
  }

  remove(func) {
    // not working
    this.functions.splice(func, 1)
  }

  update() {
    this.scrollTop = window.pageYOffset
    this.scrollBottom = this.scrollTop + resizeManager.windowHeight

    this.getAmount()
    this.getDirection()

    for (let i = 0; i < this.functions.length; i++) {
      const func = this.functions[i]
      func()
    }

    this.isRunning = false
  }

  getAmount() {
    if (util.getDevice() === 'pc') {
      this.$window.on('wheel.' + this.nameSpace, e => {
        this.scrollAmount = e.originalEvent.deltaY
      })
    } else {
      let touchStartY
      let touchMoveY

      this.$window.on('touchstart.' + this.nameSpace, e => {
        touchStartY = e.originalEvent.changedTouches[0].pageY
      })
      this.$window.on('touchmove.' + this.nameSpace, e => {
        touchMoveY = e.originalEvent.changedTouches[0].pageY
        this.scrollAmount = touchStartY - touchMoveY
      })
    }
  }

  getDirection() {
    if (this.scrollAmount > 0) {
      this.scrollDirection = 'down'
    } else if (this.scrollAmount < 0) {
      this.scrollDirection = 'up'
    }
  }
}

export const scrollManager = new ScrollManager({
  nameSpace: 'scrollManager'
})

export default (_, inject) => {
  inject('scrollManager', scrollManager)
}
