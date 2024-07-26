import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config";
import { router } from "@/main";
import toast from "react-hot-toast";

interface modifiyProfileActionI {
  name?: string;
  id: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  file: File;
}

export const modifyProfileAction = async ({
  name,
  id,
  setOpen,
  file,
}: modifiyProfileActionI) => {
  const toastPromiseConfig = {
    loading: "Updating Profile..",
    success: "Profile successfully updated.",
    error: "Something went wrong",
  };
  const userDocRef = doc(db, "users", id);
  const updateUserPromise: Promise<void> = updateDoc(userDocRef, {
    username: name,
  });
  updateUserPromise
    .then(() => {
      setOpen(false);
    })
    .catch((resError) => {
      toastPromiseConfig.error = resError.message;
    });
  toast.promise(updateUserPromise, toastPromiseConfig);
  router.invalidate();
};
