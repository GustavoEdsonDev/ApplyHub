import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { SupabaseDebug } from '@/components/supabase-debug'
import { AuthProvider } from '@/lib/contexts/auth-context'
import { ThemeProvider } from '@/lib/contexts/theme-context'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'ApplyHub',
  description: 'Controle suas candidaturas de emprego',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          <ThemeProvider>
            {children}
            <SupabaseDebug />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}