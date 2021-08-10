import { Alert } from 'react-bootstrap';

export const PageNotFound = () => {
  return (
    <div>
      <Alert variant='danger'>
        UH OH. 404 Error. Please <Alert.Link href="/login">login</Alert.Link> to continue.
      </Alert>
    </div>
  )
}

export default PageNotFound