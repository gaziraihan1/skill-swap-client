import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import ClientProviders from "./components/ClientProviders";

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ["400", "500", "600", "700"]
});

export const metadata = {
  title: "Skill Swap",
  description: "A responsive and user friendly skill swap platform...",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body className={`${poppins.className} antialiased`}>
        <ClientProviders>
          <Navbar />
          <main className="min-h-screen">{children}</main>
        </ClientProviders>
      </body>
    </html>
  );
}
