import { createUserWithEmailAndPassword } from '@firebase/auth'
import { NextPage } from 'next'
import { auth } from '@/libs/firebase'
import SignupForm from '@/presentationals/signup/SignupForm'
import { SignupParams } from '@/presentationals/signup/types/signupParams'

const Signup: NextPage = () => {
  const apiSignup = (params: SignupParams) => {
    createUserWithEmailAndPassword(auth, params.email, params.password)
      .then(userCredential => {
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
