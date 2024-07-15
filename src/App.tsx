import { RouterProvider } from "@tanstack/react-router";
import { ThemeProvider } from "./provider/ThemeProvider";
import { router } from "./main";

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
