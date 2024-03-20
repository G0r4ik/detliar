export default function ThreadStar() {
  return (
    <>
      <div className='thread__info'>
        <div className='title'>Треды</div>
        <p>
          Создавайте треды, отправляйте в них сообщения, ставьте реакции,
          голосуйте за лучшие треды и все это на лучшем сайте detliar.com!
        </p>

        <p>У анонимных пользователей функционал ограничен</p>

        <div className='thread__features'>
          <div className='thread__features-item thread__features-item_info'>
            <div>.</div>
            <div>Возможность писать сообщения в треды</div>
            <div>Возможность создавать треды</div>
            <div>Сообщений в день</div>
            <div>Реакций в день</div>
            <div>Оценок тредов в день</div>
          </div>
          <div className='thread__features-item'>
            <div>Аноним</div>
            <div className='thread__features-positive'>ДА</div>
            <div className='thread__features-negative'>НЕТ</div>
            <div>100</div>
            <div className='thread__features-negative'>0</div>
            <div className='thread__features-negative'>0</div>
          </div>
          <div className='thread__features-item'>
            <div>Вошедший пользователь</div>
            <div className='thread__features-positive'>ДА</div>
            <div className='thread__features-positive'>ДА</div>
            <div className='thread__features-positive'>10000</div>
            <div className='thread__features-positive'>1000</div>
            <div className='thread__features-positive'>100</div>
          </div>
        </div>
      </div>
    </>
  )
}
