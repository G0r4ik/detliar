export default function Sidebar({ threads }) {
  return (
    <div className='sidebar'>
      <div className='sidebar__top'>
        <strong className='sidebar__theme-title'>Темы</strong>
        <strong className='sidebar__theme-count'>({threads.length})</strong>
      </div>
      {/* <input className='sidebar__search' placeholder='поиск' /> */}
      <div className='themes'>
        {threads.map(theme => (
          <a
            className='sidebar__theme-name'
            key={theme._id}
            href={`${theme.shortName}`}>
            {theme.shortName}
          </a>
        ))}
      </div>
      <div style={{ marginTop: ' auto' }}>
        <a href='/' className='create-theme'>
          Создать тему
        </a>
        <a href='/' className='go-main'>
          Обратно
        </a>
      </div>
    </div>
  )
}
