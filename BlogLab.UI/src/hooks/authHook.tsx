import { useEffect } from "react"
import { useSelector } from "react-redux"
import { selectUser } from "../redux/userSlice"
import { useHistory } from 'react-router-dom'
import { selectToken } from "../redux/userSlice"

export const useAuth = (): [user: any , token : any] => {
  const history = useHistory()
  const user = useSelector(selectUser)
  const userToken = useSelector(selectToken)

  useEffect(() => {
    if (!user || !userToken) {
      history.push('/login')
    }
  }, [user, userToken, history])

  return [user, userToken]
};