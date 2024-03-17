import { useRouteError } from 'react-router-dom'

interface ErrorResponse {
  status: number
  statusText: string
  error: { message: string }
}

export default function ErrorPage() {
  const error = useRouteError() as ErrorResponse

  return (
    <div id='error-page'>
      <h1>Oops!</h1>
      <p>
        <i>{error.status} </i>
        <i>{error.statusText}</i>
        <br />
        <i>{error.error.message}</i>
      </p>
    </div>
  )
}
