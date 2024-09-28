import { SessionProvider } from 'next-auth/react'
import React, { PropsWithChildren, ReactNode } from 'react'

const AuthProvider = ({ children }: PropsWithChildren) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}

export default AuthProvider
