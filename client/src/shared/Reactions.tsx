import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { useEffect, useState } from 'react'
import socket from '../config/socket'
import api from '../config/API'
import { useAuth } from '@clerk/clerk-react'

export default function Reactions({ idThread, idPost, reacts }) {
  const [isShowEmojiSelect, setIsShowEmojiSelect] = useState(false)

  const [tReacts, setTreacts] = useState(reacts)
  const { getToken } = useAuth()

  useEffect(() => {
    socket.on('reaction', msg => {
      console.log(msg)
      const isOldR = tReacts.findIndex(react => react.emoji === msg.emoji)
      if (isOldR !== -1) {
        const updatedReacts = [...tReacts]
        updatedReacts[isOldR].count++
        setTreacts(updatedReacts)
      } else {
        console.log('Еще нет')
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

  async function emojiSelect(event) {
    setIsShowEmojiSelect(false)

    console.log('select!')
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
    <div className='thread__reacts'>
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
      </div>
      {isShowEmojiSelect && (
        <Picker
          className='react-select'
          previewPosition='none'
          data={data}
          skinTonePosition='none'
          navPosition='bottom'
          searchPosition='static'
          onEmojiSelect={emojiSelect}
          // onClickOutside={() => setIsShowEmojiSelect(false)}
        />
      )}
    </div>
  )
}
