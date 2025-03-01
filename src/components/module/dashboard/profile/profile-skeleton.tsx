import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default function ProfileSkeleton() {
  return (
    <div className="flex justify-center">
      <div className="w-full mb-5 sm:w-3/5">
        <Skeleton className="h-5 w-20 mb-3" />
        <Skeleton className="h-5 w-full sm:w-3/5 mb-8" />

        <Skeleton className="h-5 w-16 mb-3" />
        <Skeleton className="h-9 w-full sm:w-96 mb-6" />

        <div className="flex gap-3 sm:w-3/5">
          <div className="w-3/5">
            <Skeleton className="h-5 w-28 mb-3" />
            <Skeleton className="h-9 w-full" />
          </div>
          <div className="w-2/5">
            <Skeleton className="h-5 w-16 mb-3" />
            <Skeleton className="h-9 w-full" />
          </div>
        </div>

        <Separator className="my-10" />

        <Skeleton className="h-5 w-32 mb-3" />
        <Skeleton className="h-5 w-full sm:w-1/2 mb-8" />

        <Skeleton className="h-5 w-16 mb-3" />
        <Skeleton className="h-9 w-full sm:w-96 mb-6" />

        <Skeleton className="h-5 w-16 mb-3" />
        <Skeleton className="h-14 w-full sm:w-4/5 mb-6" />

        <Skeleton className="h-5 w-10 mb-3" />
        <Skeleton className="h-9 w-1/3 mb-6" />

        <Skeleton className="h-5 w-20 mb-3" />
        <Skeleton className="h-9 w-1/2 mb-6" />

        <Separator className="mt-10 mb-5" />

        <div className="flex gap-3 justify-end">
          <Skeleton className="h-9 w-16" />
          <Skeleton className="h-9 w-20" />
        </div>
      </div>
    </div>
  );
}
