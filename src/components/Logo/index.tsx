import Image from "next/image";

type Props = {
	width?: number;
};

const INTRINSIC_DIMENSIONS = {
	WIDTH: 514,
	HEIGHT: 254,
};

export default function Logo({ width = 514 }: Props) {
	const intrinsicAspectRatio = INTRINSIC_DIMENSIONS.WIDTH / INTRINSIC_DIMENSIONS.HEIGHT;

	return (
		<Image
			src="/images/logo.svg"
			alt="Dobble Go Logo"
			width={width}
			height={width / intrinsicAspectRatio}
			priority
		/>
	);
}
