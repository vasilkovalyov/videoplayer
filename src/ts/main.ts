import '../scss/main.scss'

import Videoplayer from './components/Videoplayer'

const $video = document.querySelector('video')

const instance = new Videoplayer({
  video: $video || null,
  // onClickMuteCallback: (e): void => {},
  // onClickPlayingCallback: (e): void => {},
})

// instance.init()

// instance.playOn()

export default instance
