"use client";
import { Button } from "@/components/ui/button";
import { UserInfo } from "@/components/use-info";
import { authClient } from "@/lib/auth/client";
import { toast } from "sonner";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export function SignIn() {
	const user = authClient.useSession();

	if (user.isPending) {
		return (
			<div className="flex justify-center items-center min-h-[200px]">
				<Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
			</div>
		);
	}

	if (user.data) {
		return (
			<div className="container mx-auto py-8 max-w-md">
				<UserInfo />
			</div>
		);
	}

	return (
		<div className="container mx-auto py-8">
			<SignInWithPasskey />
		</div>
	);
}

function SignInWithPasskey() {
	const user = authClient.useSession();
	const [isSigningIn, setIsSigningIn] = useState(false);

	const onSignIn = async () => {
		try {
			setIsSigningIn(true);
			const result = await authClient.signIn.passkey();
			if (result?.error) {
				toast.error(result.error.message);
			}
			user.refetch();
		} catch (error) {
			console.error(error);
			toast.error("Failed to sign in");
		} finally {
			setIsSigningIn(false);
		}
	};

	return (
		<Card className="max-w-md mx-auto">
			<CardHeader>
				<CardTitle>Sign In</CardTitle>
				<CardDescription>
					Use your passkey to sign in to your account
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Button onClick={onSignIn} disabled={isSigningIn} className="w-full">
					{isSigningIn ? (
						<>
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							Signing In...
						</>
					) : (
						"Sign In With Passkey"
					)}
				</Button>
			</CardContent>
		</Card>
	);
}
