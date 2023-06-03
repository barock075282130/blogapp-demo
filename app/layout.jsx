
import Nav from '@components/Nav'
import Provider from '@components/Provider'
import '@styles/globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Blog Demo',
  description: 'Blog App Demo',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Provider>
        <main className='app'>
          <Nav />
            {children}
        </main>
      </Provider>
      </body>
    </html>
  )
}
