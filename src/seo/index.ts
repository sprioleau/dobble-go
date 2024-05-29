import { Metadata, Viewport } from "next";

const fullName = "San'Quan Prioleau";
const title = "Dobble Go - Find Your Match";
const description = "A shape recognition game for the web based on the popular game Dobble.";
const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
const baseUrl = `${protocol}://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
const keywords = [
	fullName,
	"dobble",
	"online",
	"spot it",
	"game",
	"kids game",
	"kids",
	"fun",
	"learning",
	"shape recognition",
];

const baseOgConfig = {
	title,
	description,
	images: [
		{
			url: "/images/social-card.png",
			width: 1200,
			height: 630,
			alt: description,
		},
	],
};

const metadataBase = new URL(baseUrl);

export const homepageViewport: Viewport = {
	initialScale: 1,
	width: "device-width",
	themeColor: "#F9D744",
	colorScheme: "light",
};

export const homepageMetadata: Metadata = {
	title,
	description,
	applicationName: title,
	generator: "Next.js",
	referrer: "origin-when-cross-origin",
	icons: {
		icon: "images/favicon.svg",
		shortcut: {
			url: "images/favicon.svg",
			type: "image/svg+xml",
		},
	},
	manifest: "/manifest.json",
	keywords,
	authors: [{ name: fullName, url: baseUrl }],
	creator: fullName,
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	metadataBase,
	openGraph: {
		...baseOgConfig,
		url: baseUrl,
		siteName: title,
		locale: "en-US",
		type: "website",
	},
	twitter: baseOgConfig,
};
