import { betterAuth } from "better-auth";
import { anonymous } from "better-auth/plugins/anonymous";
import { passkey } from "better-auth/plugins/passkey";
// @ts-expect-error no types
import { Pool } from "pg";

export const auth = betterAuth({
	database: new Pool({
		connectionString: process.env.DATABASE_URL,
	}),
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
