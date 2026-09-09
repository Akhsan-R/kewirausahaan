import "./globals.css";

export const metadata = {
  title: "Academic Hub B24",
  description: "Personal student academic dashboard"
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}