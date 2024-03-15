import EasterThree from '../EaseterEggs/EasterThree'
import EasterTwo from '../EaseterEggs/EasterTwo'

export default function Positive() {
  function crush() {
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

      document.body.appendChild(rectangle)
    }, 0)
  }

  return (
    <section className='full-positive'>
      <EasterThree />
      <EasterTwo />
      <p className='full-positive__text'>Всем добра и позитива</p>
      <span className='full-positive__smile'>:)</span>

      <img src='/imgs/ocat.jpg' className='full-positive__img' alt='cat' />
      <button
        className='full-positive__hate-button button-normal'
        onClick={crush}>
        Hate me? Click!
      </button>
    </section>
  )
}
