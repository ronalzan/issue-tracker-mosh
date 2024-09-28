'use client'; 

import Link from 'next/link'
import React from 'react'
import { BiMessageError } from "react-icons/bi"; 
import { usePathname } from 'next/navigation';
import classnames from 'classnames';
import { Avatar, Box, Container, DropdownMenu, Flex, Spinner } from '@radix-ui/themes';
import { useSession } from 'next-auth/react';
import SignInButton from './auth/signin-button';
import SignOutButton from './auth/signout-button';

const NavBar = () => {

  return (
    //flex is for horizontal arrangment and responsive behavior. border-b is to draw bottom border, px-5 is padding left and right, 
    //h-14 is to set height of the navbar, items-center is to set the arrangement of the items inside the navbar to be in the center
    <nav className='space-x-6 border-b mb-5 px-5 py-4'>
        <Container>
            <Flex justify="between">
                <Flex gap="5" align="center">
                    <Link href='/'>
                        <BiMessageError/>
                    </Link>
                    <NavLink />
                </Flex>
                <Box>
                    <AuthStatus />
                </Box>
            </Flex>
        </Container>
    </nav>
  )
}

const NavLink = () => {
    const navList = [
        { label: 'Dashboard', href: '/' }, 
        { label: 'Issues', href: '/issues' },
    ]
    const currPath = usePathname();

    return (
        <ul className='flex space-x-6 '>
            {
                navList.map((link) => 
                    <li key={link.href}>
                        <Link href={link.href} 
                            className={classnames(
                                {'nav-link': true},
                                {'!text-zinc-900' : link.href === currPath},
                            )}>
                            {link.label}    
                        </Link>
                    </li>
                )
            }
        </ul>
    )
}

const AuthStatus = () => {
  //data: session is to rename data to sesion. This is a typscript syntax
  const { status, data: session } = useSession();

  if (status === "loading") return <Spinner size="3" />;
  if (status === "unauthenticated") return <SignInButton />;
 
  return (
    <>
      {
        status === "authenticated" && 
        (<DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <Box>
                    <Avatar 
                        src={session.user?.image!} 
                        fallback="?" 
                        size="2"
                        radius="full"
                        className="cursor-pointer"
                        referrerPolicy="no-referrer"
                    />
                </Box>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
                <DropdownMenu.Label>
                    {session.user?.email}
                </DropdownMenu.Label>
                <DropdownMenu.Separator />
                <DropdownMenu.Item>
                    <SignOutButton />
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>)
      }
    </>
  )
}

export default NavBar
