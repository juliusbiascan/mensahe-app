"use client"

import { User } from "@prisma/client";
import GroupChatModal from "./modals/group-chat-modal";
import { useState } from "react";
import { MdOutlineGroupAdd } from 'react-icons/md';

interface CreateGroupButtonProps {
  users: User[];
};

const CreateGroupButton: React.FC<CreateGroupButtonProps> = ({
  users
}) => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <GroupChatModal
        users={users}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <div
        onClick={() => setIsModalOpen(true)}
        className="
                rounded-full 
                p-2 
                bg-gray-100 
                text-gray-600 
                cursor-pointer 
                hover:opacity-75 
                transition
              "
      >
        <MdOutlineGroupAdd size={20} />
      </div>

    </>
  )
}

export default CreateGroupButton