'use client'

import { signIn } from 'next-auth/react';

const SignInButton = () => {
  return (
    <form action={ () => { signIn()}}>
      <button type="submit" className='nav-link'>
        Sign In
      </button>
    </form>
  )
}

export default SignInButton
