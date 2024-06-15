import Image from "next/image";

type Props = {
	width?: number;
	className?: string;
};

const INTRINSIC_DIMENSIONS = {
	WIDTH: 514,
	HEIGHT: 254,
};

export default function Logo({ width = INTRINSIC_DIMENSIONS.WIDTH, className }: Props) {
	const intrinsicAspectRatio = INTRINSIC_DIMENSIONS.WIDTH / INTRINSIC_DIMENSIONS.HEIGHT;

	return (
		<Image
			className={className}
			src="/images/logo.svg"
			alt="Dobble Go Logo"
			width={width}
			height={width / intrinsicAspectRatio}
			priority
		/>
	);
}
