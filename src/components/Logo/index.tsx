import Image from "next/image";

export default function Logo() {
	return (
		<Image
			src="/images/logo.svg"
			alt="Dobble Logo"
			width={514}
			height={254}
			priority
		/>
	);
}
