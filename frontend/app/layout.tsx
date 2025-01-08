import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Url Shortener",
  description: "Generate a short url with a long url",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={"antialiased"}
      >
        {children}
      </body>
    </html>
  );
}
