import api from '../../config/API'
import { useRef } from 'react'
import Textarea from '../../shared/Textarea'
import { useUser } from '@clerk/clerk-react'

export default function ThreadCreate() {
  const shortName = useRef<HTMLInputElement>(null)
  const fullName = useRef<HTMLInputElement>(null)
  const description = useRef<HTMLTextAreaElement>(null)
  const { isSignedIn, user, isLoaded } = useUser()

  async function createThread() {
    const shortNameValue = shortName.current.value
    const fullNameValue = fullName.current.value
    const descriptionValue = description.current.value
    if (
      shortNameValue.length > 10 ||
      fullNameValue.length > 30 ||
      descriptionValue.length === 0 ||
      shortNameValue.length === 0 ||
      fullNameValue.length === 0 ||
      fullNameValue.length > 1000
    ) {
      alert(`
      Краткое название: 1-10 символов
      Полное название: 1-30 символов
      описание: 1-1000 символов
      `)
    } else {
      await api.post('/createThread', {
        shortName: shortNameValue,
        fullName: fullNameValue,
        description: descriptionValue,
        authorId: user.id, // FIXME
      })
    }
  }

  function inputValue(el) {
    el.target.value = el.target.value?.replace(/[/+]/g, '')
    el.target.value = '/' + el.target.value
  }
  return (
    <div className='create-post'>
      <h1 className='create-post__title title'>Создать тред</h1>
      <input
        type='text'
        placeholder='краткое название'
        ref={shortName}
        onInput={inputValue}
        id='createPostShortName'
      />
      <br />
      <input
        type='text'
        placeholder='полное название'
        ref={fullName}
        id='createPostFullName'
      />
      <br />
      <Textarea
        ref={description}
        rows={3}
        placeholder='Описание вашего треда'
        id='comment-text'
      />
      <button className='button-normal' onClick={createThread}>
        Создать
      </button>
    </div>
  )
}
