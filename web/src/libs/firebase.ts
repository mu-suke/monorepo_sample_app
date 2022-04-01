import { initializeApp } from '@firebase/app'
import { getAuth, User } from '@firebase/auth'

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
}

const app = initializeApp(config)
export const auth = getAuth(app)

export const getAuthUser = (): Promise<User> => {
  return new Promise(resolve => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (!user) {
        return
      }
      // user オブジェクトを resolve
      resolve(user)

      // 登録解除
      unsubscribe()
    })
  })
}
