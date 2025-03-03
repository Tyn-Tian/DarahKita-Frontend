"use client";

import * as React from "react";
import {
  Calendar1,
  ChartNoAxesGantt,
  History,
  LucideIcon,
  User,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { Brand } from "@/components/brand";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { getUserRole } from "@/lib/utils";

interface NavItem {
  title: string;
  url: string;
  icon: LucideIcon;
}

const navMain: NavItem[] = [
  {
    title: "Overview",
    url: "/overview",
    icon: ChartNoAxesGantt,
  },
  {
    title: "Donor Schedule",
    url: "/donor-schedule",
    icon: Calendar1,
  },
  {
    title: "History",
    url: "/history",
    icon: History,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: User,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const isPmi = getUserRole() === "pmi";
  const filteredNavMain = isPmi
    ? navMain.filter((item) => item.title !== "History")
    : navMain;

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Brand />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={filteredNavMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
