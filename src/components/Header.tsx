import Link from 'next/link';
import { Zap, BookOpen, Mail, Info } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

export default function Header() {
  return (
    <header className="w-full border-b bg-background/95 backdrop-blur sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex h-16 items-center justify-between px-6">
        
        {/* LOGO SECTION */}
        <Link href="/" className="flex items-center space-x-2 group">
          <Zap className="h-6 w-6 text-primary fill-current group-hover:scale-110 transition-transform" />
          <span className="text-xl font-bold tracking-tight">MetaTube Inspector</span>
        </Link>

        {/* NAVIGATION LINKS */}
        <nav className="hidden md:flex items-center gap-8">
          <Link 
            href="/" 
            className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1"
          >
            Tools
          </Link>
          
          {/* NEW BLOG BUTTON */}
          <Link 
            href="/blog" 
            className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1.5 bg-primary/5 px-3 py-1.5 rounded-full border border-primary/10"
          >
            <BookOpen size={16} className="text-primary" />
            Blog
          </Link>

          <Link 
            href="/about" 
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            About
          </Link>
          
          <Link 
            href="/contact" 
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Contact
          </Link>
        </nav>

        {/* ACTIONS */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          {/* MOBILE MENU ICON (Optional placeholder for small screens) */}
          <Link href="/blog" className="md:hidden p-2 hover:bg-accent rounded-md">
            <BookOpen size={20} />
          </Link>
        </div>
      </div>
    </header>
  );
}
