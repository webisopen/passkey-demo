import type { Metadata } from "next";
import { SignIn } from "./sign-in";

export const metadata: Metadata = {
	title: "Sign In - Passkey Demo",
	description: "Sign in to your account",
};

export default async function Page() {
	return <SignIn />;
}
