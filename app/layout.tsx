import './globals.css'
import AuthContext from './context/AuthContext'
import ActiveStatus from '@/components/ActiveStatus'
import ToasterContext from './context/ToasterContext'

export const metadata = {
  title: 'Mensahe',
  description: 'Messenger Clone by JuliusBiascan',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <AuthContext>
          <ToasterContext />
          <ActiveStatus />
          {children}
        </AuthContext>
      </body>
    </html>
  )
}
