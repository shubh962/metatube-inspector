import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardHeader, CardContent } from "@/components/ui/card"

export function LoadingSkeleton() {
  return (
    <Card className="w-full animate-fade-in border-0 shadow-none">
      <CardHeader>
        <Skeleton className="h-8 w-3/4 rounded-md" />
        <div className="flex items-center gap-4 mt-2">
          <Skeleton className="h-5 w-1/4 rounded-md" />
          <Skeleton className="h-5 w-1/4 rounded-md" />
        </div>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="space-y-4">
            <Skeleton className="h-6 w-1/5 rounded-md" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                <Skeleton className="h-28 w-full rounded-lg" />
                <Skeleton className="h-28 w-full rounded-lg" />
                <Skeleton className="h-28 w-full rounded-lg" />
                <Skeleton className="h-28 w-full rounded-lg" />
                <Skeleton className="h-28 w-full rounded-lg" />
            </div>
        </div>
        <div className="space-y-2">
          <Skeleton className="h-6 w-1/5 rounded-md" />
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-3/4 rounded-md" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-6 w-1/6 rounded-md" />
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
