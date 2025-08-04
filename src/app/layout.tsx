import type { Metadata } from 'next'
import ClientThemeProvider from './theme-provider' // step 2

export const metadata: Metadata = {
  title: 'Fitness Tracker',
  description: 'Track your workouts and fitness progress',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ClientThemeProvider>{children}</ClientThemeProvider>
      </body>
    </html>
  )
}
