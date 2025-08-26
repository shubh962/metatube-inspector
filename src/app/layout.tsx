import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Header";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Free Metadata Extractor Online | TaskGuru Tools",
  description: "Extract, analyze and view file metadata instantly with our free online metadata extractor. Supports images, PDFs, videos, audio, and documents.",
  keywords: [
    "metadata extractor",
    "online metadata extractor",
    "free metadata extractor",
    "extract metadata online",
    "image metadata extractor",
    "pdf metadata extractor",
    "video metadata extractor",
    "audio metadata extractor",
    "document metadata extractor",
    "file metadata viewer",
    "meta data analyzer",
    "jpg metadata extractor",
    "png metadata extractor",
    "mp4 metadata extractor",
    "doc metadata extractor",
    "xls metadata extractor",
    "metadata checker",
    "metadata reader",
    "metadata viewer online",
    "online metadata analyzer"
  ],
  openGraph: {
    title: "Free Metadata Extractor Online | TaskGuru Tools",
    description: "Extract, analyze and view file metadata instantly with our free online metadata extractor.",
    url: "https://www.taskguru.online",
    siteName: "TaskGuru",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="container mx-auto p-4">
          {children}

          {/* ✅ SEO Optimized Content Section */}
          <section className="mt-12 p-6 bg-gray-100 rounded-xl shadow-md">
            <h1 className="text-3xl font-bold mb-4">Free Metadata Extractor Online</h1>
            <p className="mb-4">
              Our <strong>Metadata Extractor</strong> tool helps you easily extract, analyze, and view 
              hidden information from your files. Whether it’s <strong>images, PDFs, videos, audio, or documents</strong>, 
              you can check file details instantly. 
              Metadata reveals file creation date, author, device information, GPS location, and much more.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">Why Use Metadata Extractor?</h2>
            <ul className="list-disc pl-6 mb-4">
              <li>Check <strong>image metadata</strong> like camera model, resolution, and EXIF data.</li>
              <li>Extract <strong>PDF metadata</strong> such as title, author, and creation date.</li>
              <li>Analyze <strong>video metadata</strong> (MP4, AVI, MOV) for codec and duration details.</li>
              <li>View <strong>audio metadata</strong> like MP3 tags, album name, and bitrate.</li>
              <li>Inspect <strong>document metadata</strong> (DOC, XLS, PPT) for hidden information.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6 mb-2">Features of Our Free Metadata Extractor</h2>
            <p className="mb-4">
              ✔ 100% Free & Online <br />
              ✔ No installation required <br />
              ✔ Supports multiple file formats <br />
              ✔ Safe & secure file handling <br />
              ✔ Instant results with detailed file information <br />
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">Frequently Asked Questions</h2>
            <div className="mb-4">
              <h3 className="text-lg font-bold">1. What is metadata?</h3>
              <p>
                Metadata is hidden information stored inside files. For example, an image can contain 
                details like camera type, date, and location.
              </p>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-bold">2. Is this Metadata Extractor safe?</h3>
              <p>
                Yes! Our tool processes files securely and does not store or share your data.
              </p>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-bold">3. Which file types are supported?</h3>
              <p>
                Images (JPG, PNG), PDFs, videos (MP4, AVI), audio (MP3, WAV), and documents (DOC, XLS, PPT).
              </p>
            </div>

            <h2 className="text-2xl font-semibold mt-6 mb-2">Conclusion</h2>
            <p>
              Use our <strong>Free Metadata Extractor Online</strong> to quickly analyze files and uncover hidden details. 
              Perfect for photographers, students, security experts, and anyone curious about file information. 
              Start using <a href="https://www.taskguru.online" className="text-blue-600 font-semibold">TaskGuru Metadata Extractor</a> today!
            </p>
          </section>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
