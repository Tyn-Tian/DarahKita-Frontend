import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { getProfile } from "@/services/profile/profileService";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function NavUser({}) {
  const queryClient = useQueryClient();

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await getProfile();
      return response.data;
    },
    initialData: () => queryClient.getQueryData(["profile"]),
  });

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage
              src={
                profile
                  ? `http://localhost:8000${profile.avatar.replace(
                      /\\\//g,
                      "/"
                    )}`
                  : ""
              }
              alt={profile ? profile.name : "shadcn"}
            />
            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">
              {profile ? profile.name : "shadcn"}
            </span>
            <span className="truncate text-xs">
              {profile ? profile.email : "m@example.com"}
            </span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
