const easterEggs = document.querySelectorAll('.easter-egg__show')
const easterCrosses = document.querySelectorAll('.easter-egg__cross')
const easterEggContents = document.querySelectorAll('.easter-egg__content')

for (let i = 0; i < easterEggs.length; i++) {
  easterEggs[i].addEventListener('click', () => {
    easterEggContents[i].classList.add('easter-egg__content_show')
  })
  easterCrosses[i].addEventListener('click', () => {
    easterEggContents[i].classList.remove('easter-egg__content_show')
  })
}

//
//

const easterEgg1 = document.querySelector('.easter-egg__show_1')
const easterCross1 = document.querySelector('.easter-egg__cross_1')
const easterEggContent1 = document.querySelector('.easter-egg__content_1')

setInterval(() => {
  const x = Math.floor(Math.random() * window.innerWidth - 100)
  const y = Math.floor(Math.random() * window.innerHeight - 100)
  easterEgg1.style.transform = `translate(${x}px, ${y}px)`
}, 3000)

const x = Math.floor(Math.random() * window.innerWidth - 100)
const y = Math.floor(Math.random() * window.innerHeight - 100)
easterEgg1.style.transform = `translate(${x}px, ${y}px)`

//
//

const easterEggContent2 = document.querySelector('.easter-egg__content_2')
const easterEgg2 = document.querySelector('.easter-egg__show_2')
const easterCross2 = document.querySelector('.easter-egg__cross_2')
const easterKey = document.querySelector('.easter-egg__key')

easterEgg2.addEventListener('click', () => {
  easterKey.textContent = addRandomStrings()
})

const chars = []
for (let i = 65; i <= 90; i++) chars.push(String.fromCharCode(i))
for (let i = 48; i <= 57; i++) chars.push(String.fromCharCode(i))

function generateString() {
  let result = ''
  for (let i = 0; i < 5; i++) {
    result += chars[Math.floor(Math.random() * 36)]
  }
  return result
}
function addRandomStrings() {
  let string = ''
  for (let i = 0; i < 3; i++) {
    string += string === '' ? generateString() : '-' + generateString()
  }
  return string
}

//
//

const easterEggContent3 = document.querySelector('.easter-egg__content_3')
const easterEgg3 = document.querySelector('.easter-egg__show_3')
const easterCross3 = document.querySelector('.easter-egg__cross_3')

setInterval(() => {
  const x = Math.floor(Math.random() * window.innerWidth - 100)
  const y = Math.floor(Math.random() * window.innerHeight)
  easterEgg3.style.transform = `translate(${x}px, ${y}px)`
}, 500)
