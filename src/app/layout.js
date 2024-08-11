import { Inter } from 'next/font/google';
import './globals.css';
import '../styles/App.css';
import Providers from '../components/Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Ahmad Kaiss | AI Developer & Web Designer Portfolio',
  description: 'Explore the innovative AI development and web design projects of Ahmad Kaiss. Specializing in AI-driven solutions, multi-agent systems, and creative web experiences.',
  keywords: 'Ahmad Kaiss, AI Developer, Web Designer, Portfolio, AI Projects, Multi-Agent Systems',
  author: 'Ahmad Kaiss',
  openGraph: {
    title: 'Ahmad Kaiss | AI Developer & Web Designer Portfolio',
    description: 'Innovative AI development and web design projects by Ahmad Kaiss.',
    url: 'https://ahmadkaiss.com',
    siteName: 'Ahmad Kaiss Portfolio',
    images: [
      {
        url: 'https://ahmadkaiss.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Ahmad Kaiss Portfolio Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}