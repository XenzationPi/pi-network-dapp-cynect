import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Menu as MenuIcon, Home, LogIn, UserCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Menu = () => {
  const navigate = useNavigate();

  return (
    <Menubar className="fixed top-4 left-4 z-50 border-none bg-transparent">
      <MenubarMenu>
        <MenubarTrigger className="cursor-pointer data-[state=open]:bg-purple-100 dark:data-[state=open]:bg-purple-900">
          <MenuIcon className="h-5 w-5 text-purple-800 dark:text-purple-200" />
        </MenubarTrigger>
        <MenubarContent className="min-w-[200px] bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/75">
          <MenubarItem
            className="cursor-pointer flex items-center gap-2"
            onClick={() => navigate("/")}
          >
            <Home className="h-4 w-4" />
            Home
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem
            className="cursor-pointer flex items-center gap-2"
            onClick={() => navigate("/profile")}
          >
            <UserCircle2 className="h-4 w-4" />
            Profile
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem
            className="cursor-pointer flex items-center gap-2"
            onClick={() => navigate("/")}
          >
            <LogIn className="h-4 w-4" />
            Connect with Pi Browser
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};