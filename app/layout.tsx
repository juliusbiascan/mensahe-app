import './globals.css'
import AuthProvider from '@/context/auth-provider'
import ActiveStatus from '@/components/ActiveStatus'
import { Toaster } from "@/components/ui/toaster"

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
        <AuthProvider>
          <Toaster/>
          <ActiveStatus />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
