import { createUserWithEmailAndPassword, UserCredential } from "firebase/auth";
import toast from "react-hot-toast";
import { auth, db } from "../config";
import { doc, setDoc } from "firebase/firestore";

interface registerI {
  email: string;
  password: string;
  username: string;
}

export const registerAction = ({ email, password, username }: registerI) => {
  const toastPromiseConfig = {
    loading: "Creating Credentials..",
    success: "Register successfully",
    error: "Something went wrong",
  };
  const registerPromise: Promise<UserCredential> =
    createUserWithEmailAndPassword(auth, email, password);

  registerPromise
    .then(async (res) => {
      try {
        const usersDocRef = doc(db, "users", res.user.uid);
        const usersChatRef = doc(db, "usersChat", res.user.uid);
        await setDoc(usersDocRef, {
          username,
          email,
          id: res.user.uid,
          blocked: [],
        });
        await setDoc(usersChatRef, {
          chats: [],
        });
      } catch (resError) {
        toastPromiseConfig.error = "Something went wrong";
      }
    })
    .catch((resError) => {
      toastPromiseConfig.error = resError.message;
    });

  toast.promise(registerPromise, toastPromiseConfig);
};
