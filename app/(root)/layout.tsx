import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth/next"

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await getServerSession(authOptions)


  if(session){
    redirect("/conversations")
  }
  
  if(!session){
    redirect("/register")
  }

  return (
    <>
      {children}
    </>
  )
}
