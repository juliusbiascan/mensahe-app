'use client';

import { useMemo, useState } from 'react'
import { IoClose, IoTrash } from 'react-icons/io5'
import { Conversation, User } from '@prisma/client';
import { format } from 'date-fns';
import {
  Sheet,
  SheetClose,
  SheetContent,
} from "@/components/ui/sheet"

import useOtherUser from '@/hooks/useOtherUser';
import useActiveList from '@/hooks/useActiveList';

import Avatar from '@/components/avatar-user';
import AvatarGroup from '@/components/avatar-group';
import ConfirmModal from './ConfirmModal';

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: Conversation & {
    users: User[]
  }
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const otherUser = useOtherUser(data);

  const joinedDate = useMemo(() => {
    return format(new Date(otherUser.createdAt), 'PP');
  }, [otherUser.createdAt]);

  const title = useMemo(() => {
    return data.name || otherUser.name;
  }, [data.name, otherUser.name]);

  const { members } = useActiveList();
  const isActive = members.indexOf(otherUser?.email!) !== -1;

  const statusText = useMemo(() => {
    if (data.isGroup) {
      return `${data.users.length} members`;
    }

    return isActive ? 'Active' : 'Offline'
  }, [data, isActive]);

  return (
    <>
      <ConfirmModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
      />
      <Sheet open={isOpen} >
        <SheetContent className="w-[400px] sm:w-[540px]">
          <div className="flex h-full flex-col py-6 shadow-xl">
            <div className="px-4 sm:px-6">
              <div className="flex items-start justify-end">
                <div className="ml-3 flex h-7 items-center">
                  <SheetClose asChild>
                    <button
                      type="button"
                      className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={onClose}
                    >
                      <span className="sr-only">Close panel</span>
                      <IoClose size={24} aria-hidden="true" />
                    </button>
                  </SheetClose>
                </div>
              </div>
            </div>
            <div className="relative mt-6 flex-1 px-4 sm:px-6">
              <div className="flex flex-col items-center">
                <div className="mb-2">
                  {data.isGroup ? <AvatarGroup users={data.users} /> : <Avatar user={otherUser} />}
                </div>
                <div>
                  {title}
                </div>
                <div className="text-sm text-gray-500">
                  {statusText}
                </div>
                <div className="flex gap-10 my-8">
                  <div onClick={() => setConfirmOpen(true)} className="flex flex-col gap-3 items-center cursor-pointer hover:opacity-75">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center">
                      <IoTrash size={20} />
                    </div>
                    <div className="text-sm font-light text-primary">
                      Delete
                    </div>
                  </div>
                </div>
                <div className="w-full pb-5 pt-5 sm:px-0 sm:pt-0">
                  <dl className="space-y-8 px-4 sm:space-y-6 sm:px-6">
                    {data.isGroup && (
                      <div>
                        <dt
                          className="
                                  text-sm 
                                  font-medium 
                                  text-primary
                                  sm:w-40 
                                  sm:flex-shrink-0
                                "
                        >
                          Emails
                        </dt>
                        <dd
                          className="
                                  mt-1 
                                  text-sm 
                                  text-primary
                                  sm:col-span-2
                                "
                        >
                          {data.users.map((user) => user.email).join(', ')}
                        </dd>
                      </div>
                    )}
                    {!data.isGroup && (
                      <div>
                        <dt
                          className="
                                  text-sm 
                                  font-medium 
                                  text-primary
                                  sm:w-40 
                                  sm:flex-shrink-0
                                "
                        >
                          Email
                        </dt>
                        <dd
                          className="
                                  mt-1 
                                  text-sm 
                                  text-primary
                                  sm:col-span-2
                                "
                        >
                          {otherUser.email}
                        </dd>
                      </div>
                    )}
                    {!data.isGroup && (
                      <>
                        <hr />
                        <div>
                          <dt
                            className="
                                    text-sm 
                                    font-medium 
                                    text-primary
                                    sm:w-40 
                                    sm:flex-shrink-0
                                  "
                          >
                            Joined
                          </dt>
                          <dd
                            className="
                                    mt-1 
                                    text-sm 
                                    text-primary
                                    sm:col-span-2
                                  "
                          >
                            <time dateTime={joinedDate}>
                              {joinedDate}
                            </time>
                          </dd>
                        </div>
                      </>
                    )}
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}

export default ProfileDrawer;
