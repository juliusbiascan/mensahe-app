import getConversations from "@/actions/getConversations";
import getUsers from "@/actions/getUsers";
import Sidebar from "@/components/sidebar/Sidebar";
import ConversationList from "./components/ConversationList";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; 
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation";
import getCurrentUser from "@/actions/getCurrentUser";

export default async function ConversationsLayout({
  children
}: {
  children: React.ReactNode,
}) {

  const session = await getServerSession(authOptions)
  const currentUser = await getCurrentUser();

  if (!session) {
    redirect("/login")
  }

  const conversations = await getConversations();
  const users = await getUsers();

  return (
    // @ts-expect-error Server Component
    <Sidebar>
      <div className="h-full">
        <ConversationList 
          users={users} 
          title="Messages" 
          initialItems={conversations}
          currentUser={currentUser!}
        />
        {children}
      </div>
    </Sidebar>
  );
}
