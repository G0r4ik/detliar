import { useRef } from 'react'

export default function CatButton() {
  const catButton = useRef<HTMLDivElement>(null)
  const reallyCat = useRef<HTMLDivElement>(null)
  const catWrapper = useRef<HTMLDivElement>(null)
  let timer: ReturnType<typeof setTimeout>

  const startCat = () => {
    catButton.current?.classList.add('cat-btn__show-cat_hidden')
    reallyCat.current?.classList.add('cat-btn__cat_visible')
    moveAndRotate()
    timer = setInterval(moveAndRotate, 3000)
  }

  const fix = () => {
    catButton.current?.classList.remove('cat-btn__show-cat_hidden')
    reallyCat.current?.classList.remove('cat-btn__cat_visible')
    clearInterval(timer)
  }

  let deg = 90
  let side = 1

  const wHeight = window.innerHeight
  const wWidth = document.body.clientWidth
  const moveAndRotate = () => {
    deg += 90
    if (!catWrapper.current || !reallyCat.current) return
    switch (side) {
      case 1:
        catWrapper.current.style.transform = `translate(${wWidth - 70}px, 0)`
        reallyCat.current.style.transform = ` scale(0.2) rotate(${deg}deg)`
        side = 2
        break
      case 2:
        reallyCat.current.style.transform = ` scale(0.2) rotate(${deg}deg)`
        catWrapper.current.style.transform = `translate(${wWidth - 70}px, ${
          wHeight - 50
        }px)`
        side = 3
        break
      case 3:
        reallyCat.current.style.transform = ` scale(0.2) rotate(${deg}deg)`
        catWrapper.current.style.transform = `translate(0, ${wHeight - 50}px)`
        side = 4
        break
      case 4:
        reallyCat.current.style.transform = ` scale(0.2) rotate(${deg}deg)`
        catWrapper.current.style.transform = `translate(0, 0)`
        side = 1

        break
    }
  }

  return (
    <div className='cat-btn' ref={catWrapper} onClick={startCat}>
      <div className='cat-btn__show-cat' ref={catButton}>
        котокнопка
      </div>
      <div className='cat-btn__cat' ref={reallyCat} onClick={fix}>
        <div id='the'></div>
        <div id='cat'></div>
        <div id='face'>
          <p>w</p>
        </div>
        <div id='whisker-a'></div>
        <div id='whisker-b'></div>
        <div id='whisker-c'></div>
        <div id='whisker-d'></div>
        <div id='stripe-a'></div>
        <div id='stripe-b'></div>
        <div id='stripe-c'></div>
        <div id='stripe-z'></div>
        <div id='stripe-y'></div>
      </div>
    </div>
  )
}
