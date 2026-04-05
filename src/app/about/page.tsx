export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-extrabold tracking-tight mb-6">About MetaTube Inspector</h1>
      <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
        <p className="text-lg leading-relaxed">
          Welcome to <strong>MetaTube Inspector</strong>, a specialized digital laboratory dedicated to uncovering the mechanics behind YouTube's search and discovery system. 
        </p>
        
        <h2 className="text-2xl font-bold mt-8 text-primary">Our Mission</h2>
        <p>
          As a developer with a background in <strong>B-Tech</strong> and a deep passion for <strong>AI Engineering</strong>, I built this tool to bridge the gap between complex data and actionable insights. Most creators struggle with SEO because the data is hidden; our mission is to make that data accessible, readable, and useful for everyone—from hobbyists to professional marketers.
        </p>

        <div className="bg-muted p-6 rounded-xl border my-8">
          <h3 className="font-bold text-lg mb-2">Why Use MetaTube Inspector?</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Accuracy:</strong> Directly integrated with the YouTube Data API v3.</li>
            <li><strong>Speed:</strong> Built on the Next.js framework for lightning-fast server-side processing.</li>
            <li><strong>Privacy:</strong> We don't track your searches or store your personal video data.</li>
          </ul>
        </div>

        <h2 className="text-2xl font-bold">The Technology Behind the Tool</h2>
        <p>
          MetaTube Inspector isn't just a simple script. It uses modern web architecture to parse metadata, extract high-resolution thumbnails, and analyze tagging patterns. By focusing on clean code and efficient API calls, we provide a seamless experience that helps you stay ahead of the competition.
        </p>

        <p className="italic text-muted-foreground mt-8">
          Designed and Maintained with ❤️ by the MetaTube Dev Team.
        </p>
      </div>
    </div>
  );
}
