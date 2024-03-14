import { ClipboardEvent, useRef, useState } from 'react'
import socket from '../config/socket.ts'

function CommentForm() {
  const commentName = useRef<HTMLInputElement>(null)
  const commentText = useRef<HTMLTextAreaElement>(null)
  const screens = useRef<HTMLDivElement>(null)

  const [imgs, setImgs] = useState<string[]>([])

  function sendMessage(e: React.MouseEvent<HTMLButtonElement>): void {
    e.preventDefault()

    if (commentName.current && commentText.current) {
      const userValue = commentName.current.value.trim()
      const textValue = commentText.current.value.trim()

      if (userValue && textValue) {
        socket.emit('chat message', { text: textValue, user: userValue, imgs })
        setImgs([])
        commentName.current.value = ''
        commentText.current.value = ''
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
      <input
        ref={commentName}
        type='text'
        placeholder='Type your name here.'
        id='comment-user'
      />
      <div className='comment__fix'>
        <textarea
          ref={commentText}
          onPaste={event => pasteFile(event)}
          rows={2}
          placeholder='Type your message here.'
          id='comment-text'
        />
        <button
          onClick={sendMessage}
          className='comments__send-button button-normal'>
          S
        </button>
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

export default CommentForm
