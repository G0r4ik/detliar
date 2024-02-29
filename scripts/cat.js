const catButton = document.querySelector('.cat-btn__show-cat')
const reallyCat = document.querySelector('.cat-btn__cat')
const catWrapper = document.querySelector('.cat-btn')
let timer = null

catButton.addEventListener('click', () => {
  catButton.classList.add('cat-btn__show-cat_hidden')
  reallyCat.classList.add('cat-btn__cat_visible')
  moveAndRotate()
  timer = setInterval(moveAndRotate, 3000)
})

reallyCat.addEventListener('click', () => {
  catButton.classList.remove('cat-btn__show-cat_hidden')
  reallyCat.classList.remove('cat-btn__cat_visible')
  clearInterval(timer)
})

let deg = 90

let side = 1

let wHeight = window.innerHeight
let wWidth = document.body.clientWidth
const moveAndRotate = () => {
  deg += 90
  switch (side) {
    case 1:
      catWrapper.style.transform = `translate(${wWidth - 70}px, 0)`
      reallyCat.style.transform = ` scale(0.2) rotate(${deg}deg)`

      side = 2
      break
    case 2:
      reallyCat.style.transform = ` scale(0.2) rotate(${deg}deg)`
      catWrapper.style.transform = `translate(${wWidth - 70}px, ${
        wHeight - 50
      }px)`
      side = 3
      break
    case 3:
      reallyCat.style.transform = ` scale(0.2) rotate(${deg}deg)`
      catWrapper.style.transform = `translate(0, ${wHeight - 50}px)`

      side = 4
      break
    case 4:
      reallyCat.style.transform = ` scale(0.2) rotate(${deg}deg)`
      catWrapper.style.transform = `translate(0, 0)`
      side = 1

      break
  }
}
