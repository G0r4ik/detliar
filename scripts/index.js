const buttonCrush = document.querySelector('.full-positive__hate-button')
buttonCrush.addEventListener('click', crush)

function crush() {
  const container = document.querySelector('body')
  setInterval(() => {
    const rectangle = document.createElement('div')
    rectangle.classList.add('rectangle')
    rectangle.textContent = 'ПРОСТИ!'

    const x = Math.floor(Math.random() * window.innerWidth - 100)
    const y = Math.floor(Math.random() * window.innerHeight - 100)
    rectangle.style.left = x + 'px'
    rectangle.style.top = y + 'px'

    const size = Math.floor(Math.random() * 100) + 70
    rectangle.style.width = size + 'px'
    rectangle.style.height = size + 'px'

    container.appendChild(rectangle)
  }, 10)
}

const easterEgg1 = document.querySelector('.easter-egg__show_1')
const easterCross1 = document.querySelector('.easter-egg__cross_1')
const easterEggContent1 = document.querySelector('.easter-egg__content_1')

easterEgg1.addEventListener('click', () => {
  easterEggContent1.classList.add('easter-egg__content_show')
})

easterCross1.addEventListener('click', () => {
  easterEggContent1.classList.remove('easter-egg__content_show')
})

const easterEggContent2 = document.querySelector('.easter-egg__content_2')
const easterEgg2 = document.querySelector('.easter-egg__show_2')
const easterCross2 = document.querySelector('.easter-egg__cross_2')
const easterKey = document.querySelector('.easter-egg__key')

easterEgg2.addEventListener('click', () => {
  easterEggContent2.classList.add('easter-egg__content_show')
  easterKey.textContent = addRandomStrings()
})

easterCross2.addEventListener('click', () => {
  easterEggContent2.classList.remove('easter-egg__content_show')
})

//
setInterval(() => {
  const x = Math.floor(Math.random() * window.innerWidth - 100)
  const y = Math.floor(Math.random() * window.innerHeight - 100)
  easterEgg1.style.transform = `translate(${x}px, ${y}px)`
}, 10000)

const chars = []
for (let i = 65; i <= 90; i++) chars.push(String.fromCharCode(i))
for (let i = 48; i <= 57; i++) chars.push(String.fromCharCode(i))

//Generate 5 random characters from chars array and concatenate them
function generateString() {
  var result = ''
  for (var i = 0; i < 5; i++) {
    result += chars[Math.floor(Math.random() * 36)]
  }
  return result
}
//Generate 3 sets of 5 random characters and concatenate them together
function addRandomStrings() {
  var string = ''
  for (var i = 0; i < 3; i++) {
    if (string === '') {
      string += generateString()
    } else {
      string += '-' + generateString()
    }
  }
  return string
}
