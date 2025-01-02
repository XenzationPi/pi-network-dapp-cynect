import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Menu as MenuIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Menu = () => {
  const navigate = useNavigate();

  return (
    <Menubar className="fixed top-4 left-4 border-none bg-transparent">
      <MenubarMenu>
        <MenubarTrigger className="cursor-pointer data-[state=open]:bg-purple-100 dark:data-[state=open]:bg-purple-900">
          <MenuIcon className="h-5 w-5 text-purple-800 dark:text-purple-200" />
        </MenubarTrigger>
        <MenubarContent className="min-w-[200px] bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/75">
          <MenubarItem
            className="cursor-pointer"
            onClick={() => navigate("/")}
          >
            Home
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem
            className="cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </MenubarItem>
          <MenubarItem
            className="cursor-pointer"
            onClick={() => window.open("https://pi.app", "_blank")}
          >
            Pi Browser
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};