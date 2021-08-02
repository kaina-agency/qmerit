import Common from '../components/common'
import  { useRouter } from 'next/router'

export default function Index() {    const router = useRouter()

  const path = (router.query.sessionId ==='6de5c38154134cc18e0d57eef5e01b75' || !router.query.sessionId) ? 'path1' : 'path2'
  return (
    <Common path={path}/>
  )
}
