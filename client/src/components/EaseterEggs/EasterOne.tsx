import { useEffect, useRef } from 'react'
import EasterWrapper from './EasterWrapper'

export default function EasterOne() {
  const easterEggShowButton = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const updatePosition = () => {
      const x = Math.floor(Math.random() * window.innerWidth)
      const y = Math.floor(Math.random() * window.innerHeight)

      if (easterEggShowButton.current) {
        easterEggShowButton.current.style.transform = `translate(${x}px, ${y}px)`
      }
    }

    updatePosition()

    const intervalId = setInterval(updatePosition, 5000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return (
    <EasterWrapper numberEgg={1} easterEggShowButton={easterEggShowButton}>
      <img src='/imgs/egor_enot.gif' className='easter-egg__img' />
    </EasterWrapper>
  )
}
