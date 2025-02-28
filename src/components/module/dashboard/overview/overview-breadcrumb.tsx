"use client";

import { BreadcrumbItem, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { getProfile } from "@/services/profile/profileService";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function OverviewBreadcrumb() {
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
    <BreadcrumbItem>
      <BreadcrumbPage className="flex gap-1 items-center">
        Selamat Datang {profile ? profile.name : null}
      </BreadcrumbPage>
    </BreadcrumbItem>
  );
}
