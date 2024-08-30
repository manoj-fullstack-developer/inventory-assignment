'use client';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from './components/shared/navbar';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <header>
                    <title>Inventory System</title>
                </header>
                <div className="relative min-h-screen ">
                    <Navbar />
                    {children}
                </div>
            </body>
        </html>
    );
}
