import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'ELCO Avionics | Command the Skies',
  description:
    'Next-generation flight control systems for drones, fighter jets, helicopters, and commercial aircraft. Professional avionics documentation and technical resources.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
