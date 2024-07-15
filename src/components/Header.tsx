import { Link } from "@tanstack/react-router";
import { ModeToggle } from "./ModeToogle";
import { Button } from "./ui/button";

interface HeaderI {
  currentLocation: "/login" | "/register";
}

const Header: React.FC<HeaderI> = ({ currentLocation }) => {
  return (
    <div className="flex flex-row justify-end items-center gap-4 p-4">
      {currentLocation === "/register" ? (
        <Link to="/login">
          <Button variant="outline">Login</Button>
        </Link>
      ) : (
        <Link to="/register">
          <Button variant="outline">Register</Button>
        </Link>
      )}
      <ModeToggle />
    </div>
  );
};

export default Header;
