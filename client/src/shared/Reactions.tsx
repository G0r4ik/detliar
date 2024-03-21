export default function Reactions() {
  return (
    <div className='thread__reacts'>
      <span className='thread__react'>
        <span className='react__smile'>😀</span>
        <span className='react__count'>5</span>
      </span>

      <span className='thread__react'>
        <span className='react__smile'>💩</span>
        <span className='react__count'>2</span>
      </span>

      <span className='thread__react-more '>
        <img src='/down button.svg' alt='' className='thread__react-more-btn' />
      </span>
    </div>
  )
}
