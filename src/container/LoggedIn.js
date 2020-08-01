import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { ME } from './schema.gql'

const LoggedIn = () => {
  const getMe = useQuery(ME)
  const getMeLoading = getMe.loading
  const getMeData = getMe.data
  const getMeError = getMe.error

  if (getMeLoading) return <div>'Loading...'</div>
  if (getMeError) return <div>`Error! ${getMeError?.message}`</div>

  return (
    <div className="d-flex justify-content-center">
      <h1>Logged In!!!!!</h1>
      <pre>{JSON.stringify(getMeData)}</pre>
    </div>
  )
}

export default LoggedIn
