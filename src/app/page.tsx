import generateDobble from "@/utils/generateDobble";
import styles from "./page.module.scss";

import Dobble from "@/components/Dobble";

const SYMBOLS_PER_CARD = 6;

export default function Home() {
	const dobble = generateDobble({ symbolsPerCard: SYMBOLS_PER_CARD });

	return (
		<main className={styles.main}>
			<h1>Dobble</h1>
			<Dobble dobble={dobble} />
		</main>
	);
}
