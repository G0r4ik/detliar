import { useRef } from 'react'
import EasterWrapper from './EasterWrapper'

export default function EasterThree() {
  const easterEggShowButton = useRef<HTMLButtonElement>(null)

  setInterval(() => {
    const x = Math.floor(Math.random() * window.innerWidth - 100)
    const y = Math.floor(Math.random() * window.innerHeight)
    if (easterEggShowButton.current)
      easterEggShowButton.current.style.transform = `translate(${x}px, ${y}px)`
  }, 500)

  return (
    <EasterWrapper numberEgg={3} easterEggShowButton={easterEggShowButton}>
      <video
        autoPlay={true}
        loop={true}
        src='/imgs/cat-dance.mp4'
        className='easter-egg__img'
      />
    </EasterWrapper>
  )
}
