import api from '../../config/API'
import { useRef } from 'react'
import Textarea from '../../shared/Textarea'
import { useAuth, useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'

export default function ThreadCreate() {
  const shortName = useRef<HTMLInputElement>(null)
  const fullName = useRef<HTMLInputElement>(null)
  const description = useRef<HTMLTextAreaElement>(null)
  const { isSignedIn, user, isLoaded } = useUser()
  const navigate = useNavigate()
  const { getToken } = useAuth()

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
      await api.post(
        '/createThread',
        {
          shortName: shortNameValue,
          fullName: fullNameValue,
          description: descriptionValue,
          authorId: user?.id, // FIXME
        },
        {
          headers: { Authorization: `Bearer ${await getToken()}` },
        }
      )
      navigate(`/threads${shortNameValue}`)
    }
  }

  function inputValue(el) {
    el.target.value = el.target.value?.replace(/[/+]/g, '')
    el.target.value = '/' + el.target.value
  }
  return (
    <div className='create-post'>
      <div className='create-post__inner'>
        <h1 className='create-post__title title'>Create thread</h1>
        <input
          type='text'
          placeholder='Shortname'
          ref={shortName}
          onInput={inputValue}
          id='createPostShortName'
        />
        <input
          type='text'
          placeholder='Fullname'
          ref={fullName}
          id='createPostFullName'
        />
        <div className='create-post__bottom'>
          <label className='input-file'>
            <input type='file' name='file' />
            <span className='input-file-btn'>+</span>
          </label>
          <textarea
            ref={description}
            rows={15}
            placeholder='Description'
            id='comment-text'
          />
        </div>
        <button
          className='button-normal create-post-btn'
          onClick={createThread}>
          Create
        </button>
      </div>
    </div>
  )
}
