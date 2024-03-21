export default function ThreadStar() {
  return (
    <div className='thread-info'>
      <div className='title'>Треды</div>
      <p>
        Создавайте треды, отправляйте в них сообщения, ставьте реакции,
        голосуйте за лучшие треды и все это на лучшем сайте detliar.com!
      </p>

      <p>У анонимных пользователей функционал ограничен</p>

      <table className='thread__features'>
        <tr>
          <td className='thread__features-item'>.</td>
          <td>Аноним</td>
          <td>Вошедший пользователь</td>
        </tr>
        <tr>
          <td className='thread__features-item'>
            Возможность писать сообщения в треды
          </td>
          <td className='thread__features-positive'>ДА</td>
          <td className='thread__features-positive'>ДА</td>
        </tr>
        <tr>
          <td className='thread__features-item'>Возможность создавать треды</td>
          <td className='thread__features-negative'>НЕТ</td>
          <td className='thread__features-positive'>ДА</td>
        </tr>
        <tr>
          <td className='thread__features-item'>Сообщений в день</td>
          <td>100</td>
          <td className='thread__features-positive'>10000</td>
        </tr>
        <tr>
          <td className='thread__features-item'>Реакций в день</td>
          <td className='thread__features-negative'>0</td>
          <td className='thread__features-positive'>1000</td>
        </tr>
        <tr>
          <td className='thread__features-item'>Оценок тредов в день</td>
          <td className='thread__features-negative'>0</td>
          <td className='thread__features-positive'>100</td>
        </tr>

        {/* <div className='thread__features-item thread__features-item_info'></div>
        <div className='thread__features-item'></div>
        <div className='thread__features-item'></div> */}
      </table>
    </div>
  )
}
