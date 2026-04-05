export default function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
      <div className="space-y-6 text-muted-foreground">
        <p>By using MetaTube Inspector, you agree to comply with the following terms:</p>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">1. Acceptable Use</h2>
          <p>You agree to use this tool only for legitimate SEO research and educational purposes. Automated scraping or "spamming" our API gateway is strictly prohibited.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">2. Intellectual Property</h2>
          <p>MetaTube Inspector is an independent project. "YouTube" and its logo are registered trademarks of Google LLC. We do not claim ownership of any content fetched from the YouTube API.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">3. No Video Downloading</h2>
          <p>This website <strong>does not</strong> facilitate the downloading of copyrighted video or audio streams. We strictly provide metadata analysis and thumbnail previews as permitted by YouTube's Developer Policies.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">4. Disclaimer of Liability</h2>
          <p>The service is provided "as is." We are not responsible for any inaccuracies in the data provided by external APIs or any impact on your YouTube channel's performance.</p>
        </section>
      </div>
    </div>
  );
}
