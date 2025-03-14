import { BloodStockChart } from "@/components/module/dashboard/overview/blood-stock-chart";
import { LeaderboardDonorChart } from "@/components/module/dashboard/overview/leaderboard-donor-chart";
import { SumDonorChart } from "@/components/module/dashboard/overview/sum-donor-chart";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import OverviewBreadcrumb from "@/components/module/dashboard/overview/overview-breadcrumb";
import BottomOverview from "@/components/module/dashboard/overview/bottom-overview";

export default function Page() {
  return (
    <>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/overview">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <OverviewBreadcrumb />
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <BloodStockChart />
            <SumDonorChart />
            <LeaderboardDonorChart />
          </div>
          <BottomOverview />
        </div>
      </SidebarInset>
    </>
  );
}
