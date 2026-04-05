import Link from 'next/link';
import { Calendar, User, ArrowRight, BookOpen } from "lucide-react";

// Future mein naye blog yahan add karein
const blogPosts = [
  {
    id: 1,
    title: "How to Find and Extract Hidden YouTube Tags in 2026",
    description: "Learn the secret techniques top creators use to categorize their videos and dominate the suggested sidebar.",
    date: "April 5, 2026",
    author: "Shubham Gautam",
    slug: "how-to-find-youtube-tags",
    category: "YouTube SEO"
  },
  {
    id: 2,
    title: "Thumbnail Psychology: Colors that Drive 2x More Clicks",
    description: "A deep dive into visual triggers and why certain color combinations outperform others on the YouTube homepage.",
    date: "April 3, 2026",
    author: "Shubham Gautam",
    slug: "thumbnail-psychology-guide",
    category: "CTR Optimization"
  },
];

export default function BlogListingPage() {
  return (
    <div className="max-w-6xl mx-auto py-16 px-6">
      {/* Header Section */}
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          Creator <span className="text-primary">Insights</span> & Blog
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Deep dives into YouTube SEO, Algorithm updates, and Metadata strategies by <strong>TaskGuru</strong>.
        </p>
      </div>

      {/* Featured Post (Optional but looks professional) */}
      <div className="mb-16">
        <div className="relative group overflow-hidden rounded-3xl border bg-muted/30 p-8 md:p-12">
          <div className="relative z-10 flex flex-col justify-center h-full space-y-4">
            <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full w-fit">
              FEATURED
            </span>
            <h2 className="text-3xl md:text-4xl font-bold hover:text-primary transition-colors">
              <Link href={`/blog/${blogPosts[0].slug}`}>{blogPosts[0].title}</Link>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              {blogPosts[0].description}
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground pt-4">
              <span className="flex items-center gap-1"><Calendar size={14} /> {blogPosts[0].date}</span>
              <span className="flex items-center gap-1"><User size={14} /> {blogPosts[0].author}</span>
            </div>
            <Link 
              href={`/blog/${blogPosts[0].slug}`} 
              className="mt-4 flex items-center gap-2 font-bold text-primary hover:gap-3 transition-all"
            >
              Read Full Article <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>

      {/* Latest Posts Grid */}
      <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
        <BookOpen className="text-primary" /> Latest Articles
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {blogPosts.slice(1).map((post) => (
          <div key={post.id} className="group border rounded-2xl p-6 hover:shadow-lg transition-all bg-card">
            <div className="space-y-4">
              <span className="text-xs font-bold text-primary uppercase tracking-wider">{post.category}</span>
              <h4 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h4>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {post.description}
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-muted">
                <span className="text-xs text-muted-foreground">{post.date}</span>
                <Link href={`/blog/${post.slug}`} className="text-sm font-bold flex items-center gap-1 hover:underline">
                  Read More <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
