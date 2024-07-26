import Root from "@/pages/root";
import { userData } from "@/store/useUser";
import { createRootRouteWithContext } from "@tanstack/react-router";
import { DocumentData } from "firebase/firestore";

type RouterContext = {
  currentUser: null | DocumentData | userData;
  fetchUserDetails: (uid: undefined | string) => void;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => <Root />,
});
