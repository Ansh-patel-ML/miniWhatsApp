import Header from "@/components/Header";
import { Outlet, useRouterState } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

const Root = () => {
  const currentLocation = useRouterState({
    select: (state) => state.location,
  });

  return (
    <div className="flex flex-col h-full w-full">
      {(currentLocation.pathname === "/login" ||
        currentLocation.pathname === "/register") && (
        <Header currentLocation={currentLocation.pathname} />
      )}
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  );
};

export default Root;
