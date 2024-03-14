import { useEffect, useRef, useState } from 'react'
import EasterWrapper from './EasterWrapper'

export default function EasterTwo() {
  const easterEggShowButton = useRef<HTMLButtonElement>(null)

  const [key, setKey] = useState('')

  useEffect(() => {
    if (easterEggShowButton.current) {
      easterEggShowButton.current.addEventListener('click', () => {
        setKey(addRandomStrings())
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const chars: string[] = []
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

  return (
    <EasterWrapper numberEgg={2} easterEggShowButton={easterEggShowButton}>
      <>
        <p>Вы выйграли ключ от игры:</p>
        <span className='easter-egg__key'>{key}</span>
      </>
    </EasterWrapper>
  )
}
