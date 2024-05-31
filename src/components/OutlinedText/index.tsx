import styles from "./index.module.scss";

type Props = {
	children: React.ReactNode;
};

export default function OutlinedText({ children }: Props) {
	return <span className={styles["outlined-text"]}>{children}</span>;
}
