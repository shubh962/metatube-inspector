
import { Card, CardContent } from "@/components/ui/card";
import { Megaphone } from "lucide-react";

export function AdBanner() {
  return (
    <Card className="w-full">
      <CardContent className="p-4 flex items-center justify-center">
        <div className="flex items-center gap-4 text-muted-foreground">
          <Megaphone className="h-6 w-6" />
          <p className="text-sm font-medium">Your Advertisement Here</p>
        </div>
      </CardContent>
    </Card>
  );
}
