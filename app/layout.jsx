import "./globals.css";

export const metadata = {
  title: "The Pimenta",
  description: "The Pimenta redesign rebuilt with Next.js and MongoDB.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
