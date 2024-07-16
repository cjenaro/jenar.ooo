declare namespace Godot {
  class Engine {
    constructor(props: {
      args: any[]
      canvasResizePolicy: number
      executable: string
      experimentalVK: boolean
      fileSizes: {
        'index.pck': number
        'index.wasm': number
      }
      focusCanvas: boolean
      gdextensionLibs: any[]
    })
  }
}
