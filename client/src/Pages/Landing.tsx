import CatButton from '../features/Landing/CatButton'
import Intro from '../features/Landing/Intro'
import Positive from '../features/Landing/Positive'
import MadeBy from '../shared/MadeBy'
import MyHead from '../shared/MyHead'
// import { Helmet } from 'react-helmet'

export default function LandingPage() {
  return (
    <>
      <MyHead styleLinks={[]}></MyHead>
      <CatButton />
      <Intro />
      <Positive />
      <MadeBy />
    </>
  )
}
