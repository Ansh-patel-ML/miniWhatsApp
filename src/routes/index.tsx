import { auth } from "@/firebase/config";
import { router } from "@/main";
import Index from "@/pages";
import { createFileRoute } from "@tanstack/react-router";
import { onAuthStateChanged } from "firebase/auth";

export const Route = createFileRoute("/")({
  beforeLoad: ({ context, location }) => {
    console.log("redirect", context);
    if (!context.currentUser) {
      onAuthStateChanged(auth, (user) => {
        if (user === null) {
          router.navigate({
            to: "/login",
            search: {
              redirect: location.href,
            },
          });
        } else {
          context.fetchUserDetails(user.uid);
        }
      });
    }
  },
  component: Index,
});
