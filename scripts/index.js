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
