import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { useEffect, useRef, useState } from 'react'
import socket from '../config/socket'
import api from '../config/API'
import { useAuth } from '@clerk/clerk-react'
import { useOutsideClick } from './hookOutside'

export default function Reactions({ idThread, idPost, reacts }) {
  const [isShowEmojiSelect, setIsShowEmojiSelect] = useState(false)
  const [isShowUser, setIsShowUser] = useState(false)

  const [tReacts, setTreacts] = useState(reacts)
  const [users, setUsers] = useState([])
  const { getToken, isSignedIn } = useAuth()
  const usersHash = {}
  const who = useRef()

  useOutsideClick(who, () => {
    console.log('close')
    setIsShowUser(false)
  })

  useEffect(() => {
    socket.on('reaction', msg => {
      if (msg.postId !== idPost) return
      const isOldR = tReacts.findIndex(react => react.emoji === msg.emoji)
      if (isOldR !== -1) {
        const updatedReacts = [...tReacts]
        updatedReacts[isOldR].count++
        setTreacts(updatedReacts)
      } else {
        setTreacts([
          ...tReacts,
          {
            users: [msg.userId],
            emoji: msg.emoji,
            count: 1,
          },
        ])
      }
    })

    return () => {
      socket.off('reaction')
    }
  }, [])

  async function showUsers() {
    setIsShowUser(!isShowUser)
    const hash = {}
    let tmp = []
    for (const emojiR of tReacts) {
      const emoji = emojiR.emoji
      const usersFind = emojiR.users

      for (const user of usersFind) {
        if (hash[user + emoji]) hash[user + emoji].count++
        else hash[user + emoji] = { count: 1 }
      }

      const set = new Set<string>(usersFind)
      for (const user of set) {
        if (usersHash[user]) {
          tmp = [
            ...tmp,
            {
              ...usersHash[user],
              count: hash[user + emoji].count,
              emoji: emoji,
            },
          ]
        } else {
          const cUser = await api.get(`/user/${user}`)
          usersHash[user] = cUser.data

          const cccUser = {
            ...cUser.data,
            count: hash[user + emoji].count,
            emoji: emoji,
          }
          tmp = [...tmp, cccUser]
        }
      }
    }
    tmp.sort((a, b) => b.count - a.count)
    setUsers(tmp)
  }

  async function emojiSelect(event) {
    setIsShowEmojiSelect(false)

    api.post(
      `/threads/${idThread}/posts/${idPost}/react`,
      {
        react: event.native,
      },
      {
        headers: { Authorization: `Bearer ${await getToken()}` },
      }
    )
  }

  return (
    <div className='thread__reacts' ref={who}>
      {isShowUser && (
        <div className='react__who'>
          {users.map(i => (
            <span key={`${i.username}-${i.count}-${i.emoji}`}>
              {i.emoji} {i.username} {i.count}
            </span>
          ))}
        </div>
      )}

      <div className='thread__reacts-inner'>
        {tReacts.map(react => (
          <span className='thread__react' key={react.emoji}>
            <span
              className='react__smile'
              onClick={() => emojiSelect({ native: react.emoji })}>
              {react.emoji}
            </span>
            <span className='react__count'>{react.count}</span>
          </span>
        ))}

        {isSignedIn && (
          <span
            className='thread__react-more'
            onClick={() => {
              setIsShowEmojiSelect(!isShowEmojiSelect)
            }}>
            <img
              src='/down button.svg'
              alt=''
              className='thread__react-more-btn'
            />
          </span>
        )}
        {tReacts.length > 0 && (
          <svg
            onClick={() => showUsers()}
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='rgba(255, 255,255,0.5)'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'>
            <path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z' />
            <circle cx='12' cy='12' r='3' />
          </svg>
        )}
      </div>

      {isShowEmojiSelect && (
        <Picker
          className='react-select'
          previewPosition='none'
          data={data}
          skinTonePosition='none'
          navPosition='bottom'
          searchPosition='static'
          perLine={5}
          onEmojiSelect={emojiSelect}
          onClickOutside={e => {
            if (e.target.classList.contains('thread__react-more-btn')) return
            setIsShowEmojiSelect(false)
          }}
        />
      )}
    </div>
  )
}
