const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL;

if (!CONTACT_EMAIL) {
	throw new Error("VITE_CONTACT_EMAIL is not set");
}

export const env = {
	contactEmail: CONTACT_EMAIL,
} as const;
