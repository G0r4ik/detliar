import CommentForm from './CommentForm'
// import emojis from 'emojis-list'

export default function Thread() {
  // console.log(emojis)
  const threadItems = [
    {
      id: 1,
      idOfThisThread: 1,
      usernameId: 1,
      date: '12.12.2012 23:34',
      text: ' Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis quaerat enim  ducimus, temporibus assumenda doloribus adipisci autem sed deleniti quis, in tenetur similique qui facere, praesentium laborum veniam earum.',
      reacts: [
        { id: 1, emodsi: '😀', count: 4 },
        { id: 1, emodsi: '💩', count: 4 },
        { id: 1, emodsi: '✋', count: 4 },
      ],
    },
    {
      id: 2,
      idOfThisThread: 2,
      usernameId: 1,
      date: '12.12.2012 23:34',
      text: ' Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis quaerat enim  ducimus, temporibus assumenda doloribus adipisci autem sed deleniti quis, in tenetur similique qui facere, praesentium laborum veniam earum.',
      reacts: [
        { id: 1, emodsi: '😀', count: 4 },
        { id: 1, emodsi: '💩', count: 4 },
        { id: 1, emodsi: '✋', count: 4 },
      ],
    },
    {
      id: 3,
      idOfThisThread: 3,
      usernameId: 1,
      date: '12.12.2012 23:34',
      text: ' Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis quaerat enim  ducimus, temporibus assumenda doloribus adipisci autem sed deleniti quis, in tenetur similique qui facere, praesentium laborum veniam earum.',
      reacts: [
        { id: 1, emodsi: '😀', count: 4 },
        { id: 1, emodsi: '💩', count: 4 },
        { id: 1, emodsi: '✋', count: 4 },
      ],
    },
    {
      id: 4,
      idOfThisThread: 4,
      usernameId: 1,
      date: '12.12.2012 23:34',
      text: ' Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis quaerat enim  ducimus, temporibus assumenda doloribus adipisci autem sed deleniti quis, in tenetur similique qui facere, praesentium laborum veniam earum.',
      reacts: [
        { id: 1, emodsi: '😀', count: 4 },
        { id: 1, emodsi: '💩', count: 4 },
        { id: 1, emodsi: '✋', count: 4 },
      ],
    },
  ]

  return (
    <div className='thread'>
      <div className='thread__start'>
        <h1 className='thread__title'>Ежики</h1>
        <div className='thread__info'>icon</div>
      </div>
      <div className='thread__posts'>
        {threadItems.map(item => (
          <div className='thread__item' key={item.idOfThisThread}>
            <div className='thread__item-top'>
              <div className='thread__item-user thread__user'>
                <img src='/user.png' alt='' className='thread__user-img' />
                <div>
                  <div className='thread__user-top'>
                    <div className='thread__user-name'>{item.usernameId}</div>
                    <div className='thread__user-carma'>90</div>
                  </div>
                  <div className='thread__user-bottom'>
                    <div className='thread__user-date'>{item.date}</div>
                    <div className='thread__user-number-of-post'>#1</div>
                  </div>
                </div>
              </div>

              {/* <div className='thread__files'>
              <img src='' alt='' className='thread__img' />
            </div> */}
            </div>
            <p className='thread__text'>{item.text}</p>
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
      </div>
      <CommentForm />
    </div>
  )
}
