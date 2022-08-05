interface IVideoButtonControl {
  button: HTMLButtonElement | null
  onClickCallback?: (bool: boolean) => void
}

class VideoButtonControl {
  public button: HTMLButtonElement | null
  private _pressOn: boolean
  private _onClickCallback: (bool: boolean) => void

  constructor(options: IVideoButtonControl) {
    if (!options.button) return
    this.button = options.button
    this.button?.classList.add('click-off')

    if (options.onClickCallback) {
      this._onClickCallback = options.onClickCallback
    }

    this.init()
  }

  public get pressOn(): boolean {
    return this._pressOn
  }

  public set pressOn(bool: boolean) {
    if (bool) {
      this.button?.classList.replace('click-off', 'click-on')
    } else {
      this.button?.classList.replace('click-on', 'click-off')
    }
    this._pressOn = bool
  }

  public toggleClick() {
    this.button?.addEventListener('click', (e) => {
      this.pressOn = !this.pressOn
      this._onClickCallback(this.pressOn)
    })
  }

  init() {
    this.toggleClick()
  }
}

export default VideoButtonControl
