export function getFormatTime(time: number): string {
  let seconds = Math.floor(time % 60).toString()
  let minutes = (Math.floor(time / 60) % 60).toString()
  let hours = Math.floor(time / 3600).toString()
  seconds = parseInt(seconds) < 10 ? `0${seconds}` : seconds
  minutes = parseInt(minutes) < 10 ? `0${minutes}` : minutes
  hours = parseInt(hours) < 10 ? `0${hours}` : hours
  if (parseInt(hours) === 0) return `${minutes}:${seconds}`
  return `${hours}:${minutes}:${seconds}`
}
