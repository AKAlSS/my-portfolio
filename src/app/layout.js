import { Inter } from 'next/font/google';
import './globals.css';
import '../styles/App.css';
import Providers from './components/Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'My Portfolio',
  description: 'A showcase of my work and skills',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}