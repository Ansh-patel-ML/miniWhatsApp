import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Label } from "@radix-ui/react-dropdown-menu";
import { cx } from "class-variance-authority";
import { Input } from "./ui/input";
import { useUser } from "@/store/useUser";
import { modifyProfileAction } from "@/firebase/actions/modifyProfile";
import { useState } from "react";

const profileUpdateFormSchema = z.object({
  name: z
    .string({
      invalid_type_error: "Enter valid name,",
      required_error: "Name is required.",
    })
    .min(8, {
      message: "Name is too short minimum 8 character is required.",
    })
    .max(15, {
      message: "Name is too long maximum 10 character is allowed.",
    }),
  file: z.instanceof(File).optional(),
});

interface profileUpdateFormI {
  name: string;
  file: File;
  imgURL: string;
}

export function AvatarSheet() {
  const { currentUser } = useUser();
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    setValue,
    watch,
  } = useForm<profileUpdateFormI>({
    resolver: zodResolver(profileUpdateFormSchema),
    defaultValues: {
      name: currentUser?.username,
      imgURL: currentUser?.imgURL,
    },
  });
  const watchImageURL = watch("imgURL", currentUser?.imgURL);

  const handleImageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const imgURL = URL.createObjectURL(file);
      setValue("file", file);
      setValue("imgURL", imgURL);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Avatar
          className="
          w-10
          h-10
          flex
          justify-center
          items-center
          border
          rounded-full
          bg-border
          hover:cursor-pointer
          "
        >
          <AvatarImage src={currentUser?.imgURL} alt="@shadcn" />
          <AvatarFallback>{currentUser?.username.slice(0, 1)}</AvatarFallback>
        </Avatar>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <form
          onSubmit={handleSubmit((data) => {
            console.log("data", data);
            modifyProfileAction({
              id: currentUser?.id,
              name: data.name,
              setOpen,
              file: data.file,
              imgURL: currentUser?.imgURL,
              imagePath: currentUser?.profileImageRef,
            });
          })}
          className="mt-4"
        >
          <div className="flex flex-col gap-3 justify-start">
            <div className="flex flex-col justify-center items-center gap-4">
              <Avatar className="w-20 h-20 flex justify-center items-center border rounded-full bg-border hover:cursor-pointer">
                <AvatarImage src={watchImageURL} alt="profile image" />
                <AvatarFallback className="text-4xl">
                  {currentUser?.username.slice(0, 1)}
                </AvatarFallback>
              </Avatar>
              <div className="grid w-full max-w-sm items-center gap-1.5 text-white">
                <Input
                  id="picture"
                  type="file"
                  onChange={handleImageInput}
                  className="dark:bg-transparent dark:text-white dark:file:text-white text-black file:text-black"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 justify-start max-w-lg">
              <Label className="text-neutral-400">User Id</Label>
              <Input
                type="text"
                id="uid"
                disabled={true}
                value={currentUser?.id}
                className={cx(
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:border-0",
                )}
              />
            </div>
            <div className="flex flex-col gap-2 justify-start max-w-lg">
              <Label className="text-neutral-400">Name</Label>
              <Input
                type="text"
                id="name"
                placeholder="Enter your name."
                {...register("name")}
                className={cx(
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:border-0",
                  errors?.name && "border-rose-400 focus-visible:ring-rose-400",
                  !errors?.name &&
                    touchedFields?.name === true &&
                    "border-emerald-400 focus-visible:ring-emerald-400",
                )}
              />
              {errors?.name && (
                <p className="text-sm text-rose-400">{errors?.name?.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-2 justify-start max-w-lg">
              <Label className="text-neutral-400">Email</Label>
              <Input
                type="text"
                id="email"
                disabled={true}
                value={currentUser?.email}
                className={cx(
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:border-0",
                )}
              />
            </div>
            <SheetFooter className="mt-3">
              <Button type="submit">Save changes</Button>
            </SheetFooter>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
