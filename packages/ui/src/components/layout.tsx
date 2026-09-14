import type { Metadata, Viewport } from 'next';
import { Inter, Poppins } from 'next/font/google';
import { ThemeProvider } from './ThemeProvider';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'InstaDaily | 10-Minute Groceries',
  description:
    'InstaDaily delivers fresh groceries, dairy, and daily essentials to your doorstep in 10 minutes. Shop trusted brands like Amul and Aashirvaad with fast, reliable quick-commerce delivery across India.',
  keywords: [
    'grocery delivery',
    'quick commerce',
    '10 minute delivery',
    'online groceries India',
    'InstaDaily',
    'Amul',
    'Aashirvaad',
  ],
  authors: [{ name: 'InstaDaily' }],
  applicationName: 'InstaDaily',
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    title: 'InstaDaily | 10-Minute Groceries',
    description:
      'Fresh groceries and daily essentials delivered to your doorstep in 10 minutes. Shop trusted Indian brands on InstaDaily.',
    siteName: 'InstaDaily',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'InstaDaily | 10-Minute Groceries',
    description:
      'Fresh groceries and daily essentials delivered to your doorstep in 10 minutes.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps): React.JSX.Element {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-white font-sans text-neutral-900 antialiased dark:bg-neutral-950 dark:text-neutral-50">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}