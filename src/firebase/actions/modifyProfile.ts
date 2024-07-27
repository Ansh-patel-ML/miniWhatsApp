import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config";
import { router } from "@/main";
import toast from "react-hot-toast";
import { uploadImageAction } from "./uploadImage";
import { deleteImageAction } from "./deleteImage";

interface modifiyProfileActionI {
  name?: string;
  id: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  file: File;
  imgURL: string | null;
  imagePath: string | null;
}

export const modifyProfileAction = async ({
  name,
  id,
  setOpen,
  file,
  imgURL,
  imagePath,
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
  if (file) {
    const toastPromiseConfig = {
      loading: "Updating Profile Photo..",
      success: "Profile Photo successfully updated.",
      error: "Something went wrong",
    };
    if (imgURL !== null) {
      if (imagePath) {
        await deleteImageAction({
          imagePath: imagePath,
        });
      }
    }
    const [imageUploadPromise, imageRef] = uploadImageAction({
      file,
      type: "PROFILE",
      id,
    });
    imageUploadPromise
      .then(async (res) => {
        await updateDoc(userDocRef, {
          imgURL: res,
          profileImageRef: imageRef,
        });
        router.invalidate();
      })
      .catch((error) => {
        toastPromiseConfig.error = error;
      });
    toast.promise(imageUploadPromise, toastPromiseConfig);
  }
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
