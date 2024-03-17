import { useLoaderData } from 'react-router-dom'
import CommentForm from '../Comment/CommentForm'
import api from '../../config/API'
import { useEffect, useState } from 'react'
import { PostSchema, ThreadSchema } from '../../types'
import { useAuth } from '@clerk/clerk-react'
// import emojis from 'emojis-list'
// console.log(emojis)

export default function Thread() {
  function normalizeDate(date: Date) {
    return new Intl.DateTimeFormat('ru', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date))
  }

  type Token = {
    idThread: string
  }

  const [thread, setThread] = useState<ThreadSchema>()
  const [posts, setPosts] = useState<PostSchema[]>([])
  const { idThread } = useLoaderData() as Token
  const { getToken } = useAuth()

  useEffect(() => {
    getThreadInfo()
    async function getThreadInfo() {
      const thread = await api.get(`/getThreadInfo/${idThread}`, {
        headers: { Authorization: `Bearer ${await getToken()}` },
      })
      setThread(thread.data)
      const posts = await api(`/threads/${idThread}/posts`)
      setPosts(posts.data)
    }
  }, [idThread, getToken])

  return (
    <div className='thread'>
      {thread && (
        <>
          <div className='thread__start'>
            <h1 className='thread__title'>
              <strong>{thread.shortName}</strong>
              {thread.fullName}
            </h1>
            <div className='thread__info'>icon</div>
          </div>
          <pre className='thread__description'>{thread.description}</pre>
          <div className='thread__posts'>
            {posts?.map(item => (
              <div className='thread__item' key={item.postId}>
                <div className='thread__item-top'>
                  <div className='thread__item-user thread__user'>
                    <img
                      src={item.user.imageUrl || '/imgs/anon.png'}
                      alt=''
                      className='thread__user-img'
                    />
                    <div>
                      <div className='thread__user-top'>
                        <div className='thread__user-name'>
                          {item.user.username || item.anonName}
                        </div>
                        {/* <div className='thread__user-carma'>{item.user}</div> */}
                      </div>
                      <div className='thread__user-bottom'>
                        <div className='thread__user-date'>
                          {normalizeDate(item.creationDate)}
                        </div>
                        <div className='thread__user-number-of-post'>
                          #{item.number}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <div className='thread__files'>
              <img src='' alt='' className='thread__img' />
            </div> */}
                </div>
                <p className='thread__text'>{item.content}</p>
                <div className='thread__bottom'>
                  <div className='thread__reacts'>
                    <span className='thread__react'>😀 - 5</span>
                    <span className='thread__react'>💩 - 2</span>
                    <span className='thread__react'>✋ - 1</span>
                    <span className='thread__react-more'>...</span>
                  </div>
                  <button className='thread__reply'>Ответить</button>
                </div>
              </div>
            ))}
            <CommentForm shorName={idThread} />
          </div>
        </>
      )}
    </div>
  )
}
