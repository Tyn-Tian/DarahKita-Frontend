import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

interface ProfileSkeletonProps {
  ShowTitleprofile ?: boolean;

  showName ?: boolean;
  showGoldar ?: boolean;
  showRhesus ?: boolean;
  showSeparator ?: boolean;
  ShowTitlepersonal ?: boolean;

  showEmail ?: boolean;
  showAddress?: boolean;
  showCity?: boolean;
  showPhone?: boolean;
}

export default function ProfileSkeleton({
  ShowTitleprofile = true,

  showName = true,
  showGoldar = true,
  showRhesus = true,
  showSeparator = true,
  ShowTitlepersonal = true,

  showEmail = true,
  showAddress = true,
  showCity = true,
  showPhone = true,
}: ProfileSkeletonProps) {
  
  return (
    <div className="flex justify-center">
      <div className="w-full mb-5 sm:w-3/5">
      {ShowTitleprofile && (
          <>
        <Skeleton className="h-5 w-20 mb-3" />
        <Skeleton className="h-5 w-full sm:w-3/5 mb-8" />
        </>
      )}

        {showName && (
          <>
        <Skeleton className="h-5 w-16 mb-3" />
        <Skeleton className="h-9 w-full sm:w-96 mb-6" />
        </>
        )}

        {(showGoldar || showRhesus) && (
          <div className="flex gap-3 sm:w-3/5">
            {showGoldar && (
              <div className="w-3/5">
                <Skeleton className="h-5 w-28 mb-3" />
                <Skeleton className="h-9 w-full" />
              </div>
            )}
            {showRhesus && (
              <div className="w-2/5">
                <Skeleton className="h-5 w-16 mb-3" />
                <Skeleton className="h-9 w-full" />
              </div>
            )}
          </div>
        )}

        {showSeparator && (
          <>
        <Separator className="my-10" />
        </>
        )}
        
        {ShowTitlepersonal && (
          <>
        <Skeleton className="h-5 w-32 mb-3" />
        <Skeleton className="h-5 w-full sm:w-1/2 mb-8" />
        </>
        )}

        {showEmail && (
          <>
            <Skeleton className="h-5 w-16 mb-3" />
            <Skeleton className="h-9 w-full sm:w-96 mb-6" />
          </>
        )}

        {showAddress && (
          <>
        <Skeleton className="h-5 w-16 mb-3" />
        <Skeleton className="h-14 w-full sm:w-4/5 mb-6" />
        </>
        )}

        {showCity && (
          <>
        <Skeleton className="h-5 w-10 mb-3" />
        <Skeleton className="h-9 w-1/3 mb-6" />
        </>
        )}

        {showPhone && (
          <>
        <Skeleton className="h-5 w-20 mb-3" />
        <Skeleton className="h-9 w-1/2 mb-6" />
        </>
        )
        }

        <Separator className="mt-10 mb-5" />

        <div className="flex gap-3 justify-end">
          <Skeleton className="h-9 w-16" />
          <Skeleton className="h-9 w-20" />
        </div>
      </div>
    </div>
  );
}
