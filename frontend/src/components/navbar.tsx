import Link from "next/link";
import { University, User } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logoutHandler } from "@/services/actions";
import { ModeToggle } from "./mode-toggle";

export default function Navbar() {
  

  return (
    <nav className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center space-x-4">
        <Link href="/home" className="flex items-center space-x-2">
          <University className="h-6 w-6 "/>  
          <span className="font-bold text-xl">4iT University</span>
        </Link>
      </div>
      <div className="flex gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-8 w-8 border-none rounded-full"
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback>AB</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {/* {userData?.name} */}
                  Arun
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {/* {userData?.email} */}
                  aru7632@gmail.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={"/profile"} className="flex">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <form action={logoutHandler}>
                <Button type="submit" variant={"ghost"}>
                  Log out
                </Button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <ModeToggle />
      </div>
    </nav>
  );
}
