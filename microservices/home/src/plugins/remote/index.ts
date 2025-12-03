import app from "@/main"

export function mount(el:string) {
  app.mount(el)
  return app
}
