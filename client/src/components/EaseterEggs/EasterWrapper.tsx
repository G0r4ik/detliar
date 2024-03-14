import { RefObject, useRef, useState } from 'react'

interface Props {
  numberEgg: number
  children: React.ReactNode
  easterEggShowButton: RefObject<HTMLButtonElement>
}

export default function EasterWrapper({
  numberEgg,
  children,
  easterEggShowButton,
}: Props) {
  const easterCross = useRef<HTMLDivElement>(null)
  const easterEggContent = useRef<HTMLDivElement>(null)

  const [isVisible, setIsVisible] = useState(false)

  function showOrHideEgg() {
    setIsVisible(!isVisible)
    easterEggContent.current?.classList.toggle('easter-egg__content_show')
  }

  return (
    <div className='easter-egg'>
      <button
        className={`easter-egg__show easter-egg__show_${numberEgg}`}
        onClick={showOrHideEgg}
        ref={easterEggShowButton}></button>

      <div
        className={`easter-egg__content easter-egg__content_${numberEgg}`}
        ref={easterEggContent}>
        {isVisible && (
          <>
            <div
              className={`easter-egg__cross easter-egg__cross_${numberEgg}`}
              onClick={showOrHideEgg}
              ref={easterCross}>
              x
            </div>
            <strong
              className={`easter-egg__title easter-egg__title_${numberEgg}`}>
              Пасхалка #{numberEgg}
            </strong>
            <div className='easter-egg__really-content'>{children}</div>
          </>
        )}
      </div>
    </div>
  )
}
