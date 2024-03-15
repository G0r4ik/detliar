import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from '@clerk/clerk-react'

export default function Header() {
  return (
    <header>
      <div className='container'>
        <div className='header__inner'>
          <img src='/logo.png' alt='' className='logo' />
          {/* <input placeholder='поиск...' type='text' className='search' /> */}
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  )
}
