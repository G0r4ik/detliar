import { Helmet } from 'react-helmet'

interface Props {
  styleLinks: string[]
}

export default function MyHead({ styleLinks }: Props) {
  return (
    <Helmet>
      <meta charSet='UTF-8' />
      <meta
        name='viewport'
        content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
      />
      <meta name='format-detection' content='telephone=no' />
      {styleLinks.map(styleLink => (
        <link key={styleLink} rel='stylesheet' href={styleLink} />
      ))}
      {/* <!-- FAVICON --> */}
      <link
        rel='apple-touch-icon'
        sizes='180x180'
        href='apple-touch-icon.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='32x32'
        href='favicon-32x32.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='16x16'
        href='favicon-16x16.png'
      />
      <link rel='manifest' href='/site.webmanifest' />
      <link rel='mask-icon' href='safari-pinned-tab.svg' color='#5bbad5' />
      <meta name='msapplication-TileColor' content='#da532c' />
      <meta name='theme-color' content='#ffffff' />

      {/* <!-- METATAGS --> */}
      <title>I'm DETLIAR</title>
      <meta name='robots' content='index,follow' />
      <meta name='googlebot' content='index,follow' />
      <meta
        name='description'
        content="I'm DETLIAR and I like to play games and watch memes. И я не перестаю улыбаться"
      />
      <meta name='keywords' content='detliar, gamer, pro, people, blog' />

      {/* <!-- OG SECTION --> */}
      <meta property='og:title' content='Detliar' />
      <meta property='og:type' content='website' />
      <meta property='og:url' content='https://detlilar.com' />
      <meta property='og:site_name' content='detlilar.com' />
      <meta
        property='og:description'
        content="I'm DETLIAR and I like to play games and watch memes. И я не перестаю улыбаться"
      />
      <meta property='og:locale' content='en_US' />
      <meta property='og:locale:alternate' content='ru_RU' />
      <meta property='og:image' content='/og_title1.png' />
      <meta property='og:image:width' content='1200' />
      <meta property='og:image:height' content='630' />
      <meta property='og:image:type' content='image/png' />

      {/* <!-- TWITTER SECTION --> */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content='Detliar' />
      <meta
        name='twitter:description'
        content="I'm DETLIAR and I like to play games and watch memes. И я не перестаю улыбаться"
      />
      <meta name='twitter:site' content='@G0Ra2' />
      <meta name='twitter:creator' content='@G0Ra2' />
      <meta name='twitter:image' content='/og_title1.png' />
      <meta property='twitter:image:alt' content='detliar' />
    </Helmet>
  )
}
