import "./globals.css";

// Pass-through root layout: the [lang] segment layout renders the single
// <html> (with the correct per-language lang attribute) and <body>.
// This keeps exactly one <html> tag in the final document.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
