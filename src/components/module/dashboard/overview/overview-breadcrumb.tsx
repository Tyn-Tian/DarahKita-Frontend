"use client";

import { BreadcrumbItem, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { getUserRole } from "@/lib/utils";
import { getPmiProfile, getProfile } from "@/services/profile/profileService";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function OverviewBreadcrumb() {
  const queryClient = useQueryClient();
  const role = getUserRole();

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () =>
      (role === "pmi" ? getPmiProfile() : getProfile()).then((res) => res.data),
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
