import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const dystopian = localFont({
  src: '../public/fonts/Dystopian-Regular.ttf',
  variable: '--font-dystopian',
})

export const metadata: Metadata = {
  title: 'Lumhar Design',
  description: 'Lumhar Design is a multidiscipliner design studio that bring out the best in you.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${inter.variable} ${dystopian.variable}`}>
      <body className='bg-white'>
        {children}
      </body>
    </html>
  )
}
