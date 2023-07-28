import getUsers from "@/actions/getUsers";
import Sidebar from "@/components/sidebar/Sidebar";
import UserList from "./components/UserList";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; 
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation";

export default async function UsersLayout({
  children
}: {
  children: React.ReactNode,
}) {

  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/register")
  }

  const users = await getUsers();

  return (
    // @ts-expect-error Server Component
    <Sidebar>
      <div className="h-full">
        <UserList items={users} />
        {children}
      </div>
    </Sidebar>
  );
}
