import { useRef } from 'react'
import api from '../config/API'

export default function ThreadCreate() {
  async function createThread() {
    await api.post('/createThread', {
      shortName: shortName.current.value,
      fullName: fullName.current.value,
      description: description.current.value,
      authorId: 1, // FIXME
    })

    console.log(shortName, fullName, description)
  }

  const shortName = useRef<HTMLInputElement>(null)
  const fullName = useRef<HTMLInputElement>(null)
  const description = useRef<HTMLTextAreaElement>(null)

  return (
    <div className='create-post'>
      <input type='text' placeholder='краткое название' ref={shortName} />
      <input type='text' placeholder='полное название' ref={fullName} />
      <textarea
        ref={description}
        rows={2}
        placeholder='Описание вашего треда'
        id='comment-text'
      />
      <button className='button-normal' onClick={createThread}>
        Создать
      </button>
    </div>
  )
}
