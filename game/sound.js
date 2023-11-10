export default function playSound(sound) {
  sound.currentTime > 0 ? sound.currentTime = 0 : false
  var ss = sound.play()
  if (ss !== undefined) ss.then(() => {})
    .catch((e) => {})
  return;
}

