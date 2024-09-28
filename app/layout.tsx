import '@radix-ui/themes/styles.css';
import './theme-config.css';
import type { Metadata } from "next";
//import localFont from "next/font/local";
import "./globals.css";
import NavBar from "./NavBar";
//import { Theme, ThemePanel } from '@radix-ui/themes'; //ThemePanel is to view a windows of selection of UIs
import { Container, Theme } from '@radix-ui/themes';
import { Inter } from 'next/font/google';
import AuthProvider from './auth/AuthProvider';
import QueryClientProvider from './QueryClientProvider';

/*
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
*/

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className={inter.variable}>
      <body>
        <QueryClientProvider>
          <AuthProvider>
            <Theme accentColor="mint" grayColor="mauve" radius="large">
              <NavBar />
              <main className='p-5'>
                {/* put the content in a container so that the position is in the center as the screen goes bigger */}
                <Container>{children}</Container>
              </main> 
            </Theme>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
