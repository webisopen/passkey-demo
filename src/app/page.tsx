import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export default function Home() {
	return (
		<div className="container mx-auto py-8">
			<Card className="max-w-md mx-auto">
				<CardHeader>
					<CardTitle>Passkey Demo</CardTitle>
					<CardDescription>
						A simple demonstration of WebAuthn passkey authentication
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="space-y-2">
						<h3 className="font-medium">Getting Started:</h3>
						<ol className="list-decimal list-inside space-y-2 text-muted-foreground">
							<li>Sign up and create a passkey</li>
							<li>Sign in with your passkey</li>
						</ol>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
