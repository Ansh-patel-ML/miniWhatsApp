import { ModeToggle } from "./ModeToogle";
import { auth } from "@/firebase/config";
import { Button } from "./ui/button";
import { useUser } from "@/store/useUser";
import { LogOutIcon, PlusIcon } from "lucide-react";
import { AvatarSheet } from "./AvatarSheet";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { AddUser } from "./AddUser";

export const Sidebar = () => {
  const { currentUser } = useUser();
  return (
    <div className="pr-2 py-2 border-r flex flex-col gap-4 h-full">
      <div className="flex flex-row gap-4 items-center">
        <AvatarSheet />
        <div className="flex flex-col flex-grow">
          <p className="text-base font-semibold">{currentUser?.username}</p>
          <p className="truncaten text-xs text-neutral-500">
            {currentUser?.email}
          </p>
        </div>
        <ModeToggle />
      </div>
      <div className="flex flex-row items-center gap-2 pl-1">
        <Input placeholder="Search" />
        <AddUser />
      </div>
      <Separator />

      <div className="flex-grow">
        <p>List of Users</p>
      </div>
      <Button
        variant="outline"
        onClick={() => auth.signOut()}
        className="w-full"
      >
        <LogOutIcon className="w-4 h-4 mr-2" /> Sign out
      </Button>
    </div>
  );
};
