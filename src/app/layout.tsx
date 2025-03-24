import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Nav } from "@/components/nav";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Passkey Demo",
	description: "Passkey Demo",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<div className="flex flex-col items-center container mx-auto">
					<header className="w-full h-16 bg-background flex items-center justify-center">
						<h1 className="text-2xl font-bold">Passkey Demo</h1>
					</header>
					<Nav />
					{children}
					<Toaster />
				</div>
			</body>
		</html>
	);
}
