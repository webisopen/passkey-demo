"use client";
import { authClient } from "@/lib/auth/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut } from "lucide-react";

export function UserInfo() {
	const user = authClient.useSession();

	return (
		<Card>
			<CardHeader>
				<CardTitle>Account Information</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="space-y-2">
					<div className="flex items-center justify-between text-sm">
						<span className="text-muted-foreground">Email</span>
						<span className="font-medium break-all text-balance text-right">
							{user.data?.user?.email || "Not set"}
						</span>
					</div>
					<div className="flex items-center justify-between text-sm">
						<span className="text-muted-foreground">Name</span>
						<span className="font-medium">
							{user.data?.user?.name || "Anonymous"}
						</span>
					</div>
				</div>

				<Button
					variant="destructive"
					onClick={() => authClient.signOut()}
					className="w-full"
				>
					<LogOut className="mr-2 h-4 w-4" />
					Sign Out
				</Button>
			</CardContent>
		</Card>
	);
}
