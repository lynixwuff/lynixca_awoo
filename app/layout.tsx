import './globals.css';
import ClientWrapper from '@/components/ClientWrapper';

export const metadata = {
  title: "Lynix's Cosmic Den",
  description: 'Personal website for Lynix, featuring art, events, blog, and more!',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/fontawesome/css/all.min.css"></link>
      </head>
      <body className="bg-gray-900">
        <ClientWrapper>
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}