import { ClipboardEvent, useEffect, useRef, useState } from 'react'
import socket from '../../config/socket.ts'
import { useUser } from '@clerk/clerk-react'
import api from '../../config/API.ts'
import Textarea from '../../shared/Textarea.tsx'

function PostSend({ shorName }) {
  const { user, isSignedIn } = useUser()
  const commentName = useRef<HTMLInputElement>(null)
  const commentText = useRef<HTMLTextAreaElement>(null)
  const screens = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isSignedIn) {
      commentName.current.value = user?.username
    }
  }, [])

  const [imgs, setImgs] = useState<string[]>([])

  function keyDown(event) {
    if (event.code === 'Enter' && !event.shiftKey) {
      sendMessage()
      commentText.current.value = ''
    }
  }
  function sendMessage(): void {
    if ((commentName.current || isSignedIn) && commentText.current) {
      const userValue = commentName?.current?.value.trim()
      const textValue = commentText.current.value.trim()

      if (textValue) {
        socket.emit(`message`, shorName, {
          anonName: userValue,
          content: textValue,
          authorId: user?.id,
        })

        setImgs([])
        commentText.current.value = ''
        commentText.current.value.trim()
      }
    }
  }

  function pasteFile(event: ClipboardEvent<HTMLTextAreaElement>): void {
    const items = event.clipboardData!.items

    for (const item of items) {
      if (item.kind === 'file') {
        const blob = item.getAsFile()!
        const reader = new FileReader()
        reader.onload = function (e) {
          const imageData = e.target!.result as string // Ensure result type
          setImgs(imgs => [...imgs, imageData])
        }
        reader.readAsDataURL(blob)
      }
    }
  }

  return (
    <div className='comments__form'>
      <div className='comment__top'>
        <input
          ref={commentName}
          type='text'
          placeholder='Type your name'
          disabled={isSignedIn}
          id='comment-user'
        />
        <button
          onClick={sendMessage}
          className='comments__send-button button-normal'>
          Send
        </button>
      </div>
      <div className='comment__fix'>
        <Textarea
          ref={commentText}
          onPaste={event => pasteFile(event)}
          rows={8}
          onKeyUp={keyDown}
          placeholder='Type your message here.'
          id='comment-text'
        />
        <img className='comment__pin' src='/pin.svg' alt='' />
      </div>
      <div className='comments__screens'>
        {/* <strong>files:</strong> */}
        <div ref={screens} className='comments__content'>
          {imgs.map((img, index) => (
            <img key={index} src={img} alt='' className='comments__screen' />
          ))}
        </div>
      </div>
    </div>
  )
}

export default PostSend
