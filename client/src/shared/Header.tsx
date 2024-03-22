import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from '@clerk/clerk-react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header>
      <div className='header__inner'>
        <Link to='/' className='header__go-back'>
          <img src='/back button.svg' className='header__go-back' alt='' />
        </Link>
        <div className='header__title'>Threads</div>

        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  )
}
