"use client";

import { PasskeyManagement } from "@/components/passkey-management";
import { Button } from "@/components/ui/button";
import { UserInfo } from "@/components/use-info";
import { authClient } from "@/lib/auth/client";
import { useState } from "react";
import { toast } from "sonner";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export function SignUp() {
	const user = authClient.useSession();

	if (user.isPending) {
		return (
			<div className="flex justify-center items-center min-h-[200px]">
				<Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
			</div>
		);
	}

	return (
		<div className="container mx-auto py-8">
			<div className="max-w-md mx-auto space-y-6">
				{user.data ? (
					<>
						<UserInfo />
						<PasskeyManagement />
					</>
				) : (
					<CreateAccount />
				)}
			</div>
		</div>
	);
}

function CreateAccount() {
	const [isCreatingAccount, setIsCreatingAccount] = useState(false);
	const onRegister = async () => {
		try {
			setIsCreatingAccount(true);
			const result = await authClient.signIn.anonymous();
			if (result?.error) {
				toast.error("Failed to create account", {
					description: result.error.message,
				});
				return;
			}
			toast.success("Account created");
		} catch (error: any) {
			toast.error("Failed to create account", {
				description: error.message,
			});
		} finally {
			setIsCreatingAccount(false);
		}
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Create Account</CardTitle>
				<CardDescription>
					Start by creating an anonymous account
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Button
					onClick={onRegister}
					disabled={isCreatingAccount}
					className="w-full"
				>
					{isCreatingAccount ? (
						<>
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							Creating Account...
						</>
					) : (
						"Create Account"
					)}
				</Button>
			</CardContent>
		</Card>
	);
}
