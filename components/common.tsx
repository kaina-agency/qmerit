import { useState, useEffect } from 'react'
import { useClientData } from '../hooks/client-data'
import Head from 'next/head'
import styles from './common.module.css'
import Form from './form'
import analytics from './analytics'

analytics()

declare global {
  interface Window {
    resetClientData: () => void
  }
}

export default function Common({ path }: { path: 'path1' | 'path2' }) {
  const [hostName, setHostName] = useState('localhost')
  if (typeof window !== 'undefined') {
    window.resetClientData = () => {
      clearData()
      window.location.reload()
    }
    if (hostName !== window.location.hostname ) setHostName( window.location.hostname )
  }

  useEffect(() => {
    setIsEnglish(hostName.indexOf('offrerechargechevrolet') > -1 ? false:true)
  }, [hostName])

  const [isEnglish, setIsEnglish] = useState(hostName.indexOf('offrerechargechevrolet') > -1 ? false:true)
  const { clearData } =  useClientData(isEnglish ? 'en' : 'fr')
  const toggleLanguage = () => {

    if (typeof window !== 'undefined') {
      if (isEnglish) {
        window.location.href = path === 'path1' ? 'https://www.offrerechargechevrolet.ca/installation?sessionId=6de5c38154134cc18e0d57eef5e01b75':
          'https://www.offrerechargechevrolet.ca/'
      } else {
        window.location.href = path === 'path1' ? 'https://www.chevroletchargingoffer.ca/installation?sessionId=6de5c38154134cc18e0d57eef5e01b75':
          'https://www.chevroletchargingoffer.ca/'
      }
    }

  }

  const reset = () => {
    localStorage.setItem('CLIENT_DATA_V22', '')
    window.location.reload()
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>GM Qmerit</title>
        <meta name="description" content="GM Qmerit" />
        <meta name="robots" content="noindex" />
        <link rel="icon" href="/favicon.ico" />
        <script src="//assets.adobedtm.com/ea8c57fea068/d3ef369fe7b4/launch-3f95b567c58a.min.js"></script>
      </Head>

      <nav className="bg-black h-12 w-full flex justify-center">
        <div className="max-w-screen-xl w-full flex justify-center space-x-12 items-center relative">
          <a href={isEnglish ? 'https://www.chevrolet.ca':'https://www.chevrolet.ca/fr'} target="_blank" rel="noreferrer">
            <img
              className="absolute left-5 top-1/2 transform -translate-y-1/2"
              srcSet="./EVLogo/EVLogo.png,
                      ./EVLogo/EVLogo@2x.png 2x,
                      ./EVLogo/EVLogo@3x.png 3x"
              src="./EVLogo/EVLogo@3x.png"
              alt="Chevrolet EV Logo"
            />
          </a>
          <a
            className="appearance-none text-grey-light text-sm tracking-wide uppercase"
            href={isEnglish ? 'https://www.chevrolet.ca/en/upcoming-vehicles/2022-bolt-euv' : 'https://www.chevrolet.ca/fr/upcoming-vehicles/2022-bolt-euv' }
            target="_blank"
            rel="noreferrer"
          >
            Bolt EUV
          </a>
          <a
            className="appearance-none text-grey-light text-sm tracking-wide uppercase"
            href={isEnglish ? 'https://www.chevrolet.ca/en/upcoming-vehicles/2022-bolt-ev' :'https://www.chevrolet.ca/fr/upcoming-vehicles/2022-bolt-ev'}
            target="_blank"
            rel="noreferrer"
          >
            Bolt EV
          </a>
          <button
            className="absolute right-5 top-1/2 transform -translate-y-1/2 text-grey-light text-sm focus:outline-none outline-none"
            onClick={toggleLanguage}>
            <span className={isEnglish ? 'text-grey-light' : 'text-grey-mid' + ' text-sm uppercase'}>
              EN
            </span>
            &nbsp;|&nbsp;
            <span className={!isEnglish ? 'text-grey-light' : 'text-grey-mid' + ' text-sm uppercase'}>
              FR
            </span>
          </button>
        </div>
      </nav>

      <header className={styles.header + ' w-full relative flex justify-center align-center'}>
        <img className="w-full h-full absolute object-cover" src="/Hero-Bg.png" />
        <div className="flex flex-col text-center relative justify-center space-y-20 md:space-y-2 px-6">
          <p className="text-white font-louis font-bold uppercase text-5xl leading-normal">
            {isEnglish ? 'Installation made easy' : 'L’installation simple'}
          </p>
          <p className="text-white font-louis text-3xl leading-normal">
            {isEnglish ? 'Charged by Chevrolet' : 'Recharge par Chevrolet'}
          </p>
        </div>
      </header>

      <div className="bg-grey-line" style={{width: "100%"}}>
        <div className="container max-w-screen-md mx-auto py-4 pr-6 flex justify-end">
          <button onClick={reset} className="bg-white hover:text-error text-blue text-sm px-4 py-1 br-8 rounded-full">{isEnglish ? 'Clear All Fields' : 'Effacer Tous les Champs'}</button>
        </div>
      </div>

      <section className={styles.form + ' container max-w-screen-md mx-auto mt-16 pr-6'} title="Main form">
        <Form path={path} lang={isEnglish ? 'en' : 'fr'} />
      </section>
      <script type="text/javascript">_satellite.pageBottom();</script>
    </div>

  )
}
