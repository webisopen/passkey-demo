import { authClient } from "@/lib/auth/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Loader2, Key, Plus, Trash, Eye } from "lucide-react";
import { useState } from "react";

export function PasskeyManagement() {
	const user = authClient.useSession();

	if (user.isPending) {
		return (
			<div className="flex justify-center items-center min-h-[200px]">
				<Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
			</div>
		);
	}

	if (!user.data) {
		return (
			<Card>
				<CardContent className="py-4">
					<p className="text-sm text-muted-foreground text-center">
						Please sign in to manage your passkeys
					</p>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Passkey Management</CardTitle>
				<CardDescription>
					Manage your passkeys for secure authentication
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-6">
				<AddPasskey />
				<PasskeyList />
			</CardContent>
		</Card>
	);
}

function AddPasskey() {
	const [isRegistering, setIsRegistering] = useState(false);
	const passkeys = authClient.useListPasskeys();

	const onRegister = async () => {
		const result = await authClient.passkey.addPasskey({
			name: "My Passkey",
			fetchOptions: {
				onRequest: () => {
					setIsRegistering(true);
				},
				onSuccess: () => {
					toast.success("Passkey registered successfully");
					setIsRegistering(false);
					passkeys.refetch();
				},
				onError: (error) => {
					toast.error("Failed to register passkey", {
						description: error.error.message,
					});
					console.error(error);
					setIsRegistering(false);
					passkeys.refetch();
				},
			},
		});
	};

	return (
		<div className="space-y-2">
			<h3 className="text-sm font-medium">Add New Passkey</h3>
			<Button onClick={onRegister} disabled={isRegistering} className="w-full">
				{isRegistering ? (
					<>
						<Loader2 className="mr-2 h-4 w-4 animate-spin" />
						Creating Passkey...
					</>
				) : (
					<>
						<Plus className="mr-2 h-4 w-4" />
						Create a Passkey
					</>
				)}
			</Button>
		</div>
	);
}

function PasskeyList() {
	const passkeys = authClient.useListPasskeys();
	const [deletingPasskeyId, setDeletingPasskeyId] = useState<string | null>(
		null
	);

	const handleDelete = async (passkey: { id: string }) => {
		await authClient.passkey.deletePasskey({
			id: passkey.id,
			fetchOptions: {
				onRequest: () => {
					setDeletingPasskeyId(passkey.id);
				},
				onSuccess: () => {
					toast.success("Passkey deleted successfully");
					setDeletingPasskeyId(null);
					passkeys.refetch();
				},
				onError: (error) => {
					toast.error("Failed to delete passkey", {
						description: error.error.message,
					});
					setDeletingPasskeyId(null);
					passkeys.refetch();
				},
			},
		});
	};

	return (
		<div className="space-y-2">
			<h3 className="text-sm font-medium">Your Passkeys</h3>
			{passkeys.isPending && (
				<div className="flex justify-center py-4">
					<Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
				</div>
			)}
			{!passkeys.isPending && passkeys.data?.length === 0 && (
				<p className="text-sm text-muted-foreground py-2">No passkeys found</p>
			)}
			<div className="space-y-2">
				{passkeys.data?.map((passkey) => (
					<div
						key={passkey.id}
						className="flex items-center gap-2 p-3 rounded-lg border bg-card text-card-foreground shadow-sm"
					>
						<Key className="h-4 w-4 text-muted-foreground" />
						<div className="flex-1 min-w-0">
							<p className="text-sm font-medium truncate">{passkey.name}</p>
							<p className="text-xs text-muted-foreground truncate">
								{passkey.credentialID}
							</p>
						</div>
						<Dialog>
							<DialogTrigger asChild>
								<Button variant="ghost" size="sm" className="mr-2">
									<Eye className="h-4 w-4" />
								</Button>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>Passkey Details</DialogTitle>
								</DialogHeader>
								<div className="space-y-4">
									{Object.entries(passkey).map(([key, value]) => (
										<div key={key}>
											<h4 className="text-sm font-medium mb-1">{key}</h4>
											<p className="text-sm text-muted-foreground break-all">
												{typeof value === "string"
													? value
													: JSON.stringify(value)}
											</p>
										</div>
									))}
								</div>
							</DialogContent>
						</Dialog>
						<Popover>
							<PopoverTrigger asChild>
								<Button
									variant="destructive"
									size="sm"
									disabled={deletingPasskeyId === passkey.id}
								>
									{deletingPasskeyId === passkey.id ? (
										<Loader2 className="h-4 w-4 animate-spin" />
									) : (
										<Trash className="h-4 w-4" />
									)}
								</Button>
							</PopoverTrigger>
							<PopoverContent>
								<div className="space-y-3">
									<p className="text-sm font-medium">Are you sure?</p>
									<div className="flex gap-2">
										<Button
											size="sm"
											variant="destructive"
											onClick={() => handleDelete(passkey)}
										>
											Delete
										</Button>
										<Button size="sm" variant="outline">
											Cancel
										</Button>
									</div>
								</div>
							</PopoverContent>
						</Popover>
					</div>
				))}
			</div>
		</div>
	);
}
