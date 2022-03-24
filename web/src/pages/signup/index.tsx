import { createUserWithEmailAndPassword, getAuth } from '@firebase/auth'
import { NextPage } from 'next'
import SignupForm from '@/presentationals/signup/SignupForm'
import { SignupParams } from '@/presentationals/signup/types/signupParams'

const Signup: NextPage = () => {
  const apiSignup = (params: SignupParams) => {
    const auth = getAuth()
    createUserWithEmailAndPassword(auth, params.email, params.password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user
        console.log('user: ', user)
      })
      .catch(error => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log('errorCode: ', errorCode)
        console.log('errorMessage: ', errorMessage)
      })
    console.log('params: ', params)
  }
  return <SignupForm apiSignup={apiSignup} />
}

export default Signup
