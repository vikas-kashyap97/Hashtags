import { useNavigate } from '@remix-run/react'
import { useEffect } from 'react'
import { MrbSplashScreen } from '~/designSystem'

export default function Index() {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/home')
  }, [])

  return <MrbSplashScreen />
}
