import { signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import toast from "react-hot-toast";
import { auth } from "../config";
import { UseNavigateResult } from "@tanstack/react-router";

interface loginI {
  email: string;
  password: string;
  navigate: UseNavigateResult<string>;
}

export const loginAction = ({ email, password, navigate }: loginI) => {
  const toastPromiseConfig = {
    loading: "Checking Credentials..",
    success: "Login successfully",
    error: "Something went wrong",
  };
  const signupPromise: Promise<UserCredential> = signInWithEmailAndPassword(
    auth,
    email,
    password,
  );

  signupPromise
    .then(() => {
      navigate({
        to: "/",
      });
    })
    .catch((resError) => {
      toastPromiseConfig.error = resError.message;
    });

  toast.promise(signupPromise, toastPromiseConfig);
};
