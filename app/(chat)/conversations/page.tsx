import getConversations from "@/actions/getConversations";
import getUsers from "@/actions/getUsers";
import ConversationList from "./components/ConversationList";
import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import CreateGroupButton from "@/components/create-group-button";

const Home = async () => {

  const conversations = await getConversations()
  const users = await getUsers();

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Chats"
      >
        <CreateGroupButton users={users}></CreateGroupButton>
      </DashboardHeader>
      <div className="grid gap-2">
        <ConversationList
          title="Messages"
          initialItems={conversations}
        />
      </div>
    </DashboardShell>
  );
}

export default Home;
