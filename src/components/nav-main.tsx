import {
  ChevronRight,
  User,
  type LucideIcon,
  ChartNoAxesGantt,
  Syringe,
  History,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import LogoutNav from "./logout-nav";
import Link from "next/link";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Navigasi</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuButton asChild>
          <Link href="/overview">
            <ChartNoAxesGantt />
            <span>Overview</span>
          </Link>
        </SidebarMenuButton>
        <SidebarMenuButton asChild>
          <Link href="/donor-schedule">
            <Syringe />
            <span>Donor Schedule</span>
          </Link>
        </SidebarMenuButton>
        <SidebarMenuButton asChild>
          <Link href="/history">
            <History />
            <span>History</span>
          </Link>
        </SidebarMenuButton>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <a href={subItem.url}>
                          <span>{subItem.title}</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
        <SidebarMenuButton asChild>
          <Link href="/profile">
            <User />
            <span>Profile</span>
          </Link>
        </SidebarMenuButton>
        <LogoutNav />
      </SidebarMenu>
    </SidebarGroup>
  );
}
