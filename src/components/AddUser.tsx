import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { searchUserAction } from "@/firebase/actions/searchUser";
import { PlusIcon } from "lucide-react";

export function AddUser() {
  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchedUsers = await searchUserAction({
      username: e.target.value,
    });
    console.log("searchedUsers", searchedUsers);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="p-[7px]">
          <PlusIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Find user and add to your list</DialogTitle>
          <DialogDescription>
            Search the user that you want to chat with and add that to your list
            by pressing add button.
          </DialogDescription>
        </DialogHeader>
        <Input placeholder="search" type="search" onChange={handleSearch} />
      </DialogContent>
    </Dialog>
  );
}
