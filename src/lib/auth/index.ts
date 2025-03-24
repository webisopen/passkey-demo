import { betterAuth } from "better-auth";
import { anonymous } from "better-auth/plugins/anonymous";
import { passkey } from "better-auth/plugins/passkey";

export const auth = betterAuth({
	plugins: [
		anonymous(),
		// https://www.better-auth.com/docs/plugins/passkey
		passkey({
			// rpID: "passkey-demo",
			rpName: "Passkey Demo",
			authenticatorSelection: {
				authenticatorAttachment: "cross-platform",
			},
		}),
	],
});
