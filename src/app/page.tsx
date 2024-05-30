import styles from "./page.module.scss";

import Logo from "@/components/Logo";
import Menu from "@/components/Menu";

export default function HomePage() {
	return (
		<main className={styles.main}>
			<header>
				<h1 className="sr-only">Dobble Go</h1>
				<Logo />
			</header>
			<Menu />
		</main>
	);
}
