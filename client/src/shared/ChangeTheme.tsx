import { useEffect, useState } from 'react'

export default function ChangeTheme() {
  const [userTheme, setUserTheme] = useState('light-theme')

  function toggleTheme() {
    const activeTheme = localStorage.getItem('user-theme')
    setTheme(activeTheme === 'dark-theme' ? 'light-theme' : 'dark-theme')
  }
  function getTheme() {
    return localStorage.getItem('user-theme')
  }
  function setTheme(theme) {
    localStorage.setItem('user-theme', theme)
    setUserTheme(theme)
    document.documentElement.className = theme
  }

  useEffect(() => {
    setTheme(getTheme())
  }, [])

  return (
    <div className='change-theme'>
      <input
        id='checkbox'
        type='checkbox'
        className='change-theme__checkbox'
        onChange={toggleTheme}
      />
      <label htmlFor='checkbox' className='change-theme__label' tabIndex={0}>
        <span className='switch-theme__icon'>
          <svg
            width='29'
            height='30'
            viewBox='0 0 29 30'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M28.234 24.2211C27.3578 24.3717 26.4562 24.4502 25.5358 24.4502C16.9903 24.4502 10.0628 17.6825 10.0628 9.33416C10.0628 5.81141 11.2963 2.57012 13.3643 0C6.10519 1.24713 0.5896 7.43779 0.5896 14.887C0.5896 23.2353 7.5171 30.003 16.0626 30.003C21.0022 30.003 25.4011 27.7418 28.234 24.2211Z'
              fill='#191919'
            />
          </svg>
        </span>
        <span className='switch-theme__icon'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='pink'
            stroke='pink'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='feather feather-heart'>
            <path d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z' />
          </svg>
        </span>
        <div
          className={`change-theme__toggle
          ${
            userTheme === 'dark-theme' ? 'change-theme__toggle_checked' : ''
          }`}></div>
      </label>
    </div>
  )
}
// 'icon change-theme__toggle'
