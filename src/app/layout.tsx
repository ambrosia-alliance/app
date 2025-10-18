import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Ambrosia',
  description: 'Explore therapies and articles',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-1 w-full md:w-4/5 mx-auto p-8">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
