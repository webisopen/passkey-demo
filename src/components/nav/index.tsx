"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "../ui/button";

export function Nav() {
	const pathname = usePathname();
	return (
		<nav className="w-full h-16 bg-background flex items-center justify-center gap-4">
			<Link
				className={cn(
					buttonVariants({ variant: "outline" }),
					pathname === "/" &&
						"bg-primary text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground"
				)}
				href="/"
			>
				Home
			</Link>
			<Link
				className={cn(
					buttonVariants({ variant: "outline" }),
					pathname === "/sign-up" &&
						"bg-primary text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground"
				)}
				href="/sign-up"
			>
				Sign Up / Manage Passkeys
			</Link>
			<Link
				className={cn(
					buttonVariants({ variant: "outline" }),
					pathname === "/sign-in" &&
						"bg-primary text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground"
				)}
				href="/sign-in"
			>
				Sign In
			</Link>
		</nav>
	);
}
