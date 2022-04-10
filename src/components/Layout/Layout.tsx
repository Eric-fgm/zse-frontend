import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "features/navigation/components/Navigation";
import Sidebar from "features/sidebar/components/Sidebar";
import Scroller from "components/Scroller/Scroller";

export interface ILayoutProps {}

const Layout: React.FC<ILayoutProps> = () => {
  return (
    <div className="flex flex-col w-full h-full bg-elevation-primary">
      <Navigation />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <Scroller className="pl-4 flex-1 lg:pl-8 lg:pr-4">
          <Outlet />
        </Scroller>
      </div>
    </div>
  );
};

export default Layout;
