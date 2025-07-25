import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot } from "lucide-react";

interface JsonDisplayProps {
  data: object;
}

export function JsonDisplay({ data }: JsonDisplayProps) {
  return (
    <Card className="w-full animate-fade-in shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-xl font-semibold">
          <Bot className="h-6 w-6" />
          <span>AI Extracted JSON</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <pre className="mt-2 w-full overflow-x-auto rounded-md bg-muted p-4 text-sm text-card-foreground">
            <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      </CardContent>
    </Card>
  );
}
