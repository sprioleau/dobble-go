import styles from "./page.module.css";

import Dobble from "@/components/Dobble";

export default function Home() {
	return (
		<main className={styles.main}>
			<h1>Dobble</h1>
			<Dobble />
		</main>
	);
}
