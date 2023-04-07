import React from 'react'
import "./login.css"
import { auth , provider } from "./firebase"

const login = () => {

    const signIn = () => {
        auth.signInWithPopup(provider)
        .then((result) => console.log(result))
        .catch((err) => console.log(err))
    }

  return (
    <div className='login'>
        <img src="https://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c543.png" alt="whatsapp" />
        <h1 className='login__header'>Sign in to Whatsapp</h1>
        <button onClick={signIn}>Sign in with Google</button>
    </div>
  )
}

export default login