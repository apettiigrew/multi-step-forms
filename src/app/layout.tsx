import "./../styles/main.scss";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  creator: 'Andrew Pettigrew',
  authors: [{ name: 'Andrew Pettigrew', url: 'https://www.linkedin.com/in/andrewpettigrew/' }],
  title: "Multi Step Form",
  description: "A multi-step form that allows users to enter their personal details, shipping address, payment details, and review their order before submitting.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
