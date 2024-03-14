import CatButton from '../components/Landing/CatButton'
import Intro from '../components/Landing/Intro'
import Positive from '../components/Landing/Positive'
import MadeBy from '../components/shared/MadeBy'
import MyHead from '../components/shared/MyHead'
// import { Helmet } from 'react-helmet'

export default function LandingPage() {
  return (
    <>
      <MyHead></MyHead>
      <CatButton />
      <Intro />
      <Positive />
      <MadeBy />
    </>
  )
}
