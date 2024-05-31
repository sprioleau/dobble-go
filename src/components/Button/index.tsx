import OutlinedText from "../OutlinedText";
import styles from "./index.module.scss";

type Props = { color?: "blue" | "pink" } & React.ComponentProps<"button">;

export default function Button({ color = "blue", ...props }: Props) {
	return (
		<button
			{...props}
			data-color={color}
			className={styles["button"]}
		>
			<OutlinedText>{props.children}</OutlinedText>
		</button>
	);
}
