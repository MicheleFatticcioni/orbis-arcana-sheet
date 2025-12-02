import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Orbis Arcana Sheet",
  description: "Character Sheet for Orbis Arcana",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Roboto+Mono:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
