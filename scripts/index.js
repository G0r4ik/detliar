const buttonCrush = document.querySelector('.full-positive__hate-button')
buttonCrush.addEventListener('click', crush)

function crush() {
  var container = document.querySelector('body')
  setInterval(() => {
    var rectangle = document.createElement('div')
    rectangle.classList.add('rectangle')
    rectangle.textContent = 'ПРОСТИ!'

    var x = Math.floor(Math.random() * window.innerWidth - 100)
    var y = Math.floor(Math.random() * window.innerHeight - 100)
    rectangle.style.left = x + 'px'
    rectangle.style.top = y + 'px'

    var size = Math.floor(Math.random() * 100) + 70
    rectangle.style.width = size + 'px'
    rectangle.style.height = size + 'px'

    container.appendChild(rectangle)
  }, 10)
}
