import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default function ProfileSkeleton() {
  return (
    <div className="flex justify-center">
      <div className="w-full mb-5 sm:w-3/5">
        
        <Skeleton className="h-6 w-32 mb-3" />
        <Skeleton className="h-4 w-full sm:w-96 mb-8" />
     
        <Skeleton className="h-6 w-20 mb-3" />
        <Skeleton className="h-10 w-full sm:w-96 mb-6" />

        <Separator className="my-10" />

        <Skeleton className="h-6 w-40 mb-3" />
        <Skeleton className="h-4 w-full sm:w-96 mb-8" />

        <Skeleton className="h-6 w-20 mb-3" />
        <Skeleton className="h-10 w-full sm:w-96 mb-6" />

        <Skeleton className="h-6 w-20 mb-3" />
        <Skeleton className="h-16 w-full sm:w-4/5 mb-6" />

        <Skeleton className="h-6 w-20 mb-3" />
        <Skeleton className="h-10 w-1/3 mb-6" />

        <Skeleton className="h-6 w-24 mb-3" />
        <Skeleton className="h-10 w-1/2 mb-6" />

        <div className="flex gap-3">
          <div className="w-3/5">
            <Skeleton className="h-6 w-32 mb-3" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="w-2/5">
            <Skeleton className="h-6 w-16 mb-3" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>

        <Separator className="mt-10 mb-5" />

        <div className="flex gap-3 justify-end">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    </div>
  );
}
