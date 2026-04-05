export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      <div className="space-y-6 text-muted-foreground">
        <p>Effective Date: {new Date().toLocaleDateString()}</p>
        
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">1. Data Collection</h2>
          <p>MetaTube Inspector is a tool-based website. We do not require users to create accounts or provide personal identification. We process YouTube URLs provided by you to fetch public metadata through official APIs.</p>
        </section>

        <section className="bg-primary/5 p-4 border-l-4 border-primary rounded">
          <h2 className="text-xl font-semibold text-foreground mb-3">2. Google AdSense & Cookies</h2>
          <p>We use third-party advertising companies, specifically <strong>Google AdSense</strong>, to serve ads when you visit our website. Google may use cookies to serve ads based on your previous visits to this or other websites. You can opt-out of personalized advertising by visiting Google's Ads Settings.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">3. Log Files</h2>
          <p>Like most websites, we follow a standard procedure of using log files. These files log visitors when they visit websites. The information collected includes IP addresses, browser type, and time stamps. This is for analysis and site maintenance only.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">4. Third-Party Links</h2>
          <p>Our tool interacts with YouTube (Google LLC). We recommend reviewing the YouTube Terms of Service and Google Privacy Policy as we do not have control over their data practices.</p>
        </section>
      </div>
    </div>
  );
}
