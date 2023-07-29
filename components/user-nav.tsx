"use client"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

import {
  Cloud,
  Github,
  LifeBuoy,
  LogOut,
  Settings,
  User as Userx,
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { User } from "@prisma/client";
import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"
import useActiveList from "@/hooks/useActiveList";
import SettingsModal from "./modals/settings-modal";
import { useState } from "react";
import { BsPeople } from "react-icons/bs";
import Link from "next/link";

interface UserNavProps {
  user: User;
}

const UserNav: React.FC<UserNavProps> = ({ user }) => {

  const { members } = useActiveList();
  const isActive = members.indexOf(user?.email!) !== -1;
  const [isProfileOpen, setProfileOpen] = useState(false);

  return (
    <>
      <SettingsModal
        isOpen={isProfileOpen}
        onClose={() => setProfileOpen(false)}
        currentUser={user} />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="w-9 px-0">
            <div className="relative">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  className="object-cover"
                  alt="@profile"
                  src={user?.image || '/images/placeholder.jpg'}
                />

                <AvatarFallback>
                  {user?.name}
                </AvatarFallback>
              </Avatar>
              {isActive ? (
                <span
                  className="absolute block rounded-full bg-green-500 ring-2 ring-white top-0 right-0 h-2 w-2 md:h-3 md:w-3"
                />
              ) : null}
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user?.name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setProfileOpen(true)}>
              <Userx className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem >
              <BsPeople className="mr-2 h-4 w-4" />
              <Link href="/users">People</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <Link href="/settings">Settings</Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Github className="mr-2 h-4 w-4" />
            <Link href={"https://github.com/juliusbiascan"}>GitHub</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LifeBuoy className="mr-2 h-4 w-4" />
            <span>Support</span>
          </DropdownMenuItem>
          <DropdownMenuItem disabled>
            <Cloud className="mr-2 h-4 w-4" />
            <span>API</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onSelect={(event) => {
              event.preventDefault()
              signOut({
                callbackUrl: `${window.location.origin}/login`,
              })
            }}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sign out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default UserNav