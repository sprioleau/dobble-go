import styles from "./index.module.scss";

type Props = {
	children: React.ReactNode;
	fontSize?: `${number}${"px" | "em" | "rem"}` | number;
};

export default function OutlinedText({ children, fontSize = "2.75rem" }: Props) {
	return (
		<span
			className={styles["outlined-text"]}
			style={{ "--font-size": fontSize } as React.CSSProperties}
		>
			{children}
		</span>
	);
}
