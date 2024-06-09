import styles from "./index.module.scss";

type Props = {
	fontSize: `${number}${"px" | "em" | "rem"}` | number;
	children: React.ReactNode;
};

export default function OutlinedText({ fontSize = "2.75rem", children }: Props) {
	return (
		<span
			className={styles["outlined-text"]}
			style={{ "--font-size": fontSize } as React.CSSProperties}
		>
			{children}
		</span>
	);
}
