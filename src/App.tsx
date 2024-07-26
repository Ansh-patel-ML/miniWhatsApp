import { RouterProvider } from "@tanstack/react-router";
import { ThemeProvider } from "./provider/ThemeProvider";
import { router } from "./main";
import { useUser } from "./store/useUser";
import { Suspense, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import { Loader } from "./components/ui/loader";

function App() {
  const { currentUser, fetchUserDetails } = useUser();

  useEffect(() => {
    const unSubscribeAuthChange = onAuthStateChanged(auth, (user) => {
      fetchUserDetails(user?.uid);
      router.invalidate();
    });

    return () => {
      unSubscribeAuthChange();
    };
  }, [fetchUserDetails]);

  return (
    <Suspense fallback={<Loader />}>
      <ThemeProvider defaultTheme="dark">
        <RouterProvider
          router={router}
          context={{ currentUser, fetchUserDetails }}
        />
      </ThemeProvider>
    </Suspense>
  );
}

export default App;
