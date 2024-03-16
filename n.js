snail = function (array) {
  // БУДЕМ ИГРАТЬ!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // const size = array[0].length
  const res = []
  let move = 'r'
  const fixme = { t: 0, l: 0, b: 0, r: 0 }
  while (1) {
    if (res.length === array.length * array[0].length) {
      console.log('break')
      break
    }
    console.log(move)
    switch (move) {
      case 'r':
        res.push(...array[fixme.t])
        res.pop()
        move = 'b'
        fixme.t++
        break

      case 'b':
        res.pop()
        for (let j = fixme.l; j < array.length; j++) res.push(array[j].at(-1))
        fixme.l++
        move = 'l'
        break

      case 'l':
        console.log(fixme.b)
        res.push(...array[array.length - 1 + fixme.b].reverse())
        fixme.b--

        move = 't'
        break

      case 't':
        for (let j = 1; j < array.length - 1; j++) res.push(array[j][0])
        fixme.r++
        // move = 'r'
        break
    }
  }
  return res
}

console.log(
  snail([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ])
  // [1, 2, 3, 6, 9, 8, 7, 4, 5]
)

Hookstate
Rematch
atom
XState
Jotai

RTK
Recoil
React - query
Zustand
MobX
