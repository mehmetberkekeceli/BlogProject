import { useEffect } from "react"
import { useSelector } from "react-redux"
import { selectUser } from "../redux/userSlice"
import { useHistory } from 'react-router-dom'

export const useAuth = (): [user: any] => {
  const history = useHistory()
  const user = useSelector(selectUser)

  useEffect(() => {
    if (!user) {
      history.push('/login')
    }
  }, [user, history])

  return [user]
}
