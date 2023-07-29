'use client';


import { User } from "@prisma/client";

import UserBox from "./UserBox";

interface UserListProps {
  items: User[];
}

const UserList: React.FC<UserListProps> = ({
  items,
}) => {
  return (
    <>
      {items.map((item) => (
        <UserBox
          key={item.id}
          data={item}
        />
      ))}
    </>
  );
}

export default UserList;
