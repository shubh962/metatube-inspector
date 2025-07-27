import { Youtube } from 'lucide-react';

export function WelcomeMessage() {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed bg-card p-12 text-center shadow-sm animate-fade-in mt-8">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
        <Youtube className="h-8 w-8 text-primary" />
      </div>
      <h3 className="text-2xl font-semibold tracking-tight text-card-foreground">
        Ready to Inspect
      </h3>
      <p className="mt-2 text-lg text-muted-foreground">
        Paste a YouTube video link above to get started.
      </p>
    </div>
  );
}
