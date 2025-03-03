import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default function DonorScheduleDetailSkeleton({
  isDonor,
}: {
  isDonor: boolean;
}) {
  return (
    <div className="flex justify-center">
      <div className="mb-5 sm:w-3/5">
        <Skeleton className="h-5 w-60" />
        <Skeleton className="h-5 w-80 mt-1 mb-10" />

        <div className="mt-6">
          <Skeleton className="h-5 w-36" />
          <Skeleton className="h-9 w-40 mt-2" />
        </div>

        <div className="mt-6">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-14 sm:w-4/5 mt-2" />
        </div>

        <div className="mt-8">
          <Skeleton className="h-5 w-36" />
          <Skeleton className="h-9 w-24 mt-2" />
        </div>

        {isDonor && (
          <>
            <div className="mt-6">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-9 sm:w-1/2 mt-2" />
            </div>

            <div className="mt-6">
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-9 sm:w-1/3 mt-2" />
            </div>
          </>
        )}

        <Separator className="mt-10 mb-5" />

        <div className="flex gap-3 justify-end">
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-20" />
        </div>
      </div>
    </div>
  );
}
