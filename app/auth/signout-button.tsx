'use client';

import { signOut } from 'next-auth/react'

const SignOutButton = () => {
  return (
    <form action={() => {signOut()}}>
      <button type='submit'>
        Sign Out
      </button>
    </form>
  )
}

export default SignOutButton
