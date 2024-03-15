import { useEffect, useState } from 'react'
import socket from '../../config/socket.ts'

interface MessageInterface {
  id: number
  user: string
  text: string
  date: string
  imgs: string[]
}

function normalizeDate(date: string) {
  return new Intl.DateTimeFormat('ru', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

// socket.on('chat message', msg => {
//   console.log(msg)

//   // socket.auth.serverOffset = serverOffset
//   // setMessages(oldMessages => [...oldMessages, msg])
// })

function closeImg(e) {
  console.log(e)

  // if (e.keyCode == 27) {
  //   window.close()
  // }
  // history.pushState(
  //   '',
  //   document.title,
  //   window.location.pathname + window.location.search
  // )
  location.href = `#`
  history.replaceState({}, '', '/')
}

export default function CommentList() {
  const [messages, setMessages] = useState<MessageInterface[]>([])

  useEffect(() => {
    let isMounted = true

    socket.on('chat message', msg => {
      if (isMounted) {
        console.log(msg)
        setMessages(oldMessages => [...oldMessages, msg])
      }
    })

    return () => {
      console.log('end')

      isMounted = false
    }
  }, [])

  return (
    <div className='comments__messages messages'>
      {messages.map((message, i) => (
        <div key={message.id} className='messages__item message'>
          <div className='message__name'>{message.user}</div>
          <div className='message__text'>{message.text}</div>
          <div className='message__files'>
            {!message.imgs
              ? ''
              : message.imgs.map((img, index) => (
                  <div className='cssbox' key={Math.random()}>
                    <a id={`${i}-${index}`} href={`#${i}-${index}`}>
                      <img
                        className='cssbox_thumb message__img'
                        loading='lazy'
                        src={img}
                      />
                      <span className='cssbox_full'>
                        <img className='' src={img} loading='lazy' />
                      </span>
                    </a>
                    <a
                      ref={close}
                      className='cssbox_close'
                      // href='#void'
                      onClick={closeImg}></a>
                    <a
                      className='cssbox_prev'
                      href={`#${i}-${index - 1}`}
                      style={{
                        display: index === 0 ? 'none' : 'block',
                      }}>
                      <svg
                        style={{ transform: 'rotate(180deg)' }}
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'>
                        <line x1='5' y1='12' x2='19' y2='12' />
                        <polyline points='12 5 19 12 12 19' />
                      </svg>
                    </a>

                    <a
                      className='cssbox_next'
                      href={`#${i}-${index + 1}`}
                      style={{
                        display:
                          index >= message.imgs.length - 1 ? 'none' : 'block',
                      }}>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'>
                        <line x1='5' y1='12' x2='19' y2='12' />
                        <polyline points='12 5 19 12 12 19' />
                      </svg>
                    </a>
                  </div>
                ))}
          </div>
          <div className='message__date'>{normalizeDate(message.date)}</div>
        </div>
      ))}
    </div>
  )
}
