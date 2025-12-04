import app from "@/main"

export function mount(el: Element | string) {
  if (typeof el === 'string') {
    el = document.querySelector(el) as Element
  }
  app.mount(el)
  return app
}

export function unmount() {
  app.unmount()
}

export const version = "1.0.0"
