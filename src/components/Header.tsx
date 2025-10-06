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
import { LogOutIcon } from "lucide-react";

function Header() {
  const navigate = useNavigate();
  const user = false;

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
                <DropdownMenuLabel>Djibyuda</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>My Links</DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOutIcon className="w-4 h-4" />
                  logout
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
