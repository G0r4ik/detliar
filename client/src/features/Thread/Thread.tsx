import { useLoaderData } from 'react-router-dom'
import PostSend from './PostSend'
import api from '../../config/API'
import { CSSProperties, useEffect, useState } from 'react'
import { PostSchema, ThreadSchema } from '../../types'
import { useAuth } from '@clerk/clerk-react'
import socket from '../../config/socket'
import ThreadPost from './ThreadPost'
import PuffLoader from 'react-spinners/PuffLoader'

const override: CSSProperties = {
  display: 'block',
  marginBottom: '125px',
}

export default function Thread() {
  type Token = {
    idThread: string
  }

  const [thread, setThread] = useState<ThreadSchema>()
  const [posts, setPosts] = useState<PostSchema[]>([])
  const [isLoadPosts, setIsLoadPosts] = useState(false)
  const { idThread } = useLoaderData() as Token
  const { getToken } = useAuth()

  useEffect(() => {
    socket.emit('go_thread', idThread)
    getThreadInfo()
    async function getThreadInfo() {
      const thread = await api.get(`/getThreadInfo/${idThread}`, {
        headers: { Authorization: `Bearer ${await getToken()}` },
      })
      setThread(thread.data)
      const posts = await api(`/threads/${idThread}/posts`)
      setPosts(posts.data)
      setIsLoadPosts(true)
    }

    socket.on('message', msg => {
      console.log(msg)

      console.log(2)

      // socket.auth.serverOffset = serverOffset
      setPosts(oldMessages => [...oldMessages, msg])
    })

    return () => {
      setPosts([])
      setThread(null)
      setIsLoadPosts(false)
      socket.off('message')
      socket.off('reaction')
      socket.emit('leave_thread', idThread)
    }
  }, [idThread, getToken])

  return (
    <div className='thread'>
      {!thread ? (
        <PuffLoader color='#fff' size={150} />
      ) : (
        <>
          <div className='thread__info'>
            <img
              className='thread__img'
              src={thread.logo || '/thread-logo.png'}
              alt=''
            />
            <div className='thread__start'>
              <span className='thread__shortname'>{thread.shortName}</span>
              <h1 className='thread__title'>{thread.fullName}</h1>
              <pre className='thread__description'>{thread.description}</pre>
            </div>
          </div>

          {isLoadPosts ||
            Array.from({ length: 5 }).map(() => (
              <>
                <PuffLoader
                  loading={true}
                  color='#fff'
                  cssOverride={override}
                  size={50}
                />
              </>
            ))}

          <div className='thread__posts'>
            {posts?.map(item => (
              <ThreadPost item={item} key={item._id} />
            ))}
          </div>
          {isLoadPosts && <PostSend shorName={idThread} />}
        </>
      )}
    </div>
  )
}
