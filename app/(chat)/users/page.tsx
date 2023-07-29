import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import getUsers from "@/actions/getUsers";
import UserList from "./components/UserList";

const People = async () => {
  const users = await getUsers();

  return (
    <DashboardShell>
      <DashboardHeader
        heading="People"
      >
      </DashboardHeader>
      <div className="grid gap-2">
        <UserList items={users} />
      </div>
    </DashboardShell>
  );
}

export default People;
