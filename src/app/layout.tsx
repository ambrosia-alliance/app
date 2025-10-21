import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "Ambrosia",
  description: "Explore therapies and articles",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <html lang="en">
      <body className="flex flex-col min-h-dvh bg-background">
      <div className="shrink-0">
        <Header />
      </div>

      <main className="flex-1 min-h-0 overflow-hidden w-full md:w-4/5 mx-auto p-4 md:p-8">
        {children}
      </main>

      <div className="shrink-0">
        <Footer />
      </div>
      </body>
      </html>
  );
}