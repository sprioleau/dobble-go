import styles from "./index.module.scss";

import Link from "next/link";

export default function BackToMenuPageLink() {
	return (
		<Link
			href="/"
			className={styles["back-link"]}
		/>
	);
}
