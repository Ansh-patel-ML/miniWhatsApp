import Root from "@/pages/root";
import { createRootRouteWithContext } from "@tanstack/react-router";
import { DocumentData } from "firebase/firestore";

type RouterContext = {
  currentUser: null | DocumentData;
  fetchUserDetails: (uid: undefined | string) => void;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => <Root />,
});
