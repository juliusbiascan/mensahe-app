import './globals.css'
import AuthProvider from '@/providers/auth-provider'
import ActiveStatus from '@/components/ActiveStatus'
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from '@/providers/theme-provider'

export const metadata = {
  title: 'Mensahe',
  description: 'Messenger Clone by JuliusBiascan',
  authors: [
    {
      name: "JuliusBiascan",
      url: "https://jlzkdev.vercel.app",
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <AuthProvider>
            <Toaster />
            <ActiveStatus />
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
