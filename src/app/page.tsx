import styles from "./page.module.scss";

import Menu from "@/components/Menu";

export default function HomePage() {
	return (
		<main className={styles.main}>
			<h1>Dobble</h1>
			<Menu />
		</main>
	);
}
