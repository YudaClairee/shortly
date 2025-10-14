import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link2, LogOutIcon } from "lucide-react";
import { useAuthUser } from "@/hooks/useAuthUser";
import { logout } from "@/db/apiAuth";

function Header() {
  const navigate = useNavigate();
  const user = useAuthUser();

  return (
    <div className="sticky top-4 mx-auto z-50 w-full max-w-4xl px-4">
      <nav className="bg-[#7B35E6]/70 backdrop-blur-md border rounded-full px-6 py-3 flex justify-between items-center shadow-lg">
        <Link to="/">
          <img src="/shortly.png" alt="Shortly Logo" className="h-10" />
        </Link>

        <div>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="w-8 h-8">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  {user?.user_metadata?.full_name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                  <Link2 className="w-4 h-4" />
                  My Links
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => logout()}>
                  <LogOutIcon className="w-4 h-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              onClick={() => navigate("/auth")}
              className="rounded-md bg-background text-[#7B35E6] hover:bg-background/80 font-semibold cursor-pointer"
            >
              Login
            </Button>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Header;
