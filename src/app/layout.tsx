import "./globals.scss";

import { homepageMetadata } from "@/seo";

export const metadata = homepageMetadata;

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
