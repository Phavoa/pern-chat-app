import { FC } from "react";
import { Menu } from "lucide-react";
import {
  MessageCircleMore,
  Phone,
  CirclePlay,
  Star,
  Archive,
  Settings,
} from "lucide-react";
import LogoutButton from "./sidebar/LogoutButton";

// Define types for navigation items
type NavItemType = {
  icon: FC<{ className?: string }>;
  text: string;
};

type NavGroupType = {
  category: "main" | "secondary";
  items: NavItemType[];
};

// Navigation items grouped by category
const navItems: NavGroupType[] = [
  {
    category: "main",
    items: [
      { icon: MessageCircleMore, text: "Chats" },
      { icon: Phone, text: "Calls" },
      { icon: CirclePlay, text: "Status" },
      { icon: Star, text: "Starred messages" },
      { icon: Archive, text: "Archived chats" },
    ],
  },
  {
    category: "secondary",
    items: [
      { icon: Settings, text: "Settings" },
        { icon: LogoutButton, text: "LogOut" },
    ],
  },
];

// Define props for the `NavItem` component
type NavItemProps = {
  icon: FC<{ className?: string }>;
  text: string;
  isClose: boolean;
};

const NavItem: FC<NavItemProps> = ({ icon: Icon, text, isClose }) => (
  <div className="flex items-center gap-5 justify-start mt-12">
    <Icon className="text-[#8EBEFF]" />
    <p className={`text-gray-200 ${isClose ? "hidden" : "block"}`}>{text}</p>
  </div>
);

// Define props for the `SideNav` component
type SideNavProps = {
  isClose: boolean;
  setIsClose: (value: boolean) => void;
};

const SideNav: FC<SideNavProps> = ({ isClose, setIsClose }) => {
  const handleToggle = () => {
    setIsClose(!isClose);
  };

  return (
    <div
      className={`${
        isClose ? "w-[40px]" : "z-50 w-[250px]"
      } transition-all duration-300 ease-in-out fixed top-0 left-0 h-screen flex flex-col pt-24 z-100 bg-[#000F19]`}
    >
      {/* Menu Toggle */}
      <div className="flex items-center pl-2 w-full">
        <Menu className="text-white cursor-pointer" onClick={handleToggle} />
      </div>

      {/* Navigation Items */}
      {navItems.map((group, index) => (
        <div
          key={index}
          className={`flex flex-col pl-2 ${
            group.category === "secondary" ? "flex-1 justify-end mb-10" : ""
          }`}
        >
          {group.items.map((item) => (
            <NavItem
              key={item.text}
              icon={item.icon}
              text={item.text}
              isClose={isClose}
            />
          ))}
        </div>
      ))}
      {/* <div className=" pl-2 w-full mb-10">
        <LogoutButton />
      </div> */}
    </div>
  );
};

export default SideNav;
