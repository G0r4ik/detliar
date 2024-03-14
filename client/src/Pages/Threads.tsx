import Header from '../components/Header'
import { useUser } from '@clerk/clerk-react'
// import '../styles/threads/thread.css'
import { Helmet } from 'react-helmet'
import MyHead from '../components/shared/MyHead'

export default function ThreadPage() {
  console.log(useUser())

  return (
    <>
      <Helmet>
        <MyHead></MyHead>
        <link rel='stylesheet' href='./src/styles/threads/thread.css' />
      </Helmet>
      <Header />
    </>
  )
}
