import VideoControl from './VideoControl'
import { getFormatTime } from '../utils/formatTime'

type VideoType = HTMLVideoElement

interface IVideoplayerOptions {
  video: VideoType | null
  skipValue?: number
  duration?: number
  btnPlaySelector?: string
  onClickPlayingCallback?: (bool: boolean) => void
  onClickMuteCallback?: (bool: boolean) => void
}

interface iVideoplayerClassNames {
  playing: string
  paused: string
  disabled: string
}

class Videoplayer {
  public video: VideoType
  private skipValue: number
  private _duration: number
  private $btnPlay: HTMLButtonElement | null
  private $btnMute: HTMLButtonElement | null
  private $btnFullscreen: HTMLButtonElement | null
  private $btnSkipBackward: HTMLButtonElement | null
  private $btnSkipForward: HTMLButtonElement | null
  private $btnDuration: HTMLButtonElement | null
  private _isPlaying: boolean
  private _classNames: iVideoplayerClassNames
  private _time: string
  private ctx: Videoplayer
  private _onClickPlayingCallback: (bool: boolean) => void
  private _onClickMuteCallback: (bool: boolean) => void

  constructor(options: IVideoplayerOptions) {
    if (!options.video) return
    this.ctx = this
    this.skipValue = options.skipValue || 95
    this.video = options.video
    this._duration = options.duration || 0
    this.$btnPlay =
      (options.btnPlaySelector && document.querySelector(options.btnPlaySelector)) ||
      document.querySelector('.video-btn-play')
    this.$btnMute = document.querySelector('.btn-mute')
    this.$btnFullscreen = document.querySelector('.btn-fullscreen')
    this.$btnSkipBackward = document.querySelector('.btn-skip-backward')
    this.$btnSkipForward = document.querySelector('.btn-skip-forward')
    this.$btnDuration = document.querySelector('.btn-duration')
    this._classNames = {
      playing: 'playing',
      paused: 'paused',
      disabled: 'disabled',
    }
    if (options.onClickPlayingCallback) {
      this._onClickPlayingCallback = options.onClickPlayingCallback
    }
    if (options.onClickMuteCallback) {
      this._onClickMuteCallback = options.onClickMuteCallback
    }

    this.init()
  }

  public get isPlaying(): boolean {
    return this._isPlaying
  }

  public set isPlaying(bool: boolean) {
    this._isPlaying = bool
    if (bool) {
      this.video.classList.add(this._classNames.playing)
      this.video.classList.remove(this._classNames.paused)
    } else {
      this.video.classList.add(this._classNames.paused)
      this.video.classList.remove(this._classNames.playing)
    }
  }

  public init() {
    console.log('video player init')

    this.video.addEventListener(
      'loadeddata',
      () => {
        this.duration = this.video.duration
        this._playToggler()
        this._muteToggler()
        this._fullscreenToggler()
        this._skipVideoForward()
        this._skipVideoBackward()
        this._updateTimeline()
      },
      false,
    )
  }

  private _playToggler() {
    const self = this.ctx

    new VideoControl({
      button: this.$btnPlay || null,
      onClickCallback: (bool: boolean): void => {
        bool ? this.video.play() : this.video.pause()
        this.isPlaying = bool
        const icon = this.$btnPlay?.querySelector('.video-controls__btn-icon')
        if (bool) {
          icon?.classList.replace('icon-play', 'icon-pause')
        } else {
          icon?.classList.replace('icon-pause', 'icon-play')
        }
        self._onClickPlayingCallback && self._onClickPlayingCallback(bool)
      },
    })
  }

  private _muteToggler() {
    const self = this.ctx

    new VideoControl({
      button: this.$btnMute || null,
      onClickCallback: (bool: boolean): void => {
        this.video.muted = bool
        self._onClickMuteCallback && self._onClickMuteCallback(bool)
      },
    })
  }

  private _fullscreenToggler() {
    const self = this.ctx

    new VideoControl({
      button: this.$btnFullscreen || null,
      onClickCallback: (bool: boolean): void => {
        self.video.classList.add('fullscreen')
        if (document.fullscreenElement) {
          self.$btnFullscreen?.classList.replace('fa-compress', 'fa-expand')
          document.exitFullscreen()
        } else {
          self.$btnFullscreen?.classList.replace('fa-expand', 'fa-compress')
          self.video.requestFullscreen()
        }
      },
    })
  }

  private _skipVideoForward() {
    new VideoControl({
      button: this.$btnSkipForward || null,
      onClickCallback: (): void => {
        this.video.currentTime += this.skipValue
      },
    })
  }

  private _skipVideoBackward() {
    new VideoControl({
      button: this.$btnSkipBackward || null,
      onClickCallback: (): void => {
        this.video.currentTime -= this.skipValue
      },
    })
  }

  private _updateTimeline() {
    this.video.addEventListener('timeupdate', (e: any) => {
      this.time = getFormatTime(e.target.currentTime)
    })
  }

  public muteOn() {
    this.video.muted = true
  }

  public muteOff() {
    this.video.muted = false
  }

  public playOn() {
    this.video.play()
  }

  public playOff() {
    this.video.pause()
  }

  public set time(time: string) {
    this._time = time
  }

  public get time() {
    return this._time
  }

  public set duration(time: number) {
    this._duration = time
  }

  public get duration() {
    return this._duration
  }
}

export default Videoplayer
