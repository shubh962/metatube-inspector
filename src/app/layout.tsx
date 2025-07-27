import type {Metadata} from 'next';
import Script from 'next/script';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'], variable: "--font-sans" })

export const metadata: Metadata = {
  title: 'MetaTube Inspector',
  description: 'Extract metadata from YouTube videos easily.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        inter.variable
      )}>
        {children}
        <Toaster />
        <Script type='text/javascript' src='//pl27271377.profitableratecpm.com/f0/c9/8e/f0c98e2b3bd5c231032c8bacb2612ced.js' />
      </body>
    </html>
  );
}
