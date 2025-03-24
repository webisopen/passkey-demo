import type { Metadata } from "next";
import { SignUp } from "./sign-up";

export const metadata: Metadata = {
	title: "Sign Up - Passkey Demo",
	description: "Sign up for an account",
};

export default async function Page() {
	return <SignUp />;
}
