'use client';

import { HiChevronLeft } from 'react-icons/hi'
import { HiEllipsisHorizontal } from 'react-icons/hi2';
import { useMemo, useState } from "react";
import Link from "next/link";
import { Conversation, User } from "@prisma/client";

import useOtherUser from "@/hooks/useOtherUser";
import useActiveList from "@/hooks/useActiveList";

import Avatar from "@/components/avatar-user";
import AvatarGroup from "@/components/avatar-group";
import ProfileDrawer from "./ProfileDrawer";

interface HeaderProps {
  conversation: Conversation & {
    users: User[]
  }
}

const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { members } = useActiveList();
  const isActive = members.indexOf(otherUser?.email!) !== -1;
  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }

    return isActive ? 'Active' : 'Offline'
  }, [conversation, isActive]);

  return (
    <>
      <ProfileDrawer
        data={conversation}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />

      <div
        className="supports-backdrop-blur:bg-background/60 sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur"
      >
        <div className="container flex h-14 items-center">

          <div className="flex gap-3 items-center">
            <Link
              href="/conversations"
              className="blocktext-sky-500 hover:text-sky-600 transition cursor-pointer"
            >
              <HiChevronLeft size={32} />
            </Link>

            {conversation.isGroup ? (
              <AvatarGroup users={conversation.users} />
            ) : (
              <Avatar user={otherUser} />
            )}

            <div className="flex flex-col">

              <div>{conversation.name || otherUser.name}</div>

              <div className="text-sm font-light text-neutral-500">
                {statusText}
              </div>

            </div>

          </div>

          <div className="flex flex-1 items-center justify-end space-x-2">
            <HiEllipsisHorizontal
              size={32}
              onClick={() => setDrawerOpen(true)}
              className=" text-sky-500 cursor-pointer hover:text-sky-600 transition"
            />
          </div>
        </div>
      </div>

    </>
  );
}

export default Header;
