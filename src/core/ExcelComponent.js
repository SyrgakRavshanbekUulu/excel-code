import {DomListener} from "@core/DomListener"

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name
    this.emitter = options.emitter
    this.subscribe = options.subscribe || []
    this.store = options.store
    this.unsubscribers = []

    this.prepare()
  }
  // Настраиваем наш компонент до init
  prepare() {

  }
  // Возвращает шаблон компонента
  toHtml() {
    return ''
  }

  // Уведомляем слушателей про событие event
  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }

  // Подписываемся на сабытие event
  $on(event, fn) {
    const unsubs = this.emitter.subscribe(event, fn)
    this.unsubscribers.push(unsubs)
  }

  storeChanged() {}

  isWatching(key) {
    return this.subscribe.includes(key)
  }

  $dispatch(action) {
    this.store.dispatch(action)
  }

  // инициализируем компонент
  // добавлаем ДОМ слушателей
  init() {
    this.initDOMListeners()
  }

  // Удаляем компонент
  // Чистим слушатели
  destroy() {
    this.removeDOMListeners()
    this.unsubscribers.forEach(unsub => unsub())
  }
}