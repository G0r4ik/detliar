import Reactions from '../../shared/Reactions'

export default function ThreadPost({ item }) {
  function normalizeDate(date: Date) {
    const a = new Intl.DateTimeFormat('ru', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(new Date(date))
    const b = new Intl.DateTimeFormat('ru', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date))

    return [a, b]
  }

  return (
    <div className='thread__item'>
      <div className='thread__item-top'>
        <div className='thread__user-img-wrapper'>
          <img
            src={item?.user?.imageUrl || '/anon.png'}
            alt=''
            className='thread__user-img'
          />
        </div>
        <div className='thread__item-content'>
          <div className='thread__user-name'>
            {item?.user?.username || item.anonName}
          </div>
          <button className='thread__reply-btn'>Reply</button>
          {/* <div className='thread__user-carma'>{item.user}</div> */}
          <pre className='thread__text'>{item.content}</pre>
        </div>
      </div>
      <div className='thread__bottom'>
        <div className='thread__user-date'>
          <div className='thread__date'>
            {normalizeDate(item.creationDate)[1]}
          </div>
          <div className='thread__date'>
            {normalizeDate(item.creationDate)[0]}
          </div>
        </div>
        <div className='thread__user-number-of-post'>{item.number}</div>
        <Reactions />
      </div>
    </div>
  )
}
