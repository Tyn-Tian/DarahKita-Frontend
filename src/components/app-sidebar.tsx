"use client";

import * as React from "react";
import {
  Calendar1,
  ChartNoAxesGantt,
  History,
  LucideIcon,
  Syringe,
  User,
  Users,
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
    title: "Donation",
    url: "/donation",
    icon: Syringe,
  },
  {
    title: "Donor",
    url: "/donor",
    icon: Users,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: User,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const isPmi = getUserRole() === "pmi";
  const filteredNavMain = navMain.filter((item) => {
    if (item.url === "/donation" && !isPmi) return false;
    if (item.url === "/donor" && !isPmi) return false;
    return true;
  });

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
