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
            className="cursor-pointer flex items-center gap-2"
            onClick={() => navigate("/")}
          >
            <img 
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" 
              alt="Home" 
              className="w-4 h-4 rounded-sm object-cover"
            />
            Home
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem
            className="cursor-pointer flex items-center gap-2"
            onClick={() => navigate("/dashboard")}
          >
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" 
              alt="Dashboard" 
              className="w-4 h-4 rounded-sm object-cover"
            />
            Dashboard
          </MenubarItem>
          <MenubarItem
            className="cursor-pointer flex items-center gap-2"
            onClick={() => window.open("https://pi.app", "_blank")}
          >
            <img 
              src="https://images.unsplash.com/photo-1518770660439-4636190af475" 
              alt="Pi Browser" 
              className="w-4 h-4 rounded-sm object-cover"
            />
            Pi Browser
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};