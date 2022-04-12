import React, { useContext, useEffect } from "react";
import ThemeContext from "providers/theme/ThemeContext";
import SidebarItem from "features/sidebar/components/SidebarItem";
import SolidFile from "icons/SolidFile";
import SolidBookmarks from "icons/SolidBookmarks";
import SolidSend from "icons/SolidSend";
import SolidChat from "icons/SolidChat";
import { getMediaQueriesMinWidth } from "utils/helpers";

export interface ISidebarProps {}

const statics = [
  {
    to: "/mailer",
    text: "Prześlij email",
    icon: <SolidSend width={24} />,
  },
  { to: "/", text: "Wszystkie pliki", icon: <SolidFile /> },
  {
    to: "/copy-worker",
    text: "Kopia robocza",
    icon: <SolidBookmarks width={24} />,
  },

  { to: "/coming-soon", text: "Czat", icon: <SolidChat /> },
];

const Sidebar: React.FC<ISidebarProps> = (props) => {
  const { isSidebarOpened, mediaQueries, setSidebarOpened } =
    useContext(ThemeContext);

  useEffect(() => {
    const currentMinWidth = getMediaQueriesMinWidth(mediaQueries);
    if (currentMinWidth <= 768) setSidebarOpened(false);
    else if (currentMinWidth >= 1024) setSidebarOpened(true);
  }, [mediaQueries, setSidebarOpened]);

  return (
    <div
      style={{ width: isSidebarOpened ? 248 : 0 }}
      className={`absolute h-full bg-elevation-primary border-modifier-primary transition-width overflow-hidden z-30 lg:relative lg:shadow-none ${
        isSidebarOpened
          ? "border-r shadow-elevation-x"
          : "border-none shadow-none"
      }`}
    >
      <div className="px-2 pt-4 flex-shrink-0 w-full">
        <div className="flex flex-col gap-0.5">
          {statics.map((sidebarItemProps, index) => (
            <SidebarItem key={index} {...sidebarItemProps} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
